<div style='margin-right: 200px;'>
	<div style='float: left;width: 150px;'>
	
		{.v_datacollection_summary_phasing_processingPrograms}
		<br />
			<span style='margin-left:20px;'>{.v_datacollection_summary_phasing_autoproc_space_group}</span>
		<br />
		
		<span style='margin-left:20px;'>
			{@eq key=anomalous value="yes"}
			  	Anomalous
			{:else}
				Non Anomalous
			{/eq}
		</span>
		  
	</div>

	<div style='float: right;width: 150px;margin-right: -120px;'>
		<table>
		<tr>
			<td class='summary_datacollection_parameter_name'>a b c</td>
			<td class='summary_datacollection_parameter'>{.v_datacollection_summary_phasing_cell_a},{.v_datacollection_summary_phasing_cell_b},{.v_datacollection_summary_phasing_cell_c}</td>
		</tr>
		<tr>
			<td class='summary_datacollection_parameter_name'>α β γ</td>
			<td class='summary_datacollection_parameter'>{.v_datacollection_summary_phasing_cell_alpha},{.v_datacollection_summary_phasing_cell_beta},{.v_datacollection_summary_phasing_cell_gamma}</td>
		</tr>
		
		</table>
	</div>

</div>