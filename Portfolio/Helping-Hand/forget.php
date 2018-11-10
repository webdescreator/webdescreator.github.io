<?php
include("connection.php");
if(isset($_POST['forget']))
{
	$email=$_POST['email'];
	$cont=$_POST['contact'];
	
	$sql="select * from login where email='$email' and phone='$cont'";
	$result=mysqli_query($con,$sql);
	$status=mysqli_num_rows($result);
	
	if($status)
	{		
		session_start();
		$_SESSION['email']=$email;
		$_SESSION['active']="on";
		$id=session_id();
		header("location:newpassword.php?".$email);
	}
	else
	{
		$error="Email or mobile no is incorrect";
	}
	
}
?>
<html>
<body>
<center>
<form name="fp" method="post" id="fp1" enctype="multipart/form-data" action="<?php $_SERVER['PHP_SELF'] ?>">
<table>
<tr>
<td colspan="2" style="color: red">
	
	<?php 
	if(isset($error))
	{
		echo($error);
	}
	?>
	
</td>
	    
</tr>

<tr>
<td>Email</td>
<td><input type="text" name="email"></td>
</tr>
<tr>
<td>Contact</td>
<td><input type="text" name="contact"></td>
</tr>
</table>
<input type="submit" name="forget" value="submit">
<a href="checkout.php"><b>Back</b></a>
</form>
</center>
</body>
</html>