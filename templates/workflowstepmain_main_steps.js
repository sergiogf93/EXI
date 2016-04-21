

   
    
    {@eq key=type value="image"}
	    <div align="center">
            <img height="200" width="200" src="data:image/png;base64,{.value}" />
            <br />
            <span class='summary_datacollection_parameter'>{.title}</span>
        </div>			
	{/eq}
    
    {@eq key=type value="title"}
	    <div align="center">
            <h1 >{.value}</h1>
        </div>			
	{/eq}
    
    {@eq key=type value="table"}
        <table style='border:1px solid gray;'>
            	
	        <tr>
                {#columns}
                    <th style='border: 1px solid black;'>{.}</th>
                {/columns}
            </tr>	
           
                {#data}
                    <tr>
                        {#.}
                            <td style='border: 1px solid black;'>{.}</td>
                        {/.}
                    </tr> 
                {/data}
         </table>                                   		
	{/eq}  
     
    
    	

	

