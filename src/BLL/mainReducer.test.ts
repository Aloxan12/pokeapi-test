import {InitialStateType, mainReducer, setCurrentPageAC} from "./mainReducer";


let state:InitialStateType =  {
        pokemons: [] as Array<any>,
        loading: false,
        totalPage: 0,
        pageCount: 0,
        currentPage: 2,
        limit: 10,
}

test('set current page', () => {
    let action = setCurrentPageAC(2)

    let newState = mainReducer(state, action)
    expect(newState.currentPage).toBe(2)
})
