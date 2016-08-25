function PrepareSpreadSheet(args){
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

PrepareSpreadSheet.prototype.getPanel = function(){
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


PrepareSpreadSheet.prototype.getDewarsData = function(dewars) {
	
	var data = [];
	/** Sorting samples by location
	samples.sort(function(a,b){return Number(a.location) - Number(b.location);});
	function getSampleByLocation(samples, location){
		for (var i = 0; i < samples.length; i++) {
			if (samples[i].location == Number(location)){
				return samples[i];
			}
		}
	}
 * */
	function getValue(value){
		if (!value) return "";
	}
	
	for (var i = 0; i < dewars.length; i++) {
        
        for (var j = 0; j< dewars[i].containerVOs.length; j++) {
            data.push(
                        [
                            (i+1),
                            dewars[i].code,
                            dewars[i].barCode,
                            dewars[i].containerVOs[j].containerType,
                            dewars[i].containerVOs[j].code,
                            dewars[i].containerVOs[j].containerStatus,
                            dewars[i].containerVOs[j].sampleVOs.length + " of " + dewars[i].containerVOs[j].capacity,
                            dewars[i].containerVOs[j].beamlineLocation,
                            dewars[i].containerVOs[j].sampleChangerLocation
                        ]);
        }
		
	}
	return data;
};







PrepareSpreadSheet.prototype.getHeader = function() {
	return  [
	         { text : '#', 	id: 'position', column : {width : 20}}, 
	         { text :'Dewar<br /> Code', id :'Dewar Code', column : {width : 120}},
             { text :'Dewar<br /> Barcode', id :'Dewar Barcode', column : {width : 120}},
             { text :'Type', id :'Type', column : {width : 80}},
             { text :'Code', id :'Code', column : {width : 120}},
             { text :'Status', id :'Status', column : {width : 120}},
             { text :'Samples', id :'Samples', column : {width : 120}},
             { text :'Beamline', id : 'Beamline',column : {
			        	 													width : 90,
			        	 													type: 'dropdown',
			        	 													source: EXI.credentialManager.getBeamlines()
			         								}
	         },
             
             { text :'Sample Changer Position', id :'Position', column : {width : 120}}
             
	       
	         ];
};

PrepareSpreadSheet.prototype.getHeaderWidth = function() {
	var header = this.getHeader();
	var text = [];
	for (var i =0; i < header.length; i++){
		text.push(header[i].column.with);
	}
	return text;
};

PrepareSpreadSheet.prototype.getHeaderId = function() {
	var header = this.getHeader();
	var text = [];
	for (var i =0; i < header.length; i++){
		text.push(header[i].id);
	}
	return text;
};

PrepareSpreadSheet.prototype.getHeaderText = function() {
	var header = this.getHeader();
	var text = [];
	for (var i =0; i < header.length; i++){
		text.push(header[i].text);
	}
	return text;
};


PrepareSpreadSheet.prototype.getColumns = function() {
	var columns = [];
	for (var i = 0; i < this.getHeader().length; i++) {
		columns.push(this.getHeader()[i].column);
	}
	return columns;
};


PrepareSpreadSheet.prototype.getPuck = function() {
	/*var myPuck = JSON.parse(JSON.stringify(this.puck));
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
	return myPuck;*/
};


PrepareSpreadSheet.prototype.parseTableData = function() {
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

PrepareSpreadSheet.prototype.load = function(dewars){
	this.dewars = dewars;
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
	    data: this.getDewarsData(dewars),
	    colWidths: 70,
	    height : this.height,
	    width : this.width,
	    manualColumnResize: true,
	    //colWidths: this.getHeaderWidth(),
	    colHeaders: this.getHeaderText(),
	    stretchH: 'last',
	    columns: this.getColumns(),
         cells: function (row, col, prop) {
                var cellProperties = {};
                if (col < 7) {
                    cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
                }
               
            
                return cellProperties;
        }
	  });

	  
	  this.spreadSheet.updateSettings({
		  afterChange: function (changes, source) {
				_this.onModified.notify(_this.getPuck());
				/*try{
					_this.loadPlateLayout(_this.parseData(_this.spreadSheet.getData()));
				}catch(e){
					console.log(e);
				}*/
		  }
		});
	
	
};