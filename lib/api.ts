import colors from "colors";
import { NextResponse } from "next/server";

function response(success: boolean, msg: string, data?: any) {
	return {
		success,
		msg,
		data,
	};
}

export function handleSuccess(msg: string, data?: any, status?: number) {
	console.log(colors.underline(colors.green(msg)));
	return NextResponse.json(response(true, msg, data), {
		status: status !== null ? status : 200,
	});
}

export function handleError(msg: string, err?: any, status?: number) {
	console.log(colors.underline(colors.red(msg)));
	console.error(err);
	return NextResponse.json(response(false, msg, err), {
		status: status !== null ? status : 500,
	});
}
