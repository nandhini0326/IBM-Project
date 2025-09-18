# HealthAI: Intelligent Healthcare Assistant

## Overview
HealthAI is an intelligent healthcare assistant powered by IBM's Granite language model from Hugging Face. This application provides users with smart, easy-to-understand healthcare guidance through multiple interactive features.

## Features

### 🩺 Patient Chat
Interactive chat interface for answering general health-related questions and providing healthcare information.

### 🔍 Disease Prediction
Analyzes user-reported symptoms to provide potential condition details and general recommendations.

### 📋 Treatment Plans
Generates personalized medical recommendations based on patient information including age, gender, and medical history.

### 📊 Health Analytics
Dashboard for visualizing and monitoring patient health metrics (Coming Soon).

## Technical Stack
- **AI Model**: IBM Granite-3.2-2b-instruct from Hugging Face
- **Framework**: Gradio for web interface
- **Backend**: PyTorch and Transformers library
- **Deployment**: Google Colab with T4 GPU support

## Prerequisites
1. Python 3.8+
2. GPU support (recommended for better performance)
3. Hugging Face account (for model access)
4. Google Colab account (for deployment)

## Installation & Setup

### Local Setup
1. Clone this repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the application:
   ```python
   python health_ai_app.py
   ```

### Google Colab Setup
1. Open Google Colab
2. Create new notebook
3. Change runtime to T4 GPU
4. Install dependencies:
   ```python
   !pip install transformers torch gradio -q
   ```
5. Copy and run the health_ai_app.py code

## Usage

### Disease Prediction
1. Navigate to the "Disease Prediction" tab
2. Enter symptoms in the text box
3. Click "Analyze Symptoms"
4. Review the AI-generated analysis and recommendations

### Treatment Plans
1. Go to "Treatment Plans" tab
2. Fill in patient information:
   - Medical condition
   - Age
   - Gender
   - Medical history
3. Click "Generate Treatment Plan"
4. Review personalized recommendations

### Patient Chat
1. Use the "Patient Chat" tab
2. Ask any health-related question
3. Get AI-powered responses with healthcare guidance

## Important Disclaimer
⚠️ **This application is for informational purposes only. Always consult qualified healthcare professionals for medical diagnosis, treatment, and advice. Do not use this tool as a substitute for professional medical care.**

## Model Information
- **Model**: IBM Granite-3.2-2b-instruct
- **Source**: Hugging Face Model Hub
- **License**: IBM Granite License
- **Capabilities**: Healthcare Q&A, symptom analysis, treatment suggestions

## Project Structure
```
health-ai-project/
├── health_ai_app.py      # Main application file
├── requirements.txt      # Python dependencies
└── README.md            # Project documentation
```

## Contributing
This is an educational project developed as part of the Naan Mudhalvan Smart Internz program in partnership with IBM.

## License
This project is for educational purposes. Please refer to IBM Granite model license for commercial usage.

## Support
For technical issues or questions about this implementation, please refer to the project documentation or contact your mentor through the Smart Internz platform.

---
Developed with ❤️ using IBM Granite AI
