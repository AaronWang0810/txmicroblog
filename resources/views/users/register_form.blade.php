<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>注册框</title>
	<link rel="stylesheet" href="/css/box.css">
</head>
<body>
	<div class="login" id="login" style="height: 910px; margin: 0 auto; border: 2px solid #eee; position: relative;">
	  <div class="error_tips" id="error_tips" style="display: none;">
	  	<span class="error_logo" id="error_logo"></span>
	  	<span class="err_m" id="err_m"></span>
	  </div>
	  <div class="web_qr_login" id="web_qr_login" style="display: block;">
	  	<div class="web_qr_login_show" id="web_qr_login_show">
	  	  <div class="web_login" id="web_login">
	  	  	<div class="tips" id="tips">
	  	  	  <div class="title" id="title_2">微博帐号注册</div>
	  	  	  <div class="login_form">
	  	  	  	<form id="loginform" autocomplete="off" name="loginform" action="" method="post" target="1" style="margin: 0px;">
	  	  	  	  <div class="uinArea" id="uinArea">
	  	  	  	  	<label class="input_tips" id="uin_tips" for="u" style="display: block;">支持微博帐号/QQ号/邮箱/手机号注册</label>
	  	  	  	  	<div class="inputOuter" id="inputOuter_u">
	  	  	  	  	  <input type="text" class="inputstyle" id="username" name="username" tabindex="1" onclick="select_u()" onblur="hide_u()" onkeydown="import_u()">
	  	  	  	  	  <a class="uin_del" id="uin_del" href="javascript:void(0);" style="display: none;" onclick="del_u()"></a>
	  	  	  	  	</div>
	  	  	  	  </div>
	  	  	  	  <div class="pwdArea" id="pwdArea">
	  	  	  	  	<label class="input_tips" id="pwd_tips" for="p" style="display: block;">密码</label>
	  	  	  	  	<div class="inputOuter" id="inputOuter_p">
	  	  	  	  	  <input type="password" class="inputstyle password" id="password" name="password" maxlength="16" tabindex="2" onclick="select_p()" onblur="hide_p()" onkeydown="import_p()">
	  	  	  	  	  <div class="lock_tips" id="caps_lock_tips" style="display: none;"></div>
	  	  	  	  	</div>
	  	  	  	  </div>
	  	  	  	  <div class="submit">
	  	  	  	  	<a class="login_button" href="javascript:void(0);" hidefocus="true">
	  	  	  	  	  <input type="submit" tabindex="6" value="开通微博" class="btn" id="login_button">
	  	  	  	  	</a>
	  	  	  	  </div>
	  	  	  	</form>
	  	  	  </div>
	  	  	</div>
	  	  </div>
	  	  <div style="border: 1px solid #eee; margin-top: 102px"></div>
	  	</div>
	  </div>
	</div>
</body>
</html>
<script src="/js/jquery-3.3.1.min.js"></script>
<script>
function select_u() {
	$("#uin_tips").removeClass("input_tips");
	$("#uin_tips").addClass("input_tips_focus");
	$("#inputOuter_u").removeClass("inputOuter");
	$("#inputOuter_u").addClass("inputOuter_focus");
}

function hide_u() {
	$("#uin_tips").removeClass("input_tips_focus");
	$("#uin_tips").addClass("input_tips");
	$("#inputOuter_u").removeClass("inputOuter_focus");
	$("#inputOuter_u").addClass("inputOuter");
}

function import_u() {
	var u = $("#username").val();
	if (u != '') {
		$("#uin_tips").css("display", "none");
		$("#uin_del").css("display", "block");
	} else {
		$("#uin_tips").css("display", "block");
		$("#uin_del").css("display", "none");
	}
}

function del_u() {
	$("#username").val("");
	$("#uin_tips").css("display", "block");
	$("#uin_del").css("display", "none");
}

function select_p() {
	$("#pwd_tips").removeClass("input_tips");
	$("#pwd_tips").addClass("input_tips_focus");
	$("#inputOuter_p").removeClass("inputOuter");
	$("#inputOuter_p").addClass("inputOuter_focus");
}

function hide_p() {
	$("#pwd_tips").removeClass("input_tips_focus");
	$("#pwd_tips").addClass("input_tips");
	$("#inputOuter_p").removeClass("inputOuter_focus");
	$("#inputOuter_p").addClass("inputOuter");
}

function import_p() {
	var p = $("#password").val();
	if (p != '') {
		$("#pwd_tips").css("display", "none");
	} else {
		$("#pwd_tips").css("display", "block");
	}
}

</script>