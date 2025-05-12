import React from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase.jsx";
import "./Edit.css";
import Create from "./Create.jsx";

const Edit = ({ user, closeModal, post }) => {
  const navigate = useNavigate();
  const userId = auth.currentUser.uid;
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const editClickHandler = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <div className="edit-container">
      {userId === post.userId ? (
        <>
          <span
            onClick={() => {
              db.collection("posts").doc(post.id).delete();
              navigate("/");
              alert("Post deleted successfully!");
              closeModal();
            }}
            className="top"
          >
            Delete
          </span>
          <span
            style={{
              color: "rgb(237, 73, 86)",
              fontWeight: "700",
            }}
            onClick={editClickHandler}
          >
            Edit
          </span>
        </>
      ) : (
        <span className="top">Report</span>
      )}

      <span>Add to favourites</span>
      <span>Go to post</span>
      <span>Share to...</span>
      <span>Copy link</span>
      <span>Embed</span>
      <span>About this account</span>
      <span
        onClick={closeModal}
        style={{
          borderBottomLeftRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
      >
        Cancel
      </span>

      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div onClick={closeModal}>
            <svg
              aria-label="Close"
              fill="currentColor"
              height="18"
              role="img"
              viewBox="0 0 24 24"
              width="18"
              className="close-btn"
            >
              <title>Close</title>
              <polyline
                fill="none"
                points="20.643 3.357 12 12 3.353 20.647"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              ></polyline>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                x1="20.649"
                x2="3.354"
                y1="20.649"
                y2="3.354"
              ></line>
            </svg>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <Create
              user={user}
              closeModal={closeModal}
              update={true}
              post={post}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
