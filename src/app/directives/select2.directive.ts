import { Directive, Input, ElementRef, NgModule, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import './../../../vendor/select2/select2.full.js';

declare var jQuery: any;

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: 'select[select2]'
})

export class Select2Directive implements OnInit, OnChanges {

	@Input() private placeholder = '';
	@Input() private search = false;
	@Input() private options: object | any = {
		width: '100%',
		allowClear: false
	};

	constructor(public el: ElementRef) { }

	ngOnInit() {
		this.options.placeholder = this.placeholder;
		if (!this.search) { this.options.minimumResultsForSearch = Infinity; }

		// Check if select2 is available
		if (typeof jQuery(this.el.nativeElement).select2 === 'undefined') {
			throw new Error('Configuration issue: Embedding select2.js lib is mandatory');
		}

		jQuery(this.el.nativeElement).select2(this.options);
	}

	ngOnChanges(changes: SimpleChanges) {
		jQuery(this.el.nativeElement).select2(this.options);
	}

}

@NgModule({
	declarations: [
		Select2Directive
	],
	exports: [
		Select2Directive
	],
	imports: []
})

export class AppSelect2Module { }
