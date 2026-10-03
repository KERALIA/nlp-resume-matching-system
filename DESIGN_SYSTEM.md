# Design System Specification: Next-Gen AI SaaS Architecture

**Document Version:** 3.0.0  
**Project:** NLP-Based Resume and Job Description Matching System (TalentMatch AI)  
**Author:** Patel Aum Shirishkumar (Enrollment No: 12302040601004)  
**Institution:** Department of Computer Engineering, A. D. Patel Institute of Technology (CVM University)  
**Design Reference:** Linear / Vercel / Stripe Modern SaaS Design Language + Apple Human Interface Guidelines  

---

## 1. Design Philosophy & Aesthetic Principles

This design system delivers a world-class, minimal, developer-first AI interface inspired by modern platforms like **Linear**, **Vercel**, and **Stripe**.

### Core Tenets:
1. **Precision & Technical Authority**: Razor-sharp layout, crisp geometric lines, and refined typography.
2. **Dual-Theme Engine (Obsidian Dark & Pristine Light)**:
   - **Obsidian Dark (Default)**: Deep obsidian canvas (`#090B10`), glowing ambient mesh orbs, frosted glassmorphism (`backdrop-filter: blur(16px)`), and high-contrast electric indigo/emerald/amber accents.
   - **Pristine Light**: Crisp white cards (`#FFFFFF`) on soft slate (`#F8FAFC`), subtle multi-layered diffused shadows, and razor-sharp border strokes (`#E2E8F0`).
3. **Elite Typography**:
   - Primary: **Inter** with OpenType feature tags (`cv02`, `cv03`, `cv04`, `cv11`), tight kerning (`-0.035em` on headlines), and optical sizing.
   - Code & Metrics: **JetBrains Mono** with tabular numerals for instantaneous scanning.
4. **Universal Device Optimization (Android / Tablet / Desktop)**:
   - Fluid auto-fitting grids (`minmax(370px, 1fr)`).
   - Touch targets meeting or exceeding 44×44 CSS pixels.
   - Sticky responsive app header with collapsible navigation pills.
   - Zero horizontal overflow across all Android viewports (360px, 390px, 412px).

---

## 2. Design Tokens

### 2.1 Color Palette

| Token Name | Dark Theme | Light Theme | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| `--canvas` | `#090B10` | `#F8FAFC` | Page background |
| `--surface` | `#131722` | `#FFFFFF` | Primary card and container surface |
| `--surface-hover` | `#1F2538` | `#F1F5F9` | Hover states and interactive rows |
| `--border` | `rgba(255,255,255,0.08)` | `#E2E8F0` | Standard hairline card borders |
| `--border-focus` | `#6366F1` | `#4F46E5` | Active and focus states |
| `--primary` | `#6366F1` | `#4F46E5` | Electric Indigo (Primary brand, active elements) |
| `--cyan` | `#06B6D4` | `#0284C7` | Cyan (BM25 lexical indicators) |
| `--emerald` | `#10B981` | `#059669` | High match scores (80%+), verified skills |
| `--amber` | `#F59E0B` | `#D97706` | Moderate scores (60-79%), warnings |
| `--rose` | `#F43F5E` | `#E11D48` | Low scores (<60%), missing skills, spam alerts |

---

## 3. Component Architecture

### 3.1 App Header
- Single unified sticky navbar (`height: 64px; backdrop-filter: blur(16px)`).
- Neural icon brand mark with `TalentMatch AI` badge.
- Segmented pill navigation with active state indicators.
- Live latency chip with pulsing status dot (`● 2.8 ms • Inference Ready`).
- 1-Click Dark/Light theme toggle switch.
- Student credential chip (`Patel Aum • Sem 7 CP (12302040601004)`).

### 3.2 ATS Resume Health & Score Checker
- Interactive drag-and-drop zone with animated dashed borders.
- Client-side file parsing for PDF (`pdf.js`) and Word DOCX (`mammoth.js`) without server uploads.
- 1-Click sample test button (`✨ Test with Sample Candidate Resume`).
- Animated SVG circular score gauge (0–100) with dynamic gradient stroke.
- 4 comprehensive diagnostic categories:
  1. Resume Structure & Section Architecture (25 pts)
  2. Keywords & Domain Competencies (35 pts)
  3. Action Verbs & Quantifiable Results (20 pts)
  4. Document Length & ATS Readability (20 pts)
