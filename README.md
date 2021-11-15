# jsx-to-scss README
This is a jsx-to-scss plugin which can help you extract scss from jsx template.

## Features
- 1.Select the JSX you want to extract class names
- 2.Show your context Menu, and click "JSX Extract Style to Clipboard"(or use cmd/ctrl + e)
- 3.Paste the SCSS structure to your *.scss file.

## example
##### 1.copy the jsx element to your clipboard.
```
<div className="container">
  <h1>Video Games</h1>
  <div className="wrapper">
    <ul className="game-list">
      <li className="game-item">Super Mario</li>
    </ul>
  </div>
  <footer className="notice">Games make life fantastic</footer>
</div>
```

##### 2.Press cmd/ctrl + e, and paste your clipboard content to your scss file.
```
.container {
  .wrapper {
    .game-list {
      .game-item {

      }
    }
  }
  .notice {

  }
}
```

## known issues
- Not filter the repeated class names currently
- An element with multiple class names

### report issues
If you have any questions, feel free to contact me.

* [report issues in vscode marketplace](https://marketplace.visualstudio.com/items?itemName=joey.jsx-to-scss&ssr=false#qna)




