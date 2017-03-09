<table class="table">  
    <tr>
        <td>Beamline name</td>
        <td  class='column_parameter_value'>{.Container_beamlineLocation}</td>
    </tr>                  
    <tr>
        <td>Number of passes</td>
        <td  class='column_parameter_value'> 
            {.DataCollection_numberOfPasses}
        </td>
    </tr>
    <tr>
        <td>Detector Distance</td>
        <td  class='column_parameter_value'>{.DataCollection_detectorDistance} mm</td>
    </tr>
   
    <tr>
        <td>X Beam</td>
        <td  class='column_parameter_value'>{@decimal key="DataCollection_xBeam" decimals=2 /}</td>
    </tr>
    <tr>
        <td>Y Beam</td>
        <td  class='column_parameter_value'>{@decimal key="DataCollection_yBeam" decimals=2 /}</td>
    </tr>
     <tr>
        <td>Kappa</td>
        <td  class='column_parameter_value'>
            {.DataCollection_kappaStart}
            {!{@eq key=DataCollection_kappaStart type="number" value=-9999}
                N/A
            {:else}
                {.DataCollection_kappaStart}
            {/eq}!}
        </td>
    </tr>
     <tr>
        <td>Phi</td>
        <td  class='column_parameter_value'>
            {@eq key=DataCollection_phiStart type="number" value=-9999}
                N/A
            {:else}
                {.DataCollection_phiStart}
            {/eq}
        </td>
    </tr>
</table>       
              