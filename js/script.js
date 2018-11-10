let activeYear = '2008';

try{
	let mapViewObj = new mapView(activeYear);
	let timeSlider = new TimeSlider(activeYear, mapViewObj);

	timeSlider.drawYearBar();
	timeSlider.showViews(activeYear);

	let statisticsViewObj = new StatisticsView();

	var ctx = document.getElementById("summary");
	console.log(ctx);
	var myChart = new Chart(ctx, {
	    type: 'doughnut',
	    data: {
	        labels: ['Arson', 'Larceny', 'Traffic'],
	        datasets: [{
	            label: 'Percentage of total crimes',
	            data: [14, 10, 3]
	        }],
			backgroundColor: [
				   '#AA3939', '#226666', '#7B9F35'
			   ]
	    }
	});
}
catch(error){
	console.log(error);
}
