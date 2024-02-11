import React, { useContext, useState, useEffect } from "react";
import BlogContext from "../context/BlogContext";
import ReadMore from "./ReadMore";
import likeimg from "../like.png";
import "./TotalBlogItem.css";
const host = "https://bitblogger-backend.onrender.com";

const TotalItem = (props) => {
  const context = useContext(BlogContext);
  const { likeBlog } = context;
  const { blog } = props;
  // const ref = useRef(null)
  // const refClose = useRef(null)

  const initUser = [];
  const [user, setUser] = useState(initUser);
  useEffect(() => {
    getUser();
    showDate();
  }, []);

  const getUser = async () => {
    // API
    const response = await fetch(
      `${host}/api/auth/getbloguser/${blog.user}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    // console.log(json);
    setUser(json);
  };

  // convert date to local time
  let initDate = "";
  const [finDate, setDate] = useState(initDate);
  const showDate = () => {
    const myDate = new Date(blog.date);
    const tempDate = myDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    setDate(tempDate);
  };

  return (
    <div>
      <div className="card bg-transparent my-3">
        <div className="card-body text-dark">
          <div className="align-items-center">
            <h5 className="card-title">{blog.title}</h5>
            <h5>AUTHOR : {user.name}</h5>
            {/* Here blog.content is the children for readmore component */}
            <p className="card-text py-4">
              <ReadMore>{blog.content}</ReadMore>
            </p>
            <div className="row">

              {/* show the length of the like list array */}
              <h5 className="col justify-content-start">
                <button className="bg-transparent btn shadow-none"> <img className="likeimg-css" onClick={() => { likeBlog(blog._id); }} src={likeimg} alt="like-btn"/> </button>
                {blog.likes.length}
              </h5>

              <h5 className="col d-flex justify-content-end">
                Added On : {finDate}
              </h5>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TotalItem;
