const certifications = [
    {
    certificationName : "NPTEL",
    days : 60,
    description : "I earned an NPTEL Certification in Database Management System from IIT Kharagpur during the period of January to March 2023.",
    },
    {
        certificationName : "FUNDAMENTALS OF WEB DESIGNING",
        days : 5,
        description : "I completed a 30-hour add-on course on the Fundamentals of Web Designing from February to March 2023.",
    },
    {
        certificationName : "WEB APPLICATION DEVELOPMENT WITH ANGULAR AND NODE.JS",
        days : 6,
        description : "I completed a 45-hour add-on course titled 'Web Application Development with Angular and Node.JS' from July to September 2023.",
    },
]
function generateList() {
    const container = document.querySelector(".row.mb-2"); // Assuming this is your main container to append items
    container.innerHTML = "";
    certifications.forEach((c) => {
        // Create elements for each certification
        const div1 = document.createElement("div");
        div1.classList.add("col-md-6"); // Assuming each certification is placed within a column
        
        const div2 = document.createElement("div");
        div2.classList.add("card", "flex-md-row", "mb-4", "box-shadow", "h-md-250");
        
        const div3 = document.createElement("div");
        div3.classList.add("card-body", "d-flex", "flex-column", "align-items-start");

        const strong = document.createElement("strong");
        strong.classList.add("d-inline-block", "mb-2", "text-primary");
        strong.textContent = c.certificationName;

        const div4 = document.createElement("div");
        div4.classList.add("mb-1", "text-muted");
        div4.textContent = c.days + " Days";

        const p1 = document.createElement("p");
        p1.classList.add("card-text", "mb-auto");
        p1.textContent = c.description;

        // Build the hierarchy by appending elements to each other
        div3.appendChild(strong);
        div3.appendChild(div4);
        div3.appendChild(p1);

        div2.appendChild(div3);
        div1.appendChild(div2);

        // Append the constructed elements to the main container
        container.appendChild(div1);
    });
}
window.addEventListener ("load",generateList);
const button = document.querySelector(".btn.btn-success");
button.addEventListener("click", () => {
    certifications.sort ( (a,b) => a.days - b.days);
    generateList();
})