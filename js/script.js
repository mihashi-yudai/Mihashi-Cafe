document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. スムーススクロール機能 (Heroエリア内 View Moreボタン用)
  // ==========================================================================
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


  // ==========================================================================
  // 2. スクロール連動フェードインアニメーション (Intersection Observer)
  // ==========================================================================
  const menuItems = document.querySelectorAll('.menu-item');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // 要素が15%画面内に入った時点でイベント発火
  };

  const showItem = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // パフォーマンス向上のため、描画後は監視を解除
      }
    });
  };

  const observer = new IntersectionObserver(showItem, observerOptions);
  menuItems.forEach(item => observer.observe(item));


  // ==========================================================================
  // 3. メニュー詳細表示機能 (LP用インラインアコーディオン)
  // ==========================================================================
  const menuMoreButtons = document.querySelectorAll('.item-text .btn-text');
  
  menuMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // リンク本来のデフォルト挙動をキャンセル
      
      // ボタンの直後に配置されている詳細エリア（.menu-detail）を取得
      const detailArea = button.nextElementSibling;
      
      if (detailArea && detailArea.classList.contains('menu-detail')) {
        detailArea.classList.toggle('open');
        
        // トグル状態に応じてボタンのテキスト表現を動的に切り替え
        if (detailArea.classList.contains('open')) {
          button.textContent = 'ー Close';
        } else {
          button.textContent = '+ View More';
        }
      }
    });
  });


  // ==========================================================================
  // 4. アコーディオンUI (FAQセクション用)
  // ==========================================================================
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


  // ==========================================================================
  // 5. ダークモード切り替え機能 (カラーテーマ選択)
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      
      // 反映されているテーマ状態に応じてボタン内テキストを同期
      if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️ 昼のモードにする';
      } else {
        themeToggle.textContent = '🌙 夜のモードにする';
      }
    });
  }

});