import MainCalendar from '../../features/MainCalendar/MainCalendar';
import Footer from '../../features/Footer/Footer';
import Nav from '../../features/Nav/Nav';
import Planner from '../../features/Planner/Planner';
import styles from './_home.module.scss';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';

const Home = () => {
  return (
    <main className={styles.home}>
      <Nav />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MainCalendar />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Planner />
      </ErrorBoundary>
      <Footer />
    </main>
  );
};

export default Home;
