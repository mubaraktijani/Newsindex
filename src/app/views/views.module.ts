import { LayoutsModule } from './../layouts/layouts.module';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// https://alligator.io/angular/chartjs-ng2-charts/
// Chart.js Angular 2 Directive by Valor Software (npm)
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { FlotChartModule } from './../directives/charts/flotChart';
import { IboxtoolsModule } from './../layouts/iboxtools/iboxtools.layout';
import { PeityModule } from './../directives/charts/peity';
import { SparklineModule } from './../directives/charts/sparkline';
import { JVectorMapModule } from './../directives/maps/jvectorMap';
import { ICheckModule } from 'src/app/directives/icheck.directive';
import { ChosenModule } from 'src/app/directives/chosen.directive';
import { Select2Module } from '../directives/select2.directive';
import { DatepickerModule } from 'src/app/directives/datepicker.directive';
import { JQWCloudModule } from 'src/app/directives/jqwcloud.directive';
import { SVG3DTagCloudModule } from 'src/app/directives/svg3dtagcloud.directive';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PricingComponent } from './auth/pricing/pricing.component';
import { HomeComponent } from './home/home.component';
import { TagcloudComponent } from './tagcloud/tagcloud.component';
import { AlertsComponent } from './alerts/alerts.component';
import { EntitiesComponent } from './entities/entities.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { LabelsComponent } from './labels/labels.component';
import { BlogsComponent } from './blogs/blogs.component';
import { CategoriesComponent } from './categories/categories.component';
import { WritersComponent } from './writers/writers.component';
import { ViewedComponent } from './viewed/viewed.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { ReadNewsComponent } from './readNews/readNews.component';
import { UsersComponent } from './users/users.component';

@NgModule({
	declarations: [
		AppComponent,
		IndexComponent,
		LoginComponent,
		SignupComponent,
		PricingComponent,
		HomeComponent,
		TagcloudComponent,
		AlertsComponent,
		EntitiesComponent,
		SubscriptionComponent,
		LabelsComponent,
		BlogsComponent,
		CategoriesComponent,
		WritersComponent,
		ViewedComponent,
		SearchComponent,
		SettingsComponent,
		ReadNewsComponent,
		UsersComponent,
	],
	imports: [
		LayoutsModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		HttpClientModule, // required http-client module for [jwt-auth, NgProgressModule]
		BrowserAnimationsModule, // required animations module for [toastr, material.angular]
		RouterModule,

		ChartsModule,
		FlotChartModule,
		IboxtoolsModule,
		PeityModule,
		SparklineModule,
		JVectorMapModule,
		ICheckModule,
		ChosenModule,
		Select2Module,
		DatepickerModule,
		JQWCloudModule,
		SVG3DTagCloudModule,
	],
	exports: [
	]
})

export class ViewsModule { }
