import { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import NewsDetails from './steps/CreateNewsForm'
import {FileText} from 'react-feather'


const WizardModernVertical = () => {

  const ref = useRef(null)

  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'create-news',
      title: 'ساخت خبر',
      subtitle: 'جزئیات خبر را وارد کنید',
      icon: <FileText size={18} />,
      content: <NewsDetails stepper={stepper} type='modern-vertical' />
    }
  ]

  return (
    <div className='modern-vertical-wizard'>
      <Wizard
        type='modern-vertical'
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

export default WizardModernVertical
