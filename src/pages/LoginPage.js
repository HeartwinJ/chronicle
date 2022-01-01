import { useNavigate } from "react-router-dom";
import { useAuth } from "../common/AuthContext";

function LoginPage() {
  let auth = useAuth();
	let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get("password");

		auth.signIn(password, () => {
			navigate('/', {replace: true});
		});
  }

  return (
    <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
      <div className="p-6 bg-neutral-900 rounded-2xl flex flex-col items-center">
        <strong className="text-white text-3xl tracking-[0.5em] font-light">
          CHRONICLE
        </strong>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            className="bg-neutral-800 text-neutral-300 text-center text-3xl tracking-widest rounded-xl mt-20 p-2"
          ></input>
          <button
            type="submit"
            className="bg-neutral-800 text-neutral-300 rounded-xl mt-5 py-2 px-6 tracking-widest"
          >
            OPEN
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
