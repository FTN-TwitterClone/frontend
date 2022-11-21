import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ERole } from '../model/ERole.model';
import { Follow, User } from '../model/User.model';
import { JwtUtilsService } from './security/jwt-utils.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient, private jwtUtilsService: JwtUtilsService) { }

  updateProfile(username: string, privacy: boolean) {
    const form = {
      'username': username,
      'private': privacy
    }
    return this.http.patch(`${environment.api}/profile/users/me/`, form)
  }
  getCurrentUser() {
    return this.http.get(`${environment.api}/profile/users/${this.jwtUtilsService.getUsername()}/`)
  }
  getUser(username: string) {
    return this.http.get(`${environment.api}/profile/users/${username}/`)
  }
  getFollowing(username: string) {
    // return this.http.get(`${environment.api}/social-graph/following/${username}`)
    let user1 = new User('User1', '', '', ERole.REGULAR_USER, true)
    let user2 = new User('User2', '', '', ERole.REGULAR_USER, true)
    let user3 = new User('User3', '', '', ERole.REGULAR_USER, true)
    return [user1, user2, user3]
  }
  getFollowers(username: string) {
    // return this.http.get(`${environment.api}/social-graph/followers/${username}`)
    let user1 = new User('User1', '', '', ERole.REGULAR_USER, true)
    let user2 = new User('User2', '', '', ERole.REGULAR_USER, true)
    let user3 = new User('User3', '', '', ERole.REGULAR_USER, true)
    return [user1, user2, user3]
  }
  getFollowingCount(username: string) {
    // return this.http.get(`${environment.api}/social-graph/following/${username}/count`)
    return 3
  }
  getFollowersCount(username: string) {
    // return this.http.get(`${environment.api}/social-graph/followers/${username}/count`)
    return 3
  }
  doFollow(username: string) {
    let follows: Follow = new Follow(this.jwtUtilsService.getUsername(), username)
    const json = {
      "from": {
        "username": follows.from
      },
      "to": {
        "username": follows.to
      }
    }
    console.log(JSON.stringify(json))
    return this.http.post(`${environment.api}/social-graph/follows`, json)
  }
  doUnfollow(username: string) {
    let follows: Follow = new Follow(this.jwtUtilsService.getUsername(), username)
    const json = {
      "from": {
        "username": follows.from
      },
      "to": {
        "username": follows.to
      }
    }
    return this.http.delete(`${environment.api}/social-graph/follows`, { body: json })
  }
  getPrivacy(username: string) {
    return this.http.get(`${environment.api}/profile/users/${username}/privacy`)
  }
}
