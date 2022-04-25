import React from "react";
import InputField from "../../components/InputField/";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../network";
import { useMutation } from "react-query";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(20).required("Name is required").label("Name"),
  description: Yup.string()
    .min(20, "Min 20 characters")
    .max(300, "Max 300 characters")
    .required("Description is required")
    .label("Description"),
  price: Yup.number()
    .min(0, "Min price is 0")
    .required("Price is required")
    .label("Price"),

  // image: Yup.mixed().required("Image is required"),
});

function CreateListing() {
  const [imageURL, setImageURL] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(api.createListing, {
    onSuccess: ({ data }) => {
      toast("Listing created successfully", { type: "success" });
    },
    onError: (er) => {
      toast(er?.response?.data?.message || "error occureds", {
        type: toast?.TYPE.ERROR,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    if (!imageURL) return toast("Image is required", { type: "info" });
    const data = await api.uploadImageToCloudinary(imageFile);
    mutate({ ...values, image: data });
    formik.resetForm();
  }

  const onImageChange = (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-8 font-poppins">
      <div className="w-full md:w-1/2 mx-auto p-1.5 py-4 md:px-16">
        <button className="flex items-center mb-3" onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="w-6 h-6 mr-3 font-light" /> Go Back
        </button>

        <h1 className=" text-3xl font-semibold">Create A New Listing</h1>

        <div className="w-full md:w-4/5">
          <InputField
            label="Title"
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            error={formik.touched.name ? formik.errors.name : ""}
          />
          <InputField
            label="Description"
            multiline
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            error={formik.touched.description ? formik.errors.description : ""}
          />
          <InputField
            label="Price"
            type="number"
            min="0"
            value={formik.values.price}
            onChange={formik.handleChange("price")}
            error={formik.touched.price ? formik.errors.price : ""}
          />
          <InputField
            type="file"
            multiple
            accept="image/*"
            className="border-none"
            onChange={(event) => {
              onImageChange(event);
              // formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
          />

          {imageURL && (
            <img
              src={imageURL}
              className="w-full mt-2 rounded-lg"
              alt="uploaded pic"
            />
          )}

          <button
            onClick={formik.handleSubmit}
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 text-white my-2 rounded bg-blue-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Creating..." : "Create Listing"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;
