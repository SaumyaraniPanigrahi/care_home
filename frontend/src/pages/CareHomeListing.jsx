import FilterSection from "../components/FilterSection/FilterSection";
import CareHomeTable from "../components/CareHomeTable/CareHomeTable";
import TempHeader from "../components/TempHeader";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader/SubHeader";

export default function CareHomeListing() {
  return (
    <>
      <Header />
      <SubHeader title="Care Home Name" />
      <div className="container-fluid">
        <div className="p-4">
          <FilterSection />
          <CareHomeTable />
        </div>
      </div>
    </>
  );
}
