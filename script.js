// Load GA4 on service and city landing pages as well as the homepage.
// The homepage already configures GA4 in its head, so avoid a duplicate page_view there.
if (location.pathname !== "/" && typeof gtag === "function") {
  gtag("config", "G-6XMVJYRND6");
}

document.querySelectorAll("[data-enquiry]").forEach(btn => {
  btn.addEventListener("click", () => {
    const service = btn.dataset.enquiry || "";
    const select = document.querySelector("#service");
    if (select && service) {
      [...select.options].forEach(o => {
        if (o.value.toLowerCase() === service.toLowerCase()) select.value = o.value;
      });
    }
    document.querySelector("#enquiry")?.scrollIntoView({ behavior: "smooth" });
  });
});

// Submit the enquiry to Formspree first. Only after Formspree confirms success
// do we send the Google Ads "Submit lead form" conversion event.
const form = document.querySelector("#enquiry-form");
if (form) {
  let submitting = false;

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (submitting) return;

    const submit = form.querySelector('button[type="submit"]');
    const status = document.querySelector("#form-status");
    submitting = true;

    if (submit) {
      submit.disabled = true;
      submit.textContent = "SENDING…";
    }
    if (status) status.textContent = "Submitting your enquiry securely…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("The enquiry service did not accept the submission.");
      }

      if (status) status.textContent = "Thank you! Your enquiry has been submitted successfully.";

      // Fire the Ads conversion only for a confirmed successful form submission.
      if (typeof gtag === "function") {
        let completed = false;
        const finish = () => {
          if (completed) return;
          completed = true;
          form.reset();
          if (submit) {
            submit.disabled = false;
            submit.textContent = "GET FREE QUOTE / ENQUIRY";
          }
          submitting = false;
        };

        gtag("event", "conversion", {
          send_to: "AW-18469713699/8Zi2COeB_bIdEKPuhedE",
          value: 1.0,
          currency: "INR",
          event_callback: finish
        });
        // Do not leave the form locked if a browser blocks the tag callback.
        window.setTimeout(finish, 1500);
      } else {
        form.reset();
        if (submit) {
          submit.disabled = false;
          submit.textContent = "GET FREE QUOTE / ENQUIRY";
        }
        submitting = false;
      }

      if (typeof gtag === "function") {
        gtag("event", "generate_lead", { currency: "INR", value: 1.0 });
      }
    } catch (error) {
      if (status) status.textContent = "Sorry, your enquiry could not be submitted. Please try again or contact us by phone or WhatsApp.";
      if (submit) {
        submit.disabled = false;
        submit.textContent = "GET FREE QUOTE / ENQUIRY";
      }
      submitting = false;
    }
  });
}

document.addEventListener("click", event => {
  const whatsappLink = event.target.closest('a[href*="wa.me/"]');
  if (whatsappLink && typeof gtag === "function") {
    gtag("event", "whatsapp_click", {
      page_location: location.pathname,
      link_url: whatsappLink.href
    });
  }
});

document.addEventListener("click", event => {
  const phoneLink = event.target.closest('a[href^="tel:"]');
  if (phoneLink && typeof gtag === "function") {
    gtag("event", "phone_click", {
      page_location: location.pathname,
      link_url: phoneLink.href
    });
  }
});
