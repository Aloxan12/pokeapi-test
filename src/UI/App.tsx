import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {PokemonTable} from "./Components/PokemonTable/PokemonTable";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../BLL/store";
import {setCurrentPageAC, setPageCountAC, setPokemonAC, setPokemonListTC} from "../BLL/mainReducer";
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


    const onSearch = async (pokemon: string) => {
        // if (!pokemon) {
        //     return setPokemonListTC()
        // }
        // setNotFound(false);
        // setSearching(true);
        // const result = await searchPokemon(pokemon);
        // if (!result) {
        //     setNotFound(true);
        //     return;
        // } else {
        //     setPokemons([result]);
        //     setPage(0);
        //     setTotal(1);
        // }
        // setSearching(false);
    };

    console.log(pokemons)

    return (
        <div>
            <div className='AppContainer'>
                <div><Searchbar onSearch={onSearch}/>
                    <PokemonTable pokemons={pokemons}/>
                </div>
                <SearchList/>
            </div>
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
