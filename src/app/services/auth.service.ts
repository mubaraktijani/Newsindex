import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../app.config';
import { Observable } from 'rxjs/Observable';
import { Auth } from 'src/app/helpers/auth.helper';

@Injectable()
export class AuthService {

	constructor(private http: HttpClient) { }

	login(email: string, password: string): Observable<any> {
		return this.http
			.post(Config.URL.login, { email: email, password: password })
			.map((response: Response) => response);
	}

	signup(fullname: string, email: string, password: string): Observable<any> {
		return this.http
			.post(Config.URL.signup, { fullname: fullname, email: email, password: password })
			.map((response: Response) => response);
	}

	logout(): Observable<any> {
		return this.http.get(Config.URL.logout)
			.map((response: Response) => response);
		// .do(response => Auth.invalidate());
	}

	authorized(permission_key: string, permission_action: string = ''): boolean {
		permission_action = permission_action.toUpperCase();
		if (Auth.user().hasOwnProperty('permissions') && Auth.user().permissions[permission_key]) {
			const permission = Auth.user().permissions[permission_key];

			if (permission_action !== '') {
				if (permission_action === 'CREATE') {
					return permission['create'];

				} else if (permission_action === 'UPDATE') {
					return permission['update'];

				} else if (permission_action === 'DELETE') {
					return permission['delete'];

				} else if (permission_action === 'READ') {
					return permission['read'];
				}
			} else {
				if (permission['create'] || permission['update'] || permission['delete'] || permission['read']) {
					return true;
				}
			}
		}
		return false;
	}
}
