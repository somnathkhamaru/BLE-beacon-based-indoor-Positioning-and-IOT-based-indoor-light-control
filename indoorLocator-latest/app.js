var app = (function()
{
	// Application object.
	var app = {};
	var oldBeacon="b0";
	var olduuid="aaa";
	// Specify your beacon 128bit UUIDs here.
	// var beaconMapper={
	// 	"1a7a4b20-d4e8-4d94-bc09-e79bafa7b5eb":"b1",
	// 	"2561e402-bcf8-4337-9edf-92eec36ffe9d":"b2"
	// };            
      
	var regions =
	[
		// Estimote Beacon factory UUID.
		{uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D'},
		// Sample UUIDs for beacons in our lab.
		//b4
		{uuid:'1a7a4b20-d4e8-4d94-bc09-e79bafa7b5b4'},
		//b3
		{uuid:'2561e402-bcf8-4337-9edf-92eec36ffeb3'},
		//b2
		{uuid:'f7826da6-4fa2-4e98-8024-bc5b71e089b2'},
		//b1
		{uuid:'e20a39f4-73f5-4bc4-a12f-17d1ad07a9b1'},
		{uuid:'A4950001-C5B1-4B44-B512-1370F02D74DE'},
		{uuid:'585CDE93-1B01-42CC-9A13-25009BEDC65E'}	// Dialog Semiconductor.
	];
	// Background detection.
	var notificationID = 0;
	var inBackground = false;
	document.addEventListener('pause', function() { inBackground = true });
	document.addEventListener('resume', function() { inBackground = false });

	// Dictionary of beacons.
	var beacons = {};

	// Timer that displays list of beacons.
	var updateTimer = null;

	app.initialize = function()
	{
		document.addEventListener(
			'deviceready',
			function() { evothings.scriptsLoaded(onDeviceReady) },
			false);
	};

	function onDeviceReady()
	{
		// Specify a shortcut for the location manager holding the iBeacon functions.
		console.log("som");
		window.locationManager = cordova.plugins.locationManager;

		// Start tracking beacons!
		startScan();

		// Display refresh timer.
		updateTimer = setInterval(displayBeaconList, 500);
	}

	function startScan()
	{
		// The delegate object holds the iBeacon callback functions
		// specified below.
		var delegate = new locationManager.Delegate();
		console.log("scanning");
		// Called continuously when ranging beacons.
		delegate.didRangeBeaconsInRegion = function(pluginResult)
		{
			//console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
			for (var i in pluginResult.beacons)
			{
				// Insert beacon into table of found beacons.
				var beacon = pluginResult.beacons[i];
				beacon.timeStamp = Date.now();
				var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
				console.log(key);
				beacons[key] = beacon;
			}
		};

		// Called when starting to monitor a region.
		// (Not used in this example, included as a reference.)
		delegate.didStartMonitoringForRegion = function(pluginResult)
		{
			//console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
		};

		// Called when monitoring and the state of a region changes.
		// If we are in the background, a notification is shown.
		delegate.didDetermineStateForRegion = function(pluginResult)
		{
			if (inBackground)
			{
				// Show notification if a beacon is inside the region.
				// TODO: Add check for specific beacon(s) in your app.
				if (pluginResult.region.typeName == 'BeaconRegion' &&
					pluginResult.state == 'CLRegionStateInside')
				{
					cordova.plugins.notification.local.schedule(
						{
							id: ++notificationID,
							title: 'Beacon in range',
							text: 'iBeacon Scan detected a beacon, tap here to open app.'
						});
				}
			}
		};

		// Set the delegate object to use.
		locationManager.setDelegate(delegate);

		// Request permission from user to access location info.
		// This is needed on iOS 8.
		locationManager.requestAlwaysAuthorization();

		// Start monitoring and ranging beacons.
		for (var i in regions)
		{
			var beaconRegion = new locationManager.BeaconRegion(
				i + 1,
				regions[i].uuid);

			// Start ranging.
			locationManager.startRangingBeaconsInRegion(beaconRegion)
				.fail(console.error)
				.done();

			// Start monitoring.
			// (Not used in this example, included as a reference.)
			locationManager.startMonitoringForRegion(beaconRegion)
				.fail(console.error)
				.done();
		}
	}
	//Payload and Position Change
	function selectPayload(uuidno){
		console.log(uuidno);
		var finalData={};
		if(uuidno=="1a7a4b20-d4e8-4d94-bc09-e79bafa7b5b4")
		{
			finalData={
			"type": "BEACON",
			"payld": {
				"id": "b4",
				"x": "160",
				"y": "358"
			},
			"message": {
				"stream": "EEE",
				"lab": "SIMULATION",
				"instructor": "SK",
				"timings": "1pm-4am",
				"image": "B4"
			},
			"light": {
				"L1":"OFF",
				"L2":"ON"
				}
			}

		}
		else if(uuidno =="2561e402-bcf8-4337-9edf-92eec36ffeb3")
		{
			finalData={
			"type": "BEACON",
			"payld": {
				"id": "b3",
				"x": "70",
				"y": "266"
			},
			"message": {
				"stream": "EEE",
				"lab": "ANALOG",
				"instructor": "ED",
				"timings": "10am-1pm",
				"image": "B3"
			},
			"light": {
				"L1":"ON",
				"L2":"OFF"
				}
			}
		}
		else if(uuidno =="f7826da6-4fa2-4e98-8024-bc5b71e089b2")
		{
			finalData={
			"type": "BEACON",
			"payld": {
				"id": "b2",
				"x": "70",
				"y": "200"
			},
			"message": {
				"stream": "EEE",
				"lab": "DIGITAL E",
				"instructor": "AG",
				"timings": "1pm-4pm",
				"image": "B2"
			},
			"light": {
				"L2":"OFF",
				"L1":"ON"
				}
			}
		}
		else if(uuidno =="e20a39f4-73f5-4bc4-a12f-17d1ad07a9b1")
		{
			finalData={
			"type": "BEACON",
			"payld": {
				"id": "b1",
				"x": "70",
				"y": "135"
			},
			"message": {
				"stream": "EEE",
				"lab": "CKT THEORY",
				"instructor": "HG",
				"timings": "10am-1pm",
				"image": "B1"
			},
			"light": {
				"L1":"ON",
				"L2":"OFF"
				}
			}
		}
	useNewData(finalData);
	}
	
	
	//newFunctions
	


	function useNewData(data)
	{
		console.log( "update new location");

		mov(data.payld.x,data.payld.y);		

		detectPresence(data.payld.id);

		fillDetails(data.message);
				
		switchbulb("L1", data.light.L1);
		
		switchbulb("L2", data.light.L2);
	}

	function detectPresence(id){

		if(oldBeacon!="b0")
	
		{
	
		
			document.getElementById(oldBeacon).setAttribute("xlink:href", "ui/images/noActive.svg");
	
		}
	
		oldBeacon=id;
	
		document.getElementById(id).setAttribute("xlink:href", "ui/images/active.svg");
	
		console.log("Presense_Detected");
	
	}
	
	
	
	function mov(x,y){
	
		document.getElementById("point").setAttribute('x', x);
	
		document.getElementById("point").setAttribute('y', y);
	
		console.log("Moved");
	
	}
	
	
	function fillDetails(message){
	
		var source   = document.getElementById("class-template").innerHTML;
	
		var template = Handlebars.compile(source);
	
		if($('#myModal').is(':visible'))
	
		{
	
			$('#myModal').modal('toggle');
	
		}
	
		var context = {stream: message.stream,
	
					lab: message.lab,
	
					instructor: message.instructor,
	
					timings: message.timings,
	
					image:message.image};
	
		var html    = template(context);
	
		$("#card-content").html(html);
	
		$('#myModal').modal('toggle');
	
		
	
	}
	function switchbulb(bulbid, action)
	
	{
		if(action=="ON")
		{
			document.getElementById(bulbid).setAttribute("xlink:href", "ui/images/bulbon_R.png");
		}
		else
		{
			document.getElementById(bulbid).setAttribute("xlink:href", "ui/images/bulboff_R.png");
		}
	}

	//
	function displayBeaconList()
	{
		// Clear beacon list.
		$('#found-beacons').empty();
		$('#nearest-beacons').empty();

		var timeNow = Date.now();
		var highestrssi=100;
		var highestelement="notfound";
	
		// Update beacon list.
		$.each(beacons, function(key, beacon)
		{
			// Only show beacons that are updated during the last 60 seconds.
			if (beacon.timeStamp + 60000 > timeNow)
			{
				// Map the RSSI value to a width in percent for the indicator.
				var rssiWidth = 1; // Used when RSSI is zero or greater.
				if (beacon.rssi < -100) 
				{ rssiWidth = 100; }

				else if (beacon.rssi < 0) { 
					
					rssiWidth = 100 + beacon.rssi; 
				}
				
				// Create tag to display beacon data.
				var element = $(
					'<li>'
					+	'<strong>UUID: ' + beacon.uuid + '</strong><br />'
					//+	'Major: ' + beacon.major + '<br />'
					//+	'Minor: ' + beacon.minor + '<br />'
					//+	'Proximity: ' + beacon.proximity + '<br />'
					+	'RSSI: ' + beacon.rssi + '<br />'
					+ 	'<div style="background:rgb(255,128,64);height:20px;width:'
					+ 		rssiWidth + '%;"></div>'
					+ '</li>'
				);
				console.log("new Width:"+rssiWidth);
				console.log("old Width:"+highestrssi);
				if(highestrssi==100 || highestrssi<= rssiWidth)
				{
					console.log("nearBeacon logging");
					highestrssi=rssiWidth;
					highestelement=beacon.uuid;
					console.log("New Width final:"+highestrssi);
				}
				$('#warning').remove();
				//$('#found-beacons').append(element);
			}
		});
		console.log("nearBeacon:"+highestelement);
		console.log("old Beacon:"+olduuid);
		$('#nearest-beacons').append(highestelement);
		$('#nearest-beacons').append("");
		$('#nearest-beacons').append(":"+highestrssi);
		if(olduuid!=highestelement )
		{
			if(highestrssi>50)
			{
				olduuid=highestelement;
			
				selectPayload(highestelement);
			}
			else
			{
				console.log("beacon not near enough");
			}
		}
		else{
			console.log("Same position no update");
		}
	}

	return app;
})();

app.initialize();
