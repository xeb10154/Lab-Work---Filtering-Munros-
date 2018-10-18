const Mountains = require('./models/mountains')
const MountainListView = require('./views/mountain_list_view')
const SelectFilter = require('./views/select_filter')

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const activeFilter = document.querySelector('#munroFilter');
  const selectFilter = new SelectFilter(activeFilter);
  selectFilter.bindEvents();

  const displayAreaMunros = document.querySelector('#listOfAllMunros')
  const mountainListView = new MountainListView(displayAreaMunros)
  mountainListView.bindEvents();

  // GET data
  const mountains = new Mountains();
  mountains.bindEvents()


})
