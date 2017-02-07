<div id='{.id}' style='height:{height}px;{?enableClick}cursor:pointer;{/enableClick}'>
    <div id='{.id}-img' pointer-events='none' class='stock-solution' style="height:{height}px;">
        {?fillPanel}
            <table class="table">
                <tr>
                    <td>
                        {nSamples} Samples
                    </td>
                </tr>
                <tr>
                    <td>{nMeasured} Measured</td>
                </tr>
            </table>
        {/fillPanel}
    </div>
</div>