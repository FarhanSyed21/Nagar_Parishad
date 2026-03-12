import { Table, Card } from "antd";
import { useEffect, useState } from "react";
import api from "../Services/Api";

export default function PaymentList() {

  const [data, setData] = useState([]);

  const fetchTransactions = async () => {

    const res = await api.get("/transactions");

    setData(res.data);

  };

  useEffect(() => {

    fetchTransactions();

  }, []);

  const columns = [

    {
      title: "ID",
      dataIndex: "id"
    },

    {
      title: "Bank",
      dataIndex: "bank_name"
    },

    {
      title: "Contractor",
      dataIndex: "contractor_name"
    },

    {
      title: "Date",
      dataIndex: "transaction_date"
    },

    {
      title: "Amount",
      dataIndex: "amount"
    },

    {
      title: "Type",
      dataIndex: "account_type"
    },

    {
      title: "Particular",
      dataIndex: "particular"
    },

    {
      title: "Remark",
      dataIndex: "remark"
    }

  ];

  return (

    <Card title="Payment List">

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
      />

    </Card>

  );

}