function getMeasurement(){
	return {
		name:'measurement',
		children : [
					{name:'save', method : 'POST'},
					{	name:'experiment',
						children :[
									{	name : '{experimentId}',
										children : [
													{
														name : 'type',
														children : [
																{
																	name : '{type}',
																	children : [
																		{name : 'sort', method : 'GET'}
																	]	
																}	
														]
													}
										]
										}
						]
					},
					{	name:'{measurementId}', 
						children : [
									{name:'remove', method : 'GET'}
					]},
		]
		
	};
};

function getFrame(){
	return {
		name:'frame',
		children : [
					{name : 'datplot', method : 'GET', queryParams : ['frame', 'average', 'subtracted', 'sampleaverage', 'bufferaverage']},
					{	
						name:'average',
						children : [
						            {	
										name:'{averageIdList}',
										children : [
										           {name : 'list', method : 'GET'}
										 ]
											
									}
									
						 ]
							
					},
					{	
						name:'measurement',
						children : [
										{	
											name:'{measurementIdList}',
											children : [
											           {name : 'list', method : 'GET'}
											 ]
												
										}
						 ]
							
					},
					{	
						name:'subtraction',
						children : [
										{	
											name:'{subtractionIdList}',
											children : [
											           {name : 'list', method : 'GET'}
											 ]
												
										}
						 ]
							
					}
//					{	
//						name:'session',
//						children : [
//						            {   name:'{sessionId}', children : [ {name : 'list', method : 'GET'}]}
//						 ]
//							
//					},
//					{	
//						name:'{key}',
//						children : [
//						            {   name:'{value}', children : [ {name : 'list', method : 'GET'}]}
//						 ]
//							
//					}
		]
		
	};
} 

function getExperiment(){
	return {
		name:'experiment',
		children : [
					{   name:'list', method : 'GET'},
					{	
						name:'{experimentId}',
						children : [
						            {   name:'get', method : 'GET'},
						            {   name:'save', method : 'POST'},
						            {	
										name:'samplechanger',
										children : [
										            {   name:'type', children : [ {name : '{type}', children : [{name : 'template', method : 'GET'}]}]}
										 ]
											
									},
									 {	
										name:'hplc',
										children : [
										           {name : 'overview', method : 'GET'},
										           {name : 'frame', children : [ {name : '{frameId}', children : [{name : 'get', method : 'GET'}]}]}
										 ]
											
									},
						 ]
							
					},
					{	
						name:'session',
						children : [
						            {   name:'{sessionId}', children : [ {name : 'list', method : 'GET'}]}
						 ]
							
					},
					{	
						name:'{key}',
						children : [
						            {   name:'{value}', children : [ {name : 'list', method : 'GET'}]}
						 ]
							
					}
		]
		
	};
}

function getShipping(){
	return {
		name:'shipping',
		children : [
						{name:'list', method : 'GET'},	
						{name:'save', method : 'POST'},	
						{
							name:'{shippingId}',
							children : [
										{name:'get', method : 'GET'},
										{
											name:'dewar',
											children : [
														{name:'save', method : 'POST'},
														{
															name:'{dewarId}',
															children : [
																			{name:'label', method : 'GET'},
																			{name:'remove', method : 'GET'}
															] 
														}
											] 
										},
										{
											name:'labcontact',
											children : [
															{
																		name:'smis', children : [
																						{name:'list', method : 'GET'}
																		] 
															},
															{
																name:'{labContactId}', children : [
																				{name:'get', method : 'GET'}
																] 
															},
															{name:'list', method : 'GET'}
											] 
										}
							] 
						}	
		]
	};
};


function getSubtractions(){
	return {
		name:'subtraction',
		children : [
						{
							name:'{subtractionId}',
							children : [
											{name:'download', method : 'GET'},
											{
												name:'image',
												children : [
																{name:'scattering', method : 'GET'},
																{name:'kratky', method : 'GET'},
																{name:'density', method : 'GET'},
																{name:'guinier', method : 'GET'}
																
												] 
											},
											{
												name:'sampleaverage',
												children : [
																{name:'download', method : 'GET'}
												] 
											},
											{
												name:'bufferaverage',
												children : [
																{name:'download', method : 'GET'}
												] 
											}
							] 
						},
						{
							name:'{subtractionIdList}',
							children : [
											{name:'list', method : 'GET'},
											{name:'download', method : 'GET'}
							]
						}
		]
	};
};

function getStockSolutions(){
	return {
		name:'stocksolution',
		children : [
						{name:'list', method : 'GET'},	
						{name:'save', method : 'POST'}
		]
	};
};

function getSpecimen(){
	return {
		name:'specimen',
		children : [
						{name:'merge', method : 'POST'},	
						{name:'save', method : 'POST'}
		]
	};
};

function getDataCollection(){
	return {
		name:'datacollection',
		children : [
						{name:'list', method : 'GET'},	
						{
							name:'{dataCollectionIdList}',
							children : [
											{name:'list', method : 'GET'}	
							]
						},
						{
							name:'{key}',
							children : [
											{
												name:'{value}',
												children : [
																{name:'list', method : 'GET'}	
												]
											}
							]
						}
		]
	};
};

function getSAXS(){
	return {
		name:'saxs',
		children : [
		            getSpecimen(),
		            getDataCollection(),
		            getSubtractions(),
		            getExperiment(),
		            getFrame(),
					{
						name:'macromolecule',
						children : [
									{   name:'list', method : 'GET'},
									{	name:'save', method : 'POST'},
									{
										name:'{macromoleculeId}',
										children : [
													{
														name:'contactfile',
														children : [
																	{name:'upload', method : 'POST'},
																	{name:'remove', method : 'GET'}
														]
													},
													{
														name:'pdb',
														children : [
																	{name:'upload', method : 'POST'},
																	{
																		name:'{structureId}',
																		children : [
																					{name:'remove', method : 'GET'}
																		]
																	}
														]
													}
										]
									}
						]
						
					},
					{
						name:'buffer',
						children : [
									{name:'list', method : 'GET'},
									{name:'save', method : 'POST'}
						]
					},
					getMeasurement(),
					getStockSolutions()
					
		]
		
	};
};

function getData(proposalChildrenFn) {
	return [{
		name : "ispyb.esrf.fr",
		children : [
					{
						name : 'ispyb-ws',
						children : [
									{
										name : 'rest',
										children:[
										          	{ name : 'authenticate', method : 'GET'},
													{
														name : '{token}',
														children : [
																	{
																		name : 'proposal',
																		children : [
																				{
																					name:'list',
																					method : 'GET'
																				},
																				{
																					name:'{proposalId}',
																					children : proposalChildrenFn
																				},
																				
																				{
																					name:'session',
																					children : [
																								{name : 'list', method : 'GET', roles:['manager', 'localcontact']},
																								{
																									name:'{sessionId}', children : [{name : 'list', method : 'GET'}]
																								}
																								]
																				}
																				
																				]
																	}	
																	]
													}
													]
									}
									]
					}
		]
	}];
}

function getProposalChildren() {
	return [	getSAXS(),
	        	{
					name:'technique',
					children : [
								{
									name:'{technique}', children : [{name : 'get', method : 'GET'}]
								}
								]
				},
				{
					name:'session',
					children : [
									{name:'list', method : 'GET'}	
					]
				},
				getShipping(),
				getMX()
			];
}

function getMX(){
	return {
		name:'mx',
		children : [
		            {
		            	name:'crystal',
		            	children : [
										{
											name:'datacollection',
											children : [
													{
														name:'{datacollectionId}',
														children : [
																		{
																			name:'pdb', 
																			children : [
																			            {name : 'download', method : 'GET'}]
																		}
														]
													}
											]
										}  
		            	]
		            },
					{
						name:'autoprocintegration',
						children : [
									{
										name:'{autoprocintegrationId}', 
										children : [
														{
															name:'xscale', 
															children : [
															            {name : 'rfactor', method : 'GET'}]
														},
														{
															name:'xscale', 
															children : [
															            {name : 'cc2', method : 'GET'}]
														},
														{
															name:'xscale', 
															children : [
															            {name : 'completeness', method : 'GET'}]
																			
														},
														{
															name:'xscale', 
															children : [
															            {name : 'isigma', method : 'GET'}]
														}
										]
									},
									{
										name:'datacollection', 
										children : [
														{
															name:'{dataCollectionId}', 
															children : [
																			{
																				name:'analysis', 
																				children : [
																				            {name : 'list', method : 'GET'}]
																			}
															            ]
														}
										]
									}
						]
					}
					
		]
		
	};
};

function getMainData() {
	return getData(function(){return []});
}