// ============================================================
// Jamie's coursework data — single source of truth.
// Row format: [dueDate|null, course, type, title, countsALot, note, source]
//   source: ""     = confirmed in Canvas
//           "plan" = date taken from the syllabus plan, overriding Canvas
//                    (Canvas lumped K310 onto Oct 4/9; syllabus says weekly —
//                    Jamie chose to trust the syllabus schedule)
//           "pred" = predicted from the syllabus; not yet published in Canvas
//
// RE-SYNC RULES (for future Claude sessions):
//  - Refresh "" rows from Canvas freely.
//  - Do NOT overwrite "plan" rows with Canvas dates without asking Jamie.
//  - When Canvas publishes an item matching a "pred" row, replace the pred
//    row with the real one (source "").
// ============================================================
window.COURSEWORK = {
  updated: "2026-08-25",
  courses: {
    apsy: { label: "Abnormal Psych", full: "Abnormal Psychology" },
    phlt: { label: "Personal Health", full: "Personal Health" },
    self: { label: "Self-Management", full: "Self-Management & Health Promotion" },
    socp: { label: "Social Problems", full: "Social Problems and Policies" }
  },
  order: ["apsy", "self", "socp", "phlt"],
  items: [
    // ───── Week 1 (confirmed in Canvas) ─────
    ["2026-08-25","socp","Discussion","SHARE: Please Introduce Yourself",false,"",""],
    ["2026-08-29","apsy","Assignment","Chapter 1: Key Terms",false,"",""],
    ["2026-08-29","apsy","Discussion","Getting To Know Each Other",false,"",""],
    ["2026-08-30","socp","Quiz","Week 1 Quiz",false,"",""],
    ["2026-08-30","socp","Assignment","Social Problems Project Topic Selection",true,"",""],
    ["2026-08-30","socp","Discussion","Week 1 | Discussion",false,"",""],
    ["2026-08-30","phlt","Discussion","Week 1 Discussion: Health Determinants in Action",false,"",""],
    ["2026-08-30","phlt","Assignment","Week 1 Low-Stakes Quiz - Assessing Your Health",false,"",""],
    ["2026-08-30","phlt","Assignment","Wk1 Personal Wellness Snapshot",false,"",""],
    ["2026-08-30","self","Assignment","8 Dimensions of Wellness Self-Assessment",false,"",""],
    ["2026-08-30","self","Assignment","Occupational Wellness Reflection",false,"",""],
    ["2026-08-30","self","Discussion","Self-Management and Health Promotion Introduction",false,"",""],

    // ───── Week-1 one-time admin actions (from the syllabi, not in Canvas) ─────
    ["2026-08-28","apsy","To-do","Send photo to Dr. Morris by Canvas message",false,"1 extra credit pt — due first Friday","plan"],
    ["2026-08-29","apsy","To-do","Upload a Canvas profile picture",false,"Required for full credit on intro work","plan"],
    ["2026-08-30","apsy","To-do","Buy both textbooks (Kring & Johnson 15e + Oltmanns casebook)",false,"The 2nd book is needed for two Sept discussions","plan"],
    ["2026-08-30","self","To-do","Read the Course & Privacy Policies doc (Syllabus tab)",false,"","plan"],
    ["2026-08-30","socp","To-do","Read the ASA style links",false,"Before the first writing assignment","plan"],

    // ───── P324 Abnormal Psych (Canvas Saturday module closes) ─────
    ["2026-09-05","apsy","Discussion","Chapter 1: DISCUSS Stigma with your peers",false,"",""],
    ["2026-09-12","apsy","Quiz","2021 QUIZ Chapter 1",false,"",""],
    ["2026-09-12","apsy","Quiz","2021 Quiz Chapter 2",false,"",""],
    ["2026-09-12","apsy","Quiz","2021 Quiz Chapter 3",false,"",""],
    ["2026-09-12","apsy","Assignment","Chapter 2: Current Approaches",false,"",""],
    ["2026-09-12","apsy","Discussion","Chapter 2: DISCUSSION What is Normal?",false,"",""],
    ["2026-09-12","apsy","Assignment","Chapter 3 Updated",false,"",""],
    ["2026-09-19","apsy","Discussion","Chapter 4: DISCUSSION how trustworthy is psychological research?",false,"",""],
    ["2026-09-26","apsy","Discussion","Chapter 8: Somatic Symptoms Discussion",false,"",""],
    ["2026-09-26","apsy","Discussion","Chapter 5: Janet Discussion",false,"Casebook needed",""],
    ["2026-10-03","apsy","Quiz","2021 Quiz Chapter 4",false,"",""],
    ["2026-10-03","apsy","Quiz","2021 Quiz Chapter 5",false,"",""],
    ["2026-10-03","apsy","Quiz","2021 Quiz Chapter 6",false,"",""],
    ["2026-10-03","apsy","Assignment","Chapter 4 Research Methods",false,"",""],
    ["2026-10-03","apsy","Assignment","Chapter 5",false,"",""],
    ["2026-10-03","apsy","Assignment","Chapter 6",false,"",""],
    ["2026-10-03","apsy","Discussion","Chapter 6 DISCUSSION: Jocelyn",false,"Casebook needed",""],
    ["2026-10-10","apsy","Assignment","Extra Credit",false,"",""],
    ["2026-10-10","apsy","Discussion","Chapter 7: OCD Discussion",false,"",""],
    ["2026-10-17","apsy","Assignment","Chapter 11-2021",false,"",""],
    ["2026-10-17","apsy","Discussion","Chapter 8: Munchausen By Proxy Discussion",false,"",""],
    ["2026-10-24","apsy","Quiz","2021 Quiz Chapter 7",false,"",""],
    ["2026-10-24","apsy","Quiz","2021 Quiz Chapter 8",false,"",""],
    ["2026-10-24","apsy","Quiz","2021 Quiz Chapter 9",false,"",""],
    ["2026-10-24","apsy","Assignment","Chapter 7",false,"",""],
    ["2026-10-24","apsy","Assignment","Chapter 8",false,"",""],
    ["2026-10-24","apsy","Assignment","Chapter 9 2026",false,"",""],
    ["2026-10-31","apsy","Discussion","Chapter 10: Michael Discussion",false,"",""],
    ["2026-11-07","apsy","Discussion","Chapter 11: Eating Disorder Discussion",false,"",""],
    ["2026-11-14","apsy","Quiz","2021 Quiz Chapter 10",false,"",""],
    ["2026-11-14","apsy","Quiz","2021 Quiz Chapter 11",false,"",""],
    ["2026-11-14","apsy","Quiz","2021 Quiz Chapter 13",false,"",""],
    ["2026-11-14","apsy","Assignment","Chapter 10 Assignment",false,"",""],
    ["2026-11-14","apsy","Assignment","Chapter 13- 2021",false,"",""],
    ["2026-11-14","apsy","Discussion","Chapter 13: DISCUSSION",false,"",""],
    ["2026-11-21","apsy","Discussion","Chapter 14: DISCUSSION",false,"",""],
    ["2026-12-05","apsy","Quiz","2021 Quiz Chapter 14",false,"",""],
    ["2026-12-05","apsy","Quiz","2021 Quiz Chapter 15",false,"",""],
    ["2026-12-05","apsy","Assignment","Chapter 14: Aging Questionnaire",true,"Instructor flagged the date",""],
    ["2026-12-05","apsy","Assignment","Chapter 15-2021",false,"",""],
    ["2026-12-05","apsy","Discussion","Chapter 15: Joe Discussion",false,"",""],

    // ───── K310 Self-Management — syllabus weekly schedule (overrides Canvas) ─────
    ["2026-09-04","self","Discussion","Social Wellness & Love Language Discussion — post",false,"Post due Friday","plan"],
    ["2026-09-06","self","Discussion","Social Wellness & Love Language Discussion — replies",false,"","plan"],
    ["2026-09-06","self","Assignment","Difficult Conversations Reflection",false,"","plan"],
    ["2026-09-13","self","Assignment","Personal Financial Wellness Reflection",true,"50 pts — largest K310 item","plan"],
    ["2026-09-20","self","Assignment","Wellness Journal (5-Day)",false,"Takes 5 days","plan"],
    ["2026-09-20","self","Assignment","Physical Wellness Reflection",false,"","plan"],
    ["2026-09-25","self","Discussion","Emotional Wellness Discussion — post",false,"Post due Friday","plan"],
    ["2026-09-27","self","Discussion","Emotional Wellness Discussion — replies",false,"","plan"],
    ["2026-09-27","self","Assignment","Emotional Wellness Reflection",false,"","plan"],
    ["2026-10-02","self","Discussion","A-Ha Moment on Environment Wellness Discussion — post",false,"Post due Friday","plan"],
    ["2026-10-04","self","Discussion","A-Ha Moment on Environment Wellness Discussion — replies",false,"","plan"],
    ["2026-10-04","self","Assignment","Environmental Self-Care Reflection",false,"","plan"],
    ["2026-10-09","self","Discussion","What Makes a Good Life Discussion — post",false,"Post due Friday","plan"],
    ["2026-10-11","self","Discussion","What Makes a Good Life Discussion — replies",false,"","plan"],
    ["2026-10-11","self","Assignment","Spiritual Wellness Reflection",false,"","plan"],
    ["2026-10-16","self","Assignment","Brain Activities Assignment",false,"Due 8:00 AM, not 11:59 PM","plan"],
    ["2026-10-16","self","Assignment","Letter to Future Self",false,"Due 8:00 AM, not 11:59 PM","plan"],

    // ───── HSCI Personal Health — predicted from syllabus, not yet in Canvas ─────
    ["2026-09-06","phlt","Quiz","Week 2 Quiz — Psychosocial Health",false,"Unconfirmed","pred"],
    ["2026-09-06","phlt","Assignment","Resilience & Protective-Factor Inventory",false,"Unconfirmed","pred"],
    ["2026-09-13","phlt","Quiz","Week 3 Quiz — Managing Stress",false,"Unconfirmed","pred"],
    ["2026-09-13","phlt","Assignment","3-Day Stress Trigger and Coping Log",false,"Takes 3 days · Unconfirmed","pred"],
    ["2026-09-20","phlt","Quiz","Week 4 Quiz — Improving Your Sleep",false,"Unconfirmed","pred"],
    ["2026-09-20","phlt","Assignment","5-Day Sleep Experiment",false,"Takes 5 days · Unconfirmed","pred"],
    ["2026-09-27","phlt","Quiz","Week 5 Quiz — Preventing Violence and Injury",false,"Unconfirmed","pred"],
    ["2026-09-27","phlt","Assignment","Injury-Prevention Case Investigation",false,"Unconfirmed","pred"],
    ["2026-10-04","phlt","Quiz","Week 6 Quiz — Healthy Relationships",false,"Unconfirmed","pred"],
    ["2026-10-04","phlt","Assignment","Relationship Communication Case Analysis",false,"Unconfirmed","pred"],
    ["2026-10-11","phlt","Quiz","Week 7 Quiz — Reproductive Choices",false,"Unconfirmed","pred"],
    ["2026-10-11","phlt","Assignment","Reproductive-Health Evidence Comparison",false,"Unconfirmed","pred"],
    ["2026-10-18","phlt","Exam","Personal Health Midterm Exam - Weeks 1-7",true,"",""],
    ["2026-10-18","phlt","Quiz","Week 8 Quiz — Addiction and Drug Abuse",false,"Unconfirmed","pred"],
    ["2026-10-18","phlt","Assignment","Addiction Case Study",false,"Unconfirmed","pred"],
    ["2026-10-25","phlt","Quiz","Week 9 Quiz — Alcohol, Tobacco, Vaping",false,"Unconfirmed","pred"],
    ["2026-10-25","phlt","Assignment","Alcohol/Vaping Marketing Audit",false,"Unconfirmed","pred"],
    ["2026-11-01","phlt","Quiz","Week 10 Quiz — Eating for a Healthier You",false,"Unconfirmed","pred"],
    ["2026-11-01","phlt","Assignment","3-Day Food-Pattern Audit + Label Activity",false,"Takes 3 days · Unconfirmed","pred"],
    ["2026-11-08","phlt","Quiz","Week 11 Quiz — Healthy Weight",false,"Unconfirmed","pred"],
    ["2026-11-08","phlt","Assignment","Media and Body-Image Analysis",false,"Unconfirmed","pred"],
    ["2026-11-15","phlt","Quiz","Week 12 Quiz — Physical Fitness",false,"Unconfirmed","pred"],
    ["2026-11-15","phlt","Assignment","Movement Audit + One-Week Movement Experiment",false,"Takes 7 days · Unconfirmed","pred"],
    ["2026-11-21","phlt","Quiz","Week 13 Quiz — Cardiovascular Disease and Cancer",false,"Syllabus ends this week Saturday — confirm · Unconfirmed","pred"],
    ["2026-11-21","phlt","Assignment","Chronic Disease Risk Web",false,"Syllabus ends this week Saturday — confirm · Unconfirmed","pred"],
    ["2026-12-06","phlt","Quiz","Week 14 Quiz — Infectious Diseases and STIs",false,"Unconfirmed","pred"],
    ["2026-12-06","phlt","Assignment","Health Claim Autopsy",false,"Unconfirmed","pred"],
    ["2026-12-13","phlt","Assignment","Final My Health Experiment",true,"10% of grade · course end date conflicted (Dec 13 vs 18)","pred"],

    // ───── SOC Social Problems — predicted from syllabus, not yet in Canvas ─────
    ["2026-09-06","socp","Weekly work","SOC Week 2: Analyzing Social Problems",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-09-13","socp","Weekly work","SOC Week 3: Activists and Claimsmaking",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-09-20","socp","Weekly work","SOC Week 4: Experts and Claimsmaking",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-09-27","socp","Weekly work","SOC Week 5: Media and Public Reactions",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-10-04","socp","Weekly work","SOC Week 6: Media and Public Reactions II",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-10-11","socp","Weekly work","SOC Week 7: Social Policy and Evaluation",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-10-18","socp","Weekly work","SOC Week 8: American Dream in Crisis",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-10-25","socp","Exam","SOC Midterm Exam",true,"Week of Oct 19 · exact date unconfirmed","pred"],
    ["2026-11-01","socp","Weekly work","SOC Week 10: American Dream in Crisis II",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-11-08","socp","Weekly work","SOC Week 11: American Dream in Crisis III",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-11-15","socp","Weekly work","SOC Week 12: American Dream in Crisis IV",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-11-22","socp","Weekly work","SOC Week 13: American Dream in Crisis V",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-12-06","socp","Weekly work","SOC Week 15: Tainted Tap",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-12-13","socp","Weekly work","SOC Week 16: Tainted Tap II",false,"Discussions, quiz, assignment · Unconfirmed","pred"],
    ["2026-12-18","socp","Exam","SOC Final Exam",true,"Finals week Dec 14–18 · exact date unconfirmed","pred"],

    [null,"socp","Quiz","COMPLETE: Accessibility Acknowledgement",false,"",""]
  ]
};
