<div id='{.id}' style='height:{height}px;{?enableClick}cursor:pointer;{/enableClick}'>
    <div id='{.id}-img' pointer-events='none' class='stock-solution' style="height:{height}px;">
        {?fillPanel}
            <table class="table">
                <tr>
                    <td>
                        {@eq key=code value=""}
                            &nbsp;-
                        {:else}
                            {code}
                        {/eq}
                    </td>
                </tr>
                <tr>
                    <td>{macromoleculeAcronym}</td>
                </tr>
                <tr>
                    <td>{buffer}</td>
                </tr>
            </table>
        {/fillPanel}
    </div>
</div>