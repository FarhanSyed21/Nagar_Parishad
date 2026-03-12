// import React, { useState } from "react";
// import { Card, Form, Input, Button, Table, Space, message } from "antd";
// import type { ColumnsType } from "antd/es/table";

// interface Employee {
//   key: string;
//   name: string;
//   contact: string;
//   designation: string;
//   email: string;
//   aadhaar: string;
//   pan: string;
//   salary: string;
//   bankAccount: string;
//   ifsc: string;
//   bankName: string;
// }

// const EmployeePage: React.FC = () => {
//   const [form] = Form.useForm();
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [editingKey, setEditingKey] = useState<string | null>(null);

//   // Add or update employee
//   const onFinish = (values: any) => {
//     if (editingKey) {
//       // Update existing
//       setEmployees((prev) =>
//         prev.map((emp) =>
//           emp.key === editingKey ? { ...values, key: editingKey } : emp
//         )
//       );
//       message.success("Employee updated");
//       setEditingKey(null);
//     } else {
//       // Add new
//       const newEmp = { ...values, key: Date.now().toString() };
//       setEmployees((prev) => [...prev, newEmp]);
//       message.success("Employee added");
//     }
//     form.resetFields();
//   };

//   // Edit employee
//   const onEdit = (record: Employee) => {
//     form.setFieldsValue(record);
//     setEditingKey(record.key);
//   };

//   // Delete employee
//   const onDelete = (key: string) => {
//     setEmployees((prev) => prev.filter((emp) => emp.key !== key));
//     if (editingKey === key) {
//       form.resetFields();
//       setEditingKey(null);
//     }
//     message.success("Employee deleted");
//   };

//   // Cancel editing
//   const onCancel = () => {
//     form.resetFields();
//     setEditingKey(null);
//   };

//   const columns: ColumnsType<Employee> = [
//     { title: "Employee Name", dataIndex: "name", key: "name" },
//     { title: "Designation", dataIndex: "designation", key: "designation" },

//     { title: "Contact Mo.", dataIndex: "contact", key: "contact" },
//     { title: "Email ID", dataIndex: "email", key: "email" },
//     { title: "Aadhaar No.", dataIndex: "aadhaar", key: "aadhaar" },
//     { title: "PAN No.", dataIndex: "pan", key: "pan" },
//     { title: "Salary Amount", dataIndex: "salary", key: "salary" },
//     { title: "Bank Account", dataIndex: "bankAccount", key: "bankAccount" },
//     { title: "IFSC Code", dataIndex: "ifsc", key: "ifsc" },
//     { title: "Bank Name", dataIndex: "bankName", key: "bankName" },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Space>
//           <Button type="link" onClick={() => onEdit(record)}>
//             Edit
//           </Button>
//           <Button danger type="link" onClick={() => onDelete(record.key)}>
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Card title="Employee Management" style={{ maxWidth: 900, margin: "auto", marginTop: 20 }}>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         autoComplete="off"
//       >
//         <Form.Item
//           name="name"
//           label="Employee Name"
//           rules={[{ required: true, message: "Please enter employee name" }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="contact"
//           label="Contact Mo."
//           rules={[
//             { required: true, message: "Please enter contact number" },
//             { pattern: /^[0-9]{10}$/, message: "Enter valid 10 digit number" },
//           ]}
//         >
//           <Input maxLength={10} />
//         </Form.Item>

//         <Form.Item
//           name="designation"
//           label="Designation"
//           rules={[{ required: true, message: "Please enter designation" }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="email"
//           label="Email ID"
//           rules={[
//             { required: true, message: "Please enter email" },
//             { type: "email", message: "Enter valid email address" },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="aadhaar"
//           label="Aadhaar Card No."
//           rules={[
//             { required: true, message: "Please enter Aadhaar number" },
//             { pattern: /^[0-9]{12}$/, message: "Enter valid 12 digit Aadhaar" },
//           ]}
//         >
//           <Input maxLength={12} />
//         </Form.Item>

//         <Form.Item
//           name="pan"
//           label="PAN No."
//           rules={[
//             // { required: true, message: "Please enter PAN number" },
//             { pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: "Enter valid PAN No." },
//           ]}
//         >
//           <Input maxLength={10} style={{ textTransform: "uppercase" }} />
//         </Form.Item>

//         <Form.Item
//           name="salary"
//           label="Salary Amount"
//           rules={[{ required: true, message: "Please enter salary amount" }]}
//         >
//           <Input type="number" min={0} />
//         </Form.Item>

//         <Form.Item
//           name="bankAccount"
//           label="Bank Account"
//           rules={[
//             // { required: true, message: "Please enter bank account number" },
//             { pattern: /^[0-9]{9,18}$/, message: "Enter valid bank account number" },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="ifsc"
//           label="IFSC Code"
//           rules={[
//             // { required: true, message: "Please enter IFSC code" },
//             { pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: "Enter valid IFSC code" },
//           ]}
//         >
//           <Input style={{ textTransform: "uppercase" }} maxLength={11} />
//         </Form.Item>

//         <Form.Item
//           name="bankName"
//           label="Bank Name"
//         //   rules={[{ required: true, message: "Please enter bank name" }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item>
//           <Space>
//             <Button type="primary" htmlType="submit">
//               {editingKey ? "Update Employee" : "Add Employee"}
//             </Button>

//             {editingKey && (
//               <Button onClick={onCancel}>
//                 Cancel
//               </Button>
//             )}
//           </Space>
//         </Form.Item>
//       </Form>

//       <Table
//         columns={columns}
//         dataSource={employees}
//         rowKey="key"
//         pagination={{ pageSize: 5 }}
//       />
//     </Card>
//   );
// };

// export default EmployeePage;


import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
  Card
} from "antd";
import api from "../Services/Api";
import MainLayout from "../Layout/MainLayout";

export default function Employees() {

  const [employees, setEmployees] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  /* FETCH EMPLOYEES */

  const fetchEmployees = async () => {

    try {

      setLoading(true);

      const res = await api.get("/employees");

      setEmployees(res.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchEmployees();

  }, []);

  /* ADD / UPDATE */

  const handleAddEmployee = async () => {

    const values = await form.validateFields();

    try {

      if (editingEmployee) {

        await api.put(`/employees/${editingEmployee.id}`, values);

        message.success("Employee updated");

      } else {

        await api.post("/employees", values);

        message.success("Employee added");

      }

      setEditingEmployee(null);
      form.resetFields();
      setOpen(false);

      fetchEmployees();

    } catch (error) {

      message.error("Operation failed");

    }

  };

  /* EDIT */

  const handleEdit = (employee: any) => {

    setEditingEmployee(employee);

    form.setFieldsValue(employee);

    setOpen(true);

  };

  /* DELETE */

  const handleDelete = async (id: number) => {

    try {

      await api.delete(`/employees/${id}`);

      message.success("Employee deleted successfully");

      fetchEmployees();

    } catch (err) {

      message.error("Failed to delete employee");

    }

  };

  /* TABLE COLUMNS */

  const columns = [

    {
      title: "Sr No",
      render: (_: any, __: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1
    },

    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },

    {
      title: "Contact",
      dataIndex: "contact"
    },

    {
      title: "Designation",
      dataIndex: "designation"
    },

    {
      title: "Email",
      dataIndex: "email"
    },

    {
      title: "Salary",
      dataIndex: "salary"
    },

    {
      title: "Actions",
      render: (record: any) => (
        <>
          <Button
            type="link"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete Employee"
            description="Are you sure you want to delete this employee?"
            onConfirm={() => handleDelete(record.id)}
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

  ];

  /* SEARCH */

  const filteredEmployees = employees.filter((emp: any) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.contact.includes(search) ||
    emp.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <MainLayout>

      <Card
        title="Employees"
        style={{ marginTop: 20 }}
      >

        <Input.Search
          placeholder="Search employees by name, contact or designation..."
          style={{ width: 400, marginBottom: 20, paddingRight: 10 }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          type="primary"
          onClick={() => setOpen(true)}
          style={{ marginBottom: 20 }}
        >
          Add Employee
        </Button>

        <div style={{ marginBottom: 10 }}>
          Total Employees: {filteredEmployees.length}
        </div>

        <Table
          columns={columns}
          dataSource={filteredEmployees}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            position: ["bottomCenter"]
          }}
          onChange={(pagination) => {
            setCurrentPage(pagination.current || 1);
            setPageSize(pagination.pageSize || 10);
          }}
        />

        <Modal
          title={editingEmployee ? "Edit Employee" : "Add Employee"}
          open={open}
          onOk={handleAddEmployee}
          onCancel={() => {
            setOpen(false);
            setEditingEmployee(null);
            form.resetFields();
          }}
        >

          <Form form={form} layout="vertical">

            <Form.Item
              name="name"
              label="Employee Name"
              rules={[{ required: true, message: "Employee name required" }]}
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
              name="designation"
              label="Designation"
              rules={[{ required: true, message: "Designation required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ type: "email", message: "Enter valid email" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="salary"
              label="Salary"
              rules={[{ required: true, message: "Salary required" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="bankAccount"
              label="Bank Account"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="ifsc"
              label="IFSC Code"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="bankName"
              label="Bank Name"
            >
              <Input />
            </Form.Item>

          </Form>

        </Modal>

      </Card>

    </MainLayout>

  );

}