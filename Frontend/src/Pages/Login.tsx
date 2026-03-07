import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../Services/Api";


export default function Login() {

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const values = await form.validateFields();

      const res = await api.post("/auth/login", values);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      message.success("Login successful");

      navigate("/dashboard");

    } catch (error:any) {

      message.error("Invalid username or password");
      form.resetFields();
    }

  };

  return (

    <div
      style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#e6eef8,#f6f8fb)"
    }}
    >

      <Card style={{
        width: 420,
        borderRadius: 10
      }}>

        <div style={{ textAlign: "center", marginBottom: 20 }}>

          <h1
            style={{
              color: "#d64b1f",
              fontWeight: 700,
              fontSize: 36,
              margin: 0
            }}
          >
            नगर परिषद नशिराबाद
          </h1>

          <div
            style={{
              color: "#5a2d1a",
              fontSize: 22,
              marginTop: 4
            }}
          >
            लेखा विभाग
          </div>

        </div>

        <Form form={form} layout="vertical" onFinish={handleLogin}>

          <Form.Item
            name="username"
            label="User Name"
            rules={[{ required: true, message: "Enter username" }]}
          >
            <Input placeholder="Enter username"/>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password placeholder="Enter password"/>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>

        </Form>

      </Card>

    </div>

  );
}