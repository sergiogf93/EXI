function ResultSectionDataCollection(args) {
	
	this.noFoundClass = "summary_datacollection_noFound";
	this.failedClass = "summary_datacollection_failed";
	this.successClass = "summary_datacollection_success";
}

ResultSectionDataCollection.prototype.getIconTable = function(jsonArray) {
	var table = document.createElement("table");
	for (var i = 0; i < jsonArray.length; i++) {
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		
		
		var div = document.createElement("div");
		td1.setAttribute("class", jsonArray[i].iconClass);
		td1.appendChild(div);
		

		var td2 = document.createElement("td");
		if ((jsonArray[i].value) != null){
			var span = document.createElement("span");
			span.innerHTML = jsonArray[i].value;
			td2.appendChild(span);
			td2.setAttribute("class", "summary_highlighted_datacollection_parameter");
		}
		
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(tr);
	}
	return "<table>" + table.innerHTML + "</table>";
};


/**
 * Return a JSON formatted in the next way:
 * {"EDNAproc":{"run":2,"success":2},"fastproc":{"run":2,"success":2},"parallelproc":{"run":16,"success":16}}
 */
ResultSectionDataCollection.prototype._parseAutoprocResults = function(programs, results) {
	var resultParsed = {};
	
	if (programs != null){
		programs = programs.split(",");
		results = results.split(",");
		
		for (var i= 0; i < programs.length; i++){
			var program = programs[i].trim();
			if (resultParsed[program] == null){
				resultParsed[program] = {};
				resultParsed[program]["run"] = 0;http://lindemaria:8082/EXI/mx/dev.html#/mx/datacollection/session/40382/main
				resultParsed[program]["success"] = 0;
			}
			resultParsed[program]["run"] =  resultParsed[program]["run"] + 1;
			resultParsed[program]["success"] =  resultParsed[program]["success"]  + 1;
		}
	}
	
	return resultParsed;
};


ResultSectionDataCollection.prototype.getAutoprocessingHTML = function(dataCollectionGroup){
	var parseResults = this._parseAutoprocResults(dataCollectionGroup.processingPrograms, dataCollectionGroup.processingStatus);
	
	var parsed = [];
	var icon = "summary_datacollection_noFound";
	for(var i in parseResults){
		var tool = i;
		result = parseResults[i];
		if (result.run != null){
			if (result.run > 0){
				 icon = "summary_datacollection_success";
			}
			else{
				 icon = "summary_datacollection_failed";
			}
		}
		parsed.push({
			iconClass : icon,
			value : "<a class='result-autoprocessing-anchor' href='#/autoprocintegration/datacollection/" + dataCollectionGroup.DataCollection_dataCollectionId +"/main'>" + tool.toUpperCase() + "</a>",
			runCount : result.run
		});
	}
	/** If no autoprocessing **/
	if (parsed.length == 0){
		parsed.push({
			iconClass : "summary_datacollection_noFound",
			value : "No autoprocessing"
		});
	}
	return this.getIconTable(parsed);
};


ResultSectionDataCollection.prototype.getHTMLTable = function(jsonArray) {
	var table = document.createElement("table");
	for (var i = 0; i < jsonArray.length; i++) {
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		
		td1.appendChild(document.createTextNode(jsonArray[i].key));
		if (jsonArray[i].value == null){
			td1.setAttribute("class", "summary_datacollection_null_parameter");
		}
		
		
		if ((jsonArray[i].value) != null){
			td1.setAttribute("class", "summary_datacollection_parameter_name");
		}

		var td2 = document.createElement("td");
		if ((jsonArray[i].value) != null){
			td2.appendChild(document.createTextNode(jsonArray[i].value));
			td2.setAttribute("class", "summary_datacollection_parameter");
		}
		
		var td3 = document.createElement("td");
		if (jsonArray[i].units != null){
			td3.appendChild(document.createTextNode(jsonArray[i].units));
			td3.setAttribute("class", "summary_datacollection_parameter");
		}
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
	}
	return "<table>" + table.innerHTML + "</table>";
};

ResultSectionDataCollection.prototype.getScreeningHTML = function(dataCollectionGroup){
	var html = "";
	var parsed = [];
	if (dataCollectionGroup.Screening_screeningId != null){
		if (dataCollectionGroup.ScreeningOutput_indexingSuccess){
			html = html + this.getIconTable([{
				iconClass : "summary_datacollection_success",
				value : "Indexing"
			}]);
			
			html = html + this.getHTMLTable([{
				key : 'Mosaicity',
				value : dataCollectionGroup.ScreeningOutput_mosaicity,
				units : 'º'
			}]);
			
		}
		else{
			html = html + this.getIconTable([{
				iconClass : "summary_datacollection_failed",
				value : "Indexing"
			}]);
		}
		
		
		if (dataCollectionGroup.ScreeningOutput_strategySuccess){
			html = html + this.getIconTable([{
				iconClass : "summary_datacollection_success",
				value : "Strategy"
			}]);
			
			html = html + this.getHTMLTable([{
				key : 'Ranking Resolution',
				value : dataCollectionGroup.ScreeningOutput_rankingResolution,
				units : 'Å'
			}]);
			
		}
		else{
			html = html + this.getIconTable([{
				iconClass : "summary_datacollection_failed",
				value : "Strategy"
			}]);
		}
		
		
	}
	else{
		return this.getIconTable([{
			iconClass : "summary_datacollection_noFound",
			value : "No Indexing"
		},
		{
			iconClass : "summary_datacollection_noFound",
			value : "No Strategy"
		}]);
	}
	
	/** Screening Lattice **/
	if (dataCollectionGroup.ScreeningOutputLattice_spaceGroup){
		html = html + this.getHTMLTable([
		                                 {
		                                	key : 'Space Group',
		                     				value : dataCollectionGroup.ScreeningOutputLattice_spaceGroup
		                                 },
		                                 {
			                                	key : 'Unit cell',
			                     				value : ""
			                             },
			                             {
			                                	key : 'a,b,c',
			                     				value : dataCollectionGroup.ScreeningOutputLattice_unitCell_a + ", " + dataCollectionGroup.ScreeningOutputLattice_unitCell_b + ", " + dataCollectionGroup.ScreeningOutputLattice_unitCell_c
			                             },
			                             {
			                                	key : 'α β γ',
			                     				value : dataCollectionGroup.ScreeningOutputLattice_unitCell_alpha + ", " + dataCollectionGroup.ScreeningOutputLattice_unitCell_beta + ", " + dataCollectionGroup.ScreeningOutputLattice_unitCell_gamma
			                             }
		                                 ]);
		
		
	}
	
	return  html;
	
};


ResultSectionDataCollection.prototype._getAutoprocResults = function(dataCollectionGroup) {
	var programs = dataCollectionGroup.processingPrograms;
	var status = dataCollectionGroup.processingStatus;

	var resultParsed = {};
	
	/** it makes an object like : "{"grenades_parallelproc":{"run":2,"success":2}}" **/
	if (programs != null){
		programs = programs.split(",");
		status = status.split(",");
		
		for (var i= 0; i < programs.length; i++){
			var program = programs[i].trim();
			if (resultParsed[program] == null){
				resultParsed[program] = {};
				resultParsed[program]["run"] = 0;
				resultParsed[program]["success"] = 0;
			}
			resultParsed[program]["run"] =  resultParsed[program]["run"] + 1;
			
			if (status[i] == 1){
				resultParsed[program]["success"] =  resultParsed[program]["success"]  + 1;
			}
		}
	}


	var resultArr = [];
	for(var key in resultParsed){
		var status = "Failure";
		if (resultParsed[key].success>0){
			status = "Success";
		}
		resultArr.push({
			name    : key,
			count	: resultParsed[key].run,
			success : (resultParsed[key].success>0),
			status  : status,
			url 	: "#/autoprocintegration/datacollection/" + dataCollectionGroup.DataCollection_dataCollectionId +"/main"
		})
	}
	
	return resultArr;
};



//ResultSectionDataCollection.prototype.getHTML = function(dataCollectionGroup){
//	/** Results for Autoprocessing **/
//	var html = "";
//	var autoprocessingItems = this._getAutoprocResults(dataCollectionGroup);
//	dust.render("resultsection.autoprocessing",autoprocessingItems, function(err, out){
//			html = html + out;
//     });
//	
//	dust.render("resultsection.screening",dataCollectionGroup, function(err, out){
//		html = html + out;
//	});
//
//	
//	return html;
//	
//};

ResultSectionDataCollection.prototype.getHTML = function(dataCollectionGroup){
	/** Results for Autoprocessing **/
	var result = this.getAutoprocessingHTML(dataCollectionGroup);
	result =result + "<br />";
	/** Results for Screening **/
	result = result + this.getScreeningHTML(dataCollectionGroup);
	result =result + "<br />";
	/** Results for Phasing **/
	
	result = result + this.getPhasingHTML(dataCollectionGroup);
	
	return result;
	
};


ResultSectionDataCollection.prototype.getPhasingHTML = function(dataCollectionGroup){
	var html= "";
	if (dataCollectionGroup!= null){
		if (dataCollectionGroup.Phasing_phasingStepType != null){
			var steps = dataCollectionGroup.Phasing_phasingStepType.split(",");
			var parsed = [];
			for (var i = 0; i < steps.length; i++) {
				parsed.push({
					iconClass : "summary_datacollection_success",
					value : steps[i]
					
				});
			}
			html = html + this.getIconTable(parsed);
		}
		else{
			html = html + this.getIconTable([{
				iconClass : "summary_datacollection_noFound",
				value : "Phasing"
			}]);
		}
		
		if (dataCollectionGroup.Phasing_spaceGroup != null){
			html = html + this.getHTMLTable([{
            	key : 'Space Groups',
 				value : dataCollectionGroup.Phasing_spaceGroup 
             }]);
		}
	}
	return html;
};
