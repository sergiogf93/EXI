<div class="container-fluid" style="padding-left: 0px;padding-right: 0px;">
    <div class="panel with-nav-tabs panel-default" style="margin-bottom: 0px;">
        <div class="panel-heading clearfix">
            <div class="pull-right">
                <ul class="nav nav-tabs" id="myTabs">
                    <li class="active"><a data-toggle="tab" href="#{id}-shipping-information">Information</a></li>
                    <li><a data-toggle="tab" href="##{id}-shipping-transport-history">Transport history</a></li>            
                </ul>
            </div>
        </div>
        <div class="tab-content">
            <div id="{id}-shipping-information" class="tab-pane fade in active" style="padding:10px;">
                {>"shipping.form.information.template"  /}  
            </div>
            <div id="{id}-shipping-transport-history" class="tab-pane fade" style="padding:10px;">
                {>"shipping.form.tracking.template" /}
            </div>
        </div>
    </div>
</div>