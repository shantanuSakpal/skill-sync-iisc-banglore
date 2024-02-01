"use client";
import Link from "next/link";
import React from "react";
import { Chrono } from "react-chrono";
import { FaCheckCircle } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
export default function MainTaskDescription({ phase, roadmap }) {
  const [selectedSubtask, setSelectedSubtask] = React.useState(null);
  const [projectsLink, setProjectsLink] = React.useState(null);

  /*"roadmap": [
    {
      "id": "1",
      "name": "HTML",
      "curriculum": [
        "Introduction to Web Development",
        "Understanding HTML",
        "HTML Document Structure",
        "HTML Tags and Elements",
        "Creating Forms in HTML"
      ],
      "materials": "Recommended Book: 'HTML and CSS: Design and Build Websites' by Jon Duckett",
      "projects": "redirect to project page with filter",
      "done": false,
      "subtasks": [
        {
          "name": "Basic HTML Structure",
          "description": "Learn the basic structure of an HTML document.",
          "curriculum": "Introduction to Web Development",
          "materials": "W3Schools - Basic HTML Structure",
          "projects": "redirect to project page, search for the project",
          "done": false
        },
        {
          "name": "Important Tags",
          "description": "Explore essential HTML tags and their usage.",
          "curriculum": "Understanding HTML",
          "materials": "MDN Web Docs - HTML Element Reference",
          "projects": "redirect to project page, search for the project",
          "done": false
        },
        {
          "name": "IDs and Classes",
          "description": "Understand how to use IDs and classes in HTML elements.",
          "curriculum": "HTML Tags and Elements",
          "materials": "CSS-Tricks - IDs and Classes",
          "projects": "redirect to project page, search for the project",
          "done": false
        }
      ]
    },...
  ]*/

  //"phase":{
  //   "id": "1",
  //   "name": "HTML",
  //   "description": "Learn the basics of HTML and how to create forms. This will be the foundation of your web development journey.",
  //   "curriculum": [
  //     "Introduction to Web Development",
  //     "Understanding HTML",
  //     "HTML Document Structure",
  //     "HTML Tags and Elements",
  //     "Creating Forms in HTML"
  //   ],
  //   "materials": "Recommended Book: 'HTML and CSS: Design and Build Websites' by Jon Duckett",
  //   "projects": "redirect to project page with filter",
  //   "date": "26th Jan - 5th Feb",
  //   "done": true,
  // "tags": ["HTML", "Web Development"],
  //   "subtasks": [
  //     {
  //       "name": "Basic HTML Structure",
  //       "description": "Learn the basic structure of an HTML document.",
  //       "curriculum": ["Introduction to Web Development", "demo topic"],
  //       "materials": "W3Schools - Basic HTML Structure",
  //       "projects": "redirect to project page, search for the project",
  //       "done": false,
  //       "date": "20th Jan - 25th Jan",
  // "tags": ["HTML", "Web Development"]
  //     },
  //     {
  //       "name": "Important Tags",
  //       "description": "Explore essential HTML tags and their usage.",
  //       "curriculum": ["Understanding HTML"],
  //       "materials": "MDN Web Docs - HTML Element Reference",
  //       "projects": "redirect to project page, search for the project",
  //       "done": false,
  //       "date": "26th Jan - 31st Jan"
  //     },
  //     {
  //       "name": "IDs and Classes",
  //       "description": "Understand how to use IDs and classes in HTML elements.",
  //       "curriculum": ["HTML Tags and Elements"],
  //       "materials": "CSS-Tricks - IDs and Classes",
  //       "projects": "redirect to project page, search for the project",
  //       "done": false,
  //       "date": "1st Feb - 5th Feb"
  //     }
  //   ]
  // },
  // console.log("phase", phase);
  const items = phase.subtasks.map((subtask, index) => {
    return {
      cardTitle: subtask.name,

      startDate: new Date(),
      endDate: new Date(), // You can customize the end date based on your requirements
    };
  });

  const timelineTheme = {
    primary: "#a55dff",
    secondary: "#a55dff",
    cardBgColor: "#fff", // Set the background color of the cards
    titleColor: "black", // Set the color of the title text
    subtitleColor: "black", // Set the color of the subtitle text
    titleColorActive: "black",
    iconBackgroundColor: "white",
    //set color of border of time line container
    timelineItemBorderRadius: "10px",
    cardBorderColor: "gray",
  };

  //find the index of first subtask that is not done
  const firstUndoneSubtaskIndex = phase.subtasks.findIndex((subtask) => {
    return !subtask.done;
  });

  return (
    <div className="flex  justify-center gap-5 p-5 w-full bg-pur rounded-lg shadow-lg">
      <div className="w-1/2 text-center ">
        <Chrono
          items={items}
          mode="VERTICAL_ALTERNATING"
          itemWidth={100}
          cardHeight={50}
          onItemSelected={(item) => {
            setSelectedSubtask(phase.subtasks[item.index]);
            let initialString = `/solver-space/filter?q=`;
            let link = initialString.concat(
              phase.subtasks[item.index].tags?.join("+")
            );
            setProjectsLink(link);
          }}
          highlightCardsOnHover
          slideItemDuration={500}
          theme={timelineTheme}
          hideControls
          activeItemIndex={firstUndoneSubtaskIndex}
          timelinePointDimension={20}
        >
          <div className="chrono-icons">
            {
              //if done, show checkmark
              //if in progress, show milestone
              //if not started, show achievement
              phase.subtasks.map((subtask, index) => {
                if (subtask.done) {
                  return (
                    <FaCheckCircle
                      key={index}
                      className="
                  text-green-600
                  text-2xl
                  w-full
                  "
                    />
                  );
                } else {
                  return (
                    <MdAccessTimeFilled
                      key={index}
                      className="
                  text-blue-900
                  text-2xl
                  "
                    />
                  );
                }
              })
            }
          </div>
        </Chrono>
      </div>

      <div className="w-1/2 flex flex-col gap-5">
        <div
          className="
          bg-transparent  p-5 rounded-lg shadow-lg flex flex-col gap-5 "
        >
          <div className="text-center w-full text-xl text-purple-600 font-bold">
            LEARN
          </div>
          <div className=" w-full font-bold text-lg ">
            {selectedSubtask?.name}
            <div className=" w-full font-normal text-sm ">
              {selectedSubtask?.description}
            </div>
          </div>

          <div className="">
            <span
              className="
            font-bold text-sm
            "
            >
              Topics from your curriculum
            </span>
            <ul className="text-md">
              {selectedSubtask?.curriculum.map((topic, index) => {
                return (
                  <li key={index}>
                    {index + 1}
                    {". "}
                    {topic}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="">
            <span
              className="
            font-bold text-sm
            "
            >
              Reference Material
            </span>
            <ul className="text-md">{selectedSubtask?.materials}</ul>
          </div>

          <div className="w-full text-center my-5 flex flex-row gap-5 justify-center items-center">
            <div>30% Completed</div>
            {selectedSubtask?.done ? (
              <button
                className="flex flex-row gap-2 justify-center items-center rounded-lg shadow-lg border-2 border-red-300 px-2 py-1 font-semibold text-xs "
                onClick={() => {
                  setSelectedSubtask({ ...selectedSubtask, done: false });
                }}
              >
                Mark pending
                <MdAccessTimeFilled className="text-lg font-normal" />
              </button>
            ) : (
              <button
                className="flex flex-row gap-2 justify-center items-center rounded-lg shadow-lg bg-green-500 px-2 py-1 font-semibold text-xs hover:bg-green-600"
                onClick={() => {
                  setSelectedSubtask({ ...selectedSubtask, done: true });
                }}
              >
                Mark done
                <FaCheckCircle />
              </button>
            )}
          </div>
        </div>

        <div
          className="
          bg-gray-100 border p-5 rounded-lg shadow-lg flex flex-col gap-5 "
        >
          <div className="text-center w-full text-xl text-purple-600 font-bold">
            APPLY
          </div>

          <Link
            href={`${projectsLink}`}
            className="px-3 py-2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg shadow-lg hover:from-purple-400 hover:to-pink-400 text-center font-semibold"
          >
            Solve real-life scenarios for this topic
          </Link>
        </div>
      </div>
    </div>
  );
}
