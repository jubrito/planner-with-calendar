type ErrorProps = { error: Error };
import styles from './_error-fallback.module.scss';
import CancelIcon from '@mui/icons-material/Cancel';

export const ErrorFallback = ({ error }: ErrorProps) => {
  return (
    <p className={styles.error}>
      <CancelIcon color={'error'} />
      <strong>Something went wrong:</strong> {error.message}
    </p>
  );
};
