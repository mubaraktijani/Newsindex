import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JQWCloudOptions, JQWCloudData } from '../../directives/jqwcloud.directive';
import { HomeService } from '../../services/home.service';
import { AuthService } from '../../services/auth.service';
import { App } from '../../app.config';
import { Auth } from '../../helpers/auth.helper';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
	user = new Auth().user();
	isLoading = false;
	cloudOptions: JQWCloudOptions = {};
	tagCoud: {
		person?: JQWCloudData[]
		organization?: JQWCloudData[]
		others?: JQWCloudData[]
	} = {};

	constructor(private router: Router, public service: HomeService, public auth: AuthService) {

	}

	ngOnInit(): any {
		this.isLoading = true;
		this.service.init().subscribe(
			response => {
				this.tagCoud.person = response.person;
				this.tagCoud.others = response.others;
				this.tagCoud.organization = response.organization;

				this.isLoading = false;
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);
	}

	viewTag(word: JQWCloudData): void {
		this.router.navigateByUrl('/tags/' + word.slug);
	}

}
