


   <table class='table-sm table table-striped'>
                <thead>   
                <tr>
                  	<th>Data Range</th>
                    <th>Resolution</th>
                    <th>Multiplicity</th>
                    <th>Completeness</th>
                    <th>I/Sigmal</th>
                    <th>Rmeas</th>
                    <th>Rmerge</th>
                    <th>Rpim</th>
                    <th>cc(1/2)</th>
                    
                </tr>
                </thead>
            
         </table>
         
         {!
<table class='table-sm table table-striped'>
<thead>
    <tr>
	<th>Data Range</th>
	<th>Resolution</th>
	<th>Multiplicity</th>
	<th>Completeness</th>
    <th>I/Sigmal</th>
    <th>Rmeas</th>
    <th>Rmerge</th>
    <th>Rpim</th>
    <th>cc(1/2)</th>
     </tr>
</thead>
<tbody>
{#.}
	<tr>
			<td>
				{.type}
			</td>
			<td >
                {@decimal key="resolutionLimitLow" decimals=1}{/decimal} - {@decimal key="resolutionLimitHigh" decimals=1}{/decimal}
			</td>
			<td >
				
                {@decimal key="multiplicity" decimals=1}{/decimal}
			</td>
			<td > 
                
                <div style="width:100%;height:10px;position:relative;background-color:#BDBDBD;">
                    <div style="background-color:#298A08;height:100%;position:absolute;line-height:inherit;width:{.completeness}%;"></div>
                </div> 
           
				
			</td>
            <td > 
                {@decimal key="meanIOverSigI" decimals=1}{/decimal}
				
			</td>
            <td > 
				{@decimal key="rMeasAllIPlusIMinus" decimals=1}{/decimal}
			</td>
            <td > 
                {@decimal key="rMerge" decimals=1}{/decimal}
				
			</td>
             <td > 
                {@decimal key="rPimWithinIPlusIMinus" decimals=1}{/decimal}
				
			</td>
             <td > 
                {@decimal key="ccHalf" decimals=1}{/decimal}
				
			</td>
			
	</tr>	
{/.}
<tbody>
</table>!}