
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
            {@gte key=autoProcResults.length value=1}
                {>"stats.autoprocessing.section.general"  /}
            {/gte}
        {/.[0]}   


    
    
    
 
      
 
  



     
     
     </div>
      {#.[0]}    
      <table>
        <tr>
            <td>
                <a class='showme openGridButton' href='#/autoprocintegration/datacollection/{.datacollectionId}/main'>
                    <div>
                        Open Analysis 
                    </div>
                </a>
            </td>
            <td>
                <a class='showme openGridButton'  href='#/autoprocintegration/datacollection/{.datacollectionId}/files'>
                    <div>
                        Explore Files
                    </div>
                </a>
            </td>
        </tr>
      </table>
      {/.[0]}
      
</div>
