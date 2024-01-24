# import google.generativeai as genai
# import cv2
# from deepface import DeepFace

# genai.configure(api_key="AIzaSyBpgcMCZS6Ro32ObfB4E9wUCEikOX75VtE")


# generation_config = {
#     "temperature": 0.8,
#     "top_p": 1,
#     "top_k": 1,
#     "max_output_tokens": 2048,
# }

# safety_settings = [
#     {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
#     {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
#     {
#         "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
#         "threshold": "BLOCK_MEDIUM_AND_ABOVE",
#     },
#     {
#         "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
#         "threshold": "BLOCK_MEDIUM_AND_ABOVE",
#     },
# ]

# model = genai.GenerativeModel(
#     model_name="gemini-pro",
#     generation_config=generation_config,
#     safety_settings=safety_settings,
# )


# # def analyze_emotions(frame):
# #     result = DeepFace.analyze(frame, actions=["emotion"])
# #     emotions = result[0]["emotion"]
# #     dominant_emotion = max(emotions, key=emotions.get)
# #     return dominant_emotion


# # def process_video(video_path, skip_frames=5, resize_width=None, resize_height=None):
# #     cap = cv2.VideoCapture(video_path)
# #     dominant_emotions_list = []
# #     width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
# #     height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
# #     while cap.isOpened():
# #         ret, frame = cap.read()
# #         if not ret:
# #             break
# #         # Skip frames
# #         if cap.get(cv2.CAP_PROP_POS_FRAMES) % skip_frames != 0:
# #             continue
# #         # Resize the frame to a smaller resolution if specified
# #         if resize_width and resize_height:
# #             frame = cv2.resize(frame, (resize_width, resize_height))
# #         dominant_emotion = analyze_emotions(frame)
# #         dominant_emotions_list.append(dominant_emotion)
# #     cap.release()
# #     emotions_string = ", ".join(dominant_emotions_list)
# #     return f"{emotions_string}"


# # video_path = "https://firebasestorage.googleapis.com/v0/b/iitb-brogrammers.appspot.com/o/interviewVideos%2FuserId%2Fquestion1%2Fdemo-interview-no-audio.webm?alt=media&token=fad4f2e2-b048-4343-9d5b-353077aafc96"
# # emotions = process_video(video_path, skip_frames=5, resize_width=320, resize_height=240)


# transcript = """Well, you know, Node.js is like this thing with events and loops, right? So, there's this loop, uh, the event loop, and it's non-blocking or something. It's like, it can handle many things at once, I guess. And, um, traditional blocking I/O is different, you know, because it's blocking, obviously.
# So, the event loop, it, like, handles events, and, uh, it's non-blocking, so it doesn't wait for stuff. It's, uh, asynchronous, I think. And, um, traditional blocking I/O, it's like, it waits, and, uh, it's synchronous, I guess? So, yeah, that's, uh, Node.js and the event loop. Non-blocking is better, I think."""


# userdata = """[
#     {
#         "college_name": [
#             "B.Tech Computer Science & Engineering (Data Science)"
#         ],
#         "company_names": [
#             "Edsarrthi",
#             "Mordernizing Process"
#         ],
#         "degree": [
#             "CGPA: 9.2/10"
#         ],
#         "designation": [
#             "Software Developer",
#             "Full-Stack Web Developer Intern"
#         ],
#         "email": "shantanuesakpal1420@gmail.com",
#         "mobile_number": "+91 9324406353",
#         "name": "Shantanu Sakpal",
#         "no_of_pages": 1,
#         "skills": [
#             "Next.js",
#             "React.js",
#             "Node.js",
#             "Postman",
#             "Firebase",
#             "Flask",
#             "Tailwind CSS",
#             "Git",
#             "GitHub",
#             "Figma",
#             "AWS",
#             "MongoDB",
#             "PyTorch"
#         ],
#         "total_experience": 0.5
#     }
# ]
# """

# emotions = "fear, neutral, fear, fear, fear, neutral, neutral, fear, neutral, fear, neutral, neutral, neutral, neutral, neutral, neutral, neutral, surprise, neutral, neutral, neutral, surprise, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, surprise, surprise, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, fear, neutral, surprise, neutral, neutral, surprise, fear, fear, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, surprise, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, fear, neutral, fear, fear, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, surprise, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, fear, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, fear, surprise, surprise, surprise, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, fear, neutral, neutral, neutral, neutral, surprise, neutral, neutral, neutral, neutral, surprise, neutral, neutral, neutral, neutral, fear, neutral, neutral, neutral, neutral, surprise, neutral, neutral, neutral, neutral, surprise, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral, neutral"

# question = """Can you explain the event loop in Node.js and how it differs from traditional blocking I/O?"""

# prompt_parts = [
#     transcript,
#     userdata,
#     question,
#     emotions,
#     '''Analyze the user's answer and profile. Provide feedback on the content of the answer, highlighting areas where the user excelled and pointing out aspects that could be improved. Suggest additional information or details that the user could have included in their response based on their profile.
# Additionally, assess the user's confidence level during the answer. Comment on whether the user appeared confident, underconfident, unsure, or any other relevant observations. Offer specific suggestions on how the user can enhance their confidence and communication skills.Also consider users emotions when he answered the question.
# Output: Give entire response in first person (you)
# Generate a well-structured response that includes constructive feedback on the user's answer, suggestions for improvement, and insights into their confidence level. Aim to guide the user in presenting more effective and compelling responses in future interviews.Also give appropriate coorect answer for the the question asked."''',
# ]

# response = model.generate_content(prompt_parts)
# print(response.text)


# video_processor.py
import cv2
from deepface import DeepFace


def analyze_emotions(frame):
    result = DeepFace.analyze(frame, actions=["emotion"])
    emotions = result[0]["emotion"]
    dominant_emotion = max(emotions, key=emotions.get)
    return dominant_emotion


def process_video(video_path, skip_frames=5, resize_width=None, resize_height=None):
    cap = cv2.VideoCapture(video_path)
    dominant_emotions_list = []
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        # Skip frames
        if cap.get(cv2.CAP_PROP_POS_FRAMES) % skip_frames != 0:
            continue
        # Resize the frame to a smaller resolution if specified
        if resize_width and resize_height:
            frame = cv2.resize(frame, (resize_width, resize_height))
        dominant_emotion = analyze_emotions(frame)
        dominant_emotions_list.append(dominant_emotion)
    cap.release()
    emotions_string = ", ".join(dominant_emotions_list)
    return emotions_string
