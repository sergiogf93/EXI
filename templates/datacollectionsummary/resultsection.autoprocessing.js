
<div class="showhim" >
   <div class='selected-region' >
    {#.}
                
                <table>
                    {#items}
                        
                        <tr>
                            <td>
                                {@eq key=status value="Success"}<div class='summary_datacollection_success'></div>{/eq}
                                {@eq key=status value="Failure"}<div class='summary_datacollection_failed'></div>{/eq}
                                {@eq key=status value="Not found"}<div class='summary_datacollection_noFound'></div>{/eq}
                            </td> 
                            <td >{.name}</td>
                        </tr>
                        {#items}
                            <tr>
                                <td></td>
                                <td class='summary_datacollection_parameter_name'>{.name}</td>
                                <td class='summary_datacollection_parameter_value'>{.value}{.units}</td>
                                
                            </tr>
                        {/items}
                    {/items}
                </table>
                
           
    {/.}
    {#.[0]}
      <div class="showme" style='color:white;border-radius: 5px;text-align:center;height:20px;background-color:#3892d3;'>
            <a style='color:white;text-decoration: none;' href='#/autoprocintegration/datacollection/{.datacollectionId}/main'>Open Online Data analysis</a>
        </div>
     {/.[0]}
        
     </div>
</div>
