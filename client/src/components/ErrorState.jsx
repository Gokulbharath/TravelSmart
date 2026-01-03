import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

const ErrorState = ({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  showIcon = true,
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
      {showIcon && (
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
      )}
      <h3 className="text-xl font-semibold text-red-900 mb-2">{title}</h3>
      <p className="text-red-700 mb-6">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="danger">
          <RefreshCw className="w-4 h-4 mr-2 inline" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
