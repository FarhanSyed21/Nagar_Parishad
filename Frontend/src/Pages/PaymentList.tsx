import { Table, Card, Select, Input, Row, Col, Button, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import api from "../Services/Api";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

export default function PaymentList() {

  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  const [fromDate,setFromDate] = useState("");
  const [toDate,setToDate] = useState("");

  const [open,setOpen] = useState(false);
const [editRecord,setEditRecord] = useState<any>(null);

  const [form] = Form.useForm();

  const fetchTransactions = async () => {

    const res = await api.get("/transactions", {
      params: { type, amount, fromDate, toDate }
    });

    setData(res.data);

  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEdit = (record:any) => {

    console.log("Edit record", record);

    // next step we will open edit modal here

    setEditRecord(record);

    form.setFieldsValue({
        transaction_date: dayjs(record.transaction_date),
        amount: record.amount,
        particular: record.particular,
        remark: record.remark
    });

    setOpen(true);

  };


  const handleUpdate = async ()=>{

    const values = await form.validateFields();

    await api.put(`/transactions/${editRecord.id}`,{
        ...values,
        transaction_date: values.transaction_date.format("YYYY-MM-DD")
    });

    setOpen(false);
    fetchTransactions();

    };

  const columns = [

    {
      title: "ID",
      dataIndex: "id"
    },

    {
      title: "Transaction From",
      dataIndex: "bank_name"
    },

    {
      title: "Transaction To",
      dataIndex: "transaction_type"
    },

    {
      title: "Contractor",
      dataIndex: "contractor_name"
    },

    {
      title: "Transaction Date",
      dataIndex: "transaction_date",
      render: (date: string) =>
        new Date(date).toLocaleDateString("en-IN")
    },


    {
      title: "Transaction Amount",
      dataIndex: "amount"
    },

    {
      title: "Transaction Type",
      dataIndex: "account_type"
    },

    // {
    //   title: "Particular",
    //   dataIndex: "particular"
    // },

    {
      title: "Remark",
      dataIndex: "remark"
    },

    {
      title: "Action",
      render: (_:any, record:any) => (
        <Button type="primary" onClick={()=>handleEdit(record)}>
          Edit
        </Button>
      )
    }

  ];

  return (

    <Card title="Payment List">

      <Row gutter={16} style={{ marginBottom: 20 }}>

        <Col span={6}>
          <Select
            placeholder="Transaction Type"
            style={{ width:"100%" }}
            onChange={(value)=>setType(value)}
            allowClear
          >
            <Option value="Credit">Credit</Option>
            <Option value="Debit">Debit</Option>
          </Select>
        </Col>

        <Col span={6}>
            <DatePicker
                placeholder="From Date"
                style={{width:"100%"}}
                onChange={(date)=>
                setFromDate(date ? dayjs(date).format("YYYY-MM-DD") : "")
                }
            />
        </Col>

        <Col span={6}>
            <DatePicker
                placeholder="To Date"
                style={{width:"100%"}}
                onChange={(date)=>
                setToDate(date ? dayjs(date).format("YYYY-MM-DD") : "")
                }
            />
        </Col>

        <Col span={6}>
          <Input
            placeholder="Amount"
            onChange={(e)=>setAmount(e.target.value)}
          />
        </Col>

        <Col span={6}>
          <Button type="primary" onClick={fetchTransactions}>
            Apply Filter
          </Button>
        </Col>

      </Row>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
      />

      <Modal
        open={open}
        title="Edit Transaction"
        onOk={handleUpdate}
        onCancel={()=>setOpen(false)}
        >

        <Form form={form} layout="vertical">

        <Form.Item name="transaction_date" label="Date">
        <DatePicker style={{width:"100%"}}/>
        </Form.Item>

        <Form.Item name="amount" label="Amount">
        <Input/>
        </Form.Item>

        <Form.Item name="particular" label="Particular">
        <Input/>
        </Form.Item>

        <Form.Item name="remark" label="Remark">
        <Input/>
        </Form.Item>

        </Form>

        </Modal>

    </Card>

  );

}