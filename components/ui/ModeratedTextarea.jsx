import { useState } from "react";

const ModeratedTextarea = ({ setText }) => {
  const [text, _setText] = useState("");
  const [warning, setWarning] = useState(null);

  // Regex for basic phone number detection
  const phoneNumberRegex =
    /(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}/g;

  const handleChange = async (e) => {
    const inputText = e.target.value;

    // Detect potential phone numbers in the input
    if (phoneNumberRegex.test(inputText)) {
      setWarning("Warning: Phone numbers are not allowed.");
    } else {
      setWarning(null);
    }

    // Optionally, integrate with OpenAI's Moderation API or GPT-4 here
    // const isFlagged = await checkContentModeration(inputText);
    // if (isFlagged) {
    //   setWarning("Warning: Content may contain sensitive information.");
    // }

    _setText(inputText);
    setText(inputText);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Share your thoughts anonymously..."
        className="bg-background w-full border border-none focus:border-none"
        rows={3}
        maxLength={256}
      />
      {warning && <p className="text-red-500 mt-1">{warning}</p>}
    </div>
  );
};

export default ModeratedTextarea;
