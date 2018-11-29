function getData(){
	console.log("In get data");
	let checkboxes = document.getElementById("crime-selection").childNodes;

	let values = [];

	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked == true) {
			values.push(checkboxes[i].value);
		}
	}

	return values;
}