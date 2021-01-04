import { ToastrService } from 'ngx-toastr';
declare var toastr: ToastrService;

export class Toastr {
	static options = {
		closeButton: true,
		debug: false,
		newestOnTop: true,
		progressBar: true,
		positionClass: 'toast-top-right',
		preventDuplicates: true,
		onclick: null,
		showDuration: 300,
		hideDuration: 1000,
		timeOut: 5000,
		extendedTimeOut: 1000,
		showEasing: 'swing',
		hideEasing: 'linear',
		showMethod: 'fadeIn',
		hideMethod: 'fadeOut'
	};

	static success(message, title = null): void { toastr.success(message, title, Toastr.options); }

	static info(message, title = null): void { toastr.info(message, title, Toastr.options); }

	static warning(message, title = null): void { toastr.warning(message, title, Toastr.options); }

	static error(message, title = null): void { toastr.error(message, title, Toastr.options); }

	// static remove() { toastr.remove(); }

	static clear() { toastr.clear(); }
}
