import { Fragment } from 'react'
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import { createNews } from '../../../../core/services/api/post/createNews'
import { toast } from 'react-toastify'
import { Formik } from 'formik'
import * as yup from 'yup'


const validationSchema = yup.object({
  title: yup.string().min(3, 'عنوان باید حداقل ۳ کاراکتر باشد').max(100, 'عنوان نمی‌تواند بیش از ۱۰۰ کاراکتر باشد').required('عنوان الزامی است'),
  googleTitle: yup.string().min(3, 'عنوان گوگل باید حداقل ۳ کاراکتر باشد').max(100, 'عنوان گوگل نمی‌تواند بیش از ۱۰۰ کاراکتر باشد').required('عنوان گوگل الزامی است'),
  googleDescribe: yup.string().min(10, 'توضیحات گوگل باید حداقل ۱۰ کاراکتر باشد').max(160, 'توضیحات گوگل نمی‌تواند بیش از ۱۶۰ کاراکتر باشد').required('توضیحات گوگل الزامی است'),
  miniDescribe: yup.string().min(10, 'توضیحات کوتاه باید حداقل ۱۰ کاراکتر باشد').max(200, 'توضیحات کوتاه نمی‌تواند بیش از ۲۰۰ کاراکتر باشد').required('توضیحات کوتاه الزامی است'),
  describe: yup.string().min(20, 'توضیحات باید حداقل ۲۰ کاراکتر باشد').max(2000, 'توضیحات نمی‌تواند بیش از ۲۰۰۰ کاراکتر باشد').required('توضیحات الزامی است'),
  categoryId: yup.number().required('آیدی دسته بندی الزامی است').typeError('آیدی دسته بندی باید عدد باشد')
});



const NewsDetails = ({ stepper, type }) => {

  const onSubmit = async (values, { resetForm }) => {
    await createNews(values.title, values.googleTitle, values.googleDescribe, values.miniDescribe, values.describe, values.categoryId,
    values.image)
    resetForm()
    toast.success('خبر با موفقیت ساخته شد')
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>ساخت خبر جدید</h5>
        <small className='text-muted'>جزئیات خبر را وارد کنید</small>
      </div>
      <Formik 
      onSubmit={onSubmit}
      initialValues={{title: '', googleTitle: '', googleDescribe: '', miniDescribe: '', describe: '', categoryId: '',
      image: ''}}
      validationSchema={validationSchema}>
        {({values, handleChange, handleSubmit, setFieldValue, handleBlur, errors, touched}) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label' for={`username-${type}`}>
                  عنوان
                </Label>
                <Input 
                className='mt-1 mb-1'
                value={values.title} 
                onChange={handleChange}  
                onBlur={handleBlur}
                type='text' 
                name='title' id={`username-${type}`} placeholder='عنوان را وارد کنید' />
                {touched.title && errors.title && <div className='text-danger'>{errors.title}</div>}
              </Col>
            </Row>
            <Row>
              <div className='form-password-toggle col-md-6 mb-1'>
                <Label className='form-label' for={`password-${type}`}>
                  عنوان گوگل
                </Label>
                <Input 
                className='mt-1 mb-1'
                value={values.googleTitle} 
                onChange={handleChange}  
                onBlur={handleBlur}
                type='text' 
                name='googleTitle' id={`password-${type}`} placeholder='عنوان گوگل را وارد کنید'/>
                {touched.googleTitle && errors.googleTitle && <div className='text-danger'>{errors.googleTitle}</div>}
              </div>
              <div className='form-password-toggle col-md-6 mb-1'>
                <Label className='form-label' for={`confirm-password-${type}`}>
                  توضیحات گوگل
                </Label>
                <Input 
                className='mt-1 mb-1'
                value={values.googleDescribe} 
                onChange={handleChange}  
                onBlur={handleBlur}
                type='text' 
                name='googleDescribe' id={`confirm-password-${type}`} placeholder='توضیحات گوگل را وارد کنید'/>
                {touched.googleDescribe && errors.googleDescribe && <div className='text-danger'>{errors.googleDescribe}</div>}
              </div>
            </Row>
            <Row>
              <div className='form-password-toggle col-md-6 mb-1'>
                <Label className='form-label' for={`password-${type}`}>
                  توضیحات کوتاه
                </Label>
                <Input 
                className='mt-1 mb-1'
                value={values.miniDescribe} 
                onChange={handleChange}  
                onBlur={handleBlur}
                type='text' 
                name='miniDescribe' id={`password-${type}`} placeholder='توضیحات کوتاه را وارد کنید'/>
                {touched.miniDescribe && errors.miniDescribe && <div className='text-danger'>{errors.miniDescribe}</div>}
              </div>
              <div className='form-password-toggle col-md-6 mb-1'>
                <Label className='form-label' for={`confirm-password-${type}`}>
                  توضیحات
                </Label>
                <Input 
                className='mt-1 mb-1'
                value={values.describe} 
                onChange={handleChange}  
                onBlur={handleBlur}
                type='text' 
                name='describe' id={`confirm-password-${type}`} placeholder='توضیحات را وارد کنید'/>
                {touched.describe && errors.describe && <div className='text-danger'>{errors.describe}</div>}
              </div>
            </Row>
            <Row>
              <div className='form-password-toggle col-md-6 mb-1'>
                <Label className='form-label' for={`password-${type}`}>
                  آیدی دسته بندی
                </Label>
                <Input 
                className='mt-1 mb-1'
                value={values.categoryId} 
                onChange={handleChange}  
                onBlur={handleBlur}
                type='number' name='categoryId' id={`password-${type}`} placeholder='آیدی دسته بندی را وارد کنید'/>
                {touched.categoryId && errors.categoryId && <div className='text-danger'>{errors.categoryId}</div>}
              </div>
              <div className='form-password-toggle col-md-6 mb-1'>
                <Label className='form-label' for={`confirm-password-${type}`}>
                  تصویر
                </Label>
                <Input 
                className='mt-1 mb-1' 
                onChange={e => setFieldValue('image', e.target.files[0])}
                type='file' 
                name='image' id={`confirm-password-${type}`}/>
              </div>
            </Row>
            <div className='d-flex justify-content-end'>
              <Button type='submit' color='primary' className='btn-next'>
                <span className='align-middle d-sm-inline-block d-none'>ثبت</span>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}

export default NewsDetails
