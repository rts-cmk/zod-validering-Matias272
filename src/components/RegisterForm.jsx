import { useState } from "react";
import "./registerForm.scss";
import { z } from "zod";

const regSchema = z
  .object({
    firstName: z.string().nonempty("Fornavn må ikke være tomt"),
    lastName: z.string().nonempty("Efternavn må ikke være tomt"),
    email: z.email("Ugyldig email adresse"),
    password: z
      .string()
      .min(8, "Adgangskode må være mellem 8 og 28 karakterer")
      .max(28, "Adgangskode må være mellem 8 og 28 karakterer")
      .regex(/[A-Z]/, "Adgangskode skal indeholde mindst ét stort bogstav")
      .regex(/[a-z]/, "Adgangskode skal indeholde mindst ét lille bogstav")
      .regex(/[0-9]/, "Adgangskode skal indeholde mindst ét tal")
      .regex(
        /[!@#$%<>&*?+'¤]/,
        "Adgangskode skal indeholde mindst ét specialtegn"
      ),

    confirmPassword: z.string(),
    birthDate: z.string().refine((date) => {
      const today = new Date();
      const limit = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return new Date(date) <= limit;
    }, "Du skal være mindst 18 år"),
    tlf: z.string().regex(/^\d{8}$/, "Telefonnummer skal være 8 cifre"),
    postNum: z.string().regex(/^\d{4}$/, "Postnummer skal være 4 cifre"),
    adress: z.string().min(5, "Adressen skal være mindst 5 tegn"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Adgangskoderne matcher ikke",
  });
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    tlf: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedForm);

    const result = regSchema.safeParse(updatedForm);

    if (result.success) {
      setErrors({});
    } else {
      setErrors(result.error.flatten().fieldErrors);
    }
  };

  const submitHanlder = (e) => {
    e.preventDefault();

    const result = regSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    alert("Form submitted");
  };

  return (
    <form onSubmit={submitHanlder} className="reg-form" action="">
      <fieldset className="reg-form__fieldset">
        <label className="reg-form__label" htmlFor="">
          <span className="reg-form__span">FirstName:</span>
          <input
            className="reg-form__input"
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <ul className="reg-form__error-list">
            {errors.firstName &&
              errors.firstName.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </label>
        <label className="reg-form__label" htmlFor="">
          <span className="reg-form__span">LastName:</span>
          <input
            className="reg-form__input"
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <ul className="reg-form__error-list">
            {errors.lastName &&
              errors.lastName.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </label>
        <label className="reg-form__label" htmlFor="">
          <span className="reg-form__span">Email:</span>
          <input
            className="reg-form__input"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <ul className="reg-form__error-list">
            {errors.email &&
              errors.email.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </label>
        <label className="reg-form__label" htmlFor="">
          <span className="reg-form__span">Password:</span>
          <input
            className="reg-form__input"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <ul className="reg-form__error-list">
            {errors.password &&
              errors.password.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </label>
        <label className="reg-form__label" htmlFor="">
          <span className="reg-form__span">Confirm Password:</span>
          <input
            className="reg-form__input"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <ul className="reg-form__error-list">
            {errors.confirmPassword &&
              errors.confirmPassword.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </label>
        <label className="reg-form__label" htmlFor="">
          <span className="reg-form__span">Birthdate:</span>
          <input
            className="reg-form__input"
            type="date"
            name="birthDate"
            id="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
          <ul className="reg-form__error-list">
            {errors.birthDate &&
              errors.birthDate.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </label>
        <label className="reg-form__label" htmlFor="">
          <span className="reg-form__span">Telefon Number:</span>
          <input
            className="reg-form__input"
            type="tel"
            name="tlf"
            id="tlf"
            value={formData.tlf}
            onChange={handleChange}
          />
          <ul className="reg-form__error-list">
            {errors.tlf && errors.tlf.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </label>
        <label className="reg-form__label" htmlFor="">
          <span className="reg-form__span">Post Number:</span>
          <input
            className="reg-form__input"
            type="tel"
            name="postNum"
            id="postNum"
            value={formData.postNum}
            onChange={handleChange}
          />
          <ul className="reg-form__error-list">
            {errors.postNum &&
              errors.postNum.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </label>
        <label className="reg-form__label" htmlFor="">
          <span className="reg-form__span">Adress:</span>
          <input
            className="reg-form__input"
            type="tel"
            name="adress"
            id="adress"
            value={formData.adress}
            onChange={handleChange}
          />
          <ul className="reg-form__error-list">
            {errors.adress &&
              errors.adress.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </label>
      </fieldset>
      <button className="reg-form__btn">Register</button>
    </form>
  );
}
