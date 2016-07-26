<div class="container-fluid">
    <div class="panel with-nav-tabs panel-default">
            <div class="panel-heading clearfix">
                <div class="pull-left">
                    <h1 class="panel-title">Run #{.DataCollection_dataCollectionNumber} {.DataCollectionGroup_experimentType}  {.DataCollectionGroup_startTime}</h1>
                </div>
                <div class="pull-right">
                    <ul class="nav nav-tabs">  
                        <li class="active"><a data-toggle="tab" href="#datacollection_{DataCollection_dataCollectionId}"> Data Collection </a></li>
                        <li><a data-toggle="tab" href="#experimentparameters_{DataCollection_dataCollectionId}">Beamline Parameters</a></li>
                        <li><a data-toggle="tab" href="#sample_{DataCollection_dataCollectionId}">Sample</a></li>
                        
                    </ul>
     </div>                        
                </div>
  <br />
  <div class="tab-content">
    <div id="datacollection_{DataCollection_dataCollectionId}" class="tab-pane fade in active">

            <div class="container-fluid">
                <div class="row">
                
                <div class="col-xs-6 col-md-2">
                    {>"section.general.parameters"  /}                             
                </div>
                
                 <div class="col-xs-6 col-md-2">
                    {>"section.general.parameters_second"  /}                             
                </div>
                
                
                
                
                            
               
                
                
                <div class="col-xs-12 col-md-2">        
                        {>"autoproc_main_results"  /}       
                </div>  
                
                
                <div class="col-xs-12 col-md-2">
                    <a href="{.url}" data-lightbox='{.url}' data-title="#{.runNumber} {.folder}"> <img  alt="Image not found" class="img-responsive lazy"  data-src="{.urlThumbnail}" /></a>                           
                </div>
                
            
                
                <div class="col-xs-12 col-md-2">
                    <table>       
                        <tr>
                            <td>
                                <a href="{.xtal1}"  data-lightbox="{.DataCollection_dataCollectionId}" data-title="{.Protein_acronym} : {.Protein_name}">
                                    <img alt="Image not found" class="img-responsive smalllazy" data-src="{.xtal1}" style="display: block;" />
                                </a>
                            </td>
                            <td>
                                <a href="{.xtal2}"  data-lightbox="{.DataCollection_dataCollectionId}" data-title="{.Protein_acronym} : {.Protein_name}">
                                    <img alt="Image not found" class="img-responsive smalllazy" data-src="{.xtal2}" style="display: block;" />
                                </a>
                            </td>
                            
                        </tr>  
                        <tr>
                            <td>
                                <a href="{.xtal3}"  data-lightbox="{.DataCollection_dataCollectionId}" data-title="{.Protein_acronym} : {.Protein_name}">
                                    <img alt="Image not found" class="img-responsive smalllazy" data-src="{.xtal3}" style="display: block;" />
                                </a>
                            </td>
                            <td>
                                <a href="{.xtal4}" data-lightbox="{.DataCollection_dataCollectionId}" data-title="{.Protein_acronym} : {.Protein_name}">
                                    <img  alt="Image not found" class="img-responsive smalllazy" data-src="{.xtal4}" style="display: block;" />
                                </a>
                            </td>
                            
                        </tr>  
                    </table>        
                </div>
                
            
                <div class="col-xs-6 col-md-2">
                        <a href="{.indicator}" data-lightbox='{.indicator}' data-title="#{.runNumber} {.folder}"> <img  alt="Image not found" class="img-responsive lazy"  data-src="{.indicator}" /></a> 
                </div>
                
                
                
            </div>
            </div>

    </div>
    <div id="experimentparameters_{DataCollection_dataCollectionId}" class="tab-pane fade">
         <div class="container-fluid">
                <div class="row">
                   
                           <div class="col-xs-6 col-md-2">
                                {>"section.general.parameters"  /}                             
                            </div>
                            <div class="col-xs-6 col-md-2">
                                {>"section.general.parameters_second"  /}                             
                            </div>
                             <div class="col-xs-6 col-md-2">
                                {>"section.general.parameters.beamlineparameters"  /}                             
                            </div>
                              <div class="col-xs-6 col-md-2">
                                {>"section.general.parameters.detector"  /}                             
                            </div>
                            
                    
                </div>
         </div>       
    </div>
      <div id="sample_{DataCollection_dataCollectionId}" class="tab-pane fade">
         <div class="container-fluid">
                <div class="row">
                   
                           <div class="col-xs-6 col-md-2">
                                {>"section.general.parameters.sample"  /}                             
                            </div>
                           
                            
                    
                </div>
         </div>       
    </div>
    
  </div>
</div>



</div>