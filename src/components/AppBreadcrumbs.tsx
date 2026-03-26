import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { useLocation, Link } from "react-router-dom";

export default function AppBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  if (location.pathname === "/") {
    return null;
  }

  return (
    <Breadcrumbs
      className="bg-linear-to-r from-violet-600 via-cyan-400 to-pink-400 w-fit rounded-xl mb-4 p-0.5"
      underline="active"
      variant="solid"
    >
      <BreadcrumbItem>
        <Link to="/">Home</Link>
      </BreadcrumbItem>
      {pathnames.map((segment, index) => {
        const path = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLastPath = index === pathnames.length - 1;

        return (
          <BreadcrumbItem key={path} isCurrent={isLastPath}>
            {isLastPath ? segment : <Link to={path}>{segment}</Link>}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}
