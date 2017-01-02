/**
 * Created by chalresbao on 16/12/15.
 */

export let userInformation = {
    user:{
        username:"charlesBao",
        nickname:"有鲸余"
    },
    favour:[
        {
            type:-1,
            id: 1,
            title: "买单吧,下单支付得奖励1",
        },
        {
            type:0,
            id: 0,
            title: "买单吧,下单支付得奖励",
        },
    ],
    mission:[
        {
            type:-1,
            id: 0,
            title: "买单吧,下单支付得奖励",
        },
        {
            type:1,
            id: 3,
            title: "买单吧,下单支付得奖励3",
        },
        {
            type:3,
            id: 2,
            title: "买单吧,下单支付得奖励2",
        },
        {
            type:2,
            id:1,
            title: "买单吧,下单支付得奖励1",
        }
    ]
}

export let missionList = [
    {
        id: 0, //唯一编号
        title: "买单吧,下单支付得奖励", //标题
        description: "ceshiceshiceshi", //简单描述
        instruction: "买单吧ceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\n", //任务说明
        tutorial: "1.xxxxxx\n2.sxxxdsadas", //任务步骤
        publishDate: "2016-11-30",
        dueDate: "2016-11-30", //截止日期
        checkCycle: 72, //审核周期 [小时]
        canBeRepeat: true, //是否可以重复执行
        count: 99, //剩余
        price: "8.90", //任务价格
        comments: [
        ],
        attribute:1, //性质
    },
    {
        id: 1, //唯一编号
        title: "买单吧,下单支付得奖励1", //标题
        description: "ceshiceshiceshi", //简单描述
        instruction: "ceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\n", //任务说明
        tutorial: "1.xxxxxx\n2.sxxxdsadas\n3.xxxxxx\n4.sxxxdsadas", //任务步骤
        publishDate: "2016-11-28",
        dueDate: "2016-11-30", //截止日期
        checkCycle: 72, //审核周期 [小时]
        canBeRepeat: true, //是否可以重复执行
        count: 99, //剩余
        price: "1.90", //任务价格
        comments: [
            {
                avatar:"https://build.phonegap.com/images/icon.png",
                id:"2100001",
                nickname:"test1",
                content:"This is the block element that contains the primary text. If a string is passed in, a div tag will be rendered."
            },
            {
                avatar:"https://build.phonegap.com/images/icon.png",
                id:"2100002",
                nickname:"test2",
                content:"This is the block element that contains the primary text. If a string is passed in, a div tag will be rendered."
            }
        ],
        attribute:0, //性质
    },
    {
        id: 2, //唯一编号
        title: "买单吧,下单支付得奖励2", //标题
        description: "ceshiceshiceshi", //简单描述
        instruction: "ceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\n", //任务说明
        tutorial: "1.xxxxxx\n2.sxxxdsadas\n3.xxxxxx\n4.sxxxdsadas", //任务步骤
        publishDate: "2016-11-28",
        dueDate: "2016-11-30", //截止日期
        checkCycle: 72, //审核周期 [小时]
        canBeRepeat: true, //是否可以重复执行
        count: 99, //剩余
        price: "1.90", //任务价格
        comments: [
            {
                avatar:"https://build.phonegap.com/images/icon.png",
                id:"2100001",
                nickname:"test1",
                content:"This is the block element that contains the primary text. If a string is passed in, a div tag will be rendered."
            },
            {
                avatar:"https://build.phonegap.com/images/icon.png",
                id:"2100002",
                nickname:"test2",
                content:"This is the block element that contains the primary text. If a string is passed in, a div tag will be rendered."
            }
        ],
        attribute:0, //性质
    },
    {
        id: 3, //唯一编号
        title: "买单吧,下单支付得奖励3", //标题
        description: "ceshiceshiceshi", //简单描述
        instruction: "ceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\n", //任务说明
        tutorial: "1.xxxxxx\n2.sxxxdsadas\n3.xxxxxx\n4.sxxxdsadas", //任务步骤
        publishDate: "2016-11-28",
        dueDate: "2016-11-30", //截止日期
        checkCycle: 72, //审核周期 [小时]
        canBeRepeat: true, //是否可以重复执行
        count: 99, //剩余
        price: "1.90", //任务价格
        comments: [
            {
                avatar:"https://build.phonegap.com/images/icon.png",
                id:"2100001",
                nickname:"test1",
                content:"This is the block element that contains the primary text. If a string is passed in, a div tag will be rendered."
            },
            {
                avatar:"https://build.phonegap.com/images/icon.png",
                id:"2100002",
                nickname:"test2",
                content:"This is the block element that contains the primary text. If a string is passed in, a div tag will be rendered."
            }
        ],
        attribute:3, //性质
    },
    {
        id: 4, //唯一编号
        title: "买单吧,下单支付得奖励4", //标题
        description: "ceshiceshiceshi", //简单描述
        instruction: "ceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\n", //任务说明
        tutorial: "1.xxxxxx\n2.sxxxdsadas\n3.xxxxxx\n4.sxxxdsadas", //任务步骤
        publishDate: "2016-11-28",
        dueDate: "2016-11-30", //截止日期
        checkCycle: 72, //审核周期 [小时]
        canBeRepeat: true, //是否可以重复执行
        count: 99, //剩余
        price: "4.90", //任务价格
        comments: [
            {
                avatar:"https://build.phonegap.com/images/icon.png",
                id:"2100001",
                nickname:"test1",
                content:"This is the block element that contains the primary text. If a string is passed in, a div tag will be rendered."
            },
            {
                avatar:"https://build.phonegap.com/images/icon.png",
                id:"2100002",
                nickname:"test2",
                content:"This is the block element that contains the primary text. If a string is passed in, a div tag will be rendered."
            }
        ],
        attribute:0, //性质
    },
    {
        id: 5, //唯一编号
        title: "买单吧,下单支付得奖励5", //标题
        description: "ceshiceshiceshi", //简单描述
        instruction: "ceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\nceshiceshices\n", //任务说明
        tutorial: "1.xxxxxx\n2.sxxxdsadas\n3.xxxxxx\n4.sxxxdsadas", //任务步骤
        publishDate: "2016-11-28",
        dueDate: "2016-11-30", //截止日期
        checkCycle: 72, //审核周期 [小时]
        canBeRepeat: true, //是否可以重复执行
        count: 99, //剩余
        price: "6.90", //任务价格
        comments: [
            {
                avatar:"https://build.phonegap.com/images/icon.png",
                id:"2100001",
                nickname:"test1",
                content:"This is the block element that contains the primary text. If a string is passed in, a div tag will be rendered."
            },
            {
                avatar:"https://build.phonegap.com/images/icon.png",
                id:"2100002",
                nickname:"test2",
                content:"This is the block element that contains the primary text. If a string is passed in, a div tag will be rendered."
            }
        ],
        attribute:3, //性质
    }
]