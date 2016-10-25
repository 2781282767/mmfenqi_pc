angular.module('app', [])
.controller('demoCtrl', ['$scope', function($scope) {
  $scope.respData = {};
  $scope.auth_platform = {
    "appkey": "25b693b31d2c2ad5f072ef0c",
    "random_str": "022cd9fd995849b58b3ef0e943421ed9",
    "signature": "D97C2DDA3E46E5E6D482E9E8EE84AF93",
    "timestamp": "1467967210887"
  };
  $scope.username = "JSCrossTest";
  $scope.password = "123456";
  $scope.group_id = 10217803;
  $scope.friend_name = 'JSCrossTest2';
  $scope.across_name = 'xuqijin1';
  $scope.appkey = '4f7aef34fb361292c566a1cd';
  $scope.member_list = [{
    'username': 'xuqijin1',
    'appkey': '4f7aef34fb361292c566a1cd'
  }, {
    'username': 'JSCrossTest2',
    'appkey': '25b693b31d2c2ad5f072ef0c'
  }]
  $scope.regname = 'aabb1122';
  $scope.regpwd = '123456';

  JIM.init({
  });

  var consolePad = document.getElementById('console-pre');
  $scope.resp = function(data) {
    console.log("resp : " + JSON.stringify(data));
    $scope.respData[$scope.respData.type] = JSON.stringify(data);
    $scope.$apply($scope.respData);
    var childNode = document.createElement('span');
    childNode.innerHTML = $scope.respData[$scope.respData.type];
    consolePad.appendChild(childNode);
  }

  $scope.ack = function(data) {
    console.log("ack : " + JSON.stringify(data));
  }

  $scope.timeout = function(data) {
    console.log("timeout : " + JSON.stringify(data));
  }

  $scope.register = function() {
    console.log('register..');
    $scope.respData.type = 'register';
    JIM.register($scope.regname, $scope.regpwd, $scope.auth_platform, $scope.resp, $scope.ack, $scope.timeout);
  }
  $scope.login = function() {
    console.log("login...");
    $scope.respData.type = 'login';
    JIM.login($scope.username, $scope.password, $scope.auth_platform, $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.getUserInfo = function() {
    console.log('getUserInfo...');
    $scope.respData.type = 'userInfo';
    JIM.getUserInfo($scope.friend_name, $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.getAcrossUserInfo = function() {
    console.log('getAcrossUserInfo...');
    $scope.respData.type = 'acrossUserInfo';
    JIM.getAcrossUserInfo($scope.across_name, $scope.appkey, $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.sendSingleMsg = function() {
    console.log('sendSingleMsg...');
    $scope.respData.type = 'singleMsg';
    JIM.sendSingleMsg($scope.friend_name, 'Hi, JPush', $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.sendAcrossSingleMsg = function(){
    console.log('sendAcrossSingleMsg...');
    $scope.respData.type = 'acrossSingleMsg';
    JIM.sendAcrossSingleMsg($scope.across_name, $scope.appkey, 'Hi, JPush', $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.sendGroupMsg = function() {
    console.log('sendGroupMsg...');
    $scope.respData.type = 'groupMsg';
    JIM.sendGroupMsg($scope.group_id, 'Hi, JPush', $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.sendMsgWithBuilder = function() {
    console.log('sendMsgWithBuilder...');
    $scope.respData.type = 'builderMsg';
    JIM.createMsgBuilder()
    .setType('single')
    .setTarget($scope.friend_name)
    .setCustom({'custom_key1':'custom_value1', 'custom_key2':'custom_value2'})
    .send($scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.createGroup = function() {
    console.log('createGroup...');
    $scope.respData.type = 'createGroup';
    JIM.createGroup('Group Name', 'Group Description', $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.getGroupList = function() {
    console.log('getGroupList...');
    $scope.respData.type = 'groupList';
    JIM.getGroupList($scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.getGroupInfo = function() {
    console.log('getGroupInfo...');
    $scope.respData.type = 'groupInfo';
    JIM.getGroupInfo($scope.group_id, $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.addGroupMember = function() {
    console.log('addGroupMember...');
    $scope.respData.type = 'addMem';
    JIM.addGroupMember($scope.group_id, ['xiezefan01', 'xiezefan02', 'xiezefan03'], $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.addAcrossGroupMember = function() {
    console.log('addGroupMember...');
    $scope.respData.type = 'addAcrossMem';
    JIM.addAcrossGroupMember($scope.group_id, $scope.member_list, $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.delGroupMember = function() {
    console.log('delGroupMember...');
    $scope.respData.type = 'delMem';
    JIM.delGroupMember($scope.group_id, ['xiezefan01', 'xiezefan02', 'xiezefan03'], $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.delAcrossGroupMember = function() {
    console.log('delAcrossGroupMember...');
    $scope.respData.type = 'delAcrossMem';
    JIM.delAcrossGroupMember($scope.group_id, $scope.member_list, $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.getGroupMembers = function() {
    console.log('getGroupMembers...');
    $scope.respData.type = 'getMem';
    JIM.getGroupMembers($scope.group_id, $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.updateGroupInfo = function() {
    console.log('updateGroupInfo...');
    $scope.respData.type = 'updateGroup';
    JIM.updateGroupInfo($scope.group_id, 'New Group Name', 'New Group Description', $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.exitGroup = function() {
    console.log('exitGroup...');
    $scope.respData.type = 'exitGroup';
    JIM.exitGroup(10210191, $scope.resp, $scope.ack, $scope.timeout);
  }

  $scope.getConversations = function() {
    console.log('getConversations...');
    $scope.respData.type = 'conversations';
    JIM.getConversations($scope.resp, $scope.ack, $scope.timeout);
  }
  $scope.getNoDisturb = function() {
    console.log('getNoDisturbList..');
    $scope.respData.type = 'getDisturb';
    JIM.getNoDisturb($scope.resp, $scope.ack, $scope.timeout);
  }
  $scope.addSingleNoDisturb = function() {
    console.log('addSingleNoDisturb');
    $scope.respData.type = 'addSingleDisturb';
    JIM.addSingleNoDisturb($scope.friend_name, $scope.resp, $scope.ack, $scope.timeout);
  }
  $scope.deleteSingleNoDisturb = function() {
    console.log('deleteSingleNoDisturb..');
    $scope.respData.type = 'delSingleDisturb';
    JIM.deleteSingleNoDisturb($scope.friend_name, $scope.resp, $scope.ack, $scope.timeout);
  }
  $scope.addGroupNoDisturb = function() {
    console.log('addGroupNoDisturb..');
    $scope.respData.type = 'addGroupDisturb';
    JIM.addGroupNoDisturb($scope.group_id, $scope.resp, $scope.ack, $scope.timeout);
  }
  $scope.deleteGroupNoDisturb = function() {
    console.log('deleteGroupNoDisturb..');
    $scope.respData.type = 'delGroupDisturb';
    JIM.deleteGroupNoDisturb($scope.group_id, $scope.resp, $scope.ack, $scope.timeout);
  }
  $scope.addGlobalNoDisturb = function() {
    console.log('addGlobalNoDisturb..');
    $scope.respData.type = 'addGlobalDisturb';
    JIM.addGlobalNoDisturb($scope.resp, $scope.ack, $scope.timeout);
  }
  $scope.deleteGlobalNoDisturb = function() {
    console.log('deleteGlobalNoDisturb..');
    $scope.respData.type = 'delGlobalDisturb';
    JIM.deleteGlobalNoDisturb($scope.resp, $scope.ack, $scope.timeout);
  }
  $scope.getBlackList = function() {
    console.log('get black list ..');
    $scope.respData.type = 'blackList';
    JIM.getBlackList($scope.resp, $scope.ack, $scope.timeout);
  }
  $scope.addBlackList = function() {
    console.log('add black list ..');
    $scope.respData.type = 'addBlackList';
    JIM.addBlackList($scope.member_list, $scope.resp, $scope.ack, $scope.timeout);
  }
  $scope.delBlackList = function() {
    console.log('del black list ..');
    $scope.respData.type = 'delBlackList';
    JIM.delBlackList($scope.member_list, $scope.resp, $scope.ack, $scope.timeout);
  }
  $scope.getUploadToken = function() {
    console.log('getUploadToken...');
    $scope.respData.type = 'uploadToken';
    JIM.getUploadToken($scope.resp, $scope.ack, $scope.timeout);
  }
  document.getElementById('imgCtnSingle').addEventListener('change', function(event) {
    document.getElementById('singleImgName').value = event.currentTarget.files[0].name.toString();
  })
  document.getElementById('upSingleImg').addEventListener('click', function() {
    //监听图片上传事件,获得FormData，调用sdk方法
    var fd = new FormData();
    var imgCtn = document.getElementById('imgCtnSingle');
    if(!imgCtn.files[0]) {return;}
    fd.append(imgCtn.files[0].name, imgCtn.files[0]);
    console.log('send single pic msg..');
    $scope.respData.type = 'singleImg';
    JIM.uploadImg({
      target_username: $scope.across_name,
      appkey: $scope.appkey,
      fd: fd,
      resp: $scope.resp,
      ack: $scope.ack,
      timeout: $scope.timeout,
      type: 'single'
    })
  })
  document.getElementById('imgCtnGroup').addEventListener('change', function(event) {
    document.getElementById('groupImgName').value = event.currentTarget.files[0].name.toString();
  })
  document.getElementById('upGroupImg').addEventListener('click', function() {
    //监听图片上传事件,获得FormData，调用sdk方法
    var fd = new FormData();
    var imgCtn = document.getElementById('imgCtnGroup');
    if(!imgCtn.files[0]) {return;}
    fd.append(imgCtn.files[0].name, imgCtn.files[0]);
    console.log('send group pic msg..');
    $scope.respData.type = 'groupImg';
    JIM.uploadImg({
      target_gid: $scope.group_id,
      fd: fd,
      resp: $scope.resp,
      ack: $scope.ack,
      timeout: $scope.timeout,
      type: 'group'
    })
  })
}])
