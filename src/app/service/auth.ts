
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  isLoggedIn = signal(false);

  user = signal<any>(null);

  login(user: any) {
    this.user.set(user);
    this.isLoggedIn.set(true);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        'user',
        JSON.stringify(user)
      );
    }

  }

  logout() {
    this.user.set(null);
    this.isLoggedIn.set(false);
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.removeItem('user');
  }
  restoreUser() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }


    const savedUser = localStorage.getItem('user');

    if (savedUser) {

      const user = JSON.parse(savedUser);

      this.user.set(user);

      this.isLoggedIn.set(true);
    }
  }

}