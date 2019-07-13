import { Component, OnInit } from '@angular/core';
import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';
import { Config } from '../../app.config';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-alerts',
	templateUrl: './alerts.component.html'
})

export class AlertsComponent implements OnInit {

	title = 'My Alerts';
	href = '/alerts';
	src: string = Config.URL.alerts;
	page_header_breadcrumb: Array<PageHeaderBreadcrumb> = [{ title: 'Alerts', router: this.href }];

	constructor() { }

	ngOnInit() { }

}
