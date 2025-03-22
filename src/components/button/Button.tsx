function Button({ title, color, type, bgBtn, className, ...props }) {
    const buttonType = type || 'button';
    return (
        <button
            type={buttonType}
            className={`py-1.5 px-3 rounded-md text-sm max-lg:text-xs cursor-pointer ${bgBtn} ${className}`}
            {...props}
        >
            {title}
        </button>
    );
}

export default Button;
