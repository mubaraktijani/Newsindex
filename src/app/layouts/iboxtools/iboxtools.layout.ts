import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap';
declare var jQuery: any;

@Component({
	selector: 'app-iboxtools-layout',
	templateUrl: './iboxtools.layout.html'
})

// tslint:disable-next-line:component-class-suffix
export class IboxtoolsLayout implements OnInit {

	constructor() { }

	ngOnInit() { }

	collapse(e): void {
		e.preventDefault();
		const ibox = jQuery(e.target).closest('div.ibox');
		const button = jQuery(e.target).closest('i');
		const content = ibox.children('.ibox-content');
		content.slideToggle(200);
		button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
		ibox.toggleClass('').toggleClass('border-bottom');
		setTimeout(function () {
			ibox.resize();
			ibox.find('[id^=map-]').resize();
		}, 50);

	}

	close(e): void {
		e.preventDefault();
		const content = jQuery(e.target).closest('div.ibox');
		content.remove();
	}



}

@NgModule({
	declarations: [IboxtoolsLayout],
	imports: [BrowserModule, BsDropdownModule.forRoot()],
	exports: [IboxtoolsLayout],
})

export class IboxtoolsModule { }
