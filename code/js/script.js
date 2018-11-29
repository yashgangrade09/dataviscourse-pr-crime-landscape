let activeYear = '2008';

try{

	let mapViewObj = new mapView(activeYear);
	mapViewObj.showViews(activeYear);

	let statisticsViewObj = new StatisticsView();
	statisticsViewObj.showViews(activeYear);

	let timeSliderObj = new TimeSlider(activeYear, mapViewObj, statisticsViewObj);
	timeSliderObj.drawYearBar();
	timeSliderObj.showViews(activeYear);

	let applyFilter = document.getElementById("crime-selection-btn");
	applyFilter.onclick = function() {getData(mapViewObj, statisticsViewObj, timeSliderObj, activeYear);};

}
catch(error){
	console.log(error);
}
