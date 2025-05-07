import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/front/Home";
import NotFound from "./pages/front/NotFound";
import SignUp from "./pages/front/SignUp";
import SignIn from "./pages/front/SignIn";
import Dashboard from "./pages/admin/Dashboard";
import SingleTicket from "./pages/front/SingleTicket";
import CreateOrder from "./pages/front/CreateOrder";
import CreateTicket from "./pages/admin/CreateTicket";
import ProtectedRoute from "./components/ProtectedRoute";
import ShowOrder from "./pages/front/ShowOrder";
import PaymentSuccess from "./pages/front/PaymentSuccess";
import PaymentCancel from "./pages/front/PaymentCancel";

const App = () => {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/ticket/:id" element={<SingleTicket />} />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/order/:orderId"
            element={
              <ProtectedRoute>
                <CreateOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:orderId"
            element={
              <ProtectedRoute>
                <ShowOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/ticket"
            element={
              <ProtectedRoute>
                <CreateTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/cancel"
            element={
              <ProtectedRoute>
                <PaymentCancel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
