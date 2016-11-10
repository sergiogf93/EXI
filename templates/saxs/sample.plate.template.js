<svg id="{id}-svg"  height="{formatter.height}" width="{formatter.width}">
    <rect x="0" y="0" width="{formatter.width}" height="{formatter.height}" fill="{formatter.backgroundColor}"/>
    {#nodes}
        <circle id="{id}-node-{.row}-{.column}" cx="{.x}" cy="{.y}" r="{.radius}" fill="{formatter.fill}" stroke="{formatter.stroke}" stroke-width="{formatter.stroke-width}"></circle>
    {/nodes}
</svg>