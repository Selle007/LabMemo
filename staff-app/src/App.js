import React,{useState} from 'react';
import Constants from './utilities/Constants';
import StaffCreateForm from "./components/StaffCreateForm";
import StaffUpdateForm from "./components/StaffUpdateForm";

export default function App() {
  const [staff, setStaff]=useState([]);
  const [showingCreateNewStaffForm, setshowingCreateNewStaffForm] = useState(false);
  const [staffCurrentBeingUpdated, setStaffCurrentBeingUpdated] = useState (null);


  function getStaff(){
    const url = 'http://localhost:5014/api/Staff';

    fetch(url,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(staffFromServer => {
        console.log(staffFromServer);
        setStaff(staffFromServer);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  function deleteStaff(){
    const url = `'http://localhost:5014/api/Staff/'${staff.staffID}`;

    fetch(url,{
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
        console.log(responseFromServer);
        onStaffDeleted(staff.staffID);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }






  return (
    <>
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(showingCreateNewStaffForm === false && staffCurrentBeingUpdated === null) && (
          <div>
            <h1>Staff CRUD</h1>
            <div className='mt-5'>
              <button onClick={getStaff} className="btn btn-dark btn-lg w-100">Get Staff from Server</button>
              <button onClick={() => setshowingCreateNewStaffForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Add Staff</button>
            </div>
          </div>
          )}
          {(staff.length > 0 && showingCreateNewStaffForm === false && staffCurrentBeingUpdated === null) && renderStaffTable()}

          {showingCreateNewStaffForm && <StaffCreateForm onStaffCreated={onStaffCreated}/>}

          {staffCurrentBeingUpdated !== null && <StaffUpdateForm staff={staffCurrentBeingUpdated} onStaffUpdated={onStaffUpdated} />}
          </div>
      </div>
    </div>
    </>
    );


  function renderStaffTable(){
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope='col'>Staff ID</th>
              <th scope='col'>Staff Name</th>
              <th scope='col'>Job Experience</th>
              <th scope='col'>Role</th>
              <th scope='col'>Phone Number</th>
              <th scope='col'>Age</th>
              <th scope='col'>CRUD</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staff)=> (
              <tr key={staff.staffID}>
                <th scope='row'>{staff.staffID}</th>
                <td>{staff.staffName}</td>
                <td>{staff.jobExp}</td>
                <td>{staff.role}</td>
                <td>{staff.phoneNr}</td>
                <td>{staff.age}</td>
                
                
                
                <td>
                  <button onClick={() => setStaffCurrentBeingUpdated(staff) } className="btn btn-dark btn-lg mx-3 my-3">Update</button>
                  <button onClick={() => {if (window.confirm("Are you sure?")) deleteStaff(staff.staffID)}} className="btn btn-secondary btn-lg">Delete</button>
                </td>
            </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() =>setStaff([])} className="btn btn-dark btn-lg w-100">Remove</button>

      </div>
    )
  }



  function onStaffCreated(createdStaff){
    setshowingCreateNewStaffForm(false);
    if(createdStaff === null){
      return;
    }
    alert("Staff Created");

    getStaff();
  }

  function onStaffUpdated(updatedStaff){
    setStaffCurrentBeingUpdated(null);
    if(updatedStaff === null){
      return;
    }
    let staffCopy = [...staff];
    const index = staffCopy.findIndex((staffCopyStaff, currentIndex)=>{
      if(staffCopyStaff.staffID === updatedStaff.staffID){
        return true;
      }
    });

    if (index !== -1){
      staffCopy[index]=updatedStaff;
    }

    setStaff(staffCopy);

    alert("Staff Updated");
  }
  function onStaffDeleted(deletedStaffStaffID){

    let staffCopy = [...staff];
    const index = staffCopy.findIndex((staffCopyStaff, currentIndex)=>{
      if(staffCopyStaff.staffID === deletedStaffStaffID){
        return true;
      }
    });

    if (index !== -1){
      staffCopy.splice(index, 1);
    }

    setStaff(staffCopy);

    alert("Staff Delete");
  }


}

