import {Button} from "@material-ui/core";
import {Input} from "@mui/material";
import './Searchbar.css'
import React, {ChangeEvent} from "react";

const { useState } = React;

interface ISearchbarProps{
    onSearch:(pokemon: string | null) => void
}

export const Searchbar = ({onSearch}:ISearchbarProps) => {
    const [search, setSearch] = useState("");

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (e.target.value.length === 0) {
            onSearch(null);
        }
    };

    const onClick = async () => {
        onSearch(search);
    };

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <Input placeholder="Search pokemon..." onChange={onChange} />
            </div>
            <div>
                <Button variant={"outlined"} onClick={onClick}>Search</Button>
            </div>
        </div>
    );
};
