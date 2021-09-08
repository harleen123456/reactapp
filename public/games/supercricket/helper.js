var gameID = 'super-cricket';
var tickerID = 0;
var intervalConfetti = 0;
var user_id = 0;
var accessToken = "";
$(document).ready(function(e) {
	accessToken = localStorage.getItem("accessToken");
	user_id = localStorage.getItem("user_id");
	var w = jQuery(window).width();
	var h = jQuery(window).height();
	$('#div-couponbg').css({'width': w+'px'});
	$('#div-couponbg').css({'height': h+'px'});
	var settings = {
		"url": "https://live.agamesapi.com/api/game/init",
		"method": "POST",
		"timeout": 0,
		"headers": {
			"async": "true",
			"crossDomain": "true",
			"content-type": "application/json",
			"accesstoken": accessToken,
			"cache-control": "no-cache",
			"processData": "false"
		},
		"data": JSON.stringify({"game_id":gameID}),
	};


	$.ajax(settings).done(function (response) {
		localStorage.setItem("gameInsID",response.data.gameInsID);
		//aaTrackPageview('pageview', 'Home', 'ACB_Supercricket_homepage');
	});
	
	$("#btnskip").click(function() {
		clearInterval(tickerID);	
		hideCoupon();
	});
	
	$("#playagain").click(function() {
		window.location.reload();
	});	
	
});

function aaTrackPageview(event_id, eventAction, page_name) {
	token_id = localStorage.getItem("token_id");
	var data = {
        'event': event_id,
        'eventCategory': 'Pageview',
        'eventAction': eventAction,
		'eventLabel': "ACB_Supercricket_homepage",
        'client_id': user_id,
        'token_id': token_id,
        'repeat_tag': '',
        'page_name': page_name
    };
    
	if (window.aa && window.aa.track) {
        window.aa.track(data);
    }

    if ('dataLayer' in window) {
        window.dataLayer.push(data);
    }
}

function aaTrackACBWithPoint(event_id, eventAction, eventLabel, page_name, points) {
	token_id = localStorage.getItem("token_id");
	var data = {		
		'event':event_id,
        'eventCategory':'ACB',
        'eventAction':eventAction,
        'eventLabel':eventLabel,
        'client_id':user_id,
        'token_id':token_id,
         'repeat_tag':'',
         'page_name':page_name,
         'total_points':points
    };
    
	
	if (window.aa && window.aa.track) {
        window.aa.track(data);
    }

    if ('dataLayer' in window) {
        window.dataLayer.push(data);
    }
}

function aaTrackACBWithCouponId(event_id, eventAction, eventLabel, page_name, coupon_id) {
	token_id = localStorage.getItem("token_id");
	var data = {
        'event': event_id,
        'eventCategory': 'ACB',
        'eventAction': eventAction,
        'eventLabel': eventLabel,
        'client_id': user_id,
        'token_id': token_id,
        'repeat_tag': '',
        'page_name': page_name,
        'coupon_id': coupon_id
    };
    
	
	if (window.aa && window.aa.track) {
        window.aa.track(data);
    }
 
    if ('dataLayer' in window) {
        window.dataLayer.push(data);
    }
}


function aaTrackData(data) {
	if (window.aa && window.aa.track) {
        window.aa.track(data);
    }

    if ('dataLayer' in window) {
        console.log(data);
        window.dataLayer.push(data);
    }
}

function hideCoupon() {
	clearInterval(tickerID);
	//clearInterval(intervalConfetti);	
	//$('#stopConfetti').click();
	
	$('#div-coupon').fadeOut('slow');
	$('#div-couponbg').hide();
	
	/* if (window.c2_callFunction)
		window.c2_callFunction("funcContinue", ["param1", "param2"]); */
}

function displayGameWinAd(){
	var gameInsID = localStorage.getItem("gameInsID");
	var accessToken = localStorage.getItem("accessToken");
	var settings = {
		"url": "https://live.agamesapi.com/api/game/event-update",	
		"method": "POST",
		"timeout": 0,
		"headers": {
			"async": "true",
			"crossDomain": "true",
			"content-type": "application/json",
			"accesstoken": accessToken,
			"cache-control": "no-cache",
			"processData": "false"
		},
		"data": JSON.stringify({"gameID":gameID, "gameInsID":gameInsID,"gameEvent":"sc_one_to_one_match_win"}),
	};

	$.ajax(settings).done(function (response) {
		var res = 'DONE';
		aaTrackACBWithPoint('acb_supercricket_won_click', 'SUPERCRICKET Won Clicks', 'WON', 'SUPERCRICKET_POINT_5', 5);
		displayGameLoseAd();
	});
}

function displayGameLoseAd(){
	var accessToken = localStorage.getItem("accessToken");
	var settings = {
		"url": "https://live.agamesapi.com/api/game/init",
		"method": "POST",
		"timeout": 0,
		"headers": {
			"async": "true",
			"crossDomain": "true",
			"content-type": "application/json",
			"accesstoken": accessToken,
			"cache-control": "no-cache",
			"processData": "false"
		},
		"data": JSON.stringify({"game_id":gameID}),
	};
	
	$.ajax(settings).done(function (response) {
		localStorage.setItem("gameInsID",response.data.gameInsID);
		var settings = {
			"url": "https://live.agamesapi.com/api/game/event-update",
			"method": "POST",
			"timeout": 0,
			"headers": {
				"async": "true",
				"crossDomain": "true",
				"content-type": "application/json",
				"accesstoken": accessToken,
				"cache-control": "no-cache",
				"processData": "false"
			},
			"data": JSON.stringify({"gameID":gameID, "gameInsID":response.data.gameInsID,"gameEvent":"sc_end_match"}),
		};

		$.ajax(settings).done(function (response) {	
			var res = 'DONE';
			$('#partnername').text(response.coupon.partner_brand);
			//$('#coupon').attr('src','https://sports.ndtv.com/agames/logos/'+response.coupon.image);
			$('#ccode').text(response.coupon.code);
			$('#cbenefits').text(response.coupon.benefit);
			const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
			var current_datetime = new Date(response.coupon.agreement_date);
			let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + ", " + current_datetime.getFullYear();			
			$('#cdate').text(formatted_date);
			$('#div-couponbg').show();
			$('#div-coupon').fadeIn('slow');
			aaTrackACBWithCouponId('acb_supercricket_ad_click', 'SUPERCRICKET Ad Clicks', 'AD', 'SUPERCRICKET_AD', response.coupon.coupon_id);
			/* $('#startConfetti').click();
			intervalConfetti = setTimeout (function(){
				$('#stopConfetti').click();
			},10000); */
			
			googletag.cmd.push(function() {
				googletag.pubads().refresh([adSlot1]);
			});
			var timeleft = 10;
			tickerID = setInterval(function(){
				var leftover = 10 - timeleft;
				if(timeleft == 0){
					clearInterval(tickerID);
					hideCoupon();
				}
				timeleft -= 1;
			}, 1000);
			
		});
	});
}