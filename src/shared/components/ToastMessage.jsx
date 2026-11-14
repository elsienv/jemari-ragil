import { FiCheckCircle, FiX } from 'react-icons/fi';

export function ToastMessage({ message, onDismiss }) {
  return (
    <div
      className={'toast-message' + (message ? ' is-visible' : '')}
      role="status"
      aria-live="polite"
    >
      {message && (
        <>
          <FiCheckCircle aria-hidden="true" />
          <span>{message}</span>
          <button aria-label="Tutup pemberitahuan" onClick={onDismiss}>
            <FiX />
          </button>
        </>
      )}
    </div>
  );
}
