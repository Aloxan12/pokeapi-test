import React, {ChangeEvent, useState} from "react";
import {Button} from "@mui/material";
import styles from './Pagination.module.css'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

type PaginationPropsType = {
    pageSize: number
    portionSize?: number
    totalItemCounts: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    setPageCount: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Pagination: React.FC<PaginationPropsType> = ({
                                                              totalItemCounts,
                                                              pageSize,
                                                              onPageChanged,
                                                              currentPage = 1,
                                                              portionSize = 10,
                                                              setPageCount
                                                          }) => {
    let pagesCount = Math.ceil(totalItemCounts / pageSize)

    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return (
        <div className={styles.wrap}>
            <div className={styles.numbers}>
                    <Button className={styles.arrow} disabled={portionNumber <= 1} onClick={() => {
                        setPortionNumber(portionNumber - 1)
                    }}><ArrowLeftIcon/></Button>
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        return <Button key={p}
                                       variant={currentPage === p ? 'contained' : 'outlined'}
                                       onClick={() => {
                                           onPageChanged(p)
                                       }}>{p}</Button>
                    })}
                {portionCount > portionNumber &&
                    <Button onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}><ArrowRightIcon/></Button>}
            </div>
            {totalItemCounts > 10
                ? <div className={styles.selectWrap}>
                    <span className={styles.selectSpan}>Show</span>
                    <select className={styles.select} onChange={setPageCount}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    <span className={styles.selectSpan}>Pokemons</span>
                </div> : ''}
        </div>
    );
}

