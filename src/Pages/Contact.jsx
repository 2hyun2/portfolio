import { FiMail, FiPhone, FiUser, FiMessageCircle } from "react-icons/fi";
import OpenKakao from '../Images/init/KakaoTalk.png'

export default function Contact() {
  return (
    <section className="contact">
      <div className="contact-card">
        <h2><FiUser /> 이정현</h2>
        <div className="contact-desc">일단 시작하자.</div>
        
        <div className="contact-info">
          <a href="mailto:eventietter@naver.com"><FiMail /> eventietter@naver.com</a>
          <a href="tel:01023750449"><FiPhone /> 010-2375-0449</a>
        </div>
        
        <div className="contact-links">
          <a href="https://open.kakao.com/o/sEQIZhGh" target="_blank" rel="noopener">
            <FiMessageCircle /> 카카오톡 오픈채팅
          </a>
        </div>
        
        <div className="contact-qr">
          <img src={OpenKakao} alt="카카오톡 QR" />
          <div className="qr-label">카톡 QR로도 연락 가능</div>
        </div>
      </div>
    </section>
  );
}
