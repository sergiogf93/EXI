<div class="container-fluid">
    <div class="row">
        <div class="col-md-1" style="height:{height}px;">
            <div>
                #{dewar.index}
            </div>
        </div>
        <div class="col-md-2" style="height:{height}px;">
            <table class="table">
                <tbody>
                    <tr>
                        <td>Code: </td>
                        <td class="column_parameter_value">{dewar.code}</td>
                    </tr>
                    <tr>
                        <td>Status: </td>
                        <td class="column_parameter_value">{dewar.dewarStatus}</td>
                    </tr>
                    <tr>
                        <td>Storage: </td>
                        <td class="column_parameter_value">{dewar.storageLocation}</td>
                    </tr>
                    <tr>
                        <td>Comments: </td>
                        <td class="column_parameter_value">{dewar.comments}</td>
                    </tr>
                </tbody>                
            </table>
        </div>
        <div class="col-md-6">
        </div>
        <div class="col-md-3">
        </div>
    </div>
</div>