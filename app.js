 $.getJSON('database.json', function(diagnostics){

 	

	_.filter(diagnostics, function(diagnostic) { return diagnostic.type == 'charpter'; }).forEach(function(item){
		var id = $('<strong/>', { text: item.id });
		createItem(item).addClass('charpter').click(function(event){
			getChilds(event);
		}).appendTo('.list-group');
	});

 	function getChilds(event) {
 		if($(event.target).hasClass('open')) {
 			
 		} else {
 			$(event.target).addClass('open');
			list = $('<ul/>', { class: "list-group" })
			_.filter(diagnostics, function(diagnostic) { return diagnostic.parent == event.target.id; }).forEach(function(item){
				createItem(item).addClass('category').appendTo(list).click(function(event){
				});
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
		    class: 'list-group-item'
		}).prepend(id)
		if(childsAmount > 0) {
			element.append($('<i/>', { class: 'glyphicon glyphicon-chevron-down pull-right' })).append($("<span/>", { class: 'badge', text: childsAmount })).css('cursor', 'pointer')
		}
		return element;
	}

 });