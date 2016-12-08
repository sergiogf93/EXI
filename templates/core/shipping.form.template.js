<div style="padding:10px;">
    <div class="form-group row" style="margin:0px">
        <div class="col-md-8" style="padding:0px">
            <div class="col-md-7" style="padding:0px">
                <label class="col-md-1 col-form-label" style="font-weight:100;">Name:</label>
                <label class="col-md-3 ">{shipment.shippingName}</label>
                
                <label class="col-md-1 col-form-label" style="font-weight:100;">Beamline: </label>
                <label class="col-md-3 col-form-label" >{.beamlineName}</label>
                
                <label class="col-md-1 col-form-label" style="font-weight:100;">Date:</label>
                <label class="col-md-1 col-form-label">{.startDate}</label>
            </div>
            <div class="col-md-5" style="padding:0px">
                <label class="col-md-2 col-form-label" style="font-weight:100;">Comments:</label>
                <textarea  class="col-md-10" style="border: none" rows="3">{shipment.comments}</textarea >
            </div>
        </div>

        <div class="col-md-4">
            <div class="col-md-10" style="padding:0px">
                <div class="form-group row" style="margin:5px">
                    <label class="col-md-3 col-form-label" style="font-weight:100;">To:</label>
                    <label class="col-md-9 col-form-label">{shipment.sendingLabContactVO.cardName}</label>
                </div>
                <div class="form-group row" style="margin:5px">
                    <label class="col-md-3 col-form-label" style="font-weight:100;">From:</label>
                    <label class="col-md-9 col-form-label">{shipment.returnLabContactVO.cardName}</label>
                </div>
            </div>

            <div class="form-group col-md-2" style="margin:0px">
                <button id="{id}-edit-button" class="btn btn-primary btn-lg" style="margin-right:10px;height:50px;">Edit</button>
            </div>
        </div>
    </div>
</div>