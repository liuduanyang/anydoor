<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
    <style>
        body{
            margin:30px;
        }
        a{
            font-size:25px;
            font-weight:blod;
            text-decoration:none;
            color:black;
            margin-right:30px;
        }
        a:hover{
            text-decoration:underline;
        }
    </style>
</head>
<body>
    {{#each fileList}}
        <a href="{{../dir}}/{{this}}">{{this}}</a>
    {{/each}}
</body>
</html>