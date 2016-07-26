
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
              