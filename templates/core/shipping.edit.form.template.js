<div style="padding:20px;">
    <div class="form-group row">
        <label class="col-md-2 col-form-label">Name:</label>
        <div class="col-md-10">
            <input id="{id}-name" class="form-control" type="text" value="{shipment.shippingName}">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-2 col-form-label">Beamline:</label>
        <div class="col-md-10">
            <input id="{id}-beamline" class="form-control" type="text" value="{.beamlineName}">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-2 col-form-label">Date:</label>
        <div class="col-md-10">
            <input id="{id}-date" class="form-control" type="text">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-2 col-form-label">Comments:</label>
        <div class="col-md-10">
            <textarea id="{id}-comments" class="form-control" rows="3">{shipment.comments}</textarea>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-2 col-form-label">To:</label>
        <div class="col-md-10">
            <select id="{id}-to" class="form-control">
                {#to}
                <option {@eq key="{.cardName}" value="{shipment.sendingLabContactVO.cardName}"}selected{/eq}>{.cardName}</option>
                {/to}
            </select>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-2 col-form-label">From:</label>
        <div class="col-md-10">
            <select id="{id}-from" class="form-control">
                {#from}
                <option {@eq key="{.cardName}" value="{shipment.returnLabContactVO.cardName}"}selected{/eq}>{.cardName}</option>
                {/from}
            </select>
        </div>
    </div>
</div>