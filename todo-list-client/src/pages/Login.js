
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/authService';
import '../styles/Login.css'; // Importer le fichier CSS

const Login = () => {
    const navigate = useNavigate();
    const { login: loginContext } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const res = await login(values.username, values.password);
                loginContext(res.data);
                toast.success('Login successful');
                navigate('/todos');
            } catch (err) {
                toast.error(err.response?.data?.msg || 'Error logging in');
            }
        },
    });

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Sign in to your account</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="checkbox-container">
                        <label>
                            <input type="checkbox" name="remember-me" />
                            Remember me
                        </label>
                        <a href="#">Forgot your password?</a>
                    </div>
                    <button type="submit">Sign in</button>
                </form>

                {/* Affichage des erreurs de validation */}
                {(formik.touched.username && formik.errors.username) || (formik.touched.password && formik.errors.password) ? (
                    <div className="alert">
                        <strong>Error!</strong>
                        <ul>
                            {formik.touched.username && formik.errors.username && (
                                <li>{formik.errors.username}</li>
                            )}
                            {formik.touched.password && formik.errors.password && (
                                <li>{formik.errors.password}</li>
                            )}
                        </ul>
                    </div>
                ) : null}

                {/* Lien vers la page d'inscription */}
                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Create an account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
