class StatisticsView {
	
	constructor () {
		year_svg = d3.select('#yearly-stats')
						.append('svg')
						.attr('width', 500)
						.attr('height', 300);

		month_svg = d3.select('#monthly-stats')
						.append('svg')
						.attr('width', 500)
						.attr('height', 300);

		weekly_svg = d3.select('#weekly-stats')
						.append('svg')
						.attr('width', 500)
						.attr('height', 300);

		daily_svg = d3.select('#daily-stats')
						.append('svg')
						.attr('width', 500)
						.attr('height', 300);
	}
}