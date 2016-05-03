function MXExiController() {
	this.init();
}

MXExiController.prototype.routeNavigation = function() {

	function loadNavigationPanel(listView) {
		/** Cleaning up navigation panel * */
		EXI.clearNavigationPanel();
		EXI.setLoadingNavigationPanel(true);

		var onSuccess = function(sender, data) {
			/** Load panel * */
			EXI.addNavigationPanel(listView);
			/** Load data * */
			listView.load(data);
			EXI.setLoadingNavigationPanel(false);
		};
		
		/** Handle error * */
		var onError = function(sender, data) {
			EXI.setLoadingNavigationPanel(false);
		};
		
		/** Load data data * */
		return EXI.getDataAdapter({ onSuccess : onSuccess, onError : onError });

	}
	/**
	 * Loading navigation panel
	 * 
	 * #/session/nav #/experiment/nav #/macromolecule/nav
	 * 
	 */
	
	var listView;	
	Path.map("#/:navigation/nav").to(function() {
		/** Session navigation * */
		if (this.params['navigation'] == "session") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new SessionListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/mx/datacollection/session/" + selected[0].sessionId + "/main";
			});
			EXI.addNavigationPanel(listView);
			
			listView.load(EXI.proposalManager.getSessions().slice(0, 100));
			EXI.setLoadingNavigationPanel(false);
		}
		
		
		if (this.params['navigation'] == "crystal") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new CrystalListView();
			listView.onSelect.attach(function(sender, selected) {	
				location.hash = "/mx/crystal/" + selected[0].crystalId + "/main";
			});

			EXI.addNavigationPanel(listView);
			var onSuccess = function(sender, crystals) {
				listView.load(crystals);
				EXI.setLoadingNavigationPanel(false);
			};
			EXI.getDataAdapter({onSuccess : onSuccess}).mx.crystal.getCrystalsByProposalId();
		}
		
		if (this.params['navigation'] == "puck") {
			/** Loading welcome page **/
			EXI.addMainPanel(new PuckWelcomeMainView());
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new PuckListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/mx/puck/" + selected[0].Container_containerId+ "/main";
			});

			EXI.addNavigationPanel(listView);
			var onSuccessProposal = function(sender, pucks) {
				listView.load(pucks.slice(0, 100));
				EXI.setLoadingNavigationPanel(false);
			};
			EXI.getDataAdapter({onSuccess : onSuccessProposal}).proposal.proposal.getDewarByProposalId();
		}
		
		
		if (this.params['navigation'] == "protein") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new ProteinListView();
			listView.onSelect.attach(function(sender, selected) {	
			});

			EXI.addNavigationPanel(listView);
			var onSuccessProtein = function(sender, proteins) {
				console.log(proteins);
				listView.load(proteins);
				EXI.setLoadingNavigationPanel(false);
			};
			EXI.getDataAdapter({onSuccess : onSuccessProtein}).mx.protein.getProteinByProposalId();
		}
		

	}).enter(this.setPageBackground);

	/** Loading a single session on the navigation panel * */
//	Path.map("#/session/nav/:sessionId/session").to(function() {
//		location.hash = "/datacollection/session/" + this.params['sessionId'] +"/main";
//	}).enter(this.setPageBackground);
	
	
	
	Path.map("#/autoprocintegration/datacollection/:datacollectionId/main").to(function() {
		var mainView = new AutoProcIntegrationMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['datacollectionId']);

	}).enter(this.setPageBackground);
    
    Path.map("#/autoprocintegration/datacollection/:datacollectionId/files").to(function() {
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
            tpl : Ext.create('Ext.XTemplate', '<tpl for=".">',
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
            //layout: 'fit',
            modal : true,
            items: [
            
                    combo,
                    autoProcIntegrationAttachmentGrid.getPanel() 
                    
                        
                   
                
            ]
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
	    EXI.getDataAdapter({onSuccess : onSuccess2}).mx.autoproc.getViewByDataCollectionId(this.params['datacollectionId']);
  
  
        
        
	}).enter(this.setPageBackground);
    
	
	Path.map("#/autoprocintegration/datacollection/:datacollectionId/phasingviewer/main").to(function() {
		var mainView = new PhasingViewerMainView();
		
		EXI.addMainPanel(mainView);
		mainView.load(this.params['datacollectionId']);

	}).enter(this.setPageBackground);
	
	
	Path.map("#/mx/workflow/step/:workflowStepIdList/main").to(function() {
        EXI.clearNavigationPanel();
		EXI.setLoadingNavigationPanel(true);
		listView = new WorkflowStepListView();
		listView.onSelect.attach(function(sender, selected) {
            if (selected != null){
                mainView.load(selected[0]);
            }
		});
        EXI.addNavigationPanel(listView);    
            
		var mainView = new WorkflowStepMainView();
		EXI.addMainPanel(mainView);
		var onSuccess = function(sender, data){
            listView.load(JSON.parse(data));
            EXI.setLoadingNavigationPanel(false);
		};
		
		EXI.getDataAdapter({onSuccess : onSuccess}).mx.workflowstep.getWorkflowstepByIdList(this.params['workflowStepIdList']);
	}).enter(this.setPageBackground);
	
	
	
	
	
	Path.map("#/mx/prepare/main").to(function() {
		//EXI.addMainPanel(new PrepareMainView());
		EXI.clearNavigationPanel();
		EXI.setLoadingNavigationPanel(true);
		listView = new DewarListView();
		listView.onSelect.attach(function(sender, selected) {
            
            var selectedIds = [];
            for (var i= 0; i < selected.length; i++){
                selectedIds.push(selected[i].dewarId);
            }
			location.hash = "/mx/prepare/" + selectedIds.toString() + "/main";
		});

		EXI.addNavigationPanel(listView);
		var onSuccessProposal = function(sender, dewars) {			
			listView.load(dewars);
			EXI.setLoadingNavigationPanel(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccessProposal}).proposal.dewar.getDewarsByStatus("processing");
	}).enter(this.setPageBackground);
    
    Path.map("#/mx/prepare/:dewarIds/main").to(function() {
        var mainView = new PrepareMainView();
        var ids = this.params['dewarIds'].split(",");
		EXI.addMainPanel(mainView);
        EXI.setLoadingMainPanel();
		var onSuccessProposal = function(sender, dewars) {
            var filtered = [];
            for(var i = 0; i< ids.length; i++){
                filtered.push(_.find(dewars, {dewarId : Number(ids[i]) }));
            }
           EXI.setLoadingMainPanel(false);
			mainView.load(filtered);
			EXI.setLoadingNavigationPanel(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccessProposal}).proposal.dewar.getDewarsByProposal();
        
	}).enter(this.setPageBackground);
    
	
	Path.map("#/mx/datacollection/protein_acronym/:acronmys/main").to(function() {
		var mainView = new DataCollectionMxMainView();
		EXI.addMainPanel(mainView);
        
		var onSuccess = function(sender, data){
			mainView.loadCollections(data);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).mx.dataCollection.getByAcronymList(this.params['acronmys']);

       
	}).enter(this.setPageBackground);
    
	Path.map("#/mx/datacollection/session/:sessionId/main").to(function() {
		var mainView = new DataCollectionMxMainView();
		EXI.addMainPanel(mainView);
		EXI.setLoadingMainPanel(true);
		var onSuccess = function(sender, data){
			mainView.loadCollections(data);
			EXI.setLoadingMainPanel(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).mx.dataCollection.getDataCollectionViewBySessionId(this.params['sessionId']);
        
        
        var onSuccessEnergy = function(sender, data){
			mainView.loadEnergyScans(data);
			EXI.setLoadingMainPanel(false);
		};
         /** retrieving energy scans */
        EXI.getDataAdapter({onSuccess : onSuccessEnergy}).mx.energyscan.getEnergyScanListBySessionId(this.params['sessionId']);
        
          var onSuccessXFE = function(sender, data){
			mainView.loadFXEScans(data);
			EXI.setLoadingMainPanel(false);
		};
         /** retrieving XFE scans */
        EXI.getDataAdapter({onSuccess : onSuccessXFE}).mx.xfescan.getXFEScanListBySessionId(this.params['sessionId']);
        

	}).enter(this.setPageBackground);
	
	Path.map("#/mx/crystal/:crystalId/main").to(function() {
		var mainView = new CrystalMainView();
		EXI.addMainPanel(mainView);
		EXI.setLoadingMainPanel(true);
		var onSuccess = function(sender, crystal){
			mainView.load(crystal);
			EXI.setLoadingMainPanel(false);
			
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).mx.crystal.getCrystalById(this.params['crystalId']);

	}).enter(this.setPageBackground);
	
	
	Path.map("#/mx/puck/:containerId/main").to(function() {
		EXI.setLoadingMainPanel(true);
		var onSuccess = function(sender, puck){
			try{
				var mainView = new PuckMainView();
				EXI.addMainPanel(mainView);
				mainView.load(puck);
			}
			catch(e){
				EXI.setError(e.message);
			}
			EXI.setLoadingMainPanel(false);	
		};
		EXI.getDataAdapter({onSuccess: onSuccess}).proposal.shipping.getContainerById(this.params['containerId'],this.params['containerId'],this.params['containerId']);
		
	}).enter(this.setPageBackground);
	
	
	
	Path.map("#/mx/puck/add").to(function() {
		var mainView = new PuckMainView();
		EXI.addMainPanel(mainView);
		var emptyPuck = {"containerId":"","code":null,"containerType":"Puck","capacity":16,"beamlineLocation":null,"sampleChangerLocation":null,"containerStatus":null,"timeStamp":"Jan 15, 2016 2:29:39 PM","sampleVOs":[]};
		mainView.load(emptyPuck);
	}).enter(this.setPageBackground);
	
	

	Path.map("#/mx/datacollection/:dataCollectionId/image/:imageId/main").to(function() {
		var mainView = new ImageMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['imageId'], this.params['dataCollectionId']);
	}).enter(this.setPageBackground);

	Path.map("#/mx/image/:imageId/main").to(function() {
		var mainView = new ImageMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['imageId']);

	}).enter(this.setPageBackground);

	
};

MXExiController.prototype.setPageBackground = function() {

};

MXExiController.prototype.notFound = function() {

};


MXExiController.prototype.init = function() {
	var _this = this;

	function setPageBackground() {
		_this.setPageBackground();
	}
	function notFound() {
		_this.notFound();
	}

	this.routeNavigation();

	Path.rescue(notFound);

};
