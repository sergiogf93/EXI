<div class="container-fluid">
    <div class="row">
        <div class="col-sm-1">
            <table class="table table-queue-grid-borderless">
                <tbody>
                    {#codes}
                        <tr><td># {.}</td></tr>
                    {/codes}
                </tbody>
            </table>
        </div> 
        <div class="col-sm-1">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-10">
                        <table class="table table-queue-grid-borderless">
                            <tbody>
                                {#macromoleculeInfo}
                                    <tr>
                                        <td>
                                            {@eq key=acronym value=""}&nbsp;{:else}<b>{.acronym}</b> {.concentration}{/eq}
                                        </td>
                                    </tr>
                                {/macromoleculeInfo}
                            </tbody>
                        </table>
                    </div>
                    <div class="col-sm-2">
                        <table class="table table-queue-grid-borderless">
                            <tbody>
                                {#averages}
                                    <tr><td style="background-color:{.color};">{.text}</td></tr>
                                {/averages}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div> 
        <div class="col-sm-1">
            <div class="container-fluid">
                {expTemp}
            </div>
        </div>
        <div class="col-sm-2">
            <div class="row text-center">
                <div class="col-sm-4">
                    <span {@eq key=rg value="NA"}class='notavailablefield'>NA</span>{:else}>{rg}</span><span style='font-size:10px;color:gray'>  nm</span>{/eq}
                </div>
                <div class="col-sm-4">
                    <span {@eq key=points value="NA"}class='notavailablefield'>NA{:else}>{points}{/eq}</span>
                </div>
                <div class="col-sm-4">
                    <span {@eq key=I0 value="NA"}class='notavailablefield'>NA</span>{:else}>{I0}</span><span style='font-size:10px'> &#177; {I0Stdev}</span>{/eq}
                </div>
            </div>
        </div> 
        <div class="col-sm-2">
            <div class="row text-center">
                <div class="col-sm-4">
                    <span {@eq key=rgGnom value="NA"}class='notavailablefield'>NA</span>{:else}>{rgGnom}</span><span style='font-size:10px;color:gray'>  nm</span>{/eq}
                </div>
                <div class="col-sm-4">
                    <span {@eq key=total value="NA"}class='notavailablefield'>NA{:else}>{total}{/eq}</span>
                </div>
                <div class="col-sm-4">
                    <span {@eq key=dmax value="NA"}class='notavailablefield'>NA</span>{:else}>{dmax}</span><span style='font-size:10px;color:gray'>  nm</span>{/eq}
                </div>
            </div>
        </div> 
        <div class="col-sm-1">
            <div class="row text-center">
                <div class="col-sm-6">
                    <span {@eq key=volumePorod value="NA"}class='notavailablefield'>NA</span>{:else}>{volumePorod}</span><span style='font-size:8px;color:gray;'> nm<sub>3</sub></span>{/eq}
                </div>
                <div class="col-sm-6">
                    <span {@eq key=volumePorod value="NA"}class='notavailablefield'>NA</span>{:else}>{mmvolest}</span><span style='font-size:8px;color:gray;'>kD</span>{/eq}
                </div>
            </div>
        </div>
        <div class="col-sm-1">
            <div>
                <a href="{scattering}">
                    <img alt="Image not found" class="img-responsive border-img" src="{scattering}" height="{imgWidth}" width="{imgWidth}" />
                </a>                           
            </div>
        </div> 
        <div class="col-sm-1">
            <div>
                <a href="{kratky}">
                    <img alt="Image not found" class="img-responsive border-img" src="{kratky}" height="{imgWidth}" width="{imgWidth}" />
                </a>                           
            </div>
        </div> 
        <div class="col-sm-1">
            <div>
                <a href="{density}">
                    <img alt="Image not found" class="img-responsive border-img" src="{density}" height="{imgWidth}" width="{imgWidth}" />
                </a>                           
            </div>
        </div> 
        <div class="col-sm-1">
            <div>
                <a href="{guinier}">
                    <img alt="Image not found" class="img-responsive border-img" src="{guinier}" height="{imgWidth}" width="{imgWidth}" />
                </a>                           
            </div>
        </div> 
    </div>
</div>