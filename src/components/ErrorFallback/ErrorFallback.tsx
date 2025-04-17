type ErrorProps = { error: Error };
import styles from './_error-fallback.module.scss';
import CancelIcon from '@mui/icons-material/Cancel';

export const ErrorFallback = ({ error }: ErrorProps) => {
  return (
    <div className={styles.error}>
      <CancelIcon color={'error'} />
      <p>Something went wrong: {error.message}</p>
    </div>
  );
};
