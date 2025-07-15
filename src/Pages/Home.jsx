import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="main_home">
      <section className="main_left">
        <div className="main_left_title">
          <h2 className="font6">Lee Jeong Hyun</h2>
          <h4 className="font3">Publishing & Developer</h4>
        </div>
        <ul className="main_left_links">
          <li><Link to='/about'>Info</Link></li>
          <li><Link to='/projects'>Projects</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </section>
      <section className="main_right">
        <ul className="main_right_info">
          <li>1997년생, 서울 관악구 거주</li>
          <li>에이전시 2년 3개월 경험</li>
          <li>웹 퍼블리셔 & 개발자입니다.</li>
          <li>UX·UI, 실용성을 바탕으로</li>
          <li>사용자 중심의 더 나은 경험과</li>
          <li>효율적인 결과를 함께 고민합니다.</li>
        </ul>
      </section>
    </main>
  );
};

export default Home;
