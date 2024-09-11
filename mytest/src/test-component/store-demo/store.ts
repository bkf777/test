import { Action, ActionType } from "./actions";
import dispatcher from "./dispactcher";



class Store {
  private state: any = {
    a:1,
    items:[]
  };
  private listeners: (() => void)[] = [];

  constructor() {
    dispatcher.register(this.handleAction.bind(this));
  }

  // 订阅Store变化
  subscribe(listener: () => void): void {
    this.listeners.push(listener);
  }

  // 通知所有订阅者
  private notify(): void {
    this.listeners.forEach(listener => listener());
  }

  // 更新状态
  private updateState(newState: any): void {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  // 处理Action
  handleAction(action: Action): void {
    switch (action.type) {
      case ActionType.ADD_ITEM:
        this.updateState({ items: [...this.state.items, action.payload] });
        break;
      case ActionType.REMOVE_ITEM:
        const newItems = [...this.state.items];
        newItems.splice(action.payload, 1);
        this.updateState({ items: newItems });
        break;
      default:
        break;
    }
  }

  // 获取状态
  getState(): any {
    return this.state;
  }

  dispatch(action: Action): void {
    dispatcher.dispatch(action);
  }
}


// 创建Store实例
const store = new Store();
store.subscribe(() => {
  console.log('State updated:', store.getState());
});

// 导出Store实例
export default store;