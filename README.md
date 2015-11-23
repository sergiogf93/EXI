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

Download dependencies bu rynning:

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
