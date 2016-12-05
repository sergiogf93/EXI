<div id='{.id}' style='height:{height}px;{?enableClick}cursor:pointer;{/enableClick}'>
    {!<img src="../images/icon/testtube.png" alt="Error loading image" height="{imgH}" width="{imgW}" style="margin:{margin}px">!}
    {!<svg id='{.stockId}-svg' width="{width}" height="{height}">
        <rect id='{.stockId}-rect' class='stock-solution' x="{rectX}" y="{rectY}" ry="{rectR}"  width="{rectWidth}" height="{rectHeight}" />
        <ellipse id='{.stockId}-ellipse' class='stock-solution' cx="{mainRadius}" cy="{cy}" rx="{rx}" ry="{ry}" />
        <circle id='{.stockId}-circle' class='stock-solution' cx="{mainRadius}" cy="{mainRadius}" r="{r}"/>
        <circle id='{.id}-circle' class='stock-solution-inner' cx="{mainRadius}" cy="{mainRadius}" r="{rInner}"/>
    </svg>!}
    <div pointer-events='none' class='stock-solution' style="height:{height}px;">
        {?fillPanel}
        <b>&bull;</b> {@eq key=code value=""}
                            &nbsp;-
                        {:else}
                            {code}
                        {/eq}<br/>
        <b>&bull;</b> {macromoleculeAcronym}<br/>
        <b>&bull;</b> {buffer}
        {/fillPanel}
    </div>
</div>