import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '../../../helpers/auth.helper';
import { App } from '../../../app.config';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

	isLoading = false;
	date: Date = new Date();
	signupForm: FormGroup | any;

	constructor(
		private formBuilder: FormBuilder,
		private service: AuthService,
		private router: Router
	) { }

	ngOnInit() {
		this.signupForm = this.formBuilder.group({
			fullname: new FormControl('', Validators.compose([
				Validators.maxLength(25),
				Validators.minLength(3),
				// Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
				Validators.required
			])),
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
	}

	onSignup(signupForm: FormGroup) {
		this.isLoading = true;
		this.service.signup(signupForm.value.fullname, signupForm.value.email, signupForm.value.password).subscribe(
			response => {
				if (Auth.attempt(response.data)) {
					signupForm.reset();
					this.isLoading = false;
					App.__success(response);
					this.router.navigateByUrl('/');
				} else {
					App.__error('Failed to login, access denied!');
					this.isLoading = false;
					Auth.invalidate();
				}
			},
			error => {
				App.__error(error);
				this.isLoading = false;
			}
		);
	}

}
