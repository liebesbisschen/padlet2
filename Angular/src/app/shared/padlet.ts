import {User} from "./user";
export {User} from "./user";

import {Entry} from "./entry";
export {Entry} from "./entry";

import {Comment} from "./comment";
export {Comment} from "./comment";

import {Rating} from "./rating";
export {Rating} from "./rating";

export class Padlet {
  constructor(
    public id: number,
    public name: string,

    public user_id: number,
    public created_at: Date,

    public is_public: boolean,

    public user?: User,

    public entries?: Entry[]

  ) {
  }
}
