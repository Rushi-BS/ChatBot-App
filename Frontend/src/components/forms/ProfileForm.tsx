import React, { useState } from "react";

const ProfileForm: React.FC = () => {
  // Initializing state for the profile information
  const [profileData, setProfileData] = useState({
    userName: "",
    phoneNo: "",
    location: "",
    profilePhoto: null, // This will be handled separately since it's a file
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      // Assuming you'll handle the file upload process here
      console.log("File selected: ", e.target.files[0]);
      // Update state to reflect the file selection
      // setProfileData((prev) => ({ ...prev, profilePhoto: e.target.files[0] as File }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the form submission, including file upload
    console.log("Profile Data to update: ", profileData);
    // You'd typically send this data to your server here
  };

  return (
    <div className=" bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Edit Profile</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="userName" className="sr-only">User Name</label>
              <input id="userName" name="userName" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="User Name" value={profileData.userName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="phoneNo" className="sr-only">Phone Number</label>
              <input id="phoneNo" name="phoneNo" type="tel" autoComplete="tel" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Phone Number" value={profileData.phoneNo} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="location" className="sr-only">Location</label>
              <input id="location" name="location" type="text" autoComplete="address-level1" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Location" value={profileData.location} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700">Profile Photo</label>
              <input id="profilePhoto" name="profilePhoto" type="file" onChange={handleFileChange} className="mt-1 block w-full" />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;