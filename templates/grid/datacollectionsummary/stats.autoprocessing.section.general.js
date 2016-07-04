{!<div class="owl-carousel owl-theme">!}
  


  {#.autoProcResults[0]}
  <div>
    <table style='font-size:10px;line-height:10px;'>
            <tr >
                <td  colspan='3' style='border-bottom:1px solid gray;'>{.spaceGroup}</td>
                <td  colspan='1' style='border-bottom:1px solid gray;'>Rank #{.rank}</td>
            </tr>
             <tr >
                <th   style='color:gray;'>Type</th>
                <th   style='color:gray;'>Completeness</th>                
                <th   style='color: gray;'>Res.</th>
                <th   style='color: gray;'>Rmerge</th>
            
            </tr>
            <tr>
                <td style='color: gray;'>inner</td>
              
                <td  style="width:40px;">
                    
                    <div style="width:100%;height:10px;position:relative;background-color:#BDBDBD;">
                            <div style="background-color:#298A08;height:100%;position:absolute;line-height:inherit;width:{.innerShell.completeness}%;"></div>
                    </div>    
                </td>     
                <td class='summary_datacollection_parameter'>{.innerShell.resolutionsLimitHigh}</td>
                <td class='summary_datacollection_parameter'>{.innerShell.rMerge}</td>
            </tr>
            
            
            <tr>
                <td style='color: gray;'>outer</td>
               
                <td  style="width:40px;">
                    
                    <div style="width:100%;height:10px;position:relative;background-color:#BDBDBD;">
                            <div style="background-color:#298A08;height:100%;position:absolute;line-height:inherit;width:{.outerShell.completeness}%; "></div>
                    </div>                        
                </td>     
                <td class='summary_datacollection_parameter'> {.outerShell.resolutionsLimitHigh}</td>
                <td class='summary_datacollection_parameter'>{.outerShell.rMerge}</td>
            </tr>
            
            <tr>
                <td style='color: gray;'>overall</td>              
                <td  style="width:40px;">                    
                    <div style="width:100%;height:10px;position:relative;background-color:#BDBDBD;">
                            <div style="background-color:#298A08;height:100%;position:absolute;line-height:inherit;width:{.overall.completeness}%;"></div>
                    </div>    
                </td>     
                <td class='summary_datacollection_parameter'> {.overall.resolutionsLimitHigh}</td>
                 <td class='summary_datacollection_parameter'>{.overall.rMerge}</td>
            </tr>
          
            
            
        </table>
    </div>
    
   {/.autoProcResults[0]} 
{!</div>!}
