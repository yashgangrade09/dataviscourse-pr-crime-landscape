let activeYear = '2008';

try{
let mapViewObj = new mapView(activeYear);
let timeSlider = new TimeSlider(activeYear, mapViewObj);

timeSlider.drawYearBar();
timeSlider.showViews(activeYear);
}
catch(error){
	console.log(error);
}