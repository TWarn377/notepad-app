export interface Note {
    id: number,
    title: string,
    note: string,
    categories: string[],
    date_created: Date,
    date_modified: Date,
    reminder?: Date,
    type: string,
    shared_users: number[],
    shared: boolean,
    owner: string
}

export interface NewNote {
    id?: number,
    title: string,
    note: string,
    categories: string[],
    date_created: Date,
    date_modified: Date,
    reminder?: Date,
    type: string,
    shared_users: number[],
    owner: string;
}