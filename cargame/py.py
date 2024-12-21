import speech_recognition as sr
import pyttsx3
import datetime

# Initialize the recognizer
recognizer = sr.Recognizer()
# Initialize the text-to-speech engine
engine = pyttsx3.init()

def speak(text):
    """Function to make JARVIS speak the given text."""
    engine.say(text)
    engine.runAndWait()

def listen():
    """Function to listen to the user's voice command."""
    with sr.Microphone() as source:
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
        
        try:
            command = recognizer.recognize_google(audio)
            print(f"You said: {command}")
            return command.lower()
        except sr.UnknownValueError:
            speak("Sorry, I did not understand that.")
            return ""
        except sr.RequestError:
            speak("Sorry, my speech service is down.")
            return ""

def main():
    """Main function to run the JARVIS assistant."""
    speak("Hello, I am JARVIS. How can I assist you today?")
    
    while True:
        command = listen()
        
        if "time" in command:
            current_time = datetime.datetime.now().strftime("%I:%M %p")
            speak(f"The current time is {current_time}")
        elif "date" in command:
            current_date = datetime.datetime.now().strftime("%B %d, %Y")
            speak(f"Today's date is {current_date}")
        elif "exit" in command or "quit" in command:
            speak("Goodbye!")
            break
        else:
            speak("I am sorry, I can only tell you the time and date for now.")

if __name__ == "__main__":
    main()