<div class="container-fluid containerWithScroll">
    <div class="row">
        <div class="col-xs-12 col-md-12">
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Run</th>
                    <th>Frames (Average/Total)</th>
                    <th colspan="3">Guinier</th>
                    <th colspan="3">Gnom</th>
                    <th colspan="2">Porod</th>
                    <th>Scattering</th>
                    <th>Kratky.</th>
                    <th>Density</th>
                    <th>Guinier</th>
                    <th>Advanced</th>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Rg</th>
                    <th>Points</th>
                    <th>I0</th>
                    <th>Rg</th>
                    <th>Total</th>
                    <th>D<sub>max</sub></th>
                    <th>Volume</th>
                    <th>MM Vol. est.</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                
                {#rows}
                    {#.specimens}
                        <tr>
                            {?hasMacromolecule}
                                <td># {.code}</td>
                                <td>
                                    <div class="row">
                                        <div class="col-md-9">
                                            <b>{.acronym} </b> {.concentration} <span style='font-size:9px;color:gray'>  mg/ml</span> {.expTemp} C
                                        </div>
                                        <div class="col-md-3" style="background-color:{.average.color};">
                                            {.average.text}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span {@eq key=rg value="NA"}class='notavailablefield'>NA</span>{:else}>{.rg}</span><span style='font-size:10px;color:gray'>  nm</span>{/eq}
                                </td>
                                <td>
                                    <span {@eq key=points value="NA"}class='notavailablefield'>NA{:else}>{.points}{/eq}</span>
                                </td>
                                <td>
                                    <span {@eq key=I0 value="NA"}class='notavailablefield'>NA</span>{:else}>{.I0}</span><span style='font-size:10px'> &#177; {.I0Stdev}</span>{/eq}
                                </td>
                                <td>
                                    <span {@eq key=rgGnom value="NA"}class='notavailablefield'>NA</span>{:else}>{.rgGnom}</span><span style='font-size:10px;color:gray'>  nm</span>{/eq}
                                </td>
                                <td>
                                    <span {@eq key=total value="NA"}class='notavailablefield'>NA{:else}>{.total}{/eq}</span>
                                </td>
                                <td>
                                    <span {@eq key=dmax value="NA"}class='notavailablefield'>NA</span>{:else}>{.dmax}</span><span style='font-size:10px;color:gray'>  nm</span>{/eq}
                                </td>
                                <td>
                                    <span {@eq key=volumePorod value="NA"}class='notavailablefield'>NA</span>{:else}>{.volumePorod}</span><span style='font-size:8px;color:gray;'> nm<sub>3</sub></span>{/eq}
                                </td>
                                <td>
                                    <span {@eq key=volumePorod value="NA"}class='notavailablefield'>NA</span>{:else}>{.mmvolest}</span><span style='font-size:8px;color:gray;'> kD</span>{/eq}
                                </td>
                            {:else}
                                <td># {.code}</td>
                                <td>
                                    <div class="row">
                                        <div class="col-md-9">
                                        </div>
                                        <div class="col-md-3" style="background-color:{.average.color};">
                                            {.average.text}
                                        </div>
                                    </div>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            {/hasMacromolecule}
                            {@idx}
                                {@eq key="{.}" value="0"}
                                    <td rowspan="{.nSpecimens}">
                                        <a href="{.scattering}" data-lightbox="{.scattering}" data-title="Scattering">
                                            <center><img alt="Image not found" class="img-responsive queue-img" src="{.scattering}" style="display: block;"  height="{imgWidth}px" width="{imgWidth}px"/></center>
                                        </a> 
                                    </td>
                                    <td>
                                        <a href="{.kratky}" data-lightbox="{.kratky}" data-title="Kratky">
                                            <center><img alt="Image not found" class="img-responsive queue-img" src="{.kratky}" style="display: block;"  height="{imgWidth}px" width="{imgWidth}px"/></center>
                                        </a>  
                                    </td>
                                    <td rowspan="{.nSpecimens}">
                                        <a href="{.density}" data-lightbox="{.density}" data-title="Density">
                                            <center><img alt="Image not found" class="img-responsive queue-img" src="{.density}" style="display: block;" height="{imgWidth}px" width="{imgWidth}px"/></center>
                                        </a> 
                                    </td>
                                    <td rowspan="{.nSpecimens}">
                                        <a href="{.guinier}" data-lightbox="{.guinier}" data-title="Guinier">
                                            <center><img alt="Image not found" class="img-responsive queue-img" src="{.guinier}" style="display: block;" height="{imgWidth}px" width="{imgWidth}px" /></center>
                                        </a> 
                                    </td>
                                    <td rowspan="{.nSpecimens}">
                                        <table class="table queue-small-padding-table table-queue-grid-borderless">
                                            <tbody>
                                                    <tr>
                                                        <td>
                                                            {?dataReduction}
                                                                <button class="btn-green" type="submit" style="font-size:9px;width:90px; height:15px">
                                                                <span class="glyphicon glyphicon-ok"></span>
                                                            {:else}
                                                                <button class="btn-blue" type="submit" style="font-size:9px;width:90px; height:15px">
                                                                <span class="glyphicon glyphicon-remove"></span>
                                                            {/dataReduction}
                                                                <span class="submit-text"> Data Reduction</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {?abinitio}
                                                                <button class="btn-green" type="submit" style="font-size:9px;width:90px; height:15px">
                                                                <span class="glyphicon glyphicon-ok"></span>
                                                            {:else}
                                                                <button class="btn-blue" type="submit" style="font-size:9px;width:90px; height:15px">
                                                                <span class="glyphicon glyphicon-remove"></span>
                                                            {/abinitio}
                                                                <span class="submit-text"> Abinitio</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {?fit}
                                                                <button class="btn-green" type="submit" style="font-size:9px;width:90px; height:15px">
                                                                <span class="glyphicon glyphicon-ok"></span>
                                                            {:else}
                                                                <button class="btn-blue" type="submit" style="font-size:9px;width:90px; height:15px">
                                                                <span class="glyphicon glyphicon-remove"></span>
                                                            {/fit}
                                                                <span class="submit-text"> Fit</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {?superposition}
                                                                <button class="btn-green" type="submit" style="font-size:9px;width:90px; height:15px">
                                                                <span class="glyphicon glyphicon-ok"></span>
                                                            {:else}
                                                                <button class="btn-blue" type="submit" style="font-size:9px;width:90px; height:15px">
                                                                <span class="glyphicon glyphicon-remove"></span>
                                                            {/superposition}
                                                                <span class="submit-text"> Superposition</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {?rigidBody}
                                                                <button class="btn-green" type="submit" style="font-size:9px;width:90px; height:15px">
                                                                <span class="glyphicon glyphicon-ok"></span>
                                                            {:else}
                                                                <button class="btn-blue" type="submit" style="font-size:9px;width:90px; height:15px">
                                                                <span class="glyphicon glyphicon-remove"></span>
                                                            {/rigidBody}
                                                                <span class="submit-text"> Rigid Body</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                {:else}

                                {/eq}
                            {/idx}
                        </tr>
                    {/.specimens}
                {/rows}

            </table>
        </div>
    </div>
</div>