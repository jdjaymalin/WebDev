<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>URL Shortener</title>
 
    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
    <link href="{{ URL::asset('css/app.css') }}" rel="stylesheet" type="text/css" >

  </head>
  <body>
    
    <div class="top">
    </div>
    <div class="container">
    <div class="row clearfix">
      <div class="col-md-6 col-md-offset-3">
        <div class="helper">
          <h1 style="text-align:center;">Sorry. We couldn't find the page you were looking for. </h1>
          <a href="{!! Url::to('/') !!}" class="btn">Shorten another URL</a>
        </div>
      </div>
    </div>
  </div>
  
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
  </body>
</html>
