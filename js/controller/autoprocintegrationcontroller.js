/**
* This is the description for routing all the puck actions. It means url= #/autoprocintegration/*
*
* @class AutoprocIntegrationController
* @constructor
*/
function AutoprocIntegrationController() {
	this.init();
}

AutoprocIntegrationController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
AutoprocIntegrationController.prototype.notFound = ExiGenericController.prototype.notFound;

AutoprocIntegrationController.prototype.openFiles = function(dataCollectionIds) {
   	var _this = this;
        /** We store an array with the autoProcIntegration Ids and other with their corresponding
         * attachments
         */
        var attachments = [];
        var autoProcProgramIds = [];
        
        /** Grid */
        var autoProcIntegrationAttachmentGrid = new AutoProcIntegrationAttachmentGrid({ margin: 5, height : 500});        
        
        /** Combo */
        var autoProcStore = Ext.create('Ext.data.Store', {
            fields: ['v_datacollection_summary_phasing_processingPrograms', 'v_datacollection_summary_phasing_autoproc_space_group', 'v_datacollection_summary_phasing_autoProcProgramId', 'text']
            
        });

        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Choose',
            store: autoProcStore,
            queryMode: 'local',
            displayField: 'text',
            height : 20,
            valueField: 'v_datacollection_summary_phasing_autoProcProgramId',
            margin : 5,
            tpl : Ext.create('Ext.XTemplate', 
				'<tpl for=".">',
					'<div style="font-size:12px;" class="x-boundlist-item">{v_datacollection_summary_phasing_processingPrograms}<span style="color:gray;font-size:10px;font-weight:bold"> {v_datacollection_summary_phasing_autoproc_space_group}</span></div>', '</tpl>'),
             listeners:{
                    scope: _this,
                    'select': function(a,record,c){
                        var programId = record[0].data.v_datacollection_summary_phasing_autoProcProgramId;
                       if (programId){
                            autoProcIntegrationAttachmentGrid.load(attachments[_.indexOf(autoProcProgramIds, programId)]);
                       }
                    }
                }
        });
 

	Ext.create('Ext.window.Window', {
		height: 600,
		title : 'Autoprocessing Files Explorer',
		width: 900,
		modal : true,
		items: [combo, autoProcIntegrationAttachmentGrid.getPanel()]
	}).show();
        
	var onSuccess2 = function(sender, data){      
		var onSuccess = function(sender, dataAttachments){
			attachments = dataAttachments;
			autoProcIntegrationAttachmentGrid.load(_.flatten(dataAttachments));
			autoProcIntegrationAttachmentGrid.panel.setLoading(false);
		};
		autoProcIntegrationAttachmentGrid.panel.setLoading("Retrieving files");
		autoProcProgramIds = _.map(data[0], 'v_datacollection_summary_phasing_autoProcProgramId');    
		for(var i =0; i <data[0].length; i++){
			data[0][i]["text"] = data[0][i]["v_datacollection_summary_phasing_processingPrograms"] + data[0][i]["v_datacollection_summary_phasing_autoproc_space_group"] ;
		}   
		autoProcStore.loadData(data[0]);
		EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoproc.getAttachmentListByautoProcProgramsIdList(autoProcProgramIds);
	};
	autoProcIntegrationAttachmentGrid.panel.setLoading();
	EXI.getDataAdapter({onSuccess : onSuccess2}).mx.autoproc.getViewByDataCollectionId(dataCollectionIds);
};
/**
* Inits the controller for the AutoprocIntegrationController related objects
* Paths accepted:
* #/autoprocintegration/datacollection/:datacollectionId/main
* #/autoprocintegration/datacollection/:datacollectionId/files
* #/autoprocintegration/datacollection/:datacollectionId/phasingviewer/main
* @method init
*/
AutoprocIntegrationController.prototype.init = function() {
	var _this = this;
	var listView;	

	Path.map("#/autoprocintegration/datacollection/:datacollectionId/main").to(function() {
		var mainView = new AutoProcIntegrationMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['datacollectionId']);
	}).enter(this.setPageBackground);

	Path.map("#/autoprocintegration/datacollection/:datacollectionId/files").to(function() {
		_this.openFiles(this.params['datacollectionId']);
	}).enter(this.setPageBackground);

	Path.map("#/autoprocintegration/datacollection/:datacollectionId/phasingviewer/main").to(function() {
		var mainView = new PhasingViewerMainView();
		
		EXI.addMainPanel(mainView);
		mainView.load(this.params['datacollectionId']);

	}).enter(this.setPageBackground);

};
