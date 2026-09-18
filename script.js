
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
const form=document.querySelector("#enquiry-form");
if(form){
  const status=document.querySelector("#form-status");
  form.addEventListener("submit",async e=>{
    e.preventDefault();
    const submit=form.querySelector('button[type="submit"]');
    if(submit) { submit.disabled=true; submit.textContent="SENDING…"; }
    if(status) status.textContent="Sending your enquiry…";

    try{
      const response=await fetch("https://formsubmit.co/ajax/css.serviceinfo@gmail.com",{
        method:"POST",
        headers:{"Accept":"application/json"},
        body:new FormData(form)
      });
      const result=await response.json();
      if(!response.ok || result.success===false){
        throw new Error(result.message || "Unable to submit enquiry");
      }
      form.reset();
      if(status){
        status.textContent="Thank you! Your enquiry has been sent successfully. We will contact you shortly.";
      }
    }catch(error){
      if(status){
        status.textContent="We could not send the enquiry right now. Please try again or contact us on WhatsApp: 8750755053.";
      }
    }finally{
      if(submit){ submit.disabled=false; submit.textContent="GET FREE QUOTE / ENQUIRY"; }
    }
  });
}
