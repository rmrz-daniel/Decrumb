const express = require('express')
const ping = require('ping');
const cors = require('cors');
const app = express();


const port = 4567;

app.use(cors({
	origin: "*"
}))

app.listen(port, () => {
	console.log('listening on port 4567')
})

app.get("/:ip", (req, res) => {


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
        res.json(ipJson)
    });

})