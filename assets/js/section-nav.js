// Section menus (see assets/css/section-nav.css): each one sticks just below the fixed
// header, whatever the header's height, while its own section is on screen, and
// highlights the pill of the subsection being read. A page may have several menus.
(function () {
	var header = document.getElementById('header');
	var navs = [].slice.call(document.querySelectorAll('.section-nav'));
	if (!header || !navs.length) return;

	function place() {
		document.documentElement.style.setProperty('--nav-offset', header.getBoundingClientRect().height + 'px');
	}
	function update() {
		var h = header.getBoundingClientRect().height;
		var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
		navs.forEach(function (nav) {
			var top = nav.getBoundingClientRect().top;
			nav.classList.toggle('stuck', window.scrollY > 0 && Math.abs(top - h) < 1);
			var pills = [].slice.call(nav.querySelectorAll('a.pill'));
			var line = nav.getBoundingClientRect().bottom + 40, cur = pills[0];
			pills.forEach(function (a) { if (document.querySelector(a.hash).getBoundingClientRect().top <= line) cur = a; });
			if (atBottom && nav === navs[navs.length - 1]) cur = pills[pills.length - 1];
			pills.forEach(function (a) { a.classList.toggle('active', a === cur); });
		});
	}

	place(); update();
	window.addEventListener('resize', function () { place(); update(); });
	window.addEventListener('scroll', update, { passive: true });
})();
