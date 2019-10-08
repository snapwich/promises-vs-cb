
let express = require('express');

let app = express();

app.use('/', express.static('public'));

app.get('/timed', function(req, res) {
	console.log('timed requests for:', req.query.type || 'unknown type');
	setTimeout(() => {
		res.json({
			type: req.query.type,
			delay: req.query.delay
		});
	}, req.query.delay || 0)
});

app.listen(8080);