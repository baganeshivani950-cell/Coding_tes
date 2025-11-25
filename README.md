# Dynamic Risk Assessment Form Builder  
A fully dynamic, schema-driven, vendor risk-assessment UI built using **React + TypeScript + Vite**, powered by **Material-UI v5** and **React Hook Form**.  
This project fulfills all use cases defined in the Coding Exercise, including dynamic form rendering, conditional logic, auto-save, real-time risk scoring, and file upload validation.


## Features

### Dynamic JSON-driven Form Rendering
- Renders form sections & questions entirely from JSON config  
- Supports 6 field types:
  - Text
  - Number
  - Select dropdown
  - Checkbox group
  - File upload (PDF only)
  - Date picker  
- Collapsible Material-UI section accordions  
- Fully responsive (Mobile / Tablet / Desktop)

### Conditional Field Logic
- Questions appear/disappear based on previous answers
- Smooth UI transitions
- Required validations adapt dynamically
- e.g.,  
  - *If SOC2 = Yes → Show certificate upload*  
  - *If Cyber Insurance = No → Show explanation textbox*

### Real-Time Risk Score Engine
- Scores update instantly on any answer change  
- Displays:
  - Total Score (0–100)
  - Risk Level (Low / Medium / High / Critical)
  - Per-section score breakdown  
- Color-coded risk indicators  
- Plug-and-play scoring algorithm

### File Upload + Validation
- Accepts only **PDF files under 10MB**
- Shows upload progress bar
- Displays uploaded filename
- Provides remove/delete option
- Validation error handling included

### Auto-Save + Restore Draft System
- Saves form state every **30 seconds**
- Manual “Save Draft” button included
- Displays **Last Saved Timestamp**
- Automatically restores data when user returns

---

# Tech Stack

| Layer | Technology |

| Frontend | React 18, TypeScript |
| Build Tool | Vite |
| UI Framework | Material-UI v5 |
| Forms | React Hook Form |
| Date Handling | MUI X Date Pickers |
| State Persistence | localStorage |


