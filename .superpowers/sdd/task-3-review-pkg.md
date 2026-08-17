BASE: 6294d21d832f4bb6d56a32d23f88eeeb49489f97
HEAD: 79ddfab369aac6d9df58176d743882e116440dc7

## Commits
79ddfab feat: reskin 1986 terminal era identity

## Stat
 src/components/eras/1986/ConnectScreen.astro |   1 +
 src/i18n/en.json                             |  14 ++--
 src/i18n/pt.json                             |  14 ++--
 src/styles/eras/1986.css                     | 120 +++++++++++++++++++--------
 4 files changed, 102 insertions(+), 47 deletions(-)

## Diff
diff --git a/src/components/eras/1986/ConnectScreen.astro b/src/components/eras/1986/ConnectScreen.astro
index 25dce1e..afe1940 100644
--- a/src/components/eras/1986/ConnectScreen.astro
+++ b/src/components/eras/1986/ConnectScreen.astro
@@ -6,12 +6,13 @@ interface Props {
 }
 
 const { locale } = Astro.props;
 const t = useTranslations(locale);
 ---
 <div class="connect-screen" id="connect-screen">
+  <div class="terminal-chrome" aria-hidden="true">NODE://RECIFE-BR ÔûôÔûôÔûô</div>
   <h1 class="bbs-type-target" data-text={t.era1986.bbs_title}></h1>
   <p class="specs bbs-type-target" data-text={t.era1986.specs}></p>
   <p class="dialing-msg" id="dialing-msg" aria-live="polite"></p>
   <button type="button" class="connect-btn" id="connect-btn" hidden>Ôû║ {t.era1986.connect}</button>
   <p class="connect-hint bbs-type-target" data-text={t.era1986.press_to_dial}></p>
 </div>
diff --git a/src/i18n/en.json b/src/i18n/en.json
index 768bb95..4e41c15 100644
--- a/src/i18n/en.json
+++ b/src/i18n/en.json
@@ -48,19 +48,19 @@
   "timeline": {
     "aria_label": "Browse eras",
     "coming_soon_sr": "This era will be available soon",
     "active_format": "{year} ┬À {short}"
   },
   "era1986": {
-    "connect": "CONNECT",
-    "press_to_dial": "[ PRESS TO DIAL IN ]",
-    "dialing": "Dialing...",
-    "bbs_title": "DANIEL'S BBS",
-    "specs": "1200 BAUD - 8-N-1 - ANSI",
-    "file_listing": "FILE LISTING",
-    "dial": "DIAL",
+    "connect": "ESTABLISH LINK",
+    "press_to_dial": "[ ENTER FOR HANDSHAKE ]",
+    "dialing": "Negotiating 1200 baud...",
+    "bbs_title": "ARCHIVE ┬À DANIEL TAVARES",
+    "specs": "RECIFE NODE ┬À 8-N-1 ┬À ANSI",
+    "file_listing": "LISTING",
+    "dial": "LINK",
     "skip": "Skip animation",
     "skip_hint": "ESC"
   },
   "era2026": {
     "brand": "DanielTavaresOS",
     "input_placeholder": "Ask Daniel's agent anything...",
diff --git a/src/i18n/pt.json b/src/i18n/pt.json
index 1f70c32..eaf35f6 100644
--- a/src/i18n/pt.json
+++ b/src/i18n/pt.json
@@ -48,19 +48,19 @@
   "timeline": {
     "aria_label": "Navegar entre eras",
     "coming_soon_sr": "Esta era estar├í dispon├¡vel em breve",
     "active_format": "{year} ┬À {short}"
   },
   "era1986": {
-    "connect": "CONECTAR",
-    "press_to_dial": "[ PRESS TO DIAL IN ]",
-    "dialing": "Discando...",
-    "bbs_title": "DANIEL'S BBS",
-    "specs": "1200 BAUD - 8-N-1 - ANSI",
-    "file_listing": "FILE LISTING",
-    "dial": "DIAL",
+    "connect": "ESTABELECER LINK",
+    "press_to_dial": "[ ENTER PARA HANDSHAKE ]",
+    "dialing": "Negociando 1200 baud...",
+    "bbs_title": "ARQUIVO ┬À DANIEL TAVARES",
+    "specs": "RECIFE NODE ┬À 8-N-1 ┬À ANSI",
+    "file_listing": "LISTAGEM",
+    "dial": "LINK",
     "skip": "Pular anima├º├úo",
     "skip_hint": "ESC"
   },
   "era2026": {
     "brand": "DanielTavaresOS",
     "input_placeholder": "Pergunte qualquer coisa ao agente do Daniel...",
diff --git a/src/styles/eras/1986.css b/src/styles/eras/1986.css
index ef796dd..6dd0b29 100644
--- a/src/styles/eras/1986.css
+++ b/src/styles/eras/1986.css
@@ -1,22 +1,26 @@
 .era-1986 {
-  background: #020202;
-  color: #00ff41;
+  --phosphor: #ffb000;
+  --phosphor-dim: rgba(255, 176, 0, 0.55);
+  --phosphor-faint: rgba(255, 176, 0, 0.18);
+  --panel-bg: #120c04;
+  background: #0b0702;
+  color: var(--phosphor);
   font-family: 'VT323', monospace;
   min-height: 100vh;
   position: relative;
   overflow-x: hidden;
 }
 
 /* Phosphor glow on all terminal text */
 .era-1986,
 .era-1986 .connect-screen,
 .era-1986 .terminal-content {
   text-shadow:
-    0 0 4px rgba(0, 255, 65, 0.85),
-    0 0 12px rgba(0, 255, 65, 0.35);
+    0 0 4px rgba(255, 176, 0, 0.8),
+    0 0 14px rgba(255, 176, 0, 0.4);
 }
 
 /* CRT overlay ÔÇö scanlines + vignette (always on top, no pointer capture) */
 .crt-overlay {
   position: fixed;
   inset: 0;
@@ -28,33 +32,33 @@
   position: absolute;
   inset: 0;
   background: repeating-linear-gradient(
     to bottom,
     transparent 0px,
     transparent 2px,
-    rgba(0, 0, 0, 0.28) 2px,
-    rgba(0, 0, 0, 0.28) 4px
+    rgba(0, 0, 0, 0.32) 2px,
+    rgba(0, 0, 0, 0.32) 4px
   );
-  animation: crt-flicker 8s steps(1) infinite;
+  animation: crt-flicker 6.5s steps(1) infinite;
 }
 
 .crt-vignette {
   position: absolute;
   inset: 0;
   background: radial-gradient(
     ellipse at center,
-    transparent 55%,
-    rgba(0, 0, 0, 0.45) 100%
+    transparent 50%,
+    rgba(0, 0, 0, 0.55) 100%
   );
 }
 
 @keyframes crt-flicker {
   0%, 100% { opacity: 1; }
-  50% { opacity: 0.97; }
-  51% { opacity: 1; }
-  89% { opacity: 0.98; }
+  38% { opacity: 0.96; }
+  39% { opacity: 1; }
+  72% { opacity: 0.98; }
 }
 
 @media (prefers-reduced-motion: reduce) {
   .crt-scanlines {
     animation: none;
     opacity: 0.85;
@@ -74,12 +78,22 @@
 }
 
 .connect-screen.is-hidden {
   display: none;
 }
 
+.terminal-chrome {
+  font-size: 0.75rem;
+  letter-spacing: 0.2em;
+  color: var(--phosphor-dim);
+  border: 1px solid var(--phosphor-faint);
+  padding: 0.35rem 0.9rem;
+  margin-bottom: 1.75rem;
+  text-shadow: none;
+}
+
 .connect-screen h1 {
   font-size: clamp(1.5rem, 5vw, 2.5rem);
   letter-spacing: 0.1em;
   margin-bottom: 0.5rem;
   min-height: 1.4em;
 }
@@ -88,27 +102,33 @@
   opacity: 0.9;
   margin-bottom: 2rem;
   min-height: 1.2em;
 }
 
 .connect-btn {
-  background: #00ff41;
-  color: #000;
-  border: none;
+  background: transparent;
+  color: var(--phosphor);
+  border: 1px solid var(--phosphor);
   padding: 1rem 2.5rem;
   font-size: 1.5rem;
   cursor: pointer;
   font-family: inherit;
-  box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
+  box-shadow: 0 0 18px rgba(255, 176, 0, 0.35);
   position: relative;
   z-index: 2;
-  text-shadow: none;
+  text-shadow:
+    0 0 4px rgba(255, 176, 0, 0.8),
+    0 0 14px rgba(255, 176, 0, 0.4);
+  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
 }
 
 .connect-btn:hover:not(:disabled) {
-  box-shadow: 0 0 30px rgba(0, 255, 65, 0.9);
+  background: var(--phosphor);
+  color: #1a0f00;
+  text-shadow: none;
+  box-shadow: 0 0 32px rgba(255, 176, 0, 0.75);
 }
 
 .connect-btn:disabled {
   opacity: 0.55;
   cursor: wait;
 }
@@ -124,13 +144,13 @@
   min-height: 1.2em;
 }
 
 .dialing-msg {
   min-height: 1.5rem;
   margin-bottom: 1rem;
-  color: #00ff41;
+  color: var(--phosphor);
 }
 
 .terminal-content {
   display: none;
   position: relative;
   z-index: 1;
@@ -141,62 +161,96 @@
 
 .terminal-content.is-visible {
   display: block;
 }
 
 .bbs-section {
+  position: relative;
+  margin-top: 1.6rem;
   margin-bottom: 2.5rem;
-  border: 1px solid #00ff41;
-  padding: 1rem;
-  box-shadow: inset 0 0 24px rgba(0, 255, 65, 0.04);
+  background: var(--panel-bg);
+  border: 1px solid var(--phosphor-dim);
+  padding: 1.75rem 1.25rem 1.25rem;
+  box-shadow: inset 0 0 24px rgba(255, 176, 0, 0.05);
+}
+
+.bbs-section::before,
+.bbs-section::after {
+  content: '';
+  position: absolute;
+  width: 0.65rem;
+  height: 0.65rem;
+  border: 1px solid var(--phosphor);
+  opacity: 0.8;
+}
+
+.bbs-section::before {
+  top: -1px;
+  left: -1px;
+  border-right: none;
+  border-bottom: none;
+}
+
+.bbs-section::after {
+  bottom: -1px;
+  right: -1px;
+  border-left: none;
+  border-top: none;
 }
 
 .bbs-section h2 {
-  margin-bottom: 1rem;
-  font-size: 1.25rem;
+  position: absolute;
+  top: -0.85rem;
+  left: 0.75rem;
+  background: var(--panel-bg);
+  margin: 0;
+  padding: 0 0.6rem;
+  font-size: 1.15rem;
+  letter-spacing: 0.05em;
 }
 
 .bbs-section h2::before {
-  content: '> ';
+  content: 'Ôùê ';
 }
 
 .bbs-pre {
   white-space: pre-wrap;
   word-break: break-word;
   line-height: 1.5;
   margin: 0;
   min-height: 1.2em;
 }
 
 .bbs-file {
   font-family: inherit;
-  color: #00ff41;
+  color: var(--phosphor);
 }
 
 .bbs-skip-btn {
   position: fixed;
   bottom: 1.25rem;
   right: 1.25rem;
   z-index: 9999;
   font-family: 'VT323', monospace;
   font-size: 1.1rem;
-  color: #00ff41;
-  background: rgba(0, 20, 0, 0.85);
-  border: 1px solid rgba(0, 255, 65, 0.45);
+  color: var(--phosphor);
+  background: rgba(18, 12, 4, 0.9);
+  border: 1px solid var(--phosphor-dim);
+  clip-path: polygon(0.6rem 0, 100% 0, 100% 100%, 0 100%, 0 0.6rem);
   padding: 0.45rem 0.85rem;
   cursor: pointer;
   text-shadow:
-    0 0 4px rgba(0, 255, 65, 0.85),
-    0 0 12px rgba(0, 255, 65, 0.35);
+    0 0 4px rgba(255, 176, 0, 0.8),
+    0 0 14px rgba(255, 176, 0, 0.4);
   transition: background 0.15s ease, border-color 0.15s ease;
 }
 
 .bbs-skip-btn:hover,
 .bbs-skip-btn:focus-visible {
-  background: rgba(0, 40, 0, 0.95);
-  border-color: #00ff41;
+  background: rgba(40, 26, 0, 0.95);
+  border-color: var(--phosphor);
   outline: none;
 }
 
 .bbs-skip-key {
   opacity: 0.65;
   font-size: 0.95em;
