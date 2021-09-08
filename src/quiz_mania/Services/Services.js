import { getData, postData } from "./FetchApi"

export const getTeams = async () => {
    let response = await getData("quiz/teams");
    return response;
}

export const sendInvite = async (payload) => {
    let response = await postData("quiz/create-room", "POST", payload);
    return response;
}

export const confirmInvite = async (payload) => {
    let response = await postData("quiz/joinroom", "POST", payload);
    return response;
}


export const checkQuizStatus = async (payload) => {
    let response = await postData("quiz/check-room-status", "POST", payload);
    return response;
}

export const startQuiz = async (payload) => {
    let response = await postData("quiz/start-quiz", "POST", payload);
    return response;
}

export const getNextQuestion = async (payload) => {
    let response = await postData("quiz/question", "POST", payload);
    return response;
}
export const getQuizPoints = async (payload) => {
    let response = await postData("quiz/points", "POST", payload);
    return response;
}
export const getTieNextQstn = async (payload) => {
    let response = await postData("quiz/tb-question", "POST", payload);
    return response;
}

