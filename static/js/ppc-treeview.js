$(function() {
    $('#ppc-node').contextMenu({
        selector: 'li',
        callback: function(key, options) {
          handleRightClicked(key, $(this));
        },
        items: {
            'edit': {
                name: '编辑',
                icon: 'edit'
            },
            'delete': {
                name: '删除',
                icon: 'delete'
            },
            'sep1': '---------',
            'addSameLevel': {
                name: '新建同级文件',
                icon: 'add'
            },
            'addChildLevel': {
                name: '新建子级文件',
                icon: 'add',
                // 菜单按钮是否显示
                // 判断条件为 $(this).children().first().attr('id') === 'level-3' || 'level-2' || 'level-1'
                visible: function(key, opt) {
                  var nodeLevel = $(this).children().first().attr('class');
                  return nodeLevel === 'level-1' || nodeLevel === 'level-2'; // || nodeLevel === 'level-3'
                }
            },
          }
    });
});

// 有点单击接收器
function handleRightClicked (key, context) {
  switch (key) {
    case 'edit':
      editHandler(context);
      break;
    case 'delete':
      deleteHandler(context);
      break;
    case 'addSameLevel':
      addSameLevelHandler(context);
      break;
    case 'addChildLevel':
      addChildLevelHandler(context);
    default:
      break;
  }
}

// 编辑被单击
function editHandler (context){
  if (context.children().first().attr('id')) {
    // 编辑非叶子节点
    var newName = prompt('请输入新名字', context.children('label').first().text()) || context.children('label').first().text();
    context.children('label').first().text(newName);
    // TODO: 修改数据库信息
    // TODO: 修改模板数据
  } else {
    // 编辑非叶子节点
    var newName = prompt('请输入新名字', context.find('a').text()) || context.find('a').text();
    context.find('a').text(newName);
    // TODO: 修改数据库信息
    // TODO: 修改模板数据
  }
}

// 删除被单击
function deleteHandler (context){
  var r = confirm('确认删除？');
  if (r) {
    context.remove();
    // TODO: 删除数据库信息
    // TODO: 删除模板数据
  }
}

// 创建同级文件被单击
function addSameLevelHandler (context){
  var nodeLevel = context.children().first().attr('class');
  var promptName = '新建 ' + (nodeLevel || '叶子节点') + ' 文件';
  var newName = prompt('请输入新名字', promptName);
  var newNodeId = Date.now();
  var newHtml;

  if (newName != null && newName != "") {
    // 构建新 html 时， 注意 input id 和 label for 须一致并且与其他 DOM 元素不同
    // console.log(newHtml);
    switch (nodeLevel) {
      case 'level-1':
        newHtml = '<li class="ppc-treeview-node"><input type="checkbox" id="' + newNodeId.toString() + '" class="level-1" /><label for="' + newNodeId.toString() + '">' + newName + '</label><ul></ul></li>'
        break;
      case 'level-2':
        newHtml = '<li class="ppc-treeview-node"><input type="checkbox" id="' + newNodeId.toString() + '" class="level-2" /><label for="' + newNodeId.toString() + '">' + newName + '</label><ul></ul></li>'
        break;
      // case 'level-3':
      //   newHtml = '<li class="ppc-treeview-node"><input type="checkbox" id="' + newNodeId.toString() + '" class="level-3" /><label for="' + newNodeId.toString() + '">' + newName + '</label><ul></ul></li>'
      //   break;
      default:
        newHtml = '<li class="ppc-treeview-leaf"><a href="./">' + newName + '</a></li>'
    }
  }

  console.log(context);
  context.after(newHtml);
  // TODO: 添加数据库信息
  // TODO: 添加模板数据
}

// 创建自己文件被单击
function addChildLevelHandler (context){
  var nodeLevel = context.children().first().attr('class');
  var promptName = '新建子级文件';
  var newName = prompt('请输入新名字', promptName);
  var newNodeId = Date.now();
  var newHtml;

  if (newName != null && newName != "") {
    // 构建新 html 时， 注意 input id 和 label for 须一致并且与其他 DOM 元素不同
    switch (nodeLevel) {
      case 'level-1':
        newHtml = '<li class="ppc-treeview-node"><input type="checkbox" id="' + newNodeId.toString() + '" class="level-2" /><label for="' + newNodeId.toString() + '">' + newName + '</label><ul></ul></li>'
        break;
      case 'level-2':
        newHtml = '<li class="ppc-treeview-leaf"><a href="./">' + newName + '</a></li>'
        // newHtml = '<li class="ppc-treeview-node"><input type="checkbox" id="' + newNodeId.toString() + '" class="level-3" /><label for="' + newNodeId.toString() + '">' + newName + '</label><ul></ul></li>'
        break;
      // case 'level-3':
      //   newHtml = '<li class="ppc-treeview-leaf"><a href="./">' + newName + '</a></li>'
      //   break;
      default:
        break;
    }
  }


  // 定位所有非叶子节点
  var treeNodes = context.children('ul').first().children('li').filter(function () {
    return this.className === 'ppc-treeview-node';
  });
  // 定位最后一个非叶子节点
  var treeNode = treeNodes.last();

  if (context.children('ul').first().children('li').length === 0) {
    context.children('ul').first().html(newHtml)
  } else if (treeNodes.length === 0) {
    context.children('ul').first().children('li').first().before(newHtml);
  } else {
    treeNode.after(newHtml);
  }
  // TODO: 添加数据库信息
  // TODO: 添加模板数据
}

// 叶子节点被单击
function handleLeafClicked(context) {

}
