import { io } from 'socket.io-client'

function capitalizeFirstLetter(string: string):string{
    return string.charAt(0).toUpperCase()+string.slice(1);
}

class PeerConnectionSession {
    
    _room: any;
    _userId: any;
    socket: any;
    peerConnections = {} as any;
    senders = [] as any;
    listeners = [] as any;
    ons = [] as any;

    constructor(socket : any){
        this.socket = socket;
    }

    joinRoom(link: string, userId: string){
        this._room = link;
        this._userId = userId; 
        this.socket.emit('join', {link, userId});
    }

    onUpdateUserList(callback: any){
        this.socket.on(`${this._room}-update-user-list`, ({users} : any) => {
            callback(users);
        });
    }

    onRemoveUser(callback: any){
        this.socket.on(`${this._room}-remove-user`, ({socketId} : any) => {
            callback(socketId);
        });
    }

    updateUserMovement(data: any){
        this.socket.emit('move', data);
    }

    updateUserMute(data: any){
        this.socket.emit('toggl-mute-user', data);
    }

    addPeerConnection(id: string, stream: any, callback: any){
        if(!this.peerConnections[id]){
            this.peerConnections[id] = new window.RTCPeerConnection({
                iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
            });

            stream?.getTracks().forEach((track: any) => {
                this.senders.push(this.peerConnections[id].addTrack(track, stream));
            });

            this.listeners[id] = (event: any) => {
                const on = '_on' + capitalizeFirstLetter(this.peerConnections[id].connectionState);
                const fn = this.ons[on];
                fn && fn(event, id);
            }

            this.peerConnections[id].addEventListener('connectionstatechange', this.listeners[id]);
            this.peerConnections[id].ontrack = ({stream: [stream]} : any) => {
                callback(stream);
            }
        }
    }

    removePeerConnection(id:string){
        if(this.peerConnections[id]){
            this.peerConnections[id].removeEventListener('connectionstatechange', this.listeners[id]);
            delete this.peerConnections[id];
            delete this.listeners[id];
        }
    }

    onAddUser(callback: any){
        this.socket.on(`${this._room}-add-user`, ({user}: any) => {
            console.log('onAddUser', user);
            callback(user);
        });
    }

    async callUser(to:any){
        console.log('callUser to:', to, this.peerConnections[to]?.iceConnectionState);
        if(this.peerConnections[to]?.iceConnectionState === 'new'){
            const offer = await this.peerConnections[to].createOffer();
            await this.peerConnections[to].setLocalDescription(new RTCSessionDescription(offer));
            this.socket.emit('call-user', {offer, to, link: this._room});
        }
    }
}

export const createPeerConnectionContext = () => {
    const {VITE_PUBLIC_WS_URL} = import.meta.env;

    const socket = io(VITE_PUBLIC_WS_URL);

    return new PeerConnectionSession(socket);
}