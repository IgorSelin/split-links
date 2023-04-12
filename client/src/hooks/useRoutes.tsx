import { Navigate, Route, Routes } from "react-router-dom";

import { AuthPage } from "../pages/AuthPage";
import { CreateLinkPage } from "../pages/CreateLinkPage";
import { LinksDetailsPage } from "../pages/LinksDetailsPage";
import { LinksPage } from "../pages/LinksPage";

export const useRoutes = (isLogged: boolean) => {
  if (isLogged) {
    return (
      <Routes>
        <Route element={<CreateLinkPage />} path="/create" />
        <Route element={<LinksDetailsPage />} path="/details/:id" />
        <Route element={<LinksPage />} path="/links" />
        <Route path="*" element={<Navigate to="/create" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route element={<AuthPage />} path="/" />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
