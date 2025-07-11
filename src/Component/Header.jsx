import React, { useEffect, useState } from 'react';



const Header = () => {
    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const [loading, setLoading] = useState(true) // 로딩 state
    const [geoLocation, setGeoLocation] = useState(false) // 위치 불러오기 성공 state
    const [geoAddress, setGeoAddress] = useState(''); // 위치 주소 값
    const [getWeather, setGetWeather] = useState(false) // 날씨 값
    const [weatherDesc, setWeatherDesc] = useState(''); // 날씨 형태
    const [emojiTemp, setEmojiTemp] = useState(''); // 날씨 기온
    const [emojiPop, setEmojiPop] = useState(''); // 날씨 강수확률

    useEffect(() => {
        const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
        script.defer = true;
        script.onload = () => askForLocation();
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        // console.log(geoLocation, geoAddress, getWeather)
        if (geoLocation && geoAddress && getWeather) {
            setLoading(false)
        }
    }, [geoLocation, geoAddress, getWeather]);

    // 위치 정보 사용 confirm 재사용
    const askForLocation = () => {
        if (window.confirm('현재 위치 정보를 사용하시겠습니까?')) {
            checkGeoLocation();
        } else {
            setLoading(false)
        }
    };

    // 위치 geolocation 함수
    const checkGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                if (latitude && longitude) {
                    setGeoLocation(true) // 위치 사용함 저장
                    getAddressFromCoords(latitude, longitude) // 위치값으로 구글 api 이용한 주소 불러오기

                    const { nx, ny } = dfs_xy_conv(latitude, longitude); // 기상청 격자 변환
                    getWeatherData(nx, ny)

                }
            },
            (error) => {
                console.error('위치 정보 오류', error);
            }
        );
    };

    // 구글 개발자 api 주소 불러오기
    function getAddressFromCoords(lat, lng) {
        if (!window.google || !window.google.maps) {
            console.error("Google Maps API 아직 로드되지 않음");
            return;
        }

        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };

        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    const address = results[0].formatted_address;
                    setGeoAddress(address);
                } else {
                    console.log("결과 없음");
                }
            } else {
                console.error("Geocoder 실패:", status);
            }
        });
    }

    // geoLocation 좌표 기상청 좌표 변환
    function dfs_xy_conv(lat, lon) {
        const RE = 6371.00877; // 지구 반경(km)
        const GRID = 5.0;      // 격자 간격(km)
        const SLAT1 = 30.0;    // 투영 위도1(degree)
        const SLAT2 = 60.0;    // 투영 위도2(degree)
        const OLON = 126.0;    // 기준점 경도(degree)
        const OLAT = 38.0;     // 기준점 위도(degree)
        const XO = 43;         // 기준점 X좌표(GRID)
        const YO = 136;        // 기준점 Y좌표(GRID)

        const DEGRAD = Math.PI / 180.0;

        const re = RE / GRID;
        const slat1 = SLAT1 * DEGRAD;
        const slat2 = SLAT2 * DEGRAD;
        const olon = OLON * DEGRAD;
        const olat = OLAT * DEGRAD;

        const sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        const sn2 = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
        const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        const sf2 = Math.pow(sf, sn2) * Math.cos(slat1) / sn2;
        const ro = re * sf2 / Math.pow(Math.tan(Math.PI * 0.25 + olat * 0.5), sn2);

        const ra = re * sf2 / Math.pow(Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5), sn2);
        let theta = lon * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn2;

        const x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        const y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

        return { nx: x, ny: y };
    }

    // 기상청 api 날씨 불러오기
    function getWeatherData(nx, ny) {
        const today = new Date();
        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        const hour = today.getHours();

        const dateString = year + month + day;

        const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];
        let baseTime = baseTimes.reduce((prev, curr) => (curr <= hour ? curr : prev), baseTimes[0]);
        baseTime = ('0' + baseTime).slice(-2) + '00';

        const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${weatherApiKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${dateString}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

        fetch(url)
            .then(res => res.text()) // 먼저 텍스트로 확인
            .then(text => {
                try {
                    const data = JSON.parse(text);

                    const items = data.response.body.items.item;
                    const targetTime = baseTime;
                    const forecast = {};

                    ["TMP", "SKY", "PTY", "POP", "REH", "WSD"].forEach(category => {
                        const item = items.find(i => i.fcstTime === targetTime && i.category === category);
                        if (item) forecast[category] = item.fcstValue;
                    });

                    const ptyMap = {
                        "0": "☀️ 맑음", // 강수 없음
                        "1": "🌧️ 비",
                        "2": "🌨️ 비/눈",
                        "3": "❄️ 눈",
                        "4": "🌦️ 소나기"
                    };

                    const skyMap = {
                        "1": "☀️ 맑음",
                        "3": "🌤️ 구름 많음",
                        "4": "🌥️ 흐림"
                    };

                    setWeatherDesc(forecast.PTY !== "0" ? ptyMap[forecast.PTY] : skyMap[forecast.SKY]);
                    setEmojiTemp(`🌡️ ${forecast.TMP}°C`);
                    setEmojiPop(`☔ ${forecast.POP}%`);

                    console.log({
                        날짜: dateString,
                        시간: targetTime,
                        날씨: weatherDesc,
                        기온: `${forecast.TMP}°C`,
                        강수확률: `${forecast.POP}%`,
                    });

                    setGetWeather(true)
                } catch (e) {
                    console.error("JSON 파싱 실패:", e);
                }
            })
            .catch(error => console.log("날씨 API 호출 실패:", error));
    }


    return (
        <header>
            {loading ? (
                <div className="headerWeather">
                    <div className="weather address">로딩 중...</div>
                </div>
            ) : geoLocation ? (
                <div className="headerWeather">
                    <div className="weather address">{geoAddress}</div>
                    <div className="weatherInfo">
                        <div className="weather weather3">{weatherDesc}</div>
                        <div className="weather weather4">{emojiTemp}</div>
                        <div className="weather weather5">{emojiPop}</div>
                    </div>
                </div>
            ) : (
                <div className="headerWeather">
                    <button className="weather address" onClick={askForLocation}>🔄</button>
                </div>
            )}
        </header>
    );
};

export default Header;
