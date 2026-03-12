import { Card, Button, message } from "antd";
import api from "../Services/Api";

export default function BackupData() {

  const handleBackup = async () => {

    try {

      const response = await api.get("/backup", {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", "backup.json");

      document.body.appendChild(link);
      link.click();

      message.success("Backup downloaded successfully");

    } catch (error) {

      console.error(error);
      message.error("Backup failed");

    }

  };

  return (

    <div style={{display:"flex",justifyContent:"center",marginTop:150}}>

      <Card
        title="Backup Data"
        style={{width:350,textAlign:"center"}}
      >

        <Button
          type="primary"
          size="large"
          onClick={handleBackup}
          style={{width:"100%"}}
        >
          Backup
        </Button>

      </Card>

    </div>

  );

}