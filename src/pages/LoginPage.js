import { Navigate } from "react-router-dom";
import { useAuth } from "../common/AuthContext";

function LoginPage() {
  const auth = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get("password");

    auth.signIn(password);
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
            className="bg-neutral-800 rounded-xl mt-5 py-2 px-6 tracking-widest"
          >
            OPEN
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
