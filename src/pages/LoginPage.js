import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../common/AuthContext";
import Loader from "../components/Loader";

function LoginPage() {
  const auth = useAuth();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const password = new FormData(event.currentTarget).get("password");

    const authStatus = await auth.signIn(password);
    if (!authStatus) {
      setLoading(false);
    }
  };

  if (auth.checkAuth()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
      <div className="p-6 bg-neutral-900 rounded-2xl flex flex-col items-center">
        <strong className="text-white text-xl md:text-3xl tracking-[0.5em] font-light">
          CHRONICLE
        </strong>
        <form
          className="flex flex-col items-center text-neutral-300"
          onSubmit={handleSubmit}
        >
          <input
            type="password"
            name="password"
            className="bg-neutral-800 text-center  tracking-widest rounded-xl mt-20 p-2"
          ></input>
          <button
            type="submit"
            className="bg-neutral-800 rounded-xl mt-5 py-2 px-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader size="6" />
            ) : (
              <span className="tracking-widest">OPEN</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
