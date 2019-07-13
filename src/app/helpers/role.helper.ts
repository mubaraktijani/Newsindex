import { Auth } from './auth.helper';

export class Role {

	constructor() { }

	getPerms(): Array<object> | any {
		return Auth.user().perms;
	}

	hasPerm(permission): boolean {
		return true;
		// return (Auth.user().perms[permission]).length;
	}

	// check if user has a specific privilege
	getPrivilege(perm): object | boolean | any {
		if (Auth.hasPrivilege()) {
			return true;
			// return Auth.user().perms[perm];
		}
		return false;
	}
}
