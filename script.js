const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []

console.log(itemsArray);

document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item") 
    // here item is the task which u are entering in your web app
    createItem(item)
})

function createItem(item) {
    itemsArray.push(item.value)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    // jo bhi mai task mai enter kar raha hu usko localStorage me dalne ka kam yeh line kar rahi hai , lekin hum directly usko local storae me nahi dal sakte isliye usko comvert karne ke liye we are using the word JSON.stringfy("items")
    location.reload();
}

function displayItems() {
    let items = ""
    for (let i = 0; i < itemsArray.length; i++) {
        items += `  <div class="item">
                    <div class="input-controller">
                       <textarea disabled class="taskText">${itemsArray[i]}</textarea>
                        <div class="edit-controller">
                        <img class="deleteBtn" src="delete.svg" alt="">
                         <img class="editBtn" src="edit.svg" alt="">
                         <img class="cutBtn" src="tick.svg" alt="">
                         </div>
                         </div>
                          <div class="update-controller">
                            <button class="saveBtn">Save</button>
                         <button class="cancelBtn">Cancel</button>
                         </div>
                           </div>`

    }
    document.querySelector(".to-do-list").innerHTML=items 
    // yeh line batati hai ki item ko html me dalna kidhar hai , jab tak tu yeh line nahi dalega uper me likha hua jo code hai wo webpage ko show nahi hoga kyuki tune wo js me likha hai html me nahi yeh line likhne ke bad tu usko html me dal raha hai vimp

    activateDeleteListners()
    activateEditListners()
    activateSaveListners()
    activateCancelListners()
    activateCutListeners()

}
function activateDeleteListners(){
    let deleteBtn=document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db,i)=>{
        db.addEventListener("click",() => {
            deleteItem(i)  })
    })
}
function deleteItem(i){
    itemsArray.splice(i,1)
    localStorage.setItem("items" , JSON.stringify(itemsArray))
    location.reload()
}

function activateEditListners(){
    const editBtn=document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((ed,i) => {
        ed.addEventListener("click",() => {
            updateController[i].style.display="block"
            inputs[i].disabled=false
          
        }) 
    })
}
function activateSaveListners(){
    const saveBtn=document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb,i)=>{
        sb.addEventListener("click",()=>{
            updateItem(inputs[i].value,i)
        })
    })
}
function updateItem(text,i){
    itemsArray[i]=text;
    localStorage.setItem("items",JSON.stringify(itemsArray))
    location.reload()
}

function activateCancelListners(){
    const cancelBtn=document.querySelectorAll(".cancelBtn")
    const updateController=document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cb,i) => {
        cb.addEventListener("click",()=>{
        updateController[i].style.display="none"
        inputs[i].disabled=true;
    })
      
    })
}










function activateCutListeners() {
    const cutButtons = document.querySelectorAll('.cutBtn');

    cutButtons.forEach((button, i) => {
        button.addEventListener('click', () => {
            cutTask(i);
        })
    })
}

function cutTask(i) {
    const taskText = document.querySelectorAll('.taskText')[i];

    // Toggle the 'taskCompleted' class on the task's text
    taskText.classList.toggle('taskCompleted');
}












function displayDate() {
    let date = new Date()
    date = date.toString().split(" ")
    document.querySelector("#date").innerHTML = "Date = " + date[1] + " " + date[2] + " " + date[3] + " " + " Time = " + date[4]
    // console.log(date);

}
window.onload = function () {
    displayDate()
    displayItems()
}