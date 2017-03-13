function ReportsForm(args) {
    this.id = BUI.id();

    this.templateData = {id : this.id};
};

ReportsForm.prototype.show = function(){
    var _this = this;
    
    var html = "";
    dust.render("reports.form.template", this.templateData, function(err,out){
        html = out;
    });

    $("body").append(html);
    $("#" + this.id + "-general-report-doc").unbind('click').click(function(sender){
        var html = _this.generateGeneralReport();
        var fileName = _this.proposal.Proposal_proposalCode + _this.proposal.Proposal_proposalNumber + "_Session_" + _this.session.beamLineName + "_" + moment(new Date(_this.session.BLSession_startDate)).format("YYYYMMDD") + ".doc";
        _this.downloadHTML(html, fileName);
    });
    $("#" + this.id + "-general-report-pdf").unbind('click').click(function(sender){
        var html = _this.generateGeneralReport();
    });

    $("#" + this.id + "-screening-report-doc").unbind('click').click(function(sender){
        var url = EXI.getDataAdapter().proposal.session.downloadDOCReport(_this.proposal.Proposal_proposalCode + _this.proposal.Proposal_proposalNumber,_this.session.sessionId,10);
        window.open(url,"_blank");
    });

    $("#" + this.id + "-screening-report-pdf").unbind('click').click(function(sender){
        var url = EXI.getDataAdapter().proposal.session.downloadPDFReport(_this.proposal.Proposal_proposalCode + _this.proposal.Proposal_proposalNumber,_this.session.sessionId,10);
        window.open(url,"_blank");
    });

    $("#" + this.id + "-modal").on('hidden.bs.modal', function(){
        $(this).remove();
    });
    
    $("#" + this.id + "-modal").modal();
};


ReportsForm.prototype.load = function (sessionId, proposal,dataCollectionGroup,energyScans,xfeScans) {
    var _this = this;
    this.proposal = proposal;
    this.dataCollectionGroup = dataCollectionGroup;
    this.energyScans = energyScans;
    this.xfeScans = xfeScans;
    if (proposal && sessionId) {
        var onSuccess = function (sender, session) {
            if (session && session.length > 0){
                _this.session = session[0];
                $(".report-btn").removeAttr('disabled');
            }
        }

        EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionByProposalSessionId(this.proposal.Proposal_proposalCode + this.proposal.Proposal_proposalNumber,sessionId);
    }

    if (this.energyScans){
        _.map(this.energyScans,function(e) {
            e.choochURL = EXI.getDataAdapter().mx.energyscan.getChoochJpegByEnergyScanId(e.energyScanId);
        });
    }
};

ReportsForm.prototype.generateGeneralReport = function () {
    var html = this.getHTMLHeader();
    debugger
    dust.render("general.report.doc.template", {proposal : this.proposal, session : this.session, datacollections : this.dataCollectionGroup, energyScans : this.energyScans, xfeScans : this.xfeScans}, function(err,out){
        html += out;
    });

    html += '</body></html>';

    return html;
};

ReportsForm.prototype.getHTMLHeader = function () {
    // var header = '<!DOCTYPE html >';
    // header += '<head>';
    // header += '<xml>';
    // header += '<word:worddocument>';
    // // header += '<word:view>Print</word:view>';
    // // header += '<word:Zoom>90%</word:Zoom>';
    // header += '<word:donotoptimizeforbrowser/>';
    // header += '</word:worddocument>';
    // header += '</xml><meta http-equiv=Content-Type content="text/html; charset=utf-8"><title></title>';
    // header += '<style>@page{mso-page-orientation:landscape;size:29.7cm 21cm;margin:1cm 1cm 1cm 1cm;}</style>';
    // header += '</head><body>';
    var header = "";
    dust.render("report.header.template",[],function(err,out){
        header = out;
    });
    return header;
};

ReportsForm.prototype.downloadHTML = function(html,fileName) {
    // Convert images
    // var regularImages = $(html).find("img");
    // var canvas = document.createElement('canvas');
    // var ctx = canvas.getContext('2d');
    // [].forEach.call(regularImages, function (imgElement) {
    //     // preparing canvas for drawing
    //     canvas.width = imgElement.width;
    //     canvas.height = imgElement.height;
    //     ctx.clearRect(0, 0, 100, 100);
    //     ctx.drawImage(imgElement, 100, 100);
    //     // by default toDataURL() produces png image, but you can also export to jpeg
    //     // checkout function's documentation for more details
    //     var dataURL = canvas.toDataURL();
    //     imgElement.setAttribute('src', dataURL);
    // })
    // canvas.remove();

    // var converted = htmlDocx.asBlob(html);
    // saveAs(converted,'test.doc');
    var byteNumbers = new Uint8Array(html.length);

    for (var i = 0; i < html.length; i++) {
        byteNumbers[i] = html.charCodeAt(i);
    }
    var blob = new Blob([byteNumbers], {type: 'text/html'});

    saveAs(blob,fileName);
};