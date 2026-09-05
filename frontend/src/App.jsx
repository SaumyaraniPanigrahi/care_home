import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import PortalUserSearch from "./pages/PortalUserSearch";
import CareHomeResidents from "./pages/CareHomeResidents";
import ResidentPrescription from "./pages/ResidentPrescription";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />

        <Route path="/portal-users" element={<PortalUserSearch />} />
        <Route
          path="/care-homes/:careHomeId/residents"
          element={<CareHomeResidents />}
        />
        <Route
          path="/residents/:residentId/prescription"
          element={<ResidentPrescription />}
        />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
