import React, { useRef, useState } from "react";
import { EyeIcon,EyeSlashIcon } from '@heroicons/react/24/outline'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const Login = () => {
  const [show, setShow] =useState(false);
  const emailRef = useRef()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    setSuccess("");
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        // ...
        setUser(user);
        setSuccess("Login successful!!");
        setError("");
        console.log(user);
      })
      .catch((error) => {
        setError(error.message);
        setSuccess("");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setSuccess("login successful");
        setError("");
        console.log(user);
        setUser(result.user);
      })
      .catch((error) => {
        // Handle Errors here.

        // ...
        setSuccess("");
        setError(error.message);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.

        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setUser(result.user);
        setSuccess("Login successful!!");
        setError("");
        console.log(user);
      })
      .catch((error) => {
        setError(error.message);
        setSuccess("");
        console.log(error.message);
        // ...
      });
  };

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if(!email){
      alert('please enter a valid email')
      return
    }
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
     alert('Check your email to reset password')
  })
  .catch((error) => {
   setError(error.message);
   setSuccess('')
   console.log(error.message)
    // ..
  });
  }

  console.log(user);

  return (
    <>
      <div className="flex items-center justify-center mb-5">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input ref={emailRef}
              type="email"
              id="email"
              className="border-2 border-gray-300 p-2 w-full rounded-lg"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
            <input
              type={show?"text":"password"}
              id="password"
              className="border-2 border-gray-300 p-2 w-full rounded-lg "
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {
                show?<EyeIcon
                onClick={() => setShow(!show)}
                class="h-6 w-6 text-blue-500 cursor-pointer absolute  top-[10px] right-3"
              />:<EyeSlashIcon
                onClick={() => setShow(!show)}
                class="h-6 w-6 text-blue-500 cursor-pointer absolute  top-[10px] right-3"
              />
              }
            </div>
          </div>
          {error && <p className="text-red-600"> {error}</p>}
          {success && <p className="text-green-600"> {success}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>

          <div>
            <p>
              <small>
                Dont have an account? please{" "}
                <Link to="/register" className="underline text-blue-700">
                  Register
                </Link>
              </small>
            </p>
          </div>
          
        </form>
        
      </div>
      <div className="mb-10">
            <p>
              <small>
                Forget password? please{" "}
                <button onClick={handleResetPassword} className="underline text-blue-700">
                  Reset Password
                </button>
              </small>
            </p>
          </div>
      <div className="space-x-4">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={handleGoogleSignIn}
        >
          <div className="flex items-center justify-center">
            <img
              className="mr-2"
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google logo"
            />
            <span>Sign in with Google</span>
          </div>
        </button>
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow"
          onClick={handleGithubSignIn}
        >
          <div className="flex items-center justify-center">
            <img
              className="mr-2"
              src="https://img.icons8.com/fluent/48/000000/github.png"
              alt="GitHub logo"
            />
            <span>Sign in with GitHub</span>
          </div>
        </button>
      </div>

      {Object.keys(user).length > 0 && (
        <div className="text-center mt-10">
          <h2>Name: {user?.displayName}</h2>
          <h2>{user?.email}</h2>
          <div className="flex justify-center">
            <img src={user.photoURL} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
