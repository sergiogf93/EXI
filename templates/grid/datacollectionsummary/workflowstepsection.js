
<div class="showhim">
    <div class='selected-region'  >
        
        {#.}
            <div>
                        {#.}
                                    
                                    {@eq key=status value="Success"}<div class='summary_datacollection_success'></div>{/eq}
                                    {@eq key=status value="Failure"}<div class='summary_datacollection_failed'></div>{/eq}
                                    <a class='result-autoprocessing-anchor' href='#/mx/workflow/step/{.workflowStepIds}/main'>
                                        <span class="summary_datacollection_parameter">
                                            {.name}                                
                                        </span>
                                    </a>
                        {/.}
            </div>
        {/.}
    
    </div>
    {#.[0]}  
         <a class='showme openGridButton' href='#/mx/workflow/step/{.workflowStepIds}/main'>
                    <div>
                        Open Workflows
                    </div>
         </a>
    {/.[0]}

</div>


