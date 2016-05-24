
<div class="showhim">
    <div class='selected-region' style='height:180px;' >
        
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
        <div class="showme" style='color:white;margin-top:20px;border-radius: 5px;text-align:center;height:20px;background-color:#3892d3;'>
            <a style='color:white;text-decoration: none;' href='#/mx/workflow/step/{.workflowStepIds}/main'>Open Workflows</a>
        </div>
    {/.[0]}

</div>


