import './Searchbar.css'
import React, {ChangeEvent, useState} from "react";
import {Select} from '@mui/material';
import {sortPokemonTag} from "../../BLL/mainReducer";
import {useDispatch} from "react-redux";


export const SearchByTag = () => {
    const dispatch = useDispatch()

    const onSortTag = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(sortPokemonTag(Number(e.currentTarget.value)))
    }

    return (
        <div className="search-by-tag-container">
            <h2>Сортировка по типу</h2>
            <div>
                <select onChange={onSortTag}>
                    <option value={1}>Normal</option>
                    <option value={2}>Fighting</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>
            </div>
        </div>
    );
};
