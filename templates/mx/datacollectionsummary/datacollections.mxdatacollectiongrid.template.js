 <div class="container-fluid containerWithScroll" >
    <div class="row">
        <div class="col-xs-12 col-md-2">        
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                    <th>Run</th>
                    <th>Prefix</th>
                    <th>#Images</th>
                    <th>Exposure <br />Time</th>
                    <th>Res. (corner)</th>
                    <th>Wavelength</th>
                    <th>Transmission</th>
                    <th>Directory</th>
                    <th>Time</th>
                    <th>Run status</th>
                    <th>Phasing</th>
                </tr>
                </thead>
                
            {#.}
                {@eq key=runStatus value="failed"}
                <tr class="danger">
                {:else}
                 <tr>
                {/eq}    
                    <td>#{.dataCollectionNumber}</td>
                    <td>{.imagePrefix}</td>
                    <td ><span class="badge" style='background-color:#337ab7;'>{.numberOfImages}</span></td>
                    <td >{.exposureTime} s</td>
                    <td >{@decimal key="resolution" decimals=1}{/decimal} &#8491; ({@decimal key="resolutionAtCorner" decimals=1}{/decimal} &#8491;)</td>
                    <td > {@decimal key="wavelength" decimals=1}{/decimal} &#8491;</td>
                    <td>{@decimal key="transmission" decimals=2 intIfPossible="true" /}%</td>
                    <td>{.imageDirectory}</td>
                    <td>{.startTime}</td>
                    <td>{.runStatus}</td>
                    <td>{@gt key=hasPhasing value=0}<div class='summary_datacollection_success'></div>{/gt}</td>
                    
                </tr>
               
             {/.}    
             </table>
        </div>
    </div>
 </div>