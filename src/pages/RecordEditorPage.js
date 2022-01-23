import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Header from "../components/Header";
import { SaveIcon, TrashIcon } from "@heroicons/react/outline";

import "../common/ReactEditorStyles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostsService from "../common/PostsService";
import Loader from "../components/Loader";

function RecordEditorPage() {
  const mdParser = MarkdownIt();
  const navigate = useNavigate();
  const { state } = useLocation();
  const postId = state ? state.id : null;

  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState("Entry for " + new Date().toDateString());
  const [content, setContent] = useState("");

  useEffect(() => {
    if (postId) {
      PostsService.getPost(postId).then((response) => {
        setTitle(response.data.post.title);
        setContent(response.data.post.content);
        setLoading(false);
      });
    } else {
      const content = loadFromSession();
      setContent(content ? content : "");
      setLoading(false);
    }
  }, [postId]);

  const onImageUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const saveToSession = (content) => {
    sessionStorage.setItem("content", content);
  };

  const loadFromSession = () => {
    return sessionStorage.getItem("content");
  };

  const clearFromSession = () => {
    sessionStorage.removeItem("content");
  };

  const handleEditorChange = ({ html, text }) => {
    setContent(text);
    saveToSession(text);
  };

  const handleCancel = () => {
    clearFromSession();
    navigate("/", { replace: true });
  };

  const handleSave = (event) => {
    event.preventDefault();
    const title = new FormData(event.currentTarget).get("title");

    if (postId) {
      PostsService.editPost(postId, title, content).then(() => {
        clearFromSession();
        navigate("/", { replace: true });
      });
    } else {
      PostsService.addPost(title, content).then(() => {
        clearFromSession();
        navigate("/", { replace: true });
      });
    }
  };

  return (
    <div className="bg-neutral-800 h-full flex flex-col">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <form className="p-3 h-full flex flex-col" onSubmit={handleSave}>
          <input
            type="text"
            name="title"
            className="p-2 bg-transparent text-white text-3xl w-full"
            placeholder="Title"
            defaultValue={title}
          />
          <div className="grow h-1 mt-3">
            <MdEditor
              className="h-full"
              renderHTML={(text) => mdParser.render(text)}
              onImageUpload={onImageUpload}
              value={content}
              onChange={handleEditorChange}
            />
          </div>
          <div className="flex justify-end m-5">
            <button
              type="button"
              className="text-red-400 py-3 pl-3 pr-4 mr-4 rounded-xl flex items-center"
              onClick={handleCancel}
            >
              <TrashIcon className="h-6 w-6 mr-2" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="text-white bg-neutral-700 py-3 pl-3 pr-4 mr-16 rounded-xl flex items-center"
            >
              <SaveIcon className="h-6 w-6 mr-2" />
              <span>Save</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RecordEditorPage;
