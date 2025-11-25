import { useRef, useState } from 'react'
import Wizard from '../../../components/createNewsWizard'
import NewsDetails from '../../../components/createNewsWizard'


const WizardVertical = () => {

  const ref = useRef(null)

  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'account-details',
      title: 'Account Details',
      subtitle: 'Enter Your Account Details.',
      content: <NewsDetails stepper={stepper} type='wizard-vertical' />
    },
  ]

  return (
    <div className='vertical-wizard'>
      <Wizard
        type='vertical'
        ref={ref}
        steps={steps}
        options={{
          linear: false
        }}
        instance={el => setStepper(el)}
      />
    </div>
  )
}

export default WizardVertical
