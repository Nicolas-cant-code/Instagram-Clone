import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./components/Home.jsx";
import Sidebar from "./components/Layout/Sidebar.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase.jsx";
import UserContext from "./components/userContext.jsx";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Fetch user data from Firestore
        db.collection("users")
          .doc(authUser.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUser({ uid: authUser.uid, ...doc.data() });
            }
          })
          .catch((error) => console.error("Error fetching user data:", error));
      } else {
        setUser(null); // No user is signed in
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      <main>
        {/* Render Sidebar only if not on the /login route */}
        {!isLoginPage && <Sidebar />}
        <UserContext.Provider value={{ user }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </UserContext.Provider>
      </main>
    </div>
  );
}

export default App;
