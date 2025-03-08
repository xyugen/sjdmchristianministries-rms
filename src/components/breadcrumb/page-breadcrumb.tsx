import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbLayoutProps {
  currentPage: string;
  parentPage?: string;
}

const BreadcrumbLayout: React.FC<BreadcrumbLayoutProps> = ({
  currentPage,
  parentPage,
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center">
        {parentPage && (
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage className="text-muted-foreground">
              {parentPage}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {parentPage && (
          <BreadcrumbSeparator className="hidden md:block" />
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbLayout;