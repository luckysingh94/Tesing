<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
</head>
<body>
<div class="wrapper m-t-30" style="margin-top: 150px">
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-4">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center">
                            <label class="font-weight-bold font-16 text-center">Sign In</label>
                        </div>
                        <form action="{{route('signin')}}" class="form-horizontal _form">
                            {{csrf_field()}}
                            <div class="form-body">
                                <div class="form-group">
                                    <input type="text" class="form-control _username" name="_username" title="username" placeholder="Enter username" required>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control _pass" name="_pass" title="username" placeholder="Enter Password" required>
                                </div>
                                <div class="form-group text-right m-0">
                                    <button class="btn btn-success">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{asset('js/jquery-3.2.1.min.js')}}"></script>
<script src="{{asset('js/custom.form.js')}}"></script>
</body>
</html>
