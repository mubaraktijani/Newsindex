import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './services/auth.service';
import { Auth } from 'src/app/helpers/auth.helper';
import { Toastr } from 'src/app/helpers/toastr.helper';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Config } from './app.config';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		public jwtHelper: JwtHelperService,
		private router: Router,
	) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		let error: string;
		const isFirstVisit = localStorage.getItem(Config.IS_FIRST_VISIT_KEY) || undefined;

		if (Auth.hasPrivilege()) {
			if (Auth.getToken() && !this.jwtHelper.isTokenExpired(Auth.getToken())) {
				return true;
			}

			error = 'Service timeout!';
		} else {
			error = 'Access Denied!';
		}

		if (isFirstVisit === undefined && state.url !== '/home') {
			this.router.navigate(['/home']);
			return false;
		}

		if (error !== undefined) { Toastr.error(error); }

		Auth.invalidate();

		// not logged in so redirect to login page with the return url
		this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
