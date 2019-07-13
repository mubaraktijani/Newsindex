import { Directive, OnInit, ElementRef, NgModule, Input } from '@angular/core';
import './../../../vendor/datapicker/bootstrap-datepicker.js';

declare var jQuery: any;

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '[datepicker]'
})

export class DatepickerDirective implements OnInit {

	@Input() private options: object | any = {
		keyboardNavigation: false,
		forceParse: false,
		autoclose: true,
	};

	constructor(private el: ElementRef) { }

	ngOnInit() {
		// Check if i-checks is available
		if (typeof jQuery(this.el.nativeElement).datepicker === 'undefined') {
			throw new Error('Configuration issue: Embedding datepicker.js lib is mandatory');
		}

		jQuery(this.el.nativeElement).datepicker(this.options);
	}

}


@NgModule({
	declarations: [
		DatepickerDirective
	],
	exports: [
		DatepickerDirective
	],
	imports: []
})

export class DatepickerModule { }
