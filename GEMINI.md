# Educational Tourist (永定研学) - WeChat Mini Program

## Project Overview

**Educational Tourist (永定研学)** is a WeChat Mini Program designed to promote and manage educational tourism (study tours) in the Yongding region. It serves as a comprehensive platform for users to discover courses, routes, bases, and experts related to educational tourism, focusing on themes like Hakka culture, Red education, and nature exploration.

**Key Features:**
*   **Home:** Banner showcase, quick access to core functions, district selection, and hot recommendations.
*   **Courses:** Detailed listings of study courses with filtering by category (Culture, Red Education, Science, Intangible Heritage).
*   **Routes:** Curated study tour routes with schedules and agency information.
*   **Bases & Agencies:** Directory of certified study bases and service agencies with navigation and contact details.
*   **Experts:** Profiles of certified study tour guides and researchers.
*   **Profile:** User center for managing activities and settings.

**Tech Stack:**
*   **Framework:** WeChat Mini Program (Native)
*   **Language:** TypeScript
*   **UI Library:** TDesign Miniprogram
*   **Styling:** WXSS (with CSS variables for theming)

## Project Structure

The project source code is located in the `miniprogram/` directory.

```
D:\zuo mian\educational_tourist\
├── Documentation/          # Project requirements and implementation docs
├── miniprogram/            # Source code root
│   ├── assets/             # Static assets (icons, images)
│   ├── components/         # Reusable UI components (e.g., nav-bar, course-card)
│   ├── mock/               # Mock data for development (bases, courses, experts, etc.)
│   ├── pages/              # Application pages
│   │   ├── index/          # Home page
│   │   ├── courses/        # Course listing
│   │   ├── routes/         # Route listing
│   │   ├── bases/          # Bases & Agencies listing
│   │   ├── profile/        # User profile
│   │   └── ... (detail pages)
│   ├── styles/             # Global styles
│   │   ├── common.wxss     # Common utility classes
│   │   └── theme.wxss      # CSS variables and theme definitions
│   ├── typings/            # TypeScript type definitions
│   ├── app.json            # Global app configuration (pages, window, tabbar)
│   ├── app.ts              # App entry point
│   └── app.wxss            # Global styles
├── package.json            # NPM dependencies and scripts
├── project.config.json     # WeChat Developer Tools configuration
└── tsconfig.json           # TypeScript configuration
```

## Building and Running

**Prerequisites:**
*   Node.js and npm installed.
*   WeChat Developer Tools installed.

**Setup:**

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Open in WeChat Developer Tools:**
    *   Open WeChat Developer Tools.
    *   Import the project directory: `D:\zuo mian\educational_tourist`.
    *   **AppID:** `wx9516fd6f5bccfa99` (or use Test AppID).

3.  **Build NPM:**
    *   In WeChat Developer Tools, go to the menu bar: **Tools** -> **Build npm**.
    *   This is crucial for `tdesign-miniprogram` to work.

4.  **Compilation:**
    *   The IDE should automatically compile the TypeScript code.
    *   Ensure `Enable SKU` is *unchecked* in project details if you encounter issues, though `es6` and `enhance` compilation are enabled in `project.config.json`.

## Development Conventions

*   **Styling:**
    *   Use **TDesign** components where possible (`t-button`, `t-icon`, etc.).
    *   Follow BEM-like naming for custom classes.
    *   Utilize variables from `miniprogram/styles/theme.wxss` for colors (e.g., `var(--td-brand-color)` for the primary red `#C8102E`).
    *   Common layout patterns are in `miniprogram/styles/common.wxss`.

*   **Navigation:**
    *   The project uses a **Custom Navigation Bar** on many pages (e.g., `course-detail`, `route-detail`). Ensure `statusBarHeight` is initialized in `onLoad` to handle safe area padding correctly.
    *   The main tabs (Home, Courses, Routes, Bases, Profile) are configured in `app.json`.

*   **Data:**
    *   Currently, the app relies on **Mock Data** located in `miniprogram/mock/`.
    *   Interfaces for data models are defined in `miniprogram/typings/models.d.ts`.

*   **TypeScript:**
    *   Strict typing is encouraged. Use defined interfaces (`ICourse`, `IBase`, etc.) instead of `any`.

## UI Standardization Standards

**Detail Pages & Custom Headers:**
*   **Header Structure:** Do NOT use the `nav-bar` component. Use a custom fixed `view` structure with `.header` and `.title-bar` classes for better control over transparency, blurring, and layout.
    *   Title Font: 'Times New Roman' (`.font-serif`).
    *   Back Button: Implement manually using `onBackTap` in TypeScript and a `t-icon` in WXML.
*   **Top Placeholder:** Use `style="height: calc({{statusBarHeight}}px + 108rpx);"` to strictly reserve space for the fixed header and prevent content overlap.
*   **Imports:** Always import global styles in WXSS:
    ```css
    @import '/styles/theme.wxss';
    @import '/styles/common.wxss';
    ```
*   **Page Container:** Use `.page-container` with `min-height: 100vh; background: #fff;`.

**Specific UI Elements:**
*   **Action Buttons (e.g., "Join Us"):** White background, black text, bold font (`font-weight: bold`), rounded corners.
*   **Interactive Cards:** Add active states (e.g., icon color change to `#C8102E`, border highlight) for better user feedback.