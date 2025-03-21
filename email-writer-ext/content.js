console.log("Email writer extension content script loaded");

function createAIButton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-btn";
  button.innerHTML = "AI Reply";
  button.setAttribute("role", "button");
  button.setAttribute("tooltip", "Generate AI Reply");

  // Styling to make it appear as a full button
  button.style.marginRight = "8px"; // Slight margin to the right for spacing
  button.style.height = "36px"; // Matches the height of Gmail's buttons
  button.style.lineHeight = "36px"; // Centers text vertically
  button.style.padding = "0 16px"; // Adds padding to the left and right
  button.style.cursor = "pointer"; // Makes it clickable
  button.style.fontWeight = "bold"; // Makes the text bold
  button.style.fontSize = "14px"; // Adjust font size
  button.style.backgroundColor = "#1a73e8"; // Gmail's blue color
  button.style.color = "#ffffff"; // White text
  button.style.borderRadius = "4px"; // Rounded corners like Gmail buttons
  button.style.border = "none"; // Remove border to make it look clean
  button.style.display = "inline-flex"; // Ensures it stays on the same line as Send
  button.style.alignItems = "center"; // Centers the text vertically
  button.style.justifyContent = "center"; // Centers the text horizontally

  return button;
}

function findComposeToolbar() {
  const selectors = [".aDh", ".btC", '[role="toolbar"]', ".gU.Up"];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
  }
  return null; // Return null if no toolbar is found
}

function getEmailContent() {
  const selectors = [".h7", ".a3s.aiL", '[role="presentation"]', ".gmail_quote"];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
  }
  return ""; // Return empty string if no content is found
}

function injectButton() {
  const existingButton = document.querySelector(".ai-reply-btn");
  if (existingButton) return; // Prevent multiple buttons

  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Toolbar not found.");
    return;
  }

  console.log("Toolbar found, creating AI button");
  const button = createAIButton();

  // Insert the button before the Send button
  const sendButton = toolbar.querySelector(".T-I.J-J5-Ji.aoO.v7");
  if (sendButton) {
    sendButton.parentNode.insertBefore(button, sendButton); // Insert before Send
  } else {
    toolbar.appendChild(button); // Fallback if Send button is not found
  }

  button.addEventListener("click", async () => {
    try {
      button.innerHTML = "Generating...";
      button.disabled = true;

      const emailContent = getEmailContent();
      if (!emailContent) {
        alert("No email content detected.");
        return;
      }

      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "professional"
        }),
        mode: "cors" // Ensures CORS is properly handled
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const generatedReply = await response.text();
      const composeBox = document.querySelector('[role="textbox"]'); // Fix the compose box selector
      if (composeBox) {
        composeBox.focus();
        document.execCommand("insertText", false, generatedReply);
      } else {
        console.error("Compose box not found");
        alert("Failed to generate reply");
      }
    } catch (error) {
      console.error(error);
      alert("Error generating reply: " + error.message);
    } finally {
      button.innerHTML = "AI Reply";
      button.disabled = false;
    }
  });
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches(".aDh, .btC, [role='dialog']") ||
          node.querySelector(".aDh, .btC, [role='dialog']"))
    );

    if (hasComposeElements) {
      console.log("Compose window detected.");
      setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
