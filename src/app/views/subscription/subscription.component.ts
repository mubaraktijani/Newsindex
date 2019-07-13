import { Component, OnInit } from '@angular/core';
import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';
import { Config } from '../../app.config';

@Component({
	selector: 'app-subscription',
	templateUrl: './subscription.component.html'
})
export class SubscriptionComponent implements OnInit {

	title = 'Subscriptions';
	href = '/subscription';
	src: string = Config.URL.subscriptions;
	page_header_breadcrumb: Array<PageHeaderBreadcrumb> = [{ title: 'Subscriptions', router: this.href }];

	constructor() { }

	ngOnInit() { }

}
