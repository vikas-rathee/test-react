import { useForm } from "react-hook-form";
import { useState } from "react";

// Simulated async username check
const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  await new Promise((res) => setTimeout(res, 1000)); // 1 second delay
  return username !== "taken"; // Simulate "taken" is unavailable
};

type FormDataType = {
  username: string;
};

const AsyncValidationAndSubmission = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValidating, errors },
  } = useForm<FormDataType>({
    mode: "onChange",
  });

  const [submittedData, setSubmittedData] = useState<FormDataType>({
    username: "",
  });

  const onSubmit = async (data: FormDataType) => {
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 1000));
    setSubmittedData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Username"
        {...register("username", {
          required: "Username is required",
          validate: async (value) =>
            (await checkUsernameAvailability(value)) || "Username already taken",
        })}
      />
      {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}

      {/* Show async validation status */}
      {isValidating && <p style={{ color: "blue" }}>Checking username availability...</p>}

      {/* Show submission status */}
      {isSubmitting && <p style={{ color: "orange" }}>Submitting form...</p>}

      <button type="submit" disabled={isSubmitting || isValidating}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {/* Display submitted data */}
      {submittedData.username && (
        <pre style={{ background: "#777", padding: "10px", marginTop: "10px" }}>
          Submitted: {JSON.stringify(submittedData, null, 2)}
        </pre>
      )}
    </form>
  );
};

export default AsyncValidationAndSubmission;
