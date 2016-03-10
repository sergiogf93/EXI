{#.}
	<div>
				{#.}
						
						
						{@eq key=name value="Mesh"}
								<table>
									<tr>
										<td>
											{@eq key=status value="Success"}<div class='summary_datacollection_success'></div>{/eq}
											{@eq key=status value="Failure"}<div class='summary_datacollection_failed'></div>{/eq}
											{.name}
										</td>
									</tr>
								</table>
							
						{/eq}
						{@ne key=name value="Mesh"}
							{@eq key=status value="Success"}<div class='summary_datacollection_success'></div>{/eq}
							{@eq key=status value="Failure"}<div class='summary_datacollection_failed'></div>{/eq}
							{.name}
						{/ne}
				{/.}
	</div>
{/.}

