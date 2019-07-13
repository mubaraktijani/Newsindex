import { TagcloudComponent } from './views/tagcloud/tagcloud.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { MainLayout } from './layouts/main/main.layout';
import { BlankLayout } from './layouts/blank/blank.layout';

import { LoginComponent } from './views/auth/login/login.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { PricingComponent } from './views/auth/pricing/pricing.component';

import { IndexComponent } from './views/index/index.component';
import { SettingsComponent } from './views/settings/settings.component';
import { SearchComponent } from './views/search/search.component';
import { AlertsComponent } from './views/alerts/alerts.component';
import { EntitiesComponent } from './views/entities/entities.component';
import { SubscriptionComponent } from './views/subscription/subscription.component';
import { LabelsComponent } from './views/labels/labels.component';
import { BlogsComponent } from './views/blogs/blogs.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { WritersComponent } from './views/writers/writers.component';
import { ViewedComponent } from './views/viewed/viewed.component';
import { ReadNewsComponent } from './views/readNews/readNews.component';
import { HomeComponent } from './views/home/home.component';
import { UsersComponent } from './views/users/users.component';

const APP_ROUTES: Routes = [

	{ path: 'home', component: IndexComponent },

	{
		path: 'auth',
		component: BlankLayout,
		children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'signup', component: SignupComponent },
			{ path: 'pricing', component: PricingComponent }
		]
	},

	{
		path: '',
		component: MainLayout,
		canActivate: [AuthGuard],
		children: [

			{ path: '', canActivate: [AuthGuard], component: HomeComponent },
			{ path: 'search', canActivate: [AuthGuard], component: SearchComponent },
			{ path: 'settings', canActivate: [AuthGuard], component: SettingsComponent },
			{ path: 'news/:id', canActivate: [AuthGuard], component: ReadNewsComponent },

			{
				path: 'users',
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: UsersComponent },
					{ path: ':role', component: UsersComponent }
				]
			},

			{
				path: 'tags',
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: TagcloudComponent },
					{ path: ':tag', component: TagcloudComponent }
				]
			},

			{
				path: 'alerts',
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: AlertsComponent },
					{ path: ':one', component: AlertsComponent }
				]
			},

			{
				path: 'entities',
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: EntitiesComponent },
					{ path: ':one', component: EntitiesComponent },
					{ path: ':one/:two', component: EntitiesComponent },
				]
			},

			{
				path: 'subscription',
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: SubscriptionComponent },
					{ path: ':one', component: SubscriptionComponent },
					{ path: ':one/:two', component: SubscriptionComponent },
				]
			},

			{
				path: 'bookmarks',
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: LabelsComponent },
					{ path: ':one', component: LabelsComponent },
				]
			},

			{
				path: 'blogs',
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: BlogsComponent },
					{ path: ':one', component: BlogsComponent },
					{ path: ':one/:two', component: BlogsComponent },
					{ path: ':one/:two/:three', component: BlogsComponent },
				]
			},

			{
				path: 'categories',
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: CategoriesComponent },
					{ path: ':one', component: CategoriesComponent },
					{ path: ':one/:two', component: CategoriesComponent },
					{ path: ':one/:two/:three', component: CategoriesComponent },
				]
			},

			{
				path: 'writers',
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: WritersComponent },
					{ path: ':one', component: WritersComponent },
				]
			},

			{
				path: 'viewed',
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: ViewedComponent },
					{ path: ':one', component: ViewedComponent },
					{ path: ':one/:two', component: ViewedComponent },
					{ path: ':one/:two/:three', component: ViewedComponent },
				]
			},
		]
	},

	// otherwise redirect to home
	{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
