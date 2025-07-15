import { useEffect } from 'react';

const About = () => {

    useEffect(() => {
        const graphLi = document.querySelectorAll('ul.graph li')
        graphLi.forEach((element) => {
            const percent = element.getAttribute('data-graph');
            element.style.setProperty('--graph-width', percent + '%');
        })

        return () => {

        }
    }, [])


    return (
        <section className="about">
            <h1 className="sub_title">프로필</h1>
            <div className="sub_intro">
                안녕하세요, 이정현입니다.  <br />
                그동안 주로 디자이너 분들의 결과물을 바탕으로 작업해왔지만, <br className="mmVar" />
                이번 포트폴리오는 직접 디자인부터 개발까지 모두 도전해 보았습니다. <br />
                부족한 부분이 있을 수 있지만, 따뜻한 시선으로 봐주시면 감사하겠습니다.
            </div>
            <div className="about_contents">
                <div className="about_photo_wrap">
                    <div className="about_photo"></div>
                </div>
                <div className="about_personality">
                    <h4 className="about_title">성격</h4>
                    <p className="about_sub_title">장점</p>
                    <ul className="dot">
                        <li>유쾌하고 긍정적인 에너지가 많아요.</li>
                        <li>감정 조절에 능해 어려운 상황에도 침착하게 대처합니다.</li>
                        <li>주변과 소통을 자주 하며, 협업을 중요하게 생각합니다.</li>
                        <li>공과 사를 잘 구분해 일에 집중할 줄 압니다.</li>
                        <li>새로운 지식과 경험을 얻는 것을 즐깁니다.</li>
                        <li>호기심이 많고, 행동으로 옮기는 것을 두려워하지 않습니다.</li>
                    </ul>
                    <p className="about_sub_title">단점</p>
                    <ul className="dot">
                        <li>효율성을 중시하다 보니 반복적이거나 답답한 상황을 힘들어할 때가 있습니다.</li>
                        <li>때때로 솔직하게 말하는 편이라, 직설적으로 보일 수 있습니다.</li>
                        <li>귀차니즘이 찾아올 때도 있지만, 해야 할 일은 꼭 끝까지 해내는 책임감이 있습니다.</li>
                        <li>공과 사를 너무 잘 구분하려다 보니, 가끔 융통성이 부족하게 느껴질 수 있습니다.</li>
                    </ul>
                </div>

                <div className="about_skills">
                    <h4 className="about_title">스킬</h4>
                    <p className="about_sub_title">다양한 웹 환경(PHP, ASP 등)에서 퍼블리싱을 진행해 왔으며, <br className="mmVar" />
                        구조 파악과 수정, 응용이 가능합니다.</p>
                    <ul className="graph">
                        <li data-graph="100">Html</li>
                        <li data-graph="100">Css</li>
                        <li data-graph="80">Javascript</li>
                        <li data-graph="50">React</li>
                        <li data-graph="50">PHP</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default About;
