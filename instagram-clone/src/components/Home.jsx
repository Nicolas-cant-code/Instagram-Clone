import React, { useContext, useState, useEffect } from "react";
import "./Home.css";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import UserContext from "./userContext";
import { auth, db } from "../firebase";
import Posts from "./Posts";
import { Link } from "react-router-dom";

const Home = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const { profile_pic } = user || {};

  const handleSwitch = () => {
    if (user) {
      auth.signOut();
    }
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snapshot = await db
          .collection("posts")
          .orderBy("timestamp", "desc")
          .get();
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-content">
          <div className="content">
            {posts.map((post) => (
              <Posts key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="home-right-side">
          <div className="right-side-content">
            <div className="account">
              <Link to="/profile">
                {profile_pic === undefined ? (
                  <PersonRoundedIcon
                    className="account-icon"
                    style={{ color: "black" }}
                  />
                ) : (
                  <img
                    src={profile_pic}
                    alt="profile"
                    style={{
                      width: "2.8rem",
                      height: "2.8rem",
                      borderRadius: "50%",
                    }}
                    className="account-icon"
                  />
                )}
              </Link>
              <div className="names">
                <Link to="/profile">
                  <h4>{user !== null ? user.username : "Guest"}</h4>
                </Link>
                <h5>{user !== null ? user.name : "Guest name"}</h5>
              </div>
              <a className="switch" onClick={handleSwitch} href="/login">
                Switch
              </a>
            </div>
            <div className="suggested">
              <h4>Suggested for you</h4>
              <span>See All</span>
            </div>
            <div className="footer">
              <ul>
                <li>About</li>.<li>Help</li>.<li>Press</li>.<li>API</li>.
                <li>Jobs</li>.<li>Privacy</li>.<li>Terms</li>.<li>Locations</li>
                .<li>Language</li>.<li>Meta Verified</li>
              </ul>
              <span>© 2025 INSTAGRAM CLONE FROM NICOLAS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
