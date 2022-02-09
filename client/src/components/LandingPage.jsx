import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div>
            <h1>El placer de comer sano!</h1>
            <h3>API Food</h3>
            <Link to='/home'>
                <button>Recetas</button>   
            </Link>
        </div>
    )
}   