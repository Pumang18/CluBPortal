const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

// $('#InfoBanner').fadeIn('fast').delay(1000).fadeOut('fast');
// $('#InfoBanner').fadeIn('slow').delay(1000).hide(0);
// $("#InfoBanner").fadeTo(15000,1).fadeOut(1000);

var opacity=0;
    var intervalID=0;
    window.onload=fadeout;
        function fadeout(){
            setInterval(hide, 200);
        }
    function hide(){
        var body=document.getElementById("InfoBanner");
        opacity =
    Number(window.getComputedStyle(body).getPropertyValue("opacity"))
      
            if(opacity>0){
                opacity=opacity-0.1;
                        body.style.opacity=opacity
            }
            else{
                clearInterval(intervalID);
            }
        }
