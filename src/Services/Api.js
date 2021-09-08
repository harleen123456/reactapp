import { url } from '../Config/Config'

export const postData = async (api, method = 'POST', payload) => {
    var accessToken = localStorage.getItem("accessToken");

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    //---
    let sharePayload = JSON.parse(JSON.stringify(payload));
    //console.log(api);
    //console.log(accessToken);
    if(api !== "user/handshake"){
        if (accessToken) {
            headers.accessToken = accessToken;
        }
    }
    // if (accessToken) {
    //     headers.accessToken = accessToken;
    //     sharePayload.accessToken = accessToken
    // }

//    if ('aa' in window) {
//        window.aa.track(sharePayload);
//    }
    //console.log(url);
    const response = await fetch(`${url}${api}`,
        {
            method: `${method}`,
            headers: headers,
            body: JSON.stringify(payload)
        }).catch(error => {
        });

    if (response) {
        const formattedResponse = await response.json();
//        if ('aa' in window) {
//            window.aa.track(formattedResponse);
//        }
        return formattedResponse;
    } else {
        return {};
    }
};

export const getData = async (api, method = 'GET') => {
    var accessToken = localStorage.getItem("accessToken");

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    if (accessToken) {
        headers.accessToken = accessToken;
    }

    let formattedResponse = {};

    try {
        let response = await fetch(`${url}${api}`, {
            method: `${method}`,
            headers: headers,
        }
        )
        formattedResponse = await response.json();
    } catch (error) {
        //
    }
    return formattedResponse;
};

export const getGameIds = async (api, method = 'POST', payload) => {
    var accessToken = localStorage.getItem("accessToken");

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    
        if (accessToken) {
            headers.accessToken = accessToken;
        }
    

    const response = await fetch(`${url}${api}`,
        {
            method: `${method}`,
            headers: headers,
            body: JSON.stringify(payload)
        }).catch(error => {
        });

    if (response) {
        try {
            const formattedResponse = await response.json();
            return formattedResponse;
        } catch (error) {
            return {};
        }

    } else {
        return {};
    }
};

export const getExternal = async (url) => {

    let response, formattedResponse = {};

    try {
        response = await fetch(url, { method: 'GET' });
        formattedResponse = await response.json();
    } catch (e) {
        console.log(e);
    }
    return formattedResponse;

}
