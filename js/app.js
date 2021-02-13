'use strict';

// Global Variables
let totalClicks = 0;
let clicksAllowed = 25;
let allBusProducts = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');

// Constructor
function BusProduct(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allBusProducts.push(this);
}

// new products objects here


function getRandomIndex(){
  return Math.floor(Math.random() * allBusProducts.length);
}

function renderBusProduct(){
  let firstProductIndex = getRandomIndex();
  let secondProductIndex = getRandomIndex();
  let thirdProductIndex = getRandomIndex();
  // recommend using an array
  // maybe name it indexArray
  // check to see if the index is included in that array
  // pop those results from the array or shift? maybe?

  imageOne.src = allBusProducts[firstProductIndex].src;
  imageOne.title = allBusProducts[firstProductIndex].name;
  allBusProducts[firstProductIndex].views++;

  imageTwo.src = allBusProducts[secondProductIndex].src;
  imageTwo.title = allBusProducts[secondProductIndex].name;
  allBusProducts[secondProductIndex].views++;

  imageThree.src = allBusProducts[thirdProductIndex].src;
  imageThree.title = allBusProducts[thirdProductIndex].name;
  allBusProducts[thirdProductIndex].views++;
}

function renderResults(){
  let myList = document.querySelector('ul');
  for (let i = 0; i < allBusProducts.length; i++){
    let li = document.createElement('li');
    li.textContent = `${allBusProducts[i].name} had ${allBusProducts[i].clicks} votes and was seen ${allBusProducts[i].views} times`;
    myList.appendChild(li);
  }
}

function handleClick(event){
  totalClicks++;
  let productClicked = event.target.title;

  for (let i = 0; i < allBusProducts.length; i++){
    if(productClicked === allBusProducts[i].name) {
      allBusProducts[i].clicks++;
    }
  }
  renderBusProduct();
  if (totalClicks === clicksAllowed){
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleButtonClick(event){ //eslint-disable-line
  if(totalClicks === clicksAllowed){
    renderResults();
  }
}

// renderBusProducts();

myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);
