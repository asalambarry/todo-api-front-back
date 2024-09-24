import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Importer le fichier CSS pour la page d'accueil

const Home = () => {
    return (
        <div className="home-page">
            <header className="home-header">
                <h1 className="home-title">Welcome to Your Todo App</h1>
                <p className="home-subtitle">Organize your tasks efficiently and boost your productivity.</p>
                <div className="home-buttons">
                    <Link to="/login" className="home-button">
                        Get Started
                    </Link>
                    <Link to="/register" className="home-button">
                        Create an Account
                    </Link>
                </div>
            </header>
            <main className="home-main">
                <section className="home-section">
                    <h2 className="section-title">Why Use Our Todo App?</h2>
                    <p className="section-text">
                        Our app helps you manage your daily tasks efficiently. With an intuitive interface and powerful
                        features, you can stay organized and focused.
                    </p>
                </section>
                <section className="home-section">
                    <h2 className="section-title">Features</h2>
                    <ul className="features-list">
                        <li className="feature-item">Easy task management</li>
                        <li className="feature-item">Real-time updates</li>
                        <li className="feature-item">Cross-platform support</li>
                        <li className="feature-item">Customizable themes</li>
                    </ul>
                </section>
            </main>
            <footer className="home-footer">
                <p>© 2024 Your Todo App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
