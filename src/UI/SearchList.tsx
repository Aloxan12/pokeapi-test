import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {sortPokemonTag} from "../BLL/mainReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../BLL/store";
import {PokemonObject} from "./Components/PokemonTable/PokemonObject";


export const SearchList = () => {
    const dispatch = useDispatch()
    const pokemon = useSelector<AppRootStateType, any>(state => state.main.findPokemon)
    const pokemonType = useSelector<AppRootStateType, any>(state => state.main.pokemonsType)



    const onSortTag =(e: ChangeEvent<HTMLSelectElement>)=>{
        dispatch(sortPokemonTag(Number(e.currentTarget.value)))
    }

    return (<div>
            <div>
                <h2>Сортировка по типу</h2>
                <div>
                    <select value={0} onChange={onSortTag}>
                        <option value={1}>1</option>
                        <option value={2}>fighting</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                    </select>
                </div>
                <div>
                    {pokemonType.map((p: any, i:number)=>{
                        return(
                            <div key={p.name}>
                                <PokemonObject name={p.name}
                                               photo={p.sprites.other.dream_world.front_default}
                                               type={p.types[0].type.name}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
