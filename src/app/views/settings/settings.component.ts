import { LabelsComponent } from './../labels/labels.component';
import { Component, OnInit } from '@angular/core';
import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';
import { detectBody } from '../../app.helpers';
import { SettingsService } from '../../services/settings.service';
import { App, Config } from '../../app.config';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Auth } from 'src/app/helpers/auth.helper';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

	title = 'Settings';
	href = '/settings';
	isLoading = false;
	tabs: Array<SettingsTab> = [];
	settings: SettingsData = {};
	page_header_breadcrumb: Array<PageHeaderBreadcrumb> = [{ title: 'Settings', router: this.href }];
	user: object | any = Auth.user();
	alertForm: FormGroup | any;
	bookmarkForm: FormGroup | any;

	constructor(
		private formBuilder: FormBuilder,
		private service: SettingsService
	) { }

	ngOnInit() {
		this.initTabs();
		this.alertForm = this.formBuilder.group({
			alert_title: null,
			alert_source: 1,
			alert_title_filter: new FormControl(true),
		});

		this.bookmarkForm = this.formBuilder.group({
			name: null
		});

		this.isLoading = true;
		this.service.init().subscribe(
			response => {
				this.settings = response;
				for (let index = 0; index < this.settings.bookmarks.browse.length; index++) {
					const element = this.settings.bookmarks.browse[index];
					element.hint = Config.URL.rss + '/' + this.user.id + '/' + element.slug;
				}
				for (let index = 0; index < this.settings.alerts.browse.length; index++) {
					const element = this.settings.alerts.browse[index];
					element.hint = (element.hint) ? 'title only' : 'not title only';
				}
				this.initTabs();
				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);
	}

	initTabs() {
		const alerts = this.settings.alerts || {};
		const blogs = this.settings.blogs || {};
		const bookmarks = this.settings.bookmarks || {};
		const categories = this.settings.categories || {};
		const writers = this.settings.writers || {};

		this.tabs = [
			{
				icon: 'fa-newspaper-o',
				name: 'Blogs',
				title: 'Subscribed Blogs',
				desc: 'Subscribe to the Blogs you follow regularly',
				modalTitle: 'Add New Blog',
				modalDesc: '',
				data: blogs,
				active: true,
				editable: true
			},
			{
				icon: 'fa-tags',
				name: 'Categories',
				title: 'Subscribed Categories',
				desc: 'Subscribe to the Categories you follow regularly',
				modalTitle: 'Add New Category',
				modalDesc: '',
				data: categories,
				editable: true
			},
			{
				icon: 'fa-users',
				name: 'Writers',
				title: 'Subscribed Writers',
				desc: 'Subscribe to the Writers you follow regularly',
				modalTitle: 'Add New Writer',
				modalDesc: '',
				data: writers,
			},
			{
				icon: 'fa-bell',
				name: 'Alerts',
				title: 'My Alerts',
				desc: 'Monitor the web for interesting new content',
				modalTitle: 'Add New Alert',
				modalDesc: '',
				data: alerts,
				ngContent: true,
				modalOnSaveEvent: () => this.saveAlert(),
				onDeleteEvent: (event: number) => this.onDeleteAlert(event)
			},
			{
				icon: 'fa-bookmark',
				name: 'Bookmarks',
				title: 'My Bookmarks',
				desc: 'Create Bookmark categories like <b>important</b>, <b>Fake</b>...',
				modalTitle: 'Add New Bookmark',
				modalDesc: '',
				data: bookmarks,
				ngContent: true,
				modalOnSaveEvent: () => this.saveBookmark(),
				onDeleteEvent: (id: number) => this.deleteBookmark(id)
			}
		];
	}

	saveAlert() {
		this.isLoading = true;
		const form = this.alertForm;

		this.service.saveAlert(form.value.alert_title, form.value.alert_source, form.value.alert_title_filter).subscribe(
			response => {
				form.reset();
				this.settings.alerts.browse.push(response.data);
				this.initTabs();
				App.__success(response);
				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);
	}

	onDeleteAlert(index: number) {
		this.isLoading = true;

		const id = this.settings.alerts.browse[index].id;

		this.service.deleteAlert(id).subscribe(
			response => {
				this.settings.alerts.browse.splice(index, 1);
				this.initTabs();
				App.__success(response);
				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);
	}

	saveBookmark() {
		this.isLoading = true;
		const form = this.bookmarkForm;

		this.service.saveBookmark(form.value.name).subscribe(
			response => {
				form.reset();
				const element = response.data;
				element.hint = Config.BOOKMARK_BASE_URL + this.user.uuid + '/' + element.slug;
				this.settings.bookmarks.browse.push(element);
				this.initTabs();
				App.__success(response);
				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);
	}

	deleteBookmark(index: number) {
		const id = this.settings.bookmarks.browse[index].id;
		this.isLoading = true;

		this.service.deleteBookmark(id).subscribe(
			response => {
				this.settings.bookmarks.browse.splice(index, 1);
				this.initTabs();
				App.__success(response);
				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);
	}
}

interface SettingsData {
	blogs?: SettingsDataSub;
	alerts?: SettingsDataSub;
	bookmarks?: SettingsDataSub;
	categories?: SettingsDataSub;
	writers?: SettingsDataSub;
}

interface SettingsDataSub {
	browse?: Array<any>;
	list?: Array<any>;
}

interface SettingsTab {
	icon: string;
	name: string;
	title: string;
	desc: string;
	modalTitle: string;
	modalDesc: string;
	data: object | Array<any>;
	editable?: boolean;
	ngContent?: boolean;
	active?: boolean;
	modalOnSaveEvent?: (event: any) => any;
	onDeleteEvent?: (event: any) => any;
}
