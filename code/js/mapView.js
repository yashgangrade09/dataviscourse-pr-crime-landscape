class mapView{

	constructor (activeYear) {
		this.activeYear = activeYear;
    	d3.select("#map-view-box").attr("style", "height:500px");
    	this.mymap = L.map('map-view-box', {
    		center: [40.759759, -111.861619],
    		minZoom: 11,
    		zoom: 11
    	});

        let yearData = [];

        for (var i = 2008; i < 2017; i++) {
            d3.csv('processeddata/' + i + '_processed_nowhitespace.csv').then(function(csvData) {
                yearData[i].push(csvData);
                console.log(yearData);
            })
        }


        // this.LayerGroup = L.layerGroup().addTo(this.mymap);
        this.markerClusters = L.markerClusterGroup({maxClusterRadius: 40, chunkedLoading: true});
        // this.groupAssault = L.featureGroup.subGroup(this.markerClusters);
        // this.groupBurglary = L.featureGroup.subGroup(this.markerClusters);
        // this.groupDamagedProperty = L.featureGroup.subGroup(this.markerClusters);
        // this.groupDrugs = L.featureGroup.subGroup(this.markerClusters);
        // this.groupHitAndRun = L.featureGroup.subGroup(this.markerClusters);
        // this.groupHomicide = L.featureGroup.subGroup(this.markerClusters);
        // this.groupKidnap = L.featureGroup.subGroup(this.markerClusters);
        // this.groupTraffic = L.featureGroup.subGroup(this.markerClusters);
        // this.groupWeapons = L.featureGroup.subGroup(this.markerClusters);

        this.control = L.control.layers(null, null, { collapsed: false, sortLayers: true});

        let that = this;
        // that.control.addOverlay(that.groupAssault, 'Assault');
        // that.control.addOverlay(that.groupBurglary, 'Burglary');
        // that.control.addOverlay(that.groupDamagedProperty, 'Damaged Property');
        // that.control.addOverlay(that.groupDrugs, 'Drugs');
        // that.control.addOverlay(that.groupHitAndRun, 'Hit and Run');
        // that.control.addOverlay(that.groupHomicide, 'Homicide');
        // that.control.addOverlay(that.groupKidnap, 'Kidnap');
        // that.control.addOverlay(that.groupTraffic, 'Traffic');
        // that.control.addOverlay(that.groupWeapons, 'Weapons');

        that.control.addTo(that.mymap);


        // console.log(this.mymap);
        // console.log('cnotrol', this.control);
	}

	showCrimeMarkers(markers) {
		let that = this;
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

        this.groupAssault = L.featureGroup.subGroup(this.markerClusters);
        this.groupBurglary = L.featureGroup.subGroup(this.markerClusters);
        this.groupDamagedProperty = L.featureGroup.subGroup(this.markerClusters);
        this.groupDrugs = L.featureGroup.subGroup(this.markerClusters);
        this.groupHitAndRun = L.featureGroup.subGroup(this.markerClusters);
        this.groupHomicide = L.featureGroup.subGroup(this.markerClusters);
        this.groupKidnap = L.featureGroup.subGroup(this.markerClusters);
        this.groupTraffic = L.featureGroup.subGroup(this.markerClusters);
        this.groupWeapons = L.featureGroup.subGroup(this.markerClusters);

	    var icons = [redIcon, greenIcon, violetIcon];

        for(let i = 0; i < markers.length; i++){
            let icon = icons[2];
            // if(markers[i]["DESCRIPTION"] == "Assault")
            //     icon = icons[0];
            // else if(markers[i]["DESCRIPTION"] == "Drugs")
            //     icon = icons[2];
            // else
            //     icon = icons[1];

            let dateStr = markers[i]["MONTH"] + "/" + markers[i]["DAY"] + "/" + markers[i]["YEAR"];

            let markerTemp = L.marker([markers[i]["LATITUDE"], markers[i]["LONGITUDE"]], {icon: icon})
                             .bindPopup("Location of Crime: " + markers[i]["ADDRESS"] + "<br>Crime Type: "
                            + markers[i]["DESCRIPTION"] + "<br>Date of Occurence: " + dateStr);

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
                case "Hit and Run":
                    markerTemp.addTo(that.groupHitAndRun)
                    break;
                case "Homicide":
                    markerTemp.addTo(that.groupHomicide)
                    break;
                case "Traffic":
                    markerTemp.addTo(that.groupTraffic)
                    break;
                case "Weapons":
                    markerTemp.addTo(that.groupWeapons)
                    break;
                case "Kidnap":
                    markerTemp.addTo(that.groupKidnap)
                    break;
                default :
                    break;
            }
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
        // this.mymap.removeControl(this.control);
    	
        d3.csv("processeddata/" + year + "_processed_nowhitespace.csv").then(function(yearData){
            try{
            	let plotData = JSON.parse(JSON.stringify(yearData));
                let filteredData = plotData.filter(d => crime_list.indexOf(d["DESCRIPTION"]) != -1);

                console.log(that.control);

                function changeOverlay() {
                    that.mymap.removeControl(that.control);
                }

                changeOverlay()
                // that.mymap.removeLayer(that.control);
                // that.mymap.removeLayer(that.groupBurglary);
                // that.mymap.removeLayer(that.groupDamagedProperty);
                // that.mymap.removeLayer(that.groupDrugs);
                // that.mymap.removeLayer(that.groupCommon);
                that.control = L.control.layers(null, null, { collapsed: false })


                that.showCrimeMarkers(filteredData);
                for (var i = 0; i < crime_list.length; i++) {
                    let crime = crime_list[i];
                    console.log(crime);
                    switch (crime) {
                        case "Assault":
                            that.control.addOverlay(that.groupAssault, 'Assault');
                            break;
                        case "Burglary/ Larceny/ Robbery":
                            that.control.addOverlay(that.groupBurglary, 'Burglary');
                            break;
                        case "Damaged Property":
                            that.control.addOverlay(that.groupDamagedProperty, 'Damaged Prpoerty');
                            break;
                        case "Drugs":
                            that.control.addOverlay(that.groupDrugs, 'Drug offense');
                            break;
                        case "Hit and Run":
                            that.control.addOverlay(that.groupHitAndRun, 'Hit and Run');
                            break;
                        case "Homicide":
                            that.control.addOverlay(that.groupHomicide, 'Homicide');
                            break;
                        case "Kidnap":
                            that.control.addOverlay(that.groupTraffic, 'Kidnap');
                            break;
                        case "Traffic":
                            that.control.addOverlay(that.groupWeapons, 'Traffic violation');
                            break;
                        case "Weapons":
                            that.control.addOverlay(that.groupKidnap, 'Weapons offense');
                            break;
                        default :
                            break;
                    }
                }

                // that.control.addOverlay(that.groupAssault, 'Assault');
                // that.control.addOverlay(that.groupBurglary, 'Burglary');
                // that.control.addOverlay(that.groupDamagedProperty, 'Damaged Property');
                // that.control.addOverlay(that.groupDrugs, 'Drugs');
                // that.control.addOverlay(that.groupHitAndRun, 'Hit and Run');
                // that.control.addOverlay(that.groupHomicide, 'Homicide');
                // that.control.addOverlay(that.groupKidnap, 'Kidnap');
                // that.control.addOverlay(that.groupTraffic, 'Traffic');
                // that.control.addOverlay(that.groupWeapons, 'Weapons');

                that.control.addTo(that.mymap);

                that.groupAssault.addTo(that.mymap); // Adding to map now adds all child layers into the parent group.
                that.groupBurglary.addTo(that.mymap);
                that.groupDamagedProperty.addTo(that.mymap);
                that.groupDrugs.addTo(that.mymap);
                that.groupHitAndRun.addTo(that.mymap); // Adding to map now adds all child layers into the parent group.
                that.groupHomicide.addTo(that.mymap);
                that.groupKidnap.addTo(that.mymap);
                that.groupTraffic.addTo(that.mymap);
                that.groupWeapons.addTo(that.mymap);
                
                // console.log(that.groupAssault);
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
