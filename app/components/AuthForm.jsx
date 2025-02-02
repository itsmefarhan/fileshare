"use client";
import Link from "next/link";

const AuthForm = ({ isLogin = true }) => {
  return (
    <div className="max-w-screen-sm mx-auto mt-12 rounded-md p-5 bg-white md:border md:shadow-md">
      <h3 className="text-center text-2xl font-bold mb-5">
        {isLogin ? "Login" : "Signup"}
      </h3>
      <form>
        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="name">Username:</label>
            <input
              className="p-1 w-full border"
              id="name"
              name="name"
              type="name"
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email">Email:</label>
          <input
            className="p-1 w-full border"
            id="email"
            name="email"
            type="email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password:</label>
          <input
            className="p-1 w-full border"
            id="password"
            name="password"
            type="password"
          />
        </div>
        <div className="text-center">
          <button className="bg-slate-800 text-white rounded-md py-1 px-2">
            {isLogin ? "Login" : "Signup"}
          </button>
          {isLogin ? (
            <p className="mt-4 text-sm">
              New user?{" "}
              <Link href="/signup" className="text-blue-500 font-bold">
                Register
              </Link>
            </p>
          ) : (
            <p className="mt-4 text-sm">
              Have an account?{" "}
              <Link href="/login" className="text-blue-500 font-bold">
                Login
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
