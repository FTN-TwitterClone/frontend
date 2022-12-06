export class Tweet {
    id: string
    originalPostedBy: string
    postedBy: string
    retweet: boolean
    text: string
    timestamp: string
    image: string
    likedByMe: boolean
    likesCount: number

    constructor(id: string, originalPostedBy: string, postedBy: string, retweet: boolean, text: string, timestamp: string, image: string, likedByMe: boolean, likesCount: number) {
        this.id = id
        this.originalPostedBy = originalPostedBy
        this.postedBy = postedBy
        this.retweet = retweet
        this.text = text
        this.timestamp = timestamp
        this.likedByMe = likedByMe
        this.image = image
        this.likesCount = likesCount
    }
}
export class UploadTweet {
    imageId: string
    text: string
    constructor(imageId: string, text: string) {
        this.imageId = imageId
        this.text = text
    }
}