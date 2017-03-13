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
    $("[src$='" + ssimg + "']").removeClass("inactive").addClass("active");


	//Link to full resolution images
	var current = $("img.active");
	function updateFullResLink() {
		var currentFullRes = current.attr('src').replace(/^.*?[/]images[/]slideshow_[0-9]*?[/]/,'');
		$("a.full-res").attr("href", "../../images/full_size/" + currentFullRes);
	}
	updateFullResLink();


	//Next and previous slideshow-buttons
	$('a.next').click( function(e) {
		e.preventDefault(); 

		var _next = current.next("img");
		if (typeof _next[0] === "undefined") {
			_next = current.siblings("img").first();
		}
		current.removeClass("active").addClass("inactive");
		_next.removeClass("inactive").addClass("active");
		current = $("img.active");
		updateFullResLink();

		return false; //prevent browser from following link, as only within page action is needed
	} );

	$('a.previous').click( function(e) {
		e.preventDefault(); 

		var _prev = current.prev("img");
		if (typeof _prev[0] === "undefined") {
			_prev = current.siblings("img").last();
		}
		current.removeClass("active").addClass("inactive");
		_prev.removeClass("inactive").addClass("active");
		current = $("img.active");
		updateFullResLink();

		return false; //prevent browser from following link, as only within page action is needed
	} );

	$('a.close').click( function(e) {
		e.preventDefault(); 

		window.history.back();

		return false; //prevent browser from following link, as only within page action is needed
	} );


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
				$("a.next").click();
		}
		if (touchendX > touchstartX && 
			Math.abs(touchendX - touchstartX) >= 30 && 
			Math.abs(touchendY - touchstartY) < 30 &&
			(timeend - timestart) / 1000 <= 1) {
				$("a.previous").click();
		}
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
}
