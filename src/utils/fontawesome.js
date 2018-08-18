import fontAwesomeFont from "@fortawesome/fontawesome-pro/js/all";

function fontAwesome() {
	document.head.appendChild(fontAwesomeFont);
	console.log("injected fontawesome");
}

function injectOnload() {
	window.onload = fontAwesome;
}

export default injectOnload;
