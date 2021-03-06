import { observable, action, makeObservable, runInAction } from "mobx";

import { LocalStorageEntryName } from "api/common";
import { authLogin, authFetchUser } from "api/auth";
import { Game, User } from "api/games";

class Store {
    isFetchingUser: boolean = false;
    user: User | null = null;
    game: Game | null = null;

    constructor() {
        makeObservable(this, {
            isFetchingUser: observable,
            user: observable,

            clear: action,
            login: action,
            fetchUser: action,
        });
    }

    clear() {
        localStorage.removeItem(LocalStorageEntryName);
        this.user = null;
    }

    async login(login: string, password: string) {
        try {
            const response = await authLogin(login, password);
            localStorage.setItem(LocalStorageEntryName, response.data.accessToken);
            await this.fetchUser();
        }
        catch (e) {
            this.clear();
            console.error(e);
        }
    }

    async fetchUser() {
        this.isFetchingUser = true;
        try {
            const response = await authFetchUser();
            runInAction(() => {
                this.user = response.data.user;
                this.game = response.data.game;
            });
        }
        catch (e) {
            this.clear();
            console.error(e);
        }
        finally {
            runInAction(() => {
                this.isFetchingUser = false;
            });
        }
    }
}

export const UserStore = new Store();
