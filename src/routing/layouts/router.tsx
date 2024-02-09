import { Navigate } from "react-router";
import AuthGuard from "../guard/AuthGuard";
import { APPOINTMENT_PATH, AUTH_ROUTE_PATH, DOCTOR_PATH, REGISTER_PATH } from "./constants";
import LoginPage from "../../pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import Registration from "../../pages/Registration";
import Doctors from "../../pages/DoctorPage";
import Appointment from "../../pages/AppointmentPage";

const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthGuard children={<Navigate to={DOCTOR_PATH} />} />
    },
    {
      path: AUTH_ROUTE_PATH,
      element: <LoginPage />,
    },
    {
      path: REGISTER_PATH,
      element: <Registration />,
    },
  
    {
      element: <AuthGuard children={<Doctors />} />,
      path: DOCTOR_PATH
    },
  
    {
      path: APPOINTMENT_PATH,
      element: <Appointment doctor={Doctors} />,
    },
  ]);
  
  export default router;

