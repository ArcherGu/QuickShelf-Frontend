export default {
    failed: 'Action failed',
    success: 'Action was successful',

    //Operate 操作类
    operate: {
        self: '操作',
        add: '添加',
        edit: '编辑',
        delete: '删除',
        save: '保存',
        confirm: '确认',
        cancel: '取消',
    },

    //Common 公共类
    common: {
        none: '无',
        dataTable: '数据列表',
        max: '最大',
        min: '最小',
        amount: '数量',
        flag: '标识',
        telephone: '联系电话'
    },

    //Shop 店铺类
    shop: {
        self: '店铺'
    },

    district: {
        self: '地区',
        province: '省/直辖市',
        city: '市/区',
        area: '区/县',
        address: '详细地址'
    },

    //Auth 用户类
    auth: {
        username: '用户名',
        password: '密码',
        confirm_password: '确认密码',
        login: "登陆",
        logining: "登陆中...",
        remember_me: "记住我",
        real_name: '真实姓名',
        phone_number: '手机号码',
    },

    company: {
        self: '公司',
    },

    router: {
        index_home: '首页',
        admin: '系统管理',
        admin_home: '控制台',
        router_manage: '路由管理',
        company_manage: '公司管理'
    },

    //Admin 管理员类
    admin: {
        router: {
            self: '路由',
            path: '路径',
            name: '名称',
            redirect: '重定向',
            component: '组件',
            title: '标题',
            icon: '图标',
            sort: '排序',
            belongTo: '从属',
            roleNames: '角色',
            isLock: '是否锁定',
            isMenu: '菜单路由',
            isUse: '使用状态',
            root: '根路由',
        }
    },

    //Role 角色类
    role: {
        none: '无角色',
        admin: '管理员',
        boss: '老板',
        manager: '店长',
        staff: '店员'
    },

    //Errors 错误类
    errors: {
        input_required: '* 请输入{item}',
        input_available: '* 请输入有效的{item}',
        input_exist: '{item}已经存在',
        input_telephone: '请输入正确的手机号码或电话号码；例如:13916752109或0712-3614072',
        select_required: '* 必须选择一个{item}',
        diff_pwd: '两次密码不一致！',
        easy_pwd: '密码长度必须大于等于{num}位',
        illegal_pwd: '密码必须由数字或者大小写字母组成',
        network: '网络错误，请检查你的网络状况！',
        admin_flag: '管理员标示错误！',
        unauthorized: '抱歉！您没有权限！',
        login_failed: '登陆失败，用户名或者密码错误！',
        freeze_user: '该用户已被冻结！无法操作！'
    },

    //Messages 信息类
    messages: {
        update_available: '有新的版本更新！'
    }

}
