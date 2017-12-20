function menu(){
var arrayOfElements=document.getElementsByClassName('mob-menu-open');
var lengthOfArray=arrayOfElements.length;

for (var i=0; i<lengthOfArray;i++){
    arrayOfElements[i].style.display='block';
}
}