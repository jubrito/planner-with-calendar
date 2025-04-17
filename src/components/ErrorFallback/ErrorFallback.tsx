type ErrorProps = { error: Error };
import styles from './_error-fallback.module.scss';

export const ErrorFallback = ({ error }: ErrorProps) => {
  return <p className={styles.error}>Something went wrong: {error.message}</p>;
};
