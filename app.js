const form = document.getElementById('registrationForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    const name = document.getElementById('name').value;
    const nameError = document.getElementById('nameError');

    const nameTooShortOrLong = name.length < 2 || name.length > 30;
    const nameContainsInvalidCharacters = /[^A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]/.test(name);

    if (nameTooShortOrLong && nameContainsInvalidCharacters) {
        nameError.innerText = 'Vardas turi būti nuo 2 iki 30 raidžių ir negali turėti skaičių ar specialių simbolių.';
        isValid = false;
    } else if (nameTooShortOrLong) {
        nameError.innerText = 'Vardas turi būti nuo 2 iki 30 raidžių.';
        isValid = false;
    } else if (nameContainsInvalidCharacters) {
        nameError.innerText = 'Vardas negali turėti skaičių ar specialių simbolių.';
        isValid = false;
    } else {
        nameError.innerText = '';
    }

    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.innerText = 'El. pašto adresas nurodytas netinkamai. Įveskite teisingą el. pašto adresą.';
        isValid = false;
    } else {
        emailError.innerText = '';
    }

    const birthDateInput = document.getElementById('birthDate');
    const birthError = document.getElementById('birthError');
    let age = null;

    function validateAge() {
        const today = new Date();
        const birthDate = new Date(birthDateInput.value);

        const ageCalc = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();

        age = (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0))
            ? ageCalc
            : ageCalc - 1;

        if (isNaN(age) || age < 18 || age > 120) {
            birthError.textContent = 'Amžius nurodytas neteisingai, norėdami pateikti registraciją turite būti vyresnis nei 18 metų.';
            isValid = false;
        } else {
            birthError.textContent = '';
        }
    }

    validateAge();


    //AMŽIAUS FORMA JEI NENAUDOJU GIMIMO DATOS
    // const age = document.getElementById('age').value;
    // const ageError = document.getElementById('ageError');
    // if (age < 18 || age > 120) {
    //     ageError.innerText = 'Amžius nurodytas neteisingai, norėdami pateikti registraciją turite būti vyresnins nei 18 metų.';
    //     isValid = false;
    // } else {
    //     ageError.innerText = '';
    // }

    const phone = document.getElementById('phone').value;
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^\+\d{1,3}\d{3}\d{5}$/;
    if (!phoneRegex.test(phone)) {
        phoneError.innerText = 'Telefono numeris turi būti pateiktas formatu +370xxxxxxxx.';
        isValid = false;
    } else {
        phoneError.innerText = '';
    }

    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.innerText = 'Slaptažodis turi būti bent 8 simbolių ir turėti didžiąją raidę, mažąją raidę, skaičių ir specialų simbolį.';
        isValid = false;
    } else {
        passwordError.innerText = '';
    }

    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (password !== confirmPassword) {
        confirmPasswordError.innerText = 'Slaptažodžiai nesutampa.';
        isValid = false;
    } else {
        confirmPasswordError.innerText = '';
    }

    const successMessage = document.getElementById('successMessage');
    const mainErrorMessage = document.getElementById('mainErrorMessage');

    if (isValid) {
        successMessage.innerText = 'Registracija sėkminga!';
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);

        const user = {
            name: name,
            email: email,
            age: age,
            phone: phone
        };
        console.log(user);
        form.reset();
        mainErrorMessage.style.display = 'none';
    } else {
        successMessage.innerText = '';
        mainErrorMessage.innerText = 'Prašome ištaisyti klaidas formoje ir pabandyti dar kartą.';
        mainErrorMessage.style.display = 'block';
        setTimeout(() => {
            mainErrorMessage.style.display = 'none';
        }, 3000);
    }
});


