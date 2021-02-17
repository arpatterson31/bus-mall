'use strict';

// Global Variables
let totalClicks = 0;
let clicksAllowed = 25;
let allBusProducts = [];
let productIndexArray = [];
let uniqueNumberSelector = 6;
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
  this.votes = 0;
  allBusProducts.push(this);
}

// new products objects here
new BusProduct('bag');
new BusProduct('banana');
new BusProduct('bathroom');
new BusProduct('boots');
new BusProduct('breakfast');
new BusProduct('bubblegum');
new BusProduct('chair');
new BusProduct('cthulhu');
new BusProduct('dog-duck');
new BusProduct('dragon');
new BusProduct('pen');
new BusProduct('pet-sweep');
new BusProduct('scissors');
new BusProduct('shark');
new BusProduct('sweep', 'png');
new BusProduct('tauntaun');
new BusProduct('unicorn');
new BusProduct('usb', 'gif');
new BusProduct('water-can');
new BusProduct('wine-glass');


function getRandomIndex() {
  return Math.floor(Math.random() * allBusProducts.length);
}

function renderBusProduct() {
  while (productIndexArray.length < uniqueNumberSelector) {
    let randomNumber = getRandomIndex();
    while (!productIndexArray.includes(randomNumber)) {
      productIndexArray.unshift(randomNumber);
    }
  }

  let firstProductIndex = productIndexArray.pop();
  let secondProductIndex = productIndexArray.pop();
  let thirdProductIndex = productIndexArray.pop();

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

function renderResults() {
  let myList = document.querySelector('ul');
  for (let i = 0; i < allBusProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allBusProducts[i].name} had ${allBusProducts[i].votes} votes and was seen ${allBusProducts[i].views} times`;
    myList.appendChild(li);
  }
}

function handleClick(event) {
  totalClicks++;
  let productClicked = event.target.title;

  for (let i = 0; i < allBusProducts.length; i++) {
    if (productClicked === allBusProducts[i].name) {
      allBusProducts[i].votes++;
    }
  }
  renderBusProduct();
  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    renderBusChart();
  }
}

renderBusProduct();

function renderBusChart() {
  let busProductNames = [];
  let busProductViews = [];
  let busProductVotes = [];

  for (let i = 0; i < allBusProducts.length; i++) {
    busProductNames.push(allBusProducts[i].name);
    busProductViews.push(allBusProducts[i].views);
    busProductVotes.push(allBusProducts[i].votes);
  }

  let chartData = {
    type: 'bar',
    data: {
      labels: busProductNames,
      datasets: [{
        label: '# of Votes',
        data: busProductVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: busProductViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  }

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartData);
}

myContainer.addEventListener('click', handleClick);

