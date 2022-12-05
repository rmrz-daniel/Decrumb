const ping = require('ping');

export default function ping(request, response) {

    ping.sys.probe(req.params.ip, function(isAlive){
	var state = 0

	if(isAlive){
		state = 1;
	} else {
		state = 0;
	}

	const ipJson = {
		host: req.params.ip,
		state: state
	}
    response.status(200).json(ipJson)
	});
}