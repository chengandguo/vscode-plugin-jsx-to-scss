const vscode = require('vscode');
const copyPaste = require("copy-paste");


let {
  JSXParser
} = require("./jsxParser");


// 获取当前选中的文本
function getSelectedText() {
  const editor = vscode.window.activeTextEditor;
  let doc = editor.document.getText();
  let arr = doc.split("\n");
  let {
    start,
    end
  } = editor.selection;
  let str = "";
  for (let i = start.line; i <= end.line; ++i) {
    if (i === start.line) {
      str += arr[i].slice(start.character);
    } else if (i === end.line) {
      str += arr[i].slice(0, end.character);
    } else {
      str += arr[i];
    }
  }
  // console.log("selected text: ", str)
  return str;
}

// 提取样式
function extractStyle(text = "") {
  let obj = JSXParser(text);
  if (!obj) {
    vscode.window.showErrorMessage("Please check your JSX syntax");
    return false;
  } else {
    return generateSass(obj);
  }
}

/*
  {
    type: "div",
    props: {
      className: "abc",
      id: "demo"
    },
    children: [

    ]
  }
*/
const DEFAULT_SPACE_COUNT = 2;  // 默认缩进为2个空格
function generateSass(obj, spaceCount = 0) {
  let result = "";
  let {
    props,
    children
  } = obj;
  if(!props || !children) {
    return "";
  }

  if (props.className) {
    let classNames = "";
    if(typeof props.className === "object" && props.className.type === "#jsx") {
      classNames = jsxClassNameToCommon(props.className.nodeValue).split(" ");
    } else {
      classNames = props.className.trim().split(" ");
    }

    result += generateWhiteSpace(spaceCount);
    let arr = [];
    for (let item of classNames) {
      if (!item) continue;
      arr.push(`.${item}`)
    }
    result += arr.join(", ") + " {\n";
  }

  if (children.length) {
    let prefix = "";
    let count = props.className ? DEFAULT_SPACE_COUNT : 0;
    for (let [index, item] of children.entries()) {
      prefix = (index === 0 || !item?.props?.className) ? "" : "\n";
      result += prefix + generateSass(item, spaceCount + count);
    }
  }

  if(props.className) {
    result += "\n" + generateWhiteSpace(spaceCount) + "}"
  }

  return result;
}

/* 
  @description: 转换jsx className
  eg: classNames('set-pin-container', { 'keyboard-active': keyboardActive })
*/
function jsxClassNameToCommon (className) {
  className = className.replace(/'/g, '"');
  let result = "",
    leftFlag = false;
  for(let value of className) {
    if(value === '"') {
      if(leftFlag) {
        leftFlag = false;
        result += " ";
      } else {
        leftFlag = true;
      }
      continue;
    }
    if(leftFlag) {
      result += value;
    }
  }
  return result.trim();
}


// 生成指定数量的空格
function generateWhiteSpace(cnt) {
  let result = "";
  for (let i = 0; i < cnt; ++i) {
    result += " ";
  }
  return result;
}


// 写入剪贴板
function writeToClipboard(text) {
  copyPaste.copy(text, () => {
    vscode.window.showInformationMessage("Scss copys to clipboard successfully!");
  });
}


module.exports = {
  getSelectedText,
  extractStyle,
  writeToClipboard,
}