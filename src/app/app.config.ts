import * as _ from 'underscore';
import 'toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Toastr } from './helpers/toastr.helper';

// const base_url = 'http://localhost/project/newsindex/api';
// const base_url = 'http://api.newsindex.ng';
const base_url = 'http://newsindex.projectsmeter.com/api';

export class Config {
	static APP_NAME = 'Newsindex';
	static BASE_URL = base_url;

	static ERROR_TITLE = 'Oh snap!';
	static SUCCESS_TITLE = 'Oh snap!';

	static IS_FIRST_VISIT_KEY = 'ifv';
	static STORAGE_KEY = 'b_user';
	static TOKEN_KEY = 'b_token';
	static AUTH_HEADER_KEY = 'Authorization';
	static AUTH_HEADER_PREFIX = 'Bearer';

	static SEARCH_RESULT_KEY = 'sphinx_results';

	static WHITE_LIST_DOMAINS = [
		'newsindex.ng',
		'api.newsindex.ng',
		'newsindex.projectsmeter.com',
		'localhost',
		'127.0.0.1',
	];

	static URL = {
		login: base_url + '/auth/login',
		signup: base_url + '/auth/signup',
		logout: base_url + '/auth/logout',
		forgot_password: base_url + '/auth/password-reset',
		reset_password: base_url + '/auth/reset-password',

		users: base_url + '/users',

		news: base_url + '/read',

		home: base_url + '/home',

		alerts: base_url + '/alerts',
		entites: base_url + '/entities',

		subscription: base_url + '/subscription',
		subscriptions: base_url + '/subscriptions',

		label: base_url + '/label',
		labels: base_url + '/labels',

		blogs: base_url + '/blogs',
		categories: base_url + '/categories',
		writers: base_url + '/writers',
		viewed: base_url + '/viewed',

		search: base_url + '/search',
		settings: base_url + '/settings',

		rss: base_url + '/rss'
	};
}

export class App {

	static __isNewUser(): boolean {
		return (localStorage.getItem('landing_page')) ? true : false;
	}

	static __success(response: any): void {
		if (response !== null) {
			let isMessageShown = false;
			const title = Config.SUCCESS_TITLE;

			['success', 'message', 'msg', 'data', 'warning'].forEach((prefix) => {
				if (!isMessageShown && response[prefix]) {
					// Toastr.success(response[prefix], title);
					if (response[prefix].length > 0) {
						Toastr.success(response[prefix]);
					}
					isMessageShown = true;
				} else if (!isMessageShown && typeof response === 'string') {
					Toastr.success(response, title);
					isMessageShown = true;
				}
			});
		}
	}

	static __error(httpError: HttpErrorResponse | string): void {
		if (typeof httpError !== 'string') {
			const error = httpError.error;
			const title = httpError.statusText || Config.ERROR_TITLE;
			const message = httpError.message.split(':')[0];
			let isErrorShown = false;

			['error', 'warning'].forEach((prefix) => {
				if (!isErrorShown && error.hasOwnProperty(prefix)) {
					Toastr.error(error[prefix], title);
					isErrorShown = true;
				} else if (!isErrorShown) {
					Toastr.error(message, title);
					isErrorShown = true;
				}
			});
		} else {
			Toastr.error(httpError, Config.ERROR_TITLE);
		}
	}

	static __replace(input: string, find: string = ' ', replace: string = '-'): string {
		return input.replace(new RegExp(find, 'g'), replace).toLowerCase();
	}
}
