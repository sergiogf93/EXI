

<table style='font-size:10px;line-height:10px;'>
  {#.autoProcResults[0]}
  <tr >
    <td class='summary_datacollection_parameter' colspan='3' style='border-bottom:1px solid gray;'>{.spaceGroup}</td>
   
  </tr>
  <tr>
    <td class='summary_datacollection_parameter_name'>inner</td>
    <td class='summary_datacollection_parameter'> ({.innerShell.completeness}%)</td>
    <td  style="width:70px;">
        <div style="width:100%;height:10px;position:relative;background-color:#BDBDBD;">
                <div style="background-color:#298A08;height:100%;position:absolute;line-height:inherit;width:{.innerShell.completeness}%;"></div>
        </div>    
    </td>     
  </tr>
  
  <tr>
    <td class='summary_datacollection_parameter_name'>outer</td>
    <td class='summary_datacollection_parameter'> ({.outerShell.completeness}%)</td>
    <td  style="width:70px;">
        <div style="width:100%;height:10px;position:relative;background-color:#BDBDBD;">
                <div style="background-color:#298A08;height:100%;position:absolute;line-height:inherit;width:{.outerShell.completeness}%; "></div>
        </div>    
    </td>     
  </tr>
  
  <tr>
    <td class='summary_datacollection_parameter_name'>overall</td>
    <td class='summary_datacollection_parameter'> ({.overall.completeness}%)</td>
    <td  style="width:70px;">
        <div style="width:100%;height:10px;position:relative;background-color:#BDBDBD;">
                <div style="background-color:#298A08;height:100%;position:absolute;line-height:inherit;width:{.overall.completeness}%;"></div>
        </div>    
    </td>     
  </tr>
   {/.autoProcResults[0]} 
</table>


