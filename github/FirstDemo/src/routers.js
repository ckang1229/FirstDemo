// import index from './views/project.vue'
import index from './views/foot.vue'
import account from './views/account.vue'
import grouplist from './views/grouplist.vue'
import accountdetail from './views/accountDetail.vue'
import empty from './views/empty.vue'
import error from './views/error.vue'
import statistics from './views/statistics.vue'
import bar from './views/bar.vue'
import bookdetail from './views/bookdetail.vue'
import share from './views/share.vue'
import exportbook from './views/exportbook.vue'
import addbook from './views/addbook.vue'
import billDetail from './views/billDetail.vue'
import flowStatistics from './views/flowStatistics.vue'
import monthDetail from './views/monthDetail.vue'
import editAccount from './views/editAccount.vue'
import test from './views/test.vue'
import Hometabs from './views/Hometabs.vue'
import Homemain from './views/Homemain.vue'

module.exports = function(router) {
    router.map({
        '/': {
            name: 'index',
            component: index,
            //auth: true // 微信端首页
        },
        '/account/:listnumber': {
            name: 'account',
            component: account,
            //auth: true // 微信端记账页面
        },
        '/grouplist': {
            name: 'grouplist',
            component: grouplist,
            //auth: true // 微信端账本列表页
        },
        '/accountdetail/:listnumber': {
            name: 'accountdetail',
            component: accountdetail,
            //auth: true // 微信端通过账本列表页进去首页
        },
        '/empty': {
            name: 'empty',
            component: empty,
            //auth: true // 为空页面
        },
        '/error': {
            name: 'error',
            component: error,
            //auth: true // 错误提示页面
        },
        '/statistics/:listnumber': {
            name: 'statistics',
            component: statistics,
            //auth: true // 饼图统计页面
        },
        '/bar': {
            name: 'bar',
            component: bar,
        },
        '/bookdetail': {
            name: 'bookdetail',
            component: bookdetail,
            //  点击更多进入账本详情页
        },
        '/share': {
            name: 'share',
            component: share,
            // 共享账本页
        },
        '/exportbook': {
            name: 'exportbook',
            component: exportbook,
            // 导出账单页
        },
        '/addbook': {
            name: 'addbook',
            component: addbook,
            // 新建账本页
        },
        '/billDetail/:bookuuid/:uuId': {
            name: 'billDetail',
            component: billDetail,
            // 账本明细页 可编辑可删除可查看 通过该条记录的bookuuid以及该条记录的唯一uuid
        },
        '/flowStatistics/:bookuuid': {
            name: 'flowStatistics',
            component: flowStatistics,
            // 年份统计页 根据bookuuid获取数据
        },
        '/monthDetail/:bookuuid/:month/:memberid': {
            name: 'monthDetail',
            component: monthDetail,
            // 月份单人或全部成员账单页 需要bookuuid,月份month,记录人memberId（如果是共享账本）
        },
        '/editAccount/:bookuuid/:uuId': {
            name: 'editAccount',
            component: editAccount,
            // 通过点击编辑进入该记账页
        },
        '/test': {
            name: 'test',
            component: test
        }
    });

    window.routeList = [];
    router.beforeEach(function(transition) {
        // //if(transition.to.path === '/forbidden'){
        if (transition.to.name == 'forbidden') {
            router.app.authenticating = true
            setTimeout(function() {
                router.app.authenticating = false
                alert('此路由在全局中设置为中止');
                transition.abort();
            }, 1500);
        }

        if (routeList.length > 1 && transition.to.name == routeList[routeList.length - 2]['name']) {
            router.app.effect = 'back';
            routeList.splice(routeList.length - 1, 1);
            //console.log(routeList);
        } else {
            router.app.effect = 'fade';
            routeList.push({
                name: transition.to.name,
                path: transition.to.path,
                query: transition.to.query,
                params: transition.to.params,
                timer: +new Date
            });
        }

        //setTimeout(function(){
        transition.next();
        //},1000);
    });


    //可以记录访问路径
    router.afterEach(function(transition) {
        for (var i = 0; i < routeList.length; i++) {
            // console.log(routeList[i].name)
            // window.location.reload()
        };
    });
}
