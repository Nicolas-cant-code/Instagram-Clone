import React, { useState, useEffect, useContext, useRef } from "react";
import "./Profile.css";
import UserContext from "./userContext";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import GridOnRoundedIcon from "@mui/icons-material/GridOnRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";
import Footer from "./Layout/Footer";
import Create from "./Create";
import { db } from "../firebase";

const Profile = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  let { username, name, posts, followers, following } = user || {};
  const [profile_pic, setProfilePic] = useState(user?.profile_pic || "");
  const [post, setPost] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const snapshot = await db
          .collection("posts")
          .where("userId", "==", user.uid) // Filter posts by userId
          .orderBy("timestamp", "desc") // Order posts by timestamp
          .get();

        const userPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPost(userPosts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const handleIconClick = () => {
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
  };

  const checkModal = (e) => {
    if (!e.target.classList.contains("create")) {
      setIsCreateModalOpen(false);
    }
  };

  const profilePicHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        db.collection("users")
          .doc(user.uid)
          .update({
            profile_pic: imageUrl,
          })
          .then(() => {
            setProfilePic(imageUrl);
            alert("Profile picture updated successfully");
          })
          .catch((error) => {
            alert("Error updating profile picture:", error);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="top-section">
          <div
            className="profile-pic"
            onClick={() => fileInputRef.current.click()}
          >
            {profile_pic === "" ? (
              <>
                <PersonRoundedIcon className="account-icon" />
                <div className="picture">
                  <svg
                    viewBox="0 0 24 24"
                    width="44"
                    height="44"
                    fill="currentColor"
                    className="x14ctfv xtzzx4i x10l6tqk xwa60dl x11lhmoz"
                  >
                    <path d="M12 9.652a3.54 3.54 0 1 0 3.54 3.539A3.543 3.543 0 0 0 12 9.65zm6.59-5.187h-.52a1.107 1.107 0 0 1-1.032-.762 3.103 3.103 0 0 0-3.127-1.961H10.09a3.103 3.103 0 0 0-3.127 1.96 1.107 1.107 0 0 1-1.032.763h-.52A4.414 4.414 0 0 0 1 8.874v9.092a4.413 4.413 0 0 0 4.408 4.408h13.184A4.413 4.413 0 0 0 23 17.966V8.874a4.414 4.414 0 0 0-4.41-4.41zM12 18.73a5.54 5.54 0 1 1 5.54-5.54A5.545 5.545 0 0 1 12 18.73z"></path>
                  </svg>
                </div>
              </>
            ) : (
              <img src={profile_pic} alt="profile photo" />
            )}
            <input
              ref={fileInputRef}
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={profilePicHandler}
            />
          </div>
          <div className="profile-info">
            <div className="profile-username">
              <span>{username}</span>
              <button>Edit profile</button>
              <button>View archive</button>
              <SettingsOutlinedIcon className="settings-icon" />
            </div>
            <div className="follow">
              <p>
                <strong>{posts}</strong> posts
              </p>
              <p>
                <strong>{followers}</strong> followers
              </p>
              <p>
                <strong>{following}</strong> following
              </p>
            </div>
            <span className="profile-name">{name}</span>
          </div>
        </div>
        <div className="highlights">
          <div className="highlight">
            <div className="add-icon">
              <AddRoundedIcon className="add-highlight" />
            </div>
            <span>New</span>
          </div>
        </div>
        <div className="posts">
          <div className="top-items">
            <div className="posts-item">
              <GridOnRoundedIcon />
              <p>POSTS</p>
            </div>
            <div className="saved-item">
              <BookmarkBorderRoundedIcon />
              <p>SAVED</p>
            </div>
            <div className="tagged-item">
              <PortraitRoundedIcon />
              <p>TAGGED</p>
            </div>
          </div>
          {posts < 1 ? (
            <>
              <div className="photos" onClick={() => handleIconClick("Create")}>
                <svg
                  aria-label="When you share photos, they will appear on your profile."
                  class="x1lliihq x1n2onr6 x5n08af"
                  fill="currentColor"
                  height="62"
                  role="img"
                  viewBox="0 0 96 96"
                  width="62"
                >
                  <title>
                    When you share photos, they will appear on your profile.
                  </title>
                  <circle
                    cx="48"
                    cy="48"
                    fill="none"
                    r="47"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  ></circle>
                  <ellipse
                    cx="48.002"
                    cy="49.524"
                    fill="none"
                    rx="10.444"
                    ry="10.476"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2.095"
                  ></ellipse>
                  <path
                    d="M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
              <h2>Share Photos</h2>
              <h4>When you share photos, they will appear on your profile.</h4>
              <span onClick={() => handleIconClick("Create")}>
                Share your first photo
              </span>{" "}
            </>
          ) : (
            <div className="user-posts">
              {post.map((post) => (
                <img
                  key={post.id}
                  src={post.imageUrl}
                  alt="Post"
                  className="profile-post-image"
                />
              ))}
            </div>
          )}
        </div>
        <div className="footer-profile">
          <Footer />
        </div>
      </div>

      {isCreateModalOpen && (
        <div className="modal-overlay" onClick={checkModal}>
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
              ></polyline>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                x1="20.649"
                x2="3.354"
                y1="20.649"
                y2="3.354"
              ></line>
            </svg>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <Create closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
