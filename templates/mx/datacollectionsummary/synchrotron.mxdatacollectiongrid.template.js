<table class="table">                    
    <tr>
        <td>Synchrotron name</td>
        <td  class='column_parameter_value'>{BeamLineSetup_synchrotronName}</td>
    </tr>
    <tr>
        <td>Synchrotron filling mode</td>
        <td  class='column_parameter_value'>{BeamLineSetup_synchrotronMode}</td>
    </tr>
    <tr>
        <td>Synchrotron Current</td>
        <td  class='column_parameter_value'>{@decimal key="synchrotronCurrent" decimals=1 /} mA</td>
    </tr>   
    <tr>
        <td>Undulator types</td>
        <td  class='column_parameter_value'>{BeamLineSetup_undulatorType1} {BeamLineSetup_undulatorType2} {BeamLineSetup_undulatorType3}</td>
    </tr>
     <tr>
        <td>Undulator gaps</td>
        <td  class='column_parameter_value'>{?DataCollection_undulatorGap1}{DataCollection_undulatorGap1} mm {/DataCollection_undulatorGap1}
                                            {?DataCollection_undulatorGap2}{DataCollection_undulatorGap2} mm {/DataCollection_undulatorGap2}
                                            {?DataCollection_undulatorGap3}{DataCollection_undulatorGap3} mm {/DataCollection_undulatorGap3}
        </td>
    </tr>
    <tr>
        <td>Slit gap Hor</td>
        <td  class='column_parameter_value'>{?DataCollection_slitGapHorizontal}{DataCollection_slitGapHorizontal} &mu;m{/DataCollection_slitGapHorizontal}</td>
    </tr>
    <tr>
        <td>Slit gap Vert</td>
        <td  class='column_parameter_value'>{?DataCollection_slitGapVertical}{DataCollection_slitGapVertical} &mu;m{/DataCollection_slitGapVertical}</td>
    </tr>
</table>    