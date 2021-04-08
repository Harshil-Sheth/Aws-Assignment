import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import usersData from './UsersData'




const User = ({match}) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    
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
  }, [])
  const user = users.find( user => user.cust_id.toString() === match.params.id)
  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg={6} >
        <CCard style={{height:"406.65px"}}>
          <CCardHeader>
           Profile Photo
          </CCardHeader>
          <CCardBody>
              
                  {
                    users.map(({cust_image,cust_id},index) => {
                      return (
                        cust_id.toString() === match.params.id?
                        <div key={cust_id} style={{textAlign:"center"}} >
                          <img src={cust_image} style={{borderRadius:200}} width="300" height="300" />
                          
                        </div>
                        :
                        <div key={cust_id} ></div>
                      )
                    })
                  }
                
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
