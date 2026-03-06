import { useEffect, useState } from "react";
import { Card, Table, Button, Input, Modal, Form, message, Popconfirm } from "antd";
import MainLayout from "../Layout/MainLayout";
import api from "../Services/Api";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Contractors(){

  const [contractors,setContractors] = useState<any[]>([]);
  const [loading,setLoading] = useState(false);
  const [search,setSearch] = useState("");
  const [selectedRowKeys,setSelectedRowKeys] = useState<number[]>([]);

  const [currentPage,setCurrentPage] = useState(1);
  const [pageSize,setPageSize] = useState(10);
  const [open,setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingContractor, setEditingContractor] = useState<any>(null);


  const fetchContractors = async () => {

    try{

      setLoading(true);

      const res = await api.get("/contractors");

      setContractors(res.data);

    }catch(err){

      console.error(err);

    }finally{

      setLoading(false);

    }

  };

  useEffect(()=>{
    fetchContractors();
  },[]);


  const filteredContractors = contractors.filter((c:any)=>{

    const name = c.name?.toLowerCase() || "";
    const contact = String(c.contact || "");
    const address = c.address?.toLowerCase() || "";

    const searchText = search.toLowerCase();

    return (
      name.includes(searchText) ||
      contact.includes(searchText) ||
      address.includes(searchText)
    );

  });


  const rowSelection = {
    selectedRowKeys,
    onChange:(keys:any)=>{
      setSelectedRowKeys(keys);
    }
  };

  const handleAddContractor = async () => {

        try {

            const values = await form.validateFields();

            if(editingContractor){

            await api.put(
                `/contractors/${editingContractor.id}`,
                values
            );

            message.success("Contractor updated");

            } else {

            await api.post("/contractors",values);

            message.success("Contractor added");

            }

            setEditingContractor(null);
            form.resetFields();
            setOpen(false);

            fetchContractors();

        } catch(err){

            console.error(err);

        }

    };

    const handleEdit = () => {

        const contractor = contractors.find(
            (c:any) => c.id === selectedRowKeys[0]
        );

        if(!contractor) return;

        setEditingContractor(contractor);

        form.setFieldsValue(contractor);

        setOpen(true);

    };

    const handleDelete = async () => {

        try{

            for(const id of selectedRowKeys){

            await api.delete(`/contractors/${id}`);

            }

            message.success("Contractor deleted");

            setSelectedRowKeys([]);

            fetchContractors();

        }catch(err){

            console.error(err);
            message.error("Delete failed");

        }

    };

    const handleExportExcel = () => {

        const exportData = filteredContractors.map((c:any,index:number)=>({

            "Sr No": index + 1,
            "Contractor Name": c.name,
            "Contact Number": c.contact,
            "Address": c.address,
            "PAN Number": c.pan_number

        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Contractors");

        XLSX.writeFile(workbook, "contractors_list.xlsx");

    };

    const handleExportPDF = () => {

        const doc = new jsPDF();

        const tableColumn = [
            "Sr No",
            "Contractor Name",
            "Contact Number",
            "Address",
            "PAN Number"
        ];

        const tableRows = filteredContractors.map((c:any,index:number)=>[
            index + 1,
            c.name,
            c.contact,
            c.address,
            c.pan_number
        ]);

        doc.text("Contractors List", 14, 15);

        autoTable(doc,{
            head:[tableColumn],
            body:tableRows,
            startY:20
        });

        doc.save("contractors_list.pdf");

    };


  const columns = [

    {
      title:"Sr No",
      width:80,
      render:(_:any,__:any,index:number)=>
        (currentPage-1)*pageSize+index+1
    },

    {
      title:"Contractor Name",
      dataIndex:"name"
    },

    {
      title:"Contact",
      dataIndex:"contact"
    },

    {
      title:"Address",
      dataIndex:"address"
    },

    {
      title:"PAN Number",
      dataIndex:"pan_number"
    }

  ];


  return(

    <MainLayout>

      <Card title="Contractors">

        {/* Toolbar Buttons */}

        <div
          style={{
            display:"flex",
            gap:10,
            marginBottom:20
          }}
        >

          <Button type="primary" onClick={()=>setOpen(true)}>
            Add
          </Button>

          <Button disabled={selectedRowKeys.length !== 1} onClick={() => handleEdit()}>
            Edit
          </Button>

          <Popconfirm
            title="Delete Contractors"
            description="Are you sure you want to delete selected contractors?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
            >

            <Button
            danger
            disabled={selectedRowKeys.length === 0}
            >
            Delete
            </Button>

          </Popconfirm>

          <Button onClick={handleExportExcel}>
            Export Excel
          </Button>

          <Button onClick={handleExportPDF}>
            Export PDF
          </Button>

        </div>


        {/* Search */}

        <Input.Search
          placeholder="Search contractors..."
          style={{ width:300, marginBottom:20 }}
          onChange={(e)=>setSearch(e.target.value)}
        />


        {/* Total Records */}

        <div style={{ marginBottom:10 }}>
          Total Contractors: {filteredContractors.length}
        </div>


        {/* Table */}

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredContractors}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger:true,
            pageSizeOptions:["5","10","20","50"],
            position:["bottomCenter"]
          }}
          onChange={(pagination)=>{
            setCurrentPage(pagination.current || 1);
            setPageSize(pagination.pageSize || 10);
          }}
        />

        <Modal
            title={editingContractor ? "Edit Contractor" : "Add Contractor"}
            open={open}
            onOk={handleAddContractor}
            onCancel={()=>{
                setOpen(false);
                setEditingContractor(null);
                form.resetFields();
            }}
            >

            <Form form={form} layout="vertical">

            <Form.Item
                name="name"
                label="Contractor Name"
                rules={[{required:true,message:"Enter contractor name"}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="contact"
                label="Contact Number"
                rules={[
                {required:true,message:"Enter contact number"},
                {pattern:/^[0-9]{10}$/,message:"Enter valid 10 digit number"}
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="address"
                label="Address"
                rules={[{required:true,message:"Enter address"}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="pan_number"
                label="PAN Number"
                extra="Format: ABCDE1234F"
                rules={[
                {required:true,message:"Enter PAN number"},
                {pattern:/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,message:"Invalid PAN format (Example: ABCDE1234F)"}
                ]}
            >
                <Input
                    maxLength={10}
                    onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        form.setFieldsValue({ pan_number: value });
                    }}
                />
            </Form.Item>

            </Form>

            </Modal>

      </Card>

    </MainLayout>

  )

}