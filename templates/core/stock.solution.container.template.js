<div id='{.id}' style='height:{height}px;{?enableClick}cursor:pointer;{/enableClick}'>
    <div class='container-fluid'>
        <div class="row">
            <div class="col-md-12" >{.code}</div>
        </div>
        <div class="row">
            <div class="col-md-12" >{.macromoleculeAcronym}</div>
        </div>
        <div class="row">
            <div class="col-md-12" >{.buffer}</div>
        </div>
    </div>
    {!<table class='table valign-middle-rows small-padding-rows' style='margin:0px;font-size: 9px;'>
        <tbody>
            <tr>
                <td  style='padding:0 15px 0 15px;'>Code</td>
                <td  style='padding:0 15px 0 15px;' class='column_parameter_value'>{.code}</td>
            </tr>
            <tr>
                <td  style='padding:0 15px 0 15px;'>M.</td>
                <td  style='padding:0 15px 0 15px;' class='column_parameter_value'>{.macromoleculeAcronym}</td>
            </tr>
            <tr>
                <td  style='padding:0 15px 0 15px;'>Buffer</td>
                <td  style='padding:0 15px 0 15px;' class='column_parameter_value'>{.buffer}</td>
            </tr>
        </tbody> 
    </table>!}
</div>