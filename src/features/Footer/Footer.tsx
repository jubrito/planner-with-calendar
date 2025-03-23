import styles from "./_footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Designed and developed by
      <a
        href="https://www.linkedin.com/in/jubrito"
        rel="noopener noreferrer"
        target="_blank"
        aria-label="Go to Juliana Witzke de Brito's linkedIn"
      >
        Juliana Witzke de Brito
      </a>
    </footer>
  );
};

export default Footer;
