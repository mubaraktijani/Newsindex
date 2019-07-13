import { OnDestroy, OnInit, OnChanges, ElementRef, Input, SimpleChanges, NgModule, Directive } from '@angular/core';

// Import Chart.js library
import './../../../../vendor/flot/jquery.flot.js';
import './../../../../vendor/flot/jquery.flot.tooltip.min.js';
import './../../../../vendor/flot/jquery.flot.spline.js';
import './../../../../vendor/flot/jquery.flot.time.js';
import './../../../../vendor/flot/jquery.flot.resize.js';

declare var jQuery: any;

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: 'div[flotChart]',
	exportAs: 'flot-chart',
	// tslint:disable-next-line:use-host-property-decorator
	host: {
		'(window:resize)': 'onResize()'
	}
})

export class FlotChartDirective implements OnDestroy, OnChanges, OnInit {

	// Properties
	@Input() private  options: any;
	@Input() private  dataset: any;

	public chart: any;
	private element: ElementRef;
	private initFlag = false;

	public constructor(element: ElementRef) {
		this.element = element;
	}

	// Initialise
	public ngOnInit(): any {
		this.initFlag = true;
		if (this.options || this.dataset) {
			this.build();
		}
	}

	// Build
	private build(): any {

		// Clear before rebuild
		this.ngOnDestroy();

		// Check if Flot is available
		if (typeof jQuery.plot === 'undefined') {
			throw new Error('Configuration issue: Embedding jquery.flot.js lib is mandatory');
		}

		// Let's build chart
		this.chart = jQuery.plot(this.element.nativeElement, this.dataset, this.options);
	}

	// Change
	public ngOnChanges(changes: SimpleChanges): void {
		if (this.initFlag) {
			// Check if the changes are in the datasets
			if (changes.hasOwnProperty('dataset')) {
				this.updateChartData(changes['dataset'].currentValue);
			} else {
				// Otherwise rebuild the chart
				this.build();
			}
		}
	}

	// Update
	private updateChartData(newDataValues: any[]): void {
		this.chart.setData(newDataValues);
		this.chart.setupGrid();
		this.chart.draw();
	}

	// Destroy
	public ngOnDestroy(): any {
		if (this.chart) {
			this.chart.shutdown();
			this.chart = void 0;
		}
	}

	// Resize
	public onResize() {
		this.chart.resize();
		this.chart.setupGrid();
		this.chart.draw();
	}

}

@NgModule({
	declarations: [
		FlotChartDirective
	],
	exports: [
		FlotChartDirective
	],
	imports: []
})

export class FlotChartModule { }
