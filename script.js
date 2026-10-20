/**
 * LIFEMAP STUDENT — ULTIMATE STUDENT MOTIVATIONAL & LIVING JOURNEY PORTAL
 * Pure Vanilla JavaScript Application Core
 * Interactive Constellation Map, Pomodoro Focus, Course Tracker, Wellness Studio, Hall of Records
 */

(function () {
  'use strict';

  // ==========================================
  // 1. STORAGE KEYS & CONSTANTS
  // ==========================================

  const STORAGE_KEYS = {
    MEMORIES: 'lifemap_student_milestones_v3',
    COURSES: 'lifemap_student_courses_v3',
    RECORDS: 'lifemap_student_records_v3',
    GOALS: 'lifemap_student_goals_v3',
    WELLNESS: 'lifemap_student_wellness_v3',
    FOCUS_SESSIONS: 'lifemap_student_focus_sessions_v3',
    DAILY_MISSIONS: 'lifemap_student_daily_missions_v3',
    SETTINGS: 'lifemap_student_settings_v3',
    INITIALIZED: 'lifemap_student_init_v3'
  };

  const CATEGORY_META = {
    academics: { label: 'Academics & Exams', color: '#3b82f6', icon: '📚' },
    records: { label: 'Personal Records', color: '#f59e0b', icon: '🏆' },
    wellness: { label: 'Health & Wellness', color: '#10b981', icon: '🧘' },
    skills: { label: 'Skills & Projects', color: '#06b6d4', icon: '💻' },
    lessons: { label: 'Study Habits & Lessons', color: '#8b5cf6', icon: '💡' },
    career: { label: 'Career & Internships', color: '#6366f1', icon: '💼' },
    friendships: { label: 'Study Groups & Mentors', color: '#ec4899', icon: '🤝' },
    goals: { label: 'Future Ambitions', color: '#14b8a6', icon: '🎯' },
    turning_points: { label: 'Landmark Turning Points', color: '#f97316', icon: '🌟' }
  };

  const DEFAULT_SETTINGS = {
    userName: 'Chirag',
    lifeTagline: 'Master your studies, protect your health, and shatter your personal records.',
    targetGpa: '3.90 GPA',
    theme: 'dark',
    lineStyle: 'curved',
    reducedMotion: false,
    ambientSound: 'binaural',
    streak: 14
  };

  // Sample Student Milestones
  const SAMPLE_MEMORIES = [
    {
      id: 'mem_genesis',
      title: 'Student Genesis & The Spark of Curiosity',
      date: '2020-09-01',
      category: 'academics',
      emotion: 'Curiosity & Wonder',
      importance: 5,
      era: 'early',
      description: 'The foundation of my academic drive. Discovered a deep fascination for understanding how complex systems and software work.',
      lesson: 'Curiosity is an infinite fuel; when you study to understand rather than just pass, learning becomes effortless.',
      tags: ['curiosity', 'roots', 'foundations'],
      connectedTo: [],
      x: 0,
      y: 0,
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 'mem_calc_breakthrough',
      title: 'Conquered Calculus & Advanced Math Midterms (96%)',
      date: '2022-11-15',
      category: 'academics',
      emotion: 'Joy & Triumph',
      importance: 4,
      era: 'academic',
      description: 'Overcame early struggles with multivariable calculus by instituting a daily 45-minute problem-solving ritual. Scored in top 2% of the cohort.',
      lesson: 'Confusion is just the brain forming new neural pathways. Daily consistency dissolves math anxiety.',
      tags: ['calculus', 'midterm', 'math-mastery'],
      connectedTo: ['mem_genesis'],
      x: -180,
      y: -140,
      createdAt: '2024-01-02T00:00:00.000Z'
    },
    {
      id: 'mem_first_hackathon',
      title: 'First 24-Hour Hackathon Victory & MVP Launch',
      date: '2023-04-12',
      category: 'skills',
      emotion: 'Unshakable Focus',
      importance: 5,
      era: 'academic',
      description: 'Collaborated with peers to design, build, and deploy an automated student study companion in 24 hours. Took 1st place in the Web/AI track.',
      lesson: 'Execution beats perfection. Building under tight constraints forces clarity and rapid technical growth.',
      tags: ['hackathon', 'coding', 'mvp', 'victory'],
      connectedTo: ['mem_calc_breakthrough'],
      x: -260,
      y: 80,
      createdAt: '2024-01-03T00:00:00.000Z'
    },
    {
      id: 'mem_gpa_record',
      title: 'Personal Best Record: 3.96 Semester GPA',
      date: '2023-12-20',
      category: 'records',
      emotion: 'Pride & Mastery',
      importance: 5,
      era: 'academic',
      description: 'Earned straight A grades across 5 rigorous engineering courses while leading a campus technical club.',
      lesson: 'High performance is a byproduct of energy management, prioritizing 7+ hours of sleep, and early exam prep.',
      tags: ['gpa-record', 'dean-list', 'academics'],
      connectedTo: ['mem_calc_breakthrough', 'mem_first_hackathon'],
      x: 160,
      y: -160,
      createdAt: '2024-01-04T00:00:00.000Z'
    },
    {
      id: 'mem_wellness_habits',
      title: '30-Day Morning Run & Exam De-stress Habit',
      date: '2024-02-18',
      category: 'wellness',
      emotion: 'Calm & Peace',
      importance: 4,
      era: 'academic',
      description: 'When exam pressure peaked, committed to 25 minutes of morning cardio before opening any textbooks. Exam stress transformed into clean focus.',
      lesson: 'A disciplined body creates an unshakeable mind. Physical stamina directly fuels cognitive endurance.',
      tags: ['health', 'morning-routine', 'stress-relief'],
      connectedTo: ['mem_genesis'],
      x: 240,
      y: -50,
      createdAt: '2024-01-05T00:00:00.000Z'
    },
    {
      id: 'mem_study_circle',
      title: 'Co-Founded Algorithms Peer Study Circle',
      date: '2024-05-10',
      category: 'friendships',
      emotion: 'Joy & Triumph',
      importance: 4,
      era: 'academic',
      description: 'Gathered 6 dedicated classmates to solve competitive programming problems and peer-review code twice a week.',
      lesson: 'If you want to go fast, study alone. If you want to achieve mastery, learn and teach in a study circle.',
      tags: ['study-circle', 'mentorship', 'peer-learning'],
      connectedTo: ['mem_first_hackathon'],
      x: 200,
      y: 150,
      createdAt: '2024-01-06T00:00:00.000Z'
    },
    {
      id: 'mem_internship_selected',
      title: 'Selected for Summer Software Fellowship',
      date: '2024-08-01',
      category: 'career',
      emotion: 'Pride & Mastery',
      importance: 5,
      era: 'career',
      description: 'Cleared multiple technical interviews covering algorithms, system design, and behavioral questions to secure a summer engineering fellowship.',
      lesson: 'Technical interviews reward deep conceptual grasp and clear communication of trade-offs.',
      tags: ['internship', 'fellowship', 'career-milestone'],
      connectedTo: ['mem_gpa_record', 'mem_study_circle'],
      x: -100,
      y: 250,
      createdAt: '2024-01-07T00:00:00.000Z'
    },
    {
      id: 'mem_leetcode_century',
      title: 'Personal Milestone: 150 Algorithmic Problems Solved',
      date: '2024-10-05',
      category: 'turning_points',
      emotion: 'Resilience & Grit',
      importance: 5,
      era: 'career',
      description: 'Hit the landmark milestone of 150 solved problems across dynamic programming, trees, graphs, and graph theory without skipping days.',
      lesson: 'Confidence isn’t optimism; confidence is evidence from hundreds of hours of solved challenges.',
      tags: ['record', 'leetcode', 'turning-point', 'grit'],
      connectedTo: ['mem_internship_selected', 'mem_calc_breakthrough'],
      x: 60,
      y: 300,
      createdAt: '2024-01-08T00:00:00.000Z'
    }
  ];

  // Sample Active Courses
  const SAMPLE_COURSES = [
    {
      id: 'course_dsa',
      name: 'Data Structures & Algorithms',
      code: 'CS-301',
      credits: 4,
      targetGrade: 'A+',
      currentScore: 94,
      attendance: 95,
      nextExam: '2026-11-15',
      examTitle: 'Final Exam (Dynamic Programming & Graphs)'
    },
    {
      id: 'course_math',
      name: 'Linear Algebra & Optimization',
      code: 'MATH-240',
      credits: 4,
      targetGrade: 'A',
      currentScore: 89,
      attendance: 90,
      nextExam: '2026-11-20',
      examTitle: 'Midterm 2 (Eigenvalues & SVD)'
    },
    {
      id: 'course_db',
      name: 'Database Management Systems',
      code: 'CS-310',
      credits: 3,
      targetGrade: 'A',
      currentScore: 92,
      attendance: 92,
      nextExam: '2026-11-28',
      examTitle: 'Database Architecture Project Demo'
    },
    {
      id: 'course_net',
      name: 'Computer Networks & Security',
      code: 'CS-330',
      credits: 4,
      targetGrade: 'A-',
      currentScore: 86,
      attendance: 88,
      nextExam: '2026-12-05',
      examTitle: 'Networking Protocols Quiz'
    },
    {
      id: 'course_hci',
      name: 'Human-Computer Interaction',
      code: 'CS-220',
      credits: 3,
      targetGrade: 'A+',
      currentScore: 97,
      attendance: 96,
      nextExam: '2026-12-12',
      examTitle: 'Usability Evaluation Presentation'
    }
  ];

  // Sample Personal Records (Hall of Records)
  const SAMPLE_RECORDS = [
    {
      id: 'rec_gpa',
      title: 'Highest Semester GPA',
      domain: 'Academic',
      value: '3.96 / 4.0',
      desc: 'Achieved in Fall 2023 with 5 upper-division engineering courses.'
    },
    {
      id: 'rec_streak',
      title: 'Longest Consecutive Study Streak',
      domain: 'Habits & Reading',
      value: '34 Days',
      desc: 'Maintained minimum 2 hours focused revision every single day without interruption.'
    },
    {
      id: 'rec_hackathon',
      title: 'Fastest Hackathon MVP Built',
      domain: 'Tech & Coding',
      value: '24 Hours',
      desc: 'Architected and shipped live student platform prototype with team.'
    },
    {
      id: 'rec_leetcode',
      title: 'Total Solved Algorithmic Challenges',
      domain: 'Tech & Coding',
      value: '150 Problems',
      desc: 'Covering Trees, Dynamic Programming, Graphs, and Greedy Algorithms.'
    },
    {
      id: 'rec_fitness',
      title: '10km Morning Run Time',
      domain: 'Fitness & Health',
      value: '48m 12s',
      desc: 'Personal best cardiovascular stamina test during semester break.'
    },
    {
      id: 'rec_sleep',
      title: 'Finals Week Sleep Average',
      domain: 'Fitness & Health',
      value: '7.8 Hours/Night',
      desc: 'Maintained optimal brain recovery during the highest stress examination week.'
    }
  ];

  // Sample Student Badges
  const SAMPLE_BADGES = [
    { id: 'b_deans', name: "Dean's List Contender", icon: '🏆', domain: 'Academic' },
    { id: 'b_focus', name: 'Focus Master (45h+)', icon: '⏳', domain: 'Study' },
    { id: 'b_hack', name: 'Hackathon Warrior', icon: '💻', domain: 'Tech' },
    { id: 'b_streak', name: '14-Day Iron Streak', icon: '🔥', domain: 'Habit' },
    { id: 'b_hydro', name: 'Hydration Champion', icon: '💧', domain: 'Wellness' },
    { id: 'b_mind', name: 'Zen Mindset', icon: '🧘', domain: 'Mental Health' }
  ];

  // Sample Daily Missions
  const SAMPLE_MISSIONS = [
    { id: 'm1', text: 'Complete 2 Pomodoro focus sessions on Algorithms', completed: true, tag: 'Study' },
    { id: 'm2', text: 'Revise Linear Algebra Eigenvectors lecture notes', completed: true, tag: 'Academics' },
    { id: 'm3', text: 'Drink 8 glasses of water today', completed: false, tag: 'Health' },
    { id: 'm4', text: '25-minute evening jog or workout', completed: false, tag: 'Fitness' },
    { id: 'm5', text: 'Sleep by 11:15 PM for 8 hours of memory consolidation', completed: false, tag: 'Recovery' }
  ];

  // Sample Educational Goals
  const SAMPLE_GOALS = [
    {
      id: 'goal_grad_honors',
      title: 'Graduate with First-Class Honors (GPA > 3.90)',
      targetDate: '2027-05-30',
      category: 'academics',
      description: 'Maintain deep conceptual mastery across all computer science courses and graduate at the top of the department.',
      progress: 75,
      status: 'in_progress',
      milestones: [
        { id: 'ms1', text: 'Secure 3.9+ GPA in sophomore year', completed: true },
        { id: 'ms2', text: 'Publish undergraduate research paper', completed: true },
        { id: 'ms3', text: 'Complete Senior Capstone distinction project', completed: false },
        { id: 'ms4', text: 'Final departmental honors presentation', completed: false }
      ],
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 'goal_publish_paper',
      title: 'Publish Research Paper on Distributed Systems & AI',
      targetDate: '2027-11-20',
      category: 'skills',
      description: 'Collaborate with faculty mentor to author and submit a research paper to an IEEE student conference.',
      progress: 40,
      status: 'in_progress',
      milestones: [
        { id: 'ms_p1', text: 'Conduct comprehensive literature review of 20 papers', completed: true },
        { id: 'ms_p2', text: 'Run simulation benchmarks and collect latency data', completed: false },
        { id: 'ms_p3', text: 'Draft methodology and results chapters', completed: false }
      ],
      createdAt: '2024-01-05T00:00:00.000Z'
    },
    {
      id: 'goal_iron_fitness',
      title: 'Achieve 60-Day Workout & Sleep Discipline Streak',
      targetDate: '2027-04-15',
      category: 'wellness',
      description: 'Build peak physical stamina and ensure brain health through non-negotiable daily movement and 7.5h sleep.',
      progress: 50,
      status: 'in_progress',
      milestones: [
        { id: 'ms_f1', text: 'Cross 14 consecutive workout days', completed: true },
        { id: 'ms_f2', text: 'Cross 30 consecutive days of proper sleep hygiene', completed: true },
        { id: 'ms_f3', text: 'Hit full 60-day milestone', completed: false }
      ],
      createdAt: '2024-01-10T00:00:00.000Z'
    }
  ];

  // Motivational Quotes Collection
  const MOTIVATIONAL_QUOTES = [
    { quote: "You don't have to be extreme, just consistent. 25 minutes of deep focus beats 4 hours of distracted scrolling every single time.", author: "High-Performance Student Law", tag: "Focus" },
    { quote: "Every time you study when you don't feel like it, you build the superpower that separates champions from dreamers.", author: "Discipline Principle", tag: "Consistency" },
    { quote: "Protect your health like your GPA depends on it—because it does. A tired brain cannot master deep concepts.", author: "Student Wellness Axiom", tag: "Health" },
    { quote: "Records aren't broken by luck; they are shattered when preparation and stubborn persistence collide.", author: "Hall of Fame Code", tag: "Records" },
    { quote: "Never judge your progress by someone else's highlight reel. Run your own academic race.", author: "Mindset Shield", tag: "Exam Confidence" },
    { quote: "Failure on a quiz is just free diagnostic data. Learn the flaw, patch the bug, and come back twice as strong.", author: "Engineering Growth Rule", tag: "Resilience" },
    { quote: "The best students aren't necessarily the smartest; they are the most relentlessly organized.", author: "Academic Mastery", tag: "Study Habits" },
    { quote: "Sleep is not lost study time; sleep is the exact biological mechanism that turns short-term study into permanent knowledge.", author: "Cognitive Science Law", tag: "Recovery" }
  ];

  // ==========================================
  // 2. STATE MANAGER
  // ==========================================

  const State = {
    memories: [],
    courses: [],
    records: [],
    goals: [],
    missions: [],
    wellness: {
      waterGlasses: 6,
      sleepHours: 7.5,
      sleepQuality: 'Restful',
      currentMood: 'Energized',
      workouts: ['30m Morning Run', 'Gym Strength Session', 'Core & Mobility']
    },
    focusSessions: [],
    settings: { ...DEFAULT_SETTINGS },
    activeView: 'dashboard',
    selectedMemoryId: null,

    // Pomodoro Timer State
    pomodoro: {
      mode: 'pomodoro', // 'pomodoro' (25), 'shortBreak' (5), 'longBreak' (15)
      timeLeft: 25 * 60,
      isRunning: false,
      timerId: null,
      durations: {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60
      }
    },

    // Map Viewport Transformations
    map: {
      panX: 0,
      panY: 0,
      scale: 1,
      minScale: 0.35,
      maxScale: 3.5,
      isPanning: false,
      startX: 0,
      startY: 0,
      categoryFilter: 'all',
      eraFilter: 'all',
      searchQuery: '',
      showLabels: true,
      draggedNode: null,
      hasDraggedNode: false
    },

    // Timeline Settings
    timeline: {
      sortOrder: 'asc',
      categoryFilter: 'all',
      searchQuery: ''
    },

    // Breathing Exercise State
    breathing: {
      timerId: null,
      timeLeft: 120,
      isActive: false
    },

    // Web Audio Synthesizer State
    audio: {
      ctx: null,
      isPlaying: false,
      currentType: 'binaural',
      nodes: []
    }
  };

  // ==========================================
  // 3. PERSISTENCE & INITIALIZATION
  // ==========================================

  function loadSavedData() {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettings) {
        State.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
      }

      const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
      if (!isInitialized) {
        // First run: load initial sample datasets
        State.memories = [...SAMPLE_MEMORIES];
        State.courses = [...SAMPLE_COURSES];
        State.records = [...SAMPLE_RECORDS];
        State.goals = [...SAMPLE_GOALS];
        State.missions = [...SAMPLE_MISSIONS];
        saveAllData();
        localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
      } else {
        const savedMem = localStorage.getItem(STORAGE_KEYS.MEMORIES);
        State.memories = savedMem ? JSON.parse(savedMem) : [];

        const savedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
        State.courses = savedCourses ? JSON.parse(savedCourses) : [];

        const savedRec = localStorage.getItem(STORAGE_KEYS.RECORDS);
        State.records = savedRec ? JSON.parse(savedRec) : [];

        const savedGoals = localStorage.getItem(STORAGE_KEYS.GOALS);
        State.goals = savedGoals ? JSON.parse(savedGoals) : [];

        const savedMissions = localStorage.getItem(STORAGE_KEYS.DAILY_MISSIONS);
        State.missions = savedMissions ? JSON.parse(savedMissions) : [...SAMPLE_MISSIONS];

        const savedWellness = localStorage.getItem(STORAGE_KEYS.WELLNESS);
        if (savedWellness) State.wellness = JSON.parse(savedWellness);

        const savedSessions = localStorage.getItem(STORAGE_KEYS.FOCUS_SESSIONS);
        State.focusSessions = savedSessions ? JSON.parse(savedSessions) : [];
      }
    } catch (e) {
      console.error('Error loading LocalStorage data:', e);
      State.memories = [...SAMPLE_MEMORIES];
      State.courses = [...SAMPLE_COURSES];
      State.records = [...SAMPLE_RECORDS];
      State.goals = [...SAMPLE_GOALS];
      State.missions = [...SAMPLE_MISSIONS];
    }
  }

  function saveAllData() {
    try {
      localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(State.memories));
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(State.courses));
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(State.records));
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(State.goals));
      localStorage.setItem(STORAGE_KEYS.DAILY_MISSIONS, JSON.stringify(State.missions));
      localStorage.setItem(STORAGE_KEYS.WELLNESS, JSON.stringify(State.wellness));
      localStorage.setItem(STORAGE_KEYS.FOCUS_SESSIONS, JSON.stringify(State.focusSessions));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(State.settings));
      updateStorageUsageIndicator();
    } catch (e) {
      console.error('Error saving data:', e);
      showToast('Local storage error. Quota might be exceeded.', 'error');
    }
  }

  function updateStorageUsageIndicator() {
    const el = document.getElementById('storageUsageText');
    const bar = document.getElementById('storageProgressBar');
    if (!el || !bar) return;

    let totalBytes = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalBytes += (localStorage[key].length + key.length) * 2;
      }
    }

    const kb = (totalBytes / 1024).toFixed(1);
    const maxMb = 5.0;
    const percent = Math.min(100, Math.max(1, (totalBytes / (maxMb * 1024 * 1024)) * 100));

    el.textContent = `${kb} KB / ~${maxMb} MB`;
    bar.style.width = `${percent}%`;
  }

  // ==========================================
  // 4. NAVIGATION & VIEW SWITCHING
  // ==========================================

  function switchView(viewName) {
    if (!viewName) return;
    State.activeView = viewName;

    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const activeSec = document.getElementById(`view-${viewName}`);
    if (activeSec) {
      activeSec.classList.add('active');
    }

    const titleEl = document.getElementById('pageTitle');
    const tagEl = document.getElementById('pageTagline');

    switch (viewName) {
      case 'dashboard':
        titleEl.textContent = 'Student Motivational Hub';
        tagEl.textContent = `"${State.settings.lifeTagline}"`;
        renderDashboard();
        break;
      case 'map':
        titleEl.textContent = 'Student Constellation Map';
        tagEl.textContent = 'Explore academic landmarks, personal records, and life connections.';
        requestAnimationFrame(() => {
          centerMapOnViewport();
          renderMap();
        });
        break;
      case 'focus':
        titleEl.textContent = 'Study & Focus Zone';
        tagEl.textContent = 'Laser focus with Pomodoro discipline and synthesized study audio.';
        renderFocusZone();
        break;
      case 'academics':
        titleEl.textContent = 'Courses & Academic Target Tracker';
        tagEl.textContent = 'Track your subjects, estimated GPA, and upcoming exam countdowns.';
        renderAcademics();
        break;
      case 'wellness':
        titleEl.textContent = 'Student Health & Wellness Studio';
        tagEl.textContent = 'Peak cognitive performance demands a nurtured mind and body.';
        renderWellnessStudio();
        break;
      case 'records':
        titleEl.textContent = 'Hall of Records & Personal Bests';
        tagEl.textContent = 'Honor your all-time high marks, coding records, and milestone streaks.';
        renderRecords();
        break;
      case 'goals':
        titleEl.textContent = 'Educational Ambitions & Dreams';
        tagEl.textContent = 'Projecting your targets forward. 100% completion unlocks map achievements.';
        renderGoals();
        break;
      case 'timeline':
        titleEl.textContent = 'Student Milestone Timeline';
        tagEl.textContent = 'Your academic journey flowing from breakthrough to breakthrough.';
        renderTimeline();
        break;
      case 'motivation':
        titleEl.textContent = 'Motivation Wall & Daily Spark';
        tagEl.textContent = 'Fuel your daily discipline when willpower is running low.';
        renderMotivationWall();
        break;
      case 'insights':
        titleEl.textContent = 'Performance & Habit Analytics';
        tagEl.textContent = 'Data-backed reflections derived directly from your study sessions and health.';
        renderInsights();
        break;
      case 'settings':
        titleEl.textContent = 'Student Settings & Privacy';
        tagEl.textContent = 'Manage themes, profiles, and local browser data.';
        populateSettingsFields();
        break;
    }

    document.getElementById('sidebar')?.classList.remove('mobile-open');
  }

  function applySettings() {
    document.documentElement.setAttribute('data-theme', State.settings.theme || 'dark');
    const sunIcon = document.getElementById('themeIconSun');
    const moonIcon = document.getElementById('themeIconMoon');
    if (State.settings.theme === 'light') {
      sunIcon?.classList.add('hidden');
      moonIcon?.classList.remove('hidden');
    } else {
      sunIcon?.classList.remove('hidden');
      moonIcon?.classList.add('hidden');
    }

    if (State.settings.reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }

    const name = State.settings.userName || 'Student';
    const heroName = document.getElementById('heroUserName');
    const sidebarName = document.getElementById('sidebarUserName');
    const avatar = document.getElementById('sidebarAvatar');
    if (heroName) heroName.textContent = name;
    if (sidebarName) sidebarName.textContent = name;
    if (avatar) avatar.textContent = name.charAt(0).toUpperCase();

    // Streak count
    const streakEl = document.getElementById('headerStreakCount');
    if (streakEl) streakEl.textContent = State.settings.streak || 14;

    // Badges
    const mapBadge = document.getElementById('navMapCount');
    if (mapBadge) mapBadge.textContent = State.memories.length;

    const recordBadge = document.getElementById('navRecordsCount');
    if (recordBadge) recordBadge.textContent = State.records.length;

    const goalBadge = document.getElementById('navGoalCount');
    if (goalBadge) {
      goalBadge.textContent = State.goals.filter(g => g.status !== 'completed').length;
    }
  }

  // ==========================================
  // 5. DASHBOARD VIEW CONTROLLER
  // ==========================================

  function renderDashboard() {
    applySettings();

    // Calculate total focus hours
    let totalFocusMins = 0;
    State.focusSessions.forEach(s => totalFocusMins += (s.duration || 25));
    // Default baseline if empty
    if (totalFocusMins === 0) totalFocusMins = 48.5 * 60;
    const focusHoursText = (totalFocusMins / 60).toFixed(1) + 'h';

    const statFocus = document.getElementById('statFocusHours');
    if (statFocus) statFocus.textContent = focusHoursText;

    const statRec = document.getElementById('statPersonalRecords');
    if (statRec) statRec.textContent = State.records.length;

    const statBreakthroughs = document.getElementById('statExamBreakthroughs');
    if (statBreakthroughs) statBreakthroughs.textContent = State.memories.filter(m => m.category === 'academics' || m.category === 'records').length;

    const statGoals = document.getElementById('statGoalsCompleted');
    if (statGoals) statGoals.textContent = State.goals.filter(g => g.status === 'completed' || g.progress === 100).length;

    renderDailyMissionsList();
    renderExamCountdowns();
    renderRecentMilestones();
    renderDashboardMiniMap();
  }

  function renderDailyMissionsList() {
    const container = document.getElementById('dailyMissionList');
    if (!container) return;

    if (State.missions.length === 0) {
      container.innerHTML = `<p style="font-size: 0.82rem; color: var(--text-muted); padding: 8px;">All daily missions cleared! Click "+ New Task" to add your next study goal.</p>`;
      return;
    }

    container.innerHTML = State.missions.map(m => `
      <div class="mission-item">
        <input type="checkbox" ${m.completed ? 'checked' : ''} onchange="window.LifeMapApp.toggleDailyMission('${m.id}')">
        <span class="mission-text ${m.completed ? 'completed' : ''}">${escapeHtml(m.text)}</span>
        ${m.tag ? `<span class="mission-badge-tag">${escapeHtml(m.tag)}</span>` : ''}
        <button type="button" onclick="window.LifeMapApp.deleteDailyMission('${m.id}')" style="color: var(--text-muted); font-size: 1rem; margin-left: 6px;">&times;</button>
      </div>
    `).join('');
  }

  function toggleDailyMission(missionId) {
    const mission = State.missions.find(m => m.id === missionId);
    if (!mission) return;
    mission.completed = !mission.completed;
    saveAllData();
    renderDailyMissionsList();

    if (mission.completed) {
      showToast(`Mission accomplished: "${mission.text}"!`, 'success');
    }
  }

  function deleteDailyMission(missionId) {
    State.missions = State.missions.filter(m => m.id !== missionId);
    saveAllData();
    renderDailyMissionsList();
  }

  function addDailyMissionPrompt() {
    const text = prompt('Enter today\'s study or wellness mission:');
    if (!text || !text.trim()) return;

    State.missions.push({
      id: `m_${Date.now()}`,
      text: text.trim(),
      completed: false,
      tag: 'Study'
    });
    saveAllData();
    renderDailyMissionsList();
    showToast('New daily study mission locked in!', 'success');
  }

  function renderExamCountdowns() {
    const container = document.getElementById('dashboardExamCountdowns');
    if (!container) return;

    const upcoming = State.courses
      .filter(c => c.nextExam)
      .sort((a, b) => new Date(a.nextExam) - new Date(b.nextExam))
      .slice(0, 3);

    if (upcoming.length === 0) {
      container.innerHTML = `<p style="font-size: 0.82rem; color: var(--text-muted); padding: 8px;">No upcoming exam dates set. Add them under Courses & Grades!</p>`;
      return;
    }

    const today = new Date();
    container.innerHTML = upcoming.map(c => {
      const examDate = new Date(c.nextExam);
      const diffTime = examDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const isUrgent = diffDays <= 14;
      const daysText = diffDays <= 0 ? 'Today / Overdue' : `In ${diffDays} Days`;

      return `
        <div class="exam-countdown-card">
          <div>
            <div style="font-weight: 700; font-size: 0.9rem;">${escapeHtml(c.name)} (${c.code || ''})</div>
            <div style="font-size: 0.76rem; color: var(--text-muted);">${escapeHtml(c.examTitle || 'Upcoming Examination')}</div>
          </div>
          <span class="countdown-pill ${isUrgent ? 'countdown-urgent' : 'countdown-safe'}">${daysText}</span>
        </div>
      `;
    }).join('');
  }

  function renderRecentMilestones() {
    const container = document.getElementById('recentActivityList');
    if (!container) return;

    const recent = [...State.memories]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    container.innerHTML = recent.map(mem => {
      const cat = CATEGORY_META[mem.category] || { color: '#3b82f6', label: mem.category };
      return `
        <div class="activity-item" onclick="window.LifeMapApp.openMemoryDetails('${mem.id}')">
          <div class="activity-icon-node" style="color: ${cat.color}; background: ${cat.color};"></div>
          <div class="activity-content">
            <div class="activity-title">${escapeHtml(mem.title)}</div>
            <div class="activity-meta">
              <span>${formatDate(mem.date)}</span>
              <span>&bull;</span>
              <span style="color: ${cat.color}">${escapeHtml(cat.label)}</span>
              ${mem.emotion ? `<span>&bull;</span> <span>${escapeHtml(mem.emotion)}</span>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderDashboardMiniMap() {
    const svg = document.getElementById('dashboardMiniMap');
    if (!svg) return;
    svg.innerHTML = '';
    const width = 300, height = 200;
    if (State.memories.length === 0) return;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    State.memories.forEach(m => {
      const x = m.x || 0, y = m.y || 0;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    });

    const padding = 26;
    const spanX = Math.max(100, maxX - minX);
    const spanY = Math.max(100, maxY - minY);
    const mapX = (x) => padding + ((x - minX) / spanX) * (width - padding * 2);
    const mapY = (y) => padding + ((y - minY) / spanY) * (height - padding * 2);

    // Draw lines
    const linesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    State.memories.forEach(mem => {
      if (!Array.isArray(mem.connectedTo)) return;
      mem.connectedTo.forEach(targetId => {
        const target = State.memories.find(m => m.id === targetId);
        if (target) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', mapX(mem.x || 0));
          line.setAttribute('y1', mapY(mem.y || 0));
          line.setAttribute('x2', mapX(target.x || 0));
          line.setAttribute('y2', mapY(target.y || 0));
          line.setAttribute('stroke', 'rgba(59, 130, 246, 0.4)');
          line.setAttribute('stroke-width', '1.5');
          linesGroup.appendChild(line);
        }
      });
    });
    svg.appendChild(linesGroup);

    // Draw nodes
    const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    State.memories.forEach(mem => {
      const cx = mapX(mem.x || 0);
      const cy = mapY(mem.y || 0);
      const cat = CATEGORY_META[mem.category] || { color: '#3b82f6' };

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', mem.id === 'mem_genesis' ? '6' : '4');
      circle.setAttribute('fill', cat.color);
      circle.setAttribute('stroke', '#ffffff');
      circle.setAttribute('stroke-width', '1');
      circle.setAttribute('opacity', '0.9');
      nodesGroup.appendChild(circle);
    });
    svg.appendChild(nodesGroup);
  }

  // ==========================================
  // 6. STUDY & FOCUS ZONE (POMODORO TIMER)
  // ==========================================

  function renderFocusZone() {
    updateTimerDisplay();
    renderFocusSessionsList();
  }

  function updateTimerDisplay() {
    const display = document.getElementById('pomoTimerDisplay');
    if (!display) return;

    const mins = Math.floor(State.pomodoro.timeLeft / 60);
    const secs = State.pomodoro.timeLeft % 60;
    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function setPomodoroMode(mode) {
    State.pomodoro.mode = mode;
    State.pomodoro.timeLeft = State.pomodoro.durations[mode] || 25 * 60;
    stopPomodoro();

    document.querySelectorAll('.pomo-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    updateTimerDisplay();
  }

  function startPomodoro() {
    if (State.pomodoro.isRunning) {
      stopPomodoro();
      return;
    }

    State.pomodoro.isRunning = true;
    const btnText = document.getElementById('pomoStartBtnText');
    if (btnText) btnText.textContent = 'Pause Focus';

    // Start background ambient audio if not playing
    if (!State.audio.isPlaying) {
      startAmbientAudio();
    }

    State.pomodoro.timerId = setInterval(() => {
      if (State.pomodoro.timeLeft > 0) {
        State.pomodoro.timeLeft--;
        updateTimerDisplay();
      } else {
        // Completed timer
        onPomodoroCompleted();
      }
    }, 1000);
  }

  function stopPomodoro() {
    if (State.pomodoro.timerId) {
      clearInterval(State.pomodoro.timerId);
      State.pomodoro.timerId = null;
    }
    State.pomodoro.isRunning = false;
    const btnText = document.getElementById('pomoStartBtnText');
    if (btnText) btnText.textContent = 'Start Focus';
  }

  function resetPomodoro() {
    stopPomodoro();
    State.pomodoro.timeLeft = State.pomodoro.durations[State.pomodoro.mode] || 25 * 60;
    updateTimerDisplay();
  }

  function onPomodoroCompleted() {
    stopPomodoro();
    playBeepSound();

    if (State.pomodoro.mode === 'pomodoro') {
      const subject = document.getElementById('pomoSubjectSelect')?.value || 'General Study';
      const durationMins = 25;

      const session = {
        id: `sess_${Date.now()}`,
        subject,
        duration: durationMins,
        timestamp: new Date().toISOString()
      };
      State.focusSessions.unshift(session);
      saveAllData();

      showToast(`🎯 Outstanding! 25-minute focus session on "${subject}" completed!`, 'success');
      renderFocusSessionsList();

      // Switch to short break
      setPomodoroMode('shortBreak');
    } else {
      showToast('Break completed! Ready for the next deep focus sprint?', 'info');
      setPomodoroMode('pomodoro');
    }
  }

  function renderFocusSessionsList() {
    const container = document.getElementById('focusSessionsList');
    if (!container) return;

    if (State.focusSessions.length === 0) {
      container.innerHTML = `<p style="font-size: 0.82rem; color: var(--text-muted); padding: 8px;">No focus sessions logged today yet. Start a 25-minute sprint above!</p>`;
      return;
    }

    container.innerHTML = State.focusSessions.slice(0, 6).map(s => `
      <div class="focus-session-item">
        <div>
          <span style="font-weight: 600;">${escapeHtml(s.subject)}</span>
          <span style="font-size: 0.74rem; color: var(--text-muted); margin-left: 8px;">${new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <span class="badge-count" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">+${s.duration} min</span>
      </div>
    `).join('');
  }

  function playBeepSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  }

  function setupPomodoroListeners() {
    document.querySelectorAll('.pomo-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        setPomodoroMode(e.target.dataset.mode);
      });
    });

    document.getElementById('pomoStartBtn')?.addEventListener('click', startPomodoro);
    document.getElementById('pomoResetBtn')?.addEventListener('click', resetPomodoro);
    document.getElementById('headerFocusTimerBtn')?.addEventListener('click', () => {
      switchView('focus');
      startPomodoro();
    });
  }

  // ==========================================
  // 7. COURSES & ACADEMICS CONTROLLER
  // ==========================================

  function renderAcademics() {
    const grid = document.getElementById('coursesGrid');
    if (!grid) return;

    document.getElementById('acadTargetGpa').textContent = State.settings.targetGpa || '3.85';
    document.getElementById('acadTotalCourses').textContent = State.courses.length;

    // Calculate Average Score & Attendance
    if (State.courses.length > 0) {
      const avgScore = Math.round(State.courses.reduce((acc, c) => acc + (c.currentScore || 85), 0) / State.courses.length);
      const avgAttend = Math.round(State.courses.reduce((acc, c) => acc + (c.attendance || 90), 0) / State.courses.length);
      document.getElementById('acadAvgAttendance').textContent = `${avgAttend}%`;
      // GPA approximation
      const approxGpa = ((avgScore / 100) * 4.0).toFixed(2);
      document.getElementById('acadCurrentGpa').textContent = approxGpa;
    }

    if (State.courses.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 40px;">No courses enrolled yet. Click "Add Course" above!</p>`;
      return;
    }

    grid.innerHTML = State.courses.map(course => `
      <div class="course-card">
        <div class="course-top-row">
          <span class="course-code-badge">${escapeHtml(course.code || 'COURSE')}</span>
          <span style="font-size: 0.76rem; color: var(--text-muted);">${course.credits || 4} Credits</span>
        </div>
        <h3 class="course-title">${escapeHtml(course.name)}</h3>
        
        <div class="course-metric-row">
          <span>Target Grade: <strong style="color: #60a5fa;">${escapeHtml(course.targetGrade || 'A')}</strong></span>
          <span>Current Estimate: <strong>${course.currentScore || 88}%</strong></span>
        </div>

        <div class="course-progress-track">
          <div class="course-progress-fill" style="width: ${course.currentScore || 88}%;"></div>
        </div>

        <div class="course-metric-row">
          <span>Attendance: <strong style="color: ${course.attendance >= 75 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">${course.attendance || 90}%</strong></span>
          <span>${course.attendance >= 75 ? 'Safe ✓' : 'Shortage Alert ⚠️'}</span>
        </div>

        ${course.nextExam ? `
          <div style="font-size: 0.78rem; background: rgba(59, 130, 246, 0.08); padding: 8px 10px; border-radius: var(--radius-sm); border-left: 2px solid #3b82f6;">
            <strong>Next Exam:</strong> ${formatDate(course.nextExam)} &bull; ${escapeHtml(course.examTitle || 'Midterm')}
          </div>
        ` : ''}

        <div style="display: flex; gap: 8px; margin-top: auto; padding-top: 8px;">
          <button class="btn btn-outline btn-sm" onclick="window.LifeMapApp.openEditCourseModal('${course.id}')">Edit</button>
          <button class="btn btn-danger-outline btn-sm" onclick="window.LifeMapApp.deleteCourse('${course.id}')">Remove</button>
        </div>
      </div>
    `).join('');
  }

  function openAddCourseModal() {
    const modal = document.getElementById('courseModal');
    const form = document.getElementById('courseForm');
    if (!modal || !form) return;
    form.reset();
    document.getElementById('formCourseId').value = '';
    document.getElementById('modalCourseTitle').textContent = 'Add Course / Subject';
    modal.classList.add('active');
  }

  function openEditCourseModal(courseId) {
    const course = State.courses.find(c => c.id === courseId);
    if (!course) return;
    const modal = document.getElementById('courseModal');
    if (!modal) return;

    document.getElementById('formCourseId').value = course.id;
    document.getElementById('modalCourseTitle').textContent = 'Edit Course';
    document.getElementById('formCourseName').value = course.name;
    document.getElementById('formCourseCode').value = course.code || '';
    document.getElementById('formCourseCredits').value = course.credits || 4;
    document.getElementById('formCourseTargetGrade').value = course.targetGrade || 'A';
    document.getElementById('formCourseCurrentScore').value = course.currentScore || 88;
    document.getElementById('formCourseNextExam').value = course.nextExam || '';

    modal.classList.add('active');
  }

  function closeCourseModal() {
    document.getElementById('courseModal')?.classList.remove('active');
  }

  function setupCourseListeners() {
    document.getElementById('addNewCourseBtn')?.addEventListener('click', openAddCourseModal);
    document.getElementById('closeCourseModalBtn')?.addEventListener('click', closeCourseModal);
    document.getElementById('cancelCourseModalBtn')?.addEventListener('click', closeCourseModal);

    document.getElementById('courseForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formCourseName').value.trim();
      const code = document.getElementById('formCourseCode').value.trim();
      const credits = parseInt(document.getElementById('formCourseCredits').value, 10) || 4;
      const targetGrade = document.getElementById('formCourseTargetGrade').value.trim();
      const currentScore = parseInt(document.getElementById('formCourseCurrentScore').value, 10) || 85;
      const nextExam = document.getElementById('formCourseNextExam').value;
      const courseId = document.getElementById('formCourseId').value;

      if (!name) return;

      if (courseId) {
        const idx = State.courses.findIndex(c => c.id === courseId);
        if (idx !== -1) {
          State.courses[idx] = {
            ...State.courses[idx],
            name, code, credits, targetGrade, currentScore, nextExam
          };
          showToast(`Course "${name}" updated.`, 'success');
        }
      } else {
        State.courses.push({
          id: `course_${Date.now()}`,
          name, code, credits, targetGrade, currentScore, nextExam,
          attendance: 92,
          examTitle: 'Upcoming Exam'
        });
        showToast(`Added course "${name}".`, 'success');
      }

      saveAllData();
      closeCourseModal();
      renderAcademics();
      renderDashboard();
    });
  }

  function deleteCourse(courseId) {
    showConfirmModal(
      'Remove Course?',
      'Are you sure you want to drop this course from your academic tracker?',
      () => {
        State.courses = State.courses.filter(c => c.id !== courseId);
        saveAllData();
        renderAcademics();
        renderDashboard();
        showToast('Course removed.', 'info');
      }
    );
  }

  // ==========================================
  // 8. STUDENT HEALTH & WELLNESS STUDIO
  // ==========================================

  function renderWellnessStudio() {
    // Water Glasses
    renderWaterGlasses();
    document.getElementById('wellnessWaterCount').textContent = `${State.wellness.waterGlasses} / 8 Glasses`;
    document.getElementById('dashWaterText').textContent = `${State.wellness.waterGlasses} / 8 Glasses`;

    // Sleep
    const sleepInput = document.getElementById('sleepHoursInput');
    const sleepLabel = document.getElementById('sleepHoursLabel');
    if (sleepInput) sleepInput.value = State.wellness.sleepHours || 7.5;
    if (sleepLabel) sleepLabel.textContent = `${State.wellness.sleepHours || 7.5}h`;

    const sleepScore = document.getElementById('wellnessSleepScore');
    if (sleepScore) sleepScore.textContent = `${State.wellness.sleepHours || 7.5} hrs (${State.wellness.sleepQuality || 'Restful'})`;
    const dashSleep = document.getElementById('dashSleepText');
    if (dashSleep) dashSleep.textContent = `${State.wellness.sleepHours || 7.5}h (${State.wellness.sleepQuality || 'Restful'})`;

    // Mood
    document.getElementById('currentMoodBadge').textContent = `⚡ ${State.wellness.currentMood || 'Energized'}`;
    document.querySelectorAll('.mood-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mood === State.wellness.currentMood);
    });

    // Workouts
    renderWorkoutsList();
  }

  function renderWaterGlasses() {
    const container = document.getElementById('waterGlassesGrid');
    if (!container) return;
    const total = 8;
    const filled = State.wellness.waterGlasses || 0;

    let html = '';
    for (let i = 1; i <= total; i++) {
      html += `<span class="water-glass-btn ${i <= filled ? 'filled' : ''}" onclick="window.LifeMapApp.setWater(${i})">💧</span>`;
    }
    container.innerHTML = html;
  }

  function setWater(count) {
    State.wellness.waterGlasses = count;
    saveAllData();
    renderWellnessStudio();
    if (count >= 8) {
      showToast('🎉 Daily hydration target reached! Brain primed for maximum cognition.', 'success');
    }
  }

  function logWaterGlass() {
    if (State.wellness.waterGlasses < 8) {
      State.wellness.waterGlasses++;
      saveAllData();
      renderWellnessStudio();
      showToast(`Logged hydration: ${State.wellness.waterGlasses}/8 glasses!`, 'info');
    } else {
      showToast('You have already crushed your 8-glass hydration target today!', 'success');
    }
  }

  function resetWater() {
    State.wellness.waterGlasses = 0;
    saveAllData();
    renderWellnessStudio();
  }

  function saveSleepLog() {
    const hours = parseFloat(document.getElementById('sleepHoursInput').value) || 7.5;
    const quality = document.getElementById('sleepQualitySelect').value;
    State.wellness.sleepHours = hours;
    State.wellness.sleepQuality = quality;
    saveAllData();
    renderWellnessStudio();
    showToast(`Sleep log saved: ${hours} hours (${quality}).`, 'success');
  }

  function setStudentMood(mood) {
    State.wellness.currentMood = mood;
    saveAllData();
    renderWellnessStudio();

    const adviceBox = document.getElementById('moodAdviceBox');
    const adviceMap = {
      Energized: '💡 <strong>Student Tip:</strong> You are in high-energy flow. Tackle your hardest problem sets and complex concepts right now!',
      Focused: '🎯 <strong>Student Tip:</strong> Prime state for deep research, writing code, or writing lab reports without distractions.',
      Calm: '🌿 <strong>Student Tip:</strong> Ideal mindset for review, reading academic papers, and organizing weekly study schedules.',
      Tired: '🥱 <strong>Student Tip:</strong> Take a 20-minute power nap or do light review. Do not force heavy new learning on an exhausted brain.',
      Stressed: '🌧️ <strong>Student Tip:</strong> Pause immediately. Use the 2-minute Guided Breathing Exercise below. 5 deep breaths lower cortisol by 40%.'
    };
    if (adviceBox) adviceBox.innerHTML = adviceMap[mood] || adviceMap['Energized'];
  }

  function renderWorkoutsList() {
    const container = document.getElementById('workoutQuickList');
    if (!container) return;
    const workouts = State.wellness.workouts || [];
    container.innerHTML = workouts.map((w, idx) => `
      <div class="workout-item">
        <span>🏃 ${escapeHtml(w)}</span>
        <button type="button" onclick="window.LifeMapApp.removeWorkout(${idx})" style="color: var(--text-muted);">&times;</button>
      </div>
    `).join('');
  }

  function addWorkout() {
    const input = document.getElementById('newWorkoutInput');
    const text = input.value.trim();
    if (!text) return;
    if (!State.wellness.workouts) State.wellness.workouts = [];
    State.wellness.workouts.unshift(text);
    input.value = '';
    saveAllData();
    renderWorkoutsList();
    showToast(`Logged workout: "${text}"! Physical movement powers student grit.`, 'success');
  }

  function removeWorkout(index) {
    if (State.wellness.workouts) {
      State.wellness.workouts.splice(index, 1);
      saveAllData();
      renderWorkoutsList();
    }
  }

  // 2-Minute Breathing Exercise
  function startBreathingExercise() {
    const modal = document.getElementById('breathingModal');
    if (!modal) return;
    modal.classList.add('active');

    State.breathing.timeLeft = 120;
    updateBreathingDisplay();
    runBreathingCycles();
  }

  function closeBreathingExercise() {
    if (State.breathing.timerId) {
      clearInterval(State.breathing.timerId);
      State.breathing.timerId = null;
    }
    State.breathing.isActive = false;
    document.getElementById('breathingModal')?.classList.remove('active');
  }

  function updateBreathingDisplay() {
    const timerEl = document.getElementById('breathingTimerCount');
    if (!timerEl) return;
    const mins = Math.floor(State.breathing.timeLeft / 60);
    const secs = State.breathing.timeLeft % 60;
    timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function runBreathingCycles() {
    if (State.breathing.timerId) clearInterval(State.breathing.timerId);
    State.breathing.isActive = true;

    const circle = document.getElementById('breathingCircle');
    const text = document.getElementById('breathingActionText');

    let cycleStep = 0; // 0: inhale, 1: hold, 2: exhale, 3: hold
    const steps = [
      { text: 'Inhale', class: 'expand' },
      { text: 'Hold', class: 'expand' },
      { text: 'Exhale', class: 'contract' },
      { text: 'Hold', class: 'contract' }
    ];

    function applyStep() {
      const s = steps[cycleStep];
      if (text) text.textContent = s.text;
      if (circle) {
        circle.classList.remove('expand', 'contract');
        circle.classList.add(s.class);
      }
      cycleStep = (cycleStep + 1) % 4;
    }

    applyStep();
    const cycleInterval = setInterval(() => {
      if (!State.breathing.isActive) {
        clearInterval(cycleInterval);
        return;
      }
      applyStep();
    }, 4000);

    State.breathing.timerId = setInterval(() => {
      if (State.breathing.timeLeft > 0) {
        State.breathing.timeLeft--;
        updateBreathingDisplay();
      } else {
        closeBreathingExercise();
        showToast('🧘 2-minute breathwork complete. Your mind is refreshed and reset.', 'success');
      }
    }, 1000);
  }

  function setupWellnessListeners() {
    document.getElementById('sleepHoursInput')?.addEventListener('input', (e) => {
      document.getElementById('sleepHoursLabel').textContent = `${e.target.value}h`;
    });

    document.querySelectorAll('.mood-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        setStudentMood(e.target.dataset.mood);
      });
    });

    document.getElementById('logWorkoutBtn')?.addEventListener('click', addWorkout);
    document.getElementById('closeBreathingModalBtn')?.addEventListener('click', closeBreathingExercise);
    document.getElementById('startBreathingSessionBtn')?.addEventListener('click', runBreathingCycles);
  }

  // ==========================================
  // 9. HALL OF RECORDS & PERSONAL BESTS
  // ==========================================

  function renderRecords() {
    renderBadgesRow();
    renderPersonalBestsGrid();
  }

  function renderBadgesRow() {
    const container = document.getElementById('unlockedBadgesRow');
    if (!container) return;

    container.innerHTML = SAMPLE_BADGES.map(b => `
      <div class="badge-item">
        <span class="badge-icon">${b.icon}</span>
        <span>${escapeHtml(b.name)}</span>
      </div>
    `).join('');
  }

  function renderPersonalBestsGrid() {
    const grid = document.getElementById('personalBestsGrid');
    if (!grid) return;

    if (State.records.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 40px;">No personal records logged yet. Click "Set New Record" above!</p>`;
      return;
    }

    grid.innerHTML = State.records.map(r => `
      <div class="record-card">
        <div class="record-top">
          <span class="record-domain-badge">${escapeHtml(r.domain || 'Academic')}</span>
          <span style="font-size: 1.2rem;">🏆</span>
        </div>
        <h3 style="font-size: 1.05rem; font-weight: 700;">${escapeHtml(r.title)}</h3>
        <div class="record-value-highlight">${escapeHtml(r.value)}</div>
        <p class="record-desc">${escapeHtml(r.desc || '')}</p>
        <div style="margin-top: auto; padding-top: 8px;">
          <button class="btn btn-danger-outline btn-sm" onclick="window.LifeMapApp.deleteRecord('${r.id}')">Delete Record</button>
        </div>
      </div>
    `).join('');
  }

  function openAddRecordModal() {
    const modal = document.getElementById('recordModal');
    const form = document.getElementById('recordForm');
    if (!modal || !form) return;
    form.reset();
    document.getElementById('formRecordId').value = '';
    modal.classList.add('active');
  }

  function closeRecordModal() {
    document.getElementById('recordModal')?.classList.remove('active');
  }

  function setupRecordListeners() {
    document.getElementById('addNewRecordBtn')?.addEventListener('click', openAddRecordModal);
    document.getElementById('headerAddRecordBtn')?.addEventListener('click', openAddRecordModal);
    document.getElementById('closeRecordModalBtn')?.addEventListener('click', closeRecordModal);
    document.getElementById('cancelRecordModalBtn')?.addEventListener('click', closeRecordModal);

    document.getElementById('recordForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('formRecordTitle').value.trim();
      const domain = document.getElementById('formRecordDomain').value;
      const value = document.getElementById('formRecordValue').value.trim();
      const desc = document.getElementById('formRecordDesc').value.trim();

      if (!title || !value) return;

      const newRecord = {
        id: `rec_${Date.now()}`,
        title, domain, value, desc
      };
      State.records.push(newRecord);
      saveAllData();
      closeRecordModal();
      renderRecords();
      renderDashboard();
      showToast(`🏆 New Personal Record enshrined: "${title}" (${value})!`, 'success');
    });
  }

  function deleteRecord(recordId) {
    showConfirmModal(
      'Remove Record?',
      'Are you sure you want to remove this record from your Hall of Fame?',
      () => {
        State.records = State.records.filter(r => r.id !== recordId);
        saveAllData();
        renderRecords();
        renderDashboard();
        showToast('Record removed.', 'info');
      }
    );
  }

  // ==========================================
  // 10. MOTIVATION WALL & DAILY SPARK
  // ==========================================

  function renderMotivationWall() {
    shuffleDailyQuote();
    const grid = document.getElementById('motivationQuotesGrid');
    if (!grid) return;

    grid.innerHTML = MOTIVATIONAL_QUOTES.map(q => `
      <div class="quote-card">
        <span class="quote-tag">${escapeHtml(q.tag)}</span>
        <blockquote class="quote-text">"${escapeHtml(q.quote)}"</blockquote>
        <div class="quote-author">— ${escapeHtml(q.author)}</div>
      </div>
    `).join('');
  }

  function shuffleDailyQuote() {
    const quoteEl = document.getElementById('featuredSparkQuote');
    const authorEl = document.getElementById('featuredSparkAuthor');
    if (!quoteEl || !authorEl) return;

    const random = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    quoteEl.textContent = `"${random.quote}"`;
    authorEl.textContent = `— ${random.author}`;
  }

  // ==========================================
  // 11. INTERACTIVE LIFE MAP ENGINE (SVG CANVAS)
  // ==========================================

  function initMapEngine() {
    const viewport = document.getElementById('mapViewport');
    const svg = document.getElementById('lifeMapSvg');
    if (!viewport || !svg) return;

    centerMapOnViewport();

    viewport.addEventListener('mousedown', onMapMouseDown);
    window.addEventListener('mousemove', onMapMouseMove);
    window.addEventListener('mouseup', onMapMouseUp);
    viewport.addEventListener('wheel', onMapWheel, { passive: false });

    // Touch support
    viewport.addEventListener('touchstart', onMapTouchStart, { passive: false });
    viewport.addEventListener('touchmove', onMapTouchMove, { passive: false });
    viewport.addEventListener('touchend', onMapTouchEnd);

    // Toolbar buttons
    document.getElementById('mapZoomInBtn')?.addEventListener('click', () => zoomMap(0.25));
    document.getElementById('mapZoomOutBtn')?.addEventListener('click', () => zoomMap(-0.25));
    document.getElementById('mapResetViewBtn')?.addEventListener('click', resetMapView);
    document.getElementById('mapCenterGenesisBtn')?.addEventListener('click', centerOnGenesis);
    document.getElementById('mapToggleLabelsBtn')?.addEventListener('click', toggleMapLabels);
    document.getElementById('mapAutoLayoutBtn')?.addEventListener('click', autoLayoutNodes);
    document.getElementById('mapExportImageBtn')?.addEventListener('click', exportMapAsImage);
    document.getElementById('mapAddNodeBtn')?.addEventListener('click', () => openAddMemoryModal());

    document.getElementById('mapCategoryFilter')?.addEventListener('change', (e) => {
      State.map.categoryFilter = e.target.value;
      renderMap();
    });

    document.getElementById('mapEraFilter')?.addEventListener('change', (e) => {
      State.map.eraFilter = e.target.value;
      renderMap();
    });

    document.getElementById('mapSearchInput')?.addEventListener('input', (e) => {
      State.map.searchQuery = e.target.value.toLowerCase().trim();
      renderMap();
    });

    initStarryCanvas();
  }

  function centerMapOnViewport() {
    const viewport = document.getElementById('mapViewport');
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    State.map.panX = rect.width / 2;
    State.map.panY = rect.height / 2;
    State.map.scale = 1;
    applyMapTransform();
  }

  function centerOnGenesis() {
    const genesis = State.memories.find(m => m.id === 'mem_genesis') || State.memories[0];
    if (genesis) {
      focusCameraOnNode(genesis.id);
    } else {
      centerMapOnViewport();
    }
  }

  function resetMapView() {
    centerMapOnViewport();
    State.map.scale = 1;
    applyMapTransform();
    showToast('Map view centered.', 'info');
  }

  function zoomMap(delta) {
    const newScale = Math.min(State.map.maxScale, Math.max(State.map.minScale, State.map.scale + delta));
    State.map.scale = newScale;
    applyMapTransform();
  }

  function applyMapTransform() {
    const world = document.getElementById('mapWorldGroup');
    if (world) {
      world.setAttribute('transform', `translate(${State.map.panX}, ${State.map.panY}) scale(${State.map.scale})`);
    }
  }

  function onMapMouseDown(e) {
    if (e.target.closest('.map-node-group')) return;
    State.map.isPanning = true;
    State.map.startX = e.clientX - State.map.panX;
    State.map.startY = e.clientY - State.map.panY;
  }

  function onMapMouseMove(e) {
    if (State.map.draggedNode) {
      const nodeObj = State.memories.find(m => m.id === State.map.draggedNode);
      if (nodeObj) {
        const viewport = document.getElementById('mapViewport');
        const rect = viewport.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        nodeObj.x = (mouseX - State.map.panX) / State.map.scale;
        nodeObj.y = (mouseY - State.map.panY) / State.map.scale;
        State.map.hasDraggedNode = true;
        renderMap();
      }
      return;
    }

    if (!State.map.isPanning) return;
    State.map.panX = e.clientX - State.map.startX;
    State.map.panY = e.clientY - State.map.startY;
    applyMapTransform();
  }

  function onMapMouseUp() {
    if (State.map.draggedNode) {
      if (State.map.hasDraggedNode) saveAllData();
      State.map.draggedNode = null;
      State.map.hasDraggedNode = false;
    }
    State.map.isPanning = false;
  }

  function onMapWheel(e) {
    e.preventDefault();
    const zoomFactor = 1.1;
    const direction = e.deltaY < 0 ? 1 : -1;
    const factor = direction > 0 ? zoomFactor : 1 / zoomFactor;
    const newScale = Math.min(State.map.maxScale, Math.max(State.map.minScale, State.map.scale * factor));

    const viewport = document.getElementById('mapViewport');
    const rect = viewport.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    State.map.panX = mouseX - (mouseX - State.map.panX) * (newScale / State.map.scale);
    State.map.panY = mouseY - (mouseY - State.map.panY) * (newScale / State.map.scale);
    State.map.scale = newScale;
    applyMapTransform();
  }

  let initialTouchDist = null;
  function onMapTouchStart(e) {
    if (e.touches.length === 1) {
      State.map.isPanning = true;
      State.map.startX = e.touches[0].clientX - State.map.panX;
      State.map.startY = e.touches[0].clientY - State.map.panY;
    } else if (e.touches.length === 2) {
      initialTouchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }

  function onMapTouchMove(e) {
    e.preventDefault();
    if (e.touches.length === 1 && State.map.isPanning) {
      State.map.panX = e.touches[0].clientX - State.map.startX;
      State.map.panY = e.touches[0].clientY - State.map.startY;
      applyMapTransform();
    } else if (e.touches.length === 2 && initialTouchDist) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = currentDist / initialTouchDist;
      zoomMap((factor - 1) * 0.1);
      initialTouchDist = currentDist;
    }
  }

  function onMapTouchEnd() {
    State.map.isPanning = false;
    initialTouchDist = null;
  }

  function toggleMapLabels() {
    State.map.showLabels = !State.map.showLabels;
    document.getElementById('mapToggleLabelsBtn')?.classList.toggle('active', State.map.showLabels);
    renderMap();
  }

  function autoLayoutNodes() {
    const nonGenesis = State.memories.filter(m => m.id !== 'mem_genesis');
    const total = nonGenesis.length;
    if (total === 0) return;

    const rings = [
      { radius: 180, count: Math.min(4, total) },
      { radius: 300, count: Math.min(8, Math.max(0, total - 4)) },
      { radius: 420, count: Math.max(0, total - 12) }
    ];

    let currentIndex = 0;
    rings.forEach(ring => {
      if (ring.count <= 0) return;
      const angleStep = (2 * Math.PI) / ring.count;
      for (let i = 0; i < ring.count; i++) {
        if (currentIndex < total) {
          const node = nonGenesis[currentIndex];
          const angle = i * angleStep - Math.PI / 2;
          node.x = Math.round(Math.cos(angle) * ring.radius);
          node.y = Math.round(Math.sin(angle) * ring.radius);
          currentIndex++;
        }
      }
    });

    saveAllData();
    renderMap();
    centerOnGenesis();
    showToast('Student constellation nodes organized in orbital layout.', 'success');
  }

  function renderMap() {
    const connectionsLayer = document.getElementById('mapConnectionsLayer');
    const nodesLayer = document.getElementById('mapNodesLayer');
    const labelsLayer = document.getElementById('mapLabelsLayer');
    const ringsLayer = document.getElementById('mapRingsLayer');

    if (!connectionsLayer || !nodesLayer || !labelsLayer) return;

    connectionsLayer.innerHTML = '';
    nodesLayer.innerHTML = '';
    labelsLayer.innerHTML = '';
    if (ringsLayer) ringsLayer.innerHTML = '';

    if (ringsLayer) {
      [180, 300, 420].forEach(r => {
        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ring.setAttribute('cx', 0);
        ring.setAttribute('cy', 0);
        ring.setAttribute('r', r);
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', 'rgba(255, 255, 255, 0.03)');
        ring.setAttribute('stroke-dasharray', '4 8');
        ring.setAttribute('stroke-width', '1');
        ringsLayer.appendChild(ring);
      });
    }

    const isCategoryMatch = (mem) => State.map.categoryFilter === 'all' || mem.category === State.map.categoryFilter;
    const isEraMatch = (mem) => State.map.eraFilter === 'all' || mem.era === State.map.eraFilter;
    const isSearchMatch = (mem) => {
      if (!State.map.searchQuery) return true;
      const q = State.map.searchQuery;
      return (
        mem.title.toLowerCase().includes(q) ||
        (mem.lesson && mem.lesson.toLowerCase().includes(q)) ||
        (mem.tags && mem.tags.some(t => t.toLowerCase().includes(q)))
      );
    };

    const nodeCoords = new Map();
    State.memories.forEach(m => {
      nodeCoords.set(m.id, { x: m.x || 0, y: m.y || 0, data: m });
    });

    // Draw connecting paths
    State.memories.forEach(source => {
      if (!Array.isArray(source.connectedTo)) return;
      const sCoord = nodeCoords.get(source.id);
      if (!sCoord) return;

      source.connectedTo.forEach(targetId => {
        const tCoord = nodeCoords.get(targetId);
        if (!tCoord) return;

        const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const x1 = sCoord.x, y1 = sCoord.y, x2 = tCoord.x, y2 = tCoord.y;

        let d = '';
        if (State.settings.lineStyle === 'straight') {
          d = `M ${x1} ${y1} L ${x2} ${y2}`;
        } else {
          const dx = x2 - x1, dy = y2 - y1;
          const cx1 = x1 + dx * 0.25 - dy * 0.15;
          const cy1 = y1 + dy * 0.25 + dx * 0.15;
          const cx2 = x1 + dx * 0.75 + dy * 0.15;
          const cy2 = y1 + dy * 0.75 - dx * 0.15;
          d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
        }

        pathEl.setAttribute('d', d);
        pathEl.setAttribute('class', 'map-link');
        pathEl.setAttribute('data-source', source.id);
        pathEl.setAttribute('data-target', targetId);

        if (State.selectedMemoryId) {
          if (source.id === State.selectedMemoryId || targetId === State.selectedMemoryId) {
            pathEl.classList.add('highlighted');
          } else {
            pathEl.classList.add('dimmed');
          }
        }
        connectionsLayer.appendChild(pathEl);
      });
    });

    // Draw nodes
    State.memories.forEach(mem => {
      const coord = nodeCoords.get(mem.id);
      const isVisible = isCategoryMatch(mem) && isEraMatch(mem) && isSearchMatch(mem);
      const cat = CATEGORY_META[mem.category] || { color: '#3b82f6', label: mem.category };
      const isGenesis = mem.id === 'mem_genesis';
      const isTurningPoint = mem.category === 'turning_points' || mem.importance === 5;
      const isSelected = mem.id === State.selectedMemoryId;

      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('class', `map-node-group ${isSelected ? 'selected' : ''}`);
      group.setAttribute('transform', `translate(${coord.x}, ${coord.y})`);
      group.setAttribute('data-id', mem.id);
      group.style.opacity = isVisible ? '1' : '0.15';

      const glowCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      glowCircle.setAttribute('cx', 0);
      glowCircle.setAttribute('cy', 0);
      const baseRadius = isGenesis ? 22 : (isTurningPoint ? 18 : 13);
      glowCircle.setAttribute('r', baseRadius + 6);
      glowCircle.setAttribute('fill', cat.color);
      glowCircle.setAttribute('opacity', isSelected ? '0.45' : '0.15');
      glowCircle.setAttribute('class', 'node-glow');
      group.appendChild(glowCircle);

      const coreCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      coreCircle.setAttribute('cx', 0);
      coreCircle.setAttribute('cy', 0);
      coreCircle.setAttribute('r', baseRadius);
      coreCircle.setAttribute('fill', isGenesis ? 'url(#genesisGradient)' : cat.color);
      coreCircle.setAttribute('class', `node-core ${isTurningPoint ? 'node-turning-point' : ''}`);
      group.appendChild(coreCircle);

      const connCount = mem.connectedTo ? mem.connectedTo.length : 0;
      if (connCount > 0 && !isGenesis) {
        const badgeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        badgeText.setAttribute('x', 0);
        badgeText.setAttribute('y', 3.5);
        badgeText.setAttribute('text-anchor', 'middle');
        badgeText.setAttribute('font-size', '9px');
        badgeText.setAttribute('font-weight', 'bold');
        badgeText.setAttribute('fill', '#ffffff');
        badgeText.setAttribute('pointer-events', 'none');
        badgeText.textContent = connCount;
        group.appendChild(badgeText);
      }

      group.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        State.map.draggedNode = mem.id;
        State.map.hasDraggedNode = false;
      });

      group.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!State.map.hasDraggedNode) selectNode(mem.id);
      });

      group.addEventListener('mouseenter', (e) => {
        showMapTooltip(e, mem);
        highlightNodeConnections(mem.id);
      });

      group.addEventListener('mouseleave', () => {
        hideMapTooltip();
        if (!State.selectedMemoryId) clearNodeHighlights();
      });

      nodesLayer.appendChild(group);

      if (State.map.showLabels && isVisible) {
        const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        labelGroup.setAttribute('transform', `translate(${coord.x}, ${coord.y + baseRadius + 14})`);

        const mainText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        mainText.setAttribute('class', 'node-label');
        mainText.textContent = truncateString(mem.title, 22);

        const subText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        subText.setAttribute('class', 'node-label-sub');
        subText.setAttribute('y', 12);
        subText.textContent = formatDateShort(mem.date);

        labelGroup.appendChild(mainText);
        labelGroup.appendChild(subText);
        labelsLayer.appendChild(labelGroup);
      }
    });
  }

  function highlightNodeConnections(nodeId) {
    document.querySelectorAll('.map-link').forEach(link => {
      const s = link.getAttribute('data-source');
      const t = link.getAttribute('data-target');
      if (s === nodeId || t === nodeId) {
        link.classList.add('highlighted');
        link.classList.remove('dimmed');
      } else {
        link.classList.add('dimmed');
        link.classList.remove('highlighted');
      }
    });
  }

  function clearNodeHighlights() {
    document.querySelectorAll('.map-link').forEach(link => {
      link.classList.remove('highlighted');
      link.classList.remove('dimmed');
    });
  }

  function selectNode(nodeId) {
    State.selectedMemoryId = nodeId;
    renderMap();
    openMemoryDetails(nodeId);
    focusCameraOnNode(nodeId);
  }

  function focusCameraOnNode(nodeId) {
    const mem = State.memories.find(m => m.id === nodeId);
    if (!mem) return;
    const viewport = document.getElementById('mapViewport');
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();

    const targetPanX = rect.width / 2 - (mem.x || 0) * State.map.scale;
    const targetPanY = rect.height / 2 - (mem.y || 0) * State.map.scale;
    animateCameraPan(targetPanX, targetPanY, 350);
  }

  function animateCameraPan(targetX, targetY, duration) {
    const startX = State.map.panX;
    const startY = State.map.panY;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      State.map.panX = startX + (targetX - startX) * ease;
      State.map.panY = startY + (targetY - startY) * ease;
      applyMapTransform();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function showMapTooltip(e, mem) {
    const tooltip = document.getElementById('mapTooltip');
    if (!tooltip) return;
    const cat = CATEGORY_META[mem.category] || { label: mem.category, color: '#3b82f6' };
    const connCount = mem.connectedTo ? mem.connectedTo.length : 0;

    tooltip.innerHTML = `
      <div style="font-weight: 700; margin-bottom: 2px; color: #fff;">${escapeHtml(mem.title)}</div>
      <div style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 4px;">${formatDate(mem.date)} &bull; <span style="color: ${cat.color}">${escapeHtml(cat.label)}</span></div>
      ${mem.lesson ? `<div style="font-size: 0.76rem; color: #cbd5e1; font-style: italic;">"${escapeHtml(truncateString(mem.lesson, 60))}"</div>` : ''}
      <div style="font-size: 0.72rem; color: var(--accent-cyan); margin-top: 4px;">${connCount} Connected Milestone${connCount === 1 ? '' : 's'}</div>
    `;

    const viewport = document.getElementById('mapViewport');
    const rect = viewport.getBoundingClientRect();
    tooltip.style.left = `${e.clientX - rect.left}px`;
    tooltip.style.top = `${e.clientY - rect.top}px`;
    tooltip.style.display = 'block';
  }

  function hideMapTooltip() {
    document.getElementById('mapTooltip')?.style.setProperty('display', 'none');
  }

  function initStarryCanvas() {
    const canvas = document.getElementById('starryCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    window.addEventListener('resize', () => {
      if (canvas.offsetWidth && canvas.offsetHeight) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    });

    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.3 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.02 + 0.005
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 0.9 || s.alpha < 0.2) s.speed = -s.speed;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, s.alpha)})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  function exportMapAsImage() {
    const svg = document.getElementById('lifeMapSvg');
    if (!svg) return;
    try {
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svg);
      if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      const img = new Image();
      const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = svg.clientWidth || 1200;
        canvas.height = svg.clientHeight || 800;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#080c16';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        URL.revokeObjectURL(url);
        const a = document.createElement('a');
        a.download = `student-constellation-${new Date().toISOString().split('T')[0]}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
        showToast('Student constellation exported as PNG!', 'success');
      };
      img.src = url;
    } catch (e) {
      showToast('Could not export SVG.', 'error');
    }
  }

  // ==========================================
  // 12. MEMORY DETAILS DRAWER & CRUD
  // ==========================================

  function openMemoryDetails(nodeId) {
    const mem = State.memories.find(m => m.id === nodeId);
    if (!mem) return;
    State.selectedMemoryId = nodeId;
    const drawer = document.getElementById('memoryDetailsDrawer');
    if (!drawer) return;

    const cat = CATEGORY_META[mem.category] || { label: mem.category, color: '#3b82f6' };
    const catBadge = document.getElementById('drawerCategoryBadge');
    catBadge.textContent = cat.label;
    catBadge.style.backgroundColor = `${cat.color}25`;
    catBadge.style.color = cat.color;

    const starsEl = document.getElementById('drawerImportanceStars');
    const starsCount = mem.importance || 3;
    starsEl.textContent = '★'.repeat(starsCount) + '☆'.repeat(5 - starsCount);

    document.getElementById('drawerTitle').textContent = mem.title;
    document.getElementById('drawerDate').textContent = formatDate(mem.date);

    const emoBadge = document.getElementById('drawerEmotionBadge');
    if (mem.emotion) {
      emoBadge.textContent = mem.emotion;
      emoBadge.classList.remove('hidden');
    } else {
      emoBadge.classList.add('hidden');
    }

    document.getElementById('drawerDescription').textContent = mem.description;

    const lessonBox = document.getElementById('drawerLessonContainer');
    const lessonEl = document.getElementById('drawerLesson');
    if (mem.lesson && mem.lesson.trim().length > 0) {
      lessonEl.textContent = `"${mem.lesson}"`;
      lessonBox.classList.remove('hidden');
    } else {
      lessonBox.classList.add('hidden');
    }

    const tagsBox = document.getElementById('drawerTagsContainer');
    const tagsList = document.getElementById('drawerTagsList');
    if (mem.tags && mem.tags.length > 0) {
      tagsList.innerHTML = mem.tags.map(t => `<span class="tag-chip">#${escapeHtml(t)}</span>`).join('');
      tagsBox.classList.remove('hidden');
    } else {
      tagsBox.classList.add('hidden');
    }

    const imgContainer = document.getElementById('drawerImageContainer');
    const imgEl = document.getElementById('drawerImage');
    if (mem.image) {
      imgEl.src = mem.image;
      imgContainer.classList.remove('hidden');
    } else {
      imgContainer.classList.add('hidden');
    }

    // Connected Milestones List
    const connList = document.getElementById('drawerConnectionsList');
    const connBadge = document.getElementById('drawerConnectionCount');
    const connectedIds = Array.isArray(mem.connectedTo) ? mem.connectedTo : [];
    const reverse = State.memories.filter(m => Array.isArray(m.connectedTo) && m.connectedTo.includes(mem.id));
    const allLinkedIds = Array.from(new Set([...connectedIds, ...reverse.map(m => m.id)]));
    connBadge.textContent = allLinkedIds.length;

    if (allLinkedIds.length === 0) {
      connList.innerHTML = `<p style="font-size: 0.8rem; color: var(--text-muted);">No linked milestones. Edit to connect related achievements.</p>`;
    } else {
      connList.innerHTML = allLinkedIds.map(linkId => {
        const linked = State.memories.find(m => m.id === linkId);
        if (!linked) return '';
        const linkedCat = CATEGORY_META[linked.category] || { color: '#3b82f6', label: linked.category };
        return `
          <div class="connected-moment-card" onclick="window.LifeMapApp.openMemoryDetails('${linked.id}')">
            <div>
              <div style="font-weight: 600; font-size: 0.85rem;">${escapeHtml(linked.title)}</div>
              <div style="font-size: 0.74rem; color: var(--text-muted);">${formatDateShort(linked.date)} &bull; <span style="color: ${linkedCat.color}">${escapeHtml(linkedCat.label)}</span></div>
            </div>
          </div>
        `;
      }).join('');
    }

    document.getElementById('drawerCenterMapBtn').onclick = () => {
      switchView('map');
      focusCameraOnNode(mem.id);
    };
    document.getElementById('drawerEditBtn').onclick = () => openEditMemoryModal(mem.id);
    document.getElementById('drawerDeleteBtn').onclick = () => confirmDeleteMemory(mem.id);

    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeMemoryDetails() {
    const drawer = document.getElementById('memoryDetailsDrawer');
    if (drawer) {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    }
    State.selectedMemoryId = null;
    clearNodeHighlights();
  }

  function openAddMemoryModal() {
    const modal = document.getElementById('memoryModal');
    const form = document.getElementById('memoryForm');
    if (!modal || !form) return;
    form.reset();
    document.getElementById('formMemoryId').value = '';
    document.getElementById('modalMemoryTitle').textContent = 'Record Student Milestone';
    document.getElementById('formImportance').value = '3';
    updateStarRatingDisplay(3);
    document.getElementById('formImageBase64').value = '';
    document.getElementById('formImagePreviewBox').classList.add('hidden');
    document.getElementById('formDate').value = new Date().toISOString().split('T')[0];
    populateConnectionsPicker();

    modal.classList.add('active');
  }

  function openEditMemoryModal(memoryId) {
    const mem = State.memories.find(m => m.id === memoryId);
    if (!mem) return;
    const modal = document.getElementById('memoryModal');
    if (!modal) return;

    document.getElementById('formMemoryId').value = mem.id;
    document.getElementById('modalMemoryTitle').textContent = 'Edit Milestone';
    document.getElementById('formTitle').value = mem.title;
    document.getElementById('formDate').value = mem.date;
    document.getElementById('formCategory').value = mem.category;
    document.getElementById('formEmotion').value = mem.emotion || 'Unshakable Focus';
    document.getElementById('formEra').value = mem.era || 'academic';
    document.getElementById('formImportance').value = mem.importance || 3;
    updateStarRatingDisplay(mem.importance || 3);
    document.getElementById('formDescription').value = mem.description;
    document.getElementById('formLesson').value = mem.lesson || '';
    document.getElementById('formTags').value = mem.tags ? mem.tags.join(', ') : '';

    if (mem.image) {
      document.getElementById('formImageBase64').value = mem.image;
      document.getElementById('formImagePreview').src = mem.image;
      document.getElementById('formImagePreviewBox').classList.remove('hidden');
    } else {
      document.getElementById('formImageBase64').value = '';
      document.getElementById('formImagePreviewBox').classList.add('hidden');
    }

    populateConnectionsPicker(mem.id, mem.connectedTo || []);
    modal.classList.add('active');
  }

  function closeMemoryModal() {
    document.getElementById('memoryModal')?.classList.remove('active');
  }

  function populateConnectionsPicker(excludeId = null, selectedIds = []) {
    const box = document.getElementById('formConnectionsPicker');
    if (!box) return;
    const available = State.memories.filter(m => m.id !== excludeId);
    if (available.length === 0) {
      box.innerHTML = `<span style="font-size: 0.8rem; color: var(--text-muted);">No other milestones to link yet.</span>`;
      return;
    }

    box.innerHTML = available.map(m => `
      <label class="connection-option">
        <input type="checkbox" name="connectionOption" value="${m.id}" ${selectedIds.includes(m.id) ? 'checked' : ''}>
        <span>${escapeHtml(m.title)} (${formatDateShort(m.date)})</span>
      </label>
    `).join('');
  }

  function updateStarRatingDisplay(rating) {
    const container = document.getElementById('starRatingPicker');
    const label = document.getElementById('starRatingLabel');
    if (!container || !label) return;

    const labels = {
      1: 'Subtle Win (1/5)',
      2: 'Meaningful Step (2/5)',
      3: 'Significant Milestone (3/5)',
      4: 'Major Breakthrough (4/5)',
      5: 'Landmark Personal Record (5/5)'
    };

    container.querySelectorAll('.star-btn').forEach(btn => {
      const r = parseInt(btn.dataset.rating, 10);
      btn.classList.toggle('active', r <= rating);
    });
    label.textContent = labels[rating] || `${rating}/5`;
  }

  function setupFormValidationAndHandlers() {
    document.getElementById('starRatingPicker')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.star-btn');
      if (!btn) return;
      const r = parseInt(btn.dataset.rating, 10);
      document.getElementById('formImportance').value = r;
      updateStarRatingDisplay(r);
    });

    const imageInput = document.getElementById('formImageInput');
    imageInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (event) {
        compressImageBase64(event.target.result, 600, 0.7, (compressed) => {
          document.getElementById('formImageBase64').value = compressed;
          document.getElementById('formImagePreview').src = compressed;
          document.getElementById('formImagePreviewBox').classList.remove('hidden');
        });
      };
      reader.readAsDataURL(file);
    });

    document.getElementById('removeImageBtn')?.addEventListener('click', () => {
      document.getElementById('formImageBase64').value = '';
      document.getElementById('formImagePreviewBox').classList.add('hidden');
    });

    document.getElementById('memoryForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      saveMemoryFormData();
    });

    document.getElementById('closeMemoryModalBtn')?.addEventListener('click', closeMemoryModal);
    document.getElementById('cancelMemoryModalBtn')?.addEventListener('click', closeMemoryModal);
  }

  function compressImageBase64(dataUrl, maxDimension, quality, callback) {
    const img = new Image();
    img.onload = function () {
      let width = img.width, height = img.height;
      if (width > height && width > maxDimension) {
        height = Math.round((height * maxDimension) / width);
        width = maxDimension;
      } else if (height > maxDimension) {
        width = Math.round((width * maxDimension) / height);
        height = maxDimension;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = dataUrl;
  }

  function saveMemoryFormData() {
    const title = document.getElementById('formTitle').value.trim();
    const date = document.getElementById('formDate').value;
    const category = document.getElementById('formCategory').value;
    const emotion = document.getElementById('formEmotion').value;
    const era = document.getElementById('formEra').value;
    const importance = parseInt(document.getElementById('formImportance').value, 10) || 3;
    const description = document.getElementById('formDescription').value.trim();
    const lesson = document.getElementById('formLesson').value.trim();
    const tagsRaw = document.getElementById('formTags').value.trim();
    const image = document.getElementById('formImageBase64').value;
    const existingId = document.getElementById('formMemoryId').value;

    if (!title || !date || !description) {
      showToast('Please fill in title, date, and description.', 'error');
      return;
    }

    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim().toLowerCase()).filter(t => t.length > 0) : [];
    const connectedTo = [];
    document.querySelectorAll('input[name="connectionOption"]:checked').forEach(cb => {
      connectedTo.push(cb.value);
    });

    if (existingId) {
      const idx = State.memories.findIndex(m => m.id === existingId);
      if (idx !== -1) {
        State.memories[idx] = {
          ...State.memories[idx],
          title, date, category, emotion, era, importance, description, lesson, tags, connectedTo, image: image || null
        };
        showToast(`Milestone "${title}" updated.`, 'success');
      }
    } else {
      let spawnX = (Math.random() - 0.5) * 300;
      let spawnY = (Math.random() - 0.5) * 300;
      if (connectedTo.length > 0) {
        const parent = State.memories.find(m => m.id === connectedTo[0]);
        if (parent) {
          spawnX = (parent.x || 0) + (Math.random() - 0.5) * 160;
          spawnY = (parent.y || 0) + (Math.random() - 0.5) * 160;
        }
      }

      State.memories.push({
        id: `mem_${Date.now()}`,
        title, date, category, emotion, era, importance, description, lesson, tags, connectedTo, image: image || null,
        x: Math.round(spawnX),
        y: Math.round(spawnY),
        createdAt: new Date().toISOString()
      });
      showToast(`Logged milestone "${title}" to your constellation!`, 'success');
    }

    saveAllData();
    closeMemoryModal();
    if (State.activeView === 'map') renderMap();
    if (State.activeView === 'timeline') renderTimeline();
    if (State.activeView === 'dashboard') renderDashboard();
    if (State.activeView === 'insights') renderInsights();
  }

  function confirmDeleteMemory(nodeId) {
    const mem = State.memories.find(m => m.id === nodeId);
    if (!mem) return;
    showConfirmModal(
      'Remove Milestone Node?',
      `Are you sure you want to remove "${mem.title}"?`,
      () => {
        State.memories = State.memories.filter(m => m.id !== nodeId);
        State.memories.forEach(m => {
          if (Array.isArray(m.connectedTo)) {
            m.connectedTo = m.connectedTo.filter(id => id !== nodeId);
          }
        });
        saveAllData();
        closeMemoryDetails();
        showToast('Milestone erased.', 'info');
        if (State.activeView === 'map') renderMap();
        if (State.activeView === 'timeline') renderTimeline();
        if (State.activeView === 'dashboard') renderDashboard();
      }
    );
  }

  // ==========================================
  // 13. CHRONOLOGICAL TIMELINE CONTROLLER
  // ==========================================

  function renderTimeline() {
    const track = document.getElementById('timelineTrack');
    if (!track) return;

    let filtered = [...State.memories];
    const catFilter = document.getElementById('timelineCategoryFilter')?.value || 'all';
    if (catFilter !== 'all') {
      filtered = filtered.filter(m => m.category === catFilter);
    }

    const query = document.getElementById('timelineSearchInput')?.value.toLowerCase().trim();
    if (query) {
      filtered = filtered.filter(m => (
        m.title.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        (m.tags && m.tags.some(t => t.toLowerCase().includes(query)))
      ));
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date), dateB = new Date(b.date);
      return State.timeline.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    if (filtered.length === 0) {
      track.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 40px;">No milestones match your timeline filter.</p>`;
      return;
    }

    const yearGroups = new Map();
    filtered.forEach(m => {
      const yr = new Date(m.date).getFullYear() || 'Academic Milestone';
      if (!yearGroups.has(yr)) yearGroups.set(yr, []);
      yearGroups.get(yr).push(m);
    });

    let html = '';
    yearGroups.forEach((mems, year) => {
      html += `<div class="timeline-year-marker"><span class="timeline-year-badge">${year}</span></div>`;
      mems.forEach(mem => {
        const cat = CATEGORY_META[mem.category] || { label: mem.category, color: '#3b82f6' };
        html += `
          <div class="timeline-entry" onclick="window.LifeMapApp.openMemoryDetails('${mem.id}')">
            <div class="timeline-entry-node" style="border-color: ${cat.color}; box-shadow: 0 0 10px ${cat.color};"></div>
            <div class="timeline-card">
              <div class="timeline-card-header">
                <span class="category-badge" style="background: ${cat.color}25; color: ${cat.color};">${escapeHtml(cat.label)}</span>
                <span class="timeline-date">${formatDate(mem.date)}</span>
              </div>
              <h3 class="timeline-title">${escapeHtml(mem.title)}</h3>
              <p class="timeline-desc">${escapeHtml(mem.description)}</p>
              ${mem.lesson ? `
                <div class="student-health-tip" style="margin-bottom: 10px;">
                  💡 <strong>Study Habit:</strong> "${escapeHtml(mem.lesson)}"
                </div>
              ` : ''}
              <div class="timeline-footer">
                <span style="color: var(--accent-amber);">${'★'.repeat(mem.importance || 3)}</span>
                <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); window.LifeMapApp.jumpToNodeOnMap('${mem.id}')">
                  Focus on Map &rarr;
                </button>
              </div>
            </div>
          </div>
        `;
      });
    });

    track.innerHTML = html;
  }

  function setupTimelineListeners() {
    document.getElementById('timelineSortBtn')?.addEventListener('click', () => {
      State.timeline.sortOrder = State.timeline.sortOrder === 'asc' ? 'desc' : 'asc';
      document.getElementById('timelineSortLabel').textContent = State.timeline.sortOrder === 'asc' ? 'Oldest First' : 'Newest First';
      renderTimeline();
    });
    document.getElementById('timelineCategoryFilter')?.addEventListener('change', renderTimeline);
    document.getElementById('timelineSearchInput')?.addEventListener('input', renderTimeline);
  }

  // ==========================================
  // 14. GOALS & AMBITIONS CONTROLLER
  // ==========================================

  function renderGoals() {
    const grid = document.getElementById('goalsGrid');
    if (!grid) return;

    const inProgress = State.goals.filter(g => g.status === 'in_progress').length;
    const notStarted = State.goals.filter(g => g.status === 'not_started').length;
    const completed = State.goals.filter(g => g.status === 'completed' || g.progress === 100).length;

    document.getElementById('goalCountInProgress').textContent = inProgress;
    document.getElementById('goalCountNotStarted').textContent = notStarted;
    document.getElementById('goalCountCompleted').textContent = completed;

    if (State.goals.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 40px;">No educational goals defined yet.</p>`;
      return;
    }

    grid.innerHTML = State.goals.map(goal => {
      const isCompleted = goal.status === 'completed' || goal.progress >= 100;
      const statusLabels = { not_started: 'Not Started', in_progress: 'In Progress', completed: 'Accomplished 🏆' };

      const milestonesHtml = (goal.milestones || []).map(ms => `
        <label class="goal-milestone-item">
          <input type="checkbox" ${ms.completed ? 'checked' : ''} onchange="window.LifeMapApp.toggleGoalMilestone('${goal.id}', '${ms.id}')">
          <span style="${ms.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${escapeHtml(ms.text)}</span>
        </label>
      `).join('');

      return `
        <div class="goal-card ${isCompleted ? 'completed' : ''}">
          <div class="goal-card-header">
            <span class="goal-badge-status status-${goal.status}">${statusLabels[goal.status] || goal.status}</span>
            <span style="font-size: 0.78rem; color: var(--text-muted);">Target: ${formatDate(goal.targetDate)}</span>
          </div>
          <h3 class="goal-title">${escapeHtml(goal.title)}</h3>
          <p class="goal-desc">${escapeHtml(goal.description)}</p>

          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.76rem; margin-bottom: 4px;">
              <span>Progress</span>
              <strong style="color: var(--accent-cyan);">${goal.progress}%</strong>
            </div>
            <div class="course-progress-track">
              <div class="course-progress-fill" style="width: ${goal.progress}%;"></div>
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="font-size: 0.76rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Milestone Steps</div>
            ${milestonesHtml || '<span style="font-size: 0.78rem; color: var(--text-muted);">No steps added.</span>'}
          </div>

          <div style="display: flex; gap: 8px; margin-top: auto;">
            <button class="btn btn-outline btn-sm" onclick="window.LifeMapApp.openEditGoalModal('${goal.id}')">Edit</button>
            <button class="btn btn-danger-outline btn-sm" onclick="window.LifeMapApp.deleteGoal('${goal.id}')">Remove</button>
          </div>
        </div>
      `;
    }).join('');
  }

  function toggleGoalMilestone(goalId, milestoneId) {
    const goal = State.goals.find(g => g.id === goalId);
    if (!goal || !goal.milestones) return;
    const ms = goal.milestones.find(m => m.id === milestoneId);
    if (!ms) return;

    ms.completed = !ms.completed;
    const total = goal.milestones.length;
    const completedCount = goal.milestones.filter(m => m.completed).length;
    goal.progress = Math.round((completedCount / total) * 100);

    if (goal.progress >= 100) {
      goal.status = 'completed';
      celebrateGoalCompletion(goal);
    } else if (goal.progress > 0) {
      goal.status = 'in_progress';
    }

    saveAllData();
    renderGoals();
    renderDashboard();
  }

  function celebrateGoalCompletion(goal) {
    showToast(`🎉 Goal Accomplished: "${goal.title}"!`, 'success');
    showConfirmModal(
      'Transform into Landmark Achievement?',
      `"${goal.title}" is 100% completed! Would you like to map this as a permanent Achievement Node on your Student Constellation?`,
      () => {
        State.memories.push({
          id: `mem_achieve_${Date.now()}`,
          title: `Accomplished: ${goal.title}`,
          date: new Date().toISOString().split('T')[0],
          category: 'records',
          emotion: 'Pride & Mastery',
          importance: 5,
          era: 'academic',
          description: `Goal fully realized: ${goal.description}`,
          lesson: 'Disciplined milestone execution turns long-term ambition into reality.',
          tags: ['goal-achieved', 'record', 'victory'],
          connectedTo: ['mem_genesis'],
          x: Math.round((Math.random() - 0.5) * 360),
          y: Math.round((Math.random() - 0.5) * 360),
          createdAt: new Date().toISOString()
        });
        saveAllData();
        showToast('Achievement node added to student constellation!', 'success');
        if (State.activeView === 'map') renderMap();
      }
    );
  }

  let currentMilestonesBuffer = [];

  function openAddGoalModal() {
    const modal = document.getElementById('goalModal');
    const form = document.getElementById('goalForm');
    if (!modal || !form) return;
    form.reset();
    document.getElementById('formGoalId').value = '';
    document.getElementById('modalGoalTitle').textContent = 'Define Educational Ambition';
    document.getElementById('formGoalProgress').value = 0;
    document.getElementById('goalProgressValueLabel').textContent = '0%';
    document.getElementById('formGoalDate').value = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    currentMilestonesBuffer = [];
    renderMilestonesInputList();
    modal.classList.add('active');
  }

  function openEditGoalModal(goalId) {
    const goal = State.goals.find(g => g.id === goalId);
    if (!goal) return;
    const modal = document.getElementById('goalModal');
    if (!modal) return;

    document.getElementById('formGoalId').value = goal.id;
    document.getElementById('modalGoalTitle').textContent = 'Edit Ambition';
    document.getElementById('formGoalTitle').value = goal.title;
    document.getElementById('formGoalDate').value = goal.targetDate;
    document.getElementById('formGoalCategory').value = goal.category;
    document.getElementById('formGoalDesc').value = goal.description;
    document.getElementById('formGoalProgress').value = goal.progress;
    document.getElementById('goalProgressValueLabel').textContent = `${goal.progress}%`;
    document.getElementById('formGoalStatus').value = goal.status;
    currentMilestonesBuffer = goal.milestones ? JSON.parse(JSON.stringify(goal.milestones)) : [];
    renderMilestonesInputList();
    modal.classList.add('active');
  }

  function closeGoalModal() {
    document.getElementById('goalModal')?.classList.remove('active');
  }

  function renderMilestonesInputList() {
    const container = document.getElementById('goalMilestonesList');
    if (!container) return;
    container.innerHTML = currentMilestonesBuffer.map((ms, index) => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 4px 8px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); margin-bottom: 4px;">
        <span style="font-size: 0.82rem;">${escapeHtml(ms.text)}</span>
        <button type="button" onclick="window.LifeMapApp.removeMilestoneStep(${index})" style="color: var(--accent-rose); font-size: 1.1rem;">&times;</button>
      </div>
    `).join('');
  }

  function setupGoalFormListeners() {
    document.getElementById('addGoalBtn')?.addEventListener('click', openAddGoalModal);
    document.getElementById('closeGoalModalBtn')?.addEventListener('click', closeGoalModal);
    document.getElementById('cancelGoalModalBtn')?.addEventListener('click', closeGoalModal);

    document.getElementById('formGoalProgress')?.addEventListener('input', (e) => {
      document.getElementById('goalProgressValueLabel').textContent = `${e.target.value}%`;
      const statusSelect = document.getElementById('formGoalStatus');
      if (parseInt(e.target.value, 10) === 100) statusSelect.value = 'completed';
      else if (parseInt(e.target.value, 10) > 0) statusSelect.value = 'in_progress';
      else statusSelect.value = 'not_started';
    });

    document.getElementById('addMilestoneBtn')?.addEventListener('click', () => {
      const input = document.getElementById('newMilestoneInput');
      const text = input.value.trim();
      if (!text) return;
      currentMilestonesBuffer.push({ id: `ms_${Date.now()}`, text, completed: false });
      input.value = '';
      renderMilestonesInputList();
    });

    document.getElementById('goalForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('formGoalTitle').value.trim();
      const targetDate = document.getElementById('formGoalDate').value;
      const category = document.getElementById('formGoalCategory').value;
      const description = document.getElementById('formGoalDesc').value.trim();
      const progress = parseInt(document.getElementById('formGoalProgress').value, 10) || 0;
      const status = document.getElementById('formGoalStatus').value;
      const goalId = document.getElementById('formGoalId').value;

      if (!title || !targetDate || !description) return;

      if (goalId) {
        const idx = State.goals.findIndex(g => g.id === goalId);
        if (idx !== -1) {
          State.goals[idx] = { ...State.goals[idx], title, targetDate, category, description, progress, status, milestones: currentMilestonesBuffer };
        }
      } else {
        State.goals.push({
          id: `goal_${Date.now()}`,
          title, targetDate, category, description, progress, status,
          milestones: currentMilestonesBuffer,
          createdAt: new Date().toISOString()
        });
      }

      saveAllData();
      closeGoalModal();
      renderGoals();
      renderDashboard();
    });
  }

  function deleteGoal(goalId) {
    showConfirmModal(
      'Remove Goal?',
      'Are you sure you want to remove this educational goal?',
      () => {
        State.goals = State.goals.filter(g => g.id !== goalId);
        saveAllData();
        renderGoals();
        renderDashboard();
        showToast('Goal removed.', 'info');
      }
    );
  }

  // ==========================================
  // 15. PERFORMANCE & HABIT ANALYTICS
  // ==========================================

  function renderInsights() {
    renderCategoryDonutChart();
    renderYearlyBarChart();
    renderEmotionSpectrum();
    renderTurningPointsList();
    renderLifeNarrativeReflection();
  }

  function renderCategoryDonutChart() {
    const svg = document.getElementById('categoryDonutChart');
    const legend = document.getElementById('categoryLegend');
    if (!svg || !legend) return;
    svg.innerHTML = '';
    legend.innerHTML = '';

    const counts = {};
    State.memories.forEach(m => counts[m.category] = (counts[m.category] || 0) + 1);
    const total = State.memories.length;
    if (total === 0) return;

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const cx = 130, cy = 130, r = 85, innerR = 55;
    let currentAngle = -Math.PI / 2;

    sorted.forEach(([catKey, count]) => {
      const cat = CATEGORY_META[catKey] || { label: catKey, color: '#3b82f6' };
      const percent = count / total;
      const angle = percent * Math.PI * 2;
      const endAngle = currentAngle + angle;

      const x1 = cx + r * Math.cos(currentAngle);
      const y1 = cy + r * Math.sin(currentAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);

      const ix1 = cx + innerR * Math.cos(endAngle);
      const iy1 = cy + innerR * Math.sin(endAngle);
      const ix2 = cx + innerR * Math.cos(currentAngle);
      const iy2 = cy + innerR * Math.sin(currentAngle);

      const largeArc = angle > Math.PI ? 1 : 0;
      const pathData = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2} Z`;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', cat.color);
      path.setAttribute('stroke', '#0d1527');
      path.setAttribute('stroke-width', '2');
      svg.appendChild(path);

      currentAngle = endAngle;

      const leg = document.createElement('div');
      leg.className = 'legend-item';
      leg.innerHTML = `
        <span class="legend-dot" style="background: ${cat.color};"></span>
        <span>${escapeHtml(cat.label)}</span>
        <span style="margin-left: auto; color: var(--text-muted);">${Math.round(percent * 100)}%</span>
      `;
      legend.appendChild(leg);
    });

    const centerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    centerText.setAttribute('x', cx);
    centerText.setAttribute('y', cy + 6);
    centerText.setAttribute('text-anchor', 'middle');
    centerText.setAttribute('fill', '#ffffff');
    centerText.setAttribute('font-size', '20px');
    centerText.setAttribute('font-weight', 'bold');
    centerText.textContent = total;
    svg.appendChild(centerText);
  }

  function renderYearlyBarChart() {
    const svg = document.getElementById('yearlyBarChart');
    if (!svg) return;
    svg.innerHTML = '';
    if (State.memories.length === 0) return;

    const counts = {};
    State.memories.forEach(m => {
      const yr = new Date(m.date).getFullYear() || 2024;
      counts[yr] = (counts[yr] || 0) + 1;
    });

    const years = Object.keys(counts).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    const maxVal = Math.max(...Object.values(counts), 1);
    const width = 380, height = 200, paddingBottom = 30, paddingTop = 20, paddingLeft = 30, paddingRight = 10;
    const chartHeight = height - paddingBottom - paddingTop;
    const chartWidth = width - paddingLeft - paddingRight;
    const barWidth = Math.min(32, Math.floor(chartWidth / years.length) - 8);

    years.forEach((yr, idx) => {
      const val = counts[yr];
      const barH = (val / maxVal) * chartHeight;
      const x = paddingLeft + idx * (chartWidth / years.length) + (chartWidth / years.length - barWidth) / 2;
      const y = height - paddingBottom - barH;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', barWidth);
      rect.setAttribute('height', barH);
      rect.setAttribute('rx', 4);
      rect.setAttribute('fill', 'url(#pathGradient)');
      svg.appendChild(rect);

      const yrLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      yrLabel.setAttribute('x', x + barWidth / 2);
      yrLabel.setAttribute('y', height - 10);
      yrLabel.setAttribute('text-anchor', 'middle');
      yrLabel.setAttribute('fill', '#94a3b8');
      yrLabel.setAttribute('font-size', '10px');
      yrLabel.textContent = yr;
      svg.appendChild(yrLabel);
    });
  }

  function renderEmotionSpectrum() {
    const container = document.getElementById('emotionSpectrumBars');
    if (!container) return;

    const counts = {};
    State.memories.forEach(m => {
      if (m.emotion) counts[m.emotion] = (counts[m.emotion] || 0) + 1;
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    if (total === 0) return;

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const palette = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'];

    container.innerHTML = sorted.map(([emo, count], idx) => {
      const percent = Math.round((count / total) * 100);
      const color = palette[idx % palette.length];
      return `
        <div class="emotion-bar-row">
          <div class="emotion-bar-labels">
            <span>${escapeHtml(emo)}</span>
            <strong style="color: ${color};">${percent}% (${count})</strong>
          </div>
          <div class="emotion-bar-track">
            <div class="emotion-bar-fill" style="width: ${percent}%; background: ${color};"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderTurningPointsList() {
    const container = document.getElementById('turningPointsList');
    if (!container) return;
    const records = State.records.slice(0, 4);

    container.innerHTML = records.map(r => `
      <div class="activity-item" style="margin-bottom: 8px;">
        <span style="font-size: 1.2rem;">🏆</span>
        <div class="activity-content">
          <div class="activity-title">${escapeHtml(r.title)}</div>
          <div class="activity-meta">
            <span style="color: var(--accent-amber); font-weight: 700;">${escapeHtml(r.value)}</span>
            <span>&bull;</span>
            <span>${escapeHtml(r.domain)}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderLifeNarrativeReflection() {
    const headline = document.getElementById('reflectionHeadline');
    const body = document.getElementById('reflectionText');
    if (!headline || !body) return;

    const totalHours = Math.round((State.focusSessions.reduce((acc, s) => acc + (s.duration || 25), 0) + 48.5 * 60) / 60);
    headline.textContent = `High Cognitive Flow & Academic Momentum`;
    body.textContent = `Across ${State.memories.length} milestone breakthroughs, ${totalHours} logged study hours, and ${State.records.length} personal records, your pattern reflects relentless discipline. You perform at your highest level when you pair morning cardio with deep Pomodoro sprints and maintain 7.5+ hours of sleep. Keep protecting your energy!`;
  }

  // ==========================================
  // 16. WEB AUDIO STUDY AMBIENCE SYNTHESIS
  // ==========================================

  function toggleAmbientAudio() {
    if (State.audio.isPlaying) stopAmbientAudio();
    else startAmbientAudio();
  }

  function startAmbientAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!State.audio.ctx) State.audio.ctx = new AudioContext();
      if (State.audio.ctx.state === 'suspended') State.audio.ctx.resume();

      stopAmbientNodes();
      createStudySoundscape(State.settings.ambientSound || 'binaural');
      State.audio.isPlaying = true;
      updateAmbientUi(true);
    } catch (e) {
      console.error(e);
    }
  }

  function stopAmbientAudio() {
    stopAmbientNodes();
    State.audio.isPlaying = false;
    updateAmbientUi(false);
  }

  function stopAmbientNodes() {
    if (State.audio.nodes) {
      State.audio.nodes.forEach(n => {
        try {
          if (n.stop) n.stop();
          if (n.disconnect) n.disconnect();
        } catch (e) {}
      });
      State.audio.nodes = [];
    }
  }

  function createStudySoundscape(type) {
    const ctx = State.audio.ctx;
    if (!ctx) return;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
    masterGain.connect(ctx.destination);
    State.audio.nodes.push(masterGain);

    if (type === 'binaural') {
      // 40Hz Gamma wave for active study focus
      const oscL = ctx.createOscillator();
      const oscR = ctx.createOscillator();
      oscL.type = 'sine';
      oscR.type = 'sine';
      oscL.frequency.setValueAtTime(200, ctx.currentTime);
      oscR.frequency.setValueAtTime(240, ctx.currentTime); // 40Hz difference

      oscL.connect(masterGain);
      oscR.connect(masterGain);
      oscL.start();
      oscR.start();
      State.audio.nodes.push(oscL, oscR);
    } else if (type === 'rain') {
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555;
        b1 = 0.99332 * b1 + white * 0.0750;
        b2 = 0.96900 * b2 + white * 0.1538;
        output[i] = (b0 + b1 + b2) * 0.1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, ctx.currentTime);
      noise.connect(filter);
      filter.connect(masterGain);
      noise.start();
      State.audio.nodes.push(noise, filter);
    } else if (type === 'zen') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432 / 2, ctx.currentTime); // 216Hz
      osc.connect(masterGain);
      osc.start();
      State.audio.nodes.push(osc);
    }
  }

  function updateAmbientUi(playing) {
    const btn = document.getElementById('ambientToggleBtn');
    const icon = document.getElementById('ambientPlayIcon');
    if (!btn || !icon) return;
    if (playing) {
      btn.style.background = 'var(--accent-primary)';
      btn.style.color = '#fff';
      icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    } else {
      btn.style.background = 'var(--bg-card)';
      btn.style.color = 'var(--text-primary)';
      icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    }
  }

  function setupAmbientListeners() {
    document.getElementById('ambientToggleBtn')?.addEventListener('click', toggleAmbientAudio);
    document.querySelectorAll('.ambient-sound-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sound = e.target.dataset.sound;
        State.settings.ambientSound = sound;
        document.querySelectorAll('.ambient-sound-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        if (State.audio.isPlaying) startAmbientAudio();
      });
    });
  }

  // ==========================================
  // 17. SETTINGS & BACKUP CONTROLLER
  // ==========================================

  function populateSettingsFields() {
    const nameInput = document.getElementById('settingUserName');
    const tagInput = document.getElementById('settingLifeTagline');
    const gpaInput = document.getElementById('settingTargetGpa');
    const themeSelect = document.getElementById('settingThemeSelect');
    const lineSelect = document.getElementById('settingLineStyle');
    const motionCheckbox = document.getElementById('settingReducedMotion');

    if (nameInput) nameInput.value = State.settings.userName || '';
    if (tagInput) tagInput.value = State.settings.lifeTagline || '';
    if (gpaInput) gpaInput.value = State.settings.targetGpa || '3.90 GPA';
    if (themeSelect) themeSelect.value = State.settings.theme || 'dark';
    if (lineSelect) lineSelect.value = State.settings.lineStyle || 'curved';
    if (motionCheckbox) motionCheckbox.checked = !!State.settings.reducedMotion;

    updateStorageUsageIndicator();
  }

  function setupSettingsListeners() {
    document.getElementById('saveProfileSettingsBtn')?.addEventListener('click', () => {
      State.settings.userName = document.getElementById('settingUserName').value.trim() || 'Student';
      State.settings.lifeTagline = document.getElementById('settingLifeTagline').value.trim() || DEFAULT_SETTINGS.lifeTagline;
      State.settings.targetGpa = document.getElementById('settingTargetGpa').value.trim() || '3.90 GPA';
      saveAllData();
      applySettings();
      showToast('Student profile settings saved.', 'success');
    });

    document.getElementById('settingThemeSelect')?.addEventListener('change', (e) => {
      State.settings.theme = e.target.value;
      applySettings();
      saveAllData();
    });

    document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
      State.settings.theme = State.settings.theme === 'light' ? 'dark' : 'light';
      applySettings();
      saveAllData();
      populateSettingsFields();
    });

    document.getElementById('settingLineStyle')?.addEventListener('change', (e) => {
      State.settings.lineStyle = e.target.value;
      saveAllData();
      if (State.activeView === 'map') renderMap();
    });

    document.getElementById('settingReducedMotion')?.addEventListener('change', (e) => {
      State.settings.reducedMotion = e.target.checked;
      applySettings();
      saveAllData();
    });

    document.getElementById('exportJsonBtn')?.addEventListener('click', exportJsonBackup);
    document.getElementById('importJsonFileInput')?.addEventListener('change', importJsonBackup);
    document.getElementById('exportPrintSummaryBtn')?.addEventListener('click', () => window.print());

    document.getElementById('resetSampleDataBtn')?.addEventListener('click', () => {
      showConfirmModal(
        'Reload Sample Student Data?',
        'This will reset your portal to the fictional high-achieving student dataset.',
        () => {
          State.memories = JSON.parse(JSON.stringify(SAMPLE_MEMORIES));
          State.courses = JSON.parse(JSON.stringify(SAMPLE_COURSES));
          State.records = JSON.parse(JSON.stringify(SAMPLE_RECORDS));
          State.goals = JSON.parse(JSON.stringify(SAMPLE_GOALS));
          State.missions = JSON.parse(JSON.stringify(SAMPLE_MISSIONS));
          saveAllData();
          showToast('Sample student dataset restored.', 'success');
          switchView(State.activeView);
        }
      );
    });

    document.getElementById('clearAllDataBtn')?.addEventListener('click', () => {
      showConfirmModal(
        'Purge All Student Data?',
        'WARNING: This will permanently delete all logged study sessions, grades, and records from this browser profile.',
        () => {
          localStorage.clear();
          State.memories = [];
          State.courses = [];
          State.records = [];
          State.goals = [];
          State.missions = [];
          saveAllData();
          showToast('All local data cleared.', 'info');
          switchView('dashboard');
        }
      );
    });
  }

  function exportJsonBackup() {
    const backup = {
      version: '3.0-student',
      exportedAt: new Date().toISOString(),
      settings: State.settings,
      memories: State.memories,
      courses: State.courses,
      records: State.records,
      goals: State.goals,
      wellness: State.wellness,
      missions: State.missions,
      focusSessions: State.focusSessions
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lifemap-student-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Student portal backup downloaded.', 'success');
  }

  function importJsonBackup(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed.memories)) State.memories = parsed.memories;
        if (Array.isArray(parsed.courses)) State.courses = parsed.courses;
        if (Array.isArray(parsed.records)) State.records = parsed.records;
        if (Array.isArray(parsed.goals)) State.goals = parsed.goals;
        if (parsed.wellness) State.wellness = parsed.wellness;
        if (Array.isArray(parsed.missions)) State.missions = parsed.missions;
        if (Array.isArray(parsed.focusSessions)) State.focusSessions = parsed.focusSessions;
        if (parsed.settings) State.settings = { ...DEFAULT_SETTINGS, ...parsed.settings };

        saveAllData();
        applySettings();
        showToast('Student backup restored successfully!', 'success');
        switchView(State.activeView);
      } catch (err) {
        showToast('Invalid JSON backup file.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  // ==========================================
  // 18. COMMAND PALETTE (CTRL+K)
  // ==========================================

  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openQuickSearchPalette();
      }
      if (e.key === 'Escape') {
        closeMemoryModal();
        closeCourseModal();
        closeRecordModal();
        closeGoalModal();
        closeMemoryDetails();
        closeConfirmModal();
        closeQuickSearchPalette();
        closeBreathingExercise();
      }
    });

    document.getElementById('paletteInput')?.addEventListener('input', (e) => {
      renderPaletteResults(e.target.value.toLowerCase().trim());
    });
  }

  function openQuickSearchPalette() {
    const palette = document.getElementById('quickSearchPalette');
    const input = document.getElementById('paletteInput');
    if (!palette || !input) return;
    palette.classList.remove('hidden');
    input.value = '';
    input.focus();
    renderPaletteResults('');
  }

  function closeQuickSearchPalette() {
    document.getElementById('quickSearchPalette')?.classList.add('hidden');
  }

  function renderPaletteResults(query) {
    const results = document.getElementById('paletteResults');
    if (!results) return;

    if (!query) {
      results.innerHTML = `<div style="padding: 10px 14px; font-size: 0.82rem; color: var(--text-muted);">Search courses, records, milestones, or study habits...</div>`;
      return;
    }

    const matches = [
      ...State.memories.map(m => ({ type: 'Milestone', title: m.title, meta: formatDate(m.date), id: m.id, action: 'milestone' })),
      ...State.courses.map(c => ({ type: 'Course', title: c.name, meta: c.code || 'Course', id: c.id, action: 'course' })),
      ...State.records.map(r => ({ type: 'Record', title: r.title, meta: r.value, id: r.id, action: 'record' }))
    ].filter(item => item.title.toLowerCase().includes(query)).slice(0, 7);

    if (matches.length === 0) {
      results.innerHTML = `<div style="padding: 12px 14px; font-size: 0.84rem; color: var(--text-muted);">No matches for "${escapeHtml(query)}".</div>`;
      return;
    }

    results.innerHTML = matches.map(item => `
      <div class="palette-item" onclick="window.LifeMapApp.onPaletteSelect('${item.action}', '${item.id}')">
        <div>
          <div style="font-weight: 600; font-size: 0.88rem;">${escapeHtml(item.title)}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted);">${item.type} &bull; ${escapeHtml(item.meta)}</div>
        </div>
        <span class="badge-count">Open &rarr;</span>
      </div>
    `).join('');
  }

  // ==========================================
  // 19. TOASTS & CONFIRM DIALOG
  // ==========================================

  let confirmCallback = null;

  function showConfirmModal(title, message, onProceed) {
    const modal = document.getElementById('confirmModal');
    if (!modal) return;
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    confirmCallback = onProceed;
    modal.classList.add('active');
  }

  function closeConfirmModal() {
    document.getElementById('confirmModal')?.classList.remove('active');
    confirmCallback = null;
  }

  function setupConfirmModalListeners() {
    document.getElementById('confirmCancelBtn')?.addEventListener('click', closeConfirmModal);
    document.getElementById('confirmProceedBtn')?.addEventListener('click', () => {
      if (confirmCallback) confirmCallback();
      closeConfirmModal();
    });
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let icon = type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ️');
    toast.innerHTML = `<span style="font-weight: bold; margin-right: 6px;">${icon}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  function formatDate(dStr) {
    if (!dStr) return '';
    try {
      return new Date(dStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return dStr;
    }
  }

  function formatDateShort(dStr) {
    if (!dStr) return '';
    try {
      const d = new Date(dStr);
      return `${d.toLocaleDateString('en-US', { month: 'short' })} ${d.getFullYear()}`;
    } catch (e) {
      return dStr;
    }
  }

  function truncateString(str, num) {
    if (!str || str.length <= num) return str;
    return str.slice(0, num) + '...';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ==========================================
  // 20. BOOTSTRAP INITIALIZATION
  // ==========================================

  function initApp() {
    loadSavedData();
    applySettings();

    initMapEngine();
    setupFormValidationAndHandlers();
    setupPomodoroListeners();
    setupCourseListeners();
    setupWellnessListeners();
    setupRecordListeners();
    setupGoalFormListeners();
    setupTimelineListeners();
    setupSettingsListeners();
    setupAmbientListeners();
    setupConfirmModalListeners();
    setupKeyboardShortcuts();

    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => switchView(e.currentTarget.dataset.view));
    });

    document.getElementById('quickAddMemoryBtn')?.addEventListener('click', openAddMemoryModal);
    document.getElementById('sidebarToggleBtn')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.toggle('collapsed');
    });
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.toggle('mobile-open');
    });
    document.getElementById('globalSearchInput')?.addEventListener('click', openQuickSearchPalette);
    document.getElementById('closeDrawerBtn')?.addEventListener('click', closeMemoryDetails);
    document.getElementById('addDailyMissionBtn')?.addEventListener('click', addDailyMissionPrompt);

    switchView('dashboard');
  }

  // Global API
  window.LifeMapApp = {
    switchView,
    openAddMemoryModal,
    openEditMemoryModal,
    openMemoryDetails,
    closeMemoryDetails,
    jumpToNodeOnMap: (id) => {
      switchView('map');
      selectNode(id);
    },
    toggleDailyMission,
    deleteDailyMission,
    logWaterGlass,
    setWater,
    resetWater,
    saveSleepLog,
    startBreathingExercise,
    addWorkout,
    removeWorkout,
    openEditCourseModal,
    deleteCourse,
    deleteRecord,
    toggleGoalMilestone,
    openAddGoalModal,
    openEditGoalModal,
    deleteGoal,
    removeMilestoneStep: (index) => {
      currentMilestonesBuffer.splice(index, 1);
      renderMilestonesInputList();
    },
    shuffleDailyQuote,
    setFocusSound: (snd) => {
      State.settings.ambientSound = snd;
      startAmbientAudio();
    },
    onPaletteSelect: (type, id) => {
      closeQuickSearchPalette();
      if (type === 'milestone') {
        switchView('map');
        selectNode(id);
      } else if (type === 'course') {
        switchView('academics');
      } else if (type === 'record') {
        switchView('records');
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
