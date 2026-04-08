import { useState } from "react";
import "./App.css";

//Global variables
type SubmitState = "idle" | "submitting" | "success" | "error";

const API_URL = import.meta.env.VITE_API_URL;

//App
function App()
{
    //Variables
    const [recipientEmail, setRecipientEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [scheduledForLocal, setScheduledForLocal] = useState("");

    const [submitState, setSubmitState] = useState<SubmitState>("idle");
    const [statusMessage, setStatusMessage] = useState("");

    //Function
    async function Submit(event: React.SyntheticEvent<HTMLFormElement>)
    {
        //Prevent default
        event.preventDefault();

        //Check if time is valid
        const scheduledDate = new Date(scheduledForLocal);

        if (Number.isNaN(scheduledDate.getTime()))
        {
            setSubmitState("error");
            setStatusMessage("Please enter a valid date and time.");

            return;
        }

        if (scheduledDate <= new Date())
        {
            setSubmitState("error");
            setStatusMessage("The scheduled time must be in the future.");

            return;
        }

        //Set state and message to submitting
        setSubmitState("submitting");
        setStatusMessage("");

        //Try
        try
        {
            //Compose response
            const response = await fetch(API_URL,
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                {
                    recipientEmail,
                    subject,
                    body,
                    scheduledForUtc: scheduledDate.toISOString(),
                }),
            });

            //Throw error if response is not ok
            if (!response.ok)
            {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to schedule email.");
            }

            //Set state and message to success, reset other variables
            setSubmitState("success");
            setStatusMessage(`Email scheduled for ${scheduledDate.toLocaleString()}. \n Emails will be sent out hourly.`);
            setRecipientEmail("");
            setSubject("");
            setBody("");
            setScheduledForLocal("");
        }

        //Catch error
        catch (error)
        {
            const message = error instanceof Error
                ? `Something went wrong. ${error.message}`
                : "Something went wrong.";

            setSubmitState("error");
            setStatusMessage(message);
        }
    }

    //UI
    return(
        <main className="app-shell">
            <section className="card">
                <div className="hero">
                    <p className="eyebrow">FutureMe</p>
                    <h1>Send a message to your future self</h1>
                    <p className="subtitle">
                        Write a message now, choose when it should arrive, and send it to your future self later.
                    </p>
                </div>

                <form className="form" onSubmit={Submit}>
                    <div className="field-group">
                        <label htmlFor="recipientEmail">Recipient email</label>
                        <input
                            id="recipientEmail"
                            type="email"
                            placeholder="you@example.com"
                            value={recipientEmail}
                            onChange={(event) => setRecipientEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            id="subject"
                            type="text"
                            placeholder="A message from your past self"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="body">Message</label>
                        <textarea
                            id="body"
                            rows={8}
                            placeholder="Write something kind, clever, or chaotic for future you..."
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="scheduledFor">Send date and time</label>
                        <input
                            id="scheduledFor"
                            type="datetime-local"
                            value={scheduledForLocal}
                            onChange={(event) => setScheduledForLocal(event.target.value)}
                            required
                        />
                    </div>

                    <button className="submit-button" type="submit" disabled={submitState === "submitting"}>
                        {submitState === "submitting" ? "Scheduling..." : "Schedule email"}
                    </button>
                </form>

                {statusMessage && (
                    <div className={`status-box ${submitState}`}>
                        {statusMessage}
                    </div>
                )}
            </section>
        </main>
    );
}

//Export
export default App;