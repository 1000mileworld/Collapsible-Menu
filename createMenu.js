function createMenu(){

let button = document.createElement('button');
document.body.prepend(button);
button.outerHTML = '<button class="expandible" type="button">Content<br>Map<br>>>></button>'


const ex = document.querySelector('.expandible');
const menu = document.querySelector('.menu');

const listNode = document.querySelectorAll('.menu > li');

//add icon to indicate which menu items are expandible
listNode.forEach(function(item) {
	if(item.lastElementChild.className==='subMenu'){
		let expandIcon = document.createTextNode('\u00A0\u00A0\u00A0 \u21D3'); //unicode for spaces and a down arrow
		item.firstElementChild.append(expandIcon);
	};	
});


//determine appropriate menu height
const listArray = [...listNode];
let sum = 0;
listArray.forEach(item => sum += item.scrollHeight);

const extraSpace = parseFloat(getComputedStyle(ex).getPropertyValue('height'));
//parseFloat(getComputedStyle(listClass).getPropertyValue('margin'))*listArray.length;

document.documentElement.style.setProperty('--menuHeight',sum+extraSpace+'px');

function controlMenu(){
  menu.classList.toggle("popup");
}

ex.addEventListener("click", controlMenu);


//create sub menu
const subMenu = document.getElementsByClassName("subMenu");

for (let i = 0; i < subMenu.length; i++) {
  	subMenu[i].parentElement.addEventListener("click", function() {
		if (subMenu[i].style.maxHeight){
		  subMenu[i].style.maxHeight = null;
		} else {
		  subMenu[i].style.maxHeight = subMenu[i].scrollHeight + "px";
		}   
  });
}

}