module.exports = {
	XHR : function(method, ad, params) {
		// method	: GET or POST
		// ad		: adress of the ressource to be loaded
		// params : An object containing two possible parameters.
		//		- onload	: a function taking no argument, response will be contains in object this.
		//		- variables : an object containing a set of attribute<->value
		//		- form 		: a reference to a HTML form node
		var P = new Promise( function(resolve, reject) {
			 var xhr = new XMLHttpRequest();
			 params = params || {};
			 xhr.onload = function() {if(this.status >= 400) {reject(this);} else {resolve(this);}};
			 xhr.open(method, ad, true);
			 if(params.form || params.variables) {
				 var F;
				 if(params.form) F= new FormData( params.form );
					else F = new FormData();
				 for(var i in params.variables) {
					 F.append(i, params.variables[i]);
					}
				 xhr.send( F );
				} else {xhr.send();}
			} );
		return P;
	}
};
