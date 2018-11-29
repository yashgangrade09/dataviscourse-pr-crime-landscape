let activeYear = '2008';

try{
	let applyFilter = document.getElementById("crime-selection-btn");
	let selectionArr = [];
	applyFilter.onclick = function() {selectionArr = getData();};
	console.log(selectionArr);
	
	let mapViewObj = new mapView(activeYear);
	mapViewObj.showViews(activeYear);

	let statisticsViewObj = new StatisticsView();
	statisticsViewObj.showViews(activeYear);

	let timeSliderObj = new TimeSlider(activeYear, mapViewObj, statisticsViewObj);
	timeSliderObj.drawYearBar();
	timeSliderObj.showViews(activeYear);

}
catch(error){
	console.log(error);
}
