export class TargetGroup {
    town: string
    gender: string
    minAge: number
    maxAge: number

    constructor(town: string, gender: string, minAge: number, maxAge: number) {
        this.town = town
        this.gender = gender
        this.minAge = minAge
        this.maxAge = maxAge
    }
}