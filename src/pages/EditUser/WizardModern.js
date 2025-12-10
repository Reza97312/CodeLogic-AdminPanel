import { useRef, useState } from "react";
import Wizard from "@components/wizard";
import Address from "./steps-with-validation/Address";
import GenderInformation from "./steps-with-validation/GenderInformation";
import PersonalInfo from "./steps-with-validation/PersonalInfo";
import Security from "./steps-with-validation/Security";
import Access from "./steps-with-validation/Access";
import Preview from "./steps-with-validation/Preview";

const WizardModern = ({ initialData, allRoles }) => {
  const ref = useRef(null);

  const [stepper, setStepper] = useState(null);
  const [payload, setPayload] = useState({});
  const handlePayload = (vals) => setPayload((prev) => ({ ...prev, ...vals }));
  const steps = [
    {
      id: "Security",
      title: "اطلاعات امنیتی",
      subtitle: "اطلاعات خود را وارد کنید",
      icon: 1,
      content: (
        <Security
          stepper={stepper}
          type="wizard-modern"
          initialData={initialData}
          handlePayload={handlePayload}
        />
      ),
    },
    {
      id: "personal-info",
      title: "اطلاعات هویتی",
      subtitle: "اطلاعات هویتی را وارد کنید",
      icon: 2,
      content: (
        <PersonalInfo
          stepper={stepper}
          type="wizard-modern"
          initialData={initialData}
          handlePayload={handlePayload}
        />
      ),
    },
    {
      id: "step-address",
      title: "اطلاعات محل سکونت",
      subtitle: " اطلاعات محل سکونت را وارد کنید",
      icon: 3,
      content: (
        <Address
          stepper={stepper}
          type="wizard-modern"
          initialData={initialData}
          handlePayload={handlePayload}
        />
      ),
    },
    {
      id: "GenderInformation",
      title: " اطلاعات جنسیتی و لینک",
      subtitle: "اطلاعات کلی را وارد کنید",
      icon: 4,
      content: (
        <GenderInformation
          stepper={stepper}
          type="wizard-modern"
          initialData={initialData}
          handlePayload={handlePayload}
        />
      ),
    },
    {
      id: "access",
      title: "دسترسی ها",
      subtitle: "اطلاعات دسترسی را وارد کنید",
      icon: 5,
      content: (
        <Access
          stepper={stepper}
          type="wizard-modern"
          initialData={initialData}
          allRoles={allRoles}
          handlePayload={handlePayload}
        />
      ),
    },
    {
      id: "Preview",
      title: "پیش نمایش اطلاعات کاربر",
      subtitle: "اطلاعات کاربر",
      icon: 6,
      content: (
        <Preview
          stepper={stepper}
          type="wizard-modern"
          initialData={initialData}
          payload={payload}
        />
      ),
    },
  ];

  return (
    <div className="modern-horizontal-wizard ">
      <Wizard
        type="modern-vertical"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default WizardModern;
