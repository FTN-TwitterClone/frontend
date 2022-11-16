export class Tweet {
    id: string
    username: string
    text: string
    timestamp: string
    liked_by_me: boolean
    likes_count: number

    constructor(id: string, username: string, text: string, timestamp: string, liked_by_me:boolean, likes_count: number) {
        this.id = id
        this.username = username
        this.text = text
        this.timestamp = timestamp
        this.liked_by_me = liked_by_me
        this.likes_count = likes_count
    }
}