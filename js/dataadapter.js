

function DataAdapter(args){
	this.async = false;
	if (args != null){
		if (args.async != null){
			this.async = args.async;
		}
	}
	this.onSuccess = new Event(this);
	this.onError = new Event(this);
}

DataAdapter.prototype.load = function(relativeFilePath){
	var _this = this;
debugger
	$.ajax({
		'async': this.async,
		'global': false,
		'url': "data/"  + relativeFilePath,
		'dataType': "json",
		'success': function (data) {
			_this.onSuccess.notify(data);
		},
		'error':function(e,b,a){
			console.log((e.responseText))
			debugger
			
		}
	    });
};

DataAdapter.prototype.filterLogsByTime = function(logs, startHour, endHour, startMinute, endMinute){
	var result = [];
	for (var i =0; i < logs.length; i++){
		var include = this.filterLogByTime(logs[i], startHour, endHour, startMinute, endMinute);
		if (include != null){
			result.push(include);
		}
	}
	return result;
};
DataAdapter.prototype.filterLogByTime = function(log, startHour, endHour, startMinute, endMinute){
	var splitted = log.DATE.split(" ")[3].split(":");
	var hour = parseFloat(splitted[0]);
	var minutes = parseFloat(splitted[1]);
	var seconds = parseFloat(splitted[2]);

	if ((hour >= startHour )&&(hour <= endHour)){
		if ((hour > startHour) && (hour < endHour) ){
			return log;
		}
	}

	if (hour == startHour ){
		if ( (minutes >= startMinute) ){
			return log;
		}
	}

	if (hour == endHour ){
		if ( (minutes <= endMinute) ){
			return log;
		}
	}


};
DataAdapter.prototype.getData = function(day, month, year, startHour, endHour, startMinute, endMinute){
 	//BIOSAXS_WS_ispyb.log.2015-02-03-18.json
	var _this = this;
	var files = [];
	var logs = [];
	if (year != "server.log"){
		for (var i = startHour; i<=endHour; i++){
			var hour = new String(i);
	
			var file = "BIOSAXS_WS_ispyb.log." + year + "-" + month + "-" + day + "-"  + hour + ".json";
			if (hour < 10){
				 file = "BIOSAXS_WS_ispyb.log." + year + "-" + month + "-" + day + "-0"  + hour + ".json";
			}
			//files.push("BIOSAXS_WS_ispyb.log." + year + "-" + month + "-" + day + "-"  + i + ".json");
			var myaAdapter = new DataAdapter({async : false});
			myaAdapter.onSuccess.attach(function(sender, data){
				logs = logs.concat(data);
			});
			if (logs.length > LoggerUI.maxMethodDescriptionCount){
				break;
			}
			myaAdapter.load(file);
		
		}
		this.onSuccess.notify(this.filterLogsByTime(logs, startHour, endHour, startMinute, endMinute));
	}
	else{
			var myaAdapter = new DataAdapter({async : false});
			myaAdapter.onSuccess.attach(function(sender, data){
				_this.onSuccess.notify(data);
			});
			myaAdapter.load(package + "server.log.json");
	}
};
