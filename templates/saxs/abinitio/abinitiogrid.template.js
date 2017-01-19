<div class="container-fluid">
    <div class="row">
        <div class="col-xs-12 col-md-12">
             <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th >type</th>
                    <th >PDB</th>
                    <th >FirFile</th>
                    <th >LogFile</th>
                    <th >chiSqrt</th>
                    <th >rfactor</th>
                    <th >rg</th>
                    
                </tr>
               
                </thead>
                
                {#.}
                <tr class={.rowClass}>
                   <td>{.type}</td>
                   <td>{.pdbFile}</td>
                   <td>{.firFile}</td>
                   <td>{.logFile}</td>
                   <td>{@decimal key="chiSqrt" decimals=3 /}  </td>
                   <td>{@decimal key="rfactor" decimals=3 /} </td>
                  <td>{@decimal key="rg" decimals=3 /} </td>
                </tr>
                {/.}
            </table>
        </div>
    </div>
</div>