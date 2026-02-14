import { useForm } from "react-hook-form";
import Field from "../../common/Field";
import {useNavigate} from "react-router"

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = (formData) => {
    console.log(formData);
    navigate("/")
  };
  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-15"
    >
      <div className="mb-6 space-y-2.5">
        <Field label="email" error={errors.email}>
          <input
            {...register("email", { required: "Email ID is required" })}
            type="email"
            id="email"
            name="email"
            className={`w-full rounded-md border border-black  p-1.5 focus:outline-none lg:p-3 ${errors.email ? "border-red-500" : ""}`}
          />
        </Field>
      </div>

      <div className="mb-6 space-y-2.5">
        <Field label="password" error={errors.password}>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Your passord must be at least 8 characters",
              },
            })}
            type="password"
            id="password"
            name="password"
            className={`w-full rounded-md border border-black  p-1.5 focus:outline-none lg:p-3 ${errors.password ? "border-red-500" : ""}`}
          />
        </Field>
      </div>

      <Field>
        <button
          className="w-full rounded-md bg-green-500  p-1.5 focus:outline-none lg:p-3 bg-lwsGreen font-bold text-white transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
