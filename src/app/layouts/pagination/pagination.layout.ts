import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as _ from 'underscore';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
	selector: 'app-pagination-layout',
	templateUrl: './pagination.layout.html'
})

// tslint:disable:no-output-on-prefix
// tslint:disable:component-class-suffix
export class PaginationLayout implements OnInit, OnChanges {

	@Input() data: object | any = {};
	@Input() simpleView: boolean;
	@Output() onPageChanged = new EventEmitter();

	_data: Pagination;

	constructor() { }

	ngOnInit() {
	}

	ngOnChanges() {
		this._data = this.build(this.data);
	}

	setPage(page) {
		this.onPageChanged.emit(page);
	}

	build(data: object | any): Pagination {
		const totalPages = data.last_page;
		const currentPage = data.current_page;
		let startPage: number, endPage: number;

		if (totalPages >= 10) {
			// more than 10 total pages so calculate start and end pages
			if (currentPage <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = currentPage - 5;
				endPage = currentPage + 4;
			}
		} else {
			// less than 10 total pages so show all
			startPage = 1;
			endPage = totalPages;
		}

		return {
			total: data.total,
			perPage: data.per_page,
			currentPage: currentPage,
			totalPages: totalPages,
			nextPageUrl: data.next_page_url,
			prevPageUrl: data.prev_page_url,
			from: data.from,
			to: data.to,
			pages: _.range(startPage, endPage + 1),
		};
	}

}

interface Pagination {
	total: number;
	perPage: number;
	currentPage: number;
	totalPages: number;
	nextPageUrl: string;
	prevPageUrl: string;
	from: number;
	to: number;
	pages: Array<number>;
}
