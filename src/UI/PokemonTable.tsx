import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../BLL/store";
import {makeStyles} from '@material-ui/core/styles';
import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {sortByNameAC, sortPokemonTag} from "../BLL/mainReducer";

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

export const PokemonTable =()=> {
  const [pokemonName, setPokemonName] = useState<string>('')
  const pokemons = useSelector<AppRootStateType, any[]>(state => state.main.pokemons)
  const classes = useStyles();
  const dispatch = useDispatch()

  const filteredPokemon = pokemons.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  })

  return (
      <Grid item xs={12} sm={6}>
        <Container>
          <h2 style={{textAlign: 'center'}}>Pokemon table</h2>
          <div style={{display: 'flex'}}>
            <div>
              <input value={pokemonName}
                     onChange={(e)=> setPokemonName(e.currentTarget.value)}
                     placeholder={'Search in this box'}
              />
            </div>
          </div>
          <TableContainer component={Paper} style={{overflowX: 'hidden'}}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell align="center"><b>Photo</b></TableCell>
                  <TableCell align="center"><b>Type</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPokemon.map(e => (
                    <TableRow key={e.name} className={`thumb-container ${e.types[0].type.name}`}>
                      <TableCell scope='row'>{e.name}</TableCell>
                      <TableCell align="center">
                        <img src={e.sprites.other.dream_world.front_default} alt={e.name}/>
                      </TableCell>
                      <TableCell align="center">
                        <small>{e.types[0].type.name}</small>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Grid>
  );
}
