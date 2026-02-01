@echo off
REM ========================================
REM AI Compute Phase Shift - Git Checkpoint
REM save_checkpoint.bat
REM ========================================

echo.
echo ========================================
echo   AI Compute Phase Shift
echo   Version Control Checkpoint
echo ========================================
echo.

REM Check if we're in the correct directory
if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Please run this script from the project root directory.
    echo Current directory: %cd%
    pause
    exit /b 1
)

REM Check if .git directory exists
if not exist ".git\" (
    echo [1/4] Git repository not found. Initializing...
    git init
    if errorlevel 1 (
        echo ERROR: Failed to initialize git repository.
        echo Make sure git is installed: https://git-scm.com/download/win
        pause
        exit /b 1
    )
    echo       Git repository initialized successfully.
    echo.
) else (
    echo [1/4] Git repository detected.
    echo.
)

REM Add all files
echo [2/4] Staging files...
git add .
if errorlevel 1 (
    echo ERROR: Failed to stage files.
    pause
    exit /b 1
)
echo       All files staged successfully.
echo.

REM Check if there are changes to commit
git diff-index --quiet HEAD --
if %errorlevel% equ 0 (
    echo [3/4] No changes to commit. Working tree is clean.
    echo.
    echo Repository is up to date!
    pause
    exit /b 0
)

REM Create commit with detailed message
echo [3/4] Creating commit...
git commit -m "Feat: Phase 2 - Scroll-driven reactive visualization" -m "Implemented scrollytelling with Scrollama integration" -m "" -m "### Components Added" -m "- Scrolly.svelte: Generic scroll sensor wrapper" -m "- Narrative.svelte: 4-step glassmorphic text panels" -m "" -m "### Architecture Enhancements" -m "- Tweened domain stores (svelte/motion) for smooth animations" -m "- 1200ms cubicOut easing for 'heavy camera' feel" -m "- Reactive step-based domain switching" -m "- Background silhouettes with fade transitions" -m "" -m "### Domain Transitions" -m "- Step 0: Y[0.5, 1e6] - Zoom to Human baseline" -m "- Step 1: Y[1e3, 1e18] - Show Moore's Law" -m "- Step 2: Y[1e3, 1e27] - Reveal AI explosion" -m "- Step 3: Maintain full view for scale emphasis" -m "" -m "### Technical Decisions" -m "- Scrollama for intersection observer scroll tracking" -m "- Tweened stores enable smooth numeric array interpolation" -m "- CubicOut easing tested empirically for optimal feel" -m "- 3-layer z-index architecture complete" -m "" -m "### Files Modified" -m "- src/App.svelte: Added tweened domains & switchboard logic" -m "- src/components/Background.svelte: Step-based icon fading" -m "" -m "### Files Added" -m "- src/components/Scrolly.svelte" -m "- src/components/Narrative.svelte" -m "- CHANGELOG.md" -m "- .gitignore" -m "" -m "All Phase 2 acceptance criteria met. Ready for production testing."

if errorlevel 1 (
    echo ERROR: Failed to create commit.
    pause
    exit /b 1
)
echo       Commit created successfully.
echo.

REM Show commit details
echo [4/4] Checkpoint complete! Latest commit:
echo.
git log -1 --oneline
echo.

REM Optional: Show repository status
echo Repository status:
git status --short
echo.

echo ========================================
echo   Checkpoint Saved Successfully!
echo ========================================
echo.
echo Phase 2 (v0.2.0) is now locked in git history.
echo You can safely proceed to Phase 3.
echo.
echo To create a version tag, run:
echo   git tag -a v0.2.0 -m "Phase 2: Scroll Interactions"
echo.

pause
