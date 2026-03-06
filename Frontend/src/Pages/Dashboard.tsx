import MainLayout from "../Layout/MainLayout";

export default function Dashboard(){

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return(

    <MainLayout>

      <h1>Dashboard</h1>

      <p>Welcome {user.name}</p>

    </MainLayout>

  )

}