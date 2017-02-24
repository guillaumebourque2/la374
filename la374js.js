//Switching between languages
$("#language").click(function() {
	//Redirect to the url that matches the current language
		if (/[?]lang=fr/.test(window.location.href) ) {
			window.location.href = window.location.href.split('?')[0];
		} else {
			window.location.href = '?lang=fr';
		}
});

//If url has the suffix for French
if (/[?]lang=fr/.test(window.location.href) ) {
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
if (/portfolio/.test(window.location.href) ) {
		$("div.pictures a").each(function() {
   			var $this = $(this);       
   			var _href = $this.attr("href"); 
   			var _img = $this.children().first().attr("src");
   			var _img2 = _img.replace('../images/layout_600/','');
   			$this.attr("href", _href + '?img=' + _img2);
		});
}

//If url has an img suffix
if (/[?]img=/.test(window.location.href) ) {
    var ssimg = /[?]img=(.*?)$/.exec(window.location.href)[1];
    ssimg = ssimg.replace(/%20/g, " ")
	console.log(ssimg);
	$("[src$='" + ssimg + "']").css({"display":"block"});
}
