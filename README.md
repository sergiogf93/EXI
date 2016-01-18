[EXI](http://exi.embl.fr/saxs) —  EXtended ISPyB
==================================================


What you need to build your own EXI
--------------------------------------

In order to build EXI, you need to have:
- The latest npm and git 1.7 or later. Earlier versions might work, but are not supported. 
- Bower (installable from npm)
- Grunt version v0.4.5 or later (http://gruntjs.com/)


How to build your own EXI
--------------------------------------

Clone a copy of the main EXI git repo by running:

```bash
git clone git://github.com/antolinos/EXI.git
```

Enter the jquery directory and run the build script:

```bash
npm install
```

Download dependencies by running:

```bash
bower install
```

If you want to see which dependencies EXI needs run:
```bash
bower list
```


Build EXI by running Grunt, the javascript task runner

```bash
grunt
```

If you want to build a version where the javascript will be not minified for developing then use the profile dev

```bash
grunt dev
```

How to configure EXI 
--------------------------------------
In order to configure EXI some modifications should be done on config.js that it may be found on:
* /saxs/config.js 
* /mx/config.js

It allows to use different configuration for different techniques.

This is the format of the file is JSON

```json
{
   "detectors" : {

	"Pilatus3_2M" : {
				"pixelSize": {
						x : 1475,
						y : 1679
				},
				"sensitiveArea" : {
						x : 253.7,
						y : 288.8
				},
				"pixelSize"Horizontal : 0.172,
				"img" : "https://www.dectris.com/tl_files/root/products/PILATUS%20S%20Serie/Systems/PILATUS3_S_2M.png"

	},
	"Pilatus_6M_F" : {
				"pixelSize": {
						x : 2463,
						y : 2527
				},
				"sensitiveArea" : {
						x : 423.6,
						y : 434.6
				},
				"pixelSize"Horizontal : 0.172,
				"img" : "https://www.dectris.com/tl_files/root/products/PILATUS%20S%20Serie/Systems/PILATUS3_S_6M.png"

	},
	"Pilatus3_6M" : {
				"pixelSize": {
						x : 2463,
						y : 2527
				},
				"sensitiveArea" : {
						x : 423.6,
						y : 434.6
				},
				"pixelSize"Horizontal : 0.172,
				"img" : "https://www.dectris.com/tl_files/root/products/PILATUS%20S%20Serie/Systems/PILATUS3_S_6M.png"

	}



   },
   "sites":[
      {
         "name":"ESRF",
         "url":"https://wwws.esrf.fr/ispyb/ispyb-ws/rest",
         "exiUrl":'http://pc593.embl.fr:8080/extispyb-ws/rest",
         "beamlines":{
            "SAXS":[
               "BM29"
            ],
            "MX":[
               "ID23-1","ID29","ID30B","ID23-2","ID30A-3","ID30A-1","ID30A-2","BM14U","BM30A","ID14-1","ID14-2","ID14-3","ID14-4"
            ]
         }
      }
]
}
```