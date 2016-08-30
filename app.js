var isDiagnostic 	= new RegExp("^(A|B|C|D|E)");
var isTitle 		= new RegExp("^\|");

 $.getJSON('database.json', function(diagnostics){


	_.each(diagnostics, function(name, key) {
		console.log(key, isTitle.test(key), name);
	})
 
 });



 function getchilds(key) {
 	return false; // Deberá retornar el listado de diagnosticos hijos.
 };