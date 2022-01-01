import { LogoutIcon } from "@heroicons/react/outline";

function Header() {
  return (
    <div className="w-full bg-neutral-800 p-4 flex justify-between items-center">
      <strong className="text-white text-2xl tracking-[0.4em] font-light">
        CHRONICLE
      </strong>
      <button className="bg-neutral-700 text-neutral-400 flex items-center p-4 rounded-full">
        <span className="mr-3 text-sm">Logout</span>
				<LogoutIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default Header;
