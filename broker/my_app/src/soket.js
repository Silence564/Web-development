
import React, {useState, useEffect} from "react";
import io from 'socket.io-client';
const socket = io('http://localhost:4020/', {
    transports: ['websocket']
});

export default function App1(props){
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);

    useEffect(()=>{
        socket.on('connect', function(){
            setIsConnected(true);
            console.log('Connected to server');
        });

        socket.on('disconnect', function(){
            setIsConnected(false);
            console.log('Disconnected to server');
        });

        for (let i=0; i <props.events.length; i++){
            socket.on(props.events[i], (message) =>{
                props.updateCalls[i](message);
                setFooEvents(message);
            });
        }

        return() =>{
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        }
    }, []);
    return(<div></div>);
}