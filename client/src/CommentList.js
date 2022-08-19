import React from "react";

const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {

    return <li key={comment.id}>{renderContent(comment.status, comment.content)}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

function renderContent(status, content) {
  return {
    'pending': 'This content is awaiting moderation',
    'rejected': 'This content has been injected',
    'approved': content
  }[status]
}

export default CommentList;
