

   
     {@eq key=type value="images"}
        <table align="center">
            <tr>
                {#items}
                        <td>
                            <img height="{.ysize}" width="{.xsize}" src="data:image/png;base64,{.value}" />
                            <br />
                            <span class='summary_datacollection_parameter'>{.title}</span>
                        </td>
                    </div>	
                {/items}
            </tr>	
        </table>	
	{/eq}
    
    {@eq key=type value="image"}
	    <div align="center">
            <img height="200" width="200" src="data:image/png;base64,{.value}" />
            <br />
            <span class='summary_datacollection_parameter'>{.title}</span>
        </div>			
	{/eq}
    
    
     
    {@eq key=type value="logFile"}
      
        
	    <div  style='border:1px solid gray;background-color:#FAFAFA;margin:10px;'>
            <span  style='color: #157fcc;font-size: 17px;   font-weight: 300;'>{.title}</span>
            <textarea style='margin:10px;' rows="10" cols="150">
                {.logText} 
            </textarea>
        </div>			
	{/eq}
    
    
    
    {@eq key=type value="title"}
	    <div>
            <h1 >{.value}</h1>
        </div>			
	{/eq}
    
    {@eq key=type value="info"}
	    <span style="display: inline; padding: .2em .6em .3em .6em;border-radius: .25em;color: #5bc0de; background-color: white;">
           {.value}
        </span>			
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
     
    
    	

	

