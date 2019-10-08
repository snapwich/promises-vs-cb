
var order = (function(type, order) {
	let request = 'http://localhost:8080/timed?delay=200&type=' + type;

	function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
	}

	let requests = {
		'promise-ajax': function() {
			performance.mark(`promise-ajax_${type}_request`);
			ajax(request).then(function(res) {
				Promise.resolve(res).then(function(res) {
					performance.mark(`promise-ajax_${type}_response`);
					performance.measure(`promise-ajax_${type}_measure`, `promise-ajax_${type}_request`, `promise-ajax_${type}_response`);
					work(`promise-ajax_${type}_handler`, 1000);
				});
			});
		},
		'fetch': function() {
			performance.mark(`fetch_${type}_request`);
			fetch(request).then(function(res) {
				performance.mark(`fetch_${type}_response`);
				performance.measure(`fetch_${type}_measure`, `fetch_${type}_request`, `fetch_${type}_response`);
				work(`fetch_${type}_handler`, 1000);
			});
		},
		'ajax': function() {
			performance.mark(`ajax_${type}_request`);
			ajax(request).then(function(res) {
				performance.mark(`ajax_${type}_response`);
				performance.measure(`ajax_${type}_measure`, `ajax_${type}_request`, `ajax_${type}_response`);
				work(`ajax_${type}_handler`, 1000);
			});			
		}
	};

	if (!order) {
		order = shuffle(Object.keys(requests));
	}

	console.log(`making ${type} requests in following order:`, order);
	order.forEach(key => requests[key]());

	return order;
})(type, order);
