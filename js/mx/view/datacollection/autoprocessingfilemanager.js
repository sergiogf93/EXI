/**
* Open a window with the files for all autoprocessing by datacollection
*
* @class AutoProcessingFileManager
* @constructor
*/
function AutoProcessingFileManager(){
    
    /** Grid */
    this.autoProcIntegrationAttachmentGrid = new AutoProcIntegrationAttachmentGrid({ margin: 5, height : 500});
}

AutoProcessingFileManager.prototype.show = function(dataCollectionIds){
       	var _this = this;
        /** We store an array with the autoProcIntegration Ids and other with their corresponding
         * attachments
         */
        var attachments = [];
        var autoProcProgramIds = [];
        
                
        
        /** Combo */
        this.autoProcStore = Ext.create('Ext.data.Store', {
            fields: ['v_datacollection_processingPrograms', 'v_datacollection_summary_phasing_autoproc_space_group', 'v_datacollection_summary_phasing_autoProcProgramId', 'text']
            
        });

        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Choose',
            store: this.autoProcStore,
            queryMode: 'local',
            displayField: 'v_datacollection_processingPrograms',
            height : 25,
            valueField: 'v_datacollection_summary_phasing_autoProcProgramId',
            tpl : Ext.create('Ext.XTemplate', 
				'<tpl for=".">',
					'<div style="font-size:12px;" class="x-boundlist-item">{v_datacollection_processingPrograms}<span style="color:gray;font-size:10px;font-weight:bold"> {v_datacollection_summary_phasing_autoproc_space_group}</span></div>', '</tpl>'),
             listeners:{
                    scope: _this,
                    'select': function(a,record,c){
                        
                        _this.programId = record[0].data.v_datacollection_summary_phasing_autoProcProgramId;
                       if (_this.programId ){
                            _this.reloadData(_this.programId, _this.filtered  );
                           
                       }
                    }
                }
        });
 
	Ext.create('Ext.window.Window', {
		height: 600,
		title : 'Autoprocessing Files Explorer',
		width: 900,
		modal : true,
		items: [
                    {
                           xtype : 'container',
                           layout : 'hbox',
                           margin : '10 5 10 5',
                           items : [
                                      combo,
                                      {
                                          xtype      : 'checkboxfield',
                                          boxLabel   : 'Filter by MTZ files',
                                           margin   : '0 0 0 40',
                                          checked    : false,
                                          listeners:{
                                                    scope: _this,
                                                    'change': function(a,filtered,c){
                                                                 _this.reloadData(_this.programId,filtered);
                                                    }
                                                }
                                      }
                                               
                           ]
                    },
                       
                    this.autoProcIntegrationAttachmentGrid.getPanel()
        ]
	}).show();
};

/**
* Shows files from a list of  dataCollectionIds
*
* @method reloadData
* @param {Integer} programId if data should be filtered by programId
* @param {boolean} filtered if data should be filtered by mtz extension
*/
AutoProcessingFileManager.prototype.reloadData = function(programId, filtered){
    this.programId = programId;
    this.filtered = filtered;
    
    /** Get all attachments */
    var dataByProgram = _.flatten(this.attachments);
    
    /** Filter by programId */
    if (this.programId){
        dataByProgram = this.attachments[_.indexOf(this.autoProcProgramIds, this.programId)];
    }
    /** Filter by MTZ */
    if (this.filtered){
         dataByProgram = _.filter(dataByProgram, function(b){         
                return b.fileName.indexOf(".mtz") != -1;
        });
    }
   
    if (!dataByProgram){
        dataByProgram = [];
    }
    this.autoProcIntegrationAttachmentGrid.load(dataByProgram);
};

/**
* Shows files from a list of  dataCollectionIds
*
* @method load
* @param {[Integer]]} dataCollectionIds
*/
AutoProcessingFileManager.prototype.load = function(dataCollectionIds){
    
    var _this = this;
    var onSuccess2 = function(sender, data){      
		var onSuccess = function(sender, dataAttachments){
            
            if (dataAttachments.length != _this.autoProcProgramIds.length){
                /** Removing null */
                
                _this.autoProcProgramIds =  _.filter(_this.autoProcProgramIds, function(b){return b != null;});
                
            }
			_this.attachments = dataAttachments;
			_this.autoProcIntegrationAttachmentGrid.load(_.flatten(dataAttachments));
			_this.autoProcIntegrationAttachmentGrid.panel.setLoading(false);
		};
		_this.autoProcIntegrationAttachmentGrid.panel.setLoading("Retrieving files");
        
        /** Some autoProcProgramIds may be null */
		_this.autoProcProgramIds = _.map(data[0], 'v_datacollection_summary_phasing_autoProcProgramId');    
		  
		_this.autoProcStore.loadData(data[0]);
        if (_this.autoProcProgramIds){
            if (_this.autoProcProgramIds.length > 0){
		        EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoproc.getAttachmentListByautoProcProgramsIdList(_this.autoProcProgramIds);
                return;
            }
        }
        /** No Attachments */
        _this.autoProcIntegrationAttachmentGrid.panel.setLoading(false);
	};
	this.autoProcIntegrationAttachmentGrid.panel.setLoading();
    
	EXI.getDataAdapter({onSuccess : onSuccess2}).mx.autoproc.getViewByDataCollectionId(dataCollectionIds);
};