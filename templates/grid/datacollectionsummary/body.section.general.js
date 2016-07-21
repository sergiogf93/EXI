<div class="container-fluid">
  <div class="row">
    
    <div class="col-xs-12 col-md-2">
        <table class="table">                    
            <tr>
                <td>Worflow</td>
                <td> 
                    {@eq key=Workflow_status value="Success"}<div class='summary_datacollection_success'></div>{/eq}
                    {@eq key=Workflow_status value="Failure"}<div class='summary_datacollection_failed'></div>{/eq}
                    {.Workflow_workflowType}
                </td>
            </tr>
            <tr>
                <td>Protein</td>
                <td>{.Protein_acronym}</td>
            </tr>
            <tr>
                <td>Sample</td>
                <td>{.BLSample_name}</td>
            </tr>
            <tr>
                <td>Prefix</td>
                <td>{.DataCollection_imagePrefix}</td>
            </tr>
            
            <tr>
                <td>Images</td>
                <td>{.totalNumberOfImages}</td>
            </tr>
            <tr>
                <td>Transmission</td>
                <td>{.transmission}</td>
            </tr>
            
            <tr>
                <td>Flux start</td>
                <td>{.DataCollection_flux} ph/sec</td>
            </tr>
        </table>       
    </div>
    
    <div class="col-xs-12 col-md-2">
    
    
        <table class="table">                    
            <tr>
                <td>Type</td>
                <td> 
                  {.DataCollectionGroup_experimentType}
                </td>
            </tr>
            <tr>
                <td>Res. (corner)</td>
                <td>{.DataCollection_resolution} &#8491; ({.DataCollection_resolutionAtCorner} &#8491;)</td>
            </tr>
            <tr>
                <td>Wavelenth</td>
                <td>{.DataCollection_wavelength} &#8491;</td>
            </tr>
            <tr>
                <td>{.DataCollection_rotationAxis} range</td>
                <td>{.DataCollection_axisRange} &deg;</td>
            </tr>
            
            <tr>
                <td>{.DataCollection_rotationAxis} start (total)</td>
                <td>{.DataCollection_axisEnd}&deg; ({.DataCollection_axisTotal}&deg;)</td>
            </tr>
            <tr>
                <td>Exposure Time</td>
                <td>{.DataCollection_exposureTime} s</td>
            </tr>
             <tr>
                <td>Flux end</td>
                <td>{.DataCollection_flux_end} ph/sec</td>
            </tr>
        </table>
                
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
    <div class="col-xs-6 col-md-1">
        {#.onlineresults[0]}
        <table class='table'>
           <thead>
                <tr>
                    <th>{.spaceGroup}</th>
                    <th>Completeness</th>
                    <th>Res.</th>
                    <th>Rmerge</th>
                </tr>
                
                <tr>
                    <td>Inner</td>
                    <td>
                            <div class="progress">
                                <div class="progress-bar progress-bar-success"  role="progressbar" aria-valuenow="{.innerShell.completeness}" aria-valuemin="0" aria-valuemax="100" style="width:{.innerShell.completeness}%">
                                
                                {.innerShell.completeness}%
                                </div>
                            </div>
                    </td>
                    <td>{.innerShell.resolutionsLimitHigh}</td>
                    <td>{.innerShell.rMerge}</td>
                </tr>
                 <tr>
                    <td>Outer</td>
                    <td>
                            <div class="progress">
                                <div class="progress-bar progress-bar-success"   role="progressbar" aria-valuenow="{.outerShell.completeness}" aria-valuemin="0" aria-valuemax="100" style="width:{.outerShell.completeness}%">
                                {.outerShell.completeness}%
                                </div>
                            </div>
                    </td>
                    <td>{.outerShell.resolutionsLimitHigh}</td>
                    <td>{.outerShell.rMerge}</td>
                </tr>
                <tr>
                    <td>Outer</td>
                    <td>
                            <div class="progress">
                                <div class="progress-bar progress-bar-success"   role="progressbar" aria-valuenow="{.overall.completeness}" aria-valuemin="0" aria-valuemax="100" style="width:{.overall.completeness}%">
                                {.overall.completeness}%
                                </div>
                            </div>
                    </td>
                    <td>{.overall.resolutionsLimitHigh}</td>
                    <td>{.overall.rMerge}</td>
                </tr>
                
            </thead>
        </table>
        {/.onlineresults[0]}
    </div>   
    
  </div>
</div>