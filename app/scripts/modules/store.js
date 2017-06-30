'use strict';

class Store {
  constructor() {
    this.data = this.create()
  }

  create() {
    return []
  }

  get() {
    return this.data;
  }

  set(newData) {
    this.data = newData;
  }
}
