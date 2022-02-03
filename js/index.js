// nullify the global reference while instrumenting the form
StaticEmail = (function (StaticEmail) {
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

      if (from && md) {
        contact.submit.disabled = true;
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
${md}`
        })
        .then(
          thanks,
          function (error) {
            alert(error);
            contact.submit.disabled = false;
          }
        );
      }
    });
    function thanks() {
      var p = document.createElement('p');
      p.textContent = 'Thank you for your message! We will get back to you soon.';
      p.className = 'text-center burgundy';
      contact.parentNode.replaceChild(p, contact);
    }
  }(StaticEmail));