import { useState } from 'react';

export const useLink = () => {
  const [link, setLink] = useState('');

  const sendLink = () => {
    let input_text = document.getElementById('input-text');
    let input_link = document.getElementById('input-link');
    let textEditDivTextarea = document.getElementById("textEdit-divTextarea");
    let textEditSpanPlaceholder = document.getElementById("textEdit-spanPlaceholder");
    let modal = document.getElementById('modal-link');


    if (input_text.value !== '' && input_link.value !== '') {
      let scnStart = document.getElementById('scnStart').innerHTML;
      setCurrentCursorPosition(parseInt(scnStart), textEditDivTextarea);

      let text = input_text.value;
      let link = input_link.value;

      let sLnk = `<a href="${link}" target="_blank">${text}</a>`;

      formatText('insertHTML', sLnk);

      if (textEditDivTextarea.innerHTML.length > 0) {
        textEditSpanPlaceholder.classList.add("_write");
      }
      modal.classList.remove("is-open");

    } else {
      if (input_text.value === '') {
        input_text.classList.add('--required');
      }
      if (input_link.value === '') {
        input_link.classList.add('--required');
      }
    }
  }

  const createRange = (node, chars, range) => {
    if (!range) {
      range = document.createRange()
      range.selectNode(node);
      range.setStart(node, 0);
    }

    if (chars.count === 0) {
      range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        for (let lp = 0; lp < node.childNodes.length; lp++) {
          range = createRange(node.childNodes[lp], chars, range);

          if (chars.count === 0) {
            break;
          }
        }
      }
    }
    return range;
  };

  const setCurrentCursorPosition = (chars, node) => {
    if (chars >= 0) {
      let selection = window.getSelection();

      let range = createRange(node, { count: chars });

      if (range) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const formatText = (sCmd, sValue) => {
    let textEditDivTextarea = document.getElementById("textEdit-divTextarea");

    textEditDivTextarea.focus();
    document.execCommand(sCmd, false, sValue);
    textEditDivTextarea.focus();

    if (sCmd === "insertorderedlist" || sCmd === "insertunorderedlist") {
      let range = document.createRange();
      range.selectNodeContents(textEditDivTextarea);
      range.collapse(false);
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  return [link, sendLink];
}