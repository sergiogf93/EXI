{#.}

			{@eq key=selected value="yes"}
				<div class='workflow_step_main_summary_item_selected' onclick="location.href='#/mx/workflow/step/{.workflowStepIds}/{.workflowStepId}/main'" >
			{/eq}
			{@ne key=selected value="yes"}
				<div class='workflow_step_main_summary_item' onclick="location.href='#/mx/workflow/step/{.workflowStepIds}/{.workflowStepId}/main'" >
			{/ne}	
				
					
					<table>
						<tr>
							<td>
								<img src="{.imageURL}" style='border:1px solid #3892d3;' alt="{.workflowStepType}" height="100" width="100">
							</td>
							<td>
								<table>
									<tr>
										<td class='summary_datacollection_parameter_name'>Type</td>
										<td class='summary_datacollection_parameter'>{.workflowStepType}</td>
									</tr>
									<tr>
										<td class='summary_datacollection_parameter_name'>Status</td>
										<td class='summary_datacollection_parameter'>
											{@eq key=status value="Success"}<div class='summary_datacollection_success'></div>{/eq}
											{@eq key=status value="Failure"}<div class='summary_datacollection_failed'></div>{/eq}
											{.status}
										</td>
									</tr>
									<tr>
									</tr>
								</table>
							</td>
							
						</tr>
					</table>
					
				</div>
			
{/.}	

