import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formSchema = yup.object({
  name: yup.string().required("Name is required."),
  age: yup
    .number()
    .min(1, "Age must be greater than 0.")
    .max(150, "Age must be less than 150.")
    .required("Age is required."),
  sex: yup.string().required("Sex is required"),
  mobile: yup.string().when({
    is: (exists) => !!exists,
    then: () =>
      yup
        .string()
        .matches(
          /^[6-9]\d{9}$/,
          "Entered mobile number is not a valid Indian number."
        ),
    otherwise: () => yup.string(),
  }),

  govIdType: yup.string(),
  govIdValue: yup.string().when("govIdType", (govIdType) => {
    if (govIdType == "aadhar") {
      return yup
        .string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(12, "Must be exactly 12 digits")
        .max(12, "Must be exactly 12 digits");
    } else if (govIdType == "pan") {
      return yup
        .string()
        .matches(/^[a-z0-9]+$/i, "Must be only be alphanumeric")
        .min(10, "Must be exactly 10 characters")
        .max(10, "Must be exactly 10 characters");
    }
  }),
  guardianType: yup.string(),
  guardian: yup.string(),
  email: yup.string().email(),
  emergency: yup.string().when({
    is: (exists) => !!exists,
    then: () =>
      yup
        .string()
        .matches(
          /^[6-9]\d{9}$/,
          "Entered mobile number is not a valid Indian number."
        ),
    otherwise: () => yup.string(),
  }),
  address: yup.string(),
  state: yup.string(),
  city: yup.string(),
  country: yup.string(),
  pincode: yup.string().when({
    is: (exists) => !!exists,
    then: () =>
      yup
        .string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, "Must be exactly 6 digits")
        .max(6, "Must be exactly 6 digits"),
    otherwise: () => yup.string(),
  }),
  occupation: yup.string(),
  religion: yup.string(),
  maritalStatus: yup.string(),
  bloodGroup: yup.string(),
  nationality: yup.string(),
});

const Form = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      age: 0,
      sex: "",
      mobile: "",
      govIdType: "",
      govIdValue: "",
      guardianType: "",
      guardian: "",
      email: "",
      emergency: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      occupation: "",
      religion: "",
      maritalStatus: "",
      bloodGroup: "",
      nationality: "",
    },
    resolver: yupResolver(formSchema),
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  const manageFormSubmission = async (data) => {
    try {
      const res = await axios.post("http://localhost:3001/user/register", {
        ...data,
      });
      navigate("/users");
    } catch (err) {
      console.log(err, "error");
    }
  };
  return (
    <div
      style={{
        width: "96%",
        margin: "10px auto",
      }}
    >
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={handleSubmit(manageFormSubmission)}
        >
          {/* First Section */}
          <h3
            style={{
              textDecoration: "underline",
              fontSize: "25px",
              marginLeft: "20px",
            }}
          >
            Personal Details
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <label htmlFor="name" style={{ margin: "15px 20px" }}>
                Name<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                style={{ width: "300px", margin: "15px 0px" }}
                placeholder="Enter Name"
                {...register("name")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.name?.message}
              </p>
            </div>

            <div>
              <label htmlFor="age" style={{ margin: "15px 20px" }}>
                Age<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                id="age"
                style={{ width: "300px", margin: "15px 0px" }}
                placeholder="Age in Years"
                {...register("age")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.age?.message}
              </p>
            </div>

            <div>
              <label htmlFor="sex" style={{ margin: "15px 20px" }}>
                Sex<span style={{ color: "red" }}>*</span>
              </label>

              <select
                style={{ margin: "15px 10px 15px 0px", width: "150px" }}
                id="sex"
                {...register("sex")}
              >
                <option value="" disabled selected>
                  Enter Sex
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
              </select>
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.sex?.message}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <label htmlFor="mobile" style={{ margin: "15px 20px" }}>
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                style={{ width: "300px", margin: "15px 0px" }}
                placeholder="Enter Mobile"
                {...register("mobile")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.mobile?.message}
              </p>
            </div>

            <div>
              <label htmlFor="govIdValue" style={{ margin: "15px 20px" }}>
                Govt. Issued ID
              </label>
              <select
                style={{ margin: "15px 10px 15px 0px", width: "150px" }}
                id="govIdType"
                {...register("govIdType")}
              >
                <option value="" disabled selected>
                  ID Type
                </option>
                <option value="aadhar">Aadhar</option>
                <option value="pan">PAN</option>
              </select>
              <input
                type="text"
                id="govIdValue"
                style={{ width: "300px", margin: "15px 0px" }}
                placeholder="Enter Govt. ID"
                {...register("govIdValue")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.govIdValue?.message}
              </p>
            </div>
          </div>

          {/* Second Section */}

          <h3
            style={{
              textDecoration: "underline",
              fontSize: "25px",
              marginLeft: "20px",
            }}
          >
            Contact Details
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <label htmlFor="guardian" style={{ margin: "15px 20px" }}>
                Guardian Details
              </label>
              <select
                style={{ margin: "15px 10px 15px 0px", width: "120px" }}
                id="guardianType"
                {...register("guardianType")}
              >
                <option value="" disabled selected>
                  Enter Label
                </option>
                <option value="mother">Mother</option>
                <option value="father">Father</option>
              </select>
              <input
                type="text"
                id="guardian"
                style={{ width: "200px", margin: "15px 0px" }}
                placeholder="Enter Guardian Name"
                {...register("guardian")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.guardian?.message}
              </p>
            </div>

            <div>
              <label htmlFor="email" style={{ margin: "15px 20px" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                style={{ width: "200px", margin: "15px 0px" }}
                placeholder="Enter Email"
                {...register("email")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.email?.message}
              </p>
            </div>

            <div>
              <label htmlFor="emergency" style={{ margin: "15px 20px" }}>
                Emergency Contact Number
              </label>
              <input
                type="text"
                id="emergency"
                style={{ width: "2  00px", margin: "15px 0px" }}
                placeholder="Enter Emergency No."
                {...register("emergency")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.emergency?.message}
              </p>
            </div>
          </div>

          {/* Third Section */}
          <h3
            style={{
              textDecoration: "underline",
              fontSize: "25px",
              marginLeft: "20px",
            }}
          >
            Address Details
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <label htmlFor="address" style={{ margin: "15px 20px" }}>
                Address
              </label>
              <input
                type="text"
                id="address"
                style={{ width: "300px", margin: "15px 0px" }}
                placeholder="Enter Address"
                {...register("address")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.address?.message}
              </p>
            </div>

            <div>
              <label htmlFor="state" style={{ margin: "15px 20px" }}>
                State
              </label>
              <input
                type="text"
                id="state"
                style={{ width: "300px", margin: "15px 0px" }}
                placeholder="Enter State"
                {...register("state")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.state?.message}
              </p>
            </div>

            <div>
              <label htmlFor="city" style={{ margin: "15px 20px" }}>
                City
              </label>
              <input
                type="text"
                id="city"
                style={{ width: "300px", margin: "15px 0px" }}
                placeholder="Enter City"
                {...register("city")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.city?.message}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <label htmlFor="country" style={{ margin: "15px 20px" }}>
                Country
              </label>
              <input
                type="text"
                id="country"
                style={{ width: "300px", margin: "15px 0px" }}
                placeholder="Enter Country"
                {...register("country")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.country?.message}
              </p>
            </div>

            <div>
              <label htmlFor="pincode" style={{ margin: "15px 20px" }}>
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                style={{ width: "300px", margin: "15px 0px" }}
                placeholder="Enter Pincode"
                {...register("pincode")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.pincode?.message}
              </p>
            </div>
          </div>

          {/* Fourth Section */}
          <h3
            style={{
              textDecoration: "underline",
              fontSize: "25px",
              marginLeft: "20px",
            }}
          >
            Other Details
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <label htmlFor="occupation" style={{ margin: "15px 20px" }}>
                Occupation
              </label>
              <input
                type="text"
                id="occupation"
                style={{ width: "200px", margin: "15px 0px" }}
                placeholder="Enter Occupation"
                {...register("occupation")}
              />
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.occupation?.message}
              </p>
            </div>

            <div>
              <label htmlFor="religion" style={{ margin: "15px 20px" }}>
                Religion
              </label>
              <select
                style={{ margin: "15px 10px 15px 0px", width: "150px" }}
                id="religion"
                {...register("religion")}
              >
                <option value="" disabled selected>
                  Enter Religion
                </option>
                <option value="hinduism">Hinduism</option>
                <option value="islam">Islam</option>
                <option value="christianity">Christianity</option>
                <option value="sikhism">Sikhism</option>
                <option value="buddhism">Buddhism</option>
                <option value="jainism">Jainism</option>
                <option value="zoroastrianism">Zoroastrianism</option>
                <option value="judaism">Judaism</option>
              </select>
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.religion?.message}
              </p>
            </div>

            <div>
              <label htmlFor="maritalStatus" style={{ margin: "15px 20px" }}>
                Marital Status
              </label>
              <select
                style={{ margin: "15px 10px 15px 0px", width: "150px" }}
                id="maritalStatus"
                {...register("maritalStatus")}
              >
                <option value="" disabled selected>
                  Enter Marital Status
                </option>
                <option value="unmarried">Unmarried</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
              </select>
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.maritalStatus?.message}
              </p>
            </div>

            <div>
              <label htmlFor="bloodGroup" style={{ margin: "15px 20px" }}>
                Blood Group
              </label>
              <select
                style={{ margin: "15px 10px 15px 0px", width: "150px" }}
                id="bloodGroup"
                {...register("bloodGroup")}
              >
                <option value="" disabled selected>
                  Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              <p style={{ color: "red", margin: "0px 20px" }}>
                {errors.bloodGroup?.message}
              </p>
            </div>
          </div>
          <div>
            <label htmlFor="nationality" style={{ margin: "15px 20px" }}>
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              style={{ width: "200px", margin: "15px 0px" }}
              placeholder="Enter Nationality"
              {...register("nationality")}
            />
            <p style={{ color: "red", margin: "0px 20px" }}>
              {errors.nationality?.message}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => {
                reset();
              }}
              style={{
                width: "100px",
                height: "50px",
                backgroundColor: "red",
                color: "white",
                margin: "20px 40px",
                cursor: "pointer",
                borderWidth: "0px",
                borderRadius: "30px",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                width: "100px",
                height: "50px",
                backgroundColor: "green",
                color: "white",
                margin: "20px 0px 20px 40px",
                cursor: "pointer",
                borderWidth: "0px",
                borderRadius: "30px",
              }}
            >
              Submit
            </button>
          </div>
        </form>

        <DevTool control={control} />
      </div>
    </div>
  );
};

export default Form;
