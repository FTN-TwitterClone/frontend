export class Tweet {
    id: string
    username: string
    text: string
    timestamp: string
    likedByMe: boolean
    likesCount: number

    constructor(id: string, username: string, text: string, timestamp: string, likedByMe: boolean, likesCount: number) {
        this.id = id
        this.username = username
        this.text = text
        this.timestamp = timestamp
        this.likedByMe = likedByMe
        this.likesCount = likesCount
    }
}