BASE: eb12f781878df5245204671a7d16035c7d413996
HEAD: 6294d21d832f4bb6d56a32d23f88eeeb49489f97

## Commits
6294d21 feat: redesign era timeline as decade track

## Stat
 src/components/EraTimeline.astro |  31 +++--
 src/styles/eras/2046.css         |  13 ---
 src/styles/eras/timeline.css     | 240 ++++++++++++++++++++++++++++-----------
 3 files changed, 192 insertions(+), 92 deletions(-)

## Diff
diff --git a/src/components/EraTimeline.astro b/src/components/EraTimeline.astro
index 398c30b..259f241 100644
--- a/src/components/EraTimeline.astro
+++ b/src/components/EraTimeline.astro
@@ -1,32 +1,39 @@
 ---
 import '../styles/eras/timeline.css';
-import { ERA_YEARS, type EraYear } from '../config/eras';
+import { ERA_YEARS, getEraMeta, type EraYear } from '../config/eras';
 import { useTranslations, type Locale } from '../i18n';
 
 interface Props {
   currentYear: EraYear;
   locale: Locale;
 }
 
 const { currentYear, locale } = Astro.props;
 const t = useTranslations(locale);
 ---
 <nav
   class={`era-timeline timeline--${currentYear}`}
   aria-label={t.timeline.aria_label}
   role="tablist"
 >
+  <div class="era-timeline__rail" aria-hidden="true"></div>
   <div class="era-timeline__track">
-    {ERA_YEARS.map((year) => (
-      <a
-        href={`/${locale}/${year}`}
-        class="era-timeline__tab"
-        role="tab"
-        aria-selected={year === currentYear ? 'true' : 'false'}
-        aria-current={year === currentYear ? 'page' : undefined}
-      >
-        {year}
-      </a>
-    ))}
+    {ERA_YEARS.map((year) => {
+      const short = getEraMeta(year).shortLabel[locale];
+      const selected = year === currentYear;
+      return (
+        <a
+          href={`/${locale}/${year}`}
+          class:list={['era-timeline__tick', selected && 'is-active']}
+          role="tab"
+          aria-selected={selected ? 'true' : 'false'}
+          aria-current={selected ? 'page' : undefined}
+        >
+          <span class="era-timeline__dot"></span>
+          <span class="era-timeline__year">{year}</span>
+          {selected && <span class="era-timeline__short">{short}</span>}
+        </a>
+      );
+    })}
   </div>
 </nav>
diff --git a/src/styles/eras/2046.css b/src/styles/eras/2046.css
index 40467a8..f25c2e6 100644
--- a/src/styles/eras/2046.css
+++ b/src/styles/eras/2046.css
@@ -324,26 +324,13 @@
 .no-js .consciousness-intro {
   display: none;
 }
 
 .no-js .consciousness-stream {
   display: block;
 }
 
-.timeline--2046 .era-timeline__track {
-  background: #374151;
-}
-
-.timeline--2046 .era-timeline__tab {
-  color: #e5e7eb;
-}
-
-.timeline--2046 .era-timeline__tab[aria-selected='true'] {
-  background: #fff;
-  color: #111;
-}
-
 @media (max-width: 480px) {
   .consciousness-glitch {
     font-size: 1rem;
   }
 }
diff --git a/src/styles/eras/timeline.css b/src/styles/eras/timeline.css
index 105cd2c..8ed1b63 100644
--- a/src/styles/eras/timeline.css
+++ b/src/styles/eras/timeline.css
@@ -1,143 +1,249 @@
+/*
+ * Decade track: a horizontal rail with one tick per era.
+ * Inactive ticks show a small dot + year; the active tick grows
+ * into a larger dot + year + short label. Sticky at the top of
+ * each era page, horizontally scrollable on narrow viewports.
+ */
+
 .era-timeline {
   position: sticky;
   top: 0;
   z-index: 200;
-  display: flex;
-  justify-content: center;
-  padding: 0.75rem 1rem;
-  overflow-x: auto;
-  -webkit-overflow-scrolling: touch;
+  padding: 0.85rem 1rem;
+  background: rgba(10, 10, 18, 0.85);
+  backdrop-filter: blur(8px);
+}
+
+.era-timeline__rail {
+  position: absolute;
+  left: 1rem;
+  right: 1rem;
+  top: 50%;
+  height: 2px;
+  transform: translateY(-50%);
+  background: rgba(255, 255, 255, 0.25);
+  z-index: 0;
+  pointer-events: none;
 }
 
 .era-timeline__track {
+  position: relative;
+  z-index: 1;
   display: flex;
-  gap: 0.25rem;
-  padding: 0.35rem;
-  border-radius: 9999px;
-  min-width: max-content;
+  align-items: center;
+  gap: 0.35rem;
+  overflow-x: auto;
+  -webkit-overflow-scrolling: touch;
+  scrollbar-width: thin;
+  padding: 0.3rem 0;
+  min-width: 0;
 }
 
-.era-timeline__tab {
-  padding: 0.4rem 0.85rem;
+.era-timeline__tick {
+  display: flex;
+  align-items: center;
+  gap: 0.4rem;
+  flex: 0 0 auto;
+  padding: 0.35rem 0.6rem;
   border-radius: 9999px;
-  font-weight: 700;
-  font-size: 0.875rem;
   text-decoration: none;
   white-space: nowrap;
-  transition: background 0.2s, color 0.2s;
+  font-weight: 600;
+  font-size: 0.8rem;
+  color: rgba(255, 255, 255, 0.6);
+  transition: background 0.2s, color 0.2s, padding 0.2s;
 }
 
-.era-timeline__tab[aria-selected='true'] {
-  background: #fff;
-  color: #111;
+.era-timeline__dot {
+  width: 7px;
+  height: 7px;
+  border-radius: 50%;
+  background: currentColor;
+  opacity: 0.6;
+  flex-shrink: 0;
+  transition: width 0.2s, height 0.2s, opacity 0.2s;
 }
 
-.timeline--2016 .era-timeline__track {
-  background: #555;
+.era-timeline__year {
+  font-family: 'JetBrains Mono', monospace;
+  letter-spacing: 0.01em;
 }
 
-.timeline--2016 .era-timeline__tab {
-  color: #fff;
+.era-timeline__short {
+  font-weight: 700;
+  text-transform: uppercase;
+  letter-spacing: 0.04em;
+  font-size: 0.72rem;
 }
 
-.timeline--1986 .era-timeline__track {
+.era-timeline__tick.is-active .era-timeline__dot,
+.era-timeline__tick[aria-selected='true'] .era-timeline__dot {
+  width: 10px;
+  height: 10px;
+  opacity: 1;
+}
+
+@media (max-width: 480px) {
+  .era-timeline {
+    padding: 0.6rem 0.75rem;
+  }
+
+  .era-timeline__tick {
+    padding: 0.3rem 0.5rem;
+    font-size: 0.72rem;
+  }
+
+  .era-timeline__short {
+    font-size: 0.65rem;
+  }
+}
+
+/* ---------------------------------------------------------------- */
+/* Per-era skins ÔÇö base look (rail + inactive tick colors)          */
+/* ---------------------------------------------------------------- */
+
+.timeline--1986 {
   background: #000;
-  border: 1px solid #00ff41;
+  border-bottom: 1px solid #00ff41;
   font-family: 'VT323', monospace;
 }
 
-.timeline--1986 .era-timeline__tab {
-  color: #00ff41;
+.timeline--1986 .era-timeline__rail {
+  background: rgba(0, 255, 65, 0.3);
 }
 
-.timeline--1986 .era-timeline__tab[aria-selected='true'] {
-  background: #00ff41;
-  color: #000;
+.timeline--1986 .era-timeline__tick {
+  color: rgba(0, 255, 65, 0.55);
 }
 
-.timeline--1996 .era-timeline__track {
+.timeline--1996 {
   background: #0000aa;
-  border: 3px ridge #ff00ff;
+  border-bottom: 3px ridge #ff00ff;
 }
 
-.timeline--1996 .era-timeline__tab {
-  color: #ffff00;
+.timeline--1996 .era-timeline__rail {
+  background: rgba(255, 255, 255, 0.35);
 }
 
-.timeline--2006 .era-timeline__track {
+.timeline--1996 .era-timeline__tick {
+  color: rgba(255, 255, 0, 0.65);
+}
+
+.timeline--2006 {
   background: linear-gradient(180deg, #2563eb, #1d4ed8);
-  border-radius: 0.75rem;
 }
 
-.timeline--2006 .era-timeline__tab {
-  color: #fff;
+.timeline--2006 .era-timeline__rail {
+  background: rgba(255, 255, 255, 0.35);
+}
+
+.timeline--2006 .era-timeline__tick {
+  color: rgba(255, 255, 255, 0.7);
+}
+
+.timeline--2016 {
+  background: #333;
+}
+
+.timeline--2016 .era-timeline__rail {
+  background: rgba(255, 255, 255, 0.25);
+}
+
+.timeline--2016 .era-timeline__tick {
+  color: rgba(255, 255, 255, 0.65);
 }
 
-.timeline--2026 .era-timeline__track {
-  background: rgba(30, 20, 60, 0.7);
-  backdrop-filter: blur(12px);
-  border: 1px solid rgba(100, 200, 255, 0.3);
-  box-shadow: 0 0 20px rgba(0, 200, 255, 0.15);
+.timeline--2026 {
+  background: rgba(26, 16, 53, 0.75);
+  border-bottom: 1px solid rgba(100, 200, 255, 0.2);
+  box-shadow: 0 0 20px rgba(0, 200, 255, 0.1);
 }
 
-.timeline--2026 .era-timeline__tab {
-  color: #c4b5fd;
+.timeline--2026 .era-timeline__rail {
+  background: rgba(196, 181, 253, 0.3);
 }
 
-.timeline--2036 .era-timeline__track,
-.timeline--2046 .era-timeline__track {
+.timeline--2026 .era-timeline__tick {
+  color: rgba(196, 181, 253, 0.7);
+}
+
+.timeline--2036 {
   background: #0a0a12;
-  border: 1px solid rgba(100, 200, 255, 0.2);
+  border-bottom: 1px solid rgba(100, 200, 255, 0.2);
 }
 
-.timeline--2036 .era-timeline__tab,
-.timeline--2046 .era-timeline__tab {
-  color: #67e8f9;
+.timeline--2036 .era-timeline__rail {
+  background: rgba(103, 232, 249, 0.3);
 }
 
-@media (max-width: 480px) {
-  .era-timeline__tab {
-    padding: 0.35rem 0.6rem;
-    font-size: 0.75rem;
-  }
+.timeline--2036 .era-timeline__tick {
+  color: rgba(103, 232, 249, 0.65);
 }
 
-/*
- * Selected tab ÔÇö higher specificity than per-era .era-timeline__tab { color }
- * so the active year stays visible (not white-on-white).
- */
-.era-timeline .era-timeline__tab[aria-selected='true'] {
-  background: #ffffff;
+.timeline--2046 {
+  background: rgba(255, 255, 255, 0.9);
+  border-bottom: 1px solid rgba(17, 17, 17, 0.1);
+  backdrop-filter: blur(8px);
+}
+
+.timeline--2046 .era-timeline__rail {
+  background: rgba(17, 17, 17, 0.2);
+}
+
+.timeline--2046 .era-timeline__tick {
+  color: rgba(17, 17, 17, 0.55);
+}
+
+/* ---------------------------------------------------------------- */
+/* Active tick contrast ÔÇö kept last, higher specificity, per-era     */
+/* overrides so the active year is always readable (no white-on-    */
+/* white or black-on-black regardless of the base skin above).      */
+/* ---------------------------------------------------------------- */
+
+.era-timeline .era-timeline__tick.is-active,
+.era-timeline .era-timeline__tick[aria-selected='true'] {
   color: #111111;
+  background: #ffffff;
 }
 
-.timeline--1986 .era-timeline__tab[aria-selected='true'] {
+.timeline--1986 .era-timeline__tick.is-active,
+.timeline--1986 .era-timeline__tick[aria-selected='true'] {
   background: #00ff41;
   color: #000000;
 }
 
-.timeline--1996 .era-timeline__tab[aria-selected='true'] {
+.timeline--1996 .era-timeline__tick.is-active,
+.timeline--1996 .era-timeline__tick[aria-selected='true'] {
   background: #ff00ff;
   color: #ffff00;
 }
 
-.timeline--2006 .era-timeline__tab[aria-selected='true'] {
+.timeline--2006 .era-timeline__tick.is-active,
+.timeline--2006 .era-timeline__tick[aria-selected='true'] {
   background: #ffffff;
   color: #1d4ed8;
 }
 
-.timeline--2016 .era-timeline__tab[aria-selected='true'] {
+.timeline--2016 .era-timeline__tick.is-active,
+.timeline--2016 .era-timeline__tick[aria-selected='true'] {
   background: #ffffff;
   color: #111111;
 }
 
-.timeline--2026 .era-timeline__tab[aria-selected='true'] {
+.timeline--2026 .era-timeline__tick.is-active,
+.timeline--2026 .era-timeline__tick[aria-selected='true'] {
   background: rgba(255, 255, 255, 0.95);
   color: #4c1d95;
 }
 
-.timeline--2036 .era-timeline__tab[aria-selected='true'],
-.timeline--2046 .era-timeline__tab[aria-selected='true'] {
+.timeline--2036 .era-timeline__tick.is-active,
+.timeline--2036 .era-timeline__tick[aria-selected='true'] {
   background: #67e8f9;
   color: #0a0a12;
 }
+
+.timeline--2046 .era-timeline__tick.is-active,
+.timeline--2046 .era-timeline__tick[aria-selected='true'] {
+  background: #111111;
+  color: #ffffff;
+}
