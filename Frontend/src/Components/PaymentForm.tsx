import { Card, Form, Input, Select, DatePicker, Button } from "antd";
import { useEffect, useState } from "react";
import api from "../Services/Api";

const { Option } = Select;

interface Props {
  mode: "credit" | "debit";
}

export default function PaymentForm({ mode }: Props) {

  const [form] = Form.useForm();

  const [banks, setBanks] = useState<any[]>([]);
  const [contractors, setContractors] = useState<any[]>([]);

  useEffect(() => {
    fetchBanks();
    fetchContractors();
  }, []);

  const fetchBanks = async () => {
    const res = await api.get("/banks");
    setBanks(res.data);
  };

  const fetchContractors = async () => {
    const res = await api.get("/contractors");
    setContractors(res.data);
  };

  const handleSubmit = async (values: any) => {

    const payload = {
      ...values,
      account_type: mode === "credit" ? "Credit" : "Debit"
    };

    await api.post("/transactions", payload);

    form.resetFields();
  };

  return (

    <Card title={mode === "credit" ? "Payment Credit" : "Payment Debit"}>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >

        {/* BANK FROM */}

        <Form.Item
          label="Bank From"
          name="bank_id"
        >

          {mode === "credit" ? (

            <Select placeholder="Select Bank">

              {banks.map((bank) => (
                <Option key={bank.id} value={bank.id}>
                  {bank.bank_name}
                </Option>
              ))}

            </Select>

          ) : (

            <Input placeholder="Enter Bank Name" />

          )}

        </Form.Item>


        {/* PAYMENT DEPOSIT */}

        <Form.Item
          label="Payment Deposit"
          name="transaction_type"
        >

          {mode === "debit" ? (

            <Select placeholder="Select Bank">

              {banks.map((bank) => (
                <Option key={bank.id} value={bank.bank_name}>
                  {bank.bank_name}
                </Option>
              ))}

            </Select>

          ) : (

            <Input placeholder="Enter Payment Type" />

          )}

        </Form.Item>


        {/* CONTRACTOR */}

        <Form.Item
          label="Contractor"
          name="contractor_id"
        >

          <Select placeholder="Select Contractor">

            {contractors.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}

          </Select>

        </Form.Item>


        {/* DATE */}

        <Form.Item
          label="Transaction Date"
          name="transaction_date"
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>


        {/* AMOUNT */}

        <Form.Item
          label="Amount"
          name="amount"
        >
          <Input />
        </Form.Item>


        {/* PARTICULAR */}

        <Form.Item
          label="Particular"
          name="particular"
        >
          <Input />
        </Form.Item>


        {/* REMARK */}

        <Form.Item
          label="Remark"
          name="remark"
        >
          <Input.TextArea rows={3} />
        </Form.Item>


        <Button type="primary" htmlType="submit">

          {mode === "credit"
            ? "Credit Payment"
            : "Debit Payment"}

        </Button>

      </Form>

    </Card>
  );
}