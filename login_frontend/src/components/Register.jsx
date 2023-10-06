import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {   const [username, setUsername] = useState('');
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [dob, setDob] = useState('');
const [gender, setGender] = useState('');
const [mobileNumber, setMobileNumber] = useState('');
const [emergencyFullName, setEmergencyFullName] = useState('');
const [emergencyMobileNumber, setEmergencyMobileNumber] = useState('');
const [emergencyRelation, setEmergencyRelation] = useState('');
const navigate = useNavigate();

const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3001/register', {
        username,
        name,
        email,
        password,
        dob,
        gender,
        mobileNumber,
        emergencyContact: {
            fullName: emergencyFullName,
            mobileNumber: emergencyMobileNumber,
            relation: emergencyRelation
        }
    })
    .then(result => {
        console.log(result);
        if(result.data === "Already registered"){
            alert("E-mail already registered! Please Login to proceed.");
            navigate('/login');
        }
        else{
            alert("Registered successfully! Please Login to proceed.");
            navigate('/login');
        }
    })
    .catch(err => console.log(err)); }


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center min-vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
            <div className="bg-white p-3 rounded" style={{width : '80%', maxWidth: '400px'}}>
                    <h2 className='mb-3 text-primary'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong >Name</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter Name"
                                className="form-control" 
                                id="exampleInputname" 
                                onChange={(event) => setName(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputUsername" className="form-label">
                            <strong>Username</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                className="form-control"
                                id="exampleInputUsername"
                                onChange={(event) => setUsername(event.target.value)}
                                required
                             />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputDOB" className="form-label">
                            <strong>Date of Birth</strong>
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="exampleInputDOB"
                                onChange={(event) => setDob(event.target.value)}
                                required
                             />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputGender" className="form-label">
                            <strong>Gender</strong>
                            </label>
                            <select
                                className="form-select"
                                id="exampleInputGender"
                                onChange={(event) => setGender(event.target.value)}
                                required
                                >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputMobile" className="form-label">
                            <strong>Mobile Number</strong>
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter Mobile Number"
                                className="form-control"
                                id="exampleInputMobile"
                                onChange={(event) => setMobileNumber(event.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmergencyName" className="form-label">
                            <strong>Emergency Contact Full Name</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Emergency Contact Full Name"
                                className="form-control"
                                id="exampleInputEmergencyName"
                                onChange={(event) => setEmergencyFullName(event.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmergencyMobile" className="form-label">
                            <strong>Emergency Contact Mobile Number</strong>
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter Emergency Contact Mobile Number"
                                className="form-control"
                                id="exampleInputEmergencyMobile"
                                onChange={(event) => setEmergencyMobileNumber(event.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmergencyRelation" className="form-label">
                            <strong>Relation to Emergency Contact</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Relation to Emergency Contact"
                                className="form-control"
                                id="exampleInputEmergencyRelation"
                                onChange={(event) => setEmergencyRelation(event.target.value)}
                                required
                            />
                        </div>                        
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>

                    <p className='container my-2'>Already have an account ?</p>
                    <Link to='/login' className="btn btn-secondary">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register