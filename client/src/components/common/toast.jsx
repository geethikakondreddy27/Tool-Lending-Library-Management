const Toast = ({ type = "success", message, show }) => {
  if (!show) return null;

  return <div className={`toast toast-${type}`}>{message}</div>;
};

export default Toast;
