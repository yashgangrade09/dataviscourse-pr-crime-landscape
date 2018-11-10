let activeYear = '2008';

try{
	let mapViewObj = new mapView(activeYear);
	let timeSlider = new TimeSlider(activeYear, mapViewObj);

	timeSlider.drawYearBar();
	timeSlider.showViews(activeYear);

	let statisticsViewObj = new StatisticsView();

	var ctx = document.getElementById("summary");
	var myChart = new Chart(ctx, {
	    type: 'doughnut',
	    data: {
	        labels: ["Traffic", "Larceny", "Arson"],
	        datasets: [{
	            label: '# of Votes',
	            data: [12, 19, 3],
	            backgroundColor: [
	                '#AA3939',
	                '#226666',
	                '#7B9F35'
	            ],
	            borderColor: [
	                '#000000',
	                '#000000',
	                '#000000'
	            ],
	            borderWidth: 1
	        }]
	    }	    
	});
}
catch(error){
	console.log(error);
}
