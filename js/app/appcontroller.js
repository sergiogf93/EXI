var ExiSAXSController = {
//	    type: "macintosh",
	    init: function () {
//	        return this.color + ' ' + this.type + ' apple';
		
	    	function setPageBackground(){
	    		
	    	}
	    	function notFound(){
	    		
	    	}
	    	
	    	/** Welcome Page **/
    	   Path.map("#/").to(function(){
//	        	 alert("Welcome Page")
	        	 	
	          }).enter(setPageBackground);
		         
	    	
	    	/** Loading navigation panel **/
	         Path.map("#/:navigation/nav").to(function(){
	        	 if (this.params['navigation'] == "session"){
	        		 exiSAXS.onSessionsClicked();
	        	 }
	        	 
	        	 if (this.params['navigation'] == "experiment"){
//	        		 history.pushState({foo : "bar"}, "page 2", location.hash);
	        		 exiSAXS.onExperimentClicked();
	        	 }
	        	 
	        	 if (this.params['navigation'] == "macromolecule"){
	        		 exiSAXS.onMacromoleculeClicked();
	        	 }
	          }).enter(setPageBackground);
	         
	         /** Loading a single session on the navigation panel **/
	         Path.map("#/session/nav/:sessionId/session").to(function(){
	        	 	exiSAXS.onLoadSession(this.params['sessionId']);
	          }).enter(setPageBackground);
	         
	         
	         

	         /** Loading main panel **/
	         Path.map("#/experiment/:key/:value/main").to(function(){
	        	 var adapter = new DataAdapter();
	        	 adapter.onSuccess.attach(function(sender, data){
	        		 var mainView = new ExperimentMainView()
		        	 exiSAXS.addMainPanel(mainView);
	        		 mainView.load(data);	        		 
	        	 });
	        	 adapter.getByExperimentByKey(this.params['key'], this.params['value']);
	        	 	
	          }).enter(setPageBackground);
	         
	         
	         Path.map("#/datacollection/:key/:value/main").to(function(){
	        	 var adapter = new DataAdapter();
	        	 adapter.onSuccess.attach(function(sender, data){
	        		 var mainView = new DataCollectionMainView()
		        	 exiSAXS.addMainPanel(mainView);
	        		 mainView.load(data);	
	        	 });
	        	 adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);
	        	 	
	          }).enter(setPageBackground);
	         
	         
	         Path.map("#/datacollection/:key/:value/primaryviewer").to(function(){
	        	 var adapter = new DataAdapter();
	        	 adapter.onSuccess.attach(function(sender, data){
	        		 var primaryMainView = new PrimaryDataMainView();
	        		 exiSAXS.addMainPanel(primaryMainView);
	        		primaryMainView.load(data);

	        	 });
	        	 adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);
	          }).enter(setPageBackground);
	         
	         
	         Path.map("#/datacollection/:key/:value/merge").to(function(){
	        	 var adapter = new DataAdapter();
	        	 adapter.onSuccess.attach(function(sender, data){
	        		 var primaryMainView = new MergeMainView();
	        		 exiSAXS.addMainPanel(primaryMainView);
	        		primaryMainView.load(data);

	        	 });
	        	 adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);
	          }).enter(setPageBackground);
	         
	         

	          // Here we set a "root route".  You may have noticed that when you landed on this
	          // page you were automatically "redirected" to the "#/users" route.  The definition
	          // below tells PathJS to load this route automatically if one isn't provided.
	          Path.root("#/");

	          // The `Path.rescue()` method takes a function as an argument, and will be called when
	          // a route is activated that you have no yet defined an action for.  On this example
	          // page, you'll notice there is no defined route for the "Unicorns!?" link.  Since no
	          // route is defined, it calls this method instead.
	          Path.rescue(notFound);

	           
	    }
		
		
};

