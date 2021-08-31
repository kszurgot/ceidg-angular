import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Tokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedUser: string;

  constructor(private http: HttpClient) {
    this.loggedIn.next(!!this.getJwtToken());
  }

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true)
      )
  }

  logout() {
    this.doLogoutUser();
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/token/refresh`, {
      'refresh_token': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.token);
    }));
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getJwtToken() {
    return sessionStorage.getItem(this.JWT_TOKEN);
  }

  private getRefreshToken() {
    return sessionStorage.getItem(this.REFRESH_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.loggedIn.next(true);
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.loggedIn.next(false);
    this.removeTokens();
  }

  private storeTokens(tokens: Tokens) {
    sessionStorage.setItem(this.JWT_TOKEN, tokens.token);
    sessionStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  private storeJwtToken(jwt: string) {
    sessionStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private removeTokens() {
    sessionStorage.removeItem(this.JWT_TOKEN);
    sessionStorage.removeItem(this.REFRESH_TOKEN);
  }
}
