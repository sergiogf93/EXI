{#.}
	<div>
				{#.}
						
						
						{@eq key=name value="Mesh"}
								<table>
									<tr>
										<td>
											{@eq key=status value="Success"}<div class='summary_datacollection_success'></div>{/eq}
											{@eq key=status value="Failure"}<div class='summary_datacollection_failed'></div>{/eq}
										</td>
										<td>
											{.name}
										</td>
										<td>
											<img src={.img} height="150" width="150"/>
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

