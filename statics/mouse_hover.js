// 获取当前主题
const currentTheme = document.documentElement.getAttribute('data-theme');

if (currentTheme === 'light') {
    // 定义CSS类
    const hoverClass = 'theme-hover-effect';
    document.documentElement.classList.add(hoverClass);

    // 添加CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .${hoverClass} .card-widget,
        .${hoverClass} .recent-post-item,
        .${hoverClass} #post,
        .${hoverClass} #archive,
        .${hoverClass} #page {
            transition: border-color 0.5s ease, transform 0.5s ease;
            will-change: border-color, transform;
        }
        .${hoverClass} .card-widget:hover,
        .${hoverClass} .recent-post-item:hover,
        .${hoverClass} #post:hover,
        .${hoverClass} #archive:hover,
        .${hoverClass} #page:hover {
            border-color: #DC143C;
        }
    `;
    document.head.appendChild(style);
}