import { useForm } from "react-hook-form";
import Field from "../../common/Field";
import axios from "axios";
import { Navigate } from "react-router";

const RegistrationForm = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const submitForm = async (formData) => {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData,
      );

      if (response.status === 201) {
        Navigate("/login");
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message}`,
      });
    }
  };
  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-7.5"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", {
            required: "First Name is Required",
          })}
          className={`w-full rounded-md border border-[#CCCCCC]/14 bg-lighterDark  p-1.5 focus:outline-none lg:p-3 ${
            errors.firstName ? "border-red-500" : "border-gray-200"
          }`}
          type="firstName"
          name="firstName"
          id="firstName"
        />
      </Field>
      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName")}
          className={`w-full rounded-md border border-[#CCCCCC]/14 bg-lighterDark  p-1.5 focus:outline-none lg:p-3 ${
            errors.lastName ? "border-red-500" : "border-gray-200"
          }`}
          type="lastName"
          name="lastName"
          id="lastName"
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email ID is Required" })}
          className={`w-full rounded-md border border-[#CCCCCC]/14 bg-lighterDark  p-1.5 focus:outline-none lg:p-3 ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          type="email"
          name="email"
          id="email"
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`w-full rounded-md border border-[#CCCCCC]/14 bg-lighterDark  p-1.5 focus:outline-none lg:p-3 ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          name="password"
          id="password"
        />
      </Field>
      <p>{errors?.root?.random?.message}</p>
      <button
        className="w-full rounded-md border border-[#CCCCCC]/14 bg-lighterDark  p-1.5 focus:outline-none lg:p-3 bg-green-500 font-bold text-white transition-all hover:opacity-90 mt-4"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
