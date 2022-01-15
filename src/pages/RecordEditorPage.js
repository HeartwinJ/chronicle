import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Header from "../components/Header";
import { SaveIcon, TrashIcon } from "@heroicons/react/outline";

import "../common/ReactEditorStyles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function RecordEditorPage() {
  const mdParser = MarkdownIt();
  const navigate = useNavigate();

  const [editorVal, setEditorVal] = useState("");

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
    setEditorVal(text);
  }

  function handleCancel() {
    navigate("/", { replace: true });
  }

  function handleSave() {
    console.log(editorVal);
  }

  return (
    <div className="bg-neutral-800 h-full flex flex-col">
      <Header />
      <div className="p-4 grow h-1/2">
        <MdEditor
          className="h-full"
          renderHTML={(text) => mdParser.render(text)}
          onImageUpload={onImageUpload}
          value={editorVal}
          onChange={handleEditorChange}
        />
      </div>
      <div className="flex justify-end p-3">
        <button
          className="text-red-400 py-3 pl-3 pr-4 mr-4 rounded-xl flex items-center"
          onClick={handleCancel}
        >
          <TrashIcon className="h-6 w-6 mr-2" />
          <span>Cancel</span>
        </button>
        <button
          className="text-white bg-neutral-700 py-3 pl-3 pr-4 mr-16 rounded-xl flex items-center"
          onClick={handleSave}
        >
          <SaveIcon className="h-6 w-6 mr-2" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}

export default RecordEditorPage;
