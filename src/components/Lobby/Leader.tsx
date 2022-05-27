import "styles/shadows.scss";
import styles from "./Leader.module.scss";

export default function Leader() {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.leader} basic-shadow ${styles.empty}`}/>
        </div>
    );
}
