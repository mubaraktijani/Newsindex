import { TabContentLayout } from './../tab-content/tab-content.layout';
import { Component, AfterContentInit, QueryList, ContentChildren, OnInit } from '@angular/core';

@Component({
	selector: 'app-tab-layout',
	templateUrl: './tab.layout.html'
})

// tslint:disable-next-line:component-class-suffix
export class TabLayout implements OnInit, AfterContentInit {

	@ContentChildren(TabContentLayout)
	tabs: QueryList<TabContentLayout>;

	constructor() { }

	ngOnInit() {
	}

	// contentChildren are set
	ngAfterContentInit() {
		// get all active tabs
		const activeTabs = this.tabs.filter((tab) => tab.active);

		// if there is no active tab set, activate the first
		if (activeTabs.length === 0) {
			this.selectTab(this.tabs.first);
		}
	}

	selectTab(tab: TabContentLayout) {
		// deactivate all tabs
		this.tabs.toArray().forEach((_tab) => _tab.active = false);

		// activate the tab the user has clicked on.
		tab.active = true;
	}
}
