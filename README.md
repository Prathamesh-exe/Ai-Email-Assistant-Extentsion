# Smart AI Email Assistant (Chrome Extension)

## Overview  
The **Smart AI Email Assistant** is a Chrome extension that helps users generate AI-powered email replies directly within Gmail. It leverages the **Gemini API** to analyze email content and suggest context-aware responses. The backend is built with **Spring Boot**, handling email processing and API communication seamlessly.  

## Features  
- 🚀 **AI-Powered Replies**: Automatically generates intelligent email responses.  
- 📩 **Seamless Gmail Integration**: Works directly within the Gmail interface.  
- ⚡ **One-Click Reply Generation**: Generates responses with a single button click.  
- 🔄 **Customizable Responses**: Allows users to modify generated replies before sending.  
- 🌐 **Efficient API Communication**: Uses **Spring Boot** as the backend to interact with the **Gemini API**.  

## Tech Stack  
- **Frontend**: JavaScript, Chrome Extension APIs, Gmail DOM Manipulation  
- **Backend**: Spring Boot  
- **AI Integration**: Gemini API  

## How It Works  
1. The user installs the Chrome extension.  
2. The extension detects an open email in Gmail.  
3. When the user clicks the **"AI Reply"** button, the email content is sent to the Spring Boot backend.  
4. The backend processes the email and fetches a relevant AI-generated response from the **Gemini API**.  
5. The response is displayed in the Gmail reply box, allowing the user to edit or send it.  

## Example Usage  

![Screenshot 2025-03-21 193729](https://github.com/user-attachments/assets/99331053-9d6d-4fe8-9e93-1c0711d8044b)

### User Scenario  
- The user receives an email:  
  **"hi how are you?"**  
- The user clicks the **"AI Reply"** button.  
- The AI Assistant suggests the following response:  

