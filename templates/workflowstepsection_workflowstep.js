<table>
{#.}
<tr>
	<td>
		{@eq key=status value="Success"}<div class='summary_datacollection_success'></div>{/eq}
		{@eq key=status value="Failure"}<div class='summary_datacollection_failed'></div>{/eq}
	</td>
	<td>
		{.count}x {.step}
	</td>
</tr>
{/.}
</table>