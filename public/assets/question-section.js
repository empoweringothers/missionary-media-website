/* Optional interaction: core copy and course topics remain usable without JS. */
(() => {
 const motion = matchMedia('(prefers-reduced-motion: reduce)');
 const section = document.querySelector('.question-section');
 if (section) {
 const items = [...section.querySelectorAll('[data-question]')];
 const picture = section.querySelector('.question-image-frame img');
 const caption = section.querySelector('[data-question-caption]');
 const examples = [
 ['/assets/question-workspace.png', 'Choosing tools for your ministry', 'A desk with a laptop, phone, notes, and a microphone cable.'],
 ['/assets/academy/covers/booth.jpg', 'Getting church sound and screens working', 'A volunteer working at a church sound desk.'],
 ['/assets/academy/covers/marketing.jpg', 'Preparing an update for people back home', 'A person writing an email update on a laptop.'],
 ['/assets/question-workspace.png', 'Simplifying the steps you repeat', 'A desk with a laptop, phone, and written steps.']
 ];
 let current = -1;
 let manual = false;
 let frame = 0;
 const buttons = items.map((item, index) => {
 const heading = item.querySelector('h3');
 const button = document.createElement('button');
 button.type = 'button';
 button.className = 'question-select';
 button.textContent = heading.textContent;
 button.setAttribute('aria-pressed', 'false');
 button.addEventListener('click', () => { manual = true; select(index); });
 heading.replaceChildren(button);
 return button;
 });
 function select(index) {
 if (index === current) return;
 current = index;
 items.forEach((item, i) => {
 item.classList.toggle('is-current', i === index);
 buttons[i].setAttribute('aria-pressed', String(i === index));
 });
 picture.src = examples[index][0];
 picture.alt = examples[index][2];
 caption.textContent = examples[index][1];
 if (!motion.matches && picture.animate) {
 picture.getAnimations().forEach(animation => animation.cancel());
 picture.animate([{opacity:.65,transform:'scale(1.025)'},{opacity:1,transform:'scale(1)'}],{duration:350,easing:'ease-out'});
 }
 }
 function update() {
 frame = 0;
 if (manual || motion.matches) return;
 let nearest = 0, distance = Infinity;
 items.forEach((item, i) => {
 const rect = item.getBoundingClientRect();
 const delta = Math.abs(rect.top + rect.height / 2 - innerHeight * .48);
 if (delta < distance) { nearest = i; distance = delta; }
 });
 select(nearest);
 }
 const queue = () => { if (!frame && !manual && !motion.matches) frame = requestAnimationFrame(update); };
 section.classList.add('is-selectable');
 select(0);
 addEventListener('scroll', queue, {passive:true});
 motion.addEventListener('change', () => {
 if (motion.matches && picture.getAnimations) picture.getAnimations().forEach(animation => animation.cancel());
 });
 }
 const dialog = document.querySelector('.layout-dialog');
 if (dialog && typeof dialog.showModal === 'function') {
 let trigger;
 const close = () => dialog.close();
 document.querySelectorAll('[data-layout-preview]').forEach(link => {
 link.addEventListener('click', event => {
 if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
 event.preventDefault();
 trigger = link;
 dialog.showModal();
 });
 });
 dialog.querySelector('[data-layout-close]').addEventListener('click', close);
 dialog.addEventListener('click', event => {
 const rect = dialog.getBoundingClientRect();
 if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) close();
 });
 dialog.addEventListener('close', () => trigger?.focus());
 }
 // Animate each container once; content is never hidden waiting for a scroll event.
 if ('IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => {
 entries.forEach(entry => {
 if (!entry.isIntersecting) return;
 observer.unobserve(entry.target);
 if (!motion.matches && entry.target.animate) entry.target.animate(
 [{transform:'translateY(18px)'},{transform:'translateY(0)'}],
 {duration:550,easing:'cubic-bezier(.22,1,.36,1)'}
 );
 });
 }, {threshold:.12});
 document.querySelectorAll('.course-plan-preview,.support-package,.academy-browse-card').forEach(element => observer.observe(element));
 }
})();
