BASE: cae4988a02e0dd81161f89218f79d2d141fdb6ab
HEAD: 9ebf26abc28c64e3b7f4e7ae5ed365e9cf48bcb7

## Commits
9ebf26a feat: reskin 1996 personal homepage era

## Stat
 src/i18n/en.json         |  16 +++---
 src/i18n/pt.json         |  16 +++---
 src/styles/eras/1996.css | 129 ++++++++++++++++-------------------------------
 3 files changed, 60 insertions(+), 101 deletions(-)

## Diff
diff --git a/src/i18n/en.json b/src/i18n/en.json
index 4e41c15..62cc356 100644
--- a/src/i18n/en.json
+++ b/src/i18n/en.json
@@ -70,25 +70,25 @@
     "suggest_projects": "Projects",
     "suggest_contact": "Contact",
     "typing": "Typing...",
     "fallback": "I can tell you about experience, projects, skills, or contact. What would you like to know?"
   },
   "era1996": {
-    "site_title": "DANIEL TAVARES'S WORLD 96",
-    "tagline": "--- HOME ON THE INFORMATION SUPERHIGHWAY ---",
+    "site_title": "DANIEL'S PERSONAL PAGE '96",
+    "tagline": "--- MY LITTLE CORNER OF CYBERSPACE ---",
     "subtitle": "This is not a portfolio. It's a time machine.",
-    "marquee": "Visitor number 13371 !!! Best viewed in Netscape Navigator 3.0 at 800x600 ÔÖÑ Sign my guestbook!!! ÔÖÑ This page is 100% hand-coded HTML",
-    "menu_title": "Ôÿà MENU Ôÿà",
+    "marquee": "Visitor #13371 to this page !!! Built by hand, one <table> at a time ÔÖÑ Say hi in my guestbook ÔÖÑ Looks best at 800x600",
+    "menu_title": "Ôÿà AROUND THE PAGE Ôÿà",
     "visitors": "VISITORS",
     "youve_got_mail": "YOU'VE GOT MAIL!",
     "loading": "Loading page...",
     "loading_images": "Loading images...",
-    "go_1986": "ÔùÇ CLICK HERE TO GO TO 1986",
-    "go_2006": "Ô£ª CLICK HERE TO GO TO 2006",
-    "hand_coded": "100% hand-coded HTML",
-    "guestbook": "Sign my guestbook!!!",
+    "go_1986": "ÔùÇ BACK TO 1986",
+    "go_2006": "FORWARD TO 2006 Ô£ª",
+    "hand_coded": "Built by hand, one line at a time",
+    "guestbook": "Leave a note in my guestbook",
     "location": "Recife, Pernambuco, Brazil"
   },
   "era2006": {
     "site_name": "daniel.tavares '06",
     "beta_badge": "2.0 BETA",
     "search_placeholder": "search the blog...",
diff --git a/src/i18n/pt.json b/src/i18n/pt.json
index eaf35f6..1fb57e4 100644
--- a/src/i18n/pt.json
+++ b/src/i18n/pt.json
@@ -70,25 +70,25 @@
     "suggest_projects": "Projetos",
     "suggest_contact": "Contato",
     "typing": "Digitando...",
     "fallback": "Posso falar sobre experi├¬ncia, projetos, skills ou contato. O que quer saber?"
   },
   "era1996": {
-    "site_title": "DANIEL TAVARES'S WORLD 96",
-    "tagline": "--- HOME ON THE INFORMATION SUPERHIGHWAY ---",
+    "site_title": "P├üGINA PESSOAL DO DANIEL '96",
+    "tagline": "--- MEU CANTINHO NO CIBERESPA├çO ---",
     "subtitle": "Isto n├úo ├® um portf├│lio. ├ë uma m├íquina do tempo.",
-    "marquee": "Visitante n┬║ 13371 !!! Melhor visualizado no Netscape Navigator 3.0 a 800x600 ÔÖÑ Assine meu guestbook!!! ÔÖÑ Esta p├ígina ├® 100% HTML feito ├á m├úo",
-    "menu_title": "Ôÿà MENU Ôÿà",
+    "marquee": "Visitante n┬║ 13371 desta p├ígina !!! Feita ├á m├úo, uma <table> por vez ÔÖÑ Deixe um recado no meu guestbook ÔÖÑ Melhor em 800x600",
+    "menu_title": "Ôÿà PELA P├üGINA Ôÿà",
     "visitors": "VISITANTES",
     "youve_got_mail": "YOU'VE GOT MAIL!",
     "loading": "Carregando p├ígina...",
     "loading_images": "Carregando imagens...",
-    "go_1986": "ÔùÇ CLIQUE AQUI PARA IR A 1986",
-    "go_2006": "Ô£ª CLIQUE AQUI PARA IR A 2006",
-    "hand_coded": "100% HTML feito ├á m├úo",
-    "guestbook": "Assine meu guestbook!!!",
+    "go_1986": "ÔùÇ VOLTAR A 1986",
+    "go_2006": "AVAN├çAR PARA 2006 Ô£ª",
+    "hand_coded": "Feita ├á m├úo, linha por linha",
+    "guestbook": "Deixe um recado no meu guestbook",
     "location": "Recife, Pernambuco, Brasil"
   },
   "era2006": {
     "site_name": "daniel.tavares '06",
     "beta_badge": "2.0 BETA",
     "search_placeholder": "buscar no blog...",
diff --git a/src/styles/eras/1996.css b/src/styles/eras/1996.css
index 93cccb1..12e726a 100644
--- a/src/styles/eras/1996.css
+++ b/src/styles/eras/1996.css
@@ -125,34 +125,34 @@ html:has(.era-1996) body::-webkit-scrollbar-corner {
 @keyframes flame-scroll {
   0% { background-position: 0% 0; }
   100% { background-position: 200% 0; }
 }
 
 .geo-banner {
-  background: #0000aa;
-  border: 4px solid #ff00ff;
+  background: #1a3a5c;
+  border: 3px outset #c0c0c0;
   margin: 0.5rem 1rem;
   padding: 1rem;
   text-align: center;
 }
 
 .geo-banner h1 {
-  color: #ff0000;
+  color: #ffcc66;
   font-size: clamp(1.25rem, 4vw, 2rem);
-  text-shadow: 2px 2px #ffff00;
+  text-shadow: 2px 2px #000;
   margin: 0.25rem 0;
 }
 
 .geo-banner .tagline {
-  color: #ffff00;
+  color: #cce6ff;
   font-size: 0.85rem;
   margin: 0.25rem 0;
 }
 
 .geo-banner .subtitle {
-  color: #00ff00;
+  color: #ffffff;
   font-size: 0.9rem;
   font-weight: bold;
 }
 
 .geo-fire {
   display: inline-block;
@@ -161,20 +161,20 @@ html:has(.era-1996) body::-webkit-scrollbar-corner {
 
 @keyframes geo-blink {
   50% { opacity: 0.3; }
 }
 
 .geo-marquee-wrap {
-  background: #000;
-  border: 2px solid #ff00ff;
+  background: #0a1628;
+  border: 2px inset #808080;
   margin: 0 1rem;
   overflow: hidden;
 }
 
 .geo-marquee {
-  color: #00ff00;
+  color: #7dffb3;
   font-family: 'Courier New', monospace;
   font-size: 0.8rem;
   padding: 0.35rem 0;
   white-space: nowrap;
   animation: marquee-96 18s linear infinite;
 }
@@ -228,14 +228,14 @@ html:has(.era-1996) body::-webkit-scrollbar-corner {
 .geo-sidebar {
   flex: 0 0 180px;
   min-width: 160px;
 }
 
 .geo-menu-box {
-  background: #0000aa;
-  border: 3px solid #ff00ff;
+  background: #1a3a5c;
+  border: 3px outset #c0c0c0;
   padding: 0.5rem;
   margin-bottom: 0.75rem;
 }
 
 .geo-menu-title {
   color: #ffff00;
@@ -330,173 +330,132 @@ html:has(.era-1996) body::-webkit-scrollbar-corner {
 
 .geo-main {
   flex: 1;
   min-width: 280px;
 }
 
-/* Per-section GeoCities palettes ÔÇö light bg + dark text (always readable) */
+/* Per-section homepage palettes ÔÇö light bg + dark text (always readable) */
 .era-1996 .geo-main > section.geo-panel {
-  padding: 1rem;
+  padding: 1.1rem 1.25rem;
   color: #000000;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(1) {
+  --panel-tab: #cc0000;
   background: #ffffcc;
-  border-color: #ff00ff;
-  outline-color: #0000aa;
-}
-
-.era-1996 .geo-main > section.geo-panel:nth-of-type(1) h2 {
-  color: #cc0000;
-  border-bottom-color: #0000aa;
+  border-color: #806600;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(2) {
+  --panel-tab: #000080;
   background: #cce6ff;
-  border-color: #0000ff;
-  outline-color: #ff00ff;
-}
-
-.era-1996 .geo-main > section.geo-panel:nth-of-type(2) h2 {
-  color: #000080;
-  border-bottom-color: #0000ff;
+  border-color: #335a80;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(2) .geo-job {
   background: #ffffff;
   border-color: #6699cc;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(3) {
+  --panel-tab: #990033;
   background: #ffccf0;
-  border-color: #ff0099;
-  outline-color: #990099;
-}
-
-.era-1996 .geo-main > section.geo-panel:nth-of-type(3) h2 {
-  color: #990000;
-  border-bottom-color: #ff0099;
+  border-color: #99335c;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(3) .geo-job {
   background: #ffffff;
   border-color: #ff66cc;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(4) {
+  --panel-tab: #006600;
   background: #ccffcc;
-  border-color: #009900;
-  outline-color: #006600;
-}
-
-.era-1996 .geo-main > section.geo-panel:nth-of-type(4) h2 {
-  color: #006600;
-  border-bottom-color: #009900;
+  border-color: #336633;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(5) {
+  --panel-tab: #cc3300;
   background: #ffe4b5;
-  border-color: #ff6600;
-  outline-color: #cc3300;
-}
-
-.era-1996 .geo-main > section.geo-panel:nth-of-type(5) h2 {
-  color: #cc3300;
-  border-bottom-color: #ff6600;
+  border-color: #995533;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(5) .geo-project {
   background: #ffffff;
   border-color: #ff9900;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(6) {
+  --panel-tab: #660099;
   background: #e6d4ff;
-  border-color: #9900ff;
-  outline-color: #660099;
-}
-
-.era-1996 .geo-main > section.geo-panel:nth-of-type(6) h2 {
-  color: #660099;
-  border-bottom-color: #9900ff;
+  border-color: #663380;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(6) .geo-skills span {
   background: #660099;
   border-color: #9900ff;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(7) {
+  --panel-tab: #006699;
   background: #d4f1ff;
-  border-color: #0099cc;
-  outline-color: #006699;
-}
-
-.era-1996 .geo-main > section.geo-panel:nth-of-type(7) h2 {
-  color: #006699;
-  border-bottom-color: #0099cc;
+  border-color: #336680;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(7) .geo-skills span {
   background: #006699;
   border-color: #0099cc;
 }
 
 .era-1996 .geo-main > section.geo-panel:nth-of-type(8) {
+  --panel-tab: #333333;
   background: #f5f5f5;
   border-color: #666666;
-  outline-color: #333333;
-}
-
-.era-1996 .geo-main > section.geo-panel:nth-of-type(8) h2 {
-  color: #333333;
-  border-bottom-color: #666666;
 }
 
 .era-1996 .geo-panel,
 .era-1996 .geo-panel p,
 .era-1996 .geo-panel li,
 .era-1996 .geo-panel ul,
 .era-1996 .geo-panel .geo-bio,
 .era-1996 .geo-panel .geo-role {
   color: #000000;
 }
 
 .era-1996 .geo-panel h2 {
-  font-size: 1.25rem;
-  margin-bottom: 1rem;
+  font-size: 1.15rem;
 }
 
 .era-1996 .geo-panel a {
   color: #0000cc;
 }
 
 .era-1996 .geo-panel a:hover {
   color: #cc0000;
 }
 
 .geo-panel {
-  border: 4px solid #ff00ff;
-  outline: 3px solid #0000aa;
-  padding: 1rem;
-  margin-bottom: 1rem;
+  --panel-tab: #cc0000;
+  position: relative;
+  border: 2px solid #999999;
+  border-left: 6px solid var(--panel-tab);
+  padding: 1.1rem 1.25rem;
+  margin-bottom: 1.1rem;
 }
 
 .geo-panel h2 {
-  color: #cc0000;
-  text-align: center;
+  display: inline-block;
+  color: var(--panel-tab);
   font-size: 1.25rem;
-  border-bottom: 2px dashed #0000aa;
-  padding-bottom: 0.5rem;
+  padding: 0.15rem 0.6rem 0.3rem 0;
+  border-bottom: 3px solid var(--panel-tab);
   margin-bottom: 1rem;
 }
 
-.geo-panel h2::before,
-.geo-panel h2::after {
-  content: ' Ôÿå ';
-  color: #ff00ff;
+.geo-panel h2::before {
+  content: '┬╗ ';
 }
 
 .geo-panel p,
 .geo-panel li,
 .geo-panel ul {
   color: #1a1a1a;
@@ -695,16 +654,16 @@ html:has(.era-1996) body::-webkit-scrollbar-corner {
   color: #000080;
 }
 
 .geo-footer {
   text-align: center;
   padding: 1rem;
-  color: #ffff00;
+  color: #ffcc66;
   font-size: 0.75rem;
-  background: #000080;
-  border-top: 3px solid #ff00ff;
+  background: #1a3a5c;
+  border-top: 3px outset #c0c0c0;
 }
 
 .geo-contact a {
   display: inline-block;
   background: #00cc00;
   color: #000;
