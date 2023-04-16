import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Registration = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const name = event.target.username.value;
    const password = event.target.password.value;
    console.log(event.target);

    setError("");
    setSuccess("");

    if (!/(?=.*[A-Z])/.test(password)) {
      setError("password should contain at least one upper case");
      return;
    } else if (!/(?=.*\d)/.test(password)) {
      setError("password should contain at least one digit");
      return;
    } else if (!/(?=.{8,})/.test(password)) {
      setError("password should contain at least 8 characters");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed in
        const loggedUser = result.user;
        emailVerification(loggedUser);
        updateUserName(loggedUser, name);
        setSuccess("Registration successful!!");
        setError("");
        console.log("suuccess");
        // ...
      })
      .catch((error) => {
        setError(error.message);
        setSuccess("");
        console.log(error.message);
        // ..
      });
    event.target.reset();
  };

  const emailVerification = (loggedUser) => {
    sendEmailVerification(loggedUser).then(() => {
      // Email verification sent!
      // ...
      alert("varify your email");
    });
  };

  const updateUserName = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
        // ...
        console.log("user profile updated");
        console.log(user);
      })
      .catch((error) => {
        // An error occurred
        // ...
        setError(error.message);
        console.log(error.message);
      });
  };

  return (
    <div className="App ">
      <h1 className="text-3xl font-bold mb-5">Please Register</h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2"
        >
          <div className="mb-4 ">
            <label className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={show ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
              />
              {
                show?<EyeIcon
                onClick={() => setShow(!show)}
                class="h-6 w-6 text-blue-500 cursor-pointer absolute  top-2 right-3"
              />:<EyeSlashIcon
                onClick={() => setShow(!show)}
                class="h-6 w-6 text-blue-500 cursor-pointer absolute  top-2 right-3"
              />
              }
            </div>
          </div>
          <div>
            {error && <p className="text-red-600"> {error}</p>}
            {success && <p className="text-green-600"> {success}</p>}
          </div>
          <div className="flex items-center justify-between">
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              value="Register"
              type="submit"
            />
          </div>
          <div>
            <p>
              <small>
                Have an account? please{" "}
                <Link to="/login" className="underline text-blue-700">
                  Login
                </Link>
              </small>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
