var crypto = require('crypto');

exports.encode = function(payload, secret) {
	
	//hs256 algorithm is used to encode/decode our jwt
	algorithm = 'HS256';

	//every jwt has a header, payload and signature
	var header = { 
		typ: "JWT",
		alg: algorithm
	};

	var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
	jwt = jwt + '.' + sign(jwt, secret);

	return jwt;
};

function sign(str, key) {
	//return crypto.createHmac('sha265', key).update(str).digest('base64'); // this did not work for me
	return crypto.createHmac('sha256', key).update(str).digest('base64');
}

//all the 3 parts of the jwt that are received will be
//base64 encoded, so create a function that will wrap
//the native data returned to look better
function base64Encode(str) {
	return new Buffer(str).toString('base64');
}