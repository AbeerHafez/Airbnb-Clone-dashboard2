import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding">
      <a [routerLink]="['/']">
        <img
          src="./assets/images/svgs/Airbnb-Logo-full.svg"
          class="align-middle m-2"
          alt="logo"
          width="150"
        />

      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
