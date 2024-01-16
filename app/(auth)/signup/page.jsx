"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const industryCategories = [
    "Agriculture & Environment",
    "Arts & Handicraft",
    "Construction & Engineering",
    "Construction & Real Estate",
    "Consulting & Business Services",
    "Education",
    "Energy & Utilities",
    "Entertainment",
    "Finance",
    "Food & Nutrition",
    "HR & Recruiting",
    "Health & Wellness",
    "Hospitality & Travel",
    "Logistics & Transportation",
    "Manufacturing & Production",
    "Media & Communications",
    "Other",
    "Public Services",
    "Retail & FMCG",
    "Tech & Software",
    "Telecom & Networking",
  ];

  const passions = [
    "Administrative",
    "Agriculture & Environment",
    "Business & Leadership",
    "Construction & Engineering",
    "Customer Service & Support",
    "Design & Arts",
    "Education & Training",
    "Energy & Utilities",
    "Finance & Banking",
    "Food & Nutrition",
    "HR & Recruiting",
    "Healthcare",
    "Hospitality & Travel",
    "Human Resources",
    "IT & Software",
    "Insurance",
    "Legal Services",
    "Logistics & Transportation",
    "Maintenance & Repair",
    "Manufacturing & Operations",
    "Media & Communications",
    "Other",
    "Professional",
    "Project & Program Management",
    "Public Services & Community",
    "Real Estate",
    "Religious Services",
    "Research & Science",
  ];

  const jobs = [
    "Administrative Assistant",
    "Office Manager",
    "Executive Secretary",
    "Agricultural Scientist",
    "Environmental Engineer",
    "Farm Manager",
    "Business Analyst",
    "Operations Manager",
    "Executive Director",
    "Civil Engineer",
    "Construction Manager",
    "Architect",
    "Customer Service Representative",
    "Technical Support Specialist",
    "Call Center Supervisor",
    "Graphic Designer",
    "Interior Designer",
    "Art Director",
    "Teacher",
    "Training Specialist",
    "Education Consultant",
    "Energy Analyst",
    "Utilities Manager",
    "Renewable Energy Engineer",
    "Financial Analyst",
    "Bank Manager",
    "Investment Advisor",
    "Nutritionist",
    "Chef",
    "Food Quality Inspector",
    "HR Specialist",
    "Recruitment Manager",
    "Employee Relations Consultant",
    "Healthcare Administrator",
    "Registered Nurse",
    "Medical Lab Technologist",
    "Hotel Manager",
    "Travel Agent",
    "Tour Guide",
    "Human Resources Manager",
    "Employee Training Specialist",
    "Benefits Administrator",
    "IT Specialist",
    "Software Engineer",
    "Systems Analyst",
    "Insurance Agent",
    "Claims Adjuster",
    "Underwriter",
    "Legal Assistant",
    "Paralegal",
    "Legal Secretary",
    "Logistics Coordinator",
    "Warehouse Manager",
    "Delivery Driver",
    "Maintenance Technician",
    "Repair Specialist",
    "Facilities Manager",
    "Manufacturing Engineer",
    "Production Supervisor",
    "Quality Control Inspector",
    "Journalist",
    "Public Relations Specialist",
    "Social Media Manager",
    "Other",
    "Professional",
    "Project Manager",
    "Public Service Administrator",
    "Community Organizer",
    "Social Worker",
    "Real Estate Agent",
    "Property Manager",
    "Appraiser",
    "Pastor",
    "Religious Educator",
    "Chaplain",
    "Research Scientist",
    "Data Analyst",
    "Lab Technician",
  ];

  const skills = [
    "JavaScript",
    "React",
    "Vue.js",
    "Node.js",
    "Python",
    "Java",
    "C#",
    "PHP",
    "Ruby",
    "HTML",
    "Bootstrap",
    "Django",
    "Flask",
    "Express.js",
    "RESTful API Development",
    "GraphQL",
    "Databases (MySQL, PostgreSQL, MongoDB)",
    "Responsive Web Design",
    "Git/GitHub",
    "Webpack",
    "Jira",
    "Unit Testing",
    "Continuous Integration/Continuous Deployment (CI/CD)",
    "Agile/Scrum Methodologies",
    "Containerization (Docker)",
    "Microservices Architecture",
    "Cloud Platforms (AWS, Azure, Google Cloud)",
    "Web Security",
    "Machine Learning",
    "Blockchain",
    "UI/UX Design",
    "Mobile App Development (iOS/Android)",
  ];

  const [searchTerm, setSearchTerm] = useState("");

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

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];

    setFormData((prevData) => ({
      ...prevData,
      [field]: file,
    }));
  };

  const handleCheckboxChange = (value) => {
    if (step === 1) {
      //industry
      if (formData.industries.includes(value)) {
        //remove
        setFormData((prevData) => ({
          ...prevData,
          industries: prevData.industries.filter((item) => item !== value),
        }));
      } else {
        //add
        setFormData((prevData) => ({
          ...prevData,
          industries: [...prevData.industries, value],
        }));
      }
    } else if (step === 2) {
      //passion
      if (formData.passions.includes(value)) {
        //remove
        setFormData((prevData) => ({
          ...prevData,
          passions: prevData.passions.filter((item) => item !== value),
        }));
      } else {
        //add
        setFormData((prevData) => ({
          ...prevData,
          passions: [...prevData.passions, value],
        }));
      }
    } else if (step === 3) {
      //job type
      if (formData.jobTypes.includes(value)) {
        //remove
        setFormData((prevData) => ({
          ...prevData,
          jobTypes: prevData.jobTypes.filter((item) => item !== value),
        }));
      } else {
        //add
        setFormData((prevData) => ({
          ...prevData,
          jobTypes: [...prevData.jobTypes, value],
        }));
      }
    } else if (step === 4) {
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
    }
  };

  const handlePrev = () => {
    window.scrollTo(0, 0);

    setStep(step - 1);
  };
  const handleNext = () => {
    //scroll to top
    window.scrollTo(0, 0);
    setStep(step + 1);
  };

  const handleFinish = () => {
    //log the form data, the form data is being stored in formData
    console.log("formData,", formData);
    /*e.g. formData = {
            "name": "shantanu sakpal",
            "email": "shantanuesakpal1405@gmail.com",
            "industries": [
              "Agriculture & Environment",
              "Tech & Software"
            ],
            "passions": [
              "IT & Software",
              "Agriculture & Environment",
              "Healthcare"
            ],
            "jobTypes": [
              "Medical Lab Technologist",
              "Data Analyst"
            ],
            "skills": [
              "JavaScript",
              "Vue.js"
            ],
            "cirriculumPdf": {
              File Object
            },
            "resumePdf": {
              File Object
            }
          } */

    //send the form data to the backend

    // fetch("/api/user", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     //redirect to career compass
    //      router.push("/career-compass");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industries: [],
    passions: [],
    jobTypes: [],
    skills: [],
    cirriculumPdf: null,
    resumePdf: null,
  });

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
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* get user industry */}
        {step === 1 && (
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
                      value={searchTerm}
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
        {step === 2 && (
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
        {step === 3 && (
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
        {step === 4 && (
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

        {/* get user academic cirriculum pdf*/}
        {step === 5 && (
          <div className="  pb-3 ">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 ">
              <h1 className="h1">Upload your academic cirriculum pdf</h1>
            </div>
            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="cirriculumPdf"
                    >
                      Academic Curriculum PDF
                    </label>
                    <input
                      id="cirriculumPdf"
                      type="file"
                      accept=".pdf"
                      className="form-input w-full text-gray-800"
                      onChange={(e) => handleFileChange(e, "cirriculumPdf")}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* get user academic cirriculum pdf*/}
        {step === 6 && (
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
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-full px-3  flex items-center justify-center gap-4 ">
            {step > 0 && (
              <button
                className="btn text-blue-600  border-2  border-blue-600  w-52 "
                onClick={() => {
                  handlePrev();
                }}
              >
                Previous
              </button>
            )}
            {step !== 6 ? (
              <button
                className="btn text-white bg-blue-600  w-52 "
                onClick={() => {
                  handleNext();
                }}
              >
                Next
              </button>
            ) : (
              <button
                className="btn text-white bg-blue-600  w-52 "
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
