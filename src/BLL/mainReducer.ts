import {PokeAPI, resultApi} from "../DAL/api";
import {AppRootStateType} from "./store";


const initialState = {
    pokemons: [] as Array<any>,
    pokemonsType: [] as Array<any>,
    findPokemon: {} as any,
    totalPage: 0,
    pageCount: 0,
    currentPage: 2,
    limit: 10,

}
const setPokemonListAC = (page: number, limit: number) => ({type: 'SET_POKEMON_LIST', page, limit} as const)
export const setPokemonAC = (pokemon: any[]) => ({type: 'SET_POKEMON', pokemon} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const)
export const setTotalPagesAC = (totalPage: number) => ({type: "SET_TOTAL_COUNT", totalPage} as const)
export const setPageCountAC = (newPageCount: number) => ({type: 'SET-PAGE-COUNT', newPageCount} as const)
export const setSearchAC = (pokemon: any) => ({type: 'SET-SEARCH', pokemon} as const)
export const sortByTypeAC = (pokemon: any[]) => ({type: 'SORT-BY-TYPE', pokemon} as const)

type ActionType = ReturnType<typeof setPokemonListAC> | ReturnType<typeof setPokemonAC>
    | ReturnType<typeof setTotalPagesAC> | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPageCountAC> | ReturnType<typeof setSearchAC> | ReturnType<typeof sortByTypeAC>

export const mainReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET-PAGE-COUNT':
            return {...state, limit: action.newPageCount}
        case 'SET_POKEMON_LIST':
            return {...state, page: action.page, limit: action.limit}
        case "SET_POKEMON":
            return {...state, pokemons:  action.pokemon}
        case "SET-SEARCH":
            return {...state, findPokemon: action.pokemon}
        case "SORT-BY-TYPE":
            return {...state, pokemonsType: [...state.pokemonsType, action.pokemon]}
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
        const promises = result.map(async (pok) => {
            return await PokeAPI.setPokemonData(pok.url)
        })
        const pokemons = await Promise.all(promises)
        console.log(pokemons)
        dispatch(setPokemonAC(pokemons))
    }
}

export const setPokemonListTC = () => {
    return async (dispatch: any,  getState: () => AppRootStateType) => {
        const state = getState().main
        const page = state.currentPage
        const limit = state.limit


        const data = await PokeAPI.setPokemonList(page, limit).then(data => data)
        console.log('currenPage:' + page)
        console.log('total:' + data.count)
        console.log('limit:' + limit)
        dispatch(setPokemonListAC(page, limit))
        dispatch(setTotalPagesAC(data.count))
        dispatch(setCurrentPageAC(page))
        dispatch(setPokemonsTC(data.results)) //отфильтровать по имени
    }
}


export const searchNamePokemonTC = async (pokemon: any)=>{
    try {
        const data = await  PokeAPI.setPokemon(pokemon).then(res => res.json())
        return data;
    }
    catch (err){}
}
export const sortPokemonTag =(type: number)=>{
    return async (dispatch: any, getState: () => AppRootStateType)=>{
        const state = getState().main
        const page = state.currentPage
        const limit = state.limit

        const response = await PokeAPI.sortType(type, page, limit).then(res => res)
        const pokemonType = await response.json()
        const newArr = pokemonType.pokemon.map((pok: any) => ({...pok['pokemon']}))
            .map(async (p: any)=> {
            const res = await PokeAPI.setPokemon(p.name).then(res=> res.json())
                dispatch(sortByTypeAC(res))
        })
        console.log(newArr)
    }
}
