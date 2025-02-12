export interface User {
    id: number,
    username: string,
    token: string
}

export interface ReceivedNote {
    id: number,
    title: string,
    content: string,
    dateCreated: string
}

export interface NewUser {
    username: string,
    password: string
}

export interface NewNote {
    title: string,
    content: string,
    user_id: number
}