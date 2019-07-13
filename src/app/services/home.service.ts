import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../app.config';

@Injectable()
export class HomeService {
	constructor(private http: HttpClient) { }

	init(): Observable<any> {
		return this.http.get(Config.URL.home)
			.map((response: Response) => response);
	}
}
