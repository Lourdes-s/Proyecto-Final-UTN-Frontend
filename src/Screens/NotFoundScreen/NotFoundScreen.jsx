import React from 'react'
import '../Screens.css'
import './notFound.css'

const NotFoundScreen = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">¡Oops! La página que buscas no se encuentra.</p>
            <img className="not-found-image" src="https://i.pinimg.com/736x/2d/15/7d/2d157de6280104b89b2b1505d2195934.jpg" alt="Not Found" />
            <a className="not-found-link" href="/">Volver a la página principal</a>
        </div>
    )
}

export default NotFoundScreen