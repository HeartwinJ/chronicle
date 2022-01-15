import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Header from "../components/Header";
import { SaveIcon, TrashIcon } from "@heroicons/react/outline";

import "../common/ReactEditorStyles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PostsService from "../common/PostsService";

function RecordEditorPage() {
  const mdParser = MarkdownIt();
  const navigate = useNavigate();

  const [content, setContent] = useState("");

  function onImageUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  function handleEditorChange({ html, text }) {
    setContent(text);
  }

  function handleCancel() {
    navigate("/", { replace: true });
  }

  function handleSave(event) {
    event.preventDefault();
    const title = new FormData(event.currentTarget).get("title");
    console.log(title);
    console.log(content.replaceAll("\n", "\\n"));

    PostsService.addPost(title, content).then((response) => {
      console.log(response);
      navigate("/", { replace: true });
    });
  }

  return (
    <div className="bg-neutral-800 h-full flex flex-col">
      <Header />
      <form className="p-3 h-full flex flex-col" onSubmit={handleSave}>
        <input
          type="text"
          name="title"
          className="p-2 bg-transparent text-white text-3xl w-full"
          placeholder="Title"
          defaultValue={"Entry for " + new Date().toDateString()}
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
    </div>
  );
}

export default RecordEditorPage;
