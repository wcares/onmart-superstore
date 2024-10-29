
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;  // Add this line
  }
  
  export const Button = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    className = '',
    type = 'button',
    disabled = false  // Add this line
  }: ButtonProps) => {
    const baseStyles = 'px-4 py-2 rounded transition-colors';
    const variantStyles = variant === 'primary' 
      ? 'bg-blue-600 text-white hover:bg-blue-700' 
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
    return (
      <button 
        className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
        onClick={onClick}
        type={type}
        disabled={disabled}  // Add this line
      >
        {children}
      </button>
    );
  };