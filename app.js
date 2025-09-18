// HealthAI Application JavaScript

// Application state
const appState = {
    currentSection: 'dashboard',
    sessionData: {
        chatHistory: [],
        userProfile: {}
    }
};

// Sample responses from the provided data
const sampleResponses = {
    chat: [
        "Based on current medical knowledge, this is an important health topic. While I can provide general information, it's crucial to speak with a qualified healthcare provider for personalized advice and proper evaluation.",
        "This is a great question about health and wellness. Remember that individual health needs vary, so what works for one person may not be suitable for another. I recommend discussing this with your healthcare provider.",
        "Thank you for your health question. While I can offer general educational information, please remember this should not replace professional medical advice, diagnosis, or treatment."
    ],
    symptoms: [
        "Based on the symptoms described, there could be several possible conditions. It's important to consult with a healthcare professional for proper diagnosis and treatment. Consider monitoring symptoms and seeking medical attention if they persist or worsen.",
        "The symptoms mentioned could indicate various conditions. Please seek medical evaluation, especially if symptoms are severe or persistent. In the meantime, ensure adequate rest, hydration, and avoid self-medication.",
        "These symptoms warrant professional medical assessment. While general wellness practices like rest and proper nutrition may help with comfort, a healthcare provider should evaluate these symptoms for accurate diagnosis."
    ],
    treatment: [
        "Here's a general approach for managing this condition: 1) Follow prescribed medications as directed by your healthcare provider, 2) Maintain healthy lifestyle habits including proper diet and regular exercise, 3) Schedule regular follow-ups for monitoring, 4) Practice stress management techniques. Always work with your healthcare team for personalized care.",
        "Treatment typically involves a comprehensive approach: Medical management under professional supervision, lifestyle modifications tailored to your needs, regular health monitoring and assessments, and patient education for self-management. Each treatment plan should be individualized.",
        "A holistic treatment strategy usually includes: Professional medical care with appropriate medications, lifestyle adjustments including diet and physical activity, regular health evaluations, and ongoing support and education. Collaborate closely with your healthcare providers."
    ]
};

const medicalDisclaimer = "⚠️ IMPORTANT MEDICAL DISCLAIMER: This application is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers for any medical concerns. Never disregard professional medical advice or delay seeking treatment because of information provided by this application.";

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('HealthAI App initializing...');
    initializeNavigation();
    initializeChat();
    initializePrediction();
    initializeTreatment();
    initializeAnalytics();
    console.log('HealthAI App initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
    // Handle navigation button clicks
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            console.log('Nav button clicked:', targetSection);
            switchSection(targetSection);
        });
    });

    // Handle feature card clicks
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        const targetSection = card.getAttribute('data-section');
        if (targetSection) {
            // Handle clicks on the card itself
            card.addEventListener('click', function(e) {
                // Only navigate if the click wasn't on the button
                if (!e.target.classList.contains('btn')) {
                    console.log('Feature card clicked:', targetSection);
                    switchSection(targetSection);
                }
            });

            // Handle button clicks within feature cards
            const button = card.querySelector('.btn');
            if (button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Feature button clicked:', targetSection);
                    switchSection(targetSection);
                });
            }
        }
    });
}

function switchSection(sectionName) {
    console.log('Switching to section:', sectionName);
    
    // Update navigation state
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionName) {
            btn.classList.add('active');
        }
    });

    // Update sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active', 'fade-in');
        if (section.id === sectionName) {
            section.classList.add('active');
            // Add fade-in animation after a brief delay
            setTimeout(() => {
                section.classList.add('fade-in');
            }, 10);
        }
    });

    appState.currentSection = sectionName;
    console.log('Section switched to:', sectionName);
}

// Chat functionality
function initializeChat() {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const chatLoading = document.getElementById('chatLoading');

    if (!chatForm || !chatInput || !chatMessages || !chatLoading) {
        console.error('Chat elements not found');
        return;
    }

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userMessage = chatInput.value.trim();
        if (!userMessage) {
            alert('Please enter a message');
            return;
        }

        console.log('Chat message submitted:', userMessage);

        // Add user message to chat
        addChatMessage(userMessage, 'user');
        
        // Store in session
        appState.sessionData.chatHistory.push({
            type: 'user',
            message: userMessage,
            timestamp: new Date()
        });

        // Clear input
        chatInput.value = '';

        // Show loading
        chatLoading.classList.remove('hidden');

        // Simulate AI response with delay
        setTimeout(() => {
            const response = generateChatResponse(userMessage);
            addChatMessage(response, 'bot');
            
            appState.sessionData.chatHistory.push({
                type: 'bot',
                message: response,
                timestamp: new Date()
            });

            chatLoading.classList.add('hidden');
        }, 2000 + Math.random() * 1000); // 2-3 second delay
    });
}

function addChatMessage(message, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const messageP = document.createElement('p');
    messageP.textContent = message;
    contentDiv.appendChild(messageP);
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateChatResponse(userMessage) {
    const randomResponse = sampleResponses.chat[Math.floor(Math.random() * sampleResponses.chat.length)];
    return `${randomResponse}\n\n${medicalDisclaimer}`;
}

// Disease Prediction functionality
function initializePrediction() {
    const predictionForm = document.getElementById('predictionForm');
    const predictionLoading = document.getElementById('predictionLoading');
    const predictionResult = document.getElementById('predictionResult');

    if (!predictionForm) {
        console.error('Prediction form not found');
        return;
    }

    predictionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const symptoms = document.getElementById('symptoms').value.trim();
        if (!symptoms) {
            alert('Please describe your symptoms');
            return;
        }

        console.log('Symptoms submitted:', symptoms);

        // Hide previous results
        if (predictionResult) {
            predictionResult.classList.add('hidden');
        }
        
        // Show loading
        if (predictionLoading) {
            predictionLoading.classList.remove('hidden');
        }

        // Simulate analysis with delay
        setTimeout(() => {
            const analysis = generateSymptomAnalysis(symptoms);
            showPredictionResult(analysis);
            
            if (predictionLoading) {
                predictionLoading.classList.add('hidden');
            }
        }, 2500 + Math.random() * 1000); // 2.5-3.5 second delay
    });
}

function generateSymptomAnalysis(symptoms) {
    const randomResponse = sampleResponses.symptoms[Math.floor(Math.random() * sampleResponses.symptoms.length)];
    
    return {
        analysis: randomResponse,
        recommendations: [
            "Monitor symptoms closely and keep a symptom diary",
            "Maintain proper hydration and rest",
            "Consider scheduling an appointment with your healthcare provider",
            "Avoid self-medication without professional guidance",
            "Seek immediate medical attention if symptoms worsen"
        ],
        disclaimer: medicalDisclaimer
    };
}

function showPredictionResult(analysis) {
    const predictionResult = document.getElementById('predictionResult');
    if (!predictionResult) return;
    
    const resultContent = predictionResult.querySelector('.result-content');
    if (!resultContent) return;
    
    resultContent.innerHTML = `
        <div class="analysis-section">
            <h4>Symptom Analysis</h4>
            <p>${analysis.analysis}</p>
        </div>
        
        <div class="recommendations-section">
            <h4>General Recommendations</h4>
            <ul>
                ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
        
        <div class="disclaimer-section" style="margin-top: 20px; padding: 16px; background: var(--color-bg-4); border-radius: var(--radius-base); border: 1px solid rgba(var(--color-error-rgb), 0.3);">
            <h5 style="color: var(--color-error); margin-bottom: 8px;">Medical Disclaimer</h5>
            <p style="margin: 0; font-size: var(--font-size-sm);">${analysis.disclaimer}</p>
        </div>
    `;
    
    predictionResult.classList.remove('hidden');
    predictionResult.classList.add('fade-in');
}

// Treatment Plans functionality
function initializeTreatment() {
    const treatmentForm = document.getElementById('treatmentForm');
    const treatmentLoading = document.getElementById('treatmentLoading');
    const treatmentResult = document.getElementById('treatmentResult');

    if (!treatmentForm) {
        console.error('Treatment form not found');
        return;
    }

    treatmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            condition: document.getElementById('condition').value.trim(),
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            medicalHistory: document.getElementById('medicalHistory').value.trim()
        };

        if (!formData.condition || !formData.age || !formData.gender) {
            alert('Please fill in all required fields.');
            return;
        }

        console.log('Treatment form submitted:', formData);

        // Store user profile
        appState.sessionData.userProfile = formData;

        // Hide previous results
        if (treatmentResult) {
            treatmentResult.classList.add('hidden');
        }
        
        // Show loading
        if (treatmentLoading) {
            treatmentLoading.classList.remove('hidden');
        }

        // Simulate treatment plan generation
        setTimeout(() => {
            const treatmentPlan = generateTreatmentPlan(formData);
            showTreatmentResult(treatmentPlan);
            
            if (treatmentLoading) {
                treatmentLoading.classList.add('hidden');
            }
        }, 3000 + Math.random() * 1000); // 3-4 second delay
    });
}

function generateTreatmentPlan(userData) {
    const randomResponse = sampleResponses.treatment[Math.floor(Math.random() * sampleResponses.treatment.length)];
    
    return {
        condition: userData.condition,
        age: userData.age,
        gender: userData.gender,
        plan: randomResponse,
        keyPoints: [
            "Regular monitoring and follow-up appointments",
            "Lifestyle modifications as recommended",
            "Medication compliance if prescribed",
            "Proper nutrition and hydration",
            "Appropriate exercise and physical activity",
            "Stress management and mental health support"
        ],
        disclaimer: medicalDisclaimer
    };
}

function showTreatmentResult(plan) {
    const treatmentResult = document.getElementById('treatmentResult');
    if (!treatmentResult) return;
    
    const resultContent = treatmentResult.querySelector('.result-content');
    if (!resultContent) return;
    
    resultContent.innerHTML = `
        <div class="patient-info" style="background: var(--color-bg-6); padding: 16px; border-radius: var(--radius-base); margin-bottom: 20px;">
            <h4>Patient Profile</h4>
            <p><strong>Condition:</strong> ${plan.condition}</p>
            <p><strong>Age:</strong> ${plan.age} years</p>
            <p><strong>Gender:</strong> ${plan.gender}</p>
        </div>
        
        <div class="treatment-plan-section">
            <h4>Treatment Approach</h4>
            <p>${plan.plan}</p>
        </div>
        
        <div class="key-points-section">
            <h4>Key Treatment Points</h4>
            <ul>
                ${plan.keyPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>
        </div>
        
        <div class="disclaimer-section" style="margin-top: 20px; padding: 16px; background: var(--color-bg-4); border-radius: var(--radius-base); border: 1px solid rgba(var(--color-error-rgb), 0.3);">
            <h5 style="color: var(--color-error); margin-bottom: 8px;">Medical Disclaimer</h5>
            <p style="margin: 0; font-size: var(--font-size-sm);">${plan.disclaimer}</p>
        </div>
    `;
    
    treatmentResult.classList.remove('hidden');
    treatmentResult.classList.add('fade-in');
}

// Health Analytics functionality
function initializeAnalytics() {
    const calculateBMIBtn = document.getElementById('calculateBMI');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiResult = document.getElementById('bmiResult');

    if (!calculateBMIBtn || !heightInput || !weightInput || !bmiResult) {
        console.error('BMI calculator elements not found');
        return;
    }

    calculateBMIBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (!height || !weight || height <= 0 || weight <= 0) {
            alert('Please enter valid height and weight values.');
            return;
        }

        console.log('BMI calculation:', { height, weight });

        const bmi = calculateBMI(height, weight);
        const category = getBMICategory(bmi);
        
        showBMIResult(bmi, category);
    });

    // Allow Enter key to calculate BMI
    [heightInput, weightInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                calculateBMIBtn.click();
            }
        });
    });
}

function calculateBMI(height, weight) {
    // BMI = weight (kg) / (height (m))^2
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function showBMIResult(bmi, category) {
    const bmiResult = document.getElementById('bmiResult');
    const bmiValue = bmiResult.querySelector('.bmi-value');
    const bmiCategory = bmiResult.querySelector('.bmi-category');
    
    if (!bmiValue || !bmiCategory) return;
    
    bmiValue.textContent = `BMI: ${bmi.toFixed(1)}`;
    bmiCategory.textContent = `Category: ${category}`;
    
    // Add color coding based on category
    let categoryColor = 'var(--color-success)';
    if (category === 'Underweight' || category === 'Obese') {
        categoryColor = 'var(--color-error)';
    } else if (category === 'Overweight') {
        categoryColor = 'var(--color-warning)';
    }
    
    bmiCategory.style.color = categoryColor;
    
    bmiResult.classList.remove('hidden');
    bmiResult.classList.add('fade-in');
}

// Export app state for debugging
window.HealthAI = {
    state: appState,
    switchSection: switchSection,
    generateChatResponse: generateChatResponse
};