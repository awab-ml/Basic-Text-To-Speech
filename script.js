// --- DOM Elements ---
const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');
const speedSelect = document.getElementById('speedSelect');
const speedValueSpan = document.getElementById('speedValue');
const pitchSelect = document.getElementById('pitchSelect');
const pitchValueSpan = document.getElementById('pitchValue');
const speakButton = document.getElementById('speakButton');
const stopButton = document.getElementById('stopButton');
const randomizeButton = document.getElementById('randomizeButton');
const statusDisplay = document.getElementById('statusDisplay');
const charCounter = document.getElementById('charCounter');
const phraseButtons = document.querySelectorAll('.phrase-button'); // Get all phrase buttons

// --- Speech Synthesis & State ---
const synthesis = window.speechSynthesis;
let voices = [];
let isSpeaking = false;
const MAX_CHARS = 1000;

// --- Core Functions ---

/**
 * Populates the voiceSelect dropdown, handling async loading.
 */
function populateVoiceList() {
    try {
        voices = synthesis.getVoices().sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        const previousValue = voiceSelect.value;
        voiceSelect.innerHTML = '';

        if (voices.length === 0) {
            updateStatus("Waiting for voices...", false, true); // Initial loading state
            // Disable controls until voices load
            [voiceSelect, speedSelect, pitchSelect, speakButton, randomizeButton].forEach(el => el.disabled = true);
            return;
        }

        let defaultVoiceSelected = false;
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = voice.name;
            option.setAttribute('data-lang', voice.lang);
            option.setAttribute('data-name', voice.name);

            // Prioritize Arabic, English (US), or 'Albert'
             if (!defaultVoiceSelected && (voice.lang.startsWith('ar') || voice.lang.startsWith('en-US') || voice.name === 'Albert' )) {
                 option.selected = true;
                 defaultVoiceSelected = true;
            }
            voiceSelect.appendChild(option);
        });

        if (previousValue && voiceSelect.querySelector(`option[value="${previousValue}"]`)) {
            voiceSelect.value = previousValue;
        } else if (!defaultVoiceSelected && voiceSelect.options.length > 0) {
             voiceSelect.options[0].selected = true;
        }

        // Enable controls now that voices are loaded
        [voiceSelect, speedSelect, pitchSelect, randomizeButton].forEach(el => el.disabled = false);
        updateStatus(""); // Clear loading status
        updateSpeakButtonState();

    } catch (error) {
        console.error("Error populating voice list:", error);
        updateStatus("Could not load voice list.", true);
         [voiceSelect, speedSelect, pitchSelect, speakButton, randomizeButton].forEach(el => el.disabled = true);
    }
}

/**
 * Updates the status display area.
 */
function updateStatus(message, isError = false, isLoading = false) {
    statusDisplay.textContent = message;
    statusDisplay.className = 'status-display'; // Reset classes
    if (isError) statusDisplay.classList.add('error');
    if (isLoading) statusDisplay.classList.add('loading');
}

/**
 * Handles the speech synthesis process.
 */
function speakText() {
    // Guard clauses
    if (!synthesis) return;
    if (isSpeaking) return;
    const text = textInput.value.trim();
    if (text === '') {
        updateStatus("Please enter text to speak.", true);
        textInput.focus();
        return;
    }
    if (text.length > MAX_CHARS) {
        updateStatus(`Text exceeds maximum length of ${MAX_CHARS} characters.`, true);
        return;
    }

    if (synthesis.speaking) {
        synthesis.cancel();
        // Brief delay allows cancel to register before starting new speech
        setTimeout(startSpeechSynthesis, 100);
    } else {
        startSpeechSynthesis();
    }

    function startSpeechSynthesis() {
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoiceName = voiceSelect.value;
        const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);

        if (!selectedVoice && voices.length > 0) {
             console.warn("Selected voice not found, using default.");
             utterance.voice = voices[0];
        } else if (selectedVoice) {
            utterance.voice = selectedVoice;
        } else {
             updateStatus("No voices available.", true);
             return;
        }

        utterance.rate = parseFloat(speedSelect.value) || 1;
        utterance.pitch = parseFloat(pitchSelect.value) || 1;

        utterance.onstart = () => {
            isSpeaking = true;
            updateStatus("Speaking...", false, true);
            speakButton.disabled = true;
            speakButton.classList.add('is-speaking');
            speakButton.querySelector('.button-text').textContent = 'Speaking';
            stopButton.disabled = false;
            randomizeButton.disabled = true; // Disable randomize while speaking
        };

        utterance.onend = () => {
            isSpeaking = false;
            updateStatus("");
            speakButton.classList.remove('is-speaking');
            speakButton.querySelector('.button-text').textContent = 'Speak';
            stopButton.disabled = true;
            randomizeButton.disabled = false;
            updateSpeakButtonState(); // Re-enable speak if text still valid
        };

        utterance.onerror = (event) => {
            isSpeaking = false;
            console.error("Speech synthesis error:", event.error);
            updateStatus(`Speech error: ${event.error}`, true);
            speakButton.classList.remove('is-speaking');
            speakButton.querySelector('.button-text').textContent = 'Speak';
            stopButton.disabled = true;
            randomizeButton.disabled = false;
            updateSpeakButtonState();
        };

        updateStatus(""); // Clear previous errors
        synthesis.speak(utterance);
    }
}

/**
 * Stops the current speech synthesis.
 */
function stopSpeech() {
    if (synthesis.speaking) {
        synthesis.cancel(); // onend should fire and reset state, but force update just in case
    }
    // Force reset state immediately regardless of onend firing
    isSpeaking = false;
    updateStatus("Speech stopped.");
    speakButton.classList.remove('is-speaking');
    speakButton.querySelector('.button-text').textContent = 'Speak';
    stopButton.disabled = true;
    randomizeButton.disabled = false;
    updateSpeakButtonState();
}

/**
 * Updates the character counter display.
 */
function updateCharacterCount() {
    const currentLength = textInput.value.length;
    charCounter.textContent = `${currentLength} / ${MAX_CHARS}`;
    charCounter.style.color = currentLength > MAX_CHARS ? 'var(--color-error)' : 'var(--color-text-secondary)';
    updateSpeakButtonState();
}

/**
 * Updates the displayed value for range sliders.
 * @param {HTMLInputElement} slider - The range input element.
 * @param {HTMLSpanElement} displaySpan - The span element to update.
 * @param {number} decimals - Number of decimal places to show.
 */
function updateRangeValue(slider, displaySpan, decimals = 1) {
     displaySpan.textContent = parseFloat(slider.value).toFixed(decimals) + (slider === speedSelect ? 'x' : '');
}

/**
 * Enables/disables the speak button based on state.
 */
function updateSpeakButtonState() {
    const textLength = textInput.value.trim().length;
    const canSpeak = textLength > 0 && textLength <= MAX_CHARS && !isSpeaking && voices.length > 0;
    speakButton.disabled = !canSpeak;
}

/**
 * Randomly selects voice, speed, and pitch.
 */
function randomizeSettings() {
    if (voices.length > 0) {
        const randomVoiceIndex = Math.floor(Math.random() * voices.length);
        voiceSelect.selectedIndex = randomVoiceIndex;
    }

    // Random speed between 0.5 and 2.0
    const randomSpeed = (Math.random() * 1.5 + 0.5).toFixed(1);
    speedSelect.value = randomSpeed;
    updateRangeValue(speedSelect, speedValueSpan, 1);

     // Random pitch between 0.5 and 1.8 (avoiding extremes 0 and 2)
    const randomPitch = (Math.random() * 1.3 + 0.5).toFixed(1);
    pitchSelect.value = randomPitch;
    updateRangeValue(pitchSelect, pitchValueSpan, 1);

    updateStatus("Settings randomized!");
     // Optional: Automatically speak the current text with new settings
     // if (textInput.value.trim().length > 0 && !isSpeaking) {
     //    speakText();
     // }
}

/**
 * Sets the text input value from a phrase button.
 * @param {Event} event - The click event from the phrase button.
 */
function setTextFromPhrase(event) {
     if (event.target.classList.contains('phrase-button')) {
         textInput.value = event.target.textContent;
         updateCharacterCount(); // Update counter and speak button state
         textInput.focus(); // Focus textarea
          // Optional: automatically speak the phrase
          // speakText();
     }
}


// --- Event Listeners ---

if (!('speechSynthesis' in window)) {
    updateStatus("Speech synthesis not supported.", true);
    // Disable everything relevant
    [textInput, voiceSelect, speedSelect, pitchSelect, speakButton, stopButton, randomizeButton, ...phraseButtons].forEach(el => el.disabled = true);
} else {
    // Initial setup
    updateStatus("Initializing...", false, true);
    if (synthesis.onvoiceschanged !== undefined) {
        synthesis.onvoiceschanged = populateVoiceList;
    }
    populateVoiceList(); // Attempt initial load
    setTimeout(() => { // Fallback check
         if(voices.length === 0 && statusDisplay.classList.contains('loading')) {
             populateVoiceList();
              if(voices.length === 0) updateStatus("Failed to load voices.", true);
         }
    }, 1500); // Increase fallback timeout slightly

    // Control listeners
    speakButton.addEventListener('click', speakText);
    stopButton.addEventListener('click', stopSpeech);
    randomizeButton.addEventListener('click', randomizeSettings);

    // Input listeners
    textInput.addEventListener('input', updateCharacterCount);
    speedSelect.addEventListener('input', () => updateRangeValue(speedSelect, speedValueSpan, 1));
    pitchSelect.addEventListener('input', () => updateRangeValue(pitchSelect, pitchValueSpan, 1));

    // Phrase button listeners (using event delegation on parent if preferred)
    document.querySelector('.quick-phrases').addEventListener('click', setTextFromPhrase);

    // Initial state updates
    updateCharacterCount();
    updateRangeValue(speedSelect, speedValueSpan, 1);
    updateRangeValue(pitchSelect, pitchValueSpan, 1);
     updateSpeakButtonState(); // Ensure button state is correct initially
}