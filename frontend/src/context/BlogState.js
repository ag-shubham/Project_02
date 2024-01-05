// import React from "react";
import { useState } from "react";
import BlogContext from "./BlogContext";
const BlogState = (props) => {
  const host = "https://bitblogger-backend.onrender.com";
  const initBlog = [];
  // setBlog is a function used to update the blog state (blog)
  const [blogs, setBlog] = useState(initBlog);

  // Get All Blogs for a specific user
  const getBlogs = async () => {
    // API
    const response = await fetch(`${host}/api/blogs/fetchallblogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    
    const json = await response.json();
    // console.log(json);
    setBlog(json);
  };

  // Get All Blogs(total)
  const allBlogs = async () => {
    // API
    const response = await fetch(`${host}/api/blogs/fetchtotalblogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    
    const json = await response.json();
    // console.log(json);
    setBlog(json);
  };

  // Add Blog
  const addBlog = async (title, content, tag) => {
    // API
    const response = await fetch(`${host}/api/blogs/createBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, content, tag }), // body data type must match "Content-Type" header
    });

    const newBlog = await response.json() ;
    // concat makes a new updated array
    setBlog(blogs.concat(newBlog));
  };

  // Delete Blog
  const deleteBlog = async (id) => {
    // API
    const response = await fetch(`${host}/api/blogs/deleteBlog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    // console.log(json);
    //logic
    const deleteBlog = blogs.filter((blog) => {
      return blog._id !== id;
    });
    setBlog(deleteBlog);
  };

  // Update/Edit Blog
  const editBlog = async (id, title, content, tag) => {
    // API
    const response = await fetch(`${host}/api/blogs/updateBlog/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, content, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json() ;
    // console.log(json) ;

    // logic
    let newBlogs = JSON.parse(JSON.stringify(blogs))
    for (let index = 0; index < newBlogs.length; index++) {
      const element = newBlogs[index];
      if (element._id === id) {
        newBlogs[index].title = title;
        newBlogs[index].content = content;
        newBlogs[index].tag = tag;
        break;
      }
    }
    setBlog(newBlogs) ;
  };

// Like a Blog
  const likeBlog = async (id) => {
    // API
    const response = await fetch(`${host}/api/blogs/like/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    if(json.error) {
      alert("Please Login to Like a Blog") ;
      return ;
    }
    // console.log(json);
    // search for the blog to be liked and update
    let newBlogs = JSON.parse(JSON.stringify(blogs))
    for (let index = 0; index < newBlogs.length; index++) {
      const element = newBlogs[index];
      if (element._id === id) {
        if(newBlogs[index].likes.includes("req.params.id")) {
          alert("You have already liked this blog") ;
          break ;
        }
        newBlogs[index].likes.push("req.params.id");
        break;
      }
    }
    setBlog(newBlogs) ;
  };


  return (
    // here props.children means that the "value" will be accesible to all the items(props) present inside the blogcontext component.
    // simple explanation of what props.children does is that it is used to display whatever you include between the opening and closing tags when invoking a component.
    <BlogContext.Provider
      value={{ blogs, setBlog, addBlog,allBlogs, deleteBlog, editBlog, getBlogs, likeBlog }}
    >
      <>{props.children}</>
    </BlogContext.Provider>
  );
};

export default BlogState;
