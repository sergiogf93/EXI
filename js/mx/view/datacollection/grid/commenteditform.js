function CommentEditForm(args) {

}

CommentEditForm.prototype.show = function(){
    var _this = this;

    if (ExtISPyB.sites){
        if (ExtISPyB.sites.length == 1){                                         
            /** Only a single site so we can show the icon */
            this.singleSite = true;
            this.siteURL = ExtISPyB.sites[0].url;  
            this.site = ExtISPyB.sites[0];
            this.icon = ExtISPyB.sites[0].icon;                                                            
        }
    }
    
    var html = "";
    dust.render("authentication.form.template", {id : this.id, singleSite : this.singleSite, sites : ExtISPyB.sites, icon : this.icon}, function(err,out){
        html = out;
    });

    $("body").append(html);
    $("#" + this.id + "-login-button").unbind('click').click(function() {
                
	        	// var form = this.up('form').getForm();	        	
	        	// var exiUrl;
	        	// var properties = null;
                
                 if (!_this.singleSite){
                    _this.siteURL = $("#" + _this.id + "-sites").val();
                }
                
	        	for (var i = 0; i< ExtISPyB.sites.length; i++){
	        		if (ExtISPyB.sites[i].url == _this.siteURL){
	        			properties = ExtISPyB.sites[i];
	        		}	        		
	        	}
               
	        	_this.onAuthenticate.notify({
	        		user : $("#" + _this.id + "-username").val(),
	        		password : $("#" + _this.id + "-password").val(),
	        		site : _this.siteURL,
	        		exiUrl : properties.exiUrl,
	        		properties : properties
	        	});
	        });
    $("#" + this.id + "-modal").modal();
};