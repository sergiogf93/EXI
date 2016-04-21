

<table>
    <tr>
        <td>
            <table>

                <tr>
                    <td class='summary_datacollection_parameter_name'>Workflow</td>
                    <td class='summary_datacollection_parameter'>
                    {@eq key=Workflow_status value="Success"}<div class='summary_datacollection_success'></div>{/eq}
                    {@eq key=Workflow_status value="Failure"}<div class='summary_datacollection_failed'></div>{/eq}
                    {.Workflow_workflowType}
                    </td>
                </tr>
                
                <tr>
                    <td class='summary_datacollection_parameter_name'>Type</td>
                    <td class='summary_datacollection_parameter'>{.DataCollectionGroup_experimentType}</td>
                </tr>
                
                
                <tr>
                    <td class='summary_datacollection_parameter_name'>Protein</td>
                    <td class='summary_datacollection_parameter'>{.Protein_acronym}</td>
                </tr>
                
                
                <tr>
                    <td class='summary_datacollection_parameter_name'>Sample</td>
                    <td class='summary_datacollection_parameter'>{.BLSample_name}</td>
                </tr>
                 <tr>
                    <td class='summary_datacollection_parameter_name'>Prefix</td>
                    <td class='summary_datacollection_parameter'>{.DataCollection_imagePrefix}</td>
                </tr>
                
                <tr>
                    <td class='summary_datacollection_parameter_name'>Run Number</td>
                    <td class='summary_datacollection_parameter'>{.DataCollection_dataCollectionNumber}</td>
                </tr>
                
                 <tr>
                    <td class='summary_datacollection_parameter_name'>Start Time</td>
                    <td class='summary_datacollection_parameter'>{.DataCollection_startTime}</td>
                </tr>
                
                
            </table>
        </td>
        
         <td>
            <table>

                <tr>
                    <td class='summary_datacollection_parameter_name'>Resolution (corner)</td>
                    <td class='summary_datacollection_parameter'>{.DataCollection_resolution} ({.DataCollection_resolutionAtCorner})</td>
                </tr>
                
                
                 <tr>
                    <td class='summary_datacollection_parameter_name'>Wavelenth</td>
                    <td class='summary_datacollection_parameter'>{.DataCollection_wavelength}</td>
                </tr>
                
                <tr>
                    <td class='summary_datacollection_parameter_name'>Axis</td>
                    <td class='summary_datacollection_parameter'>{.DataCollection_rotationAxis} {.DataCollection_axisRange} : {.DataCollection_axisEnd}-{.DataCollection_axisStart}</td>
                </tr>
                
                <tr>
                    <td class='summary_datacollection_parameter_name'>Flux Start</td>
                    <td class='summary_datacollection_parameter'>{.DataCollection_flux} ph/sec</td>
                </tr>
                
                <tr>
                    <td class='summary_datacollection_parameter_name'>Flux End</td>
                    <td class='summary_datacollection_parameter'>{.DataCollection_flux_end} ph/sec</td>
                </tr>
                
               
                
                
            </table>
        </td>
        
    </tr>
</table>
 <p style=" font-size:9px;word-wrap: break-word !important;" >{.DataCollection_imageDirectory}</p>
 <div style="border: 1px solid #000000; word-wrap: break-word !important;" >{.DataCollectionGroup_comments}</div>