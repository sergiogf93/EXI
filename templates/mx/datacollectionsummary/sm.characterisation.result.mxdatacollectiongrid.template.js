



<table class='table-sm table table-striped'>
    <tr>
        <td style='padding:0 15px 0 15px;'>Indexed</td> 
        <td style='padding:0 15px 0 15px;'>
            {@eq key=.ScreeningOutput_indexingSuccess type="boolean" value="true"}
                <div class='summary_datacollection_success'></div>
            {:else}
                <div class='summary_datacollection_failed'></div>
            {/eq}
        </td>
        {@eq key=.ScreeningOutput_indexingSuccess type="boolean" value="true"}
        <td style='padding:0 15px 0 15px;'>Space Group</td> <td style='padding:0 15px 0 15px;' class='column_parameter_value'>{.ScreeningOutputLattice_spaceGroup}</td>                                                        
        <td style='padding:0 15px 0 15px;'>Mosaicity</td> <td style='padding:0 15px 0 15px;' class='column_parameter_value'>{.ScreeningOutput_mosaicity}</td>                                                        
        {:else}
        <td style='padding:0 15px 0 15px;'> </td> 
        <td style='padding:0 15px 0 15px;'> </td> 
        <td style='padding:0 15px 0 15px;'> </td> 
        {/eq}    
    </tr>
    
    <tr>
        <td style='padding:0 15px 0 15px;'>Strategy</td> 
    
            {@eq key=.ScreeningOutput_strategySuccess type="boolean" value="true"}
                <td style='padding:0 15px 0 15px;'> <div class='summary_datacollection_success'></div></td> 
                <td style='padding:0 15px 0 15px;'>Rank. Res.</td> <td style='padding:0 15px 0 15px;' class='column_parameter_value'>{.ScreeningOutput_rankingResolution} &#8491;</td>
                <td style='padding:0 15px 0 15px;'>Exp. Time</td> <td style='padding:0 15px 0 15px;' class='column_parameter_value'>{.ScreeningStrategySubWedge_exposureTime} s</td>
             </tr>
             <tr>
                 <td style='padding:0 15px 0 15px;'>Images</td> <td style='padding:0 15px 0 15px;' class='column_parameter_value'>{.ScreeningStrategySubWedge_numberOfImages}</td>
                 <td style='padding:0 15px 0 15px;'>Total rotation</td> <td style='padding:0 15px 0 15px;' class='column_parameter_value'>{.ScreeningStrategySubWedge_oscillationRange} &deg;</td>
                 <td style='padding:0 15px 0 15px;'>Transmission</td> <td style='padding:0 15px 0 15px;' class='column_parameter_value'>{@decimal key="ScreeningStrategySubWedge_transmission" decimals=1 /} %</td>                {:else}
            {:else}
                 <td style='padding:0 15px 0 15px;'><div class='summary_datacollection_failed'></div></td>
                 <td style='padding:0 15px 0 15px;'> </td> 
                 <td style='padding:0 15px 0 15px;'> </td> 
                 <td style='padding:0 15px 0 15px;'> </td> 
                 <td style='padding:0 15px 0 15px;'> </td> 
            {/eq}
    
    </tr> 
                                                                            
</table>
