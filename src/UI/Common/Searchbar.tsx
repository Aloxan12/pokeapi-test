import React, {ChangeEvent, MouseEvent} from "react";
const { useState } = React;

export const Searchbar = (props: any) => {
    const { onSearch } = props;
    const [search, setSearch] = useState("");

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (e.target.value.length === 0) {
            onSearch(null);
        }
    };

    const onClick = async (e: any) => {
        onSearch(search);
    };

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input placeholder="Buscar pokemon..." onChange={onChange} />
            </div>
            <div className="searchbar-btn">
                <button onClick={onClick}>Buscar</button>
            </div>
        </div>
    );
};
