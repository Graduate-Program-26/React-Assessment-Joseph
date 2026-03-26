import { Outlet } from "react-router-dom";
import { Card, CardBody, CardFooter, CardHeader, Spinner } from "@heroui/react";

import { useAppStore } from "@/store/store";
import { LoginButton } from "@/components/LoginButton";

export default function ProtectedRoute() {
  const isAuthenticated = useAppStore((store) => store.isAuthenticated);
  const isAuthLoading = useAppStore((store) => store.isAuthLoading);

  if (isAuthLoading) return <Spinner />;
  if (!isAuthenticated)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Card>
          <CardHeader>
            <h1 className="text-warning font-bold text-2xl">Unauthorized</h1>
          </CardHeader>
          <CardBody>
            <p>Please Login to continue</p>
          </CardBody>
          <CardFooter className="justify-center">
            <LoginButton />
          </CardFooter>
        </Card>
      </div>
    );

  return <Outlet />;
}
