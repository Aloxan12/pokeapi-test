import {Route, Switch} from "react-router-dom";
import App from "./UI/App";
import React from "react";
import {PokemonTable} from "./UI/PokemonTable";


export const routes = [
    {
        id: 'Main',
        path: '/',
        exact: true,
        component: App
    },
    {
        id: 'PokemonTable',
        path: '/api/pokemon',
        exact: true,
        component: PokemonTable
    },
];

export const getRouteConfig = (id: string) => {
    const route = routes.find(route => route.id === id);

    if(route) {
        const { component, ...rest } = route;

        return rest;
    }
}

export const Routes = () => {
    return (
        <Switch>
            { routes.map(route => {
                const { id, ...props } = route;
                return (
                    <Route key={id} {...props} />
                )
            })}
        </Switch>
    )
}