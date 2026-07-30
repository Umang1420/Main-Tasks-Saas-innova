let savedData = localStorage.getItem("folders");
let FolderList = savedData && Array.isArray(JSON.parse(savedData)) ? JSON.parse(savedData) : [];

let activePathString = "";
let activeAction = null; 

let addbtn = document.getElementById("add");
addbtn.addEventListener("click", getname);

let folderModal = new bootstrap.Modal(document.getElementById("folderModal"));

function getname(){
    activeAction = 'ADD_ROOT';
    activePathString = "";
    document.getElementById("modalTitle").innerText = "Add New Folder";
    document.getElementById("modalInput").value = "";
    folderModal.show();
}

function getfolderbypath(list, pathStr) {
    if (!pathStr) return null;
    let indices = pathStr.split("-").map(Number);
    let current = list[indices[0]];
    for (let i = 1; i < indices.length; i++) {
        if (!current || !current.childfolder) return null;
        current = current.childfolder[indices[i]];
    }
    return current;
}

function childfolder(pathStr) {
    activeAction = 'ADD_CHILD';
    activePathString = String(pathStr);
    document.getElementById("modalTitle").innerText = "Add Sub-Folder";
    document.getElementById("modalInput").value = "";
    folderModal.show();
} 

function childfile(pathstr){
    activePathString = String(pathstr);
    document.getElementById("modalTitle").innerText = "Add Sub-File ";
    document.getElementById("modalInput").value = "";
    folderModal.show();
}

document.getElementById("saveModalBtn").addEventListener("click", function(){
    let inputVal = document.getElementById("modalInput").value.trim();
    if(inputVal === "") return;

    if(activeAction === 'ADD_ROOT'){
        let uniqueId = Date.now().toString(); 
        FolderList.push({
            "id": uniqueId, 
            "foldername": inputVal,
            "childfolder": [],
            "childfile": []
        });
    } else if(activeAction === 'ADD_CHILD'){
        let targetFolder = getfolderbypath(FolderList, activePathString);
        if(targetFolder){
            targetFolder.childfolder.push({
                "id": Date.now().toString(),
                "foldername": inputVal,
                "childfolder": [],
                "childfile": []
            });
        }
    }else {
        let targetFolder = getfolderbypath(FolderList, activePathString);
        if(targetFolder){
            targetFolder.childfile.push({
                "id": Date.now().toString(),
                "filename": inputVal
            });
        }
    }

    savefoldersToStorage(FolderList);
    folderModal.hide();
    showfolder();
});

function savefoldersToStorage(list) {
    localStorage.setItem("folders", JSON.stringify(list));
}

function renderFolderTree(list, currentPathStr = "") {
    let html = "";
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let itemPath = currentPathStr === "" ? `${i}` : `${currentPathStr}-${i}`;
        
        let depth = itemPath.split("-").length - 1;
        let indentPadding = depth * 20;
        
        let childHTML = "";
        if (item.childfolder && item.childfolder.length > 0) {
            childHTML = renderFolderTree(item.childfolder, itemPath);
        }


        html += `
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center hover-trigger" style="padding-left: ${15 + indentPadding}px;">
            <div>
                <i class="fa-solid fa-folder me-2"></i>
                <span id="row-${itemPath}">${item.foldername}</span>
            </div>
            
            <div>
                <span class="badge bg-secondary opacity-0 hover-target"><i onClick="childfolder('${itemPath}')" class="fa-solid fa-folder-plus" style="cursor:pointer"></i></span>
                <span class="badge bg-secondary opacity-0 hover-target"><i onClick="childfile('${itemPath}')" class="fa-solid fa-file-circle-plus" style="cursor:pointer"></i></span>
                <span class="badge bg-secondary opacity-0 hover-target"><i onClick="editbypath('${itemPath}')" class="fa-solid fa-pen" style="cursor:pointer"></i></span>
                <span class="badge bg-secondary opacity-0 hover-target"><i onClick="delbypath('${itemPath}')" class="fa-solid fa-trash" style="cursor:pointer"></i></span>
            </div>
        </div>
        ${childHTML}`;
    }
    return html;
}

function showfolder(){
    document.getElementById("list").innerHTML = renderFolderTree(FolderList);
}

showfolder();   

function delbypath(pathStr) {
    let indices = pathStr.split("-").map(Number);
    let targetFolder = getfolderbypath(FolderList, pathStr);

    if (targetFolder && targetFolder.childfolder && targetFolder.childfolder.length > 0) {
        let confirmDelete = confirm(`There are content in "${targetFolder.foldername}" folder, do you want to remove it?`);
        if (!confirmDelete) return;
    }

    if (indices.length === 1) {
        FolderList.splice(indices[0], 1);
    } else {
        let parentPath = indices.slice(0, -1).join("-");
        let parentFolder = getfolderbypath(FolderList, parentPath);
        let childIndex = indices[indices.length - 1];
        parentFolder.childfolder.splice(childIndex, 1);
    }

    savefoldersToStorage(FolderList);
    showfolder();
}

function editbypath(pathStr) {
    let targetFolder = getfolderbypath(FolderList, pathStr);
    let row = document.getElementById(`row-${pathStr}`);

    row.innerHTML = `<input type="text" id="edit-input-${pathStr}" value='${targetFolder.foldername}' style="width: 120px;">
                    <i onclick="saveeditbypath('${pathStr}')" class="fa-regular fa-floppy-disk ms-1" style="cursor:pointer"></i>
                    <i onclick="showfolder();" class="fa-solid fa-xmark ms-1" style="cursor:pointer"></i>`;
}

function saveeditbypath(pathStr) {
    let inputVal = document.getElementById(`edit-input-${pathStr}`).value.trim();
    if (inputVal) {
        let targetFolder = getfolderbypath(FolderList, pathStr);
        if(targetFolder){
            targetFolder.foldername = inputVal;
            savefoldersToStorage(FolderList);
            showfolder();
        }
    }
}