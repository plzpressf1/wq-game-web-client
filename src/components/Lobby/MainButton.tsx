import { CSSProperties } from "react";

import styles from "./MainButton.module.scss";

interface MainButtonProps {
    text: string;
    extraStyles?: CSSProperties;
    onClick?: (...args: any[]) => any;
}

export default function MainButton({ text, extraStyles, onClick }: MainButtonProps) {
    return (
        <button
            className={styles.button}
            style={extraStyles}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
