<div id="{id}-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      {!<div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>!}
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="message-text" class="form-control-label">Comments:</label>
            <textarea id="{id}-comments" class="form-control" id="message-text" rows="5">{comments}</textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button id="{id}-close" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <span id="{id}-tooltip" data-toggle="tooltip" data-placement="bottom" title="Will be implemented soon" style="margin:10px">
          <button id="{id}-save" type="button" class="btn btn-primary" data-dismiss="modal" style="pointer-events: none;" disabled>Save</button>
        </span>
      </div>
    </div>
  </div>
</div>