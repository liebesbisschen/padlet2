import {User} from "./user";
export {User} from "./user";

import {Padlet} from "./padlet";
export {Padlet} from "./padlet";

import {Comment} from "./comment";
export {Comment} from "./comment";

import {Rating} from "./rating";
export {Rating} from "./rating";
export class Entry {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public user_id: number,
    public user: User,
    public padlet_id: number,
    public created_at: Date,
    public ratings?: Rating[],
    public comments?: Comment[]

  ) {
  }
}
