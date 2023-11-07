

import React, { useState } from "react";
import { DndProvider } from "react-dnd";

//@ts-ignore
import { cloneDeep } from "lodash";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDndDragSort from "./ReactDndDragSort";
console.log("HTML5Backend", HTML5Backend);

export default () => {
  const dList = [
    {
      id: 99,
      name: "组1",
    },
    {
      id: 22,
      name: "组2",
    },
  ];
  const [reviewerList, setReviewerList] = useState(dList);

  const changePosition = (dragIndex: any, hoverIndex: any) => {
    const data = cloneDeep(reviewerList);
    const temp = data[dragIndex];
    // 交换位置
    data[dragIndex] = data[hoverIndex];
    data[hoverIndex] = temp;
    console.log("交换完成---", data);
    setReviewerList(data);
  };
  return (
    <>
      <div className="reviewerContainer">
        <DndProvider backend={HTML5Backend}>
          {reviewerList?.length ? (
            <div>
              {reviewerList.map((item: any, index: any) => {
                return (
                  <ReactDndDragSort
                    rowKey={item?.id}
                    index={index}
                    id={item?.id}
                    changePosition={changePosition}
                  >
                    <div key={item?.id} className="reviewer">
                      <div className="reviewerTxt">{item.name}</div>
                    </div>
                  </ReactDndDragSort>
                );
              })}
            </div>
          ) : null}
        </DndProvider>
      </div>
    </>
  );
};

