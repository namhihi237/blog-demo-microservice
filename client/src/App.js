import React, { useState } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  const [reFresh, setReFresh] = useState(false);



  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate reFresh={(state) => setReFresh(state)} isReFresh={reFresh} />
      <hr />
      <h1>Posts</h1>
      <PostList reFresh={reFresh} />
    </div>
  );
};
export default App;
