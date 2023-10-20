import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import CompanyAds from "./Company/Ads";
import CompanyInfo from "./Company/Info";
import CompanySettings from "./Company/Settings";

const CompanyTab = () => {
  const [activeCompanyTab, setActiveCompanyTab] = useState("info");
  const companyTabRenderers = {
    info: CompanyInfo,
    ads: CompanyAds,
    settings: CompanySettings,
  };
  
  const { user } = useAuth();
  
  const TabButton = ({ tab }) => (
    <button
      className={`py-2 px-4 ${activeCompanyTab === tab ? "border-b-2 border-blue-500" : ""}`}
      onClick={() => setActiveCompanyTab(tab)}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
    </button>
  );

  const ActiveComponent = companyTabRenderers[activeCompanyTab];

  return (
    <>
      <div className="flex border-b">
        {Object.keys(companyTabRenderers).map(
          (tab) =>
            (user.company || (tab !== "ads" && tab !== "settings")) && (
              <TabButton key={tab} tab={tab} />
            )
        )}
      </div>
      <div className="p-4">
        {ActiveComponent ? <ActiveComponent user={user} company={user.company} /> : <p>Pas d'onglet sélectionné.</p>}
      </div>
    </>
  );
};

export default CompanyTab;
