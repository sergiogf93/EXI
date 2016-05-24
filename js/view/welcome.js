/*Ext.application({
	name : 'Biosaxs Logger',
	launch : function() {
		Ext.create('Ext.container.Viewport', {
			layout : 'border',
			items : [ {
				region : 'north',
				xtype : 'component',
				padding : 10,
				height : 50,
				html : '<img class="titleImage" src="images/logo_EMBL.png"><span class="title">ExiSAXS</span>',
				cls : 'titlePanel'

			}, {
				region : 'north',
				cls : 'toolbarPanel',
				xtype : 'toolbar',
				width : 400,
				buttonAlign : 'center',
				items : [
				         '->',
				         {
				        	 xtype : 'button',
				        	 text: 'log in',
				        	 icon : "images/rsz_login.png",
				        	 handler: function() {
				        		 new AuthenticationForm().show();
				        		 
				        	 }
				         }
				         
				         ] }, 
				
				
				{
				region : 'center',
				xtype : 'container',
				layout : {
					type : 'vbox',
					align : 'center',
					pack : 'center' },
				items : [

				] }, {
				region : 'south',
				xtype : 'component',
				height : 50,
				layout : {
					type : 'vbox',
					align : 'center' },
				width : "100%",
				html : '<span class="browsers">Web optimized for modern browsers. Versions, bla, bla...</span>',
				cls : 'bottom'

			}

			] });
	} });*/
