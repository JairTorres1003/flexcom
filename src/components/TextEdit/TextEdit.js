import React, { useState } from "react";
import { ImFileEmpty, ImFileText2 } from "react-icons/im";
import { IoImageOutline, IoAtSharp, IoLinkOutline, IoSendSharp } from "react-icons/io5";
import { BsEmojiSmile, BsTypeStrikethrough } from "react-icons/bs";
import { MdScheduleSend, MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
import { VscBold, VscItalic } from "react-icons/vsc";
import { GrUnderline } from "react-icons/gr";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


import "./TextEdit.css";
import { useModals } from "../../hooks/useModals";
import { useTextEdit } from "../../hooks/useTextEdit";

export default function TextEdit({ currentChat }) {
  const { modals } = useModals();
  const { textEdits } = useTextEdit({currentChat});
  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <div className="TextEdit">
      {showEmoji ? <div className="emoji_picker"><Picker
        data={data} 
        onEmojiSelect={console.log} 
      /></div> : null}
      <div className="TextEdit__container">
        <div className="TextEdit__container__files">
          <div className="TextEdit__container__files__file">
            <input type="file" id="file-document" multiple name="files[]" onChange={textEdits.previewFile} />
            <div className="TextEdit__container__files__file__preview"></div>
          </div>
          <div className="TextEdit__container__files__image">
            <input type="file" id="file-image" multiple accept="image/jpeg, image/png, image/gif" name="images[]" onChange={textEdits.previewImage} />
            <div className="TextEdit__container__files__image__preview"></div>
          </div>
        </div>
        <div className="TextEdit__container__tools">
          <div className="TextEdit__container__tools__buttons">
            <button className="TextEdit__container__tools__button" id="btnTool-file" onClick={textEdits.openFile} onMouseOver={() => textEdits.handleMouseOver(0)} onMouseOut={textEdits.handleMouseOut}>
              <ImFileEmpty className="icon_ToolsText" id="Icon_Tool-file" />
            </button>
            <button className={`TextEdit__container__tools__button ${currentChat.hasOwnProperty("visibility") ? "" : "--chat"}`}
            id="btnTool-checklist" onClick={() => modals.openModal("modal-checkList")} onMouseOver={() => textEdits.handleMouseOver(1)} onMouseOut={textEdits.handleMouseOut}>
              <ImFileText2 className="icon_ToolsText" id="Icon_Tool-checklist" />
            </button>
            <button className="TextEdit__container__tools__button" id="btnTool-image" onClick={textEdits.openImage} onMouseOver={() => textEdits.handleMouseOver(2)} onMouseOut={textEdits.handleMouseOut}>
              <IoImageOutline className="icon_ToolsText" id="Icon_Tool-image" />
            </button>
            <button className="TextEdit__container__tools__button" id="btnTool-mention" onMouseOver={() => textEdits.handleMouseOver(3)} onMouseOut={textEdits.handleMouseOut}>
              <IoAtSharp className="icon_ToolsText" id="Icon_Tool-mention" />
            </button>
            <button className="TextEdit__container__tools__button" id="btnTool-emoji" onClick={() => {
              setShowEmoji(!showEmoji);
            }} onMouseOver={() => textEdits.handleMouseOver(4)} onMouseOut={textEdits.handleMouseOut}>
              <BsEmojiSmile className="icon_ToolsText" id="Icon_Tool-emoji" />
            </button>
            <button className="TextEdit__container__tools__button" id="btnTool-schedule" onClick={() => modals.openModal("modal-scheduleMessage")} onMouseOver={() => textEdits.handleMouseOver(5)} onMouseOut={textEdits.handleMouseOut}>
              <MdScheduleSend className="icon_ToolsText" id="Icon_Tool-schedule" />
            </button>
            <button className="TextEdit__container__tools__button" id="btnTool-bold" onClick={() => textEdits.formatText("bold")} onMouseOver={() => textEdits.handleMouseOver(6)} onMouseOut={textEdits.handleMouseOut}>
              <VscBold className="icon_ToolsText" id="Icon_Tool-bold" />
            </button>
            <button className="TextEdit__container__tools__button" id="btnTool-italic" onClick={() => textEdits.formatText("italic")} onMouseOver={() => textEdits.handleMouseOver(7)} onMouseOut={textEdits.handleMouseOut}>
              <VscItalic className="icon_ToolsText" id="Icon_Tool-italic" />
            </button>
            <button className="TextEdit__container__tools__button" id="btnTool-strikethrough" onClick={() => textEdits.formatText("strikethrough")} onMouseOver={() => textEdits.handleMouseOver(8)} onMouseOut={textEdits.handleMouseOut}>
              <BsTypeStrikethrough className="icon_ToolsText" id="Icon_Tool-strikethrough" />
            </button>
            <button className="TextEdit__container__tools__button" id="btnTool-underline" onClick={() => textEdits.formatText("underline")} onMouseOver={() => textEdits.handleMouseOver(9)} onMouseOut={textEdits.handleMouseOut}>
              <GrUnderline className="icon_ToolsText" id="Icon_Tool-underline" />
            </button>
            <button className="TextEdit__container__tools__button" id="btnTool-link" onClick={() => modals.openModal("modal-link")} onMouseOver={() => textEdits.handleMouseOver(10)} onMouseOut={textEdits.handleMouseOut}>
              <IoLinkOutline className="icon_ToolsText" id="Icon_Tool-link" />
            </button>
            <button className="TextEdit__container__tools__button" id="btnTool-list" onClick={() => textEdits.formatText("insertunorderedlist")} onMouseOver={() => textEdits.handleMouseOver(11)} onMouseOut={textEdits.handleMouseOut}>
              <MdFormatListBulleted className="icon_ToolsText" id="Icon_Tool-list" />
            </button>
            <button className="TextEdit__container__tools__button" id="btnTool-listNumber" onClick={() => textEdits.formatText("insertorderedlist")} onMouseOver={() => textEdits.handleMouseOver(12)} onMouseOut={textEdits.handleMouseOut}>
              <MdFormatListNumbered className="icon_ToolsText" id="Icon_Tool-listNumber" />
            </button>
          </div>
        </div>
        <form className="TextEdit__container__text">
          <div className="TextEdit__container__text__textarea" contentEditable="true" id="textEdit-divTextarea" spellCheck="false" onKeyUp={textEdits.handleTextEdit} onKeyDown={textEdits.controlKey}><p><br /></p></div>
          <span className="TextEdit__container__text__placeholder" id="textEdit-spanPlaceholder" onClick={textEdits.clickTextEdit}>Escribe un mensaje aqu??...</span>
          <button className="TextEdit__container__text__button" id="send-button" onClick={textEdits.sendMessage} onMouseOver={() => textEdits.handleMouseOver(13)} onMouseOut={textEdits.handleMouseOut}>
            <IoSendSharp className="icon_TextEdit" />
          </button>
        </form>
      </div>
    </div>
  );
}