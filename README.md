# jsx-to-scss README
This is a jsx-to-scss plugin which can help you extract scss from jsx template.

## Steps
- 1.Select the JSX you want to extract class names
- 2.Use Command/Ctrl + E for one click extracting.
- 3.Paste the SCSS structure to your *.scss file.

## Here is a more specific example
##### 1.Copy the JSX element to your clipboard.
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

#### CSS module is also supported

```
<div className={styles.fruitList}>
  <div className={styles.fruitItem}></div>
</div>
```

##### 2.Press Command/Ctrl + E, and paste your clipboard content to your scss file.
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

```
.fruitList {
  .fruitItem {

  }
}
```

## known issues
- Not filter the repeated class names currently

### report issues
If you have any questions, feel free to contact me.

* [report issues in vscode marketplace](https://marketplace.visualstudio.com/items?itemName=joey.jsx-to-scss&ssr=false#qna)




