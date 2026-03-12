import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import ProtectedRoute from "./Components/ProtectedRoute";
import Contractors from "./Pages/Contractors";
import Banks from "./Pages/Banks";
import PaymentDeposit from "./Pages/PaymentDeposit";
import PaymentPaid from "./Pages/PaymentPaid";
import TransactionList from "./Pages/TransationList";
import EmployeePage from "./Pages/EmployeePage";
import BackupData from "./Pages/BackupData";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login/>}/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contractors"
          element={
            <ProtectedRoute>
              <Contractors />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/banks"
          element={
            <ProtectedRoute>
              <Banks />
            </ProtectedRoute>
          }
        />

        <Route
  path="/payment-deposit"
  element={
    <ProtectedRoute>
      <PaymentDeposit />
    </ProtectedRoute>
  }
/>

<Route
  path="/payment-paid"
  element={
    <ProtectedRoute>
      <PaymentPaid />
    </ProtectedRoute>
  }
/>
<Route
  path="/transactions"
  element={
    <ProtectedRoute>
      <TransactionList />
    </ProtectedRoute>
  }
/>

<Route
  path="/backup"
  element={
    <ProtectedRoute>
      <BackupData />
    </ProtectedRoute>
  }
/>



<Route path="/employee" element={<ProtectedRoute><EmployeePage /></ProtectedRoute>} />

      </Routes>

    </BrowserRouter>

  )

}

export default App