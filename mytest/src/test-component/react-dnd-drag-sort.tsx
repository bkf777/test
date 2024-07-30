import React, { useState } from "react";
import { DndProvider } from "react-dnd";

//@ts-ignore
import { cloneDeep } from "lodash";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDndDragSort from "../ReactDndDragSort";

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
    {
      id: 33,
      name: "组3",
    },
    {
      id: 44,
      name: "组4",
    },
  ];
  const [reviewerList, setReviewerList] = useState(dList);

  const changePosition = (dragIndex: any, hoverIndex: any) => {
    const data = cloneDeep(reviewerList);
    const temp = data[dragIndex];
    console.log(dragIndex, hoverIndex, data);
    // 交换位置
    data[dragIndex] = data[hoverIndex];
    data[hoverIndex] = temp;
    console.log("交换完成---", data);
    setReviewerList(data);
  };
  const movePosition = (dragIndex: any, hoverIndex: any) => {
    const data = cloneDeep(reviewerList);
    if (dragIndex < 0 || dragIndex >= data.length || hoverIndex < 0 || hoverIndex >= data.length) {
      console.error("Invalid index provided");
      return;
    }

    const itemToMove = data.splice(dragIndex, 1)[0];
    data.splice(hoverIndex, 0, itemToMove);
    console.log("movePosition", dragIndex, hoverIndex, data, reviewerList);
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
                  <ReactDndDragSort rowKey={item?.id} index={index} id={item?.id} changePosition={movePosition}>
                    <div
                      key={item?.id}
                      className="reviewer"
                      style={{ width: "200px", height: "100px", border: "1px solid red" }}
                    >
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
