import profileModel from "./profileModel";
import serverModel from "./serverModel";

enum MemberRole {
    ADMIN,
    MODERATOR,
    GUEST
}

export default interface memberModel {
  id: string;
  role: MemberRole;

  Profile: profileModel;
  profileId: string;

  Server: serverModel;
  serverId: string;

  createdAt: Date;
  updatedAt: Date;
}