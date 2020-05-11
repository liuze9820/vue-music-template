let vm = new Vue({
    el: '.wrap',
    data: {
        currentIndex: -1,
        isplaying: false, //是否正在播放
        isMvShow: false,//mv图标false默认不显示
        keywords: '',//搜索内容
        musicList: [], //所有歌曲列表
        musicPic: '', //歌曲图片
        musciComments: [],//音乐热门评论
        musicUrl: '',//音乐播放地址
        isShow: false,//mv默认不显示
        mvUrl: '',//mv的url地址
        flag: true,//用户控制用户点击回车键是否可以再点击(1.3s)
    },
    created() {
        // 创建完成
        // 获取所有歌曲列表
        this.getSongsList();
    },
    methods: { // 获取所有歌曲列表
        async getSongsList(){
            let res = await axios.get('https://autumnfish.cn/artist/top/song?id=6452');
            this.musicList = res.data.songs;
        },
        //  播放音乐
        playMusic(id,index) {
            //播放音乐
            this.start(index);
        },
        // 搜索歌曲
        seachMusic(m) {
            //重新定义this变量，因为this作用域不在axios；
            const _this = this;
            axios.get('https://autumnfish.cn/search?keywords=' + m).then(function (res) {
                _this.musicList = res.data.result.songs;
            });
        },
        // 上一首
        prev() {
            //currentIndex播放音乐时候会获取当前歌曲index 赋值给currentIndex 通过加减当前歌曲 的坐标来实现歌曲切换
            this.start(this.currentIndex-1);
        },
        //歌曲详情
        detail(id) {
            const _this = this;
            //通过id查询当前歌曲详情
            axios.get("https://autumnfish.cn/song/detail?ids=" + id).then(function (res) {
                var _songs = res.data.songs;
                _this.musicPic = _songs[0].al.picUrl;
            });
        },
        //评论
        hotComment(id) {
            const _this = this;
            //通过id查询当前歌曲详情
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + id).then(function (res) {
                _this.musciComments = res.data.hotComments;
            });
        },
        //播放音乐
        start(index) {
            //alert(index);
            this.currentIndex=index;
            const _this = this;
            var mu=this.musicList[index];
            var idM=mu.id;
            _this.isplaying = true;
            axios.get('https://autumnfish.cn/song/url?id=' + idM).then(function (res) {
                var _data = res.data.data[0];
                _this.musicUrl = _data.url;
            });
            this.hotComment(idM);
            this.detail(idM);
        },
        // 下一首
        next() {
            this.start(this.currentIndex+1);
        },
        // 音乐播放
        play() {
            this.isplaying = true;

        },
        // 音乐暂停
        pause() {
            this.isplaying = false;
        },
        // 播放mv
        playMv(mvId) {
            // alert(mvId);
            const _this = this;
            axios.get('https://autumnfish.cn/mv/url?id=' + mvId).then(function (res) {
                _this.isShow = true;
                _this.mvUrl = res.data.data.url;
            });

        },
        // 点击遮罩层 隐藏mv
        hide() {

        }
    }
})
