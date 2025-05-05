import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.jsx";
import "./Login.css";
import Footer from "./Layout/Footer.jsx";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser) {
          db.collection("users")
            .doc(authUser.user.uid)
            .set({
              name: name,
              username: username,
              email: email,
              profile_pic: "",
              followers: 0,
              following: 0,
              posts: 0,
            })
            .then(() => {
              navigate("/profile");
            })
            .catch((error) => {
              console.error("Error adding user to Firestore: ", error);
              alert(error.message);
            });
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login-container">
        <i
          data-visualcompletion="css-img"
          aria-label="Instagram"
          className="instagram-logo"
          role="img"
        ></i>
        {isLogin ? (
          <form onSubmit={signIn}>
            <input
              type="text"
              className="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit" onClick={signIn}>
              Login
            </button>{" "}
          </form>
        ) : (
          <form onSubmit={register}>
            <input
              type="text"
              className="fullname"
              placeholder="Full Name"
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="text"
              className="username"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              type="text"
              className="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit" onClick={register}>
              Sign up
            </button>
          </form>
        )}
      </div>
      <div className="create-account">
        {isLogin ? (
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => {
                setIsLogin(false);
              }}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setIsLogin(true);
              }}
            >
              Log in
            </span>
          </p>
        )}
      </div>
      <div className="footer-width">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
