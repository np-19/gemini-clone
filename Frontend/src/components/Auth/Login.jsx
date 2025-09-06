import { useState } from "react";
import {assets} from "../../assets/assets"
import {setAccessToken} from "../../helper/authToken"
import {useNavigate} from "react-router";


const Login = ({setUser}) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 
        body: JSON.stringify({ User: form }), 
      });

      const data = await res.json();
      console.log("Authentication successful:", data);
      setAccessToken(data.accessToken);
      navigate("/app");
      setUser(data.user);       
    } catch (err) {
      console.error("Authentication error:", err);
    }
  };

  const handleGoogleSignIn = () => {
    // In a real application, you would use a library like Firebase to handle
    // Google authentication. This is a placeholder for a smooth user experience.
    console.log("Redirecting to Google for sign-in...");
    
    // A real implementation would look something like this:
    // import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    // const auth = getAuth();
    // const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // The user's Google Account was used.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     const user = result.user;
    //     console.log("Google Sign-in successful for user:", user);
    //   }).catch((error) => {
    //     console.error("Google Sign-in failed:", error);
    //   });
  };

  const redirectToCreateAccount = () => {
    window.location.href = '/register';
  };

  return (
    <div className="relative flex w-full items-center justify-center min-h-screen bg-blue-100 dark:bg-gray-900 overflow-hidden font-sans">
      {/* Background effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-200 to-white dark:from-gray-800 dark:to-gray-900 opacity-75 animate-pulse-slow"></div>

      <div className="relative z-10 w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl backdrop-filter backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80 border border-gray-100 dark:border-gray-700">
        
        {/* Top Icon and Title */}
        <div className="flex justify-center mb-6">
          <img
            src={assets.gemini_icon}
            alt="Gemini Logo"
            className="h-12 w-auto"
          />
        </div>

        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-2">
          Sign in
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">
          Welcome back to Gemini.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="login"
              placeholder="username or email"
              value={form.login}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-gray-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              <svg
                className="w-5 h-5 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-medium bg-gray-800 text-white rounded-xl hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">
            Or
          </span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* Google Login Button */}
        <div className="space-y-2">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google"
              className="h-5 w-5 mr-3"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Sign in with Google
            </span>
          </button>
          
          {/* Create Account Button */}
          <button
            onClick={redirectToCreateAccount}
            className="w-full px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 rounded-xl border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all"
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
