
const BASE_URL = "http://13.235.223.102:8000/v1/"

const FETCH_TIMEOUT = 60000;

const buildUrl = async (url, parameters) => {
    let qs = '';
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1); // chop off last "&"
        url = `${url}?${qs}`;
    }
    // // console.log(url)
    return url;
};

export const getData = async (api, method = 'GET', params) => {

    let token = localStorage.getItem('token');

    let url = await buildUrl(`${BASE_URL}${api}`);
    let didTimeOut = false;

    return new Promise(function (resolve, reject) {
        const timeout = setTimeout(function () {
            didTimeOut = true;
            reject(new Error('Request Time Out'));
        }, FETCH_TIMEOUT);

        fetch(
            url,
            {
                method: `${method}`,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            }
        )
            .then(response => {
                // Clear the timeout as cleanup
                clearTimeout(timeout);
                if (!didTimeOut) {
                    if (response) {
                        return response.json();
                    } else {
                        reject(new Error('No data found'));
                    }
                }
            })
            .then(formattedResponse => {
                let responseData = formattedResponse.data || formattedResponse;
                resolve(responseData);
            })
            .catch(error => {
                // console.log('GET fetch failed! ', error.message);
                reject(new Error('Something went wrong'));
            })
    })
        .then(responseData => {
            return responseData;
        })
        .catch(err => {

            // console.log({ status: { err_cd: err.message } });
            return { status: { err_cd: err.message } }
        });



    // EARLIER CODE ##################3

    // const response = await fetch(
    //     await buildUrl(`${BASE_URL}${api}`),
    //     {
    //         method: `${method}`,
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token
    //         },
    //     }
    // ).catch(error => {
    //     __Alert("Internet Error");

    // });
    // // console.log(response);
    // if (response) {
    //     const formattedResponse = await response.json().catch(e => { })
    //     const responseData = await formattedResponse.data || formattedResponse;
    //     return responseData;
    // } else {
    //     return { status: { err_cd: 404 } }
    // }

};

export const postData = async (api, method = 'POST', payload) => {
    // // console.log("ghj",`${BASE_URL}${api}`)
    
    let token = localStorage.getItem('token');
    // // console.log(token)
    let didTimeOut = false;
    return new Promise(function (resolve, reject) {
        const timeout = setTimeout(function () {
            didTimeOut = true;
            reject(new Error('Request Time Out'));
        }, FETCH_TIMEOUT);

        //console.log(`${BASE_URL}${api}`, payload, token);
        fetch(`${BASE_URL}${api}`,
            {
                method: `${method}`,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                // Clear the timeout as cleanup
                clearTimeout(timeout);
                if (!didTimeOut) {
                    if (response) {
                        return response.json();
                    } else {
                        reject(new Error('No data found'));
                    }
                }
            })
            .then(formattedResponse => {
                // console.log("API RESPONSE ",formattedResponse)
                resolve(formattedResponse);
            })
            .catch(err => {
                // console.log('POST fetch failed! ', err);
                if (didTimeOut) return;
                reject(new Error('Something went wrong'));
            });
    })
        .then(formattedResponse => {
            return formattedResponse;
        })
        .catch(function (err) {

            // console.log({ status: { err_cd: err.message } });
            return { status: { err_cd: err.message } }
        });


    // OLD CODE ############################3

    // const response = await fetch(`${BASE_URL}${api}`,
    //     {
    //         method: `${method}`,
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token
    //         },
    //         body: JSON.stringify(payload)
    //     }).catch(error => {
    //         __Alert("Internet Error");

    //     });

    // if (response) {
    //     const formattedResponse = await response.json().catch(e => { })
    //     return formattedResponse;
    // } else {
    //     return { status: { err_cd: 404 } }
    // }

};

export const getFacebookData = async (method = 'POST', accessToken) => {
    
    let token = localStorage.getItem('token');
    let didTimeOut = false;
    return new Promise(function (resolve, reject) {
        const timeout = setTimeout(function () {
            didTimeOut = true;
            reject(new Error('Request Time Out'));
        }, 60000);

        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large),friends&access_token=' + accessToken)
            .then(response => {
                // Clear the timeout as cleanup
                clearTimeout(timeout);
                if (!didTimeOut) {
                    if (response) {
                        return response.json();
                    } else {
                        reject(new Error('No data found'));
                    }
                }
            })
            .then(formattedResponse => {
                resolve(formattedResponse);
            })
            .catch(err => {
                // console.log('POST fetch failed! ', err);
                if (didTimeOut) return;
                reject(new Error('Something went wrong'));
            });
    })
        .then(formattedResponse => {
            return formattedResponse;
        })
        .catch(function (err) {

            // console.log({ status: { err_cd: err.message } });
            return { status: { err_cd: err.message } }
        });
};

export const updateData = async (api, method = 'PUT', id, payload) => {
    let didTimeOut = false;
    return new Promise(function (resolve, reject) {
        const timeout = setTimeout(function () {
            didTimeOut = true;
            reject(new Error('Request Time Out'));
        }, FETCH_TIMEOUT);

        fetch(`${BASE_URL}${api}/${id}`,
            {
                method: `${method}`,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(function (response) {
                // Clear the timeout as cleanup
                clearTimeout(timeout);
                if (!didTimeOut) {
                    if (response) {
                        return response.json();
                    } else {
                        reject(new Error('No data found'));
                    }
                }
            })
            .then(formattedResponse => {
                resolve(formattedResponse);
            })
            .catch(function (err) {
                // console.log('update fetch failed! ', err.message);
                // Rejection already happened with setTimeout
                if (didTimeOut) return;
                // Reject with error
                reject(new Error('Something went wrong'));
            });
    })
        .then(formattedResponse => {
            return formattedResponse;
        })
        .catch(err => {

            // console.log({ status: { err_cd: err.message } });
            return { status: { err_cd: err.message } }
        });


    // OLD CODE #############
    // const response = await fetch(`${BASE_URL}${api}/${id}`,
    //     {
    //         method: `${method}`,
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(payload)
    //     }).catch(error => {
    //         __Alert("Internet Error");

    //     });
    // if (response) {
    //     const formattedResponse = await response.json().catch(e => { })
    //     return formattedResponse;
    // } else {
    //     return { status: { err_cd: 404 } }
    // }

};


export const uploadImage = async (api, formdata) => {
    
    //  let token = await AsyncStorage.getItem('token');
    let didTimeOut = false;
    // console.log(formdata,`${BASE_URL}${api}`, token)
    return new Promise(function (resolve, reject) {
        const timeout = setTimeout(function () {
            didTimeOut = true;
            reject(new Error('Request Time Out'));
        }, 60000);

        fetch(`${BASE_URL}${api}`,
            {
                method: "POST",
                body: formdata,
            })
            .then(response => {
               
                clearTimeout(timeout);
                if (!didTimeOut) {
                    if (response) {
                        return response.json();
                    } else {
                        reject(new Error('No data found'));
                    }
                }
            })
            .then(formattedResponse => {
                 console.log("hello1", formattedResponse)
                resolve(formattedResponse);
                
            })
            .catch(function (err) {
                 console.log('upload image fetch failed! ', err);
                // Rejection already happened with setTimeout
                if (didTimeOut) return;
                // Reject with error
                reject(new Error('Something went wrong'));
            });
    })
        .then(formattedResponse => {
            // Request success and no timeout
            return formattedResponse;
        })
        .catch(err => {

            // console.log({ status: { err_cd: err.message } });
            return { status: { err_cd: err.message } }
        });

    // OLD CODE ########################
    // const response = await fetch(`${BASE_URL}${api}`,
    //     {
    //         method: "POST",
    //         body: formdata
    //     }).catch(error => {
    //         // console.warn("Internet Error", error);
    //     });
    // if (response) {
    //     const formattedResponse = await response.json().catch(e => { })
    //     return formattedResponse;
    // } else {
    //     return { status: { err_cd: 404 } }
    // }

};