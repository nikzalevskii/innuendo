interface Props {
  message: string;
  onRetry?: () => void;
}

export function ErrorAlert({ message, onRetry }: Props) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <p>{message}</p>

      {onRetry && (
        <button onClick={onRetry} className="underline text-red-800 ml-2">
          Попробовать снова
        </button>
      )}
    </div>
  );
}
