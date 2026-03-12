import { Card, Form, Input, Button, Select, DatePicker } from "antd";
import type { FC } from "react";

interface Option {
  value: string;
  label: string;
}

const PaymentPaid: FC = () => {

  const [form] = Form.useForm();

  const bankOptions: Option[] = [
    { value: "PropertyTaxCollection", label: "Property Tax Collection" },
    { value: "WaterTaxCollection", label: "Water Tax Collection" },
    { value: "GeneralCollection", label: "General Collection" },
    { value: "TenderFromFees", label: "Tender From Fees" },
    { value: "EarnestMoneyDeposit", label: "Earnest Money Deposit (EMD)" },
    { value: "StateGovernment", label: "State Government" },
    { value: "CenterGovernment", label: "Center Government" },
    { value: "MLAFunds", label: "MLA Funds" },
    { value: "MPFunds", label: "MP Funds" }
  ];

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 40
      }}
    >

      <Card title="Payment Paid" style={{ width: 600 }}>

        <Form
          form={form}
          layout="vertical"
          initialValues={{ account: "Debit" }}
          onFinish={handleSubmit}
        >

          <Form.Item
            name="bankFrom"
            label="Bank From"
            rules={[{ required: true }]}
          >
            <Select options={bankOptions}/>
          </Form.Item>

          <Form.Item
            name="paymentDeposit"
            label="Payment Deposit"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value:"1", label:"ARPI Group" },
                { value:"2", label:"Contractor 1" },
                { value:"3", label:"Contractor 2" }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width:"100%" }}/>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true }]}
          >
            <Input type="number"/>
          </Form.Item>

          <Form.Item
            name="account"
            label="Account"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="particular"
            label="Particular"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="remark"
            label="Remark"
          >
            <Input.TextArea rows={3}/>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
          >
            Payment Paid
          </Button>

        </Form>

      </Card>

    </div>
  );
};

export default PaymentPaid;