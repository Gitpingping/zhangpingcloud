module.exports = {
    lang: 'zh-CN',
    title: 'zhangpingcloud',
    description: '张平的技术文档',

    themeConfig: {
        logo: 'https://zhangpingcloud-1252362494.cos.ap-nanjing.myqcloud.com/zhangpingcloud/logo.png',
        // 配置头部导航栏
        navbar: [
            {
                text: 'HTML教程',
                children: [
                    {
                        text: 'HTML学习',
                        link: '/html/study.html',
                    },
                    {
                        text: 'HTML转载',
                        link: '/html/reship.html',
                    },
                    {
                        text: 'HTML原创',
                        link: '/html/original.html',
                    },
                    {
                        text: 'HTML面试题',
                        link: '/html/interview.html',
                    },
                ]
            },
            {
                text: 'CSS教程',
                children: [
                    {
                        text: 'CSS学习',
                        link: '/css/study.html',
                    },
                    {
                        text: 'CSS面试题',
                        link: '/css/interview.html',
                    }
                ]
            },
            {
                text: 'JavaScript',
                children: []
            },
        ],
        // 我们会将它作为一个 GitHub 仓库
        // 你也可以直接将它设置为一个 URL
        repo: 'https://gitlab.com/foo/bar',
    },
    plugins: [
        [
            '@vuepress/plugin-search',
            {
                locales: {
                    '/': {
                        placeholder: '搜索'
                    }
                }
            }
        ]
    ]
}