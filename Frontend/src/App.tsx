import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import ProtectedRoute from "./Components/ProtectedRoute";
import Contractors from "./Pages/Contractors";
import Banks from "./Pages/Banks";
import PaymentCredit from "./Pages/PaymentCredit";
import PaymentDebit from "./Pages/PaymentDebit";
import MainLayout from "./Layout/MainLayout";
import PaymentList from "./Pages/PaymentList";

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
          path="/payment-credit"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PaymentCredit />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-debit"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PaymentDebit />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PaymentList />
              </MainLayout>
            </ProtectedRoute>
          }
        />


      </Routes>

    </BrowserRouter>

  )

}

export default App