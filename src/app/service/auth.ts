
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export interface AuthUser {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly isLoggedIn = signal(false);

  readonly user = signal<AuthUser | null>(null);

  login(user: AuthUser): void {
    this.user.set(user);
    this.isLoggedIn.set(true);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch {
        // Keep the current session usable if browser storage is unavailable.
      }
    }

  }

  logout(): void {
    this.user.set(null);
    this.isLoggedIn.set(false);
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.removeItem('user');
    } catch {
      // Keep the in-memory session cleared if browser storage is unavailable.
    }
  }
  restoreUser(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }


    try {
      const savedUser: unknown = JSON.parse(localStorage.getItem('user') ?? 'null');
      if (typeof savedUser === 'object' && savedUser !== null &&
          'name' in savedUser && typeof savedUser.name === 'string' &&
          'email' in savedUser && typeof savedUser.email === 'string') {
        this.user.set({ name: savedUser.name, email: savedUser.email });
        this.isLoggedIn.set(true);
      }
    } catch {
      this.user.set(null);
      this.isLoggedIn.set(false);
    }
  }

}
