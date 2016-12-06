//Switching between languages on narrow devices (smartphones)
$("#language").click(function() {
	//Switch text to the other language
		$("span[lang|='en']").toggle(0);
		$("span[lang|='fr']").toggle(0);
});

//Switching automatically to French if coming from a project page in French, 
//or in any other cases where the url includes "?lang=fr"
if (/[?]lang=fr/.test(window.location.href) ) {
	document.getElementById("language").click();
}

