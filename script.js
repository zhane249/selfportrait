//reference: drag and drop https://www.w3schools.com/HTML/html5_draganddrop.asp
//reference for deleting image / going back to original place https://www.geeksforgeeks.org/javascript/javascript-program-to-delete-an-image-by-clicking-on-a-button/

let selectedImage = null;

//all images
const elements =document.querySelectorAll(".element");
//original position
for(let i=0; i<elements.length; i++){
    elements[i].originalParent = elements[i].parentNode;

    //select when clicked
    elements[i].addEventListener("click", function(){
        selectedImage = elements[i];
    })
}
//delete one
const deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener("click", function(){
    if(selectedImage !=null){
        //original container
        selectedImage.originalParent.appendChild(selectedImage);
        selectedImage.style.position= "";
selectedImage.style.left = "";
selectedImage.style.top="";
selectedImage =null;
    }
});

//clear all
const clearButton =document.getElementById("clearButton");
clearButton.addEventListener("click", function(){
    const canvas = document.getElementById("canvas");
    const canvasImages = canvas.querySelectorAll(".element");

    for(let i = 0; i< canvasImages.length; i++){
        canvasImages[i].originalParent.appendChild(canvasImages[i]);
        //remove canvas positioning
        canvasImages[i].style.position ="";
        canvasImages[i].style.left ="";
        canvasImages[i].style.top="";
    }
    selectedImage = null;
})
function dragstartHandler(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev){
    ev.preventDefault();
}


function dropHandler(ev){
    ev.preventDefault();
    const data= ev.dataTransfer.getData("text");
   const element = document.getElementById(data);
   const canvas = document.getElementById("canvas");
   //canvas location on screen
   const canvasPosition = canvas.getBoundingClientRect();

   //image to canvas
   canvas.appendChild(element);
//freebound
    element.style.position ="absolute";

//center point of origin instead of top left corner
element.style.left = (ev.clientX - canvasPosition.left - element.offsetWidth/2) + "px";
element.style.top=(ev.clientY - canvasPosition.top - element.offsetHeight/2) +"px";
}

