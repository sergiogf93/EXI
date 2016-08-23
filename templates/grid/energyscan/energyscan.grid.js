<div class="container-fluid">
    <div class="panel with-nav-tabs panel-default">
        <div class="panel-heading clearfix">
            <div class="pull-left">
                <h1 class="panel-title" style='color:#337ab7;'>
                <span style='font-size:12px;'>   {.startTime}</span>
            </h1>
            </div>
            <div class="pull-right">
                <ul class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" href="#datacollection_{DataCollection_dataCollectionId}">Summary </a>
                    </li>

                </ul>
            </div>
        </div>
        <br />
        <div class="tab-content">
            <div id="datacollection_{DataCollection_dataCollectionId}" class="tab-pane fade in active">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-1 col-md-1">
                            <div class="well" style='font-size:30px;'>{.element}</div>
                        </div>
                        <div class="col-xs-3 col-md-3">
                            <table class="table table-condensed">
                                <tr>
                                    <td>Start Time</td>
                                    <td>{.startTime}</td>
                                </tr>
                                <tr>
                                    <td>Protein</td>
                                    <td>{.acronym}</td>
                                </tr>
                                <tr>
                                    <td>Sample</td>
                                    <td>{.name}</td>
                                </tr>
                                <tr>
                                    <td>Fluorescence Detector</td>
                                    <td>{.fluorescenceDetector}</td>
                                </tr>
                                <tr>
                                    <td style='width:150px;'>Energy Scan Range</td>
                                    <td>{.startEnergy} kev - {.endEnergy} kev</td>
                                </tr>
                                <tr>
                                    <td>Edge Energy (theoretical)</td>
                                    <td>{.edgeEnergy} kev</td>
                                </tr>
                                <tr>
                                    <td>Flux @100%</td>
                                    <td>{.flux} ph/sec</td>
                                </tr>
                                <tr>
                                    <td>Transmission</td>
                                    <td>{.transmissionFactor} %</td>
                                </tr>

                                <tr>
                                    <td style='width:150px;'>Beam Size Hor</td>
                                    <td>{.beamSizeHorizontal} micrometer</td>
                                </tr>
                                <tr>
                                    <td>Beam Size Vert</td>
                                    <td>{.beamSizeVertical} micrometer</td>
                                </tr>
                                <tr>
                                    <td>Exposure Time</td>
                                    <td>{.exposureTime} sec</td>
                                </tr>
                                <tr>
                                    <td>Filename</td>
                                    <td>{.filename}</td>
                                </tr>
                            </table>
                        </div>


                        <div class="col-xs-3 col-md-3">
                            <table class="table table-condensed">
                                <tr>
                                    <td >Peak Energy</td>
                                    <td >{.peakEnergy} kev</td>
                                </tr>
                                <tr>
                                    <td >Pk f'</td>
                                    <td >{.peakFPrime} e–</td>
                                </tr>

                                <tr>
                                    <td >Pk f''</td>
                                    <td >{.peakFDoublePrime} e–</td>
                                </tr>

                                <tr>
                                    <td >Inflection Energy</td>
                                    <td >{.inflectionEnergy} kev</td>
                                </tr>
                                <tr>
                                    <td >Ip f'</td>
                                    <td >{.inflectionFPrime} e– </td>


                                </tr>



                                <tr>
                                    <td >Ip f''</td>
                                    <td >{.inflectionFDoublePrime} e– </td>
                                </tr>


                            </table>
                        </div>

                       <div class="col-xs-3 col-md-3">
                            <a href='{.choochURL}' data-lightbox='{.choochURL}' data-title="Chooch"><img class="lazy"  data-src='{.choochURL}' src='{.choochURL}' /> </a>
                        </div>
                    

                    </div>
                </div>
            </div>



        </div>
    </div>
</div>

