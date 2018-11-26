class StatisticsView {

	constructor () {

	}

	showViews (year) {
		let crime_list = ['TRAFFIC', 'LARCENY', 'ARSON'];

		d3.csv("data/all_years.csv").then(data => {
			let crime0_year;
			let crime1_year;
			let crime2_year;

		for (let i=0; i<data.length; i++) {
				if (data[i]['DESCRIPTION'] == crime_list[0]) {
					crime0_year = [parseInt(data[i][2008]), 
									parseInt(data[i][2009]), 
									parseInt(data[i][2010]), 
									parseInt(data[i][2011]), 
									parseInt(data[i][2012]), 
									parseInt(data[i][2013]), 
									parseInt(data[i][2014]), 
									parseInt(data[i][2015]), 
									parseInt(data[i][2016])]
				};
				if (data[i]['DESCRIPTION'] == crime_list[1]) {
					crime1_year = [parseInt(data[i][2008]), 
									parseInt(data[i][2009]), 
									parseInt(data[i][2010]), 
									parseInt(data[i][2011]), 
									parseInt(data[i][2012]), 
									parseInt(data[i][2013]), 
									parseInt(data[i][2014]), 
									parseInt(data[i][2015]), 
									parseInt(data[i][2016])]
				};
				if (data[i]['DESCRIPTION'] == crime_list[2]) {
					crime2_year = [parseInt(data[i][2008]), 
									parseInt(data[i][2009]), 
									parseInt(data[i][2010]), 
									parseInt(data[i][2011]), 
									parseInt(data[i][2012]), 
									parseInt(data[i][2013]), 
									parseInt(data[i][2014]), 
									parseInt(data[i][2015]), 
									parseInt(data[i][2016])]
				};
			};

			var yearChart = new Chart (document.getElementById("year-chart") , {
				type: 'line',
				data: {
					labels: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
					datasets: [{
						data: crime0_year,
						label: crime_list[0],
						borderColor: '#AA3939',
						fill: false
					},
					{
						data: crime1_year,
						label: crime_list[1],
						borderColor: '#226666',
						fill: false
					},
					{
						data: crime2_year,
						label: crime_list[2],
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
		});

		d3.csv("data/"+year+"_processed.csv").then(data => {
			let crime0 = 0;
			let crime1 = 0;
			let crime2 = 0;

            let crime0_month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let crime1_month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let crime2_month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            let crime0_week = [0, 0, 0, 0, 0, 0, 0];
            let crime1_week = [0, 0, 0, 0, 0, 0, 0];
            let crime2_week = [0, 0, 0, 0, 0, 0, 0];

            let crime0_day = [0, 0, 0, 0, 0, 0, 0, 0];
            let crime1_day = [0, 0, 0, 0, 0, 0, 0, 0];
            let crime2_day = [0, 0, 0, 0, 0, 0, 0, 0];

            for (let i=0; i<data.length; i++) {
            	if (data[i]['DESCRIPTION'] == crime_list[0]) {
            		crime0 += 1
            		crime0_month[data[i]['MONTH']-1] += 1;
            		crime0_week[data[i]['DOW']-1] += 1;
            		crime0_day[data[i]['TOD']-1] += 1;
            	}
            	else if (data[i]['DESCRIPTION'] == crime_list[1]) {
            		crime1 += 1
            		crime1_month[data[i]['MONTH']-1] += 1;
            		crime1_week[data[i]['DOW']-1] += 1;
            		crime1_day[data[i]['TOD']-1] += 1;
            	}
            	else if (data[i]['DESCRIPTION'] == crime_list[2]) {
            		crime2 += 1
            		crime2_month[data[i]['MONTH']-1] += 1;
            		crime2_week[data[i]['DOW']-1] += 1;
            		crime2_day[data[i]['TOD']-1] += 1;
            	}
            }

            var summaryChart = new Chart (document.getElementById("summary"), {
            	type: 'doughnut',
            	data: {
            		labels: crime_list,
            		datasets: [{
            			label: "Number of incidents.",
            			data: [crime0, crime1, crime2],
            			backgroundColor: ['#AA3939','#226666','#7B9F35'],
            			borderColor: ['#000000','#000000','#000000'],
            			borderWidth: 1
            		}]
            	}
            });

            var monthChart = new Chart (document.getElementById("month-chart") , {
				type: 'line',
				data: {
					labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					datasets: [{
						data: crime0_month,
						label: crime_list[0],
						borderColor: '#AA3939',
						fill: false
					},
					{
						data: crime1_month,
						label: crime_list[1],
						borderColor: '#226666',
						fill: false
					},
					{
						data: crime2_month,
						label: crime_list[2],
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
						data: crime0_week,
						label: crime_list[0],
						borderColor: '#AA3939',
						fill: false
					},
					{
						data: crime1_week,
						label: crime_list[1],
						borderColor: '#226666',
						fill: false
					},
					{
						data: crime2_week,
						label: crime_list[2],
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
						data: crime0_day,
						label: crime_list[0],
						borderColor: '#AA3939',
						fill: false
					},
					{
						data: crime1_day,
						label: crime_list[1],
						borderColor: '#226666',
						fill: false
					},
					{
						data: crime2_day,
						label: crime_list[2],
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
		});
	}
}