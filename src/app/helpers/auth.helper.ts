import { Config } from './../app.config';
import { JwtHelperService } from '@auth0/angular-jwt';

export class Auth {

	constructor() { }

	static attempt(credentials): boolean {
		localStorage.setItem(Config.IS_FIRST_VISIT_KEY, '1');
		localStorage.setItem(Config.STORAGE_KEY, JSON.stringify(credentials));
		return Auth.hasPrivilege();
	}

	static isSuperAdmin(): boolean {
		return (Auth.user().role_id === 3) ? true : false;
	}

	static invalidate(): void {
		localStorage.removeItem(Config.STORAGE_KEY);
	}

	static hasPrivilege(): boolean {
		return (Auth.user()) ? true : false;
		// OR
		// return (Auth.user().role) ? true : false;
	}

	static user(): object | any {
		const current_user = JSON.parse(localStorage.getItem(Config.STORAGE_KEY));
		if (current_user) {
			return current_user;
		}
		return {};
	}

	static getToken(): string {
		return Auth.user().token;
	}

	getToken(): string { return Auth.getToken(); }

	user(): object | any { return Auth.user(); }

	isSuperAdmin(): boolean { return Auth.isSuperAdmin(); }

	hasPrivilege(): object | any { return Auth.hasPrivilege(); }

}
