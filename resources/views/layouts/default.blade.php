<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>@yield('title', 'txmicroblog')_腾讯微博</title>
	<link rel="stylesheet" href="/css/app.css">
</head>
<body>
	@include('layouts._header')

	<div class="container">
	  <div class="col-md-offset-1 col-md-10">
		@yield('content')
		
	  </div>
	</div>

	@include('layouts._footer')
</body>
</html>