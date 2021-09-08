var gameID = 'fielder-challenge';
var checkEnd = 0;
var tickerID = 0;
var intervalConfetti = 0;
var catchCount = 0;
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
		//aaTrackPageview('pageview', 'Fielder Game', 'Fielder Game');
	});
	
	$("#btnskip").click(function() {
		clearInterval(tickerID);	
		hideCoupon();
	});
	
	$("#playagain").click(function() {
		aaTrackACBWithCouponId('acb_fielder_playagain_click', 'FIELDER Playagain Clicks', 'Pop Up | Play again', 'FIELDER_PLAYAGAIN', 0);
		window.location.reload();
	});
	
	$("#playmore").click(function() {
		aaTrackACBWithCouponId('acb_fielder_playmore_click', 'FIELDER Playmore Clicks', 'Pop Up | Play More Games', 'FIELDER_PLAYMOREGAMES', 0);
		window.open("https://sports.ndtv.com/agames/", "_self");
	});
	
});

function refreshGameInit() {
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
	});
}

function aaTrackPageview(event_id, eventAction, page_name) {
	token_id = localStorage.getItem("token_id");
	var data = {
        'event': event_id,
        'eventCategory': 'Pageview',
        'eventAction': eventAction,
		'eventLabel': "",
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
		console.log(data);
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
		console.log(data);
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
	checkEnd = 0;
	catchCount = 0;
}

function successCaught(){
	catchCount = catchCount + 1;
	if(catchCount == 4) {
		addPoints();
		catchCount = 0;
	}
}

function missedCatch(){
	catchCount = 0;
}

function addPoints() {
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
		"data": JSON.stringify({"gameID":gameID, "gameInsID":gameInsID,"gameEvent":"cfc_catches"}),
	};

	$.ajax(settings).done(function (response) {
		var res = 'DONE';
		aaTrackACBWithPoint('acb_fielder_catch_click', 'FIELDER Catch Clicks', 'CATCH', 'FIELDER_POINT_5', 5);
	});	
}
function displayGameOverAd(){
	if(checkEnd == 0) {
		checkEnd = 1;
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
			"data": JSON.stringify({"gameID":gameID, "gameInsID":gameInsID,"gameEvent":"cfc_end_game"}),
		};

		$.ajax(settings).done(function (response) {	
			var res = 'DONE';
			//$('#coupon').attr('src',response.coupon.image);
			$('#partnername').text(response.coupon.partner_brand);
			$('#ccode').text(response.coupon.code);
			$('#cbenefits').text(response.coupon.benefit);
			const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
			var current_datetime = new Date(response.coupon.agreement_date);
			let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + ", " + current_datetime.getFullYear();			
			$('#cdate').text(formatted_date);
			$('#div-couponbg').show();
			$('#div-coupon').fadeIn('slow');
			aaTrackACBWithCouponId('acb_fielder_ad_click', 'FIELDER Ad Clicks', 'AD', 'FIELDER_AD', response.coupon.coupon_id);
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
	}
}