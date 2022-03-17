// import React from "react";
import { useState } from "react";
import BlogContext from "./BlogContext";
const BlogState = (props) => {
  const host = "http://localhost:5000";
  const initBlog = [];
  // setBlog is a function used to update the blog state (blog)
  const [blog, setBlog] = useState(initBlog);

  // Get All Blogs
  const getBlogs = async () => {
    // API
    const response = await fetch(`${host}/api/blogs/fetchallblogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyZjNhOTJiN2UxNTFiZjFjMDEwYjlkIn0sImlhdCI6MTY0NzI2MjM1NH0.a7Fi4W40nqfizOF70MzCKbMV8Fpnsn6fNbLKiDjvLsQ",
      },
    });
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyZjNhOTJiN2UxNTFiZjFjMDEwYjlkIn0sImlhdCI6MTY0NzI2MjM1NH0.a7Fi4W40nqfizOF70MzCKbMV8Fpnsn6fNbLKiDjvLsQ
    const json = await response.json();
    console.log(json);
    setBlog(json);
  };

  // Add Blog
  const addBlog = async (title, content, tag) => {
    // API
    const response = await fetch(`${host}/api/blogs/createBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyZjNhOTJiN2UxNTFiZjFjMDEwYjlkIn0sImlhdCI6MTY0NzI2MjM1NH0.a7Fi4W40nqfizOF70MzCKbMV8Fpnsn6fNbLKiDjvLsQ"
      },
      body: JSON.stringify({ title, content, tag }), // body data type must match "Content-Type" header
    });

    // logic
    const newBlog = {
      _id: "622fa71b6f62fcdd87dec335",
      user: "622f3a92b7e151bf1c010b9d",
      title: title,
      content: content,
      tag: tag,
      date: "2022-03-14T20:35:39.340Z",
      __v: 0,
    };
    // concat makes a new updated array
    setBlog(blog.concat(newBlog));
  };

  // Delete Blog
  const deleteBlog = async (id) => {
    // API
    const response = await fetch(`${host}/api/blogs/deleteBlog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyZjNhOTJiN2UxNTFiZjFjMDEwYjlkIn0sImlhdCI6MTY0NzI2MjM1NH0.a7Fi4W40nqfizOF70MzCKbMV8Fpnsn6fNbLKiDjvLsQ",
      },
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    //logic
    const deleteBlog = blog.filter((blog) => {
      return blog._id !== id;
    });
    setBlog(deleteBlog);
  };

  // Update/Edit Blog
  const updateBlog = async (id, title, content, tag) => {
    // API
    const response = await fetch(`${host}/api/blogs/updateBlog/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyZjNhOTJiN2UxNTFiZjFjMDEwYjlkIn0sImlhdCI6MTY0NzI2MjM1NH0",
      },
      body: JSON.stringify({ title, content, tag }), // body data type must match "Content-Type" header
    });

    // logic
    for (let index = 0; index < blog.length; index++) {
      const element = blog[index];
      if (element._id === id) {
        element.title = title;
        element.content = content;
        element.tagtag = tag;
      }
    }
  };
  return (
    // here props.children means that the "value" will be accesible to all the items(props) present inside the blogcontext component.
    // simple explanation of what props.children does is that it is used to display whatever you include between the opening and closing tags when invoking a component.
    <BlogContext.Provider
      value={{ blog, setBlog, addBlog, deleteBlog, updateBlog, getBlogs }}
    >
      <>{props.children}</>
    </BlogContext.Provider>
  );
};

export default BlogState;