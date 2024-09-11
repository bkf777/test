// 定义Action类型
 enum ActionType {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM'
}

// 定义Action接口
interface Action {
    type: ActionType;
    payload?: any;
}

// Action创建函数
const addItem = (item: string): Action => ({
    type: ActionType.ADD_ITEM,
    payload: item
});

const removeItem = (index: number): Action => ({
    type: ActionType.REMOVE_ITEM,
    payload: index
});

export { addItem,removeItem ,ActionType}
export type {
    Action,
   
}