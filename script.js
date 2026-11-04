
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
// Enquiry form uses the browser's native POST to FormSubmit.
// This avoids cross-origin AJAX/CORS "Failed to fetch" errors and keeps
// submission online without opening the visitor's email application.
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
