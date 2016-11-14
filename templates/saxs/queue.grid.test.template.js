<div class="container-fluid">
    <div class="panel with-nav-tabs panel-default">
        <div class="panel-heading clearfix">
            <div class="pull-left">
                <span style='font-size:12px;color:blue;' >
                     <kbd style='background-color:#CCCCCC;color:blue;'>
                        Run #{#codes}{.code}{@sep}, {/sep}{/codes}
                     </kbd>                              
                </span>
                <span style="padding-left:5px;">
                    <b>Acronym:</b> {macromoleculeAcronym} {concentration} <span style='font-size:9px;color:gray'>  mg/ml</span>
                </span>
                <div>
                    <b>Exp. Temp.:</b> {.expTemp}
                </div>
            </div>
        </div>
        <br />
        <div>
            <div>
                <div class="container-fluid">
                    <div class="row" style="padding-bottom:10px;">
                        <div class="col-sm-6">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <table class="table">
                                            <tr>
                                                <td>Frames <span style='font-size:10px;'></span></td>
                                            </tr>
                                            {#codes}
                                                <tr>
                                                    <td>#{.code}</td>
                                                    <td class="text-center" style="background-color:{.average.color};font-size:9px;">{.average.text}</td>
                                                </tr>
                                            {/codes}
                                        </table>
                                    </div>
                                    <div class="col-sm-3">
                                        <table class="table">
                                            <tr>
                                                <td>Guinier</td>
                                            </tr>
                                            <tr>
                                                <td>Rg</td>
                                                <td class='column_parameter_value'>
                                                    <span {@eq key=rg value="NA"}class='notavailablefield'>NA</span>{:else}>{.rg}</span><span style='font-size:10px;color:gray'>  nm</span>{/eq}
                                                </td>                                  
                                            </tr>
                                            <tr>
                                                <td>Points</td>
                                                <td class='column_parameter_value'>
                                                    <span {@eq key=points value="NA"}class='notavailablefield'>NA{:else}>{.points}{/eq}</span>
                                                </td> 
                                            </tr>
                                            <tr>
                                                <td>I0</td>
                                                <td class='column_parameter_value'>
                                                    <span {@eq key=I0 value="NA"}class='notavailablefield'>NA</span>{:else}>{.I0}</span><span style='font-size:10px'> &#177; {.I0Stdev}</span>{/eq}
                                                </td> 
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-sm-3">
                                        <table class="table">
                                            <tr>
                                                <td>Gnom</td>
                                            </tr>
                                            <tr>
                                                <td>Rg</td>
                                                <td class='column_parameter_value'>
                                                    <span {@eq key=rgGnom value="NA"}class='notavailablefield'>NA</span>{:else}>{.rgGnom}</span><span style='font-size:10px;color:gray'>  nm</span>{/eq}
                                                </td>                                  
                                            </tr>
                                            <tr>
                                                <td>Total</td>
                                                <td class='column_parameter_value'>
                                                    <span {@eq key=total value="NA"}class='notavailablefield'>NA{:else}>{.total}{/eq}</span>
                                                </td> 
                                            </tr>
                                            <tr>
                                                <td>D<sub>max</sub></td>
                                                <td class='column_parameter_value'>
                                                    <span {@eq key=dmax value="NA"}class='notavailablefield'>NA</span>{:else}>{.dmax}</span><span style='font-size:10px;color:gray'>  nm</span>{/eq}
                                                </td> 
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-sm-3">
                                        <table class="table">
                                            <tr>
                                                <td>Porod</td>
                                            </tr>
                                            <tr>
                                                <td>Volume</td>
                                                <td class='column_parameter_value'>
                                                    <span {@eq key=volumePorod value="NA"}class='notavailablefield'>NA</span>{:else}>{.volumePorod}</span><span style='font-size:8px;color:gray;'> nm<sub>3</sub></span>{/eq}
                                                </td>                                  
                                            </tr>
                                            <tr>
                                                <td>MM Vol. est.</td>
                                                <td class='column_parameter_value'>
                                                    <span {@eq key=volumePorod value="NA"}class='notavailablefield'>NA</span>{:else}>{.mmvolest}</span><span style='font-size:8px;color:gray;'> kD</span>{/eq}
                                                </td> 
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <a href="{.scattering}" data-lightbox="{.scattering}" data-title="Scattering">
                                            <center><img alt="Image not found" class="img-responsive queue-img" src="{.scattering}" style="display: block;"  height="{.imgWidth}px" width="{.imgWidth}px"/></center>
                                        </a>
                                    </div>
                                    <div class="col-sm-3">
                                        <a href="{.kratky}" data-lightbox="{.kratky}" data-title="Kratky">
                                            <center><img alt="Image not found" class="img-responsive queue-img" src="{.kratky}" style="display: block;"  height="{.imgWidth}px" width="{.imgWidth}px"/></center>
                                        </a> 
                                    </div>
                                    <div class="col-sm-3">
                                        <a href="{.density}" data-lightbox="{.density}" data-title="Density">
                                            <center><img alt="Image not found" class="img-responsive queue-img" src="{.density}" style="display: block;" height="{.imgWidth}px" width="{.imgWidth}px"/></center>
                                        </a>
                                    </div>
                                    <div class="col-sm-3">
                                        <a href="{.guinier}" data-lightbox="{.guinier}" data-title="Guinier">
                                            <center><img alt="Image not found" class="img-responsive queue-img" src="{.guinier}" style="display: block;" height="{.imgWidth}px" width="{.imgWidth}px" /></center>
                                        </a> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>