  dust.helpers.decimal = function(chunk, context, bodies, params) {
      
        if (params.key){            
            var value = context.current()[params.key];
            if (value){
                if (params.decimals != null){
                    try{
                         chunk.write(Number(value).toFixed(params.decimals));
                    }
                    catch(e){
                        
                        /** There was an error, we leave same value */
                        chunk.write(context.current()[params.key]);    
                    }
                }
                else{
                    /** No decimals then same value */
                    chunk.write(context.current()[params.key]);
                }
            }
         
        }
        else{
            chunk.write('WARN: NO KEY SET');
        }
         return chunk;
        
};

dust.helpers.sizeOf = function(chunk, context, bodies, params) {
  var value = this.size(chunk, context, bodies, params);
  return (bodies && bodies.block) ? chunk.render(bodies.block, context.push({ isSelect: true, isResolved: false, selectKey: value })) : value;
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame     ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout;
} )();

var Intense = (function() {

    'use strict';

    var KEYCODE_ESC = 27;

    // Track both the current and destination mouse coordinates
    // Destination coordinates are non-eased actual mouse coordinates
    var mouse = { xCurr:0, yCurr:0, xDest: 0, yDest: 0 };

    var horizontalOrientation = true;
    var invertInteractionDirection = false;

    // Holds the animation frame id.
    var looper;

    // Current position of scrolly element
    var lastPosition, currentPosition = 0;

    var sourceDimensions, target;
    var targetDimensions = { w: 0, h: 0 };

    var container;
    var containerDimensions = { w: 0, h:0 };
    var overflowArea = { x: 0, y: 0 };

    // Overflow variable before screen is locked.
    var overflowValue;

    var active = false;

    /* -------------------------
    /*          UTILS
    /* -------------------------*/

    // Soft object augmentation
    function extend( target, source ) {

        for ( var key in source )

            if ( !( key in target ) )

                target[ key ] = source[ key ];

        return target;
    }

    // Applys a dict of css properties to an element
    function applyProperties( target, properties ) {

      for( var key in properties ) {
        target.style[ key ] = properties[ key ];
      }
    }

    // Returns whether target a vertical or horizontal fit in the page.
    // As well as the right fitting width/height of the image.
    function getFit( source ) {

      var heightRatio = window.innerHeight / source.h;

      if( (source.w * heightRatio) > window.innerWidth ) {
        return { w: source.w * heightRatio, h: source.h * heightRatio, fit: true };
      } else {
        var widthRatio = window.innerWidth / source.w;
        return { w: source.w * widthRatio, h: source.h * widthRatio, fit: false };
      }
    }

    /* -------------------------
    /*          APP
    /* -------------------------*/

    function startTracking( passedElements ) {

      var i;

      // If passed an array of elements, assign tracking to all.
      if ( passedElements.length ) {

        // Loop and assign
        for( i = 0; i < passedElements.length; i++ ) {
          track( passedElements[ i ] );
        }

      } else {
          track( passedElements );
      }
    }

    function track( element ) {

      // Element needs a src at minumun.
      if( element.getAttribute( 'data-image') || element.src || element.href ) {
        element.addEventListener( 'click', function(e) {
          if(element.tagName === 'A'){
            e.preventDefault();
          }
          if(!active) {
            init( this );
          }
        }, false );
      }
    }

    function start() {
      loop();
    }

    function stop() {
      cancelRequestAnimFrame( looper );
    }

    function loop() {
        looper = requestAnimFrame(loop);
        positionTarget();
    }

    // Lock scroll on the document body.
    function lockBody() {

      overflowValue = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    // Unlock scroll on the document body.
    function unlockBody() {
      document.body.style.overflow = overflowValue;
    }

    function setState (element, newClassName) {
      if (element) {
        element.className = element.className.replace('intense--loading', '');
        element.className = element.className.replace('intense--viewing', '');
        element.className += " " + newClassName;
      } else {
        // Remove element with class .view
        var elems = document.querySelectorAll('.intense--viewing');
        [].forEach.call(elems, function(el) {
            el.className = el.className.replace('intense--viewing', '').trim();
        });
      }
    }

    function createViewer( title, caption ) {

      /*
       *  Container
       */
      var containerProperties = {
        'backgroundColor': 'rgba(0,0,0,0.8)',
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'top': '0px',
        'left': '0px',
        'overflow': 'hidden',
        'zIndex': '999999',
        'margin': '0px',
        'webkitTransition': 'opacity 150ms cubic-bezier( 0, 0, .26, 1 )',
        'MozTransition': 'opacity 150ms cubic-bezier( 0, 0, .26, 1 )',
        'transition': 'opacity 150ms cubic-bezier( 0, 0, .26, 1 )',
        'webkitBackfaceVisibility': 'hidden',
        'opacity': '0'
      };
      container = document.createElement( 'figure' );
      container.appendChild( target );
      applyProperties( container, containerProperties );

      var imageProperties = {
        'cursor': 'url( "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3Q0IyNDI3M0FFMkYxMUUzOEQzQUQ5NTMxMDAwQjJGRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3Q0IyNDI3NEFFMkYxMUUzOEQzQUQ5NTMxMDAwQjJGRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdDQjI0MjcxQUUyRjExRTM4RDNBRDk1MzEwMDBCMkZEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdDQjI0MjcyQUUyRjExRTM4RDNBRDk1MzEwMDBCMkZEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+soZ1WgAABp5JREFUeNrcWn9MlVUY/u4dogIapV0gQ0SUO4WAXdT8B5ULc6uFgK3MLFxzFrQFZMtaed0oKTPj1x8EbbZZK5fNCdLWcvxQ+EOHyAQlBgiIVFxAJuUF7YrQ81zOtU+8F+Pe78K1d3s5537f+fE8nPec7z3vOSpJIRkbGwtEEgtdBdVCl0AXQr2hKqgJeg16BdoCrYNWqVSqbif7VQT8YqgB2jTmuDSJNoIcJUJVOVg5EsmH0Oehaj4bGRkZ6uvra2xvb29oamrqbGxs7K2vrx/s7Oy8yffBwcFzdTqdb0REhF9YWFhwSEhIpEajifDw8PAWzY5Cj0GzMUoNUx0R1RQJaJAcgKaw7ujo6O2urq7qysrKioyMjHNDQ0OjU2nP29tbnZ+fv1qv18cFBQWtU6vVs9gN9BvobhDqU5wIKryA5CuoLwj83dzc/NOePXuOlpSUXFNijiUlJS3ct2/fiytWrHgOhGbj0SD0dZD5UREiKOiJJA+axt9Go7F2165deUeOHOmVXCBbt271y8nJyfD3939aPCqCZoCQ2WEiKOQj7HYjzejUqVNFcXFxJdI0SEVFRdKGDRtShbmd5HwEGZM9IupJSHiJBjaazebr2dnZmdNFgsK+2Cf7JgZiEZhsimoSc/oZqh8eHjamp6fvPnTo0O/SDMiOHTsWFRQUHPDy8vLnQEGflZvZpKaFl4WcE7du3epPTU19+/Dhwz3SDMr27dsDioqKcufMmfM45wyIpD3QtPBiC0lgTowcPHgwa6ZJUIiBWIgJP1OB8aVJTQsFnkDSxCUWk60gPj6+VHIjKS8vT8TcSRdLcxhG5g+bpoWH3yF5ube3tw7L33uSGwqW/8/8/Pzoz30PItvuMy080HEZx/CZDQZDgeSmQmzESKwC870jgodcWhPhJx0LDw8vlNxYLl269Cb8Nfp5NP2kuyMiPM8EfvTodkhuLsQoJn4C/VG5ab3CfHd3d41SvpMrhRiBtVrgf01OZBv/nIRID4nIsG6xzBGxs7vK/YSvr2/SVF3xiYL55bVgwYJZp0+f/nOycuvXr38E+xczvOibjvTDLcDg4OBx7GfoD4ZwRPR8gUYbnCUBF3wuHMtPy8rKcmJjY33tleM7lqmpqdnPOo70RazAfNHapFrssaWOjo6Lzg43vj2zPT09febNm7ektLT0C1tk+IzvWIZlWcfR/oC5UWSjSCSUudbW1qvOEqmqqhrcvHnzOzdu3Lhii4ycBMuwLOs42t/ly5etmLUkEsJcbW3tbwq5ETbJ2CLBss70dfbsWSvmpZzsnJTzo6KiEhoaGoaVWlXkwE0mkyXk4+PjE6gUCUpMTMz86urq48gOkIjFWYHfEqf0EkkyJ06cyCMB/iah5OTkTCVIUDQajQf8wl+QNaune/2/c+eOS9olkb+YiYyM9FJ6NGhaHA2OBJV5e6uZI6LVaq2YTSTSz9zatWsfc8X84JzYtGlTJtXeauaorFy5cr7IXieRdubWrFnzpCtIJCYmWpZYKvNKksE/34q5g0RamQsNDV3sKhLy74ySZJYtW2bF3EIidZaFeOnSp5wl0t/fb4aYbJGwRYZlWcfR/mSYL8idRhOcxuTpdBoHBgZuY5Pk0LfrPqdRnE8080Fubm60Aru34QeRoLCMoyQoxCpItFnnCIVBB2kj5GHZj8iw/iDfWJHIaGBgYAyj4u5OghiBdZ00fqby9V0iMK8rSMoYMGZo392JECOwehAztHNipPFjxiGw0UnYuXPnInclQWzEKI0fCH1kL9JoCdAZjcZzAQEB77sjkZ6env3YjK22G6AT8i7DkSzI8KS7kSAmQWJQYL3HabwrjKVK4mQKX9w0g8EQ6i4k9u7dqyUm8TNNYJVsmpbMxL5EkuouxwopKSn+xcXFeeJYoRgkUmVYJyXirgc9ldBnbB302NxYiYJcGc6wgcLCwvysrCztTJgT+xYkzhCTvUPR//9hqBgZkxiZYjao1+vf4vLH4XalKbEP9iVIFIuRME2K9b92MOHCAEOdZS66MJAAAp5iiX0DBI4+ANfUiIhKvMLxOfRVSXaFA2ZQnpmZWefIFY68vLxVMNf4CVc4vuV3wiVXOCZUjkLygXTvpRoTL9Uw9NrS0tJVX1/fc/78+ettbW2WIPXy5cvnRkdHP6rT6QK0Wm0QNkXhGo0mUrjikvTvpZpPQODCFLA4bw6ya06/OnHNqXnGrjnZIyWNXzyjC0GPYIk0fvHM+h+XXzxjnOCcNH7x7KqT/VrSfwQYAOAcX9HTDttYAAAAAElFTkSuQmCC" ) 25 25, no-drop'
      };
      applyProperties( target, imageProperties );

      /*
       *  Caption Container
       */
      var captionContainerProperties = {
        'fontFamily': 'Georgia, Times, "Times New Roman", serif',
        'position': 'fixed',
        'bottom': '0px',
        'left': '0px',
        'padding': '20px',
        'color': '#fff',
        'wordSpacing': '0.2px',
        'webkitFontSmoothing': 'antialiased',
        'textShadow': '-1px 0px 1px rgba(0,0,0,0.4)'
      };
      var captionContainer = document.createElement( 'figcaption' );
      applyProperties( captionContainer, captionContainerProperties );

      /*
       *  Caption Title
       */
      if ( title ) {
        var captionTitleProperties = {
          'margin': '0px',
          'padding': '0px',
          'fontWeight': 'normal',
          'fontSize': '40px',
          'letterSpacing': '0.5px',
          'lineHeight': '35px',
          'textAlign': 'left'
        };
        var captionTitle = document.createElement( 'h1' );
        applyProperties( captionTitle, captionTitleProperties );
        captionTitle.innerHTML = title;
        captionContainer.appendChild( captionTitle );
      }

      if ( caption ) {
        var captionTextProperties = {
          'margin': '0px',
          'padding': '0px',
          'fontWeight': 'normal',
          'fontSize': '20px',
          'letterSpacing': '0.1px',
          'maxWidth': '500px',
          'textAlign': 'left',
          'background': 'none',
          'marginTop': '5px'
        };
        var captionText = document.createElement( 'h2' );
        applyProperties( captionText, captionTextProperties );
        captionText.innerHTML = caption;
        captionContainer.appendChild( captionText );
      }

      container.appendChild( captionContainer );

      setDimensions();

      mouse.xCurr = mouse.xDest = window.innerWidth / 2;
      mouse.yCurr = mouse.yDest = window.innerHeight / 2;

      document.body.appendChild( container );
      setTimeout( function() {
        container.style[ 'opacity' ] = '1';
      }, 10);
    }

    function removeViewer() {

      unlockBody();
      unbindEvents();
      stop();
      document.body.removeChild( container );
      active = false;
      setState(false);
    }

    function setDimensions() {

      // Manually set height to stop bug where
      var imageDimensions = getFit( sourceDimensions );
      target.width = imageDimensions.w;
      target.height = imageDimensions.h;
      horizontalOrientation = imageDimensions.fit;

      targetDimensions = { w: target.width, h: target.height };
      containerDimensions = { w: window.innerWidth, h: window.innerHeight };
      overflowArea = {x: containerDimensions.w - targetDimensions.w, y: containerDimensions.h - targetDimensions.h};
    }

    function init( element ) {

      setState(element, 'intense--loading');
      var imageSource = element.getAttribute( 'data-image') || element.src || element.href;
      var title = element.getAttribute( 'data-title') || element.title;
      var caption = element.getAttribute( 'data-caption');

      var img = new Image();
      img.onload = function() {

        sourceDimensions = { w: img.width, h: img.height }; // Save original dimensions for later.
        target = this;
        createViewer( title, caption );
        lockBody();
        bindEvents();
        loop();

        setState(element, 'intense--viewing');
      }

      img.src = imageSource;
    }

    function bindEvents() {

      container.addEventListener( 'mousemove', onMouseMove,   false );
      container.addEventListener( 'touchmove', onTouchMove,   false );
      window.addEventListener(    'resize',    setDimensions, false );
      window.addEventListener(    'keyup',     onKeyUp,       false );
      target.addEventListener(    'click',     removeViewer,  false );
    }

    function unbindEvents() {

      container.removeEventListener( 'mousemove', onMouseMove,   false );
      container.removeEventListener( 'touchmove', onTouchMove,   false);
      window.removeEventListener(    'resize',    setDimensions, false );
      window.removeEventListener(    'keyup',     onKeyUp,       false );
      target.removeEventListener(    'click',     removeViewer,  false );
    }

    function onMouseMove( event ) {

      mouse.xDest = event.clientX;
      mouse.yDest = event.clientY;
    }

    function onTouchMove( event ) {

      event.preventDefault(); // Needed to keep this event firing.
      mouse.xDest = event.touches[0].clientX;
      mouse.yDest = event.touches[0].clientY;
    }

    // Exit on excape key pressed;
    function onKeyUp( event ) {

      event.preventDefault();
      if ( event.keyCode === KEYCODE_ESC ) {
        removeViewer();
      }
    }

    function positionTarget() {

      mouse.xCurr += ( mouse.xDest - mouse.xCurr ) * 0.05;
      mouse.yCurr += ( mouse.yDest - mouse.yCurr ) * 0.05;

      if ( horizontalOrientation === true ) {

        // HORIZONTAL SCANNING
        currentPosition += ( mouse.xCurr - currentPosition );
        if( mouse.xCurr !== lastPosition ) {
          var position = parseFloat( calcPosition(currentPosition, containerDimensions.w) );
          position = overflowArea.x * position;
          target.style[ 'webkitTransform' ] = 'translate(' + position + 'px, 0px)';
          target.style[ 'MozTransform' ] = 'translate(' + position + 'px, 0px)';
          target.style[ 'msTransform' ] = 'translate(' + position + 'px, 0px)';
          lastPosition = mouse.xCurr;
        }
      } else if ( horizontalOrientation === false ) {

        // VERTICAL SCANNING
        currentPosition += ( mouse.yCurr - currentPosition );
        if( mouse.yCurr !== lastPosition ) {
          var position = parseFloat( calcPosition(currentPosition, containerDimensions.h) );
          position = overflowArea.y * position;
          target.style[ 'webkitTransform' ] = 'translate( 0px, ' + position + 'px)';
          target.style[ 'MozTransform' ] = 'translate( 0px, ' + position + 'px)';
          target.style[ 'msTransform' ] = 'translate( 0px, ' + position + 'px)';
          lastPosition = mouse.yCurr;
        }
      }

      function calcPosition(current, total){
        return invertInteractionDirection ? (total - current) / total : current / total;
      }

    }

    function config(options){
      if ('invertInteractionDirection' in options) invertInteractionDirection = options.invertInteractionDirection;
    }

    function main( element, configOptions ) {

      // Parse arguments
      if ( !element ) {
        throw 'You need to pass an element!';
      }

      // If they have a config, use it!
      if( configOptions ) {
        config(configOptions);
      }

      startTracking( element );
    }

    return extend( main, {
        resize: setDimensions,
        start: start,
        stop: stop,
        config: config
    });
})();

if (typeof module !== 'undefined' && module.exports){
  module.exports = Intense;
}

window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}(),window.cancelRequestAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout}();var Intense=function(){"use strict";function p(a,b){for(var c in b)c in a||(a[c]=b[c]);return a}function q(a,b){for(var c in b)a.style[c]=b[c]}function r(a){var b=window.innerHeight/a.h;if(a.w*b>window.innerWidth)return{w:a.w*b,h:a.h*b,fit:!0};var c=window.innerWidth/a.w;return{w:a.w*c,h:a.h*c,fit:!1}}function s(a){var b;if(a.length)for(b=0;b<a.length;b++)t(a[b]);else t(a)}function t(a){(a.getAttribute("data-image")||a.src||a.href)&&a.addEventListener("click",function(b){"A"===a.tagName&&b.preventDefault(),o||D(this)},!1)}function u(){w()}function v(){cancelRequestAnimFrame(e)}function w(){e=requestAnimFrame(w),J()}function x(){n=document.body.style.overflow,document.body.style.overflow="hidden"}function y(){document.body.style.overflow=n}function z(a,b){if(a)a.className=a.className.replace("intense--loading",""),a.className=a.className.replace("intense--viewing",""),a.className+=" "+b;else{var c=document.querySelectorAll(".intense--viewing");[].forEach.call(c,function(a){a.className=a.className.replace("intense--viewing","").trim()})}}function A(a,c){var d={backgroundColor:"rgba(0,0,0,0.8)",width:"100%",height:"100%",position:"fixed",top:"0px",left:"0px",overflow:"hidden",zIndex:"999999",margin:"0px",webkitTransition:"opacity 150ms cubic-bezier( 0, 0, .26, 1 )",MozTransition:"opacity 150ms cubic-bezier( 0, 0, .26, 1 )",transition:"opacity 150ms cubic-bezier( 0, 0, .26, 1 )",webkitBackfaceVisibility:"hidden",opacity:"0"};k=document.createElement("figure"),k.appendChild(i),q(k,d);var e={cursor:'url( "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3Q0IyNDI3M0FFMkYxMUUzOEQzQUQ5NTMxMDAwQjJGRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3Q0IyNDI3NEFFMkYxMUUzOEQzQUQ5NTMxMDAwQjJGRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdDQjI0MjcxQUUyRjExRTM4RDNBRDk1MzEwMDBCMkZEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdDQjI0MjcyQUUyRjExRTM4RDNBRDk1MzEwMDBCMkZEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+soZ1WgAABp5JREFUeNrcWn9MlVUY/u4dogIapV0gQ0SUO4WAXdT8B5ULc6uFgK3MLFxzFrQFZMtaed0oKTPj1x8EbbZZK5fNCdLWcvxQ+EOHyAQlBgiIVFxAJuUF7YrQ81zOtU+8F+Pe78K1d3s5537f+fE8nPec7z3vOSpJIRkbGwtEEgtdBdVCl0AXQr2hKqgJeg16BdoCrYNWqVSqbif7VQT8YqgB2jTmuDSJNoIcJUJVOVg5EsmH0Oehaj4bGRkZ6uvra2xvb29oamrqbGxs7K2vrx/s7Oy8yffBwcFzdTqdb0REhF9YWFhwSEhIpEajifDw8PAWzY5Cj0GzMUoNUx0R1RQJaJAcgKaw7ujo6O2urq7qysrKioyMjHNDQ0OjU2nP29tbnZ+fv1qv18cFBQWtU6vVs9gN9BvobhDqU5wIKryA5CuoLwj83dzc/NOePXuOlpSUXFNijiUlJS3ct2/fiytWrHgOhGbj0SD0dZD5UREiKOiJJA+axt9Go7F2165deUeOHOmVXCBbt271y8nJyfD3939aPCqCZoCQ2WEiKOQj7HYjzejUqVNFcXFxJdI0SEVFRdKGDRtShbmd5HwEGZM9IupJSHiJBjaazebr2dnZmdNFgsK+2Cf7JgZiEZhsimoSc/oZqh8eHjamp6fvPnTo0O/SDMiOHTsWFRQUHPDy8vLnQEGflZvZpKaFl4WcE7du3epPTU19+/Dhwz3SDMr27dsDioqKcufMmfM45wyIpD3QtPBiC0lgTowcPHgwa6ZJUIiBWIgJP1OB8aVJTQsFnkDSxCUWk60gPj6+VHIjKS8vT8TcSRdLcxhG5g+bpoWH3yF5ube3tw7L33uSGwqW/8/8/Pzoz30PItvuMy080HEZx/CZDQZDgeSmQmzESKwC870jgodcWhPhJx0LDw8vlNxYLl269Cb8Nfp5NP2kuyMiPM8EfvTodkhuLsQoJn4C/VG5ab3CfHd3d41SvpMrhRiBtVrgf01OZBv/nIRID4nIsG6xzBGxs7vK/YSvr2/SVF3xiYL55bVgwYJZp0+f/nOycuvXr38E+xczvOibjvTDLcDg4OBx7GfoD4ZwRPR8gUYbnCUBF3wuHMtPy8rKcmJjY33tleM7lqmpqdnPOo70RazAfNHapFrssaWOjo6Lzg43vj2zPT09febNm7ektLT0C1tk+IzvWIZlWcfR/oC5UWSjSCSUudbW1qvOEqmqqhrcvHnzOzdu3Lhii4ycBMuwLOs42t/ly5etmLUkEsJcbW3tbwq5ETbJ2CLBss70dfbsWSvmpZzsnJTzo6KiEhoaGoaVWlXkwE0mkyXk4+PjE6gUCUpMTMz86urq48gOkIjFWYHfEqf0EkkyJ06cyCMB/iah5OTkTCVIUDQajQf8wl+QNaune/2/c+eOS9olkb+YiYyM9FJ6NGhaHA2OBJV5e6uZI6LVaq2YTSTSz9zatWsfc8X84JzYtGlTJtXeauaorFy5cr7IXieRdubWrFnzpCtIJCYmWpZYKvNKksE/34q5g0RamQsNDV3sKhLy74ySZJYtW2bF3EIidZaFeOnSp5wl0t/fb4aYbJGwRYZlWcfR/mSYL8idRhOcxuTpdBoHBgZuY5Pk0LfrPqdRnE8080Fubm60Aru34QeRoLCMoyQoxCpItFnnCIVBB2kj5GHZj8iw/iDfWJHIaGBgYAyj4u5OghiBdZ00fqby9V0iMK8rSMoYMGZo392JECOwehAztHNipPFjxiGw0UnYuXPnInclQWzEKI0fCH1kL9JoCdAZjcZzAQEB77sjkZ6env3YjK22G6AT8i7DkSzI8KS7kSAmQWJQYL3HabwrjKVK4mQKX9w0g8EQ6i4k9u7dqyUm8TNNYJVsmpbMxL5EkuouxwopKSn+xcXFeeJYoRgkUmVYJyXirgc9ldBnbB302NxYiYJcGc6wgcLCwvysrCztTJgT+xYkzhCTvUPR//9hqBgZkxiZYjao1+vf4vLH4XalKbEP9iVIFIuRME2K9b92MOHCAEOdZS66MJAAAp5iiX0DBI4+ANfUiIhKvMLxOfRVSXaFA2ZQnpmZWefIFY68vLxVMNf4CVc4vuV3wiVXOCZUjkLygXTvpRoTL9Uw9NrS0tJVX1/fc/78+ettbW2WIPXy5cvnRkdHP6rT6QK0Wm0QNkXhGo0mUrjikvTvpZpPQODCFLA4bw6ya06/OnHNqXnGrjnZIyWNXzyjC0GPYIk0fvHM+h+XXzxjnOCcNH7x7KqT/VrSfwQYAOAcX9HTDttYAAAAAElFTkSuQmCC" ) 25 25, no-drop'};q(i,e);var f={fontFamily:'Georgia, Times, "Times New Roman", serif',position:"fixed",bottom:"0px",left:"0px",padding:"20px",color:"#fff",wordSpacing:"0.2px",webkitFontSmoothing:"antialiased",textShadow:"-1px 0px 1px rgba(0,0,0,0.4)"},g=document.createElement("figcaption");if(q(g,f),a){var h={margin:"0px",padding:"0px",fontWeight:"normal",fontSize:"40px",letterSpacing:"0.5px",lineHeight:"35px",textAlign:"left"},j=document.createElement("h1");q(j,h),j.innerHTML=a,g.appendChild(j)}if(c){var l={margin:"0px",padding:"0px",fontWeight:"normal",fontSize:"20px",letterSpacing:"0.1px",maxWidth:"500px",textAlign:"left",background:"none",marginTop:"5px"},m=document.createElement("h2");q(m,l),m.innerHTML=c,g.appendChild(m)}k.appendChild(g),C(),b.xCurr=b.xDest=window.innerWidth/2,b.yCurr=b.yDest=window.innerHeight/2,document.body.appendChild(k),setTimeout(function(){k.style.opacity="1"},10)}function B(){y(),F(),v(),document.body.removeChild(k),o=!1,z(!1)}function C(){var a=r(h);i.width=a.w,i.height=a.h,c=a.fit,j={w:i.width,h:i.height},l={w:window.innerWidth,h:window.innerHeight},m={x:l.w-j.w,y:l.h-j.h}}function D(a){z(a,"intense--loading");var b=a.getAttribute("data-image")||a.src||a.href,c=a.getAttribute("data-title")||a.title,d=a.getAttribute("data-caption"),e=new Image;e.onload=function(){h={w:e.width,h:e.height},i=this,A(c,d),x(),E(),w(),z(a,"intense--viewing")},e.src=b}function E(){k.addEventListener("mousemove",G,!1),k.addEventListener("touchmove",H,!1),window.addEventListener("resize",C,!1),window.addEventListener("keyup",I,!1),i.addEventListener("click",B,!1)}function F(){k.removeEventListener("mousemove",G,!1),k.removeEventListener("touchmove",H,!1),window.removeEventListener("resize",C,!1),window.removeEventListener("keyup",I,!1),i.removeEventListener("click",B,!1)}function G(a){b.xDest=a.clientX,b.yDest=a.clientY}function H(a){a.preventDefault(),b.xDest=a.touches[0].clientX,b.yDest=a.touches[0].clientY}function I(b){b.preventDefault(),b.keyCode===a&&B()}function J(){function e(a,b){return d?(b-a)/b:a/b}if(b.xCurr+=.05*(b.xDest-b.xCurr),b.yCurr+=.05*(b.yDest-b.yCurr),c===!0){if(g+=b.xCurr-g,b.xCurr!==f){var a=parseFloat(e(g,l.w));a=m.x*a,i.style.webkitTransform="translate("+a+"px, 0px)",i.style.MozTransform="translate("+a+"px, 0px)",i.style.msTransform="translate("+a+"px, 0px)",f=b.xCurr}}else if(c===!1&&(g+=b.yCurr-g,b.yCurr!==f)){var a=parseFloat(e(g,l.h));a=m.y*a,i.style.webkitTransform="translate( 0px, "+a+"px)",i.style.MozTransform="translate( 0px, "+a+"px)",i.style.msTransform="translate( 0px, "+a+"px)",f=b.yCurr}}function K(a){"invertInteractionDirection"in a&&(d=a.invertInteractionDirection)}function L(a,b){if(!a)throw"You need to pass an element!";b&&K(b),s(a)}var e,f,h,i,k,n,a=27,b={xCurr:0,yCurr:0,xDest:0,yDest:0},c=!0,d=!1,g=0,j={w:0,h:0},l={w:0,h:0},m={x:0,y:0},o=!1;return p(L,{resize:C,start:u,stop:v,config:K})}();"undefined"!=typeof module&&module.exports&&(module.exports=Intense);
/* jQuery elevateZoom 3.0.8 - Demo's and documentation: - www.elevateweb.co.uk/image-zoom - Copyright (c) 2013 Andrew Eades - www.elevateweb.co.uk - Dual licensed under the LGPL licenses. - http://en.wikipedia.org/wiki/MIT_License - http://en.wikipedia.org/wiki/GNU_General_Public_License */
"function"!==typeof Object.create&&(Object.create=function(d){function h(){}h.prototype=d;return new h});
(function(d,h,l,m){var k={init:function(b,a){var c=this;c.elem=a;c.$elem=d(a);c.imageSrc=c.$elem.data("zoom-image")?c.$elem.data("zoom-image"):c.$elem.attr("src");c.options=d.extend({},d.fn.elevateZoom.options,b);c.options.tint&&(c.options.lensColour="none",c.options.lensOpacity="1");"inner"==c.options.zoomType&&(c.options.showLens=!1);c.$elem.parent().removeAttr("title").removeAttr("alt");c.zoomImage=c.imageSrc;c.refresh(1);d("#"+c.options.gallery+" a").click(function(a){c.options.galleryActiveClass&&
(d("#"+c.options.gallery+" a").removeClass(c.options.galleryActiveClass),d(this).addClass(c.options.galleryActiveClass));a.preventDefault();d(this).data("zoom-image")?c.zoomImagePre=d(this).data("zoom-image"):c.zoomImagePre=d(this).data("image");c.swaptheimage(d(this).data("image"),c.zoomImagePre);return!1})},refresh:function(b){var a=this;setTimeout(function(){a.fetch(a.imageSrc)},b||a.options.refresh)},fetch:function(b){var a=this,c=new Image;c.onload=function(){a.largeWidth=c.width;a.largeHeight=
c.height;a.startZoom();a.currentImage=a.imageSrc;a.options.onZoomedImageLoaded(a.$elem)};c.src=b},startZoom:function(){var b=this;b.nzWidth=b.$elem.width();b.nzHeight=b.$elem.height();b.isWindowActive=!1;b.isLensActive=!1;b.isTintActive=!1;b.overWindow=!1;b.options.imageCrossfade&&(b.zoomWrap=b.$elem.wrap('<div style="height:'+b.nzHeight+"px;width:"+b.nzWidth+'px;" class="zoomWrapper" />'),b.$elem.css("position","absolute"));b.zoomLock=1;b.scrollingLock=!1;b.changeBgSize=!1;b.currentZoomLevel=b.options.zoomLevel;
b.nzOffset=b.$elem.offset();b.widthRatio=b.largeWidth/b.currentZoomLevel/b.nzWidth;b.heightRatio=b.largeHeight/b.currentZoomLevel/b.nzHeight;"window"==b.options.zoomType&&(b.zoomWindowStyle="overflow: hidden;background-position: 0px 0px;text-align:center;background-color: "+String(b.options.zoomWindowBgColour)+";width: "+String(b.options.zoomWindowWidth)+"px;height: "+String(b.options.zoomWindowHeight)+"px;float: left;background-size: "+b.largeWidth/b.currentZoomLevel+"px "+b.largeHeight/b.currentZoomLevel+
"px;display: none;z-index:100;border: "+String(b.options.borderSize)+"px solid "+b.options.borderColour+";background-repeat: no-repeat;position: absolute;");if("inner"==b.options.zoomType){var a=b.$elem.css("border-left-width");b.zoomWindowStyle="overflow: hidden;margin-left: "+String(a)+";margin-top: "+String(a)+";background-position: 0px 0px;width: "+String(b.nzWidth)+"px;height: "+String(b.nzHeight)+"px;float: left;display: none;cursor:"+b.options.cursor+";px solid "+b.options.borderColour+";background-repeat: no-repeat;position: absolute;"}"window"==
b.options.zoomType&&(lensHeight=b.nzHeight<b.options.zoomWindowWidth/b.widthRatio?b.nzHeight:String(b.options.zoomWindowHeight/b.heightRatio),lensWidth=b.largeWidth<b.options.zoomWindowWidth?b.nzWidth:b.options.zoomWindowWidth/b.widthRatio,b.lensStyle="background-position: 0px 0px;width: "+String(b.options.zoomWindowWidth/b.widthRatio)+"px;height: "+String(b.options.zoomWindowHeight/b.heightRatio)+"px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:"+
b.options.lensOpacity+";filter: alpha(opacity = "+100*b.options.lensOpacity+"); zoom:1;width:"+lensWidth+"px;height:"+lensHeight+"px;background-color:"+b.options.lensColour+";cursor:"+b.options.cursor+";border: "+b.options.lensBorderSize+"px solid "+b.options.lensBorderColour+";background-repeat: no-repeat;position: absolute;");b.tintStyle="display: block;position: absolute;background-color: "+b.options.tintColour+";filter:alpha(opacity=0);opacity: 0;width: "+b.nzWidth+"px;height: "+b.nzHeight+"px;";
b.lensRound="";"lens"==b.options.zoomType&&(b.lensStyle="background-position: 0px 0px;float: left;display: none;border: "+String(b.options.borderSize)+"px solid "+b.options.borderColour+";width:"+String(b.options.lensSize)+"px;height:"+String(b.options.lensSize)+"px;background-repeat: no-repeat;position: absolute;");"round"==b.options.lensShape&&(b.lensRound="border-top-left-radius: "+String(b.options.lensSize/2+b.options.borderSize)+"px;border-top-right-radius: "+String(b.options.lensSize/2+b.options.borderSize)+
"px;border-bottom-left-radius: "+String(b.options.lensSize/2+b.options.borderSize)+"px;border-bottom-right-radius: "+String(b.options.lensSize/2+b.options.borderSize)+"px;");b.zoomContainer=d('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+b.nzOffset.left+"px;top:"+b.nzOffset.top+"px;height:"+b.nzHeight+"px;width:"+b.nzWidth+'px;"></div>');d("body").append(b.zoomContainer);b.options.containLensZoom&&"lens"==b.options.zoomType&&b.zoomContainer.css("overflow",
"hidden");"inner"!=b.options.zoomType&&(b.zoomLens=d("<div class='zoomLens' style='"+b.lensStyle+b.lensRound+"'>&nbsp;</div>").appendTo(b.zoomContainer).click(function(){b.$elem.trigger("click")}),b.options.tint&&(b.tintContainer=d("<div/>").addClass("tintContainer"),b.zoomTint=d("<div class='zoomTint' style='"+b.tintStyle+"'></div>"),b.zoomLens.wrap(b.tintContainer),b.zoomTintcss=b.zoomLens.after(b.zoomTint),b.zoomTintImage=d('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+
b.nzWidth+"px; height: "+b.nzHeight+'px;" src="'+b.imageSrc+'">').appendTo(b.zoomLens).click(function(){b.$elem.trigger("click")})));isNaN(b.options.zoomWindowPosition)?b.zoomWindow=d("<div style='z-index:999;left:"+b.windowOffsetLeft+"px;top:"+b.windowOffsetTop+"px;"+b.zoomWindowStyle+"' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function(){b.$elem.trigger("click")}):b.zoomWindow=d("<div style='z-index:999;left:"+b.windowOffsetLeft+"px;top:"+b.windowOffsetTop+"px;"+b.zoomWindowStyle+
"' class='zoomWindow'>&nbsp;</div>").appendTo(b.zoomContainer).click(function(){b.$elem.trigger("click")});b.zoomWindowContainer=d("<div/>").addClass("zoomWindowContainer").css("width",b.options.zoomWindowWidth);b.zoomWindow.wrap(b.zoomWindowContainer);"lens"==b.options.zoomType&&b.zoomLens.css({backgroundImage:"url('"+b.imageSrc+"')"});"window"==b.options.zoomType&&b.zoomWindow.css({backgroundImage:"url('"+b.imageSrc+"')"});"inner"==b.options.zoomType&&b.zoomWindow.css({backgroundImage:"url('"+b.imageSrc+
"')"});b.$elem.bind("touchmove",function(a){a.preventDefault();b.setPosition(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])});b.zoomContainer.bind("touchmove",function(a){"inner"==b.options.zoomType&&b.showHideWindow("show");a.preventDefault();b.setPosition(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])});b.zoomContainer.bind("touchend",function(a){b.showHideWindow("hide");b.options.showLens&&b.showHideLens("hide");b.options.tint&&"inner"!=b.options.zoomType&&b.showHideTint("hide")});
b.$elem.bind("touchend",function(a){b.showHideWindow("hide");b.options.showLens&&b.showHideLens("hide");b.options.tint&&"inner"!=b.options.zoomType&&b.showHideTint("hide")});b.options.showLens&&(b.zoomLens.bind("touchmove",function(a){a.preventDefault();b.setPosition(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])}),b.zoomLens.bind("touchend",function(a){b.showHideWindow("hide");b.options.showLens&&b.showHideLens("hide");b.options.tint&&"inner"!=b.options.zoomType&&b.showHideTint("hide")}));
b.$elem.bind("mousemove",function(a){!1==b.overWindow&&b.setElements("show");if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});b.zoomContainer.bind("mousemove",function(a){!1==b.overWindow&&b.setElements("show");if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});"inner"!=b.options.zoomType&&b.zoomLens.bind("mousemove",function(a){if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),
b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});b.options.tint&&"inner"!=b.options.zoomType&&b.zoomTint.bind("mousemove",function(a){if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});"inner"==b.options.zoomType&&b.zoomWindow.bind("mousemove",function(a){if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});b.zoomContainer.add(b.$elem).mouseenter(function(){!1==b.overWindow&&
b.setElements("show")}).mouseleave(function(){b.scrollLock||b.setElements("hide")});"inner"!=b.options.zoomType&&b.zoomWindow.mouseenter(function(){b.overWindow=!0;b.setElements("hide")}).mouseleave(function(){b.overWindow=!1});b.minZoomLevel=b.options.minZoomLevel?b.options.minZoomLevel:2*b.options.scrollZoomIncrement;b.options.scrollZoom&&b.zoomContainer.add(b.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll",function(a){b.scrollLock=!0;clearTimeout(d.data(this,"timer"));d.data(this,"timer",
setTimeout(function(){b.scrollLock=!1},250));var e=a.originalEvent.wheelDelta||-1*a.originalEvent.detail;a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();0<e/120?b.currentZoomLevel>=b.minZoomLevel&&b.changeZoomLevel(b.currentZoomLevel-b.options.scrollZoomIncrement):b.options.maxZoomLevel?b.currentZoomLevel<=b.options.maxZoomLevel&&b.changeZoomLevel(parseFloat(b.currentZoomLevel)+b.options.scrollZoomIncrement):b.changeZoomLevel(parseFloat(b.currentZoomLevel)+b.options.scrollZoomIncrement);
return!1})},setElements:function(b){if(!this.options.zoomEnabled)return!1;"show"==b&&this.isWindowSet&&("inner"==this.options.zoomType&&this.showHideWindow("show"),"window"==this.options.zoomType&&this.showHideWindow("show"),this.options.showLens&&this.showHideLens("show"),this.options.tint&&"inner"!=this.options.zoomType&&this.showHideTint("show"));"hide"==b&&("window"==this.options.zoomType&&this.showHideWindow("hide"),this.options.tint||this.showHideWindow("hide"),this.options.showLens&&this.showHideLens("hide"),
this.options.tint&&this.showHideTint("hide"))},setPosition:function(b){if(!this.options.zoomEnabled)return!1;this.nzHeight=this.$elem.height();this.nzWidth=this.$elem.width();this.nzOffset=this.$elem.offset();this.options.tint&&"inner"!=this.options.zoomType&&(this.zoomTint.css({top:0}),this.zoomTint.css({left:0}));this.options.responsive&&!this.options.scrollZoom&&this.options.showLens&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/
this.heightRatio),lensWidth=this.largeWidth<this.options.zoomWindowWidth?this.nzWidth:this.options.zoomWindowWidth/this.widthRatio,this.widthRatio=this.largeWidth/this.nzWidth,this.heightRatio=this.largeHeight/this.nzHeight,"lens"!=this.options.zoomType&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/this.heightRatio),lensWidth=this.options.zoomWindowWidth<this.options.zoomWindowWidth?this.nzWidth:this.options.zoomWindowWidth/
this.widthRatio,this.zoomLens.css("width",lensWidth),this.zoomLens.css("height",lensHeight),this.options.tint&&(this.zoomTintImage.css("width",this.nzWidth),this.zoomTintImage.css("height",this.nzHeight))),"lens"==this.options.zoomType&&this.zoomLens.css({width:String(this.options.lensSize)+"px",height:String(this.options.lensSize)+"px"}));this.zoomContainer.css({top:this.nzOffset.top});this.zoomContainer.css({left:this.nzOffset.left});this.mouseLeft=parseInt(b.pageX-this.nzOffset.left);this.mouseTop=
parseInt(b.pageY-this.nzOffset.top);"window"==this.options.zoomType&&(this.Etoppos=this.mouseTop<this.zoomLens.height()/2,this.Eboppos=this.mouseTop>this.nzHeight-this.zoomLens.height()/2-2*this.options.lensBorderSize,this.Eloppos=this.mouseLeft<0+this.zoomLens.width()/2,this.Eroppos=this.mouseLeft>this.nzWidth-this.zoomLens.width()/2-2*this.options.lensBorderSize);"inner"==this.options.zoomType&&(this.Etoppos=this.mouseTop<this.nzHeight/2/this.heightRatio,this.Eboppos=this.mouseTop>this.nzHeight-
this.nzHeight/2/this.heightRatio,this.Eloppos=this.mouseLeft<0+this.nzWidth/2/this.widthRatio,this.Eroppos=this.mouseLeft>this.nzWidth-this.nzWidth/2/this.widthRatio-2*this.options.lensBorderSize);0>=this.mouseLeft||0>this.mouseTop||this.mouseLeft>this.nzWidth||this.mouseTop>this.nzHeight?this.setElements("hide"):(this.options.showLens&&(this.lensLeftPos=String(this.mouseLeft-this.zoomLens.width()/2),this.lensTopPos=String(this.mouseTop-this.zoomLens.height()/2)),this.Etoppos&&(this.lensTopPos=0),
this.Eloppos&&(this.tintpos=this.lensLeftPos=this.windowLeftPos=0),"window"==this.options.zoomType&&(this.Eboppos&&(this.lensTopPos=Math.max(this.nzHeight-this.zoomLens.height()-2*this.options.lensBorderSize,0)),this.Eroppos&&(this.lensLeftPos=this.nzWidth-this.zoomLens.width()-2*this.options.lensBorderSize)),"inner"==this.options.zoomType&&(this.Eboppos&&(this.lensTopPos=Math.max(this.nzHeight-2*this.options.lensBorderSize,0)),this.Eroppos&&(this.lensLeftPos=this.nzWidth-this.nzWidth-2*this.options.lensBorderSize)),
"lens"==this.options.zoomType&&(this.windowLeftPos=String(-1*((b.pageX-this.nzOffset.left)*this.widthRatio-this.zoomLens.width()/2)),this.windowTopPos=String(-1*((b.pageY-this.nzOffset.top)*this.heightRatio-this.zoomLens.height()/2)),this.zoomLens.css({backgroundPosition:this.windowLeftPos+"px "+this.windowTopPos+"px"}),this.changeBgSize&&(this.nzHeight>this.nzWidth?("lens"==this.options.zoomType&&this.zoomLens.css({"background-size":this.largeWidth/this.newvalueheight+"px "+this.largeHeight/this.newvalueheight+
"px"}),this.zoomWindow.css({"background-size":this.largeWidth/this.newvalueheight+"px "+this.largeHeight/this.newvalueheight+"px"})):("lens"==this.options.zoomType&&this.zoomLens.css({"background-size":this.largeWidth/this.newvaluewidth+"px "+this.largeHeight/this.newvaluewidth+"px"}),this.zoomWindow.css({"background-size":this.largeWidth/this.newvaluewidth+"px "+this.largeHeight/this.newvaluewidth+"px"})),this.changeBgSize=!1),this.setWindowPostition(b)),this.options.tint&&"inner"!=this.options.zoomType&&
this.setTintPosition(b),"window"==this.options.zoomType&&this.setWindowPostition(b),"inner"==this.options.zoomType&&this.setWindowPostition(b),this.options.showLens&&(this.fullwidth&&"lens"!=this.options.zoomType&&(this.lensLeftPos=0),this.zoomLens.css({left:this.lensLeftPos+"px",top:this.lensTopPos+"px"})))},showHideWindow:function(b){"show"!=b||this.isWindowActive||(this.options.zoomWindowFadeIn?this.zoomWindow.stop(!0,!0,!1).fadeIn(this.options.zoomWindowFadeIn):this.zoomWindow.show(),this.isWindowActive=
!0);"hide"==b&&this.isWindowActive&&(this.options.zoomWindowFadeOut?this.zoomWindow.stop(!0,!0).fadeOut(this.options.zoomWindowFadeOut):this.zoomWindow.hide(),this.isWindowActive=!1)},showHideLens:function(b){"show"!=b||this.isLensActive||(this.options.lensFadeIn?this.zoomLens.stop(!0,!0,!1).fadeIn(this.options.lensFadeIn):this.zoomLens.show(),this.isLensActive=!0);"hide"==b&&this.isLensActive&&(this.options.lensFadeOut?this.zoomLens.stop(!0,!0).fadeOut(this.options.lensFadeOut):this.zoomLens.hide(),
this.isLensActive=!1)},showHideTint:function(b){"show"!=b||this.isTintActive||(this.options.zoomTintFadeIn?this.zoomTint.css({opacity:this.options.tintOpacity}).animate().stop(!0,!0).fadeIn("slow"):(this.zoomTint.css({opacity:this.options.tintOpacity}).animate(),this.zoomTint.show()),this.isTintActive=!0);"hide"==b&&this.isTintActive&&(this.options.zoomTintFadeOut?this.zoomTint.stop(!0,!0).fadeOut(this.options.zoomTintFadeOut):this.zoomTint.hide(),this.isTintActive=!1)},setLensPostition:function(b){},
setWindowPostition:function(b){var a=this;if(isNaN(a.options.zoomWindowPosition))a.externalContainer=d("#"+a.options.zoomWindowPosition),a.externalContainerWidth=a.externalContainer.width(),a.externalContainerHeight=a.externalContainer.height(),a.externalContainerOffset=a.externalContainer.offset(),a.windowOffsetTop=a.externalContainerOffset.top,a.windowOffsetLeft=a.externalContainerOffset.left;else switch(a.options.zoomWindowPosition){case 1:a.windowOffsetTop=a.options.zoomWindowOffety;a.windowOffsetLeft=
+a.nzWidth;break;case 2:a.options.zoomWindowHeight>a.nzHeight&&(a.windowOffsetTop=-1*(a.options.zoomWindowHeight/2-a.nzHeight/2),a.windowOffsetLeft=a.nzWidth);break;case 3:a.windowOffsetTop=a.nzHeight-a.zoomWindow.height()-2*a.options.borderSize;a.windowOffsetLeft=a.nzWidth;break;case 4:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=a.nzWidth;break;case 5:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=a.nzWidth-a.zoomWindow.width()-2*a.options.borderSize;break;case 6:a.options.zoomWindowHeight>
a.nzHeight&&(a.windowOffsetTop=a.nzHeight,a.windowOffsetLeft=-1*(a.options.zoomWindowWidth/2-a.nzWidth/2+2*a.options.borderSize));break;case 7:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=0;break;case 8:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 9:a.windowOffsetTop=a.nzHeight-a.zoomWindow.height()-2*a.options.borderSize;a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 10:a.options.zoomWindowHeight>a.nzHeight&&
(a.windowOffsetTop=-1*(a.options.zoomWindowHeight/2-a.nzHeight/2),a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize));break;case 11:a.windowOffsetTop=a.options.zoomWindowOffety;a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 12:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 13:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=
0;break;case 14:a.options.zoomWindowHeight>a.nzHeight&&(a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize),a.windowOffsetLeft=-1*(a.options.zoomWindowWidth/2-a.nzWidth/2+2*a.options.borderSize));break;case 15:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=a.nzWidth-a.zoomWindow.width()-2*a.options.borderSize;break;case 16:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=a.nzWidth;break;default:a.windowOffsetTop=
a.options.zoomWindowOffety,a.windowOffsetLeft=a.nzWidth}a.isWindowSet=!0;a.windowOffsetTop+=a.options.zoomWindowOffety;a.windowOffsetLeft+=a.options.zoomWindowOffetx;a.zoomWindow.css({top:a.windowOffsetTop});a.zoomWindow.css({left:a.windowOffsetLeft});"inner"==a.options.zoomType&&(a.zoomWindow.css({top:0}),a.zoomWindow.css({left:0}));a.windowLeftPos=String(-1*((b.pageX-a.nzOffset.left)*a.widthRatio-a.zoomWindow.width()/2));a.windowTopPos=String(-1*((b.pageY-a.nzOffset.top)*a.heightRatio-a.zoomWindow.height()/
2));a.Etoppos&&(a.windowTopPos=0);a.Eloppos&&(a.windowLeftPos=0);a.Eboppos&&(a.windowTopPos=-1*(a.largeHeight/a.currentZoomLevel-a.zoomWindow.height()));a.Eroppos&&(a.windowLeftPos=-1*(a.largeWidth/a.currentZoomLevel-a.zoomWindow.width()));a.fullheight&&(a.windowTopPos=0);a.fullwidth&&(a.windowLeftPos=0);if("window"==a.options.zoomType||"inner"==a.options.zoomType)1==a.zoomLock&&(1>=a.widthRatio&&(a.windowLeftPos=0),1>=a.heightRatio&&(a.windowTopPos=0)),a.largeHeight<a.options.zoomWindowHeight&&(a.windowTopPos=
0),a.largeWidth<a.options.zoomWindowWidth&&(a.windowLeftPos=0),a.options.easing?(a.xp||(a.xp=0),a.yp||(a.yp=0),a.loop||(a.loop=setInterval(function(){a.xp+=(a.windowLeftPos-a.xp)/a.options.easingAmount;a.yp+=(a.windowTopPos-a.yp)/a.options.easingAmount;a.scrollingLock?(clearInterval(a.loop),a.xp=a.windowLeftPos,a.yp=a.windowTopPos,a.xp=-1*((b.pageX-a.nzOffset.left)*a.widthRatio-a.zoomWindow.width()/2),a.yp=-1*((b.pageY-a.nzOffset.top)*a.heightRatio-a.zoomWindow.height()/2),a.changeBgSize&&(a.nzHeight>
a.nzWidth?("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"})):("lens"!=a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"})),
a.changeBgSize=!1),a.zoomWindow.css({backgroundPosition:a.windowLeftPos+"px "+a.windowTopPos+"px"}),a.scrollingLock=!1,a.loop=!1):(a.changeBgSize&&(a.nzHeight>a.nzWidth?("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"})):("lens"!=a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvaluewidth+
"px "+a.largeHeight/a.newvaluewidth+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"})),a.changeBgSize=!1),a.zoomWindow.css({backgroundPosition:a.xp+"px "+a.yp+"px"}))},16))):(a.changeBgSize&&(a.nzHeight>a.nzWidth?("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/
a.newvalueheight+"px"})):("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"}),a.largeHeight/a.newvaluewidth<a.options.zoomWindowHeight?a.zoomWindow.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"}):a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"})),a.changeBgSize=!1),a.zoomWindow.css({backgroundPosition:a.windowLeftPos+
"px "+a.windowTopPos+"px"}))},setTintPosition:function(b){this.nzOffset=this.$elem.offset();this.tintpos=String(-1*(b.pageX-this.nzOffset.left-this.zoomLens.width()/2));this.tintposy=String(-1*(b.pageY-this.nzOffset.top-this.zoomLens.height()/2));this.Etoppos&&(this.tintposy=0);this.Eloppos&&(this.tintpos=0);this.Eboppos&&(this.tintposy=-1*(this.nzHeight-this.zoomLens.height()-2*this.options.lensBorderSize));this.Eroppos&&(this.tintpos=-1*(this.nzWidth-this.zoomLens.width()-2*this.options.lensBorderSize));
this.options.tint&&(this.fullheight&&(this.tintposy=0),this.fullwidth&&(this.tintpos=0),this.zoomTintImage.css({left:this.tintpos+"px"}),this.zoomTintImage.css({top:this.tintposy+"px"}))},swaptheimage:function(b,a){var c=this,e=new Image;c.options.loadingIcon&&(c.spinner=d("<div style=\"background: url('"+c.options.loadingIcon+"') no-repeat center;height:"+c.nzHeight+"px;width:"+c.nzWidth+'px;z-index: 2000;position: absolute; background-position: center center;"></div>'),c.$elem.after(c.spinner));
c.options.onImageSwap(c.$elem);e.onload=function(){c.largeWidth=e.width;c.largeHeight=e.height;c.zoomImage=a;c.zoomWindow.css({"background-size":c.largeWidth+"px "+c.largeHeight+"px"});c.zoomWindow.css({"background-size":c.largeWidth+"px "+c.largeHeight+"px"});c.swapAction(b,a)};e.src=a},swapAction:function(b,a){var c=this,e=new Image;e.onload=function(){c.nzHeight=e.height;c.nzWidth=e.width;c.options.onImageSwapComplete(c.$elem);c.doneCallback()};e.src=b;c.currentZoomLevel=c.options.zoomLevel;c.options.maxZoomLevel=
!1;"lens"==c.options.zoomType&&c.zoomLens.css({backgroundImage:"url('"+a+"')"});"window"==c.options.zoomType&&c.zoomWindow.css({backgroundImage:"url('"+a+"')"});"inner"==c.options.zoomType&&c.zoomWindow.css({backgroundImage:"url('"+a+"')"});c.currentImage=a;if(c.options.imageCrossfade){var f=c.$elem,g=f.clone();c.$elem.attr("src",b);c.$elem.after(g);g.stop(!0).fadeOut(c.options.imageCrossfade,function(){d(this).remove()});c.$elem.width("auto").removeAttr("width");c.$elem.height("auto").removeAttr("height");
f.fadeIn(c.options.imageCrossfade);c.options.tint&&"inner"!=c.options.zoomType&&(f=c.zoomTintImage,g=f.clone(),c.zoomTintImage.attr("src",a),c.zoomTintImage.after(g),g.stop(!0).fadeOut(c.options.imageCrossfade,function(){d(this).remove()}),f.fadeIn(c.options.imageCrossfade),c.zoomTint.css({height:c.$elem.height()}),c.zoomTint.css({width:c.$elem.width()}));c.zoomContainer.css("height",c.$elem.height());c.zoomContainer.css("width",c.$elem.width());"inner"!=c.options.zoomType||c.options.constrainType||
(c.zoomWrap.parent().css("height",c.$elem.height()),c.zoomWrap.parent().css("width",c.$elem.width()),c.zoomWindow.css("height",c.$elem.height()),c.zoomWindow.css("width",c.$elem.width()))}else c.$elem.attr("src",b),c.options.tint&&(c.zoomTintImage.attr("src",a),c.zoomTintImage.attr("height",c.$elem.height()),c.zoomTintImage.css({height:c.$elem.height()}),c.zoomTint.css({height:c.$elem.height()})),c.zoomContainer.css("height",c.$elem.height()),c.zoomContainer.css("width",c.$elem.width());c.options.imageCrossfade&&
(c.zoomWrap.css("height",c.$elem.height()),c.zoomWrap.css("width",c.$elem.width()));c.options.constrainType&&("height"==c.options.constrainType&&(c.zoomContainer.css("height",c.options.constrainSize),c.zoomContainer.css("width","auto"),c.options.imageCrossfade?(c.zoomWrap.css("height",c.options.constrainSize),c.zoomWrap.css("width","auto"),c.constwidth=c.zoomWrap.width()):(c.$elem.css("height",c.options.constrainSize),c.$elem.css("width","auto"),c.constwidth=c.$elem.width()),"inner"==c.options.zoomType&&
(c.zoomWrap.parent().css("height",c.options.constrainSize),c.zoomWrap.parent().css("width",c.constwidth),c.zoomWindow.css("height",c.options.constrainSize),c.zoomWindow.css("width",c.constwidth)),c.options.tint&&(c.tintContainer.css("height",c.options.constrainSize),c.tintContainer.css("width",c.constwidth),c.zoomTint.css("height",c.options.constrainSize),c.zoomTint.css("width",c.constwidth),c.zoomTintImage.css("height",c.options.constrainSize),c.zoomTintImage.css("width",c.constwidth))),"width"==
c.options.constrainType&&(c.zoomContainer.css("height","auto"),c.zoomContainer.css("width",c.options.constrainSize),c.options.imageCrossfade?(c.zoomWrap.css("height","auto"),c.zoomWrap.css("width",c.options.constrainSize),c.constheight=c.zoomWrap.height()):(c.$elem.css("height","auto"),c.$elem.css("width",c.options.constrainSize),c.constheight=c.$elem.height()),"inner"==c.options.zoomType&&(c.zoomWrap.parent().css("height",c.constheight),c.zoomWrap.parent().css("width",c.options.constrainSize),c.zoomWindow.css("height",
c.constheight),c.zoomWindow.css("width",c.options.constrainSize)),c.options.tint&&(c.tintContainer.css("height",c.constheight),c.tintContainer.css("width",c.options.constrainSize),c.zoomTint.css("height",c.constheight),c.zoomTint.css("width",c.options.constrainSize),c.zoomTintImage.css("height",c.constheight),c.zoomTintImage.css("width",c.options.constrainSize))))},doneCallback:function(){this.options.loadingIcon&&this.spinner.hide();this.nzOffset=this.$elem.offset();this.nzWidth=this.$elem.width();
this.nzHeight=this.$elem.height();this.currentZoomLevel=this.options.zoomLevel;this.widthRatio=this.largeWidth/this.nzWidth;this.heightRatio=this.largeHeight/this.nzHeight;"window"==this.options.zoomType&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/this.heightRatio),lensWidth=this.options.zoomWindowWidth<this.options.zoomWindowWidth?this.nzWidth:this.options.zoomWindowWidth/this.widthRatio,this.zoomLens&&(this.zoomLens.css("width",
lensWidth),this.zoomLens.css("height",lensHeight)))},getCurrentImage:function(){return this.zoomImage},getGalleryList:function(){var b=this;b.gallerylist=[];b.options.gallery?d("#"+b.options.gallery+" a").each(function(){var a="";d(this).data("zoom-image")?a=d(this).data("zoom-image"):d(this).data("image")&&(a=d(this).data("image"));a==b.zoomImage?b.gallerylist.unshift({href:""+a+"",title:d(this).find("img").attr("title")}):b.gallerylist.push({href:""+a+"",title:d(this).find("img").attr("title")})}):
b.gallerylist.push({href:""+b.zoomImage+"",title:d(this).find("img").attr("title")});return b.gallerylist},changeZoomLevel:function(b){this.scrollingLock=!0;this.newvalue=parseFloat(b).toFixed(2);newvalue=parseFloat(b).toFixed(2);maxheightnewvalue=this.largeHeight/(this.options.zoomWindowHeight/this.nzHeight*this.nzHeight);maxwidthtnewvalue=this.largeWidth/(this.options.zoomWindowWidth/this.nzWidth*this.nzWidth);"inner"!=this.options.zoomType&&(maxheightnewvalue<=newvalue?(this.heightRatio=this.largeHeight/
maxheightnewvalue/this.nzHeight,this.newvalueheight=maxheightnewvalue,this.fullheight=!0):(this.heightRatio=this.largeHeight/newvalue/this.nzHeight,this.newvalueheight=newvalue,this.fullheight=!1),maxwidthtnewvalue<=newvalue?(this.widthRatio=this.largeWidth/maxwidthtnewvalue/this.nzWidth,this.newvaluewidth=maxwidthtnewvalue,this.fullwidth=!0):(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=newvalue,this.fullwidth=!1),"lens"==this.options.zoomType&&(maxheightnewvalue<=newvalue?
(this.fullwidth=!0,this.newvaluewidth=maxheightnewvalue):(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=newvalue,this.fullwidth=!1)));"inner"==this.options.zoomType&&(maxheightnewvalue=parseFloat(this.largeHeight/this.nzHeight).toFixed(2),maxwidthtnewvalue=parseFloat(this.largeWidth/this.nzWidth).toFixed(2),newvalue>maxheightnewvalue&&(newvalue=maxheightnewvalue),newvalue>maxwidthtnewvalue&&(newvalue=maxwidthtnewvalue),maxheightnewvalue<=newvalue?(this.heightRatio=this.largeHeight/
newvalue/this.nzHeight,this.newvalueheight=newvalue>maxheightnewvalue?maxheightnewvalue:newvalue,this.fullheight=!0):(this.heightRatio=this.largeHeight/newvalue/this.nzHeight,this.newvalueheight=newvalue>maxheightnewvalue?maxheightnewvalue:newvalue,this.fullheight=!1),maxwidthtnewvalue<=newvalue?(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=newvalue>maxwidthtnewvalue?maxwidthtnewvalue:newvalue,this.fullwidth=!0):(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=
newvalue,this.fullwidth=!1));scrcontinue=!1;"inner"==this.options.zoomType&&(this.nzWidth>this.nzHeight&&(this.newvaluewidth<=maxwidthtnewvalue?scrcontinue=!0:(scrcontinue=!1,this.fullwidth=this.fullheight=!0)),this.nzHeight>this.nzWidth&&(this.newvaluewidth<=maxwidthtnewvalue?scrcontinue=!0:(scrcontinue=!1,this.fullwidth=this.fullheight=!0)));"inner"!=this.options.zoomType&&(scrcontinue=!0);scrcontinue&&(this.zoomLock=0,this.changeZoom=!0,this.options.zoomWindowHeight/this.heightRatio<=this.nzHeight&&
(this.currentZoomLevel=this.newvalueheight,"lens"!=this.options.zoomType&&"inner"!=this.options.zoomType&&(this.changeBgSize=!0,this.zoomLens.css({height:String(this.options.zoomWindowHeight/this.heightRatio)+"px"})),"lens"==this.options.zoomType||"inner"==this.options.zoomType)&&(this.changeBgSize=!0),this.options.zoomWindowWidth/this.widthRatio<=this.nzWidth&&("inner"!=this.options.zoomType&&this.newvaluewidth>this.newvalueheight&&(this.currentZoomLevel=this.newvaluewidth),"lens"!=this.options.zoomType&&
"inner"!=this.options.zoomType&&(this.changeBgSize=!0,this.zoomLens.css({width:String(this.options.zoomWindowWidth/this.widthRatio)+"px"})),"lens"==this.options.zoomType||"inner"==this.options.zoomType)&&(this.changeBgSize=!0),"inner"==this.options.zoomType&&(this.changeBgSize=!0,this.nzWidth>this.nzHeight&&(this.currentZoomLevel=this.newvaluewidth),this.nzHeight>this.nzWidth&&(this.currentZoomLevel=this.newvaluewidth)));this.setPosition(this.currentLoc)},closeAll:function(){self.zoomWindow&&self.zoomWindow.hide();
self.zoomLens&&self.zoomLens.hide();self.zoomTint&&self.zoomTint.hide()},changeState:function(b){"enable"==b&&(this.options.zoomEnabled=!0);"disable"==b&&(this.options.zoomEnabled=!1)}};d.fn.elevateZoom=function(b){return this.each(function(){var a=Object.create(k);a.init(b,this);d.data(this,"elevateZoom",a)})};d.fn.elevateZoom.options={zoomActivation:"hover",zoomEnabled:!0,preloading:1,zoomLevel:1,scrollZoom:!1,scrollZoomIncrement:0.1,minZoomLevel:!1,maxZoomLevel:!1,easing:!1,easingAmount:12,lensSize:200,
zoomWindowWidth:400,zoomWindowHeight:400,zoomWindowOffetx:0,zoomWindowOffety:0,zoomWindowPosition:1,zoomWindowBgColour:"#fff",lensFadeIn:!1,lensFadeOut:!1,debug:!1,zoomWindowFadeIn:!1,zoomWindowFadeOut:!1,zoomWindowAlwaysShow:!1,zoomTintFadeIn:!1,zoomTintFadeOut:!1,borderSize:4,showLens:!0,borderColour:"#888",lensBorderSize:1,lensBorderColour:"#000",lensShape:"square",zoomType:"window",containLensZoom:!1,lensColour:"white",lensOpacity:0.4,lenszoom:!1,tint:!1,tintColour:"#333",tintOpacity:0.4,gallery:!1,
galleryActiveClass:"zoomGalleryActive",imageCrossfade:!1,constrainType:!1,constrainSize:!1,loadingIcon:!1,cursor:"default",responsive:!0,onComplete:d.noop,onZoomedImageLoaded:function(){},onImageSwap:d.noop,onImageSwapComplete:d.noop}})(jQuery,window,document);
/*
 *	jQuery elevateZoom 3.0.8
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 *

/*
 *	jQuery elevateZoom 3.0.3
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

(function( $, window, document, undefined ) {
	var ElevateZoom = {
			init: function( options, elem ) {
				var self = this;

				self.elem = elem;
				self.$elem = $( elem );

				self.imageSrc = self.$elem.data("zoom-image") ? self.$elem.data("zoom-image") : self.$elem.attr("src");

				self.options = $.extend( {}, $.fn.elevateZoom.options, options );

				//TINT OVERRIDE SETTINGS
				if(self.options.tint) {
					self.options.lensColour = "none", //colour of the lens background
					self.options.lensOpacity =  "1" //opacity of the lens
				}
				//INNER OVERRIDE SETTINGS
				if(self.options.zoomType == "inner") {self.options.showLens = false;}


				//Remove alt on hover

				self.$elem.parent().removeAttr('title').removeAttr('alt');

				self.zoomImage = self.imageSrc;

				self.refresh( 1 );



				//Create the image swap from the gallery 
				$('#'+self.options.gallery + ' a').click( function(e) { 

					//Set a class on the currently active gallery image
					if(self.options.galleryActiveClass){
						$('#'+self.options.gallery + ' a').removeClass(self.options.galleryActiveClass);
						$(this).addClass(self.options.galleryActiveClass);
					}
					//stop any link on the a tag from working
					e.preventDefault();

					//call the swap image function            
					if($(this).data("zoom-image")){self.zoomImagePre = $(this).data("zoom-image")}
					else{self.zoomImagePre = $(this).data("image");}
					self.swaptheimage($(this).data("image"), self.zoomImagePre);
					return false;
				});

			},

			refresh: function( length ) {
				var self = this;

				setTimeout(function() {
					self.fetch(self.imageSrc);

				}, length || self.options.refresh );
			},

			fetch: function(imgsrc) {
				//get the image
				var self = this;
				var newImg = new Image();
				newImg.onload = function() {
					//set the large image dimensions - used to calculte ratio's
					self.largeWidth = newImg.width;
					self.largeHeight = newImg.height;
					//once image is loaded start the calls
					self.startZoom();
					self.currentImage = self.imageSrc;
					//let caller know image has been loaded
					self.options.onZoomedImageLoaded(self.$elem);
				}
				newImg.src = imgsrc; // this must be done AFTER setting onload

				return;

			},

			startZoom: function( ) {
				var self = this;
				//get dimensions of the non zoomed image
				self.nzWidth = self.$elem.width();
				self.nzHeight = self.$elem.height();

				//activated elements
				self.isWindowActive = false;
				self.isLensActive = false;
				self.isTintActive = false;
				self.overWindow = false;    

				//CrossFade Wrappe
				if(self.options.imageCrossfade){
					self.zoomWrap = self.$elem.wrap('<div style="height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;" class="zoomWrapper" />');        
					self.$elem.css('position', 'absolute'); 
				}

				self.zoomLock = 1;
				self.scrollingLock = false;
				self.changeBgSize = false;
				self.currentZoomLevel = self.options.zoomLevel;


				//get offset of the non zoomed image
				self.nzOffset = self.$elem.offset();
				//calculate the width ratio of the large/small image
				self.widthRatio = (self.largeWidth/self.currentZoomLevel) / self.nzWidth;
				self.heightRatio = (self.largeHeight/self.currentZoomLevel) / self.nzHeight; 


				//if window zoom        
				if(self.options.zoomType == "window") {
					self.zoomWindowStyle = "overflow: hidden;"
						+ "background-position: 0px 0px;text-align:center;"  
						+ "background-color: " + String(self.options.zoomWindowBgColour)            
						+ ";width: " + String(self.options.zoomWindowWidth) + "px;"
						+ "height: " + String(self.options.zoomWindowHeight)
						+ "px;float: left;"
						+ "background-size: "+ self.largeWidth/self.currentZoomLevel+ "px " +self.largeHeight/self.currentZoomLevel + "px;"
						+ "display: none;z-index:100;"
						+ "border: " + String(self.options.borderSize) 
						+ "px solid " + self.options.borderColour 
						+ ";background-repeat: no-repeat;"
						+ "position: absolute;";
				}    


				//if inner  zoom    
				if(self.options.zoomType == "inner") {
					//has a border been put on the image? Lets cater for this

					var borderWidth = self.$elem.css("border-left-width");

					self.zoomWindowStyle = "overflow: hidden;"
						+ "margin-left: " + String(borderWidth) + ";" 
						+ "margin-top: " + String(borderWidth) + ";"         
						+ "background-position: 0px 0px;"
						+ "width: " + String(self.nzWidth) + "px;"
						+ "height: " + String(self.nzHeight) + "px;"
						+ "px;float: left;"
						+ "display: none;"
						+ "cursor:"+(self.options.cursor)+";"
						+ "px solid " + self.options.borderColour 
						+ ";background-repeat: no-repeat;"
						+ "position: absolute;";
				}    



				//lens style for window zoom
				if(self.options.zoomType == "window") {


					// adjust images less than the window height

					if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
						lensHeight = self.nzHeight;              
					}
					else{
						lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
					}
					if(self.largeWidth < self.options.zoomWindowWidth){
						lensWidth = self.nzWidth;
					}       
					else{
						lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
					}


					self.lensStyle = "background-position: 0px 0px;width: " + String((self.options.zoomWindowWidth)/self.widthRatio) + "px;height: " + String((self.options.zoomWindowHeight)/self.heightRatio)
					+ "px;float: right;display: none;"
					+ "overflow: hidden;"
					+ "z-index: 999;"   
					+ "-webkit-transform: translateZ(0);"               
					+ "opacity:"+(self.options.lensOpacity)+";filter: alpha(opacity = "+(self.options.lensOpacity*100)+"); zoom:1;"
					+ "width:"+lensWidth+"px;"
					+ "height:"+lensHeight+"px;"
					+ "background-color:"+(self.options.lensColour)+";"					
					+ "cursor:"+(self.options.cursor)+";"
					+ "border: "+(self.options.lensBorderSize)+"px" +
					" solid "+(self.options.lensBorderColour)+";background-repeat: no-repeat;position: absolute;";
				} 


				//tint style
				self.tintStyle = "display: block;"
					+ "position: absolute;"
					+ "background-color: "+self.options.tintColour+";"	
					+ "filter:alpha(opacity=0);"		
					+ "opacity: 0;"	
					+ "width: " + self.nzWidth + "px;"
					+ "height: " + self.nzHeight + "px;"

					;

				//lens style for lens zoom with optional round for modern browsers
				self.lensRound = '';

				if(self.options.zoomType == "lens") {

					self.lensStyle = "background-position: 0px 0px;"
						+ "float: left;display: none;"
						+ "border: " + String(self.options.borderSize) + "px solid " + self.options.borderColour+";"
						+ "width:"+ String(self.options.lensSize) +"px;"
						+ "height:"+ String(self.options.lensSize)+"px;"
						+ "background-repeat: no-repeat;position: absolute;";


				}


				//does not round in all browsers
				if(self.options.lensShape == "round") {
					self.lensRound = "border-top-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-top-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-bottom-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-bottom-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;";

				}

				//create the div's                                                + ""
				//self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});

				self.zoomContainer = $('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+self.nzOffset.left+'px;top:'+self.nzOffset.top+'px;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;"></div>');
				$('body').append(self.zoomContainer);	


				//this will add overflow hidden and contrain the lens on lens mode       
				if(self.options.containLensZoom && self.options.zoomType == "lens"){
					self.zoomContainer.css("overflow", "hidden");
				}
				if(self.options.zoomType != "inner") {
					self.zoomLens = $("<div class='zoomLens' style='" + self.lensStyle + self.lensRound +"'>&nbsp;</div>")
					.appendTo(self.zoomContainer)
					.click(function () {
						self.$elem.trigger('click');
					});


					if(self.options.tint) {
						self.tintContainer = $('<div/>').addClass('tintContainer');	
						self.zoomTint = $("<div class='zoomTint' style='"+self.tintStyle+"'></div>");


						self.zoomLens.wrap(self.tintContainer);


						self.zoomTintcss = self.zoomLens.after(self.zoomTint);	

						//if tint enabled - set an image to show over the tint

						self.zoomTintImage = $('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+self.nzWidth+'px; height: '+self.nzHeight+'px;" src="'+self.imageSrc+'">')
						.appendTo(self.zoomLens)
						.click(function () {

							self.$elem.trigger('click');
						});

					}          

				}







				//create zoom window 
				if(isNaN(self.options.zoomWindowPosition)){
					self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
					.appendTo('body')
					.click(function () {
						self.$elem.trigger('click');
					});
				}else{
					self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
					.appendTo(self.zoomContainer)
					.click(function () {
						self.$elem.trigger('click');
					});
				}              
				self.zoomWindowContainer = $('<div/>').addClass('zoomWindowContainer').css("width",self.options.zoomWindowWidth);
				self.zoomWindow.wrap(self.zoomWindowContainer);


				//  self.captionStyle = "text-align: left;background-color: black;color: white;font-weight: bold;padding: 10px;font-family: sans-serif;font-size: 11px";                                                                                                                                                                                                                                          
				// self.zoomCaption = $('<div class="elevatezoom-caption" style="'+self.captionStyle+'display: block; width: 280px;">INSERT ALT TAG</div>').appendTo(self.zoomWindow.parent());

				if(self.options.zoomType == "lens") {
					self.zoomLens.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				if(self.options.zoomType == "window") {
					self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				/*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/
				//touch events
				self.$elem.bind('touchmove', function(e){    
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
					self.setPosition(touch);

				});  
				self.zoomContainer.bind('touchmove', function(e){ 
					if(self.options.zoomType == "inner") {
						self.showHideWindow("show");

					}
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
					self.setPosition(touch); 

				});  	
				self.zoomContainer.bind('touchend', function(e){ 
					self.showHideWindow("hide");
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
				});  	

				self.$elem.bind('touchend', function(e){ 
					self.showHideWindow("hide");
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
				});  	
				if(self.options.showLens) {
					self.zoomLens.bind('touchmove', function(e){ 

						e.preventDefault();
						var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
						self.setPosition(touch); 
					});    


					self.zoomLens.bind('touchend', function(e){ 
						self.showHideWindow("hide");
						if(self.options.showLens) {self.showHideLens("hide");}
						if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
					});  
				}
				//Needed to work in IE
				self.$elem.bind('mousemove', function(e){   
					if(self.overWindow == false){self.setElements("show");}
					//make sure on orientation change the setposition is not fired
					if(self.lastX !== e.clientX || self.lastY !== e.clientY){
						self.setPosition(e);
						self.currentLoc = e;
					}   
					self.lastX = e.clientX;
					self.lastY = e.clientY;    

				});  	

				self.zoomContainer.bind('mousemove', function(e){ 

					if(self.overWindow == false){self.setElements("show");} 

					//make sure on orientation change the setposition is not fired 
					if(self.lastX !== e.clientX || self.lastY !== e.clientY){
						self.setPosition(e);
						self.currentLoc = e;
					}   
					self.lastX = e.clientX;
					self.lastY = e.clientY;    
				});  	
				if(self.options.zoomType != "inner") {
					self.zoomLens.bind('mousemove', function(e){      
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});
				}
				if(self.options.tint && self.options.zoomType != "inner") {
					self.zoomTint.bind('mousemove', function(e){ 
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});

				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.bind('mousemove', function(e) {
						//self.overWindow = true;
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});

				}


				//  lensFadeOut: 500,  zoomTintFadeIn
				self.zoomContainer.add(self.$elem).mouseenter(function(){

					if(self.overWindow == false){self.setElements("show");} 


				}).mouseleave(function(){
					if(!self.scrollLock){
						self.setElements("hide");
            self.options.onDestroy(self.$elem);
					}
				});
				//end ove image





				if(self.options.zoomType != "inner") {
					self.zoomWindow.mouseenter(function(){
						self.overWindow = true;   
						self.setElements("hide");                  
					}).mouseleave(function(){

						self.overWindow = false;
					});
				}
				//end ove image



//				var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);

				//      $(this).empty();    
				//    return false;

				//fix for initial zoom setting
				if (self.options.zoomLevel != 1){
					//	self.changeZoomLevel(self.currentZoomLevel);
				}
				//set the min zoomlevel
				if(self.options.minZoomLevel){
					self.minZoomLevel = self.options.minZoomLevel;
				}
				else{
					self.minZoomLevel = self.options.scrollZoomIncrement * 2;
				}


				if(self.options.scrollZoom){


					self.zoomContainer.add(self.$elem).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e){


//						in IE there is issue with firing of mouseleave - So check whether still scrolling
//						and on mouseleave check if scrolllock          
						self.scrollLock = true;
						clearTimeout($.data(this, 'timer'));
						$.data(this, 'timer', setTimeout(function() {
							self.scrollLock = false;
							//do something
						}, 250));

						var theEvent = e.originalEvent.wheelDelta || e.originalEvent.detail*-1


						//this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
						//   e.preventDefault();


						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();


						if(theEvent /120 > 0) {
							//scrolling up
							if(self.currentZoomLevel >= self.minZoomLevel){ 
								self.changeZoomLevel(self.currentZoomLevel-self.options.scrollZoomIncrement);        
							}

						}
						else{
							//scrolling down


							if(self.options.maxZoomLevel){
								if(self.currentZoomLevel <= self.options.maxZoomLevel){           
									self.changeZoomLevel(parseFloat(self.currentZoomLevel)+self.options.scrollZoomIncrement);
								}
							}
							else{
								//andy 

								self.changeZoomLevel(parseFloat(self.currentZoomLevel)+self.options.scrollZoomIncrement);
							}

						}
						return false;
					});
				}


			},
			setElements: function(type) {
				var self = this;
        if(!self.options.zoomEnabled){return false;}
				if(type=="show"){
					if(self.isWindowSet){
						if(self.options.zoomType == "inner") {self.showHideWindow("show");}
						if(self.options.zoomType == "window") {self.showHideWindow("show");}
						if(self.options.showLens) {self.showHideLens("show");}
						if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("show");
						}
					}
				}

				if(type=="hide"){
					if(self.options.zoomType == "window") {self.showHideWindow("hide");}
					if(!self.options.tint) {self.showHideWindow("hide");}
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint) {	self.showHideTint("hide");}
				}   
			},
			setPosition: function(e) {
      
				var self = this;
        
        if(!self.options.zoomEnabled){return false;}

				//recaclc offset each time in case the image moves
				//this can be caused by other on page elements
				self.nzHeight = self.$elem.height();
				self.nzWidth = self.$elem.width();
				self.nzOffset = self.$elem.offset();

				if(self.options.tint && self.options.zoomType != "inner") {
					self.zoomTint.css({ top: 0});
					self.zoomTint.css({ left: 0});
				}
				//set responsive       
				//will checking if the image needs changing before running this code work faster?
				if(self.options.responsive && !self.options.scrollZoom){
					if(self.options.showLens){ 
						if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
							lensHeight = self.nzHeight;              
						}
						else{
							lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
						}
						if(self.largeWidth < self.options.zoomWindowWidth){
							lensWidth = self.nzWidth;
						}       
						else{
							lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
						}
						self.widthRatio = self.largeWidth / self.nzWidth;
						self.heightRatio = self.largeHeight / self.nzHeight;        
						if(self.options.zoomType != "lens") {


							//possibly dont need to keep recalcalculating
							//if the lens is heigher than the image, then set lens size to image size
							if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
								lensHeight = self.nzHeight;  

							}
							else{
								lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
							}

							if(self.nzWidth < self.options.zoomWindowHeight/self.heightRatio){
								lensWidth = self.nzWidth;
							}       
							else{
								lensWidth =  String((self.options.zoomWindowWidth/self.widthRatio));
							}            

							self.zoomLens.css('width', lensWidth);    
							self.zoomLens.css('height', lensHeight); 

							if(self.options.tint){    
								self.zoomTintImage.css('width', self.nzWidth);    
								self.zoomTintImage.css('height', self.nzHeight); 
							}

						}                     
						if(self.options.zoomType == "lens") {  

							self.zoomLens.css({ width: String(self.options.lensSize) + 'px', height: String(self.options.lensSize) + 'px' })      


						}        
						//end responsive image change
					}
				}

				//container fix
				self.zoomContainer.css({ top: self.nzOffset.top});
				self.zoomContainer.css({ left: self.nzOffset.left});
				self.mouseLeft = parseInt(e.pageX - self.nzOffset.left);
				self.mouseTop = parseInt(e.pageY - self.nzOffset.top);
				//calculate the Location of the Lens

				//calculate the bound regions - but only if zoom window
				if(self.options.zoomType == "window") {
					self.Etoppos = (self.mouseTop < (self.zoomLens.height()/2));
					self.Eboppos = (self.mouseTop > self.nzHeight - (self.zoomLens.height()/2)-(self.options.lensBorderSize*2));
					self.Eloppos = (self.mouseLeft < 0+((self.zoomLens.width()/2))); 
					self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.zoomLens.width()/2)-(self.options.lensBorderSize*2)));  
				}
				//calculate the bound regions - but only for inner zoom
				if(self.options.zoomType == "inner"){ 
					self.Etoppos = (self.mouseTop < ((self.nzHeight/2)/self.heightRatio) );
					self.Eboppos = (self.mouseTop > (self.nzHeight - ((self.nzHeight/2)/self.heightRatio)));
					self.Eloppos = (self.mouseLeft < 0+(((self.nzWidth/2)/self.widthRatio)));
					self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.nzWidth/2)/self.widthRatio-(self.options.lensBorderSize*2)));  
				}

				// if the mouse position of the slider is one of the outerbounds, then hide  window and lens
				if (self.mouseLeft < 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight ) {				          
					self.setElements("hide");
					return;
				}
				//else continue with operations
				else {


					//lens options
					if(self.options.showLens) {
						//		self.showHideLens("show");
						//set background position of lens
						self.lensLeftPos = String(Math.floor(self.mouseLeft - self.zoomLens.width() / 2));
						self.lensTopPos = String(Math.floor(self.mouseTop - self.zoomLens.height() / 2));


					}
					//adjust the background position if the mouse is in one of the outer regions 

					//Top region
					if(self.Etoppos){
						self.lensTopPos = 0;
					}
					//Left Region
					if(self.Eloppos){
						self.windowLeftPos = 0;
						self.lensLeftPos = 0;
						self.tintpos=0;
					}     
					//Set bottom and right region for window mode
					if(self.options.zoomType == "window") {
						if(self.Eboppos){
							self.lensTopPos = Math.max( (self.nzHeight)-self.zoomLens.height()-(self.options.lensBorderSize*2), 0 );
						} 
						if(self.Eroppos){
							self.lensLeftPos = (self.nzWidth-(self.zoomLens.width())-(self.options.lensBorderSize*2));
						}  
					}  
					//Set bottom and right region for inner mode
					if(self.options.zoomType == "inner") {
						if(self.Eboppos){
							self.lensTopPos = Math.max( ((self.nzHeight)-(self.options.lensBorderSize*2)), 0 );
						} 
						if(self.Eroppos){
							self.lensLeftPos = (self.nzWidth-(self.nzWidth)-(self.options.lensBorderSize*2));
						}  

					}
					//if lens zoom
					if(self.options.zoomType == "lens") {  
						self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * (-1));   
						self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * (-1));

						self.zoomLens.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });

						if(self.changeBgSize){  

							if(self.nzHeight>self.nzWidth){  
								if(self.options.zoomType == "lens"){       
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
								}   

								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
							}
							else{     
								if(self.options.zoomType == "lens"){       
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
								}   
								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
							}
							self.changeBgSize = false;
						}    

						self.setWindowPostition(e);  
					}
					//if tint zoom   
					if(self.options.tint && self.options.zoomType != "inner") {
						self.setTintPosition(e);

					}
					//set the css background position 
					if(self.options.zoomType == "window") {
						self.setWindowPostition(e);   
					}
					if(self.options.zoomType == "inner") {
						self.setWindowPostition(e);   
					}
					if(self.options.showLens) {

						if(self.fullwidth && self.options.zoomType != "lens"){
							self.lensLeftPos = 0;

						}
						self.zoomLens.css({ left: self.lensLeftPos + 'px', top: self.lensTopPos + 'px' })  
					}

				} //end else



			},
			showHideWindow: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isWindowActive){
						if(self.options.zoomWindowFadeIn){
							self.zoomWindow.stop(true, true, false).fadeIn(self.options.zoomWindowFadeIn);
						}
						else{self.zoomWindow.show();}
						self.isWindowActive = true;
					}            
				}
				if(change == "hide"){
					if(self.isWindowActive){
						if(self.options.zoomWindowFadeOut){
							self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut, function () {
								if (self.loop) {
									//stop moving the zoom window when zoom window is faded out
									clearInterval(self.loop);
									self.loop = false;
								}
							});
						}
						else{self.zoomWindow.hide();}
						self.isWindowActive = false;        
					}      
				}
			},
			showHideLens: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isLensActive){
						if(self.options.lensFadeIn){
							self.zoomLens.stop(true, true, false).fadeIn(self.options.lensFadeIn);
						}
						else{self.zoomLens.show();}
						self.isLensActive = true;
					}            
				}
				if(change == "hide"){
					if(self.isLensActive){
						if(self.options.lensFadeOut){
							self.zoomLens.stop(true, true).fadeOut(self.options.lensFadeOut);
						}
						else{self.zoomLens.hide();}
						self.isLensActive = false;        
					}      
				}
			},
			showHideTint: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isTintActive){

						if(self.options.zoomTintFadeIn){
							self.zoomTint.css({opacity:self.options.tintOpacity}).animate().stop(true, true).fadeIn("slow");
						}
						else{
							self.zoomTint.css({opacity:self.options.tintOpacity}).animate();
							self.zoomTint.show();


						}
						self.isTintActive = true;
					}            
				}
				if(change == "hide"){      
					if(self.isTintActive){ 

						if(self.options.zoomTintFadeOut){
							self.zoomTint.stop(true, true).fadeOut(self.options.zoomTintFadeOut);
						}
						else{self.zoomTint.hide();}
						self.isTintActive = false;        
					}      
				}
			},
			setLensPostition: function( e ) {


			},
			setWindowPostition: function( e ) {
				//return obj.slice( 0, count );
				var self = this;

				if(!isNaN(self.options.zoomWindowPosition)){

					switch (self.options.zoomWindowPosition) { 
					case 1: //done         
						self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
						self.windowOffsetLeft =(+self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;
					case 2:
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

							self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
							self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						}
						else{ //negative margin

						}
						break;
					case 3: //done        
						self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;      
					case 4: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;
					case 5: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
						break;
					case 6: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
							self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8

							self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);  
						}
						else{ //negative margin

						}


						break;
					case 7: //done  
						self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8
						self.windowOffsetLeft = 0; //DONE 7, 13
						break;
					case 8: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 9:  //done  
						self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 10: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

							self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
							self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						}
						else{ //negative margin

						}
						break;
					case 11: 
						self.windowOffsetTop = (self.options.zoomWindowOffety);
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 12: //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 13: //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(0); //DONE 7, 13
						break;
					case 14: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
							self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16

							self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);  
						}
						else{ //negative margin

						}

						break;
					case 15://done   
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
						break;
					case 16:  //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;            
					default: //done  
						self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
					self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
					} 
				} //end isNAN
				else{
					//WE CAN POSITION IN A CLASS - ASSUME THAT ANY STRING PASSED IS
					self.externalContainer = $('#'+self.options.zoomWindowPosition);
					self.externalContainerWidth = self.externalContainer.width();
					self.externalContainerHeight = self.externalContainer.height();
					self.externalContainerOffset = self.externalContainer.offset();

					self.windowOffsetTop = self.externalContainerOffset.top;//DONE - 1
					self.windowOffsetLeft =self.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16

				}
				self.isWindowSet = true;
				self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffety;
				self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffetx;

				self.zoomWindow.css({ top: self.windowOffsetTop});
				self.zoomWindow.css({ left: self.windowOffsetLeft});

				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ top: 0});
					self.zoomWindow.css({ left: 0});

				}   


				self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1));   
				self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));
				if(self.Etoppos){self.windowTopPos = 0;}
				if(self.Eloppos){self.windowLeftPos = 0;}     
				if(self.Eboppos){self.windowTopPos = (self.largeHeight/self.currentZoomLevel-self.zoomWindow.height())*(-1);  } 
				if(self.Eroppos){self.windowLeftPos = ((self.largeWidth/self.currentZoomLevel-self.zoomWindow.width())*(-1));}    

				//stops micro movements
				if(self.fullheight){
					self.windowTopPos = 0;

				}
				if(self.fullwidth){
					self.windowLeftPos = 0;

				}
				//set the css background position 


				if(self.options.zoomType == "window" || self.options.zoomType == "inner") {

					if(self.zoomLock == 1){
						//overrides for images not zoomable
						if(self.widthRatio <= 1){

							self.windowLeftPos = 0;
						}
						if(self.heightRatio <= 1){ 
							self.windowTopPos = 0;
						}
					}
					// adjust images less than the window height

					if (self.options.zoomType == "window") {
						if (self.largeHeight < self.options.zoomWindowHeight) {

							self.windowTopPos = 0;
						}
						if (self.largeWidth < self.options.zoomWindowWidth) {
							self.windowLeftPos = 0;
						}
					}

					//set the zoomwindow background position
					if (self.options.easing){

						//     if(self.changeZoom){
						//           clearInterval(self.loop);
						//           self.changeZoom = false;
						//           self.loop = false;

						//            }
						//set the pos to 0 if not set
						if(!self.xp){self.xp = 0;}
						if(!self.yp){self.yp = 0;}  
						//if loop not already started, then run it 
						if (!self.loop){           
							self.loop = setInterval(function(){                
								//using zeno's paradox    

								self.xp += (self.windowLeftPos  - self.xp) / self.options.easingAmount; 
								self.yp += (self.windowTopPos  - self.yp) / self.options.easingAmount;
								if(self.scrollingLock){


									clearInterval(self.loop);
									self.xp = self.windowLeftPos;
									self.yp = self.windowTopPos            

									self.xp = ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1);
									self.yp = (((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));                         

									if(self.changeBgSize){    
										if(self.nzHeight>self.nzWidth){  
											if(self.options.zoomType == "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}   
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
										}
										else{   
											if(self.options.zoomType != "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}            
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            

										}

										/*
             if(!self.bgxp){self.bgxp = self.largeWidth/self.newvalue;}
						if(!self.bgyp){self.bgyp = self.largeHeight/self.newvalue ;}  
                 if (!self.bgloop){   
                 	self.bgloop = setInterval(function(){   

                 self.bgxp += (self.largeWidth/self.newvalue  - self.bgxp) / self.options.easingAmount; 
								self.bgyp += (self.largeHeight/self.newvalue  - self.bgyp) / self.options.easingAmount;

           self.zoomWindow.css({ "background-size": self.bgxp + 'px ' + self.bgyp + 'px' });


                  }, 16);

                 }
										 */
										self.changeBgSize = false;
									}

									self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
									self.scrollingLock = false;
									self.loop = false;

								}
								else if (Math.round(Math.abs(self.xp - self.windowLeftPos) + Math.abs(self.yp - self.windowTopPos)) < 1) {
									//stops micro movements
									clearInterval(self.loop);
									self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
									self.loop = false;
								}
								else{
									if(self.changeBgSize){    
										if(self.nzHeight>self.nzWidth){ 
											if(self.options.zoomType == "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}         
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
										}
										else{                 
											if(self.options.zoomType != "lens"){     
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
											}      
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
										}
										self.changeBgSize = false;
									}                   

									self.zoomWindow.css({ backgroundPosition: self.xp + 'px ' + self.yp + 'px' });
								}       
							}, 16);
						}
					}   
					else{    
						if(self.changeBgSize){  
							if(self.nzHeight>self.nzWidth){  
								if(self.options.zoomType == "lens"){      
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
								} 

								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
							}
							else{     
								if(self.options.zoomType == "lens"){      
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
								} 
								if((self.largeHeight/self.newvaluewidth) < self.options.zoomWindowHeight){ 

									self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
								}
								else{

									self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });   
								}

							}
							self.changeBgSize = false;
						}     

						self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });       
					}
				} 
			},
			setTintPosition: function(e){
				var self = this;
				self.nzOffset = self.$elem.offset();
				self.tintpos = String(((e.pageX - self.nzOffset.left)-(self.zoomLens.width() / 2)) * (-1)); 
				self.tintposy = String(((e.pageY - self.nzOffset.top) - self.zoomLens.height() / 2) * (-1));	
				if(self.Etoppos){
					self.tintposy = 0;
				}
				if(self.Eloppos){
					self.tintpos=0;
				}     
				if(self.Eboppos){
					self.tintposy = (self.nzHeight-self.zoomLens.height()-(self.options.lensBorderSize*2))*(-1);
				} 
				if(self.Eroppos){
					self.tintpos = ((self.nzWidth-self.zoomLens.width()-(self.options.lensBorderSize*2))*(-1));
				}    
				if(self.options.tint) {
					//stops micro movements
					if(self.fullheight){
						self.tintposy = 0;

					}
					if(self.fullwidth){ 
						self.tintpos = 0;

					}   
					self.zoomTintImage.css({'left': self.tintpos+'px'});
					self.zoomTintImage.css({'top': self.tintposy+'px'});
				}
			},

			swaptheimage: function(smallimage, largeimage){
				var self = this;
				var newImg = new Image(); 

				if(self.options.loadingIcon){
					self.spinner = $('<div style="background: url(\''+self.options.loadingIcon+'\') no-repeat center;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;z-index: 2000;position: absolute; background-position: center center;"></div>');
					self.$elem.after(self.spinner);
				}

				self.options.onImageSwap(self.$elem);

				newImg.onload = function() {
					self.largeWidth = newImg.width;
					self.largeHeight = newImg.height;
					self.zoomImage = largeimage;
					self.zoomWindow.css({ "background-size": self.largeWidth + 'px ' + self.largeHeight + 'px' });
					self.swapAction(smallimage, largeimage);
					return;              
				}          
				newImg.src = largeimage; // this must be done AFTER setting onload

			},
			swapAction: function(smallimage, largeimage){


				var self = this;    

				var newImg2 = new Image(); 
				newImg2.onload = function() {
					//re-calculate values
					self.nzHeight = newImg2.height;
					self.nzWidth = newImg2.width;
					self.options.onImageSwapComplete(self.$elem);

					self.doneCallback();  
					return;      
				}          
				newImg2.src = smallimage; 

				//reset the zoomlevel to that initially set in options
				self.currentZoomLevel = self.options.zoomLevel;
				self.options.maxZoomLevel = false;

				//swaps the main image
				//self.$elem.attr("src",smallimage);
				//swaps the zoom image     
				if(self.options.zoomType == "lens") {
					self.zoomLens.css({ backgroundImage: "url('" + largeimage + "')" }); 
				}
				if(self.options.zoomType == "window") {
					self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" }); 
				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" }); 
				} 



				self.currentImage = largeimage;

				if(self.options.imageCrossfade){
					var oldImg = self.$elem;
					var newImg = oldImg.clone();         
					self.$elem.attr("src",smallimage)
					self.$elem.after(newImg);
					newImg.stop(true).fadeOut(self.options.imageCrossfade, function() {
						$(this).remove();         
					});

					//       				if(self.options.zoomType == "inner"){
					//remove any attributes on the cloned image so we can resize later
					self.$elem.width("auto").removeAttr("width");
					self.$elem.height("auto").removeAttr("height");
					//   }

					oldImg.fadeIn(self.options.imageCrossfade);

					if(self.options.tint && self.options.zoomType != "inner") {

						var oldImgTint = self.zoomTintImage;
						var newImgTint = oldImgTint.clone();         
						self.zoomTintImage.attr("src",largeimage)
						self.zoomTintImage.after(newImgTint);
						newImgTint.stop(true).fadeOut(self.options.imageCrossfade, function() {
							$(this).remove();         
						});



						oldImgTint.fadeIn(self.options.imageCrossfade);


						//self.zoomTintImage.attr("width",elem.data("image"));

						//resize the tint window
						self.zoomTint.css({ height: self.$elem.height()});
						self.zoomTint.css({ width: self.$elem.width()});
					}    

					self.zoomContainer.css("height", self.$elem.height());
					self.zoomContainer.css("width", self.$elem.width());

					if(self.options.zoomType == "inner"){ 
						if(!self.options.constrainType){
							self.zoomWrap.parent().css("height", self.$elem.height());
							self.zoomWrap.parent().css("width", self.$elem.width());

							self.zoomWindow.css("height", self.$elem.height());
							self.zoomWindow.css("width", self.$elem.width());
						}
					} 

					if(self.options.imageCrossfade){  
						self.zoomWrap.css("height", self.$elem.height());
						self.zoomWrap.css("width", self.$elem.width());
					} 
				}
				else{
					self.$elem.attr("src",smallimage); 
					if(self.options.tint) {
						self.zoomTintImage.attr("src",largeimage);
						//self.zoomTintImage.attr("width",elem.data("image"));
						self.zoomTintImage.attr("height",self.$elem.height());
						//self.zoomTintImage.attr('src') = elem.data("image");
						self.zoomTintImage.css({ height: self.$elem.height()}); 
						self.zoomTint.css({ height: self.$elem.height()});

					}
					self.zoomContainer.css("height", self.$elem.height());
					self.zoomContainer.css("width", self.$elem.width());

					if(self.options.imageCrossfade){  
						self.zoomWrap.css("height", self.$elem.height());
						self.zoomWrap.css("width", self.$elem.width());
					} 
				}              
				if(self.options.constrainType){     

					//This will contrain the image proportions
					if(self.options.constrainType == "height"){ 

						self.zoomContainer.css("height", self.options.constrainSize);
						self.zoomContainer.css("width", "auto");

						if(self.options.imageCrossfade){  
							self.zoomWrap.css("height", self.options.constrainSize);
							self.zoomWrap.css("width", "auto"); 
							self.constwidth = self.zoomWrap.width();


						}
						else{                  
							self.$elem.css("height", self.options.constrainSize);
							self.$elem.css("width", "auto");
							self.constwidth = self.$elem.width();
						} 

						if(self.options.zoomType == "inner"){

							self.zoomWrap.parent().css("height", self.options.constrainSize);
							self.zoomWrap.parent().css("width", self.constwidth);   
							self.zoomWindow.css("height", self.options.constrainSize);
							self.zoomWindow.css("width", self.constwidth);    
						}        
						if(self.options.tint){
							self.tintContainer.css("height", self.options.constrainSize);
							self.tintContainer.css("width", self.constwidth);
							self.zoomTint.css("height", self.options.constrainSize);
							self.zoomTint.css("width", self.constwidth);
							self.zoomTintImage.css("height", self.options.constrainSize);
							self.zoomTintImage.css("width", self.constwidth); 
						} 

					}
					if(self.options.constrainType == "width"){       
						self.zoomContainer.css("height", "auto");
						self.zoomContainer.css("width", self.options.constrainSize);

						if(self.options.imageCrossfade){
							self.zoomWrap.css("height", "auto");
							self.zoomWrap.css("width", self.options.constrainSize);
							self.constheight = self.zoomWrap.height();
						}
						else{            
							self.$elem.css("height", "auto");
							self.$elem.css("width", self.options.constrainSize); 
							self.constheight = self.$elem.height();              
						} 
						if(self.options.zoomType == "inner"){
							self.zoomWrap.parent().css("height", self.constheight);
							self.zoomWrap.parent().css("width", self.options.constrainSize);   
							self.zoomWindow.css("height", self.constheight);
							self.zoomWindow.css("width", self.options.constrainSize);    
						} 
						if(self.options.tint){
							self.tintContainer.css("height", self.constheight);
							self.tintContainer.css("width", self.options.constrainSize);
							self.zoomTint.css("height", self.constheight);
							self.zoomTint.css("width", self.options.constrainSize);
							self.zoomTintImage.css("height", self.constheight);
							self.zoomTintImage.css("width", self.options.constrainSize); 
						}   

					}        


				}

			},
			doneCallback: function(){

				var self = this;
				if(self.options.loadingIcon){
					self.spinner.hide();     
				}   

				self.nzOffset = self.$elem.offset();
				self.nzWidth = self.$elem.width();
				self.nzHeight = self.$elem.height();

				// reset the zoomlevel back to default
				self.currentZoomLevel = self.options.zoomLevel;

				//ratio of the large to small image
				self.widthRatio = self.largeWidth / self.nzWidth;
				self.heightRatio = self.largeHeight / self.nzHeight; 

				//NEED TO ADD THE LENS SIZE FOR ROUND
				// adjust images less than the window height
				if(self.options.zoomType == "window") {

					if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
						lensHeight = self.nzHeight;  

					}
					else{
						lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
					}

					if(self.options.zoomWindowWidth < self.options.zoomWindowWidth){
						lensWidth = self.nzWidth;
					}       
					else{
						lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
					}


					if(self.zoomLens){

						self.zoomLens.css('width', lensWidth);    
						self.zoomLens.css('height', lensHeight); 


					}
				}
			},
			getCurrentImage: function(){
				var self = this;  
				return self.zoomImage; 
			}, 
			getGalleryList: function(){
				var self = this;   
				//loop through the gallery options and set them in list for fancybox
				self.gallerylist = [];
				if (self.options.gallery){ 


					$('#'+self.options.gallery + ' a').each(function() {

						var img_src = '';
						if($(this).data("zoom-image")){
							img_src = $(this).data("zoom-image");
						}
						else if($(this).data("image")){
							img_src = $(this).data("image");
						}			
						//put the current image at the start
						if(img_src == self.zoomImage){
							self.gallerylist.unshift({
								href: ''+img_src+'',
								title: $(this).find('img').attr("title")
							});	
						}
						else{
							self.gallerylist.push({
								href: ''+img_src+'',
								title: $(this).find('img').attr("title")
							});
						}


					});
				}                                                       
				//if no gallery - return current image
				else{
					self.gallerylist.push({
						href: ''+self.zoomImage+'',
						title: $(this).find('img').attr("title")
					}); 
				}
				return self.gallerylist;

			},
			changeZoomLevel: function(value){
				var self = this;   

				//flag a zoom, so can adjust the easing during setPosition     
				self.scrollingLock = true;   

				//round to two decimal places
				self.newvalue = parseFloat(value).toFixed(2);
				newvalue = parseFloat(value).toFixed(2);




				//maxwidth & Maxheight of the image
				maxheightnewvalue = self.largeHeight/((self.options.zoomWindowHeight / self.nzHeight) * self.nzHeight);     
				maxwidthtnewvalue = self.largeWidth/((self.options.zoomWindowWidth / self.nzWidth) * self.nzWidth);   	




				//calculate new heightratio
				if(self.options.zoomType != "inner")
				{
					if(maxheightnewvalue <= newvalue){
						self.heightRatio = (self.largeHeight/maxheightnewvalue) / self.nzHeight;
						self.newvalueheight = maxheightnewvalue;
						self.fullheight = true;

					}
					else{
						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 
						self.newvalueheight = newvalue;
						self.fullheight = false;

					}


//					calculate new width ratio

					if(maxwidthtnewvalue <= newvalue){
						self.widthRatio = (self.largeWidth/maxwidthtnewvalue) / self.nzWidth;
						self.newvaluewidth = maxwidthtnewvalue;
						self.fullwidth = true;

					}
					else{
						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						self.newvaluewidth = newvalue;
						self.fullwidth = false;

					}
					if(self.options.zoomType == "lens"){
						if(maxheightnewvalue <= newvalue){
							self.fullwidth = true;
							self.newvaluewidth = maxheightnewvalue;

						} else{
							self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
							self.newvaluewidth = newvalue;

							self.fullwidth = false;
						}}
				}



				if(self.options.zoomType == "inner")
				{
					maxheightnewvalue = parseFloat(self.largeHeight/self.nzHeight).toFixed(2);     
					maxwidthtnewvalue = parseFloat(self.largeWidth/self.nzWidth).toFixed(2);      
					if(newvalue > maxheightnewvalue){
						newvalue = maxheightnewvalue;
					}
					if(newvalue > maxwidthtnewvalue){
						newvalue = maxwidthtnewvalue;
					}      


					if(maxheightnewvalue <= newvalue){


						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 
						if(newvalue > maxheightnewvalue){
							self.newvalueheight = maxheightnewvalue;
						}else{
							self.newvalueheight = newvalue;
						}
						self.fullheight = true;


					}
					else{



						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 

						if(newvalue > maxheightnewvalue){

							self.newvalueheight = maxheightnewvalue;
						}else{
							self.newvalueheight = newvalue;
						}
						self.fullheight = false;
					}




					if(maxwidthtnewvalue <= newvalue){   

						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						if(newvalue > maxwidthtnewvalue){

							self.newvaluewidth = maxwidthtnewvalue;
						}else{
							self.newvaluewidth = newvalue;
						}

						self.fullwidth = true;


					}
					else{  

						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						self.newvaluewidth = newvalue;
						self.fullwidth = false;
					}        


				} //end inner
				scrcontinue = false;

				if(self.options.zoomType == "inner"){

					if(self.nzWidth >= self.nzHeight){
						if( self.newvaluewidth <= maxwidthtnewvalue){
							scrcontinue = true;
						}
						else{

							scrcontinue = false;
							self.fullheight = true;
							self.fullwidth = true;
						}
					}
					if(self.nzHeight > self.nzWidth){     
						if( self.newvaluewidth <= maxwidthtnewvalue){
							scrcontinue = true;
						}
						else{
							scrcontinue = false;  

							self.fullheight = true;
							self.fullwidth = true;
						}
					}
				}

				if(self.options.zoomType != "inner"){
					scrcontinue = true;
				}

				if(scrcontinue){



					self.zoomLock = 0;
					self.changeZoom = true;

					//if lens height is less than image height


					if(((self.options.zoomWindowHeight)/self.heightRatio) <= self.nzHeight){


						self.currentZoomLevel = self.newvalueheight; 
						if(self.options.zoomType != "lens" && self.options.zoomType != "inner") {
							self.changeBgSize = true;

							self.zoomLens.css({height: String((self.options.zoomWindowHeight)/self.heightRatio) + 'px' }) 
						}
						if(self.options.zoomType == "lens" || self.options.zoomType == "inner") {  
							self.changeBgSize = true;  
						}	


					} 




					if((self.options.zoomWindowWidth/self.widthRatio) <= self.nzWidth){



						if(self.options.zoomType != "inner"){
							if(self.newvaluewidth > self.newvalueheight)   {
								self.currentZoomLevel = self.newvaluewidth;                 

							}
						}

						if(self.options.zoomType != "lens" && self.options.zoomType != "inner") {
							self.changeBgSize = true;

							self.zoomLens.css({width: String((self.options.zoomWindowWidth)/self.widthRatio) + 'px' })
						}
						if(self.options.zoomType == "lens" || self.options.zoomType == "inner") {  
							self.changeBgSize = true;
						}	

					}
					if(self.options.zoomType == "inner"){
						self.changeBgSize = true;  

						if(self.nzWidth > self.nzHeight){
							self.currentZoomLevel = self.newvaluewidth;
						}
						if(self.nzHeight > self.nzWidth){
							self.currentZoomLevel = self.newvaluewidth;
						}
					}

				}      //under

				//sets the boundry change, called in setWindowPos
				self.setPosition(self.currentLoc);
				//
			},
			closeAll: function(){
				if(self.zoomWindow){self.zoomWindow.hide();}
				if(self.zoomLens){self.zoomLens.hide();}
				if(self.zoomTint){self.zoomTint.hide();}
			},
			changeState: function(value){
      	var self = this;
				if(value == 'enable'){self.options.zoomEnabled = true;}
				if(value == 'disable'){self.options.zoomEnabled = false;}

			}

	};




	$.fn.elevateZoom = function( options ) {
		return this.each(function() {
			var elevate = Object.create( ElevateZoom );

			elevate.init( options, this );

			$.data( this, 'elevateZoom', elevate );

		});
	};

	$.fn.elevateZoom.options = {
			zoomActivation: "hover", // Can also be click (PLACEHOLDER FOR NEXT VERSION)
      zoomEnabled: true, //false disables zoomwindow from showing
			preloading: 1, //by default, load all the images, if 0, then only load images after activated (PLACEHOLDER FOR NEXT VERSION)
			zoomLevel: 1, //default zoom level of image
			scrollZoom: false, //allow zoom on mousewheel, true to activate
			scrollZoomIncrement: 0.1,  //steps of the scrollzoom
			minZoomLevel: false,
			maxZoomLevel: false,
			easing: false,
			easingAmount: 12,
			lensSize: 200,
			zoomWindowWidth: 400,
			zoomWindowHeight: 400,
			zoomWindowOffetx: 0,
			zoomWindowOffety: 0,
			zoomWindowPosition: 1,
			zoomWindowBgColour: "#fff",
			lensFadeIn: false,
			lensFadeOut: false,
			debug: false,
			zoomWindowFadeIn: false,
			zoomWindowFadeOut: false,
			zoomWindowAlwaysShow: false,
			zoomTintFadeIn: false,
			zoomTintFadeOut: false,
			borderSize: 4,
			showLens: true,
			borderColour: "#888",
			lensBorderSize: 1,
			lensBorderColour: "#000",
			lensShape: "square", //can be "round"
			zoomType: "window", //window is default,  also "lens" available -
			containLensZoom: false,
			lensColour: "white", //colour of the lens background
			lensOpacity: 0.4, //opacity of the lens
			lenszoom: false,
			tint: false, //enable the tinting
			tintColour: "#333", //default tint color, can be anything, red, #ccc, rgb(0,0,0)
			tintOpacity: 0.4, //opacity of the tint
			gallery: false,
			galleryActiveClass: "zoomGalleryActive",
			imageCrossfade: false,
			constrainType: false,  //width or height
			constrainSize: false,  //in pixels the dimensions you want to constrain on
			loadingIcon: false, //http://www.example.com/spinner.gif
			cursor:"default", // user should set to what they want the cursor as, if they have set a click function
			responsive:true,
			onComplete: $.noop,
      onDestroy: function() {},
			onZoomedImageLoaded: function() {},
			onImageSwap: $.noop,
			onImageSwapComplete: $.noop
	};

})( jQuery, window, document );
//
//function ExiController(){
//	this.init();
//};
//
//ExiController.prototype.init = function(){
//	function setPageBackground() {
//
//	}
//	function notFound() {
//
//	}
//
//	function loadNavigationPanel(listView){
//		/** Cleaning up navigation panel **/
//		EXI.clearNavigationPanel();
//		EXI.setLoadingNavigationPanel(true);
//		
//		/** Load data data **/
//		var adapter = new DataAdapter();
//		adapter.onSuccess.attach(function(sender, data) {
//			/** Load panel **/
//			EXI.addNavigationPanel(listView);
//			/** Load data **/
//			listView.store.loadData(data);
//			EXI.setLoadingNavigationPanel(false);
//		});
//		
//		/** Handle error **/
//		adapter.onError.attach(function(sender, data) {
//			EXI.setLoadingNavigationPanel(false);
//		});
//		return adapter;
//	}
//	
//	
//	/** Welcome Page **/
//	Path.map("#/").to(function() {}).enter(setPageBackground);
//	
//	
//	/** 
//	 * Loading navigation panel
//	 *  
//	 * #/session/nav
//	 * #/experiment/nav
//	 * #/macromolecule/nav
//	 * 
//	 * */
//	Path.map("#/:navigation/nav").to(function() {
//		/** Session navigation **/
//		if (this.params['navigation'] == "session") {
//			var listView = new SessionListView();
//			/** When selected move to hash **/
//			listView.onSelect.attach(function(sender, selected) {
//				location.hash = "/session/nav/" + selected[0].sessionId + "/session";
//			});
//			var adapter = loadNavigationPanel(listView);
//			adapter.getSessions();
//		}
//
//		if (this.params['navigation'] == "shipping") {
//			var listView = new ShippingListView();
//			/** When selected move to hash **/
//			listView.onSelect.attach(function(sender, selected) {
//				location.hash = "/shipping/" + selected[0].shippingId + "/main";
//			});
//			var adapter = loadNavigationPanel(listView);
//			adapter.getShippings();
//		}
//		
//		if (this.params['navigation'] == "experiment") {
//			var listView = new ExperimentListView();
//			/** When selected move to hash **/
//			listView.onSelect.attach(function(sender, selected) {
//				location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
//			});
//			var adapter = loadNavigationPanel(listView);
//			adapter.getExperiments();
//		}
//		
//		if (this.params['navigation'] == "template") {
//			var listView = new TemplateListView();
//			/** When selected move to hash **/
//			listView.onSelect.attach(function(sender, selected) {
//				location.hash = "/experiment/templateId/" + selected[0].experimentId + "/main";
//			});
//			var adapter = loadNavigationPanel(listView);
//			adapter.getByExperimentByKey("experimentType", "TEMPLATE");
//		}
//		
//
//		if (this.params['navigation'] == "macromolecule") {
//			alert("not implemented yet");
//		}
//		
//	}).enter(setPageBackground);
//
//	/** Loading a single session on the navigation panel **/
//	Path.map("#/session/nav/:sessionId/session").to(function() {
//		var listView = new ExperimentListView();
//		/** When selected move to hash **/
//		listView.onSelect.attach(function(sender, selected) {
//			location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
//		});
//		var adapter = loadNavigationPanel(listView);
//		adapter.getExperimentsBySessionId(this.params['sessionId']);
//		
//	}).enter(setPageBackground);
//
//	Path.map("#/experiment/experimentId/:experimentId/main").to(function() {
//			var mainView = new ExperimentMainView();
//			EXI.addMainPanel(mainView);
//			mainView.load(this.params['experimentId']);
//					/** Selecting data collections from experiment **/
//			mainView.onSelect.attach(function(sender, element) {
//					EXI.localExtorage.selectedSubtractionsManager.append(element);
//			});
//			mainView.onDeselect.attach(function(sender, element) {
//					EXI.localExtorage.selectedSubtractionsManager.remove(element);
//			});
//
//	}).enter(setPageBackground);
//	
//	
//	/** Loading Experiments **/
//	Path.map("#/experiment/:key/:value/main").to(function() {
//		var adapter = new DataAdapter();
//		EXI.setLoadingMainPanel();
//		adapter.onSuccess.attach(function(sender, data) {
//			EXI.setLoadingMainPanel(false);
//			if (data != null) {
//				if (data.length > 0) {
//					var mainView = null;
//					if (data[0].experimentType == "STATIC") {
//						mainView = new ExperimentMainView();
//						
//					}
//					if (data[0].experimentType == "HPLC") {
//						mainView = new HPLCMainView();
//					}
//					
//					if (data[0].experimentType == "TEMPLATE") {
//						mainView = new TemplateMainView();
//					}
//					
//					EXI.addMainPanel(mainView);
//					mainView.load(data);
//					/** Selecting data collections from experiment **/
//					mainView.onSelect.attach(function(sender, element) {
//						EXI.localExtorage.selectedSubtractionsManager.append(element);
//					});
//					mainView.onDeselect.attach(function(sender, element) {
//						EXI.localExtorage.selectedSubtractionsManager.remove(element);
//					});
//					
//				}
//			}
//		});
//		if ((this.params['key'] == "experimentId")||(this.params['key'] == "templateId")){
//			adapter.getByExperimentId([this.params['value']]);
//		}
//		else{
//			adapter.getByExperimentByKey(this.params['key'], this.params['value']);
//		}
//		
//
//	}).enter(setPageBackground);
//
//	Path.map("#/tool/crysol/main").to(function() {
//		var mainView = new CrysolMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//
//	
//	Path.map("#/tool/subtraction/main").to(function() {
//		var mainView = new SubtractionMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//	
//	Path.map("#/datacollection/:key/:value/main").to(function() {
//		EXI.setLoadingMainPanel();
//		var adapter = new DataAdapter();
//		adapter.onSuccess.attach(function(sender, data) {
//			var mainView = new DataCollectionMainView();
//			EXI.addMainPanel(mainView);
//			mainView.load(data);
//			EXI.setLoadingMainPanel(false);
//			/** Selecting data collections from experiment **/
//			mainView.onSelect.attach(function(sender, element) {
//				EXI.localExtorage.selectedSubtractionsManager.append(element);
//			});
//			mainView.onDeselect.attach(function(sender, element) {
//				EXI.localExtorage.selectedSubtractionsManager.remove(element);
//			});
//		});
//		adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);
//
//	}).enter(setPageBackground);
//
//	
//	Path.map("#/datacollection/:key/:value/primaryviewer").to(function() {
//		var adapter = new DataAdapter();
//		adapter.onSuccess.attach(function(sender, data) {
//			var primaryMainView = new PrimaryDataMainView();
//			EXI.addMainPanel(primaryMainView);
//			primaryMainView.load(data);
//
//		});
//		adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);
//	}).enter(setPageBackground);
//
//	Path.map("#/datacollection/:key/:value/merge").to(function() {
//		var adapter = new DataAdapter();
//		adapter.onSuccess.attach(function(sender, data) {
//			var primaryMainView = new MergeMainView();
//			EXI.addMainPanel(primaryMainView);
//			primaryMainView.load(data);
//
//		});
//		adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);
//	}).enter(setPageBackground);
//
//	Path.map("#/project/:projectId/run/:runId/main").to(function() {
//		var projectId = this.params['projectId'];
//		var runId = this.params['runId'];
//		var exidataAdapter = new ExiDataAdapter();
//		exidataAdapter.onSuccess.attach(function(sender, runs) {
//			for (var i = 0; i < runs.length; i++) {
//				if (runs[i].internalId == runId) {
//					var main = new RunMainView();
//					EXI.addMainPanel(main);
//					main.load(runs[i]);
//				}
//			}
//		});
//		exidataAdapter.getRuns(projectId);
//	}).enter(setPageBackground);
//
//	
//	Path.map("#/prepare/designer/main").to(function() {
//		var mainView = new ExperimentDesignerMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//	
//	
//	Path.map("#/prepare/buffer/main").to(function() {
//		var mainView = new BufferMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//	
//	
//	Path.map("#/shipping/:shippingId/main").to(function() {
//		var mainView = new ShippingMainView();
//		var shippindId = this.params['shippingId'];
//		EXI.addMainPanel(mainView);
//		mainView.load(shippindId);
//	}).enter(setPageBackground);
//	
//	
//	Path.map("#/prepare/stocksolution/main").to(function() {
//		var mainView = new StockSolutionMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//	
//	
//	Path.map("#/prepare/macromolecule/main").to(function() {
//		var mainView = new MacromoleculeMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//	
//	Path.map("#/prepare/templates/main").to(function() {
//		var mainView = new ExperimentDesignerMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//	
//	Path.map("#/prepare/designer").to(function() {
//		var wizardWidget = new WizardWidget({
//			windowMode : true,
//			width : 1200
//		});
//
//		wizardWidget.onFinished.attach(function(sender, result) {
//			var adapter = new DataAdapter();
//			wizardWidget.window.close();
//			EXI.setLoading();
//			adapter.onSuccess.attach(function(sender, experiment) {
//				location.hash = "/experiment/experimentId/" + experiment.experimentId + "/main";
//			});
//			wizardWidget.current.setLoading("ISPyB: Creating experiment");
//			
//			adapter.saveTemplate(result.name, "comments", result.data);
//		});
//
//		var manager = new ProposalUpdater(); 
//		manager.onSuccess.attach(function(sender, proposals){
//			wizardWidget.draw(this.targetId, new MeasurementCreatorStepWizardForm(ProposalManager.getMacromolecules(), ProposalManager.getBuffers()));
//		});
//		manager.get();
//		
//	}).enter(setPageBackground);
//	
//	
//	Path.map("#/welcome/:user/main").to(function() {
//		var user = this.params['shippingId'];
//		var mainView = new WelcomeMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load(user);
//	}).enter(setPageBackground);
//	
//	
//	
//	Path.map("#/login").to(function() {
//		var _this = this;
//		
//		
//		EXI.authenticationForm.show();
//		return;
//		var authenticationForm = new AuthenticationForm();
//		authenticationForm.onAuthenticate.attach(function(sender, args){
//			var authenticationManager = new AuthenticationManager();
//			authenticationManager.onSuccess.attach(function(sender, args){
//				/** This user has been authenticated **/
////				EXI.localExtorage.tokenManager.addToken(args.user, args.token, args.url);
////				debugger
//				EXI.credentialManager.addCredential(args.user, args.roles, args.token, args.url);
////				EXI.mainMenu.addLoggin(args.user,  args.url);
//				authenticationForm.window.close();
//				
//				/** load proposals **/
//				location.hash = "/welcome/" + args.user + "/main";
//				
//				/** Loading projects **/
////				var exidataAdapter = new ExiDataAdapter();
////				exidataAdapter.onSuccess.attach(function(sender, projects){
////					EXI.localExtorage.userManager.setProjects(projects);
////				});
////				exidataAdapter.getUser();
//				
//				/** Loading proposal **/
////				new ProposalUpdater().get(true);
//				
////				window.location.href = 'main.html';
//				
//			});
//			
//			authenticationManager.login(args.user, args.password, args.site);
//			
//		});
//		authenticationForm.show();
//		
//	}).enter(setPageBackground);
//	
//	
//	Path.map("#/logout").to(function() {
//		EXI.credentialManager.logout();
////		if (EXI.localExtorage){
////			EXI.localExtorage.clear();
////		}
////		if (EXI.mainMenu){
////			EXI.mainMenu.setCredentials();
////		}
//		
////		window.location.href = 'main.html';
//		
//	}).enter(setPageBackground);
//	
//	// Here we set a "root route".  You may have noticed that when you landed on this
//	// page you were automatically "redirected" to the "#/users" route.  The definition
//	// below tells PathJS to load this route automatically if one isn't provided.
//	Path.root("#/");
//
//	// The `Path.rescue()` method takes a function as an argument, and will be called when
//	// a route is activated that you have no yet defined an action for.  On this example
//	// page, you'll notice there is no defined route for the "Unicorns!?" link.  Since no
//	// route is defined, it calls this method instead.
//	Path.rescue(notFound);
//	
//	
//};

function Exi(args) {
	var _this = this;
	
	this.headerCssClass = "titlePanel";
	
	/** Active Menu **/
	this.mainMenu = new MainMenu();
	/** When user is not logged in **/
	this.anonymousMenu = null;
	/** When user is logged in **/
	this.userMenu = null;
	
	/** If false when opening a new tab it will close the already open ones **/
	this.keepTabs = false;
	
	
	this.controllers = [new ExiController(), new ProposalExiController(), new ShippingExiController(), new TestController()];
	
	if (args != null){
		if (args.menu != null){
			this.mainMenu = args.menu;
			this.userMenu = args.menu;
		}
		if (args.anonymousMenu != null){
			this.anonymousMenu = args.anonymousMenu;
		}
		
		if (args.headerCssClass != null){
			this.headerCssClass = args.headerCssClass;
		}
		
		if (args.controllers != null){
			for (var i = 0; i < args.controllers.length; i++) {
				this.controllers.push(args.controllers[i]);
			}
		}
	}
	/** Status bar **/
	this.mainStatusBar = new MainStatusBar();
	
	/** Proposal manager **/
	this.proposalManager = new ProposalManager();
	
	this.credentialManager = new CredentialManager();
	this.credentialManager.onLogout.attach(function(sender){
		_this.mainMenu.populateCredentialsMenu();
		_this.clearMainPanel();
		_this.clearNavigationPanel();
		_this.setAnonymousMenu();
		Ext.getCmp("navigation").collapse();
		location.hash = '/welcome';
	});
	
	
	this.credentialManager.onLogin.attach(function(sender){
		_this.mainMenu.populateCredentialsMenu();
		_this.setUserMenu();
	});
	
	this.credentialManager.onActiveProposalChanged.attach(function(sender){
		_this.mainMenu.populateCredentialsMenu();
	});
	
	/** AUTHENTICATION FORM **/
	this.authenticationForm = new AuthenticationForm();
	this.authenticationForm.onAuthenticate.attach(function(sender, args){
		var authenticationManager = new AuthenticationManager();
        
		authenticationManager.onSuccess.attach(function(sender, data){
            
			/** This user has been authenticated **/           
			_this.credentialManager.addCredential(data.user, data.roles, data.token, args.site, args.exiUrl, args.properties);
			_this.authenticationForm.window.close();			
			var credential = EXI.credentialManager.getCredentialByUserName(data.user);
          
			if (credential.isManager()||credential.isLocalContact()){
				location.hash = "/welcome/manager/" + data.user + "/main";
			}
			else{
				location.hash = "/welcome/user/" + data.user + "/main";        
			}
			
            
			/** Authenticating EXI in the offline system**/            
			_this.getDataAdapter().exi.offline.authenticate();
			
		});
		authenticationManager.onError.attach(function(sender, data){
			alert("error");
		});
		authenticationManager.login(args.user, args.password, args.site);
	});
	
	this.onAfterRender = new Event(this);
}

/**
 * This method append to args the values of the active connection: url, token and proposal
 */
Exi.prototype.appendDataAdapterParameters = function(args) {
    if (!args){ args = {};}
    
     /** Is your token still valid */     
     
    if (EXI.credentialManager.getCredentials()[0]){        
        if (!EXI.credentialManager.getCredentials()[0].isValid()){                        
           location.hash = '/welcome';
           return;
        }        
    }	
            
    var connections = EXI.credentialManager.getConnections();
    /** Authentication data adapter does not need any token **/
    if (connections.length > 0){
        args.url = connections[0].url;
        args.token = connections[0].token;
        args.proposal = connections[0].proposal;			
    }
    return args;
        	
};


Exi.prototype.getDataAdapter = function(args) {   
    var dataAdapter =  new DataAdapterFactory(this.appendDataAdapterParameters(args));       
    return dataAdapter;  	
};

Exi.prototype.setAnonymousMenu = function() {
	this.mainMenu = this.anonymousMenu;
	Ext.getCmp("mainMenu").removeAll();
	Ext.getCmp("mainMenu").add(EXI.mainMenu.getPanel());
};

Exi.prototype.setUserMenu = function() {
	this.mainMenu = this.userMenu;
	Ext.getCmp("mainMenu").removeAll();
	Ext.getCmp("mainMenu").add(EXI.mainMenu.getPanel());
};


Exi.prototype.loadSelected = function(selected) {
};




/**
 * Adds a new Main panel to the center panel
 * @param mainView
 */
Exi.prototype.addMainPanel = function(mainView) {
	if (!this.keepTabs){
		Ext.getCmp('main_panel').removeAll();
	}
	Ext.getCmp('main_panel').add(mainView.getPanel());
	Ext.getCmp('main_panel').setActiveTab(Ext.getCmp('main_panel').items.length - 1);
};

Exi.prototype.getSelectedDataCollections = function() {
	var selected = [];
	for (var i = 0; i < this.experimentListView.length; i++) {
		selected = selected.concat(this.experimentListView[i].getSelected());
	}
	return selected;
};

Exi.prototype.addNavigationPanel = function(listView) {
	Ext.getCmp('navigation').add(listView.getPanel());
	if (Ext.getCmp("navigation") != null){
		Ext.getCmp("navigation").expand();
        this.showNavigationPanel();
	}
};

Exi.prototype.hideNavigationPanel = function(listView) {
	if (Ext.getCmp("navigation") != null){
		Ext.getCmp('navigation').hide();
	}
};

Exi.prototype.showNavigationPanel = function(listView) {
	if (Ext.getCmp("navigation") != null){
		Ext.getCmp('navigation').show();
	}
};


Exi.prototype.clearNavigationPanel = function() {
	Ext.getCmp('navigation').removeAll();
};

Exi.prototype.clearMainPanel = function() {
	Ext.getCmp('main_panel').removeAll();
};

Exi.prototype.setLoadingNavigationPanel = function(isLoading) {
	Ext.getCmp('navigation').setLoading(isLoading);
};

Exi.prototype.setLoadingMainPanel = function(isLoading) {
	Ext.getCmp('main_panel').setLoading(isLoading);
};

Exi.prototype.setError = function(error) {
	this.mainStatusBar.showError(error);
};

Exi.prototype.setLoading = function(isLoading) {
	if ((isLoading == null) || (isLoading  == true)){
		this.mainStatusBar.showBusy();
	}
	else{
		this.mainStatusBar.showReady();
	}
};

Exi.prototype.getHeader = function(error) {
	return '<img class="titleImage" src="images/logo_EMBL.png"><span class="title">Extended ISPyB</span>';
};

Exi.prototype.show = function() {
	var _this = this;
	Ext.application({
				name : 'ExiSAXS',
				launch : function() {
					Ext.create(
									'Ext.container.Viewport',
									{
										layout : 'border',
										items : [
												{
													region : 'north',
													xtype : 'component',
													padding : 10,
													height : 75,
													html : _this.getHeader(),
													cls : _this.headerCssClass

												}, {
													region : 'north',
													cls : 'toolbarPanel',
													id : 'mainMenu',
													xtype : 'panel',
													width : 400,
													items : _this.mainMenu.getPanel() },

												{
													xtype : 'panel',
													id : 'navigation',
													region : 'west',
													width : 250,
													split : false,
													title : 'Browse by',
													cls : 'navigation',
													collapsible : true,
													collapsed : true
													

												},
//												{
//													xtype : 'panel',
//													id : 'workspace',
//													region : 'east',
//													width : 250,
//													collapsed : true,
//													title : 'Workspace',
//													split : false,
//													layout : 'fit',
////													title : 'Browse by',
//													cls : 'navigation',
//													collapsible : true,
//													items : [_this.workspacePanel.getPanel()]
//
//												},
												{
													region : 'center',
													id : 'main_panel',
													xtype : 'tabpanel',
													cls : 'navigation',
													plain : true,
													items : []
												},
												{
														region : 'south',
														xtype : 'panel',
														cls : 'statusBar',
														bbar : _this.mainStatusBar.getBar() 
												}
													],
										listeners : {
											afterrender : function(component, eOpts) {
														_this.mainMenu.populateCredentialsMenu();
														_this.onAfterRender.notify();
														
//														/** If there is a user login then we show the menu **/
														if (_this.credentialManager.getCredentials() == 0){
															_this.setAnonymousMenu();
														}
														else{
															_this.setUserMenu();
															_this.mainMenu.populateCredentialsMenu();
														}
											} } });
				}

			});
};


function MainStatusBar(){
	
	
}

MainStatusBar.prototype.getBar = function(){
	this.statusBar =  Ext.create('Ext.ux.StatusBar', {
		id : 'main-status-bar',
	    text: 'Ready',
	    iconCls: 'accept',
	    busyIconCls: 'busy',
	    busyText:   this.busyText,
	    cls : 'statusBar',
		statusAlign : 'right'
	});
	return this.statusBar;
};

MainStatusBar.prototype.showBusy = function(msg){
    if (msg == null){
        msg = 'Connecting to servers...';
    }
    this.statusBar.busyText = msg;
	this.statusBar.showBusy();
};

MainStatusBar.prototype.showError = function(error){
	this.statusBar.clearStatus();
	this.statusBar.setStatus({
	    text: error,
	    iconCls: 'error'
	});
};

MainStatusBar.prototype.showReady = function(){
	this.statusBar.clearStatus();
	this.statusBar.setStatus({
	    text: 'Ready',
	    iconCls: 'accept'
	});
};





/**
* Class used to manage the common points for a single or several proposals. It deals with methods to help the management of crystals, proteins, macromolecules, buffer, stockSolutions and labcontacts
*
* @class ProposalManager
* @constructor
*/
function ProposalManager() {
    this.onActiveProposalChanged = new Event(this);
}


/**
* It gets the information of the proposals that are found on the local Storage in the field called proposal. If it does not exist it will load form the server and store them on the local storage
* @method get
* @param {Boolean} forceUpdate if true the proposals information will be reloaded from the server syncrhonously
*/
ProposalManager.prototype.get = function(forceUpdate) {
    var _this = this;
	if ((localStorage.getItem("proposals") == null)||(forceUpdate)){
       
		var onSuccess= function(sender, proposals){
			localStorage.setItem("proposals", JSON.stringify(proposals));
            _this.onActiveProposalChanged.notify();
		};
		EXI.getDataAdapter({async : true, onSuccess : onSuccess}).proposal.proposal.getProposalsInfo();
	}	
  
	return JSON.parse(localStorage.getItem("proposals"));
};

/**
* It removes the information from the local storage. It means it remove the proposals item
* @method clear
*/
ProposalManager.prototype.clear = function() {
	localStorage.removeItem('proposals');
};

/**
* It gets a list of sessions from the local storage or retrieve them from the server if the proposals have not been loaded yet. It is synchronous.
* @method getSessions
*/
ProposalManager.prototype.getSessions = function() {
	if (localStorage.getItem("sessions") == null){
		var onSuccess= function(sender, sessions){
			localStorage.setItem("sessions", JSON.stringify(sessions));
		};
		EXI.getDataAdapter({async : false, onSuccess : onSuccess}).proposal.session.getSessions();
	}
	return JSON.parse(localStorage.getItem("sessions"));
};

/**
* It gets a list of sessions which start date comes after today.
* @method getFutureSessions
*/
ProposalManager.prototype.getFutureSessions = function() {
	var sessions = this.getSessions();
	var today = moment();
	var futureSessions = [];
	for (var i = 0; i < sessions.length; i++) {        
		if (today.diff(sessions[i].BLSession_startDate) < 0){
			futureSessions.push(sessions[i]);
		}
	}
	return futureSessions;
};

/**
* It gets a list of colors
* @method getBufferColors
*/
ProposalManager.prototype.getBufferColors = function() {
	return [ "#ffffcc", "#c7e9b4", "#7fcdbb", "#41b6c4", "#2c7fb8", "#253494" ];
};

/**
* It gets a list of labcontacts from the current proposal
* @method getLabcontacts
*/
ProposalManager.prototype.getLabcontacts = function() {
	return this.get()[0].labcontacts;
};

/**
* @method getLabcontactById
*/
ProposalManager.prototype.getLabcontactById = function(labContactId) {
	return _.find(this.getLabcontacts(), function(o) { return o.labContactId == labContactId; });
};

/**
* @method getPlateTypeById
*/
ProposalManager.prototype.getPlateTypeById = function(plateTypeId) {
	return _.find(this.getPlateTypes(), function(o) { return o.plateTypeId == plateTypeId; });
};

/**
* @method getPlateTypes
*/
ProposalManager.prototype.getPlateTypes = function() {
	return this.get()[0].plateTypes;
};

/**
* This methods is supposed to retrieve the plate configuration by flavour. However, it is not used yet
* @method getPlateByFlavour
*/
ProposalManager.prototype.getPlateByFlavour = function(flavour) {
	return [ this.getPlateTypes()[0], this.getPlateTypes()[2], this.getPlateTypes()[3] ];
};

/**
* @method getBufferById
*/
ProposalManager.prototype.getBufferById = function(bufferId) {
	var proposals = this.get();
	var f = function(o) { return o.bufferId == bufferId; };
	for (var i = 0; i < proposals.length; i++) {
		var found = _.find(proposals[i].buffers, f);
		if (found != null) {return found;}
	}
};

/**
* @method getMacromoleculeById
*/
ProposalManager.prototype.getMacromoleculeById = function(macromoleculeId) {
	var proposals = this.get();
	var f = function(o) { return o.macromoleculeId == macromoleculeId; };
	for (var i = 0; i < proposals.length; i++) {
		var found = _.find(proposals[i].macromolecules, f);
		if (found != null) {return found;}
	}
	return null;
};

/**
* @method getMacromoleculeByAcronym
*/
ProposalManager.prototype.getMacromoleculeByAcronym = function(acronym) {
	var proposals = this.get();
	var f = function(o) { return o.acronym == acronym; };
	for (var i = 0; i < proposals.length; i++) {
		var found = _.find(proposals[i].macromolecules, f);
		if (found != null) {return found;}
	}
	return null;
};

/**
* @method getStockSolutionById
*/
ProposalManager.prototype.getStockSolutionById = function(stockSolutionId) {
	var proposals = this.get();
	var f = function(o) { return o.stockSolutionId == stockSolutionId; };
	for (var i = 0; i < proposals.length; i++) {
		var found = _.find(proposals[i].stockSolutions, f);
		if (found != null) {return found;}
	}
};

/**
* @method getBuffers
*/
ProposalManager.prototype.getBuffers = function() {
	var proposals = this.get();
	var buffers = [];
	for (var i = 0; i < proposals.length; i++) {
		buffers = buffers.concat(proposals[i].buffers);
	}
	return buffers;
};

/**
* @method getMacromolecules
*/
ProposalManager.prototype.getMacromolecules = function() {
	var proposals = this.get();
	var macromolecules = [];
	for (var i = 0; i < proposals.length; i++) {
		macromolecules = macromolecules.concat(proposals[i].macromolecules);
	}
	return macromolecules;
};

/**
* @method getProposals
*/
ProposalManager.prototype.getProposals = function() {
	var proposals = this.get();
	var result = [];
	for (var i = 0; i < proposals.length; i++) {
		proposals[i].proposal[0]["proposal"] = proposals[i].proposal[0].code + proposals[i].proposal[0].number;
		result = result.concat(proposals[i].proposal);
	}
	return result;
};

/**
* @method getProposalById
*/
ProposalManager.prototype.getProposalById = function(proposalId) {
	var proposals = this.get();
	var result = [];
	for (var i = 0; i < proposals.length; i++) {
		if (proposals[i].proposal[0].proposalId == proposalId){
			return proposals[i].proposal[0];
		}
	}
	return result;
};

/**
* @method getStockSolutions
*/
ProposalManager.prototype.getStockSolutions = function() {
	return this.get()[0].stockSolutions;
};

/**
* @method getProteins
*/
ProposalManager.prototype.getProteins = function() {
	return this.get()[0].proteins;
};

/**
* @method getCrystals
*/
ProposalManager.prototype.getCrystals = function() {
	return this.get()[0].crystals;
};

/**
* @method getProteinByAcronym
*/
ProposalManager.prototype.getProteinByAcronym = function(acronym) {
	return _.filter(this.getProteins(), function(o) { return o.acronym == acronym; });
};

/**
* @method getCrystalsByAcronym
*/
ProposalManager.prototype.getCrystalsByAcronym = function(acronym) {
	return _.filter(this.getCrystals(), 
						function(o) { 
								if (o.proteinVO == null) {return false;} 
								else {return o.proteinVO.acronym == acronym;} 
						}
	);
};

/**
* @method getStockSolutionsBySpecimen
*/
ProposalManager.prototype.getStockSolutionsBySpecimen = function(macromoleculeId, bufferId) {
	var aux = _.filter(this.getStockSolutions(), function(o) { return o.macromoleculeId == macromoleculeId; });
	return _.filter(aux, function(o) { return o.bufferId == bufferId; });
};

/**
* @method getUnpackedStockSolutions
*/
ProposalManager.prototype.getUnpackedStockSolutions = function() {
	var stockSolutions = this.getStockSolutions();
	var result = [];
	for (var i = 0; i < stockSolutions.length; i++) {
		if (stockSolutions[i].boxId == null) {
			result.push(stockSolutions[i]);
		}
	}
	return result;
};

/**
* @method getStockSolutionsByDewarId
*/
ProposalManager.prototype.getStockSolutionsByDewarId = function(dewarId) {
	return _.filter(this.getStockSolutions(), function(o) { return o.boxId == dewarId; });
};

/**
* Super class for the controllers. It manages the setPageBackground and notFound methods
*
* @class ExiGenericController
* @constructor
*/
function ExiGenericController() {
	this.init();
}


ExiGenericController.prototype.setPageBackground = function() {

};

ExiGenericController.prototype.notFound = function() {

};




function MainView(args) {
	this.id = BUI.id();
	this.title = "New Tab";
	this.closable = true; 
	this.onSelectionChange = new Event(this);
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
	
	//this.bodyStyle = {"background-color":"#FAFAFA"};
    
    if (args != null){
        if (args.title != null){
            this.title = args.title;
        }
    }

}

MainView.prototype.getContainer = function() {
	return this.container;
};

MainView.prototype.getPanel = function() {
	this.container = Ext.create('Ext.container.Container', {
		xtype : 'container',
		items : []
	});

	this.panel = Ext.create('Ext.panel.Panel', {
		autoScroll : true,
		title : this.title,
		closable: this.closable,
		icon : this.icon,
		bodyStyle: this.bodyStyle, 
		items :[this.getContainer() ]
	});
	return this.panel;
};
function AuthenticationManager(){
	this.onSuccess = new Event(this);
	this.onError = new Event(this);
}

/**
 * url to an ISPyB for instance http://ispyb.esrf.fr/ispyb-ws/rest
 * @param user
 * @param password
 * @param url
 */
AuthenticationManager.prototype.login = function(user, password, url){
	var _this = this;
	var fn = function onSuccess(sender, data) {
		_this.onSuccess.notify({
			user : user,
			roles : data.roles,
			token : data.token,
			url : url
	    });
	};
		
	var err = function(sender, data) {
		EXI.setError("Permission denied");
		BUI.showError("Your credentials are invalid");
	};
    
	EXI.getDataAdapter({
		onSuccess 	: fn,
		onError 	: err,
		url			: url,
		username 	: user
		
	}).proposal.authentication.authenticate(user, password, url);
	
	
	
};

function ExiController(){
	this.init();
}

ExiController.prototype.loadNavigationPanel = function(listView) {
	/** Cleaning up navigation panel * */
	EXI.clearNavigationPanel();
	EXI.setLoadingNavigationPanel(true);
	
	var onSuccess = function(sender, data) {
		/** Load panel * */
		EXI.addNavigationPanel(listView);
		/** Load data * */
		listView.load(data);
		EXI.setLoadingNavigationPanel(false);
	};
	
	/** Handle error * */
	var onError = function(sender, data) {
		EXI.setLoadingNavigationPanel(false);
	};
	
	/** Load data data * */
	return EXI.getDataAdapter({ onSuccess : onSuccess, onError : onError });
};

ExiController.prototype.init = function(){
	function setPageBackground() {

	}
	function notFound() {

	}

	/** Welcome Page **/
	Path.map("#/").to(function() {       
		location.hash = '/welcome';
	}).enter(setPageBackground);
	
	Path.map("#/login").to(function() {
        EXI.credentialManager.logout();
		EXI.authenticationForm.show();
	}).enter(setPageBackground);
	
	
	Path.map("#/welcome").to(function() {
		//EXI.addMainPanel(new WelcomeMainView());
        //location.hash = '/login';
         EXI.credentialManager.logout();
        EXI.authenticationForm.show();
	}).enter(setPageBackground);
	
	Path.map("#/welcome/user/:user/main").to(function() {
		var user = this.params['user'];		
        var mainView = new ManagerWelcomeMainView();
		EXI.addMainPanel(mainView);
        EXI.hideNavigationPanel();
		mainView.load(user);
	}).enter(setPageBackground);
	

	Path.map("#/welcome/manager/:user/main").to(function() {
        
		var user = this.params['user'];
		var mainView = new ManagerWelcomeMainView();
		EXI.addMainPanel(mainView);
        
        EXI.hideNavigationPanel();
		mainView.load(user);
	}).enter(setPageBackground);
	
    Path.map("#/welcome/manager/:user/date/:start/:end/main").to(function() {                    
		var user = this.params['user'];
		var mainView = new ManagerWelcomeMainView();
		EXI.addMainPanel(mainView);
        EXI.hideNavigationPanel();
		mainView.loadSessionsByDate(user,this.params['start'], this.params['end'] );
	}).enter(setPageBackground);
    
   
    
	
	Path.map("#/logout").to(function() {
		EXI.credentialManager.logout();
         EXI.hideNavigationPanel();
		EXI.proposalManager.clear();
		
	}).enter(setPageBackground);
	
	// Here we set a "root route".  You may have noticed that when you landed on this
	// page you were automatically "redirected" to the "#/users" route.  The definition
	// below tells PathJS to load this route automatically if one isn't provided.
	Path.root("#/");

	// The `Path.rescue()` method takes a function as an argument, and will be called when
	// a route is activated that you have no yet defined an action for.  On this example
	// page, you'll notice there is no defined route for the "Unicorns!?" link.  Since no
	// route is defined, it calls this method instead.
	Path.rescue(notFound);
	
	
};

/**
* Super class for the controllers. It manages the setPageBackground and notFound methods
*
* @class ExiGenericController
* @constructor
*/
function ExiGenericController() {
	this.init();
}


ExiGenericController.prototype.setPageBackground = function() {

};

ExiGenericController.prototype.notFound = function() {

};



function LabContactExiController() {
	this.init();
}

LabContactExiController.prototype.loadNavigationPanel = ExiController.prototype.loadNavigationPanel;

LabContactExiController.prototype.setPageBackground = function() {
};

LabContactExiController.prototype.notFound = function() {
};



LabContactExiController.prototype.init = function() {
	var _this = this;

		function setPageBackground() {
			_this.setPageBackground();
		}
		function notFound() {
			_this.notFound();
		}

		function loadNavigationPanel(listView) {
			return _this.loadNavigationPanel(listView);
		}
		
		
		var listView = null;
		var adapter = null;
		
		Path.map("#/proposal/addresses/nav").to(function() {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new AddressListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/proposal/address/" + selected[0].labContactId + "/main";
			});
			
			EXI.addNavigationPanel(listView);
			adapter = loadNavigationPanel(listView);
			adapter.proposal.labcontacts.getLabContacts();
			
			/** Loading welcome page **/
			EXI.addMainPanel(new AddressWelcomeMainView());
			
		}).enter(this.setPageBackground);
		
		Path.map("#/proposal/address/:lacontactId/main").to(function() {
			var mainView = new AddressMainView();
			EXI.addMainPanel(mainView);
			mainView.load(this.params['lacontactId']);
		}).enter(this.setPageBackground);
		
};

function OfflineExiController() {
	this.init();
}

OfflineExiController.prototype.setPageBackground = function() {

};

OfflineExiController.prototype.notFound = function() {

};

OfflineExiController.prototype.init = function() {
	var _this = this;

		function setPageBackground() {
			_this.setPageBackground();
		}
		function notFound() {
			_this.notFound();
		}


		Path.map("#/tool/dimple/main").to(function() {
			var mainView = new DimpleMainView();
			EXI.addMainPanel(mainView);
			mainView.load();
		}).enter(this.setPageBackground);
        
          Path.map("#/tool/dimple/datacollection/:dataCollectionId/main").to(function() {
			var mainView = new DimpleDCMainView();
			EXI.addMainPanel(mainView);
			mainView.load(this.params['dataCollectionId']);
		}).enter(this.setPageBackground);
        
        Path.map("#/tool/reprocess/datacollection/:dataCollectionId/:startImage/:endImage/main").to(function() {
			var mainView = new ReprocessMainView();
			EXI.addMainPanel(mainView);
			mainView.load(this.params['dataCollectionId'],this.params['startImage'],this.params['endImage']);
		}).enter(this.setPageBackground);
        
		
		
		Path.map("#/tool/crysol/main").to(function() {
			var mainView = new CrysolMainView();
			EXI.addMainPanel(mainView);
			mainView.load();
		}).enter(this.setPageBackground);

		Path.map("#/tool/subtraction/main").to(function() {
			var mainView = new SubtractionMainView();
			EXI.addMainPanel(mainView);
			mainView.load();
		}).enter(this.setPageBackground);
		
		Path.map("#/tool/list").to(function() {
			var project = null;
			var listView = new RunListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
				var runId = selected[0].internalId;
				var projectId = project.internalId;
				if (selected[0].tool == "Dimple"){
					location.hash = "/project/" +projectId + "/dimple/" + runId + "/main";
				}
				else{
					location.hash = "/project/" +projectId + "/run/" + runId + "/main";
				}
			});

			/** Cleaning up navigation panel * */
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);

			
			var onSuccess = function(sender, data) {
				project = data[0];
				/** Load panel * */
				EXI.addNavigationPanel(listView);
				/** Load data * */
				listView.load(data[0].runs.reverse());
				EXI.setLoadingNavigationPanel(false);
			};
			
			/** Handle error * */
			var onError = function(sender, data) {
				EXI.setLoadingNavigationPanel(false);
			};
			
			EXI.getDataAdapter({onSuccess : onSuccess, onError :onError}).exi.offline.getProject();
		}).enter(this.setPageBackground);
		

	Path.map("#/project/:projectId/run/:runId/main").to(function() {
		var projectId = this.params['projectId'];
		var runId = this.params['runId'];

		var onSuccess = function(sender, runs) {
			for (var i = 0; i < runs.length; i++) {
				if (runs[i].internalId == runId) {
					var main = new RunMainView();
					EXI.addMainPanel(main);
					main.load(runs[i]);
				}
			}
		};
		var onError = function(sender) {
			BUI.showError("There was an error");
		};
		
		EXI.getDataAdapter({onSuccess : onSuccess, onError :onError}).exi.offline.getRuns(projectId);
	}).enter(this.setPageBackground);


	Path.map("#/project/:projectId/dimple/:runId/main").to(function() {
		var projectId = this.params['projectId'];
		var runId = this.params['runId'];

		var onSuccess = function(sender, runs) {
			for (var i = 0; i < runs.length; i++) {
				if (runs[i].internalId == runId) {
					var main = new DimpleRunMainView();
					EXI.addMainPanel(main);
					main.load(runs[i]);
				}
			}
		};
		var onError = function(sender) {
			BUI.showError("There was an error");
		};
		
		EXI.getDataAdapter({onSuccess : onSuccess, onError :onError}).exi.offline.getRuns(projectId);
	}).enter(this.setPageBackground);
	
	Path.rescue(notFound);

};

function ProposalExiController() {
	this.init();
}

ProposalExiController.prototype.loadNavigationPanel = ExiController.prototype.loadNavigationPanel;

ProposalExiController.prototype.setPageBackground = function() {
};

ProposalExiController.prototype.notFound = function() {
};


ProposalExiController.prototype.init = function() {
	var _this = this;

		function setPageBackground() {
			_this.setPageBackground();
		}
		function notFound() {
			_this.notFound();
		}

		function loadNavigationPanel(listView) {
			return _this.loadNavigationPanel(listView);
		}
		
		var listView = null;
		var adapter = null;

		

		Path.map("#/proposal/session/nav").to(function() {
			listView = new SessionListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
                
				if (EXI.credentialManager.getTechniqueByBeamline(selected[0].beamlineName) == "SAXS"){
					location.hash = "/session/nav/" + selected[0].sessionId + "/session";
				}
				else{
					location.hash = "/mx/datacollection/session/" + selected[0].sessionId + "/main";
				}
				
			});
            
			adapter = loadNavigationPanel(listView);
			adapter.proposal.session.getSessions();
						
		}).enter(this.setPageBackground);
	

		
		Path.map("#/proposal/address/:lacontactId/main").to(function() {
			var mainView = new AddressMainView();
			EXI.addMainPanel(mainView);
			mainView.load(this.params['lacontactId']);
		}).enter(this.setPageBackground);
		

		Path.map("#/puck/:containerId/main").to(function() {
			var mainView = new PuckMainView();
			EXI.addMainPanel(mainView);
			mainView.load(this.params['containerId']);
		}).enter(this.setPageBackground);
		
};

/**
* This is the description for routing all the session actions. It means url= #/session/*
*
* @class SessionController
* @constructor
*/
function SessionController() {
	this.init();
}

SessionController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
SessionController.prototype.notFound = ExiGenericController.prototype.notFound;

/**
* Inits the controller for the session related objects
* Paths accepted:
* #/session/nav
* #/session/nav/:sessionId/session
*
* @method init
*/
SessionController.prototype.init = function() {
	var _this = this;
	var listView;	

	Path.map("#/session/nav").to(function() {
			EXI.clearNavigationPanel();
            EXI.hideNavigationPanel();	
			/*EXI.setLoadingNavigationPanel(true);
			listView = new SessionListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/mx/datacollection/session/" + selected[0].sessionId + "/main";
			});
			EXI.addNavigationPanel(listView);
            */
            var mainView = new SessionMainView({
                title : "Sessions"
            });
           
            EXI.addMainPanel(mainView);
            
            var onSuccess = function(sender, data){
            //    listView.load(EXI.proposalManager.getSessions().slice(0, 50));
                 mainView.load(EXI.proposalManager.getSessions());
            //    EXI.hideNavigationPanel();		
            //    EXI.setLoadingNavigationPanel(false);
                 EXI.setLoadingMainPanel(false);    
            };
            EXI.setLoadingMainPanel();
            EXI.getDataAdapter({
                onSuccess : onSuccess                
            }).proposal.session.getSessions();         	

	}).enter(this.setPageBackground);

	

	Path.rescue(this.notFound);
};

function ShippingExiController() {
	this.init();
}

ShippingExiController.prototype.loadNavigationPanel = ExiController.prototype.loadNavigationPanel;

ShippingExiController.prototype.setPageBackground = function() {
};

ShippingExiController.prototype.notFound = function() {
};


ShippingExiController.prototype.loadShipmentsNavigationPanel = function(listView) {
	/** Cleaning up navigation panel * */
	EXI.clearNavigationPanel();
	EXI.setLoadingMainPanel(true);
	
	var onSuccess = function(sender, data) {
		data = BUI.groupBy(data, function(item){return item["Shipping_shippingId"];});
		var curated = [];
		for(var i = 0; i < data.length; i++){
			curated.push(data[i][0]);
		}
		curated.sort(function(a,b){return b.Shipping_shippingId - a.Shipping_shippingId;});
		
		/** Load panel * */
		EXI.addNavigationPanel(listView);
		/** Load data * */
		listView.load(curated);
		EXI.setLoadingMainPanel(false);
	};
	
	/** Handle error * */
	var onError = function(sender, data) {
		EXI.setLoadingNavigationPanel(false);
	};
	
	/** Load data data * */
	return EXI.getDataAdapter({ onSuccess : onSuccess, onError : onError });
};

ShippingExiController.prototype.init = function() {
	var _this = this;

		function setPageBackground() {
			_this.setPageBackground();
		}
		function notFound() {
			_this.notFound();
		}

		function loadNavigationPanel(listView) {
			return _this.loadNavigationPanel(listView);
		}
		
		var listView = null;
		var adapter = null;

		function loadShipmentNavigationList(){
			var listView = new ShippingListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/shipping/" + selected[0].Shipping_shippingId  + "/main";
			});
			adapter = _this.loadShipmentsNavigationPanel(listView);
			adapter.proposal.shipping.getShippings();
		}
		
		Path.map("#/proposal/shipping/nav?nomain").to(function() {
			loadShipmentNavigationList();
		});

		Path.map("#/proposal/shipping/nav").to(function() {
			loadShipmentNavigationList();
			EXI.addMainPanel(new ShippingWelcomeMainView());
		});
		
		Path.map("#/shipping/:shippingId/main").to(function() {
			var mainView = new ShippingMainView();
			EXI.addMainPanel(mainView);
			mainView.load(this.params['shippingId']);
		}).enter(this.setPageBackground);

		Path.map("#/shipping/main").to(function() {
			var mainView = new ShippingMainView();
			EXI.addMainPanel(mainView);
			mainView.load();
		}).enter(this.setPageBackground);
		
};

function MainMenu(args) {
	this.id = BUI.id();
	this.loginButtonId = 'loginButton' + this.id;
	this.cssClass = 'mainMenu';
	this.isHidden = true;
	if (args != null){
		if (args.cssClass != null){
			this.cssClass = args.cssClass;
		}
		if (args.isHidden != null){
			this.isHidden = args.isHidden;
		}
	}
}

MainMenu.prototype.getMenuItems = function() { return [];};


/**
 * If there is a credential then home tab will redirect to the welcome page (either manager or user)
 */
MainMenu.prototype.getHomeItem = function() { 
	return {
		text : this._convertToHTMLWhiteSpan("Home"),
		cls : 'ExiSAXSMenuToolBar',
		icon : '../images/icon/rsz_ic_home_black_24dp.png',
		handler : function(){
				if (EXI.credentialManager.getCredentials() != null){
					if (EXI.credentialManager.getCredentials().length > 0){
						var username = EXI.credentialManager.getCredentials()[0].username;
						var credential = EXI.credentialManager.getCredentialByUserName(EXI.credentialManager.getCredentials()[0].username);
						if (credential.isManager()){
							location.hash = "/welcome/manager/" + username + "/main";
						}
						else{
							location.hash = "/welcome/user/" + username + "/main";
						}
					}
					else{
						BUI.showError("You should sign up");
					}
				}
				else{
					BUI.showError("You should sign up");
				}
		}
	};
};

MainMenu.prototype.getShipmentItem = function() { 
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Shipments") {
			location.hash = "/proposal/shipping/nav";
		}
		if (item.text == "Manage shipping addresses") {
			location.hash = "/proposal/addresses/nav";
		}
		if (item.text == "Shipment List") {
			location.hash = "/proposal/shipping/nav";
		}
	}

	function getBiosaxsMenu() {
		var _this = this;
		function onItemCheck(item, checked) {
			if (item.text == "Stock Solutions") {
				location.hash = "/saxs/stocksolution/nav";
			}
			
		}

		return Ext.create('Ext.menu.Menu', {
			items : [ 
						{
							text : 'Stock Solutions',
							icon : '../images/icon/testtube.png',
							handler : onItemCheck 
						} 
			] });
	}
	
	
	
	return {
		text : this._convertToHTMLWhiteSpan("Shipment"),
		cls : 'ExiSAXSMenuToolBar',
//		hidden : this.isHidden,
        disabled : false,
		menu : Ext.create('Ext.menu.Menu', {
			items : [ 
						{
							text : 'BioSAXS',
							icon : '../images/icon/macromolecule.png',
							menu: getBiosaxsMenu()
						}, 
						{
							text : 'Manage shipping addresses',
							icon : '../images/icon/contacts.png',
							handler : onItemCheck 
						}, 
						{
							text : 'Shipments',
							icon : '../images/icon/shipping.png',
							handler : onItemCheck 
						} 
					] })
	};

};


MainMenu.prototype.getHelpMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "ISPyB Web services API Map") {
			window.open('/exi/documentation/ispyb-api-ws/print.html');
		}
		if (item.text == "Job list") {
			location.hash = "/tool/list";
		}
	}

	return Ext.create('Ext.menu.Menu', {
		items : [

		{
			text : 'Developer',
			checked : false,
			group : 'theme',
			menu : {       
                    items: [
                        {
                            text: 'ISPyB Web services API Map',
                            handler: onItemCheck
                        }, {
                            text: 'How to retrieve data from ISPyB?',
                            handler: onItemCheck
                        }, {
                            text: 'EXI Router',
                            handler: onItemCheck
                        }, {
                            text: 'EXI List Views Objects',
                            handler: onItemCheck
                        }, {
                            text: 'EXI Main View Objects',
                            handler: onItemCheck
                        }
                    ]
                }
		},
		"-",
		{
				text : 'About',
				checked : false,
				group : 'theme',
				handler : onItemCheck }
		] });
};

MainMenu.prototype.getAddCredentialMenu = function() {
	if (EXI.credentialManager.getCredentials() != null){
		if (EXI.credentialManager.getCredentials().length > 0){
			return {
				icon : '../images/icon/rsz_1ic_input_black_24dp.png',
				height : 30,
				text : 'Add',
				handler : function() {
						window.location.href = '#/login';
				} 
			};
		}
	}
};

MainMenu.prototype.populateCredentialsMenu = function() {
	this.credentialsMenu.removeAll();
	var credentialDisplay = "";
	if (EXI.credentialManager.getCredentials() != null) {
		for (var i = 0; i < EXI.credentialManager.getCredentials().length; i++) {
			credentialDisplay = EXI.credentialManager.getCredentials()[i].username;
			if (EXI.credentialManager.getCredentials()[i].activeProposals.length > 0) {
				for (var j = 0; j < EXI.credentialManager.getCredentials()[i].activeProposals.length; j++) {
					credentialDisplay = EXI.credentialManager.getCredentials()[i].activeProposals[j] + "@" + EXI.credentialManager.getCredentials()[i].username;
					this.credentialsMenu.add({
						text : credentialDisplay,
						icon : "../images/icon/rsz_esrflogo80.gif",
						disabled : true });
				}
			} else {
				this.credentialsMenu.add({
					text : credentialDisplay,
					icon : "../images/icon/rsz_esrflogo80.gif",
					disabled : true });
				
			}
			
			
		}
	} 
	if (EXI.credentialManager.getCredentials().length > 0){
		Ext.getCmp(this.loginButtonId).setText("<span style='color:white'>Log out <span style='font-weight:bold;'>" + credentialDisplay + " </span> </span>");
		Ext.getCmp(this.loginButtonId).setIcon("../images/rsz_logout.png");
	}
	else{
		Ext.getCmp(this.loginButtonId).setText("<span style='color:white'>Sign In</span>");
		Ext.getCmp(this.loginButtonId).setIcon("../images/rsz_login.png");
	}
	
	
};

MainMenu.prototype._convertToHTMLWhiteSpan = function(text) {
	return '<span style="color:white">' + text +'</span>';
};

MainMenu.prototype.isLoggedIn = function() {
	return (EXI.credentialManager.getCredentials().length > 0);
};


MainMenu.prototype.getLoginButton = function() {
	var icon =  "../images/rsz_login.png";
	var text =  this._convertToHTMLWhiteSpan("Sign In");
	
	if (EXI.credentialManager.getCredentials().length > 0){
		icon =  "../images/rsz_logout.png";
		text =  this._convertToHTMLWhiteSpan("log out");
	}
	
	return {
		xtype 	: 'splitbutton',
		id	: this.loginButtonId,
		text 	: text,
		cls 	: 'button_log_out',
		icon 	: icon,
		menu 	: this.credentialsMenu,
		handler : function() {
			if (EXI.credentialManager.getCredentials().length == 0){
				location.hash = "/login";
			}
			else{
				location.hash = "/logout";
			}
		} 
	};
};

MainMenu.prototype.getPanel = function() {
	var _this = this;
	
	this.credentialsMenu = new Ext.menu.Menu({
		id : _this.id + "menu",
		items : [_this.getAddCredentialMenu()] 
	});
	
	var items  = this.getMenuItems();
	items.push('->');
	items.push(this.getLoginButton());
	
	this.tb = Ext.create('Ext.toolbar.Toolbar', {
		cls : this.cssClass,
		items : items
	});
	return this.tb;
};

/*function SelectionMenu() {

	
	
}

SelectionMenu.prototype.openViewer = function() {
	var ids = exiSAXS.localExtorage.selectedSubtractionsManager.getDataCollectionIds();
	location.hash = "/datacollection/dataCollectionId/" + ids.toString() +"/primaryviewer";
};

SelectionMenu.prototype.openMerge = function() {
	var ids = exiSAXS.localExtorage.selectedSubtractionsManager.getDataCollectionIds();
	location.hash = "/datacollection/dataCollectionId/" + ids.toString() +"/merge";
};

SelectionMenu.prototype.clear = function() {
	exiSAXS.localExtorage.selectedSubtractionsManager.clear();
	
};


SelectionMenu.prototype.getPanel = function() {
	var _this = this;
	var tb = Ext.create('Ext.toolbar.Toolbar', {
	    height : 50,
	   
	    items: [
	        {
	            xtype: 'splitbutton',
	            text : 'Actions',
	            menu: new Ext.menu.Menu({
	                items: [
	                    	{text: 'Open Viewer', handler: function(){ _this.openViewer(); }},
	                    	{text: 'Open Merging Tool', handler: function(){  _this.openMerge(); }},
	                    	"-",
	                    	{text: 'Create new Project from Selection', handler: function(){ alert("Item 2 clicked"); }},
	                    	"-",
	                    	{text: 'Discard Selection', handler: function(){_this.clear(); }}
	                    
	                    
	                ]
	            })
	        }
	    ]
	});
	return tb;
};
*/

/**
 * Main class used for the west panel. Main purpose is the navigation
 */

function ListView(){
	this.width = 250;
	this.height = Ext.getBody().getHeight() - 215;

	/** Event is triggered when a element has been selected from the list **/
	this.onSelect = new Event();
}

ListView.prototype.getSorters = function(){
	return {};
};

ListView.prototype.getFilter = function(value){
	return null;
};

ListView.prototype.load = function(data){
	this.data = data;
	if (this.formatData != null){
		this.store.loadData(this.formatData(data));
	}
	else{
		this.store.loadData(data);
	}
};


ListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: this.title,  flex: 1, dataIndex: 'shippingId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

ListView.prototype.getFields = function(){
	return  [];
};

ListView.prototype.getPanel = function(){
	var _this =this;
	this.store = Ext.create('Ext.data.Store', {
	    fields:this.getFields(),
	    data : [],
	    sorters: this.sorters,
	    proxy: {
	        type: 'memory',
	        reader: {
	            type: 'json'
	        }
	    }
	});
	
	this.panel =  Ext.create('Ext.grid.Panel', {
	    store: this.store,
	    layout : 'fit',
	    columns: this.getColumns(),
	    width: this.width,
	    height : this.height,
	    multiSelect : true,
	    dockedItems: [{
	        xtype: 'toolbar',
	        dock: 'bottom',
	        cls : 'x-toolbar',
	        height : 42,
	        items: [
	            {
            xtype: 'textfield',
            name: 'searchField',
            hideLabel: true,
            width: 200,
            hidden : _this.getFilter() == null,
            emptyText : 'Search...',
            listeners : {
    			'change' : function(field, e) {
    						var value = field.getValue();
    						if (value != ""){
    							_this.store.filter(_this.getFilter(value));
    						}
    						else{
    							_this.store.clearFilter(true);
    							_this.load(_this.data);
    						}
    					} 
            		} 
	            }
	        ]
	    }],
	    viewConfig : {
	    	emptyText: 'No items to display',
	    	enableTextSelection : true,
	    	preserveScrollOnRefresh : true,
			stripeRows : true
		}
	});
	
    this.panel.on('selectionchange', function(view, elements){
    		var data = [];
    		for ( var index in elements) {
				data.push(elements[index].data);
			}
    		/** Trigger on select event **/
    		_this.onSelect.notify(data);
	    });
	return this.panel; 
};



/**
* AddressListView displays the address (labcontact information) as list on the navigation panels
*
* @class AddressListView
* @constructor
*/
function AddressListView(){
	this.title = "Addresses";
	this.sorters = [{property : 'cardName', direction: 'ASC'}];
	ListView.call(this);
}

AddressListView.prototype.getPanel = ListView.prototype.getPanel;
AddressListView.prototype.load = ListView.prototype.load;
AddressListView.prototype.getFields = ListView.prototype.getFields;
AddressListView.prototype.getColumns = ListView.prototype.getColumns;

AddressListView.prototype.getFilter = function(value){
	return [{property : "cardName", value : value, anyMatch : true}];
};

/**
* Calls to the dust template in order to render to puck in HTML
*
* @class getRow
* @constructor
*/
AddressListView.prototype.getRow = function(record){
	var html = "";
	dust.render("address.listview", record.data, function(err, out){
        	html = out;
     	});
	return html;
};




function RunListView(){
	this.sorters = [];
	ListView.call(this);
}

RunListView.prototype.getPanel = ListView.prototype.getPanel;
RunListView.prototype.load = ListView.prototype.load;

RunListView.prototype.getFilter = function(value){
	return [{property : "name", value : value, anyMatch : true}];
};


RunListView.prototype.formatStatus = function(status){
	if (status == "FINISHED"){
		return "<span style='color:green;font-weight:bold;'>" + status + "</span>" ;
	}
	return "<span style='color:orange;font-weight:bold;'>" + status + "</span>"; 
};

RunListView.prototype.formatJobs = function(jobs){
	var html = "<table>";
	for (var i = 0; i < jobs.length; i++) {
		html = html + "<tr><td>" + jobs[i].name +"</td></tr>";
	}
	return html + "</table>"; 
};

RunListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
	
		html = html + "<tr><td>Name:</td><td>" + record.data.name+ "</td></tr>";
		html = html + "<tr><td>Status:</td><td>" + this.formatStatus(record.data.status) + "</td></tr>";
		html = html + "<tr><td>Jobs:</td><td>" + this.formatJobs(record.data.jobs) + "</td></tr>";
		html = html + "<tr><td>Date:</td><td>" + record.data.creationDate+ "</td></tr>";
	return html + "</table>";
};

RunListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Jobs',  flex: 1, dataIndex: 'sessionId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

RunListView.prototype.getFields = function(){
	return  ['name', 'status', 'creationDate', 'jobs'];
};



function SessionListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}

SessionListView.prototype.getPanel = ListView.prototype.getPanel;
SessionListView.prototype.load = ListView.prototype.load;

SessionListView.prototype.getFilter = function(value){
	return [{property : "beamlineName", value : value, anyMatch : true}];
};

SessionListView.prototype.formatData = function(data){
	for (var i = 0; i < data.length; i++) {
		data[i]["day"] =  moment(data[i].BLSession_startDate).format("Do");
        data[i]["year"] =  moment(data[i].BLSession_startDate).format("YYYY");
        data[i]["month"] =  moment(data[i].BLSession_startDate).format("MMM");
	}
    
	return data;
};


SessionListView.prototype.getRow = function(record){

    var html = "";
    dust.render("session.listview", record.data, function(err, out){
		html = html + out;
    });
    return html;

};

SessionListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Session',  flex: 1, dataIndex: 'sessionId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

SessionListView.prototype.getFields = function(){
	return  ['date'];
};



function ShippingListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}

ShippingListView.prototype.getPanel = ListView.prototype.getPanel;
ShippingListView.prototype.load = ListView.prototype.load;
ShippingListView.prototype.getFilter = ListView.prototype.getFilter;
ShippingListView.prototype.getFields = ListView.prototype.getFields;
ShippingListView.prototype.getColumns = ListView.prototype.getColumns;


/**
* Calls to the dust template in order to render to puck in HTML
*
* @class getRow
* @constructor
*/
ShippingListView.prototype.getRow = function(record){
	var html = "";
    
	dust.render("shipping.listview", record.data, function(err, out){
        	html = out;
     	});
	return html;
};


function WorkSpaceListView(){
	this.width = 250;
	this.height = 800;

	this.selectionMenu = new SelectionMenu();
	this.onSelect = new Event();
	
	this.projectId = null;
}


WorkSpaceListView.prototype.loadProjects = function(projects){
		if (projects != null){
			this.projectStore.loadData(projects);
		}
		this.loadRuns();
};

WorkSpaceListView.prototype.loadRuns = function(){
	var _this = this;
	var exidataAdapter = new ExiDataAdapter();
	exidataAdapter.onSuccess.attach(function(sender, runs){
		_this.runStore.loadData(runs.reverse());
		_this.runGrid.setLoading(false);
	});
	this.runGrid.setLoading();
	
	this.projectId = exiSAXS.localExtorage.userManager.getActiveProject().internalId;
	exidataAdapter.getRuns(exiSAXS.localExtorage.userManager.getActiveProject().internalId);
};



WorkSpaceListView.prototype.setSelectedItems = function(items){
	/** remove id **/
	for (var i = 0; i < items.length; i++) {
		delete items[i].id;
	}
	this.selection.loadData(items);
	this.projectGrid.collapse();
};




WorkSpaceListView.prototype.getSelectionPanel = function(){
	this.selection = Ext.create('Ext.data.Store', {
	    fields:['subtractionId', 'scattering', 'macromoleculeAcronym', 'concentration', 'framesMerge', 'framesCount', 'exposureTemperature']
	});
	function formatFrames(averaged, count){
		if ((averaged != null) && (count != null)){
			if (averaged / count < 0.3){
				return "<span style='color:red;'>" + averaged + "/" + count + "</span>";
			}
			if (averaged / count < 0.7){
				return "<span style='color:orange;'>" + averaged + "/" + count + "</span>";
			}
		}
		return averaged + "/" + count;
	}
	
	function processResult(answer){
							if (answer == "yes"){
								exiSAXS.localExtorage.selectedSubtractionsManager.remove(record.data);
							}
	}
	
	this.selectionGrid = Ext.create('Ext.grid.Panel', {
	    store: this.selection ,
	    title : "Selection",
	    emptyText : "No selection",
	    tbar : this.selectionMenu.getPanel(),
	    columns: [
	        { 	
	        	text: '',  
	        	dataIndex: 'scattering', 
	        	renderer : function(grid, data, record){
	    			return '<img src=' + new DataAdapter().getImage(record.data.subtractionId, "scattering") + '   height="70" width="70" >';
	        	} 
	        },
	        { 	text: '', 
	        	dataIndex: 'macromoleculeAcronym', 
	        	flex: 0.8, 
	        	renderer : function(grid, data, record){
	    			return record.data.macromoleculeAcronym + 
	    					"<br />" +
	    					 BUI.formatValuesUnits(record.data.concentration, "mg/ml", 7, 2) +
	    					"<br />" +
	    					record.data.exposureTemperature + "<span class='key_subgrid'> C</span>" +
	    					"<br />" +
	    					formatFrames(record.data.framesMerge, record.data.framesCount);
	        	} 	
	        },
	        { 
	        	text: '', 
	        	id : 'remove',
	        	dataIndex: 'scattering', 
	        	width : 50,
	        	renderer: function(value){
	                return "<br />" + '<img style="cursor: pointer; height:30px;width:30px;" src="images/icon/ic_highlight_remove_black_24dp.png" />';
	            }
	        },
	    ],
	    width: 200,
	    listeners: {
	    	cellclick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
					if (cellIndex == 2) {
				
						Ext.Msg.show({
						   title:'Discard subtraction?',
						   msg: 'Your are discarding a selected subtraction. You may re-add it afterwards. Would you like to discard it?',
						   buttons: Ext.Msg.YESNO,
						   icon: Ext.Msg.QUESTION,
						   fn: processResult,
						   height : 150
						});
					}
	    	}
	    }
	});
	return this.selectionGrid;
};

WorkSpaceListView.prototype.getProjectPanel = function(){
	this.projectStore= Ext.create('Ext.data.Store', {
	    fields:['name']
	});

	this.projectGrid = Ext.create('Ext.grid.Panel', {
	    store: this.projectStore,
	    title : "Projects",
	    emptyText : "No projects", 
	    columns: [
	        { text: 'Name',  dataIndex: 'name', flex: 1, 
	        	
	        	renderer : function(grid, opts, record){
	        		var html =  "<span class='projectName'>" + record.data.name + "</span><br/>" +
	        			    "<span class='projectDescription'>"  + record.data.description + "</span>";
	        		
	        		if (record.data.subtractions != null){
	        			html = html + "<br />" + record.data.subtractions.length + " datasets selected";
	        		}
	        		
	        		return html;
	        				
	        	} 
	        }
	    ],
	    height: 200
	});
	return this.projectGrid;
};

WorkSpaceListView.prototype.getRunPanel = function(){
	var _this = this;
	this.runStore= Ext.create('Ext.data.Store', {
	    fields:['name']
	});

	this.runGrid = Ext.create('Ext.grid.Panel', {
	    store: this.runStore,
	    title : "Run",
	    emptyText : "No Runs",
	    minHeight : 600,
	    dockedItems: [{
	        xtype: 'toolbar',
	        dock: 'bottom',
	        ui: 'footer',
	        items: [
	            { xtype: 'component', flex: 1 },
	            { 
	            	xtype: 'button', 
	            	text: 'Refresh', 
	            	handler : function(sender, a, b){
	            		_this.loadRuns();
	            	
	            	} 
	            }
	        ]
	    }],
	    columns: [
	        {
	        	text: 'Name',  
	        	dataIndex: 'name', 
	        	flex: 1, 
	        	renderer : function(grid, opts, record){
	        		var jobs = record.data.jobs;
	        		var html = '<table>';
	        		html = html + "<tr ><td  class='nameRun'>" + record.data.name + "</td></tr>";
	        		html = html + "<tr ><td  class='statusRun'>" + record.data.status + "</td></tr>";
	        		html = html + "<tr ><td  class='dateRun'>" + record.data.creationDate + "</td></tr>";
	        		if (jobs != null){
	        			for (var i = 0; i < jobs.length; i++) {
							html = html + "<tr ><td class='jobRow'>" + jobs[i].name +"</td><td>" + jobs[i].status + "</td></tr>";
						}
	        		}
	        		return html + "</table>";
	        				
	        	} 
	        }
	    ],
	    height: 200
	});
	
	  this.runGrid.on('select', function( grid, record, index, eOpts ){
		  	location.hash = "/project/" + _this.projectId + "/run/" +record.data.internalId + "/main";
	    });
	  
	return this.runGrid;
};


WorkSpaceListView.prototype.getPanel = function(){
	var _this =this;
	this.panel =  Ext.create('Ext.panel.Panel', {
	    layout : 'fit',
	    autoScroll : true,
	    defaults: {
	        bodyStyle: 'padding:15px'
	    },
	    /*layout: {
	        type: 'accordion',
	        titleCollapse: false,
	        animate: true,
	        activeOnTop: true
	    },*/
	    items: [
	            _this.getSelectionPanel(),
	            _this.getProjectPanel(),
	            _this.getRunPanel()
        ]
	});
	return this.panel; 
};

function Credential(username, roles, token, url, exiUrl,activeProposals, tokenExpires, properties) {
	this.username = username.toLowerCase();
	this.roles = roles;
	this.url = url;
	this.exiUrl = exiUrl;
	this.token = token;
	this.activeProposals = activeProposals;
    this.tokenExpires = tokenExpires;
	this.properties = properties;
   
}

Credential.prototype.isManager = function() {
	return this._checkRole("manager");
};

Credential.prototype.isLocalContact = function() {
	return this._checkRole("localcontact");
};

Credential.prototype._checkRole = function(role) {
	return JSON.stringify(this.roles).toLowerCase().indexOf(role) != -1;
};

/**
 * Checks if it has not expired yet
 */
Credential.prototype.isValid = function() {
    return  this.timeToExpire() > 0;
};

/**
 * Checks if it has not expired yet
 */
Credential.prototype.timeToExpire = function() {
    return  moment.duration(moment(this.tokenExpires).diff(moment())).asHours();
};

function CredentialManager(){
	this.onLogin = new Event(this);
	this.onLogout = new Event(this);
	this.onActiveProposalChanged = new Event(this);
}

CredentialManager.prototype.addCredential = function(username, roles, token, url, exiUrl, properties){
    
    var tokenExpires =  moment().add(3, 'hour');
	var credential = new Credential(username, roles, token, url, exiUrl, [], tokenExpires, properties);
	/** Writing to ExtLocalStorage * */
	if (localStorage.getItem("credentials") == null) {
		localStorage.setItem("credentials", "[]");
	}
	var credentials = this.getCredentials();
	credentials.push(credential);
	localStorage.setItem("credentials", JSON.stringify(credentials));
	this.onLogin.notify(credential);
};

CredentialManager.prototype.credentialToObject = function(json){
    return new Credential(json.username,json.roles,	json.token,json.url,json.exiUrl,json.activeProposals,json.tokenExpires,json.properties);
};

CredentialManager.prototype.getCredentials = function(){
	var credentials = [];
	if (JSON.parse(localStorage.getItem("credentials")) != null){
		credentials = JSON.parse(localStorage.getItem("credentials"));
	}
    for (var i=0; i < credentials.length; i++){
        credentials[i] = this.credentialToObject(credentials[i]);
    }
	return credentials;
};

/** Given a beamline name it return MX or SAXS **/
CredentialManager.prototype.getTechniqueByBeamline = function(beamlineName){
	var connections = this.getConnections();
	for (var i = 0; i < connections.length; i++) {
		if (JSON.stringify(connections[i].beamlines.MX).toUpperCase().indexOf(beamlineName.toUpperCase()) != -1){
			return "MX";
		}
		if (JSON.stringify(connections[i].beamlines.SAXS).toUpperCase().indexOf(beamlineName.toUpperCase()) != -1){
			return "SAXS";
		}
	}
	return "UNKNOW";

};

/** Returns an string with the name of all the beamlines **/
CredentialManager.prototype.getBeamlines = function(){
	var connections = this.getConnections();
  var beamlines = [];
	for (var i = 0; i < connections.length; i++) {
      $.merge(beamlines, connections[i].beamlines.MX);
      $.merge(beamlines, connections[i].beamlines.SAXS);
	}
	return beamlines;

};

CredentialManager.prototype.getConnections = function(){
	var credentials = this.getCredentials();
	var connectors = [];
	for (var i = 0; i < credentials.length; i++) {
		if (credentials[i].activeProposals.length > 0){
			for (var j = 0; j < credentials[i].activeProposals.length; j++) {
				connectors.push({
					username : credentials[i].username,
					url : credentials[i].url,
					exiUrl : credentials[i].exiUrl,
					token : credentials[i].token,
					beamlines : credentials[i].properties.beamlines,
					proposal : credentials[i].activeProposals[j] });
			}
		}
		else{
				connectors.push({
					username : credentials[i].username,
					url : credentials[i].url,
					exiUrl : credentials[i].exiUrl,
					token : credentials[i].token,
					beamlines : credentials[i].properties.beamlines,
					proposal : null
				});
		}
	}
	return connectors;
};

CredentialManager.prototype.getCredentialByUserName = function(username){
    var found =  _.filter(this.getCredentials(), {username : username});
    if (found.length > 0){
        return found[0];
    }
	
};

CredentialManager.prototype.logout = function(username, roles, token, url){
	localStorage.removeItem('credentials');
	this.onLogout.notify();
};

CredentialManager.prototype.setActiveProposal = function(username, proposal){
	var credentials = this.getCredentials();
	for (var i = 0; i < credentials.length; i++) {
		if (credentials[i].username.toLowerCase() == username.toLowerCase()) {
			credentials[i].activeProposals = [proposal];
			localStorage.setItem("credentials", JSON.stringify(credentials));
			localStorage.removeItem("sessions");
			this.onActiveProposalChanged.notify();
		}
	}
};



function MainView(args) {
	this.id = BUI.id();
	this.title = "New Tab";
	this.closable = true; 
	this.onSelectionChange = new Event(this);
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
	
	//this.bodyStyle = {"background-color":"#FAFAFA"};
    
    if (args != null){
        if (args.title != null){
            this.title = args.title;
        }
    }

}

MainView.prototype.getContainer = function() {
	return this.container;
};

MainView.prototype.getPanel = function() {
	this.container = Ext.create('Ext.container.Container', {
		xtype : 'container',
		items : []
	});

	this.panel = Ext.create('Ext.panel.Panel', {
		autoScroll : true,
		title : this.title,
		closable: this.closable,
		icon : this.icon,
		bodyStyle: this.bodyStyle, 
		items :[this.getContainer() ]
	});
	return this.panel;
};
function AddressMainView() {
	this.icon = '../images/icon/contacts.png';
	this.queueGridList = [];

	MainView.call(this);

	this.addressForm = new AddressForm();
	
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

AddressMainView.prototype.getPanel = MainView.prototype.getPanel;

AddressMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    margin : 15,
	    border: 1,
	    defaults: {
	        labelWidth: 80,
	        flex: 1,
	    },
	    items: [this.addressForm.getPanel([])]
	});
};


AddressMainView.prototype.load = function(labContactId) {
	
	this.panel.setTitle("Address");
	var _this = this;
	var onSuccess = function(sender, data){
		_this.addressForm.load(data);
	};
	
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.labcontacts.getLabContactById(labContactId);
	
	
};


/**
* Class for the manager landing page. It inherits from MainView
*
* @class ManagerWelcomeMainView
* @constructor
*/
function ManagerWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Home";
	this.closable = false;

    this.sessionGrid = new SessionGrid({
                    width : null,
                    height:600,
                    isHiddenTitle : true,
                    isHiddenPI : false,
                    isHiddenNumberOfShifts : false,
                    isHiddenLocalContact : false,                                        
                    margin : '10 10 10 10'
    });
    
    this.proposalGrid = new ProposalGrid({
                                            width: 900,
                                            height:600,
                                            margin : '10 10 10 10'

                                    });
}

ManagerWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;

/**
* This sets an active proposal into the credential Manager. It also retrieve all the information about the proposal: shipments, macromolecules, crystals, buffers, etc.. and store 
* them in a local storage
*
* @method activeProposal
* @param {Object} proposal Proposal object that should container at least: [code, number]
*/
ManagerWelcomeMainView.prototype.activeProposal = function(proposal) {
    
    EXI.mainStatusBar.showBusy("Loading proposal " +proposal); 
    
	EXI.credentialManager.setActiveProposal(this.username, proposal);
    EXI.proposalManager.clear();
	/** I don't need this to be synchronous **/	
    EXI.proposalManager.onActiveProposalChanged = new Event();
    EXI.proposalManager.onActiveProposalChanged.attach(function(){
        EXI.mainStatusBar.showReady();
        console.log(EXI.proposalManager.get());
    });
	EXI.proposalManager.get();
};


ManagerWelcomeMainView.prototype.getContainer = function() {
	this.container = Ext.create('Ext.panel.Panel', {
		autoScroll : true,
        margin : 20,
        cls : 'border-grid',
        tbar : this.getToolbar(),
            items :[
                this.sessionGrid.getPanel()
        ]
	});
	return this.container;
};

/**
* It receives a list of proposals and display them in the main container
*
* @param {Object} proposals Arrays of Proposal objects
* @method displayProposals
*/
ManagerWelcomeMainView.prototype.displayProposals = function(proposals) {
    var _this = this;
    this.container.removeAll();
   
    this.proposalGrid.onSelected.attach(function(sender, proposal){
            _this.panel.setLoading(true);
            var proposalCode = proposal.Proposal_proposalCode + proposal.Proposal_proposalNumber;
            function onSuccess(sender, sessions){
                _this.displaySessions(sessions, sessions.length + " sessions for proposal " + proposalCode);
                _this.panel.setLoading(false);
            }
            EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByProposal(proposalCode);
                            
            /** Loading Proposal info */                 
            _this.activeProposal( proposal.Proposal_proposalCode + proposal.Proposal_proposalNumber);
        
    });
    
    this.container.insert(this.proposalGrid.getPanel());
    this.proposalGrid.load(proposals);
};

/**
* Retrieves a list of sessions based on a start date and end date and loads them on the session grid
*
* @param {String} start Date should be in the format of YYYYMMDD
* @param {String} end Date should be in the format of YYYYMMDD
* @method loadByDate
*/
ManagerWelcomeMainView.prototype.loadByDate = function(username, start, end) {
          var _this = this;
          this.panel.setLoading(true);
          function onSuccess(sender, data){              
        	  _this.displaySessions(data, data.length + " sessions scheduled on " + moment(start, 'YYYYMMDD').format('MMMM Do YYYY'));
        	  _this.panel.setLoading(false);
          }
          /** Increasing one day */
          end = moment(end, "YYYYMMDD").add(1, 'days').format("YYYYMMDD");                    
          if (this.isUser(username)){
		        EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByProposalAndDate(start, end, username);
          }
          else{
                EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByDate(start, end);
          }
};

/**
* Removes oldest sessions up to get only 500
*
* @param {String} sessions List of sessions
* @method filterSessions
*/
ManagerWelcomeMainView.prototype.filterSessions = function(sessions) {    
        var realLength = sessions.length;
        data = _.slice(sessions, 0, 500);
        // Sorting by start date because sessionId does not sort by date
        _(sessions).forEach(function(value) {
                value['ms'] = moment(value.BLSession_startDate, 'MMM DD, YYYY h:mm:ss a').format('x');
        });
        sessions = _.orderBy(sessions, ['ms'], ['desc']);
        return sessions.slice(0, 300);
        
};
        
ManagerWelcomeMainView.prototype.displaySessions = function(sessions, title) {
    var _this = this;
    
    /** it loads the session panel */
    this.container.removeAll();   
    this.container.insert(this.sessionGrid.getPanel());

    /** Handling onSelected **/
    this.sessionGrid.onSelected.attach(function(sender, args){
        EXI.proposalManager.clear();
        _this.activeProposal(args.proposalCode + args.proposalNumber);
    });
    
    this.sessionGrid.load(this.filterSessions(sessions));
    this.sessionGrid.panel.setTitle(title);
};

ManagerWelcomeMainView.prototype.getToolbar = function() {
   var _this = this;
   var dateMenu = Ext.create('Ext.menu.DatePicker', {
        handler: function(dp, date){            
            location.href = "#/welcome/manager/" + _this.username +"/date/"+ Ext.Date.format(date, 'Ymd') +"/" + Ext.Date.format(date, 'Ymd') +"/main";          
        }
    });

    return Ext.create('Ext.toolbar.Toolbar', {
        width   : 500,
        cls 	: 'exi-top-bar',
        items: [
            {
               text: 'Choose a Date',
               icon : '../images/icon/sessions.png',
               menu: dateMenu 
            },
            {
                xtype    : 'textfield',
                name     : 'field1',
                width    : 300,
                emptyText: 'enter search term (proposal or title)',
    			listeners : {
    				specialkey : function(field, e) {
    					if (e.getKey() == e.ENTER) {
    						var found = _this.searchProposalByTerm(field.getValue());
    						_this.displayProposals(found);
    					}
    				} 
    			} 
            }
        ]
    });
};

ManagerWelcomeMainView.prototype.searchProposalByTerm = function(term) {
	var result = [];
	if (this.proposals != null){
		for (var i = 0; i < this.proposals.length; i++) {
			var proposalId = this.proposals[i]["Proposal_proposalCode"] +  this.proposals[i]["Proposal_proposalNumber"];
			var title = this.proposals[i]["Proposal_title"];
			if (title == null){
				title = "";
			}
			if ((proposalId.toUpperCase().match(term.toUpperCase())) ||(title.toUpperCase().match(term.toUpperCase()))){
				result.push(this.proposals[i]);
			}
		}
	}
	return result;
};

/**
* Retrieves all proposas on ISPyB and stores them on this.proposal 
* It is useful for fast search later on
*
* @method loadProposals
*/
ManagerWelcomeMainView.prototype.loadProposals = function(callback) {
	var _this = this;
	var onSuccess = function(sender, proposals){
		_this.proposals = proposals;
        if (callback){            
            callback();
        }
	};	
	EXI.getDataAdapter({onSuccess:onSuccess}).proposal.proposal.getProposals();
};

ManagerWelcomeMainView.prototype.isUser = function(username) {
       return (!EXI.credentialManager.getCredentialByUserName(username).isManager() && (!EXI.credentialManager.getCredentialByUserName(username).isLocalContact()));
};

ManagerWelcomeMainView.prototype.load = function(username) {      
  this.username = username;  
  /** By default for users we load all the sessions and managers only sessions that occurs today */
  if (this.isUser(username)){
    this.loadSessionsByProposal(username);  
    /** set active proposal */
    this.activeProposal(username);
  }
  else{
    var today = moment().format("YYYYMMDD");
    this.loadSessionsByDate(username, today, today);
  }    
  EXI.setLoadingMainPanel(false);
};

/**
* Retrieves all sessions for the proposal
*
* @method loadSessions
*/
ManagerWelcomeMainView.prototype.loadSessionsByProposal = function(username) {
    this.username = username;
    var _this = this;
    this.panel.setLoading(true);
    function onSuccess(sender, data){
       _this.displaySessions(data, "Sessions for proposal " + username);
       _this.panel.setLoading(false);
    }
    EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByProposal(username);
};


ManagerWelcomeMainView.prototype.loadSessionsByDate = function(username, start, end) { 
  this.username = username;
  this.loadByDate(username, start, end);  
   /** This is need for quick searchs on proposals **/
  this.loadProposals(); 
};

ManagerWelcomeMainView.prototype.loadSessionsByTerm = function(username, term) {
  this.username = username;    
  /** This is need for quick searchs on proposals **/
  var _this = this;
  var onSuccess = function(sender, proposals){
		_this.proposals = proposals;
       _this.searchProposalByTerm(term);
  };
  EXI.getDataAdapter({onSuccess:onSuccess}).proposal.proposal.getProposals();
};

function RunMainView() {
	this.id = BUI.id();
	MainView.call(this);
}

RunMainView.prototype.getPanel = MainView.prototype.getPanel;

RunMainView.prototype.getOutputPanel = function() {
	this.outputStore = Ext.create('Ext.data.Store', {
	    fields:['name', 'value', 'type', 'targetId', 'tool', 'i' ],
	    groupField: 'tool',
	    sorters : [{property: 'i', direction : 'DESC'}]
	});

	return Ext.create('Ext.grid.Panel', {
	    store: this.outputStore,
	    cls : 'border-grid',
	    features: [{ftype:'grouping'}],
	    columns: [
	        { text: 'Tool',  dataIndex: 'tool', flex : 1, hidden:true },
	        { text: 'id',  dataIndex: 'i', flex : 1, hidden:true },
	        { text: 'Name',  dataIndex: 'name', flex : 1 },
	        { text: 'value', dataIndex: 'value', flex : 1 },
	        { text: 'type', dataIndex: 'type', flex : 1 },
	        { text: 'target', dataIndex: 'targetId', flex : 1, hidden:true },
	        { text: '', dataIndex: 'targetId', flex : 1, renderer : function(grid, opt, record){
        		var url =EXI.credentialManager.getConnections()[0].exiUrl + "/file/" + record.data.targetId + "/download";
        		return "<div><a style='color:blue;' href='"+ url +"'>Download</a></div>";
	        } 
        }
	    ]
	});
};


RunMainView.prototype.getGeneralContainerList = function(run) {
	var li = "<ul class='generalContainerRunList'>";
	li = li + "<li>Name: " + run.name + "</li>";
	li = li + "<li>Status: " + run.status + "</li>";
	li = li + "<li>" + run.creationDate + "</li>";
	return li;
};

RunMainView.prototype.getGeneralContainer = function(run) {
	return {
		xtype : 'panel',
		title : "General",
		margin : 10,
		border : 1,
		style: {borderColor:'gray', borderStyle:'solid', borderWidth:'1px'},
		items : [
		         {
		        	 html 		: this.getGeneralContainerList(run),
		        	 margin 	: '10 0 0 50'
		         }
		]
	};
};

RunMainView.prototype.getMainPanel = function() {
	
};

RunMainView.prototype.getTabs = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '20 0 0 0',
				items : [
				     	this.getMainPanel(),
					{
						tabConfig : {
							title : 'Output Files'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 700,
							padding : 20,
							cls : 'border-grid',
							items : [ 
							         this.getOutputPanel()
							]
						}

						]
					}
//				     	,
//					{
//						tabConfig : {
//							title : "Input",
//						},
//						items : [  
//									{
//										xtype : 'container',
//										layout : 'vbox',
//										height : 700,
//										padding : 20,
//										cls : 'border-grid',
//										items : [ 
//										     	]
//									}
//					]
//			}
			]});
};

RunMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'anchor'
	    },
	    defaults : {
			anchor : '100%',
			hideEmptyLabel : false },
	    margin : 5,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    items: [
	            
	            	this.getTabs()
	            ]
	});
};

RunMainView.prototype.loadMain = function(run) {
	
};

RunMainView.prototype.load = function(run) {
	if (run != null) {
		this.panel.setTitle(run.name);
		var parsed = [];
		for (var i = 0; i < run.jobs.length; i++) {
			for (var j = 0; j < run.jobs[i].output.length; j++) {
				run.jobs[i].output[j]["tool"] = run.jobs[i].name + " " + run.jobs[i].version;
				run.jobs[i].output[j]["i"] = i;
				parsed.push(run.jobs[i].output[j]);
			}
		}
		this.outputStore.loadData(parsed);
	}
	this.loadMain(run);
};

function DimpleRunMainView() {
	this.title = "Experiment";
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	this.id = BUI.id();
	RunMainView.call(this);
}

DimpleRunMainView.prototype.getPanel = RunMainView.prototype.getPanel;
DimpleRunMainView.prototype.getOutputPanel = RunMainView.prototype.getOutputPanel;
DimpleRunMainView.prototype.getTabs = RunMainView.prototype.getTabs;
DimpleRunMainView.prototype.getContainer = RunMainView.prototype.getContainer;
DimpleRunMainView.prototype.load = RunMainView.prototype.load;

DimpleRunMainView.prototype.getFilesGrid = function() {
	var _this = this;
	
	this.filesStore = Ext.create('Ext.data.Store', {
	    fields:['name', 'targetId']
	});
	
	var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect : true,
		listeners : {
			selectionchange : function(sm, selections) {
				console.log(selections[0].data);
				var onSuccess = function(sender, content){
					document.getElementById(_this.id + "display").innerHTML = "<textarea rows='100' cols='100'> " + content + "</textarea>" ;
				};
				if (selections[0].data.name.indexOf(".mtz") == -1){
					EXI.getDataAdapter({onSuccess:onSuccess}).exi.offline.getFileContent(selections[0].data.targetId);
				}
				else{
					onSuccess(this, "No text available");
				}
			}

		} });
	
	return  Ext.create('Ext.grid.Panel', {
	    title: 'Files',
	    store:this.filesStore,
	    selModel : selModel,
	    cls : 'border-grid',
	    height : 400,
	    columns: [
	        { text: 'Name',     dataIndex: 'name', flex : 1}
	    ]
	});
};






DimpleRunMainView.prototype.getMainPanel = function() {
	var store = Ext.create('Ext.data.Store', {
	    fields:['key', 'value']
	});
	
	this.generalGrid = Ext.create('Ext.grid.Panel', {
	    title: 'General',
	    store:store,
	    layout : 'fit',
	    columns: [
	        { text: 'Name',     dataIndex: 'name' },
	        { text: 'Seniority', dataIndex: 'seniority' }
	    ],
	    flex : 1
	});
	
	
	return {
		tabConfig : {
			title : 'Dimple'
		},
		items : [ {
							xtype : 'container',
//							layout : 'fit',
							height : 700,
							cls : 'border-grid',
							items : [ 
							         {
											xtype : 'container',
											layout : 'hbox',
											items : [
											         {
															xtype : 'container',
															layout : 'fit',
															flex : 0.4,
															margin: 5,
															items : [
																	this.getFilesGrid(),
																	{
																		html : "<br />"
																	},
																	 {
															        	 html : '<div id="' + this.id +'blobs";><div>'
															        	 
															         }
															]
											         },
											         {
															xtype : 'container',
															layout : 'fit',
															flex : 0.6,
															margin: 5,
															height : 400,
															cls : 'border-grid',
															items : [
															         {
															        	 html : '<div id="' + this.id +'display";><div>'
															        	 
															         }
													         ]
											         }
									         ]
							         },
							         {
											xtype : 'container',
											margin: 5,
											height : 210,
											layout : 'fit',
											flex : 1,
//											cls : 'border-grid',
											items : [
											         {
											        	 html : '<div style="height:200px"  id="' + this.id +'snapshots";><div>'
											        	 
											         }
									         ]
							         }
							 ]
			         
			}
		]
	};
};

DimpleRunMainView.prototype.loadBlobs = function(job) {
	var blobs = [];
	var i = 0;
	for (i = 0; i < job.output.length; i++) {
		if (job.output[i].type == "blob"){
			blobs.push(job.output[i]);
		}
	}
	
	/** Rendering blobs **/
//	var table = document.createElement("table");
	var container = document.createElement("div");
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	for (i = 0; i < blobs.length; i++) {
		var td = document.createElement("td");
		var img = document.createElement("img");
		img.setAttribute("src", EXI.getDataAdapter().exi.offline.getFileImage(blobs[i].targetId));
		img.setAttribute("height", "180px");
		img.setAttribute("width", "180px");
		img.setAttribute("hspace", "10");
		
		img.setAttribute("onclick", "window.open(this.src)");
		td.appendChild(img);
		tr.appendChild(td);
		
		
	}
	table.appendChild(tr);
	document.getElementById(this.id + "snapshots").innerHTML =  table.innerHTML;
//	document.getElementById(this.id + "blobs").innerHTML = table.innerHTML;
};

DimpleRunMainView.prototype.loadFiles = function(job) {
	var files = [];
	for (var i = 0; i < job.output.length; i++) {
		if (job.output[i].type != "blob"){
			files.push(job.output[i]);
		}
	}
	this.filesStore.loadData(files);
};



DimpleRunMainView.prototype.loadMain = function(run) {
	console.log(run);
	if (run != null){
		if (run.jobs != null){
			if (run.jobs.length > 0){
				for (var i = 0; i < run.jobs.length; i++) {
					this.loadBlobs(run.jobs[i]);
					this.loadFiles(run.jobs[i]);
				}
			}
		}
	}
};
function SessionMainView(args) {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this, args);
	var _this = this;
	
	this.sessionGrid = new SessionGrid({
         width : 700,
         height: 598,
         margin : '0 0 0 20',
        title : "Click on calendar to see the sessions"
    });
}

SessionMainView.prototype.getPanel = MainView.prototype.getPanel;

SessionMainView.prototype.getContainer = function() {
    _this = this;
    
    
    this.subpanel =  Ext.create('Ext.container.Container', {
         layout:  'fit',  
         border : 0,  
        items : [
         
        ]
    });
	this.panel = Ext.create('Ext.container.Container', {
        layout:  'hbox',    
        margin : 10,        
        items: [            
                    {
                        html: '<div style="height:600px" id="' + this.id +'"></div>',
                        height :600,
                        border :0 ,
                        width : 600,                                         
                    } ,
                    this.subpanel                               
                    
            ],
        listeners: {
            afterrender: function() {
                _this.showCalendar([]);
            }
        }
    }
    );
	return this.panel;	
};

SessionMainView.prototype.showCalendar = function(data) {
     var _this = this;
     $('#' + _this.id).empty();
     function editEvent(event) {
                         _this.loadByDate(moment(new Date(event.startDate)).format("YYYYMMDD"));
      }
        $('#' + this.id).calendar({
            enableContextMenu: true,
            enableRangeSelection: true,
            selectRange: function(e) {
                editEvent({ startDate: e.startDate, endDate: e.endDate });
            },
            mouseOnDay: function(e) {
                if(e.events.length > 0) {
                    var content = '';
                    
                    for(var i in e.events) {
                        content += "<div class='event-tooltip-content'><div class='event-name' style='color:" + e.events[i].color + "'>" + e.events[i].name + "</div><div class='event-location'>" + e.events[i].location + "</div></div>";
                    }
                
                    $(e.element).popover({ 
                        trigger: 'manual',
                        container: 'body',
                        html:true,
                        content: content
                    });
                    
                    $(e.element).popover('show');
                }
            },
            mouseOutDay: function(e) {
                if(e.events.length > 0) {
                    $(e.element).popover('hide');
                }
            },
            dayContextMenu: function(e) {
                $(e.element).popover('hide');
            },
            dataSource: data
            
        });
};

SessionMainView.prototype.getBadge = function(title, count) {
    if (count){
        if (count != 0){
            return '<span>' + title + '  <span class="badge">' + count +'</span></span><br />';
        }
    }
    return "";
};
SessionMainView.prototype.getLocation = function(session) {
    var html = this.getBadge("Collect", session.dataCollectionGroupCount);
    html = html + this.getBadge("Images", session.imagesCount);
    html = html + this.getBadge("XRF", session.xrfSpectrumCount);
    html = html + this.getBadge("Energy", session.energyScanCount);
    return html + this.getBadge("Sample", session.sampleCount);
}; 

SessionMainView.prototype.load = function(sessions) {
	var sessionForCalendar = [];
    for(var i = 0; i < sessions.length; i++){
        sessionForCalendar.push({
           id : sessions[i].sessionId,
           name : sessions[i].Proposal_proposalCode + sessions[i].Proposal_ProposalNumber + "( " + sessions[i].beamLineName + " )",
           location : this.getLocation(sessions[i]),
           startDate : new Date(sessions[i].BLSession_startDate), 
           endDate : new Date(sessions[i].BLSession_endDate)
        });
        
    }
    
    this.showCalendar(sessionForCalendar);
    this.subpanel.insert( this.sessionGrid.getPanel());
    //this.sessionGrid.load(sessions);
    
    var _this = this;
    /** Rendering proposal Header */
    if ($("#" + this.id + "_header")){
        if (EXI.proposalManager.getProposals().length > 0){
            var proposal = EXI.proposalManager.getProposals()[0];
            proposal.sessionCount = sessions.length; 
            dust.render('welcomemainviewproposalheader', proposal, function(err, out) {
                
                $("#" + _this.id + "_header").html(out);
                _this.panel.insert(0,
                    {
                        html  :   out,
                        border : 0,
                        margin : '10 0 0 10',
                        width : 600
                        
                    });
            });
        }        
    }    
};

SessionMainView.prototype.loadByDate = function(start) {
          var _this = this;
          this.panel.setLoading(true);
          function onSuccess(sender, sessions){              
        	  //_this.displaySessions(data, data.length + " sessions scheduled on " + moment(start, 'YYYYMMDD').format('MMMM Do YYYY'));
             _this.sessionGrid.load(sessions);
        	  _this.panel.setLoading(false);
          }
          /** Increasing one day */
         var username = EXI.credentialManager.getCredentials()[0].activeProposals[0];
         var end = moment(start, "YYYYMMDD").format("YYYYMMDD");                    
         EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByProposalAndDate(start, end, username);          
};















/**
 * @showTitle
 *
 * #onSaved
 * #onAddPlates
 * #onRemovePlates
 **/
function CaseForm(args) {
	this.id = BUI.id();
	this.width = 600;
	this.showTitle = true;
	if (args != null) {
		if (args.showTitle != null) {
			this.showTitle = args.showTitle;
		}
	}

	this.onSaved = new Event(this);
}

CaseForm.prototype.fillStores = function() {
	var _this = this;
	this.panel.setLoading("Loading Labcontacts from database");

	var proposal = BUI.getProposal();
	proposal.onDataRetrieved.attach(function(sender, data) {
		_this.labContactForSendingStore.loadData(data, false);
		_this.labContactForReturnStore.loadData(data, false);
		_this.panel.setLoading(false);
	});
	proposal.getLabContactsByProposalId();

};

CaseForm.prototype.refresh = function(dewar) {
	this.setDewar(dewar);
};

CaseForm.prototype.getDewar = function() {
	this.dewar.code = Ext.getCmp(this.id + "dewar_code").getValue();
	this.dewar.comments = Ext.getCmp(this.id + "dewar_comments").getValue();
	this.dewar.transportValue = Ext.getCmp(this.id + "dewar_transportValue").getValue();
//	this.dewar.storageLocation = Ext.getCmp("dewar_storageLocation").getValue();
	this.dewar.storageLocation = this.storageLocationComboBox.getValue();
	//this.dewar.firstExperimentId = this.sessionsCombo.getValue();
	return this.dewar;
};

CaseForm.prototype.setDewar = function(dewar) {
	this.dewar = dewar;
	
	if (this.dewar == null){
		this.dewar={};
		this.dewar["code"] = "";
		this.dewar["transportValue"] = "";
		this.dewar["storageLocation"] = "";
		this.dewar["comments"] = "";
	}
	
	Ext.getCmp(this.id + "dewar_code").setValue(this.dewar.code);
	Ext.getCmp(this.id + "dewar_comments").setValue(this.dewar.comments);
	Ext.getCmp(this.id + "dewar_transportValue").setValue(this.dewar.transportValue);
//	Ext.getCmp("dewar_storageLocation").setValue(this.dewar.storageLocation);
	this.storageLocationComboBox.setValue(this.dewar.storageLocation);
	/*if (this.dewar.sessionVO != null) {
		this.sessionsCombo.setValue(this.dewar.sessionVO.sessionId);
	}*/
};

/*
CaseForm.prototype.getSessionCombo = function() {
	this.sessionsCombo = BIOSAXS_COMBOMANAGER.getComboSessions(EXI.proposalManager.getFutureSessions(), {
		labelWidth : 200,
		margin : '5 0 00 0',
		width : 500
	});
	return this.sessionsCombo;
};*/

CaseForm.prototype.getStorageLocationCombo = function() {
	this.storageLocationComboBox =  BIOSAXS_COMBOMANAGER.getComboStorageTemperature();
	return this.storageLocationComboBox;
};

CaseForm.prototype.getPanel = function(dewar) {
		this.panel = Ext.create('Ext.form.Panel', {
			width : this.width - 10,
//			cls : 'border-grid',
//			margin : 10,
			padding : 10,
			height : 320,
			items : [ {
				xtype : 'container',
				margin : "2 2 2 2",
				collapsible : false,
				defaultType : 'textfield',
				layout : 'anchor',
				items : [ {
					xtype : 'container',
					layout : 'vbox',
					items : [ {
						xtype : 'requiredtextfield',
						fieldLabel : 'Name',
						allowBlank : false,
						name : 'code',
						id : this.id + 'dewar_code',
						labelWidth : 200,
						width : 500
					}
					]
				}, 
				this.getStorageLocationCombo(),
				{
					xtype : 'numberfield',
					width : 500,
					labelWidth : 200,
					margin : '10 0 0 0',
					fieldLabel : 'Transport Value',
					id : this.id + 'dewar_transportValue'
				},
				{
					xtype : 'textareafield',
					name : 'comments',
					fieldLabel : 'Comments',
					labelWidth : 200,
					width : 500,
					margin : '10 0 0 0',
					height : 100,
					id : this.id + 'dewar_comments'
				} ]
			} ]
		});
	this.refresh(dewar);
	return this.panel;
};

function ContainerSpreadSheet(args){
	this.id = BUI.id();
	this.height = 380;
	this.width = 500;
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
	}
	
	this.onModified = new Event(this);
}

ContainerSpreadSheet.prototype.getPanel = function(){
	var _this = this;
	this.panel = Ext.create('Ext.panel.Panel', {
		layout : 'vbox',
		height 		: this.height+ 50,
		items : [ 
				  {
						html 		: '<div  style="overflow: auto;overflow-y: hidden; border:1px solid gray;background-color:white;height:500px;width:' + (_this.width - 20) +'px"; id="' + this.id + '_samples"; ></div>',
						margin 		: '20 0 20 10',
						height 		: this.height,
						width 		: this.width,
						autoScroll 	: true,
						resizable 	: true
					}]
	});
    return this.panel;
};


ContainerSpreadSheet.prototype.getSamplesData = function(puck) {
	var samples = puck.sampleVOs;
	var data = [];
	/** Sorting samples by location * */
	samples.sort(function(a,b){return Number(a.location) - Number(b.location);});
	function getSampleByLocation(samples, location){
		for (var i = 0; i < samples.length; i++) {
			if (samples[i].location == Number(location)){
				return samples[i];
			}
		}
	}

	function getValue(value){
		if (!value){return "";}
        return value;
	}
	
	for (var i = 0; i < puck.capacity; i++) {
		var sample = getSampleByLocation(samples, i + 1);
		if (sample!= null){
				var crystal = sample.crystalVO;
				var protein = crystal.proteinVO;
				var diffraction = sample.diffractionPlanVO;
				if (diffraction == null){
					diffraction = {};
				}
				data.push(
					[(i+1), protein.acronym, sample.name, crystal.spaceGroup, diffraction.experimentKind, sample.code,  getValue(diffraction["observedResolution"]),  diffraction.requiredResolution, diffraction.preferredBeamDiameter, 
					 diffraction.numberOfPositions, diffraction.radiationSensitivity, diffraction.requiredMultiplicity, diffraction.requiredCompleteness,
					 crystal.cellA, crystal.cellB, crystal.cellC, crystal.cellAlpha, crystal.cellBeta, crystal.cellGamma, sample.smiles, sample.comments
					 ]
				);
		}
		else{
			data.push([(i+1)]);
		}
	}
	return data;
};


ContainerSpreadSheet.prototype.getSpaceGroups = function() {
	return ["P1","P2","P21","C2","P222","P2221","P21212","P212121","C222","C2221","F222","I222","I212121","P4","P41","P42","P43","P422","P4212","P4122","P41212","P4222","P42212","P4322","P43212",
                	"I4","I41","I422","I4122","P3","P31","P32","P31","P321","P3112","P3121","P3212","P3221","P6","P61","P65","P62","P64","P63","P622","P6122","P6522","P6222","P6422","P6322","R3","R32","P23","P213",
                	"P432",	"P4232","P4332","P4132","F23","F432","F4132","I23",	"I213","I432","I4132", "UNKNOWN"];
};


ContainerSpreadSheet.prototype.getAcronyms = function() {
	var proteins = EXI.proposalManager.getProteins();
	var acronyms = [];
	for (var i = 0; i < proteins.length; i++) {
		acronyms.push(proteins[i].acronym);
	}
	return acronyms;
};


ContainerSpreadSheet.prototype.getHeader = function() {
	return  [
	         { text : '#', 	id: 'position', column : {width : 20}}, 
	         { text :'Protein <br />Acronym', id :'Protein Acronym', 	column :  {
																						width : 60,
																						type: 'dropdown',
																						source: this.getAcronyms()
																					}
	         }, 
	         { text :'Sample<br /> Name', id :'Sample Name', column : {width : 120}}, 
	         { text :'Space<br /> Group', id : 'Space Group',column : {
			        	 													width : 90,
			        	 													type: 'dropdown',
			        	 													source: this.getSpaceGroups()
			         								}
	         }, 
	         { text :'Exp.<br /> Type', id : 'Experiment Type', column : {
							        	 								width : 80,  
							        	 								type: 'dropdown',
							        	 								source: [ "Default", "MXPressE", "MXPressO", "MXPressI", "MXPressE_SAD", "MXScore", "MXPressM" ]
							         								}
	         }, 
	         { text :'Pin <br />BarCode', id : 'Pin BarCode', column : {width : 45}},  
	         { text :'Pre-observed <br />resolution', id : 'Pre-observed resolution', column : {width : 45}}, 
	         { text :'Needed<br /> resolution',  id :'Needed resolution', column : {width : 45}}, 
	         { text :'Pref. <br />Diameter', id :'Pref. Diameter',column : {width : 45}}, 
	         { text :'Number Of<br /> positions', id :'Number Of positions', column : {width : 45}}, 
	         { text :'Radiation<br /> Sensitivity', id :'Radiation Sensitivity', column : {width : 60}}, 
	         { text :'Required<br /> multiplicity', id :'Required multiplicity', column : {width : 60}}, 
	         { text :'Required<br /> Completeness', id :'Required Completeness', column : {width : 60}}, 
	         { text :'A', id :'Unit cell A', column : {width : 40}}, 
	         { text :'B', id :'Unit cell B', column : {width : 40}}, 
	         { text :'C', id : 'Unit cell C', column : {width : 40}}, 
	         { text :'&#945;', id :'Unit cell Alpha', column : {width : 40}}, 
	         { text :'&#946;', id :'Unit cell Beta', column : {width : 40}}, 
	         { text :'&#947;', id :'Unit cell Gamma', column : {width : 40}}, 
	         { text :'Smiles', id :'Required Completeness', column : {width : 45}}, 
	         { text :'Comments', id :'Comments', column : {width : 45}}
	         ];
};

ContainerSpreadSheet.prototype.getHeaderWidth = function() {
	var header = this.getHeader();
	var text = [];
	for (var i =0; i < header.length; i++){
		text.push(header[i].column.with);
	}
	return text;
};

ContainerSpreadSheet.prototype.getHeaderId = function() {
	var header = this.getHeader();
	var text = [];
	for (var i =0; i < header.length; i++){
		text.push(header[i].id);
	}
	return text;
};

ContainerSpreadSheet.prototype.getHeaderText = function() {
	var header = this.getHeader();
	var text = [];
	for (var i =0; i < header.length; i++){
		text.push(header[i].text);
	}
	return text;
};


ContainerSpreadSheet.prototype.getColumns = function() {
	var columns = [];
	for (var i = 0; i < this.getHeader().length; i++) {
		columns.push(this.getHeader()[i].column);
	}
	return columns;
};


ContainerSpreadSheet.prototype.getPuck = function() {
	var myPuck = JSON.parse(JSON.stringify(this.puck));
	var rows = this.parseTableData();
    
	//myPuck.sampleVOs = [];
    var aux = [];
    
    function filterByLocation(samples){
        return _.filter(samples, function(b){return b.location == rows[i].location;} );
    }
	for (var i = 0; i < rows.length; i++) {
        
        var sample = {};
        var sampleByLocation = filterByLocation(myPuck.sampleVOs);
        if (sampleByLocation.length > 0){
            /** new sample */
		    sample = sampleByLocation[0];
        } 
        
		sample["name"] = rows[i]["Sample Name"];
		sample["smiles"] = rows[i]["Smiles"];
		sample["location"]= rows[i]["location"];
		sample["comments"] = rows[i]["Comments"];
        var proteins = [];
		if (sample["crystalVO"] == null){
			sample["crystalVO"] = {};
			proteins = EXI.proposalManager.getProteinByAcronym(rows[i]["Protein Acronym"]);
			if (proteins != null){
				sample["crystalVO"]["proteinVO"] = proteins[0];
			}
		}
        else{
            proteins = EXI.proposalManager.getProteinByAcronym(rows[i]["Protein Acronym"]);
			if (proteins != null){
				sample["crystalVO"]["proteinVO"] = proteins[0];
			}
        }
		sample["crystalVO"]["spaceGroup"] = rows[i]["Space Group"];
		sample["crystalVO"]["cellA"] = Number(rows[i]["Unit cell A"]);
		sample["crystalVO"]["cellB"] = Number(rows[i]["Unit cell B"]);
		sample["crystalVO"]["cellC"] = Number(rows[i]["Unit cell C"]);
		sample["crystalVO"]["cellAlpha"] = Number(rows[i]["Unit cell Alpha"]);
		sample["crystalVO"]["cellBeta"] = Number(rows[i]["Unit cell Beta"]);
		sample["crystalVO"]["cellGamma"] = Number(rows[i]["Unit cell Gamma"]);
		
		sample["diffractionPlanVO"] = {};
		sample["diffractionPlanVO"]["radiationSensitivity"]= Number(rows[i]["Radiation Sensitivity"]);
		sample["diffractionPlanVO"]["requiredCompleteness"]= Number(rows[i]["Required Completeness"]);
		sample["diffractionPlanVO"]["requiredMultiplicity"]= Number(rows[i]["Required multiplicity"]);
		sample["diffractionPlanVO"]["requiredResolution"]= Number(rows[i]["Needed resolution"]);
		sample["diffractionPlanVO"]["observedResolution"]= Number(rows[i]["Pre-observed resolution"]);
		sample["diffractionPlanVO"]["preferredBeamDiameter"]= Number(rows[i]["Pref. Diameter"]);
		sample["diffractionPlanVO"]["numberOfPositions"]= Number(rows[i]["Number Of positions"]);
		sample["diffractionPlanVO"]["experimentKind"]= rows[i]["Experiment Type"];
		aux.push(sample);
		
	}
    myPuck.sampleVOs = aux;
    
	return myPuck;
};


ContainerSpreadSheet.prototype.parseTableData = function() {
	var parsed = [];
	var data = this.spreadSheet.getData();
	for (var j = 0; j < data.length; j++) {
		var row = {};
		row["location"] = j + 1;
			for (var k = 0; k < data[j].length; k++) {
				var key = this.getHeaderId()[k];
				var value = data[j][k];
				row[key] = value;
			}
			if (row["Protein Acronym"]){
				if (row["Protein Acronym"].length > 0){
					parsed.push(row);
				}
			}
	}
	
	/** Curated contains the whole-data rows * */
	var curated = [];
	for (var i = 0; i < parsed.length; i++) {
		if (parsed[i]["Protein Acronym"] != null){
			curated.push(parsed[i]);
		}
	}
	
	return curated;
};

ContainerSpreadSheet.prototype.load = function(puck){
	this.puck = puck;
	var container = document.getElementById(this.id + '_samples');
    
	  function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
	    Handsontable.renderers.TextRenderer.apply(this, arguments);
	    td.style.fontWeight = 'bold';
	    td.style.color = 'green';
	    td.style.fontSize = '9px';
	    td.style.background = '#CEC';
	  }
	  
	  function ValueRenderer(instance, td, row, col, prop, value, cellProperties) {
	    Handsontable.renderers.TextRenderer.apply(this, arguments);
	    if (!instance.getDataAtRow(row)[1]){
	    	td.style.background = '#EEE';
	    	return;
	    }
	    
	    if ((col == 2)){
		    	if (!value || value == '') {
		    		td.className = 'custom-row-text-required';
		  	    }
	    }
	  }
	  // maps function to lookup string
	  Handsontable.renderers.registerRenderer('ValueRenderer', ValueRenderer);
	  var _this = this;
	  this.spreadSheet = new Handsontable(container, {
		beforeChange: function (changes, source) {
		      lastChange = changes;
		      
		},
	    data: this.getSamplesData(puck),
	 
	    height : this.height,
	    width : this.width,
	    manualColumnResize: true,
	    colWidths: this.getHeaderWidth(),
	    colHeaders: this.getHeaderText(),
	    stretchH: 'last',
	    columns: this.getColumns()
	  });

	  
	 /*this.spreadSheet.updateSettings({
		  afterChange: function (changes, source) {              
				_this.onModified.notify(_this.getPuck());
			
		  }
		});*/
	
	
};

/**
* This is a grid for parcels
*
* @class ParcelGrid
* @constructor
*/
function ParcelGrid(args) {
	this.height = 100;
	this.btnEditVisible = true;
	this.btnRemoveVisible = true;

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.btnEditVisible != null) {
			this.btnEditVisible = args.btnEditVisible;
		}
		if (args.btnRemoveVisible != null) {
			this.btnRemoveVisible = args.btnRemoveVisible;
		}
	}

	/** Events **/
	this.onSuccess = new Event(this);
	this.onAdd = new Event(this);
	this.onRemove = new Event(this);
}

ParcelGrid.prototype._getTopButtons = function() {
	var _this = this;
	var actions = [];
	return [(Ext.create('Ext.Action', {
		icon : '../images/icon/add.png',
		text : 'Add New Parcel',
		disabled : false,
		handler : function(widget, event) {
			_this.edit();
		}
	}))];
};

ParcelGrid.prototype.load = function(shipment) {
	var _this = this;
	this.shipment = shipment;
	this.dewars = shipment.dewarVOs;

	this.parcelForms = [];

	this.panel.removeAll();

	this.dewars.sort(function(a, b) {
		return a.dewarId - b.dewarId;
	});

    function onSaved(sender, dewar) {
			_this.panel.setLoading();
			dewar["sessionId"] = dewar.firstExperimentId;
			dewar["shippingId"] = _this.shipment.shippingId;
			var adapter = new DataAdapter();
			var onSuccess = function(sender, shipment) {				
				_this.panel.setLoading(false);
			};			
			EXI.getDataAdapter({onSuccess : onSuccess}).proposal.dewar.saveDewar(_this.shipment.shippingId, dewar);
    }
   
	for ( var i in this.dewars) {
		var parcelForm = new ParcelPanel({
			height : 340
		});
		
		this.panel.insert(parcelForm.getPanel());
		parcelForm.load(this.dewars[i]);
		parcelForm.onSavedClick.attach(onSaved);
		this.parcelForms.push(parcelForm);
	}
};

ParcelGrid.prototype.edit = function(dewar) {
	var _this = this;
	var caseForm = new CaseForm();

	var window = Ext.create('Ext.window.Window', {
		title : 'Parcel',
		height : 450,
		width : 600,
		modal : true,
		layout : 'fit',
		items : [ caseForm.getPanel(dewar) ],
		listeners : {
			afterrender : function(component, eOpts) {
				if (_this.puck != null) {
					_this.render(_this.puck);
				}
			}
		},
		buttons : [ {
			text : 'Save',
			handler : function() {
				var adapter = new DataAdapter();
				_this.panel.setLoading();
				var dewar = caseForm.getDewar();
				var onSuccess = function(sender, shipment) {
					_this.load(shipment);
					_this.panel.setLoading(false);
					window.close();
				};
				dewar["sessionId"] = dewar.firstExperimentId;
				dewar["shippingId"] = _this.shipment.shippingId;
				EXI.getDataAdapter({
					onSuccess : onSuccess
				}).proposal.dewar.saveDewar(_this.shipment.shippingId, dewar);
			}
		}, {
			text : 'Cancel',
			handler : function() {
				window.close();
			}
		} ]
	});
	window.show();

};

ParcelGrid.prototype.getPanel = function() {
	var _this = this;

	this.panel = Ext.create('Ext.panel.Panel', {
		cls : 'border-grid',
		height : 800,
		autoScroll : true

	});

	this.panel.addDocked({
		height : 45,
		xtype : 'toolbar',
		items : _this._getTopButtons(),
		cls : 'exi-top-bar'
	});

	return this.panel;
};

/**
* This class containes name, description, samples spreadsheet and puck loyout for a given puck 
*
* @class PuckForm
* @constructor
**/
function PuckForm(args) {
	this.id = BUI.id();
	this.height = 500;
	this.width = 500;
	
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
	}

	
	var _this = this;
	
	//this.puckLayout = new PuckPanel({width : 150, tbar : false});
	this.containerSpreadSheet = new ContainerSpreadSheet({width : 1300});
	
	/*this.containerSpreadSheet.onModified.attach(function(sender, puck){
		
	});*/
	
	this.onSaved = new Event(this);
}

/** Loads a puck into the form **/
PuckForm.prototype.load = function(puck, shippingId) {
	var _this = this;
	this.puck = puck;
    
	if (puck != null){
		Ext.getCmp(this.id + "puck_name").setValue(this.puck.code);
		this.capacityCombo.setValue(this.puck.capacity);
        Ext.getCmp(this.id + "puck_beamline").setValue(this.puck.beamlineLocation);
        Ext.getCmp(this.id + "puck_sampleChangerLocation").setValue(this.puck.sampleChangerLocation);
        Ext.getCmp(this.id + "puck_status").setValue(this.puck.containerStatus);                
	}	
	this.containerSpreadSheet.load(puck);
};

/*
PuckForm.prototype.loadPlateLayout = function(puck) {
	 try{
		 this.puckLayout.load(puck);
		 this.puckLayout.render(puck);
	  }
	  catch(e){
		  console.log(e);
	  }
};*/

PuckForm.prototype.getToolBar = function() {
	var _this = this;
	return [
	        
			{
			    text: 'Remove',
			    width : 100,
			    height : 30,
			    cls : 'btn-red',
			    handler : function(){
			    	function showResult(result){
						if (result == "yes"){
							_this.removePuck();							
						}
			    	}
					  Ext.MessageBox.show({
				           title:'Remove',
				           msg: 'Removing a puck from this parcel will remove also its content. <br />Are you sure you want to continue?',
				           buttons: Ext.MessageBox.YESNO,
				           fn: showResult,
				           animateTarget: 'mb4',
				           icon: Ext.MessageBox.QUESTION
				       });
			    }
			},
	        "->",
	        {
	            text: 'Save',
	            width : 100,
	            height : 30,
	            handler : function(){
	            	_this.save();
	            }
	        }
	];
};

PuckForm.prototype.removePuck = function() {
	var _this = this;
	this.panel.setLoading();
	var onSuccess = function(sender, data){
		
	};
	var containerId = this.puck.containerId;
	EXI.getDataAdapter({onSuccess: onSuccess}).proposal.shipping.removeContainerById(containerId,containerId,containerId );
	
};

PuckForm.prototype.save = function() {
	var _this = this;
	this.panel.setLoading("Saving Puck");

	var puck = this.containerSpreadSheet.getPuck();
	/** Updating general parameters **/
	puck.code = Ext.getCmp(_this.id + 'puck_name').getValue();
	puck.capacity = _this.capacityCombo.getValue();
	
    var onError = function(sender, error){
		_this.panel.setLoading(false);
		EXI.setError(error.responseText);
	};
    
	var onSuccess = function(sender, puck){
		_this.panel.setLoading(false);
		_this.load(puck);
		_this.onSaved.notify();
	};
	EXI.getDataAdapter({onSuccess : onSuccess, onError : onError}).proposal.shipping.saveContainer(this.puck.containerId, this.puck.containerId, this.puck.containerId, puck);
};


/**
 * When container type has changed from SPINE|| UNIPUCK || PLATE
 * 
 * We make the spreadsheet longer and the platelayout is rendered again
 */
PuckForm.prototype.containerTypeChanged = function(capacity) {
	this.puck.capacity = capacity;
	var data = this.containerSpreadSheet.spreadSheet.getData();
	if (data.length < capacity){
		for (var i = data.length; i<= capacity; i++){
			data.push([i]);
		}
	}
	else{
		data = data.slice(0, capacity);
	}
	this.containerSpreadSheet.spreadSheet.loadData(data);

};

PuckForm.prototype.getPanel = function() {
	var _this =this;
	var capacityCombo = BIOSAXS_COMBOMANAGER.getComboPuckType({margin : '10 0 10 5', labelWidth : 100, width : 250});
	capacityCombo.on('select', function(capacityCombo, record){
		var capacity = record[0].data.value;
		_this.containerTypeChanged(capacity);
	});
	
	this.capacityCombo = capacityCombo;
	this.panel = Ext.create('Ext.panel.Panel', {
		buttons : this.getToolBar(),
		items : [ 
		         {
							xtype : 'container',
							margin : '5 0 2 5',
							layout : 'hbox',
							items : [
										
										
								         {
								        	 xtype : 'container',
											margin : '12 0 2 0',
											layout : 'vbox',
											items : [ 
							         				   {
																xtype: 'requiredtextfield',
																id : this.id + 'puck_name',
																fieldLabel : 'Name',
																name : 'name',
																width : 250,
																margin : '0 0 0 5',
																labelWidth : 100
														},
														this.capacityCombo,
                                                        {
																xtype: 'textfield',
																id : this.id + 'puck_beamline',
																fieldLabel : 'Beamline',
																width : 250,
                                                                disabled : true,
																margin : '0 0 0 5',
																labelWidth : 100
														},
                                                        {
																xtype: 'textfield',
																id : this.id + 'puck_sampleChangerLocation',
																fieldLabel : '#Sample Changer',
																width : 250,
                                                                disabled : true,
																margin : '0 0 0 5',
																labelWidth : 100
														},                                                       
                                                        {
																xtype: 'textfield',
																id : this.id + 'puck_status',
																fieldLabel : 'Status',
																width : 250,
                                                                disabled : true,
																margin : '0 0 0 5',
																labelWidth : 100
														}
													]
								         },
                                         // this.puckLayout.getPanel()
							         ]
		         },
		         this.containerSpreadSheet.getPanel(),
                
	         ] 
		} 
	);
	return this.panel;
};


/**
 * Same form as MX part
 * 
 * @creationMode if true a create button appears instead of save
 * @showTitle true or false
 */
function ShipmentForm(args) {
	this.id = BUI.id();

	if (args != null) {
		if (args.creationMode != null) {
			this.creationMode = args.creationMode;
		}
	}
	
	this.onSaved = new Event(this);
}

ShipmentForm.prototype.fillStores = function() {
	this.panel.setLoading("Loading Labcontacts from database");
	var labContacts = EXI.proposalManager.getLabcontacts();

	this.labContactForSendingStore.loadData(labContacts, false);

	labContacts.sort(function(a, b){
	    if(a.cardName < b.cardName) {return -1;}
	    if(a.cardName > b.cardName) {return 1;}
	    return 0;
	});
	
	$.extend(labContacts, [{ cardName : 'Same as for shipping to beamline', labContactId : -1}, { cardName : 'No return requested', labContactId : 0}]);
	this.labContactForReturnStore.loadData(labContacts, false);

	this.labContactsReturnCombo.setValue(-1);

	this.panel.setLoading(false);
	if (this.shipment != null) {
		this.setShipment(this.shipment);
	}
};

ShipmentForm.prototype.draw = function(targetId) {
	this.getPanel().render(targetId);
};

ShipmentForm.prototype.load = function(shipment) {
	this.shipment = shipment;
	var _this = this;
	Ext.getCmp(_this.id + "shippingName").setValue(shipment.shippingName);
	Ext.getCmp(_this.id + "comments").setValue(shipment.comments);
	if (shipment.sendingLabContactVO != null) {
		this.labContactsSendingCombo.setValue(shipment.sendingLabContactVO.labContactId);
	}

	
	if (shipment.returnLabContactVO == null) {
		this.labContactsReturnCombo.setValue(0);
	}
	else{
		if (shipment.returnLabContactVO.labContactId == shipment.sendingLabContactVO.labContactId){
			this.labContactsReturnCombo.setValue(-1);
		}
		else{
			this.labContactsReturnCombo.setValue(shipment.returnLabContactVO.labContactId);
		}
	}
	
	if (shipment.sessions != null){
		if (shipment.sessions.length > 0){
			var session = shipment.sessions[0];
			this.sessionComboBox.setValue(session.sessionId);
		}
	}

};

ShipmentForm.prototype._saveShipment = function() {
	var _this = this;
	var shippingId = null;
	
	if (this.shipment != null) {
		shippingId = this.shipment.shippingId;
	}
	
	var sendingAddressId = this.labContactsSendingCombo.getValue();
	var returnAddressId = this.labContactsReturnCombo.getValue();
	
	if (sendingAddressId == null) {
		BUI.showError("User contact information for shipping to beamline is mandatory");
		return;
	}

		
	/** No return requested **/
	if (this.labContactsReturnCombo.getValue() == 0){
		returnAddressId = 0;
	}
	
	/** Same sender **/
	if (this.labContactsReturnCombo.getValue() == -1){
		returnAddressId = -1;
	}

	var sendingAddress = (EXI.proposalManager.getLabcontactById(sendingAddressId));
	var json = {
		shippingId : shippingId,
		name : Ext.getCmp(_this.id + "shippingName").getValue(),
		status : "Not set",
		sendingLabContactId : sendingAddressId,
		returnLabContactId : returnAddressId, 
		returnCourier : returnAddressId,
		courierAccount : sendingAddress.courierAccount,
		billingReference : sendingAddress.billingReference,
		dewarAvgCustomsValue : sendingAddress.dewarAvgCustomsValue,
		dewarAvgTransportValue :sendingAddress.dewarAvgTransportValue,
		comments : Ext.getCmp(_this.id + "comments").getValue(),
		sessionId : this.sessionComboBox.getValue()
	};

	var onSuccess = function(sender, shipment) {
		location.hash = "#/shipping/" + shipment.shippingId + "/main";
		_this.panel.setLoading(false);
		_this.onSaved.notify(shipment);
	};


	/** Cheking params **/
	if (json.name == "") {
		BUI.showError("Name field is mandatory");
		return;
	}

	if (json.sendingLabContactId == null) {
		BUI.showError("Lab contact for sending field is mandatory");
		return;
	}

	
	this.panel.setLoading();
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.saveShipment(json);
	
	
};

ShipmentForm.prototype.getPanel = function() {
	var _this = this;
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	var buttons = [];

	if (_this.creationMode) {
		buttons.push({
			text : 'Create',
			scope : this,
			handler : function() {
				_this._saveShipment();
			}
		});
	} else {
		buttons.push({
			text : 'Save',
			scope : this,
			handler : function() {
				_this._saveShipment();
			}
		});

	}

	this.labContactForSendingStore = Ext.create('Ext.data.Store', {
		fields : [ 'cardName', 'labContactId' ],
		sorters : 'cardName'
	});

	this.labContactForReturnStore = Ext.create('Ext.data.Store', {
		fields : [ 'cardName', 'labContactId' ]
		
	});

	this.labContactsSendingCombo = Ext.create('Ext.form.ComboBox', {
		id : _this.id + "shipmentform_sendingLabContactId",
		fieldLabel : 'Shipping Card to ESRF',
		afterLabelTextTpl : required,
		store : this.labContactForSendingStore,
		queryMode : 'local',
		labelWidth : 200,
		width : 600,
		margin : '10 0 0 10',
		displayField : 'cardName',
		valueField : 'labContactId'
	});

	this.labContactsReturnCombo = Ext.create('Ext.form.ComboBox', {
		id : _this.id + "returnLabContactId",
		fieldLabel : 'Shipping Card to HOME',
		afterLabelTextTpl : required,
		store : this.labContactForReturnStore,
		queryMode : 'local',
		margin : '10 0 0 10',
		labelWidth : 200,
		width : 600,
		displayField : 'cardName',
		valueField : 'labContactId'
	});

	
    this.sessionComboBox =  BIOSAXS_COMBOMANAGER.getComboSessions(EXI.proposalManager.getSessions(), {margin: '10 0 0 10', width: 400, labelWidth: 200});

	if (this.panel == null) {
		this.panel = Ext.create('Ext.form.Panel', {
			bodyPadding : 5,
			cls : 'border-grid',
			buttons : buttons,
			items : [ 
						{
		      					xtype : 'requiredtextfield',
		      					fieldLabel : 'Name',
		      					allowBlank : false,
		      					labelWidth : 200,
		      					width : 400,
		      					margin : "10 20 0 10",
		      					name : 'shippingName',
		      					id : _this.id + 'shippingName',
		      					value : '',
				        },
		        		this.sessionComboBox,
					    {
		    					xtype : 'textareafield',
		    					name : 'comments',
		    					id : _this.id + 'comments',
		    					fieldLabel : 'Comments',
		    					value : '',
		    					labelWidth : 200,
		    					margin : "10 20 0 10",
		    					width : 500,
						},
    	          		this.labContactsSendingCombo,
        	          	this.labContactsReturnCombo
		]
		});
	}
	this.fillStores();
	return this.panel;
};



/**
* This main class deals with the creation and edition of shipments
*
* @class ShippingMainView
* @constructor
*/
function ShippingMainView() {
	MainView.call(this);
	var _this = this;
	
	/**
	* 
	* @property shipmentForm
	*/
	this.shipmentForm = new ShipmentForm();
	this.shipmentForm.onSaved.attach(function(sender, shipment){
		location.hash = "#/proposal/shipping/nav?nomain";
	});
	
	/**
	* 
	* @property parcelGrid
	*/
	this.parcelGrid = new ParcelGrid({
		height : 300
	});
}

ShippingMainView.prototype.getPanel = MainView.prototype.getPanel;
ShippingMainView.prototype.getContainer = MainView.prototype.getContainer;

ShippingMainView.prototype.getContainer = function() {
	this.tabPanel =  Ext.createWidget('tabpanel',
			{
				margin : 10,
				defaults : {
						anchor : '100%'
				},
				items : [
				     		{
							tabConfig : {
								title : 'Delivery Details'
							},
							items : [ 
							         	this.shipmentForm.getPanel()
							]
						},
						{
							tabConfig : {
								id : this.id + "grid",
								title : 'Parcels',
								icon : '../images/icon/shipping.png'
							},
							items : [ 
							         	this.parcelGrid.getPanel()
							]
						}
					]
			});

	return this.tabPanel;

};


ShippingMainView.prototype.load = function(shippingId) {
	var _this = this;
	this.shippingId = shippingId;
	
	if (shippingId == null){
		Ext.getCmp(this.id + "grid").disable(true);
	}
	this.panel.setTitle("Shipment");
	if (shippingId != null){
		this.panel.setLoading();
		var onSuccess = function(sender, shipment){
			_this.shipmentForm.load(shipment);
			_this.parcelGrid.load(shipment);
			_this.panel.setLoading(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.getShipment(shippingId);
	}
};

function WelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';
	MainView.call(this);
	this.title = "Welcome";
	this.closable = true;		
}

WelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;


WelcomeMainView.prototype.getContainer = function() {
	return {
		  layout: {
		        type: 'fit'
		    },
		items : [
		         	{
		         		html : "<iframe style='width:900px;height:900px;' frameBorder='0' src='../html/welcome.html'></iframe>",
		         		margin : '50 0 0 50'
		         	}
		]
	};
};


WelcomeMainView.prototype.load = function() {
	
};

function AuthenticationForm(){
	this.onAuthenticate = new Event(this);
}
AuthenticationForm.prototype.show = function(){
	this.window = Ext.create('Ext.window.Window', {
	    title: 'Authentication <span style="FONT-SIZE:9PX;color:red;">[INTRANET ONLY]</span>',
	    height: 250,
	    closable :  false,
	    width: 400,
	    modal : true,
	    layout: 'fit',
	    items: [
	            this.getPanel()
        ]}
	);
	this.window.show();
};

AuthenticationForm.prototype.getPanel = function(){
	var _this = this;
	var sites = Ext.create('Ext.data.Store', {
	    fields: ['name', 'url', 'exiUrl'],
	    data : ExtISPyB.sites
	});
	
	return Ext.create('Ext.form.Panel', {
	    bodyPadding: 5,
	    width: 350,
	    layout: 'anchor',
       
	    defaults: {
	        anchor: '90%'
	    },
	    // The fields
	    defaultType: 'textfield',
	    items: [{
	        fieldLabel: 'User',
	        name: 'user',
	        margin : '10 0 0 10',
	        allowBlank: false
	    },{
	        fieldLabel: 'Password',
	        margin : '10 0 0 10',
	        name: 'password',
	        allowBlank: false,
	        inputType : 'password'
	    },{
	    	xtype : 'combo',
	        fieldLabel: 'Choose site',
	        name: 'site',
	        store : sites,
	        allowBlank: false,
	        valueField : 'url',
	        displayField : 'name',
	        margin : '10 0 0 10'
	    }],

	    buttons: [ {
	        text: 'Login',
	        formBind: true,
	        disabled: true,
	        handler: function() {
	        	var form = this.up('form').getForm();
	        	
	        	var exiUrl;
	        	var properties = null;
	        	for (var i =0; i< ExtISPyB.sites.length; i++){
	        		if (ExtISPyB.sites[i].url == form.getFieldValues().site){
	        			properties = ExtISPyB.sites[i];
	        		}
	        		
	        	}
	        	_this.onAuthenticate.notify({
	        		user : form.getFieldValues().user, 
	        		password : form.getFieldValues().password, 
	        		site : form.getFieldValues().site,
	        		exiUrl : properties.exiUrl,
	        		properties : properties
	        	});

	        }
	    }]
	});
};





function CurvePlotter(args) {
    this.id = BUI.id();

    this.backgroundColor = "#FFFFFF";

    this.margin = '0 0 0 5';
    this.ruleColor = "black";
    this.targetId = "plotCanvas" + BUI.id();
    this.legend = 'onmouseover';

    if (args != null) {
        if (args.margin != null) {
            this.margin = args.margin;
        }
        if (args.legend != null) {
            this.legend = args.legend;
        }
        if (args.targetId != null) {
            this.targetId = args.targetId;
        }
    }

    this.onRendered = new Event(this);
    this.onPointClickCallback = new Event();

}

CurvePlotter.prototype.getPanel = function() {
    this.plotPanel = Ext.create('Ext.container.Container', {
        layout: {
            type: 'hbox'
        },
        flex: 0.7,
        margin: this.margin,
        items: [{
            html: '<div id="' + this.targetId + '"></div>',
            id: this.id,
        }]
    });

    this.plotPanel.on("afterrender", function() {
    });

    this.plotPanel.on("resize", function() {
    });
    return this.plotPanel;
};

CurvePlotter.prototype.getPointCount = function() {
    return this.dygraph.rawData_.length;
};

CurvePlotter.prototype.getColors = function() {
    return this.dygraph.getColors();
};

CurvePlotter.prototype.getLabels = function() {
    return this.dygraph.getLabels();
};

CurvePlotter.prototype.render = function(url) {
    var _this = this;
    if (document.getElementById(this.targetId) != null) {
        document.getElementById(this.targetId).innerHTML = "";

        this.width = this.plotPanel.getWidth();
        this.height = this.plotPanel.getHeight();

        document.getElementById(this.targetId).setAttribute("style", "border: 1px solid #000000; height:" + (this.plotPanel.getHeight() - 1) + "px;width:" + (this.plotPanel.getWidth() - 2) + "px;");

        Ext.getCmp(this.id).setHeight(this.plotPanel.getHeight());
        Ext.getCmp(this.id).setWidth(this.plotPanel.getWidth());


        this.dygraph = new Dygraph(
            document.getElementById(this.targetId),
            url,
            {
                title: this.title,
                titleHeight: 20,

                legend: this.legend,
                labelsSeparateLines: true,
                errorBars: true,
                connectSeparatedPoints: true,
                pointClickCallback: function(e, p) {
                    _this.onPointClickCallback.notify(p.name);
                }
            }

        );
      
        this.dygraph.ready(function() {
            _this.onRendered.notify();
        });
    }
};

CurvePlotter.prototype.loadMerge = function(subtractionIdList, from, to, scale) {
    this.render(EXI.getDataAdapter().saxs.hplc.getFramesMergeURL(subtractionIdList, from, to, scale));
};

CurvePlotter.prototype.loadHPLCFrame = function(experimentId, frameNumber) {
    this.render(EXI.getDataAdapter().saxs.hplc.getHPLCFramesScatteringURL(experimentId, frameNumber));
};

CurvePlotter.prototype.loadUrl = function(url) {
    this.render(url);
};


CurvePlotter.prototype.load = function(selections) {
    this.render(EXI.getDataAdapter().saxs.frame.getFramesURL(selections.frame, selections.average, selections.subtracted, selections.sampleaverage, selections.bufferaverage));
};


function AutoProcIntegrationCurvePlotter(args) {
    CurvePlotter.call(this, args);

    this.margin = '10 0 0 0';
    this.height = null;
    this.title = "";
    if (args != null) {
        if (args.height != null) {
            this.height = args.height;
        }
        if (args.title != null) {
            this.title = args.title;
        }
    }

    this.data = {
        labels: [], // labels = [{name: 'axisX', x: true, y, false},{name: 'axisXY', x: false, y, true}] 
        data: []
    };

    this.xLabels = [];
}


AutoProcIntegrationCurvePlotter.prototype.getPointCount = CurvePlotter.prototype.getPointCount;
AutoProcIntegrationCurvePlotter.prototype.getLabels = CurvePlotter.prototype.getLabels;


AutoProcIntegrationCurvePlotter.prototype.toCSV = function(labels, data) {
    var csv = labels.toString() + "\n";
    for (var i = 0; i< data.length; i++){
        for (var j = 0; j< data[i].length; j++){
            csv = csv +  data[i][j] + "," ;
        }
        /** Removing last , */
        csv = csv.substring(0, csv.length - 1);
        csv = csv + "\n";
        
    }
    return csv;
};
/**
* Render the dygraph widget on a container that should exists with id = this.id
*
* 
* @method render
*/
AutoProcIntegrationCurvePlotter.prototype.render = function(labels, data) {
    var _this = this;

   
   
    /** Plotting */
    var g = new Dygraph(
        document.getElementById(this.targetId),
        this.toCSV(labels, data),
        {
            title: this.title,
            titleHeight: 20,
            legend : 'always',
            height: this.height - 100,
            hideOverlayOnMouseOut :true,
            labelsSeparateLines: true,
            labelsDiv :_this.targetId + "_legend",
            labelsDivStyles : " { 'fontSize': 6 } ",
            axisLabelWidth : 20,
           
            connectSeparatedPoints: true,
            pointClickCallback: function(e, p) {
                _this.onPointClickCallback.notify(p.name);
            },
            axes: {
                x: {
                     pixelsPerXLabel : 30,
                    axisLabelFormatter: function(d, gran, opts) {
                        return _this.xLabels[d];                        
                    }
                }
            }
        }

    );

    g.ready(function() {
        //g.setAnnotations(_this.getAnnotations(data, labels));
    });

};

/**
 * Example csv
Resolution,11259175,11259180,11259326
2.4,143.9,0,143.9,0,,0
2.57,99.2,0,99.2,0,,0
2.77,62.7,0,62.7,0,,0
3.04,41.4,0,41.4,0,,0
3.39,24.0,0,24.0,0,,0
3.74,,0,,0,56.0,0
3.87,,0,,0,55.0,0
3.91,18.2,0,18.2,0,,0
4.03,,0,,0,53.0,0
4.21,,0,,0,53.6,0
4.43,,0,,0,54.6,0
4.71,,0,,0,53.9,0
4.78,19.1,0,19.1,0,,0
5.07,,0,,0,49.2,0
5.59,,0,,0,52.2,0
6.39,,0,,0,45.5,0
6.73,16.4,0,16.4,0,,0
8.05,,0,,0,38.1,0
 */
AutoProcIntegrationCurvePlotter.prototype.loadUrl = function(url) {

    var _this = this;
    $.ajax({
        url: url,
        context: this

    }).done(function(csv) {
        var index = 0;
        var _this = this;
        _this.xLabels = [];
        if (csv) {
            var lines = csv.split("\n");
            var labelsHeader = [];

            if (lines) {
                if (lines[0]) {
                    this.data.labels = lines[0].split(",");

                }
                else {
                    /** No Lines */
                    EXI.setError("No labels on csv");
                    return;
                }

                var toNumber = function toNumber(el) {
                        if (el) {
                            if (el != "") {
                                return parseFloat(el);
                            }
                            else {
                                return "";
                            }
                        }
                        else {
                            return "";
                        }
                };
                    
                var convertToNumber = function (element) {
                    var noError = [];
                    var elements = element.split(',');                                       
                    elements = _.map(elements, toNumber);                 
                    noError.push(index);
                    _this.xLabels.push(elements[0]);

                    for (var i = 1; i < elements.length; i++) {
                        if (i % 2 != 0) {
                            noError.push(elements[i]);
                        }
                    }
                    index = index + 1;
                    return noError;
                };
                lines = lines.reverse();
                /** Parsing data it means remove labels, split by , and convert to number */
                this.data.data = _.map(_.slice(lines, 1, lines.length - 1), convertToNumber);


                try {

                    this.render(this.data.labels, this.data.data);
                }
                catch (e) {
                    EXI.setError(e.message);
                }
            }
        }
        else {
            /** No Lines */
            EXI.setError("CSV is empty");
            return;
        }
    });

};

AutoProcIntegrationCurvePlotter.prototype.getHTML = function() {
    return '<div  id="' + this.targetId + '"></div><div  style="height:20px" id="' + this.targetId + '_legend"></div>';
};
AutoProcIntegrationCurvePlotter.prototype.getPanel = function() {
    
    this.plotPanel = Ext.create('Ext.panel.Panel', {
        layout: {
            type: 'fit'
        },
        height: this.height,
        margin: this.margin,
        items: [{
                    html: this.getHTML(),
                    id: this.id,
                    style: {
                      border: "1px solid black"  
                    },
                    height : this.height,
                    border : 1
        }
       
        ]
    });   
    return this.plotPanel;
};


/**
* This is a form  for parcels. It includes all items includes in a parcel. Include pucks
*
* @class ParcelPanel
* @constructor
*/
function ParcelPanel(args) {
	this.id = BUI.id();
	this.height = 500;
	this.width = 500;

	this.isSaveButtonHidden = false;
	this.isHidden = false;

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
	}
	
	this.onSavedClick = new Event(this);
}

/**
* It inserts a panel into the this.panel with the template parcelformsummary
*
* @method addHeaderPanel
*/
ParcelPanel.prototype.addHeaderPanel = function() {
	var html = "No information";
	dust.render("parcelformsummary", this.dewar, function(err, out){
		html = out;
    });
	this.panel.insert(
				{
					xtype 	: 'container',
					width	: 200,
					border : 1,
					padding : 20,
					items 	: [	{html : html}
				
					]
				}
	);
};

ParcelPanel.prototype.render = function() {
	var dewar = this.dewar;
	this.panel.removeAll();

	this.addHeaderPanel();
	
	if (dewar != null){
		if (dewar.containerVOs != null){
			/** Sorting container by id **/
			dewar.containerVOs.sort(function(a, b){return a.containerId - b.containerId;});
			for (var i = 0; i< dewar.containerVOs.length; i++){
				var container = dewar.containerVOs[i];
				/** Adding the puck layout **/
				var puckPanel = new PuckPanel({height : 200});
				this.panel.insert(puckPanel.getPanel());
				puckPanel.load(container);
				
			}
		}
	}
};

ParcelPanel.prototype.load = function(dewar) {
	this.dewar = dewar;
	try {
		/** Rendering pucks **/
		this.render();
	}
	catch(e){
		console.log(e);
	}
};

/**
* It inserts a new puck into the dewar and reloads the widget
*
* @method addPuckToDewar
*/
ParcelPanel.prototype.addPuckToDewar = function() {
	var _this = this;
	var onSuccess = function(sender, puck){
		_this.dewar.containerVOs.push(puck);
		_this.load(_this.dewar);
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.addPuck(this.dewar.dewarId, this.dewar.dewarId);
};

/**
* It displays a window with a case form
*
* @method showCaseForm
*/
ParcelPanel.prototype.showCaseForm = function() {
	var _this = this;
	/** Opens a window with the cas form **/
	var caseForm = new CaseForm();
	var window = Ext.create('Ext.window.Window', {
	    title: 'Parcel',
	    height: 450,
	    width: 600,
	    modal : true,
	    layout: 'fit',
	    items: [
	            	caseForm.getPanel(_this.dewar)
	    ],
	    listeners : {
			afterrender : function(component, eOpts) {
				if (_this.puck != null){
						_this.render(_this.puck);
				}
			}
	    },
	    buttons : [ {
						text : 'Save',
						handler : function() {
							_this.onSavedClick.notify(caseForm.getDewar());
							window.close();
						}
					}, {
						text : 'Cancel',
						handler : function() {
							window.close();
						}
					} ]
	});
	window.show();
};

ParcelPanel.prototype._getTopButtons = function() {
	var _this = this;
	var actions = [];
	
	
	actions.push(this.code);
	actions.push(this.status);
	actions.push(this.storageCondition);
	
	actions.push(Ext.create('Ext.Action', {
		icon : '../images/icon/edit.png',
		text : 'Edit',
		disabled : false,
		handler : function(widget, event) {
					_this.showCaseForm();
		}
	}));
	
	actions.push(Ext.create('Ext.Action', {
		icon : '../images/print.png',
		text : 'Print Labels',
		disabled : false,
		handler : function(widget, event) {
			var dewarId = _this.dewar.dewarId;
			var url = EXI.getDataAdapter().proposal.shipping.getDewarLabelURL(dewarId, dewarId);
			location.href = url;
			return;
		}
	}));
	
	actions.push(Ext.create('Ext.Action', {
		icon : '../images/icon/add.png',
		text : 'Add puck',
		disabled : false,
		handler : function(widget, event) {
			_this.addPuckToDewar();
		}
	}));
	
	return actions;
};


ParcelPanel.prototype.getPanel = function() {
	var _this = this;
	this.panel = Ext.create('Ext.panel.Panel', {
		layout 		: 'hbox',
		cls 		: "border-grid",
		margin 		: 10,
		height 		: this.height,
		autoScroll	: true,
		items 		: [],
		listeners : {
			afterrender : function(component, eOpts) {
						_this.render();
			}
	    }
//	,
//		toolbar : [ {
//						text : 'Save',
//						handler : function() {
//								var adapter = new DataAdapter();
//								_this.panel.setLoading();
//								var dewar = caseForm.getDewar();
//								var onSuccess = (function(sender, shipment) {
//									_this.load(shipment);
//									window.close();
//									_this.panel.setLoading(false);
//								});
//								dewar["sessionId"] = dewar.firstExperimentId;
//								dewar["shippingId"] = _this.shipment.shippingId;
//								EXI.getDataAdapter({onSuccess : onSuccess}).proposal.dewar.saveDewar(_this.shipment.shippingId, dewar);
//						}
//					}, 
//					{
//							text : 'Cancel',
//							handler : function() {
//								window.close();
//							}
//					}]
	});
	
	this.panel.addDocked({
		id 		: _this.id + 'tbar',
		height 	: 45,
		xtype 	: 'toolbar',
		items 	: _this._getTopButtons(),
		cls 	: 'exi-top-bar'
	});
	return this.panel;
};

function ProposalGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	this.margin = '0 0 0 0';
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.searchBar != null) {
			this.searchBar = args.searchBar;
		}

		if (args.tbar != null) {
			this.tbar = args.tbar;
		}

		if (args.collapsed != null) {
			this.collapsed = args.collapsed;
		}

		if (args.width != null) {
			this.width = args.width;
		}
		
		if (args.margin != null) {
			this.margin = args.margin;
		}
	}
	this.onSelected = new Event(this);
}


ProposalGrid.prototype.load = function(proposals) {
	this.data = proposals;
	this.store.loadData(proposals, false);
};

ProposalGrid.prototype.getFilter = function(value){
	return [{property : "Proposal_proposalNumber", value : value, anyMacth : true}];
};

ProposalGrid.prototype.filter = function(value) {
	
};

ProposalGrid.prototype._getTbar = function() {
	var _this = this;
	var actions = [];
	actions.push({
		xtype : 'textfield',
		name : 'field1',
		emptyText : 'search by number',
		hidden : this.isHidden,
		  listeners : {
  			'change' : function(field, e) {
  						var value = field.getValue();
  						if (value != ""){
  							_this.store.filter(_this.getFilter(field.getValue()));
  						}
  						else{
  							_this.store.clearFilter(true);
  							_this.load(_this.data);
  						}
  					} 
          		} 
	    }
	);
	return actions;
};

ProposalGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		fields : [ 'Proposal_proposalId', 'Proposal_title', 'Proposal_proposalCode', 'Proposal_proposalNumber', 'Proposal_proposalType' ]
	});

	this.store.sort(['Proposal_proposalCode', 'Proposal_proposalNumber']);

	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Proposals',
		store : this.store,
		tbar : this._getTbar(),
		layout : 'fit',
		cls : 'border-grid',
		height : this.height,
		margin : this.margin,
		emptyText : "No proposals",
		columns : [ 
		{
			text : 'Proposal',
			dataIndex : 'Proposal_code',
			width : 125,
			renderer : function(grid, a, record){
				return "<a href='#'>" + record.data.Proposal_proposalCode + record.data.Proposal_proposalNumber + "</a>"; 
			}
		}, 
		{
			text : 'Code',
			dataIndex : 'Proposal_number',
			width : 75,
			hidden : true
		}, 
		{
			text : 'Number',
			dataIndex : 'number',
			width : 75,
			hidden : true
		}, 
		{
			text : 'Title',
			dataIndex : 'Proposal_title',
			flex : 1
		}
		],
		flex : 1,
		viewConfig : {
			stripeRows : true,
			listeners : {
				'cellclick' : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
					_this.onSelected.notify(record.data);
				}
			}
		}
	});

	/** Adding the tbar **/
	if (this.tbar) {
		this.panel.addDocked({
			xtype : 'toolbar',
			cls : 'toolBarGrid',
			height : 48,
			items : this._getTbar()
		});
	}
	return this.panel;
};





function SessionGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	this.width = null;

	this.title = null;
	this.margin = 10;


	this.hiddenGoColumn = true;
    this.isHiddenTitle = true;
    this.isHiddenNumberOfShifts = true;
    
    this.isHiddenPI = true;
    this.isHiddenLocalContact = true;
    
    this.layout = 'fit';
    
    /** Array with the beamline selected to make the filter */
    this.beamlineFilter = [];
    
	if (args != null) {
         if (args.isHiddenLocalContact != null) {
			this.isHiddenLocalContact = args.isHiddenLocalContact;
		}
        

        if (args.isHiddenNumberOfShifts != null) {
			this.isHiddenNumberOfShifts = args.isHiddenNumberOfShifts;
		}
        if (args.width != null) {
			this.width = args.width;
		}
        if (args.isHiddenTitle != null) {
			this.isHiddenTitle = args.isHiddenTitle;
		}
        if (args.isHiddenPI != null) {
			this.isHiddenPI = args.isHiddenPI;
		}
        
		if (args.title != null) {
			this.title = args.title;
		}
		if (args.margin != null) {
			this.margin = args.margin;
		}

		if (args.height != null) {
			this.height = args.height;
		}

		if (args.tbar != null) {
			this.tbar = args.tbar;
		}

		if (args.width != null) {
			this.width = args.width;
            this.layout = null;
		}
		if (args.hiddenGoColumn != null) {
			this.hiddenGoColumn = args.hiddenGoColumn;
		}
	}
	this.onSelected = new Event(this);
}



SessionGrid.prototype.load = function(sessions) {
    this.sessions = sessions;
	this.store.loadData(sessions, false);
};

SessionGrid.prototype.filterByBeamline = function(beamlines) {
    if (beamlines){
        if (beamlines.length > 0){
            var filtered = [];
            for(var i = 0; i < beamlines.length; i++){
                filtered = _.concat(filtered, (_.filter(this.sessions, {'beamLineName': beamlines[i]})));
            }
            this.store.loadData(filtered, false);
        }
        else{
            this.store.loadData(this.sessions, false);
        }
    }
};

SessionGrid.prototype.getToolbar = function(sessions) {
    var _this = this;
    var items = [];
    
    var myHandler = function(a,selected,c){                    
                    if (selected){
                        _this.beamlineFilter.push(a.boxLabel);
                    }
                    else{                        
                        _this.beamlineFilter =_.remove(_this.beamlineFilter,a.boxLabel );
                    }
                    _this.filterByBeamline(_this.beamlineFilter);
    };
            
    for (var i =0; i<EXI.credentialManager.getBeamlines().length; i++){
        items.push({           
                xtype: 'checkbox',
                boxLabel : EXI.credentialManager.getBeamlines()[i],
                name : EXI.credentialManager.getBeamlines()[i],
                handler : myHandler 
            
        });
    }
	 return Ext.create('Ext.toolbar.Toolbar', {  
        items: items
    });
};


SessionGrid.prototype.getPanel = function() {
	var _this = this;
   
    this.store = Ext.create('Ext.data.Store', {
		fields : ['Proposal_ProposalNumber', 'beamLineName', 'beamLineOperator', 'Proposal_title', 'Person_emailAddress', 'Person_familyName', 'Person_givenName', 'nbShifts', 'comments'],
		emptyText : "No sessions",
		data : []
	});    


	this.panel = Ext.create('Ext.grid.Panel', {
		title : this.title,
		store : this.store,
        tbar : this.getToolbar(),		
		icon : '../images/icon/sessions.png',
		cls : 'border-grid',
		minHeight: 300,
        width : this.width,
        height : this.height,
		margin : this.margin,
		layout : this.layout,
		columns : [
              {
                    text              : '',
                    dataIndex         : 'BLSession_startDate',
                    flex             : 1,
                    hidden              : true,
                    renderer          : function(grid, a, record){                                    
                                               var html = "";
                                               if (record.data.BLSession_startDate){
                                                    record.data.start =  moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('MMMM Do YYYY');
                                                    record.data.day =  moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('Do');
                                                    record.data.month =  moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('MMMM');
                                                    record.data.year =  moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('YYYY');
                                               }
                                               dust.render("session.grid", record.data, function(err, out){
                                                    html = html + out;
                                               });
                                               return html;
                    }
              },
              {
                            text              : 'Start',
                            dataIndex         : 'BLSession_startDate',
                            flex              : 2,
                            hidden            : false,
                            renderer          : function(grid, a, record){                                 
                                                     
                                                    var location = "#";
                                                    if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "SAXS"){
                                                        location = "#/session/nav/" + record.data.sessionId + "/session";
                                                    }
                                                    else{
                                                        location = "#/mx/datacollection/session/" + record.data.sessionId + "/main";
                                                    }
                                                    if (record.data.BLSession_startDate){                 
                                                         return "<a href='" +  location +"'>" + moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('MMMM Do YYYY') + "</a>"; 
                                                    }
                            }
		     },
             {
                    text : 'Beamline',
                    dataIndex : 'beamLineName',
                    width : 125,
                    hidden : false,
                    renderer : function(grid, a, record){
                            var location = "#";
                            if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "SAXS"){
                                location = "#/session/nav/" + record.data.sessionId + "/session";
                            }
                            else{
                                location = "#/mx/datacollection/session/" + record.data.sessionId + "/main";
                            }
                        return "<a href='" +  location +"'>" + record.data.beamLineName + "</a>"; 
                    }
		    }, 
            {
                text : 'Proposal',
                dataIndex : 'Proposal_ProposalNumber',
                flex : 1,
                hidden : false,
                renderer : function(grid, a, record){
                    var proposal = record.data.Proposal_proposalCode + record.data.Proposal_ProposalNumber;
                    return "<a href='#/session/nav' data-toggle='tooltip' title='Open proposal " + proposal +"'>" + proposal + "</a>"; 
                }
          },       
          {
			    text                : 'Shifts',
			    dataIndex           : 'nbShifts',
                hidden              : this.isHiddenNumberOfShifts,
                flex                : 1
		    },
           {
			    text                : 'Local Contact',
			    dataIndex           : 'beamLineOperator',
			    width               : 200,
                hidden              : this.isHiddenLocalContact,
                flex                : 1
		    },
            {
			    text                : 'Title',
			    dataIndex           : 'Proposal_title',
			    width               : 200,
                hidden              : this.isHiddenTitle,
                flex               : 4
		    },
            {
			    text                : 'PI',
			    dataIndex           : 'Proposal_title',
			    width               : 200,
              
                 hidden              : this.isHiddenPI,
                renderer : function(grid, a, record){                        
                        return record.data.Person_familyName + ", " + record.data.Person_givenName;
                    }
		    },
             {
			    text                : 'e-mail',
			    dataIndex           : 'Person_emailAddress',
			    width               : 200,
                hidden              : true,
                flex               : 1
		    },
           {
                text                : 'Data Collections',
			    dataIndex           : 'Person_emailAddress',
                 width               : 200,
                renderer : function(grid, a, record){ 
                    function getBadge(title, count) {
                        if (count){
                            if (count != 0){
                                return '<tr><td><span style="margin-left:10px;margin-top:2px;background-color:#207a7a;" class="badge">' + count +'</span></td><td style="padding-left:10px;">' + title + '</td></tr>';
                            }
                        }
                        return "";
                    }
                    function getTable(record){
                        var html = "<table>";
                        html =   html = html + getBadge("Energy", record.data.energyScanCount);
                        html = html + getBadge("XRF", record.data.xrfSpectrumCount);
                        html = html + getBadge("Samples", record.data.sampleCount);
                        html = html + getBadge("Test", record.data.testDataCollectionGroupCount);
                        html = html + getBadge("Collects", record.data.dataCollectionGroupCount);
                        html = html + getBadge("Calibration", record.data.calibrationCount);
                        html = html + getBadge("Sample Changer", record.data.sampleChangerCount);
                        html = html + getBadge("HPLC", record.data.hplcCount);
                        return html + "</table>";  
                    }                                                          
                    return getTable(record);
                 }
               
           },
     
            {
                text              : 'End',
                dataIndex         : 'BLSession_endDate',
                hidden              : true,
                flex             : 1,                
                renderer          : function(grid, a, record){                    
                                        return record.data.BLSession_endDate;
                }
		   },
           {
			    text                : 'Comments',
			    dataIndex           : 'comments',
                hidden              : false,
                flex                : 3,
                renderer            : function(grid, a, record){    
                                        if (record.data.comments){                
                                            return "<div style='width:50px; wordWrap: break-word;'>" + record.data.comments + "</div>";
                                        }
                }
                


		    },
           ], 
      	   viewConfig : {
                stripeRows : true,
                getRowClass : function(record, rowIndex, rowParams, store){
                    /*
                    if (record.data.beamLineName != null){
                        
                        if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "SAXS"){
                            return ((rowIndex % 2) == 0) ? "saxs-grid-row-light" : "saxs-grid-row-dark";
                        }
                        if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "MX"){
                            return ((rowIndex % 2) == 0) ? "mx-grid-row-light" : "mx-grid-row-dark";
                        }
                    }
                    return "mx-grid-row-dark";*/
                }
	    	},
            listeners : {
				'cellclick' : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {                    
					_this.onSelected.notify({
                       proposalCode   : record.data.Proposal_proposalCode,
                       proposalNumber : record.data.Proposal_ProposalNumber
                        
                    });
				}			
			}				
	});	
	return this.panel;
};




