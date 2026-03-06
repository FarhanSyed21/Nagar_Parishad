import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message, Card } from "antd";
import api from "../Services/Api";
import MainLayout from "../Layout/MainLayout";


export default function Users(){

  const [users,setUsers] = useState([]);
  const [open,setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingUser,setEditingUser] = useState<any>(null);
  const [currentPage,setCurrentPage] = useState(1);
  const [pageSize,setPageSize] = useState(10);
  const [search,setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const res = await api.get("/users");

      setUsers(res.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  useEffect(()=>{
    fetchUsers();
  },[])

  const handleAddUser = async () => {

    const values = await form.validateFields();

    if(editingUser){

      delete values.password;

      await api.put(`/users/${editingUser.id}`,values);

    } else {

      await api.post("/users",values);

    }

    setEditingUser(null);
    form.resetFields();
    setOpen(false);

    fetchUsers();

  };

  const handleEdit = (user:any) => {

    setEditingUser(user);

    form.setFieldsValue({
      ...user,
      password: "********"
    });

    setOpen(true);

  };

  const handleDelete = async (id:number) => {

    try{

      await api.delete(`/users/${id}`);

      message.success("User deleted successfully");

      fetchUsers();

    }catch(err){

      message.error("Failed to delete user");

    }

  };

  const columns = [
    {
      title: "Sr No",
      render: (_:any, __:any, index:number) => 
        (currentPage - 1) * pageSize + index + 1
    },
    
    {
      title:"Name",
      dataIndex:"name",
      sorter:(a:any,b:any)=>a.name.localeCompare(b.name)
    },

    {
      title:"Contact",
      dataIndex:"contact"
    },

    {
      title:"Username",
      dataIndex:"username",
      sorter:(a:any,b:any)=>a.username.localeCompare(b.username)
    },

    {
      title:"Role",
      dataIndex:"role"
    },


    {
      title:"Actions",
      render:(record:any)=>(
        <>
          <Button
            type="link"
            onClick={()=>handleEdit(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete User"
            description="Are you sure you want to delete this user?"
            onConfirm={()=>handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              type="link"
            >
              Delete
            </Button>
          </Popconfirm>
        </>
      )
    }

  ]

  const filteredUsers = users.filter((user:any)=>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.contact.includes(search)
  );

  return(
    
    <MainLayout>

      <Card
        title="Users"
        style={{ marginTop: 20 }}
      >

        <Input.Search
          placeholder="Search users by name, username or contact..."
          style={{ width: 400, marginBottom: 20, paddingRight: 10 }}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <Button
          type="primary"
          onClick={()=>setOpen(true)}
          style={{ marginBottom:20 }}
        >
          Add User
        </Button>

        <div style={{ marginBottom:10 }}>
          Total Users: {filteredUsers.length}
        </div>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            pageSizeOptions:["5","10","20","50"],
            position: ["bottomCenter"]
          }}
          onChange={(pagination)=>{
            setCurrentPage(pagination.current || 1);
            setPageSize(pagination.pageSize || 10);
          }}
        />

        <Modal
          title="Add User"
          open={open}
          onOk={handleAddUser}
          onCancel={()=>setOpen(false)}
        >

          <Form form={form} layout="vertical">

            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Name is required" },
                { min: 3, message: "Name must be at least 3 characters" }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="contact"
              label="Contact Number"
              rules={[
                { required: true, message: "Contact number required" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Enter valid 10 digit number"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Username required" },
                { min: 4, message: "Username must be at least 4 characters" }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Password required" },
                { min: 5, message: "Password must be at least 5 characters" }
              ]}
            >
              <Input.Password 
                placeholder="********"
                disabled={editingUser !== null}
              />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{required:true, message: "Select role" }]}
            >

              <Select
                options={[
                  {value:"MasterAdmin",label:"Master Admin"},
                  {value:"BillCollector",label:"Bill Collector"},
                  {value:"DataEntryOperator",label:"Data Entry Operator"},
                  {value:"Staff",label:"Staff"},
                  {value:"TaxOfficer",label:"Tax Officer"},
                  {value:"ChiefOfficer",label:"Chief Officer"}
                ]}
              />

            </Form.Item>

          </Form>

        </Modal>
      </Card>

    </MainLayout>

  )

}