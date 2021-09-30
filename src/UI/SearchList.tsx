import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {searchNamePokemonTC} from "../BLL/mainReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../BLL/store";
import {PokemonObject} from "./PokemonObject";


export const SearchList = () => {
    const [name, setName] = useState<string>('')
    const [pokemonObj, setPokemonObj] = useState<null | any>(null)
    const dispatch = useDispatch()
    const pokemon = useSelector<AppRootStateType, any>(state => state.main.findPokemon)
    //
    // useEffect(() => {
    //     dispatch(searchNamePokemonTC(name))
    // }, [dispatch])

    const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const onClickHandler =()=>{
        dispatch(searchNamePokemonTC(name))
    }

    return (<div>
            <input value={name} onChange={onSearchHandler}/>
            <button onClick={onClickHandler}>Search</button>
            {pokemonObj === null ? <div>Введите имя покемона</div> :
            <div>
                <PokemonObject name={pokemon.name}
                               photo={pokemon.sprites.other.dream_world.front_default}
                               type={pokemon.types[0].type.name} />
            </div>}
        </div>
    )
}
