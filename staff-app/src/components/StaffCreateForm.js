import React, {useState} from 'react';
import Constants from '../utilities/Constants';


export default function StaffCreateForm() {
    const initialFormData = Object.freeze({
        staffName:"",
        jobExp:"",
        role:"",
        phoneNr:"",
        age:""
    });
    const[formData , setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const staffToCreate = {
            
            staffName:formData.staffName,
            jobExp:formData.jobExp,
            role:formData.role,
            phoneNr:formData.phoneNr,
            age:formData.age
            
        };

        const url = 'http://localhost:5014/api/Staff';

        
    fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(staffToCreate)
      })
      .then(response => response.json())
      .then(responseFromServer => {
          console.log(responseFromServer);
          
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
      this.props.onStaffCreated(staffToCreate);
    };




  return (
    <div>
        <form className="w-100 px-5">
            <h1 className="mt-5">Create new staff</h1>
            <div className="mt-5">
                <label className="h3 form-label">Staff Name</label>
                <input value={formData.staffName} name="staffName" type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-1">
                <label className="h3 form-label">Job Experience</label>
                <input value={formData.jobExp} name="jobExp" type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-1">
                <label className="h3 form-label">Role</label>
                <input value={formData.role} name="role" type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-1">
                <label className="h3 form-label">Phone Number</label>
                <input value={formData.phoneNr} name="phoneNr" type="number" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-1">
                <label className="h3 form-label">Age</label>
                <input value={formData.age} name="age" type="number" className="form-control" onChange={handleChange} />
            </div>
            
                <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
                <button onClick={() => this.props.onStaffCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>     
    </div>
        

  )
}