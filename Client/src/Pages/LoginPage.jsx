import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currentState, SetCurrState] = useState("Sign Up");
  const [FullName, SetFullName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [Bio, SetBio] = useState("");
  const [IsDataSubmitted, SetIsDataSubmitted] = useState("");

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currentState === "Sign Up" && !IsDataSubmitted) {
      SetIsDataSubmitted(true);
      return;
    }

    if (currentState === "Sign Up") {
      login("signup", {
        fullName: FullName,
        email: Email,
        password: Password,
        bio: Bio,
      });
    } else {
      login("login", {
        email: Email,
        password: Password,
      });
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* left */}
      <img src={assets.logo_big} className="w-[min(30vw,250px)]" alt="" />
      {/* right */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currentState}
          {IsDataSubmitted && (
            <img
              src={assets.arrow_icon}
              onClick={() => SetIsDataSubmitted(false)}
              className="w-5 cursor-pointer"
              alt=""
            />
          )}
        </h2>
        {currentState === "Sign Up" && !IsDataSubmitted && (
          <input
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
            onChange={(e) => SetFullName(e.target.value)}
            value={FullName}
          />
        )}
        {!IsDataSubmitted && (
          <>
            <input
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => SetEmail(e.target.value)}
              value={Email}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => SetPassword(e.target.value)}
              value={Password}
            />
          </>
        )}
        {currentState === "Sign Up" && IsDataSubmitted && (
          <textarea
            onChange={(e) => SetBio(e.target.value)}
            value={Bio}
            name=""
            placeholder="Provide a Short Bio"
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 rounded-md text-white cursor-pointer"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" name="" id="" />
          <p>Agree to the form of use & Privacy Policy</p>
        </div>
        <div className="flex flex-col gap-2">
          {currentState === "Sign Up" ? (
            <p className="text-sm text-gray-600">
              Already Have An Account?{" "}
              <span
                onClick={() => {
                  SetCurrState("Login");
                  SetIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create An Account{" "}
              <span
                onClick={() => SetCurrState("Sign Up")}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Click Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
