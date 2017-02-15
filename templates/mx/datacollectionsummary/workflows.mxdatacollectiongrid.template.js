
<div class="container-fluid containerWithScroll">
   <div class="row">
      <div class="col-xs-12 col-md-2">
         <table class="table table-striped table-hover">
            <thead>
               <tr>
                  {#items}
                        <th> <a href="#/mx/workflow/steps/{.workflowStepIds}/step/{.workflowStepId}/main" target='_blank'>{.name}</a></th>                 
                   {/items}
                  
               </tr>
            </thead>
            <tr> 
                {#items}
               <td  ><a href="#/mx/workflow/steps/{.workflowStepIds}/step/{.workflowStepId}/main" target='_blank' ><img style='height:150px;width:150px;' src='{.img}' /></a></td>
             
              
                {/items}
            </tr>
            
            </tr>
               <tr>
                {#items}
               <td  >{.status}</td>
             
                {/items}
            </tr>
            
            
            
         </table>
       
      </div>
   </div>
   <div class="container-fluid" style="padding-bottom: 10px;">
        <div class="col-xs-12 col-md-12">
            <a class="btn btn-xs">
                <span id="{.dataCollectionGroupId}-edit-comments" class="glyphicon glyphicon-edit dataCollection-edit"></span>
            </a>
            {?comments}
                        Comments: <b><span id="comments_{dataCollectionGroupId}">{comments}</span></b>
            {/comments}
        </div>
    </div>
</div>

