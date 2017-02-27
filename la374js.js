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
		$("a:not(div.pictures a)").each(function() {
   			var $this = $(this);       
   			var _href = $this.attr("href"); 
   			$this.attr("href", _href + '?lang=fr');
		});
}

//Fill-in urls towards slideshows, including which picture is being clicked
$("a.slideshow").each(function() {
	var _pjt = /[/]portfolio[/](.*?)([?]lang=fr)*$/.exec(wlh)[1];
	var $this = $(this);       
	var _img = $this.children().first().attr("src");
	var _img2 = _img.replace('../images/layout_600/','');
	$this.attr("href", 'slideshows/' + _pjt + '?img=' + _img2);
});

//If url has an img suffix
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
		_next = _next.replace('../../images/slideshow/','');
		$("a.next").attr("href", _href + _next);

		var _prev = $("[src $= '" + ssimg + "']").prev().attr("src");
		if (typeof _prev === "undefined") {
			_prev = $("[src $= '" + ssimg + "']").siblings("img").last().attr("src");
		}
		_prev = _prev.replace('../../images/slideshow/','');
		$("a.previous").attr("href", _href + _prev);
}

