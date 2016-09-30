 <div class="container-fluid" style='height:300px;overflow-y: auto;width:100%; overflow-x: hidden;'>
    <div class="row">
        <div class="col-xs-12 col-md-2" >        
            <table class="table"  >
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Path</th>
                             
                </tr>
                </thead>
                
            {#.}
                <tbody>
                    <tr>
                        <td><a href='{.url}'>{.fileName}</a></td> 
                        <td>{.fileType}</td> 
                        <td>{.filePath}</td>
                                                                                
                    </tr>
                </tbody>
               
             {/.}    
             </table>
        </div>
    </div>
 </div>