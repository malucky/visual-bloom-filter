$(document).ready(function(){
	/* overhead */
	var added = 0;
	var m = 18;
	var k = 3;
	var bloomFilter = new Bloomfilter(m, k);

	var $storage = $('.storage');
	var $storage_rendering = $('.storage_rendering');
	var $add = $('.add');
	var $add_message = $('.add_message');
	var $query = $('.query');
	var $query_message = $('.query_message');
	var $false_positive = $('.false_positive');
	var $fp_message = $('.false_positive p');
	var $k = $('.k');
	var $m = $('.m');

	/* buttons */
	$k.find('button').click(function(event){
		event.preventDefault();
		k = $k.find('input')[0].value;
		bloomFilter = new Bloomfilter(m, k);
		render();		
	});
	
	$m.find('button').click(function(event){
		event.preventDefault();
		m = $m.find('input')[0].value;
		bloomFilter = new Bloomfilter(m, k);
		render();
	});

	$add.find('button').click(function(event){
		event.preventDefault();
		added += 1;
		addItem($add.find('input')[0].value);
		console.log($add.find('input')[0].value);
	;});

	$query.find('button').click(function(event){
		event.preventDefault();
		queryItem($query.find('input')[0].value);
		console.log('queried: ', $query.find('input')[0].value);
	;});

	$false_positive.find('button').click(function(event){
		event.preventDefault();
		calculateFP();
	});

	/*display storage*/
	var render = function(){
		var array = bloomFilter._storage.storage;
		var str = array.join(" ");
		str = str.replace(/0/g, '_');
		str = str.replace(/true/g,'1');
		$storage_rendering.text(str);
	};

	/* add a new item */
	var addItem = function(item){
		bloomFilter.add(item);
		render();
	};

	/* query an item */
	var queryItem = function(item) {
		if (bloomFilter.query(item)) {
			$query_message.text('Yea, probably');
			$query_message.addClass('yes');
			$query_message.removeClass('no');
		} else {
			$query_message.text('No. Definitely not!');
			$query_message.addClass('no')
			$query_message.removeClass('yes');
		}
	};

	/* false-positive analysis */
    var makeRandomStr = function(){
      return "" + Math.random();
    };
	var calculateFP = function() {
		var n = added;
		var FPs = [];
	    var falseQueries = 10000;
	    var numOfTrials = 100;

		var calculateFPOnce = function(){
			var bloomFilter2 = new Bloomfilter(m,  k);
			for (var i = 0; i < n; i++) {
	  			bloomFilter2.add(makeRandomStr());
		  	}
			var counter = 0;
		    
		    for (var i = 0; i < falseQueries; i++) {
		      if (bloomFilter2.query(makeRandomStr())) {
		        counter++;
		      }
		    }
		    FPs.push(counter/falseQueries*100);
		};

		for (var i = 0; i < numOfTrials; i++) {
			calculateFPOnce();
		}
		var fpRate = _.reduce(FPs, function(prevValue, value){
			return prevValue + value;
		}, 0)/numOfTrials;
		$false_positive.find('p').text(fpRate+"%");
	};
	render();    
});
