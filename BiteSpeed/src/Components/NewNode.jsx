import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { DraggableNode } from "./DraggableNode";

export default function Node({ nodeType, label, content }) {
  let [newContent, setnewContent] = useState(content);
  let [toggleEdit, setToggleEdit] = useState(false);
  return (
    <>
      {!toggleEdit ? (
        <div className="relative">
          <DraggableNode type={nodeType} label={label} content={newContent} />
          <button
            onClick={() => setToggleEdit(!toggleEdit)}
            className="absolute top-4 right-4 text-white"
          >
            <FaEdit />
          </button>
        </div>
      ) : (
        <div className="edit-content border-t  py-4">
          <button
            onClick={() => setToggleEdit(!toggleEdit)}
            className="back flex gap-2 items-center mb-4"
          >
            <IoMdArrowRoundBack />
            {label}
          </button>
          <form action=" border p-2 rounded">
            <textarea
              className="border rounded-xl"
              onChange={(e) => setnewContent(e.target.value)}
              name="content"
              id="content"
              style={{ width: "100%" }}
            ></textarea>
            <button
              className="bg-black text-white px-6 py-1 rounded"
              onClick={() => setToggleEdit(!toggleEdit)}
            >
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
