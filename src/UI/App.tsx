import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {PokemonTable} from "./Components/PokemonTable/PokemonTable";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../BLL/store";
import {
    searchPokemon,
    setCurrentPageAC,
    setPageCountAC,
    setPokemonAC,
    setPokemonListTC,
    setSearchAC, setTotalPagesAC
} from "../BLL/mainReducer";
import {Pagination} from "./Common/Pagination";
import {SearchList} from "./SearchList";
import {Searchbar} from "./Common/Searchbar";

function App() {
    const totalCount = useSelector<AppRootStateType, number>(state => state.main.totalPage)
    const currentPage = useSelector<AppRootStateType, number>(state => state.main.currentPage)
    const limit = useSelector<AppRootStateType, number>(state => state.main.limit)
    const pokemons = useSelector<AppRootStateType, any[]>(state => state.main.pokemons)
    const [notFound, setNotFound] = useState(false);
    const [searching, setSearching] = useState(false);
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
    }, [])


    const onSearch = async (pokemon: string | null) => {
        if (!pokemon) {
            return dispatch(setPokemonListTC())
        }
        setNotFound(false);
        setSearching(true);
        const result = await searchPokemon(pokemon);
        if (!result) {
            setNotFound(true);
            return;
        } else {
            dispatch(setSearchAC([result]))
            dispatch(setCurrentPageAC(0))
            dispatch(setTotalPagesAC(0))
        }
        setSearching(false);
    };

    console.log(pokemons)

    return (
        <div className='AppContainer'>
            <h2>Pokemon table</h2>
            <Searchbar onSearch={onSearch}/>
            {notFound ? (
                <div className="not-found-text">
                    No se encontro el Pokemon que buscabas 😭
                </div>
            ) : (
                <PokemonTable
                    pokemons={pokemons}
                />
            )}
            {/*<PokemonTable pokemons={pokemons}/>*/}
            {/*<SearchList/>*/}
            <Pagination
                currentPage={currentPage}
                pageSize={limit}
                totalItemCounts={totalCount}
                setPageCount={setPageCount}
                onPageChanged={onPageChanged}
            />
        </div>
    );
}

export default App;
