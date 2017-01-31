<table class='table-sm'>
    <thead>
        <tr>
            <th>{.spaceGroup}</th>
            <th style='padding:0 15px 0 15px;'>Completeness</th>
            <th style='padding:0 15px 0 15px;'>Res.</th>
            <th>Rmerge</th>
        </tr>
        
        <tr>
            <td valign="top">Inner</td>
            <td>
                    <div class="progress">

                    {@gte key=innerShell.completeness value=50}
                        {@gte key=innerShell.completeness value=90}                            
                            <div class="progress-bar progress-bar"  role="progressbar" aria-valuenow="{.innerShell.completeness}" aria-valuemin="0" aria-valuemax="100" style="width:{.innerShell.completeness}%">{.innerShell.completeness}%</div>
                        {:else}
                            <div class="progress-bar progress-bar"  role="progressbar" aria-valuenow="{.innerShell.completeness}" aria-valuemin="0" aria-valuemax="100" style="background-color:#f0ad4e;width:{.innerShell.completeness}%">{.innerShell.completeness}%</div>
                        {/gte}
                    {:else}    
                        <div class="progress-bar progress-bar"  role="progressbar" aria-valuenow="{.innerShell.completeness}" aria-valuemin="0" aria-valuemax="100" style="background-color:#d9534f;width:{.innerShell.completeness}%">{.innerShell.completeness}%</div>
                    {/gte}


                        
                    </div>
            </td>
            <td valign="top" style='padding:0 15px 0 15px;'>{.innerShell.resolutionsLimitHigh}</td>
            <td valign="top">{.innerShell.rMerge}</td>
        </tr>
            <tr>
            <td valign="top">Outer</td>
            <td>
                    <div class="progress">

                     {@gte key=outerShell.completeness value=50}
                        {@gte key=outerShell.completeness value=90}                            
                        <div class="progress-bar progress-bar"   role="progressbar" aria-valuenow="{.outerShell.completeness}" aria-valuemin="0" aria-valuemax="100" style="width:{.outerShell.completeness}%">{.outerShell.completeness}%</div>
                        {:else}
                            <div class="progress-bar progress-bar"   role="progressbar" aria-valuenow="{.outerShell.completeness}" aria-valuemin="0" aria-valuemax="100" style="background-color:#f0ad4e;width:{.outerShell.completeness}%">{.outerShell.completeness}%</div>
                        {/gte}
                    {:else}    
                        <div class="progress-bar progress-bar"   role="progressbar" aria-valuenow="{.outerShell.completeness}" aria-valuemin="0" aria-valuemax="100" style="background-color:#d9534f;width:{.outerShell.completeness}%">{.outerShell.completeness}%</div>
                    {/gte}


                        
                    </div>
            </td>
            <td valign="top" style='padding:0 15px 0 15px;'>{.outerShell.resolutionsLimitHigh}</td>
            <td valign="top">{.outerShell.rMerge}</td>
        </tr>
        <tr>
            <td valign="top">Overall</td>
            <td>
                    <div class="progress">
                            {@gte key=overall.completeness value=50}
                                {@gte key=overall.completeness value=90}                            
                                <div class="progress-bar progress-bar"   role="progressbar" aria-valuenow="{.overall.completeness}" aria-valuemin="0" aria-valuemax="100" style="width:{.overall.completeness}%">{.overall.completeness}%</div>
                                {:else}
                                    <div class="progress-bar progress-bar"   role="progressbar" aria-valuenow="{.overall.completeness}" aria-valuemin="0" aria-valuemax="100" style="background-color:#f0ad4e;width:{.overall.completeness}%">{.overall.completeness}%</div>
                                {/gte}
                            {:else}    
                                <div class="progress-bar progress-bar"   role="progressbar" aria-valuenow="{.overall.completeness}" aria-valuemin="0" aria-valuemax="100" style="background-color:#d9534f;width:{.overall.completeness}%">{.overall.completeness}%</div>
                            {/gte}

                        
                    </div>
            </td>
            <td valign="top"  style='padding:0 15px 0 15px;'>{.overall.resolutionsLimitHigh}</td>
            <td valign="top">{.overall.rMerge}</td>
        </tr>
        
    </thead>
</table>
