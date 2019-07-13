import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-news-layout',
	templateUrl: './news.layout.html'
})

// tslint:disable-next-line:component-class-suffix
export class NewsLayout implements OnInit {

	@Input() data: Array<any> = [];
	@Input() selected: Array<number> = [];

	constructor() { }

	ngOnInit() { }

	select(e, index) {
		if (e.target.checked) {
			this.selected[index] = this.data[index].news_id;
			this.data[index].state = true;
		} else {
			this.selected.splice(index, 1);
			this.data[index].state = false;
		}
	}

	selectAll(ev) {
		this.data.forEach(x => x.state = ev.target.checked);
		if (ev.target.checked) {
			this.data.forEach(x => {
				this.selected[x.news_id] = x.news_id;
				x.state = true;
			});
		} else {
			this.data.forEach(x => {
				this.selected = [];
				x.state = false;
			});
		}
	}

	isAllSelected() {
		return this.data.every(x => x.state);
	}

}
