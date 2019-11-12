function createMenu(){

let viewPort = 700;

if(screen.width>viewPort){

let button = document.createElement('button');
document.body.prepend(button);
button.outerHTML = '<button class="expandible" type="button">Content<br>Map<br>>>></button>';

const ex = document.querySelector('.expandible');
const menu = document.querySelector('.menu');

const listNode = document.querySelectorAll('.menu > li');

//add icon to indicate which menu items are expandible
listNode.forEach(function(node) {
	if(node.lastElementChild.className==='subMenu'){
		let expandIcon = document.createTextNode('\u00A0\u00A0\u00A0 \u21D3'); //unicode for spaces and a down arrow
		node.firstElementChild.after(expandIcon);
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

//check window size
let addIcon = false; //flag for when to re-add text nodes

function displayProper(){
	if(document.documentElement.clientWidth<viewPort){
		document.querySelector('.expandible').style.setProperty('display','none'); //remove button
		listNode.forEach(function(node) {
			if(node.lastElementChild.className==='subMenu' && node.firstElementChild.nextSibling.nodeName=='#text'){
				node.firstElementChild.nextSibling.remove(); //remove down arrow
				addIcon = true;
			}
		});
	}else{
		document.querySelector('.expandible').style.setProperty('display','inline-block');
		if(addIcon){
			listNode.forEach(function(node) {
				if(node.lastElementChild.className==='subMenu'){
					let expandIcon = document.createTextNode('\u00A0\u00A0\u00A0 \u21D3'); //unicode for spaces and a down arrow
					node.firstElementChild.after(expandIcon);
				};	
			});
			addIcon = false;
		}
	}
}
displayProper();
window.addEventListener('resize', displayProper);

} //end if(screen.width>700)

} //end function