import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

function RecordCard(props) {
  function handleEdit() {
    props.onEdit(props.data.id);
  }

  function handleDelete() {
    props.onDelete(props.data.id, props.index);
  }

  return (
    <div className="text-white bg-neutral-700 p-2 rounded-xl flex justify-around items-center">
      <span className="text-lg">{props.data.title}</span>
      <span className="text-xs">
        {new Date(props.data.timestamp).toDateString()}
      </span>
      <div>
        <button className="p-1 mr-4" onClick={handleEdit}>
          <PencilIcon className="h-6 w-6 text-yellow-400" />
        </button>
        <button className="p-1" onClick={handleDelete}>
          <TrashIcon className="h-6 w-6 text-red-400" />
        </button>
      </div>
    </div>
  );
}

export default RecordCard;
