const PubSub = require('../helpers/pub_sub')

const SelectView = function(element){
  this.element = element;
}

SelectView.prototype.bindEvents = function(){

  PubSub.subscribe('Mountains:Regions', (event) => {
    event.preventDefault()
    const allRegions = event.detail;
    this.populateRegions(allRegions)

  })

  this.element.addEventListener('change', (event) => {
    console.log(event.target.value);
    PubSub.publish('SelectFilter:Change', event.target.value )
  });
}

SelectView.prototype.populateRegions = function(allRegions){
  allRegions.forEach((region, index) => {
    const option = document.createElement('option')
    option.textContent = region;
    option.value = region;
    this.element.appendChild(option)
    //This passes the value as a name instead of an index.
  })

}



module.exports = SelectView;
