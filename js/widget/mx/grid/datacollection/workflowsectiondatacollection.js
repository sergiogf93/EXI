function WorkflowSectionDataCollection(args) {
	this.noFoundClass = "summary_datacollection_noFound";
	this.failedClass = "summary_datacollection_failed";
	this.successClass = "summary_datacollection_success";
}





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
	var steps = [];
	var status = [];
	var ids = [];
	if ( dataCollectionGroup.WorkflowStep_workflowStepType != null){
		steps = dataCollectionGroup.WorkflowStep_workflowStepType.split(",");
		status = dataCollectionGroup.WorkflowStep_status.split(",");
		ids = dataCollectionGroup.WorkflowStep_workflowStepId.split(",");
		
		
		var previous = null;
		var cleaned = [];
		for (var i = 0; i < steps.length; i++){
			var step = {
					status : status[i],
					name   : steps[i],
					workflowStepId  : ids[i],
					workflowStepIds : ids, 
					img : EXI.getDataAdapter().mx.workflowstep.getImageByWorkflowStepId(ids[i])
			};
			if (previous != steps[i]){
				cleaned.push([step]);
				
			}
			else{
				cleaned[cleaned.length - 1].push(step);
			}
			previous = steps[i];
		}
	}
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
	
	/** Adding button **/
	//html = html + "<div style='border:1px solid #3892d3;background-color:#3892d3;text-align:center;'><a style='color:white;' href='#/mx/workflow/step/"+dataCollectionGroup.WorkflowStep_workflowStepId+"/main'> See details</a></div>";
	return html;
	
};

WorkflowSectionDataCollection.prototype.getHTML = function(dataCollectionGroup){
	/** Results for WorkflowStep **/
	var result = this.getWorkflowStepHTML(dataCollectionGroup);
	return result;
	
};


