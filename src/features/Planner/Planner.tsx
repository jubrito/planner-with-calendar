import styles from "./_planner.module.scss";

const Planner = () => {
  return (
    <section className={styles.planner}>
      <div className={styles.plannerHeader}>
        <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
          March, 2025
        </h2>
      </div>
    </section>
  );
};

export default Planner;
