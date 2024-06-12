const logins = [
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxNzMxOTg2MywiZXhwIjoxNzE3NTc5MDYzfQ.kOsTN-lYo4PHzNg1MqxgkQ8X9iqdZru14ymAnChPKJE",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-02T09:17:44.591848+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "7f40748e-58a2-49b5-934f-a6f7d486bdca",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxNzUxNTM5MywiZXhwIjoxNzE3Nzc0NTkzfQ.IwDOetN2mQvnnXGVtf7mXA9YLwPfxzTt7DfFuErKMNM",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-04T15:36:34.088193+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "7b3f8701-01c5-4ec5-a99b-f5f460f6a701",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxNzU2Mzg1NSwiZXhwIjoxNzE3ODIzMDU1fQ.6W14yZU8eAThqjWOg1Zt6Hx6LxLw_sEEuiC6PkNW2xk",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-05T05:04:15.878238+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "da56fac4-c300-4b81-85d1-2f33d2a90feb",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxNzY3NDkzMCwiZXhwIjoxNzE3OTM0MTMwfQ.mlbBk5wDCg962BFvaaHFfS9P-ZSWw-o_j75TbvBE394",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-06T11:55:30.932064+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "797b5079-3578-4420-9d16-8527b65e8d63",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxNzY3NzM0MCwiZXhwIjoxNzE3OTM2NTQwfQ.to90bTItCEjnvkoToIxb-UJkz-95HDfyRkvceL99Uv4",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-06T12:35:41.462238+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "0520e557-bf76-4097-b49d-38928f6d7fae",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxNzgzMzExNSwiZXhwIjoxNzE4MDkyMzE1fQ.9VuCNijv6ONENWkVmjjRfiQw_8ZrnIvUfFxdTKnzWjw",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-08T07:51:56.123839+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "15436234-0c4b-424f-95c6-dc9b2f441162",
	},
	{
		token: null,
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-09T03:26:17.078251+00:00",
		ip: "46.184.241.172",
		success: false,
		loginId: "cb9e938b-35d2-417a-bd8c-9e086dac3db2",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxNzkwMzU5MiwiZXhwIjoxNzE4MTYyNzkyfQ.w0t1McVidedTxk0DyqBCsRzeIDwJIF000faYXUYulzQ",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-09T03:26:32.908885+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "2fc1cce1-6e4a-49a0-9126-5fc5c8a30d03",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxNzk0ODA1NywiZXhwIjoxNzE4MjA3MjU3fQ.lsLFpQnN2cIafPxhS5yG22JKYJZ-IX5B40YfpxcMqTE",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-09T15:47:38.154443+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "8f2cd4db-e589-4d9b-8862-801ab1dba02a",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxODEwNzcxNCwiZXhwIjoxNzE4MzY2OTE0fQ.xiVPVNbKEGzwPFznbLkXz4m-AuJgLkx6YlGRsf8Y5nc",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-11T12:08:35.387127+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "31dd4064-c59a-446f-b7c8-be04dff22540",
	},
	{
		token: null,
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-11T12:31:00.16202+00:00",
		ip: "46.184.241.172",
		success: false,
		loginId: "12e7c204-14be-4747-8529-458a02918767",
	},
	{
		token: null,
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-11T12:33:05.966062+00:00",
		ip: "46.184.241.172",
		success: false,
		loginId: "3d473756-c200-4895-8e04-4834701f24ae",
	},
	{
		token: null,
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-11T12:33:41.576656+00:00",
		ip: "46.184.241.172",
		success: false,
		loginId: "ab26b8f8-00db-4fab-af74-655fd909152f",
	},
	{
		token: null,
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-11T12:35:57.375581+00:00",
		ip: "46.184.241.172",
		success: false,
		loginId: "0d6d1aa5-91ec-438f-a7bb-6443f90c7f0b",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxODEwOTM3MiwiZXhwIjoxNzE4MzY4NTcyfQ.EZHzwV3Ocr4WVZn-9leChCpDtnBtLLl7i13_MHc5l5Q",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-11T12:36:10.333222+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "29b5464c-f703-4961-83b6-12b638d4e4ea",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxODEyNTQ5MywiZXhwIjoxNzE4Mzg0NjkzfQ.u70-EyweXHwVgal9QjFLOtd2fpJjSwtYxyTgx4akrRM",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-11T17:04:54.608906+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "1a8351ba-6824-4cb0-af22-45fde05aff0f",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxODE3OTQ3OCwiZXhwIjoxNzE4NDM4Njc4fQ.L2yov1XQmHlL9ckpNcqz3HRssdBvWZPJNkM398psL1Y",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-12T08:04:39.086618+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "cab5e739-94f9-4319-9b6f-4926bd70689b",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxODE4MDU4NCwiZXhwIjoxNzE4NDM5Nzg0fQ.bQyryIB-ZRJVXGaTFn7tnESO6PVFm6iq2oQevqNgLUY",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-12T08:23:05.437244+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "06ab5ad7-6908-482b-9672-4aa7779caa1d",
	},
	{
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmNzk4NmI0LWE5NTMtNDcxMy05NTY1LWJhMzY0Y2RkZGIxZSIsImlhdCI6MTcxODE4MTkzNSwiZXhwIjoxNzE4NDQxMTM1fQ.Muei8OVLUgLhbFh_gspmh7BjpDuZwMt83C7XaKhKaSU",
		userId: "0f7986b4-a953-4713-9565-ba364cdddb1e",
		date: "2024-06-12T08:45:35.986644+00:00",
		ip: "46.184.241.172",
		success: true,
		loginId: "7736a9a7-7125-4e04-8d90-d01930b2fd44",
	},
];

// to check if login attempts have exceeded
function canLogin() {
	let attempts = 5;
  logins.forEach(login => {
    // if login is within 5 minutes
    const today = new Date()
    const loginTimestamp = new Date(login.date)
    if (new Date(today.getTime() - loginTimestamp.getTime()).getMinutes() <= 5) {
      if (login.success === false) attempts--
    }
  })

  return attempts > 0 
}

console.log(canLogin());

//? find difference between two times
const today = new Date();
const givenTimestamp = new Date("2024-06-12T08:45:35.986644+00:00");
console.log(new Date(today.getTime() - givenTimestamp.getTime()).getMinutes())