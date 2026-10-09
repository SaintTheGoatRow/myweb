document.addEventListener('DOMContentLoaded', () => {

   
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.setAttribute('novalidate', 'true');

        const previewContainer = document.createElement('div');
        previewContainer.id = 'form-preview';
        previewContainer.style.marginTop = '1.5rem';
        previewContainer.style.padding = '1.25rem';
        previewContainer.style.border = '2px dashed var(--accent-color)';
        previewContainer.style.borderRadius = 'var(--radius-sm)';
        previewContainer.style.backgroundColor = 'var(--bg-color)';
        previewContainer.hidden = true;
        contactForm.after(previewContainer);

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            document.querySelectorAll('.error-feedback').forEach(el => el.remove());
            previewContainer.hidden = true;
            previewContainer.textContent = '';

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const topicInput = document.getElementById('topic');
            const messageInput = document.getElementById('message');

            const nameValue = nameInput ? nameInput.value.trim() : '';
            const emailValue = emailInput ? emailInput.value.trim() : '';
            const topicValue = topicInput ? topicInput.value : '';
            const messageValue = messageInput ? messageInput.value.trim() : '';

            let isValid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (nameValue === '') {
                showFieldError(nameInput, 'Name is required and cannot be blank or whitespace only.');
                isValid = false;
            }

            if (!emailRegex.test(emailValue)) {
                showFieldError(emailInput, 'Please enter a valid email address (e.g., user@domain.com).');
                isValid = false;
            }

            if (messageValue === '') {
                showFieldError(messageInput, 'Message is required and cannot be blank or whitespace only.');
                isValid = false;
            }

            if (isValid) {
                const heading = document.createElement('h3');
                heading.textContent = 'Submission Preview';
                heading.style.color = 'var(--accent-color)';
                heading.style.marginBottom = '0.5rem';

                const disclaimer = document.createElement('p');
                disclaimer.style.fontSize = '0.85rem';
                disclaimer.style.color = 'var(--muted-color)';
                disclaimer.style.marginBottom = '0.75rem';
                disclaimer.textContent = 'Browser demonstration only. Data was validated locally and no message was sent.';

                const detailsList = document.createElement('ul');
                detailsList.style.listStyle = 'none';
                detailsList.style.fontSize = '0.9rem';

                const nameItem = document.createElement('li');
                nameItem.textContent = `Name: ${nameValue}`;
                nameItem.style.padding = '0.25rem 0';

                const emailItem = document.createElement('li');
                emailItem.textContent = `Email: ${emailValue}`;
                emailItem.style.padding = '0.25rem 0';

                const topicItem = document.createElement('li');
                topicItem.textContent = `Topic: ${topicValue}`;
                topicItem.style.padding = '0.25rem 0';

                const messageItem = document.createElement('li');
                messageItem.textContent = `Message: ${messageValue}`;
                messageItem.style.padding = '0.25rem 0';

                detailsList.appendChild(nameItem);
                detailsList.appendChild(emailItem);
                detailsList.appendChild(topicItem);
                detailsList.appendChild(messageItem);

                previewContainer.appendChild(heading);
                previewContainer.appendChild(disclaimer);
                previewContainer.appendChild(detailsList);

                previewContainer.hidden = false;
                previewContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                contactForm.reset();
            }
        });
    }

    function showFieldError(inputElement, message) {
        if (!inputElement) return;
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-feedback';
        errorSpan.style.color = '#dc2626';
        errorSpan.style.fontSize = '0.82rem';
        errorSpan.style.fontWeight = '600';
        errorSpan.style.marginTop = '0.25rem';
        errorSpan.style.display = 'block';
        errorSpan.textContent = message;
        inputElement.after(errorSpan);
        inputElement.focus();
    }


   
    const learningSection = document.querySelector('#learning .section-container');
    let calcCard;
    if (learningSection) {
        calcCard = document.createElement('div');
        calcCard.className = 'calc-card';
        calcCard.style.marginTop = '2rem';
        calcCard.style.padding = '1.25rem';
        calcCard.style.border = '1px solid var(--border-color)';
        calcCard.style.borderRadius = 'var(--radius-sm)';
        calcCard.style.transition = 'all 0.25s ease';

        calcCard.innerHTML = `
            <h3 class="calc-title" style="margin-bottom: 0.5rem;">Study Hours Calculator</h3>
            <p class="calc-desc" style="margin-bottom: 1rem;">Calculate weekly planned study time for modules:</p>
            <div style="display:flex; flex-direction:column; gap:0.35rem; margin-bottom:1rem;">
                <label for="calc-hours" class="calc-label" style="font-size:0.9rem; font-weight:600;">Planned hours per day:</label>
                <input type="number" id="calc-hours" min="1" max="24" step="1" placeholder="e.g. 2" style="padding:0.5rem; border:1px solid var(--border-color); border-radius:var(--radius-sm); max-width:200px;">
            </div>
            <div style="display:flex; flex-direction:column; gap:0.35rem; margin-bottom:1rem;">
                <label for="calc-days" class="calc-label" style="font-size:0.9rem; font-weight:600;">Days per week (1 to 7):</label>
                <input type="number" id="calc-days" min="1" max="7" placeholder="e.g. 5" style="padding:0.5rem; border:1px solid var(--border-color); border-radius:var(--radius-sm); max-width:200px;">
            </div>
            <button id="btn-calc-hours" class="btn btn-primary">Calculate Hours</button>
            <div id="calc-output" style="margin-top:1rem; font-weight:600; font-size:0.92rem;" hidden></div>
        `;

        learningSection.appendChild(calcCard);

        const calcBtn = document.getElementById('btn-calc-hours');
        const calcOutput = document.getElementById('calc-output');

        calcBtn.addEventListener('click', () => {
            const hoursVal = parseFloat(document.getElementById('calc-hours').value);
            const daysVal = parseInt(document.getElementById('calc-days').value, 10);

            if (isNaN(hoursVal) || isNaN(daysVal) || hoursVal < 1 || hoursVal > 24 || daysVal < 1 || daysVal > 7) {
                calcOutput.style.color = '#ef4444';
                calcOutput.textContent = 'Please enter valid hours (1-24) and days between (1-7).';
                calcOutput.hidden = false;
                return;
            }

            const total = hoursVal * daysVal;
            const isDark = document.body.style.backgroundColor === 'rgb(15, 23, 42)';
            calcOutput.style.color = isDark ? '#ffffff' : 'var(--text-color)';
            calcOutput.textContent = `Target Study Time: ${total} total hours per week (${hoursVal} hrs/day × ${daysVal} days).`;
            calcOutput.hidden = false;
        });
    }

 
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
        const themeBtn = document.createElement('button');
        themeBtn.className = 'btn';
        themeBtn.style.backgroundColor = 'var(--surface-color)';
        themeBtn.style.color = 'var(--text-color)';
        themeBtn.style.border = '1px solid var(--border-color)';
        themeBtn.style.padding = '0.35rem 0.75rem';
        themeBtn.style.fontSize = '0.85rem';
        themeBtn.innerHTML = '🌙 ';

        headerContainer.appendChild(themeBtn);

        themeBtn.addEventListener('click', () => {
            const isDark = document.body.style.backgroundColor === 'rgb(15, 23, 42)';

            if (!isDark) {
                // Apply Dark Mode
                document.body.style.backgroundColor = '#0f172a';
                document.body.style.color = '#ffffff';

                
                document.querySelectorAll('.section-container, .site-header, .site-footer, .hero-section, .hobby-card, .gallery-card, .media-card, figcaption, .media-transcript, .calc-card, .form-notice, .external-link, .site-logo, audio').forEach(el => {
                    el.style.backgroundColor = '#1e293b';
                    el.style.borderColor = '#334155';
                    el.style.color = '#ffffff';
                });

                
                document.querySelectorAll('h1, h2, h3, h4, p, li, td, th, label, caption, figcaption, blockquote, .site-logo, .hero-subtitle, .hero-motto, .section-intro, .media-desc, .calc-title, .calc-desc, .calc-label, .form-notice, .external-link, .site-logo').forEach(el => {
                    el.style.color = '#ffffff';
                });

                // Table Rows & Header Backgrounds
                document.querySelectorAll('.learning-table th').forEach(th => {
                    th.style.backgroundColor = '#0f172a';
                    th.style.borderColor = '#334155';
                });
                document.querySelectorAll('.learning-table tr').forEach(tr => {
                    tr.style.backgroundColor = '#1e293b';
                });

                // Form Inputs & Calculator Inputs
                document.querySelectorAll('input, select, textarea').forEach(el => {
                    el.style.backgroundColor = '#0f172a';
                    el.style.color = '#ffffff';
                    el.style.borderColor = '#334155';
                });

                // Navigation links
                document.querySelectorAll('.site-nav a').forEach(el => {
                    el.style.color = '#93c5fd';
                });

                themeBtn.style.backgroundColor = '#1e293b';
                themeBtn.style.color = '#ffffff';
                themeBtn.style.borderColor = '#334155';
                themeBtn.innerHTML = '☀️';

            } else {
                // Restore Light Mode Defaults
                document.body.style.backgroundColor = '';
                document.body.style.color = '';

                document.querySelectorAll('.section-container, .site-header, .site-footer, .hero-section, .hobby-card, .gallery-card, .media-card, figcaption, .media-transcript, .calc-card, .form-notice, .external-link, .site-logo, audio').forEach(el => {
                    el.style.backgroundColor = '';
                    el.style.borderColor = '';
                    el.style.color = '';
                });

                document.querySelectorAll('h1, h2, h3, h4, p, li, td, th, label, caption, figcaption, blockquote, .site-logo, .hero-subtitle, .hero-motto, .section-intro, .media-desc, .calc-title, .calc-desc, .calc-label').forEach(el => {
                    el.style.color = '';
                });

                document.querySelectorAll('.learning-table th, .learning-table tr').forEach(el => {
                    el.style.backgroundColor = '';
                    el.style.borderColor = '';
                });

                document.querySelectorAll('input, select, textarea').forEach(el => {
                    el.style.backgroundColor = '';
                    el.style.color = '';
                    el.style.borderColor = '';
                });

                document.querySelectorAll('.site-nav a').forEach(el => {
                    el.style.color = '';
                });

                themeBtn.style.backgroundColor = 'var(--surface-color)';
                themeBtn.style.color = 'var(--text-color)';
                themeBtn.style.borderColor = 'var(--border-color)';
                themeBtn.innerHTML = '🌙';
            }
        });
    }

    
    const revealSections = document.querySelectorAll('.reveal-section');
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealSections.forEach(sec => sectionObserver.observe(sec));
    } else {
        revealSections.forEach(sec => sec.classList.add('visible'));
    }
});

    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach((card) => {
        const hobbyInfo = card.querySelector('.hobby-info');
        if (hobbyInfo) {
            // Create hidden additional detail paragraph
            const extraDetails = document.createElement('p');
            extraDetails.className = 'expandable-detail';
            extraDetails.style.fontSize = '0.85rem';
            extraDetails.style.marginTop = '0.5rem';
            extraDetails.style.paddingTop = '0.5rem';
            extraDetails.style.borderTop = '1px dashed var(--border-color)';
            extraDetails.textContent = 'Key tools & workflow: Active practice using modern software design principles, version control, and continuous testing.';
            extraDetails.hidden = true;

            // Toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'btn toggle-detail-btn';
            toggleBtn.style.marginTop = '0.5rem';
            toggleBtn.style.padding = '0.25rem 0.6rem';
            toggleBtn.style.fontSize = '0.8rem';
            toggleBtn.style.backgroundColor = 'var(--surface-color)';
            toggleBtn.style.color = 'var(--text-color)';
            toggleBtn.style.border = '1px solid var(--border-color)';
            toggleBtn.textContent = '▼ Show More Details';

            toggleBtn.addEventListener('click', () => {
                const isHidden = extraDetails.hidden;
                extraDetails.hidden = !isHidden;
                toggleBtn.textContent = isHidden ? '▲ Hide Details' : '▼ Show More Details';
            });

            hobbyInfo.appendChild(extraDetails);
            hobbyInfo.appendChild(toggleBtn);
        }
    });
  document.addEventListener('DOMContentLoaded', () => {
            // Scroll Reveal Animation via Intersection Observer
            const revealSections = document.querySelectorAll('.reveal-section');

            if ('IntersectionObserver' in window) {
                const observerOptions = {
                    root: null,
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const sectionObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, observerOptions);

                revealSections.forEach(section => {
                    sectionObserver.observe(section);
                });
            } else {
                // Fallback for older browsers
                revealSections.forEach(section => section.classList.add('visible'));
            }
        });