import React from 'react';
import './WrapperContainer.css';

const WrapperContainer = ({children}) => {
    return (
        <div className="main-wrapper">
            {children}
        </div>
    );
}

export default WrapperContainer;