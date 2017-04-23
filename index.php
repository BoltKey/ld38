<head>
<meta charset="utf-8" />
<title>Earth escape game</title>
<link rel="shortcut icon" href="/boltlogo.png">
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<link href="style.css" rel="stylesheet">
<?php 
foreach (glob("game/*.js") as $filename)
{
    echo '<script type="text/javascript" src='.$filename.'></script>
';
} 
?>
<script> var logo; window.onload = function(){window.logo = BKLogo(main)}; </script>
</head>
<body style="margin: 0">
<canvas style="background-color:#000000;" class="unselectable" id="game" draggable="false" align="center" width="500" height="500">Your browser does not support canvas. Use Chrome instead.</canvas>
</body>