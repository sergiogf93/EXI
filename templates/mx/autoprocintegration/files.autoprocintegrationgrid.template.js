 <div class="container-fluid">
    <div class="row">
        <div class="col-xs-12 col-md-2">        
            <table class="table">
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Path</th>
                             
                </tr>
                </thead>
                
            {#.}
                <tr>
                    <td><a href='{.url}'>{.fileName}</a></td> 
                    <td>{.fileType}</td> 
                    <td>{.filePath}</td>
                                                                               
                </tr>
               
             {/.}    
             </table>
        </div>
    </div>
 </div>