// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
// import Address from "./steps/Address";
// import SocialLinks from "./steps/SocialLinks";
// import PersonalInfo from "./steps/PersonalInfo";
// import AccountDetails from "./steps/AccountDetails";
import CreateCourseStep1 from "./steps.js/StepOne";

const CreateCourseWizard = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "stepOne",
      title: "مشخصات دوره مرحله اول",
      subtitle: "لطفا فیلد های این مرحله را پر کنید",
      content: <CreateCourseStep1 stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "stepTwo",
      title: "مشخصات دوره مرحله دوم",
      subtitle: "لطفا فیلد های این مرحله را پر کنید",
      //   content: <PersonalInfo stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "stepThree",
      title: "مشخصات دوره مرحله سوم",
      subtitle: "لطفا فیلد های این مرحله را پر کنید",
      //   content: <Address stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "image",
      title: "افرودن تصویر",
      subtitle: "لطفا برای دوره عکس انتخاب کنید",
      //   content: <SocialLinks stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "text",
      title: "افرودن متن",
      subtitle: "لطفا متن دوره را وارد کنید",
      //   content: <SocialLinks stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "technology",
      title: "افرودن تکنولوژِی",
      subtitle: "لطفا تکنولوژِی دوره را وارد کنید",
      //   content: <SocialLinks stepper={stepper} type="wizard-vertical" />,
    },
  ];

  return (
    <div className="vertical-wizard">
      <Wizard
        type="vertical"
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

export default CreateCourseWizard;
