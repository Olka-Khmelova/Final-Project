import React from 'react';
import imageMain from '../../assets/hipstagram_logo_img.jpg';
import './AuthWrapper.css';

const styles = {
    paperContainer: {
        height: '100vh',
        width: 525,
        backgroundImage: `url(${imageMain})`,
        backgroundSize: 'cover'
    }
};

const AuthWrapper = ({children}) => {
    return (
        <div className="main">
            <div className="img-main" style={styles.paperContainer}></div>
            <div className="content-main">
                <div className="content-logo">
                    <h1>hipstagram</h1>
                </div>
                {children}
            </div>
        </div> 
    );
}

export default AuthWrapper;