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


	var yearChart = new Chart (document.getElementById("year-chart") , {
		type: 'line',
		data: {
			labels: [2008, 2009, 2010],
			datasets: [{
				data: [50, 69, 78],
				label: 'Traffic',
				borderColor: '#AA3939',
				fill: false
			},
			{
				data: [6, 12, 15],
				label: 'Larceny',
				borderColor: '#226666',
				fill: false
			},
			{
				data: [2, 5, 9],
				label: 'Arson',
				borderColor: '#7B9F35',
				fill: false
			}]},
		options: {
			title: {
				display: true,
				text: 'Yearly Statistics'
			}
		}
	});



}
catch(error){
	console.log(error);
}
