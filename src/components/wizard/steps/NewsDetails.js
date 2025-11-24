import { Fragment } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Label, Row, Col, Input , Form, Button } from 'reactstrap'
import { createNews } from '../../../core/services/api/post/createNews'
import { Formik } from 'formik'



const NewsDetails = ({ stepper, type }) => {

  const onSubmit = async (values, { resetForm }) => {
    await createNews(values.courseId, values.title, values.describe)
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
      image: ''
      }}>
        {({values, handleChange, handleSubmit, setFieldValue}) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label' for={`username-${type}`}>
                  عنوان
                </Label>
                <Input 
                value={values.title} 
                onChange={handleChange}  
                type='text' 
                name='title' id={`username-${type}`} placeholder='عنوان را وارد کنید' />
              </Col>
            </Row>
            <Row>
              <div className='form-password-toggle col-md-6 mb-1'>
                <Label className='form-label' for={`password-${type}`}>
                  عنوان گوگل
                </Label>
                <Input 
                value={values.googleTitle} 
                onChange={handleChange}  
                type='text' 
                name='googleTitle' id={`password-${type}`} placeholder='عنوان گوگل را وارد کنید'/>
              </div>
              <div className='form-password-toggle col-md-6 mb-1'>
                <Label className='form-label' for={`confirm-password-${type}`}>
                  توضیحات گوگل
                </Label>
                <Input 
                value={values.googleDescribe} 
                onChange={handleChange}  
                type='text' 
                name='googleDescribe' id={`confirm-password-${type}`} placeholder='توضیحات گوگل را وارد کنید'/>
              </div>
            </Row>
            <Row>
              <div className='form-password-toggle col-md-6 mb-1'>
                <Label className='form-label' for={`password-${type}`}>
                  توضیحات کوتاه
                </Label>
                <Input 
                value={values.miniDescribe} 
                onChange={handleChange}  
                type='text' 
                name='miniDescribe' id={`password-${type}`} placeholder='توضیحات کوتاه را وارد کنید'/>
              </div>
              <div className='form-password-toggle col-md-6 mb-1'>
                <Label className='form-label' for={`confirm-password-${type}`}>
                  توضیحات
                </Label>
                <Input 
                value={values.describe} 
                onChange={handleChange}  
                type='text' 
                name='describe' id={`confirm-password-${type}`} placeholder='توضیحات را وارد کنید'/>
              </div>
            </Row>
            <Row>
              <div className='form-password-toggle col-md-6 mb-1'>
                <Label className='form-label' for={`password-${type}`}>
                  آیدی دسته بندی
                </Label>
                <Input 
                value={values.categoryId} 
                onChange={handleChange}  
                type='number' name='categoryId' id={`password-${type}`} placeholder='آیدی دسته بندی را وارد کنید'/>
              </div>
              <div className='form-password-toggle col-md-6 mb-1'>
                <Label className='form-label' for={`confirm-password-${type}`}>
                  تصویر
                </Label>
                <Input  
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
