import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  username: string;
  email: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null>;
  user$: Observable<User | null>;

  constructor() {
    const storedUser = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.user$ = this.userSubject.asObservable();
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  clearUser(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
