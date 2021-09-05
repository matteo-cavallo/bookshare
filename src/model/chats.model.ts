
export interface Chat{
    bookPost: string
    messages: Message[]
    seller: string
    user: string
}

export interface Message{
    date: string
    message: string
    user: string
}