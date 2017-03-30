function handleCollapse(itemId) {

    if ($('.ppc-treegrid-parent-' + itemId).hasClass('ppc-collapse')) {
        $('.ppc-treegrid-parent-' + itemId).removeClass('ppc-collapse').addClass('ppc-expand');
        $('#' + itemId).find('.collapse-icon').removeClass('glyphicon-menu-right').addClass('glyphicon-menu-down');
        $('.ppc-treegrid-parent-' + itemId).slideDown(200);
    } else {
        $('.ppc-treegrid-parent-' + itemId).removeClass('ppc-expand').addClass('ppc-collapse');
        $('#' + itemId).find('.collapse-icon').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-right');
        $('.ppc-treegrid-parent-' + itemId).slideUp(200);
    }
}

function handleExpandAll() {
    if ($('#expandAllBtn').hasClass('ppc-btn-collapse')) {
        // 更改按钮
        $('#expandAllBtn').removeClass('ppc-btn-collapse').addClass('ppc-btn-expand');
        $('#expandAllBtn').text('收起全部节点');
        // 展开所有节点
        $('.ppc-collapse').each(function() {
            $(this).show();
            $(this).removeClass('ppc-collapse').addClass('ppc-expand');
        })
        // 改变所有节点图标
        $('.collapse-icon').each(function() {
            $(this).removeClass('glyphicon-menu-right').addClass('glyphicon-menu-down');
        })
    } else {
        // 更改按钮
        $('#expandAllBtn').removeClass('ppc-btn-expand').addClass('ppc-btn-collapse');
        $('#expandAllBtn').text('展开全部节点');
        // 收起所有节点
        $('.ppc-expand').each(function() {
            $(this).hide();
            $(this).removeClass('ppc-expand').addClass('ppc-collapse');
        })
        // 改变所有节点图标
        $('.collapse-icon').each(function() {
            $(this).removeClass('glyphicon-menu-down').addClass('glyphicon-menu-right');
        })
    }
}
