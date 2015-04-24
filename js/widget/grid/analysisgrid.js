function QueueGrid() {
	this.width =  Ext.getBody().getWidth() - 500;
	this.height = Ext.getBody().getHeight() - 500;

	this.decimals = 3;
	this.onSelect = new Event();
	
	this.key = {};
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
	
}

QueueGrid.prototype.getSorters = function() {
	return {};
};

QueueGrid.prototype.getFields = function() {
	return [ 'experimentId', 'subtractionId', 'macromoleculeAcronym', 'priorityLevelId', 'code', 'exposureTemperature', 'concentration'  ];
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
			if (specimen.macromoleculeId == null) {
				td.setAttribute("style", "padding-top:4px;width:130px;color:gray;");
				td.appendChild(document.createTextNode("# " + specimen.measurementCode));
			} else {
				td.setAttribute("style", "padding-top:4px;width:130px;font-weight:bold;");
				td.appendChild(document.createTextNode("# " + specimen.measurementCode));
			}
			tr.appendChild(td);
			table.appendChild(tr);
		}

	}
	return "<table>" + table.innerHTML + "</table>";
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
			var frames = specimen.framesMerge + "/" + specimen.framesCount;
			var tdFrames = document.createElement("td");
			tdFrames.appendChild(document.createTextNode(frames));
			tr.appendChild(tdFrames);

			var td = document.createElement("td");
			var a = document.createElement("a");
			if (specimen.macromoleculeId == null) {
				a.setAttribute("href", BUI.getZipURLByAverageId(specimen.mergeId, specimen.measurementCode));
			} else {
				a.setAttribute("href", BUI.getZipURLBySubtractionId(specimen.subtractionId, specimen.measurementCode));
			}

			var img = document.createElement("img");
			img.setAttribute("src", "../images/download.png");
			img.setAttribute("style", "width:12px;height:12px;cursor:pointer;");
			a.appendChild(img);
			td.appendChild(a);
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

QueueGrid.prototype.getColumns = function() {
	var _this = this;
	return [
			{
				header : "dataCollectionId",
				name : "dataCollectionId",
				dataIndex : "dataCollectionId",
				hidden : true
			},
			{
				header : "Exp. Id",
				name : "experimentId",
				dataIndex : "experimentId",
				hidden : true
			},
			{
				header : "Exp. Name",
				name : "name",
				dataIndex : "name",
				hidden : true
			},
			{
				header : "MeasurementId",
				name : "measurementId",
				dataIndex : "measurementId",
				hidden : true,
				renderer : function(val, y, sample) {
					return sample.raw.measurementId;
				}
			},
			{
				header : "Date",
				name : "date",
				width : 150,
				dataIndex : "runCreationDate",
				hidden : true
			},

			{
				header : "Run",
				width : 50,
				name : "runNumber",
				dataIndex : "measurementCode",
				renderer : function(val, y, sample) {
					return _this.getRunHTML(sample);//"<span style='font-weight:bold;'>#" + val + "</span>";
				}
			},
			{
				header : "Frames (Average/Total)",
				dataIndex : "macromoleculeId",
				name : "macromoleculeAcronym",
				width : 175,
				// locked : true,
				hidden : false,
				renderer : function(val, meta, sample) {
					return _this.getFramesHTML(sample);

				}
			},{
				text : 'Scattering',
				dataIndex : 'subtractionId',
				width : 70,
				// locked : true,
				name : 'subtractionId',
				renderer : function(val, y, sample) {
					if (sample.data.macromoleculeId != null) {
						if (sample.data.subtractionId != null) {
							var url = BUI.getURL() + '&type=scattering&subtractionId=' + sample.data.subtractionId;
							var event = "OnClick= window.open('" + url + "')";
							return '<img src=' + url + '   height="60" width="60" ' + event + '>';
						}
					}
				}
			},
			{
				header : "Macromolecule",
				name : "macromoleculeAcronym",
				dataIndex : "macromoleculeAcronym",
				flex : 1,
				hidden : true
			},
			{
				header : "Concentration",
				name : "concentration",
				width : 100,
				dataIndex : "concentration",
				hidden : false,
				renderer : function(val, y, sample) {
					if (sample.data.concentration != 0) {
						return BUI.formatValuesUnits(sample.data.concentration, "mg/ml", 7, this.decimals);
					}
				}
			},
			{
				header : "Exp. Temp.",
				name : "bufferAcronym",
				width : 75,
				dataIndex : "bufferAcronym",
				hidden : true,
				renderer : function(val, y, sample) {
					return BUI.formatValuesUnits(sample.data.exposureTemperature, "C", 10, this.decimals);
				}
			},
			{
				header : "Sample",
				dataIndex : "macromoleculeId",
				name : "macromoleculeAcronym",
				locked : false,
				hidden : true,
				renderer : function(val, y, sample) {
					var html = "<table>"
					var macromolecule = BIOSAXS.proposal.getMacromoleculeById(sample.data.macromoleculeId);
					if (macromolecule != null) {
						html = html + '<tr><td style="vertical-align:center;">' + macromolecule.acronym + '</td></tr>';
					}
					if (sample.data.bufferId != null) {
						if (BIOSAXS.proposal.getBufferById(sample.data.bufferId) != null) {
							var bufferAcronym = BIOSAXS.proposal.getBufferById(sample.data.bufferId).acronym;
							if ((bufferAcronym == "") || (bufferAcronym == null)) {
								bufferAcronym = "";
							}
							html = html + '<tr><td>' + bufferAcronym + '</td></tr>';
						}
					}
					return html + "</table>";
				}
			},{
				text : 'Kratky.',
				dataIndex : 'subtractionId',
				width : 66,
				hidden : true,
				name : 'subtractionId',
				renderer : function(val, y, sample) {
					if (sample.data.macromoleculeId != null) {
						if (sample.data.subtractionId != null) {
							var url = BUI.getURL() + '&type=kratky&subtractionId=' + sample.data.subtractionId;
							var event = "OnClick= window.open('" + url + "')";
							return '<img src=' + url + '   height="60" width="60" ' + event + '>';
						}
					}
				}
			},
			{
				text : 'P(r).',
				hidden : true,
				width : 66,
				dataIndex : 'subtractionId',
				type : 'string',
				renderer : function(val, y, sample) {
					if (sample.data.macromoleculeId != null) {
						if (sample.data.subtractionId != null) {
							var url = BUI.getURL() + '&type=gnom&subtractionId=' + sample.data.subtractionId;
							var event = "OnClick= window.open('" + url + "')";
							return '<img src=' + url + '   height="60" width="60" ' + event + '>';
						}
					}
				}
			},
			{
				text : 'Guinier.',
				hidden : true,
				width : 66,
				dataIndex : 'subtractionId',
				type : 'string',
				renderer : function(val, y, sample) {
					if (sample.data.macromoleculeId != null) {
						if (sample.data.subtractionId != null) {
							var url = BUI.getURL() + '&type=guinier&subtractionId=' + sample.data.subtractionId;
							var event = "OnClick= window.open('" + url + "')";
							return '<img src=' + url + '   height="60" width="60" ' + event + '>sdfsdfs</img>';
						}
					}
				}
			},
			{
				text : 'Guinier',
				name : 'Guinier',
				width : 180,
				dataIndex : 'subtractionId',
				renderer : function(val, y, sample) {
					if (sample.data.macromoleculeId != null) {
						if (sample.data.subtractionId != null) {
							var items = [];
							items.push({
								key : "Rg",
								value :BUI.formatValuesUnits(sample.data.rg, "nm", 12, this.decimals)
							});
							items.push({
								key : "Points",
								value :"<span>" + sample.data.firstPointUsed + " - " + sample.data.lastPointUsed + " (" + (sample.data.lastPointUsed - sample.data.firstPointUsed) + ")</span>"
							});
							items.push({
								key : "I0",
								value :BUI.formatValuesErrorUnitsScientificFormat(sample.data.I0, sample.data.I0Stdev, "")
							});
							
							console.log(_this.getHTMLTable(items));
							return _this.getHTMLTable(items);
							
							
						}
					}
				}
			},
			{
				text : 'Gnom',
				name : 'Gnom',
				width : 180,
				dataIndex : 'subtractionId',
				renderer : function(val, y, sample) {
					if (sample.data.macromoleculeId != null) {
						if (sample.data.subtractionId != null) {
							var items = [];
							items.push({
								key : "Rg",
								value :  BUI.formatValuesUnits(sample.data.rgGnom, "nm")
							});
							items.push({
								key : "Total",
								value : BUI.formatValuesUnits(sample.data.total, '')
							});
							items.push({
								key : "D<sub>max</sub>",
								value : BUI.formatValuesUnits(sample.data.dmax, "") + "<span style='font-size:8px;color:gray;'> nm</span>"
							});
							
							return _this.getHTMLTable(items);
							
							
						}
					}
				}
			},
			{
				text : 'Porod',
				name : 'Porod',
				width : 180,
				dataIndex : 'subtractionId',
				renderer : function(val, y, sample) {
					if (sample.data.macromoleculeId != null) {
						if (sample.data.subtractionId != null) {
							var items = [];
							items.push({
								key : "Volume",
								value :  BUI.formatValuesUnits(sample.data.volumePorod, '') + "<span style='font-size:8px;color:gray;'> nm<sub>3</sub></span>"
							
							});
							items.push({
								key : "MM Vol. est.",
								value : Number(sample.data.volumePorod / 2).toFixed(1) + " - " + Number(sample.data.volumePorod / 1.5).toFixed(1)
								+ "<span style='font-size:8px;color:gray;'>kD</span>"
							});
							
							return _this.getHTMLTable(items);
							
							
						}
					}
				}
			}
			,
			{
				text : 'Advanced',
				id : this.id + 'buttonAction',
				dataIndex : 'subtrationId',
				witdh : 200,
				renderer : function(val, y, sample) {
					// 'fitCount', 'superposisitionCount', 'rigidbodyCount',
					// 'abinitioCount'
					var html = "<table><tr><td style='padding-bottom: 1px;'>" + BUI.getGreenButton("Data Reduction", {
						width : 90,
						height : 15
					}) + "</td></tr>";

					if (sample.data.abinitioCount > 0) {
						html = html + "<tr><td style='padding-bottom: 1px;'>" + BUI.getGreenButton("Abinitio", {
							width : 90,
							height : 15
						}) + "</td></tr>";
					} else {
						html = html + "<tr><td style='padding-bottom: 1px;'>" + BUI.getBlueButton("Abinitio", {
							width : 90,
							height : 15
						}) + "</td></tr>";
					}

					if (sample.data.fitCount > 0) {
						html = html + "<tr><td style='padding-bottom: 1px;'>" + BUI.getGreenButton("Fit", {
							width : 90,
							height : 15
						}) + "</td></tr>";
					} else {
						html = html + "<tr><td style='padding-bottom: 1px;'>" + BUI.getBlueButton("Fit", {
							width : 90,
							height : 15
						}) + "</td></tr>";
					}

					if (sample.data.superposisitionCount > 0) {
						html = html + "<tr><td style='padding-bottom: 1px;'>" + BUI.getGreenButton("Superposition", {
							width : 90,
							height : 15
						}) + "</td></tr>";
					} else {
						html = html + "<tr><td style='padding-bottom: 1px;'>" + BUI.getBlueButton("Superposition", {
							width : 90,
							height : 15
						}) + "</td></tr>";
					}
					if (sample.data.rigidbodyCount > 0) {
						html = html + "<tr><td style='padding-bottom: 1px;'>" + BUI.getGreenButton("Rigid Body", {
							width : 90,
							height : 15
						}) + "</td></tr>";
					} else {
						html = html + "<tr><td style='padding-bottom: 1px;'>" + BUI.getBlueButton("Rigid Body", {
							width : 90,
							height : 15
						}) + "</td></tr>";
					}

					return html + "</table>";
				}

			} 
];
};

QueueGrid.prototype.refresh = function(data) {
	if (data != null) {
		this.key = {};
		this.store.loadData(data);
	} else {
		this.store.load();

	}
};

QueueGrid.prototype._getPorod = function() {
	
	return {
		text : 'Porod',
		name : 'Porod',
		columns : [
				{
					text : 'Volume',
					dataIndex : 'volumePorod',
					width : 80,
					sortable : true,
					renderer : function(val, y, sample) {
						if (sample.data.macromoleculeId != null) {
							if (sample.data.subtractionId != null) {
								if (sample.data.volumePorod != null)
									return BUI.formatValuesUnits(sample.data.volumePorod, '') + "<span style='font-size:8px;color:gray;'> nm<sub>3</sub></span>";
							}
						}
					}
				},
				{
					text : 'MM Vol. est.',
					dataIndex : 'volumeEdna',
					tooltip : '[Volume/2 - Volume/1.5] (Guinier)',
					sortable : true,
					width : 95,
					renderer : function(val, y, sample) {
						var html = "";
						if (sample.data.macromoleculeId != null) {
							if (sample.data.subtractionId != null) {
								if (sample.data.volume != null)
									html = html + Number(sample.data.volumePorod / 2).toFixed(1) + " - " + Number(sample.data.volumePorod / 1.5).toFixed(1)
											+ "<span style='font-size:8px;color:gray;'>kD</span>";
							}
						}
						return html;
					}
				} ]
	};
};


QueueGrid.prototype.getPanel = function() {
	var _this = this;
	
	Ext.define('Queue', {
		extend : 'Ext.data.Model',
		fields : [ 'name', 'date', 'volumePorod', 'runCreationDate', 'measurementCode', 'macromoleculeAcronym', 'bufferAcronym', 'I0', 'I0Stdev', 'acronym', 'averageFilePath',
				'bufferAverageFilePath', 'bufferId', 'bufferOnedimensionalFiles', 'code', 'comments', 'composition', 'concentration', 'creationDate', 'creationTime',
				'dataAcquisitionFilePath', 'dataCollectionId', 'discardedFrameNameList', 'dmax', 'experimentId', 'experimentType', 'exposureTemperature', 'extintionCoefficient',
				'extraFlowTime', 'firstPointUsed', 'flow', 'frameListId', 'framesCount', 'framesMerge', 'gnomFilePath', 'gnomFilePathOutput', 'guinierFilePath', 'isagregated',
				'kratkyFilePath', 'lastPointUsed', {
					name : 'macromoleculeId',
					id : 'macromoleculeId'

				}, {
					name : 'measurementId',
					type : 'int'
				}, 'mergeId', 'molecularMass', 'name', 'pH', 'priorityLevelId', 'proposalId', 'quality', 'rg', 'rgGnom', 'rgGuinier', 'rgStdev', 'runId', 'safetyLevelId',
				'sampleAverageFilePath', 'sampleOneDimensionalFiles', 'samplePlatePositionId', 'scatteringFilePath', 'sequence', 'sessionId', 'sourceFilePath', 'specimenId',
				'status', 'stockSolutionId', 'substractedFilePath', 'subtractionId', 'total', 'transmission', 'viscosity', 'volume', 'volumeToLoad', 'waitTime', 'reference',
				'refined', 'fitCount', 'superposisitionCount', 'rigidbodyCount', 'abinitioCount' ]
	});

	
	this.store = Ext.create('Ext.data.Store', {
		model : 'Queue',
		data : [],
		sorters : this.sorters,
		filters : this.filters,
		listeners : {
			beforeload : function() {
				_this.key = {};
				return true;
			},
			load : function(store, records) {

			}
		},
		proxy : {
			type : 'memory',
			reader : {
				type : 'json' } } });

	this.store.on('refresh', function(store, elements) {
		var l = store.count();
		var s = l != 1 ? 's' : '';
	});
	this.panel = Ext.create('Ext.grid.Panel', {
		title : this.title,
		collapsible : false,
//		features : features,
//		resizable : true,
		autoscroll : true,
		store : this.store,
//		layout: {
//		    type: 'fit'
//		    align: 'left'
//		},
		border : 1,
		height : this.height,
		width : this.width,
		emptyText : "No datacollections",
		columns : this.getColumns(),
		rowLines : false,
		margin : this.margin,
		viewConfig : {
			enableTextSelection : true,
			preserveScrollOnRefresh : true,
			stripeRows : true,
			rowLines : true,
			getRowClass : function(record, rowIdx, params, store) {
				// return "queue-grid-row";
			},
			listeners : {
				celldblclick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
				},
				cellclick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {

					if (grid.getGridColumns()[cellIndex].getId() == _this.id + 'buttonAction') {
						if (e.target.defaultValue == 'Data Reduction') {
							//							_this.openCurveVisualizerBySelected();
							_this.onDataReductionButtonClicked(record.raw);
						}

						if (e.target.defaultValue == 'Abinitio') {
							_this.onAbinitioButtonClicked(record.raw);
						}

						if (e.target.defaultValue == 'Fit') {
							_this.onFitButtonClicked(record.raw);
						}

						if (e.target.defaultValue == 'Superposition') {
							_this.onSuperpositionButtonClicked(record.raw);
						}

						if (e.target.defaultValue == 'Rigid Body') {
							_this.onRigidBodyButtonClicked(record.raw);
						}
					}
				}
			}
		}
	});
	return this.panel;
};