const PubSub = require('../helpers/pub_sub')

const MountainListView = function(element){
  this.element = element;
}

MountainListView.prototype.bindEvents = function(){
  PubSub.subscribe('Mountains:All-Data-Ready', (event) => {
    const allMunros = event.detail;
    this.render(allMunros)
  })
}

MountainListView.prototype.render = function(allMunros, region){
  this.element.innerHTML = "";
  let munroList = document.createElement('ul')

  if(region !== undefined){
    allMunros = allMunros.filter(munro => munro.region === region)
  }
  // console.dir(regionList)
  allMunros.forEach((munro) => {
    const munroItem = document.createElement('li')
    munroItem.textContent = munro.name;
    munroList.appendChild(munroItem)
  });

  this.element.appendChild(munroList)

}

module.exports = MountainListView;
