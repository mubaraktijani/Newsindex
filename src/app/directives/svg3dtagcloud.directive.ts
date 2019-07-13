import { Directive, Input, ElementRef, NgModule, OnInit } from '@angular/core';
import './../../../vendor/svg3dtagcloud/jquery.svg3dtagcloud.min.js';

declare var jQuery: any;

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '[SVG3DTagCloud]'
})

export class SVG3DTagCloudDirective implements OnInit {

	@Input() options: SVG3DTagCloudOptions = {};
	@Input() data: SVG3DTagCloudData[] = [];

	constructor(public el: ElementRef) {
		this.options = {
			width: 480,
			height: 480,
			radius: '65%',
			radiusMin: 75,
			bgDraw: false,
			bgColor: '#111',
			opacityOver: 1.00,
			opacityOut: 0.05,
			opacitySpeed: 6,
			fov: 800,
			speed: 0,
			fontFamily: 'Oswald, Arial, sans-serif',
			fontSize: '15',
			fontColor: 'red',
			fontWeight: 'normal',
			fontStyle: 'normal',
			fontStretch: 'normal',
			fontToUpperCase: true,
			tooltipFontFamily: 'Oswald, Arial, sans-serif',
			tooltipFontSize: '11',
			tooltipFontColor: '#fff',
			tooltipFontWeight: 'normal',
			tooltipFontStyle: 'normal',
			tooltipFontStretch: 'normal',
			tooltipFontToUpperCase: false,
			tooltipTextAnchor: 'left',
			tooltipDiffX: 0,
			tooltipDiffY: 10
		};
	}

	ngOnInit() {
		if (this.data.length > 0) {
			this.options.entries = this.data;
		}

		// Check if svg3DTagCloud is available
		if (typeof jQuery(this.el.nativeElement).svg3DTagCloud === 'undefined') {
			throw new Error('Configuration issue: Embedding svg3dtagcloud.js lib is mandatory');
		}

		jQuery(this.el.nativeElement).svg3DTagCloud(this.options);
	}

}

export interface SVG3DTagCloudData {
	label?: string;
	tooltip?: string;
	width?: string;
	height?: string;
	image?: string;
	url?: string;
	target?: string;
}

export interface SVG3DTagCloudOptions {
	entries?: SVG3DTagCloudData[];
	width?: number;
	height?: number;
	radius?: string;
	radiusMin?: number;
	bgDraw?: boolean;
	bgColor?: string;
	opacityOver?: number;
	opacityOut?: number;
	opacitySpeed?: number;
	fov?: number;
	speed?: number;
	fontFamily?: string;
	fontSize?: string;
	fontColor?: string;
	fontWeight?: string;
	fontStyle?: string;
	fontStretch?: string;
	fontToUpperCase?: boolean;
	tooltipFontFamily?: string;
	tooltipFontSize?: string;
	tooltipFontColor?: string;
	tooltipFontWeight?: string;
	tooltipFontStyle?: string;
	tooltipFontStretch?: string;
	tooltipFontToUpperCase?: boolean;
	tooltipTextAnchor?: string;
	tooltipDiffX?: number;
	tooltipDiffY?: number;
}

@NgModule({
	declarations: [
		SVG3DTagCloudDirective
	],
	exports: [
		SVG3DTagCloudDirective
	],
	imports: []
})

export class SVG3DTagCloudModule { }
