import {PokeAPI, resultApi} from "../DAL/api";
import {AppRootStateType} from "./store";

export type InitialStateType = {
    pokemons: Array<any>,
    loading: boolean,
    totalPage: number,
    pageCount: number,
    currentPage: number,
    limit: number,
}

const initialState: InitialStateType = {
    pokemons: [] as Array<any>,
    loading: false,
    totalPage: 0,
    pageCount: 0,
    currentPage: 2,
    limit: 10,
}

const setPokemonListAC = (page: number, limit: number) => ({type: 'SET_POKEMON_LIST', page, limit} as const)
const setLoading = (loading: boolean) => ({type: 'SET_LOADING', loading} as const)
export const setPokemonAC = (pokemon: any[]) => ({type: 'SET_POKEMON', pokemon} as const)
export const removeOldPokemonAC = () => ({type: 'REMOVE_OLD_POKEMON', } as const)
export const setCurrentPageAC = (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const)
export const setTotalPagesAC = (totalPage: number) => ({type: "SET_TOTAL_COUNT", totalPage} as const)
export const setPageCountAC = (newPageCount: number) => ({type: 'SET-PAGE-COUNT', newPageCount} as const)
export const setSearchAC = (pokemon: any) => ({type: 'SET-SEARCH', pokemon} as const)

type ActionType = ReturnType<typeof setPokemonListAC> | ReturnType<typeof setPokemonAC>
    | ReturnType<typeof setTotalPagesAC> | ReturnType<typeof setCurrentPageAC> | ReturnType<typeof removeOldPokemonAC>
    | ReturnType<typeof setPageCountAC> | ReturnType<typeof setSearchAC> | ReturnType<typeof setLoading>

export const mainReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET-PAGE-COUNT':
            return {...state, limit: action.newPageCount}
        case "SET_LOADING":
            return {...state, loading: action.loading}
        case 'SET_POKEMON_LIST':
            return {...state, page: action.page, limit: action.limit}
        case "SET_POKEMON":
            return {...state, pokemons:  action.pokemon}
        case "SET-SEARCH":
            return {...state, pokemons: action.pokemon}
        case 'REMOVE_OLD_POKEMON':
            return {...state, pokemons: []}
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET_TOTAL_COUNT":
            return {...state, totalPage: action.totalPage}
        default:
            return state
    }
}

export const setPokemonsTC = (result: resultApi[]) => {
    return async (dispatch: any) => {
        dispatch(setLoading(true))
        const promises = result.map(async (pok) => {
            return await PokeAPI.setPokemonData(pok.url)
        })
        const pokemons = await Promise.all(promises)
        dispatch(setPokemonAC(pokemons))
        dispatch(setLoading(false))
    }
}

export const setPokemonListTC = () => {
    return async (dispatch: any,  getState: () => AppRootStateType) => {
        const state = getState().main
        const page = state.currentPage
        const limit = state.limit

        const data = await PokeAPI.setPokemonList(page, limit).then(data => data)
        dispatch(setPokemonListAC(page, limit))
        dispatch(setTotalPagesAC(data.count))
        dispatch(setCurrentPageAC(page))
        dispatch(removeOldPokemonAC())
        dispatch(setPokemonsTC(data.results))
    }
}

export const searchPokemon = async (pokemon: string) => {
    try {
        const response = await PokeAPI.setPokemon(pokemon);
        return await response.json();
    } catch (err) {}
};

export const onSearchTC = (pokemon: string | null,setNotFound:(value: boolean)=>void)=>{
    return async (dispatch: any)=>{
    try {
        dispatch(setLoading(true))
        if (!pokemon) {
            return dispatch(setPokemonListTC())
        }
        setNotFound(false);
        const result = await searchPokemon(pokemon);
        if (!result) {
            setNotFound(true);
            return;
        } else {
            dispatch(setSearchAC([result]))
            dispatch(setCurrentPageAC(0))
            dispatch(setTotalPagesAC(0))
        }
        dispatch(setLoading(false))
    }catch (err) {}
}};


export const sortPokemonTag =(type: number)=>{
    return async (dispatch: any)=>{
        try {
            dispatch(setLoading(true))
            const response = await PokeAPI.sortType(type).then(res => res)
            const pokemonType = await response.json()
            const promises = pokemonType.pokemon.map((pok: any) => {
                return ({...pok['pokemon']})
            }).map(async (u: any) => {
                return await PokeAPI.setPokemonData(u.url)
            })
            const pokemonsType = await Promise.all(promises)
            dispatch(setPokemonAC(pokemonsType))
            dispatch(setCurrentPageAC(0))
            dispatch(setTotalPagesAC(0))
            dispatch(setLoading(false))
        }catch (err){}
    }
}
