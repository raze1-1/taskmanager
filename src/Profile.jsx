import React, { useState, useEffect } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("doesn't exist or error in fetching");
        }
      })
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => {
        console.error("error in fetching", error);
      });
  }, []);
  return <div>Hi {username}</div>;
};

export default Profile;
