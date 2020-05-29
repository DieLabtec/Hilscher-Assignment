import openSocket from 'socket.io-client';


class SocketHelper {
    constructor() {
        this.socket = openSocket("localhost:5000");
    }

    

    subscribe(event, callback) {
        console.log(`Subscribed to ${event} event`);
        return this.socket.on(event, callback)
    }

    trigger(event, data) {
        console.log(`Triggering event ${event} `)
        console.log(data)
        
        return this.socket.emit(event, data);
    }
}

export default new SocketHelper();