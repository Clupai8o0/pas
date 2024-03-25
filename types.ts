export interface Resp {
	success: boolean;
	msg: string;
	data?: any;
}

export interface iPassword {
	url: string;
	title: string;
	username?: string;
	password: string;
	email?: string;
	id: string;
	userId: string;
	getPasswords?: () => Promise<void>;
}