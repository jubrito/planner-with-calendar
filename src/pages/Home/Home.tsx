import Calendar from "../../features/Calendar/Calendar";
import Footer from "../../features/Footer/Footer";
import Nav from "../../features/Nav/Nav";
import Planner from "../../features/Planner/Planner";
import styles from "./_home.module.scss";

const Home = () => {
  return (
    <main className={styles.home}>
      <Nav />
      <Calendar />
      <Planner />
      <Footer />
    </main>
  );
};

export default Home;
