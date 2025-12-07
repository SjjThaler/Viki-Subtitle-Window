function getCurrentSubtitleText() {
    const subtitleElement = document.querySelector('.vjs-text-track-cue-zh > div');
    
    if (subtitleElement) {
        // .textContent gets the plain text inside the div
        return subtitleElement.textContent.trim();
    }
    
    // Returns an empty string if no subtitle is currently displayed
    return ''; 
}

const SUBTITLE_DISPLAY_ID = 'viki-side-subtitle-display';

function injectSubtitleUI() {
    let displayBox = document.getElementById(SUBTITLE_DISPLAY_ID);
    
    if (!displayBox) {
        displayBox = document.createElement('div');
        displayBox.id = SUBTITLE_DISPLAY_ID;
        displayBox.textContent = 'Waiting for subtitles...'; // Initial message
        document.body.appendChild(displayBox);
    }
    
    return displayBox;
}

function startSubtitleMonitoring() {
    const subtitleDisplayBox = injectSubtitleUI();
    let previousSubtitle = '';

    // Set an interval to check for subtitles frequently (e.g., every 100ms)
    setInterval(() => {
        const currentSubtitle = getCurrentSubtitleText();
        
        // Only update the UI if the subtitle text has actually changed
        if (currentSubtitle !== previousSubtitle) {
            subtitleDisplayBox.textContent = currentSubtitle || ' '; // Use ' ' to maintain box height if needed
            previousSubtitle = currentSubtitle;
            
            // Optional: Scroll to the bottom if you want to keep a history of subs
            // If you only want to display the current one, this is enough.
        }
    }, 100); 
}

startSubtitleMonitoring();
