

function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  sidebar.style.right = sidebar.style.right === '0px' ? '-250px' : '0px';
}

// Event listener for the menu icon
document.getElementById('menu-icon').addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent click from propagating to the document
  toggleSidebar();
});

// Event listener to hide sidebar if clicked outside of it
document.addEventListener('click', function(event) {
  var sidebar = document.getElementById('sidebar');
  if (event.target !== sidebar && !sidebar.contains(event.target)) {
    sidebar.style.right = '-250px';
  }
});

// Prevent sidebar from closing when clicking inside it
document.getElementById('sidebar').addEventListener('click', function(event) {
  event.stopPropagation();
});


const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const contactForm = document.getElementById('contact-form');
const errorElement = document.getElementById('error');
const successMsg = document.getElementById('success-msg');
const submitBtn = document.getElementById('submit');
const phone = document.getElementById('phone');
 


var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
function sendEmail(){

  let ebody = `<b>Nom : </b> ${name.value}
  <br>
  <b>Email : </b>${email.value}
  <br>
  <b>Numéro : </b>${phone.value}
  <br>
  <b>Message :</b>${message.value}
  `
  Email.send({
    SecureToken : "774437ee-c0e4-4f9b-b361-87d20389741c",
    To : [
      'ahmed@awlsprod.com',
      'bedisbaccarpro@gmail.com'
    ] ,
    From : "uniterwp@gmail.com",
    Subject : "[Demande de devis]",
    Body : ebody
  
  }).then(
  message => alert(message)
  ); 
  
  }
  const validate = (e) => {
    e.preventDefault();
   
    if (name.value.length < 3) {
      errorElement.innerHTML = 'Your name should be at least 3 characters long.';
      return false;
    } 
    
    if (!(email.value.includes('.') && (email.value.includes('@')))) {
      errorElement.innerHTML = 'Please enter a valid email address.';
      return false;
    } 
  
    if (!emailIsValid(email.value)) {
      errorElement.innerHTML = 'Please enter a valid email address.';
      return false;
    }
  
    if (message.value.length < 15) {
      errorElement.innerHTML = 'Please write a longer message.';
      return false;
    }
  
    errorElement.innerHTML = '';
    successMsg.innerHTML = 'Thank you! I will get back to you as soon as possible.'; 
  
    e.preventDefault();
    setTimeout(function () {
      successMsg.innerHTML = '';
      document.getElementById('contact-form').reset();
      
    }, 6000);
    sendEmail();
    return true;
  
  }
  
  const emailIsValid = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  submitBtn.addEventListener('click', validate);
  