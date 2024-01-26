"use client";
import router from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import data from "@/data/data.json";
import { auth, db, storage } from "@/config/firebase-config";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "@/context/AuthContext.js";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { IoCloudUploadOutline } from "react-icons/io5";
import getRoadmaps from "@/config/gpt-openai-config";
import RoadmapShortCard from "@/components/RoadmapShortCard";
// import { url } from "inspector";

export default function SignUp() {
  const [step, setStep] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);
  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    email: "",
    industries: [],
    passions: [],
    jobTypes: [],
    skills: [],
    roadmapDuration: null,
    curriculumPdf: null,
    resumePdf: null,
  });
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const router = useRouter();
  const industryCategories = data.industryCategories;
  const passions = data.passions;
  const jobs = data.jobs;
  const skills = data.skills;
  const roadmapDuration = data.duration;
  const { user, createUser } = UserAuth();

  const [searchTerm, setSearchTerm] = useState("");
  // console.log(searchTerm);

  const filteredIndustries = industryCategories.filter((industry) =>
    industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPassions = passions.filter((passion) =>
    passion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = jobs.filter((job) =>
    job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* userData= {
  "uid": "F34PmSo2jeafn447a74hJEtPH7e2",
  "name": "asdf",
  "email": "shantanuessdfakpal1420@gmail.com",
  "industries": [
    "Software"
  ],
  "passions": [
    "Blockchain"
  ],
  "jobTypes": [
    "App Developer"
  ],
  "skills": [
    "React.js",
    "JavaScript"
  ],
  "roadmapDuration": "In 3-6 months",
  "curriculumPdf": {},
  "resumePdf": null
}
 */

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, [field]: file }));
      setIsFileSelected(true);
    }
  };

  const handleUploadFile = async (file, field) => {
    if (file) {
      setLoading(true);
      setUploadProgress(0);
      setIsFileSelected(true);

      const storageRef = ref(storage, `${field}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      });

      try {
        await uploadTask;

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        // Update the form data with the download URL
        console.log("downloadURL", downloadURL);
        setFormData((prevData) => ({
          ...prevData,
          [field]: downloadURL,
        }));

        if (field === "resumePdf") {
          fetch("http://127.0.0.1:5000/parse_resume", {
            method: "POST",
            body: JSON.stringify({ url: downloadURL }),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((res) => res.json())
            .then((json) => {
              // addDoc(collection(db, "user_bio"), json[0])
              // .then((docRef) => {
              //   console.log("Document written with ID: ", docRef.id);
              // })
              // store json into localStorage
              // localStorage.setItem("user_bio", json[0]);
              console.log("user_bio", json[0]);
              setFormData((prevData) => {
                // the "skills" attribute (which is an array) in the formData should be set to the "skills" attribute from the json[0]
                return {
                  ...prevData,
                  // industries: json[0].industryCategories,
                  // jobTypes: json[0].jobs,
                  skills: json[0].skills,
                };
              });
              handleNext();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (error) {
        console.error(`Error uploading ${field}:`, error);
      }
    } else {
      alert("Please select a file to upload.");
      setIsFileSelected(false);
    }
  };

  const handleCheckboxChange = (value) => {
    if (step === 2) {
      //industry
      if (formData.industries.includes(value)) {
        // remove
        setFormData((prevData) => ({
          ...prevData,
          industries: prevData.industries.filter((item) => item !== value),
        }));
      } else {
        // add
        if (formData.industries.length < 3) {
          setFormData((prevData) => ({
            ...prevData,
            industries: [...prevData.industries, value],
          }));
        } else {
          // handle maximum selection limit
          console.log("Maximum selection limit reached.");
        }
      }
    } else if (step === 3) {
      //passion
      if (formData.passions.includes(value)) {
        //remove
        setFormData((prevData) => ({
          ...prevData,
          passions: prevData.passions.filter((item) => item !== value),
        }));
      } else {
        //add
        if (formData.passions.length < 3) {
          setFormData((prevData) => ({
            ...prevData,
            passions: [...prevData.passions, value],
          }));
        } else {
          // handle maximum selection limit
          console.log("Maximum selection limit reached.");
        }
      }
    } else if (step === 4) {
      //job type
      if (formData.jobTypes.includes(value)) {
        //remove
        setFormData((prevData) => ({
          ...prevData,
          jobTypes: prevData.jobTypes.filter((item) => item !== value),
        }));
      } else {
        //add
        if (formData.jobTypes.length < 3) {
          setFormData((prevData) => ({
            ...prevData,
            jobTypes: [...prevData.jobTypes, value],
          }));
        } else {
          // handle maximum selection limit
          console.log("Maximum selection limit reached.");
        }
      }
    } else if (step === 5) {
      //skills
      if (formData.skills.includes(value)) {
        //remove
        setFormData((prevData) => ({
          ...prevData,
          skills: prevData.skills.filter((item) => item !== value),
        }));
      } else {
        //add
        setFormData((prevData) => ({
          ...prevData,
          skills: [...prevData.skills, value],
        }));
      }
    } else if (step === 6) {
      //roadmapDuration
      if (formData.roadmapDuration.includes(value)) {
        //remove
        setFormData((prevData) => ({
          ...prevData,
          skills: prevData.roadmapDuration.filter((item) => item !== value),
        }));
      } else {
        //add
        setFormData((prevData) => ({
          ...prevData,
          skills: [...prevData.roadmapDuration, value],
        }));
      }
    }
  };

  const handleButtonChange = (value) => {
    //roadmapDuration
    setFormData((prevData) => ({
      ...prevData,
      roadmapDuration: value,
    }));
    console.log(formData.roadmapDuration);
  };

  const handlePrev = () => {
    window.scrollTo(0, 0);

    setStep(step - 1);
  };
  const handleNext = () => {
    //scroll to top
    window.scrollTo(0, 0);
    setStep(step + 1);
    //clear searh term
    setSearchTerm("");
    setIsFileSelected(false);
    setUploadProgress(0);
  };

  const handleSignUp = async () => {
    // password checker
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return alert("Passwords do not match.");
    }
    try {
      const userCredential = await createUser(
        emailRef.current.value,
        passwordRef.current.value
      );
      const { uid } = userCredential.user;
      setStep(step + 1);
      console.log(userCredential);
      setFormData((prev) => ({
        ...prev,
        uid: uid,
        name: nameRef.current.value,
        email: emailRef.current.value,
      }));
    } catch (err) {
      console.log(err);
    }
    // setStep(step + 1);
  };

  const handleFinish = async () => {
    //log the form data, the form data is being stored in formData
    setFormData((prevData) => ({ ...prevData, uid: user.uid }));
    console.log("formData,", formData);
    //increase step count
    setStep(step + 1);
    setLoading(true);

    localStorage.setItem("formData", formData);

    // save the formData to the firestore database
    const docRef = await addDoc(collection(db, "user_bio"), formData);
    console.log("Document written with ID: ", docRef.id);

    const response = await getRoadmaps(
      formData.skills,
      formData.jobTypes,
      formData.industries,
      formData.passions,
      formData.roadmapDuration
    );

    // Convert the response string to an object
    const responseObject = JSON.parse(response);
    setRoadmaps(responseObject.roadmaps);
    /* roadmaps =  [
        {
            "title": "Software Engineer",
            "overview": "This roadmap will focus on preparing you for a career as a Software Engineer with a strong foundation in full-stack development and cloud services.",
            "duration": "10-12 months",
            "topics": [
                "Front-end Development with React.js and Next.js",
                "Back-end Development with Node.js and Flask",
                "Cloud Services with AWS",
                "Version Control with Git and GitHub",
                "Database Management with MongoDB",
                "Software Development Best Practices"
            ],
            "learning_objectives": [
                "Developing responsive and dynamic web applications using React.js and Next.js",
                "Building scalable server-side applications with Node.js and Flask",
                "Deploying applications and managing resources on AWS",
                "Employing effective version control and collaboration with Git and GitHub",
                "Designing and implementing databases using MongoDB",
                "Understanding software development methodologies and best practices"
            ],
            "prerequisites": [
                "Basic programming knowledge",
                "Understanding of web development concepts"
            ],
            "sample_courses": [
                "Full-Stack Web Development with React Specialization on Coursera",
                "AWS Certified Developer - Associate on Udemy",
                "Version Control with Git on Udacity"
            ]
        }
        
    ] */
    //store the response object into the localStorage
    // localStorage.setItem("roadmapOptions", responseObject);
    console.log("roadmapOptions", responseObject.roadmaps);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {step === 0 && (
          <div className="  pb-3 ">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 ">
              <h1 className="h1">
                Welcome to Skill Sync. <br /> Tell us a bit about yourself.
              </h1>
            </div>
            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-gray-800"
                      placeholder="Enter your name"
                      onChange={handleInputChange}
                      value={formData.name}
                      ref={nameRef}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input w-full text-gray-800"
                      placeholder="Enter your email address"
                      onChange={handleInputChange}
                      value={formData.email}
                      ref={emailRef}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-input w-full text-gray-800"
                      placeholder="Enter your password"
                      ref={passwordRef}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-input w-full text-gray-800"
                      placeholder="Re-enter your password"
                      ref={confirmPasswordRef}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* upload resume */}
        {step === 1 && (
          <div className="  pb-3 ">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 ">
              <h1 className="h1">Upload your resume &#40;optional&#41;</h1>
            </div>
            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="resumePdf"
                    >
                      Resume
                    </label>
                    <input
                      id="resumePdf"
                      type="file"
                      accept=".pdf"
                      className="form-input w-full text-gray-800"
                      onChange={(e) => handleFileChange(e, "resumePdf")}
                    />
                    {uploadProgress > 0 && (
                      <div className="text-xs text-gray-600 mt-2">
                        Upload progress: {uploadProgress.toFixed(2)}%
                      </div>
                    )}
                  </div>
                </div>
              </form>
              {isFileSelected && (
                <div className={"flex items-center justify-center"}>
                  <button
                    className={`btn py-2 px-10 bg-blue-600 text-white font-bold ${
                      uploadProgress > 0 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={uploadProgress > 0 || loading}
                    onClick={() => {
                      handleUploadFile(formData.resumePdf, "resumePdf");
                      setLoading(true);
                    }}
                  >
                    Upload{" "}
                    <IoCloudUploadOutline className="ml-3 text-lg font-bold" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          //show multiple choice for industries
          <div className="  pb-3 ">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 ">
              <h1 className="h1">Which industries spark your curiosity?</h1>
            </div>
            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3 ">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="search"
                    >
                      Search Industries
                    </label>
                    <input
                      id="search"
                      type="text"
                      className="form-input w-full mb-3"
                      placeholder="Type to search..."
                      defaultValue={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="max-h-96 overflow-auto">
                      {filteredIndustries.map((industry) => (
                        <label
                          key={industry}
                          className="block text-lg my-4 font-medium hover:cursor-pointer"
                          htmlFor={industry}
                        >
                          <input
                            id={industry}
                            type="checkbox"
                            checked={formData.industries.includes(industry)}
                            className="form-checkbox mr-3 text-blue-700"
                            value={industry}
                            onChange={() => handleCheckboxChange(industry)}
                          />
                          {industry}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* get user passion */}
        {step === 3 && (
          //show multiple choice for industries
          <div className="  pb-3 ">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 ">
              <h1 className="h1">What work do you love to do?</h1>
            </div>
            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3 ">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="search"
                    >
                      Search Passion
                    </label>
                    <input
                      id="search"
                      type="text"
                      className="form-input w-full mb-3"
                      placeholder="Type to search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="max-h-96 overflow-auto">
                      {filteredPassions.map((passion) => (
                        <label
                          key={passion}
                          className="block text-lg my-4 font-medium hover:cursor-pointer"
                          htmlFor={passion}
                        >
                          <input
                            id={passion}
                            type="checkbox"
                            className="form-checkbox mr-3 text-blue-700"
                            value={passion}
                            onChange={() => handleCheckboxChange(passion)}
                          />
                          {passion}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* get user job type */}
        {step === 4 && (
          //show multiple choice for industries
          <div className="  pb-3 ">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 ">
              <h1 className="h1">What positions do you aspire?</h1>
            </div>
            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3 ">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="search"
                    >
                      Search Jobs
                    </label>
                    <input
                      id="search"
                      type="text"
                      className="form-input w-full mb-3"
                      placeholder="Type to search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="max-h-96 overflow-auto">
                      {filteredJobs.map((job) => (
                        <label
                          key={job}
                          className="block text-lg my-4 font-medium hover:cursor-pointer"
                          htmlFor={job}
                        >
                          <input
                            id={job}
                            type="checkbox"
                            checked={formData.jobTypes.includes(job)}
                            className="form-checkbox mr-3 text-blue-700"
                            value={job}
                            onChange={() => handleCheckboxChange(job)}
                          />
                          {job}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* get user skills */}
        {step === 5 && (
          //show multiple choice for industries
          <div className="  pb-3 ">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 ">
              <h1 className="h1">
                What are you great at?
                <br />
                Your skills
              </h1>
            </div>
            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3 ">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="search"
                    >
                      Search Skills
                    </label>
                    <input
                      id="search"
                      type="text"
                      className="form-input w-full mb-3"
                      placeholder="Type to search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="max-h-96 overflow-auto">
                      {filteredSkills.map((skill) => (
                        <label
                          key={skill}
                          className="block text-lg my-4 font-medium hover:cursor-pointer"
                          htmlFor={skill}
                        >
                          <input
                            id={skill}
                            type="checkbox"
                            checked={formData.skills.includes(skill)}
                            className="form-checkbox mr-3 text-blue-700"
                            value={skill}
                            onChange={() => handleCheckboxChange(skill)}
                          />
                          {skill}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {step === 6 && (
          //show multiple choice for industries
          <div className="  pb-3 ">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 ">
              <h1 className="h1">
                When do you aspire to be Job Ready ?
                <br />
              </h1>
            </div>
            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3 ">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="search"
                    >
                      Duration
                    </label>
                    <div className="max-h-96 overflow-x-visible">
                      {roadmapDuration.map((duration) => (
                        <label
                          key={duration}
                          className="block text-lg my-4 font-medium hover:cursor-pointer"
                          htmlFor={duration}
                        >
                          <input
                            id={duration}
                            type="radio"
                            checked={formData.roadmapDuration === duration}
                            className="mr-3 text-blue-700"
                            value={duration}
                            onChange={() => handleButtonChange(duration)}
                          />
                          {duration}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* get user academic curriculum pdf*/}
        {step === 7 && (
          <div className="  pb-3 ">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 ">
              <h1 className="h1">Upload your academic curriculum pdf</h1>
            </div>
            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="curriculumPdf"
                    >
                      Academic Curriculum PDF
                    </label>
                    <input
                      id="curriculumPdf"
                      type="file"
                      accept=".pdf"
                      className="form-input w-full text-gray-800"
                      onChange={(e) => handleFileChange(e, "curriculumPdf")}
                    />
                    {uploadProgress > 0 && (
                      <div className="text-xs text-gray-600 mt-2">
                        Upload progress: {uploadProgress.toFixed(2)}%
                      </div>
                    )}
                  </div>
                </div>
              </form>
              {isFileSelected && (
                <div className={"flex items-center justify-center"}>
                  <button
                    className={`btn py-2 px-10 bg-blue-600 text-white font-bold ${
                      uploadProgress > 0 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={uploadProgress > 0}
                    onClick={() =>
                      handleUploadFile(formData.curriculumPdf, "curriculumPdf")
                    }
                  >
                    Upload{" "}
                    <IoCloudUploadOutline className="ml-3 text-lg font-bold" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 8 &&
          (loading ? (
            <div
              role="status"
              className="w-full flex flex-col gap-10 justify-center p-10"
            >
              <svg
                aria-hidden="true"
                className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="text-center font-bold text-2xl">
                Generating roadmaps...
              </span>
            </div>
          ) : (
            <div className="  pb-3 ">
              <div className="w-full p-5 flex flex-col gap-5">
                <div className="text-center w-full text-2xl font-bold">
                  Choose from these roadmaps{" "}
                </div>
                {roadmaps?.map((roadmap, index) => (
                  <RoadmapShortCard key={index} roadmap={roadmap} />
                ))}
              </div>
            </div>
          ))}

        {/* get user academic curriculum pdf*/}

        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-full px-3  flex items-center justify-center gap-4 ">
            {step > 0 && step !== 8 && (
              <button
                className="btn text-blue-600  border-2  border-blue-600  w-55"
                onClick={() => {
                  handlePrev();
                }}
              >
                Previous
              </button>
            )}
            {step === 0 ? (
              <button
                className="btn text-white bg-blue-600  w-55"
                onClick={handleSignUp}
              >
                Sign me Up !
              </button>
            ) : step !== 7 ? (
              <button
                className="btn text-white bg-blue-600  w-55"
                onClick={() => handleNext()}
              >
                Next
              </button>
            ) : (
              <button
                className="btn text-white bg-blue-600  w-55"
                onClick={() => {
                  handleFinish();
                }}
              >
                Finish
              </button>
            )}
          </div>
        </div>
        <div className="text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-600 hover:underline transition duration-150 ease-in-out"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
