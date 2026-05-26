document.addEventListener('DOMContentLoaded', () => {

  // --- 1. スムーススクロール機能 (View Moreボタン) ---
  const menuLink = document.querySelector('.btn-main');
  if (menuLink) {
    menuLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = menuLink.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }


  // --- 2. スクロール連動フェードインアニメーション (Intersection Observer) ---
  const menuItems = document.querySelectorAll('.menu-item');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // 要素が15%画面内に入った時点で発火
  };

  const showItem = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // パフォーマンス向上のため、一度表示されたら監視を解除
      }
    });
  };

  const observer = new IntersectionObserver(showItem, observerOptions);
  menuItems.forEach(item => observer.observe(item));


  // --- 3. アコーディオンUI (FAQセクション) ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      if (answer) {
        answer.classList.toggle('open');
        question.classList.toggle('active');
      }
    });
  });


  // --- 4. ダークモード切り替え機能 ---
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      
      // ボタン内テキストの動的切り替え
      if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️ 昼のモードにする';
      } else {
        themeToggle.textContent = '🌙 夜のモードにする';
      }
    });
  }

});