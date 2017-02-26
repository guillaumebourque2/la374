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

//If a project-page, fill-in urls to include which picture is being clicked
//If url contains portfolio, but not slideshows
if (/[/]portfolio[/]/.test(wlh)) {
	if (/[/]slideshows[/]/.test(wlh)) {
	} else {
		$("a.slideshow").each(function() {
   			var _pjt = /[/]portfolio[/](.*?)([?]lang=fr)*$/.exec(wlh)[1];
   			var $this = $(this);       
   			var _img = $this.children().first().attr("src");
   			var _img2 = _img.replace('../images/layout_600/','');
   			$this.attr("href", 'slideshows/' + _pjt + '?img=' + _img2);
		});
	}
}

//If url has an img suffix
if (/[?]img=/.test(wlh) ) {
    var ssimg = /[?]img=(.*?)$/.exec(wlh)[1];
    ssimg = ssimg.replace(/%20/g, " ");
	$("[src$='" + ssimg + "']").css({"display":"block"});
}
