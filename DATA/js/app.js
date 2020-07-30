const APP = {
    url: window.location.href,
    version: 0.7,
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

var CONFIG = ["", false, false, false, ""];

const REPLACERS = {
    DEFAULT: {
        "title": ["<span class='title'>", "</span>"],
        "b": ["<span class='bold'>", "</span>"],
        "br": ["<br />", ""],
        "red": ["<span class='red'>", "</span>"],
        "green": ["<span class='green'>", "</span>"],
        "blue": ["<span class='blue'>", "</span>"],
        "yellow": ["<span class='yellow'>", "</span>"],
        "purple": ["<span class='purple'>", "</span>"],
        "image small": ["<img class='small' src='", "' />"],
        "image": ["<img src='", "' />"],
        "image big": ["<img class='big' src='", "' />"],
        "image huge": ["<img class='huge' src='", "' />"],
        "image small avatar": ["<img class='small avatar' src='", "' />"],
        "image avatar": ["<img class='avatar' src='", "' />"],
        "image big avatar": ["<img class='big avatar' src='", "' />"],
        "image huge avatar": ["<img class='huge avatar' src='", "' />"],
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
        "code": ["<div class='code'><div class='code-content'>", "</div></div>"],
    },
    MESSAGES: {
        "message": ["<div class='message' id='[MESSAGEID]'><div class='icone [IconsEnabled]'><i class='" + APP.icons.normal + " icon'></i></div>"],
        "message alert": ["<div class='message 'id='[MESSAGEID]'><div class='icone [IconsEnabled]'><i class='" + APP.icons.alert + " icon'></i></div>"],
        "message smile": ["<div class='message' id='[MESSAGEID]'><div class='icone [IconsEnabled]'><i class='" + APP.icons.smile + " icon'></i></div>"],
        "message plus": ["<div class='message' id='[MESSAGEID]'><div class='icone [IconsEnabled]'><i class='" + APP.icons.plus + " icon'></i></div>"],
        "message minus": ["<div class='message' id='[MESSAGEID]'><div class='icone [IconsEnabled]'><i class='" + APP.icons.minus + " icon'></i></div>"],
        "message edit": ["<div class='message' id='[MESSAGEID]'><div class='icone [IconsEnabled]'><i class='" + APP.icons.edit + " icon'></i></div>"],
        "message dollar": ["<div class='message' id='[MESSAGEID]'><div class='icone [IconsEnabled]'><i class='" + APP.icons.dollar + " icon'></i></div>"],
        "message text": ["<div class='message' id='[MESSAGEID]'><div class='icone [IconsEnabled]'><i class='" + APP.icons.text + " icon'></i></div>"],
        "message dots": ["<div class='message' id='[MESSAGEID]'><div class='icone [IconsEnabled]'><i class='" + APP.icons.dots + " icon'></i></div>"],
    },
    CUSTOM: {
        "link": ["<a href='", "'>", "</a>"],
        "icon": ["<i class='", "'>", "</i>"],
    }
};

(function () {
    jQuery.get('source/config.txt', undefined, function (data) {
        CONFIG[0] = data.match(/website name: ".+?"/)[0].split("website name: ").join("").split('"').join('');
        if (data.match(/message icons: yes/)) CONFIG[1] = true;
        if (data.match(/share button: yes/)) CONFIG[2] = true;
        if (data.match(/main menu: yes/)) CONFIG[3] = true;
        CONFIG[4] = data.match(/theme: ".+?"/)[0].split("theme: ").join("").split('"').join('');
        $("<link/>", { rel: "stylesheet", type: "text/css", href: "themes/" + CONFIG[4] + ".css" }).appendTo("head");
        $("#site-title").html(CONFIG[0]);
        $("#site-version").html("v" + APP.version);
        document.title = CONFIG[0];
    });
    jQuery.get("source/menu.txt", undefined, function (data) {
        $("#main-menu").append(ADD_MENU(data));
    });
    jQuery.get("source/content.txt", undefined, function (data) {
        $("#content").html(ADD_CONTENT(data));
        $("#content").html(GET_IDs($("#content").html()));
    });
    $(window).resize(function () { GET_CONTENT_SIZE(); });
})();

const ADD_MENU = function (data) {
    let CONTENT = data;
    for (let REPLACE in REPLACERS.DEFAULT) {
        CONTENT = CONTENT.split("(" + REPLACE + ")").join(REPLACERS.DEFAULT[REPLACE][0]).split("(." + REPLACE + ")").join(REPLACERS.DEFAULT[REPLACE][1]);
    }
    for (let REPLACE in REPLACERS.CUSTOM) {
        if (REPLACE == "link") CONTENT = CONTENT.split("(" + REPLACE + " (").join("<li>" + REPLACERS.CUSTOM[REPLACE][0]).split("(" + REPLACE + "(").join(REPLACERS.CUSTOM[REPLACE][0]).split("))").join(REPLACERS.CUSTOM[REPLACE][1]).split("(." + REPLACE + ")").join(REPLACERS.CUSTOM[REPLACE][2] + "</li>");
        else CONTENT = CONTENT.split("(" + REPLACE + " (").join(REPLACERS.CUSTOM[REPLACE][0]).split("(" + REPLACE + "(").join(REPLACERS.CUSTOM[REPLACE][0]).split("))").join(REPLACERS.CUSTOM[REPLACE][1]).split("(." + REPLACE + ")").join(REPLACERS.CUSTOM[REPLACE][2]);
    }
    return CONTENT;
};

const ADD_CONTENT = function (data) {
    let CONTENT = data.replace(/(\r\n\r\n\r\n|\n\n\n|\r\r\r)/gm, "<div class='invisible divider'></div>").replace(/(\r\n\r\n|\n\n|\r\r)/gm, "<div class='horizontal divider'></div>");
    let ShareEnabled = CONFIG[2] ? "<div class='closing divider'></div><div id='Share' data-id='[URL]'>Share</div></div>" : "</div>";
    let IconsEnabled = CONFIG[1] ? "" : "disabled";

    for (let REPLACE in REPLACERS.MESSAGES) {
        CONTENT = CONTENT.split("(" + REPLACE + ")").join(REPLACERS.MESSAGES[REPLACE][0])
            .split("(." + REPLACE + ")").join(ShareEnabled).split("[IconsEnabled]").join(IconsEnabled);
    }

    for (let REPLACE in REPLACERS.CUSTOM) {
        CONTENT = CONTENT.split("(" + REPLACE + " (").join(REPLACERS.CUSTOM[REPLACE][0]).split("(" + REPLACE + "(").join(REPLACERS.CUSTOM[REPLACE][0])
            .split("))").join(REPLACERS.CUSTOM[REPLACE][1]).split("(." + REPLACE + ")").join(REPLACERS.CUSTOM[REPLACE][2]);
    }

    for (let REPLACE in REPLACERS.DEFAULT) {
        CONTENT = CONTENT.split("(" + REPLACE + ")").join(REPLACERS.DEFAULT[REPLACE][0]).split("(." + REPLACE + ")").join(REPLACERS.DEFAULT[REPLACE][1]);
    }

    return CONTENT;
};

const GET_IDs = function (data) {
    $('div.message').each(function (index) {
        if (data.match(/[MESSAGEID]/)) $(this).attr("id", "message-" + index);
        if (index < 10 && CONFIG[3]) $(".main-menu").append("<li><a href='#message-" + index + "'>Article " + (index + 1) + "</a></li>");
        $(this).children("#Share").attr("data-id", index);
    });
    GET_CONTENT_SIZE();
    DYNAMIC_BUTTONS();
};

const DYNAMIC_BUTTONS = function () {
    $(".message").on("click", "#Share", function () {
        let SELECTED = document.createElement('textarea');
        SELECTED.value = APP.url.replace(window.location.hash, "") + '#message-' + $(this).attr("data-id");
        document.body.appendChild(SELECTED);
        SELECTED.select();
        document.execCommand('copy');
        NOTICE("Link copied !", SELECTED.value);
        document.body.removeChild(SELECTED);
        window.getSelection().removeAllRanges();
    });
};

const GET_CONTENT_SIZE = function () {
    let ContentHeight = window.innerHeight - $(".head").height();
    $(".page #content").attr("style", "height:" + (ContentHeight - 15) + "px;");
    if (window.location.hash.match(/#message-/)) {
        $('#content').animate({ scrollTop: parseInt($(window.location.hash).offset().top + $(".head").height()) }, 1000);
    }
};

const NOTICE = function (title, content) {
    $("#notice-title").html(title);
    $("#notice-content").html(content);
    $("#NOTICE").attr("class", "transition active");
    setTimeout(function () {
        $("#NOTICE").attr("class", "transition");
        $("#notice-title").html("");
        $("#notice-content").html("");
    }, 1500);
};