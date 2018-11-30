function getData(mapViewObj, statisticsViewObj, timeSliderObj, year){
	console.log("In get data ", mapViewObj);
	let checkboxes = document.getElementById("crime-selection").childNodes;

	let crime_list = [];

	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked == true) {
			crime_list.push(checkboxes[i].value);
		}
	}
	
	mapViewObj.showViews(year, crime_list);
	statisticsViewObj.showViews(activeYear, crime_list);
	timeSliderObj.showViews(activeYear);
}