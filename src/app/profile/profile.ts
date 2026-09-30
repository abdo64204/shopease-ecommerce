import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { AuthService } from '../service/auth';
import { CartService } from '../service/cart';

@Component({
  imports: [RouterLink, DecimalPipe],
  selector: 'app-profile',
  styleUrl: './profile.scss',
  templateUrl: './profile.html',
})
export class Profile {
  readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  readonly cartCount = this.cartService.cartCount;
  readonly subtotal = this.cartService.subtotal;

  /** First name derived from email local-part: sami.ahmed@… → Sami */
  readonly firstName = computed(() => {
    const email = this.authService.user()?.email ?? '';
    const localPart = email.split('@')[0];          // everything before @
    const firstSegment = localPart.split('.')[0];   // everything before first dot
    return firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
  });
}
