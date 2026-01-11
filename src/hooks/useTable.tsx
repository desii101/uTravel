import type { TableSearchConfig, TableSortConfig } from '@/components/TableTypes';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

export function useTable<T>(initSearchConfig: TableSearchConfig<T>, initSortConfig: TableSortConfig<T>) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get('page') as string) || 1);
    const [searchConfig, setSearchConfig] = useState<TableSearchConfig<T>>({ column: searchParams.get('searchBy') as keyof T || initSearchConfig.column, keyword: searchParams.get('search') || initSearchConfig.keyword });
    const [sortConfig, setSortConfig] = useState<TableSortConfig<T>>({ key: searchParams.get('sortBy') as keyof T || initSortConfig.key, order: searchParams.get('order') as ('desc' | 'asc') || initSortConfig.order });
    const handlePagination = (page: number) => {
        setCurrentPage(page);
    };
    const handleSearch = (column: keyof T, keyword: string) => {
        setCurrentPage(1);
        setSearchConfig({ column: column, keyword: keyword });
    };
    const handleSort = (key: keyof T) => {
        setCurrentPage(1);
        setSortConfig(prevSortConfig => {
            const order = prevSortConfig.key === key ? (prevSortConfig.order === 'desc' ? 'asc' : 'desc') : 'asc';  // reset to asc when updating key
            return { key, order };
        });
    };

    const createQueryString = useCallback((queries: { key: string, value: string }[]) => {
        const params = new URLSearchParams(searchParams.toString());
        queries.map(q => q.value ? params.set(q.key, q.value) : params.delete(q.key));
        return params.toString();
    }, [searchParams]);

    useEffect(() => {
        const queries = [
            { key: 'page', value: currentPage as unknown as string },
            { key: 'order', value: sortConfig.order as string },
            { key: 'sortBy', value: sortConfig.key as string },
            { key: 'searchBy', value: searchConfig.column as string },
            { key: 'search', value: searchConfig.keyword }
        ];
        navigate(`${pathname}?${createQueryString(queries)}`);
        // do not re-render on search column change, would cause a useless fetch
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createQueryString, pathname, navigate, currentPage, searchConfig.keyword, sortConfig.key, sortConfig.order]);

    return {
        currentPage,
        searchConfig,
        sortConfig,
        handlePagination,
        handleSearch,
        handleSort
    };
}