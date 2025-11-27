const formInputs = document.querySelectorAll('.form-input');
const form = document.getElementById('form');

const emailField = document.querySelector('input[name="email"]');
const nameField = document.querySelector('input[name="name"]');
const phoneField = document.querySelector('input[name="phone"]');
const messageTextarea = document.querySelector('textarea[name="message"]');

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-item a");

formInputs.forEach(input => {
    const inputField = input.querySelector('input, textarea');
    const label = input.querySelector('label');
    const parentElement = inputField.parentElement;
    inputField.addEventListener('focus', () => {
        if (inputField.value === '') {
            parentElement.style.borderBottomColor = 'var(--color-1)';
        }
    });
    inputField.addEventListener('blur', () => {
    
        if (inputField.value === '') {
            parentElement.style.borderBottomColor = '#fff';
        }

    });
});


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navLinks.forEach(link => {
          link.classList.toggle("emphasize", link.dataset.target === id);
        });
      }
    });
  },
  {
    threshold: 0.7
  }
);

sections.forEach(section => observer.observe(section));

function goToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function ValidateEmail() {
    const email = emailField.value;
    const parentElement = emailField.parentElement;
    parentElement.style.borderBottomColor = 'var(--color-1) ';

    const emailPattern = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === '') {
        parentElement.style.borderBottomColor = 'var(--color-1)';
        return false;
    }
    if (!emailPattern.test(email)) {
        parentElement.style.borderBottomColor = 'red';
        return false;

    } else {
        parentElement.style.borderBottomColor = 'green';
        return true;
    }
}

function validateName() {
    const name = nameField.value.trim();
    const parentElement = nameField.parentElement;
    const namePattern = /^[a-zA-Z\s]{2,}$/;

    if (name === "") {
        parentElement.style.borderBottomColor = 'var(--color-1)';
        return false;
    }

    if (!namePattern.test(name)) {
        parentElement.style.borderBottomColor = 'red';
        return false;
    } else {
        parentElement.style.borderBottomColor = 'green';
        return true;
    }
}

function validatePhoneNumber() {
    const prefix = "+63 ";
    if (!phoneField.value.startsWith(prefix)) {
        phoneField.value = prefix;
    }

    let digits = phoneField.value.replace(/\D/g, "").substring(2); 

    if (digits.startsWith("09")) {
        digits = digits.substring(1);
    }
    if (digits.startsWith("0")) {
        digits = digits.substring(1);
    }

    let formatted = "";
    if (digits.length > 0) formatted = digits.substring(0, 3);
    if (digits.length > 3) formatted += " " + digits.substring(3, 6);
    if (digits.length > 6) formatted += " " + digits.substring(6, 10);

    phoneField.value = prefix + formatted;

    const phonePattern = /^\+63 \d{3} \d{3} \d{4}$/;
    const parentElement = phoneField.parentElement;

    if (!phonePattern.test(phoneField.value.trim())) {
        parentElement.style.borderBottomColor = 'red';
        return false;
    } else {
        parentElement.style.borderBottomColor = 'green';
        return true;
    }
}

function validateMessage() {
    const message = messageTextarea.value.trim();
    const parentElement = messageTextarea.parentElement;

    if (message.length >= 1) {
        parentElement.style.borderBottomColor = 'green';
        return true;
    } else {
        parentElement.style.borderBottomColor = 'var(--color-1)';
        return false;
    }
}

function validateForm() {
    const isEmailValid = ValidateEmail();
    const isNameValid = validateName();
    const isPhoneValid = validatePhoneNumber();
    return isEmailValid && isNameValid && isPhoneValid;
}

messageTextarea.addEventListener("input", function (event) {
    const textarea = event.target;
    textarea.style.height = "auto";                  
    textarea.style.height = textarea.scrollHeight + "px";
});

emailField.addEventListener('input', ValidateEmail);
nameField.addEventListener('input', validateName);
phoneField.addEventListener('input', validatePhoneNumber);
messageTextarea.addEventListener('input', validateMessage);

function resetForm() {
    
    formInputs.forEach(function(input) {
    
        const inputField = input.querySelector('input, textarea');
        inputField.parentElement.style.borderBottomColor = '#fff';
    });

    form.reset();
}


form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    if (validateForm()) {
        alert('Form submitted successfully!');
        resetForm();
    } else {
        alert('Please correct the errors in the form before submitting.');
    }
});

const modal = document.getElementById("image-modal");
const popupImage = document.getElementById("popup-image");
const modalTitle = document.getElementById("modal-title")

const thumbnails = document.querySelectorAll(".thumbnail");
const closeBtn = document.querySelector(".close");

thumbnails.forEach(thumbnail => {
    
    thumbnail.addEventListener("click", function () {
      const imgSrc = this.dataset.image;
      popupImage.src = imgSrc;
      modalTitle.textContent = this.dataset.title
      modal.style.display = "flex";
    });
    
});

// When clicking the thumbnail

// Close modal
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Close when clicking outside the image
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});