import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BrowserService } from '../../services/browser.service';
import { App } from '../../app.config';
import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'app-readNews',
	templateUrl: './readNews.component.html'
})

export class ReadNewsComponent implements OnInit {

	id: number;
	data: object | any = {};
	title: string;
	isLoading = false;
	breadcrumb: Array<PageHeaderBreadcrumb> = [];

	constructor(private route: ActivatedRoute, private service: BrowserService, private location: Location) {
		// console.log(this.location.back());
	}

	ngOnInit() {
		this.id = this.route.snapshot.params.id;
		this.title = 'News';
		this.breadcrumb.push({ title: 'Go Back', router: '' });

		this.isLoading = true;
		this.service.readNews(this.id).subscribe(
			response => {
				this.data = response.data;
				this.title = this.data.title;
				this.breadcrumb.push({ title: this.title, router: '' });
				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
				// this.location.back();
			}
		);
	}

}
