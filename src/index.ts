let editor;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|android|ipad|playbook|silk/i.test(navigator.userAgent) ) {
	document.querySelector<HTMLParagraphElement>("#introduction")!.innerHTML = "BeepBox is an online tool for sketching and sharing instrumental music. Make sure that your volume is turned up, then press the play button!";
	document.querySelector<HTMLDivElement>("#keyboard-instructions")!.style.display = "none";
	document.querySelector<HTMLDivElement>("#mobile-instructions")!.style.display = "";
	document.querySelector<HTMLSpanElement>("#bar-editing")!.innerHTML = "Tap the boxes to move to a different part of the song, or tap on the currently selected box to swap which pattern is played during that part of the song.";
	document.querySelector<HTMLParagraphElement>("#offline-instructions")!.innerHTML = 'You can use BeepBox when your device is offline if you put a shortcut to BeepBox on your home screen. <ul><li>Chrome: find the "Add to Home Screen" option in the ⋮ menu.</li><li>Firefox: find the "Add Page Shortcut" option in the ⋮ menu.</li><li>Safari: find the "Add to Home Screen" option in the bookmark menu.</li></ul>';
}

function browserHasRequiredFeatures(): boolean {
	"use strict";
	if (window.AudioContext == undefined && window.webkitAudioContext == undefined) {
		return false;
	}
	
	try {
		eval("class T {}");
		eval("const a = () => 0");
		eval("for (const a of []);");
	} catch (error) {
		return false;
	}
	
	return true;
}

if (browserHasRequiredFeatures()) {
	// Go ahead and load js beepbox editor interface:
	var fileref: HTMLScriptElement = document.createElement("script");
	fileref.setAttribute("type", "text/javascript");
	fileref.addEventListener("load", function(event) {
		editor = new beepbox.SongEditor(document.querySelector<HTMLDivElement>("#beepboxEditorContainer")!);
	});
	fileref.setAttribute("src", "beepbox_editor.min.js");
	document.head.appendChild(fileref);
} else {
	document.querySelector<HTMLDivElement>("#beepboxEditorContainer")!.innerHTML = "Sorry, BeepBox doesn't support your browser. Try a recent version of Chrome, Firefox, Edge, Safari, or Opera.";
}

// If the page was loaded with an old song version that old versions of BeepBox support,
// update the links to the old versions so that they'll open the song.
if (/^#[1-6]/.test(location.hash)) {
	document.querySelector<HTMLAnchorElement>("#linkTo2_3")!.href += location.hash;
}
if (/^#[1-8]/.test(location.hash)) {
	document.querySelector<HTMLAnchorElement>("#linkTo3_0")!.href += location.hash;
}
