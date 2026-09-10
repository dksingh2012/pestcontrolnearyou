
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
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const data=new FormData(form);
    const name=data.get("name")||"";
    const phone=data.get("phone")||"";
    const city=data.get("city")||"";
    const service=data.get("service")||"";
    const message=data.get("message")||"";
    const subject=encodeURIComponent(`Pest Control Enquiry - ${city}`);
    const body=encodeURIComponent(
      `Name: ${name}\nMobile: ${phone}\nCity: ${city}\nService: ${service}\nMessage: ${message}`
    );
    window.location.href=`mailto:dksingh2012@gmail.com?subject=${subject}&body=${body}`;
  });
}
