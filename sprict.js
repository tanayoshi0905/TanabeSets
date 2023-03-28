// メニュー展開時に背景を固定
const backgroundFix = (bool) => {
  const scrollingElement = () => {
    const browser = window.navigator.userAgent.toLowerCase();
    if ("scrollingElement" in document) return document.scrollingElement;
    return document.documentElement;
  };

  const scrollY = bool
    ? scrollingElement().scrollTop
    : parseInt(document.body.style.top || "0");

  const fixedStyles = {
    height: "100vh",
    position: "fixed",
    top: `${scrollY * -1}px`,
    left: "0",
    width: "100vw"
  };

  Object.keys(fixedStyles).forEach((key) => {
    document.body.style[key] = bool ? fixedStyles[key] : "";
  });

  if (!bool) {
    window.scrollTo(0, scrollY * -1);
  }
};

// 変数定義
const CLASS = "-active";
let flg = false;
let accordionFlg = false;

let humberger = document.getElementById("js-humberger");
let focusTrap = document.getElementById("js-focus-trap");
let menu = document.querySelector(".js-nav-area");
let accordionTrigger = document.querySelectorAll(".js-sp-accordion-trigger");
let accordion = document.querySelectorAll(".js-sp-accordion");

// メニュー開閉制御
humberger.addEventListener("click", (e) => { //ハンバーガーボタンが選択されたら
  e.currentTarget.classList.toggle(CLASS);
  menu.classList.toggle(CLASS);
  if (flg) {// flgの状態で制御内容を切り替え
    backgroundFix(false);
    humberger.setAttribute("aria-expanded", "false");
    humberger.focus();
    flg = false;
  } else {
    backgroundFix(true);
    humberger.setAttribute("aria-expanded", "true");
    flg = true;
  }
});
window.addEventListener("keydown", () => {　//escキー押下でメニューを閉じられるように
  if (event.key === "Escape") {
    humberger.classList.remove(CLASS);
    menu.classList.remove(CLASS);

    backgroundFix(false);
    humberger.focus();
    humberger.setAttribute("aria-expanded", "false");
    flg = false;
  }
});

// メニュー内アコーディオン制御
accordionTrigger.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle(CLASS);
    e.currentTarget.nextElementSibling.classList.toggle(CLASS);
    if (accordionFlg) {
      e.currentTarget.setAttribute("aria-expanded", "false");
      accordionFlg = false;
    } else {
      e.currentTarget.setAttribute("aria-expanded", "true");
      accordionFlg = true;
    }
  });

});

// フォーカストラップ制御
focusTrap.addEventListener("focus", (e) => {
  humberger.focus();
});




let start_position = 0,     //初期位置０
    window_position,
    $window = $(window),
    $header = $('header'),
    $footer = $('footer');

// スクロールイベントを設定
$window.on( 'scroll' , function(){
    // スクロール量の取得
    window_position = $(this).scrollTop();

    // スクロール量が初期位置より小さければ，
    // 上にスクロールしているのでヘッダーフッターを出現させる
    if (window_position <= start_position) {
        $header.css('top','0');
        $footer.css('bottom','0');
    } else {
        $header.css('top','-70px');
        $footer.css('bottom','-70px');
    }
    // 現在の位置を更新する
    start_position = window_position;
    
});
// 中途半端なところでロードされても良いようにスクロールイベントを発生させる
$window.trigger('scroll');
