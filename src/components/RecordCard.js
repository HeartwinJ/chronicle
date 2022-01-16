import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

function RecordCard(props) {
  function handleSelect() {
    props.onSelect(props.data.id);
  }

  function handleEdit() {
    props.onEdit(props.data.id);
  }

  function handleDelete() {
    props.onDelete(props.data.id, props.index);
  }

  return (
    <div className="text-white bg-neutral-700 px-4 py-2 rounded-xl flex justify-between">
      <div
        className="grow flex justify-between items-center"
        onClick={handleSelect}
      >
        <span className="text-lg text-ellipsis">{props.data.title}</span>
        <span className="text-xs whitespace-nowrap">
          {new Date(parseInt(props.data.timestamp)).toDateString()}
        </span>
      </div>
      <div className="flex flex-nowrap">
        <button className="p-1 mx-4" onClick={handleEdit}>
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
