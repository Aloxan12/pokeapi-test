import React, {ChangeEvent, useState} from "react";
import {Button} from "@mui/material";
import style from './Pagination.module.css'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../BLL/store";
import {setCurrentPageAC} from "../BLL/mainReducer";

type PaginationPropsType = {
    setPageCount: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Pagination: React.FC<PaginationPropsType> = ({setPageCount}) => {

    const pages = useSelector<AppRootStateType, number | null>(state => state.main.totalPage)
    const activePage = useSelector<AppRootStateType, number>(state => state.main.currentPage)
    const dispatch = useDispatch()

    const changePage = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    const pagesCount: number[] = []

    if (pages) {
        for (let i = 1; i <= pages; i++) {
            pagesCount.push(i)
        }
    }

    const borderSize = 9
    const borderCount = Math.ceil(pagesCount.length / borderSize)
    const [borderNumber, setBorderNumber] = useState(1)
    const leftBorderPageNumber = (borderNumber - 1) * borderSize + 1
    const rightBorderPageNumber = borderNumber * borderSize

    return (
        <div className={style.container}>

            {borderNumber > 1 && <Button variant="outlined" color="primary"
                                         onClick={() => {
                                             setBorderNumber(borderNumber - 1)
                                         }}><ArrowLeftIcon/></Button>
            }

            {pagesCount
                .filter((p ) => p >= leftBorderPageNumber && p <= rightBorderPageNumber)
                .map((page, i) => {
                    return <Button key={i}
                                   color="primary"
                                   variant={activePage === page ? "contained" : undefined}
                                   onClick={() => {
                                       changePage(page)
                                   }}
                    >{page}</Button>
                })
            }

            {borderCount > borderNumber && <Button variant="outlined" color="primary"
                                                   onClick={() => {
                                                       setBorderNumber(borderNumber + 1)
                                                   }}><ArrowRightIcon/></Button>
            }
            <div className={style.selectWrap} >
                <span className={style.selectSpan}>Show</span>
                <select className={style.select} onChange={setPageCount}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
                <span className={style.selectSpan}>Pokemons</span>
            </div>
        </div>
    );
}

