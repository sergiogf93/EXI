<div class="container-fluid">
    <div class="row">
        <div class="col-md-1 border-right-columns" style="height:{height}px;text-align:center;background-color:#ddd;">
            <span style="line-height:{height}px; font-size: 20px;">#{dewar.index}</span>
        </div>
        <div class="col-md-2" style="height:{height}px;">
            <table class="table valign-middle-rows" style="height:{height}px;">
                <tr>
                    <td >Code: </td>
                    <td class="column_parameter_value">{dewar.code}</td>
                </tr>
                <tr valign="middle">
                    <td>Status: </td>
                    <td class="column_parameter_value">{dewar.dewarStatus}</td>
                </tr>
                <tr valign="middle">
                    <td>Storage: </td>
                    <td class="column_parameter_value">{dewar.storageLocation}</td>
                </tr>
                <tr valign="middle">
                    <td>Comments: </td>
                    <td class="column_parameter_value">{dewar.comments}</td>
                </tr>              
            </table>
        </div>
        <div id="{id}-container-panel-div" class="col-md-8">
        </div>
        <div class="col-md-1" style="background-color:#ddd;">
        </div>
    </div>
</div>