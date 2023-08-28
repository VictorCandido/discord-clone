import channelModel from "./channelModel";
import memberModel from "./memberModel";
import serverModel from "./serverModel";

export default interface profileModel {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;

    servers: serverModel[];
    members: memberModel[];
    channels: channelModel[];
    
    createdAt: Date;
    updatedAt: Date;
}