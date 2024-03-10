import {} from '@cabloy/core';

export interface EntityCommentView extends EntityItemBase {
  userId: number;
  sorting: number;
  heartCount: number;
  replyId: number;
  replyUserId: number;
  replyContent: string;
  content: string;
  summary: string;
  html: string;
  userName: string;
  avatar: string;
  replyUserName: string;
}
