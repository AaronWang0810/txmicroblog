<header class="navbar navbar-fixed-top navbar-inverse">
  <div class="container">
    <div class="col-md-offset-1 col-md-10">
      <a href="/" id="logo">腾讯微博</a>
      <nav>
        <ul class="nav navbar-nav navbar-left">
          <li>
          	<a href="{{ route('home') }}">
          	  <span>首页</span>
          	  <i></i>
          	</a>
          </li>
        </ul>
      </nav>
      <nav>
        <ul class="nav navbar-nav navbar-right">
          <li class="nav_item">
          	<a href="{{ route('mentions') }}">
          	  <span class="t mentions">@提到我的</span>
          	</a>
          </li>
          <li class="nav_item">
          	<a href="{{ route('message') }}">
          	  <span class="t message">私信</span>
          	</a>
          </li>
          <li class="nav_item">
          	<a href="{{ route('audience') }}">
          	  <span class="t audience">听众</span>
          	</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</header>