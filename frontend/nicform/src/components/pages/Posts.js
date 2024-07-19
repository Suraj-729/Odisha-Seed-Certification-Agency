// src/components/Posts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://staging.dzinepixel.com/Osoca_wp/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching the posts', error);
      });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title.rendered}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
