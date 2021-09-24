import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {searchNamePokemonTC} from "../BLL/mainReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../BLL/store";


export const SearchList = () => {
    const [name, setName] = useState<string>('')
    const dispatch = useDispatch()
    const pokemon = useSelector<AppRootStateType, any>(state => state.main.findPokemon)

    useEffect(() => {
        dispatch(searchNamePokemonTC(name))
    }, [dispatch, name])

    const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }


    return (<div>
            <input value={name} onChange={onSearchHandler}/>
        </div>
    )
}
