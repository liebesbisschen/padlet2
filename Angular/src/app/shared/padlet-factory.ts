import {Padlet, User} from "./padlet";

export class PadletFactory {

  static empty() : Padlet {
    return new Padlet(0, '', 0,new Date(),false, new User(0, 'gast', 'gast', 'guest', ''), []);
  }

  static fromObject(rawPadlet: any) : Padlet {
    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      rawPadlet.user_id,
      typeof(rawPadlet.created_at) === 'string' ? new Date(rawPadlet.created_at) : rawPadlet.created_at,
      rawPadlet.is_public,
      rawPadlet.user,

      rawPadlet.entries

    );



  }
}


