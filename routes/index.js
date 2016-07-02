module.exports = function Route(app, server) {
	// this gets the socket.io module
	var io = require('socket.io').listen(server)
	app.get('/', function(request, response) {
		response.render('index');
	})

	io.sockets.on('connection', function(socket){
		socket.on('button_clicked', function(data){
			data.count += 1
			io.emit('update_count', {response: data.count});
		})
	})
	io.sockets.on('connection', function(socket){
		socket.on('reset', function(data){
			data.count = 0
			io.emit('reset', {response: data.count});
		})
	})
}