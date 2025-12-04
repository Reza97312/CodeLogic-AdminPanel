import { Fragment } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'
import UserProjectsList from './UserProjectsList'

const UserTabs = ({ active, toggleTab, newsCommentsData}) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>کامنت ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserProjectsList newsCommentsData={newsCommentsData}/>
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
