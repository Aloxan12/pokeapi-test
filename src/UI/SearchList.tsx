import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {searchNamePokemonTC, sortPokemonTag} from "../BLL/mainReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../BLL/store";
import {PokemonObject} from "./PokemonObject";


export const SearchList = () => {
    const [name, setName] = useState<string>('')
    const dispatch = useDispatch()
    const pokemon = useSelector<AppRootStateType, any>(state => state.main.findPokemon)



    const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onClickHandler =()=>{
        dispatch(searchNamePokemonTC(name))
    }
    const onSortTag =(e: ChangeEvent<HTMLSelectElement>)=>{
        dispatch(sortPokemonTag(Number(e.currentTarget.value)))
    }

    return (<div>
            <input value={name} onChange={onSearchHandler}/>
            <button onClick={onClickHandler}>Search</button>
            {/*<div>*/}
            {/*    <PokemonObject name={pokemon.name}*/}
            {/*                   photo={pokemon.sprites.other.dream_world.front_default}*/}
            {/*                   type={pokemon.types[0].type.name} />*/}
            {/*</div>*/}
            <div>
                <h2>Сортировка по типу</h2>
                <div>
                    <select onChange={onSortTag}>
                        <option value={1}>1</option>
                        <option value={2}>fighting</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
