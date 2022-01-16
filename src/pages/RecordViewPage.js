import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MarkdownIt from "markdown-it";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "../components/Header";
import PostsService from "../common/PostsService";
import Loader from "../components/Loader";

function RecordViewPage() {
  const mdParser = MarkdownIt();
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

  function handleBack() {
    navigate("/");
  }

  return (
    <div className="bg-neutral-800 h-full flex flex-col">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="text-white p-3 h-full flex flex-col">
          <div className="flex justify-between">
            <h1 className="font-black text-4xl">{post.title}</h1>
            <button
              className="bg-neutral-700 p-3 mr-8 rounded-xl"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
          <ReactMarkdown
            className="mx-5 custom-html-style"
            remarkPlugins={remarkGfm}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default RecordViewPage;
