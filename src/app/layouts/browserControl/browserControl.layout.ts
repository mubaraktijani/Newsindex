import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// tslint:disable:component-selector
@Component({
	selector: 'app-browserControl-layout',
	templateUrl: './browserControl.layout.html'
})

// tslint:disable:no-output-on-prefix
// tslint:disable:component-class-suffix
export class BrowserControlLayout implements OnInit {

	@Input() data: Array<any> = [];
	@Input() selected: Array<number> = [];
	@Input() pagination: object | any = {};
	@Input() controlMenu: Array<ControlMenu> = [];

	@Output() onControlItemClicked = new EventEmitter();

	isAllSelected: boolean;
	selectedAction: object = {};

	constructor() { }

	ngOnInit() {

		this.controlMenu[0] = {
			group: 'start_with',
			showAsAction: true,
			showAsFullWidth: true,
			name: 'start_with',
			values: [
				'A-Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
				'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			]
		};

		this.controlMenu[1] = {
			group: 'actions',
			name: 'Sort',
			showAsAction: true,
			showAsFullWidth: false,
			icon: 'fa-cog',
			values: [
				{ group: 'order', name: 'Ascending', value: 'ASC' },
				{ group: 'order', name: 'Descending', value: 'DESC' }
			]
		};
	}

	setPage(page) {
		this.selectedAction['page'] = page;
		this.onControlItemClicked.emit(this.selectedAction);
		return true;
	}

	selectAll() {
		// this.data.forEach(x => x.state = ev.target.checked);
		if (!this.isAllSelected) {
			this.selected = [];
			this.data.forEach(x => {
				this.selected.push(x.news_id);
				x.state = true;
			});
			this.isAllSelected = true;
		} else {
			this.data.forEach(x => {
				this.selected = [];
				x.state = false;
			});
			this.isAllSelected = false;
		}
	}

	setSelectedAction(index: number, subIndex: number = 0) {
		const action: ControlMenu = this.controlMenu[index];

		if (action.values) {
			const actionSub: any = action.values[subIndex];

			if (typeof actionSub !== 'string' && typeof actionSub !== 'number') {
				this.selectedAction[actionSub.group] = actionSub.value;
			} else {
				this.selectedAction[action.group] = actionSub;
			}

			if (typeof action.onClick !== 'undefined') {
				actionSub.selected = this.selected;
				return action.onClick(actionSub);
			}

			this.onControlItemClicked.emit(this.selectedAction);
		} else {
			if (action.onClick !== undefined) {
				return action.onClick(this.controlMenu);
			}
			this.selectedAction[action.group] = action.value;
			this.onControlItemClicked.emit(this.selectedAction);
		}
	}

	refresh() {
		this.onControlItemClicked.emit(this.selectedAction);
	}

}

export interface ControlMenu {
	group: string;
	name: string;
	value?: string;
	values?: Array<ControlMenu | string | number>;
	icon?: string;
	showAsAction?: boolean;
	showAsFullWidth?: boolean;
	onClick?: (args: any) => any;
	iconOnly?: boolean;
	selected?: boolean;
}
