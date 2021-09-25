import React, {ChangeEvent, useEffect} from 'react';
import './App.css';
import {PokemonTable} from "./PokemonTable";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../BLL/store";
import {setCurrentPageAC, setPageCountAC, setPokemonAC, setPokemonListTC} from "../BLL/mainReducer";
import {Pagination} from "./Pagination";
import {SearchList} from "./SearchList";

function App() {
    const totalCount = useSelector<AppRootStateType, number>(state => state.main.totalPage)
    const currentPage = useSelector<AppRootStateType, number>(state => state.main.currentPage)
    const limit = useSelector<AppRootStateType, number>(state => state.main.limit)
    const dispatch = useDispatch()

    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCountAC(Number(e.currentTarget.value)))
        dispatch(setPokemonListTC())
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
        dispatch(setPokemonListTC())
    }

    useEffect(()=>{
        dispatch(setPokemonListTC())
    },[])


    return (
        <div>
            <div className='AppContainer'>
                <PokemonTable />
                <SearchList />
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
