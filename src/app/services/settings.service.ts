import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from './../app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingsService {

	constructor(private http: HttpClient) { }

	init(): Observable<any> {
		return this.http.get(Config.URL.settings)
			.map((response: Response) => response);
	}

	get(id: number, type: number): Observable<any> {

		const params = new HttpParams().set('id', '' + id).set('type', '' + type);

		return this.http.get(Config.URL.settings + '/edit', { params: params })
			.map((response: Response) => response);
	}

	save(formData: FormData): Observable<any> {
		return this.http.post(Config.URL.settings, formData)
			.map((response: Response) => response);
	}

	update(formData: FormData): Observable<any> {
		return this.http.put(Config.URL.settings, formData)
			.map((response: Response) => response);
	}

	delete(id: number, type: number): Observable<any> {
		const params = new HttpParams().set('id', '' + id).set('type', '' + type);

		return this.http.delete(Config.URL.settings, { params: params })
			.map((response: Response) => response);
	}

	saveAlert(title: string, source: number, title_filter: boolean): Observable<any> {
		const params = new HttpParams().set('title', title)
			.set('source', '' + source)
			.set('title_filter', '' + title_filter);

		return this.http.post(Config.URL.settings + '/alert', params)
			.map((response: Response) => response);
	}

	deleteAlert(id: number): Observable<any> {
		return this.http.delete(Config.URL.settings + '/alert/' + id)
			.map((response: Response) => response);
	}

	saveBookmark(name: string): Observable<any> {
		return this.http.post(Config.URL.settings + '/bookmark', new HttpParams().set('name', name))
			.map((response: Response) => response);
	}

	deleteBookmark(id: number): Observable<any> {
		return this.http.delete(Config.URL.settings + '/bookmark/' + id)
			.map((response: Response) => response);
	}
}
