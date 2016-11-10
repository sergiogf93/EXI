function QueueGrid(args) {
//	this.height = Ext.getBody().getHeight() - 500;

	this.decimals = 3;
	this.onSelect = new Event();

	this.maxHeight = 600;
	this.imgWidth = 150;
	
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

QueueGrid.prototype.getSorters = function() {
	return {};
};

QueueGrid.prototype.getSelected = function() {
	return this.selected;
};


QueueGrid.prototype.getSelectedData = function() {
	var elements = this.panel.getSelectionModel().selected.items;
	var data = [];
	for (var i = 0; i < elements.length; i++) {
		data.push(elements[i].data);
	}
	return data;
};




QueueGrid.prototype.getFields = function() {
	return [ 'experimentId', 'subtractionId', 'macromoleculeAcronym', 'priorityLevelId', 'code', 'exposureTemperature', 'concentration' ];
};

QueueGrid.prototype.getRunHTML = function(sample) {
	var dataCollectionId = sample.data.dataCollectionId;
	var table = document.createElement("table");
	if (this.key[dataCollectionId] != null) {

		this.key[dataCollectionId].sort(function(a, b) {
			return b.measurementId - a.measurementId;
		});

		for (i in this.key[dataCollectionId]) {
			var specimen = this.key[dataCollectionId][i];
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			if (specimen.measurementCode != null){
				if (specimen.macromoleculeId == null) {
					td.setAttribute("style", "padding-top:1px;width:130px;color:gray;");
					td.appendChild(document.createTextNode("# " + specimen.measurementCode));
				} else {
					td.setAttribute("style", "padding-top:1px;width:130px;font-weight:bold;");
					td.appendChild(document.createTextNode("# " + specimen.measurementCode));
				}
			}
			else{
				td.appendChild(document.createTextNode(" - "));
			}
			tr.appendChild(td);
			table.appendChild(tr);
		}

	}
	return "<table>" + table.innerHTML + "</table>";
};

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

QueueGrid.prototype.getFramesHTML = function(sample) {
	var dataCollectionId = sample.data.dataCollectionId;
	var table = document.createElement("table");
	if (this.key[dataCollectionId] != null) {

		this.key[dataCollectionId].sort(function(a, b) {
			return b.measurementId - a.measurementId;
		});

		for (i in this.key[dataCollectionId]) {
			var specimen = this.key[dataCollectionId][i];
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			if (specimen.macromoleculeId == null) {
				td.setAttribute("style", "width:130px;color:gray;");
				td.appendChild(document.createTextNode(specimen.bufferAcronym));
			} else {
				td.setAttribute("style", "width:130px;font-weight:bold;");
				td.appendChild(document.createTextNode(specimen.macromoleculeAcronym));
			}
			tr.appendChild(td);
			
			tr.appendChild(this.getPercentage(specimen.framesMerge, specimen.framesCount));

			var td = document.createElement("td");
			var a = document.createElement("a");
			if (specimen.macromoleculeId == null) {
				a.setAttribute("href", BUI.getZipURLByAverageId(specimen.mergeId, specimen.measurementCode));
			} else {
				a.setAttribute("href", BUI.getZipURLBySubtractionId(specimen.subtractionId, specimen.measurementCode));
			}

			tr.appendChild(td);

			table.appendChild(tr);
		}

	}
	return "<table>" + table.innerHTML + "</table>";
};

QueueGrid.prototype.getHTMLTable = function(items) {
	var html = "";
	for (var i = 0; i < items.length; i++) {
			html = html + "<tr><td class='key_subgrid'>" + items[i].key + "</td><td class='value_subgrid'>" + items[i].value + "</td></tr>";
	}
	return "<table>" + html + "</table>";
};

QueueGrid.prototype.getImage = function(sample, name) {
	if (sample.subtractionId != null) {
		var url = EXI.getDataAdapter().saxs.subtraction.getImage(sample.subtractionId, name);
		return url;
	}
};

QueueGrid.prototype.getColumns = function() {
    var _this = this;
    var columns = [
        {
            flex: 1.5,
            hidden: false,
            renderer: function(grid, e, record) {
				
				var dataCollectionId = Number(record.data);
				var currentDataCollection = _this.dataByDataCollectionId[dataCollectionId];                      
				var html = "";

				var codes = [];
				var macromoleculeInfo = [];
				var averages = [];
				var expTemp = currentDataCollection[0].exposureTemperature + " C";

				var rg = "NA";
				var points = "NA";
				if (currentDataCollection[0].rg != null) {
					rg = Number(currentDataCollection[0].rg).toFixed(_this.decimals);
					points = currentDataCollection[0].firstPointUsed + " - " + currentDataCollection[0].lastPointUsed + " (" + (currentDataCollection[0].lastPointUsed - currentDataCollection[0].firstPointUsed) + ")";
				}	
				var I0 = "NA";
				if (currentDataCollection[0].I0 != null){
					var I0 = Number(currentDataCollection[0].I0).toFixed(_this.decimals-1);
					var I0Stdev = Number(Number(currentDataCollection[0].I0Stdev).toFixed(_this.decimals)).toExponential();
				}

				var rgGnom = "NA";
				if (currentDataCollection[0].rgGnom != null) {
					rgGnom = Number(currentDataCollection[0].rgGnom).toFixed(_this.decimals);
				}	
				var total = "NA";
				if (currentDataCollection[0].total != null) {
					total = Number(currentDataCollection[0].total).toFixed(_this.decimals);
				}
				var dmax = "NA";
				if (currentDataCollection[0].dmax != null) {
					dmax = Number(currentDataCollection[0].dmax).toFixed(_this.decimals);
				}

				var volumePorod = "NA";
				var mmvolest = "NA";
				if (currentDataCollection[0].volumePorod != null) {
					volumePorod = Number(currentDataCollection[0].volumePorod).toFixed(_this.decimals);
					mmvolest = Number(currentDataCollection[0].volumePorod / 2).toFixed(1) + " - "
											+ Number(currentDataCollection[0].volumePorod / 1.5).toFixed(1);
				}

				var scattering = "";
				var kratky = "";
				var density = "";
				var guinier = "";
				

				for (var i = 0 ; i < currentDataCollection.length ; i++) {
					var experiment = currentDataCollection[i];
					var concentration = "";

					codes.push(experiment.code);
					if (experiment.concentration != 0) {
						concentration = Number(experiment.concentration).toFixed(_this.decimals-1)  + " mg/ml";
					}
					if (experiment.macromoleculeId != null) {
						scattering = _this.getImage(currentDataCollection[0],"scattering");
						kratky = _this.getImage(currentDataCollection[0],"kratky");
						density = _this.getImage(currentDataCollection[0],"density");
						guinier = _this.getImage(currentDataCollection[0],"guinier");
					}
					var macromoleculeAcronym = experiment.macromoleculeAcronym;
					if (macromoleculeAcronym == null) {
						macromoleculeAcronym = "";
					}
					macromoleculeInfo.push({ acronym : macromoleculeAcronym, concentration : concentration});
					averages.push(_this.getPercentage(experiment.framesMerge,experiment.framesCount));
				}
				
				var templateData = {
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
										imgWidth : _this.imgWidth
									};
	
				dust.render("queue.grid.template", templateData, function(err, out) {                                                                       
                    html = html + out;
                });
				
				return html;
            }
        }      
    ];
    return columns;
};

QueueGrid.prototype.load = function(data) {
	if (data != null) {
		this.key = {};
		this.dataByDataCollectionId = {};
		var byDataCollectionId = _.keyBy(data,'dataCollectionId');
		for (var i=0 ; i < _.keys(byDataCollectionId).length ; i++) {
			var dataCollectionId = Number(_.keys(byDataCollectionId)[i]);
			this.dataByDataCollectionId[dataCollectionId] = _.filter(data,{'dataCollectionId' : dataCollectionId});
		}
		this.store.loadData(_.keys(_.keyBy(data,'dataCollectionId')), true);
	} else {
		this.store.load();
	}
};

QueueGrid.prototype.getPanel = function(){
    var _this = this;

	this.store = Ext.create('Ext.data.Store', {
            fields: ["experimentGroup"]
     });

	var header = Ext.create('Ext.panel.Panel', {
		items : [{html : _this.getHeader()}]
	})

    this.grid = Ext.create('Ext.grid.Panel', {
		dataIndex: 'experimentGroup',
		dataIndex: 'experimentGroup',
        store: this.store,  
        id: this.id,     
        disableSelection: true,
        columns: this.getColumns(),
		hideHeaders: true,
        viewConfig: {
            enableTextSelection: true,
            stripeRows: false,
			trackOver : false
        }
    });

	this.panel = Ext.create('Ext.panel.Panel', {
        border: 1,        
		items : [header, this.grid]
	})

    return this.panel;
};

QueueGrid.prototype.getHeader = function () {
	var html = "";
	dust.render("queue.grid.header.template", [], function(err, out) {                                                                       
		html = html + out;
	});
	return html;
}

QueueGrid.prototype.onDataReductionButtonClicked = function(record) {
	var adapter = new DataAdapter();
	var dataReductionForm = new DataReductionForm({});

	Ext.create('Ext.window.Window', {
		title : 'Data Reduction',
		height : 540,
		width : 1000,
		modal : true,
		items : [ dataReductionForm.getPanel() ]
	}).show();

	dataReductionForm.panel.setLoading();
	adapter.onSuccess.attach(function(sender, subtractions) {
		dataReductionForm.refresh(subtractions);
		dataReductionForm.panel.setLoading(false);
	});
	adapter.getSubtractionsBySubtractionIdList([ record.subtractionId ]);
};

