import { Table, Card, Select, Input, Row, Col, Button } from "antd";
import { useEffect, useState } from "react";
import api from "../Services/Api";

const { Option } = Select;

export default function PaymentList() {

  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const fetchTransactions = async () => {

    const res = await api.get("/transactions", {
      params: {
        type,
        minAmount,
        maxAmount
      }
    });

    setData(res.data);

  };

  useEffect(() => {

    fetchTransactions();

  }, []);

  const columns = [

    { title: "ID", dataIndex: "id" },

    { title: "Bank", dataIndex: "bank_name" },

    { title: "Contractor", dataIndex: "contractor_name" },

    { title: "Date", dataIndex: "transaction_date" },

    { title: "Type", dataIndex: "transaction_type" },

    { title: "Amount", dataIndex: "amount" },

    { title: "Account", dataIndex: "account_type" },

    { title: "Particular", dataIndex: "particular" },

    { title: "Remark", dataIndex: "remark" }

  ];

  return (

    <Card title="Payment List">

      <Row gutter={16} style={{ marginBottom: 20 }}>

        <Col span={6}>
          <Select
            placeholder="Transaction Type"
            style={{ width: "100%" }}
            onChange={(value)=>setType(value)}
            allowClear
          >
            <Option value="Credit">Credit</Option>
            <Option value="Debit">Debit</Option>
          </Select>
        </Col>

        <Col span={6}>
          <Input
            placeholder="Min Amount"
            onChange={(e)=>setMinAmount(e.target.value)}
          />
        </Col>

        <Col span={6}>
          <Input
            placeholder="Max Amount"
            onChange={(e)=>setMaxAmount(e.target.value)}
          />
        </Col>

        <Col span={6}>
          <Button type="primary" onClick={fetchTransactions}>
            Apply Filters
          </Button>
        </Col>

      </Row>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
      />

    </Card>

  );

}