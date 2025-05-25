import PageBreadCrumb from "@/components/breadcrumb/page-breadcrumb";
import FormHeader from "./_components/form/form-header";
import MeetingAgendasForm from "./_components/form/meeting-agendas-form";

const Page = () => {
  return (
    <div className="w-full">
      <PageBreadCrumb
        subPage="Create"
        currentPage="Legal Documents"
        parentPage="Administrative "
      />

      <FormHeader />
      <MeetingAgendasForm />
    </div>
  );
};

export default Page;
