/**
 * Widget container of Specimen grid and samplePlate widget
 * Depending of the sample changer layout it may be displayed vertically or horizontally
 * 
 * @param args
 * 
 * #onExperimentChanged It happens when specimen are modified
 */
function SpecimenWidget(args){

	this.width = 1000;
	this.height = 600;
	
	if (args != null){
		if (args.width != null){
			this.width = args.width;
		}
		if (args.height != null){
			this.height = args.height;
		}
	}
	
	var _this = this; 
	
	/** Specimen Grid **/
	this.specimenGrid = new SpecimenGrid({
											minHeight 			: 425,
											selectionMode 		: "SINGLE",
											editEnabled 		: false,
											updateRowEnabled 	: false,
											width 				: 900,
											showTitle 			: false
	});

	
	this.specimenGrid.onSpecimenChanged.attach(function(sender, specimen) {
		_this.experiment.setSpecimenById(specimen);
		_this.load(_this.experiment);
	});

	this.specimenGrid.onSelected.attach(function(sender, specimens) {
		if (specimens.length > 0) {
			_this.specimenSelected = specimens[0];
		} else {
			_this.specimenSelected = null;
		}
		_this.samplePlateGroupWidget.selectSpecimens(specimens);
	});
	
	
	/** Sample plate Widget **/
	this.samplePlateGroupWidget = new SamplePlateGroupWidget({
		showTitle : false,
		height : 250,
		margin : 5,
		bbar : false
	});
	
	
	this.samplePlateGroupWidget.onExperimentChanged.attach(function(sender, json) {
		_this.load(new Experiment(json));
	});

	this.samplePlateGroupWidget.onClick.attach(function(sender, args) {
		/** Clicking on a plate * */
		// var row = args.row;
		// var column = args.column;
		// var samplePlate = args.samplePlate;
		var specimenId = args.specimenId;
		if (_this.specimenSelected && _this.specimenSelected.Specimen_specimenId == specimenId) {
			_this.samplePlateGroupWidget.selectSpecimens([]);
			_this.specimenGrid.deselectAll();
			_this.specimenSelected = null;
		} else {
			_this.specimenSelected = {Specimen_specimenId : specimenId};
			_this.specimenGrid.selectById(specimenId);
		}

// 		/** is specimen selected on the grid? * */
// 		if (_this.specimenSelected != null) {
// 			/** Is position target empty * */
// 			if (specimenId) {
// 				_this.samplePlateGroupWidget.panel.setLoading("ISPyB: Saving specimen");
// 				/** If success * */
// 				var onSuccess = (function(sender, experiment) {
// 					_this.samplePlateGroupWidget.panel.setLoading(false);
// 					_this.samplePlateGroupWidget.refresh(_this.experiment);
// 					_this.specimenGrid.refresh(_this.experiment);
// 					//_this.refresh(_this.experiment);
// 					_this.specimenSelected = null;
// 					_this.specimenGrid.deselectAll();
// 				});

// //				adapter.onError.attach(function(sender, error) {
// //					_this.samplePlateGroupWidget.panel.setLoading(false);
// //					showError(error);
// //				});

// 				EXI.getDataAdapter({onSuccess : onSuccess}).saxs.specimen.saveSpecimen(specimen);
				
// 			} else {
// 				/**
// 				 * Can we merge? We can merge when specimen are the
// 				 * same. So, same buffer, macromolecule, concentration *
// 				 */
// 				var target = _this.experiment.getSampleByPosition(args.samplePlate.samplePlateId, args.row, args.column)[0];
// 				var specimen = _this.experiment.getSampleById(_this.specimenSelected.specimenId);
// 				if (target == specimen) {
// 					_this.samplePlateGroupWidget.refresh(_this.experiment);
// 					_this.specimenSelected = null;
// 					_this.specimenGrid.deselectAll();
// 				} else {
// 					if ((specimen.bufferId == target.bufferId) && (specimen.concentration == target.concentration)) {
// 						if (((specimen.macromolecule3VO != null) && (target.macromolecule3VO != null) && (specimen.macromolecule3VO.macromoleculeId == target.macromolecule3VO.macromoleculeId)) || 
// 								((specimen.macromolecule3VO == null) && (target.macromolecule3VO == null))) {
// 							var onSuccess = (function(sender, data) {
// 								_this.load(new Experiment(data));
// 								_this.samplePlateGroupWidget.panel.setLoading(false);
								
// 								_this.onExperimentChanged.notify(experiment);
// 							});
// 							_this.samplePlateGroupWidget.panel.setLoading("ISPyB: Merging specimens");
// 							EXI.getDataAdapter({onSuccess : onSuccess}).saxs.specimen.mergeSpecimens(specimen.specimenId, target.specimenId);
// 							_this.specimenSelected = null;
// 							_this.specimenGrid.deselectAll();
// 						}
// 					} else {
// 						$.notify("Well is not empty. Select another well!", "error");
// 					}
// 				}
// 			}
// 		} else {
// 			if (specimenId != null) {
// 				_this.specimenGrid.selectById(specimenId);
// 			}
// 		}
	});
	/** Events **/
	this.onExperimentChanged = new Event(this);
};

/**
 * Return vbox or hbox depending on the slot positions of the plates
 */
SpecimenWidget.prototype.getContainerLayoutConfiguration = function(dataCollections){
	// var dimensions = this.samplePlateGroupWidget.getDimensions(experiment.getSamplePlates());
//	if (dimensions.maxSlotPositionRow < dimensions.maxSlotPositionColumn){
//		return {
//					layout 					: "vbox",
//					specimenGridWidth		: this.width - 10,
//					specimenGridHeight		: this.height - 260,
//					samplePlateGroupWidth	: this.width - 10,
//					samplePlateGroupHeight	: 250
//				};
//	}
	return {
					layout 					: "hbox",
					samplePlateGroupWidth	: this.width*1/3 -10,
					samplePlateGroupHeight	: this.height - 10,
					specimenGridWidth		: this.width*2/3,
					specimenGridHeight		: this.height - 10
	};
	
};


SpecimenWidget.prototype.load = function(dataCollections){
	this.dataCollections = _.uniqBy(dataCollections,"Specimen_specimenId");
	
	/** Removing all components **/
	this.panel.removeAll();

	var layoutConfiguration = this.getContainerLayoutConfiguration(dataCollections);

	/** Setting new width and height for layout vbox and hbox **/
	this.specimenGrid.width = layoutConfiguration.specimenGridWidth;
	this.specimenGrid.height = layoutConfiguration.specimenGridHeight;

	this.samplePlateGroupWidget.width = layoutConfiguration.samplePlateGroupWidth;
	this.samplePlateGroupWidget.height = layoutConfiguration.samplePlateGroupHeight;
	
	if (layoutConfiguration.layout == "hbox"){
		this.specimenGrid.margin = "0 0 0 5";
		this.specimenGrid.width =this.specimenGrid.width - 5;
	}
	/** Insert container depending on layout [vertical|horizontal] */
	var container = Ext.create('Ext.container.Container', {
		layout 		: layoutConfiguration.layout,
		height		: this.height,
		width 		: this.width,
		padding 	: '2px',
		items 		: [ 		   ]
	});
	if (layoutConfiguration.layout == "vbox"){
		container.insert(this.specimenGrid.getPanel());
		container.insert(this.samplePlateGroupWidget.getPanel());
	}
	else{
		container.insert(this.samplePlateGroupWidget.getPanel());
		container.insert(this.specimenGrid.getPanel());
	}
	
	/** Insert Widget **/
   	this.panel.insert(container);
   	
	/** Load data **/
	this.specimenGrid.refresh(this.dataCollections);
	this.samplePlateGroupWidget.refresh(this.dataCollections);
	
	
};

/** It creates a dummy container to be inserted the plates once the method refresh has been called 
 * This is necessay because we can not know the sample changer layout before hand
 * **/
SpecimenWidget.prototype.getPanel = function(){
	this.panel = Ext.create('Ext.container.Container', {
		layout 		: 'vbox',
		height 		: this.height,
		border 		: 0,
		margin		: 5,
		width 		: this.width,
		items 		: []
	});
	return this.panel;
};


// SpecimenWidget.prototype.input = function() {
// 	return {
// 		experiment : DATADOC.getExperiment_10(),
// 		proposal : DATADOC.getProposal_10()
// 	};
// };

// SpecimenWidget.prototype.test = function(targetId) {
// 	var specimenWidget = new SpecimenWidget({
// 		height : 500,
// 		width : 1000
// 	});
// 	BIOSAXS.proposal = new Proposal(specimenWidget.input().proposal);
// 	var experiment = new Experiment(specimenWidget.input().experiment);
// 	var panel = specimenWidget.getPanel();
// 	panel.render(targetId);
// 	specimenWidget.refresh(experiment);

// };


