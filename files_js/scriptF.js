var $tablePrimary, $tableSuccess, $tableDanger, $arrayUsers;
var $inputFirstname, $inputLastname, $inputEmail, $inpuTel; 
var $arrEditUser;
var $storeTheId;

var BASE_URL = 'http://195.181.210.249:3000/todo/';

function main() {
   prepareDOMEvents();
}
function getToDos(){
    axios.get(BASE_URL)
        .then(res => {
            prepareInitialList(res.data);
        });
}
function prepareInitialList(elements) {
        elements.forEach(element => {
             addElementToList($arrayUsers, element);
});
}
function prepareDOMElements() {
        $tablePrimary = document.getElementById ('requestPrimary');
        $tableSuccess = document.getElementById ('requestSuccess');
        $tableDanger = document.getElementById ('requestDanger');
        $arrayUsers = document.getElementById('arrayUsers');
        $inputFirstname = document.getElementById('Fname');
        $inputLastname = document.getElementById('Lname');
        $inputEmail = document.getElementById('Ename');
        $inpuTel = document.getElementById('Tnumber');
        $storeTheId = document.getElementById('btnEdit')
}
function addElementToList($listWhereAdd, todo) {
    var createdElement = createListElement(todo);
    $listWhereAdd.appendChild(createdElement);
}
function createListElement(todo) {
     var editButton = document.createElement('button');
         editButton.textContent = 'edit';
         editButton.dataset.taskId = todo.id;
     var newColumnFirstname = document.createElement('td');
         newColumnFirstname.textContent = todo.author;
         newColumnFirstname.taskId = todo.id ;
     var newColumnLastname = document.createElement('td');
         newColumnLastname.innerText = todo.title;
     var newColumnEmail = document.createElement('td');
         newColumnEmail.innerText = todo.extra ;
         newColumnEmail.className = 'email';
     var newColumnTel = document.createElement('td');
         newColumnTel.innerText = todo.description;
         newColumnTel.className = 'tel';
     var newColumnID = document.createElement('td');
         newColumnID.innerText = todo.id;
     var deleteButton = document.createElement('button');
         deleteButton.textContent = 'delete';
         deleteButton.dataset.taskId = todo.id;
     var recordArrayUsers = document.createElement('tr');
         recordArrayUsers.id = todo.id;
    
        recordArrayUsers.appendChild(editButton);
        recordArrayUsers.appendChild(newColumnFirstname);
        recordArrayUsers.appendChild(newColumnLastname);
        recordArrayUsers.appendChild(newColumnEmail);
        recordArrayUsers.appendChild(newColumnTel);
        recordArrayUsers.appendChild(newColumnID);
        recordArrayUsers.appendChild(deleteButton);
        return recordArrayUsers;
}
function prepareDOMEvents() {
    var buttonRefresh = document.getElementById('btnRefresh');
        buttonRefresh.addEventListener('click', refresh);
    var buttonListUsers = document.getElementById('listUsers');
        buttonListUsers.addEventListener('click', loadingDataDOM);
    var buttonSaveTheData = document.getElementById('btnSaveInputFLET');
        buttonSaveTheData.addEventListener('click', getToDosUserList);
    var buttonCleanTheWindow = document.getElementById('cleanTheWindow');
        buttonCleanTheWindow.addEventListener('click', cleanWindow);
    var buttonEdit = document.getElementById('btnEdit');
        buttonEdit.addEventListener('click', ButtonEditSave);
      }
function ButtonEditSave(){
    putToDos(event.target.value)
}
function cleanWindow (){
    prepareDOMElements();
    $arrayUsers.innerHTML='';
} 
function refresh (){
    loadingDomelementsListener();
    prepareDOMElements();
    $arrayUsers.innerHTML='';
    getToDos();
}    
function loadingDomelementsListener() {
    prepareDOMElements();
    $arrayUsers.addEventListener('click', listClickHandler);
    $arrayUsers.addEventListener('click', ListClickHandlerEdit);
}
function loadingDataDOM(){
    loadingDomelementsListener();
    getToDos();
}
function getToDosUserList() {
    loadingDomelementsListener();
    axios.post(BASE_URL, {
        author: $inputFirstname.value,
        title: $inputLastname.value,
        extra: $inputEmail.value,
        description: $inpuTel.value,
    }).then(() => {
        refresh();
    })
}
function listClickHandler(event) {
    if(event.target.textContent != 'delete' ) {
    return;
    };
    deleteToDos(event.target.dataset.taskId);
}
function deleteToDos(elementId) {
    axios.delete(BASE_URL + elementId);
    document.getElementById(elementId).remove();
}
function ListClickHandlerEdit (event) {
    if(event.target.textContent != 'edit' ) {
    return;
    }
    insertListEdit(event.target.dataset.taskId);
}
function putToDos(value) {
    axios.put(BASE_URL +value, {
    author: $inputFirstname.value,
    title: $inputLastname.value,
    extra: $inputEmail.value,
    description: $inpuTel.value,
    }).then(() => {
        refresh();
    })
}
function insertListEdit(elementId) {

    axios.get(BASE_URL + elementId)
     .then( res => {
        prepareInitialEditList(res.data);
  })
}
function prepareInitialEditList(elements) {
    elements.forEach(arr_element => {
         createListEditElement(arr_element);
})
}
function createListEditElement(edit){
    $inputFirstname.value = edit.author;
    $inputLastname.value = edit.title;
    $inputEmail.value = edit.extra;
    $inpuTel.value = edit.description;
    $storeTheId.value = edit.id;
}
document.addEventListener('DOMContentLoaded', main);