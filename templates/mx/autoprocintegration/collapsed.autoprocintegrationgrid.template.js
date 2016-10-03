<div class="container-fluid">
    

   <table style='font-size:12px' class='table  table-striped '> 
            <thead>                                                           
                    <tr>
                        <th  style='padding:0 15px 0 15px;' ><a href="#"  data-toggle="tooltip" title="Rank is done based on the space group and lower rMerge">Rank</a></th>
                        <th  style='padding:0 15px 0 15px;'>Pipeline</th>
                        <th  style='padding:0 15px 0 15px;'>SpaceGroup</th>
                        <th  style='padding:0 15px 0 15px;'>Anom</th>
                        <th  style='padding:0 15px 0 15px;'>A</th>
                        <th style='padding:0 15px 0 15px;'> B</th>
                        <th style='padding:0 15px 0 15px;'> C</th>
                        <th  style='padding:0 15px 0 15px;'>Alpha</th>
                        <th style='padding:0 15px 0 15px;'>Beta</th>
                        <th style='padding:0 15px 0 15px;'>Gamma</th>
                         <th style='padding:0 15px 0 15px;' >Resolution</th>
                         <th style='padding:0 15px 0 15px;' >Multiplicity</th>
                         <th style='padding:0 15px 0 15px;' >Completeness</th>
                         <th style='padding:0 15px 0 15px;' >I/Sigma</th>
                          <th style='padding:0 15px 0 15px;' >Rmeas</th>
                         <th style='padding:0 15px 0 15px;' >Rmerge</th>
                        <th style='padding:0 15px 0 15px;' >Rpim</th>
                        <th style='padding:0 15px 0 15px;' >cc(1/2)</th>
                    </tr>
                
           </thead>
                <tbody>
                 {#.}
                    <tr>
                        <td  style='padding:0 15px 0 15px;'>#{.rank}</td>
                        <td  style='padding:0 15px 0 15px;'>{.v_datacollection_processingPrograms}</td>
                        <td  style='padding:0 15px 0 15px;'>{.v_datacollection_summary_phasing_autoproc_space_group}</td>
                        <td  style='padding:0 15px 0 15px;'>
                            {@eq key=v_datacollection_summary_phasing_anomalous type="boolean" value="true"}
                                <span style='color:green;' class="glyphicon glyphicon-ok"></span>
                            {:else}
                               
                            {/eq}
                        </td>
                                               
                        <td  style='padding:0 15px 0 15px;'>{@decimal key="v_datacollection_summary_phasing_cell_a" decimals=1}{/decimal}</td>
                        <td style='padding:0 15px 0 15px;'>{@decimal key="v_datacollection_summary_phasing_cell_b" decimals=1}{/decimal}</td>
                        <td style='padding:0 15px 0 15px;'>{@decimal key="v_datacollection_summary_phasing_cell_c" decimals=1}{/decimal}</td>
                        <td  style='padding:0 15px 0 15px;'>{@decimal key="v_datacollection_summary_phasing_cell_alpha" decimals=1}{/decimal}</td>
                        <td style='padding:0 15px 0 15px;'>{@decimal key="v_datacollection_summary_phasing_cell_beta" decimals=1}{/decimal}</td>
                        <td style='padding:0 15px 0 15px;'>{@decimal key="v_datacollection_summary_phasing_cell_gamma" decimals=1}{/decimal}</td>
                        
                        <td style='padding:0 15px 0 15px;'><span class='innershell'>{.innerShell.resolutionLimitLow}-{.innerShell.resolutionLimitHigh} </span><span class='overallshell'>{.overall.resolutionLimitLow}-{.overall.resolutionLimitHigh} </span> <span class='outershell'>{.outerShell.resolutionLimitLow}-{.outerShell.resolutionLimitHigh}</span></td>
 
                          
                         <td style='padding:0 15px 0 15px;'><span class='innershell'>{.innerShell.multiplicity} </span><span class='overallshell'>{.overall.multiplicity}</span> <span class='outershell'>{.outerShell.multiplicity}</span></td>
                         <td style='padding:0 15px 0 15px;'><span class='innershell'>{.innerShell.completeness} </span><span class='overallshell'>{.overall.completeness}</span> <span class='outershell'>{.outerShell.completeness}</span></td>
                         <td style='padding:0 15px 0 15px;'><span class='innershell'>{.innerShell.meanIOverSigI} </span><span class='overallshell'>{.overall.meanIOverSigI}</span> <span class='outershell'>{.outerShell.meanIOverSigI}</span></td>
                         
                          <td style='padding:0 15px 0 15px;'><span class='innershell'>{.innerShell.rMeasAllIPlusIMinus} </span><span class='overallshell'>{.overall.rMeasAllIPlusIMinus}</span> <span class='outershell'>{.outerShell.rMeasAllIPlusIMinus}</span></td>
                          
                         <td style='padding:0 15px 0 15px;'><span class='innershell'>{.innerShell.rMerge} </span><span class='overallshell'>{.overall.rMerge}</span> <span class='outershell'>{.outerShell.rMerge}</span></td>
                        <td style='padding:0 15px 0 15px;'><span class='innershell'>{.innerShell.rPimWithinIPlusIMinus} </span><span class='overallshell'>{.overall.rPimWithinIPlusIMinus}</span> <span class='outershell'>{.outerShell.rPimWithinIPlusIMinus}</span></td>
                        <td style='padding:0 15px 0 15px;'><span class='innershell'>{.innerShell.ccHalf} </span><span class='overallshell'>{.overall.ccHalf}</span> <span class='outershell'>{.outerShell.ccHalf}</span></td>
                        
                    </tr>
                    {/.}
               
                  </tbody>
          </table>

<br />        
          <table style='width: 100px;font-size:12px' class='table  table-striped '> 
                <tbody>                                                           
                    <tr>
                        <th class='innershell' >InnerShell</th>
                        <th class='overallshell' >Overall</th>
                        <th class='outershell' >OuterShell</th>
                    </tr>
                </tbody>
             </table>    
</div>

