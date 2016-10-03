function AutoprocessingRanker(){
    
    
}

/**
 * Filter by space group and lower rMerge
 * 
 */
AutoprocessingRanker.prototype.rank = function(array, spacegroudFieldName, rmergeFieldName){
    array = array.sort(function(a1, a2){        
         var spaceGroudTrimmed1 = a1[spacegroudFieldName].replace(/\s+/g, '');
         var spaceGroudTrimmed2 = a2[spacegroudFieldName].replace(/\s+/g, '');
        
         var space1 = _.indexOf(ExtISPyB.spaceGroups, spaceGroudTrimmed1);
         var space2 = _.indexOf(ExtISPyB.spaceGroups, spaceGroudTrimmed2);
        
         /** Sort by rmerge */
         if (space2 -  space1 == 0){
             var rmerge1 = a1["overall"]["rMerge"];
             var rmerge2 = a2["overall"]["rMerge"];
             
             if (rmerge1){
                 if (rmerge2){
                     return rmerge1 - rmerge2;
                 }
                 else{
                     return 1;
                 }
             }
             return -1;
             
         }
         return space2 -  space1;
      
    });
    for(var i =0; i < array.length; i++){            
            array[i].rank = i + 1;
    }
    return array;
};

AutoprocessingRanker.prototype.sortBySpaceGroup = function(array, spacegroudFieldName){
    try{
        for(var i =0; i < array.length; i++){
            var spaceGroudTrimmed = array[i][spacegroudFieldName].replace(/\s+/g, '');
            array[i].rank = _.indexOf(ExtISPyB.spaceGroups, spaceGroudTrimmed);
        }
        
    }
    catch(e){
        return array;
    }
    return array;
};

AutoprocessingRanker.prototype.sortByRMergeLower = function(array, spacegroudFieldName){
    try{
        for(var i =0; i < array.length; i++){
            var spaceGroudTrimmed = array[i][spacegroudFieldName].replace(/\s+/g, '');
            array[i].rank = _.indexOf(ExtISPyB.spaceGroups, spaceGroudTrimmed);
        }
        
    }
    catch(e){
        return array;
    }
    return array;
};
