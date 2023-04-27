import React, { useState } from "react";
import Input from "../Input/Input";
import { EyeIcon, EyeslashIcon } from "../Icons/Icons";
import './index.css';

const InputPassword = React.forwardRef(({
    label,
    error,
    onChange,
    ...props
  }, ref) => {
    const [type, setType] = useState(props.type || 'password');

    const handleClick = () => {
        setType(type === 'password' ? 'text': 'password');
    }
    return (
        <div className='input'>
            <label className="input_label">
              <span className="input_labelText">{label}</span>
              <Input ref={ref} type={type} {...props} onChange={onChange}/>
              {error && <p className="input_error">{error.message}</p>}
            <div className='password_img' onClick={handleClick}>
                {type === 'password' ? <EyeIcon /> : <EyeslashIcon />}
            </div>
            </label>
        </div>
    )
})

export default InputPassword;