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
}
