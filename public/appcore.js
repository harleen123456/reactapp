//const base_url = 'https://live.agamesapi.com/api/';
//const base_url = 'http://localhost:8082/';
//const base_url = 'https://stage-api.mtech.ndtv.net.in/api/';
const base_url = 'https://api-fundoo.ndtv.com/api/';
const baseURI = "https://sports.ndtv.com/agames/";

const user_id = localStorage.getItem("user_id");
const token_id = localStorage.getItem("token_id");

localStorage.setItem('showAbout', true);

const param = function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

const aatrackdata = (data) => {
    if (localStorage.getItem('utm_source')) {
        data.utm_source = localStorage.getItem('utm_source')
    }

    if (localStorage.getItem('utm_medium')) {
        data.utm_medium = localStorage.getItem('utm_medium')
    }
    if (localStorage.getItem('utm_campaign')) {
        data.utm_campaign = localStorage.getItem('utm_campaign')
    }

    if (localStorage.getItem('utm_term')) {
        data.utm_term = localStorage.getItem('utm_term')
    }

    if (localStorage.getItem('utm_content')) {
        data.utm_content = localStorage.getItem('utm_content')
    }

    // ------------------------------------------------===============

    if (window.aa && window.aa.track) {
        window.aa.track(data);
    }

    if ('dataLayer' in window) {
        console.log(data)
        window.dataLayer.push(data);
    }

}

//for all page load
//event_id = pageview, eventAction=Page Title
const aaTrackPageview = ( event_id, eventAction, page_name) => {
    var data = {
        'event': event_id,
        'eventCategory': 'Pageview',
        'eventAction': eventAction,
        'client_id': user_id,
        'token_id': token_id,
        'repeat_tag': null,
        'page_name': page_name,
        'eventLabel': page_name
    };
    aatrackdata(data);
}

//for clicks, add as below events
// ['event':'acb_home_click','eventAction':'Home Page Clicks','eventLabel':{{dynamic}},//  about, click to play]
const aaTrackACB = (event_id, eventAction, eventLabel, page_name) => {
    var data = {
        'event': event_id,
        'eventCategory': 'ACB',
        'eventAction': eventAction,
        'eventLabel': eventLabel,
        'client_id': user_id,
        'token_id': token_id,
        'repeat_tag': null,
        'page_name': page_name
    };
    aatrackdata(data);
}

//for clicks, add as below events
//['event':'acb_info_click','eventAction':'Info Drawer Clicks','eventLabel':{{dynamic}},// skip,play other games]
//['event':'acb_free_hit_click', 'eventAction':'Free Hit Clicks', 'eventLabel':{{dynamic}},// spin me, back]
//['event':'acb_free_hit_vide_ad_click', 'eventAction':'Free Hit Clicks', 'eventLabel':'Ad | {{dynamic}}',//  close, back, get]
//['event':'acb_free_hit_popup_click', 'eventAction':'Free Hit Clicks', 'eventLabel':'Pop Up | {{dynamic}}',//  skip, back, copy]
const aaTrackACBWithPoints = ( event_id, eventAction, eventLabel, page_name, total_points) => {
    var data = {
        'event': event_id,
        'eventCategory': 'ACB',
        'eventAction': eventAction,
        'eventLabel': eventLabel,
        'client_id': user_id,
        'token_id': token_id,
        'repeat_tag': null,
        'page_name': page_name,
        'total_points': total_points
    };
    aatrackdata(data);
}

//for clicks
//['event':'acb_home_click', 'eventAction':'Home Page Banner  Clicks', 'eventLabel':{{dynamic}},// about, click to play]
const aaTrackACBWithPositionPoints = ( event_id,  eventAction, eventLabel, page_name, position, total_points) => {
    var data = {
        'event': event_id,
        'eventCategory': 'ACB',
        'eventAction': eventAction,
        'eventLabel': eventLabel,
        'client_id': user_id,
        'token_id': token_id,
        'repeat_tag': null,
        'page_name': page_name,
        'position': position,
        'total_points': total_points
    };
    aatrackdata(data);
}

//for clicks
//['event':'acb_predict_to_win_click', 'eventAction':'Predict to Win Clicks', 'eventLabel': {{dynamic}},// button text]
//['event':'acb_predict_to_win_submit', 'eventAction':'Predict to Win Clicks', 'eventLabel': 'Answer Submit | {{option sel}}',]
//['event':'acb_predict_to_win_popup_click', 'eventAction':'Predict to Win Clicks', 'eventLabel': 'Pop Up | {{button text}}',]
//['event':'acb_quiz_mania_click', 'eventAction':'Quiz Mania Clicks', 'eventLabel': {{button text}},]
//['event':'acb_quiz_mania_share', 'eventAction':'Quiz Mania Clicks', 'eventLabel': 'Share | {{medium}}],i.e. facebook, whatsapp'
//['event':'acb_quiz_mania_invite', 'eventAction':'Quiz Mania Clicks', 'eventLabel': 'Invite',]
//['event':'acb_quiz_mania_load_click', 'eventAction':'Quiz Mania Load Clicks', 'eventLabel': {{dynamic}},// button text]
//['event':'acb_quiz_mania_load_submit', 'eventAction':'Quiz Mania Load Clicks', 'eventLabel': 'Answer Submit | {{option] selected}}',
//['event':'acb_quiz_mania_load_popup_click', 'eventAction':'Quiz Mania Load Clicks', 'eventLabel': 'Pop Up | {{button text}}',]
//['event':'acb_quiz_mania_load_you_win', 'eventAction':'Quiz Mania Load Clicks', 'eventLabel': 'You Win | Close',]
//['event':'acb_cpl_click', 'eventAction':'CPL Clicks', 'eventLabel': {{dynamic}},// team name or button text]
//['event':'acb_cpl_you_win', 'eventAction':'CPL Clicks', 'eventLabel': 'You Win | {{button text}}',]
//['event':'acb_cpl_ad_click', 'eventAction':'CPL Clicks', 'eventLabel': 'Ad | {{button text}}',i.e. close, back, get] 
//['event':'acb_my_prizes_click', 'eventAction':'My Prizes Clicks', 'eventLabel': '{{button text}}',]
//['event':'acb_my_prizes_popup_click', 'eventAction':'My Prizes Clicks', 'eventLabel': 'Pop Up | {{button text}}',]
const aaTrackACBWithCouponId = ( event_id,  eventAction, eventLabel, page_name, coupon_id) => {
    var data = {
        'event': event_id,
        'eventCategory': 'ACB',
        'eventAction': eventAction,
        'eventLabel': eventLabel,
        'client_id': user_id,
        'token_id': token_id,
        'repeat_tag': null,
        'page_name': page_name,
        'coupon_id': coupon_id
    };
    aatrackdata(data);
}