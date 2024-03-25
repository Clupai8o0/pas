import bcrypt from "bcrypt";

export const hashPassword = (password: string) => bcrypt.hashSync(password, 10);
export const checkPassword = (password: string, hash: string) =>
	bcrypt.compareSync(password, hash);
