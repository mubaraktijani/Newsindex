import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from './../app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

	constructor(private http: HttpClient) { }

	init(): Observable<any> {
		return this.http.get(Config.URL.users).map((response: Response) => response);
	}
}
