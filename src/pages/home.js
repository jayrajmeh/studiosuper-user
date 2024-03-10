// HomePage.js

import React, { useEffect, useState } from 'react';
import { ApiGet } from '../helpers/API/ApiData';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    ApiGet("/school/get")
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
    navigate(`/class?id=${schoolId}`);
  };
  return (
    <div>
     <h1>List of Schools</h1>
      <div className="school-list">
        {schools.map(school => (
          <div className="school" key={school._id}  onClick={() => handleSchoolTabClick(school._id)}>
            {/* <img src={school.imageUrl} alt={school.name} /> */}
            <div className="school-details">
              <h3>{school.name}</h3>
              {/* <p>{school.location}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
