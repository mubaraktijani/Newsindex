import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// import { BsDropdownModule } from 'ngx-bootstrap';

import { MainLayout } from './main/main.layout';
import { BlankLayout } from './blank/blank.layout';
import { NavigationLayout } from './navigation/navigation.layout';
import { TopnavbarLayout } from './topnavbar/topnavbar.layout';
import { FooterLayout } from './footer/footer.layout';
import { TopNavigationLayout } from './topNavigation/topNavigation.layout';
import { TopNavigationNavBarLayout } from './topNavigationNavBar/topNavigationNavBar.layout';
import { DashboardLayout } from './dashboard/dashboard.layout';
import { NewsLayout } from './news/news.layout';
import { ICheckModule } from '../directives/icheck.directive';
import { PaginationLayout } from './pagination/pagination.layout';
import { BrowserControlLayout } from './browserControl/browserControl.layout';
import { BrowserLayout } from './browser/browser.layout';
import { LoadingLayout } from './loading/loading.layout';
import { PageHeaderLayout } from './pageHeader/pageHeader.layout';
import { BrowserNavigationLayout } from './browserNavigation/browserNavigation.layout';
import { TabLayout } from './tab/tab.layout';
import { TabContentLayout } from './tab-content/tab-content.layout';
import { SettingsSubscribeLayout } from './settingsSubscribe/settingsSubscribe.layout';


@NgModule({
	declarations: [
		DashboardLayout,
		MainLayout,
		BlankLayout,
		NavigationLayout,
		TopnavbarLayout,
		FooterLayout,
		TopNavigationLayout,
		TopNavigationNavBarLayout,
		NewsLayout,
		PaginationLayout,
		BrowserControlLayout,
		BrowserLayout,
		LoadingLayout,
		PageHeaderLayout,
		BrowserNavigationLayout,
		TabLayout,
		TabContentLayout,
		SettingsSubscribeLayout,
	],
	imports: [
		BrowserModule,
		RouterModule,
		ICheckModule,
		// BsDropdownModule.forRoot()
	],
	exports: [
		DashboardLayout,
		MainLayout,
		BlankLayout,
		NavigationLayout,
		TopnavbarLayout,
		FooterLayout,
		TopNavigationLayout,
		TopNavigationNavBarLayout,
		NewsLayout,
		PaginationLayout,
		BrowserControlLayout,
		BrowserLayout,
		LoadingLayout,
		PageHeaderLayout,
		BrowserNavigationLayout,
		TabLayout,
		TabContentLayout,
		SettingsSubscribeLayout,
	],
})

export class LayoutsModule { }
