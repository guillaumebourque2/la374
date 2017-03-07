//Switching between languages
$("#language").click(function() {
	//Redirect to the url that matches the current language
		if (/[?]lang=fr/.test(window.location.href) ) {
			window.location.href = window.location.href.split('?')[0];
		} else {
			window.location.href = '?lang=fr';
		}
});

//Defining a variable with page url, as it is reused many times in 
//following code (but without modifying it as in first if)
var wlh = window.location.href;

//If url has the suffix for French
if (/[?]lang=fr/.test(wlh) ) {
	//Switch text to the other language
		$("span[lang|='en']").toggle(0);
		$("span[lang|='fr']").toggle(0);
	//Switch links to French versions
		$("a:not(.slideshow):not(#instagram)").each(function() {
   			var $this = $(this);       
   			var _href = $this.attr("href"); 
   			$this.attr("href", _href + '?lang=fr');
		});
		$("a#instagram").each(function() {
   			var $this = $(this);       
   			var _href = $this.attr("href"); 
   			$this.attr("href", _href + '?hl=fr');
		});
	//Switch html language (for google translate purposes) to French
		$("html").attr("lang", "fr");
}

//Fill-in urls towards slideshows, including which picture is being clicked
$("a.slideshow").each(function() {
	var _pjt = /[/]portfolio[/](.*?)([?]lang=fr)*$/.exec(wlh)[1];
	var $this = $(this);       
	var _img = $this.children().first().attr("src");
	var _img2 = _img.replace(/^.*?[/]images[/]layout_600[/]/,'');
	$this.attr("href", 'slideshows/' + _pjt + '?img=' + _img2);
});

//If url has an img suffix (slideshows)
if (/[?]img=/.test(wlh) ) {
	//Display current image
    var ssimg = /[?]img=(.*?)$/.exec(wlh)[1];
    ssimg = ssimg.replace(/%20/g, " ");
	$("[src$='" + ssimg + "']").css({"display":"block"});

	//Next and previous slideshow-buttons
	var _href = /^.*?[?]img=/.exec(wlh)[0];

		var _next = $("[src $= '" + ssimg + "']").next().attr("src");
		if (typeof _next === "undefined") {
			_next = $("[src $= '" + ssimg + "']").siblings("img").first().attr("src");
		}
		_next = _next.replace(/^.*?[/]images[/]slideshow_900[/]/,'');
		$("a.next").attr("href", _href + _next);

		var _prev = $("[src $= '" + ssimg + "']").prev().attr("src");
		if (typeof _prev === "undefined") {
			_prev = $("[src $= '" + ssimg + "']").siblings("img").last().attr("src");
		}
		_prev = _prev.replace(/^.*?[/]images[/]slideshow_900[/]/,'');
		$("a.previous").attr("href", _href + _prev);

	//Swipe-control of slideshow
	//Simple swipe detection on vanilla js
	//Based on https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
	//Using swipe definition from https://api.jquerymobile.com/swipeleft/
	var touchstartX = 0;
	var touchstartY = 0;
	var touchendX = 0;
	var touchendY = 0;
	var timestart = 0;
	var timeend = 0;

	document.getElementById("version").innerHTML = "Version 1.16";

	var gesuredZone = document.getElementsByClassName('gesuredZone')[0];

	gesuredZone.addEventListener('touchstart', function(event) {
		touchstartX = event.changedTouches[0].screenX;
		touchstartY = event.changedTouches[0].screenY;
		timestart = Date.now();
	}, false);

	gesuredZone.addEventListener('touchend', function(event) {
		touchendX = event.changedTouches[0].screenX;
		touchendY = event.changedTouches[0].screenY;
		timeend = Date.now();
		handleGesure();
	}, false); 

	function handleGesure() {
		if (touchendX < touchstartX && 
			Math.abs(touchendX - touchstartX) >= 30 && 
			Math.abs(touchendY - touchstartY) < 30 &&
			(timeend - timestart) / 1000 <= 1) {
				// $("a.next").click();
				alert("swipe left");
		}
		if (touchendX > touchstartX && 
			Math.abs(touchendX - touchstartX) >= 30 && 
			Math.abs(touchendY - touchstartY) < 30 &&
			(timeend - timestart) / 1000 <= 1) {
				alert("swipe right");
				// $("a.previous").click();
		}
	}
	//Swipe-control of slideshow
		$("div.slideshow").on("swiperight", function() {
			$("a.previous").click();
		});
		$("div.slideshow").on("swipeleft", function() {
			$("a.next").click();
		});

	//Link to full resolution images
	$("a.full-res").attr("href", "../../images/full_size/" + ssimg);
}


//To switch between smartphone slideshow pictures and tablet/desktop slideshow pictures
function higherRes() {
	if (window.matchMedia("(min-width: 601px)").matches) {
		$("div.slideshow img").each(function() {
			var $this = $(this);       
			var _src = $this.attr("src");
			$this.attr("src", _src.replace('slideshow_900/','slideshow_2000/'));
		});
	}
}
higherRes();
