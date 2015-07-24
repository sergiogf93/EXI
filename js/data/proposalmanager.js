function ProposalUpdater(){
	this.onSuccess = new Event(this);
	this.onSessionUpdated = new Event(this);
}

ProposalUpdater.prototype.getSessions = function(){
	var adapter = new DataAdapter({async : false});
	adapter.onSuccess.attach(function(sender, sessions){
		localStorage.setItem("sessions", JSON.stringify(sessions));
	});
	adapter.getSessions();
	
};

ProposalUpdater.prototype.get = function(forceUpdate){
	var _this = this;
	if ((ProposalManager.get() == null)||(forceUpdate)){
		var adapter = new DataAdapter({async : true});
		adapter.onSuccess.attach(function(sender, proposals){
			ProposalManager.update(proposals);
			_this.onSuccess.notify(proposals); 
		});
		adapter.getProposalsInfo();
	}
	else{
		_this.onSuccess.notify(ProposalManager.get());
	}
	
};

var ProposalManager = {
	get : function(){
		return JSON.parse(localStorage.getItem("proposals"));
	},
	getSessions : function(){
		if (localStorage.getItem("sessions") == null){
			new ProposalUpdater().getSessions();
		}
		return JSON.parse(localStorage.getItem("sessions"));
	},
	getBufferColors : function(){
		return ["#ffffcc", "#c7e9b4", "#7fcdbb", "#41b6c4", "#2c7fb8", "#253494"];
	},
	getLabcontacts : function(){
		var proposals = ProposalManager.get();
		return proposals[0].labcontacts;
	},
	getPlateTypeById : function(plateTypeId) {
		var types = this.getPlateTypes();
		for ( var i = 0; i < types.length; i++) {
			if (types[i].plateTypeId == plateTypeId) {
				return types[i];
			}
		}
		return null;
	},
	getPlateTypes : function(){
		var proposals = ProposalManager.get();
		/** TODO: This depends on proposal **/
		return proposals[0].plateTypes;
		
	},
	getPlateByFlavour : function(){
			var plateTypes = ProposalManager.get()[0].plateTypes;
			return [plateTypes[0], plateTypes[2], plateTypes[3]];
	},
	update : function(proposals){
		localStorage.setItem("proposals", JSON.stringify(proposals));
	},
	
	getBufferById : function(bufferId){
		var proposals = ProposalManager.get();
		for (var i = 0; i < proposals.length; i++) {
			for (var j = 0; j < proposals[i].buffers.length; j++) {
				if (proposals[i].buffers[j].bufferId == bufferId){
					return proposals[i].buffers[j];
				}
			}
		}
	},
	
	getMacromoleculeById : function(macromoleculeId){
		var proposals = ProposalManager.get();
		for (var i = 0; i < proposals.length; i++) {
			for (var j = 0; j < proposals[i].macromolecules.length; j++) {
				if (proposals[i].macromolecules[j].macromoleculeId == macromoleculeId){
					return proposals[i].macromolecules[j];
				}
			}
		}
	},
	
	getStockSolutionById : function(stockSolutionId){
		var proposals = ProposalManager.get();
		for (var i = 0; i < proposals.length; i++) {
			for (var j = 0; j < proposals[i].stockSolutions.length; j++) {
				if (proposals[i].stockSolutions[j].stockSolutionId == stockSolutionId){
					return proposals[i].stockSolutions[j];
				}
			}
		}
	},
	
	getBuffers : function(){
		var proposals = ProposalManager.get();
		var buffers = [];
		for (var i = 0; i < proposals.length; i++) {
			buffers = buffers.concat(proposals[i].buffers);
		}
		return buffers;
	},
	
	getMacromolecules : function(){
		var proposals = ProposalManager.get();
		var macromolecules = [];
		for (var i = 0; i < proposals.length; i++) {
			macromolecules = macromolecules.concat(proposals[i].macromolecules);
		}
		return macromolecules;
	},
	
	getProposals : function(){
		var proposals = ProposalManager.get();
		var result = [];
		for (var i = 0; i < proposals.length; i++) {
			proposals[i].proposal[0]["proposal"] = proposals[i].proposal[0].code + proposals[i].proposal[0].number; 
			result = result.concat(proposals[i].proposal);
		}
		return result;
	},
	
	getProposalById : function(proposalId){
		var proposals = ProposalManager.get();
		var result = [];
		for (var i = 0; i < proposals.length; i++) {
			if (proposals[i].proposal[0].proposalId == proposalId) 
				return proposals[i].proposal[0];
		}
		return result;
	},
	getStockSolutions : function(){
		return ProposalManager.get()[0].stockSolutions;
	},
	getStockSolutionsBySpecimen : function(macromoleculeId, bufferId) {
		var result = [];
		var stockSolutions = ProposalManager.getStockSolutions();
		for ( var i = 0; i < stockSolutions.length; i++) {
			if (stockSolutions[i].macromoleculeId == macromoleculeId) {
				if (stockSolutions[i].bufferId == bufferId) {
					result.push(stockSolutions[i]);
				}
			}
		}
		return result;
	},
	getUnpackedStockSolutions : function() {
		var stockSolutions = ProposalManager.getStockSolutions();
		var result = [];
		for ( var i = 0; i < stockSolutions.length; i++) {
			if (stockSolutions[i].boxId == null) {
				result.push(stockSolutions[i]);
			}
		}
		return result;
	},
	getStockSolutionsByDewarId : function(dewarId) {
		var stockSolutions = ProposalManager.getStockSolutions();
		var result = [];
		for ( var i = 0; i < stockSolutions.length; i++) {
			if (stockSolutions[i].boxId == dewarId) {
				result.push(stockSolutions[i]);
			}
		}
		return result;
	}
};
