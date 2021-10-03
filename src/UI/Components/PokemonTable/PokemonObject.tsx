import React from "react";


type PokemonObjectType = {
    name: string
    photo: string
    type: string
}

export const PokemonObject: React.FC <PokemonObjectType> =({name, photo, type})=>{
    return (
        <div>
            <h2>{name}</h2>
            <img src={photo} alt={name} />
            <span>{type}</span>
        </div>
    )

}
