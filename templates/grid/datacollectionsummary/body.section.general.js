<style>
/*  SECTIONS  */
.section {
	clear: both;
	padding: 0px;
	margin: 0px;
}

/*  COLUMN SETUP  */
.col {
	display: block;
	float:left;
	margin: 1% 0 1% 0.5%;
}
.col:first-child { margin-left: 0; }

/*  GROUPING  */
.group:before,
.group:after { content:""; display:table; }
.group:after { clear:both;}
.group { zoom:1; /* For IE 6/7 */ }


.span_6_of_6 {
	width: 100%;
}

.span_5_of_6 {
  	width: 83.25%;
}

.span_4_of_6 {
  	width: 66.5%;
}

.span_3_of_6 {
  	width: 49.75%;
}

.span_2_of_6 {
  	width: 33%;
}

.span_1_of_6 {
  	width: 16.25%;
}

/*  GO FULL WIDTH BELOW 480 PIXELS */
@media only screen and (max-width: 480px) {
	.col {  margin: 1% 0 1% 0%; }
	.span_1_of_6, .span_2_of_6, .span_3_of_6, .span_4_of_6, .span_5_of_6, .span_6_of_6 { width: 100%; }
}

</style>

<div class="section group">
	<div class="col span_1_of_6">
	    {>"resultsection.general"  /}
	</div>
	<div class="col span_1_of_6">
	2 of 6
	</div>
	<div class="col span_1_of_6">
	3 of 6
	</div>
	<div class="col span_1_of_6">
	4 of 6
	</div>
	<div class="col span_1_of_6">
	5 of 6
	</div>
	<div class="col span_1_of_6">
	6 of 6
	</div>
</div>