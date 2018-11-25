let activeYear = '2008';

try{
	let mapViewObj = new mapView(activeYear);
	let timeSlider = new TimeSlider(activeYear, mapViewObj);

	timeSlider.drawYearBar();
	timeSlider.showViews(activeYear);
	mapViewObj.showViews(activeYear);

	let statisticsViewObj = new StatisticsView();



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
				text: 'Daily Statistics'
			}
		}
	});



}
catch(error){
	console.log(error);
}
