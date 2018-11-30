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
        this.groupAssault = L.featureGroup.subGroup(this.markerClusters),// use `L.featureGroup.subGroup(parentGroup)` instead of `L.featureGroup()` or `L.layerGroup()`!
        this.groupBurglary = L.featureGroup.subGroup(this.markerClusters),
        this.groupDamagedProperty = L.featureGroup.subGroup(this.markerClusters),
        this.groupDrugs = L.featureGroup.subGroup(this.markerClusters),
        this.groupCommon = L.featureGroup.subGroup(this.markerClusters),
        this.control = L.control.layers(null, null, { collapsed: false });
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
            if(markers[i]["DESCRIPTION"] == "Assault")
                icon = icons[0];
            else if(markers[i]["DESCRIPTION"] == "Drugs")
                icon = icons[2];
            else
                icon = icons[1];
            // myicon = icons[0];
            let dateStr = markers[i]["MONTH"] + "/" + markers[i]["DAY"] + "/" + markers[i]["YEAR"];

            let markerTemp = L.marker([markers[i]["LATITUDE"], markers[i]["LONGITUDE"]], {icon: icon})
                             .bindPopup("Location of Crime: " + markers[i]["ADDRESS"] + "<br>Crime Type: "
                            + markers[i]["DESCRIPTION"] + "<br>Date of Occurence: " + dateStr);
             // .addTo(that.markerClusters);
             // that.markerClusters.addLayer(markerTemp);
            switch(markers[i]["DESCRIPTION"]){
                case "Assault":
                    markerTemp.addTo(that.groupAssault);
                    break;
                case "Burglary/ Larceny/ Robbery":
                    markerTemp.addTo(that.groupBurglary);
                    break;
                case "Damaged Property":
                    markerTemp.addTo(that.groupDamagedProperty);
                    break;
                case "Drugs":
                    markerTemp.addTo(that.groupDrugs);
                    break;
                default :
                    markerTemp.addTo(that.groupCommon);
            }
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

    showViews(year, crime_list){
    	let that = this;
	    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	    subdomains: ['a', 'b', 'c'],
	  	maxZoom: 18,
	    minZoom: 11
	    }).addTo(that.mymap);

        this.markerClusters.clearLayers();
        this.control.removeFrom(this.mymap);

    	d3.csv("processeddata/" + year + "_processed.csv").then(function(yearData){
            try{
        	let plotData = JSON.parse(JSON.stringify(yearData));
            let filteredData = plotData.filter(d => crime_list.indexOf(d["DESCRIPTION"]) != -1);
            console.log(filteredData, crime_list);
        	that.showCrimeMarkers(filteredData);
            that.control.addOverlay(that.groupAssault, 'Assault');
            that.control.addOverlay(that.groupBurglary, 'Second quarter');
            that.control.addOverlay(that.groupDamagedProperty, 'Third quarter');
            that.control.addOverlay(that.groupDrugs, 'Fourth quarter');
            that.control.addOverlay(that.groupCommon, 'F quarter');
            that.control.addTo(that.mymap);
            // that.markerClusters.addLayer(that.control);

            that.groupAssault.addTo(that.mymap); // Adding to map now adds all child layers into the parent group.
            that.groupBurglary.addTo(that.mymap);
            that.groupDamagedProperty.addTo(that.mymap);
            that.groupDrugs.addTo(that.mymap);
            that.groupCommon.addTo(that.mymap);
			d3.select("#container").style('opacity', 1);
            }
            catch(error){
                console.log(error);
            }
    	});
	    // that.mymap.addLayer(that.markerClusters);
        that.markerClusters.addTo(that.mymap);
        
    }
}
