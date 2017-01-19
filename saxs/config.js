var ExtISPyB ={
   version : '0.9.8',
   release_date : '2016/12/22',

   detectors : {

	"Pilatus3_2M" : {
				pixelSize: {
						x : 1475,
						y : 1679
				},
				sensitiveArea : {
						x : 253.7,
						y : 288.8
				},
				pixelSizeHorizontal : 0.172,
				img : "https://www.dectris.com/tl_files/root/products/PILATUS%20S%20Serie/Systems/PILATUS3_S_2M.png"

	},
	"Pilatus_6M_F" : {
				pixelSize: {
						x : 2463,
						y : 2527
				},
				sensitiveArea : {
						x : 423.6,
						y : 434.6
				},
				pixelSizeHorizontal : 0.172,
				img : "https://www.dectris.com/tl_files/root/products/PILATUS%20S%20Serie/Systems/PILATUS3_S_6M.png"

	},
	"Pilatus3_6M" : {
				pixelSize: {
						x : 2463,
						y : 2527
				},
				sensitiveArea : {
						x : 423.6,
						y : 434.6
				},
				pixelSizeHorizontal : 0.172,
				img : "https://www.dectris.com/tl_files/root/products/PILATUS%20S%20Serie/Systems/PILATUS3_S_6M.png"

	}



   },
   sites:[
      {
         name:'ESRF',
 	     description : 'European Synchroton Radiation Facility',
         icon : '../images/site/esrf.png',
         url:'https://wwws.esrf.fr/ispyb/ispyb-ws/rest',
         exiUrl:'http://pc593.embl.fr:8080/extispyb-ws/rest',
	     plateGroup : [
			{
				type: 'Deep Well',
				rowCount : 8,
				columnCount : 12
			},
			{
				type: '4 x ( 8 + 3 ) Block',
				rowCount : 4,
				columnCount : 11
			},
			{
				type: '96 Well plate',
				rowCount : 8,
				columnCount : 12
			}

	],
         beamlines:{
            SAXS:[
		 {
		   name : 'BM29',
		   sampleChangerType : ''
   	       }
            ],
            MX:[ ]
         }
      },
      {
          name:'ESRF TEST',
         url:'http://ispyvalid.esrf.fr:8080/ispyb/ispyb-ws/rest',
 	     description : 'European Synchroton Radiation Facility',
         icon : '../images/site/esrf.png',
        
         exiUrl:'http://pc593.embl.fr:8080/extispyb-ws/rest',
	     plateGroup : [
			{
				type: 'Deep Well',
				rowCount : 8,
				columnCount : 12
			},
			{
				type: '4 x ( 8 + 3 ) Block',
				rowCount : 4,
				columnCount : 11
			},
			{
				type: '96 Well plate',
				rowCount : 8,
				columnCount : 12
			}

	],
         beamlines:{
            SAXS:[
		 {
		   name : 'BM29',
		   sampleChangerType : ''
   	       }
            ],
            MX:[ ]
         }
      }
	,
    //   {
    //      name:'ESRF TEST',
    //      url:'http://ispyvalid.esrf.fr:8080/ispyb/ispyb-ws/rest',
    //      exiUrl:'http://pc593.embl.fr:8080/extispyb-ws/rest',
    //      beamlines:{
    //         SAXS:[
    //            {
	// 	   name : 'BM29',
	// 	   sampleChangerType : ''
   	//        }
    //         ],
    //         MX:[
               
    //         ]
    //      }
    //   }
   ]
};
