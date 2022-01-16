import { PlusIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostsService from "../common/PostsService";
import Header from "../components/Header";
import Loader from "../components/Loader";
import RecordCard from "../components/RecordCard";

function DashboardPage() {
  const navigate = useNavigate();

  function addRecord() {
    navigate("/editor");
  }

  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostsService.getAllPosts().then((response) => {
      setPosts(response.data.posts);
      setLoading(false);
    });
  }, []);

  function handleSelect(postId) {
    navigate("/view", { state: { id: postId } });
  }

  function handleEdit(postId) {
    navigate("/editor", { state: { id: postId } });
  }

  function handleDelete(postId, index) {
    PostsService.deletePost(postId).then(() => {
      navigate("/", { replace: true });
      posts.splice(index, 1);
      const newPostsList = posts.slice();
      setPosts(newPostsList);
    });
  }

  return (
    <div className="bg-neutral-800 h-full">
      <Header />
      <div className="text-white flex justify-end p-3">
        <button
          className="bg-neutral-700 py-3 pl-3 pr-4 mr-16 rounded-xl flex"
          onClick={addRecord}
        >
          <PlusIcon className="h-6 w-6 mr-2" />
          <span>Add</span>
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 gap-2 p-4">
          {posts.map((val, index) => {
            return (
              <RecordCard
                key={index}
                index={index}
                data={val}
                onSelect={handleSelect}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
