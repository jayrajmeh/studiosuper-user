// HomePage.js

import React, { useEffect, useState } from 'react';
import { ApiGet } from '../helpers/API/ApiData';
import { useNavigate } from 'react-router-dom';
import queryString from "query-string";
import { ErrorToast } from '../helpers/Toast';
import moment from 'moment';



function HomePage() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    let queries = queryString.parse(window.location.search);

    ApiGet("/student/get/"+queries.id)
      .then((res) => {
        // SuccessToast(lan.successfull_deleted);
        // setData(
        //   data.filter(function (el) {
        //     return el._id != v;
        //   })
        // );
        setSchools(res.data.data)
        console.log(res)
      })
      .catch(async (err) => {
          ErrorToast(err.message);
      });
    // setSchools(mockData);
  }, []);

  const handleSchoolTabClick = (schoolId) => {
    // Navigate to the school's page using its ID
    navigate(`/studentdetails?id=${schoolId}`);
  };
  return (
    <div>
     <h1>List of Student</h1>
      <div className="school-list">
        {schools.map(school => (
          <div className="school" key={school._id}  onClick={() => handleSchoolTabClick(school._id)}>
            {/* <img src={school.imageUrl} alt={school.name} /> */}
            <div className="school-details">
              <h3>{school.name ? school.name:"Add Student details Click here"}</h3>
              <h3>{moment(school.dateofbirth).format('DD-MM-YYYY')}</h3>
              {/* <p>{school.location}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
