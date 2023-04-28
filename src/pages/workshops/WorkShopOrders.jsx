import React from "react";

const WorkShopOrders = (props) => {
  console.log(props.data);
  return <div>{props.data.id}</div>;
};

export default WorkShopOrders;
