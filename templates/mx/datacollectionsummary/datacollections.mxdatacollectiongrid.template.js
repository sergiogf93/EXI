 <div class="container-fluid">
    <div class="row">
        <div class="col-xs-12 col-md-2">        
            <table class="table">
              <thead>
                <tr>
                    <th>#</th>
                    <th>Images</th>
                    <th>ExposureTime</th>
                    <th>Res. (corner)</th>
                    <th>Wavelenth</th>
                    <th>Transmission</th>
                    <th>Prefix</th>
                    <th>Directory</th>
                    <th>Time</th>
                    <th>Run status</th>
                </tr>
                </thead>
                
            {#.}
                <tr>
                    <td>{.dataCollectionNumber}</td>
                    <td>{.numberOfImages}</td>
                    <td>{.exposureTime} s</td>
                    <td>{.resolution}&#8491; ({.resolutionAtCorner}&#8491;)</td>
                    <td>{.wavelength} &#8491;</td>
                    <td>{.transmission}%</td>
                    <td>{.imagePrefix}</td>
                    <td>{.imageDirectory}</td>
                    <td>{.startTime}</td>
                    <td>{.runStatus}</td>
                    
                </tr>
               
             {/.}    
             </table>
        </div>
    </div>
 </div>