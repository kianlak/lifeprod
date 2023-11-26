import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = (): ReactElement => {
  const navigate = useNavigate();

  const handleDashboardRedirect = (): void => {
    navigate("/login");
  };

  return (
    <>
      <a href="/login">LOL</a>
    </>
  );
};