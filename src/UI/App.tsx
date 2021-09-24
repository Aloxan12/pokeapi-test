import React, {ChangeEvent, useEffect} from 'react';
import './App.css';
import {PokemonTable} from "./PokemonTable";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../BLL/store";
import {setPageCountAC, setPokemonAC, setPokemonListTC} from "../BLL/mainReducer";
import {Pagination} from "./Pagination";
import {SearchList} from "./SearchList";

function App() {
    const currentPage = useSelector<AppRootStateType, number>(state => state.main.currentPage)
    const limit = useSelector<AppRootStateType, number>(state => state.main.limit)
    const dispatch = useDispatch()

    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCountAC(Number(e.currentTarget.value)))
    }

    useEffect(()=>{
        dispatch(setPokemonListTC(currentPage, limit))
    },[currentPage, limit, dispatch])


    return (
        <div>
            <div className='AppContainer'>
                <PokemonTable />
                <SearchList />
            </div>
            <Pagination setPageCount={setPageCount} />
        </div>
    );
}
export default App;
