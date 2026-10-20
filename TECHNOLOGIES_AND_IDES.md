# LifeMap Student — Motivational & Living Journey Portal

> **Tagline:** *"Master your studies, protect your health, and shatter your personal records."*  
> **Platform:** LifeMap Student — Academic Mastery, Wellness & Personal Benchmarks  
> **PDF Technical Report:** [`LifeMap_Technologies_and_IDEs_Report.pdf`](file:///c:/Users/chira/OneDrive/Desktop/LifeMap/LifeMap_Technologies_and_IDEs_Report.pdf)

---

## 1. Executive Overview & Purpose

**LifeMap Student** is a comprehensive student motivational web application designed to help learners:
1. **Master Academics & Study Consistency**: Structured focus sprints via a built-in Pomodoro timer, course target GPA tracking, and upcoming exam countdowns.
2. **Protect Physical & Mental Health**: Sustainable high performance with daily hydration logs, sleep & brain recovery tracking, mood-energy advice, and guided 2-minute exam de-stress box breathing.
3. **Enshrine Personal Records & High Scores**: A dedicated Hall of Fame celebrating all-time best grades, coding milestones, endurance runs, study streaks, and unlocked achievement badges.
4. **Map the Student Journey**: An interactive SVG constellation map connecting foundational learning, challenges, hackathon projects, and exam breakthroughs into a living visual map.

Built strictly with vanilla web standards (**HTML5**, **CSS3**, **Vanilla JavaScript**, **SVG**, **Web Audio API**, and **LocalStorage**), the application requires **zero external frameworks** or backends and runs 100% locally in any browser by opening `index.html`.

---

## 2. Core Student Modules

### A. Study & Focus Zone (Pomodoro Engine)
- **Time Boxing**: 25-minute deep focus sprints, 5-minute short recovery breaks, and 15-minute long breaks.
- **Subject Tagging**: Link focus sessions directly to enrolled courses (*Data Structures*, *Calculus*, *Physics*, *Exam Revision*).
- **Audio Synthesizer Alerts**: Gentle harmonic Web Audio bell chime on timer completion.
- **Session History & Streak**: Automatically logs completed sessions and updates study streaks.

### B. Courses & Academic Target Tracker
- **Subject Dashboard**: Track course codes, credit weights, current estimated percentages, and target letter grades (*A+*, *A*, *A-*).
- **Attendance Monitor**: Visual attendance tracking with instant shortage alerts for courses dipping below safety thresholds.
- **Exam Countdowns**: Automatic countdown clocks for midterms, project deadlines, and finals (*e.g., "In 12 Days"*).

### C. Student Health & Wellness Studio
- **Hydration Tracker**: 8 interactive clickable water cups with daily completion toasts.
- **Sleep & Recovery**: Hours slept slider with quality rating (*Restful*, *Good*, *Restless*, *Insufficient*) explaining memory consolidation science.
- **Study Energy & Mood**: Real-time energy selector (*Energized*, *Focused*, *Calm*, *Tired*, *Stressed*) providing actionable, science-backed study tips.
- **Physical Activity Log**: Workout tracker reinforcing neuroplasticity through daily movement.
- **2-Minute Guided Box Breathing**: Animated expanding and contracting breathing circle (*Inhale 4s &bull; Hold 4s &bull; Exhale 4s &bull; Hold 4s*) to lower exam cortisol.

### D. Hall of Records & Personal Bests
- **Record Enshrinement**: Dedicated space for all-time highs (*Highest GPA 3.96*, *150 LeetCode Problems Solved*, *34-Day Study Streak*, *Fastest 24h Hackathon MVP*).
- **Achievement Badges**: Unlocked student badges (*Dean's List*, *Focus Master*, *Hackathon Gladiator*, *14-Day Streak*, *Hydration Hero*).

### E. Interactive Student Constellation (Living Map)
- **Vector Canvas**: Matrix-based pan (`translate`) and zoom (`scale`) engine.
- **Draggable Nodes**: Reposition milestones anywhere on the canvas with persistent coordinates.
- **Curved Organic Bezier Paths**: Shows the path from foundational study habits to exam breakthroughs.
- **Snapshot Export**: Download the student constellation as a high-resolution PNG image.

### F. Motivation Wall & Daily Spark
- Curated high-performance student affirmations and laws of consistency.
- One-click shuffle to get an instant mindset boost before study sessions.

---

## 3. Technologies & Engineering Stack

| Technology | Role in Student Portal |
| :--- | :--- |
| **HTML5** | Semantic layout (`<header>`, `<aside>`, `<main>`, `<section>`), accessible modal forms, course managers, Pomodoro clocks, and ARIA labels. |
| **CSS3** | Custom design properties (CSS tokens), Dark Cosmic theme, glassmorphic panels (`backdrop-filter: blur`), responsive breakpoints, glowing SVG filters, and print media stylesheets for academic portfolios. |
| **Vanilla JavaScript (ES6+)** | Modular state management, Pomodoro timer interval engine, LocalStorage serialization, image downscaling canvas pipeline, and command palette (`Ctrl+K`). |
| **SVG (Scalable Vector Graphics)** | Interactive student constellation canvas, glowing node keyframe pulses, curved Bezier connecting paths, and pure SVG Donut/Bar analytics charts. |
| **Web Audio API** | Procedural sound synthesizer generating 40Hz focus binaural beats, library rainfall pink noise, and 432Hz zen drones with zero external audio assets. |
| **Browser LocalStorage** | Structured JSON schema storing student milestones, courses, wellness logs, records, and study streaks safely on the client device. |

---

## 4. IDEs Used & Recommended

- **Google Antigravity IDE**: Primary development platform for full-stack code synthesis, multi-file coordinate editing, terminal process orchestration, and validation.
- **Visual Studio Code (VS Code)**: Recommended developer setup with *Live Server*, *Prettier*, *ESLint*, and *SVG Preview*.
- **JetBrains WebStorm**: Enterprise-grade JavaScript analysis, symbol navigation, and refactoring.
- **Chrome & Edge DevTools**: LocalStorage inspection, 60 FPS vector performance profiling, and responsive mobile emulation.

---

## 5. How to Run Locally

### Option 1: Direct File Launch
Double-click [`index.html`](file:///c:/Users/chira/OneDrive/Desktop/LifeMap/index.html) to open directly in any web browser.

### Option 2: Local Python Server (Currently Active)
Open your browser to: **[http://localhost:8080](http://localhost:8080)**

### Option 3: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 6. Verification Checklist

| Subsystem | Test Scenario | Status |
| :--- | :--- | :---: |
| **Pomodoro Focus Timer** | 25m countdown, automatic session logging, Web Audio alert | **PASSED** |
| **Courses & Grades** | Add/edit course, attendance safety warnings, exam countdowns | **PASSED** |
| **Health & Wellness Studio** | 8-cup water tracker, sleep slider, 2-minute breathing box animation | **PASSED** |
| **Hall of Records** | Enshrine personal bests, badge unlocks, streak counter | **PASSED** |
| **Student Constellation Map** | Pan, zoom, draggable nodes, curved paths, category filters | **PASSED (60 FPS)** |
| **Motivation Wall** | Daily spark shuffle, categorized motivational quotes | **PASSED** |
| **Data Backup & Restore** | JSON export, backup restoration, sample student data reload | **PASSED** |
| **Zero Server Leaks** | 100% offline LocalStorage persistence | **PASSED** |
