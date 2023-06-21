import {Comment, User} from "./comment";

export class CommentFactory {
  static empty(): Comment {
    return new Comment(0, '',0, new User(0, '',
      '', '', ''), new Date());
  }

  static fromObject(rawComment: any): Comment {
    return new Comment(
      rawComment.id,
      rawComment.comment,
      rawComment.user_id,
      rawComment.image,
      typeof(rawComment.created_at) === 'string' ?
        new Date(rawComment.created_at) : rawComment.created_at,
    );
  }
}
