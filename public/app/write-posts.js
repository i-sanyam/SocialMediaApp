$(() => {
	$("#addPost").submit((e) => {
		e.preventDefault();

		const title = $("#title")[0].value;
		const body = $("#postBody")[0].value;
		
		const postAlert = $("#postAlert")[0];
		const titleAlert = $("#titleAlert")[0];
		let passTest = true;
		if (title.length < 10) {
			titleAlert.style.display = "block";
			passTest &= false;
		} else {
			titleAlert.style.display = "none";
			passTest &= true;
		}
		if (body.length < 20 || body.length > 500) {
			postAlert.style.display = "block";
			passTest &= false;
		} else {
			postAlert.style.display = "none";
			passTest &= true;
		}
		
		if (!passTest) return;
		axios.post('/api/post/create', {title, text: body}).then(d => {
			// d = d.data;
			// console.log(d);
			window.open('/', '_self');
		}).catch(d => {
			d = d.data;
			console.log(d);
			window.alert('System Error! Try Again.');
		});
	});
});
