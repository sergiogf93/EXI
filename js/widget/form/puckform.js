/**
 * Edit the information of a buffer
 * 
 * #onRemoveAdditive
 */
function PuckForm(args) {
	this.id = BUI.id();
	this.height = 500;
	this.width = 500;
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
	}
}

PuckForm.prototype.getBuffer = function() {
//	if (this.buffer == null){
//		this.buffer = {};
//	}
//	this.buffer["name"] = Ext.getCmp(this.id + "buffer_name").getValue();
//	this.buffer["acronym"] = Ext.getCmp(this.id + "buffer_acronym").getValue();
//	this.buffer["comments"] = Ext.getCmp(this.id + "buffer_comments").getValue();
//	this.buffer["ph"] = Ext.getCmp(this.id + "buffer_ph").getValue();
//	this.buffer["composition"] = Ext.getCmp(this.id + "buffer_composition").getValue();
//	this.buffer["proposalId"] = Ext.getCmp(this.id + "proposalIdCombo").getValue();
//	return this.buffer;
};


PuckForm.prototype.getHeader = function() {
	return  ['Sample Position', 
	         'Protein Acronym', 
	         'Sample Name', 
	         'Pin BarCode', 
	         'Space Group', 
	         'Pre-observed resolution', 
	         'Needed resolution',
	         'Pref. Diameter',
	         'Experiment Type',
	         'Number Of positions',
	         'Radiation Sensitivity',
	         'Required multiplicity',
	         'Required Completeness',
	         'Unit cell A',
	         'Unit cell B',
	         'Unit cell C',
	         'Unit cell Alpha',
	         'Unit cell Beta',
	         'Unit cell Gamma',
	         'Smiles',
	         'Comments'
	         ];
};

PuckForm.prototype.getSamplesData = function(puck) {
	var samples = puck.sampleVOs;
	var data = [this.getHeader()];
	/** Sorting samples by location **/
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
					[(i+1), protein.acronym, sample.name, sample.code, crystal.spaceGroup, getValue(diffraction["observedResolution"]),  diffraction.requiredResolution, diffraction.preferredBeamDiameter, diffraction.experimentKind,
					 diffraction.numberOfPositions, diffraction.radiationSensitivity, diffraction.requiredMultiplicity, diffraction.requiredCompleteness,
					 crystal.cellA, crystal.cellB, crystal.cellC, crystal.cellAlpha, crystal.cellBeta, crystal.cellGamma, sample.smiles, sample.comments
					 ]
				);
		}
		else{
			data.push([(i+1)]);
		}
	}
	for (var i = data.length - 1; i <  puck.capacity; i++) {
		data.push(
				[(i+1)]
			);
	}
	
	return data;
};

PuckForm.prototype.getColumns = function() {
	var columns = [];
	
	var proteins = EXI.proposalManager.getProteins();
	var acronyms = [];
	for (var i = 0; i < proteins.length; i++) {
		acronyms.push(proteins[i].acronym);
	}
	
	var spaceGroups = [	"P1","P2","P21","C2","P222","P2221","P21212","P212121","C222","C2221","F222","I222","I212121","P4","P41","P42","P43","P422","P4212","P4122","P41212","P4222","P42212","P4322","P43212",
	"I4","I41","I422","I4122","P3","P31","P32","P31","P321","P3112","P3121","P3212","P3221","P6","P61","P65","P62","P64","P63","P622","P6122","P6522","P6222","P6422","P6322","R3","R32","P23","P213",
	"P432",	"P4232","P4332","P4132","F23","F432","F4132","I23",	"I213","I432","I4132", "UNKNOWN"];
	
	for (var i = 0; i < this.getHeader().length; i++) {
		switch(i) {
		 	case 0:
		    	columns.push({
					  width : 45
				});
		        break;
		    case 1:
		    	columns.push({
					   type: 'dropdown',
					   source: acronyms,
					 
					  
				});
		        break;
		    case 2:
		    	columns.push({
		    		 width : 160
					 
					  
				});
		        break;
		    case 4:
		    	columns.push({
					   type: 'dropdown',
					   source: spaceGroups
				});
		        break;
			case 5:
		    	columns.push({
					  width : 60
				});
		        break;
			case 6:
		    	columns.push({
					  width : 60
				});
		        break;
			case 7:
		    	columns.push({
					  width : 45
				});
		        break;
		    case 8:
		    	columns.push({
					   type: 'dropdown',
					   source: [ "Default", "OSC", "SAD", "MAD", "Fixed", "Ligand binding", "Refinement", "MAD - Inverse Beam", "SAD - Inverse Beam" ]
				});
		        break; 
		    case 13:
		    	columns.push({
					  width : 40
				});
		        break;
		    case 14:
		    	columns.push({
					  width : 40
				});
		        break; 
		    case 15:
		    	columns.push({
					  width : 40
				});
		        break;  
		    case 16:
		    	columns.push({
					  width : 40
				});
		        break;  
		    case 17:
		    	columns.push({
					  width : 40
				});
		        break;  
		    case 18:
		    	columns.push({
					  width : 40
				});
		        break;  
		    case 20:
		    	columns.push({
					  width : 150
				});
		        break;  
		    default:
		    	columns.push({});
		}
		
	}
	return columns;
};

PuckForm.prototype.load = function(puck, shippingId) {
	var _this = this;
	this.puck = puck;
	
	
	if (puck != null){
		Ext.getCmp(this.id + "puck_name").setValue(this.puck.code);
//		Ext.getCmp(this.id + "puck_capacity").setValue(this.puck.capacity);
		this.capacityCombo.setValue(this.puck.capacity);
	}
	
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
	    
	    if ((col == 2)||(col == 4)||(col == 8)||(col == 13)||(col == 14)||(col == 15)||(col == 16)||(col == 17)||(col == 18)){
		    	if (!value || value == '') {
		    		td.className = 'custom-row-text-required';
		  	    }
	    }
	   
	  }
	  // maps function to lookup string
	  Handsontable.renderers.registerRenderer('ValueRenderer', ValueRenderer);
	  this.spreadSheet = new Handsontable(container, {
	    data: this.getSamplesData(puck),
	    colWidths: 70,
	    columns: this.getColumns(),
	    cells: function (row, col, prop) {
	      var cellProperties = {};

	      if (row === 0 || col === 0 ) {
	        cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
	      }
	      
	      if (col === 0) {
		        cellProperties.renderer = firstRowRenderer; // uses function directly
		        return cellProperties;
		  }
	      
	      /** Header style **/
	      if (row === 0) {
	        cellProperties.renderer = firstRowRenderer; // uses function directly
	      }
	      else {
	        cellProperties.renderer = "ValueRenderer"; // uses lookup map
	      }
	  
	      return cellProperties;
	    }
	  });
	
};



PuckForm.prototype.getToolBar = function() {
	var _this = this;
	return [
	        {
	            text: 'Back',
	            width : 100,
	            icon : '../images/icon/ic_arrow_back_black_24dp.png',
	            handler : function(){
	            	location.hash = Path.routes.previous;
	            }
	        },
	        "->",
	        {
	            text: 'Save',
	            width : 100,
	            handler : function(){
	            	_this.panel.setLoading();
	            	var puck = (_this.parseData(_this.spreadSheet.getData()));
	            	var onSuccess = function(sender, puck){
	            		_this.panel.setLoading(false);
	            		_this.load(puck);
	            	};
	            	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.saveContainer(_this.puck.containerId, _this.puck.containerId, _this.puck.containerId, puck);
	            }
	        }
	];
};


PuckForm.prototype.checkMandatoryFields = function(sample) {
	var mandatoryFields = ["Sample Name", "Protein Acronym", "Experiment Type", "Unit cell A", "Unit cell B","Unit cell C","Unit cell Alpha","Unit cell Beta","Unit cell Gamma"];
	for (var j = 0; j < mandatoryFields.length; j++) {
		if (sample[mandatoryFields[j]] === "" || (sample[mandatoryFields[j]] == null)){
			return mandatoryFields[j];
		}
	}
	return true;
};

PuckForm.prototype.checkData = function(samples) {
	for (var i = 0; i < samples.length; i++) {
		var sample = samples[i];
		if (sample["Protein Acronym"] != null){
			if ((sample["Protein Acronym"] != "")){
				var checked = this.checkMandatoryFields(sample);
				if (checked != true){
					BUI.showError("For sample #" + (i+1) +" there is missing column " + checked);
				}
			}
		}
	}
	return true;
};

PuckForm.prototype.parseTableData = function() {
	var parsed = [];
	var data = this.spreadSheet.getData();
	for (var j = 1; j < data.length; j++) {
		var row = {};
		row["location"] = j;
			for (var k = 0; k < data[j].length; k++) {
				var key = data[0][k];
				var value = data[j][k];
				row[key] = value;
			}
			if (row["Protein Acronym"]){
				if (row["Protein Acronym"].length > 0){
					parsed.push(row);
				}
			}
	}
	
	/** Curated contains the whole-data rows **/
	var curated = [];
	for (var i = 0; i < parsed.length; i++) {
		if (parsed[i]["Protein Acronym"] != null){
			curated.push(parsed[i]);
		}
	}
	
	return curated;
};

PuckForm.prototype.parseData = function(data) {
	var myPuck = JSON.parse(JSON.stringify(this.puck));
	myPuck.code = Ext.getCmp(this.id + 'puck_name').getValue();
	myPuck.capacity = this.capacityCombo.getValue();
	
	
	var rows = this.parseTableData();
	myPuck.sampleVOs = [];
	for (var i = 0; i < rows.length; i++) {
		console.log(rows[i]);
		var sample = {}; //getSamplesByLocation(rows[i].location);
		sample["name"] = rows[i]["Sample Name"];
		sample["smiles"] = rows[i]["Smiles"];
		sample["location"]= rows[i]["location"];
		sample["comments"] = rows[i]["Comments"];
		if (sample["crystalVO"] == null){
			sample["crystalVO"] = {};
			sample["crystalVO"]["proteinVO"] = EXI.proposalManager.getProteinByAcronym(rows[i]["Protein Acronym"]);
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

PuckForm.prototype.getPanel = function() {
	var _this =this;
	this.capacityCombo = BIOSAXS_COMBOMANAGER.getComboPuckType({margin : '10 0 10 20', labelWidth : 100, width : 300});
	
	
	this.panel = Ext.create('Ext.panel.Panel', {
		layout : 'vbox',
		buttons : this.getToolBar(),
		cls : 'border-grid',
		layout : 'vbox',
		items : [ 
		         {
						xtype : 'container',
						margin : '10 0 10 20',
						layout : 'vbox',
						items : [ 
			         				   {
												xtype: 'requiredtextfield',
												id : this.id + 'puck_name',
												fieldLabel : 'Name',
												name : 'name',
												width : 300,
												margin : '0 0 0 20',
												labelWidth : 100
										},
										this.capacityCombo,
										{
											html : '<div  style="border:1px solid gray;background-color:white;height:500px;width:1200px"; id="' + this.id + '_samples"; ></div>',
											margin : '20 0 20 10',
											height : 520,
											border : 1
											
										}
		          					
						]
		         }
		
		         ] 
		} 
	);
	
	this.panel.on("afterlayout", function(){
	});
	
	return this.panel;
};

