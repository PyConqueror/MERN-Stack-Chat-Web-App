import React, { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';
import '../../Pages/AuthPage/index.css'

function SignUpForm({ setUser }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
        setError(''); // Reset error message when user starts to type
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirm) {
            setError('Passwords do not match');
            return;
        }
        try {
            const { confirm, ...newFormData } = formData; // Exclude 'confirm' from data to be sent
            const user = await signUp(newFormData);
            setUser(user); // Set the user in the parent component
            navigate('/'); // Navigate to home page after successful sign up
        } catch {
            setError('Sign Up Failed - Try Again');
        }
    };

    return (
        <div className="form-container">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
                <button type="submit" disabled={formData.password !== formData.confirm}>Sign up</button>
            </form>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    );
}

export default SignUpForm;
