"use client";

import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import SubjectRankerImg from "@/public/images/subject-ranker-img.png";
import RoadmapImg from "@/public/images/roadmap-img.jpg";
import CollabzoneImg from "@/public/images/projects-vector-img.jpg";
import InterviewPrep from "@/public/images/interview-img.jpg";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

export default function Features() {
  const [tab, setTab] = useState<number>(1);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md: ">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Explore our features</h1>
          </div>

          {/* Career Compass */}
          <div className="md:grid md:grid-cols-12 md:gap-6 mb-20 ">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Career Compass</h3>
                <p className="text-xl text-gray-600">
                  Uses smart analysis of your experience and goals to generate a
                  custom career plan designed around options, capabilities,
                  timelines and your academic curriculum that align with your
                  aspirations.
                </p>
                <Link
                  href={"/career-compass"}
                  className="btn text-white bg-blue-600 hover:bg-blue-700 w-1/2 mb-4 sm:w-auto sm:mb-0 mt-5 capitalize"
                >
                  Create my roadmap <FiExternalLink className="inline mx-2" />
                </Link>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 1
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Personalised Roadmap
                    </div>
                    <div className="text-gray-600">
                      An adaptive career roadmapping assistant tailored to your
                      unique aspirations, skills and timeframes.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                    </svg>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 2
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 capitalize">
                      Analyze curriculum
                    </div>
                    <div className="text-gray-600">
                      Intelligently analyzes curriculum and aspiration data to
                      rank your subjects aligning with your goals.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div className="transition-all">
                <div
                  className="relative flex flex-col text-center lg:text-right"
                  data-aos="zoom-y-out"
                  ref={tabs}
                >
                  {/* Item 1 */}
                  <Transition
                    show={tab === 1}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="md:max-w-none mx-auto rounded"
                        src={RoadmapImg}
                        width={500}
                        height="462"
                        alt="Features bg"
                      />
                    </div>
                  </Transition>
                  {/* Item 2 */}
                  <Transition
                    show={tab === 2}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="md:max-w-none mx-auto rounded"
                        src={SubjectRankerImg}
                        width={500}
                        height="462"
                        alt="Features bg"
                      />
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>

          {/* Solver Space */}
          <div className="md:grid md:grid-cols-12 md:gap-6 mb-20 ">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Solver Space</h3>
                <p className="text-xl text-gray-600">
                  A collaboration hub for student-industry project partnerships
                  centered around practical skill-building in an area of your
                  choice. Work on real-world use cases to showcase applied
                  capabilities beyond academics.
                </p>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <Link
                  href={"/career-compass"}
                  className="btn text-white bg-blue-600 hover:bg-blue-700 w-1/2 mb-4 sm:w-auto sm:mb-0 mt-5 capitalize"
                >
                  Check out some real-world projects{" "}
                  <FiExternalLink className="inline mx-2" />
                </Link>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <Image
                src={CollabzoneImg}
                width={450}
                height="462"
                alt="Features bg"
              />
            </div>
          </div>

          {/* Interview Ace */}
          <div className="md:grid md:grid-cols-12 md:gap-6 mb-20 ">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Interview Ace</h3>
                <p className="text-xl text-gray-600">
                  Analyzes your experience and dream jobs to provide tailored
                  assistance for acing critical interview questions. Refines
                  your answers with personalized feedback through mock
                  simulations to optimally highlight your fit.
                </p>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <Link
                  href={"/interview-ace"}
                  className="btn text-white bg-blue-600 hover:bg-blue-700 w-1/2 mb-4 sm:w-auto sm:mb-0 mt-5 capitalize"
                >
                  Start your interview preperation now{" "}
                  <FiExternalLink className="inline mx-2" />
                </Link>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <Image
                src={InterviewPrep}
                width={500}
                height="462"
                alt="Features bg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
