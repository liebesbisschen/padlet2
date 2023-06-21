import {User} from "./user";
export {User} from "./user";

import {Entry} from "./entry";
export {Entry} from "./entry";

import {Padlet} from "./padlet";
export {Padlet} from "./padlet";

import {Rating} from "./rating";
export {Rating} from "./rating";
export class Comment {
  constructor(
    public id: number,
    public comment: string,
    public user_id: number,
    public user: User,
    public created_at: Date

  ) {
  }
}
