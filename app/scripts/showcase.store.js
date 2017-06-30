'use strict';

//const ShowcaseStore = new Store();
var products = [
  {
    id: 'coke',
    name: 'coke',
    value: 600,
    count: 20
  }
];

class ShowcaseStore extends Store {
  constructor() {
    super();
    this.data = products;
  }

  update(id) {

  }

  find(id) {
    return products.find((product) => {
      return product.id === id;
    });
  }

  isUsable(id) {

  }

  isEmpty(id) {

  }
}

module.exports = ShowcaseStore;