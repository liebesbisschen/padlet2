import {User} from "./user";
export {User} from "./user";

import {Entry} from "./entry";
export {Entry} from "./entry";

import {Comment} from "./comment";
export {Comment} from "./comment";

import {Padlet} from "./padlet";
export {Padlet} from "./padlet";
export class Rating {
  constructor(
    public id: number,
    public rating: number,
    public user_id: number,
    public user: User
  ) {
  }
}
