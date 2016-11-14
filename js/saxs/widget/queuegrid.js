function QueueGrid(args) {
//	this.height = Ext.getBody().getHeight() - 500;

	this.decimals = 3;
	this.onSelect = new Event();

	this.maxHeight = 600;
	this.imgWidth = 77;
	
	this.id = BUI.id();
	this.title = 'Data Collections';
	this.key = {};

	this.selectionMode = 'MULTI';
	
	this.collapsible = true;
	this.collapsed = false;
	
	var _this = this;
	this.filters = [ function(item) {
		if (item.data.dataCollectionId == null) {
			return false;
		}
		if (_this.key[item.data.dataCollectionId] == null) {
			_this.key[item.data.dataCollectionId] = [];
		}
		_this.key[item.data.dataCollectionId].push(item.data);
		return item.data.macromoleculeId != null;
	} ];
	if (args!= null){
		if (args.maxHeight != null){
			this.maxHeight = args.maxHeight;
		}
		if (args.collapsible != null){
			this.collapsible = args.collapsible;
		}
		if (args.collapsed != null){
			this.collapsed = args.collapsed;
		}
		if (args.selectionMode != null){
			this.selectionMode = args.selectionMode;
		}
		if (args.title != null){
			if (args.title == false){
				this.title = null;
			}
		}
	}
	
	this.selected = []; 
	this.onSelectionChange = new Event();
	this.onDeselect = new Event(this);
	this.onSelect = new Event(this);

}



QueueGrid.prototype.getPercentage = function(averaged, total) {
	
	var color = "green";
	if (averaged == null){
		averaged = "NA";
		color = "orange";
	}
	if (total == null){
		total = "NA";
		color = "orange";
	}
	
	if ((averaged != "NA")&(total != "NA")){
		if (averaged/total >= 0.3){
			color = "orange";
		}
		if (averaged/total > 0.7){
			color = "#BCF5A9";
		}
		
		if (averaged/total < 0.3){
			color = "red";
		}
		
		
	}
	
	return {color : color,
			text : averaged + " / " + total};
};


QueueGrid.prototype.getImage = function(sample, name) {
	if (sample.subtractionId != null) {
		var url = EXI.getDataAdapter().saxs.subtraction.getImage(sample.subtractionId, name);
		return url;
	}
};


QueueGrid.prototype.parseData = function(data) {
	var templateData = {rows : [], id : this.id, height : this.maxHeight};
	if (!_.isEmpty(data)) {
		for (var i = 0 ; i < _.keys(data).length ; i++) {
			var dataCollectionId = _.keys(data)[i];
			var currentDataCollection = data[dataCollectionId];                      
			var html = "";

			var codes = [];
			var macromoleculeInfo = [];
			var averages = [];
			var expTemp = currentDataCollection[0].exposureTemperature + " C";

			var rg = "NA";
			var points = "NA";
			if (currentDataCollection[0].rg != null) {
				rg = Number(currentDataCollection[0].rg).toFixed(this.decimals);
				points = currentDataCollection[0].firstPointUsed + " - " + currentDataCollection[0].lastPointUsed + " (" + (currentDataCollection[0].lastPointUsed - currentDataCollection[0].firstPointUsed) + ")";
			}	
			var I0 = "NA";
			if (currentDataCollection[0].I0 != null){
				var I0 = Number(currentDataCollection[0].I0).toFixed(this.decimals-2);
				var I0Stdev = Number(Number(currentDataCollection[0].I0Stdev).toFixed(this.decimals)).toExponential();
			}

			var rgGnom = "NA";
			if (currentDataCollection[0].rgGnom != null) {
				rgGnom = Number(currentDataCollection[0].rgGnom).toFixed(this.decimals);
			}	
			var total = "NA";
			if (currentDataCollection[0].total != null) {
				total = Number(currentDataCollection[0].total).toFixed(this.decimals);
			}
			var dmax = "NA";
			if (currentDataCollection[0].dmax != null) {
				dmax = Number(currentDataCollection[0].dmax).toFixed(this.decimals);
			}

			var volumePorod = "NA";
			var mmvolest = "NA";
			if (currentDataCollection[0].volumePorod != null) {
				volumePorod = Number(currentDataCollection[0].volumePorod).toFixed(this.decimals);
				mmvolest = Number(currentDataCollection[0].volumePorod / 2).toFixed(1) + " - "
										+ Number(currentDataCollection[0].volumePorod / 1.5).toFixed(1);
			}

			var scattering = "";
			var kratky = "";
			var density = "";
			var guinier = "";
			

			for (var j = 0 ; j < currentDataCollection.length ; j++) {
				var experiment = currentDataCollection[j];
				var concentration = "";

				codes.push(experiment.code);
				if (experiment.concentration != 0) {
					concentration = Number(experiment.concentration).toFixed(this.decimals-1);
				}
				if (experiment.macromoleculeId != null) {
					scattering = this.getImage(experiment,"scattering");
					kratky = this.getImage(experiment,"kratky");
					density = this.getImage(experiment,"density");
					guinier = this.getImage(experiment,"guinier");
				}
				var macromoleculeAcronym = experiment.macromoleculeAcronym;
				if (macromoleculeAcronym == null) {
					macromoleculeAcronym = "";
				}
				macromoleculeInfo.push({ acronym : macromoleculeAcronym, concentration : concentration});
				averages.push(this.getPercentage(experiment.framesMerge,experiment.framesCount));
			}
			
			templateData.rows.push({
									codes : codes,
									macromoleculeInfo : macromoleculeInfo,
									averages : averages,
									expTemp : expTemp,
									rg : rg,
									points : points,
									I0 : I0,
									I0Stdev : I0Stdev,
									rgGnom : rgGnom,
									total : total,
									dmax : dmax,
									volumePorod : volumePorod,
									mmvolest : mmvolest,
									scattering : scattering,
									kratky : kratky,
									density : density,
									guinier : guinier,
									imgWidth : this.imgWidth
								});
		}
	}
	
	return templateData;
};

QueueGrid.prototype.load = function(experiment) {
	var _this = this;
	
	this.setLoading();
	_this.key = {};
	if (experiment.experimentId) {
		var onSuccess = function(sender, data){
			if (data != null) {

				_this.dataByDataCollectionId = _this.parseDataById(data);

				_this.render(_this.dataByDataCollectionId);
			}
		};

		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByExperimentId(experiment.experimentId);
	} else {
		_this.dataByDataCollectionId = _this.parseDataById(experiment);
		this.render(_this.dataByDataCollectionId);
	}
};

QueueGrid.prototype.render = function(data) {
	
	var templateData = this.parseData(data);

	var html = "";
	dust.render("queue.grid.template", templateData, function(err, out) {                                                                                               
		html = html + out;
	});
	
	$('#' + this.id).hide().html(html).fadeIn('fast');

	this.attachCallBackAfterRender();
}

QueueGrid.prototype.parseDataById = function (data) {
	var parsed = {};
	data.sort(function (a,b){
		return a.measurementId - b.measurementId;
	});
	var byDataCollectionId = _.keyBy(data,'dataCollectionId');
	for (var i=0 ; i < _.keys(byDataCollectionId).length ; i++) {
		var dataCollectionId = Number(_.keys(byDataCollectionId)[i]);
		parsed[dataCollectionId] = _.filter(data,{'dataCollectionId' : dataCollectionId});
	}
	return parsed;
}

QueueGrid.prototype.filter = function(key, value) {
	var filtered = _.filter(this.dataByDataCollectionId,function(o) {return o[0]["bufferAcronym"] == value});
	this.render(this.parseDataById([].concat.apply([], filtered)));
}

QueueGrid.prototype.setLoading = function(){
	$('#' + this.id).html("Loading...");
};

QueueGrid.prototype.getPanel = function(){
    var _this = this;

	return {
		html : '<div id="' + this.id + '"></div>',
		autoScroll : false
	}
};

QueueGrid.prototype.getHeader = function() {
	var html = "";
	dust.render("queue.grid.header.template", [], function(err, out) {                                                                       
		html = html + out;
	});
	return html;
}

/**
* Attaches the events to lazy load to the images. Images concerned are with the class queue-img
*
* @method attachCallBackAfterRender
*/
QueueGrid.prototype.attachCallBackAfterRender = function() {
    
    var _this = this;
    
    var nodeWithScroll = document.getElementById("xx");
	
    var lazy = {
            bind: 'event',
            /** !!IMPORTANT this is the parent node which contains the scroll **/
            appendScroll: nodeWithScroll,
            beforeLoad: function(element) {
                console.log('image "' + (element.data('src')) + '" is about to be loaded');                                
            },           
            onFinishedAll: function() {
                EXI.mainStatusBar.showReady();
            }
    };
       
    var timer1 = setTimeout(function() { $('.queue-img').lazy(lazy);}, 500);

};