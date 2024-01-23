import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from "../../config/firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";
import axios from 'axios';


const EmployeeLearning = () => {
  const { taskid } = useParams();
  const [task, setTask] = useState(null);
  const [youtubeIds, setYoutubeIds] = useState(null);
  const [referenceLinks, setReferenceLinks] = useState(null)

  useEffect(() => {
    
    const fetchTask = async () => {
      try {
        const taskRef = doc(db, "Tasks", taskid);
        const taskSnapshot = await getDoc(taskRef);

        if (taskSnapshot.exists()) {
          // Document exists, set the task state
          const task = { id: taskSnapshot.id, ...taskSnapshot.data() }
          console.log("my task", task)
          setTask(task)


          const yutuasdf = await generateYouTubeQueryAndFetchResponse(task.task_name, task.task_description)
          console.log("yutuasdf", yutuasdf)
          setYoutubeIds(yutuasdf)


          const rf = await generateReferenceLinks(task.task_name, task.task_description)
          console.log(" rafasdf", rf);
          setReferenceLinks(rf)

        } else {
          console.error('Task not found.');
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, []);



  function generateReferenceLinks(title, description) {
    // Set your OpenAI GPT API key
    const apiKey = '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';

    // Define a prompt
    const prompt = `generate a query to search on google to learn relevant skill to do the following task title ${title} and description ${description} give response in one line `;

    // Make a request to the GPT API
    return axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
      {
        prompt: prompt,
        max_tokens: 15  // Adjust the number of tokens as needed
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    ).then(response => {
      // Get the generated text from the response
      const generatedText = response.data.choices[0].text.trim();
      const linkPrompt = `${generatedText} -> for this title of task  suggest reference and study link to refer to accomplish this task -> give only the raw links in a list like -> link1.com, link2.com, ...., link5 -> don't include the title of link -> give complete URL and don't include anything else except the link comma separated`;

      // Make a request to the GPT API for generating links
      return axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: linkPrompt,
          max_tokens: 150  // Adjust the number of tokens as needed
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        }
      ).then(res => {
        const linksResponse = res.data.choices[0].text.trim();

        // Use a regular expression to clean up the output
        const links = linksResponse.match(/https?:\/\/[^\s]+/g);
        console.log("Reference Links:", links);

        return links || []; // Return an empty array if links are null
      });
    });
  }

  function generateYouTubeQueryAndFetchResponse(title, description) {
    // Set your OpenAI GPT API key
    const apiKey = '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';

    // Define a prompt
    const prompt = `generate a query to search on youtube to learn relevant skill to do the following task title ${title} and description ${description} give response in one line `;

    // Make a request to the GPT API
    return axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
      {
        prompt: prompt,
        max_tokens: 15  // Adjust the number of tokens as needed
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    )
      .then(response => {
        // Get the generated text from the response
        const generatedText = response.data.choices[0].text.trim();

        // Print the generated text
        console.log("Generated Query:", generatedText);

        // Use the generated text as the query parameter for the YouTube API
        const youtubeApiKey = 'AIzaSyDLGOfsmQ3kvOt8OLHOxiFhs4IcpHyjgDE';  // Replace with your actual YouTube API key
        const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&q=${encodeURIComponent(generatedText)}`;

        // Make a request to the YouTube API and return the promise
        return axios.get(youtubeApiUrl);
      })
      .then(youtubeResponse => {
        // Extract video IDs from the YouTube API response
        const videoIds = youtubeResponse.data.items.map(item => item.id.videoId);

        // Return the list of video IDs
        return videoIds;
      })
      .catch(error => {
        throw error.response ? error.response.data : error.message;
      });
  }

  return (
    <div className='p-4'>
      <h2 className='p-3' >Task</h2>
      {task && (
        <div style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
          <div className='flex justify-between'><b><h4 >{task.task_name}</h4></b> <button className='p-2 bg-purple-100 rounded-lg'> {task.task_status}</button> </div>
          <p>{task.task_description}</p>

          <p>Priority: {task.task_priority}</p>
          <p>Due Date: {task.task_due_date}</p>
          {/* Display other task data fields as needed */}
        </div>
      )}

      {/* Other content */}
      <h2 className='p-3'>Suggested YouTube Videos</h2>
      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {youtubeIds?.map((videoId) => (
          <div key={videoId} style={{ display: 'inline-block', margin: '0 8px' }}>
            <iframe
              width="300"
              height="200"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`YouTube Video ${videoId}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>

      <div>
        <h2 className='p-3' >Suggested Reference Links</h2>
        <div style={{ overflowX: 'auto' }}>
          {referenceLinks?.map((link, index) => (
            <div key={index} style={{ margin: '0 8px' }}>
              <a href={link} target="_blank" rel="noopener noreferrer" >
                {link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeLearning;
