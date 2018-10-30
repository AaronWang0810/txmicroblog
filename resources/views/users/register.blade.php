<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>微博注册入口_腾讯微博</title>
	<link rel="stylesheet" href="/css/register.css">
</head>
<body>
	<div id="headWrap">
	  <h1 id="logo"><a href="{{ route('login') }}" title="http://txmicroblog.com">腾讯微博</a></h1>
	</div>
	<div id="mainWrapper">
	  <div class="pageTit">
	  	<h2>立即注册腾讯微博</h2>
	  	<p class="desc">您可以通过以下任意一种方式获得微博账号</p>
	  </div>
	  <div class="cWrap">
	  	<div class="method clear">
	  	  <i class="iconQQ"></i>
	  	  <div class="inner">
	  	  	<div class="tBar"><h2>微博注册</h2></div>
	  	  	<div class="registerBox">
	  	  	  <div id="web_login2">
	  	  	  	<iframe allowtransparency="true" frameborder="0" name="register_frame" id="register_frame" width="374px" height="320px" scrolling="no" src="{{ route('register_form') }}"></iframe>
	  	  	  </div>
	  	  	</div>
	  	  </div>
	  	</div>
	  </div>
	  <div class="wrapper fshadow"></div>
	</div>
	<div id="Copyright">
	  <div class="wrapper">Copyright © 1998 - 2018 Tencent. All Rights Reserved</div>
	</div>
</body>
</html>