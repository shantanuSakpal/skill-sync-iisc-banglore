"use client";
import React, { useEffect } from "react";
import { Chrono } from "react-chrono";
import data from "@/data/data.json";
import MainTaskDescription from "@/components/roadmap/MainTaskDescription.jsx";
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
import { MdAccessTimeFilled } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { auth, db, storage } from "@/config/firebase-config";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useEdges } from "reactflow";

const roadmapToTimelineItems = (roadmap) => {
  let timelineItems = [];

  roadmap.forEach((phase) => {
    const phaseStartDate = new Date();
    timelineItems.push({
      title: phase.name,
      cardTitle: phase.name,
      cardSubtitle: phase.description,
      cardDetailedText: phase.curriculum.join(", "),
      startDate: phaseStartDate,
      endDate: phaseStartDate,
    });
  });

  return timelineItems;
};

const roadmap = data.roadmap;

const timelineTheme = {
  primary: "rgb(47, 68, 255)",
  secondary: "rgb(197, 147, 255)",
  cardBgColor: "#fff", // Set the background color of the cards
  titleColor: "black", // Set the color of the title text
  subtitleColor: "black", // Set the color of the subtitle text
  titleColorActive: "black",
  iconBackgroundColor: "white",
};

const Page = () => {
  const items = roadmapToTimelineItems(roadmap);

  return (
    <div className="px-5  w-full flex justify-center flex-col">
      <div className="mb-4 w-full text-center text-xl font-bold ">
        Your Roadmap
      </div>
      <div className=" shadow-lg w-fit mx-auto rounded-lg  p-5">
        <Chrono
          items={items}
          mode="HORIZONTAL"
          itemWidth={250}
          timelinePointShape="circle"
          timelinePointDimension={40}
          theme={timelineTheme} // Set the theme for the timeline
          cardHeight="50vh"
          fontSizes={{
            cardSubtitle: "0.85rem",
            cardText: "0.8rem",
            cardTitle: "1.5rem",
            title: "1.2rem",
          }}
          lineWidth={3}
          slideItemDuration={500}
        >
          <div className="chrono-icons">
            {
              //if done, show checkmark
              //if in progress, show milestone
              //if not started, show achievement
              roadmap.map((phase, index) => {
                if (phase.done) {
                  return (
                    <FaCheckCircle
                      key={index}
                      className="
                  text-purple-700
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
                  text-gray-400
                  text-2xl
                  "
                    />
                  );
                }
              })
            }
          </div>

          {roadmap.map((phase, index) => {
            return <MainTaskDescription key={index} phase={phase} />;
          })}
        </Chrono>
      </div>
    </div>
  );
};

export default Page;
