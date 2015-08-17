<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>URL Shortener</title>
 
    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
 
  </head>
  <body>
    
    <div class="container">
    <div class="row clearfix">
      <div class="col-md-6 col-md-offset-3">
        <h2 style="text-align:center;"> URL Shortener </h2>
 
        {{ Form::open(array('url' => '/', 'method' => 'post')) }}
 
        <div class="form-group">
          {{
            Form::text('url', Input::old('url'),array('class' => 'form-control', 'placeholder' => 'Insert your Urls and press enter', 'required' => 'required'))
          }}
        </div>
 
        {{ Form::close() }}
 
      </div>
    </div>
  </div>
 
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
  </body>
</html>
