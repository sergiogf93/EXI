
<div class="showhim">
    <div style='height: 200px';  >
        
        {#.}
            <div>
                        {#.}
                                    
                                   <a href="{.url}" data-lightbox='a' data-title="#{.runNumber} {.folder}"> <img  class="lazy"  data-src="{.urlThumbnail}" ></a>
                        {/.}
            </div>
        {/.}
    
    </div>
   
    {#.[0]}  
         <a class='showme openGridButton' href='{.ref}'>
                    <div>
                        Exp. Parameters
                    </div>
         </a>
    {/.[0]}

</div>


