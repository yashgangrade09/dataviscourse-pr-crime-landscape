class mapView{

	constructor (activeYear) {
		this.activeYear = activeYear;
    	d3.select("#map-view-box").attr("style", "height:500px");
    	this.mymap = L.map('map-view-box', {
    		center: [40.759759, -111.861619],
    		minZoom: 9,
    		zoom: 10
    	});

    	// this.LayerGroup = L.layerGroup().addTo(this.mymap);
    	this.markerClusters = L.markerClusterGroup();
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
            let myicon;
            // if(markers[i]["UCR DESCRIPTION"] == "TRAFFIC")
            //     icon = icons[0];
            // else if(markers[i]["UCR DESCRIPTION"] == "LARCENY")
            //     icon = icons[2];
            // else
            //     icon = icons[1];
            myicon = icons[0];

            let markerTemp = L.marker([markers[i]["latitude"], markers[i]["longitude"]], {icon: myicon})
             // .bindPopup("Location of Crime: " + markers[i]["address"])
             // .addTo(that.markerClusters);
             that.markerClusters.addLayer( markerTemp );
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
	    minZoom: 9
	    }).addTo(that.mymap);

	    // var marker = L.marker([40.759759, -111.861619]).addTo(that.mymap);
	    // this.LayerGroup.clearLayers();

	    // var marker = L.marker([40.759759, -111.861619]).addTo(that.LayerGroup);
	    // var marker = L.marker([40.759759, -111.861619]);

	    // that.LayerGroup.addLayer(marker);

    	d3.csv("data/gmap_addresses.csv").then(function(yearData){
        	// console.log(JSON.parse(JSON.stringify(yearData)));
        	that.showCrimeMarkers(JSON.parse(JSON.stringify(yearData)));
    	});
	    that.mymap.addLayer(that.markerClusters);
    }
}
