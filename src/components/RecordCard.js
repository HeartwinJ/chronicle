import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

function RecordCard(props) {
  return (
    <div className="text-white bg-neutral-700 p-2 rounded-xl flex justify-around items-center">
      <span className="text-lg">{props.title}</span>
      <span className="text-xs">{props.date}</span>
      <div>
				<button className="p-1 mr-4"><PencilIcon className="h-6 w-6 text-yellow-400" /></button>
				<button className="p-1"><TrashIcon className="h-6 w-6 text-red-400" /></button>
			</div>
    </div>
  );
}

export default RecordCard;
