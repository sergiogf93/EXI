<div class="container-fluid containerWithScroll">
    <div class="row">
        <div class="col-xs-12 col-md-12">
            <table class="table small-padding-rows table-striped table-hover align-middle-header align-middle-rows valign-middle-header valign-middle-rows border-header">
                <thead>
                <tr>
                    <th rowspan="2">Run</th>
                    <th rowspan="2">Frames (Average/Total)</th>
                    <th colspan="3">Guinier</th>
                    <th colspan="3">Gnom</th>
                    <th colspan="2">Porod</th>
                    <th rowspan="2">Scattering</th>
                    <th rowspan="2">Kratky.</th>
                    <th rowspan="2">Density</th>
                    <th rowspan="2">Guinier</th>
                    <th rowspan="2">Advanced</th>
                </tr>
                <tr>
                    <th>Rg</th>
                    <th>Points</th>
                    <th>I0</th>
                    <th>Rg</th>
                    <th>Total</th>
                    <th>D<sub>max</sub></th>
                    <th>Volume</th>
                    <th>MM Vol. est.</th>
                </tr>
                </thead>
                
                {#.}
                <tr>
                    <td># {.Measurement_code} {MeasurementToDataCollection_dataCollectionId}</td>
                    <td>
                        <div class="row" style="margin:0px">
                            <div class="col-md-9">
                                {?.Macromolecule_macromoleculeId}
                                    <b>{.Macromolecule_acronym} </b> {@decimal key="Specimen_concentration" decimals=3 /} <span style='font-size:9px;color:gray'>  mg/ml</span> {.Run_exposureTemperature} C 
                                {/.Macromolecule_macromoleculeId}
                            </div>
                            <div class="col-md-3" style="background-color:{@framesColor /};">
                                {?Merge_framesMerge}{.Merge_framesMerge}{:else}NA{/Merge_framesMerge} / {?Merge_framesCount}{.Merge_framesCount}{:else}NA{/Merge_framesCount}
                            </div>
                        </div>
                    </td>
                    {?.Macromolecule_macromoleculeId}
                        <td>
                            <span {^Subtraction_rg}class='notavailablefield'>NA</span>{:else}>{@decimal key="Subtraction_rg" decimals=3 /}</span><span style='font-size:10px;color:gray'>  nm</span>{/Subtraction_rg}
                        </td>
                        <td>
                            <span {^Subtraction_rg}class='notavailablefield'>NA{:else}>{.Subtraction_firstPointUsed} - {.Subtraction_lastPointUsed} ({@math key=Subtraction_lastPointUsed method="subtract" operand=.Subtraction_firstPointUsed/}){/Subtraction_rg}</span>
                        </td>
                        <td>
                            <span {^Subtraction_I0}class='notavailablefield'>NA</span>{:else}>{@decimal key="Subtraction_I0" decimals=1 /}</span><span style='font-size:10px'> &#177; {@exponential key="Subtraction_I0Stdev" decimals=3 /}</span>{/Subtraction_I0}
                        </td>
                        <td>
                            <span {^Subtraction_rgGnom}class='notavailablefield'>NA</span>{:else}>{@decimal key="Subtraction_rgGnom" decimals=3 /}</span><span style='font-size:10px;color:gray'>  nm</span>{/Subtraction_rgGnom}
                        </td>
                        <td>
                            <span {^Subtraction_total}class='notavailablefield'>NA{:else}>{@decimal key="Subtraction_total" decimals=3 /}{/Subtraction_total}</span>
                        </td>
                        <td>
                            <span {^Subtraction_dmax}class='notavailablefield'>NA</span>{:else}>{@decimal key="Subtraction_dmax" decimals=3 /}</span><span style='font-size:10px;color:gray'>  nm</span>{/Subtraction_dmax}
                        </td>
                        <td>
                            <span {^Subtraction_volumePorod}class='notavailablefield'>NA</span>{:else}>{@decimal key="Subtraction_volumePorod" decimals=3 /}</span><span style='font-size:8px;color:gray;'> nm<sub>3</sub></span>{/Subtraction_volumePorod}
                        </td>
                        <td>
                            <span {^Subtraction_volumePorod}class='notavailablefield'>NA</span>{:else}>{@mmVolTest /}</span><span style='font-size:8px;color:gray;'> kD</span>{/Subtraction_volumePorod}
                        </td>
                    {:else}
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                    {/.Macromolecule_macromoleculeId}
                </tr>
                {/.}
            </table>
        </div>
    </div>
</div>