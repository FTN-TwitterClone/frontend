export class TweetViewTime {
    viewTime: number
    constructor(viewTime: number) {
        this.viewTime = viewTime
    }
}

export class Report {
    tweetId: string
    year: number
    month: number
    day: number
    likesCount: number
    unlikesCount: number
    profileVisits: number
    averageViewTime: number
    constructor(tweetId: string, year: number, month: number, day: number, likesCount: number, unlikesCount: number, profileVisits: number, averageViewTime: number) {
        this.tweetId = tweetId
        this.year = year
        this.month = month
        this.day = day
        this.likesCount = likesCount
        this.unlikesCount = unlikesCount
        this.profileVisits = profileVisits
        this.averageViewTime = averageViewTime
    }
}

export class AdInfo {
    tweetId:string
    postedBy:string
    town:string
    minAge:number
    maxAge:number
    gender:string

    constructor(tweetId:string,postedBy:string,town:string,minAge:number,maxAge:number,gender:string){
        this.tweetId = tweetId
        this.postedBy = postedBy
        this.town = town
        this.minAge = minAge
        this.maxAge = maxAge
        this.gender = gender
    }
}