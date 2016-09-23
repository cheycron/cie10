var doSearch = function() {
    var regex = new RegExp('(.*)' + $('input').val().replace(' ', '.*') + '(.*)', 'i');
    console.log(regex);
    var results = _.filter(flatten, function(item) {
        return regex.test(item);
    });
    if (results.length < 400) {
        $('li.node-tree').hide();
        $('li.search').remove();
        results.forEach(function(item) {
            $('<li/>', {
                text: item,
                class: "list-group-item search"
            }).appendTo($('ul.list-group')[0]);
        });
    } else {
        $('li.search').remove();
        $('li.node-tree').show();
    };
}
var cleanSearch = function() {
    $('input').val('');
    $('li.search').remove();
    $('li.node-tree').show();
}

$.getJSON("js/database.json", function(data) {
    $('#loading').hide();
    tree = $('#tree').treeview({
        data: data,
        levels: 1
    });
    flatten = [];
    data.forEach(function(charpter) {
        if (typeof charpter.nodes != 'undefined') {
            charpter.nodes.forEach(function(category) {
                if (typeof category.nodes != 'undefined') {
                    category.nodes.forEach(function(pd) {
                        if (typeof pd.nodes === 'undefined') {
                            flatten.push(pd.text);
                        } else {
                            pd.nodes.forEach(function(fd) {
                                flatten.push(fd.text);
                            })
                        };
                    });
                }
            });
        }
    });
});

$(document).on('keyup', function(evt) {
    if (evt.keyCode == 13 && $('input').val().length > 2) {
        doSearch();
    }
    if (evt.keyCode == 27) {
        cleanSearch();
    }
});





$('#btnsearch').click(doSearch);
$('#btnclear').click(cleanSearch);