import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// import { map } from 'rxjs/operators';
import { Config } from '../app.config';

@Injectable()
export class BrowserService {

	constructor(
		private http: HttpClient
	) { }

	fetchData(src: string, params: object | any): Observable<any> {
		return this.http.get(src, { params: params })
			.map((response: Response) => response);
	}

	labelNews(params): Observable<any> {
		return this.http.post(Config.URL.label, params)
			.map((response: Response) => response);
	}

	deleteLabel(params): Observable<any> {
		return this.http.delete(Config.URL.label, { params: params })
			.map((response: Response) => response);
	}

	readNews(id: number): Observable<any> {
		return this.http.get(Config.URL.news + '/' + id)
			.map((response: Response) => response);
	}
}
