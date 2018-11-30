function getData(mapViewObj, statisticsViewObj, timeSliderObj){
	let checkboxes = document.getElementsByName("crimeType");
	let crime_list = [];
	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked == true) {
			crime_list.push(checkboxes[i].value);
		}
	}
	activeYear = timeSliderObj.getYear();
	mapViewObj.showViews(activeYear, crime_list);
	statisticsViewObj.showViews(activeYear, crime_list);
}