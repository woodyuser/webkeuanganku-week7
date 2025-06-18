import React from "react";
import { Link } from "react-router-dom"; 

function LoginLinks() {
  return (
    <div className="flex flex-col items-end space-y-5">
      <Link
        to="/lupa-password"
        className="text-base text-gray-500 underline cursor-pointer hover:text-gray-700 transition-colors"
      >
        Lupa Password
      </Link>
      <p className="text-base text-gray-500">
        Sudah Punya Akun?{" "}
        <Link
          to="/login"
          className="underline cursor-pointer hover:text-gray-700 transition-colors"
        >
          Login Now
        </Link>
      </p>
    </div>
  );
}

export default LoginLinks;
