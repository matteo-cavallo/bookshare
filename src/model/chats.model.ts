
export interface Chat{
    uid: string
    bookPost: string
    messages: Message[]
    seller: string
    user: string
    lastUpdate: string
}

export interface Message{
    date: string
    message: string
    user: string
}