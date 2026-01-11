import { formatDT } from "@/utils/time"
import { faRotate, faSearch, faSortDown, faSortUp, type IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { Select } from "./NiceElements"
import Pagination from "./Pagination"
import { Skeleton } from "./Skeleton"
import { TableButtonsHandler } from "./TableButtons"
import type { tableButtonsHandlerTypes, TableSearchConfig, TableSortConfig, TableType } from "./TableTypes"

// T is part of Y
interface TableProps<T, Y> {
    titles: { col: keyof T, value: string }[],
    data: Array<T & { id?: number | string }>,
    handleData: (updater: ((prev: Y) => Y) | Y) => void,
    handleRefresh: () => void,
    handlePagination: (page: number) => void,
    isLoading: boolean,
    currentPage: number,
    totalCount: number,
    hideSearchBar?: boolean,
    searchPlaceholder: string,
    searchConfig: TableSearchConfig<T>,
    sortConfig: TableSortConfig<T>,
    handleSearch: (column: keyof T, keyword: string) => void,
    handleSort: (key: keyof T) => void,
    cursorHover?: boolean,
    mainButton?: string,
    mainButtonIcon?: IconDefinition,
    mainButtonHref?: string,
    noResults: string,
    tableRowOnClick?: React.MouseEventHandler<HTMLTableRowElement>,
    tableRowType?: tableButtonsHandlerTypes
};

/**
 * Advanced table design for dashboard
 * @param {{col: keyof T, value: string}[]} titles Columns titles
 * @param {Array<T & { id?: number | string }>} data Table data
 * @param {number} totalCount Total rows count
 * @param {number} currentPage Current page to display
 * @param {boolean} isLoading is table loading
 * @param {string} searchPlaceholder Search field placeholder
 * @param {{ column: keyof T, keyword: string }} searchConfig Search Configuration
 * @param {{ key: keyof T, order: 'asc' | 'desc' }} sortConfig Sort Configuration
 * @param {(page: number) => void} handlePagination Pagination handler
 * @param {(column: keyof T, keyword: string) => void} handleSearch Search event handler
 * @param {(key: keyof T) => void} handleSort Sort event handler
 * @param {boolean} cursorHover Indicates whether table has rows with hover pointer
 * @param {string} mainButton Title for the button
 * @param {IconDefinition} mainButtonIcon Icon for mainButton
 * @param {string} mainButtonHref Link to the button
 * @param {string} noResults Text to show when there's no results
 * @param {tableButtonsHandlerTypes} tableRowType Children to include in table - Usually TableRow
 */

function Table<T, Y>({ titles, data, totalCount, currentPage, isLoading, handleRefresh, handleData, handlePagination, hideSearchBar = false, searchPlaceholder, searchConfig, sortConfig, handleSearch, handleSort, cursorHover = false, mainButton, mainButtonIcon, mainButtonHref, noResults, tableRowOnClick, tableRowType }: TableProps<T, Y>) {
    const itemsPerPage = 10;
    const [serverSided, setServerSided] = useState<boolean | null>();
    const searchRef = useRef<HTMLInputElement | null>(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (typeof serverSided === 'undefined' && totalCount !== -1 && searchConfig.keyword.length === 0) // serverside detection on first render
            setServerSided(totalCount >= itemsPerPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serverSided, totalCount]);
    useEffect(() => {
        if (serverSided === null) setServerSided(totalCount >= itemsPerPage) // serverside detection on showOld/managerView switching
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalCount]);
    useEffect(() => {
        if(searchParams.get('search') === '' || searchParams.get('search') === null) handleRefresh(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleRefresh]);
    useEffect(() => { // showOld/managerView switch handler
        handleSearch(searchConfig.column, '');
       if (serverSided !== null) setServerSided(null);
        if (searchRef.current)
            searchRef.current.value = '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // accessing table without query params would cause useFetchData to return
    // however, when queryData get set, no refresh happens, thus we force a refresh
    // if totalCount === -1 along with serverSided.
    // serverSided value is only set when searchbar is empty, ensuring smooth UX
    // without the need to refresh page with empty search values to fetch all data
    useEffect(() => {
        if (serverSided || totalCount === -1
            || (typeof serverSided === 'undefined' && totalCount <= itemsPerPage && searchConfig.keyword.length === 0)
            || (serverSided === null && (searchParams.get('search') === '' || searchParams.get('search') === null))) // refreshing on toggling showOld
            handleRefresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleRefresh]);
    const filteredData = serverSided ? data : data.filter(d => searchConfig.keyword.length === 0 ? d : (d[searchConfig.column] as string).toString().toLowerCase().includes(searchConfig.keyword.toLowerCase()));
    const sortedData = serverSided ? data : filteredData.sort((a, b) => {
        const valueA = a[sortConfig.key] || "";
        const valueB = b[sortConfig.key] || "";
        const comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        return sortConfig.order === 'asc' ? comparison : -comparison;
    });
    const updateSortCol = (key: keyof T): void => handleSort(key);
    const updateSearchCol = (key: keyof T): void => {
        handleSearch(key, '');
        if (searchRef.current)
            searchRef.current.value = '';
    };
    const updateSearchBar = () => {
        if (searchRef.current) {
            const keyword = searchRef.current.value;
            const columnExists = titles.some(t => t.col === searchConfig.column);
            handleSearch(columnExists ? searchConfig.column : titles[0].col, keyword);
        }
    };
    return (
        <TableContext.Provider value={{ data, handleRefresh: handleRefresh, handleData: handleData }}>
            <div className="flex flex-col md:flex-row items-center gap-3 pb-3 pt-2 md:pt-0 justify-end">
                {!hideSearchBar && <>
                    <Select defaultValue={searchConfig.column as string} onChange={e => updateSearchCol(e.target.value as keyof T)} className="!bg-subbackground w-full md:w-1/6">
                        {titles.map(x => <option key={x.col as string} value={x.col as string}>{x.value}</option>)}
                    </Select>
                    <div className="content-center relative block w-full md:w-auto">
                        <FontAwesomeIcon icon={faSearch} className="absolute top-[calc(50%-0.5em)] ltr:left-4 rtl:right-4 text-simple" />
                        <input type="text" name="search" placeholder={searchPlaceholder} defaultValue={searchConfig.keyword} ref={searchRef} onChange={updateSearchBar} className="transition-all duration-200 py-2 ps-12 pe-6 rounded-lg bg-subbackground text-simple text-base font-light w-full ring-2 ring-transparent focus:outline-none hover:ring-primary-700 focus:ring-primary-600" />
                    </div>
                </>}
                <div className="max-md:w-full flex gap-2">
                    <span role="button" tabIndex={0} className="bg-primary hover:bg-primary-600 text-white text-center py-2 px-3 rounded-xl cursor-pointer max-md:w-full" onClick={() => handleRefresh()}>
                        <FontAwesomeIcon icon={faRotate} />
                    </span>
                    {mainButton &&
                        <Link to={mainButtonHref ? mainButtonHref : '#'} className="w-full md:w-auto">
                            <button className="font-medium bg-primary hover:bg-primary-600 text-white px-3 py-2 rounded-xl whitespace-nowrap w-full" >
                                {mainButtonIcon && <FontAwesomeIcon icon={mainButtonIcon} className="pe-2" />}
                                <span>{mainButton}</span>
                            </button>
                        </Link>}
                </div>
            </div>
            <div className="data-table grid relative overflow-x-auto shadow-md rounded-xl whitespace-nowrap">
                {(sortedData.length !== 0 || isLoading) ?
                    <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
                        <thead className="text-xs uppercase bg-gray-100 dark:bg-subbackground/70 text-gray-700 dark:text-gray-400">
                            <tr>
                                {titles.map((title) => <th key={title.col as string} scope="col" className="px-6 py-3 hover:cursor-pointer" onClick={() => updateSortCol(title.col)}>{title.value}
                                    {title.col === sortConfig.key && // add arrows for sorted col
                                        <FontAwesomeIcon className="ps-2" icon={sortConfig.order === 'asc' ? faSortUp : faSortDown} />}
                                </th>)}
                                {tableRowType !== undefined  /* row comes with buttons? */ && <th scope="col" className="px-6 py-3"></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? <TableSkeleton cols={tableRowType ? titles.length + 1 : titles.length} /> :
                                sortedData.map((d) =>
                                    <TableRow key={d.id} elements={d} tableRowType={tableRowType} cursorHover={cursorHover} onClick={tableRowOnClick} />
                                )}
                        </tbody>
                    </table> : <div className="w-full py-3 flex justify-center bg-gray-100 dark:bg-subbackground/70 text-gray-700 dark:text-gray-400">{noResults}</div>}
            </div>
            <Pagination currentPage={currentPage} totalCount={totalCount} pageSize={itemsPerPage} onPageChange={page => handlePagination(page)} />
        </TableContext.Provider>
    )
}

interface TableContextInterface<T, Y> {
    data: T[],
    handleData: (updater: ((prev: Y) => Y) | Y) => void,
    handleRefresh: () => void,
};
// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export const TableContext = createContext<TableContextInterface<any,any> | undefined>(undefined);

interface TableRowProps<T> {
    elements: T & { id?: number | string },
    tableRowType?: tableButtonsHandlerTypes
    cursorHover?: boolean
    children?: React.ReactNode, // in case we need to include anything else, not just TableButtons?
    onClick?: React.MouseEventHandler<HTMLTableRowElement>
};

/**
 * Table row for Table component
 * @param {TableType} elements Columns titles
 * @param {boolean} cursorHover Indicates whether row has hover:cursor-pointer added or not
 * @param {React.ReactNode} children Children to include in table - Usually TableButtons
 * @param {React.MouseEventHandler<HTMLTableRowElement>} onClick Event Handler once clicking table row
 */
function TableRow<T>({ elements, tableRowType, cursorHover = false, onClick }: TableRowProps<T>) {
    return (
        <tr className={`bg-subbackground text-gray-700 dark:text-gray-300 ${cursorHover && 'hover:cursor-pointer'}`} onClick={onClick} id={elements.id as string}>
            <td className="px-6 py-4 font-medium text-simple whitespace-nowrap">{Object.entries(elements)[0][1]}</td>
            {Object.entries(elements).slice(1).map((element, i) => {
                if (['from_date', 'to_date', 'start_date', 'end_date'].includes(element[0]))
                    return <td className="px-6 py-4" key={i}>{formatDT(element[1] as string, 'd/M/yyyy')}</td>
                else
                    return <td className="px-6 py-4" key={i}>{element[1]}</td>
            })}
            {tableRowType !== undefined &&
                <td className="px-6 py-4 flex gap-4">
                    <TableButtonsHandler type={tableRowType} element={elements as unknown as TableType} />
                </td>
            }
        </tr>
    )
}

const useTableContext = () => {
    const context = useContext(TableContext);
    return context;
}

interface TableSkeletonProps {
    cols: number
};

/**
 * Table skeleton for Table component
 * @param {number} cols Columns per row
 */
function TableSkeleton({ cols }: TableSkeletonProps) {
    return (
        [...Array(5)].map((_, a) =>
            <tr key={a} className={`bg-subbackground`}>
                {[...Array(cols)].map((_, i) =>
                    <td key={i} className="px-6 py-4">
                        <Skeleton className="w-full h-5 rounded-md" />
                    </td>
                )}
            </tr>
        )
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Table, TableRow, useTableContext }
