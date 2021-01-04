import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from './../app.config';

@Injectable()
export class SearchService {

	constructor(private http: HttpClient) { }

	init(): Observable<any> {
		return this.http.get(Config.URL.search)
			.map((response: Response) => response);
	}

	search(filters: FormData | any): Observable<any> {

		/*if (filters.hasOwnProperty('searchRows')) {
			localStorage.removeItem(Config.SEARCH_RESULT_KEY);
			localStorage.setItem(Config.SEARCH_RESULT_KEY, JSON.stringify(filters));
		}*/

		if (filters.hasOwnProperty('page') && filters.page > 1) {
			const search_term: object = JSON.parse(localStorage.getItem(Config.SEARCH_RESULT_KEY));

			for (const key in search_term) {
				if (search_term.hasOwnProperty(key)) {
					filters[key] = search_term[key];
				}
			}
		}

		return this.http.post(Config.URL.search, filters)
			.map((response: Response | any) => {
				if (response !== null && !response.hasOwnProperty('msg') && filters.hasOwnProperty('searchRows')) {
					localStorage.removeItem(Config.SEARCH_RESULT_KEY);
					localStorage.setItem(Config.SEARCH_RESULT_KEY, JSON.stringify(filters));
				}
				return response;
			});
	}
}
