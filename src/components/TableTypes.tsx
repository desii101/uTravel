export interface ClientData {
    id: number,
    name: string,
    phone_number: string
};

export interface TableSearchConfig<T> {
    column: keyof T,
    keyword: string
};

export interface TableSortConfig<T> {
    key: keyof T,
    order: 'asc' | 'desc'
};

export type TableType = ClientData; // | OtherData

export type tableButtonsHandlerTypes = 'clients' | undefined;