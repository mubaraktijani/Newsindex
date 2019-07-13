import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class RouterService {

	private _previousUrl: string;
	private _currentUrl: string;

	constructor(private router: Router) {
		this._currentUrl = this.router.url;
		router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this._previousUrl = this._currentUrl;
				this._currentUrl = event.url;
				console.log(this._previousUrl);
			}
		});
	}

	public getPreviousUrl() {
		return this._previousUrl;
	}
}
