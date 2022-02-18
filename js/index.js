// nullify the global reference while instrumenting the form
StaticEmail = (function (StaticEmail) {
  // we don't know when window.recaptcha will be called,
  // so we use a promise to simplify our workflow
  var captcha = new Promise(function (resolve) {
    window.recaptcha = function () {
      // resolve passing the widget id along
      resolve(
        grecaptcha.render('recaptcha', {
          // the SITE KEY reCAPTCHA provided
          sitekey : '6LdV0oQeAAAAAKk6R2mrBmnEN908uZ6XhtPt9wTQ'
        })
      );
    };
  });
  contact.addEventListener('submit', function (event) {
    event.preventDefault();
    var from = contact.from.value.trim();
    var md = contact.md.value.trim();
    var name = contact.name.value.trim();
    var subject = contact.subject.value.trim();
    // optional params
    var phone = contact.phone.value.trim();
    var address = contact.address.value.trim();
    phone = (phone) ? phone : 'Not specified';
    address = (address) ? address : 'Not specified';
    if (from && md && name) {
      // asynchronous operations, better block the submit
      contact.submit.disabled = true;
      // whenever the external script lands ...
      captcha.then(function (widget) {
        // verify it's been clicked
        var recaptcha = grecaptcha.getResponse(widget);
        // if that's the case ...
        if (recaptcha) {
          // ensure it doesn't have a red outline anymore
          document.querySelector('#recaptcha').className = '';
          StaticEmail({
            path: '/api/paperboy',
            subject: (subject) ? subject : 'New message from ' + from + ' through your website\'s contact form.',
            from: from,
            md:     
`A visitor to your site, **dariosusa.com**, has left you a message through your contact form.

**Please send replies to the sender's email address in a new email thread. Do not reply to this email. This inbox is not monitored.**

---

# Sender Info

* Name: **${name}**

* Email: **${from}**

* Phone: **${phone}**

* Address: **${address}**

---

# Message:
${md}`,
            // and pass the recaptcha token to StaticEmail
            recaptcha: recaptcha
          })
          .then(
            thanks,
            function (error) {
              alert(error);
              contact.submit.disabled = false;
            }
          );
        }
        // if reCAPTCHA was not clicked, outline it red
        // to indicate it's mandatory (or use any other indication you like)
        else {
          document.querySelector('#recaptcha').className = 'invalid';
          contact.submit.disabled = false;
        }
      });
    }
  });
  function thanks() {
    var p = document.createElement('p');
    p.textContent = 'Thank you for your message! We will get back to you soon.';
    p.className = 'text-center burgundy';
    contact.parentNode.replaceChild(p, contact);
  }
}(StaticEmail));