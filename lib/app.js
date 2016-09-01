$.getJSON("lib/database.json", function(data) {
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

$('input').keydown(function() {
    var regex = new RegExp('.*' + $(this).val() + '.*', 'i');
    var results = _.filter(flatten, function(item){
        return regex.test(item);
    });
    if(results.length < 200){
        $('#tree').hide();
    } else {
        $('#tree').show();
    };
});