////////////////////////////////////////////////////////////////////////////////
// Request-Response Envelope
//
// Takes care of exception handling and constructing JSON response.
////////////////////////////////////////////////////////////////////////////////

var

// envelopes a request
// - res: response object
// - async: wehter handler is async
// - handler: enveloped function
//   when sync, should return the data
//   when async, should call the function returned
envelope = function (res, async, handler) {
	// final ok handler
	function ok(data) {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify({
			'status': 'OK',
			'data': data
		}));
	}

	// final error handler
	function error(err) {
		res.writeHead(400, {'Content-Type': 'application/json'});
		res.end(JSON.stringify({
			'status': 'ERROR',
			'message': err
		}));
	}
	
	// handling async exceptions
	process.on('uncaughtException', error);
	
	try {
		if (!handler) {
			throw "Envelope handler was not specified";
		}
		if (async) {
			handler();
			// function to call in the innermost handler
			return ok;
		} else {
			ok(handler());
		}
	} catch (message) {
		error(message);
	}
};
		
exports.envelope = envelope;
