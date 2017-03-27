/**
* Displays the phasing grid
*
function PhasingGridView(args) {
* @class MXDataCollectionGrid
* @constructor
*/
function PhasingGridView(args) {
    this.hasScroll = true;
    if (args) {
        if (args.hasScroll != null) {
            this.hasScroll = args.hasScroll;
        }
    }
}

PhasingGridView.prototype.load = function(dataCollectionGroupId, PhasingStep_method) {
    this.dataCollectionGroupId = dataCollectionGroupId;
    this.PhasingStep_method = PhasingStep_method;
}

PhasingGridView.prototype.printHTML = function(target) {
    var _this = this;

    var onSuccess = function(sender, data){
        /** Parsing data */
       data[0] = _.filter(data[0], {PhasingStep_method : _this.PhasingStep_method})
       var spaceGroups = _.keyBy(data[0], "SpaceGroup_spaceGroupShortName");
       
       var parsed = [];
       for(var spaceGroup in spaceGroups){
           
           if (spaceGroup != "null"){               
               var stepsBySpaceGroup = _.filter(data[0],{"SpaceGroup_spaceGroupShortName": spaceGroup});
               function getStepId(stepsBySpaceGroup){
                   return _.keys(_.keyBy(stepsBySpaceGroup, "PhasingStep_phasingStepId")).toString();
               }
               function getCSV(stepsBySpaceGroup){
                   var keys = _.keys(_.keyBy(stepsBySpaceGroup, "csv"));
                   return _.filter(keys, function(e){return e!= "null";});
               }
           
               var node = {};
               
               if (_this.PhasingStep_method == "MR"){
                node = ({
                    spaceGroup       : spaceGroup,
                                
                    phasing          : _.find(stepsBySpaceGroup, {"PhasingStep_phasingStepType" : "PHASING"}) != null,
                    refinement       : _.find(stepsBySpaceGroup, {"PhasingStep_phasingStepType" : "REFINEMENT"}) != null,                
                    downloadCSV      : EXI.getDataAdapter().mx.phasing.getCSVPhasingFilesByPhasingAttachmentIdURL(getCSV(stepsBySpaceGroup)),
                    downloadFilesUrl : EXI.getDataAdapter().mx.phasing.getDownloadFilesByPhasingStepIdURL(getStepId(stepsBySpaceGroup))
                    
                });

               }
               else{
                node = ({
                    spaceGroup       : spaceGroup,
                    prepare          : _.find(stepsBySpaceGroup, {"PhasingStep_phasingStepType" : "PREPARE"}) != null,
                    sub              : _.find(stepsBySpaceGroup, {"PhasingStep_phasingStepType" : "SUBSTRUCTUREDETERMINATION"}) != null,
                    phasing          : _.find(stepsBySpaceGroup, {"PhasingStep_phasingStepType" : "PHASING"}) != null,
                
                    model            : _.find(stepsBySpaceGroup, {"PhasingStep_phasingStepType" : "MODELBUILDING"}) != null,
                    downloadCSV      : EXI.getDataAdapter().mx.phasing.getCSVPhasingFilesByPhasingAttachmentIdURL(getCSV(stepsBySpaceGroup)),
                    downloadFilesUrl : EXI.getDataAdapter().mx.phasing.getDownloadFilesByPhasingStepIdURL(getStepId(stepsBySpaceGroup))
                    
                });
               }
               
               function getMetrics(phasingStep){                                      
                    if (phasingStep.metric){                        
                            var singleMetric = phasingStep.metric.split(",");
                            var values = phasingStep.statisticsValue.split(",");                            
                            for (var j = 0; j < singleMetric.length; j++) {   
                                    /* Spaces are replaced by _ to be used on the templates */                        
                                    phasingStep[singleMetric[j].replace(/ /g, '_')] = values[j];                           
                            }
                    } 
                    if (phasingStep.png){
                        phasingStep.pngURL = EXI.getDataAdapter().mx.phasing.getPhasingFilesByPhasingProgramAttachmentIdAsImage(phasingStep.png);
                    }
                    
                    
                    phasingStep.spaceGroup = phasingStep.SpaceGroup_spaceGroupShortName; 
                    return (phasingStep);                     
               }
               
               function getNodeByPhasingStep(node, stepsBySpaceGroup, step){
                   
                   var modelBuildingSteps = _.filter(stepsBySpaceGroup, {"PhasingStep_phasingStepType" : step});
                   node["metrics"] = [];
                   if (modelBuildingSteps){
                       var metrics = _.map(modelBuildingSteps, "metric");
                       var statisticsValues = _.map(modelBuildingSteps, "statisticsValue");
                       for (var z=0; z < modelBuildingSteps.length; z++){   
                            var toBePushed =  modelBuildingSteps[z];                          
                            if (modelBuildingSteps[z].metric){                                                        
                                toBePushed = getMetrics(modelBuildingSteps[z]);
                            }  
                            
                            /* Opening uglymol with:
                                    1) pdb file
                                    2) map1 as first map file
                                    3) map2 as second map file
                                    */           
                            var pdbUrl = EXI.getDataAdapter().mx.phasing.downloadPhasingFilesByPhasingAttachmentId( modelBuildingSteps[z].pdb);
                            if ( modelBuildingSteps[0].map != null){
                                var mapsArr = modelBuildingSteps[z].map.split(",");
                                if (mapsArr.length == 2){
                                    var mapUrl1 = EXI.getDataAdapter().mx.phasing.downloadPhasingFilesByPhasingAttachmentId( mapsArr[0]);
                                    var mapUrl2 = EXI.getDataAdapter().mx.phasing.downloadPhasingFilesByPhasingAttachmentId( mapsArr[1]);                                
                                    toBePushed["uglymol"] = '../viewer/uglymol/index.html?pdb=' + pdbUrl + '&map1=' + mapUrl1 + '&map2=' + mapUrl2;
                                }
                            }  
                            toBePushed["downloadFilesUrl"] = node.downloadFilesUrl;                                                                            
                            node["metrics"].push(toBePushed);                         
                       }                                            
                   }     
                   node["phasingStepId"] = modelBuildingSteps[0].PhasingStep_phasingStepId;
                   return node;         
               }
               
               /**
                * 
                StepS for Phasing are: PREPARE,  SUBSTRUCTUREDETERMINATION, PHASING AND MODELBUILDING
                StepS for Molecular replacement are: PHASING AND REFINEMENT

                */

               /** Filling the model if any */
               if (_.find(stepsBySpaceGroup, {"PhasingStep_phasingStepType" : "MODELBUILDING"}) != null){
                        node = getNodeByPhasingStep(node, stepsBySpaceGroup, "MODELBUILDING");
               }
               else{
                   /** There is no model building the we parse the phasing*/
                    if (_.find(stepsBySpaceGroup, {"PhasingStep_phasingStepType" : "PHASING"}) != null){
                       node = getNodeByPhasingStep(node, stepsBySpaceGroup, "PHASING");
                    }
                    else{
                        if (_.find(stepsBySpaceGroup, {"PhasingStep_phasingStepType" : "SUBSTRUCTUREDETERMINATION"}) != null){ 
                            node = getNodeByPhasingStep(node, stepsBySpaceGroup, "SUBSTRUCTUREDETERMINATION"); 
                        }
                        else{
                            
                             if (_.find(stepsBySpaceGroup, {"PhasingStep_phasingStepType" : "REFINEMENT"}) != null){                                  
                                 node = getNodeByPhasingStep(node, stepsBySpaceGroup, "REFINEMENT"); 
                                 
                             }
                             else{
                                 node = getNodeByPhasingStep(node, stepsBySpaceGroup, "PREPARE");        
                            }
                        }
                    }
               }
               
               /** This will be used to sort */
               var count = 0;
               if (node.prepare){
                   count = count + 1;
               }
               if (node.sub){
                   count = count + 1;
               }
               if (node.phasing){
                   count = count + 1;
               }
               if (node.model){
                   count = count + 1;
               }
                if (node.refinement){
                   count = count + 1;
               }
               
               node["count"] = count;               
               parsed.push(node);
           }
       }
       
        parsed.sort(function(a,b){return a.count < b.count;});
        /** Parsing the metrics */
        for(var i =0; i< parsed.length; i++){
            if (parsed[i]){
                if (parsed[i].metrics){
                    parsed[i].metrics.sort(function(a,b){   
                        try{                                             
                            return parseFloat(a._CC_of_partial_model) < parseFloat(b._CC_of_partial_model);
                        }
                        catch(e){
                            return false;
                        }
                    });
                }
            }
        }
        
        var html = "";
        
        if (_this.PhasingStep_method == "MR"){
            
            dust.render("mr.mxdatacollectiongrid.template",  {parsed : parsed, hasScroll : _this.hasScroll}, function(err, out) {
                    html = html + out;
            });
        }
        else{
            
            dust.render("phasing.mxdatacollectiongrid.template",  {parsed : parsed, hasScroll : _this.hasScroll}, function(err, out) {
                    html = html + out;
            });
        }
        $(target).html(html);
    };
    var onError = function(sender, msg){
        $(target).html("Error retrieving data " + msg);        
    };                    
                                    
    EXI.getDataAdapter({onSuccess : onSuccess, onError : onError}).mx.phasing.getPhasingViewByDataCollectionGroupId(this.dataCollectionGroupId);
}