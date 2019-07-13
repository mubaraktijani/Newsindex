import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';
import { SearchService } from '../../services/search.service';
import { App } from '../../app.config';
import { ControlMenu } from '../../layouts/browserControl/browserControl.layout';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

	title = 'Search';
	result: SearchResult | any = {};
	isLoading = false;
	searchForm: FormGroup | any;
	searchFormData: FormData = new FormData();
	controlMenu: Array<ControlMenu> = [];
	page_header_breadcrumb: Array<PageHeaderBreadcrumb> = [{ title: this.title, router: 'search' }];

	constructor(private formBuilder: FormBuilder, private service: SearchService) {
		this.result.blogs = this.result.categories = this.result.data = [];
	}

	ngOnInit() {
		this.initSearchForm(this.searchForm);

		this.isLoading = true;
		this.service.init().subscribe(
			response => {
				this.result.blogs = response.blogs;
				this.result.categories = response.categories;
				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);
	}

	initSearchForm(form?: FormGroup): void {
		this.searchForm = this.formBuilder.group({
			filter_blog: 0,
			filter_category: 0,
			filter_tag: 0,
			filter_date_from: null,
			filter_date_to: null,
			searchRows: this.formBuilder.array([this.initSearchRows()]) // here
		});
	}

	initSearchRows() {
		return this.formBuilder.group({
			filter: [],
			filter_type: [1],
			filter_operator: [1],
		});
	}

	addFilter() {
		// control refers to your formarray
		const control = <FormArray>this.searchForm.controls['searchRows'];
		// add new formgroup
		control.push(this.initSearchRows());
	}

	deleteFilter(index: number) {
		// control refers to your formarray
		const control = <FormArray>this.searchForm.controls['searchRows'];
		// remove the chosen row
		control.removeAt(index);
	}

	onSearch(form: FormGroup): void {
		this.searchFormData = new FormData();

		this.searchFormData.append('filter_blog', form.value.filter_blog);
		this.searchFormData.append('filter_category', form.value.filter_category);
		this.searchFormData.append('filter_tag', form.value.filter_tag);

		this.searchFormData.append('filter_date_from', form.value.filter_date_from);
		this.searchFormData.append('filter_date_to', form.value.filter_date_to);

		form.value.searchRows.forEach(searchRow => {
			this.searchFormData.append('filter[]', searchRow.filter);
			this.searchFormData.append('filter_type[]', searchRow.filter_type);
			this.searchFormData.append('filter_operator[]', searchRow.filter_operator);
		});

		this.loadSearchResult();
	}

	loadSearchResult(options?: any) {

		this.isLoading = true;

		const params = (typeof options === 'object') ? options : {};
		console.log(params);

		if (typeof options === 'object') {
			for (const key in options) {
				if (options.hasOwnProperty(key)) {
					this.searchFormData.set(key, options[key]);
				}
			}
		}

		this.service.search(this.searchFormData).subscribe(
			response => {
				App.__success(response);
				if (response.hasOwnProperty('data')) {
					this.result.data = response.data;
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

interface SearchResult {
	blogs: Array<any>;
	categories: Array<any>;
	data: object;
}
