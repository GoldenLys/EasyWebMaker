const APP = {
    url: window.location.origin,
    version: 0.1,
    icons: { normal: "fas fa-comment-alt-lines", alert: "fas fa-comment-alt-exclamation" },
};

const REPLACERS = {
    "title": ["<span class='title'>", "</span>"],
    "b": ["<span class='bold'>", "</span>"],
    "img": ["<img src='", "' />"],
    "group": ["<div class='group'>", "</div>"],
    "group of 2": ["<div class='group group-of-two'>", "</div>"],
    "group of 3": ["<div class='group group-of-three'>", "</div>"],
    "group of 4": ["<div class='group group-of-four'>", "</div>"],
    "message": ["<div class='ui black message'><div class='icone'><i class='" + APP.icons.normal + " icon'></i></div>", "</div>"],
    "message alert": ["<div class='ui black message'><div class='icone'><i class='" + APP.icons.alert + " icon'></i></div>", "</div>"],
    "left": ["<div class='left-aligned'>", "</div>"],
    "center": ["<div class='center-aligned'>", "</div>"],
    "right": ["<div class='right-aligned'>", "</div>"],
};

(function () {
    jQuery.get("pages/1.txt", undefined, function (data) {

        let CONTENT = data.replace(/(\n\n|\r)/g, '<br>');
        for (var REPLACE in REPLACERS) {
            CONTENT = CONTENT.split("(" + REPLACE + ")").join(REPLACERS[REPLACE][0]).split("(." + REPLACE + ")").join(REPLACERS[REPLACE][1]);
        }

        $("#content").html(CONTENT);
    });
})();
