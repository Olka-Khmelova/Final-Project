import React from 'react';
import './index.css'

const Input = React.forwardRef(({
  label,
  type,
  error,
  onChange,
  ...props
}, ref) => {
  return (
      <div className="input">
          <label className="input_label">
              <span className="input_label_text">{label}</span>
              <input ref={ref} type={type} {...props} onChange={onChange}/>
              {error && <p className="input_error">{error.message}</p>}
          </label>
      </div>
  )
})

export default Input;