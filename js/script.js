document.getElementById("year").textContent = new Date().getFullYear();

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    if (question) {

        question.addEventListener("click", () => {

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }

            });

            item.classList.toggle("active");

        });

    }

});

const medicalRadios = document.querySelectorAll(
    'input[name="medicalCondition"]'
);

const medicalDetails = document.getElementById(
    "medicalDetails"
);

medicalRadios.forEach(radio => {

    radio.addEventListener("change", function () {

        if (this.value === "Yes") {

            medicalDetails.style.display = "flex";

        } else {

            medicalDetails.style.display = "none";

            document.getElementById(
                "medicalDescription"
            ).value = "";

        }

    });

});

const admissionForm = document.getElementById("admissionForm");

if (admissionForm) {

    admissionForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton = admissionForm.querySelector(
            'button[type="submit"]'
        );

        submitButton.disabled = true;
        submitButton.innerHTML = "Submitting...";

        const medicalCondition = document.querySelector(
            'input[name="medicalCondition"]:checked'
        );

        const applicationReference =
            "LIZ-" +
            new Date().getFullYear() +
            "-" +
            Math.random().toString(36).substring(2, 7).toUpperCase();

        const applicationData = {
            application_reference: applicationReference,

            student_name:
                document.getElementById("studentName").value.trim(),

            learner_identification_number:
                document.getElementById(
                    "learnerIdentificationNumber"
                ).value.trim(),

            date_of_birth:
                document.getElementById("dateOfBirth").value,

            state_of_origin:
                document.getElementById("stateOfOrigin").value.trim(),

            gender:
                document.getElementById("gender").value,

            house_address:
                document.getElementById("homeAddress").value.trim(),

            class_applying_for:
                document.getElementById("classApplying").value,

            parent_guardian_name:
                document.getElementById("parentName").value.trim(),

            parent_guardian_phone:
                document.getElementById("parentPhone").value.trim(),

            medical_condition:
                medicalCondition &&
                medicalCondition.value === "Yes",

            medical_details:
                document.getElementById(
                    "medicalDescription"
                ).value.trim(),

            information_confirmed:
                document.getElementById("declaration").checked
        };

        const GOOGLE_SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycbzr8yycl52fdFssme5wDCjGLfKT6qW6r103CEIQ66snENtaQTf5AYJtPDWTfGDlCBIf/exec";

        try {

            const response = await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: "POST",
                    body: JSON.stringify(applicationData)
                }
            );

            const result = await response.json();

            if (!result.success) {
                throw new Error(
                    result.error || "Submission failed"
                );
            }

            const successMessage =
                document.getElementById("admissionSuccess");

            const referenceDisplay =
                document.getElementById(
                    "applicationReference"
                );

            if (referenceDisplay) {
                referenceDisplay.textContent =
                    applicationReference;
            }

            admissionForm.reset();

            medicalDetails.style.display = "none";

            if (successMessage) {
                successMessage.style.display = "block";
            }

            admissionForm.style.display = "none";

            submitButton.disabled = false;
            submitButton.innerHTML =
                '<i class="bi bi-send-fill"></i> Submit Admission Application';

        } catch (error) {

            console.error(
                "Admission submission error:",
                error
            );

            alert(
                "Sorry, your application could not be submitted. Please try again."
            );

            submitButton.disabled = false;
            submitButton.innerHTML =
                '<i class="bi bi-send-fill"></i> Submit Admission Application';

        }

    });

}


/* =========================
   CONTACT FORM - EMAILJS
========================= */

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: "dt4207W60eb8p3D-4"
    });

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );

                submitButton.disabled = true;
                submitButton.textContent = "Sending...";

                emailjs.sendForm(
                    "service_1hodu1i",
                    "template_clwm7hf",
                    contactForm
                )
                .then(function () {

                    alert(
                        "Thank you! Your message has been sent successfully."
                    );

                    contactForm.reset();

                    submitButton.disabled = false;
                    submitButton.textContent =
                        "Send Message";

                })
                .catch(function (error) {

                    console.error(
                        "EmailJS error:",
                        error
                    );

                    alert(
                        "Sorry, your message could not be sent. Please try again."
                    );

                    submitButton.disabled = false;
                    submitButton.textContent =
                        "Send Message";

                });

            }
        );

    }

}

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );

            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            emailjs.sendForm(
                "service_1hodu1i",
                "template_clwm7hf",
                contactForm
            )
            .then(function () {

                alert(
                    "Thank you! Your message has been sent successfully."
                );

                contactForm.reset();

                submitButton.disabled = false;
                submitButton.textContent =
                    "Send Message";

            })
            .catch(function (error) {

                console.error(
                    "EmailJS error:",
                    error
                );

                alert(
                    "Sorry, your message could not be sent. Please try again."
                );

                submitButton.disabled = false;
                submitButton.textContent =
                    "Send Message";

            });

        }
    );

}
```javascript
/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("bi-list");
            icon.classList.add("bi-x-lg");

        } else {

            icon.classList.remove("bi-x-lg");
            icon.classList.add("bi-list");

        }

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("bi-x-lg");
            icon.classList.add("bi-list");

        });

    });

}
```
