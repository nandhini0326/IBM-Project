import gradio as gr
import random
import time

# Simulated AI responses (for demonstration when actual model isn't available)
def simulate_ai_response(prompt_type, content):
    """Simulate AI responses for demonstration purposes"""
    time.sleep(2)  # Simulate processing time

    if prompt_type == "chat":
        responses = [
            "Based on current medical knowledge, here are some general insights about your question. However, please consult with a healthcare professional for personalized advice.",
            "This is an important health topic. While I can provide general information, it's crucial to speak with a qualified healthcare provider for specific guidance.",
            "Thank you for your question about health. Remember that this information is educational and should not replace professional medical advice."
        ]
    elif prompt_type == "symptoms":
        responses = [
            "Based on the symptoms you've described, there could be several possible conditions. It's important to consult with a healthcare professional for proper diagnosis and treatment. Some general recommendations include rest, hydration, and monitoring your symptoms.",
            "The symptoms you've mentioned could indicate various conditions ranging from minor to more serious. Please seek medical attention, especially if symptoms persist or worsen. In the meantime, consider basic comfort measures and avoid self-medication.",
            "These symptoms warrant professional medical evaluation. While waiting for your appointment, monitor any changes and seek immediate care if symptoms become severe. General wellness practices like adequate rest and nutrition may help."
        ]
    elif prompt_type == "treatment":
        responses = [
            "Here's a general treatment approach for this condition: 1) Follow prescribed medications as directed, 2) Maintain a healthy lifestyle with proper diet and exercise, 3) Regular monitoring and follow-ups, 4) Stress management techniques. Always consult your healthcare provider for personalized treatment plans.",
            "Treatment recommendations typically include: Medical management under professional supervision, lifestyle modifications, regular health monitoring, and preventive measures. Each patient's treatment should be individualized based on their specific needs and medical history.",
            "A comprehensive treatment plan usually involves: 1) Professional medical care and prescribed treatments, 2) Lifestyle adjustments including diet and exercise, 3) Regular health assessments, 4) Patient education and self-management strategies. Work closely with your healthcare team."
        ]

    return random.choice(responses)

def patient_chat(question):
    """Handle patient chat queries"""
    if not question.strip():
        return "Please enter a health question to get started."

    response = simulate_ai_response("chat", question)
    return f"🩺 **HealthAI Response:**\n\n{response}\n\n⚠️ **Remember**: This is for educational purposes only. Always consult healthcare professionals for medical advice."

def disease_prediction(symptoms):
    """Handle disease prediction based on symptoms"""
    if not symptoms.strip():
        return "Please enter your symptoms to get an analysis."

    response = simulate_ai_response("symptoms", symptoms)
    return f"🔍 **Symptom Analysis:**\n\n{response}\n\n⚠️ **Important**: This analysis is not a medical diagnosis. Please consult a healthcare professional for proper evaluation."

def treatment_plan(condition, age, gender, medical_history):
    """Generate treatment plan suggestions"""
    if not condition.strip():
        return "Please enter a medical condition to generate a treatment plan."

    patient_info = f"Condition: {condition}, Age: {age}, Gender: {gender}, History: {medical_history}"
    response = simulate_ai_response("treatment", patient_info)

    return f"📋 **Treatment Plan for {condition}:**\n\n{response}\n\n⚠️ **Disclaimer**: This is general guidance only. Your actual treatment should be determined by qualified healthcare professionals."

# Custom CSS for better styling
css = """
.gradio-container {
    font-family: 'Arial', sans-serif;
}
.disclaimer {
    background-color: #fff3cd;
    border: 1px solid #ffeaa7;
    color: #856404;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
}
"""

# Create the Gradio interface
with gr.Blocks(css=css, title="HealthAI: Intelligent Healthcare Assistant") as app:
    gr.HTML("""
    <div style="text-align: center; padding: 20px;">
        <h1>🏥 HealthAI: Intelligent Healthcare Assistant</h1>
        <h3>Powered by IBM Granite Model</h3>
        <div class="disclaimer">
            <strong>⚠️ Medical Disclaimer:</strong> This application is for educational and informational purposes only. 
            It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. 
            Always seek the advice of qualified healthcare providers for any medical concerns.
        </div>
    </div>
    """)

    with gr.Tabs():
        # Patient Chat Tab
        with gr.TabItem("💬 Patient Chat"):
            gr.Markdown("### Ask Your Health Questions")
            gr.Markdown("Get general health information and guidance from our AI assistant.")

            with gr.Row():
                with gr.Column():
                    chat_input = gr.Textbox(
                        label="Your Health Question",
                        placeholder="e.g., What are the benefits of regular exercise?",
                        lines=3
                    )
                    chat_btn = gr.Button("💬 Ask HealthAI", variant="primary", size="lg")

                with gr.Column():
                    chat_output = gr.Textbox(
                        label="HealthAI Response", 
                        lines=12,
                        show_copy_button=True
                    )

            chat_btn.click(patient_chat, inputs=chat_input, outputs=chat_output)

        # Disease Prediction Tab
        with gr.TabItem("🔍 Disease Prediction"):
            gr.Markdown("### Symptom Analysis")
            gr.Markdown("Describe your symptoms to get potential condition insights.")

            with gr.Row():
                with gr.Column():
                    symptoms_input = gr.Textbox(
                        label="Describe Your Symptoms",
                        placeholder="e.g., fever, headache, cough, fatigue, muscle aches...",
                        lines=4
                    )
                    predict_btn = gr.Button("🔍 Analyze Symptoms", variant="primary", size="lg")

                    gr.Examples(
                        examples=[
                            ["fever, headache, body aches"],
                            ["persistent cough, fatigue, shortness of breath"],
                            ["stomach pain, nausea, loss of appetite"],
                            ["joint pain, stiffness, swelling"]
                        ],
                        inputs=symptoms_input
                    )

                with gr.Column():
                    prediction_output = gr.Textbox(
                        label="Analysis Results", 
                        lines=15,
                        show_copy_button=True
                    )

            predict_btn.click(disease_prediction, inputs=symptoms_input, outputs=prediction_output)

        # Treatment Plans Tab
        with gr.TabItem("📋 Treatment Plans"):
            gr.Markdown("### Personalized Treatment Guidance")
            gr.Markdown("Get general treatment recommendations based on your health profile.")

            with gr.Row():
                with gr.Column():
                    condition_input = gr.Textbox(
                        label="Medical Condition",
                        placeholder="e.g., diabetes, hypertension, asthma...",
                        lines=2
                    )

                    with gr.Row():
                        age_input = gr.Number(
                            label="Age", 
                            value=30, 
                            minimum=1, 
                            maximum=120
                        )
                        gender_input = gr.Dropdown(
                            choices=["Male", "Female", "Other", "Prefer not to say"],
                            label="Gender",
                            value="Male"
                        )

                    history_input = gr.Textbox(
                        label="Medical History",
                        placeholder="Previous conditions, allergies, current medications, or 'None'",
                        lines=3
                    )

                    plan_btn = gr.Button("📋 Generate Treatment Plan", variant="primary", size="lg")

                with gr.Column():
                    plan_output = gr.Textbox(
                        label="Treatment Recommendations", 
                        lines=15,
                        show_copy_button=True
                    )

            plan_btn.click(
                treatment_plan, 
                inputs=[condition_input, age_input, gender_input, history_input], 
                outputs=plan_output
            )

        # Health Analytics Tab
        with gr.TabItem("📊 Health Analytics"):
            gr.Markdown("### Health Metrics Dashboard")
            gr.HTML("""
            <div style="text-align: center; padding: 40px;">
                <h3>🚧 Coming Soon!</h3>
                <p>This section will include:</p>
                <ul style="text-align: left; max-width: 600px; margin: 0 auto;">
                    <li>📈 Interactive health metrics tracking</li>
                    <li>🧮 BMI and health calculators</li>
                    <li>💊 Medication reminder system</li>
                    <li>📋 Health trend analysis</li>
                    <li>📊 Personalized health reports</li>
                    <li>🎯 Wellness goal setting and tracking</li>
                </ul>
                <p><strong>Stay tuned for these exciting features!</strong></p>
            </div>
            """)

    # Footer
    gr.HTML("""
    <div style="text-align: center; margin-top: 40px; padding: 20px; border-top: 1px solid #eee;">
        <p><strong>Developed with ❤️ using IBM Granite AI</strong></p>
        <p>Educational Project | Naan Mudhalvan Smart Internz Program</p>
    </div>
    """)

# Launch the application
if __name__ == "__main__":
    app.launch(
        share=True,
        show_error=True,
        show_tips=True,
        height=800,
        favicon_path=None,
        app_kwargs={"docs_url": None}
    )
