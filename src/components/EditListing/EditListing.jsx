import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import InputField from "../../components/InputField/";
import Loading from "../Loading";
import api from "../../network";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(10).required("Name is required").label("Name"),
  description: Yup.string()
    .min(20, "Min 20 characters")
    .max(30, "Max 30 characters")
    .required("Description is required")
    .label("Description"),
  price: Yup.number()
    .min(0, "Min price is 0")
    .required("Price is required")
    .label("Price"),
});

function EditListing() {
  const { id } = useParams();

  const { data: listing, isLoading } = useQuery(
    ["detail", id],
    () => api.getListing(id),
    { select: ({ data }) => data.listing }
  );

  if (isLoading) return <Loading />;

  return <EditListingForm listing={listing} id={id} />;
}

export default EditListing;

const EditListingForm = ({ listing, id }) => {
  const navigate = useNavigate();

  const [imageURL, setImageURL] = React.useState();

  const [imageFile, setImageFile] = React.useState(null);
  // if (isLoading) return <Loading />;

  const formik = useFormik({
    initialValues: {
      name: listing?.name,
      description: listing?.description,
      price: listing?.price,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    if (imageFile) {
      api.uploadImageToCloudinary(imageFile).then((data) => {
        api.updateListing({ id, ...values, image: data });
        navigate("/");
      });
    }

    console.log(values);
    formik.resetForm();
  }

  const onImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setImageURL(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-8 font-poppins">
      <div className="w-full md:w-1/2 mx-auto p-1.5 py-4 md:px-16">
        <button className="flex items-center mb-3" onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="w-6 h-6 mr-3 font-light" /> Go Back
        </button>

        <h1 className=" text-3xl font-semibold">Edit Listing</h1>

        <div className="w-full md:w-4/5">
          <InputField
            label="Name"
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

          <img
            src={imageURL || listing.image}
            className="w-full mt-2 rounded-lg"
            alt="uploaded pic"
          />

          <button
            onClick={formik.handleSubmit}
            className="px-4 py-2 text-white my-2 rounded bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
