class StatisticsView {

	constructor (yeardata, monthdata, weekdata, hourdata) {
		this.yeardata = yeardata;
		this.monthdata = monthdata;
		this.weekdata = weekdata;
		this.hourdata = hourdata;

		this.summaryChart = new Chart (document.getElementById("summary"), {
			type: 'doughnut',
			data: {
				labels: crime_list,
				datasets: []
			}
		});

		this.yearChart = new Chart (document.getElementById("year-chart") , {
			type: 'line',
			data: {
				labels: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
				datasets: []
			},
			options: {
				title: {
					display: true,
					text: 'Yearly Statistics'
				}
			}
		});

		this.monthChart = new Chart (document.getElementById("month-chart") , {
			type: 'line',
			data: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				datasets: []
			},
			options: {
				title: {
					display: true,
					text: 'Monthly Statistics'
				}
			}
		});

		this.weekChart = new Chart (document.getElementById("week-chart") , {
			type: 'line',
			data: {
				labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				datasets: []
			},
			options: {
				title: {
					display: true,
					text: 'Weekly Statistics'
				}
			}
		});

		this.hourChart = new Chart (document.getElementById("hour-chart") , {
			type: 'line',
			data: {
				labels: ['00-03', '03-06', '06-09', '09-12', '12-15', '15-18', '18-21', '21-24'],
				datasets: []
			},
			options: {
				title: {
					display: true,
					text: 'Hourly Statistics'
				}
			}
		});
	}

	showViews (year, crime_list) {
		let bgcolor = ['#89729E', '#1F4788', '#6B9362', '#E29C45', '#E68364', '#6C7A89', '#5B8930', '#D24D57', '#5D3F6A', '#317589'];
		let brcolor = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];

		this.summaryChart.destroy();
		let summary_dataset = [];
		for (let i=0; i<crime_list.length; i++) {
			summary_dataset.push(this.yeardata[crime_list[i]][year-2008]);
		}
		this.summaryChart = new Chart (document.getElementById("summary"), {
			type: 'doughnut',
			data: {
				labels: crime_list,
				datasets: [{
					label: "Number of incidents.",
					data: summary_dataset,
					backgroundColor: bgcolor,
					borderColor: brcolor,
					borderWidth: 1
				}]
			}
		});

		this.yearChart.destroy();
		let year_dataset = [];
		for (let i=0; i<crime_list.length; i++) {
			year_dataset.push({
				data: this.yeardata[crime_list[i]],
				label: crime_list[i],
				borderColor: bgcolor[i],
				fill: false
			});
		}
		this.yearChart = new Chart (document.getElementById("year-chart") , {
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

		this.monthChart.destroy();
		let month_dataset = [];
		for (let i=0; i<crime_list.length; i++) {
			month_dataset.push({
				data: this.monthdata[year][crime_list[i]],
				label: crime_list[i],
				borderColor: bgcolor[i],
				fill: false
			});
		}
		this.monthChart = new Chart (document.getElementById("month-chart") , {
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

		this.weekChart.destroy();
		let week_dataset = [];
		for (let i=0; i<crime_list.length; i++) {
			week_dataset.push({
				data: this.weekdata[year][crime_list[i]],
				label: crime_list[i],
				borderColor: bgcolor[i],
				fill: false
			});
		}
		this.weekChart = new Chart (document.getElementById("week-chart") , {
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

		this.hourChart.destroy();
		let hour_dataset = [];
		for (let i=0; i<crime_list.length; i++) {
			hour_dataset.push({
				data: this.hourdata[year][crime_list[i]],
				label: crime_list[i],
				borderColor: bgcolor[i],
				fill: false
			});
		}
		this.hourChart = new Chart (document.getElementById("hour-chart") , {
			type: 'line',
			data: {
				labels: ['00-03', '03-06', '06-09', '09-12', '12-15', '15-18', '18-21', '21-24'],
				datasets: hour_dataset
			},
			options: {
				title: {
					display: true,
					text: 'Hourly Statistics'
				}
			}
		});
	}
}