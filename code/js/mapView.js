class mapView{

	constructor (activeYear) {
		this.activeYear = activeYear;
    	d3.select("#map-view-box").attr("style", "height:500px");
    	this.mymap = L.map('map-view-box', {
    		center: [40.759759, -111.861619],
    		minZoom: 11,
    		zoom: 11
    	});

    	// this.LayerGroup = L.layerGroup().addTo(this.mymap);
    	this.markerClusters = L.markerClusterGroup({maxClusterRadius: 40, chunkedLoading: true});
	}

	showCrimeMarkers(markers) {
		let that = this;
		// console.log(markers);
		var greenIcon = new L.Icon({
	        iconUrl: 'assets/img/marker-icon-2x-green.png',
	          shadowUrl: 'assets/img/marker-shadow.png',
	          iconSize: [25, 41],
	          iconAnchor: [12, 41],
	          popupAnchor: [1, -34],
	          shadowSize: [41, 41]
	      });
	    var redIcon = new L.Icon({
	        iconUrl: 'assets/img/marker-icon-2x-red.png',
	          shadowUrl: 'assets/img/marker-shadow.png',
	          iconSize: [25, 41],
	          iconAnchor: [12, 41],
	          popupAnchor: [1, -34],
	          shadowSize: [41, 41]
	      });
	    var violetIcon = new L.Icon({
	        iconUrl: 'assets/img/marker-icon-2x-violet.png',
	          shadowUrl: 'assets/img/marker-shadow.png',
	          iconSize: [25, 41],
	          iconAnchor: [12, 41],
	          popupAnchor: [1, -34],
	          shadowSize: [41, 41]
	      });

	    var icons = [redIcon, greenIcon, violetIcon];

        for(let i = 0; i < markers.length; i++){
            let icon;
            if(markers[i]["DESCRIPTION"] == "BURGLARY")
                icon = icons[0];
            else if(markers[i]["DESCRIPTION"] == "LARCENY")
                icon = icons[2];
            else
                icon = icons[1];
            // myicon = icons[0];

            let markerTemp = L.marker([markers[i]["LATITUDE"], markers[i]["LONGITUDE"]], {icon: icon})
                             .bindPopup("Location of Crime: " + markers[i]["ADDRESS"] + "<br>Crime Type: "
                            + markers[i]["DESCRIPTION"] + "<br>Date of Occurence: " + markers[i]["DATE"]);
             // .addTo(that.markerClusters);
             that.markerClusters.addLayer(markerTemp);
        }
    }

    showCrimeMarkersCircles(markers){
    	let that = this;
    	// var div_circle = L.divIcon({ className: "my-div-icon"});

    	for(let i = 0; i < markers.length; i++){
    		let markerTemp = L.circle([markers[i]["latitude"], markers[i]["longitude"]], {
    			color: 'red',
    			fillcolor: 'red',
    			fillOpacity: 0.4,
    			radius: 15
    		})
    		.bindPopup("Location of Crime: " + markers[i]["address"])
    		// let markerTemp = L.marker([markers[i]["latitude"], markers[i]["longitude"], {icon: div_circle} );
    		// that.LayerGroup.addLayer(markerTemp);
    	}
    }

    showViews(year){
    	let that = this;
	    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	    subdomains: ['a', 'b', 'c'],
	  	maxZoom: 18,
	    minZoom: 11
	    }).addTo(that.mymap);

        this.markerClusters.clearLayers();

    	d3.csv("dummydata/" + year + ".csv").then(function(yearData){
        	let plotData = JSON.parse(JSON.stringify(yearData));
            let filteredData = plotData.filter(d => (d["DESCRIPTION"] == "BURGLARY"
                || d["DESCRIPTION"] == "ARSON" || d["DESCRIPTION"] == "LARCENY"));
            // console.log(filteredData);
        	that.showCrimeMarkers(filteredData);
			d3.select("#container").style('opacity', 1);
			console.log('Changing to loading false');
    	});
	    that.mymap.addLayer(that.markerClusters);
    }
}
