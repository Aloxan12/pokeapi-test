import axios from "axios";

export type resultApi ={
    name: string,
    utl: string
}
type ApiType = {
    count: number
    next: string
    previous: null
    results: Array<resultApi>
}

export const PokeAPI = {
    setPokemonList(page:number, limit: number){
        return axios.get<ApiType>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page}.`).then(res=> res.data)
    },
    setPokemon(pokemonName: string){
        return fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    },
    searchPokemon(pokemonName: string){
        return fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    }
}


