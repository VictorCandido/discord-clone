import channelModel from "./channelModel";
import memberModel from "./memberModel";
import profileModel from "./profileModel";

export default interface serverModel {
    id: string;
    name: string;
    imageUrl: string;
    inviteCode: string;
   
    members: memberModel[];
    channels: channelModel[];
   
    profile: profileModel;
    profileId: string;
    
    createdAt: Date;
    updatedAt: Date;
}