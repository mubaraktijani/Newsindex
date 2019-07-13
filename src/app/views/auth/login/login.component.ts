import { App } from './../../../app.config';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'toastr';
import { Auth } from 'src/app/helpers/auth.helper';
import { Toastr } from 'src/app/helpers/toastr.helper';

declare var jQuery: any;
declare var toastr: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	loading = false;
	date: Date = new Date();
	returnUrl: string;
	loginForm: FormGroup | any;

	constructor(
		private formBuilder: FormBuilder,
		private auth: AuthService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		// helop from https://angular-templates.io/tutorials/about/angular-forms-and-validations#create-and-validate-forms-in-angular
		this.loginForm = this.formBuilder.group({
			email: new FormControl('', Validators.compose([
				Validators.maxLength(25),
				Validators.minLength(5),
				// Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
				Validators.required
			])),
			password: new FormControl('', Validators.compose([
				Validators.minLength(5),
				Validators.required,
				// this is for the letters (both uppercase and lowercase) and numbers validation
				// Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
			])),
		});

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	onSubmitLogin(loginForm: FormGroup) {
		this.loading = true;
		this.auth.login(loginForm.value.email, loginForm.value.password).subscribe(
			response => {
				if (Auth.attempt(response.data)) {
					loginForm.reset();
					this.loading = false;
					this.router.navigateByUrl(this.returnUrl);
				} else {
					Toastr.error('Failed to login, access denied!');
					this.loading = false;
					Auth.invalidate();
				}
			},
			error => {
				App.__error(error);
				this.loading = false;
			}
		);
	}

}
