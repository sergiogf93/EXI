<div style="padding:20px;">
    <div class="form-group row">
        <label class="col-md-2 col-form-label">Name:</label>
        <div class="col-md-10">
            <input id="{id}-name" class="form-control" type="text">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-2 col-form-label">Beamline:</label>
        <div class="col-md-10">
            <input id="{id}-beamline" class="form-control" type="text">
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
            <textarea id="{id}-comments" class="form-control" rows="3"></textarea>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-2 col-form-label">To:</label>
        <div class="col-md-10">
            <select id="{id}-to" class="form-control">
                {#to}
                <option>{.cardName}</option>
                {/to}
            </select>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-2 col-form-label">From:</label>
        <div class="col-md-10">
            <select id="{id}-from" class="form-control">
                {#from}
                <option>{.cardName}</option>
                {/from}
            </select>
        </div>
    </div>
</div>