class TimeSlider {

	constructor (activeYear, mapView) {
		this.activeYear = activeYear;
        this.mapView = mapView;
	}

	drawYearBar() {
        let that = this;

        let yearScale = d3.scaleLinear()
        					.domain([2008, 2010])
        					.range([0, 700]);

        let yearSlider = d3.select('#time-sliders-box')
        					.append('div')
        					.classed('slider-wrap', true)
        					.append('input')
        					.classed('slider', true)
        					.attr('type', 'range')
        					.attr('min', 2008)
        					.attr('max', 2010)
        					.attr('value', this.activeYear);

        let sliderLabel = d3.select('#time-sliders-box')
        					.append('div')
        					.classed('slider-label', true)
        					.append('svg');

        let sliderText = sliderLabel.append('text')
        							.text(this.activeYear)
        							.attr('x', yearScale(this.activeYear))
        							.attr('y', 25);

        yearSlider.on('input', function() {
            sliderText.text(this.value);
            sliderText.attr('x', yearScale(this.value));            
            that.activeYear = this.value;
            that.updateYear(that.activeYear);
            that.mapView.showViews(that.activeYear);
            //console.log(that.activeYear);
        });
    }

    updateYear (year) {
		this.activeYear = year;
		this.showViews (this.activeYear);
	}

	showViews (year) {
		d3.csv("dummydata/"+year+".csv").then(data => {
			// console.log(data);
            return data;
		});
	}
}