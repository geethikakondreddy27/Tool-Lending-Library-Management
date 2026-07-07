

const Input = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  validation = {},
  error,
  disabled = false,
}) => {
  return (
    <div className="form-group">
      <label
        htmlFor={id}
        className="form-label"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={label}
        aria-invalid={!!error}
        className={`form-input ${
          error ? "form-input-error" : ""
        }`}
        {...register(id, validation)}
      />

      {error && (
        <p className="form-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;