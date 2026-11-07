// Load GA4 on service and city landing pages as well as the homepage.
// The homepage already configures GA4 in its head, so avoid a duplicate page_view there.
if (location.pathname !== "/" && typeof gtag === "function") {
  gtag("config", "G-6XMVJYRND6");
}


document.querySelectorAll("[data-enquiry]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const service=btn.dataset.enquiry || "";
    const select=document.querySelector("#service");
    if(select && service){
      [...select.options].forEach(o=>{if(o.value.toLowerCase()===service.toLowerCase()) select.value=o.value})
    }
    document.querySelector("#enquiry")?.scrollIntoView({behavior:"smooth"});
  });
});
// Enquiry form uses a standard HTML POST to Formspree.
// This avoids custom cross-origin AJAX code and keeps submission online.
const form=document.querySelector("#enquiry-form");
if(form){
  form.addEventListener("submit",()=>{
    const submit=form.querySelector('button[type="submit"]');
    if(submit){ submit.disabled=true; submit.textContent="SENDING…"; }
    const status=document.querySelector("#form-status");
    if(status) status.textContent="Submitting your enquiry securely…";
  });
}

document.addEventListener("click", event=>{
  const whatsappLink=event.target.closest('a[href*="wa.me/"]');
  if(whatsappLink && typeof gtag==="function"){
    gtag("event","whatsapp_click",{
      page_location:location.pathname,
      link_url:whatsappLink.href
    });
  }
});

document.addEventListener("click", event=>{
  const phoneLink=event.target.closest('a[href^="tel:"]');
  if(phoneLink && typeof gtag==="function"){
    gtag("event","phone_click",{
      page_location:location.pathname,
      link_url:phoneLink.href
    });
  }
});
