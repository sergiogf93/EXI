function ContainerSpreadSheet(args){
	this.id = BUI.id();
	this.height = 380;
	this.width = 500;
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
	}
	
	this.onModified = new Event(this);
}

ContainerSpreadSheet.prototype.getPanel = function(){
	var _this = this;
	this.panel = Ext.create('Ext.panel.Panel', {
		layout : 'vbox',
		height 		: this.height+ 50,
		items : [ 
				  {
						html 		: '<div  style="overflow: auto;overflow-y: hidden; border:1px solid gray;background-color:white;height:500px;width:' + (_this.width - 20) +'px"; id="' + this.id + '_samples"; ></div>',
						margin 		: '20 0 20 10',
						height 		: this.height,
						width 		: this.width,
						autoScroll 	: true,
						resizable 	: true
					}]
	});
    return this.panel;
};


ContainerSpreadSheet.prototype.getSamplesData = function(puck) {
	var samples = puck.sampleVOs;
	var data = [];
	/** Sorting samples by location * */
	samples.sort(function(a,b){return Number(a.location) - Number(b.location);});
	function getSampleByLocation(samples, location){
		for (var i = 0; i < samples.length; i++) {
			if (samples[i].location == Number(location)){
				return samples[i];
			}
		}
	}

	function getValue(value){
		if (!value) return "";
	}
	
	for (var i = 0; i < puck.capacity; i++) {
		var sample = getSampleByLocation(samples, i + 1);
		if (sample!= null){
				var crystal = sample.crystalVO;
				var protein = crystal.proteinVO;
				var diffraction = sample.diffractionPlanVO;
				if (diffraction == null){
					diffraction = {};
				}
				data.push(
					[(i+1), protein.acronym, sample.name, crystal.spaceGroup, diffraction.experimentKind, sample.code,  getValue(diffraction["observedResolution"]),  diffraction.requiredResolution, diffraction.preferredBeamDiameter, 
					 diffraction.numberOfPositions, diffraction.radiationSensitivity, diffraction.requiredMultiplicity, diffraction.requiredCompleteness,
					 crystal.cellA, crystal.cellB, crystal.cellC, crystal.cellAlpha, crystal.cellBeta, crystal.cellGamma, sample.smiles, sample.comments
					 ]
				);
		}
		else{
			data.push([(i+1)]);
		}
	}
	return data;
};


ContainerSpreadSheet.prototype.getSpaceGroups = function() {
	return ["P1","P2","P21","C2","P222","P2221","P21212","P212121","C222","C2221","F222","I222","I212121","P4","P41","P42","P43","P422","P4212","P4122","P41212","P4222","P42212","P4322","P43212",
                	"I4","I41","I422","I4122","P3","P31","P32","P31","P321","P3112","P3121","P3212","P3221","P6","P61","P65","P62","P64","P63","P622","P6122","P6522","P6222","P6422","P6322","R3","R32","P23","P213",
                	"P432",	"P4232","P4332","P4132","F23","F432","F4132","I23",	"I213","I432","I4132", "UNKNOWN"];
};


ContainerSpreadSheet.prototype.getAcronyms = function() {
	var proteins = EXI.proposalManager.getProteins();
	var acronyms = [];
	for (var i = 0; i < proteins.length; i++) {
		acronyms.push(proteins[i].acronym);
	}
	return acronyms;
};


ContainerSpreadSheet.prototype.getHeader = function() {
	return  [
	         { text : '#', 	id: 'position', column : {width : 20}}, 
	         { text :'Protein <br />Acronym', id :'Protein Acronym', 	column :  {
																						width : 60,
																						type: 'dropdown',
																						source: this.getAcronyms()
																					}
	         }, 
	         { text :'Sample<br /> Name', id :'Sample Name', column : {width : 120}}, 
	         { text :'Space<br /> Group', id : 'Space Group',column : {
			        	 													width : 90,
			        	 													type: 'dropdown',
			        	 													source: this.getSpaceGroups()
			         								}
	         }, 
	         { text :'Exp.<br /> Type', id : 'Experiment Type', column : {
							        	 								width : 80,  
							        	 								type: 'dropdown',
							        	 								source: [ "Default", "MXPressE", "MXPressO", "MXPressI", "MXPressE_SAD", "MXScore", "MXPressM" ]
							         								}
	         }, 
	         { text :'Pin <br />BarCode', id : 'Pin BarCode', column : {width : 45}},  
	         { text :'Pre-observed <br />resolution', id : 'Pre-observed resolution', column : {width : 45}}, 
	         { text :'Needed<br /> resolution',  id :'Needed resolution', column : {width : 45}}, 
	         { text :'Pref. <br />Diameter', id :'Pref. Diameter',column : {width : 45}}, 
	         { text :'Number Of<br /> positions', id :'Number Of positions', column : {width : 45}}, 
	         { text :'Radiation<br /> Sensitivity', id :'Radiation Sensitivity', column : {width : 60}}, 
	         { text :'Required<br /> multiplicity', id :'Required multiplicity', column : {width : 60}}, 
	         { text :'Required<br /> Completeness', id :'Required Completeness', column : {width : 60}}, 
	         { text :'A', id :'Unit cell A', column : {width : 40}}, 
	         { text :'B', id :'Unit cell B', column : {width : 40}}, 
	         { text :'C', id : 'Unit cell C', column : {width : 40}}, 
	         { text :'&#945;', id :'Unit cell Alpha', column : {width : 40}}, 
	         { text :'&#946;', id :'Unit cell Beta', column : {width : 40}}, 
	         { text :'&#947;', id :'Unit cell Gamma', column : {width : 40}}, 
	         { text :'Smiles', id :'Required Completeness', column : {width : 45}}, 
	         { text :'Comments', id :'Comments', column : {width : 45}}
	         ];
};

ContainerSpreadSheet.prototype.getHeaderWidth = function() {
	var header = this.getHeader();
	var text = [];
	for (var i =0; i < header.length; i++){
		text.push(header[i].column.with);
	}
	return text;
};

ContainerSpreadSheet.prototype.getHeaderId = function() {
	var header = this.getHeader();
	var text = [];
	for (var i =0; i < header.length; i++){
		text.push(header[i].id);
	}
	return text;
};

ContainerSpreadSheet.prototype.getHeaderText = function() {
	var header = this.getHeader();
	var text = [];
	for (var i =0; i < header.length; i++){
		text.push(header[i].text);
	}
	return text;
};


ContainerSpreadSheet.prototype.getColumns = function() {
	var columns = [];
	for (var i = 0; i < this.getHeader().length; i++) {
		columns.push(this.getHeader()[i].column);
	}
	return columns;
};


ContainerSpreadSheet.prototype.getPuck = function() {
	var myPuck = JSON.parse(JSON.stringify(this.puck));
	var rows = this.parseTableData();
	myPuck.sampleVOs = [];
	for (var i = 0; i < rows.length; i++) {
		var sample = {}; // getSamplesByLocation(rows[i].location);
		sample["name"] = rows[i]["Sample Name"];
		sample["smiles"] = rows[i]["Smiles"];
		sample["location"]= rows[i]["location"];
		sample["comments"] = rows[i]["Comments"];
		if (sample["crystalVO"] == null){
			sample["crystalVO"] = {};
			var proteins = EXI.proposalManager.getProteinByAcronym(rows[i]["Protein Acronym"]);
			if (proteins != null){
				sample["crystalVO"]["proteinVO"] = proteins[0];
			}
		}
		sample["crystalVO"]["spaceGroup"] = rows[i]["Space Group"];
		sample["crystalVO"]["cellA"] = Number(rows[i]["Unit cell A"]);
		sample["crystalVO"]["cellB"] = Number(rows[i]["Unit cell B"]);
		sample["crystalVO"]["cellC"] = Number(rows[i]["Unit cell C"]);
		sample["crystalVO"]["cellAlpha"] = Number(rows[i]["Unit cell Alpha"]);
		sample["crystalVO"]["cellBeta"] = Number(rows[i]["Unit cell Beta"]);
		sample["crystalVO"]["cellGamma"] = Number(rows[i]["Unit cell Gamma"]);
		
		sample["diffractionPlanVO"] = {};
		sample["diffractionPlanVO"]["radiationSensitivity"]= Number(rows[i]["Radiation Sensitivity"]);
		sample["diffractionPlanVO"]["requiredCompleteness"]= Number(rows[i]["Required Completeness"]);
		sample["diffractionPlanVO"]["requiredMultiplicity"]= Number(rows[i]["Required multiplicity"]);
		sample["diffractionPlanVO"]["requiredResolution"]= Number(rows[i]["Needed resolution"]);
		sample["diffractionPlanVO"]["observedResolution"]= Number(rows[i]["Pre-observed resolution"]);
		sample["diffractionPlanVO"]["preferredBeamDiameter"]= Number(rows[i]["Pref. Diameter"]);
		sample["diffractionPlanVO"]["numberOfPositions"]= Number(rows[i]["Number Of positions"]);
		sample["diffractionPlanVO"]["experimentKind"]= rows[i]["Experiment Type"];
		
		myPuck.sampleVOs.push(sample);
	}
	return myPuck;
};


ContainerSpreadSheet.prototype.parseTableData = function() {
	var parsed = [];
	var data = this.spreadSheet.getData();
	for (var j = 0; j < data.length; j++) {
		var row = {};
		row["location"] = j + 1;
			for (var k = 0; k < data[j].length; k++) {
				var key = this.getHeaderId()[k];
				var value = data[j][k];
				row[key] = value;
			}
			if (row["Protein Acronym"]){
				if (row["Protein Acronym"].length > 0){
					parsed.push(row);
				}
			}
	}
	
	/** Curated contains the whole-data rows * */
	var curated = [];
	for (var i = 0; i < parsed.length; i++) {
		if (parsed[i]["Protein Acronym"] != null){
			curated.push(parsed[i]);
		}
	}
	
	return curated;
};

ContainerSpreadSheet.prototype.load = function(puck){
	this.puck = puck;
	var container = document.getElementById(this.id + '_samples');
    
	  function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
	    Handsontable.renderers.TextRenderer.apply(this, arguments);
	    td.style.fontWeight = 'bold';
	    td.style.color = 'green';
	    td.style.fontSize = '9px';
	    td.style.background = '#CEC';
	  }
	  
	  function ValueRenderer(instance, td, row, col, prop, value, cellProperties) {
	    Handsontable.renderers.TextRenderer.apply(this, arguments);
	    if (!instance.getDataAtRow(row)[1]){
	    	td.style.background = '#EEE';
	    	return;
	    }
	    
	    if ((col == 2)){
		    	if (!value || value == '') {
		    		td.className = 'custom-row-text-required';
		  	    }
	    }
	  }
	  // maps function to lookup string
	  Handsontable.renderers.registerRenderer('ValueRenderer', ValueRenderer);
	  var _this = this;
	  this.spreadSheet = new Handsontable(container, {
		beforeChange: function (changes, source) {
		      lastChange = changes;
		      
		},
	    data: this.getSamplesData(puck),
	 
	    height : this.height,
	    width : this.width,
	    manualColumnResize: true,
	    colWidths: this.getHeaderWidth(),
	    colHeaders: this.getHeaderText(),
	    stretchH: 'last',
	    columns: this.getColumns()
	  });

	  
	 /*this.spreadSheet.updateSettings({
		  afterChange: function (changes, source) {              
				_this.onModified.notify(_this.getPuck());
			
		  }
		});*/
	
	
};