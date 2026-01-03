import Button from './Button';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default',
}) => {
  const variantStyles = {
    default: 'bg-white text-gray-900',
    danger: 'bg-red-50 text-red-900',
    success: 'bg-green-50 text-green-900',
    warning: 'bg-yellow-50 text-yellow-900',
  };

  const iconColors = {
    default: 'text-gray-400',
    danger: 'text-red-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
  };

  return (
    <div
      className={`${variantStyles[variant]} rounded-lg shadow-md p-12 text-center`}
    >
      {Icon && (
        <Icon
          className={`w-16 h-16 ${iconColors[variant]} mx-auto mb-4`}
        />
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
