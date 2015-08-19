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
    <div class="container">
    <div class="row clearfix">
      <div class="col-md-6 col-md-offset-3">
        <div class="helper">
          <h1 style="text-align:center;"> SHORTURR: SHORTEN YOUR URL </h1>
 
        {!! Form::open(array('url' => '/', 'method' => 'post')) !!}
 
        <div class="form-group">
          {!!
            Form::text('url', Input::old('url'),array('class' => 'form-control', 'placeholder' => 'Enter a link to shorten it', 'required' => 'required'))
          !!}
        </div>
 
        {!! Form::close() !!}

          @if( Session::has('url') )
            <input class="valid" type="text" value="{{ Session::get('url') }}" readonly>
          @elseif ( Session::has('error') )
            <input class="invalid" type="text" value="Invalid Url" readonly>
          @endif
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
