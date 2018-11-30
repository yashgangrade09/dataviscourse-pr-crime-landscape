class StatisticsView {

	constructor () {

		d3.json("processeddata/all_years.json").then(data => {
			console.log(data);
		});



	}

	showViews (year, crime_list) {
		//let bgcolor = ['#AA3939', '#226666', '#7B9F35'];
		let bgcolor = ['#89729E', '#1F4788', '#6B9362', '#E29C45', '#E68364', '#6C7A89', '#5B8930', '#D24D57', '#5D3F6A', '#317589'];
		let brcolor = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];

		d3.csv("processeddata/all_years.csv").then(data => {
			let crime_year = [];
			for (let i=0; i<data.length; i++) {
				for (let j=0; j<crime_list.length; j++) {
					if (data[i]['DESCRIPTION'] == crime_list[j]) {
						crime_year.push([parseInt(data[i][2008]), 
										parseInt(data[i][2009]), 
										parseInt(data[i][2010]), 
										parseInt(data[i][2011]), 
										parseInt(data[i][2012]), 
										parseInt(data[i][2013]), 
										parseInt(data[i][2014]), 
										parseInt(data[i][2015]), 
										parseInt(data[i][2016])]);
					};
				}
			}
			let year_dataset = [];
			let d;
			for (let i=0; i<crime_list.length; i++) {
				d = {
					data: crime_year[i],
					label: crime_list[i],
					borderColor: bgcolor[i],
					fill: false
				};
				year_dataset.push(d);
			}
			var yearChart = new Chart (document.getElementById("year-chart") , {
				type: 'line',
				data: {
					labels: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
					datasets: year_dataset
				},
				options: {
					title: {
						display: true,
						text: 'Yearly Statistics'
					}
				}
			});
		});

		d3.csv("processeddata/"+year+"_processed.csv").then(data => {
			let num_crime = [];
			let crime_month= [];
			let crime_week = [];
			let crime_day = [];
			for (let i=0; i<data.length; i++) {
				for (let j=0; j<crime_list.length; j++) {
					num_crime.push(0);
					crime_month.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
					crime_week.push([0, 0, 0, 0, 0, 0, 0]);
					crime_day.push([0, 0, 0, 0, 0, 0, 0, 0]);
					if (data[i]['DESCRIPTION'] == crime_list[j]) {
						num_crime[j] += 1;
						crime_month[j][data[i]['MONTH']-1] += 1;
						crime_week[j][data[i]['DOW']-1] += 1;
						crime_day[j][data[i]['TOD']-1] += 1;
					};
				}
            }

            var summaryChart = new Chart (document.getElementById("summary"), {
            	type: 'doughnut',
            	data: {
            		labels: crime_list,
            		datasets: [{
            			label: "Number of incidents.",
            			data: num_crime,
            			backgroundColor: bgcolor,
            			borderColor: brcolor,
            			borderWidth: 1
            		}]
            	}
            });

            let month_dataset = [];
			let d;
			for (let i=0; i<crime_list.length; i++) {
				d = {
					data: crime_month[i],
					label: crime_list[i],
					borderColor: bgcolor[i],
					fill: false
				};
				month_dataset.push(d);
			}
            var monthChart = new Chart (document.getElementById("month-chart") , {
				type: 'line',
				data: {
					labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					datasets: month_dataset
				},
				options: {
					title: {
						display: true,
						text: 'Monthly Statistics'
					}
				}
			});

			let week_dataset = [];
			for (let i=0; i<crime_list.length; i++) {
				d = {
					data: crime_week[i],
					label: crime_list[i],
					borderColor: bgcolor[i],
					fill: false
				};
				week_dataset.push(d);
			}
			var weeklyChart = new Chart (document.getElementById("week-chart") , {
				type: 'line',
				data: {
					labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					datasets: week_dataset
				},
				options: {
					title: {
						display: true,
						text: 'Weekly Statistics'
					}
				}
			});

			let day_dataset = [];
			for (let i=0; i<crime_list.length; i++) {
				d = {
					data: crime_day[i],
					label: crime_list[i],
					borderColor: bgcolor[i],
					fill: false
				};
				day_dataset.push(d);
			}
			var dailyChart = new Chart (document.getElementById("day-chart") , {
				type: 'line',
				data: {
					labels: ['00-03', '03-06', '06-09', '09-12', '12-15', '15-18', '18-21', '21-24'],
					//labels: ['12AM-3AM', '3AM-6AM', '6AM-9AM', '9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM', '9PM-12AM'],
					datasets: day_dataset
				},
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