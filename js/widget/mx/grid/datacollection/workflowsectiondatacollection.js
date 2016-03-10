function WorkflowSectionDataCollection(args) {
	this.noFoundClass = "summary_datacollection_noFound";
	this.failedClass = "summary_datacollection_failed";
	this.successClass = "summary_datacollection_success";
}



/**
 * json = [...{"step":"Line","count":3,"status":"Success"}...]
 */
WorkflowSectionDataCollection.prototype.getIconTable = function(jsonArray) {
	debugger
	
	/*var table = document.createElement("table");
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
	return "<table>" + table.innerHTML + "</table>";*/
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
WorkflowSectionDataCollection.prototype.parseWorkflow = function(dataCollectionGroup){
	var steps = dataCollectionGroup.WorkflowStep_workflowStepType.split(",");
	var status = dataCollectionGroup.WorkflowStep_status.split(",");
	var ids = dataCollectionGroup.WorkflowStep_workflowStepId.split(",");
	
	var previous = null;
	
	var cleaned = [];
	for (var i = 0; i < steps.length; i++){
		var step = {
				status : status[i],
				name   : steps[i],
				workflowStepId  : ids[i],
				img : EXI.getDataAdapter().mx.workflowStepDataAdapter.getImageByWorkflowStepId(ids[i])
		};
		if (previous != steps[i]){
			cleaned.push([step]);
			
		}
		else{
			//cleaned[cleaned.length - 1].count =  cleaned[cleaned.length - 1].count + 1;
			cleaned[cleaned.length - 1].push(step);
		}
		previous = steps[i];
	}
	console.log(cleaned);
	return cleaned;
	
};

WorkflowSectionDataCollection.prototype.getWorkflowStepHTML = function(dataCollectionGroup){
	var parsed = [];
	var html = "";
	if (dataCollectionGroup.WorkflowStep_workflowStepType){
		parsed = this.parseWorkflow(dataCollectionGroup);
		
		
	}
	dust.render("workflowstepsection", parsed, function(err, out){
		html = out;
     });
	return html;
	
};

WorkflowSectionDataCollection.prototype.getHTML = function(dataCollectionGroup){
	/** Results for WorkflowStep **/
	var result = this.getWorkflowStepHTML(dataCollectionGroup);
	console.log(result);
	return result;
	
};


