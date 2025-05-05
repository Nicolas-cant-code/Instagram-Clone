import React, { useState } from "react";
import "./Profile.css";
import UserContext from "./userContext";
import { useContext } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import GridOnRoundedIcon from "@mui/icons-material/GridOnRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";
import Footer from "./Layout/Footer";
import Create from "./Create";

const Profile = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="top-section">
          <div className="profile-pic">
            {user.profile_pic === "" ? (
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
              <img src="" alt="profile photo" />
            )}
          </div>
          <div className="profile-info">
            <div className="profile-username">
              <span>{user.username}</span>
              <button>Edit profile</button>
              <button>View archive</button>
              <SettingsOutlinedIcon className="settings-icon" />
            </div>
            <div className="follow">
              <p>
                {/* */}
                <strong>0</strong> posts
              </p>
              <p>
                {" "}
                {/* */}
                <strong>0</strong> followers
              </p>
              <p>
                {/* */}
                <strong>0</strong> following
              </p>
            </div>
            <span className="profile-name">{user.name}</span>
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
                stroke-miterlimit="10"
                stroke-width="2"
              ></circle>
              <ellipse
                cx="48.002"
                cy="49.524"
                fill="none"
                rx="10.444"
                ry="10.476"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2.095"
              ></ellipse>
              <path
                d="M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z"
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
          </div>
          <h2>Share Photos</h2>
          <h4>When you share photos, they will appear on your profile.</h4>
          <span onClick={() => handleIconClick("Create")}>
            Share your first photo
          </span>
        </div>

        <Footer />
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
            <Create />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
