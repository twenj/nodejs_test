let commonOptions = {
  host: 'api.backend.com',
  port: '80',
  headers: {
    'Content-Type': 'application/json'
  }
};

let commonGetParams = {
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjIwLCJyZWFsX25hbWUiOiJcdTZkNGJcdThiZDUiLCJzYWx0IjoiZWJiNWFjIiwicHdkIjoiNzhCNEZDNzU0MDJDMDJENjcwNzEwOEZDNDIwODVDODQiLCJjcmVhdGVfdGltZSI6MTUzMzU0NjU0MywiaWF0IjoxNTUzMDc1MTI0LCJleHAiOjE1NTMwODIzMjR9.mxcZYn-okMlRDJSzJIuhRH0VRtfv2uJ7NKwd7ndY0F0",
  "uid": 20
};

let apiOptions = {
  "1": {
    path: '/index.php',
    method: 'get',
    params: {
      "p": "console",
      "v": 1,
      "c": "content",
      "do": "newResource",
      "resource_id": 1095,
      "expert_id": 144,
      "title": "测试4",
      "detail": "[{\"detail_id\":1691,\"resource_id\":1230,\"content\":\"是\",\"modify_time\":null,\"static\":[],\"schedule\":[{\"schedule_id\":203773,\"match_type\":1,\"league_id\":1009,\"league_name\":\"维亚杯\",\"master_team\":\"国际米兰青年队\",\"master_score\":0,\"guest_team\":\"列治哈特老虎青年队\",\"guest_score\":0,\"schedule_time\":1552658400,\"result\":0,\"is_recommend\":0,\"schedule_status\":2,\"match_type_icon\":\"https://hl-static.feiyun.tv/match_type/1.png\",\"schedule_week\":\"周五\",\"schedule_date\":\"03-15\",\"schedule_hour\":\"22:00\"}]}]",
      "price": 0.01,
      "resource_type": 1,
      "display_platform": "11"
    }
  }
};

export {
  commonOptions,
  commonGetParams,
  apiOptions
};


