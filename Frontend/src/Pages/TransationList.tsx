import { Card, Form, Select, DatePicker, Input, Button, Table, Row, Col } from "antd";
import type { FC } from "react";

const { RangePicker } = DatePicker;

const TransactionList: FC = () => {

  const columns = [
    { title: "Transaction ID", dataIndex: "id" },
    { title: "Credit Payment", dataIndex: "credit" },
    { title: "Debit Payment", dataIndex: "debit" },
    { title: "Transaction From", dataIndex: "from" },
    { title: "Account ID", dataIndex: "account" },
    { title: "Contractor", dataIndex: "contractor" },
    { title: "Date", dataIndex: "date" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Type", dataIndex: "type" }
  ];

  const data = [
    {
      id: 1,
      credit: 1,
      debit: 0,
      from: "Property Tax",
      account: 1,
      contractor: "-",
      date: "23/03/2025",
      amount: 1000,
      type: "Credit"
    },
    {
      id: 2,
      credit: 5,
      debit: 0,
      from: "Property Tax",
      account: 1,
      contractor: "-",
      date: "23/03/2025",
      amount: 10000,
      type: "Credit"
    },
    {
      id: 3,
      credit: 0,
      debit: 6,
      from: "15 va Vitt",
      account: 1,
      contractor: "ARPI Group",
      date: "23/03/2025",
      amount: 9000,
      type: "Debit"
    }
  ];

  return (

    <Card title="Transaction List">

      {/* Search Section */}

      <Card title="Search Option" style={{ marginBottom: 20 }}>

        <Form layout="vertical">

          <Row gutter={16}>

            <Col span={6}>
              <Form.Item label="Bank">
                <Select
                  options={[
                    { value: "bank1", label: "Nashirabad Nagar Parishad" }
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Contractor">
                <Select
                  options={[
                    { value: "arpi", label: "ARPI Group" }
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Transaction Type">
                <Select
                  options={[
                    { value: "credit", label: "Credit" },
                    { value: "debit", label: "Debit" }
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Transaction Amount">
                <Input />
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>

            <Col span={6}>
              <Form.Item label="Transaction Date">
                <DatePicker />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="To">
                <DatePicker />
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>

            <Col>
              <Button type="primary">Search</Button>
            </Col>

            <Col>
              <Button>Edit</Button>
            </Col>

            <Col>
              <Button danger>Delete</Button>
            </Col>

          </Row>

        </Form>

      </Card>

      {/* Table */}

      <Card title="Transaction List View">

        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={false}
        />

      </Card>

    </Card>

  );
};

export default TransactionList;