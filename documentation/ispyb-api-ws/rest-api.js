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

function getExperiment(){
	return {
		name:'experiment',
		children : [
					{   name:'list', method : 'GET'},
					{   name:'list', method : 'POST'},
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
														{name:'add', method : 'GET'},
														{
															name:'{dewarId}',
															children : [
																			{name:'label', method : 'GET'},
																			{name:'remove', method : 'GET'},
																			{name:'save', method : 'POST'}
															] 
														}
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
											}
							] 
						},
						{
							name:'{subtractionIdList}',
							children : [
											{name:'list', method : 'GET'}
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
						{name:'merge', method : 'GET'},	
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
					{
						name:'macromolecule',
						children : [
									{   name:'list', method : 'GET'},
									{	name:'save', method : 'POST'}
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
																					name:'{proposalId}',
																					children : proposalChildrenFn
																								
																				},
																				{
																					name:'user',
																					children : [
																								{
																									name:'{user}', children : [{name : 'list', method : 'GET'}]
																								}
																								]
																				},
																				{
																					name:'technique',
																					children : [
																								{
																									name:'{technique}', children : [{name : 'get', method : 'GET'}]
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
					name:'session',
					children : [
									{name:'list', method : 'GET'}	
					]
				},
				getShipping(),
				{
					name:'mx'
				}
			];
}


function getMainData() {
	return getData(function(){return []});
}