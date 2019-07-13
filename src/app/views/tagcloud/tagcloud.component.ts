import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControlMenu } from '../../layouts/browserControl/browserControl.layout';
import { SearchService } from '../../services/search.service';
import { App } from '../../app.config';

@Component({
	selector: 'app-tagcloud',
	templateUrl: './tagcloud.component.html'
})
export class TagcloudComponent implements OnInit {

	tag: string;
	title = 'Search';
	isLoading = false;
	response: object | any = {};
	controlMenu: Array<ControlMenu> = [];
	breadcrumb: Array<PageHeaderBreadcrumb> = [{ title: this.title, router: 'Tags' }];

	constructor(private route: ActivatedRoute, private service: SearchService) { }

	ngOnInit() {
		this.tag = this.route.snapshot.params.tag;
		if (this.tag !== undefined) {
			this.breadcrumb.push({ title: this.tag, router: '' });
			this.onSearch();
		}
	}

	onSearch(options?: any): void {
		if (this.tag !== undefined) {
			this.isLoading = true;

			const formData = new FormData();

			formData.append('filter_blog', '0');
			formData.append('filter_category', '0');

			formData.append('filter_date_from', null);
			formData.append('filter_date_to', null);

			formData.append('filter[]', this.tag);
			formData.append('filter_type[]', '1');

			this.service.search(formData).subscribe(
				response => {
					App.__success(response);
					if (response.hasOwnProperty('data')) {
						this.response = response.data;
					}
					this.isLoading = false;
				},
				error => {
					App.__error(error);
					this.isLoading = false;
				}
			);
		}
	}

}
