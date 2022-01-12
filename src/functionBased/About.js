import React from 'react';
import {
  useLocation, Link, Route, Routes,
} from 'react-router-dom';
import SinglePage from './SinglePage';

const About = () => {
  const { url, path } = useLocation();
  return (
    <div>
      <ul>
        <li>
          <Link to={`${url}/about-app`}>About App</Link>
        </li>
        <li>
          <Link to={`${url}/about-author`}>About Author</Link>
        </li>
      </ul>
      <Routes>
        <Route path={`${path}/:slug`} element={<SinglePage />} />

      </Routes>
    </div>
  );
};
export default About;
