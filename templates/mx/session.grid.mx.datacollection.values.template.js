<div class="container-fluid" style="padding:0px;">
    <div class="row">
        <div class="col-md-2" style="padding:0px;">
            <div style="text-align:center;">
                <span style="background-color:#207a7a;" class="badge">{.sampleCount}</span>
            </div>
        </div>
        <div class="col-md-2" style="padding:0px;">
            <div style="text-align:center;">
                <span style="background-color:#207a7a;" class="badge">WF</span>
            </div>
        </div>
        <div class="col-md-2" style="padding:0px;">
            <div style="text-align:center;">
                <span style="background-color:#207a7a;" class="badge">{.testDataCollectionGroupCount}</span>/
                <span style="background-color:#207a7a;" class="badge">{.dataCollectionGroupCount}</span>
            </div>
        </div>
        <div class="col-md-2" style="padding:0px;">
            <div style="text-align:center;">
                <span style="background-color:#207a7a;" class="badge">{.energyScanCount}</span>/
                <span style="background-color:#207a7a;" class="badge">{.xrfSpectrumCount}</span>
            </div>
        </div>
        <div class="col-md-2" style="padding:0px;">
            <div style="text-align:center;">
                <span style="background-color:#207a7a;" class="badge">Autoprocc</span>
            </div>
        </div>
        <div class="col-md-2" style="padding:0px;">
            <div style="text-align:center;">
                <span style="background-color:#207a7a;" class="badge">Phasing</span>
            </div>
        </div>
    </div>
    {!<table class="table">
            <thead>
            <tr>
                <th>
                    <span style="background-color:#207a7a;" class="badge">{.sampleCount}</span>
                </th>
                <th>
                    <span style="background-color:#207a7a;" class="badge">WF</span>
                </th>
                <th>
                    <span style="background-color:#207a7a;" class="badge">{?.testDataCollectionGroupCount}{.testDataCollectionGroupCount}{:else}0{/.testDataCollectionGroupCount}</span>/
                    <span style="background-color:#207a7a;" class="badge">{.dataCollectionGroupCount}</span>                   
                </th>
                <th>
                    <span style="background-color:#207a7a;" class="badge">{.energyScanCount}</span>/
                    <span style="background-color:#207a7a;" class="badge">{.xrfSpectrumCount}</span>
                </th>
                <th>
                    <span style="background-color:#207a7a;" class="badge">Autoprocc</span>
                </th>
                <th>
                    <span style="background-color:#207a7a;" class="badge">Phasing</span>
                </th>
            </tr>
        </thead>
    </table>!}
</div>