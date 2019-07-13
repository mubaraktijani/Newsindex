import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { PageHeaderBreadcrumb } from '../../layouts/pageHeader/pageHeader.layout';
import { Config, App } from '../../app.config';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	isLoading = false;
	title = 'Manage Users';
	href = '/users';
	breadcrumb: Array<PageHeaderBreadcrumb> = [
		{ title: this.title, router: this.href },
		{ title: 'Manage', router: this.href }
	];

	users: UserData = { active: [], invited: [], disabled: [] };
	tabs: Array<UsersTab> = [];

	constructor(private service: UserService) { }

	ngOnInit() {
		this.initTabs();

		this.isLoading = true;
		this.service.init().subscribe(
			response => {
				this.users.active = response.active;
				this.users.invited = response.invited;
				this.users.disabled = response.disabled;

				// this.initTabs();
				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);

	}

	initTabs() {
		this.tabs = [
			{
				icon: 'usrr_actv',
				title: 'Active Users',
				data: this.users.active,
				active: true
			},
			{
				icon: 'usrr_invt',
				title: 'Invited Users',
				data: this.users.invited,
				active: false
			},
			{
				icon: 'usrr_disbl',
				title: 'Disabled Users',
				data: this.users.disabled,
				active: false
			}
		];
	}

}

interface UserData {
	active: Array<any>;
	invited: Array<any>;
	disabled: Array<any>;
}

interface UsersTab {
	icon: string;
	title: string;
	data: Array<any>;
	active?: boolean;
}
