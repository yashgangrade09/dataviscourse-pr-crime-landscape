class TimeSlider {

	constructor (activeYear, mapView, statisticsView) {
		this.activeYear = activeYear;
        this.mapView = mapView;
        this.statisticsView = statisticsView;
	}


	drawYearBar() {
        let that = this;

        let yearScale = d3.scaleLinear()
        					.domain([2008, 2016])
        					.range([0, 700]);

        let yearSlider = d3.select('#time-sliders-box')
        					.append('div')
        					.classed('slider-wrap', true)
        					.append('input')
        					.classed('slider', true)
        					.attr('type', 'range')
        					.attr('min', 2008)
        					.attr('max', 2016)
        					.attr('value', this.activeYear);

        let sliderLabel = d3.select('#time-sliders-box')
        					.append('div')
        					.classed('slider-label', true)
        					.append('svg');

        let sliderText = sliderLabel.append('text')
        							.text(this.activeYear)
        							.attr('x', 200)
        							.attr('y', 25)
									.style('text-anchor', 'start');

        yearSlider.on('mouseup', function() {
            console.log('Slider moved to ', this.value);
            let checkboxes = document.getElementsByName("crimeType");

            let crime_list = [];

            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked == true) {
                    crime_list.push(checkboxes[i].value);
                }
            }

            sliderText.text(this.value);
            sliderText.attr('x', yearScale(this.value));
            that.activeYear = this.value;
            that.updateYear(that.activeYear);
			d3.select("#container").style('opacity', 0.25);
            that.mapView.showViews(that.activeYear, crime_list);
            that.statisticsView.showViews(that.activeYear, crime_list);
        });
    }

    updateYear (year) {
		this.activeYear = year;
		this.showViews (this.activeYear);
	}

	showViews (year) {
		d3.csv("data/"+year+"_processed.csv").then(data => {
			// console.log(data);
            return data;
		});
	}
}
