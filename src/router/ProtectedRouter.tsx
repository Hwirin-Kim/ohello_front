import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authorization } from "../service/auth";

export default function ProtectedRouter() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await authorization();
        if (authStatus.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>; // 또는 로딩 스피너 컴포넌트
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
