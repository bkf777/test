import React, { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";

/*
1、useDrop和useDrag是react-dnd的两个hook，用于实现拖拽功能
2、useDrop用于接收拖拽元素，useDrag用于定义拖拽元素，
3、useDrop和useDrag都接收一个对象作为参数，对象中包含了一些配置项。
  在useDrop上定义accept属性，表示接收拖拽元素的类型，useDrag上定义type属性，表示拖拽元素的类型。
4、useDrop返回的是一个数组，数组的第一个元素是一个对象，第二个元素是一个函数.返回的对象是一个对象，包含了一些属性，用于设置ref。
*/

// dnd拖拽排序
export default (props: any) => {
  const { id = "", index = "", changePosition = () => {}, className = "", children, rowKey = "" } = props;
  const ref: any = useRef(null);
  // 因为没有定义收集函数，所以返回值数组第一项不要
  const [, drop] = useDrop({
    accept: "DragDropBox", // 只对useDrag的type的值为DragDropBox时才做出反应
    // hover: (item: any, monitor: any) => {
    //   // 这里用节流可能会导致拖动排序不灵敏
    //   if (!ref.current) return;
    //   const dragIndex = item.index;
    //   const hoverIndex = index;
    //   if (dragIndex === hoverIndex) return; // 如果回到自己的坑，那就什么都不做
    //   changePosition(dragIndex, hoverIndex); // 调用传入的方法完成交换
    //   item.index = hoverIndex; // 将当前当前移动到Box的index赋值给当前拖动的box，不然会出现两个盒子疯狂抖动！
    // },
    drop(item: any, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return; // 如果回到自己的坑，那就什么都不做
      changePosition(dragIndex, hoverIndex); // 调用传入的方法完成交换
      item.index = hoverIndex; // 将当前当前移动到Box的index赋值给当前拖动的box，不然会出现两个盒子疯狂抖动！
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "DragDropBox", //对应useDrop的accept
    item: { id, type: "DragDropBox", index }, //传递给useDrop的drop函数的参数,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // css样式需要,正在移动
    }), // 返回的对象会作为useDrag的返回值
  }));
  const changeRef = drag(drop(ref));

  return (
    // ref 这样处理可以使得这个组件既可以被拖动也可以接受拖动
    <div
      //@ts-ignore
      ref={changeRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="dragBox"
    >
      <span key={rowKey} className={className}>
        {children}
      </span>
    </div>
  );
};
