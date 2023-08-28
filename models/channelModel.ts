import profileModel from "./profileModel";
import serverModel from "./serverModel";

enum ChannelType {
    TEXT,
    AUDIO,
    VIDEO
}

export default interface channelModel {
  id: string;
  name: string;
  type: ChannelType;

  Profile: profileModel;
  profileId: string;
  
  Server: serverModel;
  serverId: string;
  
  createdAt: Date;
  updatedAt: Date;
}