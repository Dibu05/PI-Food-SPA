import React from "react";  
import '../estilos/Card.css';
//exporto lo que necesito mostrar
export default function Card({image,name,diet}) {
    return (
        <div className="cards-single">
            <h4 className="tittle-card">{name}</h4>
            <img className="img-card" src={image} alt='Imagen no encontrada' width='200px' height='200px'/>
            <h5 className="diet-type">{diet}</h5>
        </div>
    )
}
