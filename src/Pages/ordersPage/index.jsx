import React, { useEffect, useState } from "react";
import { ordersList } from "../../Api/api";
import { green, red } from "@mui/material/colors";

function OrdersPage() {
  const [orders, setOrders] = useState();

  const allOrders = async () => {
    const totalOrders = await ordersList();
    setOrders(totalOrders.data.data);
  };
  useEffect(() => {
    allOrders();
  }, []);

  console.log("ordersordersordersorders", orders);

  const redColor = {
    // 'background-color': 'red',
    color: "red",
  };
  const greenColor = {
    color: "green",
  };

  return (
    <div>
      <h1>Orders List</h1>
      {orders?.map((order) => {
        return (
          <div>
            <h4>Client Name - {order.client}</h4>
            <p>Product Detail - {order.details}</p>
            <h4>
              Order :{" "}
              {order.delivery ? (
                <span style={greenColor}>Delivered</span>
              ) : (
                <span style={redColor}>Pending</span>
              )}
            </h4>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default OrdersPage;
