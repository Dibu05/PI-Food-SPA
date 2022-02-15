import React from "react";
import { Link } from "react-router-dom";
import '../estilos/LandingPage.css';

export default function LandingPage() {
    return (
        <div className="Landing">
            <div className="component">
            <h2 className="tittle">Api Foods</h2>
            <h3 className="tittle">El placer de comer saludable!</h3>
            <Link to='/home'>
                <button className="btn">Recetas</button>   
            </Link>
            </div>
        </div>
    )
}   