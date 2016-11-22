<div style="padding:10px;">
    <div class="form-group row" style="margin:0px">
        <div class="col-md-8" style="padding:0px">
            <div class="col-md-7" style="padding:0px">
                <label class="col-md-1 col-form-label">Name:</label>
                <div class="col-md-3">
                    <input class="form-control" type="text" value="{shipment.shippingName}" readonly>
                </div>
                
                <label class="col-md-1 col-form-label" >Beamline: </label>
                <div class="col-md-3">
                    <input class="form-control" type="text" value="{.beamlineName}" readonly>
                </div>
                
                <label class="col-md-1 col-form-label">Date:</label>
                <div class="col-md-3">
                    <input class="form-control" type="text"  readonly>
                </div>
            </div>
            <div class="col-md-5" style="padding:0px">
                <label class="col-md-2 col-form-label">Comments:</label>
                <div class="col-md-10">
                    <textarea class="form-control" rows="3" readonly>{shipment.comments}</textarea>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="col-md-10" style="padding:0px">
                <div class="form-group row" style="margin:5px">
                    <label class="col-md-3 col-form-label">To:</label>
                    <div class="col-md-9">
                        <select class="form-control"  readonly>
                            {#to}
                            <option {@eq key="{.cardName}" value="{shipment.sendingLabContactVO.cardName}"}selected{/eq}>{.cardName}</option>
                            {/to}
                        </select>
                    </div>
                </div>
                <div class="form-group row" style="margin:5px">
                    <label class="col-md-3 col-form-label">From:</label>
                    <div class="col-md-9">
                        <select class="form-control"  readonly>
                            {#from}
                            <option {@eq key="{.cardName}" value="{shipment.returnLabContactVO.cardName}"}selected{/eq}>{.cardName}</option>
                            {/from}
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-group col-md-2" style="margin:0px">
                <button id="{id}-edit-button" class="btn btn-primary btn-lg" style="margin-right:10px;height:80px;">Edit</button>
            </div>
        </div>
    </div>
</div>