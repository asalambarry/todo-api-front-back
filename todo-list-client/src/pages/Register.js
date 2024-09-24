import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { register } from '../services/authService';
import '../styles/Register.css'; // Importer le fichier CSS

const Register = () => {
    const navigate = useNavigate(); // Initialiser useNavigate
    const { login } = useContext(AuthContext); // Vous pouvez retirer l'appel à login si vous ne l'utilisez plus

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                await register(values.username, values.password); // Enregistrement de l'utilisateur
                toast.success('Registration successful. Please log in.');
                navigate('/login'); // Rediriger vers la page de connexion après inscription réussie
            } catch (err) {
                toast.error(err.response.data.msg || 'Error registering');
            }
        },
    });

    return (
        <div className="register-page">
            <div className="register-container">
                <h2>Create Your Account</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="alert">
                            <ul>
                                <li>{formik.errors.username}</li>
                            </ul>
                        </div>
                    ) : null}
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="alert">
                            <ul>
                                <li>{formik.errors.password}</li>
                            </ul>
                        </div>
                    ) : null}
                    <button type="submit">
                        Register
                    </button>
                </form>
                <div className="register-footer">
                    <p>
                        Already have an account?{' '}
                        <a href="/login">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
