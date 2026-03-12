import { Card, Form, Input, Button, Select, DatePicker } from "antd";
import type { FC } from "react";

interface BankOption {
  value: string;
  label: string;
}

const PaymentDeposit: FC = () => {

  const [form] = Form.useForm();

  const bankOptions: BankOption[] = [
    { value: "PropertyTaxCollection", label: "Property Tax Collection" },
    { value: "WaterTaxCollection", label: "Water Tax Collection" },
    { value: "GeneralCollection", label: "General Collection" },
    { value: "TenderFromFees", label: "Tender From Fees" },
    { value: "EarnestMoneyDeposit(EMD)", label: "Earnest Money Deposit (EMD)" },
    { value: "StateGovernment", label: "State Government" },
    { value: "CenterGovernment", label: "Center Government" },
    { value: "MLAFunds", label: "MLAFunds" },
    { value: "MPFunds", label: "MP Funds" },
  ];

  const accountOptions: BankOption[] = [
    { value: "Credit", label: "Credit" },
    { value: "Debit", label: "Debit" }
  ];

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >

      <Card title="Payment Received" style={{ width: 600 }}>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >

          <Form.Item name="bankFrom" label="Bank From" rules={[{ required: true }]}>
            <Select options={bankOptions} />
          </Form.Item>

          <Form.Item name="paymentDeposit" label="Payment Deposit" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "1", label: "User 1" },
                { value: "2", label: "User 2" }
              ]}
            />
          </Form.Item>

          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>

  <Form.Item
  name="account"
  label="Account"
  initialValue="Credit"
>
  <Input disabled />
</Form.Item>

          <Form.Item name="particular" label="Particular">
            <Input />
          </Form.Item>

          <Form.Item name="remark" label="Remark">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Payment Deposit to Account
          </Button>

        </Form>

      </Card>

    </div>
  );
};

export default PaymentDeposit;