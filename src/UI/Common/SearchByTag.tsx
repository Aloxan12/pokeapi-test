import './Searchbar.css'
import React, {ChangeEvent} from "react";
import {sortPokemonTag} from "../../BLL/mainReducer";
import {useDispatch} from "react-redux";


export const SearchByTag = () => {
    const dispatch = useDispatch()

    const onSortTag = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(sortPokemonTag(Number(e.currentTarget.value)))
    }

    return (
        <div>
            <div className='searchBlockTag'>
                <span>Сортировка по типу: </span>
                <select onChange={onSortTag}>
                    <option value={1}>Normal</option>
                    <option value={2}>Fighting</option>
                    <option value={3}>Flying</option>
                    <option value={4}>Poison</option>
                    <option value={5}>Ground</option>
                    <option value={6}>Rock</option>
                    <option value={7}>Bug</option>
                    <option value={8}>Ghost</option>
                    <option value={9}>Steel</option>
                    <option value={10}>Fire</option>
                </select>
            </div>
        </div>
    );
};
