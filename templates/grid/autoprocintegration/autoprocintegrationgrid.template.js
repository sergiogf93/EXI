<div class="container-fluid">
   <div class="panel with-nav-tabs panel-default">
      <div class="panel-heading clearfix">
         <div class="pull-left">                                
                <h1 class="panel-title" style='color:#337ab7;'>
                    <kbd> {.v_datacollection_processingPrograms}</kbd>
                    <kbd style='background-color:#337ab7;'>{.v_datacollection_summary_phasing_autoproc_space_group}</kbd>
                    {@eq key=v_datacollection_summary_phasing_anomalous value=true type="boolean"}                
                                <kbd style='background-color:orange;'>ANOMALOUS</kbd>              
                    {/eq}
                </h1>
                                      
                
         </div>
         <div class="pull-right">
            <ul class="nav nav-tabs">
               <li class="active"><a data-toggle="tab" href="#datacollection_{DataCollection_dataCollectionId}"> Summary </a></li>
            </ul>
         </div>
      </div>
      <br />
      <div class="tab-content">
         <div id="datacollection_{DataCollection_dataCollectionId}" class="tab-pane fade in active">
            <div class="container-fluid">
               <div class="row">
                  <div class="col-xs-6 col-md-2">
                     <br />
                     {>"unitcell.autoprocintegrationgrid.template"  /}                             
                  </div>
                  <div class="col-xs-6 col-md-7">
                     <br />
                     {>"statistics.autoprocintegrationgrid.template"  /}                         
                  </div>
                   <div class="col-xs-6 col-md-1">
                     {>"phasing.autoprocintegrationgrid.template"  /}                         
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>