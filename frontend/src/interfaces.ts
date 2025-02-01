export interface User {
    username: string,
}

export interface NewUser {
    username: string,
    password: string
}

export interface Note {
    id: number,
    title: string,
    content: string
}