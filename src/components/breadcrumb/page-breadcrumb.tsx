import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "../ui/separator";

interface PageHeaderLayoutProps {
  subPage ?: string;
  currentPage: string;
  parentPage?: string;
}

const PageBreadCrumb: React.FC<PageHeaderLayoutProps> = ({
  currentPage,
  parentPage,
  subPage,
}) => {
  const activeStyle = "font-medium text-primary";
  const inactiveStyle = "text-muted-foreground";

  return (  
    <Breadcrumb className="mt-1 flex text-center">
      <Separator orientation="vertical" className="ml-1 mr-2.5 h-5" />
      <BreadcrumbList className="flex items-center">
        {parentPage && (
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage className={inactiveStyle}>
              {parentPage}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {parentPage && (
          <BreadcrumbSeparator className="hidden md:block" />
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className={subPage ? inactiveStyle : activeStyle}>
            {currentPage}
          </BreadcrumbPage>
        </BreadcrumbItem>
        {subPage && (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className={activeStyle}>
                {subPage}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadCrumb;