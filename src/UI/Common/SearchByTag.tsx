import './Searchbar.css'
import React, {ChangeEvent, useState} from "react";
import { Select } from '@mui/material';


export const SearchByTag = (props: any) => {
    const { onSearchByTag } = props;
    const [search, setSearch] = useState("");

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (e.target.value.length === 0) {
            onSearchByTag(null);
        }
    };

    const onClick = async (e: any) => {
        onSearchByTag(search);
    };

    return (
        <div className="search-by-tag-container">
            <h2>Сортировка по типу</h2>
            <div>
                <Select value={0} onChange={onSearchByTag}>
                    <option value={1}>1</option>
                    <option value={2}>fighting</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </Select>
            </div>
        </div>
    );
};
