import { Card, Form, Input, Select, DatePicker, Button } from "antd";
import { transactionTypes } from "../Constants/transactionTypes";

const { Option } = Select;

export default function Transactions() {

  const [form] = Form.useForm();

  return (
    <Card title="Payment Deposit">

      <Form
        form={form}
        layout="vertical"
      >

        <Form.Item label="Bank From" name="bank_id">
          <Select placeholder="Select Bank">
            {/* Banks will come from API later */}
          </Select>
        </Form.Item>

        <Form.Item label="Payment Deposit" name="transaction_type">
          <Select placeholder="Select Type">
            {transactionTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="transaction_date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Amount" name="amount">
          <Input placeholder="Enter amount" />
        </Form.Item>

        <Form.Item label="Account" name="account_type">
          <Select>
            <Option value="Credit">Credit</Option>
            <Option value="Debit">Debit</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Particular" name="particular">
          <Input />
        </Form.Item>

        <Form.Item label="Remark" name="remark">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Button type="primary">
          Payment Deposit to Account
        </Button>

      </Form>

    </Card>
  );
}