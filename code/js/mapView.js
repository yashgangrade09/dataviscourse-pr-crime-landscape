class mapView{

	constructor (activeYear) {
		this.activeYear = activeYear;
    	d3.select("#map-view-box").attr("style", "height:500px");
    	this.mymap = L.map('map-view-box').setView([40.759759, -111.861619], 13);
    	this.LayerGroup = L.layerGroup().addTo(this.mymap);
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
            if(markers[i]["UCR DESCRIPTION"] == "TRAFFIC")
                icon = icons[0];
            else if(markers[i]["UCR DESCRIPTION"] == "LARCENY")
                icon = icons[2];
            else
                icon = icons[1];


            let markerTemp = L.marker([markers[i].LATITUDE, markers[i].LONGITUDE], {icon: icon})
             .bindPopup("Location of Crime: " + markers[i]["LOCATION"] + "<br>Crime Type: "
             	+ markers[i]["UCR DESCRIPTION"] + "<br>Date of Occurence: " + markers[i]["OCCUR DATE"])
             // .addTo(that.LayerGroup);
             that.LayerGroup.addLayer(markerTemp);
        }
    }

    showViews(year){
    	let that = this;
	    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	    maxZoom: 18,
	    minZoom: 10
	    }).addTo(that.mymap);


	    // var marker = L.marker([40.759759, -111.861619]).addTo(that.mymap);
	    this.LayerGroup.clearLayers();

	    // var marker = L.marker([40.759759, -111.861619]).addTo(that.LayerGroup);
	    // var marker = L.marker([40.759759, -111.861619]);

	    // that.LayerGroup.addLayer(marker);

    	d3.csv("dummydata/" + year + ".csv").then(function(yearData){
        	// console.log(JSON.parse(JSON.stringify(yearData)));
        	that.showCrimeMarkers(JSON.parse(JSON.stringify(yearData)));
    	});
    }



}
