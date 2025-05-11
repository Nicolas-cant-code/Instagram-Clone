import React, { useContext, useState, useEffect } from "react";
import "./Home.css";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import UserContext from "./userContext";
import { auth, db } from "../firebase";
import Posts from "./Posts";

const Home = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

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

    fetchPosts();
  }, []);

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-content">
          {/* <div className="insta-btn">
            <div className="logo-circle">
              <div className="logo-circle lighter">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxBzH8UEnwhZ3xdq-cC4D9_dK4nu_Cjk9p-Q&s"
                  alt="Instagram Logo"
                />
              </div>
            </div>
            <h5>instagram</h5>
          </div> */}
          <div className="content">
            {posts.map((post) => (
              <Posts key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="home-right-side">
          <div className="right-side-content">
            <div className="account">
              <PersonRoundedIcon className="account-icon" />
              <div className="names">
                <h4>{user !== null ? user.username : "Guest"}</h4>
                <h5>{user !== null ? user.name : "Guest name"}</h5>
              </div>
              <a href="/login" onClick={handleSwitch}>
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
