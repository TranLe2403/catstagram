import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/detail_page';
import styled from 'styled-components';

const AppStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
  margin: 16px 0;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 1200px) {
    max-width: 1140px;
  }

  @media (max-width: 991px) {
    max-width: 960px;
  }

  @media (max-width: 767px) {
    max-width: 720px;
  }

  @media (max-width: 575px) {
    max-width: 540px;
  }
`

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppStyle>
      <Wrapper>
        <Router>
          <Routes>
            <Route path={`/:id`} element={<DetailPage />} />
            <Route path='/' element={<App />} />
          </Routes>
        </Router>
      </Wrapper>
    </AppStyle>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
