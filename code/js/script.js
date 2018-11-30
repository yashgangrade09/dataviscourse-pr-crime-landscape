let activeYear = '2008';

try{
	crime_list = ['Assault', 'Drugs']

	let mapViewObj = new mapView(activeYear);
	mapViewObj.showViews(activeYear, crime_list);

	d3.json("processeddata/all_years.json").then(yeardata => {
		d3.json("processeddata/all_months.json").then(monthdata => {
			d3.json("processeddata/all_weeks.json").then(weekdata => {

				let statisticsViewObj = new StatisticsView(yeardata, monthdata, weekdata);
				statisticsViewObj.showViews(activeYear, crime_list);

				let timeSliderObj = new TimeSlider(activeYear, mapViewObj, statisticsViewObj);
				timeSliderObj.drawYearBar();
				timeSliderObj.showViews(activeYear);

				let applyFilter = document.getElementById("crime-selection-btn");
				applyFilter.onclick = function() {getData(mapViewObj, statisticsViewObj, timeSliderObj, activeYear);};
			});			
		});			
	});
}

catch(error){
	console.log(error);
}
