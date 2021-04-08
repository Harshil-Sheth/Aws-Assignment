import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CFormGroup,
  CCardHeader,
  CLabel,
  CInputFile
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import { useHistory } from "react-router-dom";



const Register = () => {
  let history = useHistory();
  const [firstName, setFirstName] = React.useState()
  const [email, setEmail] = React.useState()
  const [password, setPassword] = React.useState()
  const [mobileno, setMobileno] = React.useState()
  const [file, setFile] = React.useState()

 async function submit(){
    const fd = new FormData();
    fd.append("cust_name", firstName);
    fd.append("cust_email", email);
    fd.append("cust_password", password);
    fd.append("cust_mno", mobileno);
    fd.append("cust_image", file);

    try {
    await axios.post(
        "https://a4t2pboh76.execute-api.us-east-1.amazonaws.com/default/addcustomer",
        fd
      );
      history.push("/users");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
            <CCardHeader>
              <h1>Add Customer</h1>
            </CCardHeader>
            <CCardBody>
              <form onSubmit={e=>{e.preventDefault();submit()}} method="post">
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput onChange={(e)=>setFirstName(e.target.value)} id="username1" name="username1" placeholder="Username" autoComplete="name"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput onChange={(e)=>setEmail(e.target.value)} type="email" id="email1" name="email1" placeholder="Email" autoComplete="username"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput onChange={(e)=>setPassword(e.target.value)} type="password" id="password1" name="password1" placeholder="Password" autoComplete="current-password"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-phone" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput onChange={(e)=>setMobileno(e.target.value)} id="mobile1" name="mobile1" placeholder="Mobile No" autoComplete="mobile no"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup row>
                <CInputGroup>

                  <CCol xs="12" md="9">
                  {/* <CLabel col md="3" htmlFor="file-input">File input</CLabel> */}
                    <CInputFile onChange={(e)=>setFile(e.target.files[0])} id="file-input" name="file-input"/>
                  </CCol>
                </CInputGroup>
                </CFormGroup>

                {/* <CFormGroup >
                <CInputGroup>
                  <CCol xs="12" md="12">
                  <CLabel  htmlFor="file-input" variant="custom-file">Select Profile Image</CLabel>
                    <CInputFile id="file-input" name="file-input" custom/>
                  </CCol>

                  </CInputGroup>
                </CFormGroup> */}
                  
                {/* </CFormGroup>
                <CFormGroup className="form-actions">
                <CFormGroup row>            
                  <CCol xs="12" md="9">
                    <CLabel  htmlFor="file-multiple-input" variant="custom-file">
                      Choose Image
                    </CLabel>
                    <CInputFile 
                      id="file-multiple-input" 
                      name="file-multiple-input"                       
                      custom
                    />
                  </CCol>
                </CFormGroup> */}
                  <CButton type="submit" size="md" color="primary">Submit</CButton>
              </form>
            </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
