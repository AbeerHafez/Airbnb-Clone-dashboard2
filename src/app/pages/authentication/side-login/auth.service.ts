// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';

interface JwtToken {
  role: string; // Adjust this based on your token structure
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private tokenKey = 'token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn = this.isLoggedInSubject.asObservable();
  userRole: string | null = null;

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.setUserRole(token);
    }
  }

  login(credentials: { email: any; password: any }) {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        console.log(response.access_token)
        this.setToken(response.access_token);
        this.setUserRole(response.access_token);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout() {
    this.removeToken();
    this.isLoggedInSubject.next(false);
    this.userRole = null;
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  private removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setUserRole(token: string) {
    const decoded: JwtToken = jwtDecode(token);
    this.userRole = decoded.role;
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }
}
