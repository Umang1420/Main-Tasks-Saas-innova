let savedData = localStorage.getItem("folders");
let FolderList = savedData && Array.isArray(JSON.parse(savedData)) ? JSON.parse(savedData) : [];

let addbtn = document.getElementById("add");
addbtn.addEventListener("click", getname);

function getname(){
    document.getElementById("list").innerHTML = `<input id="foldername" type="text">`;
    document.getElementById("abtn").innerHTML = `<button id="donebtn" onclick="add();" class="btn btn-primary">Done</button>`;
}

function add(){
    let fname = document.getElementById("foldername");
    let result = fname.value.trim();
    
    if (result === "") return; 

    let uniqueId =  Date.now().toString(); 
    FolderList.push({"id": uniqueId, "foldername": result,"childfolder":"","childfile":""});

    savefoldersToStorage(FolderList);
    console.log(FolderList);
    document.getElementById("abtn").innerHTML = `<button id="donebtn" onclick="getname();" class="btn btn-primary">Add New folder</button>`;
    showfolder();
}
function savefoldersToStorage(list) {
    localStorage.setItem("folders", JSON.stringify(list));
}

function showfolder(){
   let data = ""
   for(let i=0; i<FolderList.length; i++){
    data +=  `  <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center hover-trigger">
    <i class="fa-solid fa-folder"></i><div id="row-${i}">${FolderList[i].foldername}</div>
    <span class="badge bg-secondary opacity-0 hover-target"><i class="fa-solid fa-folder-plus"></i></span>
    <span class="badge bg-secondary opacity-0 hover-target"><i class="fa-solid fa-file-circle-plus"></i></span>
    <span class="badge bg-secondary opacity-0 hover-target"><i onClick="edit(${i})"class="fa-solid fa-pen"></i></span>
    <span class="badge bg-secondary opacity-0 hover-target"><i onClick="del(${i});" class="fa-solid fa-trash"></i></span>
    </div>
    </div>`;
   }
   document.getElementById("list").innerHTML = data;
}

showfolder();   
 
function del(i){
    FolderList.splice(i,1);
    savefoldersToStorage(FolderList);
    showfolder();
}

function edit(i){
  let row = document.getElementById(`row-${i}`);

  row.innerHTML = `<input type="text" id="editfname-${i}" value='${FolderList[i].foldername}'><br>
                    <i onclick="saveedit(${i})" class="fa-regular fa-floppy-disk"></i>
                    <i onclick="showfolder();" class="fa-solid fa-xmark"></i>`
}

function saveedit(i){
    let newfname = document.getElementById(`editfname-${i}`).value.trim();
    if(newfname){
        FolderList[i]={
            "id" : Number(`${FolderList[i].id}`),
            "foldername" : newfname,
            "childfolder" : `${FolderList[i].childfolder}`,
            "childfile" : `${FolderList[i].childfile}`

        }
    }
    savefoldersToStorage(FolderList);
    showfolder();
}   


function childfolder(i){
       let input = prompt("Enter folder name");
       if(input){
        FolderList[i].childfolder.push({"id":})
       }
}