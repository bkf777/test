class Store {
  store: any;
  constructor(store: any) {
    this.store = store;
  }
  static getInstance(store: any) {
    return new Store(store);
  }
  changePosition(dragIndex: any, hoverIndex: any) {
    const data = this.store.slice();
    const temp = data[dragIndex];
    console.log(dragIndex, hoverIndex, data);
    // 交换位置
    data[dragIndex] = data[hoverIndex];
    data[hoverIndex] = temp;
    console.log("交换完成---", data);
    this.store = data;
  }
  movePosition(dragIndex: any, hoverIndex: any) {
    const data = this.store.slice();
    if (dragIndex < 0 || dragIndex >= data.length || hoverIndex < 0 || hoverIndex >= data.length) {
      console.error("Invalid index provided");
      return;
    }
    const itemToMove = data.splice(dragIndex, 1)[0];
    data.splice(hoverIndex, 0, itemToMove);
    console.log("movePosition", dragIndex, hoverIndex, data, this.store);
    this.store = data;
  }
  getStore() {
    return this.store;
  }
  setStore(store: any) {
    this.store = store;
  }
}
export default new Store({ a: 1 });
