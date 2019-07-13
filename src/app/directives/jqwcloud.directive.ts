import {
	Directive,
	ElementRef,
	NgModule,
	OnInit,
	Input,
	Output,
	OnChanges,
	SimpleChanges,
	EventEmitter
} from '@angular/core';
import './../../../vendor/jQWCloud/jQWCloudv3.1.js';

declare var jQuery: any;

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '[jQWCloud]'
})

export class JQWCloudDirective implements OnInit, OnChanges {

	@Input() options: JQWCloudOptions = {};
	@Input() data: Array<JQWCloudData> = [];
	@Output() ifClicked: EventEmitter<any> = new EventEmitter<any>();

	constructor(public el: ElementRef) {
		this.options = {
			// title
			title: 'JQ WOrd Cloud',

			// min/max font size
			minFont: 8,
			maxFont: 30,
			// font offset
			fontOffset: 4,

			// font family
			// cloud_font_family: 'Owned',

			// shows the algorithm of creating the word cloud
			showSpaceDIV: false,

			// Enables the vertical alignment of words
			verticalEnabled: true,

			// color
			cloud_color: null,

			// color of covering divs
			spaceDIVColor: null,

			// left padding of words
			padding_left: 2,

			// classes with space to be applied on each word
			word_common_classes: null,

			word_mouseEnter: function () {
				jQuery(this).css('text-decoration', 'underline');
			},
			word_mouseOut: function () {
				jQuery(this).css('text-decoration', 'none');
			}
		};
	}

	ngOnInit() {
		this.build();
	}

	ngOnChanges(attr: SimpleChanges) {
		if (Object.keys(attr).indexOf('data') !== -1) {
			if (attr.data.firstChange) { return; }
			if (attr.data.currentValue) {
				this.build();
				return;
			}
		}
	}

	build() {
		if (this.data !== undefined && this.data.length > 0) {
			const ifClicked = this.ifClicked;
			this.options.words = this.data;
			this.options.word_click = function (wordCloud) {
				ifClicked.emit(wordCloud.data);
			};

			// Check if select2 is available
			if (typeof jQuery(this.el.nativeElement).jQWCloud === 'undefined') {
				throw new Error('Configuration issue: Embedding jQWCloud.js lib is mandatory');
			}

			jQuery(this.el.nativeElement).jQWCloud(this.options);

		}
	}

}

export interface JQWCloudData {
	word?: string;
	weight?: number;
	color?: string;
	word_class?: string;
	font_family?: string;
	link?: string;
	slug?: string;
}

export interface JQWCloudOptions {
	title?: string;
	words?: JQWCloudData[];
	minFont?: number;
	maxFont?: number;
	fontOffset?: number;
	showSpaceDIV?: boolean;
	verticalEnabled?: boolean;
	cloud_color?: string;
	cloud_font_family?: string;
	spaceDIVColor?: string;
	padding_left?: number;
	word_common_classes?: string;
	word_click?: (wordCloud) => any;
	word_mouseOver?: () => any;
	word_mouseEnter?: () => any;
	word_mouseOut?: () => any;
	beforeCloudRender?: () => any;
	afterCloudRender?: () => any;
}

@NgModule({
	declarations: [
		JQWCloudDirective
	],
	exports: [
		JQWCloudDirective
	],
	imports: []
})

export class JQWCloudModule { }
