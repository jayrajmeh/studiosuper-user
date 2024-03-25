import React, { useEffect, useState } from 'react';
import queryString from "query-string";
import { ApiGet, ApiPut } from '../helpers/API/ApiData';
import { ErrorToast, SuccessToast } from '../helpers/Toast';
import { useNavigate } from 'react-router-dom';

function StudentDetails() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    grno:'',
    surname: '',
    studentname: '',
    fathername: '',
    mobile: '',
    mobile2: '',
    address: '',
    dateofbirth: '',
    bloodgroup: ''
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [button, setbutton] = useState(false);
  const [Studentid, setStudentid] = useState();
  const [schoolData, setSchoolData] = useState([]);
  const [edit, setEdit] = useState(true);


  
  

  const validateForm = () => {
    console.log("valid");
    let errors = {};
    let formIsValid = true;

    if (!formData.studentname) {
      formIsValid = false;
      errors["studentname"] = "Please Enter Studentname";
    }
    if (!formData.grno && schoolData.includes("grno")) {
      formIsValid = false;
      errors["grno"] = "Please Enter Grno";
    }
    if (!formData.surname) {
      formIsValid = false;
      errors["surname"] = "Please Enter Surname";
    }
    if (!formData.fathername) {
      formIsValid = false;
      errors["fathername"] = "Please Enter Fathername";
    }
    if (!formData.mobile) {
        formIsValid = false;
        errors["mobile"] = "Please Enter Mobile";
      }
       if (formData?.mobile?.length !== 10) {
        formIsValid = false;
        errors["mobile"] = "Mobile number must be 10 digits long";
      }

      if(formData.mobile2 && formData?.mobile2?.length !== 10){
        formIsValid = false;
        errors["mobile2"] = "Mobile number must be 10 digits long";
      }



      if (!formData.address) {
        formIsValid = false;
        errors["address"] = "Please Enter Address";
      }
      if (!formData.dateofbirth) {
        formIsValid = false;
        errors["dateofbirth"] = "Please Enter Date Of Birth";
      }
      if(!formData.bloodgroup && schoolData.includes("bloodgroup")){
        formIsValid = false;
        errors["bloodgroup"] = "Please Select Bloodgroup";
      }
    // if (!newData.type && newData.type !== 0) {
    //   formIsValid = false;
    //   errors["type"] = "Please Select Type";
    // }
    setError(errors);
console.log(formIsValid)
    return formIsValid;
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let capitalizedValue = value;
  
    // Check if the field name is one of the specified fields
    if (["surname", "studentname", "fathername", "address"].includes(name)) {
      // Capitalize the first letter of each word
      capitalizedValue = capitalizedValue.toUpperCase();
    }
    if (["mobile", "mobile2"].includes(name)) {
      // Capitalize the first letter of each word
      let sanitizedValue = capitalizedValue.replace(/\D/g, ''); // Remove all non-digit characters
      capitalizedValue = sanitizedValue.slice(0, 10);
    }
    setFormData({
      ...formData,
      [name]: capitalizedValue
    });
  };

  const handleSubmit = () => {
  
    if (validateForm()) {
        console.log("ssssss")
        enableLoading();
        setbutton(true);
  
        try {
          const body = {
            id: Studentid,
            grno: formData.grno,
            surname: formData.surname,
            studentname: formData.studentname,
            fathername: formData.fathername,
            mobile: formData.mobile,
            mobile2: formData.mobile2,
            address: formData.address,
            dateofbirth: formData.dateofbirth,
            bloodgroup: formData.bloodgroup,
            status:1
          };
          console.log(body);
          ApiPut("/student", body)
            .then((res) => {
              console.log("ressssssssssss", res);
              SuccessToast("Successful Updated");
              disableLoading();
              setbutton(false);
              navigate(`/student?id=${formData.class}`);
            })
            .catch(async (err) => {
              
                ErrorToast(err.message);
                disableLoading();
                setbutton(false);
            
            });
        } catch (error) { }
      }
    
  };

  const callOk = () =>{
    let body = {
      _id:Studentid,
      status:4
    }
    ApiPut("/update_status", body)
            .then((res) => {
              console.log("ressssssssssss", res);
              SuccessToast("Successful Updated");
              disableLoading();
              setbutton(false);
              navigate(`/student?id=${formData.class}`);
            })
            .catch(async (err) => {
              
                ErrorToast(err.message);
                disableLoading();
                setbutton(false);
            
            });
  }

  const callnotOk = () =>{
    let body = {
      _id:Studentid,
      reason:formData.reason,
      status:3
    }
    ApiPut("/update_status", body)
            .then((res) => {
              console.log("ressssssssssss", res);
              SuccessToast("Successful Updated");
              disableLoading();
              setbutton(false);
              navigate(`/student?id=${formData.class}`);
            })
            .catch(async (err) => {
              
                ErrorToast(err.message);
                disableLoading();
                setbutton(false);
            
            });
  }

  

  useEffect(() => {
    let queries = queryString.parse(window.location.search);
    setStudentid(queries.id)
    ApiGet("/student/getbyid/"+queries.id)
      .then((res) => {
        // SuccessToast(lan.successfull_deleted);
        // setData(
        //   data.filter(function (el) {
        //     return el._id != v;
        //   })
        // );
        // setSchools(res.data.data)
        console.log(res)
        if(res.data.data.length>0){
            const { dateofbirth, ...otherData } = res.data.data[0];
            
            const formattedDateOfBirth = new Date(dateofbirth).toISOString().split('T')[0];
            setFormData({ ...otherData, dateofbirth: formattedDateOfBirth });
            setSchoolData(res?.data?.data[0]?.schoolDetails[0]?.validarray)
            setEdit(res?.data?.data[0]?.classDetails[0]?.isedit)

            

        }
      })
      .catch(async (err) => {
          ErrorToast(err.message);
      });
    // setSchools(mockData);
  }, []);

  return (
    <div className="container school-details1">
      <h2>Student Details Form</h2>
     { formData.status==0 || formData.status==1?<div  >
     { schoolData?.includes("grno")?<div className="form-group">
          <label htmlFor="grno">GR No:</label>
          <input type="text" id="grno" name="grno" value={formData.grno} onChange={handleChange} required />
          {error?.grno &&
								<span className="errorInput">
									{error["grno"]}
								</span>}
        </div>:null}
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
          {error?.surname &&
								<span className="errorInput">
									{error["surname"]}
								</span>}
        </div>
        <div className="form-group">
          <label htmlFor="studentname">Studentname:</label>
          <input type="text" id="studentname" name="studentname" value={formData.studentname} onChange={handleChange} required />
          {error?.studentname &&
								<span className="errorInput">
									{error["studentname"]}
								</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fathername">Fathername:</label>
          <input type="text" id="fathername" name="fathername" value={formData.fathername} onChange={handleChange} required />
          {error?.fathername &&
								<span className="errorInput">
									{error["fathername"]}
								</span>}
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Father Mobile:</label>
          <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} required />
          {error?.mobile &&
								<span className="errorInput">
									{error["mobile"]}
								</span>}
        </div>
        <div className="form-group">
          <label htmlFor="mobile2">Mother Mobile:</label>
          <input type="tel" id="mobile2" name="mobile2" pattern="[0-9]{10}" value={formData.mobile2} onChange={handleChange} required />
          {error?.mobile2 &&
								<span className="errorInput">
									{error["mobile2"]}
								</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea 
    id="address" 
    name="address" 
    value={formData.address} 
    onChange={handleChange} 
    rows={5} 
    required 
  />
          {error?.address &&
								<span className="errorInput">
									{error["address"]}
								</span>}
        </div>
        <div className="form-group">
          <label htmlFor="dateofbirth">Date of Birth:</label>
          <input type="date" id="dateofbirth" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
          {error?.dateofbirth &&
								<span className="errorInput">
									{error["dateofbirth"]}
								</span>}
        </div>
        { schoolData?.includes("bloodgroup")?<div className="form-group">
  <label htmlFor="bloodgroup">Blood Group:</label>
  <div className="select-wrapper">
    <select id="bloodgroup" name="bloodgroup" value={formData.bloodgroup} onChange={handleChange} required>
      <option value="">Select</option>
      <option value="A+">A+</option>
      <option value="A-">A-</option>
      <option value="B+">B+</option>
      <option value="B-">B-</option>
      <option value="AB+">AB+</option>
      <option value="AB-">AB-</option>
      <option value="O+">O+</option>
      <option value="O-">O-</option>
    </select>
  </div>
  {error?.bloodgroup &&
    <span className="errorInput">
      {error["bloodgroup"]}
    </span>}
</div>:null}
        {!edit?<><input type="submit" disabled={button} onClick={()=>handleSubmit()}  />{loading && <span className="ml-3 spinner spinner-white"></span>}</>:null}
      </div>:<div><img src={"https://studiosuper.s3.ap-south-1.amazonaws.com/"+formData.photo} alt="Image" style={{ maxWidth: '100%' }} />
      { formData.status==2?<div>
        Please confirm if this ID card is accurate. If not, please provide the incorrect details and suggest the correct information. 
       
       <div> <textarea 
    id="reason" 
    name="reason" 
    style={{width:"100%"}}
    value={formData.reason} 
    onChange={handleChange} 
    rows={5} 
    required 
  /></div>
  <div>
        <button className="correctButton" onClick={()=>callOk()}>Correct</button>
        <button className="incorrectButton" onClick={()=>callnotOk()}>Incorrect</button>
        </div></div>:null}
      </div>}
    </div>
  );
}

export default StudentDetails;
