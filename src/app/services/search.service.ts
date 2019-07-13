import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from './../app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

	constructor(private http: HttpClient) { }

	init(): Observable<any> {
		return this.http.get(Config.URL.search)
			.map((response: Response) => response);
	}

	search(filters: FormData): Observable<any> {
		return this.http.post(Config.URL.search, filters)
			.map((response: Response) => response);
	}
}
