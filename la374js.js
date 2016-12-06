//Switching between languages on narrow devices (smartphones)
function language() {
	//Desactivate any previous click on accordion buttons
	$(".btnRow .accordionBtn").removeClass("active");			
	$(".accordionPanel").slideUp(0);

	language2()
}
function language2() {
	//Switch news tile and accordions buttons to the other language
	if ($("button.language").html() === "&nbsp;English&nbsp;") {
		//French to English
		$(".btnRow [lang|='en']").css({"display": "block"});
		$(".news:lang(en)").css({"display": "block"});

		$(".btnRow [lang|='fr']").css({"display": "none"});
		$(".news:lang(fr)").css({"display": "none"});

		$("button.language").html("Français");

	} else {
		//English to French
		$(".btnRow [lang|='fr']").css({"display": "block"});
		$(".news:lang(fr)").css({"display": "block"});

		$(".btnRow [lang|='en']").css({"display": "none"});
		$(".news:lang(en)").css({"display": "none"});

		$("button.language").html("&nbsp;English&nbsp;");
	}
}

//Switching automatically to French if coming from a project page in French
if (/[?]lang=fr/.test(window.location.href) ) {
		language2();
}

