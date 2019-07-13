import { SettingsService } from './../../services/settings.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { detectBody } from '../../app.helpers';
import { App } from '../../app.config';

declare var jQuery: any;

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'app-settingsSubscribe-layout',
	templateUrl: './settingsSubscribe.layout.html',
})

// tslint:disable-next-line:component-class-suffix
export class SettingsSubscribeLayout implements OnInit, OnChanges {

	selected: Array<number> = [];
	modalData: Array<any> = [];
	modalDataTitle: Array<any> = [];
	modalEditItemId = 0;

	@Input() type = 1;
	@Input() desc = 'All clients need to be verified before you can send email and set a project.';
	@Input() title = 'Clients';
	@Input() modalTitle = 'Modal title';
	@Input() modalDesc = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

	@Input() data: any = {} || [];
	@Output() modalOnSaveEvent: EventEmitter<any> = new EventEmitter();
	// tslint:disable-next-line:no-output-on-prefix
	@Output() onDeleteEvent = new EventEmitter();
	@Input() editable = true;
	@Input() ngContent = false;

	isEdit = false;
	isLoading = false;
	modalIsLoading = false;

	constructor(private service: SettingsService) { }

	ngOnInit() { }

	ngOnChanges(attr: SimpleChanges) {
		if (Object.keys(attr).indexOf('data') !== -1) {
			if (attr.data.firstChange) {
				return;
			}
			if (attr.data.currentValue) {
				this.data = attr.data.currentValue;
			}
		}
	}

	getModalTitles() {
		if (this.modalData.length) {
			this.modalDataTitle = [];
			Object.keys(this.modalData[0]).forEach((prefix) => {
				if (prefix !== 'id' && prefix !== 'checked') {
					this.modalDataTitle.push(prefix);
				}
			});
		}
	}

	onSubscribeNew() {
		this.isEdit = false;
		this.modalData = [];

		if (this.data.hasOwnProperty('list')) {
			this.modalData = this.data.list;
			this.getModalTitles();
		}
	}

	onEdit(id: number) {
		this.isEdit = this.isLoading = true;
		this.modalData = [];
		this.modalEditItemId = id;

		this.service.get(this.modalEditItemId, this.type).subscribe(
			response => {
				this.modalData = response.data;
				this.getModalTitles();
				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);
	}

	onDelete(index: number) {
		if (!this.ngContent) {
			this.isLoading = true;
			const id = this.data.subscription[index].id;
			this.service.delete(id, this.type).subscribe(
				response => {
					App.__success(response);
					this.data.subscription.splice(index, 1);
					this.isLoading = false;
				},
				error => {
					App.__error(error);
					this.isLoading = false;
				}
			);
		} else {
			this.onDeleteEvent.emit(index);
		}
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		return this.selected.length === this.modalData.length;
	}

	select(ev, index: number) {
		const id: number = +this.modalData[index].id;
		this.modalData[index].checked = ev.target.checked;

		if (ev.target.checked) {
			this.selected[id] = id;
		} else {
			this.selected.splice(id, 1);
		}
	}

	selectAll(ev) {
		this.modalData.forEach(x => x.checked = ev.target.checked);
		if (ev.target.checked) {
			this.modalData.forEach(x => this.selected[x.id] = x.id);
		} else {
			this.modalData.forEach(x => this.selected = []);
		}
	}

	onSubscribe() {
		this.isLoading = true;
		const formData = new FormData();

		this.selected.forEach((item) => {
			formData.append('items[]', '' + item);
		});
		formData.append('type', '' + this.type);

		this.service.save(formData).subscribe(
			response => {
				App.__success(response);
				this.data = response.data;
				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);
	}

	onUpdate() {
		this.isEdit = this.isLoading = true;

		const formData = new FormData();

		formData.append('id', '' + this.modalEditItemId);
		formData.append('type', '' + this.type);

		this.selected.forEach((item) => {
			formData.append('items[]', '' + item);
		});

		this.service.update(formData).subscribe(
			response => {
				App.__success(response);
				// this.data = response.data;
				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);
	}

	onModalSave() {
		this.modalOnSaveEvent.emit();
	}

}
