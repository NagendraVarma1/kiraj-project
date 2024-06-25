import { useEffect, useState } from "react";
import classes from "./Employee.module.css";

const Employee = () => {
  const [data, setData] = useState(null);

  const updatedEmail = localStorage.getItem("updatedEmail");
  useEffect(() => {
    fetch(
      `https://kiraj-project-default-rtdb.firebaseio.com/${updatedEmail}.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        const allData = Object.keys(data).map((key) => ({
            id: key,
            city: data[key].city,
            dob: data[key].dob,
            gender: data[key].gender,
            mail: data[key].mail,
            maritalStatus: data[key].maritalStatus,
            mobile: data[key].mobile,
            name: data[key].name
        }))
        setData(allData)
      }).catch((err) => {
        alert(err.message)
      })
  }, []);
  console.log(data)
  return (
    <div>
      <h1 className={classes.header}>Employee Details</h1>
      <div className={classes.div}>
        {data && <h2><span>Name:</span> {data[0].name}</h2>}
        {data && <h2><span>Email:</span> {data[0].mail}</h2>}
        {data && <h2><span>Date of Birth:</span> {data[0].dobe}</h2>}
        {data && <h2><span>Gender:</span> {data[0].gender}</h2>}
        {data && <h2><span>Marital Status:</span> {data[0].maritalStatus}</h2>}
        {data && <h2><span>Phone Number:</span> {data[0].mobile}</h2>}
        {data && <h2><span>City:</span> {data[0].city}</h2>}
        
      </div>
    </div>
  );
};

export default Employee;
