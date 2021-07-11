import User from "./User";

type Text = {
  type: "text";
  message:string;
}
type Audio = {
  type: "audio";
  message:string;
}
type Video = {
  type: "video";
  message:string;
}

export type Chat = {
  id:number| string;
  sender:Partial<User>;
  reciever:Partial<User>;
  message:Text | Audio | Video
}


