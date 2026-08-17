BASE: a8597119c7d0717d362b36c1786fbaddb1e6a319
HEAD: eb12f781878df5245204671a7d16035c7d413996

## Commits
eb12f78 feat: add era short labels for decade timeline

## Stat
 src/config/eras.ts | 11 +++++++++--
 src/i18n/en.json   |  5 +++--
 src/i18n/pt.json   |  3 ++-
 3 files changed, 14 insertions(+), 5 deletions(-)

## Diff
diff --git a/src/config/eras.ts b/src/config/eras.ts
index 21b781b..2bec09f 100644
--- a/src/config/eras.ts
+++ b/src/config/eras.ts
@@ -1,45 +1,52 @@
 export const ERAS = {
   '1986': {
     status: 'ready',
     label: '1986',
+    shortLabel: { pt: 'Terminal', en: 'Terminal' },
     seoTitle: { pt: 'BBS Edition', en: 'BBS Edition' },
   },
   '1996': {
     status: 'ready',
     label: '1996',
+    shortLabel: { pt: 'Homepage', en: 'Homepage' },
     seoTitle: { pt: 'GeoCities Edition', en: 'GeoCities Edition' },
   },
   '2006': {
     status: 'ready',
     label: '2006',
+    shortLabel: { pt: 'Web', en: 'Web' },
     seoTitle: { pt: 'Web 2.0 Edition', en: 'Web 2.0 Edition' },
   },
   '2016': {
     status: 'ready',
     label: '2016',
+    shortLabel: { pt: 'Portf├│lio', en: 'Portfolio' },
     seoTitle: { pt: 'Portfolio', en: 'Portfolio' },
   },
   '2026': {
     status: 'ready',
     label: '2026',
+    shortLabel: { pt: 'Agente', en: 'Agent' },
     seoTitle: { pt: 'Agent Edition', en: 'Agent Edition' },
   },
   '2036': {
     status: 'ready',
     label: '2036',
-    seoTitle: { pt: 'Neural Edition', en: 'Neural Edition' },
+    shortLabel: { pt: 'Firmware', en: 'Firmware' },
+    seoTitle: { pt: 'Firmware Edition', en: 'Firmware Edition' },
   },
   '2046': {
     status: 'ready',
     label: '2046',
-    seoTitle: { pt: 'Consciousness Edition', en: 'Consciousness Edition' },
+    shortLabel: { pt: 'Stream', en: 'Stream' },
+    seoTitle: { pt: 'Stream Edition', en: 'Stream Edition' },
   },
 } as const;
 
 export type EraYear = keyof typeof ERAS;
 export type EraStatus = (typeof ERAS)[EraYear]['status'];
 export type Locale = 'pt' | 'en';
 
 export const ERA_YEARS = Object.keys(ERAS) as EraYear[];
 
 export function isEraYear(value: string): value is EraYear {
diff --git a/src/i18n/en.json b/src/i18n/en.json
index 0f9403e..768bb95 100644
--- a/src/i18n/en.json
+++ b/src/i18n/en.json
@@ -39,22 +39,23 @@
   },
   "skills": {
     "languages": "Languages",
     "frameworks": "Frameworks & Tools",
     "concepts": "Concepts"
   },
   "footer": {
     "built_with": "Built with Astro"
   },
   "timeline": {
-    "aria_label": "Navigate between eras",
-    "coming_soon_sr": "This era will be available soon"
+    "aria_label": "Browse eras",
+    "coming_soon_sr": "This era will be available soon",
+    "active_format": "{year} ┬À {short}"
   },
   "era1986": {
     "connect": "CONNECT",
     "press_to_dial": "[ PRESS TO DIAL IN ]",
     "dialing": "Dialing...",
     "bbs_title": "DANIEL'S BBS",
     "specs": "1200 BAUD - 8-N-1 - ANSI",
     "file_listing": "FILE LISTING",
     "dial": "DIAL",
     "skip": "Skip animation",
diff --git a/src/i18n/pt.json b/src/i18n/pt.json
index 4b9c5c7..1f70c32 100644
--- a/src/i18n/pt.json
+++ b/src/i18n/pt.json
@@ -40,21 +40,22 @@
   "skills": {
     "languages": "Linguagens",
     "frameworks": "Frameworks & Ferramentas",
     "concepts": "Conceitos"
   },
   "footer": {
     "built_with": ""
   },
   "timeline": {
     "aria_label": "Navegar entre eras",
-    "coming_soon_sr": "Esta era estar├í dispon├¡vel em breve"
+    "coming_soon_sr": "Esta era estar├í dispon├¡vel em breve",
+    "active_format": "{year} ┬À {short}"
   },
   "era1986": {
     "connect": "CONECTAR",
     "press_to_dial": "[ PRESS TO DIAL IN ]",
     "dialing": "Discando...",
     "bbs_title": "DANIEL'S BBS",
     "specs": "1200 BAUD - 8-N-1 - ANSI",
     "file_listing": "FILE LISTING",
     "dial": "DIAL",
     "skip": "Pular anima├º├úo",
