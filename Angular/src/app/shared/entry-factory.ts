import {Entry, Rating, User} from "./entry";

export class EntryFactory {
  static empty(): Entry {

    return new Entry(1, '', '',1,  new User(0, '',
      '', '', ''), 0, new Date(), [], []);
  }

  static fromObject(rawEntry: any): Entry {
    return new Entry(
      rawEntry.id,
      rawEntry.title,
      rawEntry.content,
      rawEntry.user_id,
      rawEntry.user,
      rawEntry.padlet_id,
      typeof (rawEntry.created_at) === 'string' ?
        new Date(rawEntry.created_at) : rawEntry.created_at,
      rawEntry.ratings,
      rawEntry.comments
    );
  }
}
