Ext.application({
    name: 'Biosaxs Logger',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',

            items: [{
                region: 'north',
                xtype: 'component',
                padding: 10,
                height: 75,
                html: '<img class="titleImage" src="images/logo_EMBL.png"><span class="title">ExiSAXS</span><span class="subtitle">Extended ISPyB for SAXS</span>',
                xtype: 'component',
                cls: 'titlePanel'


            }, {
                region: 'north',
                cls: 'toolbarPanel',
                xtype: 'toolbar',
                width: 400,
                buttonAlign: 'center',
                items: [{
                        xtype: 'splitbutton',
                        text: 'Data Explorer',
			margin : '0 0 0 ' + (Ext.getBody().getWidth()/3),
			width : 200,
                        handler: function() {
                            alert("The button was clicked");
                        },
                        menu: new Ext.menu.Menu({
                            items: [
                                {
                                    text: '<span class="menuCategoryItem">ISPyB</span>'
                                },
                                {
                                    text: 'Sessions',
                                    handler: function() {
                                        alert("Item 1 clicked");
                                    }
                                }, {
                                    text: 'Macromolecules',
                                    handler: function() {
                                        alert("Item 2 clicked");
                                    }
                                },
				{
                                    text: 'Experiments',
                                    handler: function() {
                                        alert("Item 2 clicked");
                                    }
                                }
                            ]
                        })

                    }, {
                        xtype: 'tbspacer'
                    }, {
                        xtype: 'splitbutton',
                        text: 'Data Reduction Tools',
			width : 200,
                        handler: function() {
                            alert("The button was clicked");
                        },
                        menu: new Ext.menu.Menu({
                            items: [

		 		{
                                    text: '<span class="menuCategoryItem">SEC</span>'
                                },

                                {
                                    text: 'Background Test',
                                    handler: function() {
                                        alert("Item 1 clicked");
                                    }
                                }, {
                                    text: 'Baseline Checker',
                                    handler: function() {
                                        alert("Item 1 clicked");
                                    }
                                }, {
                                    text: 'Frame Merge',
                                    handler: function() {
                                        alert("Item 1 clicked");
                                    }
                                },
		

				'-', 
				{
                                    text: '<span class="menuCategoryItem">INDIVIDUAL CONCENTRATION</span>'
                                },

                                {
                                    text: 'Subtraction',
                                    handler: function() {
                                        alert("Item 1 clicked");
                                    }
                                }, {
                                    text: 'Average',
                                    handler: function() {
                                        alert("Item 1 clicked");
                                    }
                                },

				'-', 
				{
                                    text: '<span class="menuCategoryItem">Combining</span>'
                                },

                                {
                                    text: 'Idealizied Curve "merging"',
                                    handler: function() {
                                        alert("Item 1 clicked");
                                    }
                                }
                            ]
                        })

                    },  {
                        xtype: 'splitbutton',
                        text: 'Analysis',	
			width : 200,	
                        handler: function() {
                            alert("The button was clicked");
                        },
                        menu: new Ext.menu.Menu({
                            items: [
                                // these will render as dropdown menu items when the arrow is clicked:
                               {
                                    text: '<span class="menuCategoryItem">Online Data Analysis</span>'
                                },
                                 {
                                    text: 'Abinitio Modeling',
                                    handler: function() {
                                        alert("Item 1 clicked");
                                    }
                                }, {
                                    text: 'Rambo and Tainer mass estimation',
                                    handler: function() {
                                        alert("Item 1 clicked");
                                    }
                                },
 				{
                                    text: '<span class="menuCategoryItem">Apriori</span>'
                                },
                                 {
                                    text: 'Crysol',
                                    handler: function() {
                                        alert("Item 1 clicked");
                                    }
                                }, {
                                    text: 'PepsiSAXS',
                                    handler: function() {
                                        alert("Item 1 clicked");
                                    }
                                }, {
                                    text: 'SASRef',
                                    handler: function() {
                                        alert("Item 1 clicked");
                                    }
                                }
                            ]
                        })

                    },
                    '->', {
                        xtype: 'textfield',
                        name: 'field1',
                        emptyText: 'enter search term'
                    }
                ]


            }, {
                xtype: 'panel',
                title: 'Navigation',
                region: 'west',
                //html: '<ul><li>This area...</li></ul>',
                width: 250,
                split: true,
                collapsible: true,
                /*tbar: [{
                    text: 'Button',
                    handler: 'onClickButton'
                }]*/
            }, {
                region: 'center',
                xtype: 'tabpanel',
                items: [
		/*{
                    title: 'Tab 1',
                    bodyPadding: 20,
                    //html: '<h2>Content...</h2>'
                }, {
                    title: 'The Data',
                    layout: 'fit',
                    items: [{
                        xtype: 'grid',
                        title: 'Simpsons',
                        store: {
                            fields: ['name', 'email', 'phone'],
                            data: [{
                                name: 'Lisa',
                                email: "lisa@simpsons.com",
                                phone: "555-111-1224"
                            }, {
                                name: 'Bart',
                                email: "bart@simpsons.com",
                                phone: "555-222-1234"
                            }, {
                                name: 'Homer',
                                email: "home@simpsons.com",
                                phone: "555-222-1244"
                            }, {
                                name: 'Marge',
                                email: "marge@simpsons.com",
                                phone: "555-222-1254"
                            }],
                            proxy: {
                                type: 'memory'
                            }
                        },
                        columns: [{
                            text: 'Name',
                            dataIndex: 'name'
                        }, {
                            text: 'Email',
                            dataIndex: 'email',
                            flex: 1
                        }, {
                            text: 'Phone',
                            dataIndex: 'phone'
                        }]
                    }]
                }*/]
            }]

        })
    }

});
