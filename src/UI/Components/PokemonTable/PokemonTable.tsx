import React from 'react';
import '../../App.css';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../BLL/store";

const useStyles = makeStyles({
    table: {
        minWidth: 200,
    },
});

type PokemonTableType = {
    pokemons: any[]
}
export const PokemonTable: React.FC<PokemonTableType> = ({pokemons}) => {
    const loading = useSelector<AppRootStateType, boolean>(state => state.main.loading)
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={8} style={{width: '100%'}}>
            {loading
                ? <div style={{textAlign: 'center', fontWeight:300, letterSpacing: 1.4}}>Loading...</div>
                : <Container>
                    <TableContainer component={Paper} style={{overflowX: 'hidden'}}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><b>Name</b></TableCell>
                                    <TableCell align="center"><b>Photo</b></TableCell>
                                    <TableCell align="center"><b>Type</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pokemons.map(e => {
                                    const photo = e.sprites.other.dream_world.front_default

                                    return (
                                        <TableRow key={e.name} className={`thumb-container ${e.types[0].type.name}`}>
                                            <TableCell align="center" scope='row'>{e.name}</TableCell>
                                            <TableCell align="center">
                                                {photo
                                                    ? <img src={photo} alt={e.name}/>
                                                    : <div className={'emptyPhoto'}>Фото отсуствует</div>
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                <small>{e.types[0].type.name}</small>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            }
        </Grid>
    );
}
