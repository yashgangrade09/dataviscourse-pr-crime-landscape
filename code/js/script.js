let activeYear = '2008';

try{
	let mapViewObj = new mapView(activeYear);
	let timeSlider = new TimeSlider(activeYear, mapViewObj);

	timeSlider.drawYearBar();
	timeSlider.showViews(activeYear);
	mapViewObj.showViews(activeYear);

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

	var monthChart = new Chart (document.getElementById("month-chart") , {
		type: 'line',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			datasets: [{
				data: [12, 13, 6, 5, 8, 9, 17, 11, 19, 10, 5, 25],
				label: 'Traffic',
				borderColor: '#AA3939',
				fill: false
			},
			{
				data: [8, 7, 9, 3, 4, 6, 5, 7, 1, 2, 3, 4],
				label: 'Larceny',
				borderColor: '#226666',
				fill: false
			},
			{
				data: [1, 0, 0, 1, 2, 2, 1, 0, 0, 0, 3, 4],
				label: 'Arson',
				borderColor: '#7B9F35',
				fill: false
			}]},
		options: {
			title: {
				display: true,
				text: 'Monthly Statistics'
			}
		}
	});

	var weeklyChart = new Chart (document.getElementById("week-chart") , {
		type: 'line',
		data: {
			labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			datasets: [{
				data: [12, 13, 6, 5, 8, 9, 17],
				label: 'Traffic',
				borderColor: '#AA3939',
				fill: false
			},
			{
				data: [6, 5, 7, 1, 2, 3, 4],
				label: 'Larceny',
				borderColor: '#226666',
				fill: false
			},
			{
				data: [1, 0, 0, 0, 0, 3, 4],
				label: 'Arson',
				borderColor: '#7B9F35',
				fill: false
			}]},
		options: {
			title: {
				display: true,
				text: 'Weekly Statistics'
			}
		}
	});

	var dailyChart = new Chart (document.getElementById("day-chart") , {
		type: 'line',
		data: {
			labels: ['00-03', '03-06', '06-09', '09-12', '12-15', '15-18', '18-21', '21-24'],
			datasets: [{
				data: [0, 2, 5, 8, 9, 10, 7, 5],
				label: 'Traffic',
				borderColor: '#AA3939',
				fill: false
			},
			{
				data: [5, 3, 2, 1, 0, 0, 3, 9],
				label: 'Larceny',
				borderColor: '#226666',
				fill: false
			},
			{
				data: [3, 1, 0, 0, 0, 1, 0, 5],
				label: 'Arson',
				borderColor: '#7B9F35',
				fill: false
			}]},
		options: {
			title: {
				display: true,
				text: 'Hourly Statistics'
			}
		}
	});



}
catch(error){
	console.log(error);
}
