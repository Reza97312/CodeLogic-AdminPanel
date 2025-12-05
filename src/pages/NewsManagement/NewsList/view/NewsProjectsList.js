import { useQuery } from 'react-query'
import { Card, CardHeader, Progress } from 'reactstrap'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import Avatar from '@components/avatar'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import getUserWithId from '../../../../core/services/api/get/getUserWithId'



export const columns = [
  {
    name: 'کاربر',
    selector: row => userData.name
  },
  {
    sortable: true,
    minWidth: '200px',
    name: 'عنوان',
    selector: row => row.title,
    cell: row => {
      return (
        <span className='text-truncate fw-bolder'>{row.title}</span>
      )
    }
  },
  {
    name: 'متن',
    selector: row => row.totalTasks,
    cell: row => {
      return (
        <span>{row.describe}</span>
      )
    }
  },
  {
    name: 'پاسخ ها',
    selector: row => row.progress,
    sortable: true,
    cell: row => {
      return (
        <div className='d-flex flex-column w-100'>
          <small className='mb-1'>{`${row.progress}%`}</small>
          <Progress
            value={row.progress}
            style={{ height: '6px' }}
            className={`w-100 progress-bar-${row.progressColor}`}
          />
        </div>
      )
    }
  },
]

const NewsProjectsList = ({newsCommentsData}) => {

  const { data: userData, isPending } = useQuery({
    queryKey: ["GETUSERWITHID"],
    queryFn: () => getUserWithId(id),
  });

  return (
    <Card>
      <CardHeader tag='h4'>کامنت های اخبار</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={newsCommentsData}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default NewsProjectsList
