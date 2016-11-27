import { Route } from '@angular/router';
import { HomeComponent } from './index';
import { AuthGuardService } from '../core/auth-guard.service';

export const HomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  }
];
