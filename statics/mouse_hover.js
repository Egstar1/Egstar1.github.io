// 获取当前主题
const currentTheme = document.documentElement.getAttribute('data-theme');

if (currentTheme === 'light') {
    // 获取所有需要操作的元素
    const cardWidgets = document.querySelectorAll('div.card-widget');
    const recentPostItems = document.querySelectorAll('div.recent-post-item');
    const postDivs = document.querySelectorAll('#post');
    const archives = document.querySelectorAll('#archive');
    const pageDivs = document.querySelectorAll('#page');

    // 函数：根据鼠标所在区域执行相应操作
    function handleMouseHover(element) {
        element.style.border = '1px solid #DC143C';
    }

    // 函数：恢复原始样式
    function restoreOriginalStyle(element) {
        element.style.border = '1px solid #E6E6FA';
    }

    // 遍历所有 cardWidget 元素并添加事件监听器
    cardWidgets.forEach(cardWidget => {
        cardWidget.addEventListener('mouseover', function() {
            handleMouseHover(cardWidget);
        });

        cardWidget.addEventListener('mouseout', function() {
            restoreOriginalStyle(cardWidget);
        });
    });

    // 遍历所有 recentPostItem 元素并添加事件监听器
    recentPostItems.forEach(recentPostItem => {
        recentPostItem.addEventListener('mouseover', function() {
            handleMouseHover(recentPostItem);
        });

        recentPostItem.addEventListener('mouseout', function() {
            restoreOriginalStyle(recentPostItem);
        });
    });

    // 遍历所有 postDiv 元素并添加事件监听器
    postDivs.forEach(postDiv => {
        postDiv.addEventListener('mouseover', function() {
            handleMouseHover(postDiv);
        });

        postDiv.addEventListener('mouseout', function() {
            restoreOriginalStyle(postDiv);
        });
    });

    // 遍历所有 archive 元素并添加事件监听器
    archives.forEach(archiveDiv => {
        archiveDiv.addEventListener('mouseover', function() {
            handleMouseHover(archiveDiv);
        });

        archiveDiv.addEventListener('mouseout', function() {
            restoreOriginalStyle(archiveDiv);
        });
    });

    // 遍历所有 pageDiv 元素并添加事件监听器
    pageDivs.forEach(pageDiv => {
        pageDiv.addEventListener('mouseover', function() {
            handleMouseHover(pageDiv);
        });

        pageDiv.addEventListener('mouseout', function() {
            restoreOriginalStyle(pageDiv);
        });
    });
}
