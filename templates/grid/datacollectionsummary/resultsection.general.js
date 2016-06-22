


<table>

    <tr>
        <td class='summary_datacollection_parameter_name'>Workflow</td>
        <td width="100px;" class='summary_datacollection_parameter'>
        {@eq key=Workflow_status value="Success"}<div class='summary_datacollection_success'></div>{/eq}
        {@eq key=Workflow_status value="Failure"}<div class='summary_datacollection_failed'></div>{/eq}
        {.Workflow_workflowType}
        </td>
        <td  class='summary_datacollection_parameter_name'>Type</td>
        <td class='summary_datacollection_parameter'>{.DataCollectionGroup_experimentType}</td>
    </tr>
    
    
    
    
    <tr>
        <td class='summary_datacollection_parameter_name'>Protein</td>
        <td class='summary_datacollection_parameter'>{.Protein_acronym}</td>
        <td class='summary_datacollection_parameter_name'>Res. (corner)</td>
        <td class='summary_datacollection_parameter'>{.DataCollection_resolution} &#8491; ({.DataCollection_resolutionAtCorner} &#8491;)</td>
    </tr>
    
    
    <tr>
        <td class='summary_datacollection_parameter_name'>Sample</td>
        <td class='summary_datacollection_parameter'>{.BLSample_name}</td>
        <td class='summary_datacollection_parameter_name'>Wavelenth</td>
        <td class='summary_datacollection_parameter'>{.DataCollection_wavelength} &#8491;</td>
    </tr>
        <tr>
        <td class='summary_datacollection_parameter_name'>Prefix</td>
        <td class='summary_datacollection_parameter'>{.DataCollection_imagePrefix}</td>
        <td class='summary_datacollection_parameter_name'>{.DataCollection_rotationAxis} range</td>
        <td class='summary_datacollection_parameter'> {.DataCollection_axisRange} &deg;</td>

    </tr>
    
    <tr>
        <td class='summary_datacollection_parameter_name'>Run Number</td>
        <td class='summary_datacollection_parameter'>{.DataCollection_dataCollectionNumber}</td>
        <td class='summary_datacollection_parameter_name'>{.DataCollection_rotationAxis} start (total)</td>
        <td class='summary_datacollection_parameter'>{.DataCollection_axisEnd}&deg; ({.DataCollection_axisTotal}&deg;)</td>
        
    </tr>
    
    <tr>
        <td class='summary_datacollection_parameter_name'>Date</td>
        <td class='summary_datacollection_parameter'>{.date} </td>
        
        <td class='summary_datacollection_parameter_name'>Exposure Time</td>
        <td class='summary_datacollection_parameter'>{.DataCollection_exposureTime} s</td>
        
       
    </tr>
    
     <tr>
        <td class='summary_datacollection_parameter_name'> Time</td>
        <td class='summary_datacollection_parameter'>{.time}</td>
     
        <td class='summary_datacollection_parameter_name'>Flux Start</td>
        <td class='summary_datacollection_parameter'>{.DataCollection_flux} ph/sec</td>
 
       
    </tr>

   <tr>
        <td class='summary_datacollection_parameter_name'>Total Images</td>
        <td class='summary_datacollection_parameter'>{.totalNumberOfImages}</td>
        <td class='summary_datacollection_parameter_name'>Flux End</td>
        <td class='summary_datacollection_parameter'>{.DataCollection_flux_end} ph/sec</td>
    </tr>
     <tr>
        <td class='summary_datacollection_parameter_name'>Transmission</td>
        <td class='summary_datacollection_parameter'>{.transmission}</td>
        
    </tr>
    
    
</table>
<br/>
 <table  style='width:100%;'>
     <tr style='width:100%;'>
        <td class='summary_datacollection_parameter_name'>Directory</td>
         
    </tr>    
     <tr style='width:100%;'>
        
        <td    style='width:100%;' colspan='3' style='font-size:8px;' class='summary_datacollection_parameter'><textarea class='ta2' rows="3" cols="20">{.DataCollection_imageDirectory}</textarea></td> 
    </tr>
    
</table> 
