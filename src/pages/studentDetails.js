import React, { useEffect, useState } from 'react';
import queryString from "query-string";
import { ApiGet, ApiPut } from '../helpers/API/ApiData';
import { ErrorToast, SuccessToast } from '../helpers/Toast';
import { useNavigate } from 'react-router-dom';

function StudentDetails() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    city: '',
    photonumber: '',
    dateofbirth: ''
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [button, setbutton] = useState(false);
  const [Studentid, setStudentid] = useState();

  

  const validateForm = () => {
    console.log("valid");
    let errors = {};
    let formIsValid = true;

    if (!formData.name) {
      formIsValid = false;
      errors["name"] = "Please Enter Name";
    }
    if (!formData.mobile) {
        formIsValid = false;
        errors["mobile"] = "Please Enter Mobile";
      }
      if (!formData.address) {
        formIsValid = false;
        errors["address"] = "Please Enter Address";
      }
      if (!formData.city) {
        formIsValid = false;
        errors["city"] = "Please Enter City";
      }
      if (!formData.photonumber) {
        formIsValid = false;
        errors["photonumber"] = "Please Enter PhotoNumber";
      }
      if (!formData.dateofbirth) {
        formIsValid = false;
        errors["dateofbirth"] = "Please Enter Date Of Birth";
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
    console.log(name,value)
    setFormData({
      ...formData,
      [name]: value
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
            name: formData.name,
            mobile: formData.mobile,
            address: formData.address,
            city: formData.city,
            photonumber: formData.photonumber,
            dateofbirth: formData.dateofbirth,
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
            

        }
      })
      .catch(async (err) => {
          ErrorToast(err.message);
      });
    // setSchools(mockData);
  }, []);

  return (
    <div className="container">
      <h2>Student Details Form</h2>
      {/* <form > */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          {error?.name &&
								<span className="errorInput">
									{error["name"]}
								</span>}
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} required />
          {error?.mobile &&
								<span className="errorInput">
									{error["mobile"]}
								</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
          {error?.address &&
								<span className="errorInput">
									{error["address"]}
								</span>}
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
          {error?.city &&
								<span className="errorInput">
									{error["city"]}
								</span>}
        </div>
        <div className="form-group">
          <label htmlFor="photonumber">Photo Number:</label>
          <input type="text" id="photonumber" name="photonumber" value={formData.photonumber} onChange={handleChange} />
          {error?.photonumber &&
								<span className="errorInput">
									{error["photonumber"]}
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
        <input type="submit" disabled={button} onClick={()=>handleSubmit()}  />{loading && <span className="ml-3 spinner spinner-white"></span>}
      {/* </form> */}
    </div>
  );
}

export default StudentDetails;
