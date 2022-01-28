import { ReactComponent as LoaderSvg } from "../common/loader.svg";

function Loader(props) {
  return (
    <div className="text-white flex items-center justify-center">
      <LoaderSvg
        className={`animate-spin h-${props.size || "12"} w-${props.size || "12"}`}
      />
    </div>
  );
}

export default Loader;
