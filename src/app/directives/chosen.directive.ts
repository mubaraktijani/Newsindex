import { Directive, Input, ElementRef, OnInit, NgModule, OnChanges } from '@angular/core';
import './../../../vendor/chosen/chosen.jquery.js';

declare var jQuery: any;

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: 'select[chosen]'
})

export class ChosenDirective implements OnInit, OnChanges {

	@Input() private update = 0;

	@Input() private options: object | any = {
		width: '100%',
		disable_search: true,
		inherit_select_classes: true,
		no_results_text: 'Oops, nothing found!',
		placeholder_text_multiple: 'Select Some Options',
		placeholder_text_single: 'Select an Option',
	};

	constructor(public el: ElementRef) { }

	ngOnInit() {
		// Check if i-checks is available
		if (typeof jQuery(this.el.nativeElement).chosen === 'undefined') {
			throw new Error('Configuration issue: Embedding chosen.js lib is mandatory');
		}

		jQuery(this.el.nativeElement).chosen(this.options);
		/*jQuery(this.el.nativeElement).on('ifChanged', function (evt, params) {
			console.log('fhhd');
		});*/
		// jQuery(this.el.nativeElement).hide();
	}

	ngOnChanges(attributes?) {
		if (Object.keys(attributes).indexOf('update') !== -1) {
			if (attributes.update.firstChange) { return; }
			if (attributes.update.currentValue) {
				jQuery(this.el.nativeElement).chosen('destroy');
				jQuery(this.el.nativeElement).chosen(this.options);
			}
		}
	}
}

@NgModule({
	declarations: [
		ChosenDirective
	],
	exports: [
		ChosenDirective
	],
	imports: []
})

export class ChosenModule { }
