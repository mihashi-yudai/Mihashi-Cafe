document.addEventListener('DOMContentLoaded', () => {
 
  // --- 1. スムーススクロール (View Moreボタン用) ---
  const menuLink = document.querySelector('.btn-main');
  if (menuLink) {
    menuLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = menuLink.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
 
 
  // --- 2. スクロール連動ふわっとアニメーション (Intersection Observer) ---
  const menuItems = document.querySelectorAll('.menu-item');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // 15%画面に入ったら実行
  };
 
  const showItem = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // 一度表示されたら監視を解除して軽量化
      }
    });
  };
 
  const observer = new IntersectionObserver(showItem, observerOptions);
  menuItems.forEach(item => observer.observe(item));
 
 
  // --- 3. メイン画像のパララックス効果（視差効果） ---
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage && window.innerWidth > 768) { // PC時のみ動作させて負荷軽減
    window.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth) - 0.5;
      const mouseY = (e.clientY / window.innerHeight) - 0.5;
      heroImage.style.transform = `translate(${mouseX * -25}px, ${mouseY * -25}px)`;
    });
  }
 
 
  // --- 4. 自作アコーディオンUI (FAQセクション) ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      answer.classList.toggle('open');
      question.classList.toggle('active');
    });
  });
 
 
  // --- 5. ダークモード（テーマ切り替え機能） ---
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      
      if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️ 昼のモードにする';
      } else {
        themeToggle.textContent = '🌙 夜のモードにする';
      }
    });
  }
 
});
 