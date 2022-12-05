const ping = require('ping');

export default function ping(request, response) {

	const ipJson = {
		host: request.body.ip,
		state: 0
	}

    response.status(200).json(ipJson)


    // ping.sys.probe(request.body.ip, function(isAlive){
	// var state = 0

	// if(isAlive){
	// 	state = 1;
	// } else {
	// 	state = 0;
	// }

	// const ipJson = {
	// 	host: request.body.ip,
	// 	state: state
	// }
    // response.status(200).json(ipJson)
	// });
}