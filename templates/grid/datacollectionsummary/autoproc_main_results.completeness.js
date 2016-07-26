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
                        <div class="progress-bar progress-bar"  role="progressbar" aria-valuenow="{.innerShell.completeness}" aria-valuemin="0" aria-valuemax="100" style="width:{.innerShell.completeness}%">
                        
                        {.innerShell.completeness}%
                        </div>
                    </div>
            </td>
            <td valign="top" style='padding:0 15px 0 15px;'>{.innerShell.resolutionsLimitHigh}</td>
            <td valign="top">{.innerShell.rMerge}</td>
        </tr>
            <tr>
            <td valign="top">Outer</td>
            <td>
                    <div class="progress">
                        <div class="progress-bar progress-bar"   role="progressbar" aria-valuenow="{.outerShell.completeness}" aria-valuemin="0" aria-valuemax="100" style="width:{.outerShell.completeness}%">
                        {.outerShell.completeness}%
                        </div>
                    </div>
            </td>
            <td valign="top" style='padding:0 15px 0 15px;'>{.outerShell.resolutionsLimitHigh}</td>
            <td valign="top">{.outerShell.rMerge}</td>
        </tr>
        <tr>
            <td valign="top">Overall</td>
            <td>
                    <div class="progress">
                        <div class="progress-bar progress-bar"   role="progressbar" aria-valuenow="{.overall.completeness}" aria-valuemin="0" aria-valuemax="100" style="width:{.overall.completeness}%">
                        {.overall.completeness}%
                        </div>
                    </div>
            </td>
            <td valign="top"  style='padding:0 15px 0 15px;'>{.overall.resolutionsLimitHigh}</td>
            <td valign="top">{.overall.rMerge}</td>
        </tr>
        
    </thead>
</table>