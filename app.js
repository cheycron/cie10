 $.getJSON('database.json', function(diagnostics){

	_.filter(diagnostics, function(diagnostic) { return diagnostic.type == 'charpter'; }).forEach(function(item){
		createItem(item).appendTo('.list-group');
	});

 	function getChilds(event) {
 		if($(event.target).hasClass('open')) {
 			$(event.target).removeClass('open').find('ul').remove()
 		} else {
 			$(event.target).addClass('open');
			list = $('<ul/>', { class: "list-group" })
			_.filter(diagnostics, function(diagnostic) { return diagnostic.parent == event.target.id; }).forEach(function(item){
				createItem(item).appendTo(list);
			});
			list.appendTo(event.target);
 		}
 	}

	function createItem(diagnostic){
		var id = $('<strong/>', { text: diagnostic.id });
		var childsAmount = _.countBy(diagnostics, function(d) { return d.parent == diagnostic.id; }).true; 
		var element = $('<li/>', {
		    id: diagnostic.id,
		    title: diagnostic.title,
		    text: diagnostic.title,
		    class: 'list-group-item ' + diagnostic.type + (typeof childsAmount === 'undefined' ? ' noChilds' : ' hasChilds')
		}).prepend(id)
		if(typeof childsAmount != 'undefined') {
			element.append($('<i/>', { class: 'icon pull-right' })).css('cursor', 'pointer')
		}
		return element;
	}

		$('li.hasChilds').click(function() {
			getChilds(event);
			return false;
		});


 });

