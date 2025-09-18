import gradio as gr
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

# Load model and tokenizer
model_name = "ibm-granite/granite-3.2-2b-instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
    device_map="auto" if torch.cuda.is_available() else None
)

if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

def generate_response(prompt, max_length=1024):
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512)
    if torch.cuda.is_available():
        inputs = {k: v.to(model.device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_length=max_length,
            temperature=0.7,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id
        )

    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    response = response.replace(prompt, "").strip()
    return response

def disease_prediction(symptoms):
    prompt = f"Based on the following symptoms: {symptoms}, provide possible medical conditions and general medication suggestions. Always emphasize the importance of consulting a healthcare professional for proper diagnosis and treatment."
    return generate_response(prompt, max_length=1200)

def treatment_plan(condition, age, gender, medical_history):
    prompt = f"Generate personalized treatment suggestions for the following patient information:\nCondition: {condition}\nAge: {age}\nGender: {gender}\nMedical History: {medical_history}\n\nInclude home remedies and general medication guidelines. Always emphasize consulting healthcare professionals."
    return generate_response(prompt, max_length=1200)

def patient_chat(question):
    prompt = f"As a healthcare assistant, please answer this health-related question: {question}\n\nProvide helpful information while emphasizing the importance of consulting healthcare professionals for medical advice."
    return generate_response(prompt, max_length=1000)

# Create Gradio interface
with gr.Blocks(title="HealthAI: Intelligent Healthcare Assistant") as app:
    gr.Markdown("# HealthAI: Intelligent Healthcare Assistant")
    gr.Markdown("**Powered by IBM Granite Model**")
    gr.Markdown("**⚠️ Disclaimer: This is for informational purposes only. Always consult healthcare professionals for medical advice.**")

    with gr.Tabs():
        with gr.TabItem("Patient Chat"):
            with gr.Row():
                with gr.Column():
                    chat_input = gr.Textbox(
                        label="Ask a Health Question",
                        placeholder="e.g., What are the benefits of drinking water?",
                        lines=3
                    )
                    chat_btn = gr.Button("Get Answer", variant="primary")
                with gr.Column():
                    chat_output = gr.Textbox(label="Healthcare Assistant Response", lines=15)
            chat_btn.click(patient_chat, inputs=chat_input, outputs=chat_output)

        with gr.TabItem("Disease Prediction"):
            with gr.Row():
                with gr.Column():
                    symptoms_input = gr.Textbox(
                        label="Enter Symptoms",
                        placeholder="e.g., fever, headache, cough, fatigue...",
                        lines=4
                    )
                    predict_btn = gr.Button("Analyze Symptoms", variant="primary")
                with gr.Column():
                    prediction_output = gr.Textbox(label="Possible Conditions & Recommendations", lines=20)
            predict_btn.click(disease_prediction, inputs=symptoms_input, outputs=prediction_output)

        with gr.TabItem("Treatment Plans"):
            with gr.Row():
                with gr.Column():
                    condition_input = gr.Textbox(
                        label="Medical Condition",
                        placeholder="e.g., diabetes, hypertension, migraine...",
                        lines=2
                    )
                    age_input = gr.Number(label="Age", value=30)
                    gender_input = gr.Dropdown(
                        choices=["Male", "Female", "Other"],
                        label="Gender",
                        value="Male"
                    )
                    history_input = gr.Textbox(
                        label="Medical History",
                        placeholder="Previous conditions, allergies, medications or None",
                        lines=3
                    )
                    plan_btn = gr.Button("Generate Treatment Plan", variant="primary")
                with gr.Column():
                    plan_output = gr.Textbox(label="Personalized Treatment Plan", lines=20)
            plan_btn.click(treatment_plan, inputs=[condition_input, age_input, gender_input, history_input], outputs=plan_output)

        with gr.TabItem("Health Analytics"):
            gr.Markdown("### Health Analytics Dashboard")
            gr.Markdown("*This section would typically include health metrics visualization and monitoring features.*")
            gr.Markdown("**Coming Soon:** Interactive charts for tracking health metrics, BMI calculator, medication reminders, and health trend analysis.")

# Launch the app
if __name__ == "__main__":
    app.launch(share=True, debug=True)
