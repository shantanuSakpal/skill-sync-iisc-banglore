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
