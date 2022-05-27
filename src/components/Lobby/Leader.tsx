import styles from "./Leader.module.scss";

export default function Leader() {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.leader} ${styles.empty}`}/>
        </div>
    );
}