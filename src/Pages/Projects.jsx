import { useList } from "../Context/Lists";
import { useState, useEffect } from 'react';


const categories = [
    "전체",
    "기술/IT",
    "공공기관/교육",
    "브랜드/쇼핑몰",
    "제조/산업",
    "병원",
    "대기업",
    "식품/프랜차이즈",
    "바이오/제약",
    "뷰티/미용",
];

const Projects = () => {
    const listData = useList();
    const [popup, setPopup] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("전체");

    useEffect(() => {
        if (popup) {
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [popup]);

    const filteredList = listData
        .filter(item =>
            selectedCategory === "전체"
                ? true
                : (item.type === selectedCategory
                    || (selectedCategory === "공공기관/교육" && (item.type === "공공기관" || item.type === "교육"))
                )
        )
        .slice()
        .reverse();

    return (
        <>

            <h1 className="sub_title">프로젝트</h1>
            <div className="sub_intro">
                지금은 사라진 프로젝트를 포함해 총 70여 개 이상의 프로젝트를 90% 이상 혼자서 작업하였으며, <br className="mmVar" />
                특히 PHP 그누보드 기반 프로젝트의 경우 개발까지 직접 완료한 경험이 있습니다.
            </div>

            <div className="projects_categories">
                {categories.map(cat =>
                    <button
                        key={cat}
                        className={selectedCategory === cat ? "active" : ""}
                        onClick={() => setSelectedCategory(cat)}
                        type="button"
                    >
                        {cat}
                    </button>
                )}
            </div>

            <section className="projects_list">
                {filteredList.map((list, listIndex) => (
                    <div
                        className="projects_box"
                        key={listIndex}
                        onClick={() => setPopup(list)}
                    >
                        <div className="projects_img">
                            <img src={list.ogImage} alt={list.name} />
                        </div>
                    </div>
                ))}
            </section>

            {popup && (
                <section className={`projects_popup ${popup ? "open" : ""}`} onClick={() => setPopup(null)}>
                    <div className="popup_inner" onClick={(e) => e.stopPropagation()}>
                        <div className="popup_top">
                            <div className="popup_top_img">
                                <img src={popup.ogImage} alt={popup.name} />
                            </div>
                            <div className="popup_top_info">
                                <div className="popup_top_title">
                                    <h2 className="title">{popup.name}</h2>
                                </div>
                                <div className="popup_top_sub">
                                    <h4 className="sub">date: {popup.date || "날짜 없음"}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="popup_middle">
                            <div className="graph_area">
                                <div className="graph publishing">
                                    Publishing: {popup.contribution?.publishing || 0}%
                                </div>
                                <div className="graph develop">
                                    Develop: {popup.contribution?.develop || 0}%
                                </div>
                            </div>
                        </div>
                        <div className="popup_bottom">
                            <a href={popup.url} target="_blank" rel="noopener noreferrer">
                                Visit Site
                            </a>
                            <div className="popup_close" onClick={() => setPopup(null)}>Close</div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Projects;
