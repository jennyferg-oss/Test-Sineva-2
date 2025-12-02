body {
    font-family: Arial, sans-serif;
    background: #f4f6f9;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 800px;
    background: #fff;
    margin: 40px auto;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.hidden {
    display: none;
}

h1, h2, h3 {
    text-align: center;
    margin-bottom: 15px;
}

/* MODULE BUTTONS */
#module-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.module-button {
    padding: 15px;
    font-size: 18px;
    border: none;
    background: #007bff;
    color: white;
    border-radius: 8px;
    cursor: pointer;
}
.module-button:hover {
    background: #0056b3;
}

/* TEST PAGE */
#timer {
    text-align: right;
    margin-bottom: 20px;
    font-size: 20px;
    color: #d9534f;
}

#question-card {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
}

#options-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
}

.option {
    padding: 12px;
    background: #f1f4f9;
    border-radius: 6px;
    cursor: pointer;
}
.option:hover {
    background: #e2e8f0;
}
.option.selected {
    background: #cfe2ff;
    border: 1px solid #007bff;
}

#next-button {
    margin-top: 20px;
    width: 100%;
    padding: 15px;
    background: #28a745;
    color: white;
    border-radius: 8px;
    border: none;
    font-size: 18px;
}
#next-button:disabled {
    background: #bcdcc2;
}

/* RESULTS */
#download-pdf {
    margin-top: 30px;
    width: 100%;
    padding: 15px;
    background: #6f42c1;
    color: white;
    border-radius: 8px;
    cursor: pointer;
}
