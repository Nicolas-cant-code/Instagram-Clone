import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { formatDistanceToNow } from "date-fns";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import "./Posts.css";
import Edit from "./Edit";

const Posts = ({ post }) => {
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = await db.collection("users").doc(post.userId).get();
        if (userDoc.exists) {
          setUser(userDoc.data()); // Set the user data in state
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [post.userId]);

  const { profile_pic, username } = user || {};

  const handleEditClick = () => {
    console.log(user);
    if (user === null) {
      return;
    } else {
      setIsEditModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  const checkModal = (e) => {
    if (!e.target.classList.contains("create")) {
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="posts-container">
      <div className="poster-container">
        {profile_pic === "" ? (
          <PersonRoundedIcon className="poster-icon" />
        ) : (
          <img src={profile_pic} alt="Poster Profile Pic" />
        )}
        <span className="poster-name">
          {username}{" "}
          <span className="poster-time">
            •{" "}
            {formatDistanceToNow(post.timestamp.toDate(), { addSuffix: true })}
          </span>
        </span>
        <div className="more">
          <MoreHorizOutlinedIcon
            className="more-icon"
            onClick={handleEditClick}
          />
        </div>
      </div>
      <div className="image-container">
        <img src={post.imageUrl} alt="Post" className="post-image" />
      </div>
      <div className="footer-container">
        <div className="icons">
          <FavoriteBorderOutlinedIcon className="icon first" />
          <ModeCommentOutlinedIcon className="icon" />
          <SendOutlinedIcon className="icon" />
          <BookmarkBorderOutlinedIcon className="icon bookmark" />
        </div>
        <span className="caption">
          <strong>{username}</strong>
          {post.caption}
        </span>
        <span style={{ marginTop: "10px", color: "#737373", fontSize: "14px" }}>
          Add a comment...
        </span>
      </div>

      {isEditModalOpen && (
        <div className="modal-overlay" onClick={checkModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <Edit user={user} closeModal={closeModal} post={post} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
