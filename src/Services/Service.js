import { postData, getData, getExternal, getGameIds } from './Api';

export const getLeaderboard = async () => {
    const response = await getData('v1/match/get-leaders', 'GET');
    return response;
};
export const checkPrize = async () => {
    const response = await getData('reward/check', 'GET');
    return response;
};

export const getRewards = async (page) => {
    const response = await getData('reward/get-rewards?pageNumber=' + page, 'GET');
    return response;
};

export const filterRewards = async payload => {
    const response = await postData('reward/get-rewards-filter', 'POST', payload);
    return response;
};
export const saveUserData = async payload => {
    const response = await postData('user/address', 'POST', payload);
    return response;
};

export const handshake = async (token, mobile, secret) => {
    let payload = {
        dvcid: "212121",
        ip: "10.12.12.12",
        mobile: mobile,
        secret: secret,
        token_id: token
    }
    const response = await postData('user/handshake', 'POST', payload);
    return response;
}

export const directhandshake = async (token, mobile, secret, username) => {
    let payload = {
        dvcid: "212121",
        ip: "10.12.12.12",
        mobile: mobile,
        secret: secret,
        token_id: token,
        username: username
    }
    const response = await postData('user/handshake', 'POST', payload);
    return response;
}

export const getNews = async () => {
    let response = {};
    try {
        response = await getData('news/list');

        //        response = await getExternal('https://sports.ndtv.com/agames/feed-json/news-list.json');

        // response = await getExternal('https://search.ndtv.com/news/json/client_key/ndtv-sports-net-63f182f9ff0ef81f442afa570852b5d6/?extra_params=ssl,entities_id,device,short_headline,categories,category,fullimage,tags,by_line,thumb_image,keywords&blog_id=4&categories=&content_type=news&product_code=2138&page=1&pagesize=18&show_in_apps=1');

    } catch (e) {
        console.error(e);
    }
    return response;
};

export const getHomePageLeaderboard = async () => {
    const response = await getData('v1/match/get-leaderboard', 'GET');
    return response;
};

export const updateUsername = async payload => {
    const response = await postData('user/update', 'POST', payload);
    return response;
};

export const getCricketScore = async () => {
    const response = await getData('airtel/getJson', 'GET');
    return response;
};

export const getCricketScoreCard = async (payload) => {
    const response = await postData('ipl/getDataMatchId', 'POST', payload);
    return response;
};

export const saveUserAddress = async payload => {
    const response = await postData('user/address', 'POST', payload);
    return response;
};

export const getGameList = async () => {
    const response = await getData('game/game-list', 'GET');
    return response;
};


export const saveUserDeatils = async (payload, userData) => {
    const response = await postData('user/address?name=' + userData.name + '&email=' + userData.email
        + '&mobile=' + userData.mobile, 'POST', payload);
    return response;
};

export const getMatchDetails = async (id) => {
    const response = await getData('airtel/matchDetail?param1=' + id, 'GET');
    return response;
};

export const setFlagData = async payload => {
    const response = await postData('v1/match/setFlag', 'POST', payload);
    return response;
};


export const getSpinInit = async payload => {
    const response = await postData('spin/init', 'POST', payload);
    return response;
};

export const getTeams = async () => {
    // console.log("jdhfjashjkfaskfhaskhfkasjfasjfasfdfklds")
    const response = await getData('qm/team/list', 'GET');
    return response;
};

export const confirmInvite = async (payload) => {
    // console.log("jdhfjashjkfaskfhaskhfkasjfasjfasfdfklds")
    const response = await postData('qm/quiz/join-room', 'POST', payload);
    return response;
};

export const sendInvite = async (payload) => {
    const response = await postData('qm/quiz/create-room', 'POST', payload);
    return response;
};
export const checkQuizStatus = async (payload) => {
    const response = await postData('qm/quiz/room-status', 'POST', payload);
    return response;
};

export const startQuiz = async (payload) => {
    const response = await postData('qm/quiz/start-quiz', 'POST', payload);
    return response;
};

export const quitQuiz = async (payload) => {
    const response = await postData('qm/quiz/quit-quiz', 'POST', payload);
    return response;
};
export const selfQuizTimeout = async (payload) => {
    const response = await postData('qm/quiz/self-timeout', 'POST', payload);
    return response;
};

export const getNextQuestion = async payload => {
    const response = await postData('qm/quiz/question', 'POST', payload);
    return response;
};
export const getQuizPoints = async (payload) => {
    const response = await postData('qm/quiz/points', 'POST', payload);
    return response;
};

export const gameInit = async (payload) => {
    const response = await postData('game/init', 'POST', payload);
    return response;
};
export const getGames = async (payload) => {
    const response = await getGameIds('game/init', 'POST', payload);
    return response;
};

export const gameUpdate = async (payload) => {
    const response = await postData('game/event-update', 'POST', payload);
    return response;
};

export const getTieNextQstn = async (payload) => {
    const response = await postData('qm/quiz/tb-question', 'POST', payload);
    return response;
};

export const getTiePoints = async (payload) => {
    const response = await postData('qm/quiz/tb-points', 'POST', payload);
    return response;
};
export const getJson = async (name) => {
    const response = await getExternal(name, 'GET');
    return response;
}

export const getTncData = async (brand) => {
    // console.log(brand)
    // testing ---
    // brand = 'Beardo'
    const response = await getData('reward/get-brand?brand=' + brand, 'GET');
    return response;
}