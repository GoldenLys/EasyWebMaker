const APP = {
    url: window.location.href,
    name: "Easy Web Maker",
    version: 0.4,
    icons: {
        normal: "fas fa-comment-alt",
        alert: "fas fa-comment-alt-exclamation",
        smile: "fas fa-comment-alt-smile",
        plus: "fas fa-comment-alt-plus",
        minus: "fas fa-comment-alt-minus",
        edit: "fas fa-comment-alt-edit",
        dollar: "fas fa-comment-alt-dollar",
        text: "fas fa-comment-alt-lines",
        dots: "fas fa-comment-alt-dots",
    },
};

const REPLACERS = {
    "title": ["<span class='title'>", "</span>"],
    "b": ["<span class='bold'>", "</span>"],
    "img": ["<img src='", "' />"],
    "img avatar": ["<img class='avatar' src='", "' />"],
    "group": ["<div class='group'>", "</div>"],
    "group of 2": ["<div class='group group-of-two'>", "</div>"],
    "group of 3": ["<div class='group group-of-three'>", "</div>"],
    "group of 4": ["<div class='group group-of-four'>", "</div>"],
    "left": ["<div class='left-aligned'>", "</div>"],
    "center": ["<div class='center-aligned'>", "</div>"],
    "right": ["<div class='right-aligned'>", "</div>"],
    "footer": ["<footer class='footer'>", "</footer>"],
    "divider": ["<span class='horizontal divider'></span>", ""],
    "vertical divider": ["<span class='vertical divider'></span>", ""],
};

const MESSAGES_REPLACERS = {
    "message": ["<div class='ui black message' id='[MESSAGEID]'><div class='icone'><i class='" + APP.icons.normal + " icon'></i></div>"],
    "message alert": ["<div class='ui black message 'id='[MESSAGEID]'><div class='icone'><i class='" + APP.icons.alert + " icon'></i></div>"],
    "message smile": ["<div class='ui black message' id='[MESSAGEID]'><div class='icone'><i class='" + APP.icons.smile + " icon'></i></div>"],
    "message plus": ["<div class='ui black message' id='[MESSAGEID]'><div class='icone'><i class='" + APP.icons.plus + " icon'></i></div>"],
    "message minus": ["<div class='ui black message' id='[MESSAGEID]'><div class='icone'><i class='" + APP.icons.minus + " icon'></i></div>"],
    "message edit": ["<div class='ui black message' id='[MESSAGEID]'><div class='icone'><i class='" + APP.icons.edit + " icon'></i></div>"],
    "message dollar": ["<div class='ui black message' id='[MESSAGEID]'><div class='icone'><i class='" + APP.icons.dollar + " icon'></i></div>"],
    "message text": ["<div class='ui black message' id='[MESSAGEID]'><div class='icone'><i class='" + APP.icons.text + " icon'></i></div>"],
    "message dots": ["<div class='ui black message' id='[MESSAGEID]'><div class='icone'><i class='" + APP.icons.dots + " icon'></i></div>"],
};

const CUSTOM_REPLACERS = {
    "link": ["<a href='", "'>", "</a>"],
    "icon": ["<i class='", "'>", "</i>"],
};

(function () {
    $("#site-title").html(APP.name);
    $("#site-version").html("v" + APP.version);
    document.title = APP.name;
    jQuery.get("source/content.txt", undefined, function (data) {
        $("#content").html(CONVERT_TEXT(data));
        $("#content").html(GET_IDs($("#content").html()));
    });
})();

const CONVERT_TEXT = function (data) {
    let CONTENT = data.replace(/(\r\n\r\n|\n\n|\r\r)/gm,"<br>");
    for (let REPLACE in MESSAGES_REPLACERS) {
        CONTENT = CONTENT.split("(" + REPLACE + ")").join(MESSAGES_REPLACERS[REPLACE][0])
        .split("(." + REPLACE + ")").join("<div class='divider'></div><div id='Share' data-id='[URL]'>Share</div></div>");
    }
    for (let REPLACE in REPLACERS) {
        CONTENT = CONTENT.split("(" + REPLACE + ")").join(REPLACERS[REPLACE][0]).split("(." + REPLACE + ")").join(REPLACERS[REPLACE][1]);
    }
    for (let REPLACE in CUSTOM_REPLACERS) {
        CONTENT = CONTENT.split("(" + REPLACE + " (").join(CUSTOM_REPLACERS[REPLACE][0]).split("(" + REPLACE + "(").join(CUSTOM_REPLACERS[REPLACE][0]).split("))").join(CUSTOM_REPLACERS[REPLACE][1]).split("(." + REPLACE + ")").join(CUSTOM_REPLACERS[REPLACE][2]);
    }
    return CONTENT;
};

const GET_IDs = function (data) {
    let CurrentURL = APP.url.substring(APP.url.lastIndexOf('#') + 1);
    $('div.ui.black.message').each(function (index) {
        if (data.match(/[MESSAGEID]/)) $(this).attr("id", "message-" + index);
        if( index < 10) $(".main-menu").append("<li><a href='#message-" + index + "'>Article " + (index+1) + "</a></li>");
        $(this).children("#Share").attr("data-id", index);
    });
    if(CurrentURL.match(/message-/)) {
        $('html, body').animate({
            scrollTop: parseInt($("#" + CurrentURL).offset().top)
        }, 2000);
    }
    DYNAMIC_BUTTONS();
};

const DYNAMIC_BUTTONS = function () {
    $(".message").on("click", "#Share", function () {
        let SELECTED = document.createElement('textarea');
        SELECTED.value = window.location.origin + '#message-' +  $(this).attr("data-id");
    
        document.body.appendChild(SELECTED);
        SELECTED.select();
        document.execCommand('copy');
        NOTICE("Link copied !", SELECTED.value);
        document.body.removeChild(SELECTED);
        window.getSelection().removeAllRanges();
    });
};

const NOTICE = function(title, content) {
    $("#notice-title").html(title);
    $("#notice-content").html(content);
    $("#NOTICE").attr("class", "transition active");
    setTimeout(function () {
        $("#NOTICE").attr("class", "transition");
        $("#notice-title").html("");
        $("#notice-content").html("");
    }, 1500);
};