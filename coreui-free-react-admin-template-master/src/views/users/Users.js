import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import usersData from './UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [user, setUsers] = useState([])

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://59xobffafd.execute-api.us-east-1.amazonaws.com/default/getCustomers-Harshil", requestOptions)
      .then(response => response.json())
      .then(result => setUsers(result))
      .catch(error => console.log('error', error));
      // console.log(userdata)
      // userdata=user;
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          {/* <CCardHeader>
            Users
            
          </CCardHeader> */}
          <CCardBody>
          <CDataTable
            items={user}
            fields={[
              { key: 'cust_id', _classes: 'font-weight-bold' },
              'cust_name', 'cust_email','cust_mno', 'status'
            ]}
            hover
            striped
            columnFilter
            tableFilter
            sorter
           
            // itemsPerPageSelect
            itemsPerPage={10}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/users/${item.cust_id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                ),
              'Profile':
                (item)=>(
                  <td>
                     
                    <img src={item.cust_image} width="100" height="50" />
                    
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
