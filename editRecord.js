
function editRecordContent(e) {
    edrec__editRecordContent(e)
}

function editRecordSettings(e) {
    edrec__editRecordSettings(e)
}

function edrec__editRecordContent(e) {
    window.edrec_v = "1", $("#record" + e).find(".tp-record-edit-icons-left__three").css("pointer-events", "none"), tp__ajax("/page/edit/", {
        pageid: window.pageid,
        recordid: e,
        tab: "content",
        comm: "editrecordcontent"
    }, {
        ctext: "opening block content panel"
    }, function(e) {
        var t;
        savesortmodeifactive(), "" != e ? "object" == typeof(t = edrec__parseJson(e)) ? edrec__content__drawPanel(t) : td__showBubbleNotice("Request error. " + e, 6e3, "error") : td__showBubbleNotice("Error. Request response is empty. Please reload the page and try again.", 6e3, "error")
    }, function() {}, function() {
        $("#record" + e).find(".tp-record-edit-icons-left__three").css("pointer-events", "auto")
    }), $("#editformsxl").scrollGuard()
}

function edrec__editRecordSettings(e) {
    window.edrec_v = "1", window.group_height_coord = {}, $("#record" + e).find(".tp-record-edit-icons-left__two").css("pointer-events", "none"), tp__ajax("/page/edit/", {
        pageid: window.pageid,
        recordid: e,
        tab: "settings",
        comm: "editrecordsettings"
    }, {
        ctext: "opening block settings panel"
    }, function(e) {
        var t;
        savesortmodeifactive(), "" != e ? "object" == typeof(t = edrec__parseJson(e)) ? edrec__settings__drawPanel(t) : td__showBubbleNotice("Request error. " + e, 6e3, "error") : td__showBubbleNotice("Error. Request response is empty. Please reload the page and try again.", 6e3, "error")
    }, function() {}, function() {
        $("#record" + e).find(".tp-record-edit-icons-left__two").css("pointer-events", "auto")
    })
}

function edrec__editRecordInit() {
    window.settingstab_scroll_obj = {}, window.contenttab_scroll_obj = {};
    edrec__createScrollObj(0), $("body").on("click", "#editforms .pe-form-group-title-wrapper", function() {
        var e = $(this).position().top + parseInt($(this).css("margin-top"));
        edrec__opengroupitems($(this), $(this).attr("data-tpl-group"), e)
    }), $("body").on("click", "#editforms .pe-form-group-close", function() {
        edrec__closegroupitems()
    }), $("body").on("click", "#editformsxl .pe-form-group-title-wrapper", function() {
        edrec__collapsecontentgroups($(this).attr("data-tpl-group"))
    }), $("body").find("#editforms").addClass("t-editforms_team"), $("body").find("#editformsxl").addClass("t-editforms_team")
}

function edrec__createScrollObj(e) {
    $(".record").each(function() {
        e = $(this).attr("recordid"), window.settingstab_scroll_obj[e] = {
            coord: 0,
            timer: 0
        }, window.contenttab_scroll_obj[e] = {
            coord: 0,
            timer: 0,
            groupOpen: []
        }
    })
}

function edrec__parseJson(t) {
    try {
        var e = JSON.parse(t);
        if ("object" == typeof e) return e;
        alert("Server response(edit record) error: " + t)
    } catch (e) {
        alert("Server response error: " + t), console.log("Error parse server response! error:" + e), console.log(t)
    }
}

function showEditFormXL() {
    edrec__showEditFormXL()
}

function showEditForm() {
    edrec__showEditForm()
}

function closeEditForm() {
    edrec__closeEditForm()
}

function edrec__showEditForm() {
    $("#editforms").css({
        height: "100%"
    }), $("#closelayer").css({
        height: "100%"
    }), $("#closelayer").unbind("click").click(function() {
        void 0 !== window.edrec_isChanged && "y" == window.edrec_isChanged ? (console.log("closed without saving changes"), edrec__showSaveConfirmDialog("{{user_has_unsaved_changes_title}}", "{{user_has_unsaved_changes_msg}}", edrec__closeEditForm)) : edrec__closeEditForm()
    }), $("#mainmenu").finish(), $("#mainmenu").css("top", "-60px"), $("#editforms").css("left", "-100px"), $("#editforms").css("visibility", "visible"), $("#editforms").animate({
        opacity: "1",
        left: "0px"
    }, 500, "easeOutCirc")
}

function edrec__showEditFormXL() {
    $("#closelayer").css({
        height: "100%"
    }), $("#closelayer").unbind("click").click(function() {
        void 0 !== window.edrec_isChanged && "y" == window.edrec_isChanged ? (console.log("closed without saving changes"), edrec__showSaveConfirmDialog("{{user_has_unsaved_changes_title}}", "{{user_has_unsaved_changes_msg}}", edrec__closeEditForm)) : edrec__closeEditForm()
    }), $("#mainmenu").finish(), $("#mainmenu").css("top", "-60px"), $("#editformsxl").css({
        overflow: "auto"
    }), $("#editformsxl").css({
        "overflow-x": "hidden"
    }), $("#editformsxl").css({
        height: "100%"
    }), $("#editformsxl").css("left", "-100px"), $("#editformsxl").css("visibility", "visible"), $("#editformsxl").animate({
        opacity: "1",
        left: "0px"
    }, 500, "easeOutCirc"), delete window.edrec_isChanged
}

function edrec__closeEditForm() {
    var e;
    0 < $("#editforms .edrec__wrapper").length ? edrec__saveScrollCoord(e = $("#editforms").find(".pe-settings-form").attr("data-rec-id"), window.settingstab_scroll_obj[e], !1) : 0 < $("#editformsxl").length && edrec__saveScrollCoord(e = $("#editformsxl").find(".pe-content-form").attr("data-rec-id"), window.contenttab_scroll_obj[e], !0), $("#editforms").css({
        height: "1px"
    }), $("#editforms").css("visibility", "hidden"), $("#editforms").html(""), $("#closelayer").css({
        height: "1px"
    }), $("#mainmenu").stop(), $("#mainmenu").animate({
        opacity: "1",
        top: "0px"
    }, 400, "easeOutCirc"), $("#editformsxl").css({
        height: "1px"
    }), $("#editformsxl").css("visibility", "hidden"), $("#editformsxl").html(""), $(".pe-content__videolink-tooltip").remove(), delete window.edrec_isChanged
}

function edrec__keyUpFunc(e) {
    document.body.classList.contains("t-body_popupshowed") || 27 == e.keyCode && (void 0 !== window.edrec_isChanged && "y" == window.edrec_isChanged ? (console.log("closed without saving changes"), edrec__showSaveConfirmDialog("{{user_has_unsaved_changes_title}}", "{{user_has_unsaved_changes_msg}}", function() {
        edrec__closeEditForm(), $(document).off("keyup", edrec__keyUpFunc)
    })) : (edrec__closeEditForm(), $(document).off("keyup", edrec__keyUpFunc)))
}

function edrec__addScrollCoord(e, t, i) {
    i && edrec__addOpenGroup(t), void 0 !== t && (e.scrollTop(t.coord), clearTimeout(t.timer))
}

function edrec__addOpenGroup(e) {
    void 0 !== e && void 0 !== e.groupOpen && 0 < e.groupOpen.length && e.groupOpen.forEach(function(e) {
        $("#grouptitle_" + e).addClass("pe-form-group-title-wrapper_open"), $("#grouptitle_" + e).find(".pe-form-group-arrow").addClass("pe-form-group-arrow_open"), $("#group_" + e).addClass("pe-form-group-wrapper_open")
    })
}

function edrec__saveScrollCoord(e, t, i) {
    var o = (i ? $("#editformsxl") : $("#editforms .pe-container-overflow")).scrollTop(),
        a = i ? {
            coord: 0,
            timer: 0,
            groupOpen: []
        } : {
            coord: 0,
            timer: 0
        };
    void 0 === t && (t = i ? (window.contenttab_scroll_obj[e] = a, window.contenttab_scroll_obj[e]) : (window.settingstab_scroll_obj[e] = a, window.settingstab_scroll_obj[e])), t.coord = o, t.timer = setTimeout(function() {
        t.coord = 0, i && (t.groupOpen = [])
    }, 6e5)
}

function edrec__saveOpenGroup(e) {
    var e = e.parents(".pe-content-form").attr("data-rec-id"),
        t = window.contenttab_scroll_obj[e];
    0 < $(".pe-form-group-title-wrapper_open").length && void 0 !== t && (t.groupOpen = [], $(".pe-form-group-title-wrapper_open").each(function() {
        t.groupOpen.push($(this).attr("data-tpl-group"))
    }))
}

function edrec__content__drawPanel(e) {
    var t = "131" === e.record.tplid && "y" != e.code_restricted;
    showEditFormXL();
    var i = "";
    i += '<div id="formbox' + e.record.id + '">', i += '\t<form id="form' + e.record.id + '" name="form' + e.record.id + '" role="form" enctype="multipart/form-data" action="/page/submit/" onsubmit="return false;" method="POST" class="pe-content-form" data-rec-tplid="' + e.record.tplid + '" data-rec-id="' + e.record.id + '">', i += '\t<div class="pe-content__form-wrapper">', i += '\t\t\t<div class="pe-content__savebtns-wrapper updatesavebuttons_content" id="updatesaveeditrecordsettingsbuttons" style="position:fixed;">', i += '\t\t\t\t<table class="pe-content__savebtns-table" style="width:100%;">', i += "\t\t\t\t<tr>", !0 === isMobile && (i += '\t\t\t\t<td style="width:1%;"><button class="tbtn" style="width:60px; display: table-cell; background-color:#999" onclick="edrec__closeEditForm();return false;">{{close_button}}</button></td>'), i += '\t\t\t\t<td style="width:50%;"><button class="tbtn" style="width:100%; display: table-cell;" onclick="edrec__content__sendform(\'update\');return false;">{{save}}</button></td>', i += '\t\t\t\t<td style="width:50%;"><button class="tbtn tbtn-primary" style="width:100%; display: table-cell;" onclick="edrec__content__sendform();return false;">{{save_and_close}}</button></td>', i += "\t\t\t\t</tr>", i += "\t\t\t\t</table>", i += "\t\t\t</div>", i += '\t\t\t<div class="edrec__wrapper panel-body editrecordcontent_container' + (t ? " editrecordcontent_container_code" : "") + '">';
    var o = "",
        a = "",
        n = !1;
    "RU" == lang ? void 0 !== e.tpl.youtubelink_ru && "" != e.tpl.youtubelink_ru && (o = e.tpl.youtubelink_ru, a = "Р’РёРґРµРѕРёРЅСЃС‚СЂСѓРєС†РёСЏ", n = !0) : void 0 !== e.tpl.youtubelink && "" != e.tpl.youtubelink && (o = e.tpl.youtubelink, a = "Video Tip", n = !0), n && (i += '\t\t\t\t<div class="pe-content__videolink-wrapper">', i += '\t\t\t\t\t<a href="' + o + '" target="_blank">', i += '\t\t\t\t\t\t<div class="pe-content__videolink-icon-wrapper">', i += '\t\t\t\t\t\t\t<svg class="pe-content__videolink-icon" width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg">', i += '\t\t\t\t\t\t\t\t<circle class="pe-content__videolink-icon-stroke" cx="27.254" cy="8.746" r="7.996" stroke="#000" stroke-width="1.5"/>', i += '\t\t\t\t\t\t\t\t<path class="pe-content__videolink-icon-stroke" d="M27.252 13.994V6.997M27.252 5.249v-1.75" stroke="#000" stroke-width="2"/>', i += '\t\t\t\t\t\t\t\t<path class="pe-content__videolink-icon-play" d="M13.025 24.026V16.82l5.024 3.602-5.024 3.603z" fill="#000" stroke="#000"/>', i += '\t\t\t\t\t\t\t\t<path class="pe-content__videolink-icon-stroke" d="M13.91 8.348H4a3 3 0 00-3 3v17.32a3 3 0 003 3h22.318a3 3 0 003-3v-7.41" stroke="#000" stroke-width="1.5"/>', i += "\t\t\t\t\t\t\t</svg>", i += "\t\t\t\t\t\t</div>", i += "\t\t\t\t\t</a>", i += "\t\t\t\t</div>"), $("body").append('<div class="pe-content__videolink-tooltip">' + a + "</div>"), i += '\t\t\t\t<div class="pe-content__critical-error-block" id="preview' + e.record.id + '" style="color:red;margin-bottom:20px;"></div>', void 0 !== e.tpl.ts_old && "" != e.tpl.ts_old && (i += '<div class="pe-form-group__old-notice">{{block_in_archive}}</div>'), t ? sessionStorage.getItem("edrec-code-help") || "hide" === sessionStorage.getItem("edrec-code-help") || ("RU" == lang && void 0 !== e.tpl.help_content_ru && "" != e.tpl.help_content_ru ? (i += '<div class="pe-form-group__help-content pe-form-group__help-content_top' + (t ? " pe-form-group__help-content_fixed" : "") + '">', i += '<div class="pe-form-group__help-content__body">', i += e.tpl.help_content_ru, i += "</div>", i += '<div class="pe-form-group__help-content__close" title="Р‘РѕР»СЊС€Рµ РЅРµ РїРѕРєР°Р·С‹РІР°С‚СЊ"><svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 40 40" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.4318 27.4229C9.85606 28.0185 9.85606 28.9842 10.4318 29.5799C11.0076 30.1755 11.9411 30.1755 12.5169 29.5799L20.1055 21.7296L27.6942 29.5799C28.27 30.1755 29.2035 30.1755 29.7793 29.5799C30.355 28.9842 30.355 28.0185 29.7793 27.4229L22.1906 19.5726L28.9272 12.6037C29.503 12.0081 29.503 11.0424 28.9272 10.4467C28.3514 9.85109 27.4179 9.85109 26.8422 10.4467L20.1055 17.4156L13.3689 10.4467C12.7932 9.85109 11.8596 9.85109 11.2839 10.4467C10.7081 11.0424 10.7081 12.0081 11.2839 12.6037L18.0205 19.5726L10.4318 27.4229Z" fill="black"/><circle cx="20" cy="20" r="18.5" stroke="black" stroke-width="3"/></svg></div>', i += "</div>") : void 0 !== e.tpl.help_content && "" != e.tpl.help_content && (i += '<div class="pe-form-group__help-content pe-form-group__help-content_top' + (t ? " pe-form-group__help-content_fixed" : "") + '">', i += '<div class="pe-form-group__help-content__body">', i += e.tpl.help_content, i += "</div>", i += '<div class="pe-form-group__help-content__close" title="Р‘РѕР»СЊС€Рµ РЅРµ РїРѕРєР°Р·С‹РІР°С‚СЊ"><svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 40 40" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.4318 27.4229C9.85606 28.0185 9.85606 28.9842 10.4318 29.5799C11.0076 30.1755 11.9411 30.1755 12.5169 29.5799L20.1055 21.7296L27.6942 29.5799C28.27 30.1755 29.2035 30.1755 29.7793 29.5799C30.355 28.9842 30.355 28.0185 29.7793 27.4229L22.1906 19.5726L28.9272 12.6037C29.503 12.0081 29.503 11.0424 28.9272 10.4467C28.3514 9.85109 27.4179 9.85109 26.8422 10.4467L20.1055 17.4156L13.3689 10.4467C12.7932 9.85109 11.8596 9.85109 11.2839 10.4467C10.7081 11.0424 10.7081 12.0081 11.2839 12.6037L18.0205 19.5726L10.4318 27.4229Z" fill="black"/><circle cx="20" cy="20" r="18.5" stroke="black" stroke-width="3"/></svg></div>', i += "</div>")) : "RU" == lang && void 0 !== e.tpl.help_content_ru && "" != e.tpl.help_content_ru ? (i += '<div class="pe-form-group__help-content pe-form-group__help-content_top">', i += e.tpl.help_content_ru, i += "</div>") : void 0 !== e.tpl.help_content && "" != e.tpl.help_content && (i += '<div class="pe-form-group__help-content pe-form-group__help-content_top">', i += e.tpl.help_content, i += "</div>"), i += "\t\t\t</div>", i += '\t\t<input type="hidden" name="comm" value="saverecord">', i += '\t\t<input type="hidden" name="recordid" value="' + e.record.id + '">', i += '\t\t<input type="hidden" name="pageid" value="' + e.record.pageid + '">', i += "\t</div>", i += "\t</form>", i += "</div>", i = tc__translate(i, "edrec__dict"), $("#editformsxl").html(i);
    var l, r, s, d, p = $(".edrec__wrapper"),
        c = e.tpl.fields.split(",");
    for (s in c) "buttonlink" == (r = c[s]) && 776 == e.record.tplid && "99" != window.$oplan || (edrec__drawUI(l = edrec__drawUI__getFieldObj__content(r), e, r, p), "gr" == l.type && (p = $(".edrec__wrapper").find("#group_" + l.groupid)), "|ggc|" == r && (p = $(".edrec__wrapper")));
    edrec__drawUI__podcut(e, c, p), "RU" == lang && void 0 !== e.tpl.help_b_content_ru && "" != e.tpl.help_b_content_ru ? p.append('<div class="pe-form-group__help-content pe-form-group__help-content_bottom">' + e.tpl.help_b_content_ru + "</div>") : void 0 !== e.tpl.help_b_content && "" != e.tpl.help_b_content && p.append('<div class="pe-form-group__help-content pe-form-group__help-content_bottom">' + e.tpl.help_b_content + "</div>"), t && !sessionStorage.getItem("edrec-code-help") && "hide" !== sessionStorage.getItem("edrec-code-help") && (document.querySelector(".pe-content__critical-error-block").style.bottom = "120px", (d = document.querySelector(".pe-form-group__help-content_top")).querySelector(".pe-form-group__help-content__close").addEventListener("click", function() {
        document.querySelector(".ace_editor").style.marginBottom = 0, document.querySelector(".pe-content__critical-error-block").style.bottom = 0, d.remove(), sessionStorage.setItem("edrec-code-help", "hide")
    })), edrec__content__init(p), void 0 !== e.tpl.replaces && "" != e.tpl.replaces && (u = JSON.parse(e.tpl.replaces), "object" == typeof(u = JSON.parse(u)) && edrec__replaces(u, p));
    var u = $("#editformsxl").find(".pe-content-form").attr("data-rec-id"),
        u = window.contenttab_scroll_obj[u];
    edrec__addScrollCoord($("#editformsxl.t-editforms_team"), u, !0), $("#updatesaveeditrecordsettingsbuttons").animate({
        opacity: "1",
        left: "0px"
    }, 500, "easeOutCirc", function() {}), $(document).on("keyup", edrec__keyUpFunc), 876 != e.record.tplid && 776 != e.record.tplid && 754 != e.record.tplid && 778 != e.record.tplid && 786 != e.record.tplid && 973 != e.record.tplid && 1025 != e.record.tplid || void 0 !== e.record.storepart && 1 < e.record.storepart || (p.find('.pe-form-group[data-tpl-field="storebtntitleprod"]').css("display", "none"), p.find('.pe-form-group[data-tpl-field="storebtnlinkprod"]').css("display", "none"), p.find('.pe-form-group[data-tpl-field="storebtntitleprod2"]').css("display", "none"), p.find('.pe-form-group[data-tpl-field="storebtnlinkprod2"]').css("display", "none")), 1025 == e.record.tplid && void 0 !== e.record.storepart && 1 < e.record.storepart && p.find('.pe-form-group[data-tpl-field="buttonlink"]').css("display", "none"), window.edrec_isChanged = "", p.find("input, select, button").change(function() {
        window.edrec_isChanged = "y"
    }), p.find("textarea").on("input", function() {
        window.edrec_isChanged = "y"
    }), setTimeout(function() {
        $(".edrec__wrapper").find(".redactor-editor").each(function() {
            var t = $(this);
            t.find("div").length && t.find("div").each(function() {
                var e = $(this).css("color");
                "string" == typeof e && -1 < e.indexOf("rgb(") && (170 < (299 * (e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))[1] + 587 * e[2] + 114 * e[3]) / 1e3 && t.css("background-color", "#7b7b7b"))
            })
        })
    }, 1e3);
    var m = $(".pe-content__videolink-tooltip");
    $(".pe-content__videolink-icon-wrapper").hover(function() {
        var e = $(".pe-content__videolink-wrapper").position().top;
        m.css("top", e), m.css("z-index", "99999"), m.addClass("pe-content__videolink-tooltip_show")
    }, function() {
        m.removeClass("pe-content__videolink-tooltip_show")
    })
}

function edrec__settings__drawPanel(e) {
    showEditForm(), void 0 === e.record.screenmin && (e.record.screenmin = ""), void 0 === e.record.screenmax && (e.record.screenmax = "");
    var t = "";
    t += '<div class="pe-container-overflow">', t += '<div id="formbox' + e.record.id + '">', t += '\t<form id="form' + e.record.id + '" name="form' + e.record.id + '" role="form" enctype="multipart/form-data" action="/page/submit/" onsubmit="return false;" method="POST" class="pe-settings-form" data-rec-tplid="' + e.record.tplid + '" data-rec-id="' + e.record.id + '">', t += '\t<div class="pe-settings__form-wrapper">', t += '\t\t\t<div class="pe-settings__savebtns-wrapper" id="updatesaveeditrecordsettingsbuttons" style="position:fixed;">', t += '\t\t\t\t<table class="pe-settings__savebtns-table">', t += "\t\t\t\t<tr>", t += '\t\t\t\t<td><button class="tbtn" style="width:160px; display: table-cell; ' + ("EN" !== window.lang ? "font-size:14px;" : "") + '" onclick="edrec__settings__sendform(\'update\');return false;">{{save}}</button></td>', t += '\t\t\t\t<td><button class="tbtn tbtn-primary" style="width:161px; display: table-cell; ' + ("EN" !== window.lang ? "font-size:14px;" : "") + ("DE" === window.lang ? "padding-left: 14px;padding-right: 14px;" : "") + '" onclick="edrec__settings__sendform();return false;">{{save_and_close}}</button></td>', t += "\t\t\t\t</tr>", t += "\t\t\t\t</table>", t += "\t\t\t</div>", t += '\t\t\t<div class="edrec__wrapper panel-body">', t += '\t\t\t\t<div id="preview' + e.record.id + '" style="color:red;margin-bottom:20px;"></div>', void 0 !== e.tpl.editnotpublish && "y" == e.tpl.editnotpublish && (t += '<br><table style="width:100%; border:3px solid #ffcf5d;"><tr><td style="padding:15px; font-size:11px;">{{note_diff_edit_and_publish}}</td></tr></table>'), "" == e.record.screenmax && "" == e.record.screenmin || (t += '<table style="width:100%; border:3px solid blue; margin-bottom:30px;"><tr><td style="padding:15px; font-size:11px;">{{set_width_viewport_limit|screenmin|screenmax}}</td></tr></table>'), "RU" == lang && void 0 !== e.tpl.help_settings_ru && "" != e.tpl.help_settings_ru ? t += e.tpl.help_settings_ru : void 0 !== e.tpl.help_settings && "" != e.tpl.help_settings && (t += e.tpl.help_settings), t += "\t\t\t</div>", t += '\t\t<input type="hidden" name="comm" value="saverecord">', t += '\t\t<input type="hidden" name="recordid" value="' + e.record.id + '">', t += '\t\t<input type="hidden" name="pageid" value="' + e.record.pageid + '">', t += "\t</div>", t += "\t</form>", t += "</div>", t += "</div>", t = tc__translate(t, "edrec__dict", {
        screenmin: "" == e.record.screenmin ? "0px" : e.record.screenmin,
        screenmax: "" == e.record.screenmax ? "&infin;" : e.record.screenmax
    }), $("#editforms").html(t);
    var i = $(".edrec__wrapper");
    void 0 !== e.tpl.nodeff && "y" == e.tpl.nodeff || ("796" !== e.record.tplid && (e.tpl.fields += ",margintop,margintop_res_480,marginbottom,marginbottom_res_480"), e.tpl.fields += ",blockbackground", void 0 === e.tpl.is_email && ("796" !== e.record.tplid && (e.tpl.fields += ",animationoff"), e.tpl.fields += ",screenmin,screenmax"));
    var o, a, n, l = e.tpl.fields.split(",");
    for (n in l) edrec__drawUI(o = edrec__drawUI__getFieldObj(a = l[n]), e, a, i), "gr" == o.type && (i = $(".edrec__wrapper").find("#group_" + o.groupid)), "|gc|" == a && (i = $(".edrec__wrapper"));
    edrec__drawUI__podcut(e, l, i), $(".pe-minicolors").minicolors(), $(".checkbox-btn").styler(), setTimeout(function() {
        $(".panel-body").find(".pe-hint").each(function() {
            "" == $(this).html() && $(this).css("padding", "0px")
        })
    }, 50), void 0 !== e.tpl.zeroid && 1 < e.tpl.zeroid && edrec__drawUI__converttozero(e, i), 0 < $oplan && edrec__drawUI__addtofishes(e, i), "y" != $is_email && edrec__drawUI__cssclassname(e, i), edrec__drawUI__blockid(e, i), void 0 !== e.tpl.replaces && "" != e.tpl.replaces && (r = JSON.parse(e.tpl.replaces), "object" == typeof(r = JSON.parse(r)) && edrec__replaces(r, i));
    var r = $("#editforms").find(".pe-settings-form").attr("data-rec-id"),
        r = window.settingstab_scroll_obj[r];
    edrec__addScrollCoord($("#editforms.t-editforms_team .pe-container-overflow"), r, !1), $("#updatesaveeditrecordsettingsbuttons").animate({
        opacity: "1",
        left: "0px"
    }, 500, "easeOutCirc", function() {}), $(document).on("keyup", edrec__keyUpFunc), 876 != e.record.tplid && 776 != e.record.tplid && 754 != e.record.tplid && 778 != e.record.tplid && 786 != e.record.tplid && 973 != e.record.tplid && 1025 != e.record.tplid || void 0 !== e.record.storepart && 1 < e.record.storepart || (i.find('.pe-form-group-title-wrapper[data-tpl-group="group18"]').css("display", "none"), i.find('.pe-form-group[data-tpl-field="store_showoptsingrid"]').css("display", "none"), i.find('.pe-form-group-title-wrapper[data-tpl-field="showrelevants"]').css("display", "none"), i.find('.pe-form-group-title-wrapper[data-tpl-field="titlerelevants"]').css("display", "none")), window.edrec_isChanged = "", i.find(":input").change(function() {
        window.edrec_isChanged = "y"
    })
}

function edrec__drawUI(e, t, i, o) {
    var a = t.record[i];
    void 0 === a && (a = ""), void 0 !== e.label ? "object" == typeof e.label && (void 0 !== e.label[lang] && "" != e.label[lang] ? e.label = e.label[lang] : void 0 !== e.label.EN && "" != e.label.EN && (e.label = e.label.EN)) : e.label = "", void 0 !== e.ph ? "object" == typeof e.ph && (void 0 !== e.ph[lang] && "" != e.ph[lang] ? e.ph = e.ph[lang] : void 0 !== e.ph.EN && "" != e.ph.EN && (e.ph = e.ph.EN)) : e.ph = "", void 0 !== e.hint ? "object" == typeof e.hint && (void 0 !== e.hint[lang] && "" != e.hint[lang] ? e.hint = e.hint[lang] : void 0 !== e.hint.EN && "" != e.hint.EN ? e.hint = e.hint.EN : e.hint = "") : e.hint = "", "hide" != (void 0 !== e.role ? edrec__verification__checkRole(e, t) : "show") && ("sb" == e.type ? edrec__drawUI__select(e, a, t, i, o) : "in" == e.type || "in_px" == e.type || "in_vh" == e.type || "in_float" == e.type ? edrec__drawUI__input(e, a, t, i, o) : "te" == e.type ? edrec__drawUI__text(e, a, t, i, o) : "cb" == e.type ? edrec__drawUI__checkbox(e, a, t, i, o) : "co" == e.type ? edrec__drawUI__color(e, a, t, i, o) : "ff" == e.type ? edrec__drawUI__font(e, a, t, i, o) : "gr" == e.type ? edrec__drawUI__group(e, a, t, i, o) : "im" == e.type ? edrec__drawUI__image(e, a, t, i, o) : "ln" == e.type ? edrec__drawUI__Link(e, a, t, i, o) : "screen" == e.type ? edrec__drawUI__screen(e, a, t, i, o) : "spec" == e.type ? edrec__drawUI__special(e, a, t, i, o) : "skip" == e.type || void 0 !== e.type && edrec__drawUI__input(e, a, t, i, o), void 0 !== e.split && "" != e.split && edrec__drawUI__split(e.split, i))
}

function edrec__verification__checkRole(e, t) {
    var i = void 0 !== e.blocks ? e.blocks.split(",") : [],
        o = "show";
    return i.length ? i.forEach(function(e) {
        e && t.record.tplid == e && (o = a())
    }) : o = a(), o;

    function a() {
        return "team" == e.role ? "99" == window.$oplan ? "show" : "hide" : "tester" != e.role || "99" == window.$oplan || "tester" == window.userrole ? "show" : "hide"
    }
}

function edrec__drawUI__input(e, t, i, o, a) {
    "" == e.label && (e.label = o);
    var n = "";
    n += '<div class="pe-form-group" data-tpl-field="' + o + '">', n += '    <label class="pe-label">' + e.label + "</label>", n += '    <div class="">', n += '    \t<input type="text" name="' + o + '" class="pe-input" placeholder="' + e.ph + '" value="' + t + '" />', n += '    \t<div class="pe-hint">' + e.hint + "</div>", n += "\t</div>", n += "</div>", a.append(n);
    var l = a.find('input[name="' + o + '"]');
    l.on("blur", function() {
        "in_px" == e.type && edrec__verification__input_px_vh(l, o, "px"), "in_vh" == e.type && edrec__verification__input_px_vh(l, o, "vh"), "in_float" == e.type && edrec__verification__input_float(l)
    })
}

function edrec__verification__input_px_vh(e, t, i) {
    var o, a, n;
    e.val() && (null !== (o = e.val().match(/-?\d+(\w{2})?/i)) ? "shadow_size" !== t && "shadow_size2" !== t ? (a = parseInt(o[0], 10), n = o[1], 0 !== a || "borderradius" === t || "buttonradius" === t || "leftleft" === t || "rightright" === t || "top" === t || "bottom" === t || "shadow_size_hover" === t || "price_fontsize" === t || "imgheight" === t ? (9999 < a && (a = ("" + a).slice(0, 5)), "px" == i ? "px" === n || "vh" === n || "vw" === n ? e.val(a + n) : e.val(a + "px") : "px" === n || "vh" === n || "vw" === n ? e.val(a + n) : 100 < a || 0 === a ? e.val(a + "px") : e.val(a + "vh")) : e.val("")) : e.val(o + "px") : e.val(""))
}

function edrec__verification__input_float(e) {
    var t, i, o;
    e.val() && (null !== (t = e.val().match(/(\d+)([.,]?)(\d*)/i)) ? (i = t[2] ? "." : "", o = t[3] || "", o = parseFloat(t[1].slice(0, 3) + i + o), o = Math.round(100 * o) / 100, e.val(o)) : e.val(""))
}

function edrec__drawUI__text(e, t, i, o, a) {
    "" == e.label && (e.label = o);
    var n = "";
    n += '<div class="form-group pe-form-group" data-tpl-field="' + o + '">', n += '    <label class="pe-label">' + e.label + "</label>", n += '    <div class="pe-redactor ' + ("y" == e.rno ? "pe-noredactor" : "") + '">', n += '    \t<textarea name="' + o + '" class="pe-textarea ' + ("y" == e.rno ? "noredactor" : "") + '" ' + ("y" == e.rmin ? 'redaktormin="yes"' : "") + " " + (0 < e.rows ? 'rows="' + e.rows + '"' : "") + ' placeholder="' + e.ph + '">' + t + "</textarea>", n += "    </div>", n += '<div class="pe-hint">' + e.hint + "</div>", n += "</div>", a.append(n)
}

function edrec__drawUI__color(e, t, i, o, a) {
    var n = "";
    void 0 !== e.uplabel && ("string" == typeof e.uplabel && (n = e.uplabel), "object" == typeof e.uplabel && (void 0 !== e.uplabel[lang] && "" != e.uplabel[lang] ? n = e.uplabel[lang] : void 0 !== e.uplabel.EN && "" != e.uplabel.EN && (n = e.uplabel.EN))), "" == e.label && (e.label = o), "bgcolor" == o && "em" == i.tpl.kind && (e.label = ("RU" == lang ? "РљРѕРЅС‚РµР№РЅРµСЂ" : "Container") + ": " + e.label);
    i = "";
    i += '<div class="pe-form-group" data-tpl-field="' + o + '">', "" != n && (i += '    <label class="pe-label">' + n + "</label><br>"), "" != e.label && (i += '    <label class="pe-label">' + e.label + "</label>"), i += '    <div class="pe-color">', i += '    \t<input type="text" name="' + o + '" class="pe-input pe-minicolors" placeholder="' + e.ph + '" value="' + t + '" />', i += '    \t<div class="pe-hint">' + e.hint + "</div>", i += "\t</div>", i += "</div>", a.append(i)
}

function edrec__drawUI__select(e, t, i, o, a) {
    "" == e.label && (e.label = o);
    var n = [];
    "object" == typeof e.options && (n = e.options), "columns" != o && "bcolumns" != o || "131" == i.record.tplid && n.push({
        v: "100",
        RU: "100%",
        EN: "100%"
    }), "margintop" == o && (e.label = '<span style="postion:relative;"><a href="javascript:edrec__settings_showmarginsmob();" style="position:absolute; top:-3px; left:0;"><img src="/tpl/img/page/pe-desctop.svg" class="tooltip" style="opacity:0.2;width:20px;" data-tooltip="' + ("RU" == lang ? "РќР°Р¶РјРёС‚Рµ, С‡С‚РѕР±С‹ Р·Р°РґР°С‚СЊ РѕС‚СЃС‚СѓРїС‹<br>РґР»СЏ РјРѕР±РёР»СЊРЅРѕРіРѕ" : "Click to set margins for mobile") + ' (<=480px)"></a><span style="padding-left:25px;">' + e.label + "</span></span>"), "margintop_res_480" == o && (e.label = '<span style="position:absolute; top:-3px; left:0;"><img src="/tpl/img/page/pe-mobile.svg" style="opacity:0.2;width:20px;"></span><span style="padding-left:25px;">' + e.label + "</span>"), void 0 !== e.uphint ? "object" == typeof e.uphint && (void 0 !== e.uphint[lang] && "" != e.uphint[lang] ? e.uphint = e.uphint[lang] : void 0 !== e.uphint.EN && "" != e.uphint.EN ? e.uphint = e.uphint.EN : e.uphint = "") : e.uphint = "";
    var l = !1;
    void 0 !== e.display && "none" == e.display ? l = !0 : "store_sort" !== o && "store_tabs" !== o && "price_range_format" !== o || (l = void 0 === i.record.storepart || i.record.storepart < 1);
    var r = "";
    if (r += '<div class="pe-form-group" data-tpl-field="' + o + '" ' + (l ? 'style="display:none;"' : "") + ">", "" != e.uphint && (r += '    <div class="pe-hint-up">' + e.uphint + "</div>"), r += '    <label class="pe-label">' + e.label + "</label>", r += '    <div class="pe-select">', r += '\t\t<select class="pe-input pe-select" name="' + o + '">', "showrelevants" == o && "object" == typeof i.storeparts) r += '<option value="' + n[0].v + '" ' + (t == n[0].v ? "selected" : "") + ">" + (void 0 !== n[0][lang] ? n[0][lang] : n[0].EN) + "</option>";
    else
        for (var s = 0; s < n.length; s++) r += '<option value="' + n[s].v + '" ' + (t == n[s].v ? "selected" : "") + ">" + (void 0 !== n[s][lang] ? n[s][lang] : n[s].EN) + "</option>";
    if ("showrelevants" == o && "object" == typeof i.storeparts)
        for (var d in i.storeparts) r += '<option value="' + i.storeparts[d].uid + '" ' + (i.storeparts[d].uid == i.record.showrelevants ? 'selected="selected"' : "") + ">" + ("RU" == lang ? "Р Р°Р·РґРµР»: " : "Part: ") + i.storeparts[d].title + "</option>";
    r += "\t\t</select>", r += "    </div>", r += '    \t<div class="pe-hint">' + e.hint + "</div>", r += "</div>", a.append(r), "margintop_res_480" != o && "marginbottom_res_480" != o || "" != t && (a.find('.pe-form-group[data-tpl-field="margintop_res_480"]').css("display", "block"), a.find('.pe-form-group[data-tpl-field="marginbottom_res_480"]').css("display", "block"))
}

function edrec__drawUI__checkbox(e, t, i, o, a) {
    var n = o;
    void 0 !== e.caption && ("string" == typeof e.caption && (n = e.caption), "object" == typeof e.caption && (void 0 !== e.caption[lang] && "" != e.caption[lang] ? n = e.caption[lang] : void 0 !== e.caption.EN && "" != e.caption.EN && (n = e.caption.EN)));
    var l = "",
        r = !1;
    "store_onlyinstock" !== o && "showpagination" !== o || (r = void 0 === i.record.storepart || i.record.storepart < 1), l += '<div class="pe-form-group" data-tpl-field="' + o + '"' + (r ? 'style="display:none;"' : "") + ">", "" != e.label && (l += '    <label class="pe-label">' + e.label + "</label>"), l += '    <div class="pe-checkbox-box">', l += '\t\t<label class="pe-label-checkbox">', l += '    \t\t<input type="hidden" name="' + o + '" class="pe-input" value="' + t + '" />', l += '    \t\t<input type="checkbox" name="' + o + '-cb" ' + ("on" == t || "paymentoff" === o && "y" === t ? 'checked="checked"' : "") + '/>&nbsp;<span class="pe-checkbox-title">' + n + "</span>", l += "\t\t</label>", l += '    \t<div class="pe-hint" style="padding:0;">' + e.hint + "</div>", "buttonstat" != o && "buttonstat2" != o && "buttonstat3" != o && "allbuttonsstat" != o || (l += '    <div class="pe-hint" style="padding-top:0; ' + ("on" == t ? "" : "display:none;") + '">', l += ("RU" == lang ? "РљР»РёРє Р±СѓРґРµС‚ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊСЃСЏ РІ СЃРёСЃС‚РµРјРµ Р°РЅР°Р»РёС‚РёРєРё РєР°Рє РїСЂРѕСЃРјРѕС‚СЂ СЃС‚СЂР°РЅРёС†С‹: " : "Button click displays in analytic system as page view: ") + "/tilda/click/rec" + i.record.id + "/button" + ("buttonstat" == o ? "1" : "buttonstat2" == o ? "2" : "buttonstat3" == o ? "3" : "allbuttonsstat" == o ? "N" : ""), l += "\t</div>"), "popupstat" == o && (l += '    <div class="pe-hint" style="padding-top:0; ' + ("on" == t ? "" : "display:none;") + '">', l += ("RU" == lang ? "РћС‚РєСЂС‹С‚РёРµ РїРѕРїР°РїР° Р±СѓРґРµС‚ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊСЃСЏ РІ СЃРёСЃС‚РµРјРµ Р°РЅР°Р»РёС‚РёРєРё РєР°Рє РїСЂРѕСЃРјРѕС‚СЂ СЃС‚СЂР°РЅРёС†С‹: " : "You can setup popup opening as a goal in the analytic system as a view of virtual page: ") + "/tilda/popup/rec" + i.record.id + "/opened<br>FB pixel: 'ViewContent' event", l += "\t</div>"), l += "\t</div>", l += "</div>", a.append(l), "212" === i.record.tplid && "sociallinks_brandcolor" === o && "on" === t && a.find('[data-tpl-field="sociallinks_color"] .pe-color').css("opacity", "0.3").find(".pe-input").attr("disabled", "disabled"), "1028" === i.record.tplid && "checkbox2" === o && "on" === t && (a.find('[data-tpl-field="buttoncolor"] .pe-color').css("opacity", "0.3").find(".pe-input").attr("disabled", "disabled"), a.find('[data-tpl-field="sociallinks_color"] .pe-color').css("opacity", "0.3").find(".pe-input").attr("disabled", "disabled")), "1036" === i.record.tplid && "checkbox2" === o && "on" === t && (a.find('[data-tpl-field="color2"] .pe-color').css("opacity", "0.3").find(".pe-input").attr("disabled", "disabled"), a.find('[data-tpl-field="sociallinks_color"] .pe-color').css("opacity", "0.3").find(".pe-input").attr("disabled", "disabled")), a.find('input[name="' + o + '-cb"]').change(function() {
        var e = (e = $(this).is(":checked")) ? "on" : "";
        a.find('input[name="' + o + '"]').val(e), "212" === i.record.tplid && "sociallinks_brandcolor" === o && ("on" === e ? a.find('[data-tpl-field="sociallinks_color"] .pe-color').css("opacity", "0.3").find(".pe-input").attr("disabled", "disabled") : a.find('[data-tpl-field="sociallinks_color"] .pe-color').css("opacity", "").find(".pe-input").removeAttr("disabled")), "1028" === i.record.tplid && "checkbox2" === o && ("on" === e ? (a.find('[data-tpl-field="buttoncolor"] .pe-color').css("opacity", "0.3").find(".pe-input").attr("disabled", "disabled"), a.find('[data-tpl-field="sociallinks_color"] .pe-color').css("opacity", "0.3").find(".pe-input").attr("disabled", "disabled")) : (a.find('[data-tpl-field="buttoncolor"] .pe-color').css("opacity", "").find(".pe-input").removeAttr("disabled"), a.find('[data-tpl-field="sociallinks_color"] .pe-color').css("opacity", "").find(".pe-input").removeAttr("disabled"))), "1036" === i.record.tplid && "checkbox2" === o && ("on" === e ? (a.find('[data-tpl-field="color2"] .pe-color').css("opacity", "0.3").find(".pe-input").attr("disabled", "disabled"), a.find('[data-tpl-field="sociallinks_color"] .pe-color').css("opacity", "0.3").find(".pe-input").attr("disabled", "disabled")) : (a.find('[data-tpl-field="color2"] .pe-color').css("opacity", "").find(".pe-input").removeAttr("disabled"), a.find('[data-tpl-field="sociallinks_color"] .pe-color').css("opacity", "").find(".pe-input").removeAttr("disabled"))), "buttonstat" != o && "buttonstat2" != o && "buttonstat3" != o && "allbuttonsstat" != o && "popupstat" != o && "paymentstat" != o && "formstat" != o || (e ? $(this).parent().parent().find(".pe-hint").show() : $(this).parent().parent().find(".pe-hint").hide())
    })
}

function edrec__drawUI__font(e, t, i, o, a) {
    "" == e.label && (e.label = o);
    "object" == typeof e.options && e.options;
    var n = "";
    n += '<div class="pe-form-group" data-tpl-field="' + o + '" ' + (void 0 !== e.display && "none" == e.display ? 'style="display:none;"' : "") + ">", n += '    <label class="pe-label">' + e.label + "</label>", n += '    <div class="pe-select">', n += '\t\t<select class="pe-input pe-select" name="' + o + '">', n += '\t\t\t<option value="" ' + ("" == t ? "selected" : "") + ">" + ("RU" == lang ? "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ" : "Default") + "</option>", "Arial" != $headlinefont && "Arial" != $textfont && (n += '\t\t\t<option value="Arial" ' + ("Arial" == t ? "selected" : "") + ">Arial</option>"), "Georgia" != $headlinefont && "Georgia" != $textfont && (n += '\t\t\t<option value="Georgia" ' + ("Georgia" == t ? "selected" : "") + ">Georgia</option>"), "" != $headlinefont && (n += '\t\t\t<option value="' + $headlinefont + '" ' + (t == $headlinefont ? "selected" : "") + ">" + $headlinefont + "</option>"), "" != $textfont && (n += '\t\t\t<option value="' + $textfont + '" ' + (t == $textfont ? "selected" : "") + ">" + $textfont + "</option>"), n += "\t\t</select>", n += "    </div>", "" != e.hint && (n += '    \t<div class="pe-hint">' + e.hint + "</div>"), n += "</div>", a.append(n)
}

function edrec__drawUI__group(e, t, i, o, a) {
    var n = "",
        l = e.groupid;
    "|gc|" != o && "|ggc|" != o && (n += '\t<div class="pe-form-group-title-wrapper" data-tpl-group="' + l + '" id="grouptitle_' + l + '">', n += '\t\t<span class="pe-form-group-title tsgrouptitle">' + e.label + "</span>", n += '\t\t<span class="pe-form-group-arrow"></span>', n += "\t</div>", n += '\t<div class="pe-form-group-wrapper" id="group_' + l + '">', n += '\t\t<div class="pe-form-group-close-wrapper">', n += '\t\t\t<div class="pe-form-group-close">', n += '\t\t\t\t<svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">', n += '\t\t\t\t\t<path fill-rule="evenodd" clip-rule="evenodd" d="M4.354 4.293L.707.646 0 1.354 3.646 5 0 8.646l.707.708 3.647-3.647L8 9.354l.707-.708L5.061 5l3.646-3.646L8 .646 4.354 4.293z" fill="#555"/>', n += "\t\t\t\t</svg>", n += "\t\t\t</div>", n += "\t\t</div>", n += "\t</div>"), a.append(n)
}

function edrec__drawUI__image(e, t, o, a, n) {
    var i = "";
    i += '<div class="pe-form-group" data-tpl-field="' + a + '">', i += '\t<label class="pe-label">' + e.label + "</label>", i += "\t<br>", i += '\t<div class="js-image-box js-image-box__' + a + '">', i += '\t\t<table style="width:100%;">', i += "\t\t<tr>", i += '\t\t<td style="width:240px; vertical-align:top;">', i += '\t\t<div style="width:100%;">', i += '\t\t<input type="text" name="' + a + '-tubutton" class="js-img-button" value="" data-tu-is-image="yes" id="tuwidget' + o.record.id + a + '" />', i += '\t\t<input type="hidden" name="' + a + '-tuinfo-uuid" class="js-img-uuid" value="" />', i += '\t\t<input type="hidden" name="' + a + '-tuinfo-cdnurl" class="js-img-cdnurl" value=""/>', i += '\t\t<input type="hidden" name="' + a + '-tuinfo-name" class="js-img-name" value=""/>', i += '\t\t<input type="hidden" name="' + a + '-tuinfo-width" class="js-img-width" value=""/>', i += '\t\t<input type="hidden" name="' + a + '-tuinfo-height" class="js-img-height" value=""/>', i += '\t\t<input type="hidden" name="' + a + '-tuinfo-size" class="js-img-size" value=""/>', i += '\t\t<input type="hidden" name="' + a + '-uploadmethod" value="tu"/>', i += '\t\t<input type="hidden" name="' + a + '-del" class="js-img-del" value=""/>', i += "\t\t</div>", i += "\t\t</td>", i += '\t\t\t<td class="pe-imagesearch-td-wrapper">', i += '\t\t\t\t<div class="pe-imagesearch-btn">', i += '\t\t\t\t\t<img src="https://tilda.ws/img/linea/basic_magnifier.svg" style="padding:10px" width="20px">', i += '\t\t\t\t\t<span style="vertical-align: middle">' + ("RU" == window.lang ? "РСЃРєР°С‚СЊ РІ Р±РёР±Р»РёРѕС‚РµРєРµ" : "Search photos") + "</span>", i += "\t\t\t\t</div>", i += "\t\t\t</td>", i += "\t\t</tr>", i += "\t\t</table>", i += "\t\t<br><br>", i += '\t\t<div class="js-img-card js-' + a + '-div" style="display:' + ("" != t ? "block" : "none") + ';">', i += '\t\t\t<table class="pe-imagebox__tabel">', i += '\t\t\t<tr class="pe-imagebox__tr">', i += '\t\t\t<td class="pe-imagebox__td pe-imagebox__td-thumb"><img src="' + t + '" class="pe-imagebox__img" width="135" id="rec' + o.record.id + a + 'id" style="max-height:300px;"></td>', i += '\t\t\t<td class="pe-imagebox__td pe-imagebox__td-name" style="padding-left:20px; padding-right:20px; width:500px; font-size:12px; color:#333;" id="' + a + '-name"><a href="' + t + '" target="_blank" class="js-img-title" data-img-href="">... ' + t.slice(-30) + "</a></td>", -1 !== o.tpl.fields.indexOf(a + "_alt") && (i += '\t\t\t<td class="pe-imagebox__td" style="white-space: nowrap;"><span class="js-edrec-img-showmore" style="cursor:pointer;">...</span>&nbsp;&nbsp;&nbsp;&nbsp;</td>'), -1 === t.indexOf(".svg") && (i += '\t\t\t<td class="pe-imagebox__td" style="white-space: nowrap; padding-right: 10px;"><a href="javascript:tui_editimage(' + o.record.id + ",'rec" + o.record.id + a + 'id\');" id="rec' + o.record.id + "edit" + a + 'item" class="js-edit-img"><span class="glyphicon glyphicon-pencil"></span></a></td>'), i += '\t\t\t<td class="pe-imagebox__td"><span class="js-edrec-img-delbtn glyphicon glyphicon-trash" style="cursor:pointer;"></span></td>', i += "\t\t\t</tr>", i += "\t\t\t</table>", i += '\t\t\t<div class="js-img-more" style="display:none;" id="rec' + o.record.id + a + '_more">', i += '\t\t\t\t<br><label class="pe-label pe-label_no-replace">' + ("RU" == window.lang ? "SEO: РђР»СЊС‚-С‚РµРєСЃС‚ РґР»СЏ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ" : "SEO: Image alt text") + "</label>", i += '\t\t\t\t<input type="text" name="' + a + '_alt" class="pe-input js-img-alt" value="' + (void 0 !== o.record[a + "_alt"] ? o.record[a + "_alt"] : "") + '">', i += "\t\t\t</div>", i += "\t\t</div>", i += "\t</div>", i += '\t<div class="pe-hint"></div>', i += "</div>", n.append(i);
    i = n.find('.pe-form-group[data-tpl-field="' + a + '"]');
    i.find(".pe-imagesearch-btn").click(function() {
        var e = $("#tuwidget" + o.record.id + a).data("tildaupload");
        openImageSearchPopup(e, "rec" + o.record.id + a + "id")
    }), i.find("[name=" + a + "-tubutton]").each(function() {
        var e = $(this),
            i = e.attr("id");
        i || (i = "tuwidget" + parseInt(Math.floor(Math.random() * (9e5 + 1)) + 99999), e.attr("id", i)), TUWidget.init(e).done(function(e) {
            var t;
            void 0 !== e.tuInfo && ((t = n.find(".js-image-box__" + a)).find("#rec" + o.record.id + a + "id").attr("src", e.tuInfo.cdnUrl), t.find("#" + a + "-name").html('<a href="' + e.tuInfo.cdnUrl + '" target="_blank" class="js-img-title">... ' + e.tuInfo.name + "</a>"), t.find("[name=" + a + "-tuinfo-uuid]").val(e.tuInfo.uuid), t.find("[name=" + a + "-tuinfo-cdnurl]").val(e.tuInfo.cdnUrl), t.find("[name=" + a + "-tuinfo-name]").val(e.tuInfo.name), t.find("[name=" + a + "-tuinfo-width]").val(e.tuInfo.width), t.find("[name=" + a + "-tuinfo-height]").val(e.tuInfo.height), -1 === e.tuInfo.name.indexOf(".svg") ? t.find(".js-edit-img").css("display", "inline") : t.find(".js-edit-img").css("display", "none"), t.find(".js-img-card").css("display", "block"), setTimeout(function() {
                $("#" + i + "-previews").removeClass("tu-popup-progressbar-completed").removeClass("tu-processing").removeClass("tu-image-preview").removeClass("tu-success").removeClass("tu-complete").addClass("tu-popup-progressbar-start")
            }, 3e3))
        }).fail(function(e, t) {})
    }), i.find(".js-edrec-img-delbtn").click(function() {
        var e = $(this).closest(".js-image-box");
        e.find(".js-img-card").css("display", "none"), e.find(".js-img-del").val("yes"), e.find(".js-img-alt").val(""), e.find(".js-img-cdnurl").val("")
    }), i.find(".js-edrec-img-showmore").click(function() {
        var e = $(this).closest(".js-image-box").find(".js-img-more");
        "block" == e.css("display") ? e.css("display", "none") : e.css("display", "block")
    })
}

function edrec__drawUI__screen(e, t, i, o, a) {
    var n;

    function l(e, t) {
        var i = r(e),
            o = r(t);
        $("#screen_start").val(i), $("#screen_end").val(o), 1 != e && 7 != e || $("#screen_start").val(""), 1 != t && 7 != t || $("#screen_end").val("");
        o = 7 == t ? o : "&#8804; " + o;
        $(".ui-slider-handle").first().html("<div class='ui-slider-helper'>&#62; " + i + "</div>"), $(".ui-slider-handle").last().html("<div class='ui-slider-helper' style='left:-48px;'>" + o + "</div>")
    }

    function r(e) {
        return 7 == e ? "Max" : 6 == e ? "1200px" : 5 == e ? "980px" : 4 == e ? "640px" : 3 == e ? "480px" : 2 == e ? "320px" : 1 == e ? "0px" : ""
    }

    function s(e) {
        return "Max" == e ? 7 : "1200px" == e ? 6 : "980px" == e ? 5 : "640px" == e ? 4 : "480px" == e ? 3 : "320px" == e ? 2 : "0px" == e ? 1 : ""
    }
    "screenmin" != o && (n = "", n += '<div class="pe-form-group" data-tpl-field="' + o + '">', n += '    <label class="pe-label">' + e.label + "</label>", n += '\t<div id="screen-slider-range"></div>', n += '\t<div id="screen-slider-graph"></div>', n += '\t<div id="screen-slider-text"></div>', n += '\t<input type="hidden" id="screen_start" name="screenmin">', n += '\t<input type="hidden" id="screen_end" name="screenmax">', n += "</div>", a.append(n), "" == (n = s(i.record.screenmin)) && (n = "1"), "" == (i = s(i.record.screenmax)) && (i = "7"), $("#screen-slider-range").slider({
        range: !0,
        min: 1,
        max: 7,
        step: 1,
        values: [n, i],
        slide: function(e, t) {
            l(t.values[0], t.values[1])
        }
    }), l($("#screen-slider-range").slider("values", 0), $("#screen-slider-range").slider("values", 1)))
}

function edrec__drawUI__Link(e, t, i, o, a) {
    var n = "";
    n += '<div class="pe-form-group pe-form-group-field-' + o + '" data-tpl-field="' + o + '">', n += "</div>", a.append(n);
    var l, r = t,
        s = "",
        d = "";
    "link" == o && (l = "linktarget"), "link2" == o && (l = "linktarget2"), "link3" == o && (l = "linktarget3"), "link4" == o && (l = "linktarget4"), "link5" == o && (l = "linktarget5"), "link6" == o && (l = "linktarget6"), "link7" == o && (l = "linktarget7"), "link8" == o && (l = "linktarget8"), "buttonlink" == o && (l = "buttonlinktarget"), "buttonlink2" == o && (l = "buttonlinktarget2"), "buttonlink3" == o && (l = "buttonlinktarget3"), "buttonlink4" == o && (l = "buttonlinktarget4"), "buttonlink5" == o && (l = "buttonlinktarget5"), "buttonlink6" == o && (l = "buttonlinktarget6"), "buttonlink7" == o && (l = "buttonlinktarget7"), "buttonlink8" == o && (l = "buttonlinktarget8"), "bbuttonlink" == o && (l = "bbuttonlinktarget"), void 0 !== i.record[l] && (s = i.record[l]);
    var p = i.tpl.fields;
    "" != p && (p = p.replace("alllinktarget,", "")), -1 === p.indexOf(l + ",") && -1 === p.indexOf("," + l) || (d = "yes"), r = (r = (r = r.replace("\\", "")).replace("\\", "")).replace("\\", ""), "link" == o && "y" == i.code_restricted ? (n += '<div class="form-group pe-form-group" data-tpl-field="' + o + '">', n += '<label class="pe-label">' + e.label + "</label>", n += '<div style="background-color:yellow; padding:20px; color:#000;">', n += "RU" == lang ? "Р”РѕСЃС‚СѓРї Рє СЌС‚РѕРјСѓ Р±Р»РѕРєСѓ РѕРіСЂР°РЅРёС‡РµРЅ. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРѕРґС‚РІРµСЂРґРёС‚Рµ: " : "Access to this block is restricted. Please verify your: ", "y" == i.needverify_email && (n += ' &#183; <a href="/identity/" style="color:#ff855d !important; font-weight: 600;" target="_blank">' + ("RU" == lang ? "РІР°С€ email" : "email address") + "</a>"), "y" == i.needverify_phone && (n += ' &#183; <a href="/identity/sms/" style="color:#ff855d !important; font-weight: 600;" target="_blank">' + ("RU" == lang ? "РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°" : "phone number") + "</a>"), n += "</div>", n += "</div>", a.append(n)) : "link" == o && "266" == i.record.tplid ? (n += '<div class="form-group pe-form-group" data-tpl-field="' + o + '">', n += '<label class="pe-label">' + e.label + "</label>", n += "<div>", n += '<input type="text" name="' + o + '" class="pe-input" placeholder="' + e.ph + '" value="' + t + '" />', n += '<div class="pe-hint">' + e.hint + "</div>", n += "</div>", n += "</div>", a.append(n)) : edlink__drawUI__Link(o, r, d, s)
}

function edrec__drawUI__special(e, l, t, i, r) {
    var o, a, n, s, d, p, c, u, m, g, _ = "";
    if (void 0 !== e.uphint ? "object" == typeof e.uphint && (void 0 !== e.uphint[lang] && "" != e.uphint[lang] ? e.uphint = e.uphint[lang] : void 0 !== e.uphint.EN && "" != e.uphint.EN && (e.uphint = e.uphint.EN)) : e.uphint = "", "list" == i && (void 0 === t.record.list && (t.record.list = ""), void 0 === t.tpl.lifields && (t.tpl.lifields = ""), _ += '<div class="form-group pe-form-group" data-tpl-field="' + i + '">', _ += '<textarea class="editlist__data" name="' + i + '" rows="2" style="height:100px; width:90%; display:none;">' + t.record.list + "</textarea>", _ += '<div class="editlist__loader" style="background-color:#efefef;padding:50px 40px; text-align:center; margin-bottom:10px;">' + ("RU" == lang ? "Р—Р°РіСЂСѓР·РєР°..." : "Loading...") + "</div>", _ += '<div class="editlist__wrapper" data-ui-type="edli" data-lfields="' + t.tpl.lifields + '"></div>', _ += '<a href="javascript:edli__add()" class="editlist__addbtn" style="font-size:14px; width:720px; font-weight:600; text-align:center; text-transform:uppercase; background-color:#000; color:#fff !important; display:block; padding:20px 0px;">' + ("RU" == lang ? "Р”РѕР±Р°РІРёС‚СЊ СЌР»РµРјРµРЅС‚" : "Add new item") + "</a><br>", _ += "</div>"), "forminputs" == i && (void 0 === t.record.list && (t.record.list = ""), void 0 === t.tpl.lifields && (t.tpl.lifields = ""), _ += '<div class="form-group pe-form-group" data-tpl-field="' + i + '">', _ += '<div class="editlist__loader" style="background-color:#efefef;padding:50px 40px; text-align:center; margin-bottom:10px;">' + ("RU" == lang ? "Р—Р°РіСЂСѓР·РєР°..." : "Loading...") + "</div>", _ += '<textarea class="editlist__data" name="' + i + '" rows="2" style="height:100px; width:90%; display:none;">' + t.record.list + "</textarea>", _ += '<div class="editlist__wrapper" data-ui-type="edfo" data-foparams="' + t.tpl.lifields + '"></div>', _ += '<a href="javascript:edfo__add()" class="pe-form-group-add-button" style="font-size:14px; width:720px; font-weight:600; text-align:center; text-transform:uppercase; background-color:#000; color:#fff !important; display:block; padding:20px 0px;">' + ("RU" == lang ? "Р”РѕР±Р°РІРёС‚СЊ РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°" : "Add input field") + "</a><br>", _ += "</div>"), "menuitems" == i && (_ += '<div class="form-group pe-form-group" data-tpl-field="' + i + '">', _ += '<label class="pe-label">' + e.label + "</label>", _ += '<div class="pe-hint" style="padding-bottom:20px;">' + e.uphint + "</div>", _ += '<div id="menuitemscheckboxes' + t.record.id + '" class="pe-menuitems-wrapper">', _ += "</div>", _ += '<div style="padding-top:10px;">', _ += '<a href="javascript:edme__addNewMenuItem();" style="display:block;cursor:copy; padding:10px 40px; background-color:#000; color:#fff !important; display: inline-block;">' + ("RU" == lang ? "Р”РѕР±Р°РІРёС‚СЊ РїСѓРЅРєС‚ РјРµРЅСЋ" : "Add menu item") + "</a> ", "258" != t.record.tplid && "456" != t.record.tplid && "454" != t.record.tplid && "462" != t.record.tplid && "770" != t.record.tplid && "230" != t.record.tplid && "257" != t.record.tplid && "446" != t.record.tplid && "461" != t.record.tplid && "481" != t.record.tplid && "309" != t.record.tplid && "327" != t.record.tplid && "450" != t.record.tplid && "451" != t.record.tplid && "830" != t.record.tplid && "883" != t.record.tplid && "967" != t.record.tplid && "978" != t.record.tplid || (_ += '&nbsp;&nbsp; <a href="javascript:edme__showUIsubmenu();" style="display:block;cursor:copy; padding:10px 40px; display: inline-block;">' + ("RU" == lang ? "Р”РѕР±Р°РІРёС‚СЊ РїСѓРЅРєС‚С‹ РІС‚РѕСЂРѕРіРѕ СѓСЂРѕРІРЅСЏ" : "Add subitems") + "</a>"), _ += "</div>", _ += '<input type="hidden" name="menuitems-editor" value="">', _ += "</div>"), "pageslist" == i)
        if (void 0 === t.record.pageslist && (t.record.pageslist = ""), "" != t.record.pageslist || 258 != t.record.tplid && 456 != t.record.tplid && 454 != t.record.tplid && 462 != t.record.tplid && 230 != t.record.tplid && 257 != t.record.tplid && 446 != t.record.tplid && 461 != t.record.tplid && 481 != t.record.tplid && 309 != t.record.tplid && 327 != t.record.tplid && 450 != t.record.tplid && 451 != t.record.tplid && 466 != t.record.tplid && 398 != t.record.tplid && 607 != t.record.tplid) {
            _ += '<div class="form-group pe-form-group" data-tpl-field="' + i + '">', _ += '<div id="pageslistcheckboxes' + t.record.id + '" class="js-pageslistcheckboxes">', _ += '<label class="pe-label">' + e.label + "</label>", _ += '<div class="pe-hint">' + e.uphint + "</div>", _ += '<br><a href="javascript:edrec__pageslist__selectall();">' + ("RU" == lang ? "Р’С‹РґРµР»РёС‚СЊ/РЎРЅСЏС‚СЊ РІС‹РґРµР»РµРЅРёРµ РґР»СЏ РІСЃРµС… РїСѓРЅРєС‚РѕРІ" : "Select/Unselect all items") + "</a><br><br>";
            for (var b = 0, h = 0; h < t.pages.length; h++) {
                for (var f = "", v = 0; v < t.record.pageslist.length; v++) t.pages[h].id == t.record.pageslist[v] && (f = "checked");
                _ += '\t<div class="pe-checkbox-box">', _ += '\t<label class="pe-label-checkbox">', _ += '\t\t<input type="hidden" name="pageslist[' + ++b + ']" id="pageslist-inp-' + b + '" value="' + ("" != f ? t.pages[h].id : "") + '"/>', _ += '\t\t<input type="checkbox" name="pageslist-cb[' + b + ']" ' + f + ' id="pageslist-cb-' + b + '" value="' + t.pages[h].id + '" class="chbx">&nbsp;' + t.pages[h].title, _ += "\t</label>", _ += '\t<script type="text/javascript">', _ += '\t\t$("#pageslist-cb-' + b + '").change(function(){', _ += '\t\t\tvar tempv=$(this).is(":checked");', _ += '\t\t\tif(tempv){tempv=$(this).val();}else{tempv="";}', _ += '\t\t\t$("#pageslist-inp-' + b + '").val(tempv);', _ += "\t\t});", _ += "\t<\/script>", _ += "\t</div>"
            }
            _ += "</div>", _ += "</div>", window.edrec__pageslist__selectall = function() {
                var e, t, i = $(".js-pageslistcheckboxes").find(".chbx");
                void 0 !== i && i.length && (t = e = 0, i.each(function() {
                    !0 === $(this).is(":checked") ? e = 1 : t = 1
                }), 1 == e && 1 == t ? i.each(function() {
                    var e = $(this);
                    !1 === e.is(":checked") && e.click()
                }) : i.click())
            }
        } else;
    if ("sharebuttons" == i && (void 0 === t.record.sharefacebook && (t.record.sharefacebook = ""), void 0 === t.record.sharevk && (t.record.sharevk = ""), void 0 === t.record.sharetwitter && (t.record.sharetwitter = ""), void 0 === t.record.shareok && (t.record.shareok = ""), _ += "<div>", _ += '<label class="pe-label">' + e.label + "</label>", _ += "<br>", _ += '<div class="pe-checkbox-box">', _ += '<label class="pe-label-checkbox">', _ += '\t<input type="hidden" name="sharefacebook" value="' + t.record.sharefacebook + '"/>', _ += '\t<input type="checkbox" name="sharefacebook-cb" ' + ("on" == t.record.sharefacebook ? "checked" : "") + ' class="chbx">&nbsp;Facebook share button', _ += "</label>", _ += "</div>", _ += '<div class="pe-checkbox-box">', _ += '<label class="pe-label-checkbox">', _ += '\t<input type="hidden" name="sharevk" value="' + t.record.sharevk + '"/>', _ += '\t<input type="checkbox" name="sharevk-cb" ' + ("on" == t.record.sharevk ? "checked" : "") + ' class="chbx">&nbsp;VK share button', _ += "</label>", _ += "</div>", _ += '<div class="pe-checkbox-box">', _ += '<label class="pe-label-checkbox">', _ += '\t<input type="hidden" name="sharetwitter" value="' + t.record.sharetwitter + '"/>', _ += '\t<input type="checkbox" name="sharetwitter-cb" ' + ("on" == t.record.sharetwitter ? "checked" : "") + ' class="chbx">&nbsp;Twitter share button', _ += "</label>", _ += '<div class="pe-hint" style="font-size:11px; opacity:0.5;padding-top:0;">' + ("RU" == lang ? "РўРІРёС‚С‚РµСЂ Р±РѕР»СЊС€Рµ РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚ API СЃ РєРѕР»РёС‡РµСЃС‚РІРѕРј РїСѓР±Р»РёРєР°С†РёР№. CС‡РµС‚С‡РёРє РїСѓР±Р»РёРєР°С†РёР№ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊСЃСЏ РЅРµ Р±СѓРґРµС‚" : "Twitter no longer supports the API number of publications. Counter publications will not be displayed.") + "</div>", _ += "</div>", _ += "</div>", "RU" == lang && "806" != t.record.tplid && (_ += '<div class="pe-checkbox-box">', _ += '<label class="pe-label-checkbox">', _ += '\t<input type="hidden" name="shareok" value="' + t.record.shareok + '"/>', _ += '\t<input type="checkbox" name="shareok-cb" ' + ("on" == t.record.shareok ? "checked" : "") + ' class="chbx">&nbsp;OK share button', _ += "</label>", _ += "</div>")), "gallery" == i && (_ += '<div class="form-group pe-form-group" data-tpl-field="' + i + '">', _ += "</div>"), "mapmarkers" == i && (_ += '<div class="form-group pe-form-group" data-tpl-field="' + i + '">', _ += '<label class="pe-label">' + e.label + "</label>", _ += "</div>"), "gallery_insta" == i && (_ += '<div class="form-group pe-form-group" data-tpl-field="' + i + '"></div>'), "formaction" == i && edrec__drawUI__formaction(t, r), "formmsgsuccess" == i && (706 == t.record.tplid && t.userpaysystems && void 0 !== t.userpaysystems && null != t.userpaysystems ? (_ += '<div class="form-group pe-form-group ' + (1 == t.record.formactiontype ? "hidden" : "") + ' js-formmsgsuccess" data-tpl-field="' + i + '">', _ += '\t<label class="pe-label">' + e.label + "</label>", _ += '\t<div class="padding-top:15px;">', _ += "RU" == lang ? 'Р—Р°РґР°С‚СЊ С‚РµРєСЃС‚ СЃРѕРѕР±С‰РµРЅРёСЏ РѕР± СѓСЃРїРµС…Рµ РІС‹ РјРѕР¶РµС‚Рµ РІ <a href="/projects/settings/?projectid=' + t.projectid + '#tab=ss_menu_payments" target="_blank" style="color:#fa633f;">РЅР°СЃС‚СЂРѕР№РєР°С… РїР»Р°С‚РµР¶РЅС‹С… СЃРёСЃС‚РµРј</a>' : 'Success message can be edited in Site Settings - <a href="/projects/settings/?projectid=' + t.projectid + '#tab=ss_menu_payments" target="_blank" style="color:#fa633f;">Payment systems</a>', _ += "\t</div>", _ += "</div>") : (706 == t.record.tplid && (_ += "<br><br>", _ += '<div class="pe-form-group__help-content pe-form-group__help-content_withoutborder">', _ += tc__translate("{{success_data_disclaimer}}", "edrec__dict"), _ += "</div>"), _ += '<div class="form-group pe-form-group ' + (1 == t.record.formactiontype ? "hidden" : "") + ' js-formmsgsuccess" data-tpl-field="' + i + '">', _ += '\t<label class="pe-label">' + e.label + "</label>", _ += '\t<div class="">', _ += '\t\t<div class="pe-redactor">', _ += '\t\t\t<textarea name="formmsgsuccess" class="pe-textarea" rows="2" redaktormin="yes" placeholder="' + e.ph + '">' + l + "</textarea>", _ += "\t\t</div>", _ += "\t</div>", _ += "</div>", _ += "<style>", _ += "\t.pe-form-group .redactor-linebreaks.redactor-placeholder:after{", _ += "\t\ttop:20px;", _ += "\t\tleft:0px;", _ += "\t\tfont-weight: inherit !important;", _ += "\t\tcolor: #cacaca;", _ += "\t}", _ += "</style>")), "formmsgurl" == i && (706 == t.record.tplid && t.userpaysystems && void 0 !== t.userpaysystems && null != t.userpaysystems ? (_ += '<div class="pe-form-group ' + (1 == t.record.formactiontype ? "hidden" : "") + ' js-formmsgsuccess" data-tpl-field="' + i + '">', _ += '\t<label class="pe-label">' + e.label + "</label>", _ += '\t<div class="padding-top:15px;">', _ += "RU" == lang ? 'Р—Р°РґР°С‚СЊ URL СѓСЃРїРµС…Р° РІС‹ РјРѕР¶РµС‚Рµ РІ <a href="/projects/settings/?projectid=' + t.projectid + '#tab=ss_menu_payments" target="_blank" style="color:#fa633f;">РЅР°СЃС‚СЂРѕР№РєР°С… РїР»Р°С‚РµР¶РЅС‹С… СЃРёСЃС‚РµРј</a>' : 'Success URL can be edited in Site Settings - <a href="/projects/settings/?projectid=' + t.projectid + '#tab=ss_menu_payments" target="_blank" style="color:#fa633f;">Payment systems</a>', _ += "\t</div>") : (_ += '<div class="pe-form-group ' + (1 == t.record.formactiontype ? "hidden" : "") + ' js-formmsgsuccess" data-tpl-field="' + i + '">', _ += '\t<label class="pe-label">' + e.label + "</label>", _ += '\t<div class="">', _ += '\t\t<input type="text" name="formmsgurl" class="pe-input" value="' + l + '" placeholder="' + e.ph + '">', _ += "\t</div>", _ += '\t<div class="pe-hint">' + e.hint + "</div>"), _ += "</div>"), "lang" != i && "lang2" != i || (void 0 === t.record.lang && (t.record.lang = ""), void 0 === t.record.lang2 && (t.record.lang2 = ""), void 0 === t.record.langlink && (t.record.langlink = ""), void 0 === t.record.lang2link && (t.record.lang2link = ""), _ += '<div class="pe-form-group">', _ += '\t<label class="pe-label">' + e.label + "</label>", _ += '\t<br><div class="">', _ += '\t\t<table class="pe-table">', _ += "\t\t<tr>", _ += '\t\t<td class="pe-table-col1">', _ += "\t\t" + ("RU" == lang ? "Р—Р°РіРѕР»РѕРІРѕРє" : "Title") + "<br>", _ += '\t\t<input type="text" name="' + i + '" class="pe-input" value="' + ("lang" == i ? t.record.lang : t.record.lang2) + '" placeholder="' + e.ph + '">', _ += "\t\t</td>", _ += '\t\t<td class="pe-table-col2">', _ += "\t\t" + ("RU" == lang ? "РЎСЃС‹Р»РєР°" : "Link") + "<br>", _ += '\t\t<input type="text" name="' + ("lang" == i ? "langlink" : "lang2link") + '" class="pe-input" value="' + ("lang" == i ? t.record.langlink : t.record.lang2link) + '" placeholder="">', _ += "\t\t</td>", _ += "\t\t</tr>", _ += "\t\t</table>", _ += "\t</div>", _ += "</div>"), "code" == i && (g = (o = document.querySelector(".pe-form-group__help-content_fixed")) ? parseInt(getComputedStyle(o).marginBottom, 10) + o.offsetHeight : 0, _ += '<div class="form-group pe-form-group" data-tpl-field="' + i + '">', "y" == t.code_restricted ? (_ += '<div style="background-color:yellow; padding:20px; color:#000;">', _ += "RU" == lang ? "Р”РѕСЃС‚СѓРї Рє СЌС‚РѕРјСѓ Р±Р»РѕРєСѓ РѕРіСЂР°РЅРёС‡РµРЅ. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРѕРґС‚РІРµСЂРґРёС‚Рµ: " : "Access to this block is restricted. Please verify your: ", "y" == t.needverify_email && (_ += ' &#183; <a href="/identity/" style="color:#ff855d !important; font-weight: 600;" target="_blank">' + ("RU" == lang ? "РІР°С€ email" : "email address") + "</a>"), "y" == t.needverify_phone && (_ += ' &#183; <a href="/identity/sms/" style="color:#ff855d !important; font-weight: 600;" target="_blank">' + ("RU" == lang ? "РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°" : "phone number") + "</a>")) : (_ += "131" !== t.record.tplid ? '<label class="pe-label">' + e.label + "</label><br>" : "", _ += "<div>", _ += '<pre id="aceeditor' + t.record.id + '"' + (o ? ' style="margin-bottom: ' + g + 'px;"' : "") + ">" + l + "</pre>", _ += '<textarea name="code" class="js-aceeditor" rows="10" style="display: none;">' + l + "</textarea>"), _ += "</div>", _ += "</div>"), "aliasrecord" == i && (_ += '<div class="pe-form-group" data-tpl-field="' + i + '">', _ += '\t<label class="pe-label">' + e.label + "</label>", _ += '\t<div class="">', _ += '\t\t<input type="text" name="' + i + '" class="pe-input" value="' + l + '" placeholder="' + e.ph + '">', _ += "\t</div>", void 0 !== t.record.aliasparentpageid && 0 < t.record.aliasparentpageid && (_ += '<div class="pe-hint">', t.record.aliasparentpageid == t.record.pageid ? _ += "RU" == lang ? "Р‘Р»РѕРє РЅР°С…РѕРґРёС‚СЃСЏ РЅР° С‚РµРєСѓС‰РµР№ СЃС‚СЂР°РЅРёС†Рµ" : "The block is on the current page" : _ += '<a href="/page/?pageid=' + t.record.aliasparentpageid + "#rec" + l + '" target="_blank">' + ("RU" == lang ? "РџРµСЂРµР№С‚Рё Рє СЂРѕРґРёС‚РµР»СЊСЃРєРѕР№ СЃС‚СЂР°РЅРёС†Рµ" : "Go to parent page") + "</a>", _ += "</div>"), _ += "</div>"), "linkhook" == i && (_ += '<div class="pe-form-group" data-tpl-field="' + i + '">', _ += '\t<label class="pe-label">', "398" == t.record.tplid || "303" == t.record.tplid || "794" == t.record.tplid ? _ += "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ РїСЂРёРІСЏР·РєРё" : "Link hook" : _ += "RU" == lang ? "РЎСЃС‹Р»РєР° РЅР° popup" : "Popup link", _ += "\t</label>", "354" != t.record.tplid && "367" != t.record.tplid && (_ += '<p style="font-family:Georgia; color:#444; margin-top:4px; margin-bottom:8px; font-weight:normal; font-size:14px;">', "398" == t.record.tplid || "303" == t.record.tplid || "794" == t.record.tplid ? _ += "<i>" + ("RU" == lang ? "СѓРєР°Р¶РёС‚Рµ С‚РѕС‡РЅС‹Р№ Р°РґСЂРµСЃ СЃСЃС‹Р»РєРё, Рє РєРѕС‚РѕСЂРѕР№ РґРѕР»Р¶РЅР° Р±С‹С‚СЊ РїСЂРёРІСЏР·РєР°" : "Enter the exact address to which you want to link this block") + "</i>" : _ += "<i>" + ("RU" == lang ? "РёСЃРїРѕР»СЊР·СѓР№С‚Рµ РєР°Рє СЃСЃС‹Р»РєСѓ РІ Р»СЋР±РѕРј Р±Р»РѕРєРµ, РїРѕ РєР»РёРєСѓ РЅР° РєРѕС‚РѕСЂС‹Р№ РґРѕР»Р¶РµРЅ РїРѕРєР°Р·С‹РІР°С‚СЊСЃСЏ СЌС‚РѕС‚ РїРѕРїР°Рї" : "Use as a link in any block вЂ“ this pop-up will be displayed on click") + "</i>", _ += "</p>"), _ += '<div class="">', _ += '<input type="text" name="linkhook" class="pe-input" value="' + l + '">', _ += "</div>", _ += '<div class="pe-hint">' + e.hint + "</div>", _ += "</div>"), "storepart" == i) {
        if (void 0 !== t.record.storepart && null != t.record.storepart || (t.record.storepart = ""), _ += '<div class="pe-form-group" data-tpl-field="' + i + '">', _ += '\t<label class="pe-label">' + e.label + "</label>", _ += '\t<div style="width:100%;" class="pe-select">', _ += '\t<select class="pe-input pe-select" name="storepart">', 951 == t.record.tplid ? _ += '<option value="">' + ("RU" == lang ? "РљР°С‚Р°Р»РѕРі-РїСЂРёРјРµСЂ" : "Example Catalog") + "</option>" : _ += '<option value="">' + ("RU" == lang ? "РќРµ Р·Р°РґР°РЅ. (РџРѕРєР°Р·С‹РІР°С‚СЊ С‚РѕРІР°СЂС‹ РёР· Р±Р»РѕРєР°)" : "Not set (show products from block)") + "</option>", "object" == typeof t.storeparts)
            for (var y in t.storeparts) _ += '<option value="' + t.storeparts[y].uid + '" ' + (t.storeparts[y].uid == t.record.storepart ? 'selected="selected"' : "") + ">" + ("y" == t.storeparts[y].root ? "RU" == lang ? "Р’СЃРµ С‚РѕРІР°СЂС‹ РёР· РєР°С‚Р°Р»РѕРіР°" : "All products" : ("RU" == lang ? "Р Р°Р·РґРµР»: " : "Part: ") + t.storeparts[y].title) + "</option>";
        _ += "\t</select>", _ += "\t</div>", _ += '\t<div class="pe-hint">', "object" == typeof t.storeparts && 0 < t.record.storepart ? _ += "RU" == lang ? 'РџРµСЂРµР№С‚Рё РІ <a href="/identity/gostore/?projectid=' + t.projectid + '" target="_blank" ' + ("object" != typeof t.storeparts ? 'onclick="edrec__closeEditForm()"' : "") + ">РєР°С‚Р°Р»РѕРі С‚РѕРІР°СЂРѕРІ</a>" : 'Go to the <a href="/identity/gostore/?projectid=' + t.projectid + '" target="_blank" ' + ("object" != typeof t.storeparts ? 'onclick="edrec__closeEditForm()"' : "") + ">products catalog</a>" : _ += "RU" == lang ? 'Р•СЃР»Рё Сѓ РІР°СЃ РјРЅРѕРіРѕ С‚РѕРІР°СЂРѕРІ, РґР»СЏ СѓРїСЂР°РІР»РµРЅРёСЏ РёРјРё РёСЃРїРѕР»СЊР·СѓР№С‚Рµ <a href="/identity/gostore/?projectid=' + t.projectid + '" target="_blank" ' + ("object" != typeof t.storeparts ? 'onclick="edrec__closeEditForm()"' : "") + ">РєР°С‚Р°Р»РѕРі С‚РѕРІР°СЂРѕРІ</a>" : 'If you sell a lot of products, use the <a href="/identity/gostore/?projectid=' + t.projectid + '" target="_blank" ' + ("object" != typeof t.storeparts ? 'onclick="edrec__closeEditForm()"' : "") + ">Product Catalog</a> to manage them.", _ += "\t</div>", _ += "</div>"
    }
    if ("feedpart" == i) {
        if (void 0 !== t.record.feeds && null != t.record.feeds || (t.record.feedspart = ""), _ += '<div class="pe-form-group" data-tpl-field="' + i + '">', _ += '\t<label class="pe-label">' + e.label + "</label>", _ += '\t<div style="width:100%;" class="pe-select">', _ += '\t<select class="pe-input pe-select" name="feedpart">', _ += '\t\t<option value="">' + ("RU" == lang ? "РќРµ Р·Р°РґР°РЅ" : "Not set") + "</option>", "5d9725a245f86259476957" != t.record.feedpart && "5d971e17b674f464032195" != t.record.feedpart && "873491564841" != t.record.feedpart || (_ += '<option value="' + t.record.feedpart + '" selected="selected">' + ("RU" == lang ? "РџРѕС‚РѕРє-РїСЂРёРјРµСЂ" : "Example Feed") + "</option>"), "object" == typeof t.feeds)
            for (var y in t.feeds)
                if (_ += '<option value="' + t.feeds[y].uid + '" ' + (t.feeds[y].uid == t.record.feedpart ? 'selected="selected"' : "") + ">" + ("RU" == lang ? "РџРѕС‚РѕРє: " : "Feed: ") + t.feeds[y].title + "</option>", "object" == typeof t.feeds[y].parts)
                    for (var E in t.feeds[y].parts) {
                        var N = t.feeds[y].uid + "-" + t.feeds[y].parts[E].uid;
                        _ += '<option value="' + N + '" ' + (N == t.record.feedpart ? 'selected="selected"' : "") + ">" + ("RU" == lang ? "--- Р Р°Р·РґРµР»: " : "--- Part: ") + t.feeds[y].parts[E].title + "</option>"
                    }
        _ += "\t</select>", _ += "\t</div>", _ += '\t<div class="pe-hint">', "object" == typeof t.feeds && 0 < t.record.feedpart ? _ += "RU" == lang ? 'РџРµСЂРµР№С‚Рё РІ <a href="/identity/gofeeds/?projectid=' + t.projectid + '" target="_blank" ' + ("object" != typeof t.feeds ? 'onclick="edrec__closeEditForm()"' : "") + ">СѓРїСЂР°РІР»РµРЅРёРµ РїРѕС‚РѕРєР°РјРё</a>" : 'Go to the <a href="/identity/gofeeds/?projectid=' + t.projectid + '" target="_blank" ' + ("object" != typeof t.feeds ? 'onclick="edrec__closeEditForm()"' : "") + ">feeds edit panel</a>" : _ += "RU" == lang ? 'РСЃРїРѕР»СЊР·СѓР№С‚Рµ РїРѕС‚РѕРєРё, С‡С‚РѕР±С‹ РІРµСЃС‚Рё Р»РµРЅС‚Сѓ РЅРѕРІРѕСЃС‚РµР№, Р±Р»РѕРі РёР»Рё РґСЂСѓРіСѓСЋ Р»РµРЅС‚Сѓ СЃРѕР±С‹С‚РёР№. РџРµСЂРµР№С‚Рё РІ <a href="/identity/gofeeds/?projectid=' + t.projectid + '" target="_blank" ' + ("object" != typeof t.feeds ? 'onclick="edrec__closeEditForm()"' : "") + ">СѓРїСЂР°РІР»РµРЅРёРµ РїРѕС‚РѕРєР°РјРё</a>" : 'To manage news feeds, blog posts, or other event feeds, go to <a href="/identity/gofeeds/?projectid=' + t.projectid + '" target="_blank" ' + ("object" != typeof t.feeds ? 'onclick="edrec__closeEditForm()"' : "") + ">Feeds</a>.", _ += "\t</div>", _ += "</div>"
    }
    if ("recids" != i && "recids2" != i && "recids3" != i && "recids4" != i && "recids5" != i && "recids6" != i && "recids7" != i && "recids8" != i || (_ += '<div class="pe-form-group" data-tpl-field="' + i + '">', _ += '<div class="pe-form-group-field-' + i + '">', _ += '<script type="text/javascript">', _ += 'edlink__drawUI__Recids("' + i + '","' + l + '");', _ += "<\/script>", _ += "</div>", _ += "</div>"), "paymentstat" == i && (_ += '<div class="pe-form-group" data-tpl-field="' + i + '">', _ += '    <div class="pe-hint" style="padding:0;">', _ += ("RU" == lang ? "РћС‚РїСЂР°РІРєР° РєРѕСЂР·РёРЅС‹ РІ СЃРёСЃС‚РµРјРµ Р°РЅР°Р»РёС‚РёРєРё Р±СѓРґРµС‚ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊСЃСЏ, РєР°Рє РїСЂРѕСЃРјРѕС‚СЂ СЃС‚СЂР°РЅРёС†С‹: " : "You can setup cart data submission as a goal in the analytic system as a view of virtual page: ") + "<br>/tilda/form" + t.record.id + "/submitted/ " + ("RU" == lang ? "РёР»Рё" : "or") + "<br>/tilda/form" + t.record.id + "/payment/<br>FB pixel: 'Lead' event<br>FB pixel: 'InitiateCheckout' event", _ += "\t</div>", _ += "</div>"), "formstat" == i && (_ += '<div class="pe-form-group" data-tpl-field="' + i + '">', _ += '    <div class="pe-hint" style="padding:0;">', _ += ("RU" == lang ? "РћС‚РїСЂР°РІРєР° С„РѕСЂРјС‹ РІ СЃРёСЃС‚РµРјРµ Р°РЅР°Р»РёС‚РёРєРё Р±СѓРґРµС‚ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊСЃСЏ РєР°Рє РїСЂРѕСЃРјРѕС‚СЂ СЃС‚СЂР°РЅРёС†С‹: " : "Submitting the form will appear as a page view in the analytics system: ") + "/tilda/form" + t.record.id + "/submitted<br>FB pixel: 'Lead' event", _ += "\t</div>", _ += "</div>"), "makefish" == i && (_ += '<div class="pe-form-group" data-tpl-field="' + i + '">', _ += '<div class="pe-checkbox-box"><label class="pe-label-checkbox">', _ += t.record.id == t.tpl.fishid ? "This is a fish" : '<input type="checkbox" name="makefish"> Make fish', _ += "</label></div><br><br>", _ += "</div>"), "makezerofish" == i) {
        for (var y in _ += '<div class="pe-form-group" data-tpl-field="' + i + '">', _ += '<label class="pe-label">Make Zero Fish for Block</label>', _ += '<div class="pe-select">', _ += '<select class="pe-input pe-select" name="setzero_tplid">', _ += '<option value="">None</option>', t.zalltpls) _ += '<option value="' + t.zalltpls[y].id + '" ' + (t.record.id == t.zalltpls[y].zeroid ? 'selected="selected"' : "") + ">" + t.zalltpls[y].cod + ": " + t.zalltpls[y].title + "</option>";
        _ += "</select>", _ += "</div>", _ += "</div>"
    }
    if ("oklink" != i) {
        if ("soclinks" == i && (void 0 === t.record.soclinks && (t.record.soclinks = ""), _ += '<div class="form-group pe-form-group" data-tpl-field="' + i + '">', _ += '<textarea class="editlist__data" name="' + i + '" rows="2" style="height:100px; width:90%; display:none;">' + t.record.soclinks + "</textarea>", _ += '<div class="editlist__loader" style="background-color:#efefef;padding:50px 40px; text-align:center; margin-bottom:10px;">' + ("RU" == lang ? "Р—Р°РіСЂСѓР·РєР°..." : "Loading...") + "</div>", _ += '<div class="editlist__wrapper" data-ui-type="edsl"></div>', _ += "</div>"), r.append(_), "list" == i && (window.lireplaces = "", void 0 !== t.tpl.lireplaces && "" != t.tpl.lireplaces && (window.lireplaces = JSON.parse(t.tpl.lireplaces)), setTimeout(function() {
                edli__init(), $(".editlist__loader").remove()
            }, 400)), "forminputs" == i && ("function" != typeof edfo__init && tc__loadJSFile("/front/js/t-edrec-form.min.js"), window.lireplaces = "", void 0 !== t.tpl.lireplaces && "" != t.tpl.lireplaces && (window.lireplaces = JSON.parse(t.tpl.lireplaces)), setTimeout(function() {
                tc__onFuncLoad("edfo__init", function() {
                    edfo__init(), $(".editlist__loader").remove()
                })
            }, 400)), "menuitems" == i) {
            var w = 0,
                k = t.record.menuitems ? JSON.parse(t.record.menuitems) : [];
            for (h in k) {
                if (edme__addItem(k[h].title, k[h].link, k[h].linktarget, w), void 0 !== k[h].sub) {
                    var x, U = edme__addSubWrapper(w),
                        R = 0;
                    for (x in k[h].sub) edme__addSubItem(U, k[h].sub[x].title, k[h].sub[x].link, k[h].sub[x].linktarget, w, R), R++;
                    edme__addSortable_sub(w)
                }
                w++
            }
            edme__addSortable()
        }
        if ("sharebuttons" == i && ($("input[name=sharefacebook-cb]").change(function() {
                var e = (e = $(this).is(":checked")) ? "on" : "";
                $("input[name=sharefacebook]").val(e)
            }), $("input[name=sharetwitter-cb]").change(function() {
                var e = (e = $(this).is(":checked")) ? "on" : "";
                $("input[name=sharetwitter]").val(e)
            }), $("input[name=sharevk-cb]").change(function() {
                var e = (e = $(this).is(":checked")) ? "on" : "";
                $("input[name=sharevk]").val(e)
            }), $("input[name=shareok-cb]").change(function() {
                var e = (e = $(this).is(":checked")) ? "on" : "";
                $("input[name=shareok]").val(e)
            })), "gallery_insta" == i && edinst__init(), "gallery" == i && edga__init(t, r), "mapmarkers" == i && edmap__init(t, r), "userpayment" == i) {
            -1 !== t.tpl.fields.indexOf(i) && ($("input[name=paymentoff-cb]").change(function() {
                var e = $(this).is(":checked");
                e ? (e = "y", $(".js-payment-option").hide(), 0 < $("input[name=formmsgurl]").length && $("input[name=formmsgurl]").closest(".pe-form-group").fadeIn()) : (e = "", $(".js-payment-option").show(), 0 < $("input[name=formmsgurl]").length && $("input[name=formmsgurl]").closest(".pe-form-group").fadeOut()), $("input[name=paymentoff]").val(e)
            }), setTimeout(function() {
                "y" == $("input[name=paymentoff]").val() ? ($(".js-payment-option").hide(), 0 < $("input[name=formmsgurl]").length && $("input[name=formmsgurl]").closest(".pe-form-group").show()) : 0 < $("input[name=formmsgurl]").length && $("input[name=formmsgurl]").closest(".pe-form-group").hide()
            }));
            var _ = "";
            if (_ += '<div class="pe-form-group js-payment-option" data-tpl-field="' + i + '">', _ += '\t<input type="hidden" name="userpayment" value="y">', void 0 !== t.userpaysystems && t.userpaysystems && 0 < t.userpaysystems.length) {
                for (var j in 1 == t.userpaysystems.length ? _ += '<label class="pe-label">' + ("RU" == lang ? "РЈСЃС‚Р°РЅРѕРІР»РµРЅР° РїР»Р°С‚РµР¶РЅР°СЏ СЃРёСЃС‚РµРјР°:" : "Installed payment system:") + "</label>" : _ += '<label class="pe-label">' + ("RU" == lang ? "РЈСЃС‚Р°РЅРѕРІР»РµРЅС‹ РїР»Р°С‚РµР¶РЅС‹Рµ СЃРёСЃС‚РµРјС‹:" : "Installed payments systems:") + "</label>", _ += '<div style="padding-top: 10px;">', _ += "\t<ul>", t.userpaysystems) {
                    var S = t.userpaysystems[j];
                    void 0 === S.system && (S.system = ""), void 0 === S.accountid && (S.accountid = ""), void 0 === S.type && (S.type = ""), void 0 === S.currency && (S.currency = ""), void 0 === S.title && (S.title = ""), _ += "<li>", "" != S.title ? _ += S.title : "paypal" == S.system ? _ += "Paypal: " + S.accountid + ", " + S.currency + " (" + ("_donations" == S.type ? "Donate" : "Buy") + ")" : "yamoney" == t.project.upay.system ? _ += "Yandex.Money: " + S.accountid + ", " + S.currency + " (" + ("donate" == S.type ? "Donate" : "Buy") + ")" : "yamoneymc" == t.project.upay.system ? _ += "Yandex.Money: " + S.accountid + ", Mobile (" + ("_donations" == S.type ? "Donate" : "Buy") + ")" : "yamoneyac" == t.project.upay.system ? _ += "Yandex.Money: " + S.accountid + ", Credit Card (" + ("_donations" == S.type ? "Donate" : "Buy") + ")" : "yamoneypc" == t.project.upay.system ? _ += "Yandex.Money: " + S.accountid + ", Yandex Money (" + ("_donations" == S.type ? "Donate" : "Buy") + ")" : "yakassa" == S.system ? _ += "Yandex.Kassa: " + S.accountid + ", " + S.currency : "stripe" == S.system ? _ += "Stripe: " + S.accountid + ", " + S.currency : "cloudpayments" == S.system ? _ += "CloudPayments: " + S.accountid + ", " + S.currency : "robokassa" == S.system ? _ += "Robokassa: " + S.accountid + ", " + S.currency : "liqpay" == S.system ? _ += "LiqPay: " + S.accountid + ", " + S.currency : _ += S.system + ", " + S.accountid, _ += "</li>"
                }
                _ += "\t</ul>", _ += '\t\t <a href="/projects/settings/?projectid=' + t.projectid + '#tab=ss_menu_payments" style="color: #ff8562 !important;">' + ("RU" == lang ? "РќР°СЃС‚СЂРѕР№РєРё" : "Settings") + "</a>", _ += "</div>"
            } else _ += '<label class="pe-label">&nbsp;</label>', _ += "<div>", "RU" == lang ? _ += 'РџРѕРґРєР»СЋС‡РёС‚Рµ РїР»Р°С‚РµР¶РЅСѓСЋ СЃРёСЃС‚РµРјСѓ РІ <a href="/projects/settings/?projectid=' + t.projectid + '#tab=ss_menu_payments" style="color: #ff8562 !important;">РЅР°СЃС‚СЂРѕР№РєР°С… СЃР°Р№С‚Р°</a>' : _ += 'Please, connect payment system in <a href="/projects/settings/?projectid=' + t.projectid + '#tab=ss_menu_payments" style="color: #ff8562 !important;">site settings</a>', _ += "</div>";
            _ += "</div>", r.append(_)
        }
        "buttonlink_prod" == i && (_ = "", _ += '<div class="pe-select-div">', _ += '<div class="pe-select">', _ += '<select class="pe-input pe-select" name="buttonlink_prod">', _ += ' <option value="" ' + ("" == t.record.buttonlink_prod ? 'selected="selected"' : "") + ">" + ("RU" == lang ? "РЎСЃС‹Р»РєР°" : "Link") + "</option>", _ += ' <option value="order" ' + ("order" == t.record.buttonlink_prod ? 'selected="selected"' : "") + ">" + ("RU" == lang ? "Р”РѕР±Р°РІРёС‚СЊ РІ РєРѕСЂР·РёРЅСѓ" : "Add to Cart") + "</option>", _ += "</select>", _ += "</div>", _ += "</div>", (a = $('[data-tpl-field="buttonlink"]')).find(".pe-label").after(_), n = $(".pe-form-group").find('[name="buttonlink_prod"]'), s = a.find(".pe-field-link").find('[name="buttonlink"]'), n.change(function() {
            var e = n.val();
            "order" == e ? a.find(".pe-field-link").css("display", "none") : a.find(".pe-field-link").css("display", "block"), "order" == e ? s.val("#order") : "#order" == s.val() && s.val("")
        }), n.trigger("change")), "prod_option" == i && edrec__drawUI__prodoptions(t, r), "storeprod" == i && ("" == e.label && (e.label = i), _ = "", _ += '<div class="pe-form-group" data-tpl-field="' + i + '">', _ += '\t<label class="pe-label">' + e.label + "</label>", _ += "\t<div>", _ += '\t\t<input type="text" name="' + i + '" class="pe-input" placeholder="' + e.ph + '" value="' + l + '" />', _ += '\t\t<div class="pe-hint">', "RU" == lang ? _ += 'Р•СЃР»Рё РІС‹ РёСЃРїРѕР»СЊР·СѓРµС‚Рµ <a href="/identity/gostore/?projectid=' + window.projectid + '" target="_blank" style="color: inherit">РєР°С‚Р°Р»РѕРі</a> вЂ“ СѓРєР°Р¶РёС‚Рµ РІ РїРѕР»Рµ ID С‚РѕРІР°СЂР°. ID РІС‹ РјРѕР¶РµС‚Рµ РЅР°Р№С‚Рё РІ РєР°С‚Р°Р»РѕРіРµ, РІ СЃР°РјРѕРј РЅРёР·Сѓ РїР°РЅРµР»Рё СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ С‚РѕРІР°СЂР°. Р­С‚Рѕ РїРѕР·РІРѕР»РёС‚ СЃРёРЅС…СЂРѕРЅРёР·РёСЂРѕРІР°С‚СЊ РґР°РЅРЅС‹Рµ: Р°СЂС‚РёРєСѓР», С†РµРЅСѓ, РєРѕР»РёС‡РµСЃС‚РІРѕ РІ РЅР°Р»РёС‡РёРё Рё РІР°СЂРёР°РЅС‚С‹.<br><br>' + (l ? '<a href="#" name="updateFromProductsCatalog" style="color: inherit">Р—Р°РїРѕР»РЅРёС‚СЊ РїРѕР»СЏ РґР°РЅРЅС‹РјРё С‚РѕРІР°СЂР°</a> РёР· РєР°С‚Р°Р»РѕРіР°.' : "") : _ += 'If you use the <a href="/identity/gostore/?projectid=' + window.projectid + '" target="_blank" style="color: inherit">Product Catalog</a>, enter the Product ID here. Find the Product ID at the bottom of the product settings panel in the Catalog. This will allow you to synchronize data: SKU, price, quantity in stock, and product variants.<br><br>' + (l ? '<a href="#" name="updateFromProductsCatalog" style="color: inherit">Fill in the fields with the data</a> from the Product Catalog.' : ""), _ += "\t\t</div>", _ += "\t</div>", _ += "</div>", r.append(_), d = function(e) {
            if ("" !== e.products) {
                if (window.tStoreSingleProdsObj && window.tStoreSingleProdsObj[l]) {
                    var t, i = window.tStoreSingleProdsObj[l];
                    if (i.title && r.find('[data-tpl-field="title"] [name="title"]').val(i.title), i.sku && r.find('[data-tpl-field="title2"] [name="title2"]').val(i.sku), i.text && r.find('[data-tpl-field="descr"] [name="descr"]').val(i.text), i.price && (t = parseFloat(i.price), r.find('[data-tpl-field="price"] [name="price"]').val(t)), i.priceold && (t = parseFloat(i.priceold), r.find('[data-tpl-field="price_old"] [name="price_old"]').val(t)), i.gallery) {
                        var o = [];
                        try {
                            o = JSON.parse(i.gallery)
                        } catch (e) {}
                        var a, n = "";
                        o.length && (a = parseInt($("#gallery-imgs-list").attr("data-init-count-img")) + 1 || 1e3, Array.prototype.forEach.call(o, function(e, t) {
                            e && e.img && 0 === $('[name^="gallery-imgs-file["][value="' + e.img + '"]').length && (n += '<input type="hidden" name="gallery-imgs-file[' + (a + t) + ']" value="' + e.img + '" /><input type="hidden" id="gallery-imgs-file-upd-' + (a + t) + '" name="gallery-imgs-file-upd[' + (a + t) + ']" value="' + e.img + '" />')
                        }), n.length && ($("#gallery-update").remove(), n += '<input type="hidden" name="gallery-update" value="yes" />', r.find('[data-tpl-field="storeprod"]').before(n)))
                    }
                    edrec__content__sendform("update")
                } else td__showBubbleNotice("RU" === window.lang ? "РќРµ СѓРґР°РµС‚СЃСЏ РїРѕР»СѓС‡РёС‚СЊ С‚РѕРІР°СЂ РёР· РєР°С‚Р°Р»РѕРіР°. Р’РѕР·РјРѕР¶РЅРѕ РѕРЅ Р±С‹Р» СѓРґР°Р»РµРЅ РёР»Рё РѕС‚РєР»СЋС‡РµРЅ. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїСЂРѕРІРµСЂСЊС‚Рµ, С‡С‚Рѕ С‚РѕРІР°СЂ СЃ С‚Р°РєРёРј ID СЃСѓС‰РµСЃС‚РІСѓРµС‚." : "Can't find a product in the catalog. It may have been deleted or disabled. Please check that the product with this ID exists.", 6e3, "error");
                hideLoadIcon()
            } else console.log("Something went wrong. Can't get products array by uid list. Please check products UID.")
        }, l && r.find('a[name="updateFromProductsCatalog"]').on("click", function() {
            showLoadIcon(), t_store_loadProducts_byId([l], {}, d, function(e) {
                t_store_changeEndpoint(e, function() {
                    t_store_loadProducts_byId([l], {}, d)
                })
            })
        })), "code" == i && (p = "131" === t.record.tplid ? (document.documentElement.clientHeight - 60) / Math.round(12 * 1.3334) : 10, c = "131" === t.record.tplid ? p : 30, u = function() {
            var e;
            $("#aceeditor" + t.record.id).length && ((e = ace.edit("aceeditor" + t.record.id)).setTheme("ace/theme/github"), e.session.setMode("ace/mode/html"), e.setOptions({
                minLines: p,
                maxLines: c,
                fontSize: 12,
                setAutoScrollEditorIntoView: !0
            }), e.commands.addCommand({
                name: "loadAutocompleteJS",
                bindKey: {
                    win: "Ctrl-Space",
                    mac: "Ctrl-Space|Command-Shift-Space"
                },
                exec: function() {
                    e.commands.removeCommand("loadAutocompleteJS"), tc__loadJSFile("https://front.tildacdn.com/aceeditor/ext-language_tools.js", function() {
                        m()
                    })
                },
                readOnly: !0
            }), $("#aceeditor" + t.record.id).closest("div").find(".js-aceeditor").data("aceeditor", e))
        }, m = function() {
            $("#aceeditor" + t.record.id).length && ace.edit("aceeditor" + t.record.id).setOptions({
                enableBasicAutocompletion: !0,
                enableLiveAutocompletion: !0
            })
        }, "object" != typeof ace ? tc__loadJSFile("https://front.tildacdn.com/aceeditor/ace.js", function() {
            u()
        }) : (u(), m())), "linkhook" == i && $("input[name=linkhook]").change(function() {
            var e = $(this).val();
            "" != e && /[\u0400-\u04FF]/.test(e) && alert("Please, use only Latin letters in link")
        }), "storepart" == i && "object" == typeof t.storeparts && ("" != t.record.storepart && $('.pe-form-group[data-tpl-field="list"]').css("display", "none"), 0 < $(".editlist__data").length && "" != $(".editlist__data").val() && (t.record.storepart, g = "", g += '\t<span class="link_copyproductstocatalog">' + ("RU" == lang ? '<a href="javascript:edrec__copyproducts_to_catalog(' + t.record.pageid + "," + t.record.id + ')" style="color:#fa8669;">РЎРєРѕРїРёСЂРѕРІР°С‚СЊ С‚РѕРІР°СЂС‹ РІ РєР°С‚Р°Р»РѕРі</a> РёР· РґР°РЅРЅРѕРіРѕ Р±Р»РѕРєР°.' : '<a href="javascript:edrec__copyproducts_to_catalog(' + t.record.pageid + "," + t.record.id + ')" style="color:#fa8669;">Copy products</a> from this block to the Product Catalog.') + "</span>", g += '\t<span class="link_copyproductstocatalog_result"></span>', $(".editlist__wrapper").parent().prepend(""), $(".editlist__wrapper").parent().append(g)), setTimeout(function() {}, 500)), "soclinks" == i && ("function" != typeof edsl__init && (tc__loadCSSFile("/front/css/t-edrec-soclinks.min.css"), tc__loadJSFile("/front/js/t-edrec-soclinks.min.js")), setTimeout(function() {
            tc__onFuncLoad("edsl__init", function() {
                edsl__init(), $(".editlist__loader").remove();
                var l = $("#editformsxl .pe-content-form").attr("data-rec-tplid");
                setTimeout(function() {
                    for (var e, t = ["facebook", "twitter", "vk", "ok", "behance", "instagram", "pinterest", "vimeo", "youtube", "linkedin", "soundcloud", "telegram", "whatsapp", "tiktok", "viber"], i = 0; i < t.length; i++) {
                        var o, a = t[i];
                        (o = $("#editformsxl").find('input[name="' + a + 'link"]')).length && "" == o.val() && o.parent().parent().css("display", "none")
                    }
                    if ("212" == l && ((o = $("#editformsxl").find('input[name="link"]')).length && "" == o.val() && o.parent().parent().css("display", "none"), (e = $("#editformsxl").find('.pe-form-group[data-tpl-field="img"] .js-img-card')).length && "none" == e.css("display") && $("#editformsxl").find('.pe-form-group[data-tpl-field="img"]').css("display", "none")), "911" == l)
                        for (t = ["descr2", "text2", "descr3", "descr4", "text3", "descr5", "descr6", "descr7", "text4", "descr8", "text5"], i = 0; i < t.length; i++) {
                            a = t[i];
                            (n = $("#editformsxl").find('textarea[name="' + a + '"]')).length && "" == n.val() && n.parent().parent().css("display", "none")
                        }
                    if ("825" == l || "898" == l)
                        for (t = ["descr", "text5", "descr2", "title2", "descr3", "text7", "descr4", "descr5", "descr6", "text6", "descr7", "descr8"], i = 0; i < t.length; i++) {
                            var n, a = t[i];
                            (n = $("#editformsxl").find('textarea[name="' + a + '"]')).length && "" == n.val() && n.parent().parent().css("display", "none")
                        }
                }, 400)
            })
        }, 400))
    } else "RU" != lang && "" == l || edrec__drawUI__input(e, l, t, i, r)
}

function edrec__drawUI__converttozero(e, t) {
    var i = "";
    i += '<div style="padding-top:20px;padding-bottom:0px;" class="pe-form-group pe-zero-convert-btn">', i += '\t<table style="max-width:280px; height:50px; border:1px solid rgba(0,0,0,0.1);cursor: pointer; color:#000;" onclick="converttozero(' + e.record.id + ');">', i += "\t\t<tr>", i += '\t\t\t<td style="padding-left:20px; width:30px; text-align:center;"><img src="/tpl/img/null/zero1_for_small_size_black.svg" style="width:30px;"></td>', i += '\t\t\t<td style="font-size:13px; font-weight:500; line-height:50px; padding-right:20px; padding-left:10px;padding-top:2px;">{{convert_to_zero}}</td>', i += "\t\t</tr>", i += "\t</table>", i += '\t<div style="opacity:0.7; font-size:13px; font-weight:300; padding-top:10px;">{{convert_to_zero_descr}}</div>', i += "</div>", i += '<div class="pe-form-group pe-zero-convert-notice"></div>', i = tc__translate(i, "edrec__dict"), t.append(i)
}

function edrec__drawUI__formaction(e, t) {
    void 0 === e.record.formactiontype && (e.record.formactiontype = ""), void 0 === e.record.formaction && (e.record.formaction = ""), void 0 === e.record.formtarget && (e.record.formtarget = ""), void 0 === e.record.formajax && (e.record.formajax = "");
    var i = "";
    if (i += '\t<div class="pe-form-group">', i += '\t\t<label class="pe-label pe-label__recievedataforms">' + ("RU" == lang ? "РџСЂРёРµРј РґР°РЅРЅС‹С… РёР· С„РѕСЂРјС‹" : "Form data receiver") + "</label>", i += "\t\t<br>", i += '\t\t<div class="pe-hint" style="padding:0;">', i += "\t\t" + ("RU" == lang ? 'РћС‚РїСЂР°РІР»РµРЅРЅС‹Рµ РґР°РЅРЅС‹Рµ Р±СѓРґСѓС‚ С…СЂР°РЅРёС‚СЊСЃСЏ РІ <a href="https://tilda.cc/projects/leads/?projectid=' + e.projectid + '" target="_blank" style="color:#FF855D !important;">СЂР°Р·РґРµР»Рµ В«Р—Р°СЏРІРєРёВ»</a>. РўР°РєР¶Рµ РІС‹ РјРѕР¶РµС‚Рµ РїРѕРґРєР»СЋС‡РёС‚СЊ СЃРµСЂРІРёСЃС‹ РїСЂРёРµРјР° РґР°РЅРЅС‹С…, РёРЅС‚РµРіСЂРёСЂРѕРІР°РЅРЅС‹С… СЃ РўРёР»СЊРґРѕР№.' : 'Submitted data is stored in the <a href="https://tilda.cc/projects/leads/?projectid=' + e.projectid + '" target="_blank" style="color:#FF855D !important;">Leads section</a> of the project. You can also connect data collection services integrated with Tilda.'), i += "\t\t</div>", i += '\t\t<div class="js-accourdion-wrapper" id="formactionbox' + e.record.id + '">', i += "\t\t\t" + (1 != e.record.formactiontype ? '<div style="display:none;" class="pe-wrapper__servicesrecievers">' : ""), i += '\t\t\t<label class="pe-label-radio"><input type="radio" name="formactiontype' + e.record.id + '" value="2" data-collapse-id="formtype' + e.record.id + 'two" ' + (1 != e.record.formactiontype ? 'checked="checked"' : "") + "/> " + ("RU" == lang ? "РљРѕРЅС‚Р°РєС‚РЅС‹Рµ Р»РёСЃС‚С‹ Рё СЃРµСЂРІРёСЃС‹" : "Contacts lists and services") + "</label>", i += "\t\t\t" + (1 != e.record.formactiontype ? "</div>" : ""), i += '\t\t\t<div class="js-accourdion-box" style="margin-left: 0; ' + (void 0 === e.record.formactiontype || "" == e.record.formactiontype || "0" == e.record.formactiontype || 2 == e.record.formactiontype ? "display:block;" : "display:none;") + '" id="formtype' + e.record.id + 'two">', i += "\t\t\t\t<br>", i += '\t\t\t\t<table border="0"><tr valign="top">', 0 < $oplan) {
        if (i += '\t\t\t\t<td style="padding-right: 30px;" width="49%" class="js-box-tilda-crm-lists">', i += '\t\t\t\t\t<label class="pe-label" style="font-weight: bold; margin-bottom: 20px;">' + (lang, "Tilda CRM:") + "</label>", void 0 !== e.formcrmintegrations && 0 != e.formcrmintegrations.length) {
            for (var o in e.formcrmintegrations) i += '\t\t\t\t\t\t<label class="pe-label" style="margin-bottom:12px;"><input type="checkbox" name="formintegrations' + e.record.id + '[]" value="' + e.formcrmintegrations[o].hash + '" ' + (1 == e.formcrmintegrations[o].checked ? 'checked="checked"' : "") + "> " + e.formcrmintegrations[o].name + "</label>";
            i += "\t\t\t\t\t\t<br>", i += '\t\t\t\t\t\t<div class="pe-hint" style="padding-top: 0px;">', i += "\t\t\t\t\t\t\t" + ("RU" == lang ? 'РџРµСЂРµР№С‚Рё РІ <a href="https://tilda.cc/identity/gocrm/" target="_blank">Tilda CRM</a>' : 'Go to <a href="https://tilda.cc/identity/gocrm/" target="_blank">Tilda CRM</a>'), i += "\t\t\t\t\t\t</div>", i += "\t\t\t\t\t\t<br>"
        } else i += '\t\t\t\t\t<div class="pe-hint" style="margin-bottom: 10px;padding-top: 0px;">', i += "\t\t\t\t\t\t" + ("RU" == lang ? "РЈ Р’Р°СЃ РїРѕРєР° РЅРµС‚ РЅРё РѕРґРЅРѕРіРѕ Р»РёСЃС‚Р°" : "You don't have any list yet."), i += "\t\t\t\t\t</div>", i += '\t\t\t\t\t<a href="https://tilda.cc/identity/gocrm/" target="_blank" class="pe-btn-black" style="color: #ffffff !important; font-weight: 400;border-radius:5px;margin-bottom:25px;padding:8px 20px;">' + ("RU" == lang ? "РЎРѕР·РґР°С‚СЊ" : "Create") + "</a>";
        i += "\t\t\t\t</td>"
    }
    if (i += '\t\t\t\t<td width="49%" id="outerrecieverboxid">', i += '\t\t\t\t\t<label class="pe-label" style="font-weight: bold; margin-bottom: 20px;">' + ("RU" == lang ? "РџРѕРґРєР»СЋС‡РµРЅРЅС‹Рµ СЃРµСЂРІРёСЃС‹" : "Connected services") + ":</label>", void 0 !== e.formintegrations && 0 < e.formintegrations.length) {
        for (var o in e.formintegrations) i += '<label class="pe-label" style="margin-bottom:12px;"><input type="checkbox" name="formintegrations' + e.record.id + '[]" value="' + e.formintegrations[o].hash + '" ' + (1 == e.formintegrations[o].checked ? 'checked="checked"' : "") + '  data-form-type="' + e.formintegrations[o].type + '">', "" != e.formintegrations[o].name ? i += " " + e.formintegrations[o].type + ": " + e.formintegrations[o].name : i += " " + e.formintegrations[o].type + ": " + e.formintegrations[o].appid.substr(10), i += "</label>";
        i += "\t\t\t\t\t\t<br>"
    } else i += '\t\t\t\t\t\t<div class="pe-hint" style="padding-top: 0px;">' + ("RU" == lang ? "Р’С‹ РїРѕРєР° РЅРµ РїРѕРґРєР»СЋС‡РёР»Рё РЅРё РѕРґРЅРѕРіРѕ СЃРµСЂРІРёСЃР°" : "You have not connected any service yet") + "</div>", i += "\t\t\t\t\t\t<br>", i += '\t\t\t\t\t\t<a href="/projects/settings/?projectid=' + e.projectid + '#tab=ss_menu_forms" class="pe-btn-black" style="color: #ffffff !important; font-weight: 400;border-radius:5px;padding:8px 20px;">' + ("RU" == lang ? "РџРѕРґРєР»СЋС‡РёС‚СЊ" : "Connect") + "</a>";
    i += "\t\t\t\t</td>", i += "\t\t\t\t</tr></table>", i += '\t\t\t\t\t<div class="pe-hint">', "RU" == lang ? i += 'Р’С‹ РјРѕР¶РµС‚Рµ РїРѕР»СѓС‡Р°С‚СЊ РґР°РЅРЅС‹Рµ РЅР° Email, РІ РґРѕРєСѓРјРµРЅС‚ Google РёР»Рё РІ СЃРµСЂРІРёСЃС‹, РёРЅС‚РµРіСЂРёСЂРѕРІР°РЅРЅС‹Рµ СЃ РўРёР»СЊРґРѕР№: MailChimp, GetResponse, UniSender, SendGrid, amoCRM, РњРµРіР°РїР»Р°РЅ Рё РґСЂСѓРіРёРµ. РџРѕРґРєР»СЋС‡РёС‚Рµ СЃРµСЂРІРёСЃ РґР»СЏ РїСЂРёРµРјР° РґР°РЅРЅС‹С… РІ РЅР°СЃС‚СЂРѕР№РєР°С… СЃР°Р№С‚Р°, <a href="/projects/settings/?projectid=' + e.projectid + '#tab=ss_menu_forms" target="_blank">СЂР°Р·РґРµР» Р¤РѕСЂРјС‹</a>. Р§РёС‚Р°Р№С‚Рµ <a href="https://help-ru.tilda.cc/forms" target="_blank">РїРѕРґСЂРѕР±РЅСѓСЋ РёРЅСЃС‚СЂСѓРєС†РёСЋ</a> РІ РЅР°С€РµРј РЎРїСЂР°РІРѕС‡РЅРѕРј С†РµРЅС‚СЂРµ. ' + (void 0 !== e.project && void 0 !== e.project.json && void 0 !== e.project.json.formspamguard && "on" == e.project.json.formspamguard ? "<br>Р—Р°С‰РёС‚Р° РѕС‚ СЃРїР°РјР° РІРєР»СЋС‡РµРЅР°." : "") : i += 'You can receive data to your Email, Google Sheets, or to one of many integrated services such as MailChimp, SendGrid, Trello, Slack, etc. Assign service in Site Settings в†’ <a href="/projects/settings/?projectid=' + e.projectid + '#tab=ss_menu_forms" target="_blank">Forms</a>. Learn more in our <a href="https://help.tilda.cc/forms" target="_blank">Help Center</a>. ' + (void 0 !== e.project && void 0 !== e.project.json && void 0 !== e.project.json.formspamguard && "on" == e.project.json.formspamguard ? "<br>Anti-spam activated." : ""), i += "\t\t\t\t\t</div>", i += "\t\t\t</div>", i += "\t\t\t<br>", i += "\t\t" + (1 != e.record.formactiontype ? "<div style='display:none;' class='pe-wrapper__ownscriptreciever'>" : ""), i += '\t\t\t<label class="pe-label-radio"><input type="radio" name="formactiontype' + e.record.id + '" value="1" data-collapse-id="formtype' + e.record.id + 'one" ' + (1 == e.record.formactiontype ? 'checked="checked"' : "") + "/>", i += "\t\t\t" + ("RU" == lang ? "РЎРІРѕР№ СЃРєСЂРёРїС‚ РґР»СЏ РїСЂРёРЅСЏС‚РёСЏ РґР°РЅРЅС‹С…" : "Own script for receiving data") + "</label>", i += '\t\t\t<div class="js-accourdion-box" style="margin-left: 20px; ' + (1 == e.record.formactiontype ? "display:block;" : "display:none;") + '" id="formtype' + e.record.id + 'one">', i += '\t\t\t\t<input type="text" name="formaction" class="pe-input" value="' + e.record.formaction + '" placeholder="example: http://site.com/submit.php">', i += '\t\t\t\t<div class="pe-hint">' + ("RU" == lang ? 'РќРµРѕР±С…РѕРґРёРјРѕ СѓРєР°Р·Р°С‚СЊ Р°РґСЂРµСЃ СЃРєСЂРёРїС‚Р°, РєРѕС‚РѕСЂС‹Р№ РїСЂРёРЅРёРјР°РµС‚ Р·РЅР°С‡РµРЅРёСЏ РёР· С„РѕСЂРјС‹. РљР°Рє РЅР°СЃС‚СЂРѕРёС‚СЊ РїСЂРёРµРј РґР°РЅРЅС‹С… РёР· С„РѕСЂРјС‹, <a href="https://help-ru.tilda.cc/forms/webhook" target="_blank">С‡РёС‚Р°Р№С‚Рµ РІ СЂР°Р·РґРµР»Рµ РџРѕРјРѕС‰СЊ</a>' : 'Add the script address that will receive field values. Learn how to receive form submissions using custom scripts in the <a href="https://help.tilda.cc/formsscript" target="_blank">Help Center</a>.') + "</div>", i += "\t\t\t\t<br>", -1 !== e.tpl.fields.indexOf(",formtarget") && (i += '\t\t\t\t<label class="pe-label">' + ("RU" == lang ? "Р¦РµР»СЊ С„РѕСЂРјС‹" : "Form Target") + "</label>", i += '\t\t\t\t<div class="pe-select">', i += '\t\t\t\t\t<select class="pe-input pe-select" name="formtarget">', i += '\t\t\t\t\t  <option value="" ' + ("" == e.record.formtarget ? 'selected="selected"' : "") + ">" + ("RU" == lang ? "Р’ СЌС‚РѕРј Р¶Рµ РѕРєРЅРµ" : "Same window") + "</option>", i += '\t\t\t\t\t  <option value="_blank" ' + ("_blank" == e.record.formtarget ? 'selected="selected"' : "") + ">" + ("RU" == lang ? "Р’ РЅРѕРІРѕРј РѕРєРЅРµ" : "New Window") + "</option>", i += "\t\t\t\t\t</select>", i += "\t\t\t\t</div>"), i += '\t\t\t\t<div class="pe-checkbox-box">', i += '\t\t\t\t<label class="pe-label-checkbox">', i += '\t\t\t\t\t<input type="hidden" name="formajax" value="' + e.record.formajax + '"/>', i += '\t\t\t\t\t<input type="checkbox" name="formajax-cb" ' + ("y" == e.record.formajax ? "checked" : "") + ' class="chbx">', i += "\t\t\t\t\t\t" + ("RU" == lang ? "РїРѕСЃС‹Р»Р°С‚СЊ РґР°РЅРЅС‹Рµ Р±РµР· РїРµСЂРµР·Р°РіСЂСѓР·РєРё СЃС‚СЂР°РЅРёС†С‹ (AJAX)" : "is ajax action script"), i += "\t\t\t\t</label>", i += "\t\t\t\t</div>", i += "\t\t\t</div>", i += "\t\t\t" + (1 != e.record.formactiontype ? "</div>" : ""), i += "\t\t\t<br>", i += "\t\t</div>", i += "\t</div>", t.append(i), $("#formactionbox" + e.record.id).find("input[type=radio]").change(function() {
        $(this).is(":checked") && ($("#" + $(this).data("collapse-id")).show(), 1 == $(this).val() ? ($("#formtype" + e.record.id + "two").hide(), $("#form" + e.record.id).find(".js-formmsgsuccess").addClass("hidden")) : ($("#formtype" + e.record.id + "one").hide(), $("#form" + e.record.id).find(".js-formmsgsuccess").removeClass("hidden")))
    }), t.find("input[name=formajax-cb]").change(function() {
        var e = (e = $(this).is(":checked")) ? "y" : "";
        $("input[name=formajax]").val(e)
    }), $(".pe-label__recievedataforms").dblclick(function() {
        $(".pe-wrapper__ownscriptreciever").css("display", "block"), $(".pe-wrapper__servicesrecievers").css("display", "block")
    })
}

function edrec__settings_showmarginsmob() {
    "block" != $('.pe-form-group[data-tpl-field="margintop_res_480"]').css("display") ? ($('.pe-form-group[data-tpl-field="margintop_res_480"]').css("display", "block"), $('.pe-form-group[data-tpl-field="marginbottom_res_480"]').css("display", "block")) : ($('.pe-form-group[data-tpl-field="margintop_res_480"]').css("display", "none"), $('.pe-form-group[data-tpl-field="marginbottom_res_480"]').css("display", "none"))
}

function edrec__drawUI__split(e, t) {
    var i = $('.pe-form-group[data-tpl-field="' + e + '"]'),
        o = $('.pe-form-group[data-tpl-field="' + t + '"]'),
        e = i.html(),
        t = o.html();
    o.remove();
    o = "";
    o += '<div class="pe-form-group">', o += '<table class="pe-table">', o += "<tr>", o += '<td class="pe-table-col1" valign="bottom">', o += e, o += "</td>", o += '<td class="pe-table-col2" valign="bottom">', o += t, o += "</td>", o += "</tr>", o += "</div>", i.html(o)
}

function edrec__drawUI__podcut(e, t, i) {
    var o, a;
    for (a in t) {
        if ("buttoncolor" == (o = t[a])) {
            var n = ["buttonshadowsize", "buttonshadowopacity", "buttonfontfamily", "buttonfontweight", "buttonuppercase", "buttonbgcolorhover", "buttoncolorhover", "buttonbordercolorhover", "buttonshadowsizehover", "buttonshadowopacityhover", "buttonspeedhover"],
                l = "";
            l += '<div id="pe_showmorebtnsettings" style="display:none;">', l += '<div style="padding-top:10px;margin-top:-30px;margin-bottom:40px;"><a href="javascript:showbtnsetmore();" id="pe_btn_showmorebtnsettings_off" style="padding:10px 0px;">' + ("RU" == lang ? "РЎРІРµСЂРЅСѓС‚СЊ РґРѕРї. РЅР°СЃС‚СЂРѕР№РєРё" : "Minimize options") + "</a></div>", l += "";
            var r = [];
            for (s in n) 0 < (d = i.find('.pe-form-group[data-tpl-field="' + n[s] + '"]')).length && (p = d[0].outerHTML, r.push(n[s]), d.remove(), l += p);
            l += "</div>", l += "</div>", l += "<script>", l += "function showbtnsetmore(){", l += '\t$("#pe_showmorebtnsettings").toggle();', l += '\t$("#pe_btn_showmorebtnsettings").toggle();', l += "}", l += "<\/script>", void 0 === e.tpl.is_email && 0 !== r.length && (l += '<a href="javascript:showbtnsetmore();" id="pe_btn_showmorebtnsettings" style="display:block; padding:10px 0px; margin-top:-30px;margin-bottom:30px;">' + ("RU" == lang ? "Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РЅР°СЃС‚СЂРѕР№РєРё" : "Show more settings") + "</a>"), i.find('.pe-form-group[data-tpl-field="buttonradius"]').after(l), i.find('input[name="buttonuppercase-cb"]').change(function() {
                var e = (e = $(this).is(":checked")) ? "on" : "";
                i.find('input[name="buttonuppercase"]').val(e)
            })
        }
        if ("bbuttoncolor" == o) {
            var s, d, p, n = ["bbuttonshadowsize", "bbuttonshadowopacity", "bbuttonfontfamily", "bbuttonfontweight", "bbuttonuppercase", "bbuttonbgcolorhover", "bbuttoncolorhover", "bbuttonbordercolorhover", "bbuttonshadowsizehover", "bbuttonshadowopacityhover", "bbuttonspeedhover"],
                l = "";
            for (s in l += '<div id="pe_showmorebbtnsettings" style="display:none;">', l += '<div style="padding-top:10px;margin-top:-30px;margin-bottom:40px;"><a href="javascript:showbbtnsetmore();" id="pe_btn_showmorebbtnsettings_off" style="padding:10px 0px;">' + ("RU" == lang ? "РЎРІРµСЂРЅСѓС‚СЊ РґРѕРї. РЅР°СЃС‚СЂРѕР№РєРё" : "Minimize options") + "</a></div>", l += "", n) 0 < (d = i.find('.pe-form-group[data-tpl-field="' + n[s] + '"]')).length && (p = d[0].outerHTML, d.remove(), l += p);
            l += "</div>", l += "</div>", l += "<script>", l += "function showbbtnsetmore(){", l += '\t$("#pe_showmorebbtnsettings").toggle();', l += '\t$("#pe_btn_showmorebbtnsettings").toggle();', l += "}", l += "<\/script>", void 0 === e.tpl.is_email && (l += '<a href="javascript:showbbtnsetmore();" id="pe_btn_showmorebbtnsettings" style="display:block; padding:10px 0px; margin-top:-30px;margin-bottom:30px;">' + ("RU" == lang ? "Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РЅР°СЃС‚СЂРѕР№РєРё" : "Show more settings") + "</a>"), i.find('.pe-form-group[data-tpl-field="bbuttonradius"]').after(l)
        }
    }
}

function edrec__replaces(e, t) {
    var i, o, a, n, l, r, s, d, p, c, u, m;
    for (a in e) void 0 !== (m = e[a]).field && "" != m.field ? (n = m.field, (u = "RU" == lang && void 0 !== m.label_ru && "" != m.label_ru ? m.label_ru : void 0 !== m.label && "" != m.label ? m.label : "").replace(/"/g, "&quot;"), (i = "RU" == lang && void 0 !== m.hint_ru && "" != m.hint_ru ? m.hint_ru : void 0 !== m.hint && "" != m.hint ? m.hint : "").replace(/"/g, "&quot;"), (o = "RU" == lang && void 0 !== m.chb_title_ru && "" != m.chb_title_ru ? m.chb_title_ru : void 0 !== m.chb_title && "" != m.chb_title ? m.chb_title : "").replace(/"/g, "&quot;"), (s = void 0 !== m.inp_placeholder && "" != m.inp_placeholder ? m.inp_placeholder : "").replace(/"/g, "&quot;"), (d = "RU" == lang && void 0 !== m.sb_variants_ru && "" != m.sb_variants_ru ? m.sb_variants_ru : void 0 !== m.sb_variants && "" != m.sb_variants ? m.sb_variants : "").replace(/"/g, "&quot;"), c = t.find("[data-tpl-field=" + n + "]"), "" !== u && c.find(".pe-label").not(".pe-label_no-replace").html(u), "" !== i && (l = c.find(".pe-hint"), " " === i ? l.html("") : l.html(i)), "" !== o && c.find(".pe-checkbox-title").html(o), "" !== s && c.find(".pe-input").attr("placeholder", s), "" != d && (r = d.split(";"), c.find(".pe-select option").each(function(e) {
        $(this).html(r[e])
    })), void 0 !== m.noredactor && "yes" == m.noredactor && ($("[data-tpl-field=" + n + "]").find("[name=" + n + "]").attr("id", "noredactor"), "q" !== window.ver_redactor ? $("[data-tpl-field=" + n + "]").find("[name=" + n + "]").redactor("core.destroy") : ($("[data-tpl-field=" + n + "]").find("[name=" + n + "]").css("display", ""), $("[data-tpl-field=" + n + "]").find("[quill-name=" + n + "] .ql-editor").parent().parent().find(".ql-toolbar").remove(), $("[data-tpl-field=" + n + "]").find("[quill-name=" + n + "] .ql-editor").parent().remove()), $("[data-tpl-field=" + n + "]").find("[name=" + n + "]").closest(".pe-redactor").addClass("pe-noredactor")), void 0 !== m.fieldheight && "" != m.fieldheight && $("[data-tpl-field=" + n + "]").find("[name=" + n + "]").css("height", m.fieldheight), void 0 !== m.noresize && "yes" == m.noresize && ((s = $("[data-tpl-field=" + n + "]").find("[name=" + n + "]")).css("height", "22px"), s.css("resize", "none"), s.css("padding-left", 0), s.css("border", 0), s.css("border-bottom", "1px solid #b5b5b5")), void 0 !== m.redactor_nohref && "yes" === m.redactor_nohref && ($("[data-tpl-field=" + n + "]").find(".re-link").css("display", "none"), $("[data-tpl-field=" + n + "]").find(".ql-link_custom").css("display", "none")), void 0 !== m.redactor_notoolbar && "yes" === m.redactor_notoolbar && $("[data-tpl-field=" + n + "]").find(".ql-toolbar").remove(), void 0 !== m.menuitems_nolinktarget && "yes" == m.menuitems_nolinktarget && $("[data-tpl-field=" + n + "]").find(".pe-menuitems__linktarget").css("display", "none"), void 0 === m.sb_variants && void 0 === m.sb_variants_ru || (d = "", "RU" == lang && void 0 !== m.sb_variants_ru && "" != m.sb_variants_ru ? d = m.sb_variants_ru : void 0 !== m.sb_variants && "" != m.sb_variants && (d = m.sb_variants), void 0 !== d && "" != d && (d.replace(/"/g, "&quot;"), p = d.split(";"), c = c.find(".pe-select"), "object" == typeof p && p.length && c.length && c.find("option").each(function(e) {
        void 0 !== p[e] && "" != p[e] && $(this).text(p[e])
    })))) : void 0 !== m.group && "" != m.group && ((u = "RU" == lang && void 0 !== m.label_ru && "" != m.label_ru ? m.label_ru : void 0 !== m.label && "" != m.label ? m.label : "").replace(/"/g, "&quot;"), t.find("#grouptitle_" + m.group).find(".tsgrouptitle").html(u)), void 0 !== m.action && "adddata" == m.action && void 0 !== m.selector && "" != m.selector && void 0 !== m.key && "" != m.key && (m.key.replace(/"/g, "&quot;"), m.value.replace(/"/g, "&quot;"), t.find(m.selector).attr("data-" + m.key, m.value))
}

function edrec__content__init(e) {
    edrec__initRedactor(e), setTimeout(function() {
        $(".editrecordcontent_container").find(".pe-hint").each(function() {
            "" == $(this).html() && $(this).css("padding", "0px")
        })
    }, 50), setTimeout(function() {
        $('[data-need-check-link="yes"]').change(function() {
            var e = $(this).val();
            checkLinkCCtoWS(e)
        }), $(".pe-form-group", e).each(function() {
            0 == $(this).children().length && $(this).remove()
        }), e.find("input[type=text]").each(function() {
            var e = $(this).val();
            e && 0 < e.length && (e = e.replace(new RegExp("&amp;", "g"), "&"), $(this).val(e))
        });
        try {
            $(".pe-tooltip").each(function() {
                $(this).tooltipster({
                    theme: "pe-tooltip__tooltipster-noir",
                    contentAsHTML: !0,
                    content: $(this).attr("data-tooltip"),
                    interactive: !0,
                    position: "top"
                })
            })
        } catch (e) {
            console.log("err")
        }
    }, 500)
}

function edrec__copyproducts_to_catalog(e, t, i) {
    showLoadIcon();
    var o = Date.now();
    $.ajax({
        type: "POST",
        url: "/page/submit/",
        data: {
            comm: "copyproducts_to_catalog",
            pageid: e,
            recordid: t
        },
        dataType: "text",
        success: function(e) {
            var t;
            check_logout(e), "" != e && "ok:" == e.substring(0, 3) ? (k = e.substr(3), t = "RU" == lang ? "РўРѕРІР°СЂС‹ СѓСЃРїРµС€РЅРѕ СЃРєРѕРїРёСЂРѕРІР°РЅС‹. Р”РѕР±Р°РІР»РµРЅРѕ РїСЂРѕРґСѓРєС‚РѕРІ: " + k + '. РџРµСЂРµР№РґРёС‚Рµ РІ <a href="/identity/gostore/?projectid=' + window.projectid + '" target="_blank" style="color:inherit;">РєР°С‚Р°Р»РѕРі</a> Рё РїСЂРѕРІРµСЂСЊС‚Рµ СЂРµР·СѓР»СЊС‚Р°С‚ РІС‹РїРѕР»РЅРµРЅРёСЏ. РЎР°РјРё С‚РѕРІР°СЂС‹ РёР· СЌС‚РѕРіРѕ Р±Р»РѕРєР° РІС‹ РјРѕР¶РµС‚Рµ СѓРґР°Р»РёС‚СЊ РІСЂСѓС‡РЅСѓСЋ.' : "Adding was successful. Added products: " + k + '. Go to the <a href="/identity/gostore/?projectid=' + window.projectid + '" target="_blank" style="color:inherit;">catalog</a> and check the result. You can delete products from this block manually.', t += "<br><br>&#9758; " + ("RU" == lang ? 'РўРµРєСЃС‚ РєРЅРѕРїРєРё РґР»СЏ С‚РѕРІР°СЂРѕРІ РёР· РєР°С‚Р°Р»РѕРіР° РІС‹ РјРѕР¶РµС‚Рµ РЅР°СЃС‚СЂРѕРёС‚СЊ РІРѕ РІРєР»Р°РґРєРµ "Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕ"' : 'Go to "More" tab to define buttons for all products.'), $(".link_copyproductstocatalog_result").html('<br><span style="color:green;">' + t + "</span>"), $(".link_copyproductstocatalog").remove()) : alert(e)
        },
        error: function(e) {
            var t = Date.now() - o;
            0 == e.status && t < 100 ? alert("Request error (export products to catalog). Please check your Internet connection and try again.") : alert("Request timeout (export products to catalog)")
        },
        complete: function(e) {
            hideLoadIcon()
        },
        timeout: 6e4
    })
}

function edrec__addslashes(e) {
    return "string" == typeof e && "" != e && 0 < e.length && "undefined" == (e = e.replace(new RegExp('"', "g"), "&quot;")) && (e = ""), e
}

function edrec__collapsegroup(e) {
    var t = $("#group_" + e);
    "none" == t.css("display") ? (t.slideDown("slow"), t.parent().find("#grouptitle_" + e).find(".glyphicon").removeClass("glyphicon-circle-arrow-right").addClass("glyphicon-circle-arrow-down")) : (t.slideUp("slow"), t.parent().find("#grouptitle_" + e).find(".glyphicon").removeClass("glyphicon-circle-arrow-down").addClass("glyphicon-circle-arrow-right"))
}

function edrec__opengroupitems(e, t, i) {
    var o, a, n = $("#group_" + t);
    640 < $(window).width() ? 0 != n.parents("#editforms").length && (edrec__calculateGroupCoordAndHeight(n, i), edrec__createCoordAndHeightObj(n), i = window.group_height_coord[n.attr("id")], o = void 0 !== i ? i.top : 0, a = void 0 !== i ? i.height : 0, edrec__openButtonExtendedSettings(), n.find(".minicolors").on("click", function() {
        $(this).hasClass("minicolors-focus") && edrec__scrollWithMinicolors($(this), a)
    }), edrec__showSettingsGroup(e, n, t), $(".edrec__wrapper").on("click", function(e) {
        edrec__closeMinicolors(e, n, o, a)
    })) : n.hasClass("pe-form-group-wrapper_open") ? n.slideUp("slow", function() {
        n.siblings("#grouptitle_" + t).removeClass("pe-form-group-title-wrapper_open"), n.removeClass("pe-form-group-wrapper_open"), n.parent().find("#grouptitle_" + t).find(".pe-form-group-arrow").removeClass("pe-form-group-arrow_open"), edrec__removeOpenGroup(n, t)
    }) : (n.slideDown("slow"), n.siblings("#grouptitle_" + t).addClass("pe-form-group-title-wrapper_open"), n.addClass("pe-form-group-wrapper_open"), n.parent().find("#grouptitle_" + t).find(".pe-form-group-arrow").addClass("pe-form-group-arrow_open"))
}

function edrec__createCoordAndHeightObj(e) {
    void 0 === window.group_height_coord[e.attr("id")] && (window.group_height_coord[e.attr("id")] = {
        height: e.outerHeight(),
        top: parseInt(e.css("top"))
    }), void 0 !== window.group_height_coord && (window.group_height_coord[e.attr("id")].top = parseInt(e.css("top")))
}

function edrec__closeMinicolors(e, t, i, o) {
    var a = $(e.target),
        n = !a.hasClass("minicolors-focus") && !a.parents().hasClass("minicolors-focus"),
        l = !a.hasClass("pe-form-group-wrapper_showbtnsettings") && !a.parents().hasClass("pe-form-group-wrapper_showbtnsettings"),
        e = "pe_btn_showmorebtnsettings" != a.attr("id") && "pe_btn_showmorebtnsettings_off" != a.attr("id"),
        a = "pe_btn_showmorebbtnsettings" != a.attr("id") && "pe_btn_showmorebbtnsettings_off" != a.attr("id");
    n && e && a && l && (t.css("top", i), t.css("height", o))
}

function edrec__scrollWithMinicolors(e, t) {
    var i = $(".pe-form-group-wrapper_open"),
        o = $(window).height(),
        a = e.parents(".pe-form-group[data-tpl-field]"),
        e = a.position().top + a.outerHeight(!0) + e.find(".minicolors-panel").height();
    o < e && i.scrollTop(i.scrollTop() + (e - o)), t < e && e < o && !i.hasClass("pe-form-group-wrapper_showbtnsettings") && (i.css("top", parseInt(i.css("top")) - (e - i.outerHeight())), i.css("height", parseInt(i.css("height")) + (e - i.outerHeight())))
}

function edrec__showSettingsGroup(e, t, i) {
    t.hasClass("pe-form-group-wrapper_open") ? edrec__closegroupitems() : (edrec__closegroupitems(), e.addClass("pe-form-group-title-wrapper_open"), t.addClass("pe-form-group-wrapper_open"), t.parent().find("#grouptitle_" + i).find(".pe-form-group-arrow").addClass("pe-form-group-arrow_open"))
}

function edrec__calculateGroupCoordAndHeight(e, t) {
    var i, o = $(window).height(),
        a = window.group_height_coord[e.attr("id")],
        n = void 0 !== a ? a.newHeight : 0,
        l = e.outerHeight();
    void 0 !== a && void 0 !== n && 0 < n && (l = n), e.outerHeight() > o - 30 ? e.css({
        top: 15,
        height: o - 15
    }) : (e.css({
        top: t - 20,
        height: l
    }), o < (i = parseInt(e.css("top")) + l) && (o = i - o, e.css("top", t - 20 - o - 15)))
}

function edrec__openButtonExtendedSettings() {
    $("#pe_btn_showmorebtnsettings").on("click", function() {
        edrec__onShowBtnSettings($(this), 15)
    }), $("#pe_btn_showmorebbtnsettings").on("click", function() {
        edrec__onShowBtnSettings($(this), 15)
    }), $("#pe_btn_showmorebtnsettings_off").on("click", function() {
        edrec__onHideBtnSettings($(this), 15)
    }), $("#pe_btn_showmorebbtnsettings_off").on("click", function() {
        edrec__onHideBtnSettings($(this), 15)
    })
}

function edrec__onShowBtnSettings(e, t) {
    e = e.parents(".pe-form-group-wrapper");
    e.css({
        top: t,
        height: $(window).height() - t
    }), e.addClass("pe-form-group-wrapper_showbtnsettings"), void 0 !== window.group_height_coord[e.attr("id")] && (window.group_height_coord[e.attr("id")].newTop = parseInt(e.css("top")), window.group_height_coord[e.attr("id")].newHeight = parseInt(e.css("height")))
}

function edrec__onHideBtnSettings(e, t) {
    var i = e.parents(".pe-form-group-wrapper"),
        o = window.group_height_coord[i.attr("id")],
        a = i.attr("id").split("_")[1],
        e = $('.pe-form-group-title-wrapper_open[data-tpl-group="' + a + '"]'),
        a = e.position().top + parseInt(e.css("margin-top")) - 20,
        e = void 0 !== o ? o.height : 0,
        o = a + e;
    o > $(window).height() && (a = a - 20 - (o - $(window).height()) - t), i.css({
        top: a,
        height: e
    }), i.removeClass("pe-form-group-wrapper_showbtnsettings"), void 0 !== window.group_height_coord[i.attr("id")] && (window.group_height_coord[i.attr("id")].newTop = 0, window.group_height_coord[i.attr("id")].newHeight = 0)
}

function edrec__closegroupitems() {
    $(".pe-form-group-title-wrapper").removeClass("pe-form-group-title-wrapper_open"), $(".pe-form-group-wrapper").removeClass("pe-form-group-wrapper_open"), $(".pe-form-group-arrow").removeClass("pe-form-group-arrow_open")
}

function edrec__collapsecontentgroups(e) {
    var t = $("#group_" + e);
    t.hasClass("pe-form-group-wrapper_open") ? t.slideUp("slow", function() {
        t.siblings("#grouptitle_" + e).removeClass("pe-form-group-title-wrapper_open"), t.removeClass("pe-form-group-wrapper_open"), t.parent().find("#grouptitle_" + e).find(".pe-form-group-arrow").removeClass("pe-form-group-arrow_open"), edrec__removeOpenGroup(t, e)
    }) : (t.slideDown("slow"), t.siblings("#grouptitle_" + e).addClass("pe-form-group-title-wrapper_open"), t.addClass("pe-form-group-wrapper_open"), t.parent().find("#grouptitle_" + e).find(".pe-form-group-arrow").addClass("pe-form-group-arrow_open"), edrec__saveOpenGroup(t))
}

function edrec__removeOpenGroup(e, t) {
    var i = e.parents(".pe-content-form").attr("data-rec-id"),
        o = [];
    void 0 !== window.contenttab_scroll_obj && void 0 !== window.contenttab_scroll_obj[i] && (o = window.contenttab_scroll_obj[i].groupOpen), void 0 !== o && 0 < o.length && (t = o.indexOf(e.siblings("#grouptitle_" + t).attr("data-tpl-group")), o.splice(t, 1))
}

function edrec__drawUI__cssclassname(e, t) {
    void 0 === e.record.cssclassname && (e.record.cssclassname = "");
    e = '<div class="pe-cssclassname-wrapper"><div class="pe-cssclassname-showlink" style="font-size:11px; color:#777; padding-top:30px; cursor:pointer; ' + ("" !== e.record.cssclassname ? "display:none;" : "") + '">{{add_class_name}}</div><div class="pe-form-group" data-tpl-field="cssclassname" style="' + ("" === e.record.cssclassname ? "display:none;" : "") + '"><label class="pe-label">BLOCK CSS CLASS NAME</label><input type="text" name="cssclassname" class="pe-input" placeholder="uc-classname" value="' + ("" !== e.record.cssclassname ? e.record.cssclassname : "") + '"><div class="pe-hint">{{name_must_begin_with_uc}}</div></div></div>', e = tc__translate(e, "edrec__dict");
    t.append(e), $('.pe-input[name="cssclassname"]').focusout(function() {
        var e = $(this).val();
        "" != e && ("uc-" !== (e = e.replace(/[^a-zA-Z0-9-_]+/g, "")).substring(0, 3) && (e = "uc-" + e), "uc-" == e && (e = ""), $(this).val(e))
    }), $("#editforms .pe-cssclassname-showlink").click(function() {
        $("#editforms .pe-cssclassname-wrapper .pe-cssclassname-showlink").css("display", "none"), $("#editforms .pe-cssclassname-wrapper .pe-form-group").css("display", "block")
    })
}

function edrec__drawUI__addtofishes(e, t) {
    var i = "";
    i += '<div class="pe-addtofishes-wrapper">', i += '<div class="pe-addtofishes-showlink" style="font-size:11px; color:#777; padding-top:8px; cursor:pointer;" onclick="edrec__addToFishes__showDialog(\'' + e.record.id + "')\">{{add_block_to_lib}}</div>", i += '<div class="pe-addtofishes-dialog" data-tpl-field="isfish" style="display:none;"></div>', i += "</div>", i += "</div>", i = tc__translate(i, "edrec__dict"), t.append(i), "object" == typeof window.fishes && "object" == typeof window.fishes[0] && setTimeout(function() {
        $('.tp-library .tp-library__tpl-body[data-fish-recordid="' + e.record.id + '"]').not('[data-fish-intrash="y"]').length && edrec__addToFishes__showDialog(e.record.id)
    }, 2e3)
}

function edrec__addToFishes__showDialog(e) {
    var t = $("#editforms .pe-addtofishes-wrapper");
    t.find(".pe-addtofishes-showlink").css("display", "none");
    var i = "";
    i += '<div style="font-size:14px; color:#777; padding-top:25px;">', i += '<label class="pe-label">{{my_blocks}}</label>', i += '<div style="font-size:13px;margin-top:10px;">', i += "{{new_category_will_appear_in_lib}}", i += "</div>", $('.tp-library .tp-library__tpl-body[data-fish-recordid="' + e + '"]').not('[data-fish-intrash="y"]').length ? i += '<a href="javascript:edrec__addToFishes__update(' + e + ');" style="margin-top:10px; display:block; height:50px; width:200px; line-height:50px; padding:0 20px; background-color:#ff855d; color:#fff;cursor: pointer;">{{update_block_in_lib}}</a>' : (i += '<div class=""><input type="text" name="fish_title" class="pe-input" placeholder="{{block_title}}" value=""></div>', i += '<a href="javascript:edrec__addToFishes__add(' + e + ');" style="margin-top:10px; display:block; height:50px; width:200px; line-height:50px; padding:0 20px; background-color:#000; color:#fff;cursor: pointer;">{{add_block_to_lib_v2}}</a>'), i += '<a href="javascript:edrec__addToFishes__cancel();" style="margin-top:5px; display:block; height:50px; width:200px; line-height:50px; padding:0 20px; outline:1px solid rgba(0,0,0,0.1);cursor: pointer;">{{cancel}}</a>', i += "</div>", i = tc__translate(i, "edrec__dict"), t.find(".pe-addtofishes-dialog").html(i), t.find(".pe-addtofishes-dialog").css("display", "block")
}

function edrec__addToFishes__add(e) {
    var t = $('#editforms .pe-addtofishes-dialog .pe-input[name="fish_title"]').val();
    tp__library__addFish(e, t), edrec__closeEditForm()
}

function edrec__addToFishes__update(e) {
    tp__library__updateFishRecordData(e), edrec__closeEditForm()
}

function edrec__addToFishes__cancel() {
    $("#editforms .pe-addtofishes-dialog").html(""), $("#editforms .pe-addtofishes-showlink").css("display", "block")
}

function edrec__drawUI__blockid(e, t) {
    e = '<div class="pe-blockid__wrapper"><input class="pe-blockid__input-title" disabled="disabled" value="Block id: " style="width:40px; pointer-events:none;"><input class="pe-blockid__input-value" readonly="readonly" value="#rec' + e.record.id + '" style="width:80px;"><span class="pe-blockid__copytobuf" style=""><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 28"><g stroke="#000"><path d="M8 2.457H2v24.21h21.25v-4.561M17.326 2.457h5.924v8.877" stroke-width="2"/><path d="M17.27 10l-6.52 6.314 6.52 6.259" stroke-width="2"/><g stroke-width="2"><path d="M10.75 16.156H32"/><rect height="3.614" rx="1.807" width="8.435" x="8.218" y="1"/></g></g></svg></span></div><br><br><br>';
    t.append(e), $("#editforms .pe-blockid__input-value").focusin(function() {
        $(this).select()
    }), $("#editforms .pe-blockid__copytobuf").click(function() {
        var e = $(this).parent().find(".pe-blockid__input-value");
        e.focus(), e.select();
        try {
            1 == document.execCommand("copy") && td__showBubbleNotice(tc__translate("{{block_id_copied}}", "edrec__dict"))
        } catch (e) {
            console.error("Fallback: Oops, unable to copy", e), td__showBubbleNotice(tc__translate("{{browser_not_support_copying}}", "edrec__dict"))
        }
        e.blur(), window.getSelection && window.getSelection().removeAllRanges()
    })
}

function edrec__showSaveConfirmDialog(e, t, i) {
    var o, a, n;
    $("body").find("#save-confirm-dialog").length || (e = '<div id="save-confirm-dialog" class="pe-confirm-dialog"><div class="pe-confirm-dialog__wrapper"><div class="pe-confirm-dialog__window"><div class="pe-confirm-dialog__head"><div class="pe-confirm-dialog__title">' + (e = e || "{{user_has_unsaved_changes_title}}") + '</div><div class="pe-confirm-dialog__msg">' + (t = t || "{{user_has_unsaved_changes_msg}}") + '</div></div><div class="pe-confirm-dialog__footer"><div class="pe-confirm-dialog__buttons"><input type="button" value="{{go_back}}" class="pe-confirm-dialog__btn pe-confirm-dialog__btn_white js-ps-popup-on" tabindex="1"><input type="button" value="{{exit_without_saving}}" class="pe-confirm-dialog__btn js-ps-popup-yes" tabindex="0"></div></div></div></div></div>', e = tc__translate(e, "edrec__dict"), $("body").append(e), t = (o = $("body").find("#save-confirm-dialog")).find(".js-ps-popup-on"), e = o.find(".js-ps-popup-yes"), $("body").addClass("td-body_popup-opened"), $("body").addClass("t-body_popupshowed"), o.addClass("td-popup_opened"), o.fadeIn("fast"), e.focus(), a = function() {
        $("body").removeClass("td-body_popup-opened"), $("body").removeClass("t-body_popupshowed"), o.remove()
    }, n = function(e) {
        27 == e.keyCode && ($(document).off("keyup", n), a())
    }, $(document).on("keyup", n), t.click(a), e.click(function() {
        a(), "function" == typeof i && i()
    }))
}

function edrec__drawUI__getFieldObj(e) {
    var t = {};
    return "|gc|" == e ? t = {
        type: "gr",
        groupid: "close"
    } : "|g0|" == e ? t = {
        type: "gr",
        groupid: "mainstyle",
        label: {
            RU: "РћСЃРЅРѕРІРЅС‹Рµ РЅР°СЃС‚СЂРѕР№РєРё",
            EN: "Main settings"
        }
    } : "|g1|" == e ? t = {
        type: "gr",
        groupid: "menuitemsstyle",
        label: {
            RU: "РџСѓРЅРєС‚С‹ РјРµРЅСЋ",
            EN: "Menu items"
        }
    } : "|g2|" == e ? t = {
        type: "gr",
        groupid: "titlestyle",
        label: {
            RU: "РЎС‚РёР»СЊ Р·Р°РіРѕР»РѕРІРєР°",
            EN: "Title style"
        }
    } : "|g3|" == e ? t = {
        type: "gr",
        groupid: "descrstyle",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ",
            EN: "Description"
        }
    } : "|g4|" == e ? t = {
        type: "gr",
        groupid: "buttonstyle",
        label: {
            RU: "РљРЅРѕРїРєРё",
            EN: "Buttons"
        }
    } : "|g5|" == e ? t = {
        type: "gr",
        groupid: "menubgstyle",
        label: {
            RU: "Р¤РѕРЅ РјРµРЅСЋ",
            EN: "Menu background"
        }
    } : "|g6|" == e ? t = {
        type: "gr",
        groupid: "logostyle",
        label: {
            RU: "Р›РѕРіРѕС‚РёРї",
            EN: "Logo"
        }
    } : "|g7|" == e ? t = {
        type: "gr",
        groupid: "parttitlestyle",
        label: {
            RU: "РЎС‚РёР»СЊ Р·Р°РіРѕР»РѕРІРєР° СЂР°Р·РґРµР»Р°",
            EN: "Section title style"
        }
    } : "|g8|" == e ? t = {
        type: "gr",
        groupid: "morestyle",
        label: {
            RU: "Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РЅР°СЃС‚СЂРѕР№РєРё",
            EN: "More settings"
        }
    } : "|g9|" == e ? t = {
        type: "gr",
        groupid: "menuicon",
        label: {
            RU: "РРєРѕРЅРєР° РјРµРЅСЋ",
            EN: "Menu icon"
        }
    } : "|g10|" == e ? t = {
        type: "gr",
        groupid: "popupstyle",
        label: {
            RU: "Pop-up",
            EN: "Pop-up"
        }
    } : "|g11|" == e ? t = {
        type: "gr",
        groupid: "gallerystyle",
        label: {
            RU: "РЎС‚РёР»СЊ РіР°Р»РµСЂРµРё",
            EN: "Gallery style"
        }
    } : "|g12|" == e ? t = {
        type: "gr",
        groupid: "typography",
        label: {
            RU: "РўРёРїРѕРіСЂР°С„РёРєР°",
            EN: "Typography"
        }
    } : "|g13|" == e ? t = {
        type: "gr",
        groupid: "group13",
        label: {
            RU: "group13",
            EN: "group13"
        }
    } : "|g14|" == e ? t = {
        type: "gr",
        groupid: "group14",
        label: {
            RU: "group14",
            EN: "group14"
        }
    } : "|g15|" == e ? t = {
        type: "gr",
        groupid: "group15",
        label: {
            RU: "group15",
            EN: "group15"
        }
    } : "|g16|" == e ? t = {
        type: "gr",
        groupid: "bgvideo",
        label: {
            RU: "Р¤РѕРЅРѕРІРѕРµ РІРёРґРµРѕ",
            EN: "Background video"
        }
    } : "|g17|" == e ? t = {
        type: "gr",
        groupid: "btypo",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє Р±Р»РѕРєР°",
            EN: "Block title"
        }
    } : "|g18|" == e ? t = {
        type: "gr",
        groupid: "group18",
        label: {
            RU: "group18",
            EN: "group18"
        }
    } : "|g19|" == e ? t = {
        type: "gr",
        groupid: "cards",
        label: {
            RU: "РљР°СЂС‚РѕС‡РєРё",
            EN: "Cards"
        }
    } : "|g20|" == e ? t = {
        type: "gr",
        groupid: "form",
        label: {
            RU: "РЎС‚РёР»СЊ РїРѕР»РµР№ РґР»СЏ РІРІРѕРґР°",
            EN: "Form input style"
        }
    } : "|g21|" == e ? t = {
        type: "gr",
        groupid: "anim",
        label: {
            RU: "РђРЅРёРјР°С†РёСЏ",
            EN: "Animation"
        }
    } : "margintop" == e ? t = {
        type: "sb",
        label: {
            RU: "РћС‚СЃС‚СѓРї СЃРІРµСЂС…Сѓ",
            EN: "Top Padding"
        },
        options: [{
            v: "",
            RU: "РќРµ Р·Р°РґР°РЅ",
            EN: "None"
        }, {
            v: "0px",
            EN: "0"
        }, {
            v: "15px",
            EN: "0.5 line (15px)"
        }, {
            v: "30px",
            EN: "1 line (30px)"
        }, {
            v: "45px",
            EN: "1.5 line (45px)"
        }, {
            v: "60px",
            EN: "2 line (60px)"
        }, {
            v: "75px",
            EN: "2.5 line (75px)"
        }, {
            v: "90px",
            EN: "3 line (90px)"
        }, {
            v: "105px",
            EN: "3.5 line (105px)"
        }, {
            v: "120px",
            EN: "4 line (120px)"
        }, {
            v: "135px",
            EN: "4.5 line (135px)"
        }, {
            v: "150px",
            EN: "5 line (150px)"
        }, {
            v: "165px",
            EN: "5.5 line (165px)"
        }, {
            v: "180px",
            EN: "6 line (180px)"
        }, {
            v: "195px",
            EN: "6.5 line (195px)"
        }, {
            v: "210px",
            EN: "7 line (210px)"
        }]
    } : "margintop_res_480" == e ? t = {
        type: "sb",
        label: {
            RU: "РњРѕР±.РѕС‚. СЃРІРµСЂС…Сѓ",
            EN: "Mob. Top Padd."
        },
        display: "none",
        options: [{
            v: "",
            RU: "РќРµ Р·Р°РґР°РЅ",
            EN: "None"
        }, {
            v: "0px",
            EN: "0"
        }, {
            v: "15px",
            EN: "0.5 line (15px)"
        }, {
            v: "30px",
            EN: "1 line (30px)"
        }, {
            v: "45px",
            EN: "1.5 line (45px)"
        }, {
            v: "60px",
            EN: "2 line (60px)"
        }, {
            v: "75px",
            EN: "2.5 line (75px)"
        }, {
            v: "90px",
            EN: "3 line (90px)"
        }, {
            v: "105px",
            EN: "3.5 line (105px)"
        }, {
            v: "120px",
            EN: "4 line (120px)"
        }, {
            v: "135px",
            EN: "4.5 line (135px)"
        }, {
            v: "150px",
            EN: "5 line (150px)"
        }, {
            v: "165px",
            EN: "5.5 line (165px)"
        }, {
            v: "180px",
            EN: "6 line (180px)"
        }, {
            v: "195px",
            EN: "6.5 line (195px)"
        }, {
            v: "210px",
            EN: "7 line (210px)"
        }]
    } : "marginbottom" == e ? t = {
        type: "sb",
        label: {
            RU: "РћС‚СЃС‚СѓРї СЃРЅРёР·Сѓ",
            EN: "Bottom Padding"
        },
        split: "margintop",
        options: [{
            v: "",
            RU: "РќРµ Р·Р°РґР°РЅ",
            EN: "None"
        }, {
            v: "0px",
            EN: "0"
        }, {
            v: "15px",
            EN: "0.5 line (15px)"
        }, {
            v: "30px",
            EN: "1 line (30px)"
        }, {
            v: "45px",
            EN: "1.5 line (45px)"
        }, {
            v: "60px",
            EN: "2 line (60px)"
        }, {
            v: "75px",
            EN: "2.5 line (75px)"
        }, {
            v: "90px",
            EN: "3 line (90px)"
        }, {
            v: "105px",
            EN: "3.5 line (105px)"
        }, {
            v: "120px",
            EN: "4 line (120px)"
        }, {
            v: "135px",
            EN: "4.5 line (135px)"
        }, {
            v: "150px",
            EN: "5 line (150px)"
        }, {
            v: "165px",
            EN: "5.5 line (165px)"
        }, {
            v: "180px",
            EN: "6 line (180px)"
        }, {
            v: "195px",
            EN: "6.5 line (195px)"
        }, {
            v: "210px",
            EN: "7 line (210px)"
        }]
    } : "marginbottom_res_480" == e ? t = {
        type: "sb",
        label: {
            RU: "РњРѕР±.РѕС‚СЃС‚СѓРї СЃРЅРёР·Сѓ",
            EN: "Mob. Bottom Padd."
        },
        display: "none",
        split: "margintop_res_480",
        options: [{
            v: "",
            RU: "РќРµ Р·Р°РґР°РЅ",
            EN: "None"
        }, {
            v: "0px",
            EN: "0"
        }, {
            v: "15px",
            EN: "0.5 line (15px)"
        }, {
            v: "30px",
            EN: "1 line (30px)"
        }, {
            v: "45px",
            EN: "1.5 line (45px)"
        }, {
            v: "60px",
            EN: "2 line (60px)"
        }, {
            v: "75px",
            EN: "2.5 line (75px)"
        }, {
            v: "90px",
            EN: "3 line (90px)"
        }, {
            v: "105px",
            EN: "3.5 line (105px)"
        }, {
            v: "120px",
            EN: "4 line (120px)"
        }, {
            v: "135px",
            EN: "4.5 line (135px)"
        }, {
            v: "150px",
            EN: "5 line (150px)"
        }, {
            v: "165px",
            EN: "5.5 line (165px)"
        }, {
            v: "180px",
            EN: "6 line (180px)"
        }, {
            v: "195px",
            EN: "6.5 line (195px)"
        }, {
            v: "210px",
            EN: "7 line (210px)"
        }]
    } : "blockbackground" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР° РґР»СЏ РІСЃРµРіРѕ Р±Р»РѕРєР°",
            EN: "Block background color"
        },
        ph: "#ffffff"
    } : "makefish" == e || "makezerofish" == e ? t = {
        type: "spec"
    } : "columns" == e ? t = {
        type: "sb",
        label: {
            RU: "РЁРёСЂРёРЅР° Р±Р»РѕРєР°",
            EN: "Block Width"
        },
        options: [{
            v: "12",
            RU: "12 РєРѕР»РѕРЅРѕРє",
            EN: "12 columns"
        }, {
            v: "11",
            RU: "11 РєРѕР»РѕРЅРѕРє",
            EN: "11 columns"
        }, {
            v: "10",
            RU: "10 РєРѕР»РѕРЅРѕРє",
            EN: "10 columns"
        }, {
            v: "9",
            RU: "9 РєРѕР»РѕРЅРѕРє",
            EN: "9 columns"
        }, {
            v: "8",
            RU: "8 РєРѕР»РѕРЅРѕРє",
            EN: "8 columns"
        }, {
            v: "7",
            RU: "7 РєРѕР»РѕРЅРѕРє",
            EN: "7 columns"
        }, {
            v: "6",
            RU: "6 РєРѕР»РѕРЅРѕРє",
            EN: "6 columns"
        }, {
            v: "5",
            RU: "5 РєРѕР»РѕРЅРѕРє",
            EN: "5 columns"
        }, {
            v: "4",
            RU: "4 РєРѕР»РѕРЅРєРё",
            EN: "4 columns"
        }, {
            v: "3",
            RU: "3 РєРѕР»РѕРЅРєРё",
            EN: "3 columns"
        }, {
            v: "2",
            RU: "2 РєРѕР»РѕРЅРєРё",
            EN: "2 columns"
        }, {
            v: "1",
            RU: "1 РєРѕР»РѕРЅРєР°",
            EN: "1 column"
        }],
        uphint: {
            RU: 'Р’ РўРёР»СЊРґРµ РёСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ <a href="javascript:showguides();">12-РєРѕР»РѕРЅРѕС‡РЅР°СЏ СЃРµС‚РєР°</a>. Р—Р°РґР°Р№С‚Рµ С€РёСЂРёРЅСѓ Рё Р»РµРІС‹Р№ РѕС‚СЃС‚СѓРї РїРѕ СЃРµС‚РєРµ РІ РЅР°СЃС‚СЂРѕР№РєР°С… РЅРёР¶Рµ.<br>',
            EN: 'On Tilda, <a href="javascript:showguides();">a 12-column grid</a> is used. Change the width and left position offset on the grid in the settings below.<br>'
        }
    } : "animationoff" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р’С‹РєР»СЋС‡РёС‚СЊ СЌС„С„РµРєС‚ РїРѕСЏРІР»РµРЅРёСЏ РїСЂРё СЃРєСЂРѕР»Р»Рµ",
            EN: "Without scroll reveal effect"
        }
    } : "screenmax" == e ? t = {
        type: "screen",
        label: {
            RU: "Р”РёР°РїР°Р·РѕРЅ РІРёРґРёРјРѕСЃС‚Рё РЅР° СѓСЃС‚СЂРѕР№СЃС‚РІР°С…",
            EN: "Block visibility on devices"
        }
    } : "screenmin" == e ? t = {
        type: "screen"
    } : "anim_title" == e || "anim_descr" == e || "anim_uptitle" == e || "anim_subtitle" == e || "anim_text" == e || "anim_img" == e || "anim_bgimg" == e || "anim_btn" == e || "anim_f||m" == e || "anim_items" == e || "anim_btitle" == e || "anim_bdescr" == e || "anim_btext" == e || "anim_bbtn" == e || "anim_el" == e || "anim_el2" == e ? (t = {
        type: "sb",
        label: {
            RU: "РђРЅРёРјР°С†РёСЏ: " + e,
            EN: "Animation: " + e
        },
        options: [{
            v: "",
            RU: "РќРµС‚",
            EN: "None"
        }, {
            v: "fadein",
            RU: "РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Fade In"
        }, {
            v: "fadeinup",
            RU: "РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ (СЃРЅРёР·Сѓ)",
            EN: "Fade In Up"
        }, {
            v: "fadeindown",
            RU: "РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ (СЃРІРµСЂС…Сѓ)",
            EN: "Fade In Down"
        }, {
            v: "fadeinleft",
            RU: "РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ (СЃРїСЂР°РІР°)",
            EN: "Fade In Left"
        }, {
            v: "fadeinright",
            RU: "РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ (СЃР»РµРІР°)",
            EN: "Fade In Right"
        }, {
            v: "zoomin",
            RU: "РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ (СѓРІРµР»РёС‡РµРЅРёРµ)",
            EN: "Zoom In"
        }]
    }, "anim_title" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: Р—Р°РіРѕР»РѕРІРѕРє",
        EN: "Animation: Title"
    }), "anim_descr" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: РћРїРёСЃР°РЅРёРµ",
        EN: "Animation: Description"
    }), "anim_uptitle" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: РќР°РґР·Р°РіРѕР»РѕРІРѕРє",
        EN: "Animation: Upper title"
    }), "anim_subtitle" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: РџРѕРґР·Р°РіРѕР»РѕРІРѕРє",
        EN: "Animation: Subtitle"
    }), "anim_text" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: РўРµРєСЃС‚",
        EN: "Animation: Text"
    }), "anim_img" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: РљР°СЂС‚РёРЅРєР°",
        EN: "Animation: Image"
    }), "anim_bgimg" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: Р¤РѕРЅРѕРІР°СЏ РєР°СЂС‚РёРЅРєР°",
        EN: "Animation: Background image"
    }), "anim_btn" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: РљРЅРѕРїРєР°",
        EN: "Animation: Button"
    }), "anim_form" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: Р¤РѕСЂРјР°",
        EN: "Animation: Form"
    }), "anim_items" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: Р­Р»РµРјРµРЅС‚С‹",
        EN: "Animation: Items"
    }), "anim_btitle" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: Р—Р°РіРѕР»РѕРІРѕРє Р±Р»РѕРєР°",
        EN: "Animation: Block title"
    }), "anim_bdescr" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: РћРїРёСЃР°РЅРёРµ Р±Р»РѕРєР°",
        EN: "Animation: Block description"
    }), "anim_btext" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: РўРµРєСЃС‚ С€Р°РїРєРё Р±Р»РѕРєР°",
        EN: "Animation: Block header text"
    }), "anim_bbtn" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: РљРЅРѕРїРєР° Р±Р»РѕРєР°",
        EN: "Animation: Block button"
    }), "anim_el" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: Р­Р»РµРјРµРЅС‚",
        EN: "Animation: Element"
    }), "anim_el2" == e && (t.label = {
        RU: "РђРЅРёРјР°С†РёСЏ: Р­Р»РµРјРµРЅС‚ 2",
        EN: "Animation: Element 2"
    })) : "paymentstat" == e || "formstat" == e ? t = {
        type: "spec"
    } : "store_showoptsingrid" == e ? t = {
        type: "cb",
        caption: {
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ РѕРїС†РёРё С‚РѕРІР°СЂР° СЂСЏРґРѕРј СЃ РјРёРЅРёР°С‚СЋСЂРѕР№ РІ СЃРїРёСЃРєРµ С‚РѕРІР°СЂРѕРІ",
            EN: "Show product options next to the thumbnail in the product list"
        }
    } : "store_hidepartstabs" == e ? t = {
        type: "cb",
        caption: {
            RU: "РЎРїСЂСЏС‚Р°С‚СЊ СЃРїРёСЃРѕРє СЂР°Р·РґРµР»РѕРІ РєР°С‚Р°Р»РѕРіР°",
            EN: "Hide the list of catalog sections"
        }
    } : "showpagination" == e ? t = {
        type: "cb",
        caption: {
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ РїР°РіРёРЅР°С†РёСЋ (РІРјРµСЃС‚Рѕ РєРЅРѕРїРєРё В«Р—Р°РіСЂСѓР·РёС‚СЊ РµС‰РµВ»)",
            EN: "Show pagination (instead Load more button)"
        }
    } : "store_hidefilters" == e ? t = {
        type: "cb",
        caption: {
            RU: "РЎРїСЂСЏС‚Р°С‚СЊ С„РёР»СЊС‚СЂС‹",
            EN: "Hide filters"
        }
    } : "store_onlyinstock" == e ? t = {
        type: "cb",
        caption: {
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ С‚РѕРІР°СЂС‹ С‚РѕР»СЊРєРѕ РІ РЅР°Р»РёС‡РёРё",
            EN: "Show only in stock items by default"
        }
    } : "width" == e ? t = {
        type: "sb",
        label: {
            RU: "РЁРёСЂРёРЅР°",
            EN: "Width"
        },
        options: [{
            v: "",
            EN: ""
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "12",
            RU: "12 РєРѕР»РѕРЅРѕРє",
            EN: "12 columns"
        }, {
            v: "11",
            RU: "11 РєРѕР»РѕРЅРѕРє",
            EN: "11 columns"
        }, {
            v: "10",
            RU: "10 РєРѕР»РѕРЅРѕРє",
            EN: "10 columns"
        }, {
            v: "9",
            RU: "9 РєРѕР»РѕРЅРѕРє",
            EN: "9 columns"
        }, {
            v: "8",
            RU: "8 РєРѕР»РѕРЅРѕРє",
            EN: "8 columns"
        }, {
            v: "7",
            RU: "7 РєРѕР»РѕРЅРѕРє",
            EN: "7 columns"
        }, {
            v: "6",
            RU: "6 РєРѕР»РѕРЅРѕРє",
            EN: "6 columns"
        }]
    } : "imgs_zoomable" == e ? t = {
        type: "cb",
        caption: {
            RU: "РЈРІРµР»РёС‡РµРЅРёРµ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ РїРѕ РєР»РёРєСѓ",
            EN: "Zoom image on click"
        }
    } : "title_color" == e ? t = {
        type: "co",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє: Р¦РІРµС‚",
            EN: "Title: Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "title_fontsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє: Р Р°Р·РјРµСЂ С€СЂРёС„С‚Р°",
            EN: "Title: Font size"
        },
        ph: {
            EN: "20px"
        }
    } : "title_fontfamily" == e ? t = {
        type: "ff",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє: РЁСЂРёС„С‚",
            EN: "Title: Font family name"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "Arial",
            EN: "Arial"
        }, {
            v: "Georgia",
            EN: "Georgia"
        }]
    } : "title_lineheight" == e ? t = {
        type: "in_float",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє: РњРµР¶СЃС‚СЂРѕС‡РЅРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ",
            EN: "Title: Line spacing"
        },
        ph: {
            EN: "1.55"
        }
    } : "title_fontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє: РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ",
            EN: "Title: Font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "Thin"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "title_uppercase" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє: Р·Р°РіР»Р°РІРЅС‹РјРё Р±СѓРєРІР°РјРё",
            EN: "Title: Uppercase"
        }
    } : "title_margintop" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє: РћС‚СЃС‚СѓРї СЃРІРµСЂС…Сѓ",
            EN: "Title: Top Margin"
        },
        ph: {
            EN: "10px"
        }
    } : "title_marginbottom" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє: РћС‚СЃС‚СѓРї СЃРЅРёР·Сѓ",
            EN: "Title: Bottom Margin"
        },
        ph: {
            EN: "10px"
        }
    } : "nofollow" == e ? t = {
        type: "cb",
        caption: {
            RU: "Rel nofollow. РЎСЃС‹Р»РєР° РЅРµ РїРµСЂРµРґР°РµС‚ РІРµСЃ СЃС‚СЂР°РЅРёС†Рµ, РЅР° РєРѕС‚РѕСЂСѓСЋ СЃСЃС‹Р»Р°РµС‚СЃСЏ",
            EN: "Rel nofollow. Search engines don't use the link for page ranking calculations"
        }
    } : "parallax" == e ? t = {
        type: "sb",
        label: {
            RU: "Р­С„С„РµРєС‚ РїСЂРё СЃРєСЂРѕР»Р»Рµ",
            EN: "Background scroll effect"
        },
        options: [{
            v: "",
            RU: "Р‘РµР· СЌС„С„РµРєС‚Р°",
            EN: "Static (as usual)"
        }, {
            v: "fixed",
            RU: "РЎ С„РёРєСЃР°С†РёРµР№",
            EN: "Fixed"
        }, {
            v: "dynamic",
            RU: "РџР°СЂР°Р»Р»Р°РєСЃ",
            EN: "Parallax"
        }]
    } : "height" == e ? t = {
        type: "in_vh",
        label: {
            RU: "Р’С‹СЃРѕС‚Р°",
            EN: "Height"
        },
        ph: {
            EN: "100vh"
        },
        hint: {
            EN: "Example: 700px (or 100vh. Units: px - pixels, vh - viewport height)"
        }
    } : "filtercolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РёР»СЊС‚СЂР° РІ РЅР°С‡Р°Р»Рµ",
            EN: "Filter Start Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "filteropacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "filtercolor"
    } : "filtercolor2" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РёР»СЊС‚СЂР° РІ РєРѕРЅС†Рµ",
            EN: "Filter End Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "filteropacity2" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "filtercolor2"
    } : "nomute" == e ? t = {
        type: "cb",
        caption: {
            RU: "РќРµ РІС‹РєР»СЋС‡Р°С‚СЊ Р·РІСѓРє Сѓ РІРёРґРµРѕ",
            EN: "Don't mute video"
        }
    } : "noloop" == e ? t = {
        type: "cb",
        caption: {
            RU: "РќРµ Р·Р°С†РёРєР»РёРІР°С‚СЊ РІРёРґРµРѕ",
            EN: "Don't loop video"
        }
    } : "cover_bgimg_alignxy" == e ? t = {
        type: "sb",
        label: {
            RU: "РџРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ С„РѕРЅРѕРІРѕРіРѕ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ",
            EN: "Background Image Position"
        },
        hint: {
            RU: "РњРµРЅСЏРµС‚ С„РѕРєСѓСЃРёСЂРѕРІРєСѓ СЌРєСЂР°РЅР° РѕС‚РЅРѕСЃРёС‚РµР»СЊРЅРѕ С„РѕРЅРѕРІРѕРіРѕ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ"
        },
        options: [{
            v: "left top",
            RU: "в†– Р›РµРІРѕ Р’РµСЂС…",
            EN: "в†– Top Left"
        }, {
            v: "center top",
            RU: "в†‘ Р¦РµРЅС‚СЂ Р’РµСЂС…",
            EN: "в†‘ Top Center"
        }, {
            v: "right top",
            RU: "в†— РџСЂР°РІРѕ Р’РµСЂС…",
            EN: "в†— Top Right"
        }, {
            v: "left center",
            RU: "в†ђ Р›РµРІРѕ Р¦РµРЅС‚СЂ",
            EN: "в†ђ Center Left"
        }, {
            v: "",
            RU: "Р¦РµРЅС‚СЂ Р¦РµРЅС‚СЂ",
            EN: "Center Center"
        }, {
            v: "right center",
            RU: "в†’ РџСЂР°РІРѕ Р¦РµРЅС‚СЂ",
            EN: "в†’ Center Right"
        }, {
            v: "left bottom",
            RU: "в†™ Р›РµРІРѕ РќРёР·",
            EN: "в†™ Bottom Left"
        }, {
            v: "center bottom",
            RU: "в†“ Р¦РµРЅС‚СЂ РќРёР·",
            EN: "в†“ Bottom Center"
        }, {
            v: "right bottom",
            RU: "в† РџСЂР°РІРѕ РќРёР·",
            EN: "в† Bottom Right"
        }]
    } : "autostart" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р’РѕСЃРїСЂРѕРёР·РІРѕРґРёС‚СЊ РІРёРґРµРѕ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё",
            EN: "Autoplay video"
        }
    } : "shadow_size" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРµРЅСЊ: СЂР°Р·РјРµСЂ",
            EN: "Shadow: Size"
        },
        ph: {
            EN: "10"
        }
    } : "shadow_opacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "shadow_size"
    } : "controlcolor" == e ? t = {
        type: "sb",
        label: {
            RU: "Р¦РІРµС‚ СѓРїСЂР°РІР»СЏСЋС‰РµРіРѕ СЌР»РµРјРµРЅС‚Р°",
            EN: "Control Color"
        },
        options: [{
            v: "",
            RU: "Р§РµСЂРЅС‹Р№",
            EN: "Black"
        }, {
            v: "white",
            RU: "Р‘РµР»С‹Р№",
            EN: "White"
        }]
    } : "control" == e ? t = {
        type: "sb",
        label: {
            RU: "РЈРїСЂР°РІР»СЏСЋС‰РёРµ СЌР»РµРјРµРЅС‚С‹",
            EN: "Control elements"
        },
        options: [{
            v: "",
            RU: "РЎС‚СЂРµР»РєРё Рё С‚РѕС‡РєРё",
            EN: "Arrows and dots"
        }, {
            v: "arrowsdotsbottom",
            RU: "РЎС‚СЂРµР»РєРё Рё С‚РѕС‡РєРё РІРЅРёР·Сѓ",
            EN: "Arrows and dots at the bottom"
        }, {
            v: "arrows",
            RU: "РўРѕР»СЊРєРѕ СЃС‚СЂРµР»РєРё",
            EN: "Arrows"
        }, {
            v: "dots",
            RU: "РўРѕР»СЊРєРѕ С‚РѕС‡РєРё",
            EN: "Dots"
        }, {
            v: "dotsbottom",
            RU: "РўРѕР»СЊРєРѕ С‚РѕС‡РєРё РІРЅРёР·Сѓ",
            EN: "Dots at the bottom"
        }]
    } : "slidetimeout" == e ? t = {
        type: "in",
        label: {
            RU: "РђРІС‚РѕРјР°С‚РёС‡РµСЃРєР°СЏ СЃРјРµРЅР° СЃР»Р°Р№РґРѕРІ (РІ РјРёР»Р»РёСЃРµРєСѓРЅРґР°С…)",
            EN: "Slides autoplay interval (in milliseconds)"
        },
        hint: {
            EN: "Example: 1000"
        }
    } : "align" == e ? t = {
        type: "sb",
        label: {
            RU: "Р’С‹СЂР°РІРЅРёРІР°РЅРёРµ",
            EN: "Alignment"
        },
        options: [{
            v: "left",
            RU: "РџРѕ Р»РµРІРѕРјСѓ РєСЂР°СЋ",
            EN: "Left"
        }, {
            v: "center",
            RU: "РџРѕ С†РµРЅС‚СЂСѓ",
            EN: "Center"
        }, {
            v: "right",
            RU: "РџРѕ РїСЂР°РІРѕРјСѓ РєСЂР°СЋ",
            EN: "Right"
        }]
    } : "valign" == e ? t = {
        type: "sb",
        label: {
            RU: "Р’РµСЂС‚РёРєР°Р»СЊРЅРѕРµ РІС‹СЂР°РІРЅРёРІР°РЅРёРµ",
            EN: "Vertical Alignment"
        },
        options: [{
            v: "top",
            RU: "РџРѕ РІРµСЂС…Сѓ",
            EN: "Top"
        }, {
            v: "middle",
            RU: "РџРѕ С†РµРЅС‚СЂСѓ",
            EN: "Middle"
        }, {
            v: "bottom",
            RU: "РџРѕ РЅРёР·Сѓ",
            EN: "Bottom"
        }]
    } : "arrow_style" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎС‚СЂРµР»РєР°",
            EN: "Arrow"
        },
        options: [{
            v: "",
            RU: "РќРµС‚",
            EN: "None"
        }, {
            v: "1",
            RU: "РЎС‚СЂРµР»РєР° РІРЅРёР·",
            EN: "Down arrow"
        }]
    } : "arrow_color" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ СЃС‚СЂРµР»РєРё",
            EN: "Arrow color"
        },
        ph: {
            EN: "#ffffff"
        },
        split: "arrow_style"
    } : "arrow_animate" == e ? t = {
        type: "cb",
        caption: {
            RU: "РђРЅРёРјРёСЂРѕРІР°С‚СЊ СЃС‚СЂРµР»РєСѓ",
            EN: "Animate arrow"
        }
    } : "title_letterspacing" == e ? t = {
        type: "sb",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє: РњРµР¶Р±СѓРєРІРµРЅРЅРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ",
            EN: "Title: Letter spacing"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "0.5px",
            EN: "0.5px"
        }, {
            v: "1px",
            EN: "1px"
        }, {
            v: "1.5px",
            EN: "1.5px"
        }, {
            v: "2px",
            EN: "2px"
        }, {
            v: "2.5px",
            EN: "2.5px"
        }, {
            v: "3px",
            EN: "3px"
        }]
    } : "title_shadowsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє: СЂР°Р·РјРµСЂ С‚РµРЅРё",
            EN: "Title: Shadow size"
        },
        ph: {
            EN: "10px"
        }
    } : "title_shadowopacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "title_shadowsize"
    } : "title_opacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ Р·Р°РіРѕР»РѕРІРєР°",
            EN: "Title Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "descr_color" == e ? t = {
        type: "co",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ: Р¦РІРµС‚",
            EN: "Descr: Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "descr_fontsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ: Р Р°Р·РјРµСЂ С€СЂРёС„С‚Р°",
            EN: "Descr: Font size"
        },
        ph: {
            EN: "20px"
        }
    } : "descr_fontfamily" == e ? t = {
        type: "ff",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ: РЁСЂРёС„С‚",
            EN: "Descr: Font family name"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "Arial",
            EN: "Arial"
        }, {
            v: "Georgia",
            EN: "Georgia"
        }]
    } : "descr_lineheight" == e ? t = {
        type: "in_float",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ: РњРµР¶СЃС‚СЂРѕС‡РЅРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ",
            EN: "Descr: Line spacing"
        },
        ph: {
            EN: "1.55"
        }
    } : "descr_letterspacing" == e ? t = {
        type: "sb",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ: РњРµР¶Р±СѓРєРІРµРЅРЅРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ",
            EN: "Descr: Letter spacing"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "0.5px",
            EN: "0.5px"
        }, {
            v: "1px",
            EN: "1px"
        }, {
            v: "1.5px",
            EN: "1.5px"
        }, {
            v: "2px",
            EN: "2px"
        }, {
            v: "2.5px",
            EN: "2.5px"
        }, {
            v: "3px",
            EN: "3px"
        }]
    } : "descr_fontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ: РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ",
            EN: "Descr: Font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "Thin"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "descr_uppercase" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћРїРёСЃР°РЅРёРµ: Р·Р°РіР»Р°РІРЅС‹РјРё Р±СѓРєРІР°РјРё",
            EN: "Descr: Uppercase"
        }
    } : "descr_margintop" == e ? t = {
        type: "in_px",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ: РћС‚СЃС‚СѓРї СЃРІРµСЂС…Сѓ",
            EN: "Descr: Top Margin"
        },
        ph: {
            EN: "10px"
        }
    } : "descr_marginbottom" == e ? t = {
        type: "in_px",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ: РћС‚СЃС‚СѓРї СЃРЅРёР·Сѓ",
            EN: "Descr: Bottom Margin"
        },
        ph: {
            EN: "10px"
        }
    } : "descr_shadowsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ: СЂР°Р·РјРµСЂ С‚РµРЅРё",
            EN: "Descr: Shadow Size"
        },
        ph: {
            EN: "10px"
        }
    } : "descr_shadowopacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "descr_shadowsize"
    } : "descr_opacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ РѕРїРёСЃР°РЅРёСЏ",
            EN: "Description opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "subtitle_color" == e ? t = {
        type: "co",
        label: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє: Р¦РІРµС‚",
            EN: "Subtitle: Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "subtitle_fontsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє: Р Р°Р·РјРµСЂ С€СЂРёС„С‚Р°",
            EN: "Subtitle: Font size"
        },
        ph: {
            EN: "20px"
        }
    } : "subtitle_fontfamily" == e ? t = {
        type: "ff",
        label: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє: РЁСЂРёС„С‚",
            EN: "Subtitle: Font family name"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "Arial",
            EN: "Arial"
        }, {
            v: "Georgia",
            EN: "Georgia"
        }]
    } : "subtitle_lineheight" == e ? t = {
        type: "in_float",
        label: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє: РњРµР¶СЃС‚СЂРѕС‡РЅРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ",
            EN: "Subtitle: Line spacing"
        },
        ph: {
            EN: "1.55"
        }
    } : "subtitle_letterspacing" == e ? t = {
        type: "sb",
        label: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє: РњРµР¶Р±СѓРєРІРµРЅРЅРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ",
            EN: "Subtitle: Letter spacing"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "0.5px",
            EN: "0.5px"
        }, {
            v: "1px",
            EN: "1px"
        }, {
            v: "1.5px",
            EN: "1.5px"
        }, {
            v: "2px",
            EN: "2px"
        }, {
            v: "2.5px",
            EN: "2.5px"
        }, {
            v: "3px",
            EN: "3px"
        }]
    } : "subtitle_fontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє: РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ",
            EN: "Subtitle: Font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "Thin"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "subtitle_uppercase" == e ? t = {
        type: "cb",
        caption: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє: Р·Р°РіР»Р°РІРЅС‹РјРё Р±СѓРєРІР°РјРё",
            EN: "Subtitle: Uppercase"
        }
    } : "subtitle_margintop" == e ? t = {
        type: "in_px",
        label: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє: РћС‚СЃС‚СѓРї СЃРІРµСЂС…Сѓ",
            EN: "Subtitle: Top Margin"
        },
        ph: {
            EN: "10px"
        }
    } : "subtitle_marginbottom" == e ? t = {
        type: "in_px",
        label: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє: РћС‚СЃС‚СѓРї СЃРЅРёР·Сѓ",
            EN: "Subtitle: Margin Bottom"
        },
        ph: {
            EN: "10px"
        }
    } : "subtitle_opacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ РїРѕРґР·Р°РіРѕР»РѕРІРєР°",
            EN: "Subtitle Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "noadcut" == e ? t = {
        type: "cb",
        caption: {
            RU: "РќРµ РїСЂРёРјРµРЅСЏС‚СЊ СѓР»СѓС‡С€РµРЅРЅРѕРµ РјР°cС€С‚Р°Р±РёСЂРѕРІР°РЅРёРµ youtube РІРёРґРµРѕ",
            EN: "Don't apply enhanced YouTube video resizing"
        }
    } : "vidratio" == e ? t = {
        type: "in_float",
        label: {
            RU: "РљРѕСЌС„С„РёС†РёРµРЅС‚ СЃРѕРѕС‚РЅРѕС€РµРЅРёСЏ СЃС‚РѕСЂРѕРЅ Сѓ РІРёРґРµРѕ",
            EN: "Video aspect ratio"
        },
        ph: {
            EN: "0.5625"
        }
    } : "title_tag" == e ? t = {
        type: "sb",
        label: {
            RU: "SEO: С‚РµРі РґР»СЏ Р·Р°РіРѕР»РѕРІРєР°",
            EN: "SEO: Title tag"
        },
        options: [{
            v: "",
            RU: "РќРµ Р·Р°РґР°РЅ",
            EN: "Default"
        }, {
            v: "h1",
            EN: "H1"
        }, {
            v: "h2",
            EN: "H2"
        }, {
            v: "h3",
            EN: "H3"
        }, {
            v: "div",
            EN: "DIV"
        }]
    } : "bg_size" == e ? t = {
        type: "sb",
        label: {
            RU: "РњР°СЃС€С‚Р°Р±РёСЂРѕРІР°РЅРёРµ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ",
            EN: "Image Stretch"
        },
        options: [{
            v: "",
            RU: "РћСЂРёРіРёРЅР°Р»СЊРЅС‹Р№ СЂР°Р·РјРµСЂ",
            EN: "Original size"
        }, {
            v: "contain",
            RU: "Р¦РµР»РёРєРѕРј РїРѕРјРµС‰Р°РµС‚СЃСЏ РІРЅСѓС‚СЂРё Р±Р»РѕРєР°",
            EN: "Fit to block without cropping"
        }, {
            v: "cover",
            RU: "РЁРёСЂРёРЅР° РёР»Рё РІС‹СЃРѕС‚Р° СЂР°РІРЅСЏРµС‚СЃСЏ С€РёСЂРёРЅРµ РёР»Рё РІС‹СЃРѕС‚Рµ Р±Р»РѕРєР°",
            EN: "Image width or height equals block width or height"
        }]
    } : "arrow_position" == e ? t = {
        type: "sb",
        label: {
            RU: "РџРѕР»РѕР¶РµРЅРёРµ СЃС‚СЂРµР»РєРё",
            EN: "Arrow Position"
        },
        options: [{
            v: "",
            RU: "РЎР±РѕРєСѓ СЌРєСЂР°РЅР°",
            EN: "Near the window border"
        }, {
            v: "nearpic",
            RU: "РЎР±РѕРєСѓ РѕС‚ С„РѕС‚РѕРіСЂР°С„РёРё",
            EN: "Near the image"
        }, {
            v: "inpic",
            RU: "Р’РЅСѓС‚СЂРё С„РѕС‚РѕРіСЂР°С„РёРё",
            EN: "Inside the image"
        }]
    } : "arrow_size" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ СЃС‚СЂРµР»РєРё",
            EN: "Arrow size"
        },
        options: [{
            v: "sm",
            RU: "РњР°Р»РµРЅСЊРєРёР№",
            EN: "Small"
        }, {
            v: "",
            RU: "РЎСЂРµРґРЅРёР№",
            EN: "Medium"
        }, {
            v: "lg",
            RU: "Р‘РѕР»СЊС€РѕР№",
            EN: "Large"
        }]
    } : "arrow_weight" == e ? t = {
        type: "sb",
        label: {
            RU: "РўРѕР»С‰РёРЅР° СЃС‚СЂРµР»РєРё",
            EN: "Arrow weight"
        },
        options: [{
            v: "light",
            RU: "РўРѕРЅРєРёР№",
            EN: "Light"
        }, {
            v: "",
            RU: "РЎСЂРµРґРЅРёР№",
            EN: "Normal"
        }, {
            v: "bold",
            RU: "РўРѕР»СЃС‚С‹Р№",
            EN: "Bold"
        }]
    } : "dots_size" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ С‚РѕС‡РµРє",
            EN: "Dot size"
        },
        options: [{
            v: "sm",
            RU: "РњР°Р»РµРЅСЊРєРёР№",
            EN: "Small"
        }, {
            v: "",
            RU: "РЎСЂРµРґРЅРёР№",
            EN: "Medium"
        }, {
            v: "lg",
            RU: "Р‘РѕР»СЊС€РѕР№",
            EN: "Large"
        }]
    } : "color" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚",
            EN: "Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "linecolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ Р»РёРЅРёРё",
            EN: "Line color"
        },
        ph: {
            EN: "#000000"
        }
    } : "anim_speed" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎРєРѕСЂРѕСЃС‚СЊ Р°РЅРёРјР°С†РёРё",
            EN: "Animation speed"
        },
        options: [{
            v: "",
            RU: "0",
            EN: "None"
        }, {
            v: "fast",
            RU: "Р‘С‹СЃС‚СЂРѕ",
            EN: "Fast"
        }, {
            v: "slow",
            RU: "РњРµРґР»РµРЅРЅРѕ",
            EN: "Slow"
        }]
    } : "width12" == e ? t = {
        type: "sb",
        label: {
            RU: "РЁРёСЂРёРЅР°",
            EN: "Width"
        },
        options: [{
            v: "",
            EN: ""
        }, {
            v: "12",
            RU: "12 РєРѕР»РѕРЅРѕРє",
            EN: "12 columns"
        }, {
            v: "11",
            RU: "11 РєРѕР»РѕРЅРѕРє",
            EN: "11 columns"
        }, {
            v: "10",
            RU: "10 РєРѕР»РѕРЅРѕРє",
            EN: "10 columns"
        }, {
            v: "9",
            RU: "9 РєРѕР»РѕРЅРѕРє",
            EN: "9 columns"
        }, {
            v: "8",
            RU: "8 РєРѕР»РѕРЅРѕРє",
            EN: "8 columns"
        }, {
            v: "7",
            RU: "7 РєРѕР»РѕРЅРѕРє",
            EN: "7 columns"
        }, {
            v: "6",
            RU: "6 РєРѕР»РѕРЅРѕРє",
            EN: "6 columns"
        }]
    } : "arw_size" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ СЃС‚СЂРµР»РєРё",
            EN: "Arrow size"
        },
        options: [{
            v: "sm",
            RU: "РњР°Р»РµРЅСЊРєРёР№",
            EN: "Small"
        }, {
            v: "",
            RU: "РЎСЂРµРґРЅРёР№",
            EN: "Medium"
        }, {
            v: "lg",
            RU: "Р‘РѕР»СЊС€РѕР№",
            EN: "Large"
        }, {
            v: "xl",
            RU: "РЎР°РјС‹Р№ Р‘РѕР»СЊС€РѕР№",
            EN: "X-Large"
        }]
    } : "arw_bordersize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРѕР»С‰РёРЅР° СЃС‚СЂРµР»РєРё",
            EN: "Arrow width"
        },
        ph: {
            EN: "3px"
        }
    } : "arw_color" == e ? t = {
        type: "co",
        label: {
            RU: "РЎС‚СЂРµР»РєР°: Р¦РІРµС‚",
            EN: "Arrow: Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "arw_colorhover" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Color on hover"
        },
        ph: {
            EN: "#000000"
        },
        split: "arw_color"
    } : "arw_bgcolor" == e ? t = {
        type: "co",
        label: {
            RU: "РЎС‚СЂРµР»РєР°: Р¦РІРµС‚ С„РѕРЅР°",
            EN: "Arrow: Background color"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "arw_bgcolorhover" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР° РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Background color on hover"
        },
        ph: {
            EN: "#000000"
        },
        split: "arw_bgcolor"
    } : "arw_bgopacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎС‚СЂРµР»РєР°: РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ С„РѕРЅР°",
            EN: "Arrow: Background opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "95",
            EN: "95%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "arw_bgopacityhover" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Opacity on hover"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "95",
            EN: "95%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "arw_bgopacity"
    } : "arw_showborder" == e ? t = {
        type: "cb",
        caption: {
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ РѕР±РІРѕРґРєСѓ",
            EN: "Show Border"
        }
    } : "dots_width" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРѕС‡РєРё: СЂР°Р·РјРµСЂ",
            EN: "Dots: Size"
        },
        ph: {
            EN: "4px"
        }
    } : "dots_bgcolor" == e ? t = {
        type: "co",
        label: {
            RU: "РўРѕС‡РєРё: С†РІРµС‚ С„РѕРЅР°",
            EN: "Dots: Background color"
        },
        ph: {
            EN: "#000000"
        }
    } : "dots_bgcoloractive" == e ? t = {
        type: "co",
        label: {
            RU: "РўРѕС‡РєРё: С†РІРµС‚ С„РѕРЅР° Р°РєС‚РёРІРЅРѕР№ С‚РѕС‡РєРё",
            EN: "Dots: Active dot background color"
        },
        ph: {
            EN: "#CCCCCC"
        }
    } : "dots_bordersize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРѕС‡РєРё: С‚РѕР»С‰РёРЅР° РѕР±РІРѕРґРєРё",
            EN: "Dots: Border width"
        },
        ph: {
            EN: "1px"
        }
    } : "imgwidth" == e ? t = {
        type: "in_px",
        label: {
            RU: "РЁРёСЂРёРЅР° РёР·РѕР±СЂР°Р¶РµРЅРёСЏ",
            EN: "Image width"
        },
        ph: {
            EN: "300px"
        }
    } : "slidesize" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ СЃР»Р°Р№РґР°",
            EN: "Slide size"
        },
        options: [{
            v: "cover",
            EN: "Fill block while maintaining aspect ratio"
        }, {
            v: "contain",
            EN: "Fit to block without cropping"
        }, {
            v: "",
            EN: "Original"
        }]
    } : "prefix" == e ? t = {
        type: "sb",
        label: {
            RU: "РћС‚СЃС‚СѓРї СЃР»РµРІР°",
            EN: "Block Position Offset"
        },
        options: [{
            v: "",
            RU: "Р‘РµР· РѕС‚СЃС‚СѓРїР°",
            EN: "No offset"
        }, {
            v: "1",
            RU: "1 РєРѕР»РѕРЅРєР°",
            EN: "1 column"
        }, {
            v: "2",
            RU: "2 РєРѕР»РѕРЅРєРё",
            EN: "2 columns"
        }, {
            v: "3",
            RU: "3 РєРѕР»РѕРЅРєРё",
            EN: "3 columns"
        }, {
            v: "4",
            RU: "4 РєРѕР»РѕРЅРєРё",
            EN: "4 columns"
        }, {
            v: "5",
            RU: "5 РєРѕР»РѕРЅРѕРє",
            EN: "5 columns"
        }, {
            v: "6",
            RU: "6 РєРѕР»РѕРЅРѕРє",
            EN: "6 columns"
        }]
    } : "initialletter" == e ? t = {
        type: "cb",
        caption: {
            RU: "РСЃРїРѕР»СЊР·РѕРІР°С‚СЊ Р±СѓРєРІРёС†Сѓ",
            EN: "Initial first letter"
        }
    } : "text_color" == e ? t = {
        type: "co",
        label: {
            RU: "РўРµРєСЃС‚: Р¦РІРµС‚",
            EN: "Text: Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "text_fontsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРµРєСЃС‚: Р Р°Р·РјРµСЂ С€СЂРёС„С‚Р°",
            EN: "Text: Font size"
        },
        ph: {
            EN: "20px"
        }
    } : "text_fontfamily" == e ? t = {
        type: "ff",
        label: {
            RU: "РўРµРєСЃС‚: РЁСЂРёС„С‚",
            EN: "Text: Font family name"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "Arial",
            EN: "Arial"
        }, {
            v: "Georgia",
            EN: "Georgia"
        }]
    } : "text_lineheight" == e ? t = {
        type: "in_float",
        label: {
            RU: "РўРµРєСЃС‚: РњРµР¶СЃС‚СЂРѕС‡РЅРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ",
            EN: "Text: Line spacing"
        },
        ph: {
            EN: "1.55"
        }
    } : "text_fontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "РўРµРєСЃС‚: РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ",
            EN: "Text: Font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "Thin"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "text_uppercase" == e ? t = {
        type: "cb",
        caption: {
            RU: "РўРµРєСЃС‚: Р·Р°РіР»Р°РІРЅС‹РјРё Р±СѓРєРІР°РјРё",
            EN: "Text: Uppercase"
        }
    } : "text_margintop" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРµРєСЃС‚: РћС‚СЃС‚СѓРї СЃРІРµСЂС…Сѓ",
            EN: "Text: Top Margin"
        },
        ph: {
            EN: "10px"
        }
    } : "text_marginbottom" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРµРєСЃС‚: РћС‚СЃС‚СѓРї СЃРЅРёР·Сѓ",
            EN: "Text: Bottom Margin"
        },
        ph: {
            EN: "10px"
        }
    } : "text_letterspacing" == e ? t = {
        type: "sb",
        label: {
            RU: "РўРµРєСЃС‚: РњРµР¶Р±СѓРєРІРµРЅРЅРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ",
            EN: "Text: Letter spacing"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "0.5px",
            EN: "0.5px"
        }, {
            v: "1px",
            EN: "1px"
        }, {
            v: "1.5px",
            EN: "1.5px"
        }, {
            v: "2px",
            EN: "2px"
        }, {
            v: "2.5px",
            EN: "2.5px"
        }, {
            v: "3px",
            EN: "3px"
        }]
    } : "text_opacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РўРµРєСЃС‚: РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Text: Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "columns2" == e ? t = {
        type: "sb",
        label: {
            RU: "РЁРёСЂРёРЅР° РІС‚РѕСЂРѕРіРѕ Р±Р»РѕРєР°",
            EN: "Second Block Width"
        },
        options: [{
            v: "12",
            RU: "12 РєРѕР»РѕРЅРѕРє",
            EN: "12 columns"
        }, {
            v: "11",
            RU: "11 РєРѕР»РѕРЅРѕРє",
            EN: "11 columns"
        }, {
            v: "10",
            RU: "10 РєРѕР»РѕРЅРѕРє",
            EN: "10 columns"
        }, {
            v: "9",
            RU: "9 РєРѕР»РѕРЅРѕРє",
            EN: "9 columns"
        }, {
            v: "8",
            RU: "8 РєРѕР»РѕРЅРѕРє",
            EN: "8 columns"
        }, {
            v: "7",
            RU: "7 РєРѕР»РѕРЅРѕРє",
            EN: "7 columns"
        }, {
            v: "6",
            RU: "6 РєРѕР»РѕРЅРѕРє",
            EN: "6 columns"
        }, {
            v: "5",
            RU: "5 РєРѕР»РѕРЅРѕРє",
            EN: "5 columns"
        }, {
            v: "4",
            RU: "4 РєРѕР»РѕРЅРєРё",
            EN: "4 columns"
        }, {
            v: "3",
            RU: "3 РєРѕР»РѕРЅРєРё",
            EN: "3 columns"
        }, {
            v: "2",
            RU: "2 РєРѕР»РѕРЅРєРё",
            EN: "2 columns"
        }, {
            v: "1",
            RU: "1 РєРѕР»РѕРЅРєР°",
            EN: "1 column"
        }, {
            v: "100",
            EN: "100%"
        }]
    } : "prefix2" == e ? t = {
        type: "sb",
        label: {
            RU: "РћС‚СЃС‚СѓРї СЃР»РµРІР° Сѓ РІС‚РѕСЂРѕРіРѕ Р±Р»РѕРєР°",
            EN: "Second Block Offset"
        },
        options: [{
            v: "",
            RU: "Р‘РµР· РѕС‚СЃС‚СѓРїР°",
            EN: "No offset"
        }, {
            v: "1",
            RU: "1 РєРѕР»РѕРЅРєР°",
            EN: "1 column"
        }, {
            v: "2",
            RU: "2 РєРѕР»РѕРЅРєРё",
            EN: "2 columns"
        }, {
            v: "3",
            RU: "3 РєРѕР»РѕРЅРєРё",
            EN: "3 columns"
        }, {
            v: "4",
            RU: "4 РєРѕР»РѕРЅРєРё",
            EN: "4 columns"
        }, {
            v: "5",
            RU: "5 РєРѕР»РѕРЅРѕРє",
            EN: "5 columns"
        }, {
            v: "6",
            RU: "6 РєРѕР»РѕРЅРѕРє",
            EN: "6 columns"
        }]
    } : "style" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎС‚РёР»СЊ",
            EN: "Style"
        },
        options: [{
            v: "",
            RU: "РЎС‚РёР»СЊ 1",
            EN: "Style 1"
        }, {
            v: "2",
            RU: "РЎС‚РёР»СЊ 2",
            EN: "Style 2"
        }, {
            v: "3",
            RU: "РЎС‚РёР»СЊ 3",
            EN: "Style 3"
        }]
    } : "style2" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎС‚РёР»СЊ 2",
            EN: "Style 2"
        },
        options: [{
            v: "",
            RU: "РЎС‚РёР»СЊ 1",
            EN: "Style 1"
        }, {
            v: "2",
            RU: "РЎС‚РёР»СЊ 2",
            EN: "Style 2"
        }, {
            v: "3",
            RU: "РЎС‚РёР»СЊ 3",
            EN: "Style 3"
        }]
    } : "selectbox" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎРµР»РµРєС‚Р±РѕРєСЃ",
            EN: "Selectbox"
        },
        options: [{
            v: "",
            RU: "Р’Р°СЂРёР°РЅС‚ 1",
            EN: "Variant 1"
        }, {
            v: "2",
            RU: "Р’Р°СЂРёР°РЅС‚ 2",
            EN: "Variant 2"
        }, {
            v: "3",
            RU: "Р’Р°СЂРёР°РЅС‚ 3",
            EN: "Variant 3"
        }]
    } : "bgcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР°",
            EN: "Background color"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "bordersize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРѕР»С‰РёРЅР° Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border width"
        },
        ph: {
            EN: "3px"
        }
    } : "bordercolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border color"
        },
        ph: {
            EN: "#000000"
        }
    } : "borderradius" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р Р°РґРёСѓСЃ СЃРєСЂСѓРіР»РµРЅРёСЏ Р±РѕСЂРґСЋСЂР°",
            EN: "Border radius"
        },
        ph: {
            EN: "30px"
        }
    } : "title_widthpx" == e ? t = {
        type: "in_px",
        label: {
            RU: "РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ С€РёСЂРёРЅР° Р·Р°РіРѕР»РѕРІРєР°",
            EN: "Title max width"
        },
        ph: {
            EN: "700px"
        }
    } : "descr_widthpx" == e ? t = {
        type: "in_px",
        label: {
            RU: "РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ С€РёСЂРёРЅР° РѕРїРёСЃР°РЅРёСЏ",
            EN: "Description max width"
        },
        ph: {
            EN: "700px"
        }
    } : "flip" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћС‚СЂР°Р·РёС‚СЊ РїРѕ РіРѕСЂРёР·РѕРЅС‚Р°Р»Рё",
            EN: "Flip horizontal"
        }
    } : "checkbox4" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox4"
        }
    } : "heightpx" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р’С‹СЃРѕС‚Р°",
            EN: "Height"
        },
        ph: {
            EN: "100px"
        }
    } : "opacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "columnsratio" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎРѕРѕС‚РЅРѕС€РµРЅРёРµ РєРѕР»РѕРЅРѕРє",
            EN: "Columns ratio"
        },
        options: [{
            v: "9/3",
            RU: "9 РєРѕР»РѕРЅРѕРє / 3 РєРѕР»РѕРЅРєРё",
            EN: "9 columns / 3 columns"
        }, {
            v: "8/4",
            RU: "8 РєРѕР»РѕРЅРѕРє / 4 РєРѕР»РѕРЅРѕРє",
            EN: "8 columns / 4 columns"
        }, {
            v: "7/5",
            RU: "7 РєРѕР»РѕРЅРѕРє / 5 РєРѕР»РѕРЅРѕРє",
            EN: "7 columns / 5 columns"
        }, {
            v: "6/6",
            RU: "6 РєРѕР»РѕРЅРѕРє / 6 РєРѕР»РѕРЅРѕРє",
            EN: "6 columns / 6 columns"
        }, {
            v: "5/7",
            RU: "5 РєРѕР»РѕРЅРѕРє / 7 РєРѕР»РѕРЅРѕРє",
            EN: "5 columns / 7 columns"
        }, {
            v: "4/8",
            RU: "4 РєРѕР»РѕРЅРєРё / 8 РєРѕР»РѕРЅРѕРє",
            EN: "4 columns / 8 columns"
        }, {
            v: "3/9",
            RU: "3 РєРѕР»РѕРЅРєРё / 9 РєРѕР»РѕРЅРѕРє",
            EN: "3 columns / 9 columns"
        }]
    } : "blocks" == e ? t = {
        type: "sb",
        label: {
            RU: "РљРѕР»-РІРѕ РєР°СЂС‚РѕС‡РµРє РІ СЂСЏРґСѓ",
            EN: "Number of cards per row"
        },
        options: [{
            v: "1",
            EN: "1"
        }, {
            v: "2",
            EN: "2"
        }, {
            v: "3",
            EN: "3"
        }, {
            v: "4",
            EN: "4"
        }]
    } : "checkbox1" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox1"
        }
    } : "circle" == e ? t = {
        type: "cb",
        caption: {
            RU: "РљР°СЂС‚РёРЅРєР° РІ РєСЂСѓР¶РєРµ",
            EN: "Rounded image"
        }
    } : "buttoncolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С‚РµРєСЃС‚Р°",
            EN: "Text color"
        },
        ph: {
            EN: "#000000"
        },
        uplabel: {
            RU: "РљРЅРѕРїРєР°",
            EN: "Button"
        }
    } : "buttonbgcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР°",
            EN: "Background color"
        },
        ph: {
            EN: "#ffffff"
        },
        split: "buttoncolor"
    } : "buttonbordercolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border color"
        },
        ph: {
            EN: "#000000"
        }
    } : "buttonbordersize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРѕР»С‰РёРЅР° Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border width"
        },
        ph: {
            EN: "3px"
        },
        split: "buttonbordercolor"
    } : "buttonradius" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р Р°РґРёСѓСЃ СЃРєСЂСѓРіР»РµРЅРёСЏ Р±РѕСЂРґСЋСЂР°",
            EN: "Border radius"
        },
        ph: {
            EN: "30px"
        }
    } : "buttonshadowsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРµРЅСЊ: СЂР°Р·РјРµСЂ",
            EN: "Shadow: Size"
        },
        ph: {
            EN: "10px"
        }
    } : "buttonshadowopacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "buttonshadowsize"
    } : "buttonfontfamily" == e ? t = {
        type: "ff",
        label: {
            RU: "РЁСЂРёС„С‚ РєРЅРѕРїРєРё",
            EN: "Button font family name"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "Arial",
            EN: "Arial"
        }, {
            v: "Georgia",
            EN: "Georgia"
        }]
    } : "buttonfontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ С‚РµРєСЃС‚Р° РєРЅРѕРїРєРё",
            EN: "Button font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "Thin"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "buttonuppercase" == e ? t = {
        type: "cb",
        caption: {
            RU: "РўРµРєСЃС‚ РєРЅРѕРїРєРё Р·Р°РіР»Р°РІРЅС‹РјРё Р±СѓРєРІР°РјРё",
            EN: "Button text uppercase"
        }
    } : "buttonbgcolorhover" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР° РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Background color on hover"
        },
        ph: {
            EN: "#000000"
        }
    } : "buttoncolorhover" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С‚РµРєСЃС‚Р° РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Text color on hover"
        },
        ph: {
            EN: "#000000"
        }
    } : "buttonbordercolorhover" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ Р±РѕСЂРґСЋСЂР° РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Border color on hover"
        },
        ph: {
            EN: "#000000"
        }
    } : "buttonshadowsizehover" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРµРЅСЊ РїСЂРё РЅР°РІРµРґРµРЅРёРё: СЂР°Р·РјРµСЂ",
            EN: "Shadow on Hover: Size"
        },
        ph: {
            EN: "10px"
        }
    } : "buttonshadowopacityhover" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "buttonshadowsizehover"
    } : "buttonspeedhover" == e ? t = {
        type: "in",
        label: {
            RU: "РЎРєРѕСЂРѕСЃС‚СЊ Р°РЅРёРјР°С†РёРё РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Animation speed on hover"
        },
        ph: {
            EN: "0.2s"
        },
        hint: {
            EN: "Time in seconds. Example: 0.2s"
        }
    } : "color2" == e ? t = {
        type: "co",
        label: {
            RU: "Р’С‚РѕСЂРѕР№ С†РІРµС‚",
            EN: "Second Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "textmargintop" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРµРєСЃС‚. РћС‚СЃС‚СѓРї СЃРІРµСЂС…Сѓ (px)",
            EN: "Text Top Margin (px)"
        }
    } : "buttonstyle" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎС‚РёР»СЊ РєРЅРѕРїРєРё",
            EN: "Button Style"
        },
        options: [{
            v: "",
            RU: "РЎС‚Р°РЅРґР°СЂС‚РЅР°СЏ РєРЅРѕРїРєР°",
            EN: "Standard button"
        }, {
            v: "text",
            RU: "РЎСЃС‹Р»РєР° СЃРѕ СЃС‚СЂРµР»РєРѕР№",
            EN: "Link with arrow"
        }]
    } : "buttonsizedef" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ РєРЅРѕРїРєРё",
            EN: "Button size"
        },
        options: [{
            v: "sm",
            RU: "РЈРјРµРЅСЊС€РµРЅРЅС‹Р№",
            EN: "Small"
        }, {
            v: "",
            RU: "РЎС‚Р°РЅРґР°СЂС‚РЅС‹Р№",
            EN: "Default"
        }]
    } : "buttonstat" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћС‚РїСЂР°РІР»СЏС‚СЊ РґР°РЅРЅС‹Рµ Рѕ РєР»РёРєРµ РІ СЃРёСЃС‚РµРјСѓ Р°РЅР°Р»РёС‚РёРєРё",
            EN: "Send data to analytics systems when button is clicked"
        }
    } : "paddingtop" == e ? t = {
        type: "sb",
        label: {
            RU: "РћС‚СЃС‚СѓРї СЃРІРµСЂС…Сѓ",
            EN: "Top Padding"
        },
        options: [{
            v: "-56px",
            EN: "- 2 line (-56px)"
        }, {
            v: "-42px",
            EN: "- 1.5 line (-42px)"
        }, {
            v: "-28px",
            EN: "- 1 line (-28px)"
        }, {
            v: "-14px",
            EN: "- 0.5 line (-14px)"
        }, {
            v: "",
            EN: "Default"
        }, {
            v: "14px",
            EN: "0.5 line (14px)"
        }, {
            v: "28px",
            EN: "1 line (28px)"
        }, {
            v: "42px",
            EN: "1.5 line (42px)"
        }, {
            v: "56px",
            EN: "2 line (56px)"
        }, {
            v: "84px",
            EN: "3 line (84px)"
        }, {
            v: "112px",
            EN: "4 line (112px)"
        }, {
            v: "140px",
            EN: "5 line (140px)"
        }]
    } : "paddingbottom" == e ? t = {
        type: "sb",
        label: {
            RU: "РћС‚СЃС‚СѓРї СЃРЅРёР·Сѓ",
            EN: "Bottom Padding"
        },
        options: [{
            v: "-56px",
            EN: "- 2 line (-56px)"
        }, {
            v: "-42px",
            EN: "- 1.5 line (-42px)"
        }, {
            v: "-28px",
            EN: "- 1 line (-28px)"
        }, {
            v: "-14px",
            EN: "- 0.5 line (-14px)"
        }, {
            v: "",
            EN: "default"
        }, {
            v: "14px",
            EN: "0.5 line (14px)"
        }, {
            v: "28px",
            EN: "1 line (28px)"
        }, {
            v: "42px",
            EN: "1.5 line (42px)"
        }, {
            v: "56px",
            EN: "2 line (56px)"
        }, {
            v: "84px",
            EN: "3 line (84px)"
        }, {
            v: "112px",
            EN: "4 line (112px)"
        }, {
            v: "140px",
            EN: "5 line (140px)"
        }]
    } : "displayblock" == e ? t = {
        type: "sb",
        label: {
            RU: "РћС‚РѕР±СЂР°Р¶РµРЅРёРµ Р±Р»РѕРєР°",
            EN: "Display block"
        },
        hint: {
            RU: "Р•СЃР»Рё РІ Р±Р»РѕРєРµ РЅРµС‚ РІРёР·СѓР°Р»СЊРЅС‹С… СЌР»РµРјРµРЅС‚РѕРІ, С‚Рѕ РµРіРѕ РЅСѓР¶РЅРѕ СЃРєСЂС‹РІР°С‚СЊ.",
            EN: "Hide block if it doesn't contain visual elements"
        },
        options: [{
            v: "",
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ Р±Р»РѕРє",
            EN: "Show block"
        }, {
            v: "none",
            RU: "РЎРєСЂС‹РІР°С‚СЊ Р±Р»РѕРє",
            EN: "Hide block"
        }]
    } : "popup_iconcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ РёРєРѕРЅРєРё Р·Р°РєСЂС‹С‚РёСЏ",
            EN: "Close icon color"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "popupstat" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћС‚РїСЂР°РІР»СЏС‚СЊ РґР°РЅРЅС‹Рµ РѕР± РѕС‚РєСЂС‹С‚РёРё РїРѕРїР°РїР° РІ СЃРёСЃС‚РµРјСѓ Р°РЅР°Р»РёС‚РёРєРё",
            EN: "Send data to analytics systems when pop-up is opened"
        }
    } : "top" == e ? t = {
        type: "in_px",
        label: {
            RU: "РЎРІРµСЂС…Сѓ",
            EN: "Top"
        },
        hint: {
            EN: "Example: 20px"
        }
    } : "mapstyle" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎС‚РёР»СЊ google-РєР°СЂС‚С‹",
            EN: "Google Map Style"
        },
        options: [{
            v: "",
            RU: "РљР°Рє РѕР±С‹С‡РЅРѕ",
            EN: "Default"
        }, {
            v: "bw_light",
            RU: "Р§Р‘ СЃРІРµС‚Р»Р°СЏ",
            EN: "B&W Light"
        }, {
            v: "bw_dark",
            RU: "Р§Р‘ С‚РµРјРЅР°СЏ",
            EN: "B&W Dark"
        }]
    } : "maplang" == e ? t = {
        type: "in",
        label: {
            RU: "РЇР·С‹Рє РёРЅС‚РµСЂС„РµР№СЃР° РєР°СЂС‚С‹",
            EN: "Map UI language"
        },
        ph: {
            EN: "EN"
        },
        hint: {
            EN: "Example: EN"
        }
    } : "position_alignxy" == e ? t = {
        type: "sb",
        label: {
            RU: "РџРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ, РІС‹СЂР°РІРЅРёРІР°РЅРёРµ (РіРѕСЂРёР·РѕРЅС‚Р°Р»СЊ, РІРµСЂС‚РёРєР°Р»СЊ)",
            EN: "Position, alignment (horizontal, vertical)"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ/РЅРµ Р·Р°РґР°РЅРѕ",
            EN: "Default/not set"
        }, {
            v: "left top",
            RU: "Р›РµРІРѕ Р’РµСЂС…",
            EN: "Top Left"
        }, {
            v: "center top",
            RU: "Р¦РµРЅС‚СЂ Р’РµСЂС…",
            EN: "Top Center"
        }, {
            v: "right top",
            RU: "РџСЂР°РІРѕ Р’РµСЂС…",
            EN: "Top Right"
        }, {
            v: "left center",
            RU: "Р›РµРІРѕ Р¦РµРЅС‚СЂ",
            EN: "Center Left"
        }, {
            v: "center center",
            RU: "Р¦РµРЅС‚СЂ Р¦РµРЅС‚СЂ",
            EN: "Center Center"
        }, {
            v: "right center",
            RU: "РџСЂР°РІРѕ Р¦РµРЅС‚СЂ",
            EN: "Center Right"
        }, {
            v: "left bottom",
            RU: "Р›РµРІРѕ РќРёР·",
            EN: "Bottom Left"
        }, {
            v: "center bottom",
            RU: "Р¦РµРЅС‚СЂ РќРёР·",
            EN: "Bottom Center"
        }, {
            v: "right bottom",
            RU: "РџСЂР°РІРѕ РќРёР·",
            EN: "Bottom Right"
        }]
    } : "linesize" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р Р°Р·РјРµСЂ(С‚РѕР»С‰РёРЅР°) Р»РёРЅРёРё",
            EN: "Line size (width)"
        },
        ph: {
            EN: "2px"
        }
    } : "input1" == e ? t = {
        type: "in",
        label: {
            EN: "Input1"
        }
    } : "checkbox2" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox2"
        }
    } : "input2" == e ? t = {
        type: "in",
        label: {
            EN: "Input2"
        }
    } : "vposition_trigger" == e ? t = {
        type: "sb",
        label: {
            RU: "РљРѕРіРґР° СЃСЂР°Р±Р°С‚С‹РІР°С‚СЊ РїСЂРё РїРѕСЏРІР»РµРЅРёРё Р±Р»РѕРєР° РІ РѕРєРЅРµ",
            EN: "Block vertical position trigger"
        },
        options: [{
            v: "",
            RU: "РџСЂРё РїРѕСЏРІР»РµРЅРёРё (РЅРёР·)",
            EN: "on Enter"
        }, {
            v: "onmiddle",
            RU: "Р’ СЃРµСЂРµРґРёРЅРµ",
            EN: "on Middle"
        }, {
            v: "onleave",
            RU: "РџСЂРё РїРѕРєРёРґР°РЅРёРё (РІРµСЂС…)",
            EN: "on Leave"
        }]
    } : "cookie_name" == e ? t = {
        type: "in",
        label: {
            RU: "Cookie name (РќР°Р·РІР°РЅРёРµ РїРµСЂРµРјРµРЅРЅРѕР№)",
            EN: "Cookie name"
        },
        ph: {
            EN: "myname"
        }
    } : "cookie_time" == e ? t = {
        type: "in",
        label: {
            RU: "Cookie life time (РќР° РєР°РєРѕРµ РІСЂРµРјСЏ СЃС‚Р°РІРёС‚СЃСЏ РєСѓРєР°)(РІ РґРЅСЏС…)",
            EN: "Cookie life time (in days)"
        },
        ph: {
            EN: "1"
        },
        hint: {
            RU: "(С‡РёСЃР»Рѕ РґРѕР»Р¶РЅРѕ Р±С‹С‚СЊ Р±РѕР»СЊС€Рµ 0. Р•СЃР»Рё РїРѕСЃС‚Р°РІРёС‚СЊ 0 - С‚Рѕ РєСѓРєР° СѓРґР°Р»РёС‚СЃСЏ РїРѕСЃР»Рµ Р·Р°РєСЂС‹С‚РёСЏ Р±СЂР°СѓР·РµСЂР°. Р•СЃР»Рё РѕС‚СЃС‚Р°РІРёС‚СЊ РїСѓСЃС‚С‹Рј, Р·Р°РїРёСЃСЊ РІ РєСѓРєРё РЅРµ Р±СѓРґРµС‚)",
            EN: "(number must be bigger than 0. If 0 is used, cookie file will be deleted once the browser window is closed. If left empty, cookie won't be recorded)"
        }
    } : "timer" == e ? t = {
        type: "in",
        label: {
            RU: "РўР°Р№РјРµСЂ (РІ СЃРµРєСѓРЅРґР°С…)",
            EN: "Timer (in seconds)"
        },
        ph: {
            EN: "60"
        }
    } : "leftleft" == e ? t = {
        type: "in_px",
        label: {
            RU: "РЎР»РµРІР°",
            EN: "Left"
        },
        hint: {
            EN: "Example: 20px"
        }
    } : "rightright" == e ? t = {
        type: "in_px",
        label: {
            RU: "РЎРїСЂР°РІР°",
            EN: "Right"
        },
        hint: {
            EN: "Example: 20px"
        }
    } : "alignlc" == e ? t = {
        type: "sb",
        label: {
            RU: "Р’С‹СЂР°РІРЅРёРІР°РЅРёРµ",
            EN: "Alignment"
        },
        options: [{
            v: "left",
            RU: "РџРѕ Р»РµРІРѕРјСѓ РєСЂР°СЋ",
            EN: "Left"
        }, {
            v: "center",
            RU: "РџРѕ С†РµРЅС‚СЂСѓ",
            EN: "Center"
        }]
    } : "popup_bgcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р—Р°С‚РµРјРЅРµРЅРёРµ С„РѕРЅР°: С†РІРµС‚",
            EN: "Overlay: Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "popup_bgopacity" == e ? t = {
        type: "sb",
        label: {
            RU: "Р—Р°С‚РµРјРЅРµРЅРёРµ С„РѕРЅР°: РЅРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Overlay: Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "95",
            EN: "95%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "bottom" == e ? t = {
        type: "in_px",
        label: {
            RU: "РЎРЅРёР·Сѓ",
            EN: "Bottom"
        },
        hint: {
            EN: "Example: 20px"
        }
    } : "menu_position" == e ? t = {
        type: "sb",
        label: {
            RU: "РџРѕРІРµРґРµРЅРёРµ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёСЏ РјРµРЅСЋ",
            EN: "Menu position behavior"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "static",
            RU: "РЎС‚Р°С‚РёРєР°",
            EN: "Static"
        }, {
            v: "absolute",
            RU: "РЎ РЅР°Р»РѕР¶РµРЅРёРµРј РЅР° СЃР»РµРґСѓСЋС‰РёР№ Р±Р»РѕРє, РЅРѕ Р±РµР· С„РёРєСЃРёСЂРѕРІР°РЅРёСЏ",
            EN: "Absolute (overlapping next block, not fixed)"
        }, {
            v: "fixed",
            RU: "Р¤РёРєСЃР°С†РёСЏ РїСЂРё СЃРєСЂРѕР»Р»Рµ",
            EN: "Fixed on scroll"
        }]
    } : "menu_height" == e ? t = {
        type: "in_vh",
        label: {
            RU: "Р’С‹СЃРѕС‚Р° РјРµРЅСЋ",
            EN: "Menu height"
        },
        ph: {
            EN: "70px"
        }
    } : "menu_appearoffset" == e ? t = {
        type: "in_px",
        label: {
            RU: "РџРѕСЏРІР»РµРЅРёРµ РјРµРЅСЋ РїСЂРё РїСЂРѕРєСЂСѓС‚РєРµ С‡РµСЂРµР· N РїРёРєСЃРµР»РµР№",
            EN: "Reveal menu when the page is scrolled down N pixels"
        },
        ph: {
            EN: "500px"
        },
        hint: {
            RU: "РЎСЂР°Р±Р°С‚С‹РІР°РµС‚, РµСЃР»Рё СѓСЃС‚Р°РЅРѕРІРёС‚СЊ С„РёРєСЃРёСЂРѕРІР°РЅРЅРѕРµ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ",
            EN: "Triggered if you set a fixed positioning"
        }
    } : "menu_container" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ РєРѕРЅС‚РµР№РЅРµСЂР° РјРµРЅСЋ",
            EN: "Menu container width"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ: С€РёСЂРёРЅР° 100%",
            EN: "Default. 100% width"
        }, {
            v: "12",
            RU: "12 РєРѕР»РѕРЅРѕРє",
            EN: "12 columns"
        }]
    } : "menu_bgcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР° РјРµРЅСЋ",
            EN: "Menu background color"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "menu_bgopacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ С„РѕРЅР° РјРµРЅСЋ",
            EN: "Menu background opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "95",
            EN: "95%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "menu_bgopacity2" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ С„РѕРЅР° РјРµРЅСЋ РїРѕСЃР»Рµ РЅР°С‡Р°Р»Р° СЃРєСЂРѕР»Р»Р°",
            EN: "Menu background opacity on scroll"
        },
        hint: {
            RU: "РЎСЂР°Р±Р°С‚С‹РІР°РµС‚, РµСЃР»Рё СѓСЃС‚Р°РЅРѕРІРёС‚СЊ С„РёРєСЃРёСЂРѕРІР°РЅРЅРѕРµ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ",
            EN: "Triggered if you set a fixed positioning"
        },
        options: [{
            v: "",
            RU: "РќРµ Р·Р°РґР°РЅРѕ",
            EN: "Not set"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "menu_shadow" == e ? t = {
        type: "sb",
        label: {
            RU: "РўРµРЅСЊ РјРµРЅСЋ",
            EN: "Menu shadow"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "bgcolor_editor" == e ? t = {
        type: "sb",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР° Р±Р»РѕРєР° РІ СЂРµР¶РёРјРµ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ",
            EN: "Block background color in the edit mode"
        },
        hint: {
            RU: "Р­С‚РѕС‚ С†РІРµС‚ РЅРµ РїСЂРёРјРµРЅСЏРµС‚СЃСЏ РґР»СЏ РїСѓР±Р»РёРєР°С†РёРё. РЈСЃС‚Р°РЅРѕРІРёС‚Рµ РµРіРѕ, РµСЃР»Рё СЌР»РµРјРµРЅС‚С‹ Р±Р»РѕРєР° СЃР»РёРІР°СЋС‚СЃСЏ СЃ С„РѕРЅРѕРј РІ СЂРµРґР°РєС‚РѕСЂРµ вЂ” С‚Р°РєРёРј РѕР±СЂР°Р·РѕРј Р±Р»РѕРє Р±СѓРґРµС‚ Р»РµРіС‡Рµ СЂРµРґР°РєС‚РёСЂРѕРІР°С‚СЊ.",
            EN: "This color is not applied to the published website. Set only if the block elements merge with the background color вЂ” this way it will be easier to edit them."
        },
        options: [{
            v: "",
            RU: "РќРµ Р·Р°РґР°РЅРѕ",
            EN: "Not set"
        }, {
            v: "chess",
            RU: "РЁР°С…РјР°С‚РЅР°СЏ СЂР°СЃС†РІРµС‚РєР°",
            EN: "Checkerboard pattern"
        }, {
            v: "black",
            RU: "Р§РµСЂРЅС‹Р№",
            EN: "Black"
        }, {
            v: "white",
            RU: "Р‘РµР»С‹Р№",
            EN: "White"
        }]
    } : "menu_textcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С‚РµРєСЃС‚Р° РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ",
            EN: "Menu items text color"
        },
        ph: {
            EN: "#000000"
        }
    } : "menu_align" == e ? t = {
        type: "sb",
        label: {
            RU: "Р’С‹СЂР°РІРЅРёРІР°РЅРёРµ РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ",
            EN: "Menu items alignment"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "left",
            RU: "РџРѕ Р»РµРІРѕРјСѓ РєСЂР°СЋ",
            EN: "Left"
        }, {
            v: "center",
            RU: "РџРѕ С†РµРЅС‚СЂСѓ",
            EN: "Center"
        }, {
            v: "right",
            RU: "РџРѕ РїСЂР°РІРѕРјСѓ РєСЂР°СЋ",
            EN: "Right"
        }]
    } : "menu_spacing" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°СЃСЃС‚РѕСЏРЅРёРµ РјРµР¶РґСѓ РїСѓРЅРєС‚Р°РјРё РјРµРЅСЋ",
            EN: "Spacing between menu items"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100px"
        }, {
            v: "90",
            EN: "90px"
        }, {
            v: "80",
            EN: "80px"
        }, {
            v: "70",
            EN: "70px"
        }, {
            v: "60",
            EN: "60px"
        }, {
            v: "50",
            EN: "50px"
        }, {
            v: "40",
            EN: "40px"
        }, {
            v: "30",
            EN: "30px"
        }, {
            v: "20",
            EN: "20px"
        }, {
            v: "10",
            EN: "10px"
        }, {
            v: "0",
            EN: "0px"
        }]
    } : "menu_uppercase" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р’СЃРµ РїСѓРЅРєС‚С‹ РјРµРЅСЋ Р·Р°РіР»Р°РІРЅС‹РјРё Р±СѓРєРІР°РјРё",
            EN: "Menu items uppercase"
        }
    } : "menu_fontsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р Р°Р·РјРµСЂ С‚РµРєСЃС‚Р° РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ",
            EN: "Menu items font size"
        },
        ph: {
            EN: "20px"
        }
    } : "menu_fontfamily" == e ? t = {
        type: "ff",
        label: {
            RU: "РЁСЂРёС„С‚ РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ",
            EN: "Menu items font family name"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "Arial",
            EN: "Arial"
        }, {
            v: "Georgia",
            EN: "Georgia"
        }]
    } : "menu_fontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ",
            EN: "Menu items font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "menu_letterspacing" == e ? t = {
        type: "sb",
        label: {
            RU: "РњРµР¶Р±СѓРєРІРµРЅРЅРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ Сѓ РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ",
            EN: "Menu items letter spacing"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "0.5px",
            EN: "0.5px"
        }, {
            v: "1px",
            EN: "1px"
        }, {
            v: "1.5px",
            EN: "1.5px"
        }, {
            v: "2px",
            EN: "2px"
        }, {
            v: "2.5px",
            EN: "2.5px"
        }, {
            v: "3px",
            EN: "3px"
        }]
    } : "menu_itembg" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР° РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ",
            EN: "Menu items background color"
        },
        ph: {
            EN: "#000000"
        }
    } : "menu_itemopacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ РїСѓРЅРєС‚Р° РјРµРЅСЋ",
            EN: "Menu items opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "95",
            EN: "95%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "menu_itemradius" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р Р°РґРёСѓСЃ СЃРєСЂСѓРіР»РµРЅРёСЏ С„РѕРЅР° РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ",
            EN: "Menu items background radius"
        },
        ph: {
            EN: "20px"
        }
    } : "menu_itembordercolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border color"
        },
        ph: {
            EN: "#000000"
        }
    } : "menu_itembordersize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРѕР»С‰РёРЅР° Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border width"
        },
        ph: {
            EN: "1px"
        },
        split: "menu_itembordercolor"
    } : "menu_active_textcolor" == e ? t = {
        type: "co",
        label: {
            RU: "РђРєС‚РёРІРЅС‹Р№ РїСѓРЅРєС‚ РјРµРЅСЋ: Р¦РІРµС‚ РїСѓРЅРєС‚Р°",
            EN: "Active menu item: РЎolor"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "menu_active_fontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "РђРєС‚РёРІРЅС‹Р№ РїСѓРЅРєС‚ РјРµРЅСЋ: РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ",
            EN: "Active menu item: Font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "menu_active_opacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РђРєС‚РёРІРЅС‹Р№ РїСѓРЅРєС‚ РјРµРЅСЋ: РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Active menu item: Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "95",
            EN: "95%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "menu_active_textunderlineheight" == e ? t = {
        type: "sb",
        label: {
            RU: "РђРєС‚РёРІРЅС‹Р№ РїСѓРЅРєС‚ РјРµРЅСЋ: РїРѕРґС‡РµСЂРєРЅСѓС‚СЊ РїСѓРЅРєС‚ РјРµРЅСЋ",
            EN: "Active menu item: Underlined"
        },
        options: [{
            v: "",
            RU: "Р‘РµР· РїРѕРґС‡РµСЂРєРёРІР°РЅРёСЏ",
            EN: "Without underline"
        }, {
            v: "1",
            EN: "1px"
        }, {
            v: "2",
            EN: "2px"
        }, {
            v: "3",
            EN: "3px"
        }, {
            v: "4",
            EN: "4px"
        }, {
            v: "5",
            EN: "5px"
        }]
    } : "menu_active_textunderlinecolor" == e ? t = {
        type: "co",
        label: {
            RU: "РђРєС‚РёРІРЅС‹Р№ РїСѓРЅРєС‚ РјРµРЅСЋ: Р¦РІРµС‚ РїРѕРґС‡РµСЂРєРёРІР°РЅРёСЏ РїСѓРЅРєС‚Р°",
            EN: "Active menu item: Underline color"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "menu_active_textstrike" == e ? t = {
        type: "cb",
        caption: {
            RU: "РђРєС‚РёРІРЅС‹Р№ РїСѓРЅРєС‚ РјРµРЅСЋ: Р—Р°С‡РµСЂРєРЅСѓС‚СЊ РїСѓРЅРєС‚ РјРµРЅСЋ",
            EN: "Active menu item: Strikethrough"
        }
    } : "menu_active_itembg" == e ? t = {
        type: "co",
        label: {
            RU: "РђРєС‚РёРІРЅС‹Р№ РїСѓРЅРєС‚ РјРµРЅСЋ: Р¦РІРµС‚ С„РѕРЅР°",
            EN: "Active menu item: Background color"
        },
        ph: {
            EN: "#000000"
        }
    } : "menu_active_itembordercolor" == e ? t = {
        type: "co",
        label: {
            RU: "РђРєС‚РёРІРЅС‹Р№ РїСѓРЅРєС‚: Р¦РІРµС‚ Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Active menu item: Border color"
        },
        ph: {
            EN: "#000000"
        }
    } : "menu_active_itembordersize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РђРєС‚РёРІРЅС‹Р№ РїСѓРЅРєС‚: РўРѕР»С‰РёРЅР° Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Active menu item: Border width"
        },
        ph: {
            EN: "3px"
        },
        split: "menu_active_itembordercolor"
    } : "menu_hover_textcolor" == e ? t = {
        type: "co",
        label: {
            RU: "РџСЂРё РЅР°РІРµРґРµРЅРёРё: Р¦РІРµС‚ РїСѓРЅРєС‚Р° РјРµРЅСЋ",
            EN: "On hover: Item color"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "menu_hover_textopacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РџСЂРё РЅР°РІРµРґРµРЅРёРё: РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ РїСѓРЅРєС‚Р° РјРµРЅСЋ",
            EN: "On hover: Item opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "95",
            EN: "95%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "menu_hover_textunderlineheight" == e ? t = {
        type: "sb",
        label: {
            RU: "РџСЂРё РЅР°РІРµРґРµРЅРёРё: РїРѕРґС‡РµСЂРєРЅСѓС‚СЊ РїСѓРЅРєС‚ РјРµРЅСЋ",
            EN: "On hover: Menu item underlined"
        },
        options: [{
            v: "",
            RU: "Р‘РµР· РїРѕРґС‡РµСЂРєРёРІР°РЅРёСЏ",
            EN: "Without underline"
        }, {
            v: "1",
            EN: "1px"
        }, {
            v: "2",
            EN: "2px"
        }, {
            v: "3",
            EN: "3px"
        }, {
            v: "4",
            EN: "4px"
        }, {
            v: "5",
            EN: "5px"
        }]
    } : "menu_hover_textunderlinecolor" == e ? t = {
        type: "co",
        label: {
            RU: "РџСЂРё РЅР°РІРµРґРµРЅРёРё: Р¦РІРµС‚ РїРѕРґС‡РµСЂРєРёРІР°РЅРёСЏ",
            EN: "On hover: Underline color"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "menu_hover_textstrike" == e ? t = {
        type: "cb",
        caption: {
            RU: "РџСЂРё РЅР°РІРµРґРµРЅРёРё: Р—Р°С‡РµСЂРєРЅСѓС‚СЊ РїСѓРЅРєС‚ РјРµРЅСЋ",
            EN: "On hover: Menu item strikethrough"
        }
    } : "checkbox3" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox3"
        }
    } : "reverse" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћР±СЂР°С‚РЅС‹Р№ РїРѕСЂСЏРґРѕРє",
            EN: "Reverse order"
        }
    } : "imgheight" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р’С‹СЃРѕС‚Р° РёР·РѕР±СЂР°Р¶РµРЅРёСЏ",
            EN: "Image height"
        },
        ph: {
            EN: "120px"
        }
    } : "checkbox5" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox5"
        }
    } : "dateformat" == e ? t = {
        type: "sb",
        label: {
            RU: "Р¤РѕСЂРјР°С‚ РґР°С‚С‹",
            EN: "Date format"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "1",
            RU: "РњРњ-Р”Р”-Р“Р“Р“Р“",
            EN: "MM-DD-YYYY"
        }, {
            v: "2",
            RU: "Р”Р”-РњРњ-Р“Р“Р“Р“",
            EN: "DD-MM-YYYY"
        }, {
            v: "3",
            RU: "Р”Р”/РњРњ/Р“Р“Р“Р“",
            EN: "DD/MM/YYYY"
        }, {
            v: "4",
            RU: "Р”Р”.РњРњ.Р“Р“Р“Р“",
            EN: "DD.MM.YYYY"
        }, {
            v: "5",
            RU: "РњРµСЃСЏС† Р”Р”, Р“Р“Р“Р“",
            EN: "Month DD, YYYY"
        }, {
            v: "6",
            RU: "Р”Р” РјРµСЃСЏС† Р“Р“Р“Р“",
            EN: "DD month YYYY"
        }]
    } : "timeformat" == e ? t = {
        type: "sb",
        label: {
            RU: "Р¤РѕСЂРјР°С‚ РІСЂРµРјСЏ",
            EN: "Time format"
        },
        options: [{
            v: "",
            RU: "РќРµ РїРѕРєР°Р·С‹РІР°С‚СЊ",
            EN: "Don't show"
        }, {
            v: "1",
            RU: "Р§Р§:РјРј",
            EN: "HH:mm"
        }]
    } : "buttonsize" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ РєРЅРѕРїРєРё",
            EN: "Button size"
        },
        options: [{
            v: "sm",
            RU: "РЈРјРµРЅСЊС€РµРЅРЅС‹Р№",
            EN: "Small"
        }, {
            v: "",
            RU: "РЎС‚Р°РЅРґР°СЂС‚РЅС‹Р№",
            EN: "Default"
        }, {
            v: "lg",
            RU: "РЈРІРµР»РёС‡РµРЅРЅС‹Р№",
            EN: "Large"
        }, {
            v: "xl",
            RU: "Р‘РѕР»СЊС€РѕР№",
            EN: "X-Large"
        }, {
            v: "xxl",
            RU: "Р“РёРіР°РЅС‚СЃРєРёР№",
            EN: "XX-Large"
        }]
    } : "btneffect" == e ? t = {
        type: "sb",
        label: {
            RU: "Р­С„С„РµРєС‚ РґР»СЏ РєРЅРѕРїРєРё",
            EN: "Button effect"
        },
        options: [{
            v: "",
            RU: "РќРµС‚",
            EN: "None"
        }, {
            v: "st1",
            EN: "Flash"
        }, {
            v: "st2",
            EN: "Ripple"
        }, {
            v: "st3",
            EN: "Light"
        }]
    } : "buttoncolor2" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С‚РµРєСЃС‚Р°",
            EN: "Text color"
        },
        ph: {
            EN: "#000000"
        },
        uplabel: {
            RU: "Р’С‚РѕСЂР°СЏ РљРЅРѕРїРєР°",
            EN: "Second Button"
        }
    } : "buttonbgcolor2" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР°",
            EN: "Background color"
        },
        ph: {
            EN: "#ffffff"
        },
        split: "buttoncolor2"
    } : "buttonbordercolor2" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border color"
        },
        ph: {
            EN: "#000000"
        }
    } : "buttonbordersize2" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРѕР»С‰РёРЅР° Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border width"
        },
        ph: {
            EN: "3px"
        },
        split: "buttonbordercolor2"
    } : "buttoncolor3" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С‚РµРєСЃС‚Р°",
            EN: "Text color"
        },
        ph: {
            EN: "#000000"
        },
        uplabel: {
            RU: "РўСЂРµС‚СЊСЏ РљРЅРѕРїРєР°",
            EN: "Third Button"
        }
    } : "buttonbgcolor3" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР°",
            EN: "Background color"
        },
        ph: {
            EN: "#ffffff"
        },
        split: "buttoncolor3"
    } : "buttonbordercolor3" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border color"
        },
        ph: {
            EN: "#000000"
        }
    } : "buttonbordersize3" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРѕР»С‰РёРЅР° Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border width"
        },
        ph: {
            EN: "3px"
        },
        split: "buttonbordercolor3"
    } : "buttonstat2" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћС‚РїСЂР°РІР»СЏС‚СЊ РґР°РЅРЅС‹Рµ Рѕ РєР»РёРєРµ РЅР° РІС‚РѕСЂСѓСЋ РєРЅРѕРїРєСѓ РІ СЃРёСЃС‚РµРјСѓ Р°РЅР°Р»РёС‚РёРєРё",
            EN: "Send data to analytics systems when second button is clicked"
        }
    } : "buttonstat3" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћС‚РїСЂР°РІР»СЏС‚СЊ РґР°РЅРЅС‹Рµ Рѕ РєР»РёРєРµ РЅР° С‚СЂРµС‚СЊСЋ РєРЅРѕРїРєСѓ РІ СЃРёСЃС‚РµРјСѓ Р°РЅР°Р»РёС‚РёРєРё",
            EN: "Send data to analytics systems when third button is clicked"
        }
    } : "allbuttonsstat" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћС‚РїСЂР°РІР»СЏС‚СЊ РґР°РЅРЅС‹Рµ Рѕ РєР»РёРєРµ РЅР° РєРЅРѕРїРєРё РІ СЃРёСЃС‚РµРјСѓ Р°РЅР°Р»РёС‚РёРєРё",
            EN: "Send data to analytics systems when buttons are clicked"
        }
    } : "btneffect2" == e ? t = {
        type: "sb",
        label: {
            RU: "Р­С„С„РµРєС‚ РґР»СЏ РІС‚РѕСЂРѕР№ РєРЅРѕРїРєРё",
            EN: "Second button effect"
        },
        options: [{
            v: "",
            RU: "РќРµС‚",
            EN: "None"
        }, {
            v: "st1",
            EN: "Flash"
        }, {
            v: "st2",
            EN: "Ripple"
        }, {
            v: "st3",
            EN: "Light"
        }]
    } : "btneffect3" == e ? t = {
        type: "sb",
        label: {
            RU: "Р­С„С„РµРєС‚ РґР»СЏ С‚СЂРµС‚СЊРµР№ РєРЅРѕРїРєРё",
            EN: "Third button effect"
        },
        options: [{
            v: "",
            RU: "РќРµС‚",
            EN: "None"
        }, {
            v: "st1",
            EN: "Flash"
        }, {
            v: "st2",
            EN: "Ripple"
        }, {
            v: "st3",
            EN: "Light"
        }]
    } : "inputcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С‚РµРєСЃС‚Р°",
            EN: "Text color"
        },
        ph: {
            EN: "#000000"
        }
    } : "inputbgcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР°",
            EN: "Background color"
        },
        ph: {
            EN: "#ffffff"
        },
        split: "inputcolor"
    } : "inputbordercolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border color"
        },
        ph: {
            EN: "#000000"
        }
    } : "inputbordersize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРѕР»С‰РёРЅР° Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border width"
        },
        ph: {
            EN: "3px"
        },
        split: "inputbordercolor"
    } : "inputradius" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р Р°РґРёСѓСЃ СЃРєСЂСѓРіР»РµРЅРёСЏ Р±РѕСЂРґСЋСЂР°",
            EN: "Border radius"
        },
        ph: {
            EN: "30px"
        }
    } : "inputelscolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ РіР°Р»РѕС‡РєРё, РїРµСЂРµРєР»СЋС‡Р°С‚РµР»РµР№ Рё РґСЂ. СЌР»РµРјРµРЅС‚РѕРІ",
            EN: "Color for checkbox, radio buttons, and other elements"
        },
        ph: {
            EN: "#3f51b5"
        }
    } : "show_onhover" == e ? t = {
        type: "sb",
        label: {
            RU: "Р’РёРґРёРјРѕСЃС‚СЊ РєРѕРЅС‚РµРЅС‚Р° РїСЂРё РЅР°РІРµРґРµРЅРёРё РјС‹С€РєРѕР№",
            EN: "Content visibility on hover"
        },
        options: [{
            v: "",
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ РєРѕРЅС‚РµРЅС‚ СЃСЂР°Р·Сѓ РєР°Рє РѕР±С‹С‡РЅРѕ",
            EN: "Show content as usual"
        }, {
            v: "onhover",
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ РєРѕРЅС‚РµРЅС‚ С‚РѕР»СЊРєРѕ РїСЂРё РЅР°РІРµРґРµРЅРёРё РјС‹С€РєРѕР№",
            EN: "Show content on mouse hover"
        }]
    } : "anim_imgzoom" == e ? t = {
        type: "sb",
        label: {
            RU: "РђРЅРёРјР°С†РёСЏ СѓРІРµР»РёС‡РµРЅРёСЏ РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Scale animation on hover"
        },
        options: [{
            v: "",
            RU: "РќРµС‚",
            EN: "None"
        }, {
            v: "scale",
            RU: "РЈРІРµР»РёС‡РµРЅРёРµ",
            EN: "Scale"
        }]
    } : "anim_hover" == e ? t = {
        type: "sb",
        label: {
            RU: "РђРЅРёРјР°С†РёСЏ РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Hover animation"
        },
        options: [{
            v: "",
            RU: "РќРµС‚",
            EN: "None"
        }, {
            v: "bottomtop",
            RU: "РЎРЅРёР·Сѓ РІРІРµСЂС…",
            EN: "Bottom to top"
        }]
    } : "inputname" == e ? t = {
        type: "in",
        label: {
            RU: "РРјСЏ РїРµСЂРµРјРµРЅРЅРѕР№",
            EN: "Variable Name"
        },
        hint: {
            RU: "РСЃРїРѕР»СЊР·СѓР№С‚Рµ, РїРѕР¶Р°Р»СѓР№СЃС‚Р°, Р»Р°С‚РёРЅСЃРєРёРµ Р±СѓРєРІС‹"
        },
        uplabel: {
            RU: "РџРѕР»Рµ РґР»СЏ РІРІРѕРґР°:",
            EN: "Input:"
        }
    } : "bgcolor2" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР° 2",
            EN: "Background color 2"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "inputtitlecolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С‚РµРєСЃС‚Р°",
            EN: "Text color"
        },
        ph: {
            EN: "#000000"
        }
    } : "menu_height2" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р’С‹СЃРѕС‚Р° РјРµРЅСЋ 2",
            EN: "Menu height 2"
        },
        ph: {
            EN: "70px"
        }
    } : "checkbox6" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox6"
        }
    } : "checkbox7" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox7"
        }
    } : "checkbox8" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox8"
        }
    } : "checkbox9" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox9"
        }
    } : "checkbox10" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox10"
        }
    } : "checkbox11" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox11"
        }
    } : "checkbox12" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox12"
        }
    } : "checkbox13" == e ? t = {
        type: "cb",
        caption: {
            EN: "checkbox13"
        }
    } : "sociallinks_color" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ РёРєРѕРЅРѕРє СЃРѕ СЃСЃС‹Р»РєР°РјРё РЅР° СЃРѕС†.СЃРµС‚Рё",
            EN: "Color of social media icons"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "sociallinks_shape" == e ? t = {
        type: "sb",
        label: {
            EN: "Social link icons style",
            RU: "РЎС‚РёР»СЊ РёРєРѕРЅРѕРє СЃРѕ СЃСЃС‹Р»РєР°РјРё РЅР° СЃРѕС†СЃРµС‚Рё"
        },
        options: [{
            v: "",
            EN: "In circle (by default)",
            RU: "Р’ РєСЂСѓРіРµ (РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ)"
        }, {
            v: "simple",
            EN: "Without circle",
            RU: "Р‘РµР· РєСЂСѓРіР°"
        }]
    } : "sociallinks_brandcolor" == e ? t = {
        type: "cb",
        caption: {
            RU: "РСЃРїРѕР»СЊР·РѕРІР°С‚СЊ Р±СЂРµРЅРґРѕРІС‹Рµ С†РІРµС‚Р° РґР»СЏ С„РѕРЅР° РєРЅРѕРїРєРё",
            EN: "Use brand colors for the button background"
        }
    } : "container_width" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ РєРѕРЅС‚РµР№РЅРµСЂР°",
            EN: "Container width"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ: С€РёСЂРёРЅР° 100%",
            EN: "Default: 100% width"
        }, {
            v: "40",
            RU: "100% СЃ РѕС‚СЃС‚СѓРїР°РјРё РІ 40px РїРѕ РєСЂР°СЏРј",
            EN: "100% with 40px edge paddings"
        }, {
            v: "12",
            RU: "12 РєРѕР»РѕРЅРѕРє",
            EN: "12 columns"
        }]
    } : "popup_container" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ РєРѕРЅС‚РµР№РЅРµСЂР°",
            EN: "Container width"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ: 12 РєРѕР»РѕРЅРѕРє",
            EN: "Default: 12 columns"
        }, {
            v: "100",
            RU: "РЁРёСЂРёРЅР° 100%",
            EN: "100% width"
        }],
        role: "tester"
    } : "imgratio" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎРѕРѕС‚РЅРѕС€РµРЅРёРµ СЃС‚РѕСЂРѕРЅ",
            EN: "Aspect Ratio"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "16_9",
            EN: "16:9"
        }, {
            v: "4_3",
            EN: "4:3"
        }, {
            v: "3_2",
            EN: "3:2"
        }, {
            v: "1_1",
            RU: "1:1 РљРІР°РґСЂР°С‚",
            EN: "1:1 Square"
        }, {
            v: "2_3",
            EN: "2:3"
        }, {
            v: "3_4",
            EN: "3:4"
        }, {
            v: "9_16",
            EN: "9:16"
        }]
    } : "columns_padd" == e ? t = {
        type: "sb",
        label: {
            RU: "РћС‚СЃС‚СѓРї РјРµР¶РґСѓ РєРѕР»РѕРЅРєР°РјРё",
            EN: "Paddings between columns"
        },
        options: [{
            v: "",
            EN: "0px"
        }, {
            v: "10",
            EN: "10px"
        }, {
            v: "20",
            EN: "20px"
        }, {
            v: "40",
            EN: "40px"
        }]
    } : "sharestyle" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎС‚РёР»СЊ СЂРµРєРѕРјРµРЅРґР°С‚РµР»СЊРЅС‹С… РєРЅРѕРїРѕРє",
            EN: "Share button style"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "black-white",
            RU: "Р§РµСЂРЅС‹Р№ С„РѕРЅ Рё Р±РµР»С‹Рµ Р±СѓРєРІС‹",
            EN: "Black background and white text"
        }, {
            v: "transp-white",
            RU: "РџСЂРѕР·СЂР°С‡РЅС‹Р№ С„РѕРЅ Рё Р±РµР»С‹Рµ Р±СѓРєРІС‹",
            EN: "Transparent background and white text"
        }, {
            v: "white-black",
            RU: "Р‘РµР»С‹Р№ С„РѕРЅ Рё С‡РµСЂРЅС‹Рµ Р±СѓРєРІС‹",
            EN: "White background and black text"
        }, {
            v: "transp-black",
            RU: "РџСЂРѕР·СЂР°С‡РЅС‹Р№ С„РѕРЅ Рё С‡РµСЂРЅС‹Рµ Р±СѓРєРІС‹",
            EN: "Transparent background and black text"
        }]
    } : "disqus_shortname" == e ? t = {
        type: "in",
        label: {
            EN: "Disqus ShortName"
        },
        hint: {
            RU: "Р§РёС‚Р°Р№С‚Рµ СЂСѓРєРѕРІРѕРґСЃС‚РІРѕ <a href='https://help-ru.tilda.cc/disqus' target='blank' style='color:#fa8669;'>РєР°Рє РїРѕРґРєР»СЋС‡РёС‚СЊ Disqus</a>",
            EN: "Read our guide on <a href='https://help.tilda.cc/disqus' target='blank' style='color:#fa8669;'>connecting Disqus</a>"
        }
    } : "disqus_identifier" == e ? t = {
        type: "in",
        label: {
            EN: "Disqus Identifier"
        }
    } : "inputreq" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћР±СЏР·Р°С‚РµР»СЊРЅРѕРµ РїРѕР»Рµ",
            EN: "Required field"
        }
    } : "inputrule" == e ? t = {
        type: "sb",
        label: {
            RU: "РџСЂР°РІРёР»Рѕ РІР°Р»РёРґР°С†РёРё",
            EN: "Validation rule"
        },
        options: [{
            v: "none",
            RU: "Р‘РµР· РїСЂРѕРІРµСЂРєРё",
            EN: "Without validation"
        }, {
            v: "email",
            EN: "Email"
        }, {
            v: "phone",
            RU: "РўРµР»РµС„РѕРЅ // 0123456789() +-",
            EN: "Phone // 0123456789() +-"
        }]
    } : "inputhiddenname" == e ? t = {
        type: "in",
        label: {
            RU: "РРјСЏ РїРµСЂРµРјРµРЅРЅРѕР№ СЃРєСЂС‹С‚РѕРіРѕ РїРѕР»СЏ РґР»СЏ РІРІРѕРґР°:",
            EN: "Variable name for hidden input:"
        }
    } : "inputhiddenvalue" == e ? t = {
        type: "in",
        label: {
            RU: "Р—РЅР°С‡РµРЅРёРµ РїРµСЂРµРјРµРЅРЅРѕР№ СЃРєСЂС‹С‚РѕРіРѕ РїРѕР»СЏ РґР»СЏ РІРІРѕРґР°:",
            EN: "Variable value for hidden input:"
        }
    } : "inputsstyle" == e ? t = {
        type: "cb",
        caption: {
            RU: "РЎС‚РёР»РёР·РѕРІР°С‚СЊ РїРѕР»СЏ РґР»СЏ РІРІРѕРґР° - С‚РѕР»СЊРєРѕ РЅРёР¶РЅРёР№ Р±РѕСЂРґСЋСЂ",
            EN: "Special style for input fields - only bottom border"
        }
    } : "inputsstyle2" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћСЃС‚Р°РІР»СЏС‚СЊ РїРѕРґСЃРєР°Р·РєСѓ РІРёРґРёРјРѕР№ РїСЂРё РєР»РёРєРµ РЅР° РїРѕР»Рµ",
            EN: "Leave placeholder visible after clicking on input"
        }
    } : "formmsgcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С‚РµРєСЃС‚Р° РІ СЃРѕРѕР±С‰РµРЅРёРё РѕР± СѓСЃРїРµС€РЅРѕР№ РѕС‚РїСЂР°РІРєРµ РґР°РЅРЅС‹С…",
            EN: "Success message text color"
        },
        ph: {
            EN: "#000000"
        }
    } : "formmsgbgcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР° РІ СЃРѕРѕР±С‰РµРЅРёРё РѕР± СѓСЃРїРµС€РЅРѕР№ РѕС‚РїСЂР°РІРєРµ РґР°РЅРЅС‹С…",
            EN: "Success message background color"
        },
        ph: {
            EN: "#45c17d"
        }
    } : "anim_form" == e ? t = {
        type: "sb",
        label: {
            RU: "РђРЅРёРјР°С†РёСЏ: Р¤РѕСЂРјР°",
            EN: "Animation: Form"
        },
        options: [{
            v: "",
            RU: "РќРµС‚",
            EN: "None"
        }, {
            v: "fadein",
            RU: "РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Fade In"
        }, {
            v: "fadeinup",
            RU: "РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ (СЃРЅРёР·Сѓ)",
            EN: "Fade In Up"
        }, {
            v: "fadeindown",
            RU: "РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ (СЃРІРµСЂС…Сѓ)",
            EN: "Fade In Down"
        }, {
            v: "fadeinleft",
            RU: "РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ (СЃРїСЂР°РІР°)",
            EN: "Fade In Left"
        }, {
            v: "fadeinright",
            RU: "РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ (СЃР»РµРІР°)",
            EN: "Fade In Right"
        }, {
            v: "zoomin",
            RU: "РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ (СѓРІРµР»РёС‡РµРЅРёРµ)",
            EN: "Zoom In"
        }]
    } : "anim_number" == e ? t = {
        type: "sb",
        label: {
            RU: "РђРЅРёРјР°С†РёСЏ: Р¦РёС„СЂС‹",
            EN: "Animation: Numbers"
        },
        options: [{
            v: "",
            RU: "РќРµС‚",
            EN: "None"
        }, {
            v: "animatednumber",
            RU: "РђРЅРёРјРёСЂРѕРІР°С‚СЊ",
            EN: "Animate"
        }]
    } : "widthpx" == e ? t = {
        type: "in_px",
        label: {
            RU: "РЁРёСЂРёРЅР°",
            EN: "Width"
        },
        ph: {
            EN: "100px"
        }
    } : "menu_hideoffset" == e ? t = {
        type: "in_px",
        label: {
            RU: "РџСЂСЏС‚Р°С‚СЊ РјРµРЅСЋ РїСЂРё РїСЂРѕРєСЂСѓС‚РєРµ Р·Р° N РїРёРєСЃРµР»РµР№ РґРѕ РЅРёР·Р° СЃС‚СЂР°РЅРёС†С‹",
            EN: "Hide menu when the page is scrolled N pixels down"
        },
        ph: {
            EN: "500px"
        },
        hint: {
            RU: "РЎСЂР°Р±Р°С‚С‹РІР°РµС‚, РµСЃР»Рё СѓСЃС‚Р°РЅРѕРІРёС‚СЊ С„РёРєСЃРёСЂРѕРІР°РЅРЅРѕРµ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ",
            EN: "Triggered if you set a fixed positioning"
        }
    } : "inputname2" == e ? t = {
        type: "in",
        label: {
            RU: "РРјСЏ РїРµСЂРµРјРµРЅРЅРѕР№",
            EN: "Variable Name"
        },
        uplabel: {
            RU: "Р’С‚РѕСЂРѕРµ РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°:",
            EN: "Second Input:"
        }
    } : "inputreq2" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћР±СЏР·Р°С‚РµР»СЊРЅРѕРµ РїРѕР»Рµ",
            EN: "Required field"
        }
    } : "inputrule2" == e ? t = {
        type: "sb",
        label: {
            RU: "РџСЂР°РІРёР»Рѕ РІР°Р»РёРґР°С†РёРё",
            EN: "Validation rule"
        },
        options: [{
            v: "none",
            RU: "Р‘РµР· РїСЂРѕРІРµСЂРєРё",
            EN: "Without validation"
        }, {
            v: "email",
            EN: "Email"
        }, {
            v: "phone",
            RU: "РўРµР»РµС„РѕРЅ // 0123456789() +-",
            EN: "Phone // 0123456789() +-"
        }]
    } : "inputname3" == e ? t = {
        type: "in",
        label: {
            RU: "РРјСЏ РїРµСЂРµРјРµРЅРЅРѕР№",
            EN: "Variable Name"
        },
        uplabel: {
            RU: "РўСЂРµС‚СЊРµ РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°:",
            EN: "Third Input:"
        }
    } : "inputreq3" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћР±СЏР·Р°С‚РµР»СЊРЅРѕРµ РїРѕР»Рµ",
            EN: "Required"
        }
    } : "inputrule3" == e ? t = {
        type: "sb",
        label: {
            RU: "РџСЂР°РІРёР»Рѕ РІР°Р»РёРґР°С†РёРё",
            EN: "Validation rule"
        },
        options: [{
            v: "none",
            RU: "Р‘РµР· РїСЂРѕРІРµСЂРєРё",
            EN: "Without validation"
        }, {
            v: "email",
            EN: "Email"
        }, {
            v: "phone",
            RU: "РўРµР»РµС„РѕРЅ // 0123456789() +-",
            EN: "Phone // 0123456789() +-"
        }]
    } : "balign" == e ? t = {
        type: "sb",
        label: {
            RU: "Р’С‹СЂР°РІРЅРёРІР°РЅРёРµ Р·Р°РіРѕР»РѕРІРѕС‡РЅРѕР№ СЃРµРєС†РёРё Р±Р»РѕРєР°",
            EN: "Block title section alignment"
        },
        options: [{
            v: "left",
            RU: "РџРѕ Р»РµРІРѕРјСѓ РєСЂР°СЋ",
            EN: "Left"
        }, {
            v: "center",
            RU: "РџРѕ С†РµРЅС‚СЂСѓ",
            EN: "Center"
        }, {
            v: "right",
            RU: "РџРѕ РїСЂР°РІРѕРјСѓ РєСЂР°СЋ",
            EN: "Right"
        }]
    } : "formname" == e ? t = {
        type: "in",
        label: {
            RU: "РќР°Р·РІР°РЅРёРµ С„РѕСЂРјС‹",
            EN: "Form name"
        },
        hint: {
            RU: "РџРѕРјРѕРіР°РµС‚ РїРѕРЅСЏС‚СЊ, РёР· РєР°РєРѕР№ С„РѕСЂРјС‹ РїСЂРёС€Р»Р° Р·Р°СЏРІРєР°. РќРµ РѕС‚РѕР±СЂР°Р¶Р°РµС‚СЃСЏ РЅР° СЃР°Р№С‚Рµ.",
            EN: "Allows you to distinguish submitted forms. Only you will see this name."
        }
    } : "inputtitlefontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє РїРѕР»СЏ: РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ",
            EN: "Input title: Font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "container" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ РєРѕРЅС‚РµР№РЅРµСЂР°",
            EN: "Container size"
        },
        options: [{
            v: "",
            EN: "12 columns (default)"
        }, {
            v: "10",
            EN: "10 columns"
        }, {
            v: "8",
            EN: "8 columns"
        }, {
            v: "100",
            EN: "100% width"
        }]
    } : "textcolumncount" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·Р±РёС‚СЊ С‚РµРєСЃС‚ РЅР° РєРѕР»РѕРЅРєРё",
            EN: "Number of Text Columns"
        },
        options: [{
            v: "",
            EN: "1"
        }, {
            v: "2",
            EN: "2"
        }, {
            v: "3",
            EN: "3"
        }, {
            v: "4",
            EN: "4"
        }]
    } : "inputhide" == e || "inputhide2" == e || "inputhide3" == e ? t = {
        type: "cb",
        caption: {
            RU: "РЎРєСЂС‹С‚СЊ РїРѕР»Рµ",
            EN: "Hide field"
        }
    } : "textareaname" == e ? t = {
        type: "in",
        label: {
            RU: "РРјСЏ РїРµСЂРµРјРµРЅРЅРѕР№",
            EN: "Variable Name"
        },
        uplabel: {
            RU: "РџРѕР»Рµ РґР»СЏ РІРІРѕРґР° С‚РµРєСЃС‚Р°:",
            EN: "Text Input:"
        }
    } : "textarearows" == e ? t = {
        type: "sb",
        label: {
            RU: "РљРѕР»РёС‡РµСЃС‚РІРѕ СЃС‚СЂРѕРє",
            EN: "Number of lines"
        },
        options: [{
            v: "1",
            RU: "1 СЃС‚СЂРѕРєР°",
            EN: "1 line"
        }, {
            v: "2",
            RU: "2 СЃС‚СЂРѕРєРё",
            EN: "2 lines"
        }, {
            v: "3",
            RU: "3 СЃС‚СЂРѕРєРё",
            EN: "3 lines"
        }, {
            v: "4",
            RU: "4 СЃС‚СЂРѕРєРё",
            EN: "4 lines"
        }, {
            v: "5",
            RU: "5 СЃС‚СЂРѕРє",
            EN: "5 lines"
        }, {
            v: "6",
            RU: "6 СЃС‚СЂРѕРє",
            EN: "6 lines"
        }, {
            v: "7",
            RU: "7 СЃС‚СЂРѕРє",
            EN: "7 lines"
        }, {
            v: "8",
            RU: "8 СЃС‚СЂРѕРє",
            EN: "8 lines"
        }, {
            v: "9",
            RU: "9 СЃС‚СЂРѕРє",
            EN: "9 lines"
        }, {
            v: "10",
            RU: "10 СЃС‚СЂРѕРє",
            EN: "10 lines"
        }]
    } : "textareahide" == e ? t = {
        type: "cb",
        caption: {
            RU: "РЎРєСЂС‹С‚СЊ РїРѕР»Рµ",
            EN: "Hide field"
        }
    } : "textareareq" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћР±СЏР·Р°С‚РµР»СЊРЅРѕРµ РїРѕР»Рµ",
            EN: "Required field"
        }
    } : "slidercycle" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р‘РµСЃРєРѕРЅРµС‡РЅР°СЏ РіР°Р»РµСЂРµСЏ",
            EN: "Loop gallery"
        }
    } : "slidercontrols" == e ? t = {
        type: "sb",
        label: {
            RU: "РЈРїСЂР°РІР»СЏСЋС‰РёРµ СЌР»РµРјРµРЅС‚С‹",
            EN: "Control elements"
        },
        options: [{
            v: "",
            RU: "РЎС‚СЂРµР»РєРё Рё С‚РѕС‡РєРё",
            EN: "Arrows and dots"
        }, {
            v: "arrows",
            RU: "РўРѕР»СЊРєРѕ СЃС‚СЂРµР»РєРё",
            EN: "Arrows"
        }, {
            v: "dots",
            RU: "РўРѕР»СЊРєРѕ С‚РѕС‡РєРё",
            EN: "Dots"
        }]
    } : "bordersize2" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРѕР»С‰РёРЅР° Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё 2",
            EN: "Border width 2"
        },
        ph: {
            EN: "3px"
        }
    } : "vindentpx" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р’РµСЂС‚РёРєР°Р»СЊРЅС‹Р№ РѕС‚СЃС‚СѓРї РјРµР¶РґСѓ РєР°СЂС‚РѕС‡РєР°РјРё",
            EN: "Vertical spacing between cards"
        },
        ph: {
            EN: "100px"
        }
    } : "color3" == e ? t = {
        type: "co",
        label: {
            RU: "РўСЂРµС‚РёР№ С†РІРµС‚",
            EN: "Third Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "bgcolor3" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР° 3",
            EN: "Background color 3"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "formallertcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ СЃРѕРѕР±С‰РµРЅРёСЏ РѕР± РѕС€РёР±РєРµ",
            EN: "Error message color"
        },
        ph: {
            EN: "#000000"
        }
    } : "inputname4" == e ? t = {
        type: "in",
        label: {
            RU: "РРјСЏ РїРµСЂРµРјРµРЅРЅРѕР№",
            EN: "Variable name"
        },
        uplabel: {
            RU: "Р§РµС‚РІРµСЂС‚РѕРµ РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°:",
            EN: "Fourth Input:"
        }
    } : "inputrule4" == e ? t = {
        type: "sb",
        label: {
            RU: "РџСЂР°РІРёР»Рѕ РІР°Р»РёРґР°С†РёРё",
            EN: "Validation rule"
        },
        options: [{
            v: "none",
            RU: "Р‘РµР· РїСЂРѕРІРµСЂРєРё",
            EN: "Without validation"
        }, {
            v: "email",
            EN: "Email"
        }, {
            v: "phone",
            RU: "РўРµР»РµС„РѕРЅ // 0123456789() +-",
            EN: "Phone // 0123456789() +-"
        }]
    } : "inputhide4" == e ? t = {
        type: "cb",
        caption: {
            RU: "РЎРєСЂС‹С‚СЊ РїРѕР»Рµ",
            EN: "Hide field"
        }
    } : "inputreq4" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћР±СЏР·Р°С‚РµР»СЊРЅРѕРµ РїРѕР»Рµ",
            EN: "Required field"
        }
    } : "text_widthpx" == e ? t = {
        type: "in_px",
        label: {
            RU: "РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ С€РёСЂРёРЅР° С‚РµРєСЃС‚Р°",
            EN: "Text max width"
        },
        ph: {
            EN: "700px"
        }
    } : "position_align" == e ? t = {
        type: "sb",
        label: {
            RU: "РџРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ - РІС‹СЂР°РІРЅРёРІР°РЅРёРµ",
            EN: "Position вЂ“ alignment"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ/РЅРµ Р·Р°РґР°РЅРѕ",
            EN: "Default/Not set"
        }, {
            v: "left",
            RU: "РџРѕ Р»РµРІРѕРјСѓ РєСЂР°СЋ",
            EN: "Left"
        }, {
            v: "center",
            RU: "РџРѕ С†РµРЅС‚СЂСѓ",
            EN: "Center"
        }, {
            v: "right",
            RU: "РџРѕ РїСЂР°РІРѕРјСѓ РєСЂР°СЋ",
            EN: "Right"
        }]
    } : "inputname5" == e ? t = {
        type: "in",
        label: {
            RU: "РРјСЏ РїРµСЂРµРјРµРЅРЅРѕР№",
            EN: "Variable Name"
        },
        uplabel: {
            RU: "РџСЏС‚РѕРµ РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°:",
            EN: "Fifth Input:"
        }
    } : "inputrule5" == e ? t = {
        type: "sb",
        label: {
            RU: "РџСЂР°РІРёР»Рѕ РІР°Р»РёРґР°С†РёРё",
            EN: "Validation rule"
        },
        options: [{
            v: "none",
            RU: "Р‘РµР· РїСЂРѕРІРµСЂРєРё",
            EN: "Without validation"
        }, {
            v: "email",
            EN: "Email"
        }, {
            v: "phone",
            RU: "РўРµР»РµС„РѕРЅ // 0123456789() +-",
            EN: "Phone // 0123456789() +-"
        }]
    } : "inputhide5" == e ? t = {
        type: "cb",
        caption: {
            RU: "РЎРєСЂС‹С‚СЊ РїРѕР»Рµ",
            EN: "Hide field"
        }
    } : "inputreq5" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћР±СЏР·Р°С‚РµР»СЊРЅРѕРµ РїРѕР»Рµ",
            EN: "Required field"
        }
    } : "subtitle_widthpx" == e ? t = {
        type: "in_px",
        label: {
            RU: "РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ С€РёСЂРёРЅР° РїРѕРґР·Р°РіРѕР»РѕРІРєР°",
            EN: "Subtitle max width"
        },
        ph: {
            EN: "700px"
        }
    } : "container100_width" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ РєРѕРЅС‚РµР№РЅРµСЂР°",
            EN: "Container Width"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ: С€РёСЂРёРЅР° 100%",
            EN: "Default: 100% width"
        }, {
            v: "40",
            RU: "СЃ РѕС‚СЃС‚СѓРїР°РјРё РІ 40px РїРѕ РєСЂР°СЏРј",
            EN: "with 40px edge paddings"
        }]
    } : "size" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ",
            EN: "Size"
        },
        options: [{
            v: "",
            RU: "РЎС‚Р°РЅРґР°СЂС‚РЅС‹Р№",
            EN: "Default"
        }, {
            v: "lg",
            RU: "РЈРІРµР»РёС‡РµРЅРЅС‹Р№",
            EN: "Large"
        }, {
            v: "xl",
            RU: "Р‘РѕР»СЊС€РѕР№",
            EN: "X-Large"
        }, {
            v: "xxl",
            RU: "Р“РёРіР°РЅС‚СЃРєРёР№",
            EN: "XX-Large"
        }]
    } : "sizzze" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ",
            EN: "Size"
        },
        options: [{
            v: "sm",
            RU: "РЈРјРµРЅСЊС€РµРЅРЅС‹Р№",
            EN: "Small"
        }, {
            v: "md",
            RU: "РЎС‚Р°РЅРґР°СЂС‚РЅС‹Р№",
            EN: "Medium"
        }, {
            v: "lg",
            RU: "Р‘РѕР»СЊС€РѕР№",
            EN: "Large"
        }]
    } : "color4" == e ? t = {
        type: "co",
        label: {
            RU: "Р§РµС‚РІРµСЂС‚С‹Р№ С†РІРµС‚",
            EN: "Four Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "input3" == e ? t = {
        type: "in",
        label: {
            EN: "Input3"
        }
    } : "input4" == e ? t = {
        type: "in",
        label: {
            EN: "Input4"
        }
    } : "input6" == e ? t = {
        type: "in",
        label: {
            EN: "Input6"
        }
    } : "input5" == e ? t = {
        type: "in",
        label: {
            EN: "Input5"
        }
    } : "blocks3456" == e ? t = {
        type: "sb",
        label: {
            RU: "РљРѕР»-РІРѕ Р±Р»РѕРєРѕРІ РІ СЂСЏРґСѓ",
            EN: "Number of blocks per row"
        },
        options: [{
            v: "3",
            EN: "3"
        }, {
            v: "",
            EN: "4"
        }, {
            v: "5",
            EN: "5"
        }, {
            v: "6",
            EN: "6"
        }]
    } : "icon_widthpx" == e ? t = {
        type: "in_px",
        label: {
            RU: "РЁРёСЂРёРЅР° РёРєРѕРЅРєРё",
            EN: "Icon width"
        },
        ph: {
            EN: "100px"
        }
    } : "blocks46" == e ? t = {
        type: "sb",
        label: {
            RU: "РљРѕР»-РІРѕ Р±Р»РѕРєРѕРІ РІ СЂСЏРґСѓ",
            EN: "Number of blocks per row"
        },
        options: [{
            v: "",
            EN: "4"
        }, {
            v: "6",
            EN: "6"
        }]
    } : "paddingleftrightpx" == e ? t = {
        type: "in_px",
        label: {
            RU: "РћС‚СЃС‚СѓРї СЃР»РµРІР°/СЃРїСЂР°РІР°",
            EN: "Left/Right padding"
        },
        ph: {
            EN: "20px"
        }
    } : "paddingtopbottompx" == e ? t = {
        type: "in_px",
        label: {
            RU: "РћС‚СЃС‚СѓРї СЃРІРµСЂС…Сѓ/СЃРЅРёР·Сѓ",
            EN: "Top/Bottom padding"
        },
        ph: {
            EN: "20px"
        }
    } : "feature" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р’С‹РґРµР»РёС‚СЊ Р±Р»РѕРє",
            EN: "Feature block"
        }
    } : "feature2" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р’С‹РґРµР»РёС‚СЊ РІС‚РѕСЂРѕР№ Р±Р»РѕРє",
            EN: "Feature second block"
        }
    } : "feature3" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р’С‹РґРµР»РёС‚СЊ С‚СЂРµС‚РёР№ Р±Р»РѕРє",
            EN: "Feature third block"
        }
    } : "feature4" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р’С‹РґРµР»РёС‚СЊ С‡РµС‚РІРµСЂС‚С‹Р№ Р±Р»РѕРє",
            EN: "Feature fourth block"
        }
    } : "shadow_size_hover" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРµРЅСЊ РїСЂРё РЅР°РІРµРґРµРЅРёРё: СЂР°Р·РјРµСЂ",
            EN: "Shadow on hover: Size"
        },
        ph: {
            EN: "10"
        }
    } : "shadow_opacity_hover" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "shadow_size_hover"
    } : "shadow_shifty_hover" == e ? t = {
        type: "sb",
        label: {
            RU: "РўРµРЅСЊ РїСЂРё РЅР°РІРµРґРµРЅРёРё: СЃРґРІРёРі",
            EN: "Shadow on hover: Shift"
        },
        options: [{
            v: "",
            RU: "Р‘РµР· СЃРґРІРёРіР°",
            EN: "Without shift"
        }, {
            v: "sm",
            RU: "РќРµР±РѕР»СЊС€РѕР№ СЃРґРІРёРі",
            EN: "Small shift"
        }, {
            v: "md",
            RU: "РЎСЂРµРґРЅРёР№ СЃРґРІРёРі",
            EN: "Medium shift"
        }]
    } : "text_bold" == e ? t = {
        type: "sb",
        label: {
            RU: "РўРµРєСЃС‚: Р–РёСЂРЅРѕСЃС‚СЊ",
            EN: "Text: Font weight"
        },
        options: [{
            v: "",
            EN: "Normal"
        }, {
            v: "y",
            EN: "Bold"
        }]
    } : "paddoff" == e ? t = {
        type: "sb",
        label: {
            RU: "РљРѕРЅС‚РµР№РЅРµСЂ: РћС‚СЃС‚СѓРїС‹ РѕС‚ РєСЂР°РµРІ",
            EN: "Container paddings"
        },
        options: [{
            v: "",
            RU: "30px",
            EN: "30px"
        }, {
            v: "y",
            RU: "Р‘РµР· РѕС‚СЃС‚СѓРїРѕРІ",
            EN: "No paddings"
        }]
    } : "img_fitwidth" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ",
            EN: "Image size"
        },
        options: [{
            v: "",
            RU: "РћСЂРёРіРёРЅР°Р»СЊРЅС‹Р№ СЂР°Р·РјРµСЂ",
            EN: "Original size"
        }, {
            v: "y",
            RU: "РџРѕРґРѕРіРЅР°С‚СЊ РїРѕРґ РєРѕРЅС‚РµР№РЅРµСЂ",
            EN: "Fit image to container"
        }]
    } : "price_color" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РµРЅР°: С†РІРµС‚",
            EN: "Price: Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "price_old_color" == e ? t = {
        type: "co",
        label: {
            RU: "РЎС‚Р°СЂР°СЏ С†РµРЅР°: С†РІРµС‚",
            EN: "Old Price: Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "price_fontsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р¦РµРЅР°: Р Р°Р·РјРµСЂ С€СЂРёС„С‚Р°",
            EN: "Price: Font size"
        },
        ph: {
            EN: "20px"
        }
    } : "price_lineheight" == e ? t = {
        type: "in_float",
        label: {
            RU: "Р¦РµРЅР°: РњРµР¶СЃС‚СЂРѕС‡РЅРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ",
            EN: "Price: Line spacing"
        },
        ph: {
            EN: "1.55"
        }
    } : "price_fontfamily" == e ? t = {
        type: "ff",
        label: {
            RU: "Р¦РµРЅР°: РЁСЂРёС„С‚",
            EN: "Price: Font family name"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "Arial",
            EN: "Arial"
        }, {
            v: "Georgia",
            EN: "Georgia"
        }]
    } : "price_bold" == e ? t = {
        type: "sb",
        label: {
            RU: "Р¦РµРЅР°: Р–РёСЂРЅРѕСЃС‚СЊ",
            EN: "Price: Bold"
        },
        options: [{
            v: "",
            EN: "Normal"
        }, {
            v: "y",
            EN: "Bold"
        }]
    } : "price_margintop" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р¦РµРЅР°: РћС‚СЃС‚СѓРї СЃРІРµСЂС…Сѓ",
            EN: "Price: Top Margin"
        },
        ph: {
            EN: "10px"
        }
    } : "price_pos" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°СЃРїРѕР»РѕР¶РµРЅРёРµ С†РµРЅС‹ РІ РєР°СЂС‚РѕС‡РєРµ С‚РѕРІР°СЂР°",
            EN: "Price position in product card"
        },
        options: [{
            v: "at",
            RU: "РЎРІРµСЂС…Сѓ, РЅР°Рґ Р·Р°РіРѕР»РѕРІРєРѕРј",
            EN: "At the top, above title"
        }, {
            v: "bt",
            RU: "РџРѕСЃР»Рµ Р·Р°РіРѕР»РѕРІРєР°",
            EN: "Under title"
        }, {
            v: "",
            RU: "РЎРЅРёР·Сѓ, РїРѕСЃР»Рµ РєСЂР°С‚РєРѕРіРѕ С‚РµРєСЃС‚Р°",
            EN: "At the bottom, under the text"
        }]
    } : "price_range_format" == e ? t = {
        type: "sb",
        label: {
            RU: "Р”РёР°РїР°Р·РѕРЅ С†РµРЅ Сѓ С‚РѕРІР°СЂР°",
            EN: "Product price format"
        },
        hint: {
            RU: "Р¤РѕСЂРјР°С‚ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ С†РµРЅС‹ РїСЂРё РЅР°Р»РёС‡РёРё РІР°СЂРёР°РЅС‚РѕРІ СЃ СЂР°Р·РЅРѕР№ СЃС‚РѕРёРјРѕСЃС‚СЊСЋ Сѓ РѕРґРЅРѕРіРѕ С‚РѕРІР°СЂР° РІ СЃРїРёСЃРєРµ",
            EN: "Price format for products with differently priced variants in the list"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "By default"
        }, {
            v: "from",
            RU: "РћС‚ РјРёРЅРёРјР°Р»СЊРЅРѕР№ С†РµРЅС‹",
            EN: 'Show "From" near the lowest price'
        }, {
            v: "range",
            RU: "Р”РёР°РїР°Р·РѕРЅ РјРёРЅРёРјР°Р»СЊРЅРѕР№ Рё РјР°РєСЃРёРјР°Р»СЊРЅРѕР№ С†РµРЅ",
            EN: "Show full range of prices"
        }]
    } : "options_fontsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РћРїС†РёРё: Р Р°Р·РјРµСЂ С€СЂРёС„С‚Р°",
            EN: "Options: Font size"
        },
        ph: {
            EN: "14px"
        },
        role: "tester"
    } : "sku_fontsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РђСЂС‚РёРєСѓР»: Р Р°Р·РјРµСЂ С€СЂРёС„С‚Р°",
            EN: "SKU: Font size"
        },
        ph: {
            EN: "14px"
        },
        role: "tester"
    } : "characteristics_fontsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РҐР°СЂР°РєС‚РµСЂРёСЃС‚РёРєРё: Р Р°Р·РјРµСЂ С€СЂРёС„С‚Р°",
            EN: "Characteristics: Font size"
        },
        ph: {
            EN: "14px"
        },
        role: "tester"
    } : "bg_size_noorig" == e ? t = {
        type: "sb",
        label: {
            RU: "РњР°СЃС€С‚Р°Р±РёСЂРѕРІР°РЅРёРµ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ",
            EN: "Image Stretch"
        },
        options: [{
            v: "cover",
            RU: "РЁРёСЂРёРЅР° РёР»Рё РІС‹СЃРѕС‚Р° СЂР°РІРЅСЏРµС‚СЃСЏ С€РёСЂРёРЅРµ РёР»Рё РІС‹СЃРѕС‚Рµ Р±Р»РѕРєР°",
            EN: "Image width or height equals block width or height"
        }, {
            v: "contain",
            RU: "Р¦РµР»РёРєРѕРј РїРѕРјРµС‰Р°РµС‚СЃСЏ РІРЅСѓС‚СЂРё Р±Р»РѕРєР°",
            EN: "Fit to block without cropping"
        }]
    } : "slidercontrolsshop" == e ? t = {
        type: "sb",
        label: {
            RU: "РЈРїСЂР°РІР»СЏСЋС‰РёРµ СЌР»РµРјРµРЅС‚С‹",
            EN: "Control elements"
        },
        options: [{
            v: "",
            RU: "РЎС‚СЂРµР»РєРё Рё С‚РѕС‡РєРё",
            EN: "Arrows and dots"
        }, {
            v: "arrowsthumbs",
            RU: "РЎС‚СЂРµР»РєРё Рё РјРёРЅРёР°С‚СЋСЂС‹",
            EN: "Arrows and thumbnails"
        }, {
            v: "arrows",
            RU: "РўРѕР»СЊРєРѕ СЃС‚СЂРµР»РєРё",
            EN: "Arrows"
        }, {
            v: "thumbs",
            RU: "РўРѕР»СЊРєРѕ РјРёРЅРёР°С‚СЋСЂС‹",
            EN: "Only thumbnails"
        }, {
            v: "dots",
            RU: "РўРѕР»СЊРєРѕ С‚РѕС‡РєРё",
            EN: "Dots"
        }]
    } : "price_fontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "Р¦РµРЅР°: РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ",
            EN: "Price: Font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "color5" == e ? t = {
        type: "co",
        label: {
            RU: "РџСЏС‚С‹Р№ С†РІРµС‚",
            EN: "Fifth Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "imgratio2" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎРѕРѕС‚РЅРѕС€РµРЅРёРµ СЃС‚РѕСЂРѕРЅ",
            EN: "Aspect Ratio"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "16_9",
            EN: "16:9"
        }, {
            v: "4_3",
            EN: "4:3"
        }, {
            v: "3_2",
            EN: "3:2"
        }, {
            v: "1_1",
            RU: "1:1 РљРІР°РґСЂР°С‚",
            EN: "1:1 Square"
        }, {
            v: "2_3",
            EN: "2:3"
        }, {
            v: "3_4",
            EN: "3:4"
        }, {
            v: "9_16",
            EN: "9:16"
        }]
    } : "alignlc2" == e ? t = {
        type: "sb",
        label: {
            RU: "Р’С‹СЂР°РІРЅРёРІР°РЅРёРµ",
            EN: "Alignment"
        },
        options: [{
            v: "left",
            RU: "РџРѕ Р»РµРІРѕРјСѓ РєСЂР°СЋ",
            EN: "Left"
        }, {
            v: "center",
            RU: "РџРѕ С†РµРЅС‚СЂСѓ",
            EN: "Center"
        }]
    } : "shop_chb_img" == e ? t = {
        type: "cb",
        caption: {
            EN: "shop_chb_img"
        }
    } : "shop_chb_title" == e ? t = {
        type: "cb",
        caption: {
            EN: "shop_chb_title"
        }
    } : "shop_chb_price" == e ? t = {
        type: "cb",
        caption: {
            EN: "shop_chb_price"
        }
    } : "shop_chb_params" == e ? t = {
        type: "cb",
        caption: {
            EN: "shop_chb_params"
        }
    } : "shop_chb_count" == e ? t = {
        type: "cb",
        caption: {
            EN: "shop_chb_count"
        }
    } : "shop_chb_addtocart" == e ? t = {
        type: "cb",
        caption: {
            EN: "shop_chb_addtocart"
        }
    } : "blocks34" == e ? t = {
        type: "sb",
        label: {
            RU: "РљРѕР»-РІРѕ Р±Р»РѕРєРѕРІ РІ СЂСЏРґСѓ",
            EN: "Number of blocks per row"
        },
        options: [{
            v: "",
            EN: "3"
        }, {
            v: "4",
            EN: "4"
        }]
    } : "shapedividerstyle" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎС‚РёР»СЊ РіСЂР°РЅРёС†С‹",
            EN: "Shape style"
        },
        options: [{
            v: "zigzag",
            RU: "Р—РёРіР·Р°Рі",
            EN: "Zigzag"
        }, {
            v: "arrow",
            RU: "РЎС‚СЂРµР»РєР°",
            EN: "Arrow"
        }, {
            v: "skew",
            RU: "РЎРєРѕСЃ",
            EN: "Skew"
        }]
    } : "shapevertscale" == e ? t = {
        type: "sb",
        label: {
            RU: "РСЃРєР°Р¶РµРЅРёРµ РїРѕ РІРµСЂС‚РёРєР°Р»Рё",
            EN: "Vertical distortion"
        },
        options: [{
            v: "0.5",
            EN: "0.5x"
        }, {
            v: "1",
            EN: "1x"
        }, {
            v: "1.5",
            EN: "1.5x"
        }, {
            v: "2",
            EN: "2x"
        }, {
            v: "3",
            EN: "3x"
        }]
    } : "shapescale" == e ? t = {
        type: "sb",
        label: {
            RU: "РњР°СЃС€С‚Р°Р±",
            EN: "Scale"
        },
        options: [{
            v: "1",
            EN: "1x"
        }, {
            v: "1.5",
            EN: "1.5x"
        }, {
            v: "2",
            EN: "2x"
        }, {
            v: "3",
            EN: "3x"
        }, {
            v: "4",
            EN: "4x"
        }, {
            v: "5",
            EN: "5x"
        }]
    } : "menu_margintop" == e ? t = {
        type: "in_px",
        label: {
            RU: "РћС‚СЃС‚СѓРї СЃРІРµСЂС…Сѓ Сѓ РїСѓРЅРєС‚Р° РјРµРЅСЋ",
            EN: "Menu items: Top Margin"
        },
        ph: {
            EN: "10px"
        }
    } : "menu_marginbottom" == e ? t = {
        type: "in_px",
        label: {
            RU: "РћС‚СЃС‚СѓРї СЃРЅРёР·Сѓ Сѓ РїСѓРЅРєС‚Р° РјРµРЅСЋ",
            EN: "Menu items: Bottom Margin"
        },
        ph: {
            EN: "10px"
        }
    } : "buttonsizesmmdlg" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ РєРЅРѕРїРєРё",
            EN: "Button size"
        },
        options: [{
            v: "sm",
            RU: "РЈРјРµРЅСЊС€РµРЅРЅС‹Р№",
            EN: "Small"
        }, {
            v: "",
            RU: "РЎС‚Р°РЅРґР°СЂС‚РЅС‹Р№",
            EN: "Default"
        }, {
            v: "lg",
            RU: "РЈРІРµР»РёС‡РµРЅРЅС‹Р№",
            EN: "Large"
        }]
    } : "bbuttonsizedef" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ РєРЅРѕРїРєРё",
            EN: "Button size"
        },
        options: [{
            v: "sm",
            RU: "РЈРјРµРЅСЊС€РµРЅРЅС‹Р№",
            EN: "Small"
        }, {
            v: "",
            RU: "РЎС‚Р°РЅРґР°СЂС‚РЅС‹Р№",
            EN: "Default"
        }]
    } : "bbuttoncolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С‚РµРєСЃС‚Р°",
            EN: "Text color"
        },
        ph: {
            EN: "#000000"
        },
        uplabel: {
            RU: "РљРЅРѕРїРєР° РІРЅРёР·Сѓ Р±Р»РѕРєР°",
            EN: "Button under the&nbsp;block"
        }
    } : "bbuttonbgcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР°",
            EN: "Background color"
        },
        ph: {
            EN: "#ffffff"
        },
        split: "bbuttoncolor"
    } : "bbuttonbordercolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border color"
        },
        ph: {
            EN: "#000000"
        }
    } : "bbuttonbordersize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРѕР»С‰РёРЅР° Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Border width"
        },
        ph: {
            EN: "3px"
        },
        split: "bbuttonbordercolor"
    } : "bbuttonradius" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р Р°РґРёСѓСЃ СЃРєСЂСѓРіР»РµРЅРёСЏ Р±РѕСЂРґСЋСЂР°",
            EN: "Border radius"
        },
        ph: {
            EN: "30px"
        }
    } : "bbuttonfontfamily" == e ? t = {
        type: "ff",
        label: {
            RU: "РЁСЂРёС„С‚ РєРЅРѕРїРєРё",
            EN: "Button font family name"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "Arial",
            EN: "Arial"
        }, {
            v: "Georgia",
            EN: "Georgia"
        }]
    } : "bbuttonfontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ С‚РµРєСЃС‚Р° РєРЅРѕРїРєРё",
            EN: "Button font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "bbuttonshadowsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРµРЅСЊ: СЂР°Р·РјРµСЂ",
            EN: "Shadow: Size"
        },
        ph: {
            EN: "10"
        }
    } : "bbuttonshadowopacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "bbuttonshadowsize"
    } : "bbuttonbgcolorhover" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР° РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Background color on hover"
        },
        ph: {
            EN: "#000000"
        }
    } : "bbuttoncolorhover" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С‚РµРєСЃС‚Р° РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Text color on hover"
        },
        ph: {
            EN: "#000000"
        }
    } : "bbuttonbordercolorhover" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ Р±РѕСЂРґСЋСЂР° РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Border color on hover"
        },
        ph: {
            EN: "#000000"
        }
    } : "bbuttonspeedhover" == e ? t = {
        type: "in",
        label: {
            RU: "РЎРєРѕСЂРѕСЃС‚СЊ Р°РЅРёРјР°С†РёРё РїСЂРё РЅР°РІРµРґРµРЅРёРё",
            EN: "Animation speed on hover"
        },
        ph: {
            EN: "0.2s"
        },
        hint: {
            EN: "Time in seconds. Example: 0.2s"
        }
    } : "bbuttonshadowsizehover" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРµРЅСЊ РїСЂРё РЅР°РІРµРґРµРЅРёРё: СЂР°Р·РјРµСЂ",
            EN: "Shadow on Hover: Size"
        },
        ph: {
            EN: "10"
        }
    } : "bbuttonshadowopacityhover" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "bbuttonshadowsizehover"
    } : "snsize" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ РёРєРѕРЅРѕРє",
            EN: "Icon size"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "sm",
            RU: "РЈРјРµРЅСЊС€РµРЅРЅС‹Р№",
            EN: "Small"
        }, {
            v: "md",
            RU: "РЎС‚Р°РЅРґР°СЂС‚РЅС‹Р№",
            EN: "Medium"
        }, {
            v: "lg",
            RU: "Р‘РѕР»СЊС€РѕР№",
            EN: "Large"
        }]
    } : "slidercontrolscolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ СѓРїСЂР°РІР»СЏСЋС‰РёС… СЌР»РµРјРµРЅС‚РѕРІ",
            EN: "Control color"
        },
        ph: {
            EN: "#000000"
        }
    } : "widthpx2" == e ? t = {
        type: "in_px",
        label: {
            RU: "РЁРёСЂРёРЅР° 2",
            EN: "Width 2"
        },
        ph: {
            EN: "100px"
        }
    } : "blocks_featured" == e ? t = {
        type: "sb",
        label: {
            RU: "Р’С‹РґРµР»РµРЅРёРµ Р±Р»РѕРєР°",
            EN: "Featured block"
        },
        options: [{
            v: "",
            RU: "Р‘РµР· РІС‹РґРµР»РµРЅРёСЏ",
            EN: "No featured blocks"
        }, {
            v: "1",
            RU: "РџРµСЂРІС‹Р№",
            EN: "First"
        }, {
            v: "2",
            RU: "Р’С‚РѕСЂРѕР№",
            EN: "Second"
        }, {
            v: "3",
            RU: "РўСЂРµС‚РёР№",
            EN: "Third"
        }, {
            v: "4",
            RU: "Р§РµС‚РІРµСЂС‚С‹Р№",
            EN: "Fourth"
        }]
    } : "bordercolor2" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё 2",
            EN: "Border color 2"
        },
        ph: {
            EN: "#000000"
        }
    } : "shadow_size2" == e ? t = {
        type: "in_px",
        label: {
            RU: "РўРµРЅСЊ 2: СЂР°Р·РјРµСЂ",
            EN: "Shadow 2: Size"
        },
        ph: {
            EN: "10"
        }
    } : "shadow_opacity2" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "shadow_size2"
    } : "price_marginbottom" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р¦РµРЅР°: РћС‚СЃС‚СѓРї СЃРЅРёР·Сѓ",
            EN: "Price: Bottom Margin"
        },
        ph: {
            EN: "10px"
        }
    } : "bgcolor4" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С„РѕРЅР° 4",
            EN: "Background color 4"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "bgattachment" == e ? t = {
        type: "sb",
        label: {
            RU: "Р¤РѕРЅРѕРІРѕРµ РёР·РѕР±СЂР°Р¶РµРЅРёРµ: СЂР°Р·РјРµСЂ",
            EN: "Background image: Size"
        },
        options: [{
            v: "",
            RU: "РСЃС…РѕРґРЅС‹Р№ СЂР°Р·РјРµСЂ",
            EN: "Original size"
        }, {
            v: "cover",
            RU: "РћР±Р»РѕР¶РєР°",
            EN: "Cover"
        }, {
            v: "100%",
            RU: "100% С€РёСЂРёРЅС‹ СЌРєСЂР°РЅР°",
            EN: "100% window width"
        }]
    } : "slidesopacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ СЃРѕСЃРµРґРЅРёС… СЃР»Р°Р№РґРѕРІ",
            EN: "Opacity of neighboring slides"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "votevisibility" == e ? t = {
        type: "sb",
        label: {
            RU: "Р’РёРґРёРјРѕСЃС‚СЊ СЂРµР·СѓР»СЊС‚Р°С‚РѕРІ РЅР° РѕРїСѓР±Р»РёРєРѕРІР°РЅРЅРѕР№ СЃС‚СЂР°РЅРёС†Рµ",
            EN: "Results visibility on published page"
        },
        options: [{
            v: "",
            RU: "РќРµ РїРѕРєР°Р·С‹РІР°С‚СЊ",
            EN: "Don't show"
        }, {
            v: "yes",
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ",
            EN: "Show"
        }, {
            v: "onclick",
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ, РєРѕРіРґР° РїСЂРѕРіРѕР»РѕСЃРѕРІР°Р»Рё",
            EN: "Show after voting"
        }]
    } : "menusub_textcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ С‚РµРєСЃС‚Р° РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ",
            EN: "Submenu items text color"
        },
        ph: {
            EN: "#000000"
        }
    } : "menusub_fontsize" == e ? t = {
        type: "in_px",
        label: {
            RU: "Р Р°Р·РјРµСЂ С‚РµРєСЃС‚Р° РїСѓРЅРєС‚РѕРІ РїРѕРґРјРµРЅСЋ",
            EN: "Submenu items font size"
        },
        ph: {
            EN: "20px"
        }
    } : "menusub_fontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ",
            EN: "Submenu items font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "menusub_active_textcolor" == e ? t = {
        type: "co",
        label: {
            RU: "РђРєС‚РёРІРЅС‹Р№ РїСѓРЅРєС‚ РїРѕРґРјРµРЅСЋ: Р¦РІРµС‚ РїСѓРЅРєС‚Р°",
            EN: "Active submenu item: РЎolor"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "menusub_active_fontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "РђРєС‚РёРІРЅС‹Р№ РїСѓРЅРєС‚ РїРѕРґРјРµРЅСЋ: РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ",
            EN: "Active submenu item: Font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "menusub_active_opacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РђРєС‚РёРІРЅС‹Р№ РїСѓРЅРєС‚ РїРѕРґРјРµРЅСЋ: РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Active submenu item: Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "95",
            EN: "95%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "menusub_hover_textopacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РџСЂРё РЅР°РІРµРґРµРЅРёРё: РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ РїСѓРЅРєС‚Р° РїРѕРґРјРµРЅСЋ",
            EN: "On hover: Submenu item opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "95",
            EN: "95%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }]
    } : "menusub_hover_textcolor" == e ? t = {
        type: "co",
        label: {
            RU: "РџСЂРё РЅР°РІРµРґРµРЅРёРё: Р¦РІРµС‚ РїСѓРЅРєС‚Р° РїРѕРґРјРµРЅСЋ",
            EN: "On hover: Submenu item color"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "menusub_align" == e ? t = {
        type: "sb",
        label: {
            RU: "РџРѕРґРјРµРЅСЋ: Р’С‹СЂР°РІРЅРёРІР°РЅРёРµ РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ",
            EN: "Submenu: Items alignment"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "left",
            RU: "РџРѕ Р»РµРІРѕРјСѓ РєСЂР°СЋ",
            EN: "Left"
        }, {
            v: "center",
            RU: "РџРѕ С†РµРЅС‚СЂСѓ",
            EN: "Center"
        }, {
            v: "right",
            RU: "РџРѕ РїСЂР°РІРѕРјСѓ РєСЂР°СЋ",
            EN: "Right"
        }]
    } : "menusub_uppercase" == e ? t = {
        type: "cb",
        caption: {
            RU: "РџРѕРґРјРµРЅСЋ: Р’СЃРµ РїСѓРЅРєС‚С‹ РјРµРЅСЋ Р·Р°РіР»Р°РІРЅС‹РјРё Р±СѓРєРІР°РјРё",
            EN: "Submenu: All items uppercase"
        }
    } : "menusub_fontfamily" == e ? t = {
        type: "ff",
        label: {
            RU: "РџРѕРґРјРµРЅСЋ: РЁСЂРёС„С‚ РїСѓРЅРєС‚РѕРІ",
            EN: "Submenu: Items font family name"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "Arial",
            EN: "Arial"
        }, {
            v: "Georgia",
            EN: "Georgia"
        }]
    } : "menusub_letterspacing" == e ? t = {
        type: "sb",
        label: {
            RU: "РџРѕРґРјРµРЅСЋ: РњРµР¶Р±СѓРєРІРµРЅРЅРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ Сѓ РїСѓРЅРєС‚РѕРІ",
            EN: "Submenu: Items letter spacing"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "0.5px",
            EN: "0.5px"
        }, {
            v: "1px",
            EN: "1px"
        }, {
            v: "1.5px",
            EN: "1.5px"
        }, {
            v: "2px",
            EN: "2px"
        }, {
            v: "2.5px",
            EN: "2.5px"
        }, {
            v: "3px",
            EN: "3px"
        }]
    } : "menusub_bgcolor" == e ? t = {
        type: "co",
        label: {
            RU: "РџРѕРґРјРµРЅСЋ: Р¦РІРµС‚ С„РѕРЅР°",
            EN: "Submenu: Background color"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "menusub_bordersize" == e ? t = {
        type: "in_px",
        label: {
            RU: "РџРѕРґРјРµРЅСЋ: РўРѕР»С‰РёРЅР° Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Submenu: Border width"
        },
        ph: {
            EN: "3px"
        }
    } : "menusub_bordercolor" == e ? t = {
        type: "co",
        label: {
            RU: "РџРѕРґРјРµРЅСЋ: Р¦РІРµС‚ Р±РѕСЂРґСЋСЂР°/РѕР±РІРѕРґРєРё",
            EN: "Submenu: Border color"
        },
        ph: {
            EN: "#000000"
        }
    } : "menusub_borderradius" == e ? t = {
        type: "in_px",
        label: {
            RU: "РџРѕРґРјРµРЅСЋ: Р Р°РґРёСѓСЃ СЃРєСЂСѓРіР»РµРЅРёСЏ Р±РѕСЂРґСЋСЂР°",
            EN: "Submenu: Border radius"
        },
        ph: {
            EN: "30px"
        }
    } : "menusub_shadow_size" == e ? t = {
        type: "in_px",
        label: {
            RU: "РџРѕРґРјРµРЅСЋ: Р Р°Р·РјРµСЂ С‚РµРЅРё",
            EN: "Submenu: Shadow size"
        },
        ph: {
            EN: "10"
        }
    } : "menusub_shadow_opacity" == e ? t = {
        type: "sb",
        label: {
            RU: "РќРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ",
            EN: "Opacity"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "100%"
        }, {
            v: "90",
            EN: "90%"
        }, {
            v: "80",
            EN: "80%"
        }, {
            v: "70",
            EN: "70%"
        }, {
            v: "60",
            EN: "60%"
        }, {
            v: "50",
            EN: "50%"
        }, {
            v: "40",
            EN: "40%"
        }, {
            v: "30",
            EN: "30%"
        }, {
            v: "20",
            EN: "20%"
        }, {
            v: "10",
            EN: "10%"
        }, {
            v: "0",
            EN: "0%"
        }],
        split: "menusub_shadow_size"
    } : "menusub_widthpx" == e ? t = {
        type: "in_px",
        label: {
            RU: "РџРѕРґРјРµРЅСЋ: РЁРёСЂРёРЅР°",
            EN: "Submenu: Width"
        },
        ph: {
            EN: "100px"
        }
    } : "menusub_top" == e ? t = {
        type: "in_px",
        label: {
            RU: "РџРѕРґРјРµРЅСЋ: РћС‚СЃС‚СѓРї СЃРІРµСЂС…Сѓ",
            EN: "Submenu: Top Margin"
        },
        ph: {
            EN: "10px"
        }
    } : "menu_burgerstyle" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎС‚РёР»СЊ В«РіР°РјР±СѓСЂРіРµСЂР°В»",
            EN: "Hamburger icon: style"
        },
        options: [{
            v: "",
            RU: "РЎС‚РёР»СЊ 1",
            EN: "Style 1"
        }, {
            v: "2",
            RU: "РЎС‚РёР»СЊ 2",
            EN: "Style 2"
        }, {
            v: "3",
            RU: "РЎС‚РёР»СЊ 3",
            EN: "Style 3"
        }, {
            v: "4",
            RU: "РЎС‚РёР»СЊ 4",
            EN: "Style 4"
        }]
    } : "menu_burgersize" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°Р·РјРµСЂ В«РіР°РјР±СѓСЂРіРµСЂР°В»",
            EN: "Hamburger icon: size"
        },
        options: [{
            v: "",
            RU: "РЎСЂРµРґРЅРёР№",
            EN: "Medium"
        }, {
            v: "2",
            RU: "РњР°Р»РµРЅСЊРєРёР№",
            EN: "Small"
        }, {
            v: "3",
            RU: "Р‘РѕР»СЊС€РѕР№",
            EN: "Large"
        }]
    } : "menu_mob_show" == e ? t = {
        type: "cb",
        caption: {
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ В«РіР°РјР±СѓСЂРіРµСЂВ» РІ РјРѕР±РёР»СЊРЅРѕР№ РІРµСЂСЃРёРё",
            EN: "Show hamburger icon on mobile"
        },
        hint: {
            RU: "",
            EN: ""
        }
    } : "menu_mob_flip" == e ? t = {
        type: "cb",
        caption: {
            RU: "РћС‚СЂР°Р·РёС‚СЊ В«РіР°РјР±СѓСЂРіРµСЂВ» РїРѕ РіРѕСЂРёР·РѕРЅС‚Р°Р»Рё",
            EN: "Horizontal flip hamburger icon"
        },
        hint: {
            RU: "",
            EN: ""
        }
    } : "menu_mob_fixed" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р¤РёРєСЃР°С†РёСЏ РїСЂРё СЃРєСЂРѕР»Р»Рµ РІ РјРѕР±РёР»СЊРЅРѕР№ РІРµСЂСЃРёРё",
            EN: "Fixed position on mobile"
        },
        hint: {
            RU: "",
            EN: ""
        }
    } : "menu_mob_showlogo" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р Р°СЃРїРѕР»Р°РіР°С‚СЊ Р»РѕРіРѕС‚РёРї РІ С€Р°РїРєРµ РјРµРЅСЋ РІ РјРѕР±РёР»СЊРЅРѕР№ РІРµСЂСЃРёРё",
            EN: "Show logo in the header"
        },
        hint: {
            RU: "",
            EN: ""
        }
    } : "menu_mob_burgercolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ В«РіР°РјР±СѓСЂРіРµСЂР°В»",
            EN: "Hamburger icon: color"
        },
        ph: {
            EN: "#ffffff"
        }
    } : "menu_mob_bgcolor" == e ? t = {
        type: "co",
        label: {
            RU: "Р¦РІРµС‚ РїРѕРґР»РѕР¶РєРё",
            EN: "Underlay: color"
        },
        ph: {
            EN: "#00000"
        }
    } : "submenu_mob_full" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р Р°СЃРєСЂС‹РІР°С‚СЊ РїРѕРґРјРµРЅСЋ РІ РјРѕР±РёР»СЊРЅРѕР№ РІРµСЂСЃРёРё РЅР° РІРµСЃСЊ СЌРєСЂР°РЅ",
            EN: "Show submenu on mobile in full screen"
        },
        hint: {
            RU: "",
            EN: ""
        }
    } : "feed_dateps" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°СЃРїРѕР»РѕР¶РµРЅРёРµ РґР°С‚С‹",
            EN: "Date position"
        },
        options: [{
            v: "",
            RU: "РЎРІРµСЂС…Сѓ, РЅР°Рґ Р·Р°РіРѕР»РѕРІРєРѕРј",
            EN: "At the top, above title"
        }, {
            v: "bt",
            RU: "РџРѕСЃР»Рµ Р·Р°РіРѕР»РѕРІРєР°",
            EN: "Under title"
        }, {
            v: "b",
            RU: "РЎРЅРёР·Сѓ, РїРѕСЃР»Рµ РєСЂР°С‚РєРѕРіРѕ С‚РµРєСЃС‚Р°",
            EN: "At the bottom, under the text"
        }]
    } : "feed_datepos" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°СЃРїРѕР»РѕР¶РµРЅРёРµ РґР°С‚С‹",
            EN: "Date position"
        },
        options: [{
            v: "",
            RU: "РЎРІРµСЂС…Сѓ, РЅР°Рґ Р·Р°РіРѕР»РѕРІРєРѕРј",
            EN: "At the top, above title"
        }, {
            v: "bt",
            RU: "РџРѕСЃР»Рµ Р·Р°РіРѕР»РѕРІРєР°",
            EN: "Under title"
        }, {
            v: "b",
            RU: "РЎРЅРёР·Сѓ, РїРѕСЃР»Рµ РєСЂР°С‚РєРѕРіРѕ С‚РµРєСЃС‚Р°",
            EN: "At the bottom, under the text"
        }, {
            v: "i",
            RU: "РќР° РєР°СЂС‚РёРЅРєРµ",
            EN: "On image"
        }]
    } : "feed_partps" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°СЃРїРѕР»РѕР¶РµРЅРёРµ СЂР°Р·РґРµР»Р°",
            EN: "Category position"
        },
        options: [{
            v: "",
            RU: "РЎРІРµСЂС…Сѓ, РЅР°Рґ Р·Р°РіРѕР»РѕРІРєРѕРј",
            EN: "At the top, above title"
        }, {
            v: "bt",
            RU: "РџРѕСЃР»Рµ Р·Р°РіРѕР»РѕРІРєР°",
            EN: "Under title"
        }, {
            v: "b",
            RU: "РЎРЅРёР·Сѓ, РїРѕСЃР»Рµ РєСЂР°С‚РєРѕРіРѕ С‚РµРєСЃС‚Р°",
            EN: "At the bottom, under the text"
        }]
    } : "feed_partpos" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°СЃРїРѕР»РѕР¶РµРЅРёРµ СЂР°Р·РґРµР»Р°",
            EN: "Category position"
        },
        options: [{
            v: "",
            RU: "РЎРІРµСЂС…Сѓ, РЅР°Рґ Р·Р°РіРѕР»РѕРІРєРѕРј",
            EN: "At the top, above title"
        }, {
            v: "bt",
            RU: "РџРѕСЃР»Рµ Р·Р°РіРѕР»РѕРІРєР°",
            EN: "Under title"
        }, {
            v: "b",
            RU: "РЎРЅРёР·Сѓ, РїРѕСЃР»Рµ РєСЂР°С‚РєРѕРіРѕ С‚РµРєСЃС‚Р°",
            EN: "At the bottom, under the text"
        }, {
            v: "i",
            RU: "РќР° РєР°СЂС‚РёРЅРєРµ",
            EN: "On image"
        }]
    } : "feed_imgps" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°СЃРїРѕР»РѕР¶РµРЅРёРµ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ",
            EN: "Image position"
        },
        options: [{
            v: "",
            RU: "РЎРІРµСЂС…Сѓ, РІ РЅР°С‡Р°Р»Рµ",
            EN: "At the top"
        }, {
            v: "b",
            RU: "РЎРЅРёР·Сѓ, РїРѕСЃР»Рµ С‚РµРєСЃС‚Р°",
            EN: "At the bottom, under the text"
        }]
    } : "feed_imgpos" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°СЃРїРѕР»РѕР¶РµРЅРёРµ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ",
            EN: "Image position"
        },
        options: [{
            v: "",
            RU: "РЎРІРµСЂС…Сѓ, РІ РЅР°С‡Р°Р»Рµ",
            EN: "At the top"
        }, {
            v: "bt",
            RU: "РџРѕСЃР»Рµ Р·Р°РіРѕР»РѕРІРєР°",
            EN: "Under title"
        }, {
            v: "b",
            RU: "РЎРЅРёР·Сѓ, РїРѕСЃР»Рµ С‚РµРєСЃС‚Р°",
            EN: "At the bottom, under the text"
        }]
    } : "feed_pp_datepos" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°СЃРїРѕР»РѕР¶РµРЅРёРµ РґР°С‚С‹",
            EN: "Date position"
        },
        options: [{
            v: "",
            RU: "РЎРІРµСЂС…Сѓ, РЅР°Рґ Р·Р°РіРѕР»РѕРІРєРѕРј",
            EN: "At the top, above title"
        }, {
            v: "bt",
            RU: "РџРѕСЃР»Рµ Р·Р°РіРѕР»РѕРІРєР°",
            EN: "Under title"
        }, {
            v: "b",
            RU: "РЎРЅРёР·Сѓ, РїРѕСЃР»Рµ С‚РµРєСЃС‚Р°",
            EN: "At the bottom, under the text"
        }]
    } : "feed_pp_partpos" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°СЃРїРѕР»РѕР¶РµРЅРёРµ СЂР°Р·РґРµР»Р°",
            EN: "Category position"
        },
        options: [{
            v: "",
            RU: "РЎРІРµСЂС…Сѓ, РЅР°Рґ Р·Р°РіРѕР»РѕРІРєРѕРј",
            EN: "At the top, above title"
        }, {
            v: "bt",
            RU: "РџРѕСЃР»Рµ Р·Р°РіРѕР»РѕРІРєР°",
            EN: "Under title"
        }, {
            v: "b",
            RU: "РЎРЅРёР·Сѓ, РїРѕСЃР»Рµ С‚РµРєСЃС‚Р°",
            EN: "At the bottom, under the text"
        }]
    } : "feed_pp_imgpos" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°СЃРїРѕР»РѕР¶РµРЅРёРµ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ",
            EN: "Image position"
        },
        options: [{
            v: "",
            RU: "РЎРІРµСЂС…Сѓ, РІ РЅР°С‡Р°Р»Рµ",
            EN: "At the top"
        }, {
            v: "bt",
            RU: "РџРѕСЃР»Рµ Р·Р°РіРѕР»РѕРІРєР°",
            EN: "Under title"
        }]
    } : "feed_hidepartstabs" == e ? t = {
        type: "cb",
        caption: {
            RU: "РЎРїСЂСЏС‚Р°С‚СЊ СЃРїРёСЃРѕРє СЂР°Р·РґРµР»РѕРІ РїРѕС‚РѕРєР°",
            EN: "Hide the list of feed sections"
        }
    } : "feed_datefilter" == e ? t = {
        type: "sb",
        label: {
            RU: "Р¤РёР»СЊС‚СЂР°С†РёСЏ РїРѕ РґР°С‚Рµ",
            EN: "Filtering by date"
        },
        options: [{
            v: "",
            RU: "РќРµ РїСЂРёРјРµРЅСЏС‚СЊ",
            EN: "Default"
        }, {
            v: "showbefore",
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ РїРѕ РЅР°СЃС‚СѓРїР»РµРЅРёРё РґР°С‚С‹",
            EN: "Show on due date"
        }, {
            v: "hideafter",
            RU: "РЎРєСЂС‹РІР°С‚СЊ РїРѕ РЅР°СЃС‚СѓРїР»РµРЅРёРё РґР°С‚С‹",
            EN: "Hide on due date"
        }]
    } : "pp_title_color" == e ? t = {
        type: "co",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє: Р¦РІРµС‚",
            EN: "Title: Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "pp_text_color" == e ? t = {
        type: "co",
        label: {
            RU: "РўРµРєСЃС‚: Р¦РІРµС‚",
            EN: "Text: Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "pp_subtitle_color" == e ? t = {
        type: "co",
        label: {
            RU: "Р”Р°С‚Р°, СЂР°Р·РґРµР»: Р¦РІРµС‚",
            EN: "Date, section: Color"
        },
        ph: {
            EN: "#000000"
        }
    } : "store_btn_quantity" == e ? t = {
        type: "sb",
        label: {
            RU: "РљРѕР»РёС‡РµСЃС‚РІРѕ (РєРЅРѕРїРєРё РїР»СЋСЃ/РјРёРЅСѓСЃ)",
            EN: "Quantity selector (plus/minus buttons)"
        },
        hint: {
            RU: "РџРѕРєСѓРїР°С‚РµР»Рё СЃРјРѕРіСѓС‚ РІРІРµСЃС‚Рё РЅСѓР¶РЅРѕРµ С‡РёСЃР»Рѕ С‚РѕРІР°СЂР° РґР»СЏ Р·Р°РєР°Р·Р°",
            EN: "Quantity selector allows customers to change the quantity of items when placing an order."
        },
        options: [{
            v: "",
            RU: "РќРµ РІС‹РІРѕРґРёС‚СЊ",
            EN: "Hide"
        }, {
            v: "list",
            RU: "Р”РѕР±Р°РІРёС‚СЊ РІ РїР»РёС‚РєСѓ С‚РѕРІР°СЂРѕРІ (СЃРїРёСЃРѕРє С‚РѕРІР°СЂРѕРІ)",
            EN: "Add to product tile (list of products)"
        }, {
            v: "popup",
            RU: "Р”РѕР±Р°РІРёС‚СЊ РЅР° СЃС‚СЂР°РЅРёС†Сѓ С‚РѕРІР°СЂР°",
            EN: "Add to product page"
        }, {
            v: "both",
            RU: "Р”РѕР±Р°РІРёС‚СЊ РІ РѕР±РѕРёС… СЃР»СѓС‡Р°СЏС…",
            EN: "Add to both"
        }]
    } : "store_tabs" == e ? t = {
        type: "sb",
        label: {
            RU: "РўР°Р±С‹ РІ РєР°СЂС‚РѕС‡РєРµ С‚РѕРІР°СЂР°",
            EN: "Tabs in the product card"
        },
        hint: {
            RU: "РћС‚РѕР±СЂР°Р¶Р°СЋС‚СЃСЏ РЅР° СЃС‚СЂР°РЅРёС†Рµ С‚РѕРІР°СЂР°",
            EN: "Displayed on the product page"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "By default"
        }, {
            v: "tabs",
            RU: "Р’ РІРёРґРµ С‚Р°Р±РѕРІ",
            EN: "As tabs"
        }, {
            v: "accordion",
            RU: "Р’ РІРёРґРµ СЂР°СЃРєСЂС‹РІР°СЋС‰РёС…СЃСЏ РєР°СЂС‚РѕС‡РµРє",
            EN: "As drop-down cards"
        }]
    } : "store_sort" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎРѕСЂС‚РёСЂРѕРІРєР° С‚РѕРІР°СЂРѕРІ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default products sorting"
        },
        options: [{
            v: "",
            RU: "РџРѕСЂСЏРґРѕРє: РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Sort: by default"
        }, {
            v: "sort-price-asc",
            RU: "Р¦РµРЅР°: РїРѕ РІРѕР·СЂР°СЃС‚Р°РЅРёСЋ",
            EN: "Price: low to high"
        }, {
            v: "sort-price-desc",
            RU: "Р¦РµРЅР°: РїРѕ СѓР±С‹РІР°РЅРёСЋ",
            EN: "Price: high to low"
        }, {
            v: "sort-name-asc",
            RU: "РќР°Р·РІР°РЅРёРµ: РђвЂ”РЇ",
            EN: "Title: AвЂ”Z"
        }, {
            v: "sort-name-desc",
            RU: "РќР°Р·РІР°РЅРёРµ: РЇвЂ”Рђ",
            EN: "Title: ZвЂ”A"
        }, {
            v: "sort-created-asc",
            RU: "РџРѕСЂСЏРґРѕРє: СЃРїРµСЂРІР° СЃС‚Р°СЂС‹Рµ",
            EN: "Sort: oldest first"
        }, {
            v: "sort-created-desc",
            RU: "РџРѕСЂСЏРґРѕРє: СЃРїРµСЂРІР° РЅРѕРІС‹Рµ",
            EN: "Sort: newest first"
        }]
    } : "store_gallerystyle" == e ? t = {
        type: "sb",
        label: {
            RU: "Р’РёРґ РіР°Р»РµСЂРµРё",
            EN: "Gallery style"
        },
        hint: {
            RU: "РЎС‚РёР»СЊ РїСЂРёРјРµРЅСЏРµС‚СЃСЏ С‚РѕР»СЊРєРѕ РґР»СЏ РґРµСЃРєС‚РѕРїРЅРѕР№ РІРµСЂСЃРёРё",
            EN: "The style is applied for the desktop only"
        },
        options: [{
            v: "",
            RU: "Р“Р°Р»РµСЂРµСЏ / С‚РµРєСЃС‚ СЃС‚Р°С‚РёС‡РµРЅ",
            EN: "Gallery / static text"
        }, {
            v: "col1_fixed",
            RU: "РР·РѕР±СЂР°Р¶РµРЅРёСЏ РІ 1 РєРѕР»РѕРЅРєСѓ / С‚РµРєСЃС‚ С„РёРєСЃРёСЂРѕРІР°РЅ РїСЂРё СЃРєСЂРѕР»Р»Рµ",
            EN: "Images in one column / text fixed on scroll"
        }, {
            v: "col2_fixed",
            RU: "РР·РѕР±СЂР°Р¶РµРЅРёСЏ РІ 2 РєРѕР»РѕРЅРєРё / С‚РµРєСЃС‚ С„РёРєСЃРёСЂРѕРІР°РЅ РїСЂРё СЃРєСЂРѕР»Р»Рµ",
            EN: "Images in two columns / text fixed on scroll"
        }]
    } : "showrelevants" == e ? t = {
        type: "sb",
        label: {
            RU: "Р‘Р»РѕРє 'СЃРјРѕС‚СЂРёС‚Рµ С‚Р°РєР¶Рµ'",
            EN: "'See also' section title"
        },
        options: [{
            v: "",
            RU: "РќРµ РІС‹РІРѕРґРёС‚СЊ",
            EN: "Don't show"
        }, {
            v: "all",
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ РёР· РІСЃРµС… РєР°С‚РµРіРѕСЂРёР№",
            EN: "Show for all categories"
        }, {
            v: "cc",
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ РёР· С‚РµРєСѓС‰РµР№ РєР°С‚РµРіРѕСЂРёРё",
            EN: "Show for current category"
        }]
    } : "titlerelevants" == e ? t = {
        type: "in",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє Р±Р»РѕРєР° 'СЃРјРѕС‚СЂРёС‚Рµ С‚Р°РєР¶Рµ'",
            EN: "'See also' section title"
        },
        ph: {
            EN: "See also",
            RU: "РЎРјРѕС‚СЂРёС‚Рµ С‚Р°РєР¶Рµ"
        }
    } : "imgs_zoom_hover" == e ? t = {
        type: "cb",
        caption: {
            RU: "РЈРІРµР»РёС‡РёРІР°С‚СЊ РёР·РѕР±СЂР°Р¶РµРЅРёРµ РїРѕ РЅР°РІРµРґРµРЅРёСЋ",
            EN: "Zoom image on hover"
        }
    } : "buttons_valignb" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р’С‹СЂР°РІРЅРёРІР°С‚СЊ РєРЅРѕРїРєРё РІ РєР°СЂС‚РѕС‡РєР°С… РїРѕ РЅРёР·Сѓ",
            EN: "Align buttons to the bottom of the cards"
        }
    } : "stylerelevants" == e ? t = {
        type: "sb",
        label: {
            RU: "Р Р°СЃРїРѕР»РѕР¶РµРЅРёРµ",
            EN: "Layout"
        },
        options: [{
            v: "",
            RU: "Р’ РѕРґРЅСѓ РєРѕР»РѕРЅРєСѓ",
            EN: "In one column"
        }, {
            v: "cols",
            RU: "Р’ РЅРµСЃРєРѕР»СЊРєРѕ РєРѕР»РѕРЅРѕРє",
            EN: "In several columns"
        }]
    } : "feed_sortrelevants" == e ? t = {
        type: "sb",
        label: {
            RU: "РџСЂРёРЅС†РёРї РїРѕРґР±РѕСЂР°",
            EN: "Selection principle"
        },
        options: [{
            v: "random",
            RU: "РЎР»СѓС‡Р°Р№РЅС‹Рµ",
            EN: "Random"
        }, {
            v: "newest",
            RU: "РќРѕРІС‹Рµ",
            EN: "Newest"
        }, {
            v: "pop",
            RU: "РџРѕРїСѓР»СЏСЂРЅС‹Рµ",
            EN: "Popular"
        }, {
            v: "unpop",
            RU: "РќРµРїРѕРїСѓР»СЏСЂРЅС‹Рµ",
            EN: "Unpopular"
        }]
    } : "relevants_quantity" == e ? t = {
        type: "in",
        label: {
            RU: "РљРѕР»РёС‡РµСЃС‚РІРѕ С‚РѕРІР°СЂРѕРІ РІ СЂР°Р·РґРµР»Рµ 'РЎРјРѕС‚СЂРёС‚Рµ С‚Р°РєР¶Рµ'",
            EN: "Quantity of items in 'See also' section"
        },
        ph: {
            EN: "4",
            RU: "4"
        }
    } : "relevants_slider" == e ? t = {
        type: "cb",
        caption: {
            RU: "РўРѕРІР°СЂС‹ РІ СЂР°Р·РґРµР»Рµ 'СЃРјРѕС‚СЂРёС‚Рµ С‚Р°РєР¶Рµ' РІ СЃР»Р°Р№РґРµСЂРµ",
            EN: "Products in 'See also' section in slider"
        }
    } : "sliderthumbsside" == e ? t = {
        type: "sb",
        label: {
            RU: "РџРѕР»РѕР¶РµРЅРёРµ РјРёРЅРёР°С‚СЋСЂ",
            EN: "Thumbnail position"
        },
        options: [{
            v: "",
            RU: "РЎРЅРёР·Сѓ",
            EN: "Bottom"
        }, {
            v: "l",
            RU: "РЎР»РµРІР°",
            EN: "Left"
        }]
    } : "input_fontweight" == e ? t = {
        type: "sb",
        label: {
            RU: "РџРѕР»Рµ РґР»СЏ РІРІРѕРґР°: РќР°СЃС‹С‰РµРЅРЅРѕСЃС‚СЊ",
            EN: "Input: Font weight"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "100",
            EN: "Thin"
        }, {
            v: "300",
            EN: "Light"
        }, {
            v: "400",
            EN: "Normal"
        }, {
            v: "500",
            EN: "Medium"
        }, {
            v: "600",
            EN: "Semibold"
        }, {
            v: "700",
            EN: "Bold"
        }]
    } : "input_fontfamily" == e ? t = {
        type: "ff",
        label: {
            RU: "РџРѕР»Рµ РґР»СЏ РІРІРѕРґР°: РЁСЂРёС„С‚",
            EN: "Input: Font family name"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "Arial",
            EN: "Arial"
        }, {
            v: "Georgia",
            EN: "Georgia"
        }]
    } : "inputtitlefontfamily" == e && (t = {
        type: "ff",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє РїРѕР»СЏ: РЁСЂРёС„С‚",
            EN: "Input title: Font family name"
        },
        options: [{
            v: "",
            RU: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
            EN: "Default"
        }, {
            v: "Arial",
            EN: "Arial"
        }, {
            v: "Georgia",
            EN: "Georgia"
        }]
    }), t
}

function edrec__drawUI__getFieldObj__content(e) {
    var t = {};
    return "|ggc|" == e ? t = {
        type: "gr",
        groupid: "close"
    } : "|gg0|" == e ? t = {
        type: "gr",
        groupid: "maincontent",
        label: {
            RU: "РћСЃРЅРѕРІРЅС‹Рµ РЅР°СЃС‚СЂРѕР№РєРё",
            EN: "Main settings"
        }
    } : "|gg1|" == e ? t = {
        type: "gr",
        groupid: "menuitemscontent",
        label: {
            RU: "РџСѓРЅРєС‚С‹ РјРµРЅСЋ",
            EN: "Menu items"
        }
    } : "|gg3|" == e ? t = {
        type: "gr",
        groupid: "sharecontent",
        label: {
            RU: "Р РµРєРѕРјРµРЅРґР°С‚РµР»СЊРЅС‹Рµ РєРЅРѕРїРєРё",
            EN: "Share buttons"
        }
    } : "|gg4|" == e ? t = {
        type: "gr",
        groupid: "buttoncontent",
        label: {
            RU: "РљРЅРѕРїРєРё",
            EN: "Buttons"
        }
    } : "|gg6|" == e ? t = {
        type: "gr",
        groupid: "logocontent",
        label: {
            RU: "Р›РѕРіРѕС‚РёРї",
            EN: "Logo"
        }
    } : "|gg7|" == e ? t = {
        type: "gr",
        groupid: "langcontent",
        label: {
            RU: "РЇР·С‹РєРё",
            EN: "Languages"
        }
    } : "|gg8|" == e ? t = {
        type: "gr",
        groupid: "menuitemscontent",
        label: {
            RU: "РЎРїРёСЃРѕРє РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ",
            EN: "Menu items"
        }
    } : "|gg9|" == e ? t = {
        type: "gr",
        groupid: "morecontent",
        label: {
            RU: "Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕ",
            EN: "More"
        }
    } : "|gg10|" == e ? t = {
        type: "gr",
        groupid: "sociallinks",
        label: {
            RU: "РЎСЃС‹Р»РєРё РЅР° СЃРѕС†.СЃРµС‚Рё",
            EN: "Social media links"
        }
    } : "|gg11|" == e ? t = {
        type: "gr",
        groupid: "item1",
        label: {
            RU: "РљР°СЂС‚РѕС‡РєР° 1",
            EN: "Item 1"
        }
    } : "|gg12|" == e ? t = {
        type: "gr",
        groupid: "item2",
        label: {
            RU: "РљР°СЂС‚РѕС‡РєР° 2",
            EN: "Item 2"
        }
    } : "|gg13|" == e ? t = {
        type: "gr",
        groupid: "item3",
        label: {
            RU: "РљР°СЂС‚РѕС‡РєР° 3",
            EN: "Item 3"
        }
    } : "|gg14|" == e ? t = {
        type: "gr",
        groupid: "item4",
        label: {
            RU: "РљР°СЂС‚РѕС‡РєР° 4",
            EN: "Item 4"
        }
    } : "|gg15|" == e ? t = {
        type: "gr",
        groupid: "bgvideo",
        label: {
            RU: "Р¤РѕРЅРѕРІРѕРµ РІРёРґРµРѕ",
            EN: "Background video"
        }
    } : "|gg16|" == e ? t = {
        type: "gr",
        groupid: "group16",
        label: {
            RU: "group16",
            EN: "group16"
        }
    } : "|gg17|" == e ? t = {
        type: "gr",
        groupid: "group17",
        label: {
            RU: "group17",
            EN: "group17"
        }
    } : "|gg18|" == e ? t = {
        type: "gr",
        groupid: "group18",
        label: {
            RU: "group18",
            EN: "group18"
        }
    } : "|gg19|" == e ? t = {
        type: "gr",
        groupid: "group19",
        label: {
            RU: "group19",
            EN: "group19"
        }
    } : "|gg20|" == e ? t = {
        type: "gr",
        groupid: "bheader",
        label: {
            RU: "РЁР°РїРєР° Р±Р»РѕРєР°",
            EN: "Block header"
        }
    } : "|gg21|" == e ? t = {
        type: "gr",
        groupid: "fitems",
        label: {
            RU: "РџРѕР»СЏ РґР»СЏ РІРІРѕРґР°",
            EN: "Input fields"
        }
    } : "text" == e ? t = {
        type: "te",
        label: {
            RU: "РўРµРєСЃС‚",
            EN: "Text"
        },
        rows: "10"
    } : "title" == e ? t = {
        type: "te",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє",
            EN: "Title"
        },
        rmin: "y",
        rows: "2"
    } : "img" == e ? t = {
        type: "im",
        label: {
            RU: "РР·РѕР±СЂР°Р¶РµРЅРёРµ",
            EN: "Image"
        }
    } : "link" == e ? t = {
        type: "ln",
        label: {
            RU: "РЎСЃС‹Р»РєР°",
            EN: "Link"
        }
    } : "linktarget" == e ? t = {
        type: "skip",
        label: {
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }
    } : "youtubeid" == e ? t = {
        type: "in",
        label: {
            RU: "РЎСЃС‹Р»РєР° РЅР° Youtube-СЂРѕР»РёРє РёР»Рё РµРіРѕ id",
            EN: "YouTube video URL or ID"
        },
        hint: {
            RU: "Р§С‚РѕР±С‹ РІРёРґРµРѕ РІРѕСЃРїСЂРѕРёР·РІРѕРґРёР»РѕСЃСЊ СЃ РѕРїСЂРµРґРµР»РµРЅРЅРѕРіРѕ РјРѕРјРµРЅС‚Р°, РІСЃС‚Р°РІСЊС‚Рµ С„СЂР°РіРјРµРЅС‚ <strong>?start=</strong> Рё РїРѕСЃР»Рµ РЅРµРіРѕ СѓРєР°Р¶РёС‚Рµ РЅСѓР¶РЅРѕРµ РІСЂРµРјСЏ РІ СЃРµРєСѓРЅРґР°С… РѕС‚ РЅР°С‡Р°Р»Р° СЂРѕР»РёРєР°. РќР°РїСЂРёРјРµСЂ, XEfDYMngJeE?start=5025",
            EN: "To make the video play from a certain point, insert the <strong>?start=</strong> fragment followed by the desired time in seconds from the beginning of the video E.g., XEfDYMngJeE?start=5025"
        }
    } : "videomp4" == e ? t = {
        type: "in",
        label: {
            RU: "РЎСЃС‹Р»РєР° РЅР° РІРёРґРµРѕ-С„Р°Р№Р» РІ С„РѕСЂРјР°С‚Рµ .MP4",
            EN: "Link to MP4 video file"
        }
    } : "videowebm" == e ? t = {
        type: "in",
        label: {
            RU: "РЎСЃС‹Р»РєР° РЅР° РІРёРґРµРѕ-С„Р°Р№Р» РІ С„РѕСЂРјР°С‚Рµ .WEBM",
            EN: "Link to WEBM video file"
        }
    } : "gallery" == e ? t = {
        type: "spec",
        label: {
            RU: "Р“Р°Р»РµСЂРµСЏ",
            EN: "Gallery"
        }
    } : "descr" == e ? t = {
        type: "te",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ",
            EN: "Description"
        },
        rmin: "y",
        rows: "4"
    } : "subtitle" == e ? t = {
        type: "te",
        label: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє",
            EN: "Subtitle"
        },
        rmin: "y",
        rows: "2"
    } : "text2" == e ? t = {
        type: "te",
        label: {
            RU: "РўРµРєСЃС‚ 2",
            EN: "Text 2"
        },
        rows: "10"
    } : "text3" == e ? t = {
        type: "te",
        label: {
            RU: "РўРµРєСЃС‚ 3",
            EN: "Text 3"
        },
        rows: "10"
    } : "text4" == e ? t = {
        type: "te",
        label: {
            RU: "РўРµРєСЃС‚ 4",
            EN: "Text 4"
        },
        rows: "10"
    } : "text1" == e ? t = {
        type: "te",
        label: {
            RU: "РўРµРєСЃС‚ 1",
            EN: "Text 1"
        },
        rows: "10"
    } : "img2" == e ? t = {
        type: "im",
        label: {
            RU: "РР·РѕР±СЂР°Р¶РµРЅРёРµ 2",
            EN: "Image 2"
        }
    } : "title2" == e ? t = {
        type: "te",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє 2",
            EN: "Title 2"
        },
        rmin: "y",
        rows: "2"
    } : "subtitle2" == e ? t = {
        type: "te",
        label: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє 2",
            EN: "Subtitle 2"
        },
        rmin: "y",
        rows: "2"
    } : "descr2" == e ? t = {
        type: "te",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ 2",
            EN: "Description 2"
        },
        rmin: "y",
        rows: "4"
    } : "img3" == e ? t = {
        type: "im",
        label: {
            RU: "РР·РѕР±СЂР°Р¶РµРЅРёРµ 3",
            EN: "Image 3"
        }
    } : "title3" == e ? t = {
        type: "te",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє 3",
            EN: "Title 3"
        },
        rmin: "y",
        rows: "2"
    } : "descr3" == e ? t = {
        type: "te",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ 3",
            EN: "Description 3"
        },
        rmin: "y",
        rows: "4"
    } : "number" == e ? t = {
        type: "in",
        label: {
            RU: "Р¦РёС„СЂР°",
            EN: "Number"
        }
    } : "number2" == e ? t = {
        type: "in",
        label: {
            RU: "Р¦РёС„СЂР° 2",
            EN: "Number 2"
        }
    } : "buttontitle" == e ? t = {
        type: "in",
        label: {
            RU: "РўРµРєСЃС‚ РєРЅРѕРїРєРё",
            EN: "Button Title"
        }
    } : "link2" == e ? t = {
        type: "ln",
        label: {
            EN: "Link 2"
        },
        ph: {
            EN: "Link"
        }
    } : "linktarget2" == e ? t = {
        type: "skip",
        label: {
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }
    } : "buttontitle2" == e ? t = {
        type: "in",
        label: {
            RU: "Р’С‚РѕСЂР°СЏ РєРЅРѕРїРєР°",
            EN: "Button 2 Title"
        }
    } : "link3" == e ? t = {
        type: "ln",
        label: {
            EN: "Link 3"
        },
        ph: {
            EN: "Link"
        }
    } : "linktarget3" == e ? t = {
        type: "skip",
        label: {
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }
    } : "buttontitle3" == e ? t = {
        type: "in",
        label: {
            RU: "РўСЂРµС‚СЊСЏ РєРЅРѕРїРєР°",
            EN: "Button 3 Title"
        }
    } : "img4" == e ? t = {
        type: "im",
        label: {
            RU: "РР·РѕР±СЂР°Р¶РµРЅРёРµ 4",
            EN: "Image 4"
        }
    } : "title4" == e ? t = {
        type: "te",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє 4",
            EN: "Title 4"
        },
        rmin: "y",
        rows: "2"
    } : "descr4" == e ? t = {
        type: "te",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ 4",
            EN: "Description 4"
        },
        rmin: "y",
        rows: "4"
    } : "link4" == e ? t = {
        type: "ln",
        label: {
            EN: "Link 4"
        },
        ph: {
            EN: "Link"
        }
    } : "linktarget4" == e ? t = {
        type: "skip",
        label: {
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }
    } : "buttontitle4" == e ? t = {
        type: "in",
        label: {
            RU: "Р§РµС‚РІРµСЂС‚Р°СЏ РєРЅРѕРїРєР°",
            EN: "Button 4 Title"
        }
    } : "number3" == e ? t = {
        type: "in",
        label: {
            RU: "Р¦РёС„СЂР° 3",
            EN: "Number 3"
        }
    } : "number4" == e ? t = {
        type: "in",
        label: {
            RU: "Р¦РёС„СЂР° 4",
            EN: "Number 4"
        }
    } : "imgtitle" == e ? t = {
        type: "te",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє РёР·РѕР±СЂР°Р¶РµРЅРёСЏ",
            EN: "Image Title"
        }
    } : "imgdescr" == e ? t = {
        type: "te",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ",
            EN: "Image Description"
        }
    } : "buttonlink" == e ? t = {
        type: "ln",
        label: {
            RU: "РЎСЃС‹Р»РєР° РґР»СЏ РєРЅРѕРїРєРё",
            EN: "Button Link"
        },
        hint: {
            RU: 'РџРѕР¶Р°Р»СѓР№СЃС‚Р°, СѓРєР°Р·С‹РІР°Р№С‚Рµ РїРѕР»РЅС‹Р№ Р°РґСЂРµСЃ СЃСЃС‹Р»РєРё, РЅР°С‡РёРЅР°СЋС‰РёР№СЃСЏ СЃ http:// РЎСЃС‹Р»РєРё РЅР° РґСЂСѓРіРёРµ СЃС‚СЂР°РЅРёС†С‹ РІР°С€РµРіРѕ СЃР°Р№С‚Р° РјРѕР¶РЅРѕ РЅР°С‡РёРЅР°С‚СЊ СЃ / Рё РЅРµ СѓРєР°Р·С‹РІР°С‚СЊ Р°РґСЂРµСЃ СЃР°Р№С‚Р°. РџРѕРґСЂРѕР±РЅРµРµ: <a href="https://help-ru.tilda.cc/link-to-page" target="_blank">РљР°Рє РїРѕСЃС‚Р°РІРёС‚СЊ СЃСЃС‹Р»РєСѓ РЅР° РґСЂСѓРіСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ</a>',
            EN: 'Please enter the full link address starting with http:// Links to other pages of your website can start with / and not include the full address of your website. Read more: <a href="https://help.tilda.cc/link-to-page" target="_blank">How to set link to other page</a>'
        }
    } : "buttonlinktarget" == e ? t = {
        type: "skip",
        label: {
            EN: "---"
        }
    } : "code" == e ? t = {
        type: "spec",
        label: {
            RU: "HTML РєРѕРґ / РљРѕРґ РІРёРґР¶РµС‚Р°",
            EN: "HTML code / Widget code"
        },
        rno: "y",
        rows: "10"
    } : "linkhook" == e ? t = {
        type: "spec",
        label: {
            RU: "РЎСЃС‹Р»РєР° РЅР° popup",
            EN: "Pop-up link"
        },
        hint: {
            RU: "РўРѕР»СЊРєРѕ Р»Р°С‚РёРЅСЃРєРёРµ Р±СѓРєРІС‹ Рё С†РёС„СЂС‹ Р±РµР· РїСЂРѕР±РµР»РѕРІ",
            EN: "Only latin letters and numbers without spaces"
        }
    } : "anchor" == e ? t = {
        type: "in",
        label: {
            RU: "РРјСЏ СЏРєРѕСЂРЅРѕР№ СЃСЃС‹Р»РєРё",
            EN: "Anchor link name"
        },
        hint: {
            RU: 'РџРѕРґСЂРѕР±РЅРµРµ РїСЂРѕ СЏРєРѕСЂРЅС‹Рµ СЃСЃС‹Р»РєРё, <a href="https://help-ru.tilda.cc/anchor" target="_blank">С‡РёС‚Р°Р№С‚Рµ РІ СЂР°Р·РґРµР»Рµ РџРѕРјРѕС‰СЊ</a>',
            EN: '<a href="https://help.tilda.cc/anchor" target="_blank">Learn more about anchor links</a>'
        }
    } : "mapprovider" == e ? t = {
        type: "sb",
        label: {
            RU: "РСЃС‚РѕС‡РЅРёРє РєР°СЂС‚",
            EN: "Online map service"
        },
        options: [{
            v: "google",
            EN: "Google Maps"
        }, {
            v: "yandex",
            EN: "Yandex Maps"
        }]
    } : "cont1" == e ? t = {
        type: "in",
        label: {
            EN: "cont1"
        }
    } : "zoom" == e ? t = {
        type: "in",
        label: {
            EN: "Zoom"
        }
    } : "mapmarkers" == e ? t = {
        type: "spec",
        label: {
            RU: "РћС‚РјРµС‚РєРё РЅР° РєР°СЂС‚Рµ",
            EN: "Coordinates"
        }
    } : "recids" == e ? t = {
        type: "spec",
        label: {
            RU: "ID Р‘Р»РѕРєРѕРІ",
            EN: "Block IDs"
        }
    } : "text5" == e ? t = {
        type: "te",
        label: {
            RU: "РўРµРєСЃС‚ 5",
            EN: "Text 5"
        },
        rows: "10"
    } : "aliasrecord" == e ? t = {
        type: "spec",
        label: {
            RU: "ID Р±Р»РѕРєР°",
            EN: "Alias Block ID"
        }
    } : "menuitems" == e ? t = {
        type: "spec",
        label: {
            RU: "РЎРїРёСЃРѕРє РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ:",
            EN: "List of menu items:"
        },
        uphint: {
            RU: "Р’ РєР°С‡РµСЃС‚РІРµ СЃСЃС‹Р»РєРё РЅСѓР¶РЅРѕ СѓРєР°Р·Р°С‚СЊ Р»РёР±Рѕ РїРѕР»РЅС‹Р№ Р°РґСЂРµСЃ СЃС‚СЂР°РЅРёС†С‹ РІРєР»СЋС‡Р°СЏ http:// Р»РёР±Рѕ РѕС‚РЅРѕСЃРёС‚РµР»СЊРЅС‹Р№ Р°РґСЂРµСЃ - С‚РѕР»СЊРєРѕ РЅР°Р·РІР°РЅРёРµ СЃС‚СЂР°РЅРёС†С‹ (РЅР°РїСЂРёРјРµСЂ /page7890.html РёР»Рё /about). РџРѕРґСЂРѕР±РЅРµРµ: <a href='https://help-ru.tilda.cc/link-to-page' target='_blank'>РљР°Рє РїРѕСЃС‚Р°РІРёС‚СЊ СЃСЃС‹Р»РєСѓ РЅР° РґСЂСѓРіСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ</a>. Р”Р»СЏ С‚РѕРіРѕ, С‡С‚РѕР±С‹ <a href='https://help-ru.tilda.cc/anchor' target='_blank'>СЃРґРµР»Р°С‚СЊ РЅР°РІРёРіР°С†РёСЋ РІРЅСѓС‚СЂРё СЃС‚СЂР°РЅРёС†С‹</a>, РЅСѓР¶РЅРѕ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ СЏРєРѕСЂРЅС‹Рµ СЃСЃС‹Р»РєРё (РЅР°РїСЂРёРјРµСЂ #contacts). Р§С‚РѕР±С‹ РґРѕР±Р°РІРёС‚СЊ СЏРєРѕСЂСЊ РЅР° СЃС‚СЂР°РЅРёС†Сѓ РёСЃРїРѕР»СЊР·СѓР№С‚Рµ Р±Р»РѕРє Р”СЂСѓРіРѕРµ->РЇРєРѕСЂРЅР°СЏ СЃСЃС‹Р»РєР°.",
            EN: "When you enter a URL, you can use the entire address including http://, or its short version including only the name of the page, e.g., /page7890.html or /about. Learn more: <a href='https://help.tilda.cc/link-to-page' target='_blank'>How to add a URL to another page</a>. To create a navigation menu within a single page, you can use Anchors (e.g., #contacts). To add an anchor to the page, go to the Block Library в†’ Other в†’ Anchor Link."
        }
    } : "pageslist" == e ? t = {
        type: "spec",
        label: {
            RU: "РЎРїРёСЃРѕРє СЃС‚СЂР°РЅРёС†",
            EN: "Page list"
        },
        uphint: {
            RU: "РћС‚РјРµС‚СЊС‚Рµ СЃС‚СЂР°РЅРёС†С‹ РёР· РІР°С€РµРіРѕ СЃР°Р№С‚Р°, РєРѕС‚РѕСЂС‹Рµ Р±СѓРґСѓС‚ РїРѕРєР°Р·С‹РІР°С‚СЊСЃСЏ РІ СЌС‚РѕРј Р±Р»РѕРєРµ РєР°Рє СЃРїРёСЃРѕРє РїРѕСЃС‚РѕРІ. Р—Р°РіРѕР»РѕРІРѕРє, РѕРїРёСЃР°РЅРёРµ Рё РёР·РѕР±СЂР°Р¶РµРЅРёРµ РїРѕРґС‚СЏРіРёРІР°СЋС‚СЃСЏ РёР· РЅР°СЃС‚СЂРѕРµРє СЃС‚СЂР°РЅРёС†С‹. РџРѕСЂСЏРґРѕРє СЃС‚СЂР°РЅРёС† Р·Р°РІРёСЃРёС‚ РѕС‚ С‚РѕРіРѕ, РІ РєР°РєРѕРј РїРѕСЂСЏРґРєРµ РѕРЅРё РЅР°С…РѕРґСЏС‚СЃСЏ РІ РѕР±С‰РµРј СЃРїРёСЃРєРµ СЃС‚СЂР°РЅРёС† СЃР°Р№С‚Р°. EРіРѕ РјРѕР¶РЅРѕ РёР·РјРµРЅРёС‚СЊ РїРµСЂРµС‚Р°СЃРєРёРІР°РЅРёРµРј РёР»Рё СѓРєР°Р·Р°РІ РёРј РїРѕСЂСЏРґРєРѕРІС‹Р№ РЅРѕРјРµСЂ РІ РЅР°СЃС‚СЂРѕР№РєР°С… СЃС‚СЂР°РЅРёС†С‹ в†’ Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕ. РўР°Рј Р¶Рµ РјРѕР¶РЅРѕ СѓРєР°Р·Р°С‚СЊ РґСЂСѓРіРѕР№ Р·Р°РіРѕР»РѕРІРѕРє, СЃРїРµС†РёР°Р»СЊРЅСѓСЋ СЃСЃС‹Р»РєСѓ РёР»Рё РїРѕРјРµРЅСЏС‚СЊ РґР°С‚Сѓ РїРѕСЃС‚Р°.",
            EN: "Select the web pages that should appear in this block as a list of blog posts. You can change title, description, and image in the Page Settings. The order of the pages depends on the pages' order in the general list of website pages. You can change it either by dragging or by specifying the index number of the page in the Page Settings в†’ Additional. You can also change its title, special link, or creation date."
        }
    } : "vimeoid" == e ? t = {
        type: "in",
        label: {
            EN: "Vimeo video ID"
        }
    } : "alllinktarget" == e ? t = {
        type: "sb",
        label: {
            RU: "Р¦РµР»СЊ РґР»СЏ РІСЃРµС… СЃСЃС‹Р»РѕРє Р±Р»РѕРєР°",
            EN: "Target for all block links"
        },
        options: [{
            v: "",
            RU: "Р’ СЌС‚РѕРј Р¶Рµ РѕРєРЅРµ",
            EN: "Same window"
        }, {
            v: "_blank",
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }]
    } : "buttonlink2" == e ? t = {
        type: "ln",
        label: {
            EN: "Button 2 Link"
        },
        ph: {
            EN: "Link"
        }
    } : "buttonlinktarget2" == e ? t = {
        type: "skip",
        label: {
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }
    } : "buttonlink3" == e ? t = {
        type: "ln",
        label: {
            EN: "Button 3 Link"
        },
        ph: {
            EN: "Link"
        }
    } : "buttonlinktarget3" == e ? t = {
        type: "skip",
        label: {
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }
    } : "inputplaceholder" == e ? t = {
        type: "in",
        label: {
            RU: "РџРѕРґСЃРєР°Р·РєР° Р·РЅР°С‡РµРЅРёСЏ РІ РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°",
            EN: "Placeholder Text"
        }
    } : "timepadeventid" == e ? t = {
        type: "in",
        label: {
            RU: "РљРѕРґ СЃРѕР±С‹С‚РёСЏ",
            EN: "Event ID"
        },
        hint: {
            RU: "РљРѕРґ СЃРѕР±С‹С‚РёСЏ вЂ” СЌС‚Рѕ РЅРѕРјРµСЂ, СѓРєР°Р·Р°РЅРЅС‹Р№ РІ СЃСЃС‹Р»РєРµ СЃС‚СЂР°РЅРёС†С‹ СЃРѕР±С‹С‚РёСЏ РЅР° Timepad.\n\t\t\t\t\t\t\t\t",
            EN: "Please find Event ID in the TimePad Event link."
        }
    } : "timepadcustomid" == e ? t = {
        type: "in",
        label: {
            RU: "ID РєР°СЃС‚РѕРјРёР·Р°С†РёРё",
            EN: "Customization ID"
        }
    } : "facebooklink" == e ? t = {
        type: "in",
        label: {
            EN: "Facebook profile URL"
        }
    } : "twitterlink" == e ? t = {
        type: "in",
        label: {
            EN: "Twitter profile URL"
        }
    } : "vklink" == e ? t = {
        type: "in",
        label: {
            EN: "VK profile URL"
        }
    } : "oklink" == e ? t = {
        type: "spec",
        label: {
            RU: "OK profile URL"
        }
    } : "behancelink" == e ? t = {
        type: "in",
        label: {
            EN: "Behance profile URL"
        }
    } : "instagramlink" == e ? t = {
        type: "in",
        label: {
            EN: "Instagram profile URL"
        }
    } : "pinterestlink" == e ? t = {
        type: "in",
        label: {
            EN: "Pinterest profile URL"
        }
    } : "vimeolink" == e ? t = {
        type: "in",
        label: {
            EN: "Vimeo profile URL"
        }
    } : "youtubelink" == e ? t = {
        type: "in",
        label: {
            EN: "Youtube channel URL"
        }
    } : "linkedinlink" == e ? t = {
        type: "in",
        label: {
            EN: "LinkedIn profile URL"
        }
    } : "soundcloudlink" == e ? t = {
        type: "in",
        label: {
            EN: "SoundCloud profile URL"
        }
    } : "telegramlink" == e ? t = {
        type: "in",
        label: {
            EN: "Telegram profile URL"
        }
    } : "whatsapplink" == e ? t = {
        type: "in",
        label: {
            EN: "WhatsApp profile URL"
        }
    } : "tiktoklink" == e ? t = {
        type: "in",
        label: {
            EN: "Tiktok profile URL"
        }
    } : "viberlink" == e ? t = {
        type: "in",
        label: {
            EN: "Viber profile URL"
        }
    } : "lang" == e ? t = {
        type: "spec",
        label: {
            RU: "РЇР·С‹Рє",
            EN: "Language"
        },
        ph: {
            EN: "En"
        }
    } : "langlink" == e ? t = {
        type: "skip",
        label: {
            EN: "---"
        }
    } : "lang2" == e ? t = {
        type: "spec",
        label: {
            RU: "Р’С‚РѕСЂРѕР№ СЏР·С‹Рє",
            EN: "Second Language"
        },
        ph: {
            EN: "Es"
        }
    } : "lang2link" == e ? t = {
        type: "skip",
        label: {
            EN: "---"
        }
    } : "soundcloudid" == e ? t = {
        type: "in",
        label: {
            EN: "SoundCloud Track ID"
        }
    } : "sharebuttons" == e ? t = {
        type: "spec",
        label: {
            RU: "Р РµРєРѕРјРµРЅРґР°С‚РµР»СЊРЅС‹Рµ РєРЅРѕРїРєРё",
            EN: "Share buttons"
        }
    } : "sharefacebook" == e ? t = {
        type: "skip",
        label: {
            EN: "Facebook share button"
        }
    } : "sharetwitter" == e ? t = {
        type: "skip",
        label: {
            EN: "Twitter share button"
        }
    } : "sharevk" == e ? t = {
        type: "skip",
        label: {
            EN: "VK share button"
        }
    } : "shareok" == e ? t = {
        type: "skip",
        label: {
            RU: "OK share button"
        }
    } : "formaction" == e ? t = {
        type: "spec",
        label: {
            EN: ""
        },
        ph: "",
        hint: ""
    } : "formmsgsuccess" == e ? t = {
        type: "spec",
        label: {
            RU: "РЎРѕРѕР±С‰РµРЅРёРµ РѕР± СѓСЃРїРµС€РЅРѕР№ РѕС‚РїСЂР°РІРєРµ РґР°РЅРЅС‹С…",
            EN: "Success message"
        },
        ph: {
            RU: "РЎРїР°СЃРёР±Рѕ! Р”Р°РЅРЅС‹Рµ СѓСЃРїРµС€РЅРѕ РѕС‚РїСЂР°РІР»РµРЅС‹.",
            EN: "Thank you! Your data has been successfully submitted."
        },
        rmin: "y",
        rows: "2",
        hint: ""
    } : "formajax" == e ? t = {
        type: "skip",
        label: {
            RU: "РїРѕСЃС‹Р»Р°С‚СЊ РґР°РЅРЅС‹Рµ Р±РµР· РїРµСЂРµР·Р°РіСЂСѓР·РєРё СЃС‚СЂР°РЅРёС†С‹ (AJAX)",
            EN: "submit data without reloading the page (AJAX)"
        }
    } : "formtarget" == e ? t = {
        type: "skip",
        label: {
            RU: "Р¦РµР»СЊ С„РѕСЂРјС‹",
            EN: "Form Target"
        },
        hint: {
            RU: 'РќРµРѕР±С…РѕРґРёРјРѕ СѓРєР°Р·Р°С‚СЊ Р°РґСЂРµСЃ СЃРєСЂРёРїС‚Р°, РєРѕС‚РѕСЂС‹Р№ РїСЂРёРЅРёРјР°РµС‚ Р·РЅР°С‡РµРЅРёСЏ РёР· С„РѕСЂРјС‹. РљР°Рє РЅР°СЃС‚СЂРѕРёС‚СЊ РїСЂРёРµРј РґР°РЅРЅС‹С… РёР· С„РѕСЂРјС‹, <a href="https://help-ru.tilda.cc/forms" target="_blank">С‡РёС‚Р°Р№С‚Рµ РІ СЂР°Р·РґРµР»Рµ РџРѕРјРѕС‰СЊ</a>',
            EN: 'Enter the address of the script that is to receive data submitted through the form. Check out our <a href="https://help.tilda.cc/forms" target="_blank">guide to setting up data collection forms</a>.'
        },
        options: [{
            v: "",
            RU: "Р’ СЌС‚РѕРј Р¶Рµ РѕРєРЅРµ",
            EN: "Same window"
        }, {
            v: "_blank",
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }]
    } : "formmsgurl" == e ? t = {
        type: "spec",
        label: {
            RU: "РђРґСЂРµСЃ СЃС‚СЂР°РЅРёС†С‹ РІ СЃР»СѓС‡Р°Рµ СѓСЃРїРµС…Р°",
            EN: "Success page URL"
        },
        ph: {
            EN: "http://example.com"
        },
        hint: {
            RU: "РЈРєР°Р¶РёС‚Рµ РїРѕР»РЅС‹Р№ Р°РґСЂРµСЃ (http://...). Р’ СЃР»СѓС‡Р°Рµ СѓСЃРїРµС€РЅРѕР№ РѕС‚РїСЂР°РІРєРё РґР°РЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ Р±СѓРґРµС‚ РјРіРЅРѕРІРµРЅРЅРѕ РїРµСЂРµРЅР°РїСЂР°РІР»РµРЅ РЅР° СѓРєР°Р·Р°РЅРЅСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ",
            EN: "Enter a full URL (starting with http://вЂ¦). On successful data submission, the user will be immediately redirected to the specified page."
        }
    } : "subtitle3" == e ? t = {
        type: "te",
        label: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє 3",
            EN: "Subtitle 3"
        },
        rmin: "y",
        rows: "2"
    } : "subtitle4" == e ? t = {
        type: "te",
        label: {
            RU: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє 4",
            EN: "Subtitle 4"
        },
        rmin: "y",
        rows: "2"
    } : "slideshare_url" == e ? t = {
        type: "in",
        label: {
            RU: "РЎСЃС‹Р»РєР° РЅР° slideshare-РїСЂРµР·РµРЅС‚Р°С†РёСЋ (URL)",
            EN: "Slideshare-presentation URL"
        }
    } : "inputplaceholder2" == e ? t = {
        type: "in",
        label: {
            RU: "РџРѕРґСЃРєР°Р·РєР° Р·РЅР°С‡РµРЅРёСЏ РІРѕ РІС‚РѕСЂРѕРј РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°",
            EN: "Placeholder Text 2"
        }
    } : "inputplaceholder3" == e ? t = {
        type: "in",
        label: {
            RU: "РџРѕРґСЃРєР°Р·РєР° Р·РЅР°С‡РµРЅРёСЏ РІ С‚СЂРµС‚СЊРµРј РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°",
            EN: "Placeholder Text 3"
        }
    } : "slideqty" == e ? t = {
        type: "sb",
        label: {
            RU: "РљРѕР»РёС‡РµСЃС‚РІРѕ СЃР»Р°Р№РґРѕРІ",
            EN: "Number of Slides"
        },
        options: [{
            v: "1",
            EN: "1"
        }, {
            v: "2",
            EN: "2"
        }, {
            v: "3",
            EN: "3"
        }, {
            v: "4",
            EN: "4"
        }, {
            v: "5",
            EN: "5"
        }]
    } : "img5" == e ? t = {
        type: "im",
        label: {
            RU: "РР·РѕР±СЂР°Р¶РµРЅРёРµ 5",
            EN: "Image 5"
        }
    } : "title5" == e ? t = {
        type: "te",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє 5",
            EN: "Title 5"
        },
        rmin: "y",
        rows: "2"
    } : "descr5" == e ? t = {
        type: "te",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ 5",
            EN: "Description 5"
        },
        rmin: "y",
        rows: "4"
    } : "btitle" == e ? t = {
        type: "te",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє Р±Р»РѕРєР°",
            EN: "Block title"
        },
        rmin: "y",
        rows: "2"
    } : "bdescr" == e ? t = {
        type: "te",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ Р±Р»РѕРєР°",
            EN: "Block description"
        },
        rmin: "y",
        rows: "4"
    } : "forminputs" == e ? t = {
        type: "spec",
        label: {
            EN: ""
        }
    } : "inputtitle" == e ? t = {
        type: "in",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє РїРѕР»СЏ РґР»СЏ РІРІРѕРґР°",
            EN: "Input Field Title"
        }
    } : "inputtitle2" == e ? t = {
        type: "in",
        label: {
            RU: "Р’С‚РѕСЂРѕРµ РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°",
            EN: "Input Field Title 2"
        }
    } : "inputtitle3" == e ? t = {
        type: "in",
        label: {
            RU: "РўСЂРµС‚СЊРµ РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°",
            EN: "Input Field Title 3"
        }
    } : "textareatitle" == e ? t = {
        type: "in",
        label: {
            RU: "РџРѕР»СЏ РґР»СЏ РІРІРѕРґР°",
            EN: "Text Input"
        }
    } : "textareaplaceholder" == e ? t = {
        type: "in",
        label: {
            RU: "РџРѕРґСЃРєР°Р·РєР° РІ РїРѕР»Рµ РґР»СЏ РІРІРѕРґР° С‚РµРєСЃС‚Р°",
            EN: "Placeholder Text"
        }
    } : "list" == e || "soclinks" == e ? t = {
        type: "spec",
        label: {
            EN: ""
        }
    } : "menu_carticon_chb" == e ? t = {
        type: "cb",
        caption: {
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ РёРєРѕРЅРєСѓ РєРѕСЂР·РёРЅС‹ РІ РјРµРЅСЋ",
            EN: "Show cart icon in menu"
        },
        hint: {
            RU: "РќРµРѕР±С…РѕРґРёРјРѕ РґРѕР±Р°РІРёС‚СЊ РЅР° СЃС‚СЂР°РЅРёС†Сѓ Р±Р»РѕРє <b>РљРѕСЂР·РёРЅС‹ (ST100)</b>",
            EN: "<b>Shopping cart block (ST100)</b> should be added to the page"
        }
    } : "menu_wishlisticon_chb" == e ? t = {
        type: "cb",
        caption: {
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ РёРєРѕРЅРєСѓ РёР·Р±СЂР°РЅРЅРѕРµ РІ РјРµРЅСЋ",
            EN: "Show favorites icon in menu"
        },
        hint: {
            RU: "РќРµРѕР±С…РѕРґРёРјРѕ РґРѕР±Р°РІРёС‚СЊ РЅР° СЃС‚СЂР°РЅРёС†Сѓ Р±Р»РѕРє <b>РР·Р±СЂР°РЅРЅРѕРіРѕ (ST110)</b>",
            EN: "<b>Favorites block (ST110)</b> should be added to the page"
        }
    } : "menu_searchicon_chb" == e ? t = {
        type: "cb",
        caption: {
            RU: "РџРѕРєР°Р·С‹РІР°С‚СЊ РёРєРѕРЅРєСѓ РїРѕРёСЃРєР° РІ РјРµРЅСЋ",
            EN: "Show search icon in menu"
        },
        hint: {
            RU: "РќРµРѕР±С…РѕРґРёРјРѕ РґРѕР±Р°РІРёС‚СЊ РЅР° СЃС‚СЂР°РЅРёС†Сѓ Р±Р»РѕРє <b>РџРѕРёСЃРєР° (T985)</b>",
            EN: "<b>Website search block (T985)</b> should be added to the page"
        }
    } : "menu_hidewidgetbtns_chb" == e ? t = {
        type: "cb",
        caption: {
            RU: "РќРµ РїРѕРєР°Р·С‹РІР°С‚СЊ РѕС‚РґРµР»СЊРЅС‹Рµ РєРЅРѕРїРєРё РІРёРґР¶РµС‚РѕРІ",
            EN: "Don't show native widget buttons"
        },
        hint: {
            RU: "",
            EN: ""
        }
    } : "menu_mob_title" == e ? t = {
        type: "in",
        label: {
            RU: "РќР°Р·РІР°РЅРёРµ РјРѕР±РёР»СЊРЅРѕРіРѕ РјРµРЅСЋ",
            EN: "Mobile menu name"
        }
    } : "programmlang" == e ? t = {
        type: "sb",
        label: {
            RU: "РЇР·С‹Рє РїСЂРѕРіСЂР°РјРјРёСЂРѕРІР°РЅРёСЏ",
            EN: "Programming language"
        },
        options: [{
            v: "auto",
            EN: "auto"
        }, {
            v: "apache",
            EN: "Apache config"
        }, {
            v: "bash",
            EN: "Bash"
        }, {
            v: "cs",
            EN: "C#"
        }, {
            v: "css",
            EN: "CSS"
        }, {
            v: "cpp",
            EN: "C++"
        }, {
            v: "erlang",
            EN: "Erlang"
        }, {
            v: "go",
            EN: "Go"
        }, {
            v: "haskell",
            EN: "Haskell"
        }, {
            v: "html",
            EN: "HTML"
        }, {
            v: "http",
            EN: "HTTP"
        }, {
            v: "ini",
            EN: "Ini config"
        }, {
            v: "java",
            EN: "Java"
        }, {
            v: "javascript",
            EN: "JavaScript"
        }, {
            v: "json",
            EN: "JSON"
        }, {
            v: "markdown",
            EN: "Markdown"
        }, {
            v: "nginx",
            EN: "Nginx config"
        }, {
            v: "php",
            EN: "PHP"
        }, {
            v: "python",
            EN: "Python"
        }, {
            v: "ruby",
            EN: "Ruby"
        }, {
            v: "sql",
            EN: "SQL"
        }, {
            v: "xml",
            EN: "XML"
        }]
    } : "textsimple" == e ? t = {
        type: "te",
        label: {
            RU: "РўРµРєСЃС‚",
            EN: "Text"
        },
        rno: "y",
        rows: "10"
    } : "inputtitle4" == e ? t = {
        type: "in",
        label: {
            RU: "Р§РµС‚РІРµСЂС‚РѕРµ РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°",
            EN: "Input Field Title 4"
        }
    } : "inputplaceholder4" == e ? t = {
        type: "in",
        label: {
            RU: "РџРѕРґСЃРєР°Р·РєР° Р·РЅР°С‡РµРЅРёСЏ РІ С‡РµС‚РІРµСЂС‚РѕРј РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°",
            EN: "Placeholder Text 4"
        }
    } : "inputplaceholder5" == e ? t = {
        type: "in",
        label: {
            RU: "РџРѕРґСЃРєР°Р·РєР° Р·РЅР°С‡РµРЅРёСЏ РІ РїСЏС‚РѕРј РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°",
            EN: "Placeholder Text 5"
        }
    } : "img1" == e ? t = {
        type: "im",
        label: {
            RU: "РР·РѕР±СЂР°Р¶РµРЅРёРµ 1",
            EN: "Image 1"
        }
    } : "inputtitle5" == e ? t = {
        type: "in",
        label: {
            RU: "РџСЏС‚РѕРµ РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°",
            EN: "Input Field Title 5"
        }
    } : "likefacebook" == e ? t = {
        type: "cb",
        caption: {
            EN: "Facebook like button"
        }
    } : "userpayment" == e ? t = {
        type: "spec",
        label: {
            RU: "РџРѕРґРєР»СЋС‡РёС‚Рµ РїР»Р°С‚РµР¶РЅСѓСЋ СЃРёСЃС‚РµРјСѓ (PayPal РёР»Рё РЇРЅРґРµРєСЃ Р”РµРЅСЊРіРё) РІ РЅР°СЃС‚СЂРѕР№РєР°С… СЃР°Р№С‚Р°",
            EN: "Please connect a payment system in the Site Settings"
        }
    } : "price" == e ? t = {
        type: "in",
        label: {
            RU: "РЎС‚РѕРёРјРѕСЃС‚СЊ С‚РѕРІР°СЂР°/СѓСЃР»СѓРіРё",
            EN: "Product or Service Price"
        }
    } : "productname" == e ? t = {
        type: "in",
        label: {
            RU: "РќР°Р·РІР°РЅРёРµ С‚РѕРІР°СЂР°/СѓСЃР»СѓРіРё",
            EN: "Product or Service Name"
        }
    } : "cont2" == e ? t = {
        type: "in",
        label: {
            EN: "cont2"
        }
    } : "gallery_insta" == e ? t = {
        type: "spec",
        label: {
            RU: "РџРѕРґРєР»СЋС‡РёС‚СЊ Instagram",
            EN: "Connect Instagram"
        },
        uphint: {
            RU: "РџСЂРё РїРѕРґРєР»СЋС‡РµРЅРЅРѕРј Р°РєРєР°СѓРЅС‚Рµ С„РѕС‚РѕРіСЂР°С„РёРё РёР· Instagram РїРѕРєР°Р·С‹РІР°СЋС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё. РћР±РЅРѕРІР»РµРЅРёСЏ Рё РїРµСЂРµРїСѓР±Р»РёРєР°С†РёРё СЃС‚СЂР°РЅРёС†С‹ РЅРµ С‚СЂРµР±СѓРµС‚СЃСЏ. РљРѕР»РёС‡РµСЃС‚РІРѕ С„РѕС‚РѕРіСЂР°С„РёР№ РІ Р±Р»РѕРєРµ РЅР°СЃС‚СЂР°РёРІР°РµС‚СЃСЏ РІ РјРµРЅСЋ В«РќР°СЃС‚СЂРѕР№РєРёВ» СЌС‚РѕРіРѕ Р±Р»РѕРєР°. РџРѕРґРєР»СЋС‡Р°СЏ Р°РєРєР°СѓРЅС‚, РІС‹ РґР°РµС‚Рµ СЂР°Р·СЂРµС€РµРЅРёРµ С‚РѕР»СЊРєРѕ РЅР° РїРѕРєР°Р· С„РѕС‚РѕРіСЂР°С„РёР№ РЅР° СЃР°Р№С‚Рµ. РџСЂРёР»РѕР¶РµРЅРёРµ РЅРµ РёРјРµРµС‚ РґРѕСЃС‚СѓРї Рє СЃРѕРѕР±С‰РµРЅРёСЏРј Рё РЅРµ РјРѕР¶РµС‚ РїСѓР±Р»РёРєРѕРІР°С‚СЊ РёР»Рё СѓРґР°Р»СЏС‚СЊ РЅРёРєР°РєСѓСЋ РёРЅС„РѕСЂРјР°С†РёСЋ.",
            EN: "While your Instagram account is connected to Tilda, its images are displayed on the page automatically. You don't need to update or re-publish the page. You can specify the number of photos to display in the Settings panel of the block. By connecting your Instagram account to Tilda, you only allow the app to display photos on your website. It doesn't have access to your messages. It can neither publish nor delete any information."
        }
    } : "img6" == e ? t = {
        type: "im",
        label: {
            RU: "РР·РѕР±СЂР°Р¶РµРЅРёРµ 6",
            EN: "Image 6"
        }
    } : "img7" == e ? t = {
        type: "im",
        label: {
            RU: "РР·РѕР±СЂР°Р¶РµРЅРёРµ 7",
            EN: "Image 7"
        }
    } : "img8" == e ? t = {
        type: "im",
        label: {
            RU: "РР·РѕР±СЂР°Р¶РµРЅРёРµ 8",
            EN: "Image 8"
        }
    } : "link5" == e ? t = {
        type: "ln",
        label: {
            EN: "Link 5"
        },
        ph: {
            EN: "Link"
        }
    } : "link6" == e ? t = {
        type: "ln",
        label: {
            EN: "Link 6"
        },
        ph: {
            EN: "Link"
        }
    } : "youtubeid2" == e ? t = {
        type: "in",
        label: {
            RU: "РЎСЃС‹Р»РєР° 2 РЅР° Youtube-СЂРѕР»РёРє РёР»Рё РµРіРѕ id",
            EN: "YouTube video URL or ID 2"
        }
    } : "vimeoid2" == e ? t = {
        type: "in",
        label: {
            EN: "Vimeo video ID 2"
        }
    } : "coub_url" == e ? t = {
        type: "in",
        label: {
            RU: "РЎСЃС‹Р»РєР° РЅР° coub-РІРёРґРµРѕ (URL)",
            EN: "Coub video URL"
        }
    } : "authorname" == e ? t = {
        type: "te",
        label: {
            RU: "РђРІС‚РѕСЂ",
            EN: "Author"
        },
        rmin: "y",
        rows: "2"
    } : "title1" == e ? t = {
        type: "te",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє 1",
            EN: "Title 1"
        },
        rmin: "y",
        rows: "2"
    } : "descr1" == e ? t = {
        type: "te",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ 1",
            EN: "Description 1"
        },
        rmin: "y",
        rows: "4"
    } : "buttontitle5" == e ? t = {
        type: "in",
        label: {
            RU: "РљРЅРѕРїРєР° 5",
            EN: "Button 5 Title"
        }
    } : "linktarget5" == e ? t = {
        type: "skip",
        label: {
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }
    } : "paymentformhelp" == e ? t = {
        type: "spec",
        hint: {
            RU: 'Р”Р°РЅРЅС‹Р№ Р±Р»РѕРє РґРѕР±Р°РІР»СЏРµС‚ С„СѓРЅРєС†РёСЋ РѕРїР»Р°С‚С‹ Рє Р»СЋР±РѕР№ РєРЅРѕРїРєРµ РёР»Рё С‚РµРєСЃС‚Сѓ РЅР° РІР°С€РµР№ СЃС‚СЂР°РЅРёС†Рµ.<br><br>РЈРєР°Р¶РёС‚Рµ РІ РїРѕР»Рµ В«cСЃС‹Р»РєР°В» (РІ Р»СЋР±РѕР№ РєРЅРѕРїРєРµ, РёР·РѕР±СЂР°Р¶РµРЅРёРё РёР»Рё С‚РµРєСЃС‚Рµ) РєРѕРґ: <b>#price:P:N</b><br>РіРґРµ P - СЃСѓРјРјР° РїР»Р°С‚РµР¶Р° (С†РµР»РѕРµ С‡РёСЃР»Рѕ), Р° N - РЅР°Р·РІР°РЅРёРµ С‚РѕРІР°СЂР° РёР»Рё СѓСЃР»СѓРіРё<br>РџСЂРёРјРµСЂ: <b>#price:7000:РљСѓСЂСЃ РћСЃРЅРѕРІС‹ РґРёР·Р°Р№РЅР° С†РёС„СЂРѕРІРѕР№ СЃСЂРµРґС‹</b><br><br>РџРѕРґСЂРѕР±РЅРµРµ РІ СЃРїСЂР°РІРѕС‡РЅРѕРј С†РµРЅС‚СЂРµ <a href="https://help-ru.tilda.cc/payments" target="_blank">https://help-ru.tilda.cc/payments</a>',
            EN: 'This block adds the payment option to any button or text on the page. <br><br>Enter the code <b>#price:P:N</b> in the вЂњLinkвЂќ field of any button, image, or text block,<br>where вЂњPвЂќ is the price and вЂњNвЂќ is the product or service name.<br>For example: <b>#price:100:Digital Design Basic Course.</b><br><br>Learn more in our Help Center <a href="https://help.tilda.cc/payments">https://help.tilda.cc/payments</a>'
        }
    } : "cont3" == e ? t = {
        type: "in",
        label: {
            EN: "cont3"
        }
    } : "cont4" == e ? t = {
        type: "in",
        label: {
            EN: "cont4"
        }
    } : "cont5" == e ? t = {
        type: "in",
        label: {
            EN: "cont5"
        }
    } : "cont6" == e ? t = {
        type: "in",
        label: {
            EN: "cont6"
        }
    } : "cont7" == e ? t = {
        type: "in",
        label: {
            EN: "cont7"
        }
    } : "buttonlink4" == e ? t = {
        type: "ln",
        label: {
            EN: "Button 4 Link"
        },
        ph: {
            EN: "Link"
        }
    } : "buttonlinktarget4" == e ? t = {
        type: "skip",
        label: {
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }
    } : "price_old" == e ? t = {
        type: "in",
        label: {
            RU: "РЎС‚Р°СЂР°СЏ Р¦РµРЅР°",
            EN: "Old Price"
        }
    } : "prod_option" == e ? t = {
        type: "spec",
        label: {
            RU: "РќР°Р·РІР°РЅРёРµ РїР°СЂР°РјРµС‚СЂР°",
            EN: "Option name"
        },
        ph: {
            RU: "Р¦РІРµС‚",
            EN: "Color"
        }
    } : "prod_variants" == e ? t = {
        type: "skip",
        label: {
            RU: "Р—РЅР°С‡РµРЅРёСЏ РїР°СЂР°РјРµС‚СЂР°",
            EN: "Option values"
        },
        ph: {
            RU: "РџРµСЂРµС‡РёСЃР»РёС‚Рµ РІР°СЂРёР°РЅС‚С‹, РѕС‚РґРµР»СЏСЏ РёС… РїРµСЂРµРЅРѕСЃРѕРј СЃС‚СЂРѕРєРё",
            EN: "List the variants, each variant on a separate line"
        },
        rmin: "y",
        rno: "y",
        rows: "3"
    } : "prod_option2" == e ? t = {
        type: "skip",
        label: {
            RU: "РќР°Р·РІР°РЅРёРµ РІС‚РѕСЂРѕРіРѕ РїР°СЂР°РјРµС‚СЂР°",
            EN: "Option 2 name"
        },
        ph: {
            RU: "Р Р°Р·РјРµСЂ",
            EN: "Size"
        }
    } : "prod_variants2" == e ? t = {
        type: "skip",
        label: {
            RU: "Р—РЅР°С‡РµРЅРёСЏ РІС‚РѕСЂРѕРіРѕ РїР°СЂР°РјРµС‚СЂР°",
            EN: "Option 2 values"
        },
        ph: {
            RU: "РџРµСЂРµС‡РёСЃР»РёС‚Рµ РІР°СЂРёР°РЅС‚С‹, РѕС‚РґРµР»СЏСЏ РёС… РїРµСЂРµРЅРѕСЃРѕРј СЃС‚СЂРѕРєРё",
            EN: "List the variants, each variant on a separate line"
        },
        rmin: "y",
        rno: "y",
        rows: "3"
    } : "prod_option3" == e ? t = {
        type: "skip",
        label: {
            RU: "РќР°Р·РІР°РЅРёРµ С‚СЂРµС‚СЊРµРіРѕ РїР°СЂР°РјРµС‚СЂР°",
            EN: "Option 3 name"
        }
    } : "prod_variants3" == e ? t = {
        type: "skip",
        label: {
            RU: "Р—РЅР°С‡РµРЅРёСЏ С‚СЂРµС‚СЊРµРіРѕ РїР°СЂР°РјРµС‚СЂР°",
            EN: "Option 3 values"
        },
        ph: {
            RU: "РџРµСЂРµС‡РёСЃР»РёС‚Рµ РІР°СЂРёР°РЅС‚С‹, РѕС‚РґРµР»СЏСЏ РёС… РїРµСЂРµРЅРѕСЃРѕРј СЃС‚СЂРѕРєРё",
            EN: "List the variants, each variant on a separate line"
        },
        rmin: "y",
        rno: "y",
        rows: "3"
    } : "buttonlink_prod" == e ? t = {
        type: "spec",
        label: {
            EN: "---"
        },
        options: [{
            v: "",
            RU: "РЎСЃС‹Р»РєР°",
            EN: "Link"
        }, {
            v: "order",
            RU: "Р”РѕР±Р°РІРёС‚СЊ РІ РєРѕСЂР·РёРЅСѓ",
            EN: "Add to Cart"
        }]
    } : "price2" == e ? t = {
        type: "in",
        label: {
            RU: "Р¦РµРЅР° 2",
            EN: "Price 2"
        }
    } : "price2_old" == e ? t = {
        type: "in",
        label: {
            RU: "РЎС‚Р°СЂР°СЏ Р¦РµРЅР° 2",
            EN: "Old Price 2"
        }
    } : "price3" == e ? t = {
        type: "in",
        label: {
            RU: "Р¦РµРЅР° 3",
            EN: "Price 3"
        }
    } : "price3_old" == e ? t = {
        type: "in",
        label: {
            RU: "РЎС‚Р°СЂР°СЏ Р¦РµРЅР° 3",
            EN: "Old Price 3"
        }
    } : "buttontitle6" == e ? t = {
        type: "in",
        label: {
            RU: "РљРЅРѕРїРєР° 6",
            EN: "Button 6 Title"
        }
    } : "buttonlink6" == e ? t = {
        type: "ln",
        label: {
            EN: "Button 6 Link"
        },
        ph: {
            EN: "Link"
        }
    } : "price4" == e ? t = {
        type: "in",
        label: {
            RU: "Р¦РµРЅР° 4",
            EN: "Price 4"
        }
    } : "price4_old" == e ? t = {
        type: "in",
        label: {
            RU: "РЎС‚Р°СЂР°СЏ Р¦РµРЅР° 4",
            EN: "Old Price 4"
        }
    } : "buttontitle7" == e ? t = {
        type: "in",
        label: {
            RU: "РљРЅРѕРїРєР° 7",
            EN: "Button 7 Title"
        }
    } : "buttontitle8" == e ? t = {
        type: "in",
        label: {
            RU: "РљРЅРѕРїРєР° 8",
            EN: "Button 8 Title"
        }
    } : "buttonlink8" == e ? t = {
        type: "ln",
        label: {
            EN: "Button 8 Link"
        },
        ph: {
            EN: "Link"
        }
    } : "buttonlinktarget6" == e || "buttonlinktarget8" == e ? t = {
        type: "skip",
        label: {
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }
    } : "paymentoff" == e ? t = {
        type: "cb",
        caption: {
            RU: "Р’С‹РєР»СЋС‡РёС‚СЊ РѕРїР»Р°С‚Сѓ",
            EN: "Disable payment"
        }
    } : "text6" == e ? t = {
        type: "te",
        label: {
            RU: "РўРµРєСЃС‚ 6",
            EN: "Text 6"
        },
        rows: "10"
    } : "text7" == e ? t = {
        type: "te",
        label: {
            RU: "РўРµРєСЃС‚ 7",
            EN: "Text 7"
        },
        rows: "10"
    } : "shop_prod_id" == e ? t = {
        type: "in",
        label: {
            EN: "shop_prod_id"
        }
    } : "shop_prod2_id" == e ? t = {
        type: "in",
        label: {
            EN: "shop_prod2_id"
        }
    } : "shop_prod3_id" == e ? t = {
        type: "in",
        label: {
            EN: "shop_prod3_id"
        }
    } : "shop_prod4_id" == e ? t = {
        type: "in",
        label: {
            EN: "shop_prod4_id"
        }
    } : "recids2" == e ? t = {
        type: "spec",
        label: {
            RU: "ID Р‘Р»РѕРєРѕРІ 2",
            EN: "Block IDs 2"
        }
    } : "recids3" == e ? t = {
        type: "spec",
        label: {
            RU: "ID Р‘Р»РѕРєРѕРІ 3",
            EN: "Block IDs 3"
        }
    } : "recids4" == e ? t = {
        type: "spec",
        label: {
            RU: "ID Р‘Р»РѕРєРѕРІ 4",
            EN: "Block IDs 4"
        }
    } : "recids5" == e ? t = {
        type: "spec",
        label: {
            RU: "ID Р‘Р»РѕРєРѕРІ 5",
            EN: "Block IDs 5"
        }
    } : "recids6" == e ? t = {
        type: "spec",
        label: {
            RU: "ID Р‘Р»РѕРєРѕРІ 6",
            EN: "Block IDs 6"
        }
    } : "recids7" == e ? t = {
        type: "spec",
        label: {
            RU: "ID Р‘Р»РѕРєРѕРІ 7",
            EN: "Block IDs 7"
        }
    } : "recids8" == e ? t = {
        type: "spec",
        label: {
            RU: "ID Р‘Р»РѕРєРѕРІ 8",
            EN: "Block IDs 8"
        }
    } : "link7" == e ? t = {
        type: "ln",
        label: {
            EN: "Link 7"
        },
        ph: {
            EN: "Link"
        }
    } : "linktarget6" == e || "linktarget7" == e ? t = {
        type: "skip",
        label: {
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }
    } : "link8" == e ? t = {
        type: "ln",
        label: {
            EN: "Link 8"
        },
        ph: {
            EN: "Link"
        }
    } : "linktarget8" == e ? t = {
        type: "skip",
        label: {
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }
    } : "title6" == e ? t = {
        type: "te",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє 6",
            EN: "Title 6"
        },
        rmin: "y",
        rows: "2"
    } : "descr6" == e ? t = {
        type: "te",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ 6",
            EN: "Description 6"
        },
        rmin: "y",
        rows: "4"
    } : "title7" == e ? t = {
        type: "te",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє 7",
            EN: "Title 7"
        },
        rmin: "y",
        rows: "2"
    } : "title8" == e ? t = {
        type: "te",
        label: {
            RU: "Р—Р°РіРѕР»РѕРІРѕРє 8",
            EN: "Title 8"
        },
        rmin: "y",
        rows: "2"
    } : "bbuttontitle" == e ? t = {
        type: "in",
        label: {
            RU: "РўРµРєСЃС‚ РєРЅРѕРїРєРё",
            EN: "Button Title"
        }
    } : "bbuttonlink" == e ? t = {
        type: "ln",
        label: {
            EN: "Button Link"
        },
        ph: {
            EN: "Link"
        }
    } : "bbuttonlinktarget" == e ? t = {
        type: "skip",
        label: {
            RU: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
            EN: "New window"
        }
    } : "bgimg" == e ? t = {
        type: "im",
        label: {
            RU: "Р¤РѕРЅРѕРІРѕРµ РёР·РѕР±СЂР°Р¶РµРЅРёРµ",
            EN: "Background image"
        }
    } : "descr7" == e ? t = {
        type: "te",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ 7",
            EN: "Description 7"
        },
        rmin: "y",
        rows: "4"
    } : "descr8" == e ? t = {
        type: "te",
        label: {
            RU: "РћРїРёСЃР°РЅРёРµ 8",
            EN: "Description 8"
        },
        rmin: "y",
        rows: "4"
    } : "storepart" == e ? t = {
        type: "spec",
        label: {
            RU: "Р’С‹РІРѕРґРёС‚СЊ С‚РѕРІР°СЂС‹ РёР· РєР°С‚Р°Р»РѕРіР°",
            EN: "Show products from the Catalog"
        },
        hint: {
            RU: '\n\tР•СЃР»Рё Сѓ РІР°СЃ РјРЅРѕРіРѕ С‚РѕРІР°СЂРѕРІ, РІС‹ РјРѕР¶РµС‚Рµ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ <a href="/identity/gostore/?projectid=">РєР°С‚Р°Р»РѕРі С‚РѕРІР°СЂРѕРІ</a>.\t',
            EN: '\n\tIf you have a lot of products, you can create a <a href="/identity/gostore/?projectid=">Product Catalog</a>'
        },
        options: [{
            v: "",
            RU: "РќРµ Р·Р°РґР°РЅ",
            EN: "Not set"
        }]
    } : "storeprod" == e ? t = {
        type: "spec",
        label: {
            RU: "ID С‚РѕРІР°СЂР° РІ РєР°С‚Р°Р»РѕРіРµ",
            EN: "Product ID in the Catalog"
        }
    } : "cont" == e ? t = {
        type: "in",
        label: {
            EN: "cont"
        }
    } : "storebtntitleprod" == e ? t = {
        type: "in",
        label: {
            RU: "РќР°Р·РІР°РЅРёРµ РєРЅРѕРїРєРё РґР»СЏ РєР°СЂС‚РѕС‡РєРё С‚РѕРІР°СЂР°",
            EN: "Button title for product card"
        }
    } : "storebtnlinkprod" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎСЃС‹Р»РєР° РґР»СЏ РєР°СЂС‚РѕС‡РєРё С‚РѕРІР°СЂР° Рё РїРµСЂРІРѕР№ РєРЅРѕРїРєРё",
            EN: "Link for product card and button 1"
        },
        options: [{
            v: "popup",
            RU: "РџРѕРґСЂРѕР±РЅРµРµ Рѕ С‚РѕРІР°СЂРµ",
            EN: "View full product info"
        }, {
            v: "order",
            RU: "Р”РѕР±Р°РІРёС‚СЊ РІ РєРѕСЂР·РёРЅСѓ",
            EN: "Add to Cart"
        }]
    } : "storebtntitleprod2" == e ? t = {
        type: "in",
        label: {
            RU: "РќР°Р·РІР°РЅРёРµ РІС‚РѕСЂРѕР№ РєРЅРѕРїРєРё РґР»СЏ РєР°СЂС‚РѕС‡РєРё С‚РѕРІР°СЂР°",
            EN: "Second button title for product card"
        }
    } : "storebtnlinkprod2" == e ? t = {
        type: "sb",
        label: {
            RU: "РЎСЃС‹Р»РєР° РІС‚РѕСЂРѕР№ РєРЅРѕРїРєРё",
            EN: "Second button link"
        },
        options: [{
            v: "popup",
            RU: "РџРѕРґСЂРѕР±РЅРµРµ Рѕ С‚РѕРІР°СЂРµ",
            EN: "View full product info"
        }, {
            v: "order",
            RU: "Р”РѕР±Р°РІРёС‚СЊ РІ РєРѕСЂР·РёРЅСѓ",
            EN: "Add to Cart"
        }]
    } : "feedpart" == e && (t = {
        type: "spec",
        label: {
            RU: "Р’С‹РІРѕРґРёС‚СЊ РїРѕС‚РѕРє",
            EN: "Show feed"
        },
        hint: {
            RU: '\n\tРСЃРїРѕР»СЊР·СѓР№С‚Рµ РїРѕС‚РѕРєРё, С‡С‚РѕР±С‹ РІРµСЃС‚Рё Р»РµРЅС‚Сѓ РЅРѕРІРѕСЃС‚РµР№, Р±Р»РѕРі РёР»Рё РґСЂСѓРіСѓСЋ Р»РµРЅС‚Сѓ СЃРѕР±С‹С‚РёР№. РџРµСЂРµР№С‚Рё РІ <a href="/identity/gofeeds/?projectid=">СѓРїСЂР°РІР»РµРЅРёРµ РїРѕС‚РѕРєР°РјРё</a>.\t',
            EN: '\n\tTo create a newsfeed, blog, or event feed, use Feeds. Go to <a href="/identity/gostore/?projectid="> Feeds dashboard</a>'
        },
        options: [{
            v: "",
            RU: "РќРµ Р·Р°РґР°РЅ",
            EN: "Not set"
        }]
    }), t
}

function edrec__initRedactor(e) {
    ("q" === window.ver_redactor ? edrec__initQuill : edrec__initRedactor_v2)(e)
}

function edrec__initQuill(e) {
    window.country || (window.country = $("body").data("country")), e.find(".pe-textarea").not(".noredactor").each(function() {
        var e = $(this).val(),
            t = $(this).parent(),
            i = $(this).attr("name");
        $(this).css("display", "none");
        var o = Quill.fixCustomStyle(e),
            e = o.styles;
        $(this).after('<div class="edrec__wrapper__editor" quill-name="' + i + '">' + o.html + "</div>");
        var a = new Quill(t.find(".edrec__wrapper__editor")[0], {
            formats: ["bold", "color", "font", "italic", "link", "size", "strike", "script", "underline", "list", "weight", "lineheight", "align", "subscript", "superscript", "background"],
            debug: !1,
            modules: {
                toolbar_content: {
                    hint: !0,
                    toolbarClass: "edrec__wrapper__editor__toolbar",
                    editorWrapper: t,
                    showByClick: !0,
                    callback: function(e) {
                        var t;
                        "undefined" != typeof $is_email && "y" == $is_email && ((t = $(".edrec__wrapper__editor__toolbar")).find(".ql-color_custom").css("display", "none"), t.find(".ql-weight_custom").css("display", "none"), t.find(".ql-font_custom").css("display", "none"), t.find(".ql-size_custom").css("display", "none"), t.find(".ql-lineheight_custom").css("display", "none"), t.find(".ql-align_custom").css("display", "none"))
                    }
                },
                popup: !0,
                tooltip: !0,
                clipboard: !0,
                dropdown: !0,
                tilda_link: ".ql-link_custom",
                textcolor: ".ql-color_custom",
                weightDropdown: ".ql-weight_custom",
                fontDropdown: ".ql-font_custom",
                sizeDropdown: ".ql-size_custom",
                lineheightDropdown: ".ql-lineheight_custom",
                alignDropdown: ".ql-align_custom",
                typograph: ".ql-typograph_custom",
                cleanstyle: ".ql-clean_custom",
                tilda_hotkeys: !0,
                toolbar: {
                    container: '[quill-name="' + i + '"] + .edrec__wrapper__editor__toolbar',
                    toolbarOptions: ["bold", "italic", "underline", {
                        list: "ordered"
                    }, {
                        list: "bullet"
                    }, "link"]
                },
                more: ".ql-more_custom"
            }
        });
        Quill.setCustomStyles(a.root, e);
        var n = $(this);
        a.on("editor-change", function() {
            window.waschanged = "yes", window.edrec_isChanged = "y", n.val(Quill.getFormatContent(a.root))
        }), window.waschanged = "", a.blur()
    })
}

function edrec__initRedactor_v2(e) {
    window.country || (window.country = $("body").data("country")), window.waschanged = "", e.find(".pe-textarea").not(".noredactor").redactor({
        lang: "RU" == lang ? "ru" : "en",
        linebreaks: !0,
        boldTag: "b",
        italicTag: "i",
        replaceDivs: !1,
        allowedTags: ["p", "a", "i", "b", "br", "div", "del", "u", "ul", "ol", "li", "hr", "sup", "sub", "em", "table", "tr", "td", "th", "tbody", "thead", "strike", "span", "inline", "strong", "h1", "h2", "h3", "h4", "h5", "h6"],
        buttons: ["bold", "italic", "deleted", "link", "unorderedlist", "orderedlist", ""],
        dragUpload: !1,
        plugins: "RU" == window.lang || "RU" == window.country || "BY" == window.country || "UA" == window.country ? ["underline", "fontcolorex", "fontweight", "setfontfamily", "setfontsize", "setlineheight", "setalign", "typograf", "clearstyle"] : ["underline", "fontcolorex", "fontweight", "setfontfamily", "setfontsize", "setlineheight", "setalign", "clearstyle"],
        initCallback: function() {
            this.$toolbar.css("display", "none"), "undefined" != typeof $is_email && "y" == $is_email && (this.$toolbar.find(".re-fontweight").css("display", "none"), this.$toolbar.find(".re-setfontfamily").css("display", "none"), this.$toolbar.find(".re-setfontsize").css("display", "none"), this.$toolbar.find(".re-setlineheight").css("display", "none"), this.$toolbar.find(".re-setalign").css("display", "none"), this.$toolbar.find(".re-typograf").css("display", "none"))
        },
        changeCallback: function(e) {
            window.waschanged = "yes", window.edrec_isChanged = "y"
        },
        focusCallback: function(e) {
            var t;
            this.$toolbar.css("display", "block"), 1 == this.$editor.has("div").is("div") && (void 0 !== (t = getAttrStrintoArr(this.$editor.find("div").attr("style")))["font-size"] && "" != t["font-size"] && this.setfontsize.enter(t["font-size"]), void 0 !== t["line-height"] && "" != t["line-height"] && this.setlineheight.enter(t["line-height"]), void 0 !== t["text-align"] && "" != t["text-align"] && this.setalign.enter(t["text-align"]), void 0 !== t["font-family"] && "" != t["font-family"] && this.setfontfamily.enter(t["font-family"]), void 0 !== t.color && "" != t.color && this.fontcolorex.enter(t.color), this.$editor.find("div").contents().unwrap())
        },
        blurCallback: function(e) {
            var t, i, o;
            this.$toolbar.css("display", "none"), window.waschanged && (t = (t = this.$editor.html()).replace(/&nbsp;/g, " "), i = "", null != (o = this.$box.parent()).attr("data-redactor-font-size") && (i = i + "font-size:" + o.attr("data-redactor-font-size") + ";"), null != o.attr("data-redactor-line-height") && (i = i + "line-height:" + o.attr("data-redactor-line-height") + ";"), null != o.attr("data-redactor-text-align") && (i = i + "text-align:" + o.attr("data-redactor-text-align") + ";"), null != o.attr("data-redactor-font-family") && (i = i + "font-family:" + o.attr("data-redactor-font-family") + ";"), null != o.attr("data-redactor-color") && (i = i + "color:" + o.attr("data-redactor-color") + ";"), "" != i && (t = '<div style="' + i + '" data-customstyle="yes">' + t + "</div>", this.$editor.html(t), this.code.sync()))
        },
        pasteBeforeCallback: function(e) {
            return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = $.htmlClean(e, {
                format: !0,
                allowedTags: ["div", "span", "p", "h1", "h2", "h3", "a", "i", "b", "br", "del", "u", "ul", "ol", "li", "sup", "sub", "em", "strike", "strong"],
                allowedClasses: [""],
                allowedAttributes: [
                    ["href"],
                    ["style"],
                    ["rel"],
                    ["data-verified"],
                    ["data-redactor-tag"],
                    ["data-redactor-style"]
                ]
            })).replace(/<h1\s(.*?)>/gi, "<h1>")).replace(/<h1><br\s?\/?><\/h1>/gi, "<br /><br />")).replace(/<h1>([\w\W]*?)<\/h1>/gi, "$1<br /><br />")).replace(/<h2\s(.*?)>/gi, "<h2>")).replace(/<h2><br\s?\/?><\/h2>/gi, "<br /><br />")).replace(/<h2>([\w\W]*?)<\/h2>/gi, "$1<br /><br />")).replace(/<h3\s(.*?)>/gi, "<h3>")).replace(/<h3><br\s?\/?><\/h3>/gi, "<br /><br />")).replace(/<h3>([\w\W]*?)<\/h3>/gi, "$1<br /><br />")).replace(/<div\s(.*?)>/gi, "<div>")).replace(/<div><br\s?\/?><\/div>/gi, "<br />")).replace(/<div>([\w\W]*?)<\/div>/gi, "$1<br />")
        }
    })
}

function edme__addItem(e, t, i, o) {
    var a = "";
    a += '<div class="pe-menuitems-item" style="padding-bottom:0;" data-listitem-id="' + o + '">', a += "</div>", $(".pe-menuitems-wrapper").append(a), edme__drawUI__item(e, t, i, o)
}

function edme__escapeQuote(e) {
    if (e) {
        var t = {
            '"': "&quot;",
            "'": "&#039;"
        };
        return ("" + e).replace(/[<>"']/g, function(e) {
            return t[e]
        })
    }
    return e
}

function edme__drawUI__item(e, t, i, o) {
    var a = $(".pe-menuitems-wrapper").find("[data-listitem-id=" + o + "]"),
        n = "";
    n += '<table style="width:100%;">', n += '<tr valign="top">', n += '<td width="25px" style="display:none;" class="pe-menuitems-item-td-addsub">', n += '<img class="pe-menuitems-item-link-addsub" src="/tpl/img/page/tp-08-add.svg" style="padding-top:17px;padding-right:15px;opacity:0.2; width:20px;">', n += "</td>", n += '<td width="25px">', n += '<img src="/tpl/img/page/pe-points.svg" class="pe-menuitems-item-handle" style="padding-top:17px;padding-right:15px;opacity:0.2;cursor:move;">', n += "</td>", n += '<td width="47%" class="pe-menuitems-item-td-title">', n += '    <input type="text" name="menuitems-title[' + o + ']" class="pe-input pe-input_sm pe-menuitems-item-input-title" value="' + edme__escapeQuote(e) + '" placeholder="' + ("RU" == lang ? "РќР°Р·РІР°РЅРёРµ" : "Title") + '">', n += "</td>", n += '<td width="30px">&nbsp;&nbsp;&nbsp;</td>', n += '<td width="47%" class="pe-menuitems-item-td-link">', n += '    <input type="text" name="menuitems-link[' + o + ']" class="pe-input pe-input_sm pe-menuitems-item-input-link" data-need-check-link="yes" value="' + edme__escapeQuote(t) + '" placeholder="' + ("RU" == lang ? "РЎСЃС‹Р»РєР°" : "Link") + '">', n += '\t<div class="pe-checkbox-box pe-menuitems-item-more" style="margin-top:-5px;">', n += '\t<label class="pe-label-checkbox pe-menuitems-item-target" style="font-size:11px;font-weight:400;letter-spacing:0;">', n += '\t  \t<input type="hidden" name="menuitems-linktarget[' + o + ']" value="' + i + '" class="pe-menuitems-item-input-target"/>', n += '      \t<input type="checkbox" class="pe-menuitems-item-cb-target" ' + ("_blank" == i ? 'checked="checked"' : "") + '> <span class="pe-checkbox-title">' + ("RU" == lang ? "Р’ РЅРѕРІРѕРј РѕРєРЅРµ" : "New window") + "</span>", n += "\t</label>", n += '\t<span class="pe-menuitems-item-link-pg" style="padding-left:15px; font-size:11px; cursor:context-menu;">' + ("RU" == lang ? "Р’С‹Р±СЂР°С‚СЊ СЃС‚СЂР°РЅРёС†Сѓ" : "Link to Page") + "</span>", n += '\t<span class="pe-menuitems-item-link-an" style="padding-left:15px; font-size:11px; cursor:context-menu;">' + ("RU" == lang ? "Р’С‹Р±СЂР°С‚СЊ Р±Р»РѕРє" : "Link to Block") + "</span>", n += "\t</div>", n += "</td>", n += '<td width="25px">', n += '<span class="pe-menuitems-item-link-del" style="padding-top:15px;cursor:pointer;display:block;">Г—</span>', n += "</td>", n += "</tr>", n += "</table>", n += "</label>", n += "", a.append(n);
    var l = a.find(".pe-menuitems-item-input-link");
    l.change(function() {
        var e = l.val();
        "" != e && checkLinkCCtoWS(e)
    }), a.find(".pe-menuitems-item-link-pg").click(function() {
        edme__showPopUp__pageslist(a.find(".pe-menuitems-item-input-link"))
    }), a.find(".pe-menuitems-item-link-an").click(function() {
        edme__RecordPiker__show(a.find(".pe-menuitems-item-input-link"))
    }), a.find(".pe-menuitems-item-link-del").click(function() {
        a.remove(), edme__reSort()
    }), a.find(".pe-menuitems-item-link-addsub").click(function() {
        edme__addNewSub(a.attr("data-listitem-id"))
    }), a.find(".pe-menuitems-item-cb-target").change(function() {
        var e = (e = $(this).is(":checked")) ? "_blank" : "";
        a.find(".pe-menuitems-item-input-target").val(e)
    })
}

function edme__showPopUp__pageslist(t) {
    showLoadIcon(), $.ajax({
        type: "POST",
        url: "/projects/submit/",
        data: {
            comm: "getpageslist",
            projectid: window.projectid
        },
        dataType: "text",
        success: function(e) {
            hideLoadIcon(), check_logout(e), edme__drawPopUp__pageslist(e, window.projectid, t)
        },
        error: function() {
            alert("Request timeout (get pageslist)"), hideLoadIcon()
        },
        timeout: 3e4
    })
}

function edme__drawPopUp__pageslist(e, t, i) {
    var o, a = JSON.parse(e),
        n = "";
    for (o in n += '<button type="button" class="close tm-popup__close" data-dismiss="modal" aria-label="Close" style="position:absolute;right:10px;top:10px;"><span aria-hidden="true">Г—</span></button>', n += '<div style="height:400px; overflow:auto;">', n += '<div style="padding:30px 40px;width:520px;">', n += '<div style="font-size:22px;padding-bottom:10px;">' + ("RU" == lang ? "РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РІС‹Р±РµСЂРёС‚Рµ СЃС‚СЂР°РЅРёС†Сѓ:" : "Please choose a page:") + "</div>", a) {
        var l = a[o];
        n += '<div style="padding-top:10px;padding-bottom:10px;border-bottom:1px solid #eee;cursor:pointer" class="js-pe-popup-pageslist-item">', n += '<div style="font-size:18px;">' + l.title + "</div>", n += '<div style="font-size:14px; opacity:0.4;" class="js-pe-popup-pageslist-item-url">/' + l.url + "</div>", n += "</div>"
    }
    n += "</div>", n += "</div>", edme__openPopup(), $("#myModalContent").html(n), $(".js-pe-popup-pageslist-item").on("click", function() {
        var e = $(this).find(".js-pe-popup-pageslist-item-url").html();
        i.val(e), edme__closePopup()
    }), $(document).on("mousedown", function(e) {
        $(e.target).closest("#myModalContent").length || edme__closePopup(), e.stopPropagation()
    }), $(document).keydown(function(e) {
        27 == e.keyCode && edme__closePopup()
    }), $('.close[data-dismiss="modal"]').on("click", function(e) {
        e.preventDefault(), edme__closePopup()
    }), $('.tm-popup__close[data-dismiss="modal"]').on("click", function(e) {
        e.preventDefault(), edme__closePopup()
    })
}

function edme__openPopup() {
    var e = $("body"),
        t = $("#myModal");
    e.addClass("modal-open tm-popup_open"), e.append('<div class="modal-backdrop fade in tm-popup__backdrop tm-popup__backdrop_fade tm-popup__backdrop_in"></div>'), t.addClass("in tm-popup_in"), t.css("display", "block")
}

function edme__closePopup() {
    $("body").removeClass("modal-open tm-popup_open"), $("#myModal").removeClass("in tm-popup_in"), $("#myModal").css("display", "none"), $(".modal-backdrop").remove(), $(".tm-popup__backdrop").remove()
}

function edme__RecordPiker__show(o) {
    $("body").addClass("pe-recordpiker-body"), $(".record").addClass("pe-recordpiker"), $("body").append('<div id="select_records_toolbar" style="opacity: 1; top: 0px;"><div class="select_records_toolbar__left">' + ("RU" == lang ? "РљР»РёРєРЅРёС‚Рµ РЅР° РЅСѓР¶РЅС‹Р№ Р±Р»РѕРє" : "Select block") + '</div><div class="select_records_toolbar__right"><a href="javascript:edme__RecordPiker__close();">' + ("RU" == lang ? "РћС‚РјРµРЅР°" : "Cancel") + "</a></div></div>"), showCornerNotice("RU" == lang ? "РљР»РёРєРЅРёС‚Рµ РЅР° Р±Р»РѕРє, С‡С‚РѕР±С‹ РµРіРѕ РІС‹Р±СЂР°С‚СЊ.</b>" : "РЎlick on the block to select.</b>", 5e3), $(".pe-recordpiker").bind("click.recpikerevent", function(e) {
        e.preventDefault(), e.stopPropagation();
        var t = $(this),
            i = "#rec" + t.attr("recordid");
        "215" == t.attr("data-record-type") && (i = "#" + (i = t.find(".r").find("a").attr("name")));
        e = t.find(".r").find("[data-tooltip-hook]");
        e.length && (i = e.attr("data-tooltip-hook")), "121" === t.attr("data-record-type") && (e = t.attr("recordid"), i = "#" + (i = t.find("div[id].r:not(#rec" + e + ")").attr("id"))), o.val(i), edme__RecordPiker__close()
    })
}

function edme__RecordPiker__close() {
    $(".pe-recordpiker").unbind("click.recpikerevent"), $("body").removeClass("pe-recordpiker-body"), $(".record").removeClass("pe-recordpiker"), $("#select_records_toolbar").remove()
}

function edme__addNewMenuItem() {
    var t = 0;
    $(".pe-menuitems-wrapper .pe-menuitems-item").each(function() {
        var e = +$(this).attr("data-listitem-id");
        t < e && (t = e)
    }), edme__addItem("", "", "", t + 1)
}

function edme__showUIsubmenu() {
    $(".pe-menuitems-item-td-addsub").css("display", "table-cell")
}

function edme__addSortable() {
    $(".pe-menuitems-wrapper").css("overflow", "auto"), $(".pe-menuitems-wrapper").sortable({
        helper: "clone",
        handle: ".pe-menuitems-item-handle",
        opacity: .8,
        revert: !0,
        tolerance: "pointer",
        axis: "y",
        update: function(e, t) {
            edme__reSort()
        }
    })
}

function edme__addSortable_sub(i) {
    $(".pe-menuitems-item[data-listitem-id='" + i + "'] .pe-menuitems-item-subitems-wrapper").sortable({
        helper: "clone",
        handle: ".pe-menuitems-item-sub-handle",
        opacity: .8,
        revert: !0,
        tolerance: "pointer",
        axis: "y",
        update: function(e, t) {
            edme__reSort_sub(i)
        }
    })
}

function edme__reSort() {
    var i = 0;
    $(".pe-menuitems-item").each(function() {
        var t, e = $(this);
        e.attr("data-listitem-id", i), e.find(".pe-menuitems-item-input-title").first().attr("name", "menuitems-title[" + i + "]"), e.find(".pe-menuitems-item-input-link").first().attr("name", "menuitems-link[" + i + "]"), e.find(".pe-menuitems-item-input-target").first().attr("name", "menuitems-linktarget[" + i + "]"), 0 < e.find(".pe-menuitems-item-subitems-wrapper").length && (t = 0, $(".pe-menuitems-item[data-listitem-id='" + i + "'] .pe-menuitems-item-subitems-wrapper .pe-menuitems-item-subitem").each(function() {
            var e = $(this);
            e.attr("data-listsubitem-id", t), e.find(".pe-menuitems-item-input-title").attr("name", "menuitems-sub-title[" + i + "][" + t + "]"), e.find(".pe-menuitems-item-input-link").attr("name", "menuitems-sub-link[" + i + "][" + t + "]"), e.find(".pe-menuitems-item-input-target").attr("name", "menuitems-sub-linktarget[" + i + "][" + t + "]"), t++
        })), i++
    })
}

function edme__reSort_sub(t) {
    var i = 0;
    $(".pe-menuitems-item[data-listitem-id='" + t + "'] .pe-menuitems-item-subitems-wrapper .pe-menuitems-item-subitem").each(function() {
        var e = $(this);
        e.attr("data-listsubitem-id", i), e.find(".pe-menuitems-item-input-title").attr("name", "menuitems-sub-title[" + t + "][" + i + "]"), e.find(".pe-menuitems-item-input-link").attr("name", "menuitems-sub-link[" + t + "][" + i + "]"), e.find(".pe-menuitems-item-input-target").attr("name", "menuitems-sub-linktarget[" + t + "][" + i + "]"), i++
    })
}

function edme__addNewSub(e) {
    var t = edme__addSubWrapper(e),
        i = 0;
    t.find(".pe-menuitems-item-subitem").each(function() {
        var e = +$(this).attr("data-listsubitem-id");
        i < e && (i = e)
    }), edme__addSubItem(t, "", "", "", e, i + 1)
}

function edme__addSubWrapper(e) {
    var t = $(".pe-menuitems-item[data-listitem-id='" + e + "']");
    return t.find(".pe-menuitems-item-td-link").first().css("display", "none"), t.find(".pe-menuitems-item-input-link").first().val(""), t.find(".pe-menuitems-item-td-title").first().css("width", "90%"), 0 == t.find(".pe-menuitems-item-subitems-wrapper").length && (e = "", e += '<div class="pe-menuitems-item-subitems-wrapper" style="margin:20px 0px 20px 58px; padding:20px 30px; background-color:#eee;"></div>', t.append('<div class="pe-menuitems-item-subitems-wrapper" style="margin:20px 0px 20px 58px; padding:20px 30px; background-color:#eee;"></div>')), t.find(".pe-menuitems-item-subitems-wrapper")
}

function edme__addSubItem(e, t, i, o, a, n) {
    var l = "";
    l += '<div class="pe-menuitems-item-subitem" style="padding-bottom:0;" data-listsubitem-id="' + n + '">', l += "</div>", e.append(l), edme__drawUI__subitem(e, t, i, o, a, n)
}

function edme__drawUI__subitem(e, t, i, o, a, n) {
    var l = e.find("[data-listsubitem-id=" + n + "]"),
        e = "";
    e += '<table style="width:100%;">', e += '<tr valign="top">', e += '<td width="25px">', e += '<img src="/tpl/img/page/pe-points.svg" class="pe-menuitems-item-sub-handle" style="padding-top:17px;padding-right:15px;opacity:0.2;cursor:move;">', e += "</td>", e += '<td width="47%">', e += '    <input type="text" name="menuitems-sub-title[' + a + "][" + n + ']" class="pe-input pe-input_sm pe-menuitems-item-input-title" value="' + edme__escapeQuote(t) + '" placeholder="' + ("RU" == lang ? "РќР°Р·РІР°РЅРёРµ" : "Title") + '">', e += "</td>", e += '<td width="30px">&nbsp;&nbsp;&nbsp;</td>', e += '<td width="47%" class="pe-menuitems-item-td-link">', e += '    <input type="text" name="menuitems-sub-link[' + a + "][" + n + ']" class="pe-input pe-input_sm pe-menuitems-item-input-link" data-need-check-link="yes" value="' + edme__escapeQuote(i) + '" placeholder="' + ("RU" == lang ? "РЎСЃС‹Р»РєР°" : "Link") + '">', e += '\t<div class="pe-checkbox-box pe-menuitems-item-more" style="margin-top:-5px;">', e += '\t<label class="pe-label-checkbox pe-menuitems-item-target" style="font-size:11px;font-weight:400;letter-spacing:0;">', e += '\t  \t<input type="hidden" name="menuitems-sub-linktarget[' + a + "][" + n + ']" value="' + o + '" class="pe-menuitems-item-input-target"/>', e += '      \t<input type="checkbox" class="pe-menuitems-item-cb-target" ' + ("_blank" == o ? 'checked="checked"' : "") + '> <span class="pe-checkbox-title">' + ("RU" == lang ? "Р’ РЅРѕРІРѕРј РѕРєРЅРµ" : "New window") + "</span>", e += "\t</label>", e += '\t<span class="pe-menuitems-item-link-pg" style="padding-left:5px; font-size:11px; cursor:context-menu;white-space:nowrap;color:#000;">' + ("RU" == lang ? "Р’С‹Р±СЂР°С‚СЊ СЃС‚СЂР°РЅРёС†Сѓ" : "Link to Page") + "</span>", e += '\t<span class="pe-menuitems-item-link-an" style="padding-left:5px; font-size:11px; cursor:context-menu;white-space:nowrap;color:#000;">' + ("RU" == lang ? "Р’С‹Р±СЂР°С‚СЊ Р±Р»РѕРє" : "Link to Block") + "</span>", e += "\t</div>", e += "</td>", e += '<td width="25px">', e += '<span class="pe-menuitems-item-link-del" style="padding-top:15px;cursor:pointer;display:block;">Г—</span>', e += "</td>", e += "</tr>", e += "</table>", e += "</label>", e += "", l.append(e);
    var r = l.find(".pe-menuitems-item-input-link");
    r.change(function() {
        var e = r.val();
        "" != e && checkLinkCCtoWS(e)
    }), l.find(".pe-menuitems-item-link-pg").click(function() {
        edme__showPopUp__pageslist(l.find(".pe-menuitems-item-input-link"))
    }), l.find(".pe-menuitems-item-link-an").click(function() {
        edme__RecordPiker__show(l.find(".pe-menuitems-item-input-link"))
    }), l.find(".pe-menuitems-item-link-del").click(function() {
        var e = l.parent();
        l.remove(), edme__reSort_sub(e.parent().attr("data-listitem-id")), 0 == e.find(".pe-menuitems-item-subitem").length && (e.parent().find(".pe-menuitems-item-td-link").css("display", "table-cell"), e.parent().find(".pe-menuitems-item-td-title").first().css("width", "46%"), e.remove())
    }), l.find(".pe-menuitems-item-link-addsub").click(function() {
        edme__addSub(l.attr("data-listitem-id"))
    }), l.find(".pe-menuitems-item-cb-target").change(function() {
        var e = (e = $(this).is(":checked")) ? "_blank" : "";
        l.find(".pe-menuitems-item-input-target").val(e)
    })
}

function edga__init(g, e) {
    var o = e.find(".pe-form-group[data-tpl-field=gallery]"),
        t = "";
    "341" != g.record.tplid && "147" != g.record.tplid && "603" != g.record.tplid && "670" != g.record.tplid && "604" != g.record.tplid && "150" != g.record.tplid && "252" != g.record.tplid || (t = "y");
    var i = "";
    "341" != g.record.tplid && "670" != g.record.tplid && "604" != g.record.tplid && "603" != g.record.tplid && "150" != g.record.tplid || (i = "y");
    e = "";
    "341" != g.record.tplid && "5" != g.record.tplid && "670" != g.record.tplid && "604" != g.record.tplid && "604" != g.record.tplid && "359" != g.record.tplid && "150" != g.record.tplid && "746" != g.record.tplid || (e = "y");
    var a = "";
    "418" == g.record.tplid && (a = "y");
    var n = "",
        l = 0;
    if (void 0 !== g.record.json && null != g.record.json && "" != g.record.json) {
        var r, s = JSON.parse(g.record.json);
        for (r in n += '<div class="' + ("y" == e ? "gallery-imgs_hasvideo" : "") + '" id="gallery-imgs-list" style="font-size:12px;" data-need-alt="yes" data-need-text="' + ("y" == a ? "no" : "yes") + '" data-need-vis-text="' + ("y" == t ? "yes" : "no") + '" data-need-text-align="' + ("y" == i ? "yes" : "no") + '" data-init-count-img="' + s.length + '">', n += "<br><b>{{images_list}}</b><br><br>", s) "" != s[r].img && (n += '<div id="gallery-imgs-div-' + l + '" class="gallery-imgs-class">', n += '<input type="hidden" name="gallery-imgs-file[' + l + ']" value="' + s[r].img + '" />', n += '<input type="hidden" id="gallery-imgs-file-upd-' + l + '" name="gallery-imgs-file-upd[' + l + ']" value=""/>', n += '<input type="hidden" id="gallery-imgs-file-upd-name-' + l + '" name="gallery-imgs-file-upd-name[' + l + ']" value=""/>', n += '<input type="hidden" id="gallery-imgs-file-upd-uuid-' + l + '" name="gallery-imgs-file-upd-uuid[' + l + ']" value=""/>', n += '<input type="hidden" id="gallery-imgs-file-upd-width-' + l + '" name="gallery-imgs-file-upd-width[' + l + ']" value=""/>', n += '<table style="">', n += "<tr>", n += '<td><img src="' + s[r].img + '" width="80" id="gallery-imgs-img-' + l + '"></td>', n += '<td style="padding-left:10px; padding-right:30px; width:100%; color:#333;" id="gallery-imgs-name-' + l + '"><a href="' + s[r].img + '" target="_blank">... ' + s[r].img.slice(-25) + "</a></td>", n += '<td style="padding-left:20px; width:120px;"><div data-gal-section-i="' + l + '" role="rec' + g.record.id + 'gallery-uploader-item" style="cursor:pointer;" >{{replace_image}}</div></td>', n += '<td style="padding-left:20px; width:60px;"><a href="javascript:edga_showtextsettingsgalleryitem(\'' + l + "');\">{{text}}</a></td>", n += '<td style="padding-left:20px; width:60px;" class="gallery-imgs-videobtn"><a href="javascript:edga_showvideosettingsgalleryitem(\'' + l + "');\">{{video}}</a></td>", n += '<td style="padding-left:20px; width:20px;"><a href="javascript:edga_delgalleryitem(\'' + l + '\');"><span class="glyphicon glyphicon-trash"></span></a></td>', n += "</tr>", n += "</table>", n += '<div id="gallery-imgs-divmoretext-' + l + '" style="display:none;">', "y" != a && (n += "<br>", n += '<input type="text" name="gallery-imgs-title[' + l + ']" class="form-control" value="' + (s[r].title ? edrec__addslashes(s[r].title) : "") + '" placeholder="Image title ' + ("y" != t ? "in zoom mode" : "") + '" style="width:732px; height:20px; font-size:10px; background-color:#eee;">', n += "<br>", n += '<input type="text" name="gallery-imgs-descr[' + l + ']" class="form-control" value="' + (s[r].descr ? edrec__addslashes(s[r].descr) : "") + '" placeholder="Image description ' + ("y" != t ? "in zoom mode" : "") + '" style="width:732px; height:20px; font-size:10px; background-color:#eee;">'), n += "<br>", n += '<input type="text" name="gallery-imgs-alt[' + l + ']" class="form-control" value="' + (void 0 !== s[r].alt ? edrec__addslashes(s[r].alt) : "") + '" placeholder="Image alt for SEO" style="width:732px; height:20px; font-size:10px; background-color:#eee;">', n += "<br>", "y" == i && (n += '<select class="form-control" name="gallery-imgs-align[' + l + ']" style="width:225px; height:32px; font-size:10px; background-color:#eee;">', n += '<option value="" ' + ("" == s[r].align ? 'selected="selected"' : "") + ">Align</option>", n += '<option value="left" ' + ("left" == g.record.align ? 'selected="selected"' : "") + ">Left</option>", n += '<option value="center" ' + ("center" == s[r].align ? 'selected="selected"' : "") + ">Center</option>", n += '<option value="right" ' + ("right" == s[r].align ? 'selected="selected"' : "") + ">Right</option>", n += "</select>"), n += "<br><br>", n += "</div>", n += '<div id="gallery-imgs-divmorevideo-' + l + '" style="display:none;">', n += "<br>", n += '<table style="">', n += "<tr>", n += '<td style="padding-right:' + ("670" === g.record.tplid ? 20 : 40) + 'px;"><input type="text" name="gallery-imgs-youtubeid[' + l + ']" class="form-control" value="' + s[r].youtubeid + '" placeholder="Youtube video id" style="width:200px; height:20px; font-size:10px; background-color:#eee;"></td>', "670" !== g.record.tplid && (n += '<td style="padding-right:30px;">or</td>'), "150" !== g.record.tplid && (n += '<td style="padding-right:20px;"><input type="text" name="gallery-imgs-vimeoid[' + l + ']" class="form-control" value="' + (void 0 !== s[r].vimeoid ? s[r].vimeoid : "") + '" placeholder="Vimeo video link" style="width:170px; height:20px; font-size:10px; background-color:#eee;"></td>'), "670" === g.record.tplid && (n += '<td style="padding-right:20px;"><input type="text" name="gallery-imgs-videomp4[' + l + ']" class="form-control" value="' + s[r].videomp4 + '" placeholder="Video MP4 file link" style="width:170px; height:20px; font-size:10px; background-color:#eee;"></td>'), n += "</tr>", n += "</table>", n += "<br><br>", n += "</div>", n += '<hr style="margin:0px; border-color:#ccc; margin-top:10px; margin-bottom:10px;">', n += "</div>"), l++;
        n += '<input type="hidden" id="gallery-imgs-sort" name="gallery-imgs-sort" value=""/>', n += "</div>"
    }
    n += "<br>", n += '<label class="pe-label" style="padding-bottom:8px;">{{upload_new}}</label>', n += '<input type="text" value="" name="gallery-files" data-tu-is-image="yes" data-tu-multiple="yes">', n += '<input type="hidden" id="gallery-update" name="gallery-update" value="yes"/>', n = tc__translate(n, "edrec__dict"), o.append(n), o.find("#gallery-imgs-list").sortable({
        helper: "clone",
        opacity: .8,
        revert: !0,
        tolerance: "pointer",
        axis: "y",
        update: function() {
            var e = Array();
            o.find("#gallery-imgs-list .gallery-imgs-class").each(function() {
                e.push($(this).attr("id").replace("gallery-imgs-div-", ""))
            }), o.find("#gallery-imgs-sort").val(e.join(","))
        }
    }), o.find("[name=gallery-files]").each(function() {
        var u = $(this),
            m = u.attr("id");
        m || (m = "tuwidget" + parseInt(Math.floor(Math.random() * (9e5 + 1)) + 99999), u.attr("id", m)), TUWidget.init(u).done(function(e) {
            if (this.options.uploadMultiple) {
                var t, i, o, a = u.closest(".pe-form-group").find("#gallery-imgs-list"),
                    n = u.closest(".pe-form-group"),
                    l = parseInt(a.attr("data-init-count-img")) || 0,
                    r = a.data("need-text"),
                    s = a.data("need-text-align"),
                    d = a.data("need-vis-text"),
                    p = '<div id="gallery-imgs-div-::idx::" class="gallery-imgs-class"><input type="hidden" name="gallery-imgs-file[::idx::]" value="::url::"><input type="hidden" id="gallery-imgs-file-upd-::idx::" name="gallery-imgs-file-upd[::idx::]" value="::newurl::"><input type="hidden" id="gallery-imgs-file-upd-name-::idx::" name="gallery-imgs-file-upd-name[::idx::]" value="::name::"><input type="hidden" id="gallery-imgs-file-upd-uuid-::idx::" name="gallery-imgs-file-upd-uuid[::idx::]" value="::uuid::"><input type="hidden" id="gallery-imgs-file-upd-width-::idx::" name="gallery-imgs-file-upd-width[::idx::]" value="::width::"><table style=""><tbody><tr><td><img src="::url::" width="80" id="gallery-imgs-img-::idx::"></td>';
                p += '<td style="padding-left:10px; padding-right:30px; width:100%; font-size:11px; color:#333;" id="gallery-imgs-name-::idx::"><a href="::url::" target="_blank">::parturl::</a></td>', p += '<td style="padding-left:20px; width:120px;"><div data-gal-section-i="::idx::" role="rec' + g.record.id + 'gallery-uploader-item" style="cursor:pointer;" id="tuwidget::tuid::">{{replace_image}}</div><input type="file" class="tu-hidden-input" accept="image/*" style="visibility: hidden; position: absolute; top: 0px; left: 0px; height: 0px; width: 0px;"></td>', p += '<td style="padding-left:20px; width:60px;"><a href="javascript:edga_showtextsettingsgalleryitem(\'::idx::\');">{{text}}</a></td>', p += '<td style="padding-left:20px; width:60px;" class="gallery-imgs-videobtn"><a href="javascript:edga_showvideosettingsgalleryitem(\'::idx::\');">{{video}}</a></td>', p += '<td style="padding-left:20px; width:20px;"><a href="javascript:edga_delgalleryitem(\'::idx::\');"><span class="glyphicon glyphicon-trash"></span></a></td></tr></tbody></table>', "yes" == r && (p += '<div id="gallery-imgs-divmoretext-::idx::" style="display:none;"><br><input type="text" name="gallery-imgs-title[::idx::]" class="form-control" value="" placeholder="Image title' + ("yes" != d ? " in zoom mode" : "") + '" style="width:732px; height:20px; font-size:10px; background-color:#eee;"><br><input type="text" name="gallery-imgs-descr[::idx::]" class="form-control" value="" placeholder="Image description ' + ("yes" != d ? " in zoom mode" : "") + '" style="width:732px; height:20px; font-size:10px; background-color:#eee;">'), p += '<br><input type="text" name="gallery-imgs-alt[::idx::]" class="form-control" value="" placeholder="Image alt for SEO" style="width:732px; height:20px; font-size:10px; background-color:#eee;">', "yes" == s && (p += '<br><select class="form-control" name="gallery-imgs-align[::idx::]" style="width:225px; height:32px; font-size:10px; background-color:#eee;"><option value="">Align</option><option value="left" selected="selected">Left</option><option value="center">Center</option><option value="right">Right</option></select>'), p += "<br><br></div>", p += '<div id="gallery-imgs-divmorevideo-::idx::" style="display:none;">', p += "<br>", p += '<table style="">', p += "<tbody>", p += "<tr>", p += '<td style="padding-right:' + ("670" === g.record.tplid ? 20 : 40) + 'px;">', p += '<input type="text" name="gallery-imgs-youtubeid[::idx::]" class="form-control" value="" placeholder="Youtube video id" style="width:200px; height:20px; font-size:10px; background-color:#eee;">', p += "</td>", "670" !== g.record.tplid && (p += '<td style="padding-right:30px;">or</td>'), p += '<td style="padding-right:20px;">', p += '<input type="text" name="gallery-imgs-vimeoid[::idx::]" class="form-control" value="" placeholder="Vimeo video link" style="width:170px; height:20px; font-size:10px; background-color:#eee;">', p += "</td>", "670" === g.record.tplid && (p += '<td style="padding-right:20px;">', p += '<input type="text" name="gallery-imgs-videomp4[::idx::]" class="form-control" value="" placeholder="Video MP4 file link" style="width:170px; height:20px; font-size:10px; background-color:#eee;">', p += "</td>"), p += "</tr>", p += "</tbody>", p += "</table>", p += "<br><br>", p += "</div>", p += '<hr style="margin:0px; border-color:#ccc; margin-top:10px; margin-bottom:10px;"></div>', p = tc__translate(p, "edrec__dict");
                var c = parseInt(l);
                for (t in e) c = 1 + c, void 0 !== (i = e[t].tuInfo) && void 0 !== i.cdnUrl && (o = (o = (o = (o = (o = (o = (o = (o = (o = p).replace(/::idx::/g, l)).replace(/::tuid::/g, m)).replace(/::uuid::/g, i.uuid)).replace(/::name::/g, i.name)).replace(/::url::/g, i.cdnUrl)).replace(/::newurl::/g, i.cdnUrl)).replace(/::width::/g, i.width)).replace(/::height::/g, i.height), o = 12 < i.name.length ? o.replace(/::parturl::/g, "..." + i.name.substring(i.name.length - 12)) : o.replace(/::parturl::/g, i.name), 0 < a.length && 0 < a.find(".gallery-imgs-class").length ? a.find(".gallery-imgs-class").last().after(o) : (0 == a.length && (n.prepend('<div id="gallery-imgs-list" class="ui-sortable" data-need-alt="yes" data-init-count-img="0"></div>'), a = u.closest(".pe-form-group").find("#gallery-imgs-list")), a.prepend(o)), l = parseInt(1 + l));
                return a.attr("data-init-count-img", c), 0 < $("#" + m + "-previews").length && $("#" + m + "-previews").removeClass("tu-popup-progressbar-success").removeClass("tu-popup-progressbar-complate").removeClass("tu-popup-progressbar-error").addClass("tu-popup-progressbar-start"), !0
            }
        }).fail(function() {})
    }), o.find("[role=rec" + g.record.id + "gallery-uploader-item]").each(function() {
        var e = $(this),
            t = e.attr("id");
        t || (t = "tuwidget" + parseInt(Math.floor(Math.random() * (9e5 + 1)) + 99999), e.attr("id", t));
        var i = e.attr("data-gal-section-i");
        TUWidget.init(e).done(function(e) {
            o.find("#gallery-imgs-img-" + i).attr("src", e.tuInfo.cdnUrl), o.find("#gallery-imgs-name-" + i).html(e.tuInfo.cdnUrl), o.find("#gallery-imgs-file-upd-" + i).val(e.tuInfo.cdnUrl), o.find("#gallery-imgs-file-upd-name-" + i).val(e.tuInfo.name), o.find("#gallery-imgs-file-upd-uuid-" + i).val(e.tuInfo.uuid), o.find("#gallery-imgs-file-upd-width-" + i).val(e.tuInfo.width)
        }).fail(function() {})
    })
}

function edga_delgalleryitem(e) {
    $(".edrec__wrapper").find("#gallery-imgs-div-" + e).remove()
}

function edga_showtextsettingsgalleryitem(e) {
    var t;
    t = "none" == $(".edrec__wrapper").find("#gallery-imgs-divmoretext-" + e).css("display") ? "block" : "none", $(".edrec__wrapper").find("#gallery-imgs-divmoretext-" + e).css("display", t)
}

function edga_showvideosettingsgalleryitem(e) {
    var t;
    t = "none" == $(".edrec__wrapper").find("#gallery-imgs-divmorevideo-" + e).css("display") ? "block" : "none", $(".edrec__wrapper").find("#gallery-imgs-divmorevideo-" + e).css("display", t)
}

function edmap__init(e, t) {
    var i, o = "",
        a = e.record.mapmarkers,
        n = 0;
    for (i in a) o += edmap__draw(n, a[i]), n++;
    o += '<hr style="border-top:1px solid #BBB;">', o += '<a href="#" class="js-mapmarkers-add">' + ("RU" == lang ? "Р•С‰Рµ" : "More") + "</a>", o += "<br>", t.find('.pe-form-group[data-tpl-field="mapmarkers"]').append(o), $(".js-mapmarkers-add").click(function(e) {
        e.preventDefault();
        var t, i = $(".pe-content-form").serializeArray();
        return JSON.stringify(i).length < 5e4 ? (i = edmap__draw(e = (t = document.querySelectorAll(".js-mapmarkers-item")).length), (0 < e ? t[e - 1] : document.querySelector('[data-tpl-field="mapmarkers"] .pe-label')).insertAdjacentHTML("afterend", i), edmap__addListener(), edrec__initRedactor($(".js-mapmarkers-item").last().find(".pe-redactor"))) : td__showBubbleNotice("RU" == window.lang ? "РћС€РёР±РєР°: СЃР»РёС€РєРѕРј РјРЅРѕРіРѕ С‚РµРєСЃС‚Р°. РР·РјРµРЅРµРЅРёСЏ РЅРµ Р±СѓРґСѓС‚ СЃРѕС…СЂР°РЅРµРЅС‹. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, СѓРґР°Р»РёС‚Рµ С‡Р°СЃС‚СЊ РёРЅС„РѕСЂРјР°С†РёРё." : "Error: Too much data. Changes will not be saved. Please delete some of the information."), !1
    }), edmap__addListener()
}

function edmap__draw(e, t) {
    var i = "",
        o = "mapmarker" + e;
    return i += '<div class="js-mapmarkers-item">', i += '\t<hr style="border-top:1px solid #BBB;">', i += '\t<div style="font-size:14px; text-transform:uppercase;" id="grouptitle_' + o + '"><a href="javascript:edrec__collapsegroup(\'' + o + '\');"><img src="https://static.tildacdn.com/lib/linea/9e5bdbaf-3937-55b3-68c4-81622764c33d/basic_geolocalize05.svg" width="24px" style="vertical-align: middle; margin-right: 10px;" border="0"> ' + (("RU" == lang ? "РўРѕС‡РєР° РЅР° РєР°СЂС‚Рµ:" : "Geo Point:") + " " + (e + 1)) + '<span style="float:right;">&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-circle-arrow-right"></span>&nbsp;</span></a></div>', i += '\t<div style="display:none; padding-top:30px;" id="group_' + o + '" data-mapmarkers-groupid="' + o + '" class="js-mapmarkers-box">', i += '\t\t<div class="pe-form-group">', i += '\t\t\t<div id="maplatlngboxid-' + o + '" class="">', i += '\t\t\t\t<label class="pe-label">' + ("RU" == lang ? "Р—Р°РіРѕР»РѕРІРѕРє С‚РѕС‡РєРё" : "Marker title") + "</label>", i += '\t\t\t\t<div class="">', i += '\t\t\t\t\t<input type="text" name="mapmarkers[' + e + '][title]" class="pe-input js-mapmarkers-title" value="' + (t ? t.title : "") + '" id="googlemaptitleid-' + o + '">', i += "\t\t\t\t</div>", i += '                <div class="pe-hint" style="margin-bottom: 35px;">' + ("RU" == lang ? "РџРѕСЏРІР»СЏРµС‚СЃСЏ РїСЂРё РЅР°РІРµРґРµРЅРёРё РЅР° РѕС‚РјРµС‚РєСѓ" : "It is displayed on hover over the marker") + "</div>", i += '\t\t\t\t<label class="pe-label">' + ("RU" == lang ? "РћРїРёСЃР°РЅРёРµ" : "Description") + "</label>", i += '\t\t\t\t<div class="pe-redactor">', i += '\t\t\t\t\t<textarea name="mapmarkers[' + e + '][descr]" class="pe-textarea js-mapmarkers-descr" id="googlemapdescrid-' + o + '">' + (t ? t.descr : "") + "</textarea>", i += "\t\t\t\t</div>", i += '                <div class="pe-hint" style="margin-bottom: 35px;">' + ("RU" == lang ? "РџРѕСЏРІР»СЏРµС‚СЃСЏ РїСЂРё РєР»РёРєРµ РїРѕ РѕС‚РјРµС‚РєРµ" : "It is displayed by click on the marker") + "</div>", i += '\t\t\t\t<label class="pe-label">Geo Map Y (' + ("RU" == lang ? "С€РёСЂРѕС‚Р°" : "latitude") + ")</label>", i += '\t\t\t\t<div class=""  style="margin-bottom: 35px;">', i += '\t\t\t\t\t<input type="text" name="mapmarkers[' + e + '][mapx]" class="pe-input js-mapmarkers-lat" value="' + (t ? t.mapx : "") + '" id="googlemaplatid-' + o + '">', i += "\t\t\t\t</div>", i += "\t\t\t\t<br>", i += '\t\t\t\t<label class="pe-label">Geo Map X (' + ("RU" == lang ? "РґРѕР»РіРѕС‚Р°" : "longitude") + ")</label>", i += '\t\t\t\t<div class="">', i += '\t\t\t\t\t<input type="text" name="mapmarkers[' + e + '][mapy]" class="pe-input js-mapmarkers-lng" value="' + (t ? t.mapy : "") + '" id="googlemaplngid-' + o + '">', i += "\t\t\t\t</div>", i += "\t\t\t\t<br>", i += '\t\t\t\t<a href="#' + o + '" class="js-mapmarkers-delmarker" style="float: right; color: red !important; text-decoration: none; border-bottom: 1px dotted;">' + ("RU" == lang ? "РЈРґР°Р»РёС‚СЊ" : "Delete") + "</a>", i += '\t\t\t\t<a href="#' + o + '" class="js-mapmarkers-openmap" style="text-decoration: none; border-bottom: 1px dotted;">' + ("RU" == lang ? "РќР°Р№С‚Рё РЅР° РєР°СЂС‚Рµ" : "Find on map") + "</a>", i += "\t\t\t</div>", i += '\t\t\t<div id="mapaddressboxid-' + o + '" style="position: relative; display: none;">', i += '\t\t\t\t<div class="">', i += '\t\t\t\t\t<input type="text" name="address" id="googlemapaddressid-' + o + '" placeholder="' + ("RU" == lang ? "РЈРєР°Р¶РёС‚Рµ Р°РґСЂРµСЃ" : "Input Address") + '" class="pe-input" value="" style="font-size: 14px;height: 20px;left: 120px;position: absolute;top: 30px;width: 250px;z-index: 20; box-shadow: 1px 1px 3px #cccccc;background-color:#fff;padding:10px;">', i += "\t\t\t\t\t<br>", i += '\t\t\t\t\t<div style="float: right; text-align: left; width: 130px;">', i += "\t\t\t\t\t\t" + ("RU" == lang ? "РЁРёСЂРѕС‚Р°" : "Latitude") + " (y)<br>", i += '\t\t\t\t\t\t<span id="maplatlabelid-' + o + '" style="font-weight: bold;"></span><br>', i += "\t\t\t\t\t\t" + ("RU" == lang ? "Р”РѕР»РіРѕС‚Р°" : "Longitude") + " (x)<br>", i += '\t\t\t\t\t\t<span id="maplnglabelid-' + o + '" style="font-weight: bold;"></span>', i += "\t\t\t\t\t\t<br><br>", i += '\t\t\t\t\t\t<a href="#' + o + '" id="mapaddresssavelinkid-' + o + '" class="js-mapaddresssavelinkid td-popup-btn-white" style="margin-left: 0px;">РћРљ</a>', i += "\t\t\t\t\t</div>", i += '\t\t\t\t\t<div id="googlemapaddressbox-' + o + '" style="width: 550px; height: 300px;"></div>', i += "\t\t\t\t</div>", i += "\t\t\t</div>", i += "\t\t</div>", i += "\t</div>", i += "</div>"
}

function edmap__addListener() {
    $(".js-mapmarkers-delmarker").click(function(e) {
        e.preventDefault(), $(this).closest(".js-mapmarkers-item").remove()
    }), $("#mapproviderid").change(function() {
        switch ($(this).val()) {
            case "yandex":
                "object" != typeof ymaps || "function" != typeof ymaps.Map ? !0 !== window.yandexmapsapiiscalled ? ((e = document.createElement("script")).type = "text/javascript", e.src = "https://api-maps.yandex.ru/2.1/?lang=ru-RU&coordorder=latlong&onload=initSettingMap", document.body.appendChild(e), window.yandexmapsapiiscalled = !0) : setTimeout(function() {
                    initSettingMap()
                }, 200) : initSettingMap();
                break;
            case "google":
                var e, t = $(this).closest("form").find("input[name=cont1]").val();
                "object" != typeof google || "object" != typeof google.maps ? !0 !== window.googleapiiscalled ? ((e = document.createElement("script")).type = "text/javascript", e.src = "//maps.google.com/maps/api/js?key=" + jQuery.trim(t) + "&callback=initSettingMap", document.body.appendChild(e), window.googleapiiscalled = !0) : setTimeout(function() {
                    initSettingMap()
                }, 200) : initSettingMap()
        }
    }), $(".js-mapmarkers-openmap").off("click"), $(".js-mapmarkers-openmap").dblclick(function() {
        return !1
    }), $(".js-mapmarkers-openmap").click(function(e) {
        e.preventDefault();
        var t = (t = $(this).attr("href")).substring(1);
        $("#maplatlngboxid-" + t).slideUp(), $("#mapaddressboxid-" + t).slideDown();
        var i, e = $(".edrec__wrapper").find('select[name="mapprovider"]').val();
        switch (e) {
            case "yandex":
                (i = $("#googlemapaddressbox-" + t).data("ymapcontainer")) || (initSettingMap(), i = $("#googlemapaddressbox-" + t).data("ymapcontainer"));
                break;
            case "google":
                (i = $("#googlemapaddressbox-" + t).data("gmapcontainer")) || (initSettingMap(), i = $("#googlemapaddressbox-" + t).data("gmapcontainer"))
        }
        var o = $("#googlemaplatid-" + t).val(),
            a = $("#googlemaplngid-" + t).val();
        if (o && a) switch (e) {
            case "yandex":
                var n = [parseFloat(o), parseFloat(a)];
                i.setCenter(n), $("#maplatlabelid-" + t).html(("" + n[0]).substring(0, 10)), $("#maplnglabelid-" + t).html(("" + n[1]).substring(0, 10)), $("#googlemapaddressbox-" + t).data("ymapmarker").geometry.setCoordinates(n);
                break;
            case "google":
                n = new google.maps.LatLng(o, a);
                i.setCenter(n), $("#maplatlabelid-" + t).html(("" + o).substring(0, 10)), $("#maplnglabelid-" + t).html(("" + a).substring(0, 10)), $("#googlemapaddressbox-" + t).data("gmapmarker").setPosition(n)
        }
        return !1
    }), $(".js-mapaddresssavelinkid").off("click"), $(".js-mapaddresssavelinkid").click(function(e) {
        e.preventDefault();
        var t = (t = $(this).attr("href")).substring(1);
        $("#mapaddressboxid-" + t).slideUp(), $("#maplatlngboxid-" + t).slideDown();
        e = $("#maplatlabelid-" + t).html();
        $("#googlemaplatid-" + t).val(e);
        e = $("#maplnglabelid-" + t).html();
        return $("#googlemaplngid-" + t).val(e), !1
    })
}

function initSettingMap() {
    console.log("initSettingMap");
    var s = !1,
        d = $(".edrec__wrapper").find('select[name="mapprovider"]').val();
    return $(".js-mapmarkers-box").each(function() {
        var t = {
                lat: "",
                lng: ""
            },
            a = $(this).data("mapmarkers-groupid");
        switch ("" == $("#googlemaplatid-" + a).val() && "" == $("#googlemaplngid-" + a).val() && navigator && navigator.geolocation ? s ? t = s : navigator.geolocation.getCurrentPosition(function(e) {
            s = {
                lat: e.coords.latitude,
                lng: e.coords.longitude
            }, t = s
        }) : t = {
            lat: $("#googlemaplatid-" + a).val(),
            lng: $("#googlemaplngid-" + a).val()
        }, $("#googlemapaddressbox-" + a).show(), d) {
            case "yandex":
                var e = [parseFloat(t.lat), parseFloat(t.lng)],
                    i = new ymaps.Map(document.getElementById("googlemapaddressbox-" + a), {
                        zoom: 15,
                        center: e,
                        controls: ["typeSelector", "zoomControl"]
                    }),
                    o = new ymaps.control.SearchControl({
                        options: {
                            noPlacemark: !0
                        }
                    });
                i.controls.add(o);
                var n = new ymaps.Placemark(e, {}, {
                    draggable: !0
                });
                i.geoObjects.add(n), l = "" + t.lat, $("#maplatlabelid-" + a).html(l.substring(0, 10)), l = "" + t.lng, $("#maplnglabelid-" + a).html(l.substring(0, 10)), n.events.add("dragend", function(e) {
                    e = e.get("target").geometry.getCoordinates();
                    $("#maplatlabelid-" + a).html(("" + e[0]).substring(0, 10)), $("#maplnglabelid-" + a).html(("" + e[1]).substring(0, 10)), $("#googlemapaddressid-" + a).val("")
                }), $("#googlemapaddressbox-" + a).data("ymapcontainer", i), $("#googlemapaddressbox-" + a).data("ymapmarker", n), o.events.add("resultselect", function(e) {
                    e = e.get("index");
                    o.getResult(e).then(function(e) {
                        var t = $("#googlemapaddressbox-" + a).data("ymapmarker"),
                            e = e.geometry.getCoordinates();
                        t.geometry.setCoordinates(e), $("#googlemapaddressbox-" + a).data("ymapmarker", t), t.getMap().setCenter(e), $("#maplatlabelid-" + a).html(("" + e[0]).substring(0, 10)), $("#maplnglabelid-" + a).html(("" + e[1]).substring(0, 10))
                    })
                }), $("#googlemapaddressid-" + a).hide();
                break;
            case "google":
                var l, e = new google.maps.LatLng(t.lat, t.lng),
                    r = null,
                    i = new google.maps.Map(document.getElementById("googlemapaddressbox-" + a), {
                        zoom: 15,
                        center: e
                    }),
                    n = new google.maps.Marker({
                        map: i,
                        draggable: !0,
                        position: e
                    });
                l = "" + e.lat(), $("#maplatlabelid-" + a).html(l.substring(0, 10)), l = "" + e.lng(), $("#maplnglabelid-" + a).html(l.substring(0, 10)), n.addListener("dragend", function(e) {
                    this.lat = "" + e.latLng.lat(), this.lng = "" + e.latLng.lng(), $("#maplatlabelid-" + a).html(this.lat.substring(0, 10)), $("#maplnglabelid-" + a).html(this.lng.substring(0, 10)), $("#googlemapaddressid-" + a).val("")
                }), $("#googlemapaddressbox-" + a).data("gmapcontainer", i), $("#googlemapaddressbox-" + a).data("gmapmarker", n), $("#googlemapaddressid-" + a).off("keypress"), $("#googlemapaddressid-" + a).keypress(function() {
                    r && window.clearTimeout(r), r = window.setTimeout(function() {
                        return "" != $("#googlemapaddressid-" + a).val() && void(new google.maps.Geocoder).geocode({
                            address: $("#googlemapaddressid-" + a).val()
                        }, function(e, t) {
                            var i, o;
                            t === google.maps.GeocoderStatus.OK ? ((i = $("#googlemapaddressbox-" + a).data("gmapcontainer")) || (initSettingMap(), i = $("#googlemapaddressbox-" + a).data("gmapcontainer")), i.setCenter(e[0].geometry.location), (o = $("#googlemapaddressbox-" + a).data("gmapmarker")) ? o.setPosition(e[0].geometry.location) : o = new google.maps.Marker({
                                map: i,
                                position: e[0].geometry.location
                            }), o = "function" == typeof e[0].geometry.location.lat ? "" + e[0].geometry.location.lat() : e[0].geometry.location.lat, $("#maplatlabelid-" + a).html(o.substring(0, 10)), o = "function" == typeof e[0].geometry.location.lng ? "" + e[0].geometry.location.lng() : e[0].geometry.location.lng, $("#maplnglabelid-" + a).html(o.substring(0, 10))) : "ZERO_RESULTS" != t ? console.log("Geocode was not successful for the following reason: " + t) : console.log("address " + $("#googlemapaddressid-" + a).val() + " not found")
                        })
                    }, 500)
                }), $("#googlemapaddressid-" + a).off("blur"), $("#googlemapaddressid-" + a).blur(function() {
                    $("#googlemapaddressid-" + a).trigger("keypress")
                }), $("#googlemapaddressid-" + a).off("change"), $("#googlemapaddressid-" + a).change(function() {
                    $("#googlemapaddressid-" + a).trigger("keypress")
                })
        }
    }), !0
}

function edrec__drawUI__prodoptions(e, t) {
    void 0 === e.record.prod_option && (e.record.prod_option = ""), void 0 === e.record.prod_option2 && (e.record.prod_option2 = ""), void 0 === e.record.prod_option3 && (e.record.prod_option3 = ""), void 0 === e.record.prod_variants && (e.record.prod_variants = ""), void 0 === e.record.prod_variants2 && (e.record.prod_variants2 = ""), void 0 === e.record.prod_variants3 && (e.record.prod_variants3 = "");
    var i = "";
    i += '<div class="pe-form-group" data-tpl-field="prod_option">', i += '\t<label class="pe-label">' + ("RU" == lang ? "РџР°СЂР°РјРµС‚СЂС‹" : "Variants") + "</label>", i += "</div>", e.record.prod_option || e.record.prod_variants || (i += '<div class="" style="padding-top:10px; padding-bottom:20px;">', i += '\t<a href="javascript:showprodoptions();" data-prodoptions-morebutton="" style="display:block; color:#fa8669 !important;">' + ("RU" == lang ? "Р”РѕР±Р°РІРёС‚СЊ РїР°СЂР°РјРµС‚СЂ (РЅР°РїСЂРёРјРµСЂ СЂР°Р·РјРµСЂ, С†РµРЅР° Рё С‚.Рґ)" : "Add option (e.g., size, color..)") + "</a>", i += "</div>"), i += "<div " + (e.record.prod_option || e.record.prod_variants ? "" : 'style="display:none;"') + ' data-prodoptions="">', i += '\t<table style="width:100%;">', i += "\t\t<tr>", i += '\t\t\t<td style="vertical-align:top;width:40%;">', i += '\t\t\t\t<div class="pe-form-group" data-tpl-field="prod_option">', i += '\t\t\t\t\t<label class="pe-label">' + ("RU" == lang ? "РќР°Р·РІР°РЅРёРµ РїР°СЂР°РјРµС‚СЂР°" : "Option name") + "</label>", i += '\t\t\t\t\t<div class="">', i += '\t\t\t\t\t\t<input type="text" name="prod_option" class="pe-input" placeholder="' + ("RU" == lang ? "Р¦РІРµС‚" : "Color") + '" value="' + e.record.prod_option + '">', i += "\t\t\t\t\t</div>", i += "\t\t\t\t</div>", i += "\t\t\t</td>", i += '\t\t\t<td style="width:40px;">&nbsp;&nbsp;</td>', i += '\t\t\t<td style="vertical-align:top;">', i += '\t\t\t\t<div class="pe-form-group" data-tpl-field="prod_variants">', i += '\t\t\t\t\t<label class="pe-label" style="padding-bottom:10px;">' + ("RU" == lang ? "Р—РЅР°С‡РµРЅРёСЏ РїР°СЂР°РјРµС‚СЂР°" : "Option values") + "</label>", i += '\t\t\t\t\t<div class="pe-redactor pe-noredactor">', i += '\t\t\t\t\t\t<textarea name="prod_variants" class="pe-textarea noredactor" rows="3" redaktormin="yes" style="height:100px; border:none; background-color: #eee;" placeholder="' + ("RU" == lang ? "РџРµСЂРµС‡РёСЃР»РёС‚Рµ РІР°СЂРёР°РЅС‚С‹, РѕС‚РґРµР»СЏСЏ РёС… РїРµСЂРµРЅРѕСЃРѕРј СЃС‚СЂРѕРєРё" : "Set variants by dividing them with a new line") + '">' + e.record.prod_variants + "</textarea>", i += "\t\t\t\t\t</div>", i += "\t\t\t\t</div>", i += "\t\t\t</td>", i += "\t\t</tr>", i += "\t</table>", i += '\t<div class="pe-hint" style="margin-top:-20px;">', "RU" == lang ? (i += "\t\t\tР”Р»СЏ С‚РѕРіРѕ, С‡С‚РѕР±С‹ СѓРєР°Р·Р°С‚СЊ РїР°СЂР°РјРµС‚СЂС‹ С‚РѕРІР°СЂР°, РЅР°РїРёС€РёС‚Рµ РЅР°Р·РІР°РЅРёРµ РїР°СЂР°РјРµС‚СЂР° Рё РІ РїРѕР»Рµ В«Р·РЅР°С‡РµРЅРёРµ РїР°СЂР°РјРµС‚СЂР°В» РїРµСЂРµС‡РёСЃР»РёС‚Рµ РІР°СЂРёР°РЅС‚С‹, РѕС‚РґРµР»СЏСЏ РёС… РїРµСЂРµРЅРѕСЃРѕРј СЃС‚СЂРѕРєРё.", i += '\t\t\t<a href="javascript:showprodoptionshint();" data-prodoptions-morehintbutton="" style="color:#fa8669 !important;">РџРѕРґСЂРѕР±РЅРµРµ...</a>', i += '\t\t\t<span data-prodoptionshint="" style="display:none;">', i += "\t\t\tРќР°РїСЂРёРјРµСЂ:", i += "\t\t\t<br>РЎРµСЂС‹Р№", i += "\t\t\t<br>РЎРёРЅРёР№", i += "\t\t\t<br>РљСЂР°СЃРЅС‹Р№", i += "\t\t\t<br>", i += "\t\t\t<br>Р•СЃР»Рё С†РµРЅР° СЂР°Р·РЅС‹С… РїР°СЂР°РјРµС‚СЂРѕРІ РѕС‚Р»РёС‡Р°РµС‚СЃСЏ РѕС‚ РѕСЃРЅРѕРІРЅРѕР№, РЅР°РїСЂРѕС‚РёРІ Р·РЅР°С‡РµРЅРёСЏ РїР°СЂР°РјРµС‚СЂР° РїРѕСЃС‚Р°РІСЊС‚Рµ Р·РЅР°Рє = Рё СѓРєР°Р¶РёС‚Рµ С†РµРЅСѓ РїР°СЂР°РјРµС‚СЂР° (С‚РѕР»СЊРєРѕ С†РёС„СЂС‹, Р±РµР· РІР°Р»СЋС‚С‹). РќР°РїСЂРёРјРµСЂ:", i += "\t\t\t<br>РЎС‚Р°РЅРґР°СЂС‚РЅС‹Р№", i += "\t\t\t<br>Р‘РѕР»СЊС€РѕР№ 5000 СЂСѓР±. = 5000", i += "\t\t\t<br>", i += "\t\t\t<br>Р•СЃР»Рё Рє РѕСЃРЅРѕРІРЅРѕР№ С†РµРЅРµ РЅСѓР¶РЅРѕ РґРѕР±Р°РІРёС‚СЊ РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅСѓСЋ СЃС‚РѕРёРјРѕСЃС‚СЊ, РїРѕСЃС‚Р°РІСЊС‚Рµ Р·РЅР°Рє =+ Рё СѓРєР°Р¶РёС‚Рµ РЅР°РґР±Р°РІРєСѓ (С‚РѕР»СЊРєРѕ С†РёС„СЂС‹, Р±РµР· РІР°Р»СЋС‚С‹). РќР°РїСЂРёРјРµСЂ:", i += "\t\t\t<br>РЎС‚Р°РЅРґР°СЂС‚РЅР°СЏ СѓРїР°РєРѕРІРєР°", i += "\t\t\t<br>РџРѕРґР°СЂРѕС‡РЅР°СЏ СѓРїР°РєРѕРІРєР° 300 СЂСѓР±. = +300") : (i += "\t\t\tTo put product options, write the option name and put the variants in the Option Value field by dividing them with a new line.", i += '\t\t\t<a href="javascript:showprodoptionshint();" data-prodoptions-morehintbutton="" style="color:#fa8669 !important;">Read more...</a>', i += '\t\t\t<span data-prodoptionshint="" style="display:none;">', i += "\t\t\tFor example:", i += "\t\t\t<br>Grey", i += "\t\t\t<br>Blue", i += "\t\t\t<br>Red", i += "\t\t\t<br>", i += "\t\t\t<br>If the price of the options differs from the basic price, put the sign = and write an option price (only numbers, without currency) after option value. For example:", i += "\t\t\t<br>Standard", i += "\t\t\t<br>Large $200 = 200", i += "\t\t\t<br>", i += "\t\t\t<br>If you need to add an additional price to the basic one, put the sign =+ and write an extra charge (only numbers, without currency). For example:", i += "\t\t\t<br>Standard packaging", i += "\t\t\t<br>Gift packaging $5 = +5"), i += "\t\t\t</span>", i += "\t\t<br><br><br>", i += "\t</div>", e.record.prod_option2 || e.record.prod_variants2 || (i += '\t<div class="" style="padding-top:10px; padding-bottom:20px;">', i += '\t\t<a href="javascript:showprodoptions2();" data-prodoptions2-morebutton="" style="display:block; color:#fa8669 !important;">' + ("RU" == lang ? "Р”РѕР±Р°РІРёС‚СЊ РїР°СЂР°РјРµС‚СЂ" : "Add option") + "</a>", i += "\t</div>"), i += "</div>", i += "<div " + (e.record.prod_option2 || e.record.prod_variants2 ? "" : 'style="display:none;"') + ' data-prodoptions2="">', i += '\t<table style="width:100%;">', i += "\t\t<tr>", i += '\t\t\t<td style="vertical-align:top;width:40%;">', i += '\t\t\t\t<div class="pe-form-group" data-tpl-field="prod_option2">', i += '\t\t\t\t\t<label class="pe-label">' + ("RU" == lang ? "РќР°Р·РІР°РЅРёРµ РІС‚РѕСЂРѕРіРѕ РїР°СЂР°РјРµС‚СЂР°" : "Second option name") + "</label>", i += '\t\t\t\t\t<div class="">', i += '\t\t\t\t\t\t<input type="text" name="prod_option2" class="pe-input" placeholder="' + ("RU" == lang ? "Р Р°Р·РјРµСЂ" : "Size") + '" value="' + e.record.prod_option2 + '">', i += "\t\t\t\t\t</div>", i += "\t\t\t\t</div>", i += "\t\t\t</td>", i += '\t\t\t<td style="width:40px;">&nbsp;&nbsp;</td>', i += '\t\t\t<td style="vertical-align:top;">', i += '\t\t\t\t<div class="pe-form-group" data-tpl-field="prod_variants2">', i += '\t\t\t\t\t<label class="pe-label" style="padding-bottom:10px;">' + ("RU" == lang ? "Р—РЅР°С‡РµРЅРёСЏ РІС‚РѕСЂРѕРіРѕ РїР°СЂР°РјРµС‚СЂР°" : "Second option values") + "</label>", i += '\t\t\t\t\t<div class="pe-redactor pe-noredactor">', i += '\t\t\t\t\t\t<textarea name="prod_variants2" class="pe-textarea noredactor" rows="3" redaktormin="yes" style="height:100px; border:none; background-color: #eee;" placeholder="' + ("RU" == lang ? "РџРµСЂРµС‡РёСЃР»РёС‚Рµ РІР°СЂРёР°РЅС‚С‹, РѕС‚РґРµР»СЏСЏ РёС… РїРµСЂРµРЅРѕСЃРѕРј СЃС‚СЂРѕРєРё" : "Set variants by dividing them with a new line") + '">' + e.record.prod_variants2 + "</textarea>", i += "\t\t\t\t\t</div>", i += "\t\t\t\t</div>", i += "\t\t\t</td>", i += "\t\t</tr>", i += "\t</table>", e.record.prod_option3 || e.record.prod_variants3 || (i += '\t<div class="" style="padding-top:10px; padding-bottom:20px;">', i += '\t\t<a href="javascript:showprodoptions3();" data-prodoptions3-morebutton="" style="display:block; color:#fa8669 !important;">' + ("RU" == lang ? "Р”РѕР±Р°РІРёС‚СЊ РїР°СЂР°РјРµС‚СЂ" : "Add option") + "</a>", i += "\t</div>"), i += "</div>", i += "<div " + (e.record.prod_option3 || e.record.prod_variants3 ? "" : 'style="display:none;"') + ' data-prodoptions3="">', i += '\t<table style="width:100%;">', i += "\t\t<tr>", i += '\t\t\t<td style="vertical-align:top;width:40%;">', i += '\t\t\t\t<div class="pe-form-group" data-tpl-field="prod_option3">', i += '\t\t\t\t\t<label class="pe-label">' + ("RU" == lang ? "РќР°Р·РІР°РЅРёРµ С‚СЂРµС‚СЊРµРіРѕ РїР°СЂР°РјРµС‚СЂР°" : "Third option name") + "</label>", i += '\t\t\t\t\t<div class="">', i += '\t\t\t\t\t\t<input type="text" name="prod_option3" class="pe-input" value="' + e.record.prod_option3 + '">', i += "\t\t\t\t\t</div>", i += "\t\t\t\t</div>", i += "\t\t\t</td>", i += '\t\t\t<td style="width:40px;">&nbsp;&nbsp;</td>', i += '\t\t\t<td style="vertical-align:top;">', i += '\t\t\t\t<div class="pe-form-group" data-tpl-field="prod_variants3">', i += '\t\t\t\t\t<label class="pe-label" style="padding-bottom:10px;">' + ("RU" == lang ? "Р—РЅР°С‡РµРЅРёСЏ С‚СЂРµС‚СЊРµРіРѕ РїР°СЂР°РјРµС‚СЂР°" : "Third option values") + "</label>", i += '\t\t\t\t\t<div class="pe-redactor pe-noredactor">', i += '\t\t\t\t\t\t<textarea name="prod_variants3" class="pe-textarea noredactor" rows="3" redaktormin="yes" style="height:100px; border:none; background-color: #eee;" placeholder="' + ("RU" == lang ? "РџРµСЂРµС‡РёСЃР»РёС‚Рµ РІР°СЂРёР°РЅС‚С‹, РѕС‚РґРµР»СЏСЏ РёС… РїРµСЂРµРЅРѕСЃРѕРј СЃС‚СЂРѕРєРё" : "Set variants by dividing them with a new line") + '">' + e.record.prod_variants3 + "</textarea>", i += "\t\t\t\t\t</div>", i += "\t\t\t\t</div>", i += "\t\t\t</td>", i += "\t\t</tr>", i += "\t</table>", i += "</div>", t.append(i)
}

function showprodoptions() {
    $("[data-prodoptions]").css("display", "block"), $("[data-prodoptions-morebutton]").css("display", "none")
}

function showprodoptionshint() {
    $("[data-prodoptionshint]").css("display", "inline-block"), $("[data-prodoptions-morehintbutton]").css("display", "none")
}

function showprodoptions2() {
    $("[data-prodoptions2]").css("display", "block"), $("[data-prodoptions2-morebutton]").css("display", "none")
}

function showprodoptions3() {
    $("[data-prodoptions3]").css("display", "block"), $("[data-prodoptions3-morebutton]").css("display", "none")
}

function edlink__drawUI__Link(e, t, i, o) {
    var a = e;
    "link" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР°" : "Link"), "link1" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° 2" : "Link 1"), "link2" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° 2" : "Link 2"), "link3" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° 3" : "Link 3"), "link4" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° 4" : "Link 4"), "link5" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° 5" : "Link 5"), "link6" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° 6" : "Link 6"), "link7" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° 7" : "Link 7"), "link8" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° 8" : "Link 8"), "buttonlink" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ РєРЅРѕРїРєРё" : "Button Link"), "buttonlink2" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ РІС‚РѕСЂРѕР№ РєРЅРѕРїРєРё" : "Second Button Link"), "buttonlink3" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ С‚СЂРµС‚СЊРµР№ РєРЅРѕРїРєРё" : "Third Button Link"), "buttonlink4" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ С‡РµС‚РІРµСЂС‚РѕР№ РєРЅРѕРїРєРё" : "Four Button Link"), "buttonlink5" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ РєРЅРѕРїРєРё 5" : "Button Link 5"), "buttonlink6" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ РєРЅРѕРїРєРё 6" : "Button Link 6"), "buttonlink7" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ РєРЅРѕРїРєРё 7" : "Button Link 7"), "buttonlink8" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ РєРЅРѕРїРєРё 8" : "Button Link 8"), "bbuttonlink" == e && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ РєРЅРѕРїРєРё" : "Button Link");
    var n = "bbuttonlink" == e ? "bbuttonlinktarget" : "buttonlink8" == e ? "buttonlinktarget8" : "buttonlink7" == e ? "buttonlinktarget7" : "buttonlink6" == e ? "buttonlinktarget6" : "buttonlink5" == e ? "buttonlinktarget5" : "buttonlink4" == e ? "buttonlinktarget4" : "buttonlink3" == e ? "buttonlinktarget3" : "buttonlink2" == e ? "buttonlinktarget2" : "buttonlink" == e ? "buttonlinktarget" : "link8" == e ? "linktarget8" : "link7" == e ? "linktarget7" : "link6" == e ? "linktarget6" : "link5" == e ? "linktarget5" : "link4" == e ? "linktarget4" : "link3" == e ? "linktarget3" : "link2" == e ? "linktarget2" : "link1" == e ? "linktarget1" : "link" == e ? "linktarget" : "",
        l = "RU" == lang ? 'РџРѕР¶Р°Р»СѓР№СЃС‚Р°, СѓРєР°Р·С‹РІР°Р№С‚Рµ РїРѕР»РЅС‹Р№ Р°РґСЂРµСЃ СЃСЃС‹Р»РєРё, РЅР°С‡РёРЅР°СЋС‰РёР№СЃСЏ СЃ http://<br>РЎСЃС‹Р»РєРё РЅР° РґСЂСѓРіРёРµ СЃС‚СЂР°РЅРёС†С‹ РІР°С€РµРіРѕ СЃР°Р№С‚Р° РјРѕР¶РЅРѕ РЅР°С‡РёРЅР°С‚СЊ СЃ / Рё РЅРµ СѓРєР°Р·С‹РІР°С‚СЊ Р°РґСЂРµСЃ СЃР°Р№С‚Р°. РџРѕРґСЂРѕР±РЅРµРµ: <a href="https://help-ru.tilda.cc/link-to-page" target="_blank">РљР°Рє РїРѕСЃС‚Р°РІРёС‚СЊ СЃСЃС‹Р»РєСѓ РЅР° РґСЂСѓРіСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ</a>' : 'Please enter the full link address, starting with http://<br>You can start links to other pages of your website with / not specifying website address.<br><a href="https://help.tilda.cc/link-to-page" target="_blank">How to set up links to other pages</a>',
        r = $(".pe-form-group-field-" + e),
        s = $(".pe-content-form").attr("data-rec-tplid"),
        d = "RU" === window.lang ? "РЎСЃС‹Р»РєР°" : "Link",
        p = "yes";
    "365" === s && (p = "", d = "89546664");
    s = "";
    s += '<label class="pe-label">' + a + ' <img src="/tpl/img/page/pe-help.svg" class="pe-tooltip" style="display:inline-block;opacity:0.2;width:16px;padding-bottom:3px;" data-tooltip=\'' + l + "'></label>", s += '<div class="pe-field-link">', s += '    <input type="text" name="' + e + '" class="pe-input pe-field-link-input-link" data-need-check-link="yes" value="' + t + '" placeholder="' + d + '">', s += '\t<div class="pe-field-link-more" style="margin-top:-2px;">', "yes" == i && (s += '\t<label class="pe-label-checkbox pe-field-link-target" style="padding-right:15px; font-size:11px;">', s += '\t  \t<input type="hidden" name="' + n + '" value="' + o + '" class="pe-field-link-input-target"/>', s += '      \t<input type="checkbox" class="pe-field-link-cb-target" ' + ("_blank" == o ? 'checked="checked"' : "") + '> <span class="pe-checkbox-title">' + ("RU" === window.lang ? "Р’ РЅРѕРІРѕР№ РІРєР»Р°РґРєРµ" : "New window") + "</span>", s += "\t</label>"), "yes" === p && (s += '\t<span class="pe-field-link-link-pg" style="padding-right:15px; font-size:11px; cursor:context-menu;">' + ("RU" === window.lang ? "Р’С‹Р±СЂР°С‚СЊ СЃС‚СЂР°РЅРёС†Сѓ" : "Link to Page") + "</span>", s += '\t<span class="pe-field-link-link-an" style="padding-right:15px; font-size:11px; cursor:context-menu;">' + ("RU" === window.lang ? "Р’С‹Р±СЂР°С‚СЊ Р±Р»РѕРє" : "Link to Block") + "</span>"), s += "\t</div>", s += "</div>", s += '<div class="pe-hint" style="' + ("yes" === p ? "margin-top:-10px;" : "") + '"></div>', s += "", r.append(s), r.find(".pe-field-link-input-link").change(function() {
        var e, t = $(this).val();
        "" != t && (e = t.trim(), t != e && $(this).val(e)), tp__checkLinkCCtoWS(t)
    }), r.find(".pe-field-link-link-pg").click(function() {
        edlink__showPopUp__pageslist(r.find(".pe-field-link-input-link"))
    }), r.find(".pe-field-link-link-an").click(function() {
        edlink__RecordPiker__show(r.find(".pe-field-link-input-link"))
    }), r.find(".pe-field-link-cb-target").change(function() {
        var e = (e = $(this).is(":checked")) ? "_blank" : "";
        r.find(".pe-field-link-input-target").val(e)
    })
}

function edlink__showPopUp__pageslist(t) {
    showLoadIcon(), $.ajax({
        type: "POST",
        url: "/projects/submit/",
        data: {
            comm: "getpageslist",
            projectid: window.projectid
        },
        dataType: "text",
        success: function(e) {
            hideLoadIcon(), check_logout(e), edlink__drawPopUp__pageslist(e, window.projectid, t)
        },
        error: function() {
            alert("Request timeout (get pageslist)"), hideLoadIcon()
        },
        timeout: 3e4
    })
}

function edlink__drawPopUp__pageslist(e, t, i) {
    var o, a = JSON.parse(e),
        n = "";
    for (o in n += '<button type="button" class="close tm-popup__close" data-dismiss="modal" aria-label="Close" style="position:absolute;right:10px;top:10px;"><span aria-hidden="true">Г—</span></button>', n += '<div style="height:400px; overflow:auto;overflow-y:visible;">', n += '<div style="padding:30px 40px;width:500px;">', n += '<div style="font-size:22px;padding-bottom:10px;">' + ("RU" == lang ? "РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РІС‹Р±РµСЂРёС‚Рµ СЃС‚СЂР°РЅРёС†Сѓ:" : "Please choose a page:") + "</div>", a) {
        var l = a[o];
        n += '<div style="padding-top:10px;padding-bottom:10px;border-bottom:1px solid #eee;cursor:pointer" class="js-pe-popup-pageslist-item">', n += '<div style="font-size:18px;">' + l.title + "</div>", n += '<div style="font-size:14px; opacity:0.4;" class="js-pe-popup-pageslist-item-url">/' + l.url + "</div>", n += "</div>"
    }
    n += "</div>", n += "</div>", edlink__openPopup(), $("#myModalContent").html(n), $(".js-pe-popup-pageslist-item").click(function() {
        var e = $(this).find(".js-pe-popup-pageslist-item-url").html();
        i.val(e), edlink__closePopup()
    }), $(document).on("mousedown", function(e) {
        $(e.target).closest("#myModalContent").length || edlink__closePopup(), e.stopPropagation()
    }), $(document).keydown(function(e) {
        27 == e.keyCode && edlink__closePopup()
    }), $('.close[data-dismiss="modal"]').on("click", function(e) {
        e.preventDefault(), edlink__closePopup()
    }), $('.tm-popup__close[data-dismiss="modal"]').on("click", function(e) {
        e.preventDefault(), edlink__closePopup()
    })
}

function edlink__openPopup() {
    var e = $("body"),
        t = $("#myModal");
    e.addClass("modal-open tm-popup_open"), e.append('<div class="modal-backdrop fade in tm-popup__backdrop tm-popup__backdrop_fade tm-popup__backdrop_in"></div>'), t.addClass("in tm-popup_in"), t.css("display", "block")
}

function edlink__closePopup() {
    $("body").removeClass("modal-open tm-popup_open"), $("#myModal").removeClass("in tm-popup_in"), $("#myModal").css("display", "none"), $(".modal-backdrop").remove(), $(".tm-popup__backdrop").remove()
}

function edlink__RecordPiker__show(i) {
    $("body").addClass("pe-recordpiker-body"), $(".record").addClass("pe-recordpiker"), $("body").append('<div id="select_records_toolbar" style="opacity: 1; top: 0px;"><div class="select_records_toolbar__left">' + ("RU" == lang ? "РљР»РёРєРЅРёС‚Рµ РЅР° РЅСѓР¶РЅС‹Р№ Р±Р»РѕРє" : "Select block") + '</div><div class="select_records_toolbar__right"><a href="javascript:edlink__RecordPiker__close();">' + ("RU" == lang ? "РћС‚РјРµРЅР°" : "Cancel") + "</a></div></div>"), tp__showCornerNotice("RU" == lang ? "РљР»РёРєРЅРёС‚Рµ РЅР° Р±Р»РѕРє, С‡С‚РѕР±С‹ РµРіРѕ РІС‹Р±СЂР°С‚СЊ.</b>" : "РЎlick on the block to select.</b>", 5e3), $(".pe-recordpiker").bind("click.recpikerevent", function(e) {
        e.preventDefault(), e.stopPropagation();
        var t = $(this),
            e = "#rec" + t.attr("recordid");
        "215" == t.attr("data-record-type") && (e = "#" + (e = t.find(".r").find("a").attr("name")));
        t = t.find(".r").find("[data-tooltip-hook]");
        t.length && (e = t.attr("data-tooltip-hook")), i.val(e), edlink__RecordPiker__close()
    })
}

function edlink__RecordPiker__close() {
    $(".pe-recordpiker").unbind("click.recpikerevent"), $("body").removeClass("pe-recordpiker-body"), $(".record").removeClass("pe-recordpiker"), $("#select_records_toolbar").remove()
}

function edlink__RecordsidsPiker__show(t) {
    $("body").addClass("pe-recordpiker-body"), $(".record").addClass("pe-recordpiker"), $("body").append('<div id="select_records_toolbar" style="opacity: 1; top: 0px;"><div class="select_records_toolbar__left">' + ("RU" == lang ? "РљР»РёРєРЅРёС‚Рµ РЅР° РЅСѓР¶РЅС‹Р№ Р±Р»РѕРє, С‡С‚РѕР±С‹ РµРіРѕ РѕС‚РјРµС‚РёС‚СЊ" : "Select blocks") + '</div><div class="select_records_toolbar__right"><a href="javascript:edlink__RecordsidsPiker__close();" style="padding:14px 20px;background-color:#ff855D;color:#fff;font-weight:500;border-radius:30px;">' + ("RU" == lang ? "РЎРѕС…СЂР°РЅРёС‚СЊ Рё Р·Р°РєСЂС‹С‚СЊ" : "Save and close") + "</a></div></div>"), $(".record").removeClass("record_selected").removeClass("active");
    var e = t.val();
    if (void 0 !== e && "" != e)
        for (var i = e.split(","), o = 0; o < i.length; o++) {
            var a = i[o];
            0 < a && ((a = $("#record" + a)).length && a.addClass("record_selected").addClass("active"))
        }
    $(".pe-recordpiker").bind("click.recpikerevent", function(e) {
        e.preventDefault(), e.stopPropagation();
        e = $(this);
        e.hasClass("active") ? e.removeClass("record_selected").removeClass("active") : e.addClass("record_selected").addClass("active");
        var i = "";
        $(".record_selected").each(function() {
            var e = $(this),
                t = e.attr("recordid");
            "121" !== e.attr("data-record-type") || (e = e.find("#rec" + t).find(".r[id]")).length && (t = e.attr("id").replace("rec", "")), i = "" == i ? t : i + "," + t
        }), t.val(i)
    })
}

function edlink__RecordsidsPiker__close() {
    $(".pe-recordpiker").unbind("click.recpikerevent"), $("body").removeClass("pe-recordpiker-body"), $(".record").removeClass("pe-recordpiker").removeClass("record_selected").removeClass("active"), $("#select_records_toolbar").remove()
}

function edlink__drawUI__Recids(e, t) {
    var i = e;
    "recids" == e && (i = "RU" == lang ? "ID Р‘Р»РѕРєРѕРІ" : "Block ids"), "recids2" == e && (i = "RU" == lang ? "ID Р‘Р»РѕРєРѕРІ 2" : "Block ids 2"), "recids3" == e && (i = "RU" == lang ? "ID Р‘Р»РѕРєРѕРІ 3" : "Block ids 3"), "recids4" == e && (i = "RU" == lang ? "ID Р‘Р»РѕРєРѕРІ 4" : "Block ids 4"), "recids5" == e && (i = "RU" == lang ? "ID Р‘Р»РѕРєРѕРІ 5" : "Block ids 5"), "recids6" == e && (i = "RU" == lang ? "ID Р‘Р»РѕРєРѕРІ 6" : "Block ids 6"), "recids7" == e && (i = "RU" == lang ? "ID Р‘Р»РѕРєРѕРІ 7" : "Block ids 7"), "recids8" == e && (i = "RU" == lang ? "ID Р‘Р»РѕРєРѕРІ 8" : "Block ids 8");
    var o = "RU" == lang ? 'РџРѕР¶Р°Р»СѓР№СЃС‚Р°, СѓРєР°Р¶РёС‚Рµ ID Р±Р»РѕРєРѕРІ С‡РµСЂРµР· Р·Р°РїСЏС‚СѓСЋ. <a href="https://help-ru.tilda.cc/design-menu#rec8321876" target="_blank">РџРѕРґСЂРѕР±РЅРµРµ...</a>' : "Please set blocks ID divided by comma",
        a = $(".pe-form-group-field-" + e),
        n = "";
    n += '<label class="pe-label">' + i + ' <img src="/tpl/img/page/pe-help.svg" class="pe-tooltip" style="display:inline-block;opacity:0.2;width:16px;padding-bottom:3px;" data-tooltip=\'' + o + "'></label>", n += '<div class="pe-field-recids">', n += '    <input type="text" name="' + e + '" class="pe-input pe-field-recids-input-link" value="' + t + '" placeholder="' + (lang, "") + '">', n += '\t<div class="pe-field-recids-more" style="margin-top:-2px;">', n += '\t<span class="pe-field-recids-link-an" style="padding-right:15px; font-size:11px; cursor:context-menu;">' + ("RU" == lang ? "Р’С‹Р±СЂР°С‚СЊ Р±Р»РѕРєРё" : "Choose Blocks") + "</span>", n += "\t</div>", n += "</div>", n += '<div class="pe-hint" style="margin-top:-10px;"></div>', n += "", a.append(n), a.find(".pe-field-recids-input-link").change(function() {
        var e, t = $(this).val();
        "" != t && (e = t.trim(), t != e && $(this).val(e))
    }), a.find(".pe-field-recids-link-an").click(function() {
        edlink__RecordsidsPiker__show(a.find(".pe-field-recids-input-link"))
    })
}

function edrec__settings__sendform(t) {
    if (void 0 === window.pe_datasendts) window.pe_datasendts = Date.now() / 1e3;
    else {
        if (Date.now() / 1e3 - window.pe_datasendts < 5) return void console.log("Error: Sending data in process.");
        window.pe_datasendts = Date.now() / 1e3
    }
    showLoadIcon();
    var a = $(".pe-settings-form").attr("data-rec-id"),
        n = ($(".pe-settings-form").attr("data-rec-tplid"), $("#form" + a).serialize()),
        l = Date.now();
    $(".pe-settings__savebtns-wrapper").css("pointer-events", "none").css("opacity", "0.5"), $.ajax({
        type: "POST",
        url: "/page/submit/",
        data: n,
        dataType: "text",
        success: function(e) {
            check_logout(e), "132" != a ? ($("html, body").animate({
                scrollTop: $("#record" + a).offset().top - 100
            }, 700), void 0 !== window.blockList && window.blockList.rebuildList(), updateRecord(a), "" == e ? (updateUndoButton(), delete window.edrec_isChanged, "update" != t && edrec__closeEditForm()) : ($("#preview" + a).html(e), td__showBubbleNotice(e, 3e3))) : location.reload()
        },
        error: function(e, t) {
            var i, o = Date.now() - l;
            console.log(e.status), console.log(t), "abort" === t || (400 <= e.status ? (i = "Request error (save block settings). Error code: " + e.status, $("#preview" + a).html(i), td__showBubbleNotice(i, 6e3, "error"), logAjaxError("/page/submit/", n, "save record settings error", e.status, {
                ts_delta: parseInt(o / 1e3),
                exception: t
            })) : 0 == e.status && o < 100 ? alert("Request error (save block settings). Please check your Internet connection and try again.") : (alert("Request timeout (save block settings). Please reload the page and try again."), logNetworkError("ajax", "/page/submit/", n, o / 1e3, {})))
        },
        complete: function(e) {
            delete window.pe_datasendts, $(".pe-settings__savebtns-wrapper").css("pointer-events", "auto").css("opacity", "1"), hideLoadIcon()
        },
        timeout: 3e4
    })
}

function edrec__content__sendform(e) {
    if (void 0 !== window.pe_preventdblclick && "y" == window.pe_preventdblclick) return console.log("Error: pe prevent dblclick"), "";
    window.pe_preventdblclick = "y", setTimeout(function() {
        delete window.pe_preventdblclick, edrec__content__sendform_do(e)
    }, 100)
}

function edrec__content__sendform_do(t) {
    var e = $(".pe-content-form"),
        a = e.attr("data-rec-id"),
        i = e.attr("data-rec-tplid");
    if (void 0 === window.pe_datasendts) window.pe_datasendts = Date.now() / 1e3;
    else {
        if (Date.now() / 1e3 - window.pe_datasendts < 5) return void console.log("Error: Sending data in process.");
        window.pe_datasendts = Date.now() / 1e3
    }
    showLoadIcon(), 1061 == i && e.find('.pe-textarea[name="li_title"]').each(function() {
        var e = $(this),
            t = e.val().trim().match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/),
            t = !(!t || 11 != t[7].length) && t[7];
        t && e.val(t)
    });
    var o = e.find(".pe-menuitems-item").find('[name^="menuitems-link["]'),
        n = e.find('.pe-input[name="li_name"]');
    $.extend({}, n, o).each(function() {
        var e = $(this),
            t = e.val().trim();
        e.val(t)
    });
    n = $(".js-not-send-on-server");
    0 < n.length && n.attr("disabled", "disabled"), e.find(".js-aceeditor").each(function() {
        var e = $(this).data("aceeditor");
        e && $(this).val(e.getValue())
    }), e.find(".editlist__data").each(function() {
        if ($(this).parent().find(".editlist__wrapper").length) {
            var e = $(this).parent().find(".editlist__wrapper");
            if (void 0 !== e.attr("data-init-status") && "inited" == e.attr("data-init-status")) {
                if ("edli" == e.attr("data-ui-type")) try {
                    edli__allitems__getData__inJson()
                } catch (e) {}
                if ("edfo" == e.attr("data-ui-type")) try {
                    edfo__allitems__getData__inJson()
                } catch (e) {}
                if ("edsl" == e.attr("data-ui-type")) try {
                    edsl__allitems__getData__inJson()
                } catch (e) {}
            }
        }
    });
    var l = e.serializeArray(),
        o = e.find('[data-tpl-field="mapmarkers"]');
    if (0 < o.length && 5e4 < JSON.stringify(l).length) return td__showBubbleNotice(tc__translate("{{error_too_much_data}}", "edrec__dict")), void hideLoadIcon();
    n = [131, 868, 370, 268, 269, 355, 315, 881, 884].some(function(e) {
        return parseInt(i, 10) == e
    });
    if (n) {
        if (12e4 < JSON.stringify(l).length) return td__showBubbleNotice(tc__translate("{{error_too_much_data}}", "edrec__dict")), void hideLoadIcon();
        var r = e.find('[name="code"]').val(),
            o = (new DOMParser).parseFromString('<div id="tilda1"></div>' + r + '<div id="tilda2"></div>', "text/html");
        if (null == o.querySelector("body > #tilda1") || null == o.querySelector("body > #tilda2")) {
            hideLoadIcon(), delete window.pe_datasendts;
            var s = tc__translate("{{error_missing_end_tag}}", "edrec__dict");
            return void $("#preview" + a).html(s).css("color", "#fff").css("margin-bottom", "20px").css("background-color", "#f95d51").css("border-left", "5px solid red").css("padding", "15px 25px")
        }
    }
    if (n && "undefined" != typeof $opaid && "" == $opaid) {
        r = e.find('[name="code"]').val();
        if ("string" == typeof r && "" != r && (-1 < (r = r.toLowerCase()).indexOf("location.href") || -1 < r.indexOf("location.replace") || -1 < r.indexOf("http-equiv") && -1 < r.indexOf("url="))) {
            hideLoadIcon(), delete window.pe_datasendts;
            s = tc__translate("{{redirect_prohibited_in_free_plan}}", "edrec__dict");
            return void $("#preview" + a).html(s).css("color", "#fff").css("margin-bottom", "20px").css("background-color", "#f95d51").css("border-left", "5px solid red").css("padding", "15px 25px")
        }
    }
    var d = Date.now();
    $(".pe-content__savebtns-table").css("pointer-events", "none").css("opacity", "0.5"), $.ajax({
        type: "POST",
        url: "/page/submit/",
        data: l,
        dataType: "text",
        success: function(e) {
            check_logout(e), "132" != a ? ($("html, body").animate({
                scrollTop: $("#record" + a).offset().top - 100
            }, 700), void 0 !== window.blockList && window.blockList.rebuildList(), updateRecord(a), "" == e ? (showUndoButton(), delete window.edrec_isChanged, "update" != t && edrec__closeEditForm(), "update" == t && editRecordContent(a)) : ($("#preview" + a).html(e), td__showBubbleNotice(e, 5e3))) : location.reload()
        },
        error: function(e, t) {
            var i, o = Date.now() - d;
            console.log(e.status), console.log(t), "abort" === t || (400 <= e.status ? (i = "Request error (save block content). Error code: " + e.status, $("#preview" + a).html(i), td__showBubbleNotice(i, 6e3, "error"), logAjaxError("/page/submit/", l, "save record content error", e.status, {
                ts_delta: parseInt(o / 1e3),
                exception: t
            })) : 0 == e.status && o < 100 ? alert("Request error (save block content). Please check your Internet connection and try again.") : (alert("Request timeout (save block content). Please reload the page and try again."), logNetworkError("ajax", "/page/submit/", l, o / 1e3, {})))
        },
        complete: function(e) {
            $(".pe-content__savebtns-table").css("pointer-events", "auto").css("opacity", "1"), delete window.pe_datasendts, hideLoadIcon()
        },
        timeout: 2e4
    })
}

function edli__init() {
    var e = $('.editlist__wrapper[data-ui-type="edli"]');
    if ("undefined" == e.attr("data-init-status") || "inited" != e.attr("data-init-status") && "begin" != e.attr("data-init-status")) {
        e.attr("data-init-status", "begin");
        var t = $('.editlist__data[name="list"]').html();
        void 0 !== t && "" != t || (t = "{}");
        var i, o = JSON.parse(t);
        for (i in o = edli__dublCheck_Ids(o)) edli__drawItem(o[i]);
        e.attr("data-init-status", "inited")
    } else console.log("error: editlist already inited")
}

function edli__dublCheck_Ids(e) {
    var t, i, o, a = [],
        n = 0;
    for (i in e) null != (o = e[i]) && "object" == typeof o ? (n++, e[i].i = n, (t = o.lid) in a ? (o = Math.floor(1e3 * Math.random()) + 10, o = Date.now() - o, console.log("new lid: " + o), e[i].lid = o) : a[t] = "y") : delete e[i];
    return e
}

function edli__drawItem(a, e) {
    var t = $('.editlist__wrapper[data-ui-type="edli"]'),
        n = a.lid,
        i = a.ls,
        o = a.loff,
        l = t.attr("data-lfields").split(","),
        r = "";
    r += '<div class="pe-list-item" data-listitem-id="' + n + '" data-listitem-sort="' + i + '" data-listitem-off="' + o + '" style="background-color:#efefef; padding:40px; margin:10px 0px; ' + ("y" == o ? "opacity:0.5;" : "") + '">', r += '<div class="pe-list-item-title" style="padding:0px 0px 35px 0px;">', r += '<table style="width:100%; font-size:12px;">', r += "<tr>", r += '<td style="width:100%;letter-spacing:1px;white-space:nowrap;"><b>' + ("RU" == lang ? "РљРђР РўРћР§РљРђ" : "ITEM") + ' <span class="pe-list-item-i">' + a.i + "</span></b></td>", r += '<td class="pe-list-item-btn-dubl" style="padding:0 10px;"><a href="javascript:edli__dupl(' + n + ')">' + ("RU" == lang ? "Р”СѓР±Р»РёСЂРѕРІР°С‚СЊ" : "Duplicate") + "</a></td>", r += '<td class="pe-list-item-btn-offon" style="padding:0 10px;"><a href="javascript:edli__off(' + n + ')">', "y" == a.loff ? r += "RU" == lang ? "Р’РєР»СЋС‡РёС‚СЊ" : "On" : r += "RU" == lang ? "Р’С‹РєР»СЋС‡РёС‚СЊ" : "Off", r += "</a></td>", r += '<td class="pe-list-item-btn-del" style="padding:0 10px;"><a href="javascript:edli__del(' + n + ')">' + ("RU" == lang ? "РЈРґР°Р»РёС‚СЊ" : "Delete") + "</a></td>", r += '<td class="pe-list-item-btn-up" style="padding:0 10px;"><a href="javascript:edli__up(' + n + ')">' + ("RU" == lang ? "Р’РІРµСЂС…" : "Up") + "</a></td>", r += '<td class="pe-list-item-btn-down" style="padding:0 0 0 10px;"><a href="javascript:edli__down(' + n + ')">' + ("RU" == lang ? "Р’РЅРёР·" : "Down") + "</a></td>", r += "</div>", r += "</div>", 0 < e ? t.find("[data-listitem-id=" + e + "]").after(r) : t.append(r);
    var s = "";
    l.forEach(function(e, t, i) {
        var o = a[e];
        "li_img" == e || "li_img2" == e ? edli__drawUI__upload(o, e, n) : "li_gallery" == e ? edli__drawUI__gallery(o, e, n) : "li_imgalt" == e || "li_img2alt" == e ? edli__drawUI__imgalt(o, e, n) : "li_select" == e || "li_select2" == e ? edli__drawUI__select(o, e, n) : "li_link" == e || "li_buttonlink" == e || "li_buttonlink2" == e ? edli__drawUI__link(o, e, n) : "li_linkprod" == e || "li_buttonlinkprod" == e || "li_buttonlinkprod2" == e ? edli__drawUI__linkprod(o, e, n) : "li_linktarget" == e || "li_buttonlinktarget" == e || "li_buttonlinktarget2" == e ? edli__drawUI__linktarget(o, e, n) : "li_string" == e || "li_string2" == e || "li_buttontitle" == e || "li_buttontitle2" == e || "li_price" == e || "li_price_old" == e || "li_mark" == e || "li_prod_option" == e || "li_prod_option2" == e || "li_prod_option3" == e || "li_geokeys" == e || "li_source" == e || "li_blocks" == e || "li_blocks2" == e || "li_soclinks" == e ? edli__drawUI__input(o, e, n) : "li_prod_variants" == e || "li_prod_variants2" == e || "li_prod_variants3" == e ? edli__drawUI__textarea(o, e, n) : "li_cb" == e || "li_cb2" == e ? edli__drawUI__checkbox(o, e, n) : "li_cut" == e ? (s = "yes", edli__drawUI__cut(o, e, n)) : edli__drawUI__text(o, e, n)
    }), "yes" == s && edli__cutonoff(n)
}

function edli__drawUI__input(e, i, o) {
    var t = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + o + "]");
    void 0 === e && (e = "");
    var a = i;
    "li_buttontitle" == a && (a = "RU" == lang ? "РќР°Р·РІР°РЅРёРµ РєРЅРѕРїРєРё" : "Button title"), "li_buttontitle2" == a && (a = "RU" == lang ? "РќР°Р·РІР°РЅРёРµ РІС‚РѕСЂРѕР№ РєРЅРѕРїРєРё" : "Second button title"), "li_price" == a && (a = "RU" == lang ? "РЎС‚РѕРёРјРѕСЃС‚СЊ СѓСЃР»СѓРіРё/С‚РѕРІР°СЂР°" : "Price of product or service"), "li_price_old" == a && (a = "RU" == lang ? "РЎС‚Р°СЂР°СЏ С†РµРЅР°" : "Old price"), "li_mark" == a && (a = "RU" == lang ? "РћС‚РјРµС‚РєР° РЅР° РєР°СЂС‚РѕС‡РєРµ (РЅР°РїСЂРёРјРµСЂ: sale, new, -30%)" : "Card mark (for example, sale, new, -50%)"), "li_prod_option" == a && (a = "RU" == lang ? "РќР°Р·РІР°РЅРёРµ РїР°СЂР°РјРµС‚СЂР°" : "Option name"), "li_prod_option2" == a && (a = "RU" == lang ? "РќР°Р·РІР°РЅРёРµ РІС‚РѕСЂРѕРіРѕ РїР°СЂР°РјРµС‚СЂР°" : "Second option name"), "li_prod_option3" == a && (a = "RU" == lang ? "РќР°Р·РІР°РЅРёРµ С‚СЂРµС‚СЊРµРіРѕ РїР°СЂР°РјРµС‚СЂР°" : "Third option name"), "li_soclinks" == a && (a = "RU" == lang ? "РЎСЃС‹Р»РєРё РЅР° РїСЂРѕС„РёР»Рё РІ СЃРѕС†.СЃРµС‚СЏС…" : "Links on social networks profile");
    var n = "";
    "li_price" == i && (n = "RU" == lang ? "Р—РЅР°Рє РІР°Р»СЋС‚С‹ РґРѕР±Р°РІР»СЏРµС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё. РР·РјРµРЅРёС‚СЊ РІР°Р»СЋС‚Сѓ РјРѕР¶РЅРѕ РІ РќР°СЃС‚СЂРѕР№РєР°С… СЃР°Р№С‚Р°." : "The currency sign is added automatically. You can change the currency in the Site Settings."), "li_geokeys" == i && (n = "<a href=\"javascript:edli_geokeys_open('" + i + "','" + o + "')\">" + ("RU" == lang ? "Р’С‹Р±СЂР°С‚СЊ РіРµРѕ СЂРµРіРёРѕРЅ" : "Select geo area</a>")), "li_soclinks" == i && (n = "RU" == lang ? "Р”РѕР±Р°РІСЊС‚Рµ СЃСЃС‹Р»РєРё РЅР° СЃРѕС†СЃРµС‚Рё С‡РµСЂРµР· Р·Р°РїСЏС‚СѓСЋ. РќР°РїСЂРёРјРµСЂ, <i>https://medium.com/@TildaPublishing, mailto:team@tilda.cc, tel:11234567890</i>" : "Add a comma-separated list of social networks links. For example, <i>https://twitter.com/tildapublishing, https://medium.com/@TildaPublishing</i>"), "object" == typeof window.lireplaces[i] && ("object" == typeof(l = window.lireplaces[i]).label && (a = "RU" == lang ? l.label[0] : l.label[1]), "object" == typeof l.hint && (n = "RU" == lang ? l.hint[0] : l.hint[1]));
    var l = "";
    l += '<div class="pe-form-group" data-lid="' + o + '" data-lfield="' + i + '">', l += '    <label class="pe-label">' + a + "</label>", l += '    <input type="text" name="' + i + '" class="pe-input" value="' + e + '" />', "li_blocks" != i && "li_blocks2" != i || (l += '\t<div class="pe-field-link-more" style="margin-top:5px;">', l += '\t<span class="pe-field-link-link-an" style="padding-right:15px; font-size:12px; cursor:context-menu;">' + ("RU" == lang ? "Р’С‹Р±СЂР°С‚СЊ Р±Р»РѕРєРё" : "Choose blocks") + "</span>", l += "\t</div>"), "" != n && (l += '    <div class="pe-hint">' + n + "</div>"), l += "</div>", t.append(l);
    var r = t.find("[name=" + i + "]");
    r.change(function() {
        var e, t = r.val();
        "li_blocks" != i && "li_blocks2" != i || "" != t && (e = t.replace(/[^0-9,]*/g, ""), t != e && ($(this).val(e), t = e)), edli__setFieldValue(t, i, o)
    }), "li_blocks" != i && "li_blocks2" != i || r.parent().find(".pe-field-link-link-an").click(function() {
        edlink__RecordsidsPiker__show($(this).parent().parent().find(".pe-input"))
    })
}

function edli__drawUI__text(e, t, i) {
    var o = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + i + "]");
    void 0 === e && (e = "");
    var a = t;
    "li_title" == a && (a = "RU" == lang ? "Р—Р°РіРѕР»РѕРІРѕРє" : "Title"), "li_descr" == a && (a = "RU" == lang ? "РћРїРёСЃР°РЅРёРµ" : "Description"), "li_subtitle" == a && (a = "RU" == lang ? "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє" : "Subtitle"), "li_text" == a && (a = "RU" == lang ? "РўРµРєСЃС‚" : "Text"), "li_date" == a && (a = "RU" == lang ? "Р”Р°С‚Р°" : "Date"), "li_time" == a && (a = "RU" == lang ? "Р’СЂРµРјСЏ" : "Time"), "li_persname" == a && (a = "RU" == lang ? "РРјСЏ РїРµСЂСЃРѕРЅС‹" : "Person name"), "li_persdescr" == a && (a = "RU" == lang ? "РРЅС„РѕСЂРј. Рѕ РїРµСЂСЃРѕРЅРµ" : "Person description");
    var n = "";
    "object" == typeof window.lireplaces[t] && ("object" == typeof(l = window.lireplaces[t]).label && (a = "RU" == lang ? l.label[0] : l.label[1]), "string" == typeof l.redactor_nohref && "yes" == l.redactor_nohref && setTimeout(function() {
        $(".pe-form-group[data-lid=" + i + "][data-lfield=" + t + "]").find(".re-link").css("display", "none")
    }, 1500), "string" == typeof l.redactor_notoolbar && "yes" == l.redactor_notoolbar && setTimeout(function() {
        $(".pe-form-group[data-lid=" + i + "][data-lfield=" + t + "]").find(".ql-toolbar").remove()
    }, 1500), "object" == typeof l.hint && (n = "RU" == lang ? l.hint[0] : l.hint[1]));
    var l = "";
    l += '<div class="pe-form-group" data-lid="' + i + '" data-lfield="' + t + '">', l += '    <label class="pe-label">' + a + "</label>", l += '    <div class="pe-redactor">', l += '    \t<textarea name="' + t + '" class="pe-textarea" rows="2">' + e + "</textarea>", l += "    </div>", "" != n && (l += '    <div class="pe-hint">' + n + "</div>"), l += "</div>", o.append(l);
    var r = o.find("[name=" + t + "]");
    r.change(function() {
        edli__setFieldValue(r.val(), t, i)
    }), addRedactor_to_textarea(r)
}

function edli__drawUI__textarea(e, t, i) {
    var o = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + i + "]");
    void 0 === e && (e = "");
    var a = t;
    "li_prod_variants" == a && (a = "RU" == lang ? "Р—РЅР°С‡РµРЅРёСЏ РїР°СЂР°РјРµС‚СЂР°" : "Option values"), "li_prod_variants2" == a && (a = "RU" == lang ? "Р—РЅР°С‡РµРЅРёСЏ РІС‚РѕСЂРѕРіРѕ РїР°СЂР°РјРµС‚СЂР°" : "Second option values"), "li_prod_variants3" == a && (a = "RU" == lang ? "Р—РЅР°С‡РµРЅРёСЏ С‚СЂРµС‚СЊРµРіРѕ РїР°СЂР°РјРµС‚СЂР°" : "Third option values");
    var n = "";
    "li_prod_variants" != t && "li_prod_variants2" != t && "li_prod_variants3" != t || (n = "RU" == lang ? "РџРµСЂРµС‡РёСЃР»РёС‚Рµ РІР°СЂРёР°РЅС‚С‹, РѕС‚РґРµР»СЏСЏ РёС… РїРµСЂРµРЅРѕСЃРѕРј СЃС‚СЂРѕРєРё" : "Set variants by dividing them with a new line");
    var l = "";
    "li_prod_variants" == t && (l = "RU" == lang ? "РџРµСЂРµС‡РёСЃР»РёС‚Рµ РІР°СЂРёР°РЅС‚С‹ С‚РѕРІР°СЂР°, РѕС‚РґРµР»СЏСЏ РёС… РїРµСЂРµРЅРѕСЃРѕРј СЃС‚СЂРѕРєРё. Р•СЃР»Рё РІР°СЂРёР°РЅС‚ РёРјРµРµС‚ СЃРІРѕСЋ С†РµРЅСѓ, РїРѕСЃС‚Р°РІСЊС‚Рµ Р·РЅР°Рє = Рё СѓРєР°Р¶РёС‚Рµ С†РµРЅСѓ (С‚РѕР»СЊРєРѕ С†РёС„СЂС‹, Р±РµР· Р·РЅР°РєР° РІР°Р»СЋС‚С‹). РќР°РїСЂРёРјРµСЂ: Р‘РѕР»СЊС€РѕР№ СЂР°Р·РјРµСЂ 1000 СЂСѓР±. = 1000" : "Put product options by dividing them with a new line. If variant has own price, add the sign = and write a price (only numbers, without currency). For example: Large size $10 = 10"), "object" != typeof window.lireplaces[t] || "object" == typeof(r = window.lireplaces[t]).label && (a = "RU" == lang ? r.label[0] : r.label[1]);
    var r = "";
    r += '<div class="pe-form-group" data-lid="' + i + '" data-lfield="' + t + '">', r += '    <label class="pe-label">' + a + "</label>", r += '    <div class="">', r += '    \t<textarea name="' + t + '" style="height:100px; box-sizing: border-box; margin-top:10px;" class="pe-textarea" rows="2" placeholder="' + n + '">' + e + "</textarea>", r += "    </div>", "" != l && (r += '    <div class="pe-hint">' + l + "</div>"), r += "</div>", o.append(r);
    var s = o.find("[name=" + t + "]");
    s.change(function() {
        edli__setFieldValue(s.val(), t, i)
    })
}

function edli__drawUI__select(e, t, i) {
    var o = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + i + "]");
    void 0 === e && (e = "");
    var a = t;
    "li_select" == a && (a = "RU" == lang ? "РћРїС†РёРё" : "Options"), "li_select2" == a && (a = "RU" == lang ? "РћРїС†РёРё 2" : "Options 2");
    var n, l = [
        ["", "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ", "by Default"],
        ["v2", "Р’Р°СЂРёР°РЅС‚ 2", "Option 2"],
        ["v3", "Р’Р°СЂРёР°РЅС‚ 3", "Option 3"]
    ];
    "object" == typeof window.lireplaces[t] && ("object" == typeof(n = window.lireplaces[t]).label && (a = "RU" == lang ? n.label[0] : n.label[1]), "object" == typeof n.options && (l = n.options));
    var r = "";
    r += '<div class="pe-form-group" data-lid="' + i + '" data-lfield="' + t + '">', r += '    <label class="pe-label">' + a + "</label>", r += '    <div class="pe-select">', r += '\t\t<select class="pe-input pe-select" name="' + t + '">';
    for (var s = 0; s < l.length; s++) r += '\t\t\t<option value="' + l[s][0] + '" ' + (e == l[s][0] ? "selected" : "") + ">" + ("RU" == lang ? l[s][1] : l[s][2]) + "</option>";
    r += "\t\t</select>", r += "    </div>", r += "</div>", o.append(r);
    var d = o.find("[name=" + t + "]");
    d.change(function() {
        edli__setFieldValue(d.val(), t, i)
    })
}

function edli__drawUI__link(e, i, o) {
    var t = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + o + "]");
    void 0 === e && (e = "");
    var a = i;
    "li_link" == a && (a = "RU" == lang ? "РЎСЃС‹Р»РєР°" : "Link"), "li_buttonlink" == a && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ РєРЅРѕРїРєРё" : "Button link"), "li_buttonlink2" == a && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ РІС‚РѕСЂРѕР№ РєРЅРѕРїРєРё" : "Second button link"), "object" != typeof window.lireplaces[i] || "object" == typeof(n = window.lireplaces[i]).label && (a = "RU" == lang ? n.label[0] : n.label[1]), e = e.replace(/"/g, "&quot;");
    var n = "";
    n += '<div class="pe-form-group" data-lid="' + o + '" data-lfield="' + i + '">', n += '  \t<label class="pe-label">' + a + "</label>", n += '\t<div class="form-url-group">', n += '    \t<input type="text" name="' + i + '" class="pe-input" value="' + e + '" style="width:100%;"/>', n += '\t\t<div class="pe-field-link-more" style="margin-top:-2px;">', n += '\t\t<span class="pe-field-link-link-pg" style="padding-right:15px; font-size:11px; cursor:context-menu;">' + ("RU" == lang ? "Р’С‹Р±СЂР°С‚СЊ СЃС‚СЂР°РЅРёС†Сѓ" : "Link to Page") + "</span>", n += '\t\t<span class="pe-field-link-link-an" style="padding-right:15px; font-size:11px; cursor:context-menu;">' + ("RU" == lang ? "Р’С‹Р±СЂР°С‚СЊ Р±Р»РѕРє" : "Link to Block") + "</span>", n += "\t\t</div>", n += "\t</div>", n += "</div>", t.append(n);
    var l = t.find("[name=" + i + "]");
    l.change(function() {
        var e, t = l.val();
        "" != t && (e = t.trim(), t != e && $(this).val(e)), checkLinkCCtoWS(t), edli__setFieldValue(t, i, o)
    });
    t = l.closest(".form-url-group");
    t.find(".pe-field-link-link-pg").click(function() {
        edlink__showPopUp__pageslist($(this).parent().parent().find(".pe-input"))
    }), t.find(".pe-field-link-link-an").click(function() {
        edlink__RecordPiker__show($(this).parent().parent().find(".pe-input"))
    }), t.find(".pe-field-link-cb-target").change(function() {})
}

function edli__drawUI__linkprod(e, t, i) {
    var o = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + i + "]");
    void 0 === e && (e = "");
    var a = t;
    "li_linkprod" == a && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° c РєР°СЂС‚РѕС‡РєРё С‚РѕРІР°СЂР°" : "Product Link"), "li_buttonlinkprod" == a && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ РєРЅРѕРїРєРё" : "Button Link"), "li_buttonlinkprod2" == a && (a = "RU" == lang ? "РЎСЃС‹Р»РєР° РґР»СЏ РІС‚РѕСЂРѕР№ РєРЅРѕРїРєРё" : "Second Button Link"), "object" != typeof window.lireplaces[t] || "object" == typeof(n = window.lireplaces[t]).label && (a = "RU" == lang ? n.label[0] : n.label[1]);
    var n = "";
    n += '<div class="pe-form-group" data-lid="' + i + '" data-lfield="' + t + '">', n += '  \t<label class="pe-label">' + a + "</label>", n += '    <div class="pe-select">', n += '\t\t<select class="pe-input pe-select" name="' + t + '">', n += '\t\t\t<option value="" ' + ("" == e ? "selected" : "") + ">" + ("RU" == lang ? "РЎСЃС‹Р»РєР° РЅР° СЃС‚СЂР°РЅРёС†Сѓ" : "Link on page") + "</option>", n += '\t\t\t<option value="popup" ' + ("popup" == e ? "selected" : "") + ">" + ("RU" == lang ? "РџРѕРґСЂРѕР±РЅРµРµ Рѕ С‚РѕРІР°СЂРµ" : "View full product info") + "</option>", n += '\t\t\t<option value="order" ' + ("order" == e ? "selected" : "") + ">" + ("RU" == lang ? "Р”РѕР±Р°РІРёС‚СЊ РІ РєРѕСЂР·РёРЅСѓ" : "Add to Cart") + "</option>", n += "\t\t</select>", n += "    </div>", n += "</div>";
    var l = t.replace("prod", ""),
        a = o.find("[data-lfield=" + l + "]");
    a.before(n), a.find(".pe-label").remove();
    var r = o.find("[name=" + l + "]"),
        s = a.find(".form-url-group");
    s.css("margin-top", "-20px"), "popup" != e && "order" != e || s.css("display", "none");
    var d = o.find("[name=" + t + "]");
    d.change(function() {
        var e = d.val();
        edli__setFieldValue(e, t, i), "popup" == e || "order" == e ? s.css("display", "none") : s.css("display", "block"), "" == e && (r.val(""), edli__setFieldValue("", l, i)), "popup" == e && (r.val("#prodpopup"), edli__setFieldValue("#prodpopup", l, i)), "order" == e && (r.val("#order"), edli__setFieldValue("#order", l, i))
    })
}

function edli__drawUI__linktarget(e, t, i) {
    var o = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + i + "]");
    void 0 === e && (e = "");
    var a = "";
    a += '<div class="pe-target-div" data-lid="' + i + '" data-lfield="' + t + '" style="display:inline-block;">', a += '\t<label class="pe-label-checkbox pe-label-target" style="padding-right:15px; font-size:11px;">', a += '\t  \t<input type="hidden" name="' + t + '" value="' + e + '" class="pe-input-target pe-cb-target-' + t + '"/>', a += '      \t<input type="checkbox" style="width:auto;" class="pe-cb-target pe-cb-target-' + t + '" ' + ("_blank" == e ? 'checked="checked"' : "") + '> <span class="pe-checkbox-title">' + ("RU" == lang ? "Р’ РЅРѕРІРѕРј РѕРєРЅРµ" : "New window") + "</span>", a += "\t</label>", a += "</div>";
    var e = t.replace("target", ""),
        n = o.find("[data-lfield=" + e + "]").find(".form-url-group");
    n.find(".pe-field-link-more").prepend(a);
    var l = o.find("[name=" + t + "]");
    l.change(function() {
        edli__setFieldValue(l.val(), t, i)
    }), n.find(".pe-cb-target-" + t).change(function() {
        var e = (e = $(this).is(":checked")) ? "_blank" : "";
        n.find(".pe-cb-target-" + t).val(e)
    })
}

function edli__drawUI__linktarget_old(e, t, i) {
    var o = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + i + "]");
    void 0 === e && (e = "");
    var a = "";
    a += '<div class="pe-select-div" data-lid="' + i + '" data-lfield="' + t + '">', a += '    <div class="pe-select">', a += '\t\t<select class="pe-input pe-select" name="' + t + '">', a += '\t\t\t<option value="" ' + ("" == e ? "selected" : "") + ">" + ("RU" == window.lang ? "Р’ СЌС‚РѕРј Р¶Рµ РѕРєРЅРµ" : "Same window") + "</option>", a += '\t\t\t<option value="_blank" ' + ("_blank" == e ? "selected" : "") + ">" + ("RU" == window.lang ? "Р’ РЅРѕРІРѕРј РѕРєРЅРµ" : "New window") + "</option>", a += "\t\t</select>", a += "    </div>", a += "</div>";
    e = t.replace("target", "");
    o.find("[data-lfield=" + e + "]").find(".form-url-group").append(a);
    var n = o.find("[name=" + t + "]");
    n.change(function() {
        edli__setFieldValue(n.val(), t, i)
    })
}

function edli__drawUI__upload(e, i, o) {
    var t = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + o + "]"),
        a = t.closest("form"),
        n = 0 < a.length ? a.data("rec-id") : "";
    void 0 === e && (e = "");
    var l = i;
    "li_img" == l && (l = "RU" == window.lang ? "РР·РѕР±СЂР°Р¶РµРЅРёРµ" : "Image"), "li_img2" == l && (l = "RU" == window.lang ? "РР·РѕР±СЂР°Р¶РµРЅРёРµ 2" : "Image 2");
    var r = "",
        a = "";
    "object" == typeof window.lireplaces[i] && ("object" == typeof(s = window.lireplaces[i]).label && (l = "RU" == window.lang ? s.label[0] : s.label[1]), "string" == typeof s["tu-max-width"] && (r = 'data-tu-max-width="' + s["tu-max-width"] + '"'), "string" == typeof s["tu-max-height"] && (a = 'data-tu-max-height="' + s["tu-max-height"] + '"'));
    var s = "";
    s += '<div class="pe-form-group" data-lid="' + o + '" data-lfield="' + i + '">', s += '    <label class="pe-label">' + l + "</label>", s += "\t<br>", s += '    <div class="js-image-box">', s += '    \t<input name="' + i + '" value="' + e + '" style="display:none;" class="js-img-cdnurl"/>', s += '\t    <table style="width:100%;">', s += "\t\t<tr>", s += '\t\t\t<td style="width:240px; vertical-align:top;">', s += '\t\t\t<div style="width:100%;">', s += '\t\t\t<input type="text" name="li-tubutton" class="js-img-button" value="" data-tu-is-image="yes" ' + r + " " + a + ' id="tuwidget' + o + "_" + i + '" /><br>', s += "\t\t\t</div>", s += "\t\t\t</td>", s += '\t\t\t<td class="pe-imagesearch-td-wrapper">', s += '\t\t\t\t<div class="pe-imagesearch-btn">', s += '\t\t\t\t\t<img src="https://tilda.ws/img/linea/basic_magnifier.svg" style="padding:10px" width="20px">', s += '\t\t\t\t\t<span style="vertical-align: middle">' + ("RU" == window.lang ? "РСЃРєР°С‚СЊ РІ Р±РёР±Р»РёРѕС‚РµРєРµ" : "Search photos") + "</span>", s += "\t\t\t\t</div>", s += "\t\t\t</td>", s += "\t\t</tr>", s += "\t    </table>", s += '\t\t<div class="js-img-div"></div>', s += "\t</div>", s += "</div>", t.append(s), "" != e && edli__drawUI__upload__imgdiv(e, i, o);
    var e = t.find("[data-lfield=" + i + "]"),
        d = e.find("[name=" + i + "]");
    d.change(function() {
        edli__setFieldValue(d.val(), i, o)
    }), t.find(".pe-imagesearch-btn").click(function() {
        var e = $("#tuwidget" + o + "_" + i).data("tildaupload");
        openImageSearchPopup(e, "lst" + o + "_" + i + "id", n)
    }), e.find(".js-img-button").each(function() {
        var e = $(this),
            t = e.attr("id");
        t || (t = "tuwidget" + parseInt(Math.floor(Math.random() * (9e5 + 1)) + 99999), e.attr("id", t)), TUWidget.init(e).done(function(e) {
            void 0 !== e.tuInfo.cdnUrl && "" != e.tuInfo.cdnUrl && (d.val(e.tuInfo.cdnUrl), d.trigger("change"), edli__drawUI__upload__imgdiv(e.tuInfo.cdnUrl, i, o)), setTimeout(function() {
                $("#" + t + "-previews").removeClass("tu-popup-progressbar-completed").removeClass("tu-processing").removeClass("tu-image-preview").removeClass("tu-success").removeClass("tu-complete").addClass("tu-popup-progressbar-start")
            }, 3e3)
        }).fail(function(e, t) {})
    })
}

function edli__drawUI__upload__imgdiv(e, t, i) {
    var o = $('.editlist__wrapper[data-ui-type="edli"]'),
        a = o.find("[data-listitem-id=" + i + "]").find("[data-lfield=" + t + "]").find(".js-img-div"),
        n = (n = e).substr(n.length - 30),
        l = o.attr("data-lfields");
    void 0 === l && (l = "");
    o = "";
    o += "<br>", o += '<table class="pe-imagebox__table">', o += '\t<tr class="pe-imagebox__tr">', o += '\t\t<td class="pe-imagebox__td pe-imagebox__td-thumb">', o += '\t\t\t<img src="' + e + '" width="135" class="pe-imagebox__img js-img-thumb" id="lst' + i + "_" + t + 'id" />', o += "\t\t</td>", o += '\t\t<td class="pe-imagebox__td pe-imagebox__td-name" style="padding-left:20px; padding-right:20px; width:500px; font-size:12px; color:#333;"><a href="' + e + '" target="_blank" class="js-img-title" data-li-img-href="">... ' + n + "</a></td>", 0 < l.indexOf(t + "alt") && (o += '\t<td class="pe-imagebox__td" style="white-space: nowrap;"><a href="javascript:edli__drawUI__upload__showmore(\'' + t + "','" + i + "');\">...</a>&nbsp;&nbsp;&nbsp;&nbsp;</td>"), "" != n && -1 === n.indexOf(".svg") && (o += '\t<td class="pe-imagebox__td" style="white-space: nowrap; padding-right: 10px;"><a href="javascript:tui_editimage(\'' + i + "','lst" + i + "_" + t + 'id\');" class="js-edit-img"><span class="glyphicon glyphicon-pencil"></span></a></td>'), o += '\t\t<td class="pe-imagebox__td"><a href="javascript:edli__drawUI__upload__del(\'' + t + "','" + i + '\');"><span class="glyphicon glyphicon-trash"></span></a></td>', o += "\t</tr>", o += "</table>", a.html(o)
}

function edli__drawUI__upload__showmore(e, t) {
    e = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + t + "]").find(".pe-form-group__" + e + "alt");
    "none" == e.css("display") ? e.css("display", "block") : e.css("display", "none")
}

function edli__drawUI__imgalt(e, t, i) {
    var o = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + i + "]");
    void 0 === e && (e = "");
    var a = t;
    "li_imgalt" != a && "li_img2alt" != a || (a = "RU" == lang ? "SEO: РђР»СЊС‚-С‚РµРєСЃС‚ РґР»СЏ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ" : "SEO: Image alt text");
    var n = "";
    n += '<div class="pe-form-group pe-form-group__' + t + '" data-lid="' + i + '" data-lfield="' + t + '" style="display:none;">', n += '    <label class="pe-label">' + a + "</label>", n += '    <input type="text" name="' + t + '" class="pe-input" value="' + e + '" />', n += "</div>", o.append(n);
    var l = o.find("[name=" + t + "]");
    l.change(function() {
        edli__setFieldValue(l.val(), t, i)
    })
}

function edli__drawUI__upload__del(e, t) {
    var i = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + t + "]").find("[data-lfield=" + e + "]"),
        t = i.find(".js-img-div"),
        e = i.find("[name=" + e + "]");
    t.html(""), e.val(""), e.trigger("change")
}

function edli__drawUI__upload__tui_editimg(e, t) {
    $(document).ready(function() {
        $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + t + "]").find("[data-lfield=" + e + "]").find(".js-img-thumb").attr("src");
        tui_editimage(t, "lst" + t + "_" + e + "id", function(e, t) {
            var i, o;
            t && (i = t.cdnUrl, 0 < (o = $("#" + e).closest(".js-image-box")).length && (o.find(".js-img-cdnurl").val(i), o.find(".js-img-uuid").val(""), o.find(".js-img-name").val(""), o.find(".js-img-size").val(""), o.find(".js-img-width").val(""), o.find(".js-img-height").val(""), e = i.substring(i.length - 30), o.find(".js-img-title").attr("href", i).html("..." + e), 0 < t.width && o.find("js-img-width").val(t.width)))
        })
    })
}

function edli__drawUI__upload__aviary_editimg(t, i) {
    $(document).ready(function() {
        aviaryOnReady(function() {
            var e = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + i + "]").find("[data-lfield=" + t + "]").find(".js-img-thumb").attr("src"),
                o = "lst" + i + "_" + t + "id";
            window.featherEditor.launch({
                image: o,
                url: e,
                onLoad: function() {
                    alert("loadd")
                },
                onSave: function(e, t) {
                    document.getElementById(e).src = t;
                    var i = $("#" + o).closest(".js-image-box");
                    i.find(".js-img-cdnurl").val(t), i.find(".js-img-uuid").val(""), i.find(".js-img-name").val(""), i.find(".js-img-size").val(""), i.find(".js-img-width").val(""), i.find(".js-img-height").val("");
                    e = t.substring(t.length - 30);
                    i.find(".js-img-title").attr("href", t).html("..." + e);
                    e = window.featherEditor.getImageDimensions();
                    return e && e.width && i.find("js-img-width").val(e.width), window.featherEditor.close()
                }
            })
        })
    })
}

function edli__drawUI__checkbox(e, t, i) {
    var o = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + i + "]");
    void 0 === e && (e = "");
    var a = "",
        n = "";
    "li_cb" == t && (lang, n = "Checkbox"), "li_cb2" == t && (lang, n = "Checkbox 2");
    var l = "";
    "object" == typeof window.lireplaces[t] && ("object" == typeof(r = window.lireplaces[t]).label && (a = "RU" == lang ? r.label[0] : r.label[1]), "object" == typeof r.labelcb && (n = "RU" == lang ? r.labelcb[0] : r.labelcb[1]), "object" == typeof r.hint && (l = "RU" == lang ? r.hint[0] : r.hint[1]));
    var r = "";
    r += '<div class="pe-form-group" data-lid="' + i + '" data-lfield="' + t + '">', "" != a && (r += '<label class="pe-label">' + a + "</label>"), r += '<input class="pe-input" type="hidden" name="' + t + '" value="' + e + '" style="display:none;" />', r += '<div class="pe-checkbox-box">', r += '<label class="pe-label-checkbox">', r += '<input type="checkbox" name="' + t + '-cb" ' + ("on" == e ? 'checked="checked"' : "") + '> <span class="pe-checkbox-title pe-labelcb">' + n + "</span>", r += "</label>", r += "</div>", "" != l && (r += '    <div class="pe-hint">' + l + "</div>"), r += "</div>", o.append(r);
    var s = o.find("[name=" + t + "]"),
        d = o.find("[name=" + t + "-cb]");
    d.change(function() {
        var e = "";
        1 == d.prop("checked") && (e = "on"), s.val(e), edli__setFieldValue(e, t, i)
    })
}

function edli__drawUI__cut(e, t, i) {
    var o = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + i + "]");
    void 0 === e && (e = "");
    var a = t,
        a = "RU" == lang ? "Р•С‰Рµ..." : "More...",
        n = "";
    "object" != typeof window.lireplaces[t] || "object" == typeof(e = window.lireplaces[t]).label && (a = "RU" == lang ? e.label[0] : e.label[1]), n += '<div class="pe-form-group" data-list-cut="yes" data-lid="' + i + '" data-lfield="' + t + '">', n += '    <span class="editlist__btncut" style="cursor:pointer;color:#ff855D;" data-label="' + a + '">' + a + "</a>", n += "</div>", o.append(n);
    var l = o.find(".editlist__btncut");
    l.click(function() {
        "РЎРІРµСЂРЅСѓС‚СЊ" == l.html() || "Hide" == l.html() ? l.html(l.attr("data-label")) : l.html("RU" == lang ? "РЎРІРµСЂРЅСѓС‚СЊ" : "Hide"), edli__cutonoff(i)
    })
}

function edli__cutonoff(e) {
    var e = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + e + "]"),
        t = "";
    e.find(".pe-form-group").each(function() {
        var e = $(this);
        "y" == t && ("none" == e.css("display") ? e.css("display", "block") : e.css("display", "none")), "yes" == e.attr("data-list-cut") && (t = "y")
    })
}

function edli__drawUI__cutclose(e, t, i) {
    void 0 === e && (e = "");
    $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + i + "]").append("</div>")
}

function edli__setFieldValue(e, t, i) {
    3e3 < e.length ? alert("RU" == window.lang ? "РџСЂРµРґСѓРїСЂРµР¶РґРµРЅРёРµ: РІ РїРѕР»Рµ СЃР»РёС€РєРѕРј РјРЅРѕРіРѕ С‚РµРєСЃС‚Р°. РњС‹ СЂРµРєРѕРјРµРЅРґСѓРµРј РµРіРѕ СЃРѕРєСЂР°С‚РёС‚СЊ." : "Note: Too much data in this input field. We strongly recommend reducing the amount of information.") : edli__allitems__getData__inJson()
}

function edli__allitems__getData__inJson() {
    var e, t, i, o = $('.editlist__wrapper[data-ui-type="edli"]');
    "inited" == o.attr("data-init-status") ? (e = o.attr("data-lfields").split(","), t = {}, i = 0, $(".pe-list-item").each(function() {
        var o = $(this),
            a = {};
        a.lid = o.attr("data-listitem-id"), a.ls = o.attr("data-listitem-sort"), a.loff = o.attr("data-listitem-off"), "y" == a.loff ? a.loff = "y" : a.loff = "";
        var n = "";
        e.forEach(function(e, t, i) {
            "lid" != e && "ls" != e && "loff" != e && ("<br>" == (n = o.find("[name=" + e + "]").val()) && (n = ""), a[e] = n)
        }), t[i] = a, i++
    }), 45e3 < (o = JSON.stringify(t)).length ? alert("RU" == window.lang ? "РћС€РёР±РєР°: РІ РїРѕР»Рµ СЃР»РёС€РєРѕРј РјРЅРѕРіРѕ С‚РµРєСЃС‚Р°. РР·РјРµРЅРµРЅРёСЏ РЅРµ Р±СѓРґСѓС‚ СЃРѕС…СЂР°РЅРµРЅС‹. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, СѓРґР°Р»РёС‚Рµ С‡Р°СЃС‚СЊ РёРЅС„РѕСЂРјР°С†РёРё." : "Error: Too much data in this input field. Changes will not be saved. Please delete some of the information.") : $('.editlist__data[name="list"]').val(o)) : console.log("Error getdatainjson: Initing listeditor not finished")
}

function edli__add() {
    var e = {},
        t = Math.floor(1e3 * Math.random()) + 10,
        i = Date.now() - t;
    e.lid = i;
    t = edli__getMaxSort();
    e.ls = t + 10, edli__drawItem(e), edli__allitems__Resort(), edli__allitems__getData__inJson();
    t = $('.editlist__wrapper[data-ui-type="edli"]'), e = $("#editformsxl").find(".pe-form-group[data-tpl-field=list]"), i = t.find(".pe-list-item[data-listitem-id=" + i + "]").position().top + e.position().top;
    0 < e.parents(".pe-form-group[data-tpl-group]").length && (i += e.parents(".pe-form-group[data-tpl-group]").position().top), 0 < e.parents(".pe-form-group-wrapper").length ? $("#editformsxl").animate({
        scrollTop: $("#editformsxl").position().top + i
    }, 700) : $("#editformsxl").animate({
        scrollTop: $("#editformsxl").scrollTop() + i - 100
    }, 700)
}

function edli__del(e) {
    var t = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + e + "]");
    t.slideUp("fast", function() {
        t.remove(), edli__allitems__Resort(), edli__allitems__getData__inJson()
    })
}

function edli__off(e) {
    e = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + e + "]");
    "y" == e.attr("data-listitem-off") ? (e.attr("data-listitem-off", ""), e.css("opacity", ""), e.find(".pe-list-item-btn-offon").find("a").html("RU" == lang ? "Р’С‹РєР»СЋС‡РёС‚СЊ" : "Off")) : (e.attr("data-listitem-off", "y"), e.css("opacity", "0.5"), e.find(".pe-list-item-btn-offon").find("a").html("RU" == lang ? "Р’РєР»СЋС‡РёС‚СЊ" : "On")), edli__allitems__getData__inJson()
}

function edli__down(i) {
    var o = $('.editlist__wrapper[data-ui-type="edli"]'),
        e = o.find("[data-listitem-id=" + i + "]"),
        t = e.next(".pe-list-item");
    0 != t.length && (e = e.detach(), t.after(e), edli__allitems__Resort(), edli__allitems__getData__inJson(), setTimeout(function() {
        var e = $("#editformsxl").find(".pe-form-group[data-tpl-field=list]"),
            t = o.find(".pe-list-item[data-listitem-id=" + i + "]").position().top + e.position().top;
        0 < e.parents(".pe-form-group[data-tpl-group]").length && (t += e.parents(".pe-form-group[data-tpl-group]").position().top), $("#editformsxl").stop(!0), 0 < e.parents(".pe-form-group-wrapper").length ? $("#editformsxl").animate({
            scrollTop: $("#editformsxl").position().top + t
        }, 700) : $("#editformsxl").animate({
            scrollTop: $("#editformsxl").scrollTop() + t - 100
        }, 700)
    }, 100))
}

function edli__up(i) {
    var o = $('.editlist__wrapper[data-ui-type="edli"]'),
        e = o.find("[data-listitem-id=" + i + "]"),
        t = e.prev(".pe-list-item");
    0 != t.length && (e = e.detach(), t.before(e), edli__allitems__Resort(), edli__allitems__getData__inJson(), setTimeout(function() {
        var e = $("#editformsxl").find(".pe-form-group[data-tpl-field=list]"),
            t = o.find(".pe-list-item[data-listitem-id=" + i + "]").position().top + e.position().top;
        0 < e.parents(".pe-form-group[data-tpl-group]").length && (t += e.parents(".pe-form-group[data-tpl-group]").position().top), $("#editformsxl").stop(!0), 0 < e.parents(".pe-form-group-wrapper").length ? $("#editformsxl").animate({
            scrollTop: $("#editformsxl").position().top + t
        }, 700) : $("#editformsxl").animate({
            scrollTop: $("#editformsxl").scrollTop() + t - 100
        }, 700)
    }, 100))
}

function edli__dupl(e) {
    var i = $('.editlist__wrapper[data-ui-type="edli"]'),
        a = i.find("[data-listitem-id=" + e + "]"),
        t = i.attr("data-lfields").split(","),
        n = {},
        o = Math.floor(1e3 * Math.random()) + 10,
        l = Date.now() - o;
    n.lid = l, t.forEach(function(e, t, i) {
        var o;
        "lid" != e && "ls" != e && ("q" !== window.ver_redactor || void 0 === (o = a.find("[name=" + e + "] .ql-editor").html()) ? o = a.find("[name=" + e + "]").val() : "<br />" === (o = (o = o.replace(/<br>/gi, "")).replace(/<p>([\w\W]*?)<\/p>/gi, "$1<br />")).slice(-6) && "<br /><br />" !== o.slice(-12) && (o = o.substring(0, o.length - 6)), n[e] = o)
    });
    t = +parseInt(a.attr("data-listitem-sort"));
    n.ls = 5 + t, edli__drawItem(n, e), edli__allitems__Resort(), edli__allitems__getData__inJson(), setTimeout(function() {
        var e = $("#editformsxl").find(".pe-form-group[data-tpl-field=list]"),
            t = i.find(".pe-list-item[data-listitem-id=" + l + "]").position().top + e.position().top;
        0 < e.parents(".pe-form-group[data-tpl-group]").length && (t += e.parents(".pe-form-group[data-tpl-group]").position().top), $("#editformsxl").stop(!0), 0 < e.parents(".pe-form-group-wrapper").length ? $("#editformsxl").animate({
            scrollTop: $("#editformsxl").position().top + t
        }, 700) : $("#editformsxl").animate({
            scrollTop: $("#editformsxl").scrollTop() + t - 100
        }, 700)
    }, 100)
}

function edli__getMaxSort() {
    var e, t = $('.editlist__wrapper[data-ui-type="edli"]'),
        i = 0;
    return t.find(".pe-list-item").each(function() {
        e = parseInt($(this).attr("data-listitem-sort")), i < e && (i = e)
    }), i
}

function edli__allitems__Resort() {
    var t, e = $('.editlist__wrapper[data-ui-type="edli"]'),
        i = 0;
    e.find(".pe-list-item").each(function() {
        var e = $(this);
        t = 10 * ++i, e.attr("data-listitem-sort", t), e.find(".pe-list-item-i").html(i)
    })
}

function edli__drawUI__gallery(e, n, l) {
    var t = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + l + "]");
    void 0 === e && (e = "");
    var o = n;
    "li_gallery" == o && (o = "RU" == window.lang ? "РЎРїРёСЃРѕРє РёР·РѕР±СЂР°Р¶РµРЅРёР№" : "Images list");
    var a = "";
    if (a += '<div class="pe-form-group" data-lid="' + l + '" data-lfield="' + n + '">', a += '    <label class="pe-label">' + o + "</label>", a += "\t<br>", a += '    <div class="js-gallery-upload-widget">', a += '    \t<textarea name="' + n + '" class="js-gallery-json" style="display:none;" rows="1">' + e + "</textarea>", a += '\t    <table style="width:100%;">', a += "\t\t<tr>", a += '\t\t<td style="width:240px; vertical-align:top;">', a += '\t\t<div style="width:100%;">', a += '\t\t<input type="text" name="li-tubutton" class="js-imgs-button" value="" data-tu-is-image="yes" data-tu-multiple="yes"   id="tuwidget' + l + "_" + n + '" /><br>', a += "\t\t</div>", a += "\t\t</td>", a += '\t\t<td style="vertical-align:top; text-align:right;">', a += "\t\t</td>", a += "\t\t</tr>", a += "\t    </table>", a += '\t\t<div class="js-gallery-items"></div>', a += "\t</div>", a += "</div>", t.append(a), "" != e) try {
        var r = $.parseJSON(e);
        "object" == typeof r && $.each(r, function(e, t) {
            void 0 !== t.img && "" != t.img && edli__drawUI__gallery__drawitem(t.img, t.alt, n, l)
        })
    } catch (e) {}
    t.find("[data-lfield=" + n + "]").find(".js-imgs-button").each(function() {
        var e = $(this),
            a = e.attr("id");
        a || (a = "tuwidget" + parseInt(Math.floor(Math.random() * (9e5 + 1)) + 99999), e.attr("id", a)), TUWidget.init(e).done(function(e) {
            if (this.options.uploadMultiple) {
                for (i in e) {
                    var t = e[i].tuInfo.cdnUrl,
                        o = e[i].tuInfo.uuid;
                    void 0 !== t ? edli__drawUI__gallery__drawitem(t, "", n, l, o) : console.log("hmm, src is undefined")
                }
                edli__drawUI__gallery__updatejsonvalue(n, l)
            } else console.log("HMMM..!!");
            setTimeout(function() {
                $("#" + a + "-previews").removeClass("tu-popup-progressbar-completed").removeClass("tu-processing").removeClass("tu-image-preview").removeClass("tu-success").removeClass("tu-complete").addClass("tu-popup-progressbar-start")
            }, 500)
        }).fail(function(e, t) {})
    }), edli__drawUI__gallery__sortable(n, l)
}

function edli__drawUI__gallery__drawitem(e, t, i, o, a, n) {
    var l = $('.editlist__wrapper[data-ui-type="edli"]'),
        r = l.find("[data-listitem-id=" + o + "]").find("[data-lfield=" + i + "]").find(".js-gallery-items"),
        s = (s = e).substr(s.length - 30);
    void 0 !== a && "" != a || (a = Math.floor(1e7 * Math.random()) + 1e3), void 0 === t && (t = "");
    l.attr("data-lfields").indexOf(i + "alt");
    l = "";
    l += '<div class="js-gallery-item" data-uuid="' + a + '" data-src="' + e + '" data-alt="' + t + '" style="margin:10px 0;">', l += '<table class="pe-imagebox__table" style="font-size:12px;">', l += '<tr class="pe-imagebox__tr">', l += '<td class="pe-imagebox__td">', l += '<img src="' + e + '" width="80" class="pe-imagebox__galimg js-img-thumb" id="lst' + o + "_" + i + "id_uuid" + a + '" />', l += "</td>", l += '<td class="pe-imagebox__td-name" style="padding-left:20px; padding-right:20px; width:500px; font-size:12px; color:#333;"><a href="' + e + '" target="_blank" class="js-img-title" data-li-img-href="">... ' + s + "</a></td>", l += '<td class="pe-imagebox__td"><div class="js-img-updatebtn"><a href="javascript:edli__drawUI__gallery__update(\'' + i + "','" + o + "','" + a + "');\">" + ("RU" == lang ? "Р—Р°РјРµРЅРёС‚СЊ&nbsp;С„РѕС‚Рѕ" : "Replace&nbsp;image") + "</a></div></td>", l += '<td class="pe-imagebox__td" style="padding-left:20px; white-space: nowrap;"><a href="javascript:edli__drawUI__gallery__showmore(\'' + i + "','" + o + "','" + a + "');\">...</a></td>", l += '<td class="pe-imagebox__td" style="padding-left:10px;"><a href="javascript:edli__drawUI__gallery__tui_editimg(\'' + i + "','" + o + "','" + a + '\');" class="js-edit-img"><span class="glyphicon glyphicon-pencil"></span></a></td>', l += '<td class="pe-imagebox__td" style="padding-left:10px; width:20px;"><a href="javascript:edli__drawUI__gallery__del(\'' + i + "','" + o + "','" + a + '\');"><span class="glyphicon glyphicon-trash"></span></a></td>', l += "</tr>", l += "</table>", l += '<div class="js-gallery-item-showmore-div" style="display:none; margin:30px 0;">', l += '    <label class="pe-label">' + ("RU" == lang ? "SEO: РђР»СЊС‚-С‚РµРєСЃС‚ РґР»СЏ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ" : "SEO: Image alt text") + "</label>", l += '    <input type="text" class="pe-input" value="' + t + '" />', l += "</div>", l += "</div>", "object" == typeof n ? n.replaceWith(l) : r.append(l);
    var d = r.find("[data-uuid=" + a + "]");
    d.find(".js-img-updatebtn").each(function() {
        var e = $(this),
            t = e.attr("id");
        t || (t = "tuwidget" + parseInt(Math.floor(Math.random() * (9e5 + 1)) + 99999), e.attr("id", t)), TUWidget.init(e).done(function(e) {
            void 0 !== e.tuInfo.cdnUrl ? (edli__drawUI__gallery__drawitem(e.tuInfo.cdnUrl, "", i, o, "", d), edli__drawUI__gallery__updatejsonvalue(i, o)) : console.log("hm, file.tuInfo.cdnUrl is undefined")
        }).fail(function(e, t) {})
    });
    var p = d.find(".js-gallery-item-showmore-div").find(".pe-input");
    p.change(function() {
        void 0 === (e = p.val()) && (e = "");
        var t = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;"
            },
            e = e.replace(/[<>"]/g, function(e) {
                return t[e]
            });
        d.attr("data-alt", e), edli__drawUI__gallery__updatejsonvalue(i, o)
    })
}

function edli__drawUI__gallery__updatejsonvalue(e, t) {
    var i, o, a = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + t + "]").find("[data-lfield=" + e + "]"),
        n = [],
        l = {};
    a.find(".js-gallery-items").find(".js-gallery-item").each(function() {
        o = $(this), i = o.attr("data-src"), o = o.attr("data-alt"), (l = {}).img = i, void 0 !== o && "" != o && (l.alt = o), n.push(l)
    });
    t = JSON.stringify(n), e = a.find("[name=" + e + "]");
    e.val(t), e.trigger("change")
}

function edli__drawUI__gallery__del(e, t, i) {
    $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + t + "]").find("[data-lfield=" + e + "]").find(".js-gallery-items").find("[data-uuid=" + i + "]").remove(""), edli__drawUI__gallery__updatejsonvalue(e, t)
}

function edli__drawUI__gallery__sortable(i, o) {
    $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + o + "]").find("[data-lfield=" + i + "]").find(".js-gallery-items").sortable({
        helper: "clone",
        opacity: .8,
        revert: !0,
        tolerance: "pointer",
        axis: "y",
        update: function(e, t) {
            edli__drawUI__gallery__updatejsonvalue(i, o)
        }
    })
}

function edli__drawUI__gallery__tui_editimg(e, t, i) {
    $(document).ready(function() {
        $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + t + "]").find("[data-lfield=" + e + "]").find('.js-gallery-item[data-uuid="' + i + '"]').find(".js-img-thumb").attr("src");
        var a = "lst" + t + "_" + e + "id_uuid" + i;
        tui_editimage(t, a, function(e, t) {
            var i, o;
            t && (i = t.cdnUrl, 0 < (t = $("#" + e).closest(".js-image-box")).length ? ((t = $("#" + a).closest(".js-gallery-item")).attr("data-src", i), o = i.substring(i.length - 30), t.find(".js-img-title").attr("href", i).html("..." + o), t.find(".js-img-updatebtn").find("a").trigger("click"), setTimeout(function() {
                $(".tu-popup").css("display", "none")
            }, 100), setTimeout(function() {
                $(".tu-popup").find(".tu-uploadurl-input").val(i)
            }, 200), setTimeout(function() {
                $(".tu-popup").find(".tu-uploadurl-btn").trigger("click")
            }, 500)) : 0 < (t = $("#" + e).closest(".js-gallery-item")).length && (t.attr("data-src", i), o = i.substring(i.length - 30), t.find(".js-img-title").attr("href"), t.find(".js-img-title").attr("href", i).html("..." + o), o = t.closest(".pe-form-group").data("lid"), edli__drawUI__gallery__updatejsonvalue(t.closest(".pe-form-group").data("lfield"), o)))
        })
    })
}

function edli__drawUI__gallery__aviary_editimg(t, i, a) {
    $(document).ready(function() {
        aviaryOnReady(function() {
            var e = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + i + "]").find("[data-lfield=" + t + "]").find('.js-gallery-item[data-uuid="' + a + '"]').find(".js-img-thumb").attr("src"),
                o = "lst" + i + "_" + t + "id_uuid" + a;
            window.featherEditor.launch({
                image: o,
                url: e,
                onLoad: function() {
                    alert("loadd")
                },
                onSave: function(e, t) {
                    document.getElementById(e).src = t;
                    var i = $("#" + o).closest(".js-gallery-item");
                    i.attr("data-src", t);
                    e = t.substring(t.length - 30);
                    return i.find(".js-img-title").attr("href", t).html("..." + e), i.find(".js-img-updatebtn").find("a").trigger("click"), setTimeout(function() {
                        $(".tu-popup").css("display", "none")
                    }, 100), setTimeout(function() {
                        $(".tu-popup").find(".tu-uploadurl-input").val(t)
                    }, 200), setTimeout(function() {
                        $(".tu-popup").find(".tu-uploadurl-btn").trigger("click")
                    }, 500), window.featherEditor.close()
                }
            })
        })
    })
}

function edli__drawUI__gallery__showmore(e, t, i) {
    i = $('.editlist__wrapper[data-ui-type="edli"]').find("[data-listitem-id=" + t + "]").find("[data-lfield=" + e + "]").find('.js-gallery-item[data-uuid="' + i + '"]').find(".js-gallery-item-showmore-div");
    "none" == i.css("display") ? i.css("display", "block") : i.css("display", "none")
}

function edli_geokeys_open(e, t) {
    var i = $(".pe-form-group[data-lid='" + t + "']").find("input[name='" + e + "']"),
        o = "EN";
    "RU" == lang && (o = "RU"), $.getScript("https://geo.tildacdn.com/script.js", function() {
        gs__open(i, o)
    })
}

function edinst__init() {
    var t = $("[data-tpl-field=gallery_insta]");
    window.edinst__settings = {}, t.append('<div style="text-align:center; padding:100px;" id="instasettingsloader"><img src="/tpl/img/ajax-loader.gif"></div>'), edinst__initEvents(t), edinst__loadInstagramSettings().done(function(e) {
        window.edinst__drawSettings()
    }).fail(function(e) {
        edinst__errorInstagramSettings(t, "Error!")
    })
}

function edinst__initEvents(i) {
    i.off("click", "#instapersconnect"), i.on("click", "#instapersconnect", function(e) {
        var t = $(this).data("link-connect");
        return e.preventDefault(), edinst__oauth(t, "Instagram Authorization"), !1
    }), i.off("click", "#instabizconnect"), i.on("click", "#instabizconnect", function(e) {
        return e.preventDefault(), edinst__oauth($(this).data("link-connect"), "Facebook Authorization"), !1
    }), i.off("click", "#instapersdisconnect"), i.on("click", "#instapersdisconnect", function(e) {
        e.preventDefault();
        e = {
            projectid: window.projectid,
            pageid: window.pageid
        };
        return $.ajax({
            type: "POST",
            url: "/oauth/fb/insta/disconnect/",
            data: e,
            dataType: "text",
            success: function(e) {
                edinst__clearSettings(), edinst__init()
            },
            error: function(e, t) {
                edinst__errorInstagramSettings(i, e)
            },
            timeout: 15e3
        }), !1
    }), i.off("click", "#instabizdisconnect"), i.on("click", "#instabizdisconnect", function(e) {
        e.preventDefault();
        e = {
            projectid: window.projectid,
            pageid: window.pageid,
            accountid: window.edinst__settings.accountid
        };
        return $.ajax({
            type: "POST",
            url: "/oauth/fb/instabiz/disconnect/",
            data: e,
            dataType: "text",
            success: function(e) {
                edinst__clearSettings(), edinst__init()
            },
            error: function(e, t) {
                edinst__errorInstagramSettings(i, e)
            },
            timeout: 15e3
        }), !1
    }), i.on("change", 'select[name="bi_bizaccount"]', function(e) {
        var t = $(this).find('option[value="' + $(this).val() + '"]').attr("data-account"),
            i = $(this).val();
        $('input[name="gallery_insta[accountid]"]').val(i), $('input[name="gallery_insta[account]"]').val(t)
    }), i.on("click", ".js-update-instagram", function(e) {
        e.preventDefault();
        e = {
            projectid: window.projectid,
            pageid: window.pageid,
            account: window.edinst__settings.account
        };
        return $.ajax({
            type: "GET",
            url: "/oauth/fb/insta/",
            data: e,
            dataType: "text",
            success: function(e) {
                e = JSON.parse(e);
                e.status && "ok" === e.status && "ok" === e.code ? $(".js-update-instagram").addClass("tp-link-disabled") : (e = e.status && "ok" === e.status && "wait" === e.code ? "RU" === window.lang ? "РџРѕРґРѕР¶РґРёС‚Рµ 15 РјРёРЅСѓС‚ РїСЂРµР¶РґРµ С‡РµРј РѕР±РЅРѕРІР»СЏС‚СЊ Р»РµРЅС‚Сѓ СЃРЅРѕРІР°" : "Wait 15 minutes to update block's content" : "RU" === window.lang ? "РџСЂРё РѕР±РЅРѕРІР»РµРЅРёРё Р»РµРЅС‚С‹ РїСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°." : "Error occured during block's content update.", edinst__errorInstagramSettings(i, e))
            },
            error: function(e, t) {
                edinst__errorInstagramSettings(i, e)
            },
            timeout: 15e3
        }), !1
    }), i.on("click", ".js-update-facebook", function(e) {
        e.preventDefault();
        e = {
            projectid: window.projectid,
            pageid: window.pageid,
            account: window.edinst__settings.account,
            accountid: window.edinst__settings.accountid
        };
        return $.ajax({
            type: "GET",
            url: "/oauth/fb/instabiz/",
            data: e,
            dataType: "text",
            success: function(e) {
                e = JSON.parse(e);
                e.status && "ok" === e.status && "ok" === e.code ? $(".js-update-facebook").addClass("tp-link-disabled") : (e = e.status && "ok" === e.status && "wait" === e.code ? "RU" === window.lang ? "РџРѕРґРѕР¶РґРёС‚Рµ 15 РјРёРЅСѓС‚ РїСЂРµР¶РґРµ С‡РµРј РѕР±РЅРѕРІР»СЏС‚СЊ Р»РµРЅС‚Сѓ СЃРЅРѕРІР°" : "Wait 15 minutes to update block's content" : "RU" === window.lang ? "РџСЂРё РѕР±РЅРѕРІР»РµРЅРёРё Р»РµРЅС‚С‹ РїСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°." : "Error occured during block's content update.", edinst__errorInstagramSettings(i, e))
            },
            error: function(e, t) {
                edinst__errorInstagramSettings(i, e)
            },
            timeout: 15e3
        }), !1
    })
}

function edinst__loadInstagramSettings() {
    var i = $("[data-tpl-field=gallery_insta]"),
        e = {
            projectid: window.projectid,
            pageid: window.pageid
        };
    return $.ajax({
        type: "POST",
        url: "/projects/get/getinsta/",
        data: e,
        dataType: "text",
        success: function(e) {
            if ($("#instasettingsloader").remove(), "{" == e.substring(0, 1)) {
                if (obj = $.parseJSON(e), !obj) return edinst__errorInstagramSettings(i, e);
                if ("ok" != obj.status) return edinst__errorInstagramSettings(i, obj.status);
                try {
                    if ("not_connected" != obj.data.instagram_basic.status) return void(window.edinst__settings = {
                        connected: "basic",
                        accountid: obj.data.instagram_basic.accountid || "",
                        account: obj.data.instagram_basic.account || ""
                    });
                    if ("not_connected" != obj.data.instagram_business.status) return void(window.edinst__settings = {
                        connected: "biz",
                        account: obj.data.instagram_business.account || "",
                        accountid: obj.data.instagram_business.accountid || "",
                        accounts: obj.data.instagram_business.accounts
                    });
                    window.edinst__settings = {}, "not_connected" == obj.data.instagram_basic.status && (window.edinst__settings.linkbasic = obj.data.instagram_basic.link), "not_connected" == obj.data.instagram_business.status && (window.edinst__settings.linkbiz = obj.data.instagram_business.link)
                } catch (e) {}
            } else edinst__errorInstagramSettings(i, e)
        },
        error: function(e, t) {
            edinst__errorInstagramSettings(i, e)
        },
        timeout: 15e3
    })
}

function edinst__clearSettings() {
    window.edinst__settings = {
        connected: "",
        account: "",
        accountid: "-1"
    }, $('input[name="gallery_insta[account]"]').val(""), $('input[name="gallery_insta[accountid]"]').val("-1"), $('input[name="gallery_insta[accounttype]"]').val("")
}

function edinst__errorInstagramSettings(e, t) {
    var i = e.find(".js-instaerror");
    i && 0 != i.length || (e.prepend('<div class="js-instaerror" style="padding: 20px;margin: 20px 0 40px 0;border: 1px solid #ffa5a5;color: #ee3333;"></div>'), i = e.find(".js-instaerror")), i.html(t)
}

function edinst__drawSettings() {
    var e = $("[data-tpl-field=gallery_insta]"),
        t = "";
    if (window.edinst__settings) {
        if ("biz" === window.edinst__settings.connected && !window.edinst__settings.accountid && 0 < window.edinst__settings.accounts.length && (window.edinst__settings.accountid = window.edinst__settings.accounts[0].id, window.edinst__settings.account = window.edinst__settings.accounts[0].name), window.edinst__settings.connected && "basic" == window.edinst__settings.connected) t += '<div style="padding-bottom: 20px;"><label class="pe-label">' + ("RU" == window.lang ? "РџРѕРґРєР»СЋС‡РµРЅРёРµ Instagram" : "Instagram connection") + '</label><div class="pe-hint">' + ("RU" === window.lang ? 'РџСЂРё РїРѕРґРєР»СЋС‡РµРЅРЅРѕРј Р°РєРєР°СѓРЅС‚Рµ С„РѕС‚РѕРіСЂР°С„РёРё РёР· Instagram РїРѕРєР°Р·С‹РІР°СЋС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё. РћР±РЅРѕРІР»РµРЅРёСЏ Рё РїРµСЂРµРїСѓР±Р»РёРєР°С†РёРё СЃС‚СЂР°РЅРёС†С‹ РЅРµ С‚СЂРµР±СѓРµС‚СЃСЏ. РљРѕР»РёС‡РµСЃС‚РІРѕ С„РѕС‚РѕРіСЂР°С„РёР№ РІ Р±Р»РѕРєРµ РЅР°СЃС‚СЂР°РёРІР°РµС‚СЃСЏ РІ РјРµРЅСЋ В«РќР°СЃС‚СЂРѕР№РєРёВ» СЌС‚РѕРіРѕ Р±Р»РѕРєР°. РџРѕРґРєР»СЋС‡Р°СЏ Р°РєРєР°СѓРЅС‚, РІС‹ РґР°РµС‚Рµ СЂР°Р·СЂРµС€РµРЅРёРµ С‚РѕР»СЊРєРѕ РЅР° РїРѕРєР°Р· С„РѕС‚РѕРіСЂР°С„РёР№ РЅР° СЃР°Р№С‚Рµ. РџСЂРёР»РѕР¶РµРЅРёРµ РЅРµ РёРјРµРµС‚ РґРѕСЃС‚СѓРї Рє СЃРѕРѕР±С‰РµРЅРёСЏРј Рё РЅРµ РјРѕР¶РµС‚ РїСѓР±Р»РёРєРѕРІР°С‚СЊ РёР»Рё СѓРґР°Р»СЏС‚СЊ РЅРёРєР°РєСѓСЋ РёРЅС„РѕСЂРјР°С†РёСЋ.РћР±РЅРѕРІР»РµРЅРёРµ Р»РµРЅС‚С‹ РїСЂРѕРёСЃС…РѕРґРёС‚ СЂР°Р· РІ РґРІР° С‡Р°СЃР°, РЅРѕ Р’С‹ РјРѕР¶РµС‚Рµ РѕР±РЅРѕРІРёС‚СЊ СЃРѕРґРµСЂР¶РёРјРѕРµ Р±Р»РѕРєР° <a href="#" class="js-update-instagram">РІСЂСѓС‡РЅСѓСЋ</a> СЂР°Р· РІ 15 РјРёРЅСѓС‚.</div>' : 'The images from the connected Instagram feed will be updated automatically. You don\'t have to re-publish the page to update block\'s content. To set the number of displayed images, go to the "Settings" menu of this block. The only permission we ask for is to show the images on the website. Our app doesn\'t have an access to publish or delete any information or read your messages.Block\'s content is updated every two hours, but you can do it <a href="#" class="js-update-instagram">manually</a> every 15 minutes.</div>') + '<div class="pe-hint">' + ("RU" === window.lang ? "Р’С‹ РїРѕРґРєР»СЋС‡РµРЅС‹ Рє Instagram, РєР°Рє " : "You are connected to Instagram, as ") + '<a href="https://www.instagram.com/' + window.edinst__settings.account + '" target="_blank">' + window.edinst__settings.account + '</a>.</div><a href="#" id="instapersdisconnect" style="display:table;background-color: #FFF; padding:13px 40px; font-size:16px; color:#222 !important; border: 1px solid #222; border-radius:3px; font-family: tfutura,Arial;">' + ("RU" === window.lang ? "РћС‚РєР»СЋС‡РёС‚СЊ Instagram" : "Disconnect Instagram") + "</a></div>";
        else if (window.edinst__settings.connected && "biz" == window.edinst__settings.connected) {
            var i = window.edinst__settings.accounts,
                o = window.edinst__settings.accountid;
            window.edinst__settings.account;
            if (t += '<div style="padding-bottom: 20px;"><input type="hidden" name="gallery_insta" value=""><label class="pe-label">' + ("RU" == window.lang ? "РџРѕРґРєР»СЋС‡РµРЅРёРµ Instagram" : "Instagram connection") + '</label><div class="pe-hint">' + ("RU" === window.lang ? 'РџСЂРё РїРѕРґРєР»СЋС‡РµРЅРЅРѕРј Р°РєРєР°СѓРЅС‚Рµ С„РѕС‚РѕРіСЂР°С„РёРё РёР· Instagram РїРѕРєР°Р·С‹РІР°СЋС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё. РћР±РЅРѕРІР»РµРЅРёСЏ Рё РїРµСЂРµРїСѓР±Р»РёРєР°С†РёРё СЃС‚СЂР°РЅРёС†С‹ РЅРµ С‚СЂРµР±СѓРµС‚СЃСЏ. РљРѕР»РёС‡РµСЃС‚РІРѕ С„РѕС‚РѕРіСЂР°С„РёР№ РІ Р±Р»РѕРєРµ РЅР°СЃС‚СЂР°РёРІР°РµС‚СЃСЏ РІ РјРµРЅСЋ В«РќР°СЃС‚СЂРѕР№РєРёВ» СЌС‚РѕРіРѕ Р±Р»РѕРєР°. РџРѕРґРєР»СЋС‡Р°СЏ Р°РєРєР°СѓРЅС‚, РІС‹ РґР°РµС‚Рµ СЂР°Р·СЂРµС€РµРЅРёРµ С‚РѕР»СЊРєРѕ РЅР° РїРѕРєР°Р· С„РѕС‚РѕРіСЂР°С„РёР№ РЅР° СЃР°Р№С‚Рµ. РџСЂРёР»РѕР¶РµРЅРёРµ РЅРµ РёРјРµРµС‚ РґРѕСЃС‚СѓРї Рє СЃРѕРѕР±С‰РµРЅРёСЏРј Рё РЅРµ РјРѕР¶РµС‚ РїСѓР±Р»РёРєРѕРІР°С‚СЊ РёР»Рё СѓРґР°Р»СЏС‚СЊ РЅРёРєР°РєСѓСЋ РёРЅС„РѕСЂРјР°С†РёСЋ.РћР±РЅРѕРІР»РµРЅРёРµ Р»РµРЅС‚С‹ РїСЂРѕРёСЃС…РѕРґРёС‚ СЂР°Р· РІ РґРІР° С‡Р°СЃР°, РЅРѕ Р’С‹ РјРѕР¶РµС‚Рµ РѕР±РЅРѕРІРёС‚СЊ СЃРѕРґРµСЂР¶РёРјРѕРµ Р±Р»РѕРєР° <a href="#" class="js-update-facebook">РІСЂСѓС‡РЅСѓСЋ</a> СЂР°Р· РІ 15 РјРёРЅСѓС‚.</div>' : 'The images from the connected Instagram feed will be updated automatically. You don\'t have to re-publish the page to update block\'s content. To set the number of displayed images, go to the "Settings" menu of this block. The only permission we ask for is to show the images on the website. Our app doesn\'t have an access to publish or delete any information or read your messages.Block\'s content is updated every two hours, but you can do it <a href="#" class="js-update-facebook">manually</a> every 15 minutes.</div>') + '</div><a href="#" id="instabizdisconnect" style="display:table;background-color: #FFF; padding:13px 40px; font-size:16px; color:#222 !important; border: 1px solid #222; border-radius:3px; font-family: tfutura,Arial;">' + ("RU" === window.lang ? "РћС‚РєР»СЋС‡РёС‚СЊ Instagram" : "Disconnect Instagram") + "</a>", 0 < window.edinst__settings.accounts.length) {
                t += '<div class="pe-form-group"><label class="pe-label">' + ("RU" === window.lang ? "Р’С‹Р±РѕСЂ Р°РєРєР°СѓРЅС‚Р°" : "Account") + '</label><div class="pe-select"><select class="pe-input pe-select" name="bi_bizaccount">';
                for (var a = 0; a < i.length; a++) t += '<option value="' + i[a].id + '" ' + (o == i[a].id ? "selected" : "") + ' data-account="' + i[a].name + '">' + i[a].title + "</option>";
                t += '</select></div><div class="pe-hint">' + ("RU" === window.lang ? "Р’С‹ РїРѕРґРєР»СЋС‡РµРЅС‹ Рє Р±РёР·РЅРµСЃ-СЃС‚СЂР°РЅРёС†Рµ Facebook. Р’С‹Р±РµСЂРёС‚Рµ РёР· СЃРїРёСЃРєР° СЃС‚СЂР°РЅРёС†Сѓ Instagram, Р»РµРЅС‚Сѓ РєРѕС‚РѕСЂРѕР№ РЅРµРѕР±С…РѕРґРёРјРѕ РѕС‚РѕР±СЂР°Р·РёС‚СЊ РІ Р±Р»РѕРєРµ." : "You are connected to the Facebook Business page. Select an Instagram page which feed will be used in the block.") + "</div></div>"
            } else t += '<div class="pe-form-group"><label class="pe-label">' + ("RU" === window.lang ? "Р’С‹Р±РѕСЂ Р°РєРєР°СѓРЅС‚Р°" : "Account") + '</label><div style="display: flex; color: #f36969; align-items: center; margin-top: 8px;"><svg width="15" height="15" viewBox="0 0 15 15" fill="#f36969" xmlns="http://www.w3.org/2000/svg"><circle cx="7.5" cy="7.5" r="7.5" fill="#f36969"/><path d="M7.38184 6.95483V10.7321" stroke="white"/><circle cx="7.3815" cy="4.30765" r="0.831818" fill="white"/></svg><p style="margin-left: 5px;">' + ("RU" === window.lang ? "РЈ РІС‹Р±СЂР°РЅРЅРѕР№ Р±РёР·РЅРµСЃ-СЃС‚СЂР°РЅРёС†С‹ Facebook РЅРµС‚ РїРѕРґРєР»СЋС‡РµРЅРЅС‹С… Instagram-Р°РєРєР°СѓРЅС‚РѕРІ" : "This Facebook Business Page doesn't have any connected Instagram accounts") + "</p></div></div>"
        } else t += '<div style="padding-bottom: 20px;"><label class="pe-label">' + ("RU" == window.lang ? "РџРѕРґРєР»СЋС‡РµРЅРёРµ Instagram" : "Instagram connection") + '</label><div class="pe-hint">' + ("RU" === window.lang ? "РџСЂРё РїРѕРґРєР»СЋС‡РµРЅРЅРѕРј Р°РєРєР°СѓРЅС‚Рµ С„РѕС‚РѕРіСЂР°С„РёРё РёР· Instagram РїРѕРєР°Р·С‹РІР°СЋС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё. РћР±РЅРѕРІР»РµРЅРёСЏ Рё РїРµСЂРµРїСѓР±Р»РёРєР°С†РёРё СЃС‚СЂР°РЅРёС†С‹ РЅРµ С‚СЂРµР±СѓРµС‚СЃСЏ. РљРѕР»РёС‡РµСЃС‚РІРѕ С„РѕС‚РѕРіСЂР°С„РёР№ РІ Р±Р»РѕРєРµ РЅР°СЃС‚СЂР°РёРІР°РµС‚СЃСЏ РІ РјРµРЅСЋ В«РќР°СЃС‚СЂРѕР№РєРёВ» СЌС‚РѕРіРѕ Р±Р»РѕРєР°. РџРѕРґРєР»СЋС‡Р°СЏ Р°РєРєР°СѓРЅС‚, РІС‹ РґР°РµС‚Рµ СЂР°Р·СЂРµС€РµРЅРёРµ С‚РѕР»СЊРєРѕ РЅР° РїРѕРєР°Р· С„РѕС‚РѕРіСЂР°С„РёР№ РЅР° СЃР°Р№С‚Рµ. РџСЂРёР»РѕР¶РµРЅРёРµ РЅРµ РёРјРµРµС‚ РґРѕСЃС‚СѓРї Рє СЃРѕРѕР±С‰РµРЅРёСЏРј Рё РЅРµ РјРѕР¶РµС‚ РїСѓР±Р»РёРєРѕРІР°С‚СЊ РёР»Рё СѓРґР°Р»СЏС‚СЊ РЅРёРєР°РєСѓСЋ РёРЅС„РѕСЂРјР°С†РёСЋ.</div>" : "The images from the connected Instagram feed are updated automatically. You don't have to re-publish the page to update the block's content. To set the number of displayed images, go to the Settings panel of the block. The only permission we ask for is to show the images on the website. Our app has no access to messages and cannot post or delete any information.") + "</div></div>", t += '<div style="padding-bottom: 20px;"><a href="#" data-link-connect="' + window.edinst__settings.linkbasic + '" id="instapersconnect" style="display:table;background-color: #222; padding:13px 40px; font-size:16px; color:#fff !important; border-radius:3px; font-family: tfutura,Arial;">' + ("RU" === window.lang ? "РџРѕРґРєР»СЋС‡РёС‚СЊ С‡РµСЂРµР· Instagram" : "Connect via Instagram") + '</a><div class="pe-hint">' + ("RU" === window.lang ? "Р’ СЃР»СѓС‡Р°Рµ, РµСЃР»Рё Р’С‹ С…РѕС‚РёС‚Рµ РїРѕРґРєР»СЋС‡РёС‚СЊ С‚РѕР»СЊРєРѕ РѕРґРёРЅ Р»РёС‡РЅС‹Р№ РёР»Рё Р±РёР·РЅРµСЃ-Р°РєРєР°СѓРЅС‚ Instagram, РЅР°Р¶РјРёС‚Рµ РЅР° СЌС‚Сѓ РєРЅРѕРїРєСѓ. РџРѕСЃР»Рµ РЅР°Р¶Р°С‚РёСЏ РЅР° РєРЅРѕРїРєСѓ РѕС‚РєСЂРѕРµС‚СЃСЏ РѕРєРЅРѕ Р°РІС‚РѕСЂРёР·Р°С†РёРё, РІ РєРѕС‚РѕСЂРѕРј РЅРµРѕР±С…РѕРґРёРјРѕ СЂР°Р·СЂРµС€РёС‚СЊ РїСЂРёР»РѕР¶РµРЅРёСЋ РґРѕСЃС‚СѓРї Рє С„РѕС‚Рѕ." : "If you need to connect only one Personal or Business Instagram account, click this button. Next, allow the application to access the photo in a pop-up authorization window.") + "</div></div>", t += '<div style="padding-bottom: 20px;"><a href="#" data-link-connect="' + window.edinst__settings.linkbiz + '" id="instabizconnect" style="display:table;background-color: #222; padding:13px 40px; font-size:16px; color:#fff !important; border-radius:3px; font-family: tfutura,Arial;">' + ("RU" === window.lang ? "РџРѕРґРєР»СЋС‡РёС‚СЊ С‡РµСЂРµР· Facebook" : "Connect via Facebook") + '</a><div class="pe-hint">' + ("RU" === window.lang ? "Р•СЃР»Рё Р’С‹ С…РѕС‚РёС‚Рµ РїРѕРґРєР»СЋС‡РёС‚СЊ СЃСЂР°Р·Сѓ РЅРµСЃРєРѕР»СЊРєРѕ Р±РёР·РЅРµСЃ-Р°РєРєР°СѓРЅС‚РѕРІ Instagram, Р’С‹ РјРѕР¶РµС‚Рµ РїСЂРёРІСЏР·Р°С‚СЊ РёС… Рє Р±РёР·РЅРµСЃ-СЃС‚СЂР°РЅРёС†Р°Рј Facebook, РїСЂРёРЅР°РґР»РµР¶Р°С‰РёРј РѕРґРЅРѕР№ Р»РёС‡РЅРѕР№ СЃС‚СЂР°РЅРёС†Рµ Facebook. РќР°Р¶РјРёС‚Рµ РЅР° СЌС‚Сѓ РєРЅРѕРїРєСѓ РґР»СЏ РїРѕРґРєР»СЋС‡РµРЅРёСЏ РІСЃРµС… Р±РёР·РЅРµСЃ-Р°РєРєР°СѓРЅС‚РѕРІ Instagram, СЃРІСЏР·Р°РЅРЅС‹С… СЃ Р»РёС‡РЅРѕР№ СЃС‚СЂР°РЅРёС†РµР№ Facebook. РџРѕСЃР»Рµ РЅР°Р¶Р°С‚РёСЏ РЅР° РєРЅРѕРїРєСѓ РѕС‚РєСЂРѕРµС‚СЃСЏ РѕРєРЅРѕ Р°РІС‚РѕСЂРёР·Р°С†РёРё, РІ РєРѕС‚РѕСЂРѕРј РЅРµРѕР±С…РѕРґРёРјРѕ СЂР°Р·СЂРµС€РёС‚СЊ РїСЂРёР»РѕР¶РµРЅРёСЋ РґРѕСЃС‚СѓРї Рє С„РѕС‚Рѕ." : "If you want to connect multiple Business Instagram accounts, you can connect them to Business Facebook Pages that belong to one personal Facebook page. Click this button to connect all Business Instagram profiles linked to personal Facebook Page. Next, allow the application to access the photo in a pop-up authorization window.") + "</div></div>";
        t += '<input type="hidden" name="gallery_insta[account]" value="' + (window.edinst__settings.account || "") + '">', t += '<input type="hidden" name="gallery_insta[accountid]" value="' + (window.edinst__settings.accountid || "") + '">', t += '<input type="hidden" name="gallery_insta[accounttype]" value="' + (window.edinst__settings.connected || "") + '">', e.html(t), window.edinst__settings.accounts && 0 === window.edinst__settings.accounts.length && edinst__clearSettings()
    } else console.log("Empty settings")
}

function edinst__oauth_check() {
    try {
        if (window.edinst__oauthWin && window.edinst__oauthWin.document) {
            var e = window.edinst__oauthWin.document.body.innerText;
            if ("OK" === e || "ok" === e) return window.edinst__oauthCheck && clearTimeout(window.edinst__oauthCheck), window.edinst__oauthCheck = !1, window.edinst__oauthWin.close(), window.setTimeout(function() {
                edinst__loadInstagramSettings().done(function(e) {
                    window.edinst__drawSettings()
                }).fail(function(e) {
                    console.log(e), edinst__errorInstagramSettings(elcontainer, "Error!")
                })
            }, 300), !0
        }
    } catch (e) {}
    window.edinst__oauthCheck = window.setTimeout(function() {
        edinst__oauth_check()
    }, 200)
}

function edinst__oauth(e, t) {
    t && null != t || (t = "OAuth2 authorization"), $("[data-tpl-field=gallery_insta]").append('<div style="text-align:center; padding:100px;" id="instasettingsloader"><img src="/tpl/img/ajax-loader.gif"></div>'), window.edinst__oauthWin = window.open(e, t, "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes,width=700,height=600"), window.edinst__oauthCheck = window.setTimeout(function() {
        edinst__oauth_check()
    }, 200)
}

function tp__edrec__getDictObj(e) {
    var t = "DE" === e ? {
        user_has_unsaved_changes_title: "Sie haben ungespeicherte Г„nderungen",
        user_has_unsaved_changes_msg: "Sie haben ungespeicherte Г„nderungen auf der Seite. Sind Sie sicher, dass Sie dieses Bedienfeld schlieГџen mГ¶chten?",
        close_button: "X",
        save: "Speichern",
        save_and_close: "Speichern und schlieГџen",
        block_in_archive: "Dieser Block wurde archiviert und wird nicht mehr unterstГјtzt. Er wird weiterhin funktionieren, aber nach einer Weile treten wahrscheinlich Fehler auf. Wir empfehlen, wenn mГ¶glich, ihn zu erneuern, indem Sie eine neue Version des Blocks aus der Bibliothek hinzufГјgen und den Inhalt in diese verschieben.",
        note_diff_edit_and_publish: "Das Erscheinungsbild dieses Blocks im Bearbeitungsmodus kann sich von seinem Erscheinungsbild in der Vorschau und auf der verГ¶ffentlichten Seite unterscheiden.",
        set_width_viewport_limit: "FГјr diesen Block gilt eine AnzeigebeschrГ¤nkung. Dieser Block wird nur auf Bildschirmen angezeigt, die ${screenmin}вЂ“${screenmax} sind",
        success_data_disclaimer: "Geben Sie eine Nachricht und eine Seiten-URL an, die bei erfolgreicher DatenГјbermittlung im Warenkorb verwendet wird, wenn keine Zahlungssysteme zugewiesen sind. Wenn in den Website-Einstellungen Zahlungssysteme zugewiesen sind, werden die URL der Erfolgsseite und die URL der Fehlerseite aus der spezifischen Systemeinrichtung verwendet.",
        convert_to_zero: "In Zero Block konvertieren",
        convert_to_zero_descr: "Verwenden Sie den Editor, um das Design dieses Blocks zu Г¤ndern. Konvertieren Sie ihn in den vollstГ¤ndig bearbeitbaren Zero Block und verwalten Sie jedes Element",
        add_class_name: "CSS-Klassenname hinzufГјgen",
        name_must_begin_with_uc: "Der Name muss mit uc- beginnen",
        add_block_to_lib: "Block zur Bibliothek hinzufГјgen",
        my_blocks: "Meine BlГ¶cke",
        new_category_will_appear_in_lib: "Wenn die Funktion aktiviert ist, wird eine neue Kategorie вЂћMeine BlГ¶ckeвЂњ in der Blockbibliothek erscheinen und dieser Block wird ihr hinzugefГјgt. Nutzen Sie diese Funktion, um Ihr Markendesignsystem zu organisieren.",
        update_block_in_lib: "Block in Bibliothek aktualisieren",
        block_title: "Blocktitel",
        add_block_to_lib_v2: "Block zur Bibliothek hinzufГјgen",
        cancel: "Abbrechen",
        block_id_copied: "Block-ID in die Zwischenablage kopiert",
        browser_not_support_copying: "Fehler, Ihr Browser unterstГјtzt diese Methode nicht. Bitte kopieren Sie die ID manuell",
        go_back: "ZurГјck",
        exit_without_saving: "Beenden, ohne zu speichern",
        error_too_much_data: "Fehler: Zu viele Daten. Г„nderungen werden nicht gespeichert. Bitte lГ¶schen Sie einen Teil der Daten.",
        error_missing_end_tag: "Kann nicht gespeichert werden, End-Tag fehlt. UngГјltiger HTML-Code kann zu Problemen mit dem Markup fГјhren. Bitte korrigieren Sie das",
        redirect_prohibited_in_free_plan: 'Sorry, die Umleitung per Code ist bei einem kostenlosen Plan oder einer Testphase verboten. Bitte bezahlen Sie fГјr ein Abonnement im Bereich <a href="/identity/plan/" style="color:red;font-weight:600;">PlГ¤ne und Abrechnung</a>.'
    } : "EN" === e ? {
        user_has_unsaved_changes_title: "You have unsaved changes",
        user_has_unsaved_changes_msg: "You have unsaved changes on the page. Are you sure you want to close this panel?",
        close_button: "X",
        save: "Save",
        save_and_close: "Save and close",
        block_in_archive: "This block is in the archive and it's not supported anymore. It will work but in a while, there's an error probability. We recommend, when possible, to renew it by adding a new version of the block from the library and moving the content to it.",
        note_diff_edit_and_publish: "Appearance of this block in the editing mode might be different from its appearance on preview and on published page.",
        set_width_viewport_limit: "There's a display restriction applied to this block. This block will appear only on screens that are ${screenmin} - ${screenmax}",
        success_data_disclaimer: "Specify a message and a page URL that will be used on successful data submission in the Shopping cart if no payment systems are assigned. If payment systems are assigned in the Site Settings, the success page URL and failure page URL from the specific system setup will be used.",
        convert_to_zero: "Convert to Zero Block",
        convert_to_zero_descr: "Use the editor to change the design of this block. Convert it to the full editable Zero Block and manage every element",
        add_class_name: "Add CSS Class Name",
        name_must_begin_with_uc: "Name must begin with uc-",
        add_block_to_lib: "Add Block to Library",
        my_blocks: "My Blocks",
        new_category_will_appear_in_lib: 'When the function is activated, a new category "My Blocks" will appear in the Library of blocks and this block will be added to it. Use this feature to organize your branded design system.',
        update_block_in_lib: "Update Block in Library",
        block_title: "Block Title",
        add_block_to_lib_v2: "Add Block to Library",
        cancel: "Cancel",
        block_id_copied: "Block ID copied to clipboard",
        browser_not_support_copying: "Error, your browser does not support this method. Please copy the ID manually",
        go_back: "Go back",
        exit_without_saving: "Exit without saving",
        container: "Container",
        click_set_mobile_margins: "Click to set margins for mobile",
        part: "Part",
        button_click_in_analytics: "Button click displays in analytic system as page view",
        popup_opening_in_analytics: "You can setup popup opening as a goal in the analytic system as a view of virtual page",
        default: "Default",
        search_photos: "Search photos",
        img_alt_text: "SEO: Image alt text",
        access_to_block_restricted: "Access to this block is restricted. Please verify your",
        email_address: "email address",
        phone_number: "phone number",
        loading: "Loading...",
        add_new_item: "Add new item",
        add_input_field: "Add input field",
        add_menu_item: "Add menu item",
        add_subitems: "Add subitems",
        select_unselect_all_items: "Select/Unselect all items",
        twitter_no_supports_api: "Twitter no longer supports the API number of publications. Counter publications will not be displayed.",
        success_message_edit_in_settings: 'Success message can be edited in Site Settings - <a href="/projects/settings/?projectid=${projectid}#tab=ss_menu_payments" target="_blank" style="color:#fa633f;">Payment systems</a>',
        success_url_edit_in_settings: 'Success URL can be edited in Site Settings - <a href="/projects/settings/?projectid=${projectid}#tab=ss_menu_payments" target="_blank" style="color:#fa633f;">Payment systems</a>',
        title: "Title",
        link: "Link",
        block_is_on_current_page: "The block is on the current page",
        go_to_parent_page: "Go to parent page",
        link_hook: "Link hook",
        popup_link: "Popup link",
        enter_exact_address: "Enter the exact address to which you want to link this block",
        use_as_link_in_any_block: "Use as a link in any block вЂ“ this pop-up will be displayed on click",
        example_catalog: "Example Catalog",
        catalog_not_set: "Not set (show products from block)",
        all_products: "All products",
        go_to_products_catalog: 'Go to the <a href="/identity/gostore/?projectid=${projectid}" target="_blank" ${catalogOnClickAttr}>products catalog</a>',
        if_a_lot_of_products_use_catalog: 'If you sell a lot of products, use the <a href="/identity/gostore/?projectid=${projectid}" target="_blank" ${catalogOnClickAttr}>Product Catalog</a> to manage them.',
        feed_not_set: "Not set",
        example_feed: "Example Feed",
        feed: "Feed",
        go_to_feed_edit_panel: 'Go to the <a href="/identity/gofeeds/?projectid=${projectid}" target="_blank" ${feedsOnClickAttr}>feeds edit panel</a>',
        use_feeds_to_mange_news: 'To manage news feeds, blog posts, or other event feeds, go to <a href="/identity/gofeeds/?projectid=${projectid}" target="_blank" ${feedsOnClickAttr}>Feeds</a>.',
        setup_cart_data_in_analytics: "You can setup cart data submission as a goal in the analytic system as a view of virtual page",
        or: "or",
        submitting_from_in_analytics: "Submitting the form will appear as a page view in the analytics system: ",
        disable_payment: "Disable payment",
        connected_payment_system: "Connected payment system:",
        connected_payment_systems: "Connected payment systems:",
        settings: "Settings",
        connect_payment_system_in_settings: 'Please, connect payment system in <a href="/projects/settings/?projectid=${projectid}#tab=ss_menu_payments" style="color: #ff8562 !important;">site settings</a>',
        add_to_cart: "Add to Cart",
        if_you_use_catalog_enter_prod_id: 'If you use the <a href="/identity/gostore/?projectid=${projectid}" target="_blank" style="color: inherit">Product Catalog</a>, enter the Product ID here. Find the Product ID at the bottom of the product settings panel in the Catalog. This will allow you to synchronize data: SKU, price, quantity in stock, and product variants.',
        fill_fields_from_catalog: '<a href="#" name="updateFromProductsCatalog" style="color: inherit">Fill in the fields with the data</a> from the Product Catalog.',
        cant_find_product_in_catalog: "Can't find a product in the catalog. It may have been deleted or disabled. Please check that the product with this ID exists.",
        you_connect_catalog_products_in_block: "You connect the catalog products in this block. Products wich added on this block are not displayed.",
        copy_products_to_catalog: '<a href="javascript:edrec__copyproducts_to_catalog(${pageid},${recordid})" style="color:#fa8669;">Copy products</a> from this block to the Product Catalog.',
        form_data_receiver: "Form data receiver",
        submitted_data_stored_in_leads: 'Submitted data is stored in the <a href="https://tilda.cc/projects/leads/?projectid=${projectid}" target="_blank" style="color:#FF855D !important;">Leads section</a> of the project. You can also connect data collection services integrated with Tilda.',
        contacts_lists_and_services: "Contacts lists and services",
        tilda_crm: "Tilda CRM",
        go_to_tilda_crm: 'Go to <a href="https://tilda.cc/identity/gocrm/" target="_blank">Tilda CRM</a>',
        you_dont_have_any_list_yet: "You don't have any list yet.",
        create: "Create",
        connected_services: "Connected services",
        you_havenot_connected_any_service_yet: "You have not connected any service yet",
        you_can_receive_data_to_email_and_others: 'You can receive data to your Email, Google Sheets, or to one of many integrated services such as MailChimp, SendGrid, Trello, Slack, etc. Assign service in Site Settings в†’ <a href="/projects/settings/?projectid=${projectid}#tab=ss_menu_forms" target="_blank">Forms</a>. Learn more in our <a href="https://help.tilda.cc/forms" target="_blank">Help Center</a>.',
        anti_spam_activated: "Anti-spam activated.",
        connect: "Connect",
        own_script_for_forms: "Own script for receiving data",
        add_own_script_address: 'Add the script address that will receive field values. Learn how to receive form submissions using custom scripts in the <a href="https://help.tilda.cc/formsscript" target="_blank">Help Center</a>.',
        form_target: "Form Target",
        same_window: "Same Window",
        new_window: "New Window",
        is_ajax_action_script: "is ajax action script",
        show_more_settings: "Show more settings",
        minimize_options: "Minimize options",
        product_adding_was_successful: 'Adding was successful. Added products: ${prodNum}. Go to the <a href="/identity/gostore/?projectid=${projectid}" target="_blank" style="color:inherit;">catalog</a> and check the result. You can delete products from this block manually.',
        go_to_more_to_define_buttons: 'Go to "More" tab to define buttons for all products.',
        error_too_much_data: "Error: Too much data. Changes will not be saved. Please delete some of the information.",
        error_missing_end_tag: "Can't save, end tag is missing. Invalid HTML may cause problems with markup. Please fix it.",
        redirect_prohibited_in_free_plan: 'Sorry, redirect via code is prohibited at a free plan or trial period. Please pay for the subscription by going to the <a href="/identity/plan/" style="color:red;font-weight:600;">Plans and Billing</a> section.',
        whatsapp_message_order: "Hello! I'd like to place an order.",
        email_subject_order: "Hello! I'd like to place an order.",
        user: "User",
        group: "Group",
        url: "URL",
        call: "Call",
        chat: "Chat",
        username: "Username",
        phone: "Phone number",
        name: "Title",
        message: "Message",
        email: "Email",
        subject: "Subject",
        delete_item: "Delete item",
        type: "Type",
        custom_icon: "Custom icon",
        delete_image: "Delete image",
        add_item: "Add item",
        new_item: "New item",
        value_too_long: "The value is too long",
        looks_like_not_email: "Looks like itвЂ™s not an email",
        looks_like_not_phone_number: "Looks like itвЂ™s not a phone number",
        universal: "Universal",
        messengers: "Messengers",
        social_media: "Social media",
        images_list: "Images list",
        replace_image: "Replace&nbsp;image",
        text: "Text",
        video: "Video",
        upload_new: "Upload new",
        button_link: "Button Link",
        second_button_link: "Second Button Link",
        third_button_link: "Third Button Link",
        four_button_link: "Four Button Link",
        enter_full_link_address: 'Please enter the full link address, starting with http://<br>You can start links to other pages of your website with / not specifying website address.<br><a href="https://help.tilda.cc/link-to-page" target="_blank">How to set up links to other pages</a>',
        link_to_page: "Link to Page",
        link_to_block: "Link to Block",
        choose_page: "Please choose a page:",
        select_block: "Select block",
        click_block_to_select: "РЎlick on the block to select.",
        select_blocks_to_mark: "Select blocks",
        block_ids: "Block ids",
        set_blocks_divided_comma: "Please set blocks ID divided by comma",
        choose_blocks: "Choose Blocks",
        wait_to_update_block: "Wait 15 minutes to update block's content",
        error_block_content_update: "Error occured during block's content update.",
        instagram_connection: "Instagram connection",
        images_from_instagram_updated_automatically_class_instagram: 'The images from the connected Instagram feed will be updated automatically. You don\'t have to re-publish the page to update block\'s content. To set the number of displayed images, go to the "Settings" menu of this block. The only permission we ask for is to show the images on the website. Our app doesn\'t have an access to publish or delete any information or read your messages.Block\'s content is updated every two hours, but you can do it <a href="#" class="js-update-instagram">manually</a> every 15 minutes.</div>',
        you_connected_instagram_as: "You are connected to Instagram, as ",
        disconnect_instagram: "Disconnect Instagram",
        images_from_instagram_updated_automatically_class_facebook: 'The images from the connected Instagram feed will be updated automatically. You don\'t have to re-publish the page to update block\'s content. To set the number of displayed images, go to the "Settings" menu of this block. The only permission we ask for is to show the images on the website. Our app doesn\'t have an access to publish or delete any information or read your messages.Block\'s content is updated every two hours, but you can do it <a href="#" class="js-update-facebook">manually</a> every 15 minutes.</div>',
        account: "Account",
        connected_to_facebook_business_page: "You are connected to the Facebook Business page. Select an Instagram page which feed will be used in the block.",
        facebook_doesnt_connected_instagram: "This Facebook Business Page doesn't have any connected Instagram accounts",
        images_from_instagram_updated_automatically: "The images from the connected Instagram feed are updated automatically. You don't have to re-publish the page to update the block's content. To set the number of displayed images, go to the Settings panel of the block. The only permission we ask for is to show the images on the website. Our app has no access to messages and cannot post or delete any information.",
        connect_via_instagram: "Connect via Instagram",
        connect_only_one_instagram_account_this_button: "If you need to connect only one Personal or Business Instagram account, click this button. Next, allow the application to access the photo in a pop-up authorization window.",
        connect_via_facebook: "Connect via Facebook",
        connect_multiple_business_instagram_accounts: "If you want to connect multiple Business Instagram accounts, you can connect them to Business Facebook Pages that belong to one personal Facebook page. Click this button to connect all Business Instagram profiles linked to personal Facebook Page. Next, allow the application to access the photo in a pop-up authorization window.",
        more: "More",
        geo_point: "Geo Point",
        marker_title: "Marker title",
        hover_over_marker: "It is displayed on hover over the marker",
        description: "Description",
        click_on_marker: "It is displayed by click on the marker",
        latitude: "latitude",
        longitude: "longitude",
        delete: "Delete",
        find_on_map: "Find on map",
        input_address: "Input Address",
        latitude_first_letter_big: "Latitude",
        longitude_first_letter_big: "Longitude",
        variants_params: "Variants",
        add_option_size_color: "Add option (e.g., size, color..)",
        option_name: "Option name",
        color: "Color",
        option_values: "Option values",
        set_variants: "Set variants by dividing them with a new line",
        prodopt_descr: 'To put product options, write the option name and put the variants in the Option Value field by dividing them with a new line.<a href="javascript:showprodoptionshint();" data-prodoptions-morehintbutton="" style="color:#fa8669 !important;">Read more...</a><span data-prodoptionshint="" style="display:none;">For example:<br>Grey<br>Blue<br>Red<br><br>If the price of the options differs from the basic price, put the sign = and write an option price (only numbers, without currency) after option value. For example:<br>Standard<br>Large $200 = 200<br><br>If you need to add an additional price to the basic one, put the sign =+ and write an extra charge (only numbers, without currency). For example:<br>Standard packaging<br>Gift packaging $5 = +5</span>',
        add_option: "Add option",
        second_option_name: "Second option name",
        size: "Size",
        second_option_values: "Second option values",
        third_option_name: "Third option name",
        third_option_values: "Third option values",
        item: "ITEM",
        duplicate: "Duplicate",
        on: "On",
        off: "Off",
        up: "Up",
        down: "Down",
        button_title: "Button title",
        second_button_title: "Second button title",
        product_service_price: "Price of product or service",
        old_price: "Old price",
        card_mark: "Card mark (for example, sale, new, -50%)",
        soclinks: "Links on social networks profile",
        currency_sign_added_automatically: "The currency sign is added automatically. You can change the currency in the Site Settings.",
        select_geo_area: "Select geo area",
        add_soclinks_comma_separator: "Add a comma-separated list of social networks links. For example, <i>https://twitter.com/tildapublishing, https://medium.com/@TildaPublishing</i>",
        subtitle: "Subtitle",
        date: "Date",
        time: "Time",
        person_name: "Person name",
        person_descr: "Person description",
        put_product_options: "Put product options by dividing them with a new line. If variant has own price, add the sign = and write a price (only numbers, without currency). For example: Large size $10 = 10",
        options: "Options",
        product_link: "Product Link",
        link_on_page: "Link on page",
        view_full_product_info: "View full product info",
        image: "Image",
        checkbox: "Checkbox",
        more_with_dots: "More...",
        hide: "Hide",
        too_much_data_in_input: "Note: Too much data in this input field. We strongly recommend reducing the amount of information.",
        error_too_much_data_in_input_field: "Error: Too much data in this input field. Changes will not be saved. Please delete some of the information."
    } : "RU" === e ? {
        user_has_unsaved_changes_title: "РџРѕСЃР»РµРґРЅРёРµ РёР·РјРµРЅРµРЅРёСЏ РЅРµ СЃРѕС…СЂР°РЅРµРЅС‹",
        user_has_unsaved_changes_msg: "РќР° СЃС‚СЂР°РЅРёС†Рµ РїСЂРёСЃСѓС‚СЃС‚РІСѓСЋС‚ РЅРµСЃРѕС…СЂР°РЅРµРЅРЅС‹Рµ РёР·РјРµРЅРµРЅРёСЏ. Р’С‹ СѓРІРµСЂРµРЅС‹, С‡С‚Рѕ С…РѕС‚РёС‚Рµ Р·Р°РєСЂС‹С‚СЊ РїР°РЅРµР»СЊ?",
        close_button: "X",
        save: "РЎРѕС…СЂР°РЅРёС‚СЊ",
        save_and_close: "РЎРѕС…СЂР°РЅРёС‚СЊ Рё Р·Р°РєСЂС‹С‚СЊ",
        block_in_archive: "Р­С‚РѕС‚ Р±Р»РѕРє РЅР°С…РѕРґРёС‚СЃСЏ РІ Р°СЂС…РёРІРµ Рё Р±РѕР»СЊС€Рµ РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚СЃСЏ. РћРЅ РїСЂРѕРґРѕР»Р¶РёС‚ СЂР°Р±РѕС‚Р°С‚СЊ, РЅРѕ СЃРѕ РІСЂРµРјРµРЅРµРј РµСЃС‚СЊ РІРµСЂРѕСЏС‚РЅРѕСЃС‚СЊ РїРѕСЏРІР»РµРЅРёСЏ РѕС€РёР±РѕРє. РњС‹ СЂРµРєРѕРјРµРЅРґСѓРµРј РїРѕ РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё РµРіРѕ РѕР±РЅРѕРІРёС‚СЊ, РґРѕР±Р°РІРёРІ РЅРѕРІСѓСЋ РІРµСЂСЃРёСЋ Р±Р»РѕРєР° РёР· Р±РёР±Р»РёРѕС‚РµРєРё, Рё РїРµСЂРµРЅРµСЃС‚Рё РІ РЅРµРіРѕ С‚РµРєСѓС‰РёР№ РєРѕРЅС‚РµРЅС‚.",
        note_diff_edit_and_publish: "РџСЂРёРјРµС‡Р°РЅРёРµ: Р’РёРґ РґР°РЅРЅРѕРіРѕ Р±Р»РѕРєР° Рё РµРіРѕ РїРѕРІРµРґРµРЅРёРµ РІ СЂРµР¶РёРјРµ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ РјРѕР¶РµС‚ РѕС‚Р»РёС‡Р°С‚СЊСЃСЏ РѕС‚ РІРёРґР° РІ СЂРµР¶РёРјРµ РїСЂРµРґРїСЂРѕСЃРјРѕС‚СЂР° РёР»Рё РїСѓР±Р»РёРєР°С†РёРё.",
        set_width_viewport_limit: "РџСЂРёРјРµС‡Р°РЅРёРµ: Р”Р»СЏ СЌС‚РѕРіРѕ Р±Р»РѕРєР° СѓСЃС‚Р°РЅРѕРІР»РµРЅРѕ РѕРіСЂР°РЅРёС‡РµРЅРёРµ РЅР° РѕС‚РѕР±СЂР°Р¶РµРЅРёРµ РЅР° СЂР°Р·Р»РёС‡РЅС‹С… СЂР°Р·РјРµСЂР°С… СЌРєСЂР°РЅР°. Р‘Р»РѕРє Р±СѓРґРµС‚ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊСЃСЏ РЅР° СЌРєСЂР°РЅР°С… С€РёСЂРёРЅРѕР№ РѕС‚ ${screenmin} РґРѕ ${screenmax}",
        success_data_disclaimer: "РЈРєР°Р¶РёС‚Рµ СЃРѕРѕР±С‰РµРЅРёРµ Рё Р°РґСЂРµСЃ СЃС‚СЂР°РЅРёС†С‹ РІ СЃР»СѓС‡Р°Рµ СѓСЃРїРµС€РЅРѕР№ РѕС‚РїСЂР°РІРєРё РґР°РЅРЅС‹С… РІ РєРѕСЂР·РёРЅРµ Р±РµР· РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ РїР»Р°С‚РµР¶РЅС‹С… СЃРёСЃС‚РµРј. Р•СЃР»Рё РїР»Р°С‚РµР¶РЅС‹Рµ СЃРёСЃС‚РµРјС‹ Р±СѓРґСѓС‚ РїРѕРґРєР»СЋС‡РµРЅС‹ РІ РЅР°СЃС‚СЂРѕР№РєР°С… СЃР°Р№С‚Р°, С‚Рѕ Р±СѓРґСѓС‚ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊСЃСЏ СЃСЃС‹Р»РєРё РЅР° СЃС‚СЂР°РЅРёС†С‹ СѓСЃРїРµС…Р° РёР»Рё РЅРµСѓРґР°С‡Рё РёР· РЅР°СЃС‚СЂРѕРµРє РєРѕРЅРєСЂРµС‚РЅРѕР№ СЃРёСЃС‚РµРјС‹.",
        convert_to_zero: "РљРѕРЅРІРµСЂС‚РёСЂРѕРІР°С‚СЊ РІ Zero Block",
        convert_to_zero_descr: "РСЃРїРѕР»СЊР·СѓР№С‚Рµ СЂРµРґР°РєС‚РѕСЂ, С‡С‚РѕР±С‹ РёР·РјРµРЅРёС‚СЊ РґРёР·Р°Р№РЅ СЌС‚РѕРіРѕ Р±Р»РѕРєР°. РљРѕРЅРІРµСЂС‚РёСЂСѓР№С‚Рµ РµРіРѕ РІ РїРѕР»РЅРѕСЃС‚СЊСЋ СЂРµРґР°РєС‚РёСЂСѓРµРјС‹Р№ Zero Block Рё СѓРїСЂР°РІР»СЏР№С‚Рµ РєР°Р¶РґС‹Рј СЌР»РµРјРµРЅС‚РѕРј.",
        add_class_name: "Р”РѕР±Р°РІРёС‚СЊ CSS Class Name",
        name_must_begin_with_uc: "РРјСЏ РґРѕР»Р¶РЅРѕ РЅР°С‡РёРЅР°С‚СЊСЃСЏ СЃ uc-",
        add_block_to_lib: "Р”РѕР±Р°РІРёС‚СЊ Р±Р»РѕРє РІ Р±РёР±Р»РёРѕС‚РµРєСѓ",
        my_blocks: "РњРѕРё Р±Р»РѕРєРё",
        new_category_will_appear_in_lib: 'РџСЂРё Р°РєС‚РёРІР°С†РёРё С„СѓРЅРєС†РёРё, РІ Р‘РёР±Р»РёРѕС‚РµРєРµ Р±Р»РѕРєРѕРІ РїРѕСЏРІРёС‚СЃСЏ РЅРѕРІР°СЏ РєР°С‚РµРіРѕСЂРёСЏ "РњРѕРё Р±Р»РѕРєРё" Рё РІ РЅРµРµ Р±СѓРґРµС‚ РґРѕР±Р°РІР»РµРЅ СЌС‚РѕС‚ Р±Р»РѕРє. РСЃРїРѕР»СЊР·СѓР№С‚Рµ СЌС‚Сѓ С„СѓРЅРєС†РёСЋ РґР»СЏ РѕСЂРіР°РЅРёР·Р°С†РёРё С„РёСЂРјРµРЅРЅРѕР№ РґРёР·Р°Р№РЅ-СЃРёСЃС‚РµРјС‹.',
        update_block_in_lib: "РћР±РЅРѕРІРёС‚СЊ Р±Р»РѕРє РІ Р‘РёР±Р»РёРѕС‚РµРєРµ",
        block_title: "РќР°Р·РІР°РЅРёРµ Р±Р»РѕРєР°",
        add_block_to_lib_v2: "Р”РѕР±Р°РІРёС‚СЊ Р±Р»РѕРє РІ Р‘РёР±Р»РёРѕС‚РµРєСѓ",
        cancel: "РћС‚РјРµРЅР°",
        block_id_copied: "ID Р±Р»РѕРєР° СЃРєРѕРїРёСЂРѕРІР°РЅ РІ Р±СѓС„РµСЂ РѕР±РјРµРЅР°",
        browser_not_support_copying: "РћС€РёР±РєР°, РІР°С€ Р±СЂР°СѓР·РµСЂ РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚ РґР°РЅРЅС‹Р№ РјРµС‚РѕРґ. РЎРєРѕРїРёСЂСѓР№С‚Рµ РїРѕР¶Р°Р»СѓР№СЃС‚Р° ID РІСЂСѓС‡РЅСѓСЋ",
        go_back: "Р’РµСЂРЅСѓС‚СЊСЃСЏ РЅР°Р·Р°Рґ",
        exit_without_saving: "Р’С‹Р№С‚Рё Р±РµР· СЃРѕС…СЂР°РЅРµРЅРёСЏ",
        container: "РљРѕРЅС‚РµР№РЅРµСЂ",
        click_set_mobile_margins: "РќР°Р¶РјРёС‚Рµ, С‡С‚РѕР±С‹ Р·Р°РґР°С‚СЊ РѕС‚СЃС‚СѓРїС‹<br>РґР»СЏ РјРѕР±РёР»СЊРЅРѕРіРѕ",
        part: "Р Р°Р·РґРµР»",
        button_click_in_analytics: "РљР»РёРє Р±СѓРґРµС‚ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊСЃСЏ РІ СЃРёСЃС‚РµРјРµ Р°РЅР°Р»РёС‚РёРєРё РєР°Рє РїСЂРѕСЃРјРѕС‚СЂ СЃС‚СЂР°РЅРёС†С‹",
        popup_opening_in_analytics: "РћС‚РєСЂС‹С‚РёРµ РїРѕРїР°РїР° Р±СѓРґРµС‚ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊСЃСЏ РІ СЃРёСЃС‚РµРјРµ Р°РЅР°Р»РёС‚РёРєРё РєР°Рє РїСЂРѕСЃРјРѕС‚СЂ СЃС‚СЂР°РЅРёС†С‹",
        default: "РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ",
        search_photos: "РСЃРєР°С‚СЊ РІ Р±РёР±Р»РёРѕС‚РµРєРµ",
        img_alt_text: "SEO: РђР»СЊС‚-С‚РµРєСЃС‚ РґР»СЏ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ",
        access_to_block_restricted: "Р”РѕСЃС‚СѓРї Рє СЌС‚РѕРјСѓ Р±Р»РѕРєСѓ РѕРіСЂР°РЅРёС‡РµРЅ. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРѕРґС‚РІРµСЂРґРёС‚Рµ",
        email_address: "РІР°С€ email",
        phone_number: "РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°",
        loading: "Р—Р°РіСЂСѓР·РєР°...",
        add_new_item: "Р”РѕР±Р°РІРёС‚СЊ СЌР»РµРјРµРЅС‚",
        add_input_field: "Р”РѕР±Р°РІРёС‚СЊ РїРѕР»Рµ РґР»СЏ РІРІРѕРґР°",
        add_menu_item: "Р”РѕР±Р°РІРёС‚СЊ РїСѓРЅРєС‚ РјРµРЅСЋ",
        add_subitems: "Р”РѕР±Р°РІРёС‚СЊ РїСѓРЅРєС‚С‹ РІС‚РѕСЂРѕРіРѕ СѓСЂРѕРІРЅСЏ",
        select_unselect_all_items: "Р’С‹РґРµР»РёС‚СЊ/РЎРЅСЏС‚СЊ РІС‹РґРµР»РµРЅРёРµ РґР»СЏ РІСЃРµС… РїСѓРЅРєС‚РѕРІ",
        twitter_no_supports_api: "РўРІРёС‚С‚РµСЂ Р±РѕР»СЊС€Рµ РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚ API СЃ РєРѕР»РёС‡РµСЃС‚РІРѕРј РїСѓР±Р»РёРєР°С†РёР№. CС‡РµС‚С‡РёРє РїСѓР±Р»РёРєР°С†РёР№ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊСЃСЏ РЅРµ Р±СѓРґРµС‚",
        success_message_edit_in_settings: 'Р—Р°РґР°С‚СЊ С‚РµРєСЃС‚ СЃРѕРѕР±С‰РµРЅРёСЏ РѕР± СѓСЃРїРµС…Рµ РІС‹ РјРѕР¶РµС‚Рµ РІ <a href="/projects/settings/?projectid=${projectid}#tab=ss_menu_payments" target="_blank" style="color:#fa633f;">РЅР°СЃС‚СЂРѕР№РєР°С… РїР»Р°С‚РµР¶РЅС‹С… СЃРёСЃС‚РµРј</a>',
        success_url_edit_in_settings: 'Р—Р°РґР°С‚СЊ URL СѓСЃРїРµС…Р° РІС‹ РјРѕР¶РµС‚Рµ РІ <a href="/projects/settings/?projectid=${projectid}#tab=ss_menu_payments" target="_blank" style="color:#fa633f;">РЅР°СЃС‚СЂРѕР№РєР°С… РїР»Р°С‚РµР¶РЅС‹С… СЃРёСЃС‚РµРј</a>',
        title: "Р—Р°РіРѕР»РѕРІРѕРє",
        link: "РЎСЃС‹Р»РєР°",
        block_is_on_current_page: "Р‘Р»РѕРє РЅР°С…РѕРґРёС‚СЃСЏ РЅР° С‚РµРєСѓС‰РµР№ СЃС‚СЂР°РЅРёС†Рµ",
        go_to_parent_page: "РџРµСЂРµР№С‚Рё Рє СЂРѕРґРёС‚РµР»СЊСЃРєРѕР№ СЃС‚СЂР°РЅРёС†Рµ",
        link_hook: "РЎСЃС‹Р»РєР° РґР»СЏ РїСЂРёРІСЏР·РєРё",
        popup_link: "РЎСЃС‹Р»РєР° РЅР° popup",
        enter_exact_address: "СѓРєР°Р¶РёС‚Рµ С‚РѕС‡РЅС‹Р№ Р°РґСЂРµСЃ СЃСЃС‹Р»РєРё, Рє РєРѕС‚РѕСЂРѕР№ РґРѕР»Р¶РЅР° Р±С‹С‚СЊ РїСЂРёРІСЏР·РєР°",
        use_as_link_in_any_block: "РёСЃРїРѕР»СЊР·СѓР№С‚Рµ РєР°Рє СЃСЃС‹Р»РєСѓ РІ Р»СЋР±РѕРј Р±Р»РѕРєРµ, РїРѕ РєР»РёРєСѓ РЅР° РєРѕС‚РѕСЂС‹Р№ РґРѕР»Р¶РµРЅ РїРѕРєР°Р·С‹РІР°С‚СЊСЃСЏ СЌС‚РѕС‚ РїРѕРїР°Рї",
        example_catalog: "РљР°С‚Р°Р»РѕРі-РїСЂРёРјРµСЂ",
        catalog_not_set: "РќРµ Р·Р°РґР°РЅ. (РџРѕРєР°Р·С‹РІР°С‚СЊ С‚РѕРІР°СЂС‹ РёР· Р±Р»РѕРєР°)",
        all_products: "Р’СЃРµ С‚РѕРІР°СЂС‹ РёР· РєР°С‚Р°Р»РѕРіР°",
        go_to_products_catalog: 'РџРµСЂРµР№С‚Рё РІ <a href="/identity/gostore/?projectid=${projectid}" target="_blank" ${catalogOnClickAttr}>РєР°С‚Р°Р»РѕРі С‚РѕРІР°СЂРѕРІ</a>',
        if_a_lot_of_products_use_catalog: 'Р•СЃР»Рё Сѓ РІР°СЃ РјРЅРѕРіРѕ С‚РѕРІР°СЂРѕРІ, РґР»СЏ СѓРїСЂР°РІР»РµРЅРёСЏ РёРјРё РёСЃРїРѕР»СЊР·СѓР№С‚Рµ <a href="/identity/gostore/?projectid=${projectid}" target="_blank" ${catalogOnClickAttr}>РєР°С‚Р°Р»РѕРі С‚РѕРІР°СЂРѕРІ</a>',
        feed_not_set: "РќРµ Р·Р°РґР°РЅ",
        example_feed: "РџРѕС‚РѕРє-РїСЂРёРјРµСЂ",
        feed: "РџРѕС‚РѕРє",
        go_to_feed_edit_panel: 'РџРµСЂРµР№С‚Рё РІ <a href="/identity/gofeeds/?projectid=${projectid}" target="_blank" ${feedsOnClickAttr}>СѓРїСЂР°РІР»РµРЅРёРµ РїРѕС‚РѕРєР°РјРё</a>',
        use_feeds_to_mange_news: 'РСЃРїРѕР»СЊР·СѓР№С‚Рµ РїРѕС‚РѕРєРё, С‡С‚РѕР±С‹ РІРµСЃС‚Рё Р»РµРЅС‚Сѓ РЅРѕРІРѕСЃС‚РµР№, Р±Р»РѕРі РёР»Рё РґСЂСѓРіСѓСЋ Р»РµРЅС‚Сѓ СЃРѕР±С‹С‚РёР№. РџРµСЂРµР№С‚Рё РІ <a href="/identity/gofeeds/?projectid=${projectid}" target="_blank" ${feedsOnClickAttr}>СѓРїСЂР°РІР»РµРЅРёРµ РїРѕС‚РѕРєР°РјРё</a>',
        setup_cart_data_in_analytics: "РћС‚РїСЂР°РІРєР° РєРѕСЂР·РёРЅС‹ РІ СЃРёСЃС‚РµРјРµ Р°РЅР°Р»РёС‚РёРєРё Р±СѓРґРµС‚ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊСЃСЏ, РєР°Рє РїСЂРѕСЃРјРѕС‚СЂ СЃС‚СЂР°РЅРёС†С‹",
        or: "РёР»Рё",
        submitting_from_in_analytics: "РћС‚РїСЂР°РІРєР° С„РѕСЂРјС‹ РІ СЃРёСЃС‚РµРјРµ Р°РЅР°Р»РёС‚РёРєРё Р±СѓРґРµС‚ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊСЃСЏ РєР°Рє РїСЂРѕСЃРјРѕС‚СЂ СЃС‚СЂР°РЅРёС†С‹: ",
        disable_payment: "Р’С‹РєР»СЋС‡РёС‚СЊ РѕРїР»Р°С‚Сѓ",
        connected_payment_system: "РЈСЃС‚Р°РЅРѕРІР»РµРЅР° РїР»Р°С‚РµР¶РЅР°СЏ СЃРёСЃС‚РµРјР°:",
        connected_payment_systems: "РЈСЃС‚Р°РЅРѕРІР»РµРЅС‹ РїР»Р°С‚РµР¶РЅС‹Рµ СЃРёСЃС‚РµРјС‹:",
        settings: "РќР°СЃС‚СЂРѕР№РєРё",
        connect_payment_system_in_settings: 'РџРѕРґРєР»СЋС‡РёС‚Рµ РїР»Р°С‚РµР¶РЅСѓСЋ СЃРёСЃС‚РµРјСѓ РІ <a href="/projects/settings/?projectid=${projectid}#tab=ss_menu_payments" style="color: #ff8562 !important;">РЅР°СЃС‚СЂРѕР№РєР°С… СЃР°Р№С‚Р°</a>',
        add_to_cart: "Р”РѕР±Р°РІРёС‚СЊ РІ РєРѕСЂР·РёРЅСѓ",
        if_you_use_catalog_enter_prod_id: 'Р•СЃР»Рё РІС‹ РёСЃРїРѕР»СЊР·СѓРµС‚Рµ <a href="/identity/gostore/?projectid=${projectid}" target="_blank" style="color: inherit">РєР°С‚Р°Р»РѕРі</a> вЂ“ СѓРєР°Р¶РёС‚Рµ РІ РїРѕР»Рµ ID С‚РѕРІР°СЂР°. ID РІС‹ РјРѕР¶РµС‚Рµ РЅР°Р№С‚Рё РІ РєР°С‚Р°Р»РѕРіРµ, РІ СЃР°РјРѕРј РЅРёР·Сѓ РїР°РЅРµР»Рё СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ С‚РѕРІР°СЂР°. Р­С‚Рѕ РїРѕР·РІРѕР»РёС‚ СЃРёРЅС…СЂРѕРЅРёР·РёСЂРѕРІР°С‚СЊ РґР°РЅРЅС‹Рµ: Р°СЂС‚РёРєСѓР», С†РµРЅСѓ, РєРѕР»РёС‡РµСЃС‚РІРѕ РІ РЅР°Р»РёС‡РёРё Рё РІР°СЂРёР°РЅС‚С‹.',
        fill_fields_from_catalog: '<a href="#" name="updateFromProductsCatalog" style="color: inherit">Р—Р°РїРѕР»РЅРёС‚СЊ РїРѕР»СЏ РґР°РЅРЅС‹РјРё С‚РѕРІР°СЂР°</a> РёР· РєР°С‚Р°Р»РѕРіР°.',
        cant_find_product_in_catalog: "РќРµ СѓРґР°РµС‚СЃСЏ РїРѕР»СѓС‡РёС‚СЊ С‚РѕРІР°СЂ РёР· РєР°С‚Р°Р»РѕРіР°. Р’РѕР·РјРѕР¶РЅРѕ РѕРЅ Р±С‹Р» СѓРґР°Р»РµРЅ РёР»Рё РѕС‚РєР»СЋС‡РµРЅ. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїСЂРѕРІРµСЂСЊС‚Рµ, С‡С‚Рѕ С‚РѕРІР°СЂ СЃ С‚Р°РєРёРј ID СЃСѓС‰РµСЃС‚РІСѓРµС‚.",
        you_connect_catalog_products_in_block: "Р’ РґР°РЅРЅРѕРј Р±Р»РѕРєРµ РїРѕРґРєР»СЋС‡РµРЅ РІС‹РІРѕРґ С‚РѕРІР°СЂРѕРІ РёР· РєР°С‚Р°Р»РѕРіР°. РўРѕРІР°СЂС‹ РґРѕР±Р°РІР»РµРЅРЅС‹Рµ РІ СЃР°РјРѕРј Р±Р»РѕРєРµ РЅРµ РІС‹РІРѕРґСЏС‚СЃСЏ.",
        copy_products_to_catalog: '<a href="javascript:edrec__copyproducts_to_catalog(${pageid},${recordid})" style="color:#fa8669;">РЎРєРѕРїРёСЂРѕРІР°С‚СЊ С‚РѕРІР°СЂС‹ РІ РєР°С‚Р°Р»РѕРі</a> РёР· РґР°РЅРЅРѕРіРѕ Р±Р»РѕРєР°.',
        form_data_receiver: "РџСЂРёРµРј РґР°РЅРЅС‹С… РёР· С„РѕСЂРјС‹",
        submitted_data_stored_in_leads: 'РћС‚РїСЂР°РІР»РµРЅРЅС‹Рµ РґР°РЅРЅС‹Рµ Р±СѓРґСѓС‚ С…СЂР°РЅРёС‚СЊСЃСЏ РІ <a href="https://tilda.cc/projects/leads/?projectid=${projectid}" target="_blank" style="color:#FF855D !important;">СЂР°Р·РґРµР»Рµ В«Р—Р°СЏРІРєРёВ»</a>. РўР°РєР¶Рµ РІС‹ РјРѕР¶РµС‚Рµ РїРѕРґРєР»СЋС‡РёС‚СЊ СЃРµСЂРІРёСЃС‹ РїСЂРёРµРјР° РґР°РЅРЅС‹С…, РёРЅС‚РµРіСЂРёСЂРѕРІР°РЅРЅС‹С… СЃ РўРёР»СЊРґРѕР№.',
        contacts_lists_and_services: "РљРѕРЅС‚Р°РєС‚РЅС‹Рµ Р»РёСЃС‚С‹ Рё СЃРµСЂРІРёСЃС‹",
        tilda_crm: "Tilda CRM",
        go_to_tilda_crm: 'РџРµСЂРµР№С‚Рё РІ <a href="https://tilda.cc/identity/gocrm/" target="_blank">Tilda CRM</a>',
        you_dont_have_any_list_yet: "РЈ Р’Р°СЃ РїРѕРєР° РЅРµС‚ РЅРё РѕРґРЅРѕРіРѕ Р»РёСЃС‚Р°",
        you_can_receive_data_to_email_and_others: 'Р’С‹ РјРѕР¶РµС‚Рµ РїРѕР»СѓС‡Р°С‚СЊ РґР°РЅРЅС‹Рµ РЅР° Email, РІ РґРѕРєСѓРјРµРЅС‚ Google РёР»Рё РІ СЃРµСЂРІРёСЃС‹, РёРЅС‚РµРіСЂРёСЂРѕРІР°РЅРЅС‹Рµ СЃ РўРёР»СЊРґРѕР№: MailChimp, GetResponse, UniSender, SendGrid, amoCRM, РњРµРіР°РїР»Р°РЅ Рё РґСЂСѓРіРёРµ. РџРѕРґРєР»СЋС‡РёС‚Рµ СЃРµСЂРІРёСЃ РґР»СЏ РїСЂРёРµРјР° РґР°РЅРЅС‹С… РІ РЅР°СЃС‚СЂРѕР№РєР°С… СЃР°Р№С‚Р°, <a href="/projects/settings/?projectid=${projectid}#tab=ss_menu_forms" target="_blank">СЂР°Р·РґРµР» Р¤РѕСЂРјС‹</a>. Р§РёС‚Р°Р№С‚Рµ <a href="https://help-ru.tilda.cc/forms" target="_blank">РїРѕРґСЂРѕР±РЅСѓСЋ РёРЅСЃС‚СЂСѓРєС†РёСЋ</a> РІ РЅР°С€РµРј РЎРїСЂР°РІРѕС‡РЅРѕРј С†РµРЅС‚СЂРµ.',
        anti_spam_activated: "Р—Р°С‰РёС‚Р° РѕС‚ СЃРїР°РјР° РІРєР»СЋС‡РµРЅР°.",
        create: "РЎРѕР·РґР°С‚СЊ",
        connected_services: "РџРѕРґРєР»СЋС‡РµРЅРЅС‹Рµ СЃРµСЂРІРёСЃС‹",
        you_havenot_connected_any_service_yet: "Р’С‹ РїРѕРєР° РЅРµ РїРѕРґРєР»СЋС‡РёР»Рё РЅРё РѕРґРЅРѕРіРѕ СЃРµСЂРІРёСЃР°",
        connect: "РџРѕРґРєР»СЋС‡РёС‚СЊ",
        own_script_for_forms: "РЎРІРѕР№ СЃРєСЂРёРїС‚ РґР»СЏ РїСЂРёРЅСЏС‚РёСЏ РґР°РЅРЅС‹С…",
        add_own_script_address: 'РќРµРѕР±С…РѕРґРёРјРѕ СѓРєР°Р·Р°С‚СЊ Р°РґСЂРµСЃ СЃРєСЂРёРїС‚Р°, РєРѕС‚РѕСЂС‹Р№ РїСЂРёРЅРёРјР°РµС‚ Р·РЅР°С‡РµРЅРёСЏ РёР· С„РѕСЂРјС‹. РљР°Рє РЅР°СЃС‚СЂРѕРёС‚СЊ РїСЂРёРµРј РґР°РЅРЅС‹С… РёР· С„РѕСЂРјС‹, <a href="https://help-ru.tilda.cc/forms/webhook" target="_blank">С‡РёС‚Р°Р№С‚Рµ РІ СЂР°Р·РґРµР»Рµ РџРѕРјРѕС‰СЊ</a>',
        form_target: "Р¦РµР»СЊ С„РѕСЂРјС‹",
        same_window: "Р’ СЌС‚РѕРј Р¶Рµ РѕРєРЅРµ",
        new_window: "Р’ РЅРѕРІРѕРј РѕРєРЅРµ",
        is_ajax_action_script: "РїРѕСЃС‹Р»Р°С‚СЊ РґР°РЅРЅС‹Рµ Р±РµР· РїРµСЂРµР·Р°РіСЂСѓР·РєРё СЃС‚СЂР°РЅРёС†С‹ (AJAX)",
        show_more_settings: "Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РЅР°СЃС‚СЂРѕР№РєРё",
        minimize_options: "РЎРІРµСЂРЅСѓС‚СЊ РґРѕРї. РЅР°СЃС‚СЂРѕР№РєРё",
        product_adding_was_successful: 'РўРѕРІР°СЂС‹ СѓСЃРїРµС€РЅРѕ СЃРєРѕРїРёСЂРѕРІР°РЅС‹. Р”РѕР±Р°РІР»РµРЅРѕ РїСЂРѕРґСѓРєС‚РѕРІ: ${prodNum}. РџРµСЂРµР№РґРёС‚Рµ РІ <a href="/identity/gostore/?projectid=${projectid}" target="_blank" style="color:inherit;">РєР°С‚Р°Р»РѕРі</a> Рё РїСЂРѕРІРµСЂСЊС‚Рµ СЂРµР·СѓР»СЊС‚Р°С‚ РІС‹РїРѕР»РЅРµРЅРёСЏ. РЎР°РјРё С‚РѕРІР°СЂС‹ РёР· СЌС‚РѕРіРѕ Р±Р»РѕРєР° РІС‹ РјРѕР¶РµС‚Рµ СѓРґР°Р»РёС‚СЊ РІСЂСѓС‡РЅСѓСЋ.',
        go_to_more_to_define_buttons: 'РўРµРєСЃС‚ РєРЅРѕРїРєРё РґР»СЏ С‚РѕРІР°СЂРѕРІ РёР· РєР°С‚Р°Р»РѕРіР° РІС‹ РјРѕР¶РµС‚Рµ РЅР°СЃС‚СЂРѕРёС‚СЊ РІРѕ РІРєР»Р°РґРєРµ "Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕ"',
        error_too_much_data: "РћС€РёР±РєР°: СЃР»РёС€РєРѕРј РјРЅРѕРіРѕ С‚РµРєСЃС‚Р°. РР·РјРµРЅРµРЅРёСЏ РЅРµ Р±СѓРґСѓС‚ СЃРѕС…СЂР°РЅРµРЅС‹. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, СѓРґР°Р»РёС‚Рµ С‡Р°СЃС‚СЊ РёРЅС„РѕСЂРјР°С†РёРё.",
        error_missing_end_tag: "РќРµ СѓРґР°Р»РѕСЃСЊ СЃРѕС…СЂР°РЅРёС‚СЊ, РїСЂРёСЃСѓС‚СЃС‚РІСѓРµС‚ РЅРµР·Р°РєСЂС‹С‚С‹Р№ С‚РµРі. РќРµРєРѕСЂСЂРµРєС‚РЅС‹Р№ HTML РјРѕР¶РµС‚ РїСЂРёРІРµСЃС‚Рё Рє РїСЂРѕР±Р»РµРјР°Рј СЃ РѕС‚РѕР±СЂР°Р¶РµРЅРёРµРј СЂР°Р·РјРµС‚РєРё СЃС‚СЂР°РЅРёС†С‹. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РёСЃРїСЂР°РІСЊС‚Рµ РїСЂРѕР±Р»РµРјСѓ.",
        redirect_prohibited_in_free_plan: 'РР·РІРёРЅРёС‚Рµ, СѓСЃС‚Р°РЅРѕРІРєР° СЂРµРґРёСЂРµРєС‚Р° Р·Р°РїСЂРµС‰РµРЅР° РЅР° Р±РµСЃРїР»Р°С‚РЅРѕРј С‚Р°СЂРёС„Рµ РёР»Рё С‚СЂРёР°Р»-РїРµСЂРёРѕРґРµ. РџРѕР¶Р°Р»СѓР№СЃС‚Р° РѕРїР»Р°С‚РёС‚Рµ РїРѕРґРїРёСЃРєСѓ, РїРµСЂРµР№РґСЏ РІ СЂР°Р·РґРµР» <a href="/identity/plan/" style="color:#fff;font-weight:600;">РўР°СЂРёС„С‹ Рё РѕРїР»Р°С‚Р°</a>',
        whatsapp_message_order: "РџСЂРёРІРµС‚! РҐРѕС‡Сѓ СЃРґРµР»Р°С‚СЊ Р·Р°РєР°Р·.",
        email_subject_order: "Р”РѕР±СЂС‹Р№ РґРµРЅСЊ! РҐРѕС‡Сѓ СЃРґРµР»Р°С‚СЊ Р·Р°РєР°Р·.",
        user: "РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ",
        group: "Р“СЂСѓРїРїР°",
        url: "РЎСЃС‹Р»РєР°",
        call: "Р—РІРѕРЅРѕРє",
        chat: "Р§Р°С‚",
        username: "Username",
        phone: "РќРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°",
        name: "РќР°Р·РІР°РЅРёРµ",
        message: "РўРµРєСЃС‚ СЃРѕРѕР±С‰РµРЅРёСЏ",
        email: "Р­Р»РµРєС‚СЂРѕРЅРЅР°СЏ РїРѕС‡С‚Р°",
        subject: "РўРµРјР° РїРёСЃСЊРјР°",
        delete_item: "РЈРґР°Р»РёС‚СЊ РїСѓРЅРєС‚",
        type: "РўРёРї",
        custom_icon: "РЎРІРѕСЏ РёРєРѕРЅРєР°",
        delete_image: "РЈРґР°Р»РёС‚СЊ РёР·РѕР±СЂР°Р¶РµРЅРёРµ",
        add_item: "Р”РѕР±Р°РІРёС‚СЊ РїСѓРЅРєС‚",
        new_item: "РќРѕРІС‹Р№ РїСѓРЅРєС‚",
        value_too_long: "РЎР»РёС€РєРѕРј РґР»РёРЅРЅРѕРµ Р·РЅР°С‡РµРЅРёРµ РїРѕР»СЏ",
        looks_like_not_email: "РљР°Р¶РµС‚СЃСЏ, СЌС‚Рѕ РЅРµ Р°РґСЂРµСЃ СЌР»РµРєС‚СЂРѕРЅРЅРѕР№ РїРѕС‡С‚С‹",
        looks_like_not_phone_number: "РљР°Р¶РµС‚СЃСЏ, СЌС‚Рѕ РЅРµ РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°",
        universal: "РЈРЅРёРІРµСЂСЃР°Р»СЊРЅС‹Рµ",
        messengers: "РњРµСЃСЃРµРЅРґР¶РµСЂС‹",
        social_media: "CРѕС†РёР°Р»СЊРЅС‹Рµ СЃРµС‚Рё",
        images_list: "РЎРїРёСЃРѕРє РёР·РѕР±СЂР°Р¶РµРЅРёР№",
        replace_image: "Р—Р°РјРµРЅРёС‚СЊ&nbsp;С„РѕС‚Рѕ",
        text: "РўРµРєСЃС‚",
        video: "Р’РёРґРµРѕ",
        upload_new: "Р”РѕР±Р°РІРёС‚СЊ С„Р°Р№Р»С‹",
        button_link: "РЎСЃС‹Р»РєР° РґР»СЏ РєРЅРѕРїРєРё",
        second_button_link: "РЎСЃС‹Р»РєР° РґР»СЏ РІС‚РѕСЂРѕР№ РєРЅРѕРїРєРё",
        third_button_link: "РЎСЃС‹Р»РєР° РґР»СЏ С‚СЂРµС‚СЊРµР№ РєРЅРѕРїРєРё",
        four_button_link: "РЎСЃС‹Р»РєР° РґР»СЏ С‡РµС‚РІРµСЂС‚РѕР№ РєРЅРѕРїРєРё",
        enter_full_link_address: 'РџРѕР¶Р°Р»СѓР№СЃС‚Р°, СѓРєР°Р·С‹РІР°Р№С‚Рµ РїРѕР»РЅС‹Р№ Р°РґСЂРµСЃ СЃСЃС‹Р»РєРё, РЅР°С‡РёРЅР°СЋС‰РёР№СЃСЏ СЃ http://<br>РЎСЃС‹Р»РєРё РЅР° РґСЂСѓРіРёРµ СЃС‚СЂР°РЅРёС†С‹ РІР°С€РµРіРѕ СЃР°Р№С‚Р° РјРѕР¶РЅРѕ РЅР°С‡РёРЅР°С‚СЊ СЃ / Рё РЅРµ СѓРєР°Р·С‹РІР°С‚СЊ Р°РґСЂРµСЃ СЃР°Р№С‚Р°. РџРѕРґСЂРѕР±РЅРµРµ: <a href="https://help-ru.tilda.cc/link-to-page" target="_blank">РљР°Рє РїРѕСЃС‚Р°РІРёС‚СЊ СЃСЃС‹Р»РєСѓ РЅР° РґСЂСѓРіСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ</a>',
        link_to_page: "Р’С‹Р±СЂР°С‚СЊ СЃС‚СЂР°РЅРёС†Сѓ",
        link_to_block: "Р’С‹Р±СЂР°С‚СЊ Р±Р»РѕРє",
        choose_page: "РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РІС‹Р±РµСЂРёС‚Рµ СЃС‚СЂР°РЅРёС†Сѓ:",
        select_block: "РљР»РёРєРЅРёС‚Рµ РЅР° РЅСѓР¶РЅС‹Р№ Р±Р»РѕРє",
        click_block_to_select: "РљР»РёРєРЅРёС‚Рµ РЅР° Р±Р»РѕРє, С‡С‚РѕР±С‹ РµРіРѕ РІС‹Р±СЂР°С‚СЊ.</b>",
        select_blocks_to_mark: "РљР»РёРєРЅРёС‚Рµ РЅР° РЅСѓР¶РЅС‹Р№ Р±Р»РѕРє, С‡С‚РѕР±С‹ РµРіРѕ РѕС‚РјРµС‚РёС‚СЊ",
        block_ids: "ID Р‘Р»РѕРєРѕРІ",
        set_blocks_divided_comma: 'РџРѕР¶Р°Р»СѓР№СЃС‚Р°, СѓРєР°Р¶РёС‚Рµ ID Р±Р»РѕРєРѕРІ С‡РµСЂРµР· Р·Р°РїСЏС‚СѓСЋ. <a href="https://help-ru.tilda.cc/design-menu#rec8321876" target="_blank">РџРѕРґСЂРѕР±РЅРµРµ...</a>',
        choose_blocks: "Р’С‹Р±СЂР°С‚СЊ Р±Р»РѕРєРё",
        wait_to_update_block: "РџРѕРґРѕР¶РґРёС‚Рµ 15 РјРёРЅСѓС‚, РїСЂРµР¶РґРµ С‡РµРј РѕР±РЅРѕРІР»СЏС‚СЊ Р»РµРЅС‚Сѓ СЃРЅРѕРІР°",
        error_block_content_update: "РџСЂРё РѕР±РЅРѕРІР»РµРЅРёРё Р»РµРЅС‚С‹ РїСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°.",
        instagram_connection: "РџРѕРґРєР»СЋС‡РµРЅРёРµ Instagram",
        images_from_instagram_updated_automatically_class_instagram: 'РџСЂРё РїРѕРґРєР»СЋС‡РµРЅРЅРѕРј Р°РєРєР°СѓРЅС‚Рµ С„РѕС‚РѕРіСЂР°С„РёРё РёР· Instagram РїРѕРєР°Р·С‹РІР°СЋС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё. РћР±РЅРѕРІР»РµРЅРёСЏ Рё РїРµСЂРµРїСѓР±Р»РёРєР°С†РёРё СЃС‚СЂР°РЅРёС†С‹ РЅРµ С‚СЂРµР±СѓРµС‚СЃСЏ. РљРѕР»РёС‡РµСЃС‚РІРѕ С„РѕС‚РѕРіСЂР°С„РёР№ РІ Р±Р»РѕРєРµ РЅР°СЃС‚СЂР°РёРІР°РµС‚СЃСЏ РІ РјРµРЅСЋ В«РќР°СЃС‚СЂРѕР№РєРёВ» СЌС‚РѕРіРѕ Р±Р»РѕРєР°. РџРѕРґРєР»СЋС‡Р°СЏ Р°РєРєР°СѓРЅС‚, РІС‹ РґР°РµС‚Рµ СЂР°Р·СЂРµС€РµРЅРёРµ С‚РѕР»СЊРєРѕ РЅР° РїРѕРєР°Р· С„РѕС‚РѕРіСЂР°С„РёР№ РЅР° СЃР°Р№С‚Рµ. РџСЂРёР»РѕР¶РµРЅРёРµ РЅРµ РёРјРµРµС‚ РґРѕСЃС‚СѓРї Рє СЃРѕРѕР±С‰РµРЅРёСЏРј Рё РЅРµ РјРѕР¶РµС‚ РїСѓР±Р»РёРєРѕРІР°С‚СЊ РёР»Рё СѓРґР°Р»СЏС‚СЊ РЅРёРєР°РєСѓСЋ РёРЅС„РѕСЂРјР°С†РёСЋ.РћР±РЅРѕРІР»РµРЅРёРµ Р»РµРЅС‚С‹ РїСЂРѕРёСЃС…РѕРґРёС‚ СЂР°Р· РІ РґРІР° С‡Р°СЃР°, РЅРѕ Р’С‹ РјРѕР¶РµС‚Рµ РѕР±РЅРѕРІРёС‚СЊ СЃРѕРґРµСЂР¶РёРјРѕРµ Р±Р»РѕРєР° <a href="#" class="js-update-instagram">РІСЂСѓС‡РЅСѓСЋ</a> СЂР°Р· РІ 15 РјРёРЅСѓС‚.</div>',
        you_connected_instagram_as: "Р’С‹ РїРѕРґРєР»СЋС‡РµРЅС‹ Рє Instagram, РєР°Рє ",
        disconnect_instagram: "РћС‚РєР»СЋС‡РёС‚СЊ Instagram",
        images_from_instagram_updated_automatically_class_facebook: 'РџСЂРё РїРѕРґРєР»СЋС‡РµРЅРЅРѕРј Р°РєРєР°СѓРЅС‚Рµ С„РѕС‚РѕРіСЂР°С„РёРё РёР· Instagram РїРѕРєР°Р·С‹РІР°СЋС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё. РћР±РЅРѕРІР»РµРЅРёСЏ Рё РїРµСЂРµРїСѓР±Р»РёРєР°С†РёРё СЃС‚СЂР°РЅРёС†С‹ РЅРµ С‚СЂРµР±СѓРµС‚СЃСЏ. РљРѕР»РёС‡РµСЃС‚РІРѕ С„РѕС‚РѕРіСЂР°С„РёР№ РІ Р±Р»РѕРєРµ РЅР°СЃС‚СЂР°РёРІР°РµС‚СЃСЏ РІ РјРµРЅСЋ В«РќР°СЃС‚СЂРѕР№РєРёВ» СЌС‚РѕРіРѕ Р±Р»РѕРєР°. РџРѕРґРєР»СЋС‡Р°СЏ Р°РєРєР°СѓРЅС‚, РІС‹ РґР°РµС‚Рµ СЂР°Р·СЂРµС€РµРЅРёРµ С‚РѕР»СЊРєРѕ РЅР° РїРѕРєР°Р· С„РѕС‚РѕРіСЂР°С„РёР№ РЅР° СЃР°Р№С‚Рµ. РџСЂРёР»РѕР¶РµРЅРёРµ РЅРµ РёРјРµРµС‚ РґРѕСЃС‚СѓРї Рє СЃРѕРѕР±С‰РµРЅРёСЏРј Рё РЅРµ РјРѕР¶РµС‚ РїСѓР±Р»РёРєРѕРІР°С‚СЊ РёР»Рё СѓРґР°Р»СЏС‚СЊ РЅРёРєР°РєСѓСЋ РёРЅС„РѕСЂРјР°С†РёСЋ.РћР±РЅРѕРІР»РµРЅРёРµ Р»РµРЅС‚С‹ РїСЂРѕРёСЃС…РѕРґРёС‚ СЂР°Р· РІ РґРІР° С‡Р°СЃР°, РЅРѕ Р’С‹ РјРѕР¶РµС‚Рµ РѕР±РЅРѕРІРёС‚СЊ СЃРѕРґРµСЂР¶РёРјРѕРµ Р±Р»РѕРєР° <a href="#" class="js-update-facebook">РІСЂСѓС‡РЅСѓСЋ</a> СЂР°Р· РІ 15 РјРёРЅСѓС‚.</div>',
        account: "Р’С‹Р±РѕСЂ Р°РєРєР°СѓРЅС‚Р°",
        connected_to_facebook_business_page: "Р’С‹ РїРѕРґРєР»СЋС‡РµРЅС‹ Рє Р±РёР·РЅРµСЃ-СЃС‚СЂР°РЅРёС†Рµ Facebook. Р’С‹Р±РµСЂРёС‚Рµ РёР· СЃРїРёСЃРєР° СЃС‚СЂР°РЅРёС†Сѓ Instagram, Р»РµРЅС‚Сѓ РєРѕС‚РѕСЂРѕР№ РЅРµРѕР±С…РѕРґРёРјРѕ РѕС‚РѕР±СЂР°Р·РёС‚СЊ РІ Р±Р»РѕРєРµ.",
        facebook_doesnt_connected_instagram: "РЈ РІС‹Р±СЂР°РЅРЅРѕР№ Р±РёР·РЅРµСЃ-СЃС‚СЂР°РЅРёС†С‹ Facebook РЅРµС‚ РїРѕРґРєР»СЋС‡РµРЅРЅС‹С… Instagram-Р°РєРєР°СѓРЅС‚РѕРІ",
        images_from_instagram_updated_automatically: "РџСЂРё РїРѕРґРєР»СЋС‡РµРЅРЅРѕРј Р°РєРєР°СѓРЅС‚Рµ С„РѕС‚РѕРіСЂР°С„РёРё РёР· Instagram РїРѕРєР°Р·С‹РІР°СЋС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё. РћР±РЅРѕРІР»РµРЅРёСЏ Рё РїРµСЂРµРїСѓР±Р»РёРєР°С†РёРё СЃС‚СЂР°РЅРёС†С‹ РЅРµ С‚СЂРµР±СѓРµС‚СЃСЏ. РљРѕР»РёС‡РµСЃС‚РІРѕ С„РѕС‚РѕРіСЂР°С„РёР№ РІ Р±Р»РѕРєРµ РЅР°СЃС‚СЂР°РёРІР°РµС‚СЃСЏ РІ РјРµРЅСЋ В«РќР°СЃС‚СЂРѕР№РєРёВ» СЌС‚РѕРіРѕ Р±Р»РѕРєР°. РџРѕРґРєР»СЋС‡Р°СЏ Р°РєРєР°СѓРЅС‚, РІС‹ РґР°РµС‚Рµ СЂР°Р·СЂРµС€РµРЅРёРµ С‚РѕР»СЊРєРѕ РЅР° РїРѕРєР°Р· С„РѕС‚РѕРіСЂР°С„РёР№ РЅР° СЃР°Р№С‚Рµ. РџСЂРёР»РѕР¶РµРЅРёРµ РЅРµ РёРјРµРµС‚ РґРѕСЃС‚СѓРї Рє СЃРѕРѕР±С‰РµРЅРёСЏРј Рё РЅРµ РјРѕР¶РµС‚ РїСѓР±Р»РёРєРѕРІР°С‚СЊ РёР»Рё СѓРґР°Р»СЏС‚СЊ РЅРёРєР°РєСѓСЋ РёРЅС„РѕСЂРјР°С†РёСЋ.</div>",
        connect_via_instagram: "РџРѕРґРєР»СЋС‡РёС‚СЊ С‡РµСЂРµР· Instagram",
        connect_only_one_instagram_account_this_button: "Р’ СЃР»СѓС‡Р°Рµ, РµСЃР»Рё Р’С‹ С…РѕС‚РёС‚Рµ РїРѕРґРєР»СЋС‡РёС‚СЊ С‚РѕР»СЊРєРѕ РѕРґРёРЅ Р»РёС‡РЅС‹Р№ РёР»Рё Р±РёР·РЅРµСЃ-Р°РєРєР°СѓРЅС‚ Instagram, РЅР°Р¶РјРёС‚Рµ РЅР° СЌС‚Сѓ РєРЅРѕРїРєСѓ. РџРѕСЃР»Рµ РЅР°Р¶Р°С‚РёСЏ РЅР° РєРЅРѕРїРєСѓ РѕС‚РєСЂРѕРµС‚СЃСЏ РѕРєРЅРѕ Р°РІС‚РѕСЂРёР·Р°С†РёРё, РІ РєРѕС‚РѕСЂРѕРј РЅРµРѕР±С…РѕРґРёРјРѕ СЂР°Р·СЂРµС€РёС‚СЊ РїСЂРёР»РѕР¶РµРЅРёСЋ РґРѕСЃС‚СѓРї Рє С„РѕС‚Рѕ.",
        connect_via_facebook: "РџРѕРґРєР»СЋС‡РёС‚СЊ С‡РµСЂРµР· Facebook",
        connect_multiple_business_instagram_accounts: "Р•СЃР»Рё Р’С‹ С…РѕС‚РёС‚Рµ РїРѕРґРєР»СЋС‡РёС‚СЊ СЃСЂР°Р·Сѓ РЅРµСЃРєРѕР»СЊРєРѕ Р±РёР·РЅРµСЃ-Р°РєРєР°СѓРЅС‚РѕРІ Instagram, Р’С‹ РјРѕР¶РµС‚Рµ РїСЂРёРІСЏР·Р°С‚СЊ РёС… Рє Р±РёР·РЅРµСЃ-СЃС‚СЂР°РЅРёС†Р°Рј Facebook, РїСЂРёРЅР°РґР»РµР¶Р°С‰РёРј РѕРґРЅРѕР№ Р»РёС‡РЅРѕР№ СЃС‚СЂР°РЅРёС†Рµ Facebook. РќР°Р¶РјРёС‚Рµ РЅР° СЌС‚Сѓ РєРЅРѕРїРєСѓ РґР»СЏ РїРѕРґРєР»СЋС‡РµРЅРёСЏ РІСЃРµС… Р±РёР·РЅРµСЃ-Р°РєРєР°СѓРЅС‚РѕРІ Instagram, СЃРІСЏР·Р°РЅРЅС‹С… СЃ Р»РёС‡РЅРѕР№ СЃС‚СЂР°РЅРёС†РµР№ Facebook. РџРѕСЃР»Рµ РЅР°Р¶Р°С‚РёСЏ РЅР° РєРЅРѕРїРєСѓ РѕС‚РєСЂРѕРµС‚СЃСЏ РѕРєРЅРѕ Р°РІС‚РѕСЂРёР·Р°С†РёРё, РІ РєРѕС‚РѕСЂРѕРј РЅРµРѕР±С…РѕРґРёРјРѕ СЂР°Р·СЂРµС€РёС‚СЊ РїСЂРёР»РѕР¶РµРЅРёСЋ РґРѕСЃС‚СѓРї Рє С„РѕС‚Рѕ.",
        more: "Р•С‰Рµ",
        geo_point: "РўРѕС‡РєР° РЅР° РєР°СЂС‚Рµ",
        marker_title: "Р—Р°РіРѕР»РѕРІРѕРє С‚РѕС‡РєРё",
        hover_over_marker: "РџРѕСЏРІР»СЏРµС‚СЃСЏ РїСЂРё РЅР°РІРµРґРµРЅРёРё РЅР° РѕС‚РјРµС‚РєСѓ",
        description: "РћРїРёСЃР°РЅРёРµ",
        click_on_marker: "РџРѕСЏРІР»СЏРµС‚СЃСЏ РїСЂРё РєР»РёРєРµ РїРѕ РѕС‚РјРµС‚РєРµ",
        latitude: "С€РёСЂРѕС‚Р°",
        longitude: "РґРѕР»РіРѕС‚Р°",
        delete: "РЈРґР°Р»РёС‚СЊ",
        find_on_map: "РќР°Р№С‚Рё РЅР° РєР°СЂС‚Рµ",
        input_address: "РЈРєР°Р¶РёС‚Рµ Р°РґСЂРµСЃ",
        latitude_first_letter_big: "РЁРёСЂРѕС‚Р°",
        longitude_first_letter_big: "Р”РѕР»РіРѕС‚Р°",
        variants_params: "РџР°СЂР°РјРµС‚СЂС‹",
        add_option_size_color: "Р”РѕР±Р°РІРёС‚СЊ РїР°СЂР°РјРµС‚СЂ (РЅР°РїСЂРёРјРµСЂ СЂР°Р·РјРµСЂ, С†РµРЅР° Рё С‚.Рґ)",
        option_name: "РќР°Р·РІР°РЅРёРµ РїР°СЂР°РјРµС‚СЂР°",
        color: "Р¦РІРµС‚",
        option_values: "Р—РЅР°С‡РµРЅРёСЏ РїР°СЂР°РјРµС‚СЂР°",
        set_variants: "РџРµСЂРµС‡РёСЃР»РёС‚Рµ РІР°СЂРёР°РЅС‚С‹, РѕС‚РґРµР»СЏСЏ РёС… РїРµСЂРµРЅРѕСЃРѕРј СЃС‚СЂРѕРєРё",
        prodopt_descr: 'Р”Р»СЏ С‚РѕРіРѕ, С‡С‚РѕР±С‹ СѓРєР°Р·Р°С‚СЊ РїР°СЂР°РјРµС‚СЂС‹ С‚РѕРІР°СЂР°, РЅР°РїРёС€РёС‚Рµ РЅР°Р·РІР°РЅРёРµ РїР°СЂР°РјРµС‚СЂР° Рё РІ РїРѕР»Рµ В«Р·РЅР°С‡РµРЅРёРµ РїР°СЂР°РјРµС‚СЂР°В» РїРµСЂРµС‡РёСЃР»РёС‚Рµ РІР°СЂРёР°РЅС‚С‹, РѕС‚РґРµР»СЏСЏ РёС… РїРµСЂРµРЅРѕСЃРѕРј СЃС‚СЂРѕРєРё.<a href="javascript:showprodoptionshint();" data-prodoptions-morehintbutton="" style="color:#fa8669 !important;">РџРѕРґСЂРѕР±РЅРµРµ...</a><span data-prodoptionshint="" style="display:none;">РќР°РїСЂРёРјРµСЂ:<br>РЎРµСЂС‹Р№<br>РЎРёРЅРёР№<br>РљСЂР°СЃРЅС‹Р№<br><br>Р•СЃР»Рё С†РµРЅР° СЂР°Р·РЅС‹С… РїР°СЂР°РјРµС‚СЂРѕРІ РѕС‚Р»РёС‡Р°РµС‚СЃСЏ РѕС‚ РѕСЃРЅРѕРІРЅРѕР№, РЅР°РїСЂРѕС‚РёРІ Р·РЅР°С‡РµРЅРёСЏ РїР°СЂР°РјРµС‚СЂР° РїРѕСЃС‚Р°РІСЊС‚Рµ Р·РЅР°Рє = Рё СѓРєР°Р¶РёС‚Рµ С†РµРЅСѓ РїР°СЂР°РјРµС‚СЂР° (С‚РѕР»СЊРєРѕ С†РёС„СЂС‹, Р±РµР· РІР°Р»СЋС‚С‹). РќР°РїСЂРёРјРµСЂ:<br>РЎС‚Р°РЅРґР°СЂС‚РЅС‹Р№<br>Р‘РѕР»СЊС€РѕР№ 5000 СЂСѓР±. = 5000<br><br>Р•СЃР»Рё Рє РѕСЃРЅРѕРІРЅРѕР№ С†РµРЅРµ РЅСѓР¶РЅРѕ РґРѕР±Р°РІРёС‚СЊ РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅСѓСЋ СЃС‚РѕРёРјРѕСЃС‚СЊ, РїРѕСЃС‚Р°РІСЊС‚Рµ Р·РЅР°Рє =+ Рё СѓРєР°Р¶РёС‚Рµ РЅР°РґР±Р°РІРєСѓ (С‚РѕР»СЊРєРѕ С†РёС„СЂС‹, Р±РµР· РІР°Р»СЋС‚С‹). РќР°РїСЂРёРјРµСЂ:<br>РЎС‚Р°РЅРґР°СЂС‚РЅР°СЏ СѓРїР°РєРѕРІРєР°<br>РџРѕРґР°СЂРѕС‡РЅР°СЏ СѓРїР°РєРѕРІРєР° 300 СЂСѓР±. = +300</span>',
        add_option: "Р”РѕР±Р°РІРёС‚СЊ РїР°СЂР°РјРµС‚СЂ",
        second_option_name: "РќР°Р·РІР°РЅРёРµ РІС‚РѕСЂРѕРіРѕ РїР°СЂР°РјРµС‚СЂР°",
        size: "Р Р°Р·РјРµСЂ",
        second_option_values: "Р—РЅР°С‡РµРЅРёСЏ РІС‚РѕСЂРѕРіРѕ РїР°СЂР°РјРµС‚СЂР°",
        third_option_name: "РќР°Р·РІР°РЅРёРµ С‚СЂРµС‚СЊРµРіРѕ РїР°СЂР°РјРµС‚СЂР°",
        third_option_values: "Р—РЅР°С‡РµРЅРёСЏ С‚СЂРµС‚СЊРµРіРѕ РїР°СЂР°РјРµС‚СЂР°",
        item: "РљРђР РўРћР§РљРђ",
        duplicate: "Р”СѓР±Р»РёСЂРѕРІР°С‚СЊ",
        on: "Р’РєР»СЋС‡РёС‚СЊ",
        off: "Р’С‹РєР»СЋС‡РёС‚СЊ",
        up: "Р’РІРµСЂС…",
        down: "Р’РЅРёР·",
        button_title: "РќР°Р·РІР°РЅРёРµ РєРЅРѕРїРєРё",
        second_button_title: "РќР°Р·РІР°РЅРёРµ РІС‚РѕСЂРѕР№ РєРЅРѕРїРєРё",
        product_service_price: "РЎС‚РѕРёРјРѕСЃС‚СЊ СѓСЃР»СѓРіРё/С‚РѕРІР°СЂР°",
        old_price: "РЎС‚Р°СЂР°СЏ С†РµРЅР°",
        card_mark: "РћС‚РјРµС‚РєР° РЅР° РєР°СЂС‚РѕС‡РєРµ (РЅР°РїСЂРёРјРµСЂ: sale, new, -30%)",
        soclinks: "РЎСЃС‹Р»РєРё РЅР° РїСЂРѕС„РёР»Рё РІ СЃРѕС†.СЃРµС‚СЏС…",
        currency_sign_added_automatically: "Р—РЅР°Рє РІР°Р»СЋС‚С‹ РґРѕР±Р°РІР»СЏРµС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё. РР·РјРµРЅРёС‚СЊ РІР°Р»СЋС‚Сѓ РјРѕР¶РЅРѕ РІ РќР°СЃС‚СЂРѕР№РєР°С… СЃР°Р№С‚Р°.",
        select_geo_area: "Р’С‹Р±СЂР°С‚СЊ РіРµРѕ СЂРµРіРёРѕРЅ",
        add_soclinks_comma_separator: "Р”РѕР±Р°РІСЊС‚Рµ СЃСЃС‹Р»РєРё РЅР° СЃРѕС†СЃРµС‚Рё С‡РµСЂРµР· Р·Р°РїСЏС‚СѓСЋ. РќР°РїСЂРёРјРµСЂ, <i>https://medium.com/@TildaPublishing, mailto:team@tilda.cc, tel:11234567890</i>",
        subtitle: "РџРѕРґР·Р°РіРѕР»РѕРІРѕРє",
        date: "Р”Р°С‚Р°",
        time: "Р’СЂРµРјСЏ",
        person_name: "РРјСЏ РїРµСЂСЃРѕРЅС‹",
        person_descr: "РРЅС„РѕСЂРј. Рѕ РїРµСЂСЃРѕРЅРµ",
        put_product_options: "РџРµСЂРµС‡РёСЃР»РёС‚Рµ РІР°СЂРёР°РЅС‚С‹ С‚РѕРІР°СЂР°, РѕС‚РґРµР»СЏСЏ РёС… РїРµСЂРµРЅРѕСЃРѕРј СЃС‚СЂРѕРєРё. Р•СЃР»Рё РІР°СЂРёР°РЅС‚ РёРјРµРµС‚ СЃРІРѕСЋ С†РµРЅСѓ, РїРѕСЃС‚Р°РІСЊС‚Рµ Р·РЅР°Рє = Рё СѓРєР°Р¶РёС‚Рµ С†РµРЅСѓ (С‚РѕР»СЊРєРѕ С†РёС„СЂС‹, Р±РµР· Р·РЅР°РєР° РІР°Р»СЋС‚С‹). РќР°РїСЂРёРјРµСЂ: Р‘РѕР»СЊС€РѕР№ СЂР°Р·РјРµСЂ 1000 СЂСѓР±. = 1000",
        options: "РћРїС†РёРё",
        product_link: "РЎСЃС‹Р»РєР° c РєР°СЂС‚РѕС‡РєРё С‚РѕРІР°СЂР°",
        link_on_page: "РЎСЃС‹Р»РєР° РЅР° СЃС‚СЂР°РЅРёС†Сѓ",
        view_full_product_info: "РџРѕРґСЂРѕР±РЅРµРµ Рѕ С‚РѕРІР°СЂРµ",
        image: "РР·РѕР±СЂР°Р¶РµРЅРёРµ",
        checkbox: "Checkbox",
        more_with_dots: "Р•С‰Рµ...",
        hide: "РЎРІРµСЂРЅСѓС‚СЊ",
        too_much_data_in_input: "РџСЂРµРґСѓРїСЂРµР¶РґРµРЅРёРµ: РІ РїРѕР»Рµ СЃР»РёС€РєРѕРј РјРЅРѕРіРѕ С‚РµРєСЃС‚Р°. РњС‹ СЂРµРєРѕРјРµРЅРґСѓРµРј РµРіРѕ СЃРѕРєСЂР°С‚РёС‚СЊ.",
        error_too_much_data_in_input_field: "РћС€РёР±РєР°: РІ РїРѕР»Рµ СЃР»РёС€РєРѕРј РјРЅРѕРіРѕ С‚РµРєСЃС‚Р°. РР·РјРµРЅРµРЅРёСЏ РЅРµ Р±СѓРґСѓС‚ СЃРѕС…СЂР°РЅРµРЅС‹. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, СѓРґР°Р»РёС‚Рµ С‡Р°СЃС‚СЊ РёРЅС„РѕСЂРјР°С†РёРё."
    } : {};
    window.edrec__dict || (window.edrec__dict = {}), window.edrec__dict[e] = t
}
edrec__editRecordInit(), jQuery.loadScript = function(e, t) {
    jQuery.ajax({
        url: e,
        dataType: "script",
        success: t,
        async: !0
    })
};
