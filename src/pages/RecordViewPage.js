import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "../components/Header";
import PostsService from "../common/PostsService";
import Loader from "../components/Loader";

function RecordViewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const postId = state ? state.id : null;

  const [isLoading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  useEffect(() => {
    if (postId) {
      PostsService.getPost(postId).then((response) => {
        setPost(response.data.post);
        setLoading(false);
      });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate, postId]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="bg-neutral-800 h-full flex flex-col">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="text-white p-3 h-full flex flex-col overflow-y-auto">
          <div className="flex justify-between mx-3">
            <h1 className="font-black text-4xl">{post.title}</h1>
            <button
              className="bg-neutral-700 p-3 rounded-xl"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
          <div className="my-3 mx-5 p-4 bg-neutral-900 flex-grow">
            <ReactMarkdown
              className="custom-html-style h-full"
              remarkPlugins={[remarkGfm]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecordViewPage;
