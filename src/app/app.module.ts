// import { Select2Module } from './directives/select2.directive';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AuthGuard } from './auth.guard';
import { Config } from './app.config';

import { Auth } from 'src/app/helpers/auth.helper';

// https://www.npmjs.com/package/@auth0/angular-jwt
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

import { HomeService } from './services/home.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { BrowserService } from './services/browser.service';
import { SearchService } from './services/search.service';
import { SettingsService } from './services/settings.service';
import { RouterService } from './services/router.service';

import { AppComponent } from './views/app.component';

// App modules/layouts
import { LayoutsModule } from './layouts/layouts.module';

// App modules/views
import { ViewsModule } from 'src/app/views/views.module';

export function getToken() {
	return Auth.getToken();
}

const jwtConf: JwtModuleOptions = {
	config: {
		tokenGetter: getToken,
		whitelistedDomains: Config.WHITE_LIST_DOMAINS,
		throwNoTokenError: false,
		skipWhenExpired: true,
	}
};

@NgModule({
	declarations: [],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		HttpClientModule, // required http-client module for [jwt-auth, NgProgressModule]
		BrowserAnimationsModule, // required animations module for [toastr, material.angular]

		LayoutsModule,
		ViewsModule,

		// JwtModule added
		JwtModule.forRoot(jwtConf),

		routing,
	],
	providers: [
		AuthGuard,
		AuthService,
		UserService,
		HomeService,
		BrowserService,
		SearchService,
		SettingsService,
		RouterService,
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
