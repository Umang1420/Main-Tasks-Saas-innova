# Dashboard Folder README

This folder contains a simple file manager-style dashboard built with HTML, CSS, and JavaScript. It lets users create folders, add sub-folders, add files, edit names, delete items, and keep the data saved in the browser.

## Files in this folder

- index.html: Main page structure, sidebar, modal popup, and script links.
- style.css: Layout styling, spacing, hover effects, and upload area design.
- script.js: Core logic for creating, editing, deleting, and saving folders/files.

## Features of the script

The JavaScript file provides these main features:

- Add a new root folder from the main button.
- Add a sub-folder inside any existing folder.
- Edit the name of a folder.
- Delete a folder with a confirmation message if it contains content.
- Show the folder structure as a nested tree.
- Save everything in browser local storage so it stays after refresh.
- Use a modal popup for folder/file name input.

## How deep child folders can be created

There is no fixed maximum depth set in the script. Child folders can be created recursively because the project uses nested objects and a recursive rendering function. In practice, the limit depends on browser memory and the size of the folder tree, but the code supports nested folders beyond one level.

## How to access the ID of every child

Each folder and file object has its own id value.

- Folders use the structure: id, foldername, childfolder, childfile

You can access a child by its path string, for example:

```js
let targetFolder = getfolderbypath(FolderList, "0-1-2");
console.log(targetFolder.id);
```

If you want to access a child file inside a folder, use:

```js
let targetFolder = getfolderbypath(FolderList, "0-1");
console.log(targetFolder.childfile[0].id);
```

## How the data is stored

The script stores all folder data in localStorage under the key:

```js
"folders"
```

This makes the folder tree persistent across page reloads.

## Summary

This dashboard is a lightweight folder manager with nested folder support, simple actions, and browser-based persistence. It is easy to extend for more features like drag-and-drop, file upload, rename files, and search.
