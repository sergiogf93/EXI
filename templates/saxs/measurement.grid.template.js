<div class="container-fluid persist-header">
    <div class="row text-center">
        <div class="col-sm-3 queue-border-top-columns queue-border-bottom-columns queue-border-left-columns queue-border-right-columns ">
            <div>&nbsp;</div>
            Specimen
            <div class="row text-center">
                <div class="col-sm-4 queue-border-top-columns queue-border-right-columns">
                    Macromolecule
                </div>
                <div class="col-sm-4 queue-border-top-columns queue-border-right-columns">
                    Conc.
                </div>
                <div class="col-sm-4 queue-border-top-columns">
                    Buffer
                </div>
            </div>
        </div> 
        <div class="col-sm-5 queue-border-top-columns queue-border-bottom-columns queue-border-right-columns">
            <div>&nbsp;</div>
            Parameters
            <div class="row text-center">
                <div class="col-sm-2 queue-border-top-columns queue-border-right-columns">
                    Exp. Temp.
                </div>
                <div class="col-sm-2 queue-border-top-columns queue-border-right-columns">
                    Vol. Load
                </div>
                <div class="col-sm-2 queue-border-top-columns queue-border-right-columns">
                    Trans.
                </div>
                <div class="col-sm-2 queue-border-top-columns queue-border-right-columns">
                    wait T.
                </div>
                <div class="col-sm-2 queue-border-top-columns queue-border-right-columns">
                    Flow
                </div>
                <div class="col-sm-2 queue-border-top-columns">
                    Viscosity
                </div>
            </div>
        </div> 
        <div class="col-sm-2 queue-border-top-columns queue-border-right-columns" style="border-bottom: 2px solid #ccc;">
            <div>&nbsp;</div>
            Status
            <div>&nbsp;</div>
        </div>
        <div class="col-sm-2 queue-border-top-columns queue-border-right-columns" style="border-bottom: 2px solid #ccc;">
            <div>&nbsp;</div>
            Time
            <div>&nbsp;</div>
        </div>
    </div>  
</div>  

<div id="{id}-scrollable" style="display: block; height: {height}px; overflow-y: auto">
    {#rows}
    <div class="container-fluid persist-header">
        <div class="row queue-border-bottom-columns" {@eq key=status value="DONE"}style="background:rgb(188,245,169);"{/eq}>
            <div class="col-sm-3 ">
                <div class="row">
                    <div class="col-sm-4">
                        {.acronym}
                    </div>
                    <div class="col-sm-4">
                        {.concentration}
                    </div>
                    <div class="col-sm-4 ">
                        {.buffer_acronym}<span style='font-style:oblique;'> Plate: [{.bufferSampleplate.slotPositionColumn},{.samplePlateLetter}-{.bufferSampleplateposition3VO.columnNumber}]</span>
                    </div>
                </div>
            </div> 
            <div class="col-sm-5 ">
                <div class="row">
                    <div class="col-sm-2 ">
                        {.exposureTemperature}
                    </div>
                    <div class="col-sm-2 ">
                        {.volumeToLoad}
                    </div>
                    <div class="col-sm-2 ">
                        {.transmission}
                    </div>
                    <div class="col-sm-2 ">
                        {.waitTime}
                    </div>
                    <div class="col-sm-2 ">
                        {.flow}
                    </div>
                    <div class="col-sm-2 ">
                        {.viscosity}
                    </div>
                </div>
            </div> 
            <div class="col-sm-2 ">
                <span style='font-weight: bold;'>{.status}</span>
            </div>
            <div class="col-sm-2 ">
                
            </div>
        </div>  
    </div>
    {/rows}
</div>