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
    methods: {
        // 获取所有歌曲列表
        async getSongsList() {
            let res = await axios.get('https://autumnfish.cn/artist/top/song?id=6452');
            this.musicList = res.data.songs;
        },

        //  播放音乐
        playMusic(id, index) {
            const _this = this;
            _this.isplaying=true;
            //alert(index);
            axios.get('https://autumnfish.cn/song/url?id=' + id).then(function (res) {
                //  console.log("返回结果："+res.result.songs);
                var _data=res.data.data[0];
                //alert(JSON.stringify());
                _this.musicUrl = _data.url;
               //   alert(this.musicList)
            });
        },
        // 搜索歌曲
        seachMusic(m) {
            //
            const _this = this;
            //alert("歌曲名称：" + m);
            axios.get('https://autumnfish.cn/search?keywords=' + m).then(function (res) {
              //  console.log("返回结果："+res.result.songs);
                _this.musicList = res.data.result.songs;
              //  alert(this.musicList)
            });
        },
        // 上一首
        prev() {

        },
        // 下一首
        next() {

        },
        // 音乐播放
        play() {
            this.isplaying=true;

        },
        // 音乐暂停
        pause() {
            this.isplaying=false;
        },
        // 播放mv
        playMv(mvId) {
          // alert(mvId);
            const  _this=this;
            axios.get('https://autumnfish.cn/mv/url?id=' + mvId).then(function (res) {
                _this.isShow = true;
                _this.mvUrl=res.data.data.url;
                // alert(_this.mvUrl+"\n"+res.data.data.url)
            });
        },
        // 点击遮罩层 隐藏mv
        hide() {

        }
    }
})
