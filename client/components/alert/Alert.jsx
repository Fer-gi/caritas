/* eslint-disable react/prop-types */
function Alert({ variant, children }) {
  return <div className={`alert alert-${variant}`}>{children}</div>;
}

export default Alert;
