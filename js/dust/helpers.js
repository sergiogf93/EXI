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
