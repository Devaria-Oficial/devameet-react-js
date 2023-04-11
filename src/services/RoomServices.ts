import { HttpApiServices } from "./HttpApiServices";

export class RoomServices extends HttpApiServices {
    getRoomByLink(link:string){
        return this.get('/room/'+link);
    }
}