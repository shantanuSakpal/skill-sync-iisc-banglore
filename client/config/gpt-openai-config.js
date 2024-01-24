import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY, dangerouslyAllowBrowser: true  });

const time_period = "In 6 - 12 months"

const format = `{
  "roadmaps": [
    {
      "title": "Role or Skill Focus",  
      "overview": "High-level background of the roadmap including potential job roles or skill outcomes",
      "duration": "Expected timeline",  
      "topics": [
        "Main topic 1",
        "Main topic 2",
        "Main topic 3"  
      ],
      "learning_objectives": [ 
        "Key learning objective 1",
        "Key learning objective 2", 
        "Key learning objective 3"
      ],
      "prerequisites": [
       "Prerequisites if any"  
      ],
      "sample_courses": [
        "Example online courses"  
      ] 
    }
  ] 
}`

var prompt = `You are a guide to a person who seeks a structured path for learning some skills. Suggest up to 4 specific roadmap(s) options for a person who's interested in specific industries, has specific skills, is passionate about specific jobs and want to be job ready in a specific time window. Structure your suggestions starting with the highest priority roadmap.
For e.g. 
The user would be suggested the roadmaps in the following JSON format :

${format}

Make sure to follow the above JSON format for providing the response.
Ensure each roadmap's title specifies only ONE main role or skillset target, not multiple.
The title of the a particular roadmap must contain only one field and should not be merged. For e.g. "DevOps Engineer with Blockchain" is not allowed since "DevOps Engineering" and "Blockchain" are two separate fields`

export default async function getRoadmaps(skills, jobs, industries, passions, time_periods) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [{ role: "system", content: prompt },
      { role: "user", content: `Generate a roadmap for an individual with the following set of skills : ${skills}, industries_of_interest : ${industries}, job_aspirations : ${jobs}, and passions : ${passions} and wants to be job ready in the following time : ${time_periods}. Also note that you need not consider all the skills, industries_of_interest, jobs and passions of the user. Just consider few important ones and suggest unique roadmaps. Also the title and details of a particular roadmap must be coherent. No irrelevant technology must be included in the details if it doesn't relate with the title.` }
      ],
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error(err);
  }
}
