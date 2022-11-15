export class Tweet {
    id: string
    username: string
    text: string
    timestamp: string

    constructor(id: string, username: string, text: string, timestamp: string) {
        this.id = id
        this.username = username
        this.text = text
        this.timestamp = timestamp
    }
}