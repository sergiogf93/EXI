function OverviewQueueGrid(args) {
//	this.height = Ext.getBody().getHeight() - 500;
	QueueGrid.call(this,args);
    this.imgWidth = 200;

}



OverviewQueueGrid.prototype.getPercentage = QueueGrid.prototype.getPercentage;
OverviewQueueGrid.prototype.getImage = QueueGrid.prototype.getImage;
OverviewQueueGrid.prototype.parseDataById = QueueGrid.prototype.parseDataById;
OverviewQueueGrid.prototype.attachCallBackAfterRender = QueueGrid.prototype.attachCallBackAfterRender;



OverviewQueueGrid.prototype.parseData = function(data) {
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
			
            var dataReduction = false;
            var abinitio = false;
            var fit = false;
            var superposition = false;
            var rigidBody = false;

			for (var j = 0 ; j < currentDataCollection.length ; j++) {
				var experiment = currentDataCollection[j];
				var concentration = "";

				codes.push(experiment.code);
				if (experiment.concentration != 0) {
					concentration = Number(experiment.concentration).toFixed(this.decimals-1);
                    if (experiment.runCreationDate) {
                        dataReduction = true;
                    }
                    if (experiment.abinitioCount != 0) {
                        abinitio = true;
                    }
                    if (experiment.fitCount != 0) {
                        fit = true;
                    }
                    if (experiment.superpositionCount != 0) {
                        superposition = true;
                    }
                    if (experiment.rigidbodyCount != 0) {
                        rigidBody = true;
                    }
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
									imgWidth : this.imgWidth,
                                    dataReduction : dataReduction,
                                    abinitio : abinitio,
                                    fit : fit,
                                    superposition : superposition,
                                    rigidBody : rigidBody,
								});
		}
	}
	
	return templateData;
};

OverviewQueueGrid.prototype.load = function(experiment) {
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

OverviewQueueGrid.prototype.render = function(data) {
	
	var templateData = this.parseData(data);

	var html = "";
	dust.render("queue.grid.template", templateData, function(err, out) {                                                                                               
		html = html + out;
	});
	
	$('#' + this.id).hide().html(html).fadeIn('fast');

	this.attachCallBackAfterRender(document.getElementById("xx"));
}


OverviewQueueGrid.prototype.filter = function(key, value) {
	var filtered = _.filter(this.dataByDataCollectionId,function(o) {return o[0]["bufferAcronym"] == value});
	this.render(this.parseDataById([].concat.apply([], filtered)));
}

OverviewQueueGrid.prototype.setLoading = function(){
	$('#' + this.id).html("Loading...");
};

OverviewQueueGrid.prototype.getPanel = function(){
    var _this = this;

	return {
		html : '<div id="' + this.id + '"></div>',
		autoScroll : false,
        padding : this.padding
	}
};

OverviewQueueGrid.prototype.getHeader = function() {
	var html = "";
	dust.render("queue.grid.header.template", [], function(err, out) {                                                                       
		html = html + out;
	});
	return html;
}
