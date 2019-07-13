import {
	Directive,
	Input,
	ElementRef,
	OnInit,
	NgModule,
	OnChanges,
	EventEmitter,
	Output,
	SimpleChanges
} from '@angular/core';

import './../../../vendor/iCheck/icheck.min.js';

declare var jQuery: any;

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: 'input[iCheck]',
})
export class ICheckDirective implements OnInit, OnChanges {


	@Input() value: boolean;

	@Output() ifClicked: EventEmitter<any> = new EventEmitter<any>();
	@Output() ifChanged: EventEmitter<any> = new EventEmitter<any>();

	@Input() private options: object | any = {
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square',
		inheritClass: true,
		increaseArea: '20%',
	};

	constructor(private el: ElementRef) { }

	ngOnInit() {
		const self = this;

		// Check if i-checks is available
		if (typeof jQuery(this.el.nativeElement).iCheck === 'undefined') {
			throw new Error('Configuration issue: Embedding iCheck.js lib is mandatory');
		}

		jQuery(this.el.nativeElement)
			.iCheck(this.options)
			.iCheck('update')
			.on('ifChanged', function (e) {
				self._onchange(e);
			});
	}

	ngOnChanges(attr: SimpleChanges) {
		if (Object.keys(attr).indexOf('value') !== -1) {
			if (attr.value.currentValue) {
				jQuery(this.el.nativeElement).iCheck('check');
				return;
			}
			jQuery(this.el.nativeElement).iCheck('uncheck');
		}
	}

	_onchange(event) {
		this.ifChanged.emit(event);
	}
}

@NgModule({
	declarations: [
		ICheckDirective
	],
	exports: [
		ICheckDirective
	],
	imports: []
})

export class ICheckModule { }
