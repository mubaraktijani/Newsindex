import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BrowserService } from '../../services/browser.service';
import { ControlMenu } from '../browserControl/browserControl.layout';
import { HttpParams } from '@angular/common/http';
import { App } from '../../app.config';
import { PageHeaderBreadcrumb } from '../pageHeader/pageHeader.layout';

@Component({
	selector: 'app-browser-layout',
	templateUrl: './browser.layout.html'
})

// tslint:disable:component-class-suffix
export class BrowserLayout implements OnInit {

	@Input() src: string;
	@Input() href: string;
	@Input() controlMenu: Array<ControlMenu> = [];

	_src: string;
	_href: string;

	loading = false;

	data: Array<any> = [];
	pagination: object | any = {};
	navigation: Array<any> = [];
	selected: Array<number> = [];

	routeParams: object | any = {};
	previousRoute: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private service: BrowserService
	) { }

	ngOnInit() {
		this.route.paramMap.subscribe(
			(params: ParamMap) => {
				this._src = this.src;
				this._href = this.href;

				params.keys.forEach(key => {
					this.routeParams[key] = params.get(key);
				});

				if (params.has('one')) {
					const param1 = this.routeParams.one;
					this.browserParams(param1, '?id=' + param1);
				}
				if (params.has('two')) {
					const param1 = this.routeParams.two;
					this.browserParams(param1, '&browse=' + param1);
				}
				if (params.has('three')) {
					const param1 = this.routeParams.three;
					this.browserParams(param1, '&browse_id=' + param1);
				}
				this.loadData();
			}
		);
	}

	browserParams(href: string, src: string): void {
		this._src = (typeof src !== 'undefined') ? this._src + src : src;
		this._href = (typeof href !== 'undefined') ? this._href + '/' + href : href;
	}

	loadData(options?: any) {
		let params = new HttpParams();
		const queryParams = this.route.queryParams;
		const pr = ['page'];

		/*this.route.queryParams.forEach(qParam => {
			const qParamKey = Object.keys(qParam)[0];
			params = params.set(qParamKey, qParam[qParamKey]);
		});*/



		queryParams.subscribe(qParam => {
			Object.keys(qParam).forEach(qParamKey => {
				params = params.set(qParamKey, qParam[qParamKey]);
			});

			if (typeof options === 'object' && options['page'] !== 'undefined') {
				this.router.navigate([], { queryParams: { page: options['page'] } });
			}
		});

		if (typeof options === 'object') {
			for (const key in options) {
				if (options.hasOwnProperty(key)) {
					params = params.set(key, options[key]);
				}
			}
		}

		return this.fetchData(params);
	}

	fetchData(params: HttpParams) {
		this.selected.forEach(x => {
			params = params.append('selected[]', '' + x);
		});

		if (this.src !== undefined) {
			this.loading = true;
			this.service.fetchData(this._src, params).subscribe(
				response => {
					if (response.hasOwnProperty('news')) {
						this.data = response.news.data;
						this.pagination = response.news;

						if (response.hasOwnProperty('bookmarks')) {

							const labels: Array<ControlMenu> = [];
							response.bookmarks.forEach(label => {
								labels.push({ group: 'label', name: label.name, value: label.slug });
							});

							this.controlMenu[3] = {
								group: 'labels',
								name: 'Bookmark as',
								values: labels,
								icon: 'fa-tag',
								showAsAction: true,
								showAsFullWidth: false,
								onClick: (arg) => { this.bookmark(arg); }
							};
						}
					} else if (response.hasOwnProperty('browse')) {
						this.data = [];

						if (response.browse.hasOwnProperty('data')) {
							this.pagination = response.browse;
							this.navigation = response.browse.data;
						} else {
							this.pagination = {};
							this.navigation = response.browse;
						}
					}

					this.loading = false;
				},
				error => {
					App.__error(error);
					this.loading = false;
				}
			);
		}
	}

	bookmark(arg?): void {
		this.loading = true;
		this.service.labelNews({ label: arg.value, selected: arg.selected }).subscribe(
			response => {
				App.__success(response);
				this.loading = false;
			},
			error => {
				App.__error(error);
				this.loading = false;
			}
		);
	}

}
