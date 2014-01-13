$(document).ready(function(){
	/* overhead */
	$storage = $('.storage');
	$storage_rendering = $('.storage_rendering');
	$add = $('.add');
	$add_message = $('.add_message');
	$query = $('.query');
	$query_message = $('.query_message');
	$false_positive = $('.false-positive');
	$fp_message = $('.false_positive p');
	$add.find('button').click(function(event){
		event.preventDefault();
		addItem($add.find('input')[0].value);
		console.log($add.find('input')[0].value);
	;});
	$query.find('button').click(function(event){
		event.preventDefault();
		queryItem($query.find('input')[0].value);
		console.log('queried: ', $query.find('input')[0].value);
	;});


	var m = 18;
	var k = 3;
	bloomFilter = new Bloomfilter(m);

	//display storage
	var render = function(){
		var array = bloomFilter._storage.storage;
		$storage_rendering.text(array + "");
	};
	render();

	/* add a new item */
	var addItem = function(item){
		bloomFilter.add(item);
		render();
		$add_message.text('added');
	};

	/* query an item */
	var queryItem = function(item) {
		var found = bloomFilter.query(item);
		$query_message.text(found);
	};
	queryItem('Scott');
	/* false-positive analysis */
	$false_positive = $('.false-positive');
	$false_positive.append('<header>Add</header>');
	var bloomFilter;
  	var people = ["Ben", "Brendon", "Nick", "ray", "Scott"];
  	    _.each(people, function(item) {
      bloomFilter.add(item);
    });
    var counter = 0;
    var falseQueries = 10000;
    var makeRandomStr = function(){
      return "" + Math.random();
    };
    for (var i = 0; i < falseQueries; i++) {
      if (bloomFilter.query(makeRandomStr())) {
        counter++;
      }
    }
	$fp_message.text(counter/falseQueries*100);
});
