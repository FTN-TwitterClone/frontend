import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { FollowRequestResponse } from '../model/FollowRequestResponse.model';
import { JwtUtilsService } from './security/jwt-utils.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient, private jwtUtilsService: JwtUtilsService) { }

  updateProfile(privacy: boolean) {
    return this.http.patch(`${environment.api}/profile/users/me/`, { 'private': privacy })
  }
  getCurrentUser() {
    return this.http.get(`${environment.api}/profile/users/${this.jwtUtilsService.getUsername()}/`)
  }
  getUser(username: string) {
    return this.http.get(`${environment.api}/profile/users/${username}/`)
  }
  getFollowing(username: string) {
    return this.http.get(`${environment.api}/social-graph/following/${username}`)
  }
  getFollowers(username: string) {
    return this.http.get(`${environment.api}/social-graph/followers/${username}`)
  }
  getFollowingCount(username: string) {
    return this.http.get(`${environment.api}/social-graph/following/${username}/count`)
  }
  getFollowersCount(username: string) {
    return this.http.get(`${environment.api}/social-graph/followers/${username}/count`)
  }
  doFollow(username: string) {
    return this.http.post(`${environment.api}/social-graph/follows/${username}`, {})
  }
  doUnfollow(username: string) {
    return this.http.delete(`${environment.api}/social-graph/follows/${username}`)
  }
  getPrivacy(username: string) {
    return this.http.get(`${environment.api}/profile/users/${username}/privacy`)
  }
  getFollowRequests() {
    return this.http.get(`${environment.api}/social-graph/follows-request`)
  }
  acceptRejectRequest(username: string, approved: FollowRequestResponse) {
    return this.http.patch(`${environment.api}/social-graph/follows/${username}`, approved)
  }
  checkIffollowExists(username: string) {
    return this.http.get(`${environment.api}/social-graph/follows/${username}`)
  }
  forgotPassword(username: string) {
    return this.http.put(`${environment.api}/auth/account/${username}/recover/`, {})
  }
  recoverAccount(recoveryId: string, newPassword: string) {
    return this.http.put(`${environment.api}/auth/recover/${recoveryId}/`, { 'password': newPassword })
  }
  changePassword(oldPassword: string, newPassword: string) {
    return this.http.put(`${environment.api}/auth/password/change/`, { 'oldPassword': oldPassword, 'newPassword': newPassword })
  }
}
