import styles from "./Weather.module.scss";

export default function Weather() {
  return (
    <div className={styles.card}>
      <p className={styles.temperature}>+19</p>
      <img className={styles.icon} src="" alt="icon" />
      <p className={styles.date}>05.04.2024</p>
      <p className={styles.type}>Солнечно</p>
      <img className={styles.icon} src="" alt="icon" />
    </div>
  );
}
