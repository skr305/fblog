# login
/api/auth/login:
request: { userID, pwd }
response: { 
    userKey: UserKeyType;
    userAva: string;
    userNick: string;
    userID: string; 
 } | errorMark: 1/2
# register
/api/auth/register:
request: { userID, pwd, nick }
response: { 
    userKey: UserKeyType;
    userAva: string;
    userNick: string;
    userID: string; 
 } | errorMark: 3/4
 # default_bloglist
 /api/auth/default_bloglist
 request: { userKey }
 response: { payload: Array<BlogDisplayMeta> }
 # blog_detail
  /api/auth/blog_detail
 request: { userKey, blogID }
 response: { payload: BlogDisplayDetail } 
 # post_comment
 /api/auth/post_comment
 request: { userKey, content, blogID }
 response: { done: bool }
# thumb_blog
 /api/auth/thumb_blog
 request: { userKey, blogID }
 response: { done: bool }
# star_blog
/api/auth/star_blog
 request: { userKey, blogID }
 response: { done: bool }
# thumb_comment
/api/auth/thumb_comment
 request: { userKey, blogID, commentID }
 response: { done: bool }
# thumb_secondary
/api/auth/thumb_secondary
 request: { userKey, blogID, commentID, secondaryID }
 response: { done: bool }
# onReplyComment
/api/auth/reply_comment
 request: { userKey, blogID, commentID, content }
 response: { done: bool }