import React, { useState } from "react";
import Input from "../Input/Input";
import { EyeIcon, EyeslashIcon } from "../Icons/Icons";
import './index.css';

const InputPassword = (props) => {
    const [type, setType] = useState(props.type || 'password');

    const handleClick = () => {
        setType(type === 'password' ? 'text': 'password');
    }

    const newProps = {...props, type};

    return (
        <div className='password_input_container'>
            <Input {...newProps}/>
            <div className='password_img' onClick={handleClick}>
                {type === 'password' ? <EyeslashIcon /> : <EyeIcon />}
            </div>
        </div>
    )
}

export default InputPassword;