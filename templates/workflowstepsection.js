
<div style='overflow:auto;height:190px;border:1px solid #3892d3;'>
	{#.}
		<div>
					{#.}
								
								{@eq key=status value="Success"}<div class='summary_datacollection_success'></div>{/eq}
								{@eq key=status value="Failure"}<div class='summary_datacollection_failed'></div>{/eq}
								<a class='result-autoprocessing-anchor' href='#/mx/workflow/step/{.workflowStepId}/main'><span style='line-height: 5px;' class="summary_datacollection_parameter_name">{.name}</span></a>
					{/.}
		</div>
	{/.}
</div>

