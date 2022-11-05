import axios from "axios";

export type resultApi ={
    name: string,
    url: string
}
type ApiType = {
    count: number
    next: string
    previous: null
    results: Array<resultApi>
}

export const PokeAPI = {
    setPokemonList(page:number, limit: number){
        return axios.get<ApiType>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page*limit}.`).then(res=> res.data)
    },
    setPokemon(pokemonName: string){
        return fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    },
    setPokemonData: async (url: string)=>{
        try {
            const response = await fetch(url)
            const data = await response.json();
            return data;
        }
        catch (err){}
    },
    sortType(type: number){
        return fetch (`https://pokeapi.co/api/v2/type/${type}`)
    },
}


