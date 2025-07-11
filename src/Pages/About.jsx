import React from 'react';

const skills = [
    { name: 'HTML / CSS / SCSS', level: 95 },
    { name: 'JavaScript (ES6+), TypeScript', level: 90 },
    { name: 'React + Vite + Router', level: 88 },
    { name: 'Git / GitHub', level: 85 },
    { name: 'GSAP, IntersectionObserver', level: 80 }
];

const About = () => {
    return (
        <section className="about_me inner">
            <h2 className="section_title">About Me</h2>

            <div className="about_text">
                <p>
                    안녕하세요, 저는 퍼블리싱을 기반으로 React, Vite 등의 프론트엔드 기술을 활용하여 <br />
                    사용자 중심의 웹을 만드는 개발자 <strong>정현</strong>입니다.
                </p>
                <p>
                    디자인 시스템, 반응형 웹, 성능 최적화에 관심이 많으며, <br />
                    62개 이상의 프로젝트를 단독 또는 팀으로 완성했습니다.
                </p>
            </div>

            <div className="skill_chart">
                {skills.map((skill, idx) => (
                    <div className="skill_bar" key={idx}>
                        <span className="skill_name">{skill.name}</span>
                        <div className="skill_track">
                            <div
                                className="skill_fill"
                                style={{ width: `${skill.level}%` }}
                                data-percent={skill.level}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default About;
