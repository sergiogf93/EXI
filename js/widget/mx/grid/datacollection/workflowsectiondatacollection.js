function WorkflowSectionDataCollection(args) {
	this.noFoundClass = "summary_datacollection_noFound";
	this.failedClass = "summary_datacollection_failed";
	this.successClass = "summary_datacollection_success";
}


WorkflowSectionDataCollection.prototype.getIconTable = function(jsonArray) {
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



WorkflowSectionDataCollection.prototype.getHTMLTable = function(jsonArray) {
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

/**
 * 
Input: 	
wokflowSteps = "Snapshots,Automesh,Line,Mesh,Line,Line,Characterisation,Line,Line,Line,Characterisation,Line,Line,Line,Characterisation,Line,Line,Line,Characterisation,Line,Line,Line,Characterisation"
workflowStepStatus = "Success,Success,Success,Success,Success,Success,Failure,Success,Success,Success,Failure,Success,Success,Success,Failure,Success,Success,Success,Failure,Success,Success,Success,Failure"

Output:
[...{"step":"Line","count":3,"status":"Success"}...]
 * 
 */
WorkflowSectionDataCollection.prototype.parseWorkflow = function(workflowSteps, workflowStepStatus){
	
	var steps = workflowSteps.split(",");
	var status = workflowStepStatus.split(",");
	var previous = null;
	
	var cleaned = [];
	for (var i = 0; i < steps.length; i++){
		if (previous != steps[i]){
			cleaned.push({
				step : steps[i],
				count : 1,
				status : status[i]
			});
			
		}
		else{
			cleaned[cleaned.length - 1].count =  cleaned[cleaned.length - 1].count + 1;
		}
		previous = steps[i];
	}
	return cleaned;
	
};

WorkflowSectionDataCollection.prototype.getWorkflowStepHTML = function(dataCollectionGroup){
	var resultSection = new ResultSectionDataCollection();
	var parsed = [];
	if (dataCollectionGroup.WorkflowStep_workflowStepType){
		var items = this.parseWorkflow(dataCollectionGroup.WorkflowStep_workflowStepType, dataCollectionGroup.WorkflowStep_status);
		
		for (var i = 0; i < items.length; i++) {
			if (items[i].status == "Success"){
				parsed.push({
					iconClass 	: "summary_datacollection_success",
					value 		:	 items[i].count + "x " + items[i].step
				});
			}
			else{
				parsed.push({
					iconClass 	: "summary_datacollection_failed",
					value 		:	 items[i].count + "x " + items[i].step
				});
			}
			
		}
	}
	else{
		return;
	}
	return resultSection.getIconTable(parsed);
};

WorkflowSectionDataCollection.prototype.getHTML = function(dataCollectionGroup){
	/** Results for WorkflowStep **/
	var result = this.getWorkflowStepHTML(dataCollectionGroup);
	return result;
	
};


