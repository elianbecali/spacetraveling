import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src="/Logo.svg" alt="Logo spacetraveling" />
    </header>
  );
}
