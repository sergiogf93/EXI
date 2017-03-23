



<table class='table-sm table table-striped'>
    <thead>   
    <tr>
        <th  style='padding:0 15px 0 15px;'>{.spaceGroup}</th>
        <th style='padding:0 15px 0 15px;'>Completeness</th>
        <th style='padding:0 15px 0 15px;'>Res.</th>
        <th style='padding:0 15px 0 15px;'>Rmerge</th>                    
    </tr>
    </thead>
    <tbody>

    <tr>
    <td  style='padding:0 15px 0 15px;'>Overall</td>
    <td  style='padding:0 15px 0 15px;'>
        {@gte key=overall.completeness value=50}
            {@gte key=overall.completeness value=90}
                <div  style="background-repeat: repeat-x;border:1px solid gray;color:#fff;background-image:linear-gradient(to bottom,#337ab7 0,#286090 100%);width:{.overall.completeness}%">{.overall.completeness}%</div>
            {:else}
                <div  style="background-repeat: repeat-x;border:1px solid #f0ad4e;color:#fff;background-color:#f0ad4e;width:{.overall.completeness}%">{.overall.completeness}%</div>
            {/gte}
         
         {:else}
            <div  style="background-repeat: repeat-x;border:1px solid #d9534f;color:#000;background-color:#d9534f;width:{.overall.completeness}%">{.overall.completeness}%</div>                            
         {/gte}
    </td>
    <td style='padding:0 15px 0 15px;'>{.overall.resolutionsLimitLow}-{.overall.resolutionsLimitHigh}</td>
    <td style='padding:0 15px 0 15px;'>{.overall.rMerge}</td>
    </tr>

    <tr>
        <td  style='padding:0 15px 0 15px;'>Inner</td>
        <td  style='padding:0 15px 0 15px;'>
                {@gte key=innerShell.completeness value=50}
                    {@gte key=innerShell.completeness value=90}
                        <div  style="background-repeat: repeat-x;border:1px solid gray;color:#fff;background-image:linear-gradient(to bottom,#337ab7 0,#286090 100%);width:{.innerShell.completeness}%">{.innerShell.completeness}%</div>
                    {:else}
                        <div  style="background-repeat: repeat-x;border:1px solid #f0ad4e;color:#fff;background-color:#f0ad4e;width:{.innerShell.completeness}%">{.innerShell.completeness}%</div>
                    {/gte}               
                {:else}
                    <div  style="background-repeat: repeat-x;border:1px solid #d9534f;color:#000;background-color:#d9534f;width:{.innerShell.completeness}%">{.innerShell.completeness}%</div>
                
                {/gte}
        </td>
        <td style='padding:0 15px 0 15px;'>{.innerShell.resolutionsLimitLow}-{.innerShell.resolutionsLimitHigh}</td>
        <td style='padding:0 15px 0 15px;'>{.innerShell.rMerge}</td>
    </tr>

    <tr>
        <td  style='padding:0 15px 0 15px;'>Outer</td>
        <td  style='padding:0 15px 0 15px;'>  
            {@gte key=outerShell.completeness value=50}
                {@gte key=outerShell.completeness value=90}
                    <div  style="background-repeat: repeat-x;border:1px solid gray;color:#fff;background-image:linear-gradient(to bottom,#337ab7 0,#286090 100%);width:{.outerShell.completeness}%">{.outerShell.completeness}%</div>
                {:else}
                    <div  style="background-repeat: repeat-x;border:1px solid #f0ad4e;color:#fff;background-color:#f0ad4e;width:{.outerShell.completeness}%">{.outerShell.completeness}%</div>
                {/gte}
            {:else}    
                <div  style="background-repeat: repeat-x;border:1px solid #d9534f;color:#000;background-color:#d9534f;width:{.outerShell.completeness}%">{.outerShell.completeness}%</div>
            {/gte}
            
        </td>
        <td style='padding:0 15px 0 15px;'>{.outerShell.resolutionsLimitLow}-{.outerShell.resolutionsLimitHigh}</td>
        <td style='padding:0 15px 0 15px;'>{.outerShell.rMerge}</td>
    </tr>
    
        </tbody>
</table>
