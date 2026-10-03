/**
 * TalentMatch AI — Unified Apple Design System Controller
 * Comprehensive 19+ Role Discovery, Real-Time Search & Custom Job Description Matching
 * Author: Patel Aum Shirishkumar (En. No: 12302040601004)
 */

(function () {
  'use strict';

  let nlpEngine;
  let activeJd = null;
  let currentWeights = { alpha: 0.50, beta: 0.20, gamma: 0.30 };
  let currentRankedCandidates = [];
  let parsedUploadedText = "";
  let activeDomainFilter = "all";
  let activeSearchQuery = "";

  // DOM Elements - Search & Configurator
  const roleSearchInput = document.getElementById('roleSearchInput');
  const domainFilterStrip = document.getElementById('domainFilterStrip');
  const roleConfiguratorStrip = document.getElementById('roleConfiguratorStrip');
  const roleCountLabel = document.getElementById('roleCountLabel');

  // Custom JD Box
  const toggleCustomJdBtn = document.getElementById('toggleCustomJdBtn');
  const closeCustomJdBtn = document.getElementById('closeCustomJdBtn');
  const customJdBox = document.getElementById('customJdBox');
  const customJdTitle = document.getElementById('customJdTitle');
  const customJdDomain = document.getElementById('customJdDomain');
  const customJdText = document.getElementById('customJdText');
  const applyCustomJdBtn = document.getElementById('applyCustomJdBtn');

  // Benchmark position card
  const jdDetailTitle = document.getElementById('jdDetailTitle');
  const jdDomainTag = document.getElementById('jdDomainTag');
  const jdSnippet = document.getElementById('jdSnippet');
  const jdSkillsChips = document.getElementById('jdSkillsChips');

  // Candidate grid
  const candidatesContainer = document.getElementById('candidatesContainer');
  const latencyNum = document.getElementById('latencyNum');

  // ATS Benchmark Target Role Select & Searchable Combobox Elements
  const atsTargetJdSelect = document.getElementById('atsTargetJdSelect');
  const atsComboboxWrap = document.getElementById('atsComboboxWrap');
  const atsSearchTriggerBox = document.getElementById('atsSearchTriggerBox');
  const atsRoleSearchInput = document.getElementById('atsRoleSearchInput');
  const atsRoleClearBtn = document.getElementById('atsRoleClearBtn');
  const atsRoleDropdownToggle = document.getElementById('atsRoleDropdownToggle');
  const atsComboboxDropdown = document.getElementById('atsComboboxDropdown');
  const atsDropdownScroll = document.getElementById('atsDropdownScroll');
  const atsDropdownCountLabel = document.getElementById('atsDropdownCountLabel');

  // ATS Checker Elements
  const dropzoneContainer = document.getElementById('dropzoneContainer');
  const resumeFileInput = document.getElementById('resumeFileInput');
  const loadSampleResumeBtn = document.getElementById('loadSampleResumeBtn');
  const uploadedFileBanner = document.getElementById('uploadedFileBanner');
  const uploadedFileName = document.getElementById('uploadedFileName');
  const uploadedFileMeta = document.getElementById('uploadedFileMeta');
  const reuploadBtn = document.getElementById('reuploadBtn');

  const atsResultsGrid = document.getElementById('atsResultsGrid');
  const svgGaugeFill = document.getElementById('svgGaugeFill');
  const atsScoreVal = document.getElementById('atsScoreVal');
  const atsStatusBadge = document.getElementById('atsStatusBadge');
  const atsStatWords = document.getElementById('atsStatWords');
  const atsStatVerbs = document.getElementById('atsStatVerbs');
  const atsStatMetrics = document.getElementById('atsStatMetrics');
  const atsStatSkills = document.getElementById('atsStatSkills');

  const scoreCatSections = document.getElementById('scoreCatSections');
  const scoreCatKeywords = document.getElementById('scoreCatKeywords');
  const scoreCatImpact = document.getElementById('scoreCatImpact');
  const scoreCatLength = document.getElementById('scoreCatLength');

  const sectionChecklistItems = document.getElementById('sectionChecklistItems');
  const atsMatchedSkillsPills = document.getElementById('atsMatchedSkillsPills');
  const atsMissingSkillsPills = document.getElementById('atsMissingSkillsPills');
  const atsImpactDetails = document.getElementById('atsImpactDetails');
  const atsLengthDetails = document.getElementById('atsLengthDetails');

  // Sliders
  const sliderAlpha = document.getElementById('sliderAlpha');
  const sliderBeta = document.getElementById('sliderBeta');
  const sliderGamma = document.getElementById('sliderGamma');
  const valAlpha = document.getElementById('valAlpha');
  const valBeta = document.getElementById('valBeta');
  const valGamma = document.getElementById('valGamma');
  const resetWeightsBtn = document.getElementById('resetWeightsBtn');

  // Offcanvas Drawer Elements
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCandidateName = document.getElementById('drawerCandidateName');
  const drawerCandidateMeta = document.getElementById('drawerCandidateMeta');
  const drawerScoreHybrid = document.getElementById('drawerScoreHybrid');
  const drawerScoreSemantic = document.getElementById('drawerScoreSemantic');
  const drawerScoreLexical = document.getElementById('drawerScoreLexical');
  const drawerMatchedSkills = document.getElementById('drawerMatchedSkills');
  const drawerMissingSkills = document.getElementById('drawerMissingSkills');
  const drawerResumeText = document.getElementById('drawerResumeText');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');

  async function init() {
    nlpEngine = new window.NLPEngine();
    await nlpEngine.init(window.APP_DATA.resumes, window.APP_DATA.jds, window.APP_DATA.taxonomy);

    activeJd = window.APP_DATA.jds[0];

    setupNav();
    setupRoleSearchAndFilters();
    populateAtsTargetJdSelect();
    setupAtsSearchableCombobox();
    setupCustomJdComposer();
    updateJdBanner(activeJd);

    setupSliders();
    setupFileUpload();
    setupDrawer();

    rerankCandidates();
  }

  // =========================================================================
  // 1. UNIFIED NAVBAR SMOOTH SCROLLING & SCROLL SPY
  // =========================================================================
  function setupNav() {
    const navBtns = document.querySelectorAll('.app-nav-link-btn');

    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          navBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 100;
      const sections = ['pipeline-section', 'ats-section', 'calibration-section', 'security-section', 'deliverables-section'];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          navBtns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-target') === sections[i]);
          });
          break;
        }
      }
    });
  }

  // =========================================================================
  // =========================================================================
  // 2. SEARCH & DOMAIN FILTER FOR 44+ ROLES ACROSS ALL DISCIPLINES
  // =========================================================================
  function setupRoleSearchAndFilters() {
    if (roleSearchInput) {
      roleSearchInput.addEventListener('input', (e) => {
        activeSearchQuery = e.target.value.toLowerCase().trim();
        renderFilteredRoleChips();
      });
    }

    renderDomainFilterPills();
    renderFilteredRoleChips();
  }

  function renderDomainFilterPills() {
    if (!domainFilterStrip) return;
    domainFilterStrip.innerHTML = '';

    const allJds = window.APP_DATA.jds;
    const domainCounts = {};
    allJds.forEach(jd => {
      domainCounts[jd.domain] = (domainCounts[jd.domain] || 0) + 1;
    });

    // "All Fields" Pill
    const allBtn = document.createElement('button');
    allBtn.className = `domain-pill-btn ${activeDomainFilter === 'all' ? 'active' : ''}`;
    allBtn.setAttribute('data-domain', 'all');
    allBtn.textContent = `All Fields (${allJds.length})`;
    allBtn.addEventListener('click', () => {
      activeDomainFilter = 'all';
      updateDomainPillsActiveState();
      renderFilteredRoleChips();
    });
    domainFilterStrip.appendChild(allBtn);

    // Dynamic Pill for each Domain
    for (const domain in domainCounts) {
      const btn = document.createElement('button');
      btn.className = `domain-pill-btn ${activeDomainFilter === domain ? 'active' : ''}`;
      btn.setAttribute('data-domain', domain);
      btn.textContent = `${domain} (${domainCounts[domain]})`;
      btn.addEventListener('click', () => {
        activeDomainFilter = domain;
        updateDomainPillsActiveState();
        renderFilteredRoleChips();
      });
      domainFilterStrip.appendChild(btn);
    }
  }

  function updateDomainPillsActiveState() {
    if (!domainFilterStrip) return;
    domainFilterStrip.querySelectorAll('.domain-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-domain') === activeDomainFilter);
    });
  }

  function renderFilteredRoleChips() {
    if (!roleConfiguratorStrip) return;
    roleConfiguratorStrip.innerHTML = '';

    const allJds = window.APP_DATA.jds;
    const filtered = allJds.filter(jd => {
      // Domain filter
      if (activeDomainFilter !== 'all' && jd.domain !== activeDomainFilter) {
        return false;
      }
      // Search query filter across title, domain, description, required skills, preferred skills
      if (activeSearchQuery) {
        const fullContent = `${jd.title} ${jd.domain} ${jd.description} ${(jd.required_skills || []).join(' ')} ${(jd.preferred_skills || []).join(' ')}`.toLowerCase();
        if (!fullContent.includes(activeSearchQuery)) return false;
      }
      return true;
    });

    if (roleCountLabel) {
      roleCountLabel.textContent = `${filtered.length} of ${allJds.length} Roles`;
    }

    if (filtered.length === 0) {
      roleConfiguratorStrip.innerHTML = `<span style="font-size:13.5px; color:var(--apple-ink-muted-48); padding:8px 0;">No roles match "${activeSearchQuery}". Try another keyword or paste a custom job description below.</span>`;
      return;
    }

    filtered.forEach(jd => {
      const chip = document.createElement('button');
      chip.className = `configurator-chip ${activeJd && activeJd.id === jd.id ? 'selected' : ''}`;
      chip.innerHTML = `
        <span>${jd.title}</span>
        <span class="chip-domain-sub">• ${jd.domain}</span>
      `;
      chip.setAttribute('data-jdid', jd.id);

      chip.addEventListener('click', () => {
        selectRole(jd);
      });

      roleConfiguratorStrip.appendChild(chip);
    });
  }

  function selectRole(jd) {
    activeJd = jd;

    // Update chips active state
    document.querySelectorAll('.configurator-chip').forEach(c => {
      c.classList.toggle('selected', c.getAttribute('data-jdid') === jd.id);
    });

    // Sync ATS select & searchable combobox input
    if (atsTargetJdSelect) {
      atsTargetJdSelect.value = jd.id;
    }
    if (atsRoleSearchInput && document.activeElement !== atsRoleSearchInput) {
      atsRoleSearchInput.value = jd.title;
    }
    renderAtsDropdownItems();

    updateJdBanner(activeJd);
    rerankCandidates();

    if (parsedUploadedText) {
      runAtsAudit(parsedUploadedText);
    }
  }

  function populateAtsTargetJdSelect() {
    if (!atsTargetJdSelect) return;
    atsTargetJdSelect.innerHTML = '';

    // Group by discipline
    const domainGroups = {};
    window.APP_DATA.jds.forEach(jd => {
      if (!domainGroups[jd.domain]) {
        domainGroups[jd.domain] = [];
      }
      domainGroups[jd.domain].push(jd);
    });

    for (const domain in domainGroups) {
      const optgroup = document.createElement('optgroup');
      optgroup.label = `─── ${domain.toUpperCase()} (${domainGroups[domain].length}) ───`;
      domainGroups[domain].forEach(jd => {
        const opt = document.createElement('option');
        opt.value = jd.id;
        opt.textContent = `${jd.title}`;
        if (activeJd && activeJd.id === jd.id) opt.selected = true;
        optgroup.appendChild(opt);
      });
      atsTargetJdSelect.appendChild(optgroup);
    }

    atsTargetJdSelect.addEventListener('change', (e) => {
      const found = window.APP_DATA.jds.find(j => j.id === e.target.value);
      if (found) {
        selectRole(found);
      }
    });
  }

  // =========================================================================
  // 2B. ATS SEARCHABLE COMBOBOX CONTROLLER
  // =========================================================================
  let atsRoleSearchQuery = '';
  let atsHighlightedIndex = -1;
  let currentAtsFilteredJds = [];

  function setupAtsSearchableCombobox() {
    if (!atsComboboxWrap || !atsRoleSearchInput) return;

    if (activeJd) {
      atsRoleSearchInput.value = activeJd.title;
    }

    // Toggle dropdown button
    if (atsRoleDropdownToggle) {
      atsRoleDropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAtsDropdown();
      });
    }

    // Clicking trigger box opens dropdown and focuses/selects text
    if (atsSearchTriggerBox) {
      atsSearchTriggerBox.addEventListener('click', (e) => {
        if (e.target !== atsRoleClearBtn && e.target !== atsRoleDropdownToggle) {
          openAtsDropdown();
          atsRoleSearchInput.focus();
          atsRoleSearchInput.select();
        }
      });
    }

    // Input events for live keystroke filtering
    atsRoleSearchInput.addEventListener('input', (e) => {
      atsRoleSearchQuery = e.target.value.trim().toLowerCase();
      if (atsRoleClearBtn) {
        atsRoleClearBtn.style.display = atsRoleSearchQuery ? 'inline-block' : 'none';
      }
      if (!atsComboboxWrap.classList.contains('open')) {
        openAtsDropdown();
      }
      renderAtsDropdownItems();
    });

    atsRoleSearchInput.addEventListener('focus', () => {
      openAtsDropdown();
      atsRoleSearchInput.select();
    });

    // Keyboard navigation (ArrowDown, ArrowUp, Enter, Escape)
    atsRoleSearchInput.addEventListener('keydown', (e) => {
      if (!atsComboboxWrap.classList.contains('open')) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
          openAtsDropdown();
          e.preventDefault();
        }
        return;
      }

      const items = atsDropdownScroll ? atsDropdownScroll.querySelectorAll('.ats-dropdown-item') : [];
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (items.length > 0) {
          atsHighlightedIndex = (atsHighlightedIndex + 1) % items.length;
          updateAtsHighlightedItem(items);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (items.length > 0) {
          atsHighlightedIndex = (atsHighlightedIndex - 1 + items.length) % items.length;
          updateAtsHighlightedItem(items);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (atsHighlightedIndex >= 0 && atsHighlightedIndex < currentAtsFilteredJds.length) {
          selectAtsRole(currentAtsFilteredJds[atsHighlightedIndex]);
        } else if (currentAtsFilteredJds.length > 0) {
          selectAtsRole(currentAtsFilteredJds[0]);
        }
      } else if (e.key === 'Escape') {
        closeAtsDropdown();
        if (activeJd) atsRoleSearchInput.value = activeJd.title;
      }
    });

    // Clear search button
    if (atsRoleClearBtn) {
      atsRoleClearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        atsRoleSearchInput.value = '';
        atsRoleSearchQuery = '';
        atsRoleClearBtn.style.display = 'none';
        atsRoleSearchInput.focus();
        renderAtsDropdownItems();
      });
    }

    // Click outside to dismiss dropdown
    document.addEventListener('click', (e) => {
      if (!atsComboboxWrap.contains(e.target)) {
        closeAtsDropdown();
        if (activeJd) {
          atsRoleSearchInput.value = activeJd.title;
          atsRoleSearchQuery = '';
          if (atsRoleClearBtn) atsRoleClearBtn.style.display = 'none';
        }
      }
    });

    renderAtsDropdownItems();
  }

  function openAtsDropdown() {
    if (!atsComboboxWrap) return;
    atsComboboxWrap.classList.add('open');
    atsHighlightedIndex = -1;
    renderAtsDropdownItems();
  }

  function closeAtsDropdown() {
    if (!atsComboboxWrap) return;
    atsComboboxWrap.classList.remove('open');
    atsHighlightedIndex = -1;
  }

  function toggleAtsDropdown() {
    if (!atsComboboxWrap) return;
    if (atsComboboxWrap.classList.contains('open')) {
      closeAtsDropdown();
      if (activeJd) atsRoleSearchInput.value = activeJd.title;
    } else {
      openAtsDropdown();
      atsRoleSearchInput.focus();
      atsRoleSearchInput.select();
    }
  }

  function updateAtsHighlightedItem(items) {
    items.forEach((item, idx) => {
      item.classList.toggle('highlighted', idx === atsHighlightedIndex);
      if (idx === atsHighlightedIndex) {
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }

  function renderAtsDropdownItems() {
    if (!atsDropdownScroll) return;
    atsDropdownScroll.innerHTML = '';

    const allJds = window.APP_DATA.jds;
    const query = atsRoleSearchQuery;

    const filtered = allJds.filter(jd => {
      if (!query) return true;
      const haystack = `${jd.title} ${jd.domain} ${(jd.required_skills || []).join(' ')} ${(jd.preferred_skills || []).join(' ')}`.toLowerCase();
      return haystack.includes(query);
    });

    currentAtsFilteredJds = filtered;

    if (atsDropdownCountLabel) {
      atsDropdownCountLabel.textContent = query 
        ? `${filtered.length} of ${allJds.length} Matches` 
        : `${allJds.length} Roles Across All Disciplines`;
    }

    if (filtered.length === 0) {
      atsDropdownScroll.innerHTML = `
        <div class="ats-dropdown-empty">
          <div>🔍 No roles found matching "<strong>${escapeHtml(query)}</strong>"</div>
          <div style="font-size:12px; margin-top:4px; opacity:0.7;">Try searching by discipline (e.g. Mech, Civil, CA, Finance, HR) or technology (e.g. SolidWorks, Python, Tally).</div>
        </div>
      `;
      return;
    }

    if (query) {
      // Flat list when actively searching for quick discovery
      filtered.forEach((jd, idx) => {
        const item = createAtsDropdownItem(jd, idx);
        atsDropdownScroll.appendChild(item);
      });
    } else {
      // Grouped by discipline when browsing
      const domainGroups = {};
      filtered.forEach(jd => {
        if (!domainGroups[jd.domain]) domainGroups[jd.domain] = [];
        domainGroups[jd.domain].push(jd);
      });

      let overallIdx = 0;
      for (const domain in domainGroups) {
        const label = document.createElement('div');
        label.className = 'ats-optgroup-label';
        label.textContent = `${domain} (${domainGroups[domain].length})`;
        atsDropdownScroll.appendChild(label);

        domainGroups[domain].forEach(jd => {
          const item = createAtsDropdownItem(jd, overallIdx);
          overallIdx++;
          atsDropdownScroll.appendChild(item);
        });
      }
    }
  }

  function createAtsDropdownItem(jd, index) {
    const isSelected = activeJd && activeJd.id === jd.id;
    const item = document.createElement('div');
    item.className = `ats-dropdown-item ${isSelected ? 'selected' : ''}`;
    item.setAttribute('data-jdid', jd.id);
    item.setAttribute('data-idx', index);

    const skillsSnippet = (jd.required_skills || []).slice(0, 5).join(' • ');

    item.innerHTML = `
      <div class="ats-item-title-row">
        <span class="ats-item-title">${isSelected ? '✓ ' : ''}${escapeHtml(jd.title)}</span>
        <span class="ats-item-domain-badge">${escapeHtml(jd.domain)}</span>
      </div>
      <div class="ats-item-skills">${skillsSnippet ? `Core: ${escapeHtml(skillsSnippet)}` : ''}</div>
    `;

    item.addEventListener('click', () => {
      selectAtsRole(jd);
    });

    item.addEventListener('mouseenter', () => {
      atsHighlightedIndex = index;
      const items = atsDropdownScroll.querySelectorAll('.ats-dropdown-item');
      items.forEach((it, i) => it.classList.toggle('highlighted', i === index));
    });

    return item;
  }

  function selectAtsRole(jd) {
    if (atsRoleSearchInput) {
      atsRoleSearchInput.value = jd.title;
    }
    atsRoleSearchQuery = '';
    if (atsRoleClearBtn) atsRoleClearBtn.style.display = 'none';
    closeAtsDropdown();
    selectRole(jd);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // =========================================================================
  // 3. CUSTOM JOB DESCRIPTION COMPOSER
  // =========================================================================
  function setupCustomJdComposer() {
    if (!toggleCustomJdBtn || !customJdBox) return;

    toggleCustomJdBtn.addEventListener('click', () => {
      const isVisible = customJdBox.classList.contains('active');
      customJdBox.classList.toggle('active', !isVisible);
      if (!isVisible) {
        customJdTitle.focus();
      }
    });

    if (closeCustomJdBtn) {
      closeCustomJdBtn.addEventListener('click', () => {
        customJdBox.classList.remove('active');
      });
    }

    if (applyCustomJdBtn) {
      applyCustomJdBtn.addEventListener('click', () => {
        const title = (customJdTitle.value || "").trim() || "Custom Industry Benchmark Role";
        const domain = (customJdDomain.value || "").trim() || "Custom Domain";
        const text = (customJdText.value || "").trim();

        if (!text || text.length < 30) {
          alert("Please paste a meaningful job description (at least 30 characters) so the NLP engine can extract technical requirements.");
          return;
        }

        // Extract skills dynamically using NLP engine
        const extractedSkills = nlpEngine.extractSkills(text);
        const requiredSkills = extractedSkills.length > 0 ? extractedSkills.slice(0, 8) : ["analytical skills", "communication", "problem solving"];
        const preferredSkills = extractedSkills.slice(8, 14);

        const customJdObj = {
          id: `JD_CUSTOM_${Date.now()}`,
          title: title,
          domain: domain,
          min_experience_years: 3,
          required_skills: requiredSkills,
          preferred_skills: preferredSkills,
          description: text,
          ground_truth_relevance: {}
        };

        // Add to global datasets
        window.APP_DATA.jds.unshift(customJdObj);
        nlpEngine.jds.unshift(customJdObj);

        renderDomainFilterPills();
        populateAtsTargetJdSelect();
        renderFilteredRoleChips();
        selectRole(customJdObj);

        customJdBox.classList.remove('active');
        customJdText.value = '';
        customJdTitle.value = '';
        customJdDomain.value = '';

        alert(`✅ Custom Job Description "${title}" successfully integrated! Reranked ${window.APP_DATA.resumes.length} candidates and calibrated ATS checker with ${requiredSkills.length} extracted skills.`);
      });
    }
  }

  function getBestSampleResumeForJd(jd) {
    if (!jd) return window.APP_DATA.resumes[0];

    // Check ground truth first
    if (jd.ground_truth_relevance) {
      for (const resId in jd.ground_truth_relevance) {
        if (jd.ground_truth_relevance[resId] === 3) {
          const match = window.APP_DATA.resumes.find(r => r.id === resId);
          if (match) return match;
        }
      }
    }

    // Check domain keywords
    const domainWords = (jd.domain || "").toLowerCase().split(/[\s&,/]+/);
    const domainMatch = window.APP_DATA.resumes.find(r => {
      const rDomain = (r.target_domain || "").toLowerCase();
      return domainWords.some(w => w.length > 2 && rDomain.includes(w));
    });
    if (domainMatch) return domainMatch;

    return window.APP_DATA.resumes[0];
  }

  function updateJdBanner(jd) {
    if (!jdDetailTitle) return;
    jdDetailTitle.textContent = jd.title;
    jdDomainTag.textContent = `${jd.domain} • ${jd.min_experience_years || 0}+ yrs exp`;
    jdSnippet.textContent = jd.description;

    jdSkillsChips.innerHTML = '';
    (jd.required_skills || []).forEach(s => {
      const pill = document.createElement('span');
      pill.className = 'apple-skill-tag satisfied';
      pill.textContent = `★ ${s}`;
      jdSkillsChips.appendChild(pill);
    });
    (jd.preferred_skills || []).forEach(s => {
      const pill = document.createElement('span');
      pill.className = 'apple-skill-tag';
      pill.textContent = s;
      jdSkillsChips.appendChild(pill);
    });

    if (loadSampleResumeBtn) {
      const sample = getBestSampleResumeForJd(jd);
      loadSampleResumeBtn.textContent = `✨ Test with Sample Candidate Resume (${sample.name} · ${sample.target_domain})`;
    }
  }

  // =========================================================================
  // 4. CANDIDATE RANKING & APPLE STORE UTILITY CARDS
  // =========================================================================
  function rerankCandidates() {
    const t0 = performance.now();
    currentRankedCandidates = nlpEngine.rankCandidates(
      window.APP_DATA.resumes,
      activeJd,
      currentWeights
    );
    const elapsed = (performance.now() - t0).toFixed(1);

    if (latencyNum) latencyNum.textContent = `${elapsed} ms`;
    renderCandidates();
  }

  function renderCandidates() {
    if (!candidatesContainer) return;
    candidatesContainer.innerHTML = '';

    currentRankedCandidates.forEach((cand, idx) => {
      const rank = idx + 1;
      const scorePct = (cand.hybrid_score * 100).toFixed(1);

      const card = document.createElement('div');
      card.className = 'store-utility-card';

      card.innerHTML = `
        <div>
          <div class="card-top-identity">
            <div class="card-avatar-initials">${getInitials(cand.name)}</div>
            <div class="card-score-box">
              <div class="card-score-num">${scorePct}%</div>
              <div class="card-score-lbl">Composite Match</div>
            </div>
          </div>

          <div class="card-candidate-name">${cand.name} ${cand.isAdversarial ? '<span style="color:#ff3b30; font-size:12px;">[Spammer Detected]</span>' : ''}</div>
          <div class="card-candidate-role">${cand.domain} • ${cand.experience_years} years experience</div>

          <div class="card-meters-list">
            <div class="card-meter-row">
              <span>S-BERT Semantic:</span>
              <span class="card-meter-val">${(cand.semantic_score * 100).toFixed(0)}%</span>
            </div>
            <div class="card-meter-row">
              <span>BM25 Lexical:</span>
              <span class="card-meter-val">${(cand.lexical_score * 100).toFixed(0)}%</span>
            </div>
            <div class="card-meter-row">
              <span>Hard Skills Met:</span>
              <span class="card-meter-val">${(cand.req_recall * 100).toFixed(0)}%</span>
            </div>
          </div>

          <div class="card-skills-cluster">
            ${cand.matched_required.slice(0, 3).map(s => `<span class="apple-skill-tag satisfied">✓ ${s}</span>`).join('')}
            ${cand.missing_required.slice(0, 2).map(s => `<span class="apple-skill-tag missing">✕ ${s}</span>`).join('')}
            ${cand.missing_required.length > 2 ? `<span class="apple-skill-tag">+${cand.missing_required.length - 2} more</span>` : ''}
          </div>
        </div>

        <div class="card-footer-action">
          <span class="card-rank-text">Rank #${rank}</span>
          <button class="apple-link inspect-cand-btn" data-cid="${cand.id}" style="background:none; border:none; cursor:pointer;">Inspect Profile →</button>
        </div>
      `;

      card.querySelector('.inspect-cand-btn').addEventListener('click', () => {
        openCandidateDrawer(cand);
      });

      candidatesContainer.appendChild(card);
    });
  }

  function getInitials(name) {
    if (!name) return "CV";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // =========================================================================
  // 5. MODEL CALIBRATION SLIDERS
  // =========================================================================
  function setupSliders() {
    if (!sliderAlpha || !sliderBeta || !sliderGamma) return;

    function onSliderChange() {
      const a = parseFloat(sliderAlpha.value);
      const b = parseFloat(sliderBeta.value);
      const c = parseFloat(sliderGamma.value);

      const sum = a + b + c;
      if (sum > 0) {
        currentWeights.alpha = a / sum;
        currentWeights.beta = b / sum;
        currentWeights.gamma = c / sum;
      }

      valAlpha.textContent = `${(currentWeights.alpha * 100).toFixed(0)}%`;
      valBeta.textContent = `${(currentWeights.beta * 100).toFixed(0)}%`;
      valGamma.textContent = `${(currentWeights.gamma * 100).toFixed(0)}%`;

      rerankCandidates();
    }

    sliderAlpha.addEventListener('input', onSliderChange);
    sliderBeta.addEventListener('input', onSliderChange);
    sliderGamma.addEventListener('input', onSliderChange);

    resetWeightsBtn.addEventListener('click', () => {
      sliderAlpha.value = 0.50;
      sliderBeta.value = 0.20;
      sliderGamma.value = 0.30;
      currentWeights = { alpha: 0.50, beta: 0.20, gamma: 0.30 };
      valAlpha.textContent = '50%';
      valBeta.textContent = '20%';
      valGamma.textContent = '30%';
      rerankCandidates();
    });
  }

  // =========================================================================
  // 6. ATS RESUME HEALTH CHECKER (PDF / DOCX / TXT)
  // =========================================================================
  function setupFileUpload() {
    if (!dropzoneContainer) return;

    dropzoneContainer.addEventListener('click', () => {
      resumeFileInput.click();
    });

    dropzoneContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzoneContainer.classList.add('dragover');
    });

    dropzoneContainer.addEventListener('dragleave', () => {
      dropzoneContainer.classList.remove('dragover');
    });

    dropzoneContainer.addEventListener('drop', async (e) => {
      e.preventDefault();
      dropzoneContainer.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length) {
        handleFileSelection(e.dataTransfer.files[0]);
      }
    });

    resumeFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length) {
        handleFileSelection(e.target.files[0]);
      }
    });

    reuploadBtn.addEventListener('click', () => {
      resumeFileInput.value = '';
      resumeFileInput.click();
    });

    loadSampleResumeBtn.addEventListener('click', () => {
      loadSampleResume();
    });
  }

  async function handleFileSelection(file) {
    const fileName = file.name;
    const fileExt = fileName.split('.').pop().toLowerCase();

    uploadedFileName.textContent = fileName;
    uploadedFileMeta.textContent = `Extracting text client-side (${(file.size / 1024).toFixed(1)} KB)...`;
    uploadedFileBanner.classList.add('active');

    try {
      let extractedText = "";

      if (fileExt === 'pdf') {
        extractedText = await parsePdfFile(file);
      } else if (fileExt === 'docx') {
        extractedText = await parseDocxFile(file);
      } else {
        extractedText = await parseTxtFile(file);
      }

      if (!extractedText || extractedText.trim().length < 40) {
        throw new Error("Unable to parse text. The document may be empty, image-based, or password protected.");
      }

      parsedUploadedText = extractedText;
      const wordCount = extractedText.trim().split(/\s+/).length;
      uploadedFileMeta.textContent = `Successfully parsed • ${wordCount} words extracted`;

      runAtsAudit(extractedText);
    } catch (err) {
      console.error(err);
      uploadedFileMeta.textContent = `Error: ${err.message}`;
      alert(`Parsing failed: ${err.message}`);
    }
  }

  async function parsePdfFile(file) {
    if (!window.pdfjsLib) throw new Error("PDF.js library is not loaded.");
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;

    let fullText = "";
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const content = await page.getTextContent();
      const pageStrings = content.items.map(item => item.str);
      fullText += pageStrings.join(" ") + "\n";
    }
    return fullText;
  }

  async function parseDocxFile(file) {
    if (!window.mammoth) throw new Error("Mammoth DOCX parser is not loaded.");
    const arrayBuffer = await file.arrayBuffer();
    const result = await window.mammoth.extractRawText({ arrayBuffer: arrayBuffer });
    return result.value;
  }

  async function parseTxtFile(file) {
    return await file.text();
  }

  function loadSampleResume() {
    const sample = getBestSampleResumeForJd(activeJd);
    const fullText = nlpEngine.getResumeFullText(sample);
    parsedUploadedText = fullText;

    uploadedFileName.textContent = `${sample.name.replace(/\s+/g, '_')}_Resume.docx`;
    uploadedFileMeta.textContent = `Pre-loaded sample candidate (${sample.name} • ${sample.target_domain}) • ${fullText.split(/\s+/).length} words`;
    uploadedFileBanner.classList.add('active');

    runAtsAudit(fullText);
  }

  function runAtsAudit(resumeText) {
    const targetJd = activeJd || window.APP_DATA.jds[0];
    const audit = nlpEngine.auditResumeATS(resumeText, targetJd);
    if (!audit) return;

    atsResultsGrid.classList.add('active');

    // Circular SVG Gauge Animation
    const score = audit.totalAtsScore;
    atsScoreVal.textContent = score;

    const circumference = 377; // 2 * PI * 60
    const offset = circumference - (circumference * (score / 100));
    svgGaugeFill.style.strokeDashoffset = offset;

    if (score >= 80) {
      svgGaugeFill.style.stroke = "#34c759";
      atsStatusBadge.className = 'ats-verdict-chip pass';
    } else if (score >= 60) {
      svgGaugeFill.style.stroke = "#ff9500";
      atsStatusBadge.className = 'ats-verdict-chip warn';
    } else {
      svgGaugeFill.style.stroke = "#ff3b30";
      atsStatusBadge.className = 'ats-verdict-chip fail';
    }

    atsStatusBadge.textContent = audit.statusRating;

    atsStatWords.textContent = audit.wordCount;
    atsStatVerbs.textContent = `${audit.verbCount} verbs`;
    atsStatMetrics.textContent = `${audit.metricCount} metrics`;
    atsStatSkills.textContent = `${audit.matchedRequired.length}/${(targetJd.required_skills || []).length}`;

    scoreCatSections.textContent = `${audit.sectionScore} / 25 pts`;
    scoreCatKeywords.textContent = `${audit.keywordScore} / 35 pts`;
    scoreCatImpact.textContent = `${audit.impactScore} / 20 pts`;
    scoreCatLength.textContent = `${audit.lengthScore} / 20 pts`;

    // 1. Sections checklist
    sectionChecklistItems.innerHTML = audit.sectionChecks.map(c => `
      <div class="audit-check-row">
        <span class="check-icon-apple ${c.present ? 'pass' : 'fail'}">${c.present ? '✓' : '✕'}</span>
        <div>
          <div class="check-desc-title">${c.name} (${c.weight} pts)</div>
          <div class="check-desc-sub">${c.present ? 'Identified and structured properly.' : 'Missing. Adding this section improves ATS pass rate.'}</div>
        </div>
      </div>
    `).join('');

    // 2. Keywords
    atsMatchedSkillsPills.innerHTML = audit.matchedRequired.length
      ? audit.matchedRequired.map(s => `<span class="apple-skill-tag satisfied">✓ ${s}</span>`).join('')
      : '<span style="font-size:13px; color:var(--apple-body-muted);">No mandatory keywords matched yet</span>';

    atsMissingSkillsPills.innerHTML = audit.missingRequired.length
      ? audit.missingRequired.map(s => `<span class="apple-skill-tag missing" title="Click to copy" onclick="navigator.clipboard.writeText('${s}')">✕ ${s}</span>`).join('')
      : '<span class="apple-skill-tag satisfied">✓ All mandatory keywords fulfilled!</span>';

    // 3. Impact verbs
    atsImpactDetails.innerHTML = `
      <div style="margin-bottom:6px;">High-Value Action Verbs (${audit.verbCount}): <strong style="color:#ffffff;">${audit.matchedVerbs.slice(0, 7).join(', ') || 'None detected'}</strong></div>
      <div>Quantified Achievements (${audit.metricCount}): <strong style="color:#ffffff;">${audit.matchedMetrics.join(', ') || 'No metrics (%/$) detected'}</strong></div>
      <div style="font-size:12.5px; color:var(--apple-body-muted); margin-top:6px;">Tip: Enhance bullet points with action verbs and quantifiable results (e.g., 'reduced inference latency by 42%').</div>
    `;

    // 4. Length
    atsLengthDetails.innerHTML = `
      <div><strong style="color:#ffffff;">${audit.lengthFeedback}</strong></div>
      <div style="font-size:12.5px; color:var(--apple-body-muted); margin-top:4px;">Optimal ATS standard: 400 to 1,000 words.</div>
    `;
  }

  // =========================================================================
  // 7. CANDIDATE DETAIL OFFCANVAS DRAWER
  // =========================================================================
  function setupDrawer() {
    closeDrawerBtn.addEventListener('click', closeCandidateDrawer);
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) closeCandidateDrawer();
    });
  }

  function openCandidateDrawer(cand) {
    drawerCandidateName.textContent = cand.name;
    drawerCandidateMeta.textContent = `${cand.domain} • ${cand.experience_years} years experience • ${cand.education}`;

    drawerScoreHybrid.textContent = `${(cand.hybrid_score * 100).toFixed(1)}%`;
    drawerScoreSemantic.textContent = `${(cand.semantic_score * 100).toFixed(1)}%`;
    drawerScoreLexical.textContent = `${(cand.lexical_score * 100).toFixed(1)}%`;

    drawerMatchedSkills.innerHTML = cand.matched_required.length
      ? cand.matched_required.map(s => `<span class="apple-skill-tag satisfied">✓ ${s}</span>`).join('')
      : '<span style="font-size:13px; color:var(--apple-ink-muted-48);">No mandatory skills matched</span>';

    drawerMissingSkills.innerHTML = cand.missing_required.length
      ? cand.missing_required.map(s => `<span class="apple-skill-tag missing">✕ ${s}</span>`).join('')
      : '<span class="apple-skill-tag satisfied">✓ 100% Mandatory Skills Satisfied</span>';

    const fullCand = window.APP_DATA.resumes.find(r => r.id === cand.id);
    drawerResumeText.textContent = fullCand ? nlpEngine.getResumeFullText(fullCand) : cand.summary;

    drawerBackdrop.classList.add('active');
  }

  function closeCandidateDrawer() {
    drawerBackdrop.classList.remove('active');
  }

  // Self Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
