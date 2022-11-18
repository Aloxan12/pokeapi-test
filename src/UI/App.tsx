import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {PokemonTable} from "./Components/PokemonTable/PokemonTable";
import {useDispatch} from "react-redux";
import { useAppSelector} from "../BLL/store";
import {onSearchTC, setCurrentPageAC, setPageCountAC, setPokemonListTC} from "../BLL/mainReducer";
import {Pagination} from "./Common/Pagination";
import {Searchbar} from "./Common/Searchbar";
import {SearchByTag} from "./Common/SearchByTag";

function App() {
    const {pokemons, limit, currentPage, totalPage: totalCount} = useAppSelector(state => state.main)
    const [notFound, setNotFound] = useState(false);
    const dispatch = useDispatch()

    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCountAC(Number(e.currentTarget.value)))
        dispatch(setPokemonListTC())
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
        dispatch(setPokemonListTC())
    }
    useEffect(() => {
        dispatch(setPokemonListTC())
    }, [dispatch])

    const onSearch = (pokemon: string | null) => {
        dispatch(onSearchTC(pokemon, setNotFound))
        setNotFound(false)
    }

    return (
        <div className='AppContainer'>
            <h2>Pokemon table</h2>
            <div className='searchBlock'>
                <Searchbar onSearch={onSearch}/>
                <SearchByTag/>
            </div>
            {notFound ? (
                <div className="not-found-text">
                    No se encontro el Pokemon que buscabas 😭
                </div>
            ) : (
                <>
                    <PokemonTable
                        pokemons={pokemons}
                    />
                    <Pagination
                        currentPage={currentPage}
                        pageSize={limit}
                        totalItemCounts={totalCount}
                        setPageCount={setPageCount}
                        onPageChanged={onPageChanged}
                    />
                </>
            )}
        </div>
    );
}

export default App;
