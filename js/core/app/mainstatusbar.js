function MainStatusBar(){
	
	
}

MainStatusBar.prototype.getBar = function(){
	this.statusBar =  Ext.create('Ext.ux.StatusBar', {
		id : 'main-status-bar',
	    text: 'Ready',
	    iconCls: 'accept',
	    busyIconCls: 'busy',
	    busyText: 'Connecting to servers...',
	    cls : 'statusBar',
		statusAlign : 'right'
	});
	return this.statusBar;
};

MainStatusBar.prototype.showBusy = function(){
	this.statusBar.showBusy();
};

MainStatusBar.prototype.showError = function(error){
	this.statusBar.clearStatus();
	this.statusBar.setStatus({
	    text: error,
	    iconCls: 'error'
	});
};

MainStatusBar.prototype.showReady = function(){
	this.statusBar.clearStatus();
	this.statusBar.setStatus({
	    text: 'Ready',
	    iconCls: 'accept'
	});
};




