const PubSub = require('../helpers/pub_sub')
const Request = require('../helpers/request')
const MountainListView = require('../views/mountain_list_view')

const Mountains = function(){
  // this.mountains = [];
}

Mountains.prototype.bindEvents = function(){
  this.getData();
  PubSub.subscribe('SelectFilter:Change', (event) => {
    const regionName = event.detail;
    this.filterListByRegion(this.mountains, regionName)
    // console.log(regionName);
  })
}

Mountains.prototype.getData = function(){
  const request = new Request("https://munroapi.herokuapp.com/api/munros");

  request.get().then((data) => {
    this.mountains = data;
    PubSub.publish('Mountains:All-Data-Ready', this.mountains)

    const regionList = []
    this.mountains.forEach((munro) => {
      if(!regionList.includes(munro.region)){
        regionList.push(munro.region)
      }
    })
    // Use a Set Object

    PubSub.publish('Mountains:Regions', regionList)

  });
}

Mountains.prototype.filterListByRegion = function(mountainsArray, regionName){
  const displayAreaMunros = document.querySelector('#listOfAllMunros')
  const filteredListView = new MountainListView(displayAreaMunros);
  filteredListView.render(mountainsArray, regionName)

}



module.exports = Mountains;
