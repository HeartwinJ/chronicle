import { FilterIcon, PlusIcon, SortDescendingIcon } from "@heroicons/react/outline";
import Header from "../components/Header";
import RecordCard from "../components/RecordCard";

function DashboardPage() {
  return (
    <div className="bg-neutral-800 h-full">
      <Header />
			<div className="text-white flex justify-end p-3">
				<button className="p-2 mr-4"><SortDescendingIcon className="h-6 w-6" /></button>
				<button className="p-2 mr-4"><FilterIcon className="h-6 w-6" /></button>
				<button className="bg-neutral-700 py-3 pl-3 pr-4 mr-16 rounded-xl flex">
					<PlusIcon className="h-6 w-6 mr-2" />
					<span>Add</span>
					</button>
			</div>
			<div className="grid grid-cols-2 gap-2 p-4">
				<RecordCard title="Test Record 1" date="25-12-2021" />
				<RecordCard title="Test Record 2" date="30-12-2021" />
				<RecordCard title="Test Record 3" date="01-01-2022" />
			</div>
    </div>
  );
}

export default DashboardPage;
