import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

export default function MainLayout({ children }: any) {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const items = [

    {
      label: "Master",
      key: "master",
      children: [
        { label: "Users", key: "/users" },
        { label: "Settings", key: "/settings" },
        { label: "Backup", key: "/backup" },
        { label: "Bank Accounts", key: "/banks" },
        { label: "Contractors", key: "/contractors" }
      ]
    },

    {
      label: "Transaction",
      key: "transaction",
      children: [
        { label: "Payment Credit", key: "/payment-credit" },
        { label: "Payment Debit", key: "/payment-debit" },
        { label: "Payment List", key: "/payments" }
      ]
    },

    {
      label: "Report",
      key: "report",
      children: [
        { label: "Reports", key: "/reports" },
        { label: "Profit & Loss", key: "/profit-loss" },
        { label: "Contractor Wise", key: "/contractor-wise" },
        { label: "Bank Account Wise", key: "/bank-wise" }
      ]
    },

    {
      label: "Help",
      key: "/help"
    }

  ];

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/", { replace: true });

  };

  return (

    <Layout style={{ minHeight: "100vh", width: "100%" }}>

      <Header style={{ display:"flex", alignItems:"center", justifyContent: "space-between" }}>

        <div style={{
          color:"white",
          fontWeight:"bold",
          marginRight:"30px"
        }}>
          Nagar Parishad
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          onClick={(e)=>navigate(e.key)}
          style={{ flex: 1 }}
        />


        <div style={{ color:"white" }}>

          Welcome {user.name}

          <Button
            type="primary" danger
            style={{ marginLeft: 15 }}
            onClick={handleLogout}
          >
            Logout
          </Button>

        </div>

      </Header>

      <Content style={{ padding:"30px", width: "100%" }}>
        {children}
      </Content>

    </Layout>

  );

}