<!DOCTYPE HTML5>
<html>

<head>
	<meta charset="utf-8">
	<meta name="keyword" content="homepage">
	<link rel="shortcut icon" type="image/x-icon" href="icon.ico">
	<link href="Search.css" rel="stylesheet" type="text/css">
</head>

<body>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
	
	<h1>Animal Image Reverse Search</h1>
	<p>Please operate buttons in decent order</p>
	
	<form runrat="server" enctype="multipart/form-data" method="post">
		<input type="file" accept="image/*" name="output" onchange="loadFile(event)"><br>
		<img id='output'>
		<br><input type="submit" name="upload" class="button" value="Upload"/> 
		
		<script>

			// process the function by onclick
			var loadFile = function (event) {

				// grasp the uploaded image by ID and its info
				var output = document.getElementById('output');
				output.src = URL.createObjectURL(event.target.files[0]);
				
				// use canvas to display uploaded image
				output.onload = function () {
					var canvas = document.createElement('canvas')
					canvas.width = output.width
					canvas.height = output.height
					var context = canvas.getContext('2d')
					context.drawImage(output, 0, 0, output.width, output.height)
				};
			};
			
			
		</script>
		
	</form>
	<script>
		var Reload = function(){
			location.reload();
		}
		var Process = function(){				
			var out = "<?php echo exec("node C:/wamp64/www/test.js"); ?>";
			window.open("https://www.google.com/search?q=" + out + "&rlz=1C1NHXL_zh-TWTW762TW762&oq=dog&aqs=chrome..69i57j0i433l2j0i131i433j0i433j69i60l2j69i61.1276j0j9&sourceid=chrome&ie=UTF-8")
		};
	</script>
	<?php
	if(array_key_exists('upload', $_POST)) { 
            move(); 
		}
	function move(){	 
		# Check for uploading
		if ($_FILES['output']['error'] === UPLOAD_ERR_OK){
			echo '檔案名稱: ' . $_FILES['output']['name'] . '<br/>';
			echo '檔案類型: ' . $_FILES['output']['type'] . '<br/>';
			echo '檔案大小: ' . ($_FILES['output']['size'] / 1024) . ' KB<br/>';
			echo '暫存名稱: ' . $_FILES['output']['tmp_name'] . '<br/>';
			# Check for Existence
			if (file_exists('C:/wamp64/www/upload/' . $_FILES['output']['name'])){
				echo '檔案已存在。<br/>';
			} else {
				$file = $_FILES['output']['tmp_name'];
				$dest = 'C:/wamp64/www/upload/' . $_FILES['output']['name'];
				# Move file and rename
				move_uploaded_file($file, $dest);
				rename($dest, "C:/wamp64/www/upload/image.jpg");
			}
		} else {
		echo '錯誤代碼：' . $_FILES['output']['error'] . '<br/>';
		}
	}
	?><br>
	<button onclick="Reload()">Data Settlement</button><br>
	<button onclick="Process()">Process</button>

</body>
<footer>
	<input type="button" id = "id1" value="Back To Homepage" onclick="location.href='./enter/enter.html'">
	<input type="button" id = "id2" value="Back To Previous Page" onclick="history.back()">
</footer>
</html>