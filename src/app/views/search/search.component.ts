import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';
import { SearchService } from '../../services/search.service';
import { App } from '../../app.config';
import { ControlMenu } from '../../layouts/browserControl/browserControl.layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2'
import { IAngularMyDpOptions } from 'angular-mydatepicker';

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

	public myDatePickerOptions: IAngularMyDpOptions = {
		inline: false,
		dateFormat: 'dd/mm/yyyy',
		// height: '100%',
		// selectionTxtFontSize: 'inherit',
		// editableDateField: false,
		// showInputField: true,
		showSelectorArrow: false,
		// openSelectorOnInputClick: true,
	};

	public filter_operator: Array<Select2OptionData>;
	public filter_type: Array<Select2OptionData>;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private service: SearchService) {
		this.result.blogs = this.result.categories = this.result.data = [];
	}

	ngOnInit() {
		this.initSearchForm(this.searchForm);

		this.filter_operator = [
			{
				id: '1',
				text: 'AND',
			},
			{
				id: '2',
				text: 'OR'
			},
			{
				id: '3',
				text: 'NOT'
			}
		];

		this.result.blogs = [
			{
				id: '0',
				text: 'Blog: All'
			}
		];
		this.result.categories = [
			{
				id: '0',
				text: 'Category: All'
			}
		];

		this.filter_type = [
			{
				id: '1',
				text: 'Title'
			},
			{
				id: '2',
				text: 'Article'
			},
			{
				id: '3',
				text: 'Writer'
			},
			{
				id: '4',
				text: 'Title and Article'
			}
		];

		this.isLoading = true;
		this.service.init().subscribe(
			response => {
				this.result.blogs = this.result.blogs.concat(response.blogs);
				this.result.categories = this.result.categories.concat(response.categories);

				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);

		this.loadSearchResult();
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

	changeCity(e, index, x = 0) {
		switch (index) {
			case 0:
				this.searchForm.controls['filter_blog'].setValue(e.value);
				break;
			case 1:
				this.searchForm.controls['filter_category'].setValue(e.value);
				break;
			case 2:
				this.searchForm.controls['filter_date_from'].setValue(e.formatted);
				break;
			case 3:
				this.searchForm.controls['filter_date_to'].setValue(e.formatted);
				break;
			case 4:
				this.searchForm.controls['searchRows']
					.controls[x]
					.controls['filter_type']
					.setValue(e.value);
				break;
			case 5:
				this.searchForm.controls['searchRows']
					.controls[x]
					.controls['filter_operator']
					.setValue(e.value);
				break;
		}
	}

	onSearch(form: FormGroup): void {
		return this.loadSearchResult(this.searchForm.value);
	}

	loadSearchResult(options?: any) {

		this.isLoading = true;

		const params: object = (typeof options === 'object') ? options : {};
		const queryParams = this.route.queryParams;

		queryParams.subscribe(qParam => {
			if (typeof options === 'object' && options['page'] !== 'undefined') {
				this.router.navigate([], { queryParams: { page: options['page'] } });
			} else {
				Object.keys(qParam).forEach(qParamKey => {
					params[qParamKey] = qParam[qParamKey];
				});
			}
		});

		this.service.search(params).subscribe(
			response => {
				if (response !== null) {
					App.__success(response);
					if (response.hasOwnProperty('data')) {
						this.result.data = response.data;
					}
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
