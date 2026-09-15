(function(){var e=`1.3.26`;function t(e,t,n){return Math.max(e,Math.min(t,n))}function n(e,t,n){return(1-n)*e+n*t}function r(e,t,r,i){return n(e,t,1-Math.exp(-r*i))}function i(e,t){return(e%t+t)%t}var a=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let n=!1;if(this.duration&&this.easing){this.currentTime+=e;let r=t(0,this.currentTime/this.duration,1);n=r>=1;let i=n?1:this.easing(r);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=r(this.value,this.to,this.lerp*60,e),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,n=!0)):(this.value=this.to,n=!0);n&&this.stop(),this.onUpdate?.(this.value,n)}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n,duration:r,easing:i,onStart:a,onUpdate:o}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=r,this.easing=i,this.currentTime=0,this.isRunning=!0,a?.(),this.onUpdate=o}};function o(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{n=void 0,e.apply(this,r)},t)}}var s=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(e,t,{autoResize:n=!0,debounce:r=250}={}){this.wrapper=e,this.content=t,n&&(this.debouncedResize=o(this.resize,r),this.wrapper instanceof Window?window.addEventListener(`resize`,this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener(`resize`,this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},c=class{events={};emit(e,...t){let n=this.events[e]||[];for(let e=0,r=n.length;e<r;e++)n[e]?.(...t)}on(e,t){return this.events[e]?this.events[e].push(t):this.events[e]=[t],()=>{this.events[e]=this.events[e]?.filter(e=>t!==e)}}off(e,t){this.events[e]=this.events[e]?.filter(e=>t!==e)}destroy(){this.events={}}};let l={passive:!1};function u(e,t){return e===1?16.666666666666668:e===2?t:1}var d=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new c;constructor(e,t={wheelMultiplier:1,touchMultiplier:1}){this.element=e,this.options=t,window.addEventListener(`resize`,this.onWindowResize),this.onWindowResize(),this.element.addEventListener(`wheel`,this.onWheel,l),this.element.addEventListener(`touchstart`,this.onTouchStart,l),this.element.addEventListener(`touchmove`,this.onTouchMove,l),this.element.addEventListener(`touchend`,this.onTouchEnd,l)}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener(`resize`,this.onWindowResize),this.element.removeEventListener(`wheel`,this.onWheel,l),this.element.removeEventListener(`touchstart`,this.onTouchStart,l),this.element.removeEventListener(`touchmove`,this.onTouchMove,l),this.element.removeEventListener(`touchend`,this.onTouchEnd,l)}onTouchStart=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit(`scroll`,{deltaX:0,deltaY:0,event:e})};onTouchMove=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(n-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:r,y:i},this.emitter.emit(`scroll`,{deltaX:r,deltaY:i,event:e})};onTouchEnd=e=>{this.emitter.emit(`scroll`,{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})};onWheel=e=>{let{deltaX:t,deltaY:n,deltaMode:r}=e,i=u(r,this.window.width),a=u(r,this.window.height);t*=i,n*=a,t*=this.options.wheelMultiplier,n*=this.options.wheelMultiplier,this.emitter.emit(`scroll`,{deltaX:t,deltaY:n,event:e})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};let f=e=>Math.min(1,1.001-2**(-10*e));var p=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;reducedMotionMediaQuery=window.matchMedia(`(prefers-reduced-motion: reduce)`);isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new a;emitter=new c;dimensions;virtualScroll;constructor({wrapper:t=window,content:n=document.documentElement,eventsTarget:r=t,smoothWheel:i=!0,syncTouch:a=!1,syncTouchLerp:o=.075,touchInertiaExponent:c=1.7,duration:l,easing:u,lerp:p=.1,infinite:m=!1,orientation:h=`vertical`,gestureOrientation:g=h===`horizontal`?`both`:`vertical`,touchMultiplier:_=1,wheelMultiplier:v=1,autoResize:y=!0,prevent:b,virtualScroll:x,overscroll:S=!0,autoRaf:C=!1,anchors:w=!1,autoToggle:T=!1,allowNestedScroll:E=!1,__experimental__naiveDimensions:D=!1,naiveDimensions:O=D,stopInertiaOnNavigate:k=!1,respectReducedMotion:A=!0}={}){window.lenisVersion=e,window.lenis||(window.lenis={}),window.lenis.version=e,h===`horizontal`&&(window.lenis.horizontal=!0),a===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!t||t===document.documentElement)&&(t=window),typeof l==`number`&&typeof u!=`function`?u=f:typeof u==`function`&&typeof l!=`number`&&(l=1),this.options={wrapper:t,content:n,eventsTarget:r,smoothWheel:i,syncTouch:a,syncTouchLerp:o,touchInertiaExponent:c,duration:l,easing:u,lerp:p,infinite:m,gestureOrientation:g,orientation:h,touchMultiplier:_,wheelMultiplier:v,autoResize:y,prevent:b,virtualScroll:x,overscroll:S,autoRaf:C,anchors:w,autoToggle:T,allowNestedScroll:E,naiveDimensions:O,stopInertiaOnNavigate:k,respectReducedMotion:A},this.dimensions=new s(t,n,{autoResize:y}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.addEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener(`click`,this.onClick),this.options.wrapper.addEventListener(`pointerdown`,this.onPointerDown),this.virtualScroll=new d(r,{touchMultiplier:_,wheelMultiplier:v}),this.virtualScroll.on(`scroll`,this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener(`transitionend`,this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.removeEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener(`pointerdown`,this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener(`click`,this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}onScrollEnd=e=>{e instanceof CustomEvent||(this.isScrolling===`smooth`||this.isScrolling===!1)&&e.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent(`scrollend`,{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){let e=this.isHorizontal?`overflow-x`:`overflow-y`;return getComputedStyle(this.rootElement)[e]}checkOverflow(){[`hidden`,`clip`].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=e=>{e.propertyName?.includes(`overflow`)&&e.target===this.rootElement&&this.checkOverflow()};setScroll(e){this.isHorizontal?this.options.wrapper.scrollTo({left:e,behavior:`instant`}):this.options.wrapper.scrollTo({top:e,behavior:`instant`})}onClick=e=>{let t=e.composedPath().filter(e=>e instanceof HTMLAnchorElement&&e.href).map(e=>new URL(e.href)),n=new URL(window.location.href);if(this.options.anchors){let e=t.find(e=>n.host===e.host&&n.pathname===e.pathname&&e.hash);if(e){let t=typeof this.options.anchors==`object`&&this.options.anchors?this.options.anchors:void 0,n=decodeURIComponent(e.hash);this.scrollTo(n,t);return}}if(this.options.stopInertiaOnNavigate&&t.some(e=>n.host===e.host&&n.pathname!==e.pathname)){this.reset();return}};onPointerDown=e=>{e.button===1&&this.reset()};isTouchOnSelectionHandle(e){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let n=e.targetTouches[0]??e.changedTouches[0];if(!n)return!1;let r=t.getRangeAt(0).getClientRects();if(r.length===0)return!1;let i=r[0],a=r[r.length-1],o=Math.hypot(n.clientX-i.left,n.clientY-i.top)<=40,s=Math.hypot(n.clientX-a.right,n.clientY-a.bottom)<=40;return o||s}onVirtualScroll=e=>{if(typeof this.options.virtualScroll==`function`&&this.options.virtualScroll(e)===!1)return;let{deltaX:t,deltaY:n,event:r}=e;if(this.emitter.emit(`virtual-scroll`,{deltaX:t,deltaY:n,event:r}),r.ctrlKey||r.lenisStopPropagation)return;let i=r.type.includes(`touch`),a=r.type.includes(`wheel`);if(i&&this.isIos&&(r.type===`touchstart`&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(r)),this._isDraggingSelection)){r.type===`touchend`&&(this._isDraggingSelection=!1);return}this.isTouching=r.type===`touchstart`||r.type===`touchmove`;let o=t===0&&n===0;if(this.options.syncTouch&&i&&r.type===`touchstart`&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let s=this.options.gestureOrientation===`vertical`&&n===0||this.options.gestureOrientation===`horizontal`&&t===0;if(o||s)return;let c=r.composedPath();c=c.slice(0,c.indexOf(this.rootElement));let l=this.options.prevent,u=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`;if(c.find(e=>e instanceof HTMLElement&&(typeof l==`function`&&l?.(e)||e.hasAttribute?.(`data-lenis-prevent`)||u===`vertical`&&e.hasAttribute?.(`data-lenis-prevent-vertical`)||u===`horizontal`&&e.hasAttribute?.(`data-lenis-prevent-horizontal`)||i&&e.hasAttribute?.(`data-lenis-prevent-touch`)||a&&e.hasAttribute?.(`data-lenis-prevent-wheel`)||this.options.allowNestedScroll&&this.hasNestedScroll(e,{deltaX:t,deltaY:n}))))return;if(this.isStopped||this.isLocked){r.cancelable&&r.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&a)){this.isScrolling=`native`,this.animate.stop(),r.lenisStopPropagation=!0;return}let d=n;this.options.gestureOrientation===`both`?d=Math.abs(n)>Math.abs(t)?n:t:this.options.gestureOrientation===`horizontal`&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&n>0||this.animatedScroll===this.limit&&n<0))&&(r.lenisStopPropagation=!0),r.cancelable&&r.preventDefault();let f=i&&this.options.syncTouch,p=i&&r.type===`touchend`;p&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...f?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit(`scroll`,this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling===`native`){let e=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-e,this.direction=Math.sign(this.animatedScroll-e),this.isStopped||(this.isScrolling=`native`),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty(`overflow`);return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty(`overflow`,`clip`);return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=e=>{let t=e-(this.time||e);this.time=e,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(e,{offset:n=0,immediate:r=!1,lock:i=!1,programmatic:a=!0,lerp:o=a?this.options.lerp:void 0,duration:s=a?this.options.duration:void 0,easing:c=a?this.options.easing:void 0,onStart:l,onComplete:u,force:d=!1,userData:p}={}){if(this.prefersReducedMotion&&(a?r=!0:(o=1,s=void 0,c=void 0)),(this.isStopped||this.isLocked)&&!d)return;let m=e,h=n;if(typeof m==`string`&&[`top`,`left`,`start`,`#`].includes(m))m=0;else if(typeof m==`string`&&[`bottom`,`right`,`end`].includes(m))m=this.limit;else{let e=null;if(typeof m==`string`?(e=m.startsWith(`#`)?document.getElementById(m.slice(1)):document.querySelector(m),e||(m===`#top`?m=0:console.warn(`Lenis: Target not found`,m))):m instanceof HTMLElement&&m?.nodeType&&(e=m),e){if(this.options.wrapper!==window){let e=this.rootElement.getBoundingClientRect();h-=this.isHorizontal?e.left:e.top}let t=e.getBoundingClientRect(),n=getComputedStyle(e),r=this.isHorizontal?Number.parseFloat(n.scrollMarginLeft):Number.parseFloat(n.scrollMarginTop),i=getComputedStyle(this.rootElement),a=this.isHorizontal?Number.parseFloat(i.scrollPaddingLeft):Number.parseFloat(i.scrollPaddingTop);m=(this.isHorizontal?t.left:t.top)+this.animatedScroll-(Number.isNaN(r)?0:r)-(Number.isNaN(a)?0:a)}}if(typeof m==`number`){if(m+=h,this.options.infinite){if(a){this.targetScroll=this.animatedScroll=this.scroll;let e=m-this.animatedScroll;e>this.limit/2?m-=this.limit:e<-this.limit/2&&(m+=this.limit)}}else m=t(0,m,this.limit);if(m===this.targetScroll){l?.(this),u?.(this);return}if(this.userData=p??{},r){this.animatedScroll=this.targetScroll=m,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}a||(this.targetScroll=m),typeof s==`number`&&typeof c!=`function`?c=f:typeof c==`function`&&typeof s!=`number`&&(s=1),this.animate.fromTo(this.animatedScroll,m,{duration:s,easing:c,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling=`smooth`,l?.(this)},onUpdate:(e,t)=>{this.isScrolling=`smooth`,this.lastVelocity=this.velocity,this.velocity=e-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=e,this.setScroll(this.scroll),a&&(this.targetScroll=e),t||this.emit(),t&&(this.reset(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(e,{deltaX:t,deltaY:n}){let r=Date.now();e._lenis||={};let i=e._lenis,a,o,s,c,l,u,d,f,p,m;if(r-(i.time??0)>2e3){i.time=Date.now();let t=window.getComputedStyle(e);if(i.computedStyle=t,a=[`auto`,`overlay`,`scroll`].includes(t.overflowX),o=[`auto`,`overlay`,`scroll`].includes(t.overflowY),l=[`auto`].includes(t.overscrollBehaviorX),u=[`auto`].includes(t.overscrollBehaviorY),i.hasOverflowX=a,i.hasOverflowY=o,!(a||o))return!1;d=e.scrollWidth,f=e.scrollHeight,p=e.clientWidth,m=e.clientHeight,s=d>p,c=f>m,i.isScrollableX=s,i.isScrollableY=c,i.scrollWidth=d,i.scrollHeight=f,i.clientWidth=p,i.clientHeight=m,i.hasOverscrollBehaviorX=l,i.hasOverscrollBehaviorY=u}else s=i.isScrollableX,c=i.isScrollableY,a=i.hasOverflowX,o=i.hasOverflowY,d=i.scrollWidth,f=i.scrollHeight,p=i.clientWidth,m=i.clientHeight,l=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(a&&s||o&&c))return!1;let h=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`,g,_,v,y,b,x;if(h===`horizontal`)g=Math.round(e.scrollLeft),_=d-p,v=t,y=a,b=s,x=l;else if(h===`vertical`)g=Math.round(e.scrollTop),_=f-m,v=n,y=o,b=c,x=u;else return!1;return!x&&(g>=_||g<=0)?!0:(v>0?g<_:g>0)&&y&&b}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?`x`:`y`]}get isHorizontal(){return this.options.orientation===`horizontal`}get actualScroll(){let e=this.options.wrapper;return this.isHorizontal?e.scrollX??e.scrollLeft:e.scrollY??e.scrollTop}get scroll(){return this.options.infinite?i(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(e){this._isScrolling!==e&&(this._isScrolling=e,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(e){this._isStopped!==e&&(this._isStopped=e,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(e){this._isLocked!==e&&(this._isLocked=e,this.updateClassName())}get isSmooth(){return this.isScrolling===`smooth`}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let e=`lenis`;return this.options.autoToggle&&(e+=` lenis-autoToggle`),this.isStopped&&(e+=` lenis-stopped`),this.isLocked&&(e+=` lenis-locked`),this.isScrolling&&(e+=` lenis-scrolling`),this.isScrolling===`smooth`&&(e+=` lenis-smooth`),e}updateClassName(){this.cleanUpClassName(),this.className.split(` `).forEach(e=>{this.rootElement.classList.add(e)})}cleanUpClassName(){for(let e of Array.from(this.rootElement.classList))(e===`lenis`||e.startsWith(`lenis-`))&&this.rootElement.classList.remove(e)}};globalThis.Lenis=p,globalThis.Lenis.prototype=p.prototype})();
//# sourceMappingURL=lenis.min.js.map
/* ==========================================================================
   PORTFOLIO CLIENT SCRIPT — REPLICATING EMMANUELEBEH.DEV
   Features:
   - Typewriter animation with cursor and bilingual support
   - Scroll reveals with IntersectionObserver
   - Navigation scroll-spy (desktop floating pill & mobile drawer)
   - Real-time Web Audio API frequency equalizer visualizer
   - Bilingual language switcher (EN / FR) with instant reactive translation
   - Mobile navigation drawer
   ========================================================================== */

(function () {
  'use strict';

  // --- Translations Dictionary ---
  const i18nData = {
    en: {
      nav_about: 'About',
      nav_skills: 'Skills',
      nav_education: 'Education',
      nav_experiences: 'Experiences',
      nav_projects: 'Projects',
      nav_contact: 'Contact',
      hero_role: 'Full-Stack, Java backend, and AI application developer',
      hero_location: 'Based in Toronto · Seeking full-time opportunities across Canada.',
      view_projects: 'View projects',
      contact_eyebrow: "LET'S CONNECT",
      contact_title: 'Have an opportunity in mind?',
      contact_body: "I'm seeking full-time Java backend, full-stack, and AI application development opportunities across Canada.",
      available_badge: 'Available for work',
      hero_hello: "Hello, I'm",
      hero_name: 'Sourav Chandhok',
      hero_im: "I'm a",
      hero_bio: 'Computer Science graduate from York University building resilient Java backends, modern React applications, and production-tested systems.',
      completed_projects: 'Featured projects',
      skills_eyebrow: 'MY TOOLKIT',
      skills_title: 'Technical Skills & Tools',
      skills_subtitle: 'A comprehensive catalog of languages, frameworks, and developer toolchains I build with.',
      // Education
      edu_eyebrow: 'ACADEMIC BACKGROUND & CREDENTIALS',
      edu_title: 'Education & Credentials',
      edu_subtitle: 'Foundational computer science principles, software architecture, and technology entrepreneurship.',
      edu_1_status: 'Academic Requirements Completed',
      edu_1_title: 'B.Sc. (Honours) in Computer Science',
      edu_focus_1: 'Software & Systems',
      edu_1_school: 'York University • Toronto, ON',
      edu_1_convocation: 'October, 2026',
      edu_1_desc: 'Computer Science program focused on software engineering, algorithms, data structures, object-oriented programming, operating systems, and database systems, with extensive development experience in Java.',
      edu_tags_foundations: 'CORE FOUNDATIONS & COURSEWORK',
      edu_2_status: 'Certificate of Achievement',
      edu_2_title: 'Bergeron Entrepreneurs in Science & Technology (BEST) Certificate',
      edu_focus_2: 'Tech Commercialization',
      edu_2_school: 'Lassonde School of Engineering • York University',
      edu_2_convocation: 'Bergeron Entrepreneurs in Science & Technology',
      edu_2_desc: 'Entrepreneurship and technology innovation program focused on product development, business model validation, venture creation, and translating technical ideas into viable solutions.',
      edu_tags_capabilities: 'SPECIALIZED CAPABILITIES',
      // Experiences
      exp_eyebrow: 'WORK HISTORY & INDUSTRY EXPERIENCE',
      exp_title: 'Professional Experience',
      exp_subtitle: 'Building reliable full-stack applications through collaborative development, testing, and release delivery.',
      download_resume: 'Download my resume',
      projects_eyebrow: 'Featured Projects & Applications',
      projects_title: 'My Projects',
      made_by: 'Made by Sourav Chandhok',
      exp_1_title: 'Application Programmer Analyst Co-op',
      exp_1_company: 'Ministry of Education, Ontario Public Service',
      exp_1_date: 'May 2023 - Aug 2024',
      exp_1_desc: 'Supported development, testing, and release of Ontario government web applications using React, Java, and REST APIs across QA and UAT environments. Implemented JavaScript/React front-end changes alongside Java backend logic for functional workflows. Automated REST API tests with REST Assured, Postman, and Newman while validating backend data with SQL and Oracle for payloads and data flows. Built and maintained 500+ manual and automated test cases with Java, Selenium WebDriver, and TestNG using the Page Object Model (POM) for cross-browser testing (Chrome & Edge). Configured Jenkins CI/CD jobs with Maven parameters to execute automated regression suites, tracked 200+ defects in JIRA and HP ALM, and actively contributed to Agile/Scrum sprint planning, stand-ups, and retrospectives.',
      // Projects
      proj_1_desc: 'AI-powered job application workspace using React and Python/FastAPI that analyzes postings, matches résumés, suggests evidence-aware bullet revisions, and features an offline heuristic fallback when external models are unavailable. Verified with automated pytest suites.',
      proj_2_desc: 'Full-stack access-impact simulator built with Java 21, Spring Boot, and React. Evaluates permission changes using deterministic domain models, asynchronous Kafka microservices, and Testcontainers integration tests against real PostgreSQL instances.',
      proj_3_desc: 'Modernized Java campus marketplace for York University students featuring Spring Security, OTP verification, RabbitMQ asynchronous messaging queue, and containerized deployment with Kubernetes.',
      typewriter_words: ['Full-Stack Developer', 'Java Backend Engineer', 'AI Application Developer', 'Software Engineer'],
      // AFK / Hobbies
      afk_eyebrow: '// AWAY FROM THE KEYBOARD',
      afk_title: 'Beyond the Terminal — AFK',
      afk_subtitle: 'A mix of high-altitude trails, calculated moves, open water, and life outside code.',
      afk_tag_trails: '[TRAILS & NATURE]',
      afk_trails_title: 'Best thoughts come mid-trail',
      afk_trails_desc: 'Hiking alpine ridge lines and red-rock backcountry to build endurance and mental clarity. Stepping away from syntax quietly resets the loop every time.',
      afk_tag_chess: '[STRATEGY & CHESS]',
      afk_chess_title: '64 squares, calculated patience',
      afk_chess_desc: 'Deep positional play, pattern recognition, and calculating moves ahead under strict blitz clock pressure. The ultimate sandbox for tactical trade-offs.',
      afk_tag_water: '[WATER & ADRENALINE]',
      afk_water_title: 'Open water & speed',
      afk_water_desc: 'Carving wake and feeling raw velocity across open water on bright afternoons. An adrenaline-charged physical counterweight to sedentary terminal sessions.'
    },
    fr: {
      nav_about: 'À propos',
      nav_skills: 'Compétences',
      nav_education: 'Formation',
      nav_experiences: 'Expériences',
      nav_projects: 'Projets',
      nav_contact: 'Contact',
      hero_role: "Développeur full-stack, Java backend et d’applications IA",
      hero_location: 'Basé à Toronto · À la recherche d’un poste à temps plein au Canada.',
      view_projects: 'Voir les projets',
      contact_eyebrow: 'CONTACT',
      contact_title: 'Une opportunité à partager ?',
      contact_body: 'Je recherche un poste à temps plein en développement Java backend, full-stack ou d’applications IA au Canada.',
      available_badge: 'Disponible pour travailler',
      hero_hello: 'Bonjour, je suis',
      hero_name: 'Sourav Chandhok',
      hero_im: 'Je suis un',
      hero_bio: "Diplômé en informatique de l’Université York, concevant des backends Java résilients, des applications React modernes et des systèmes testés pour la production.",
      completed_projects: 'Projets présentés',
      skills_eyebrow: 'MES OUTILS',
      skills_title: 'Compétences techniques et outils',
      skills_subtitle: 'Un catalogue complet des langages, frameworks et outils de développement que j’utilise.',
      // Education
      edu_eyebrow: 'FORMATION ACADÉMIQUE & DIPLÔMES',
      edu_title: 'Formation & Diplômes',
      edu_subtitle: 'Principes fondamentaux de l’informatique, architecture logicielle et entrepreneuriat technologique.',
      edu_1_status: 'Exigences académiques complétées',
      edu_1_title: 'B.Sc. (Spécialisé) en Informatique',
      edu_focus_1: 'Logiciels & Systèmes',
      edu_1_school: 'Université York • Toronto, ON',
      edu_1_convocation: 'Collation des grades en octobre 2026',
      edu_1_desc: 'Programme d’informatique axé sur le génie logiciel, les algorithmes, les structures de données, la programmation orientée objet, les systèmes d’exploitation et les systèmes de bases de données, avec une vaste expérience de développement en Java.',
      edu_tags_foundations: 'FONDATIONS & COURS CLÉS',
      edu_2_status: 'Certificat de Réussite',
      edu_2_title: 'Certificat Bergeron Entrepreneurs in Science & Technology (BEST)',
      edu_focus_2: 'Commercialisation Tech',
      edu_2_school: 'École d’ingénierie Lassonde • Université York',
      edu_2_convocation: 'Bergeron Entrepreneurs in Science & Technology',
      edu_2_desc: 'Programme d’entrepreneuriat et d’innovation technologique axé sur le développement de produits, la validation de modèles d’affaires, la création d’entreprises et la transformation d’idées techniques en solutions viables.',
      edu_tags_capabilities: 'COMPÉTENCES SPÉCIALISÉES',
      // Experiences
      exp_eyebrow: 'PARCOURS PROFESSIONNEL & EXPÉRIENCE',
      exp_title: 'Expérience Professionnelle',
      exp_subtitle: 'Création d’applications fiables grâce au développement collaboratif, aux tests rigoureux et à des mises en production maîtrisées.',
      download_resume: 'Télécharger mon CV',
      projects_eyebrow: 'Projets & Applications Réalisés',
      projects_title: 'Mes Projets',
      made_by: 'Conçu par Sourav Chandhok',
      exp_1_title: "Analyste Programmeur d'Applications (Stage)",
      exp_1_company: "Ministère de l'Éducation, Fonction publique de l'Ontario",
      exp_1_date: 'Mai 2023 - Août 2024',
      exp_1_desc: "Participation au développement, aux tests et à la livraison d'applications web gouvernementales avec React, Java et API REST en environnements QA et UAT. Évolution du frontend React et de la logique backend Java. Automatisation des tests d'API avec REST Assured, Postman et Newman avec validation SQL et Oracle. Création de plus de 500 tests automatisés avec Java, Selenium WebDriver et TestNG (Page Object Model) sur Chrome et Edge. Configuration de jobs Jenkins CI/CD avec Maven, suivi de 200+ anomalies sur JIRA/HP ALM et participation active aux cérémonies Agile/Scrum.",
      // Projects
      proj_1_desc: "Espace de recherche d'emploi propulsé par l'IA avec React et Python/FastAPI avec analyse d'offres, correspondance de CV et solution de repli heuristique hors-ligne. Validé par tests pytest automatisés.",
      proj_2_desc: "Simulateur d'impact d'accès conçu avec Java 21, Spring Boot et React. Modèles déterministes, microservices asynchrones Kafka et tests d'intégration Testcontainers avec PostgreSQL.",
      typewriter_words: ['Développeur Full-Stack', 'Ingénieur Java Backend', 'Développeur Applications IA', 'Ingénieur Logiciel'],
      // AFK / Hobbies
      afk_eyebrow: '// HORS DU CLAVIER',
      afk_title: 'Au-delà du terminal — AFK',
      afk_subtitle: 'Un mélange de sentiers en haute altitude, de coups calculés, de grand large et de vie hors du code.',
      afk_tag_trails: '[SENTIERS & NATURE]',
      afk_trails_title: 'Les meilleures idées naissent sur les sentiers',
      afk_trails_desc: "Explorer les crêtes alpines et les sentiers rocheux pour forger endurance et clarté d'esprit. S'éloigner de la syntaxe réinitialise l'esprit à chaque fois.",
      afk_tag_chess: '[STRATÉGIE & ÉCHECS]',
      afk_chess_title: '64 cases, patience calculée',
      afk_chess_desc: "Jeu positionnel approfondi, reconnaissance de motifs et calcul de coups sous la pression du blitz. Le banc d'essai idéal pour peser les compromis tactiques.",
      afk_tag_water: '[EAU & ADRÉNALINE]',
      afk_water_title: 'Grand large & vitesse',
      afk_water_desc: "Fendre l'eau et ressentir la vitesse pure sur le lac les après-midis ensoleillés. Un contrepoids physique électrisant aux longues sessions devant le terminal."
    }
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentLang = localStorage.getItem('portfolio_lang') || 'en';
  let lenisInstance = null;

  // --- Typewriter Controller ---
  let typewriterTimeout = null;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function initTypewriter() {
    clearTimeout(typewriterTimeout);
    typewriterTimeout = null;
    const target = document.querySelector('.typewriter-text');
    if (!target) return;

    const words = i18nData[currentLang] && i18nData[currentLang].typewriter_words
      ? i18nData[currentLang].typewriter_words
      : ['Java Developer', 'Full-Stack Developer', 'AI App Developer'];

    // On initial page load with pre-rendered first word, start from full word and pause
    if (charIndex === 0 && !isDeleting && wordIndex === 0 && target.textContent.trim() === words[0]) {
      charIndex = words[0].length;
      isDeleting = true;
      typewriterTimeout = setTimeout(step, 2000);
      return;
    }

    function step() {
      if (document.hidden) {
        return; // Paused while tab is hidden; visibilitychange will resume
      }

      const currentWord = words[wordIndex % words.length];

      if (isDeleting) {
        target.textContent = currentWord.substring(0, Math.max(0, charIndex - 1));
        charIndex--;
      } else {
        target.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 45 : 90;

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex <= 0) {
        charIndex = 0;
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400; // Pause before typing next word
      }

      typewriterTimeout = setTimeout(step, speed);
    }

    step();
  }

  function handleVisibilityChange() {
    if (!document.hidden) {
      if (!typewriterTimeout) {
        initTypewriter();
      }
    } else {
      clearTimeout(typewriterTimeout);
      typewriterTimeout = null;
    }
  }
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // --- Language Switcher ---
  function applyLanguage(lang) {
    if (!i18nData[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;

    const dict = i18nData[lang];

    // Update all [data-i18n] text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update Language Button State & Flag
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
      const flagImg = langBtn.querySelector('img');
      const labelSpan = langBtn.querySelector('span');
      if (flagImg) {
        flagImg.src = lang === 'fr' ? '/assets/images/fr.svg' : '/assets/images/ca.svg';
        flagImg.alt = lang.toUpperCase();
      }
      if (labelSpan) {
        labelSpan.textContent = lang.toUpperCase();
      }
    }

    // Update Mobile Drawer Lang Buttons
    document.querySelectorAll('.drawer-lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Desktop Dropdown Options
    document.querySelectorAll('.lang-option').forEach(opt => {
      const optLang = opt.getAttribute('data-lang');
      if (optLang === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // Restart typewriter with localized words
    wordIndex = 0;
    charIndex = 0;
    isDeleting = false;
    initTypewriter();
  }

  // --- Desktop Language Dropdown ---
  function initLangDropdown() {
    const langBtn = document.querySelector('.lang-btn');
    const dropdown = document.querySelector('.lang-dropdown');
    if (!langBtn || !dropdown) return;

    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('show');
      langBtn.classList.toggle('open', isOpen);
      langBtn.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const selectedLang = opt.getAttribute('data-lang');
        applyLanguage(selectedLang);
        dropdown.classList.remove('show');
        langBtn.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !langBtn.contains(e.target)) {
        dropdown.classList.remove('show');
        langBtn.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Mobile Drawer Navigation ---
  function initMobileDrawer() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const backdrop = document.querySelector('.drawer-backdrop');
    const closeBtn = document.querySelector('.drawer-close-btn');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const drawerLangBtns = document.querySelectorAll('.drawer-lang-btn');

    if (!toggleBtn || !drawer || !backdrop) return;

    function openDrawer() {
      if (lenisInstance) lenisInstance.stop();
      drawer.inert = false;
      drawer.classList.add('open');
      backdrop.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn?.focus();
    }

    function closeDrawer() {
      const hadFocus = drawer.contains(document.activeElement);
      drawer.classList.remove('open');
      drawer.inert = true;
      backdrop.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lenisInstance) lenisInstance.start();
      if (hadFocus) toggleBtn.focus();
    }

    toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
        const targetId = link.getAttribute('data-target');
        if (targetId) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            targetEl.setAttribute('tabindex', '-1');
            targetEl.focus({ preventScroll: true });
            if (lenisInstance && !reducedMotion.matches) {
              lenisInstance.scrollTo(targetEl, { offset: -10, duration: 1.2 });
            } else {
              targetEl.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
            }
          }
        }
      });
    });

    drawerLangBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        applyLanguage(lang);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && drawer.classList.contains('open')) {
        const items = [...drawer.querySelectorAll('button, a[href], [tabindex="0"]')].filter(el => !el.disabled);
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', event => {
      if (event.matches) closeDrawer();
    });
  }

  // --- Scroll Reveals (IntersectionObserver) ---
  function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    reveals.forEach(el => el.classList.add('reveal-pending'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '50px 0px 50px 0px'
      });

      reveals.forEach(el => observer.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('is-visible'));
    }
  }

  // --- Scroll Spy & Nav Link Active Highlighting ---
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.roll-link');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function setActive(id) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
      drawerLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-target') === '#' + id);
      });
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      }, {
        rootMargin: '-20% 0px -70% 0px'
      });

      sections.forEach(s => observer.observe(s));
    }
  }

  // --- Web Audio API Equalizer & Player ---
  function initAudioEqualizer() {
    const audio = document.getElementById('bg-audio');
    const playBtn = document.querySelector('.audio-play-btn');
    const bars = document.querySelectorAll('.equalizer-bar');

    if (!audio || !playBtn || bars.length === 0) return;

    let audioCtx = null;
    let analyser = null;
    let sourceNode = null;
    let animationFrameId = null;
    let isPlaying = false;
    let dataArray = null;

    // SVG Icons
    const playSvg = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-accent-orange ml-0.5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>`;
    const pauseSvg = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-accent-orange" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="4" width="4" height="16" rx="1"></rect><rect x="6" y="4" width="4" height="16" rx="1"></rect></svg>`;

    function setupAudioContext() {
      if (audioCtx) return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        sourceNode = audioCtx.createMediaElementSource(audio);
        sourceNode.connect(analyser);
        analyser.connect(audioCtx.destination);
        dataArray = new Uint8Array(analyser.frequencyBinCount);
      } catch (e) {
        console.warn('AudioContext setup fallback:', e);
      }
    }

    function renderBars() {
      if (!isPlaying || reducedMotion.matches) {
        bars.forEach(bar => {
          bar.style.height = '3px';
        });
        return;
      }

      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        // Distribute frequency indices across the 12 bars
        const step = Math.max(1, Math.floor(dataArray.length / bars.length));
        bars.forEach((bar, idx) => {
          const val = dataArray[idx * step] || 0;
          // Scale 0-255 to 3px-22px
          const scaled = 3 + (val / 255) * 19;
          bar.style.height = `${scaled.toFixed(1)}px`;
        });
      } else {
        // Fallback procedural animation
        const time = Date.now() * 0.008;
        bars.forEach((bar, idx) => {
          const wave = Math.sin(time + idx * 0.6) * 8 + 11;
          bar.style.height = `${Math.max(3, wave).toFixed(1)}px`;
        });
      }

      animationFrameId = requestAnimationFrame(renderBars);
    }

    async function togglePlay() {
      setupAudioContext();

      if (audioCtx && audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      if (audio.paused) {
        try {
          await audio.play();
          isPlaying = true;
          playBtn.innerHTML = pauseSvg;
          playBtn.setAttribute('aria-label', 'Pause background music');
          renderBars();
        } catch (err) {
          console.warn('Audio playback error:', err);
        }
      } else {
        audio.pause();
        isPlaying = false;
        playBtn.innerHTML = playSvg;
        playBtn.setAttribute('aria-label', 'Play background music');
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        bars.forEach(bar => {
          bar.style.height = '3px';
        });
      }
    }

    playBtn.addEventListener('click', togglePlay);

    audio.addEventListener('ended', () => {
      isPlaying = false;
      playBtn.innerHTML = playSvg;
      playBtn.setAttribute('aria-label', 'Play background music');
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      bars.forEach(bar => bar.style.height = '3px');
    });
  }

  // --- Lenis Smooth Momentum Scrolling (matching emmanuelebeh.dev) ---
  function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;

    try {
      lenisInstance = new Lenis({
        lerp: 0.1, // silky fluid momentum curve matching emmanuelebeh.dev
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        smoothWheel: true,
        autoRaf: true,
        respectReducedMotion: false // Prevent OS reduce-motion setting from disabling smooth wheel momentum
      });
      window.portfolioLenis = lenisInstance;

      // Smooth anchor navigation for all internal links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href && href.length > 1) {
            const targetEl = document.querySelector(href);
            if (targetEl) {
              e.preventDefault();
              anchor.blur();
              if (document.activeElement && typeof document.activeElement.blur === 'function') {
                document.activeElement.blur();
              }
              if (lenisInstance) {
                lenisInstance.scrollTo(targetEl, { offset: -10, duration: 1.2 });
              } else {
                targetEl.scrollIntoView({ behavior: 'smooth' });
              }
              if (history.pushState) {
                history.pushState(null, null, href);
              }
            }
          }
        });
      });
    } catch (e) {
      console.warn('Lenis initialization fallback:', e);
    }
  }

  // --- Collapsible Desktop Navbar on Scroll (Gradual Scrubbing & Smart Headroom Auto-Hide) ---
  function initCollapsibleNavbar() {
    const container = document.querySelector('.floating-nav-container');
    const nav = document.querySelector('.floating-nav');
    const wrapper = document.querySelector('.nav-links-wrapper');
    const links = document.querySelector('.nav-links');
    if (!nav || !wrapper || !links || !container) return;

    let fullWidth = wrapper.scrollWidth || 540;
    const updateFullWidth = () => {
      if ((window.pageYOffset || document.documentElement.scrollTop) <= 180) {
        fullWidth = wrapper.scrollWidth || 540;
      }
    };
    window.addEventListener('resize', updateFullWidth);

    // Keep fully expanded for top 180px (stationary hero header)
    const startScroll = 180;

    let lastY = window.pageYOffset || document.documentElement.scrollTop;
    let isTicking = false;

    function updateNavbar(currentY) {
      const diff = currentY - lastY;

      // 1. Within top 180px: Hero state — always visible and fully expanded
      if (currentY <= startScroll) {
        container.classList.remove('is-hidden');
        nav.classList.remove('is-scroll-up');
        nav.classList.remove('is-deep-collapsed');
        nav.style.removeProperty('--nav-wrapper-width');
        nav.style.removeProperty('--nav-links-opacity');
        nav.style.removeProperty('--nav-links-y');
        wrapper.style.pointerEvents = 'auto';
      }
      // 2. Beyond top 180px: Smart Headroom with Symmetrical Inward Collapse & Outward Expand
      else {
        nav.classList.add('is-deep-collapsed');
        nav.style.setProperty('--nav-wrapper-width', '0px');
        nav.style.setProperty('--nav-links-opacity', '0');
        nav.style.setProperty('--nav-links-y', '-20px');

        // Check scroll direction for headroom behavior
        if (diff > 8) {
          // Scrolling down: collapse inward and glide off-screen
          container.classList.add('is-hidden');
          nav.classList.remove('is-scroll-up');
          wrapper.style.pointerEvents = 'none';
        } else if (diff < -8) {
          // Scrolling up: slide down and unfurl outward from center
          container.classList.remove('is-hidden');
          nav.classList.add('is-scroll-up');
          wrapper.style.pointerEvents = 'auto';
        }
      }

      lastY = currentY;
    }

    // Top-of-viewport mouse movement reveal for desktop convenience
    document.addEventListener('mousemove', (e) => {
      if (e.clientY <= 30 && container.classList.contains('is-hidden')) {
        container.classList.remove('is-hidden');
        nav.classList.add('is-scroll-up');
      }
    });

    // Hover & link-click handlers for seamless collapsed interactions
    nav.addEventListener('mouseleave', () => {
      nav.classList.remove('is-clicked');
    });

    wrapper.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        nav.classList.add('is-clicked');
      }
    });

    function onScroll() {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const currentY = window.pageYOffset || document.documentElement.scrollTop;
          updateNavbar(currentY);
          isTicking = false;
        });
        isTicking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial check on load
    const initialY = window.pageYOffset || document.documentElement.scrollTop;
    if (initialY > startScroll) {
      container.classList.add('is-hidden');
      nav.classList.add('is-deep-collapsed');
      nav.style.setProperty('--nav-wrapper-width', '0px');
      nav.style.setProperty('--nav-links-opacity', '0');
      nav.style.setProperty('--nav-links-y', '-20px');
      wrapper.style.pointerEvents = 'none';
    }
    updateNavbar(initialY);
  }

  // --- Skills Category Filter Tabs ---
  function initSkillsFilter() {
    const filterNav = document.querySelector('.skills-filter-nav');
    if (!filterNav) return;

    const filterBtns = filterNav.querySelectorAll('.skills-filter-btn');
    const cards = document.querySelectorAll('.skill-category-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active tab button
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter cards smoothly
        cards.forEach(card => {
          const category = card.dataset.category;
          if (filter === 'all' || category === filter) {
            card.classList.remove('is-dimmed');
            card.classList.add('is-highlighted');
          } else {
            card.classList.add('is-dimmed');
            card.classList.remove('is-highlighted');
          }
        });
      });
    });
  }

  // --- Initialize Everything ---
  function initAll() {
    initSmoothScroll();
    initCollapsibleNavbar();
    applyLanguage(currentLang);
    initLangDropdown();
    initMobileDrawer();
    initScrollReveals();
    initScrollSpy();
    initAudioEqualizer();
    initSkillsFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
