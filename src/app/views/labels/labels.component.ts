import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/app.config';
import { ControlMenu } from 'src/app/layouts/browserControl/browserControl.layout';
import { PageHeaderBreadcrumb } from 'src/app/layouts/pageHeader/pageHeader.layout';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-labels',
	templateUrl: './labels.component.html'
})
export class LabelsComponent implements OnInit {

	title = 'Bookmarks';
	href = '/bookmarks';
	controlMenu: Array<ControlMenu> = [];
	src: string = Config.URL.labels;
	page_header_breadcrumb: Array<PageHeaderBreadcrumb> = [{ title: 'Bookmarks', router: this.href }];

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		const params = this.route.snapshot.params;

		if (params.one !== undefined) {
			this.controlMenu[10] = {
				group: 'delete',
				name: 'Delete',
				icon: 'fa-trash-o',
				value: params.one,
				showAsAction: false,
				showAsFullWidth: false
			};
		}
	}

}
