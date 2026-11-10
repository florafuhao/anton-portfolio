(() => {
  'use strict';

  const view = document.getElementById('view');
  const assets = 'assets/';
  const assetUrl = path => /^(?:https?:|data:|blob:|file:)/i.test(path || '') ? path : `${assets}${path || ''}`;
  const posterAttribute = path => path ? ` poster="${assetUrl(path)}"` : '';
  const publicVideoNames = new Map([
    ['016defce0u228cce8b9cec304441b423.MP4', 'video-01.mp4'],
    ['94c6eb545q19e81c1c27cae8d9807947.MP4', 'video-02.mp4'],
    ['c05440a80u11d6b7f2b27664607658a4.MP4', 'video-03.mp4'],
    ['m5-ev-avc.mp4', 'video-04.mp4'],
    ['m5-braking-avc.mp4', 'video-05.mp4'],
    ['model-y-avc.mp4', 'video-06.mp4'],
    ['穿越到粘土世界里游日本_穿越到粘土世界里游日本_粘土滤镜_粘土特效_粘土世界的另一个我_大家觉得哪个.mp4', 'video-07.mp4'],
    ['用五年的iPhone竟依然可以以换代修换新机_用五年的iPhone竟依然可以以换代修换新机_我的iP.mp4', 'video-08.mp4'],
    ['网约车找工作建议 (16).mp4', 'video-09.mp4'],
    ['IMG_7588.MOV', 'video-10.mov'],
    ['戴着乐奇一起旅行，时刻记录最好的我们！.mp4', 'video-11.mp4'],
    ['给我的奥迪A3，换了双.mp4', 'video-12.mp4'],
    ['说摩托的归宿是踏板那汽车的归宿也许是它_说摩托的归宿是踏板那汽车的归宿也许是它_我的第一辆汽车是一辆.mp4', 'video-13.mp4'],
    ['video_正畸15年发生了哪些变化_正畸1..._0.mp4', 'video-14.mp4'],
    ['秋天第一场露营感受风吹麦浪暴雨扎营_秋天第一场露营感受风吹麦浪暴雨扎营_秋天的第一场露营一路北上感受 (1).mp4', 'video-15.mp4'],
    ['把2025的记忆浓缩在了40s去感受去热爱_把2025的记忆浓缩在了40s去感受去热爱_1月_以日本 (1).mp4', 'video-16.mp4'],
    ['私日本物語一分钟游大阪京都_私日本物語一分钟游大阪京都_旅游vlog_vlog_日本旅游_日本红叶季.mp4', 'video-17.mp4'],
    ['Jeju在冬天开始怀念济州岛的夏天_Jeju在冬天开始怀念济州岛的夏天_安东尼小符号_济州岛旅行_济.mp4', 'video-18.mp4'],
    ['我的求婚现场片尾附详细流程攻略_我的求婚现场片尾附详细流程攻略_我终于求婚啦_周三的突发奇想周四的行.mp4', 'video-19.mp4'],
    ['video_以为奥迪A3不贵直到我算了下养车..._0.mp4', 'video-20.mp4'],
    ['video_全网第二辆越野姿态北斗星露营首秀..._0.mp4', 'video-21.mp4'],
    ['嗨害嗨露营装备大盲盒拆它_嗨害嗨露营装备大盲盒拆它_采购了第N批露营装备并且这次都是大件好物性价比极.mp4', 'video-22.mp4'],
    ['video_准备抢富士-黄牛看了这个都挠头_..._0.mp4', 'video-23.mp4'],
    ['奥迪A3也能玩床车搭建_奥迪A3也能玩床车搭建_借着出去露营的机会给大家再拍一次更详细的床车搭建流程 (1).mp4', 'video-24.mp4'],
    ['video_谁还在买富士XM5啊_谁还在买富..._0.mp4', 'video-25.mp4'],
  ]);
  const publicVideo = filename => `https://github.com/florafuhao/anton-portfolio/releases/download/media-v1/${encodeURIComponent(publicVideoNames.get(filename) || filename)}`;
  const downloadsVideo = filename => location.protocol === 'file:' ? `file:///Users/fuhao/Downloads/${encodeURIComponent(filename)}` : publicVideo(filename);
  const projectVideo = filename => location.protocol === 'file:' ? `file:///Users/fuhao/.codex/.chatgpt-projects/g-p-6ae9fb8d791c81918619f25bcc5693a9/anton-portfolio/tmp/videos/${encodeURIComponent(filename)}` : publicVideo(filename);
  const routes = ['home'];
  const homeSections = ['gather', 'film', 'ai', 'commercial', 'travel-journal', 'auto-tech'];
  const routeNames = { home: '首页' };
  const state = { outfit: 'host', workFilter: 'all', platform: 'all', travelTab: 'vlog', lifeTab: 'car', albumIndex: 0 };
  const outfits = {
    host: { image: 'turntable/host-0.png', frame: 'host', label: '休闲', alt: '安东穿灰色卫衣、双手抱臂的 3D 手办' },
    camera: { image: 'turntable/camera-0.png', frame: 'camera', label: '街头', alt: '安东街头穿搭的 3D 手办' },
    travel: { image: 'turntable/travel-0.png', frame: 'travel', label: '户外', alt: '安东户外穿搭的 3D 手办' }
  };
  const outfitFramePath = (key, index) => `${assets}turntable/${outfits[key].frame}-${index}.png`;
  const outfitCache = new Map(Object.keys(outfits).map(key => [key, Array.from({ length: 8 }, (_, index) => {
    const image = new Image();
    image.src = outfitFramePath(key, index);
    image.decode?.().catch(() => {});
    return image;
  })]));
  const works = [
    { id: 'long', filter: 'long', category: '中长视频', title: '中长视频代表作', graphic: 'LONG<br>FORM', play: null, like: null, save: null, comment: null },
    { id: 'short', filter: 'short', category: '口播短视频', title: '口播短视频代表作', graphic: 'LET’S<br>TALK', play: null, like: null, save: null, comment: null },
    { id: 'ai', filter: 'ai', category: 'AI 创作', title: 'AI 影像作品', graphic: 'AI<br>PLAY', play: null, like: null, save: null, comment: null }
  ];
  const featuredFilmWorks = [
    {
      title: '懂车帝新能源冬测｜极寒环境综合测评',
      label: '新能源冬季测试',
      video: downloadsVideo('016defce0u228cce8b9cec304441b423.MP4'),
      description: '参与懂车帝新能源冬季测试，以长周期现场拍摄呈现极寒环境下的综合表现'
    },
    {
      title: '哈弗大狗官方 TVC｜与顶级运动员共赴热爱',
      label: '汽车品牌官方宣传片',
      video: downloadsVideo('94c6eb545q19e81c1c27cae8d9807947.MP4'),
      description: '与顶级运动员共同完成的哈弗大狗官方宣传片，兼顾人物状态、品牌气质与车型表达'
    },
    {
      title: '哈弗大狗官方｜车友海边聚会',
      label: '官方车友活动影像',
      video: downloadsVideo('c05440a80u11d6b7f2b27664607658a4.MP4'),
      description: '哈弗大狗官方车友海边聚会的活动记录与氛围影像'
    },
    {
      title: '问界 M5 EV｜低温极限续航实测',
      label: '新能源极限评测',
      cover: 'works/m5-ev-range.jpg',
      video: projectVideo('m5-ev-avc.mp4'),
      description: '结合低温环境、仓内测试与高速路况，呈现问界 M5 EV 的真实续航表现'
    },
    {
      title: '问界 M5｜主动刹车安全实测',
      label: '智驾安全测试',
      cover: 'works/m5-braking.jpg',
      video: projectVideo('m5-braking-avc.mp4'),
      description: '围绕真实道路风险场景，验证问界 M5 主动刹车系统的响应能力'
    },
    {
      title: '特斯拉 Model Y｜低温高速续航实测',
      label: '新能源续航评测',
      cover: 'works/model-y-range.jpg',
      video: projectVideo('model-y-avc.mp4'),
      description: '通过低温长距离高速实测，呈现特斯拉 Model Y 的真实续航表现'
    }
  ];
  const showcaseSections = {
    ai: [
      { title: '妈，我要出国了｜马布岛', image: 'works/ai/mabul-island.jpeg' },
      { title: '奥迪 A3 车顶箱选择', image: 'works/ai/audi-roofbox-cover.png' },
      { title: '奥迪 A3 大同自驾', label: 'SD COVER DESIGN', description: '人物、车辆与目的地共同构成的旅行汽车封面', image: 'works/ai/audi-datong-roadtrip.jpeg' },
      { title: '骑摩托去崇礼滑雪', label: 'SD COVER DESIGN', description: '雪地、骑行与人物动作组合的内容封面', image: 'works/ai/chongli-motorcycle-3x4-v2.png' },
      { title: '米其林轮胎合作封面', label: 'AI COMMERCIAL VISUAL', description: '围绕轮胎产品与用车场景完成的商业内容视觉', image: 'works/ai/michelin-a3.jpeg' },
      { title: '定格动画 | 黏土世界里的日本', label: 'AI STOP MOTION', description: '黏土风格转绘的日本旅行定格动画', image: 'works/ai/clay-japan.jpg', video: downloadsVideo('穿越到粘土世界里游日本_穿越到粘土世界里游日本_粘土滤镜_粘土特效_粘土世界的另一个我_大家觉得哪个.mp4'), aspect: 'portrait' },
      { title: 'AppleCare｜五年 iPhone 使用记录', label: 'LIVE ACTION × AI', description: '真人实拍结合 AI 画面生成，全网 90 万播放', image: 'works/ai/iphone-five-years.jpg', video: downloadsVideo('用五年的iPhone竟依然可以以换代修换新机_用五年的iPhone竟依然可以以换代修换新机_我的iP.mp4'), aspect: 'portrait' },
      { title: 'AI 形象 | 网约车入行介绍', label: 'AI DIGITAL HUMAN', description: '用 AI 形象完成工作信息口播与场景化表达', image: 'works/ai/ride-hailing-ad-cover.png', video: downloadsVideo('网约车找工作建议 (16).mp4'), aspect: 'portrait' },
      { title: 'AI 形象 | 门店咨询', label: 'AI DIGITAL HUMAN', description: '用 AI 形象承载门店咨询信息与广告内容', image: 'works/ai/work-ad-case-cover.png', video: downloadsVideo('IMG_7588.MOV'), aspect: 'portrait' }
    ],
    commercial: [
      { title: '乐奇 AI 眼镜 | 日本邮轮', label: 'CREATIVE BRAND VIDEO', description: '用 AI 眼镜记录日本邮轮出行，把产品体验融进旅行故事', image: 'works/commercial/looqi-ai-glasses.jpg', video: downloadsVideo('戴着乐奇一起旅行，时刻记录最好的我们！.mp4'), aspect: 'portrait' },
      { title: '米其林竞驰 5 | 奥迪 A3', label: 'AUTOMOTIVE BRAND VIDEO', description: '从真实换胎和用车体验切入的米其林轮胎合作内容', image: 'works/commercial/michelin-a3.jpg', video: downloadsVideo('给我的奥迪A3，换了双.mp4'), aspect: 'portrait' },
      { title: '奔驰 smart | 新品发布预告', label: 'AI + AUTOMOTIVE', description: '奔驰 smart 商单，部分画面使用 AI 视频生成', image: 'works/commercial/smart-ai.jpg', video: downloadsVideo('说摩托的归宿是踏板那汽车的归宿也许是它_说摩托的归宿是踏板那汽车的归宿也许是它_我的第一辆汽车是一辆.mp4'), aspect: 'portrait' },
      { title: '恐龙医生牙膏｜5 年正畸变化', label: 'EXPERIENCE-LED CONTENT', description: '结合五年正畸变化分享真实经验，并自然植入恐龙医生牙膏', image: 'works/commercial/dinosaur-doctor.jpg', video: downloadsVideo('video_正畸15年发生了哪些变化_正畸1..._0.mp4'), aspect: 'landscape' },
      { title: '麦子和麦 | 大热荒野', label: 'CAMPING BRAND VIDEO', description: '麦子和麦饮品与大热荒野营地合作的户外场景内容', image: 'works/commercial/matemin-camp.jpg', video: downloadsVideo('秋天第一场露营感受风吹麦浪暴雨扎营_秋天第一场露营感受风吹麦浪暴雨扎营_秋天的第一场露营一路北上感受 (1).mp4'), aspect: 'landscape' }
    ],
    travel: [
      { title: '我们的 2025｜旅行年终总结', label: '2025 TRAVEL RECAP', description: '把一整年的出发与记忆浓缩进 40 秒', image: 'works/travel/2025-recap.jpg', video: downloadsVideo('把2025的记忆浓缩在了40s去感受去热爱_把2025的记忆浓缩在了40s去感受去热爱_1月_以日本 (1).mp4'), aspect: 'portrait' },
      { title: '日本暖冬 | 大阪与东京', label: 'JAPAN VLOG', description: '一分钟记录大阪、东京与冬日旅行', image: 'works/travel/japan-vlog.jpg', video: downloadsVideo('私日本物語一分钟游大阪京都_私日本物語一分钟游大阪京都_旅游vlog_vlog_日本旅游_日本红叶季.mp4'), aspect: 'portrait' },
      { title: '济州岛的夏天', label: 'KOREA VLOG', description: '济州岛的夏日海岸', image: 'works/travel/jeju-vlog.jpg', video: downloadsVideo('Jeju在冬天开始怀念济州岛的夏天_Jeju在冬天开始怀念济州岛的夏天_安东尼小符号_济州岛旅行_济.mp4'), aspect: 'portrait' },
      { title: '50 人求婚大作战', label: 'PROPOSAL STORY', description: '多人协作完成的求婚现场与完整流程记录', image: 'works/travel/proposal.jpg', video: downloadsVideo('我的求婚现场片尾附详细流程攻略_我的求婚现场片尾附详细流程攻略_我终于求婚啦_周三的突发奇想周四的行.mp4'), aspect: 'portrait' }
    ],
    auto: [
      { title: '在北京养 20 万的车', label: 'CAR OWNERSHIP', description: '把奥迪 A3 的每月真实养车成本拆开讲清楚', image: 'works/auto/a3-cost.jpg', video: downloadsVideo('video_以为奥迪A3不贵直到我算了下养车..._0.mp4'), aspect: 'portrait' },
      { title: '北斗星房车生活', label: 'CAR MODIFICATION', description: '改装车与露营生活的真实呈现', image: 'works/auto/beidouxing-camp.jpg', video: downloadsVideo('video_全网第二辆越野姿态北斗星露营首秀..._0.mp4'), aspect: 'portrait' },
      { title: '露营装备盲盒开箱', label: 'GEAR REVIEW', description: '真实拆箱与露营大件装备体验', image: 'works/auto/camping-gear-unbox.jpg', video: downloadsVideo('嗨害嗨露营装备大盲盒拆它_嗨害嗨露营装备大盲盒拆它_采购了第N批露营装备并且这次都是大件好物性价比极.mp4'), aspect: 'portrait' },
      { title: '富士 X-Half 第一视角体验', label: 'CAMERA EXPERIENCE', description: '以第一视角体验一台新相机', image: 'works/auto/fuji-xhalf.jpg', video: downloadsVideo('video_准备抢富士-黄牛看了这个都挠头_..._0.mp4'), aspect: 'portrait' },
      { title: '奥迪 A3 床车搭建', label: 'CAR CAMPING', description: '用两厢车完成可复用的床车搭建方案', image: 'works/auto/a3-bed-camping.jpg', video: downloadsVideo('奥迪A3也能玩床车搭建_奥迪A3也能玩床车搭建_借着出去露营的机会给大家再拍一次更详细的床车搭建流程 (1).mp4'), aspect: 'portrait' },
      { title: '谁还在买富士 X-M5？', label: 'CAMERA REVIEW', description: '从真实使用场景聊相机选择', image: 'works/auto/fuji-xm5-3x4.png', video: downloadsVideo('video_谁还在买富士XM5啊_谁还在买富..._0.mp4'), aspect: 'portrait' },
      { title: '北斗星改装清单', label: 'MODIFICATION ARCHIVE', description: '复古、怀旧与露营车生活', image: 'works/auto/beidouxing-mod.png', aspect: 'portrait' },
      { title: '奥德赛 RB3 改装清单', label: 'MODIFICATION ARCHIVE', description: '从外观到底盘的完整改装实践', image: 'works/auto/honda-mod.png', aspect: 'portrait' },
      { title: '奥迪 A3 旅行版', label: 'CAR MODIFICATION', description: '把两厢车改成承载旅行与户外生活的移动空间', image: 'works/auto/a3-travel-edition.png', aspect: 'portrait' }
    ]
  };
  const travelItems = {
    vlog: { label: 'Vlog', title: '旅行 Vlog', subtitle: '路上的影像记录', graphic: 'ON THE<br>ROAD', className: 'vlog', fields: ['视频名称', '拍摄地点', '本人分工', '作品链接'] },
    guide: { label: '攻略', title: '路线与时间安排', subtitle: '行程攻略 · 图片或链接', graphic: 'TRIP<br>NOTES', className: 'guide', fields: ['目的地', '行程天数', '路线与预算', '攻略图片或链接'] },
    places: { label: '目的地', title: '去过的地方', subtitle: '具体国家与旅行时间待补', graphic: 'NEXT<br>STOP?', className: 'places', fields: ['国家与城市', '旅行时间', '旅行照片', '行程记录'] }
  };
  const albums = [
    { title: '现场合影', note: '记录参与者', graphic: 'ALL<br>TOGETHER' },
    { title: '活动过程', note: '记录活动环节', graphic: 'IN<br>ACTION' },
    { title: '精彩瞬间', note: '记录现场细节', graphic: 'GOOD<br>MOMENTS' }
  ];
  const platforms = { all: '全部平台', douyin: '抖音', xhs: '小红书', bilibili: '哔哩哔哩', wechat: '视频号' };
  const eventGalleries = {
    market: {
      title: 'Market × 营地｜露营集市',
      caption: '自创品牌与营地联合举办的露营集市',
      images: [
        ['events/market-camp/market-camp-wide.jpeg', '夜间露营集市全景'],
        ['events/market-camp/market-camp-cinema.jpeg', '露营集市与露天电影现场'],
        ['events/market-camp/market-camp-stall.jpeg', '露营集市摊位与品牌名牌']
      ]
    },
    xinjiang: {
      title: '新疆房车旅行',
      caption: '组织多人同行的新疆房车旅行',
      images: [
        ['events/xinjiang-rv/rv-convoy.jpg', '新疆湖畔公路上的房车车队'],
        ['events/xinjiang-rv/lakeside-group.jpg', '新疆湖畔的旅行团队合影'],
        ['events/xinjiang-rv/mountain-group.jpg', '新疆雪山下的旅行团队合影'],
        ['events/xinjiang-rv/rv-road.jpg', '新疆公路上的房车队伍'],
        ['events/xinjiang-rv/roadside-group.jpg', '新疆公路边的同行合影'],
        ['events/xinjiang-rv/trip-collage-seamless.jpg', '新疆房车旅行过程记录']
      ]
    },
    social: {
      title: '露营交友局',
      caption: '露营主题的线下社交活动',
      images: [
        ['events/camping-social/group-collage-seamless.jpg', '露营交友活动的参与者合影'],
        ['events/camping-social/night-camp.jpg', '灯光与帐篷布置的夜间露营现场'],
        ['events/camping-social/social-moment.jpg', '露营交友活动中的交流瞬间']
      ]
    },
    volcano: {
      title: '火山星空露营',
      caption: '组织 70 人参与的火山露营拍星空活动',
      images: [
        ['events/volcano-stargazing/volcano-convoy-clean.jpg', '火山草原前的露营车队与参与者'],
        ['events/volcano-stargazing/volcano-group.jpg', '火山草原前的露营参与者合影'],
        ['events/volcano-stargazing/day-night-camp.jpeg', '火山露营从白天到夜晚的营地记录']
      ]
    }
  };
  let currentRoute = '';
  let dialogTrigger = null;
  let dialogMode = '';
  let activeEventGallery = null;
  let eventSwipeStartX = 0;

  const dialog = document.createElement('dialog');
  dialog.id = 'detail-dialog';
  dialog.className = 'detail-dialog';
  dialog.setAttribute('aria-labelledby', 'detail-title');
  document.body.appendChild(dialog);

  const metric = value => value == null ? '—' : new Intl.NumberFormat('zh-CN').format(value);
  const heading = (number, english, title, description) => `
    <header class="page-heading">
      <p class="eyebrow">${number} / ${english}</p>
      <h1>${title}<span class="heading-dot" aria-hidden="true">.</span></h1>
      <p>${description}</p>
    </header>`;

  const portfolioWorkCards = items => `<div class="portfolio-work-grid" aria-label="精选长视频作品">${items.map((item, index) => `
    <button type="button" class="portfolio-work${item.cover ? '' : ' portfolio-work-first-frame'}" data-showcase="film-${index}" aria-label="查看作品：${item.title}">
      ${item.video ? `<video src="${assetUrl(item.video)}"${posterAttribute(item.cover)} muted loop playsinline preload="metadata" data-hover-video aria-label="${item.title}视频预览"></video>` : item.cover ? `<img src="${assetUrl(item.cover)}" alt="${item.title}视频封面" loading="lazy">` : `<span class="portfolio-work-type-art" aria-hidden="true"><i>ANTONY</i><b>${String(index + 1).padStart(2, '0')}</b></span>`}
      <span class="portfolio-work-shade" aria-hidden="true"></span>
      <span class="portfolio-work-copy"><small>${item.label}</small><strong>${item.title}</strong></span>
      <span class="portfolio-work-play" aria-hidden="true">▶</span>
    </button>`).join('')}</div>`;

  const showcaseGrid = (section, items) => `<div class="showcase-grid showcase-${section}" aria-label="精选作品">${items.map((item, index) => `
    <button type="button" class="showcase-card${item.image ? ' has-image' : ''}${item.aspect ? ` is-${item.aspect}` : ''}" data-showcase="${section}-${index}" aria-label="查看作品：${item.title}">
      ${item.video ? `<video src="${assetUrl(item.video)}"${posterAttribute(item.image)} muted loop playsinline preload="none" data-hover-video aria-label="${item.title}视频预览"></video>` : item.image ? `<img src="${assetUrl(item.image)}" alt="${item.title}" loading="lazy">` : `<span class="showcase-art" aria-hidden="true"><i>${String(index + 1).padStart(2, '0')}</i><b>${item.label.split(' ')[0]}</b></span>`}
      <span class="showcase-card-copy"><small>${item.label}</small><strong>${item.title}</strong><em>${item.description}</em></span><span class="showcase-arrow" aria-hidden="true">${item.video ? '▶' : '↗'}</span>
    </button>`).join('')}</div>`;

  const aiVisualGrid = items => {
    const images = items.filter(item => !item.video);
    const videos = items.filter(item => item.video);
    return `<div class="ai-visual-wrap"><div class="ai-subhead"><span>01</span><strong>AI 图片作品</strong><small>把自己的审美写成 Skill，让 AI 生图代替传统 P 图</small></div><div class="ai-visual-grid" aria-label="AI 生图作品">${images.map(item => `<figure><img src="${assetUrl(item.image)}" alt="${item.title}" loading="lazy"></figure>`).join('')}</div><div class="ai-subhead ai-video-head"><span>02</span><strong>AI 视频作品</strong><small>悬停预览 · 点击播放</small></div><div class="ai-video-grid" aria-label="AI 视频作品">${videos.map((item, index) => `<button type="button" class="ai-video-card" data-showcase="ai-${images.length + index}" aria-label="播放作品：${item.title}"><video src="${assetUrl(item.video)}"${posterAttribute(item.image)} muted loop playsinline preload="none" data-hover-video aria-label="${item.title}"></video><i aria-hidden="true">▶</i><span><small>${item.label}</small><strong>${item.title}</strong><em>${item.description}</em></span></button>`).join('')}</div></div>`;
  };

  const autoTechGrid = items => {
    const modifications = items.filter(item => !item.video);
    const videos = items.filter(item => item.video);
    const card = (item, index, group) => `<button type="button" class="showcase-card has-image is-${item.aspect || 'portrait'}" data-showcase="auto-${items.indexOf(item)}" aria-label="查看作品：${item.title}">${item.video ? `<video src="${assetUrl(item.video)}"${posterAttribute(item.image)} muted loop playsinline preload="none" data-hover-video aria-label="${item.title}视频预览"></video>` : `<img src="${assetUrl(item.image)}" alt="${item.title}" loading="lazy">`}<span class="showcase-card-copy"><small>${item.label}</small><strong>${item.title}</strong><em>${item.description}</em></span><span class="showcase-arrow" aria-hidden="true">${item.video ? '▶' : '↗'}</span></button>`;
    return `<div class="auto-tech-wrap"><div class="auto-row-head"><span>01 / MODIFIED CARS</span><div><strong>喜欢玩车，也喜欢把车改成自己的样子</strong><p>改装过 4 辆汽车、4 辆摩托车</p></div></div><div class="auto-mod-layout"><div class="auto-mod-grid">${modifications.map((item, index) => card(item, index, 'mod')).join('')}</div><div class="auto-mod-story"><img src="${assets}works/auto/antony-auto-sticker.png" alt="安东尼与汽车、机车主题的互动贴纸" loading="lazy"></div></div><div class="auto-row-head auto-video-head"><span>02 / VIDEO WORKS</span><div><strong>汽车、露营与相机</strong><p>真实体验、实用知识与生活方式内容</p></div></div><div class="auto-video-row">${videos.map((item, index) => card(item, index, 'video')).join('')}</div></div>`;
  };

  const sectionCompanion = section => {
    if (section.id === 'auto-tech') return '';
    const companions = {
      gather: ['turntable/host-0.png', '我来把大家聚在一起', 'companion-wave'],
      film: ['turntable/camera-0.png', '镜头开机，成片见', 'companion-camera'],
      ai: ['antony-idea-sticker.png', '脑洞正在加载', 'companion-idea'],
      commercial: ['turntable/host-0.png', '创意也要解决问题', 'companion-point'],
      'travel-journal': ['antony-travel-sticker.png', '下一站，继续记录', 'companion-travel']
    };
    const [image, line, className] = companions[section.id];
    return `<div class="section-companion ${className}" aria-hidden="true"><img src="${assets}${image}" alt=""><span>${line}</span></div>`;
  };

  const marketCampCase = () => `<article class="event-case" data-event-gallery-card="market" aria-label="Market 与营地合作的露营集市">
    <div class="event-case-copy">
      <p>MARKET × CAMP</p>
      <h3>露营集市</h3>
      <span>自创品牌与营地联合举办</span>
      <small>集市 · 露天电影 · 夜间营地</small>
    </div>
    <div class="event-case-gallery">
      <button class="event-case-photo event-case-photo-main" type="button" data-event-gallery="market" data-event-index="0" aria-label="打开露营集市相册，从全景开始查看">
        <img src="${assets}events/market-camp/market-camp-wide.jpeg" alt="夜间露营集市全景" loading="lazy">
      </button>
      <button class="event-case-photo" type="button" data-event-gallery="market" data-event-index="1" aria-label="打开露营集市相册，从露天电影开始查看">
        <img src="${assets}events/market-camp/market-camp-cinema.jpeg" alt="露营集市与露天电影现场" loading="lazy">
      </button>
      <button class="event-case-photo" type="button" data-event-gallery="market" data-event-index="2" aria-label="打开露营集市相册，从摊位细节开始查看">
        <img src="${assets}events/market-camp/market-camp-stall.jpeg" alt="露营集市摊位与品牌名牌" loading="lazy">
      </button>
    </div>
  </article>`;

  const xinjiangRvCase = () => `<article class="event-case event-case-rv" data-event-gallery-card="xinjiang" aria-label="安东组织的新疆房车旅行">
    <div class="event-case-copy">
      <p>XINJIANG RV JOURNEY</p>
      <h3>新疆房车旅行</h3>
      <span>组织多人房车同行</span>
      <small>房车车队 · 公路旅行 · 同行记录</small>
    </div>
    <div class="event-case-gallery event-case-gallery-collage">
      <button class="event-case-photo event-case-collage collage-three" type="button" data-event-gallery="xinjiang" data-event-index="0" aria-label="打开新疆房车旅行相册，从前三张同行照片开始查看">
        <img src="${assets}events/xinjiang-rv/rv-convoy.jpg" alt="新疆湖畔公路上的房车车队" loading="lazy">
        <img src="${assets}events/xinjiang-rv/lakeside-group.jpg" alt="新疆湖畔的旅行团队合影" loading="lazy">
        <img src="${assets}events/xinjiang-rv/mountain-group.jpg" alt="新疆雪山下的旅行团队合影" loading="lazy">
      </button>
      <button class="event-case-photo event-case-collage collage-two" type="button" data-event-gallery="xinjiang" data-event-index="3" aria-label="打开新疆房车旅行相册，从公路同行照片开始查看">
        <img src="${assets}events/xinjiang-rv/rv-road.jpg" alt="新疆公路上的房车队伍" loading="lazy">
        <img src="${assets}events/xinjiang-rv/roadside-group.jpg" alt="新疆公路边的同行合影" loading="lazy">
      </button>
      <button class="event-case-photo" type="button" data-event-gallery="xinjiang" data-event-index="5" aria-label="打开新疆房车旅行相册，从行程拼贴开始查看">
        <img src="${assets}events/xinjiang-rv/trip-collage-seamless.jpg" alt="新疆房车旅行过程拼贴" loading="lazy">
      </button>
    </div>
  </article>`;

  const campingSocialCase = () => `<article class="event-case event-case-social" data-event-gallery-card="social" aria-label="安东组织的露营主题线下社交活动">
    <div class="event-case-copy">
      <p>CAMPING SOCIAL</p>
      <h3>露营交友局</h3>
      <span>露营主题的线下社交活动</span>
      <small>露营 · 互动 · 认识新朋友</small>
    </div>
    <div class="event-case-gallery">
      <button class="event-case-photo event-case-photo-main" type="button" data-event-gallery="social" data-event-index="0" aria-label="打开露营交友局相册，从活动合影开始查看">
        <img src="${assets}events/camping-social/group-collage-seamless.jpg" alt="露营交友活动的参与者合影" loading="lazy">
      </button>
      <button class="event-case-photo" type="button" data-event-gallery="social" data-event-index="1" aria-label="打开露营交友局相册，从夜间现场开始查看">
        <img src="${assets}events/camping-social/night-camp.jpg" alt="灯光与帐篷布置的夜间露营现场" loading="lazy">
      </button>
      <button class="event-case-photo" type="button" data-event-gallery="social" data-event-index="2" aria-label="打开露营交友局相册，从交流瞬间开始查看">
        <img src="${assets}events/camping-social/social-moment.jpg" alt="露营交友活动中的交流瞬间" loading="lazy">
      </button>
    </div>
  </article>`;

  const volcanoStargazingCase = () => `<article class="event-case event-case-volcano" data-event-gallery-card="volcano" aria-label="安东组织的七十人火山露营拍星空活动">
    <div class="event-case-copy">
      <p>VOLCANO STARGAZING CAMP</p>
      <h3>火山星空露营</h3>
      <span>组织 70 人露营拍摄星空</span>
      <small>火山 · 露营 · 星空拍摄</small>
    </div>
    <div class="event-case-gallery">
      <button class="event-case-photo event-case-photo-main" type="button" data-event-gallery="volcano" data-event-index="0" aria-label="打开火山星空露营相册，从车队合影开始查看">
        <img src="${assets}events/volcano-stargazing/volcano-convoy-clean.jpg" alt="火山草原前的露营车队与参与者" loading="lazy">
      </button>
      <button class="event-case-photo" type="button" data-event-gallery="volcano" data-event-index="1" aria-label="打开火山星空露营相册，从参与者合影开始查看">
        <img src="${assets}events/volcano-stargazing/volcano-group.jpg" alt="火山草原前的露营参与者合影" loading="lazy">
      </button>
      <button class="event-case-photo" type="button" data-event-gallery="volcano" data-event-index="2" aria-label="打开火山星空露营相册，从昼夜营地开始查看">
        <img src="${assets}events/volcano-stargazing/day-night-camp.jpeg" alt="火山露营从白天到夜晚的营地记录" loading="lazy">
      </button>
    </div>
  </article>`;

  const moreEventMoments = () => {
    const items = [
      ['events/more/summer-palace-ice-seamless.jpg', '颐和园冰场活动', '百人冰车接力'],
      ['events/more/grassland-forest-camp.jpg', '草原森林露营', '草原 · 森林 · 自驾露营'],
      ['events/more/skiing-seamless.jpg', '滑雪活动', '开板大狂欢'],
      ['events/more/alpine-meadow-camp.jpg', '高山草甸露营', '高山草甸 · 户外露营'],
      ['events/more/home-party-boardgames.jpg', 'Home Party 社交局', '桌游 · 社交 · 家庭 Party']
    ];
    return `<section class="more-events" aria-label="更多活动现场">
      <div class="more-events-heading"><h3>更多活动现场</h3><p>MORE EVENT MOMENTS</p></div>
      <div class="more-events-grid">${items.map(([image, title, caption]) => `<button class="more-event-card" type="button" data-event-photo="${image}" data-event-title="${title}" data-event-caption="${caption}" aria-label="查看${title}">
        <img src="${assets}${image}" alt="${title}" loading="lazy"><span><strong>${title}</strong><small>${caption}</small></span>
      </button>`).join('')}</div>
    </section>`;
  };

  const eventCases = () => `<div class="event-cases">${marketCampCase()}${xinjiangRvCase()}${campingSocialCase()}${volcanoStargazingCase()}</div>${moreEventMoments()}`;

  function home() {
    const outfit = outfits[state.outfit];
    const countries = [
      ['🇲🇻', '马尔代夫', 'MALDIVES'], ['🇫🇷', '法国', 'FRANCE'],
      ['🇹🇷', '土耳其', 'TÜRKIYE'], ['🇸🇬', '新加坡', 'SINGAPORE'],
      ['🇯🇵', '日本', 'JAPAN'], ['🇰🇷', '韩国', 'SOUTH KOREA'],
      ['🇵🇭', '菲律宾', 'PHILIPPINES'], ['🇲🇾', '马来西亚', 'MALAYSIA'],
      ['🇹🇭', '泰国', 'THAILAND'], ['🇮🇩', '印度尼西亚', 'INDONESIA'],
      ['🇦🇪', '阿联酋', 'UAE']
    ];
    const sections = [
      { id: 'gather', number: '01', eyebrow: 'EVENTS & COMMUNITY', title: '让人聚在一起', subtitle: '活动策划与现场执行', tone: 'yellow' },
      { id: 'film', number: '02', eyebrow: 'LONG-FORM VIDEO & SERIES', title: '把专业做进影像', subtitle: '长视频编导、拍摄与后期', tone: 'purple' },
      { id: 'ai', number: '03', eyebrow: 'AI CREATIVE EXPERIMENTS', title: '把脑洞做出来', subtitle: 'AI 视觉创作', tone: 'orange' },
      { id: 'commercial', number: '04', eyebrow: 'BRAND COLLABORATIONS', title: '让创作产生商业价值', subtitle: '我的品牌商单与合作案例', tone: 'cream' },
      { id: 'travel-journal', number: '05', eyebrow: 'TRAVEL JOURNAL', title: '在路上，也在记录', subtitle: '旅行、生活与重要时刻', tone: 'green' },
      { id: 'auto-tech', number: '06', eyebrow: 'AUTO & TECH', title: '汽车数码', subtitle: '没事也爱研究点车和数码', tone: 'blue' }
    ];
    return `<section class="home-scene" aria-label="安东的个人主页">
      <div class="home-copy">
        <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span> 安东的个人主页</p>
        <h1>ANTONY<span class="title-dot">.</span><span class="chinese-name">安东</span></h1>
        <p class="home-intro">这些好奇心，拼成了现在的我。</p>
        <p class="home-subtitle">点击或下滑，认识一下吧</p>
        <p class="home-friend-line">欢迎关注我的 <a class="home-xhs-link" href="https://www.xiaohongshu.com/user/profile/5e7b0db00000000001000c7b" target="_blank" rel="noopener noreferrer">🔗 小红书主页</a>，让我们成为朋友</p>
      </div>
      <div class="character-stage" id="character-stage" data-outfit-cycle aria-label="鼠标经过时，安东会转身换一套造型">
        <div class="stage-orbit" aria-hidden="true"></div>
        <span class="orbit-ring orbit-ring-one" aria-hidden="true"></span>
        <span class="orbit-ring orbit-ring-two" aria-hidden="true"></span>
        <span class="stage-star star-one" aria-hidden="true">✳</span>
        <span class="stage-star star-two" aria-hidden="true">✦</span>
        <span class="character-rig"><img id="hero-character" src="${assets}${outfit.image}" alt="${outfit.alt}" fetchpriority="high"></span>
        <span class="figure-plinth" aria-hidden="true"><i></i></span>
      </div>
      <nav class="scene-links" aria-label="快速浏览作品板块">
        <a class="scene-card scene-card-gather" href="#gather"><small>01 / EVENTS</small><span class="scene-icon" aria-hidden="true">☺</span><strong>活动现场</strong><span>策划 · 组织 · 执行</span></a>
        <a class="scene-card scene-card-film" href="#film"><small>02 / LONG-FORM</small><span class="scene-icon" aria-hidden="true">▶</span><strong>专业影像</strong><span>长视频 · 栏目制作</span></a>
        <a class="scene-card scene-card-ai" href="#ai"><small>03 / AI</small><span class="scene-icon" aria-hidden="true">✳</span><strong>AI 创作</strong><span>影像 · 视觉实验</span></a>
        <a class="scene-card scene-card-commercial" href="#commercial"><small>04 / COLLABORATIONS</small><span class="scene-icon" aria-hidden="true">✦</span><strong>商业价值</strong><span>品牌内容 · 商业合作</span></a>
        <a class="scene-card scene-card-travel" href="#travel-journal"><small>05 / TRAVEL</small><span class="scene-icon" aria-hidden="true">✈</span><strong>旅行记录</strong><span>生活 · 目的地故事</span></a>
        <a class="scene-card scene-card-auto" href="#auto-tech"><small>06 / AUTO & TECH</small><span class="scene-icon" aria-hidden="true">✦</span><strong>汽车数码</strong><span>车 · 科技 · 内容</span></a>
      </nav>
      <button type="button" class="profile-card-trigger" data-about-card><img src="${assets}antony-avatar.png" alt=""><span><strong>翻看名片</strong></span></button>
      <a class="scroll-cue" href="#gather"><span>SCROLL TO EXPLORE</span><i aria-hidden="true">↓</i></a>
    </section>
    <div class="portfolio-scroll">${sections.map(section => `<section class="portfolio-section tone-${section.tone}" id="${section.id}">
      <div class="section-index"><span>${section.number}</span><small>${section.eyebrow}</small></div>
      <div class="section-title"><p>${section.subtitle}</p><h2>${section.title}<span>.</span></h2>${section.description ? `<small class="section-description">${section.description}</small>` : ''}</div>
      ${sectionCompanion(section)}
      ${section.id === 'gather' ? eventCases()
        : section.id === 'film' ? portfolioWorkCards(featuredFilmWorks)
        : section.id === 'ai' ? aiVisualGrid(showcaseSections.ai)
        : section.id === 'commercial' ? showcaseGrid('commercial', showcaseSections.commercial)
        : section.id === 'travel-journal' ? `<div class="travel-showcase"><div class="travel-stamps" aria-label="Antony 的旅行足迹">${countries.map(([flag, name, english]) => `<span class="country-stamp"><span class="country-flag" aria-hidden="true">${flag}</span><strong>${name}</strong><small>${english}</small></span>`).join('')}</div>${showcaseGrid('travel', showcaseSections.travel)}</div>`
        : autoTechGrid(showcaseSections.auto)}
    </section>`).join('')}</div>`;
  }

  function workCards() {
    const visible = works.filter(item => state.workFilter === 'all' || item.filter === state.workFilter);
    return visible.map(item => `<button type="button" class="work-card" data-work="${item.id}" aria-label="查看${item.title}，作品与数据待补">
      <span class="cover cover-${item.id}"><span class="cover-kicker">${item.category}</span><span class="cover-type">${item.graphic}</span><span class="cover-symbol" aria-hidden="true">${item.id === 'long' ? '▶' : item.id === 'short' ? '“' : '✳'}</span><span class="cover-pending">作品待补</span></span>
      <span class="work-card-heading"><strong>${item.title}</strong><span aria-hidden="true">›</span></span>
    </button>`).join('');
  }

  function work() {
    return `<section class="work-page">
      ${heading('01', 'SELECTED VIDEO WORK', '视频作品', '中长视频、口播短视频，还有 AI 影像。')}
      <div class="filter-bar" role="group" aria-label="按视频类型筛选">${[['all', '全部'], ['long', '中长视频'], ['short', '口播短视频'], ['ai', 'AI 创作']].map(([key, label]) => `<button type="button" data-filter="${key}" aria-pressed="${state.workFilter === key}">${label}</button>`).join('')}</div>
      <div class="work-layout work-layout-gallery"><div class="work-grid" id="work-grid" aria-live="polite">${workCards()}</div></div>
    </section>`;
  }

  function platformSummary() {
    return `<p class="platform-status">${platforms[state.platform]} · 数据待补</p>
      <dl class="metric-list">${['播放量', '点赞', '收藏'].map(label => `<div class="metric-row"><dt>${label}</dt><dd>—</dd></div>`).join('')}</dl>`;
  }

  function travelContent() {
    const item = travelItems[state.travelTab];
    return `<button type="button" class="travel-item travel-item-${item.className}" data-travel-detail="${state.travelTab}" aria-label="查看${item.title}，素材待补">
      <span class="travel-art"><span class="travel-art-graphic">${item.graphic}</span><span class="travel-art-symbol" aria-hidden="true">${state.travelTab === 'guide' ? '•' : state.travelTab === 'places' ? '✳' : '▶'}</span><small>示意封面 · 素材待补</small></span>
      <span class="travel-item-bottom"><span><strong>${item.title}</strong><small>${item.subtitle}</small></span><span class="round-arrow" aria-hidden="true">›</span></span>
    </button><p class="section-note">${state.travelTab === 'vlog' ? '作品链接与播放数据待补。' : state.travelTab === 'guide' ? '具体攻略图片或链接待补。' : '目的地清单待补。'}</p>`;
  }

  function travel() {
    return `<section class="travel-page">
      ${heading('02', 'TRAVEL JOURNAL', '旅行记录', '看过的地方，拍过的视频，做过的攻略。')}
      <div class="travel-layout">
        <aside class="travel-passport"><span class="passport-top">ANTONY’S PASSPORT <span aria-hidden="true">✳</span></span><h2>旅行记录</h2><p>去过十几个国家</p><img src="${assets}anton-travel.png" alt="安东户外穿搭的 3D 手办"><span class="passport-stamp">ON THE ROAD</span></aside>
        <div class="travel-browser"><div class="travel-tabs" role="group" aria-label="旅行内容类型">${Object.entries(travelItems).map(([key, item]) => `<button type="button" data-travel-tab="${key}" aria-pressed="${state.travelTab === key}">${item.label}</button>`).join('')}</div><div class="travel-content" id="travel-content" aria-live="polite">${travelContent()}</div></div>
      </div>
    </section>`;
  }

  function events() {
    return `<section class="events-page">
      ${heading('03', 'EVENTS & COMMUNITY', '活动现场', '这里放我组织过的线下活动。')}
      <div class="events-layout">
        <div class="event-stage"><span class="event-sticker">LET’S<br>GET TOGETHER!</span><img src="${assets}anton-host.png" alt="安东休闲穿搭的 3D 手办"><p>活动组织 / 现场执行</p></div>
        <div class="event-album"><div class="album-grid">${albums.map((item, index) => `<button type="button" class="album-card album-card-${index + 1}" data-album="${index}" aria-label="查看${item.title}，照片待补"><span class="album-placeholder"><span>${item.graphic}</span><small>照片待补</small></span><span class="album-caption"><strong>${item.title}</strong><span aria-hidden="true">›</span></span></button>`).join('')}</div>
        <div class="event-details"><h2>活动信息</h2><dl><div><dt>活动名称</dt><dd>待补</dd></div><div><dt>本人职责</dt><dd>待补</dd></div><div><dt>时间</dt><dd>待补</dd></div><div><dt>现场问题</dt><dd>待补</dd></div><div><dt>结果</dt><dd>待补</dd></div></dl><p class="section-note">补上真实活动名称和现场照片，即可形成活动相册。</p></div></div>
      </div>
    </section>`;
  }

  function lifeFeature() {
    const car = state.lifeTab === 'car';
    return `<div class="life-visual life-visual-${state.lifeTab}"><span class="life-word" aria-hidden="true">${car ? 'DRIVE.' : 'PLAY.'}</span><img src="${assets}${car ? 'anton-travel.png' : 'anton-camera.png'}" alt="${car ? '安东户外穿搭的 3D 手办' : '安东街头穿搭的 3D 手办'}"><span class="life-sticker">${car ? 'CAR & LIFE' : 'TECH & LIFE'}</span></div>
      <div class="life-copy"><p class="eyebrow">${car ? '01 / CAR' : '02 / TECH'}</p><h2>${car ? '汽车知识分享' : '数码知识分享'}</h2><p>${car ? '用视频分享汽车知识。' : '用视频分享数码知识。'}</p><button class="primary-button" type="button" data-life-detail="${state.lifeTab}">查看作品 <span aria-hidden="true">›</span></button><small>代表作品与真实数据待补</small></div>`;
  }

  function life() {
    return `<section class="life-page">${heading('04', 'CARS & TECH', '汽车与数码', '玩车、玩相机，烧钱的一切都爱研究。')}<div class="life-switch" role="group" aria-label="生活内容类型"><button type="button" data-life-tab="car" aria-pressed="${state.lifeTab === 'car'}">汽车</button><button type="button" data-life-tab="tech" aria-pressed="${state.lifeTab === 'tech'}">数码</button></div><div class="life-feature" id="life-feature" aria-live="polite">${lifeFeature()}</div></section>`;
  }

  function about() {
    return `<section class="about-page">${heading('05', 'ABOUT ANTONY', '关于安东', '主线不固定，支线一直很丰富。')}
      <div class="about-layout"><div class="about-photo"><img src="${assets}anton-camera.png" alt="安东的 3D 形象"><span class="photo-caption">HELLO, I’M ANTONY.</span></div>
      <div class="about-copy"><p class="eyebrow">HELLO / 你好</p><h2>安东<span aria-hidden="true">✳</span></h2><p class="about-role">把好奇心变成作品的人</p><ul class="about-facts"><li><span>01</span><p>喜欢把人聚在一起，也总能从热闹的连接里充满电</p></li><li><span>02</span><p>车、相机、极限运动——越“烧钱”的爱好，好像越有吸引力</p></li><li><span>03</span><p>在努力环球旅行的路上，已解锁 12 个国家</p></li><li><span>04</span><p>最近正在尝试用 AI 把脑洞逐个实现</p></li></ul></div></div></section>`;
  }

  const pages = { home, work, travel, events, life, about };

  function hydrateHlsVideos(root) {
    root.querySelectorAll('video[src$=".m3u8"]').forEach(video => {
      const source = video.getAttribute('src');
      if (!source || video.dataset.hlsReady === 'true') return;
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.dataset.hlsReady = 'true';
        return;
      }
      if (!window.Hls?.isSupported()) return;
      video.removeAttribute('src');
      const hls = new window.Hls({ enableWorker: true, backBufferLength: 30 });
      hls.loadSource(source);
      hls.attachMedia(video);
      video._hls = hls;
      video.dataset.hlsReady = 'true';
    });
  }

  function renderRoute() {
    const hash = location.hash.slice(1).split('?')[0];
    const nextRoute = routes.includes(hash) ? hash : 'home';
    const homeSection = homeSections.includes(hash) ? hash : '';
    if (dialog.open) dialog.close();
    currentRoute = nextRoute;
    view.dataset.page = nextRoute;
    view.querySelectorAll('video').forEach(video => video._hls?.destroy());
    view.innerHTML = pages[nextRoute]();
    hydrateHlsVideos(view);
    document.body.dataset.page = nextRoute;
    document.querySelectorAll('[data-route]').forEach(link => {
      const active = link.dataset.route.replace(/^#/, '') === nextRoute;
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.title = `${routeNames[nextRoute]} · 安东 ANTONY`;
    if (homeSection) {
      window.requestAnimationFrame(() => view.querySelector(`#${homeSection}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    view.focus({ preventScroll: true });
  }

  function go(route) {
    if (!routes.includes(route)) return;
    if (currentRoute === route) renderRoute();
    else location.hash = route;
  }

  function metricsMarkup(item = {}) {
    return `<div class="metrics-grid" aria-label="作品数据，暂未提供">${[['播放量', 'play'], ['点赞', 'like'], ['收藏', 'save'], ['评论', 'comment']].map(([label, key]) => `<div><span>${label}</span><strong>${metric(item[key])}</strong></div>`).join('')}</div>`;
  }

  function showDialog(title, content, trigger, mode = 'project') {
    dialogTrigger = trigger || document.activeElement;
    dialogMode = mode;
    const dialogLabels = { profile: 'ABOUT ME', album: 'EVENT ALBUM', event: 'EVENT MOMENT', 'event-gallery': 'EVENT ALBUM', travel: 'TRAVEL NOTES', project: 'PROJECT DETAILS' };
    dialog.innerHTML = `<div class="detail-top"><p class="eyebrow">ANTONY / ${dialogLabels[mode] || 'DETAILS'}</p><button type="button" class="icon-button" data-close-dialog aria-label="关闭详情">×</button></div><h2 id="detail-title">${title}</h2>${content}`;
    hydrateHlsVideos(dialog);
    dialog.showModal();
    dialog.querySelector('[data-close-dialog]').focus();
  }

  function eventGalleryContent() {
    const gallery = eventGalleries[activeEventGallery.key];
    const [image, alt] = gallery.images[activeEventGallery.index];
    return `<div class="event-gallery-detail" id="event-gallery-content">
      <div class="event-gallery-stage">
        <button type="button" class="event-gallery-arrow event-gallery-prev" data-event-gallery-prev aria-label="上一张照片">←</button>
        <img src="${assets}${image}" alt="${alt}">
        <button type="button" class="event-gallery-arrow event-gallery-next" data-event-gallery-next aria-label="下一张照片">→</button>
      </div>
      <div class="event-gallery-meta"><p>${gallery.caption}</p><span aria-live="polite">${activeEventGallery.index + 1} / ${gallery.images.length}</span></div>
      <p class="event-gallery-hint">左右滑动或使用方向键查看</p>
    </div>`;
  }

  function openEventGallery(key, index, trigger) {
    const gallery = eventGalleries[key];
    if (!gallery) return;
    activeEventGallery = { key, index: Math.max(0, Math.min(Number(index) || 0, gallery.images.length - 1)) };
    showDialog(gallery.title, eventGalleryContent(), trigger, 'event-gallery');
  }

  function moveEventGallery(direction) {
    if (!activeEventGallery) return;
    const gallery = eventGalleries[activeEventGallery.key];
    activeEventGallery.index = (activeEventGallery.index + direction + gallery.images.length) % gallery.images.length;
    dialog.querySelector('#event-gallery-content').outerHTML = eventGalleryContent();
  }

  function showAboutCard(trigger) {
    showDialog('个人名片', `<div class="personal-card">
      <div class="personal-card-identity"><div class="personal-avatar"><img src="${assets}antony-avatar.png" alt="Antony 的 3D 头像"><span aria-hidden="true">✳</span></div><div><p class="eyebrow">HELLO, I’M</p><h3>安东 <small>ANTONY</small></h3><p>把好奇心变成作品的人</p></div></div>
      <div class="personal-card-tags" aria-label="安东的特点"><span>内容创意</span><span>活动组织</span><span>沟通协调</span><span>AI 创作</span><span>Coding 实践</span><span>旅行与户外</span><span>汽车与数码</span></div>
      <div class="personal-card-lines"><p>喜欢把人聚在一起，也总能从热闹的连接里充满电</p><p>车、相机、极限运动——越“烧钱”的爱好，好像越有吸引力</p><p>在努力环球旅行的路上，已解锁 12 个国家</p><p>最近正在尝试用 AI 把脑洞逐个实现</p></div>
      <div class="personal-card-sign">ANTONY <span>✳</span></div>
    </div>`, trigger, 'profile');
  }

  function openShowcase(key, trigger) {
    const [section, rawIndex] = key.split('-');
    const index = Number(rawIndex);
    const item = section === 'film' ? featuredFilmWorks[index] : showcaseSections[section]?.[index];
    if (!item) return;
    const sectionNames = { film: '长视频与栏目', ai: 'AI 创作', commercial: '商业合作', travel: '旅行记录', auto: '汽车数码' };
    showDialog(item.title, `<div class="showcase-detail${item.images ? ' showcase-detail-series' : ''}">
      ${item.video ? `<div class="showcase-detail-video"><video src="${assetUrl(item.video)}"${posterAttribute(item.image || item.cover)} controls autoplay playsinline preload="metadata"></video></div>` : item.images ? `<div class="showcase-series" aria-label="${item.title}三张系列封面">${item.images.map((image, imageIndex) => `<img src="${assetUrl(image)}" alt="${item.title}第 ${imageIndex + 1} 张封面">`).join('')}</div>` : `<div class="showcase-detail-visual${item.image || item.cover ? ' has-image' : ''}">${item.image || item.cover ? `<img src="${assetUrl(item.image || item.cover)}" alt="${item.title}">` : `<span>${item.label}</span><strong>${item.title}</strong>`}</div>`}
      <div class="showcase-detail-copy"><p class="eyebrow">${sectionNames[section] || 'SELECTED WORK'}</p><p>${item.description}</p><div class="detail-chips"><span>${item.label}</span><span>作品集收录案例</span></div><small>点击页面外或右上角关闭，继续浏览其他作品</small></div>
    </div>`, trigger, 'project');
  }

  function openWork(item, trigger) {
    showDialog(item.title, `<div class="detail-layout"><div class="video-placeholder cover-${item.id || 'long'}"><span class="video-placeholder-label">${item.category}</span><strong>作品待补</strong><p>添加实际视频或作品链接后展示</p></div><div class="detail-info"><p class="eyebrow">ABOUT THIS WORK</p><dl><div><dt>作品类型</dt><dd>${item.category}</dd></div><div><dt>本人分工</dt><dd>待补</dd></div></dl>${metricsMarkup(item)}<p class="source-note">平台 / 统计日期待补。<br>数据待补，暂不展示统计结论。</p></div></div>`, trigger);
  }

  function openTravel(key, trigger) {
    const item = travelItems[key];
    showDialog(item.title, `<div class="detail-layout"><div class="video-placeholder travel-placeholder-${key}"><span class="travel-detail-graphic">${item.graphic}</span><p>素材待补</p></div><div class="detail-info"><p class="eyebrow">TRAVEL / ${item.label}</p><dl>${item.fields.map(label => `<div><dt>${label}</dt><dd>待补</dd></div>`).join('')}</dl><p class="source-note">这里将展示安东的真实旅行${key === 'guide' ? '攻略' : key === 'vlog' ? '视频' : '记录'}。</p></div></div>`, trigger, 'travel');
  }

  function albumDialogContent() {
    const item = albums[state.albumIndex];
    return `<div class="detail-layout album-detail-layout"><div class="album-large album-large-${state.albumIndex + 1}"><span class="album-large-graphic">${item.graphic}</span><strong>${item.title}</strong><p>真实照片待补</p></div><div class="detail-info"><p class="eyebrow">EVENT ALBUM</p><dl>${['活动名称', '本人职责', '时间', '现场问题', '结果'].map(label => `<div><dt>${label}</dt><dd>待补</dd></div>`).join('')}</dl><p class="source-note">${item.note} · 当前为相册布局预览。</p><div class="album-controls"><button type="button" class="icon-button" data-album-prev aria-label="上一张照片">←</button><span class="album-counter" aria-live="polite">${state.albumIndex + 1} / ${albums.length}</span><button type="button" class="icon-button" data-album-next aria-label="下一张照片">→</button></div></div></div>`;
  }

  function openAlbum(index, trigger) {
    state.albumIndex = index;
    showDialog(albums[index].title, `<div id="album-dialog-content">${albumDialogContent()}</div>`, trigger, 'album');
  }

  function moveAlbum(direction) {
    const focusedControl = document.activeElement?.hasAttribute('data-album-prev') ? 'data-album-prev' : document.activeElement?.hasAttribute('data-album-next') ? 'data-album-next' : null;
    state.albumIndex = (state.albumIndex + direction + albums.length) % albums.length;
    dialog.querySelector('#detail-title').textContent = albums[state.albumIndex].title;
    dialog.querySelector('#album-dialog-content').innerHTML = albumDialogContent();
    if (focusedControl) dialog.querySelector(`[${focusedControl}]`).focus();
  }

  function updatePressed(attribute, value) {
    view.querySelectorAll(`[${attribute}]`).forEach(button => button.setAttribute('aria-pressed', button.getAttribute(attribute) === value));
  }

  async function cycleOutfit() {
    const stage = view.querySelector('#character-stage');
    const hero = view.querySelector('#hero-character');
    if (!stage || !hero || stage.classList.contains('is-spinning')) return;
    const keys = Object.keys(outfits);
    const nextKey = keys[(keys.indexOf(state.outfit) + 1) % keys.length];
    const nextFrames = outfitCache.get(nextKey) || [];
    await Promise.all(nextFrames.map(image => image.decode?.().catch(() => {})));
    if (!stage.isConnected || stage.classList.contains('is-spinning')) return;
    stage.classList.add('is-spinning');
    const sequence = [
      ...[1, 2, 3, 4].map(index => [state.outfit, index]),
      ...[4, 5, 6, 7, 0].map(index => [nextKey, index])
    ];
    for (const [key, index] of sequence) {
      if (!stage.isConnected) return;
      hero.src = outfitFramePath(key, index);
      hero.alt = outfits[key].alt;
      await new Promise(resolve => window.setTimeout(resolve, 72));
    }
    state.outfit = nextKey;
    stage.classList.remove('is-spinning');
  }

  window.setInterval(() => {
    if (view.querySelector('#character-stage') && !document.hidden) cycleOutfit();
  }, 3000);

  view.addEventListener('click', event => {
    const stage = event.target.closest('#character-stage');
    if (stage && !event.target.closest('a,button')) return cycleOutfit();
    const eventGalleryCard = event.target.closest('[data-event-gallery-card]');
    if (eventGalleryCard && !event.target.closest('button')) return openEventGallery(eventGalleryCard.dataset.eventGalleryCard, 0, eventGalleryCard);
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.go) return go(button.dataset.go);
    if (button.hasAttribute('data-about-card')) return showAboutCard(button);
    if (button.dataset.showcase) return openShowcase(button.dataset.showcase, button);
    if (button.dataset.eventGallery) return openEventGallery(button.dataset.eventGallery, button.dataset.eventIndex, button);
    if (button.dataset.eventPhoto) {
      const title = button.dataset.eventTitle || '活动现场';
      const caption = button.dataset.eventCaption || '活动现场记录';
      return showDialog(title, `<div class="event-photo-dialog"><img src="${assets}${button.dataset.eventPhoto}" alt="${title}现场大图"><p>${caption}</p></div>`, button, 'event');
    }
    if (button.hasAttribute('data-outfit-cycle')) return cycleOutfit();
    if (button.dataset.outfit) {
      state.outfit = button.dataset.outfit;
      const outfit = outfits[state.outfit];
      const hero = view.querySelector('#hero-character');
      hero.src = assets + outfit.image;
      hero.alt = outfit.alt;
      updatePressed('data-outfit', state.outfit);
    } else if (button.dataset.filter) {
      state.workFilter = button.dataset.filter;
      updatePressed('data-filter', state.workFilter);
      view.querySelector('#work-grid').innerHTML = workCards();
    } else if (button.dataset.work) {
      openWork(works.find(item => item.id === button.dataset.work), button);
    } else if (button.dataset.travelTab) {
      state.travelTab = button.dataset.travelTab;
      updatePressed('data-travel-tab', state.travelTab);
      view.querySelector('#travel-content').innerHTML = travelContent();
    } else if (button.dataset.travelDetail) {
      openTravel(button.dataset.travelDetail, button);
    } else if (button.hasAttribute('data-album')) {
      openAlbum(Number(button.dataset.album), button);
    } else if (button.dataset.lifeTab) {
      state.lifeTab = button.dataset.lifeTab;
      updatePressed('data-life-tab', state.lifeTab);
      view.querySelector('#life-feature').innerHTML = lifeFeature();
    } else if (button.dataset.lifeDetail) {
      const car = button.dataset.lifeDetail === 'car';
      openWork({ id: car ? 'long' : 'ai', title: car ? '汽车知识分享' : '数码知识分享', category: car ? '汽车内容' : '数码内容' }, button);
    }
  });

  view.addEventListener('pointerover', event => {
    const stage = event.target.closest('#character-stage');
    if (stage && !stage.contains(event.relatedTarget)) cycleOutfit();
    const card = event.target.closest('.portfolio-work,.showcase-card,.ai-video-card');
    if (!card || card.contains(event.relatedTarget) || event.pointerType === 'touch') return;
    const video = card.querySelector('video[data-hover-video]');
    if (!video) return;
    card.classList.add('is-playing');
    video.play().catch(() => card.classList.remove('is-playing'));
  });

  view.addEventListener('pointerout', event => {
    const card = event.target.closest('.portfolio-work,.showcase-card,.ai-video-card');
    if (!card || card.contains(event.relatedTarget) || event.pointerType === 'touch') return;
    const video = card.querySelector('video[data-hover-video]');
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    video.load();
    card.classList.remove('is-playing');
  });

  view.addEventListener('pointermove', event => {
    const scene = event.target.closest('.home-scene');
    if (!scene) return;
    const bounds = scene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    scene.style.setProperty('--mx-shift', `${(x * 18).toFixed(1)}px`);
    scene.style.setProperty('--my-shift', `${(y * 14).toFixed(1)}px`);
    scene.style.setProperty('--mx-reverse', `${(x * -12).toFixed(1)}px`);
    scene.style.setProperty('--my-reverse', `${(y * -9).toFixed(1)}px`);
  });

  view.addEventListener('change', event => {
    if (event.target.id !== 'platform-select') return;
    state.platform = event.target.value;
    view.querySelector('#platform-summary').innerHTML = platformSummary();
  });

  document.querySelector('[data-share]')?.addEventListener('click', async event => {
    const button = event.currentTarget;
    const shareUrl = `https://florafuhao.github.io/anton-portfolio/${location.hash || ''}`;
    const shareData = { title: 'Antony · 个人主页', text: '来看看 Antony 的作品与生活。', url: shareUrl };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareUrl);
        button.innerHTML = '<span aria-hidden="true">✓</span> 已复制';
        window.setTimeout(() => { button.innerHTML = '<span aria-hidden="true">↗</span> 分享'; }, 1600);
      }
    } catch (error) {
      if (error?.name !== 'AbortError') button.setAttribute('title', '当前浏览器暂不支持分享');
    }
  });

  dialog.addEventListener('click', event => {
    if (event.target.closest('[data-close-dialog]')) dialog.close();
    else if (event.target.closest('[data-event-gallery-prev]')) moveEventGallery(-1);
    else if (event.target.closest('[data-event-gallery-next]')) moveEventGallery(1);
    else if (event.target.closest('[data-album-prev]')) moveAlbum(-1);
    else if (event.target.closest('[data-album-next]')) moveAlbum(1);
    else if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });

  dialog.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (dialogMode === 'event-gallery') {
      event.preventDefault();
      moveEventGallery(event.key === 'ArrowLeft' ? -1 : 1);
    } else if (dialogMode === 'album') {
      event.preventDefault();
      moveAlbum(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });

  dialog.addEventListener('touchstart', event => {
    if (dialogMode === 'event-gallery') eventSwipeStartX = event.changedTouches[0]?.clientX || 0;
  }, { passive: true });

  dialog.addEventListener('touchend', event => {
    if (dialogMode !== 'event-gallery') return;
    const distance = (event.changedTouches[0]?.clientX || 0) - eventSwipeStartX;
    if (Math.abs(distance) > 45) moveEventGallery(distance > 0 ? -1 : 1);
  }, { passive: true });

  dialog.addEventListener('close', () => {
    dialog.querySelectorAll('video').forEach(video => video.pause());
    dialogMode = '';
    activeEventGallery = null;
    if (dialogTrigger?.isConnected) dialogTrigger.focus({ preventScroll: true });
  });

  window.addEventListener('hashchange', renderRoute);
  renderRoute();
})();


// Show a readable fallback when a visitor cannot play a video.
(() => {
  const notices = new WeakMap();
  const showNotice = video => {
    if (!(video instanceof HTMLVideoElement) || !video.controls) return;
    let note = notices.get(video);
    if (!note) {
      note = document.createElement('small');
      note.className = 'video-playback-notice';
      note.setAttribute('role', 'status');
      note.style.cssText = 'display:block;margin:8px 0 0;font-size:12px;line-height:1.6;color:#b8bcc4;text-align:center;';
      video.insertAdjacentElement('afterend', note);
      notices.set(video, note);
    }
    note.textContent = '视频暂时无法播放，请检查网络连接后重试。';
    note.hidden = false;
  };
  const clearNotice = video => {
    const note = notices.get(video);
    if (note) { note.hidden = true; note.style.display = 'none'; }
  };
  document.addEventListener('error', event => {
    const video = event.target;
    showNotice(video);
    const note = notices.get(video);
    if (note) note.style.display = 'block';
  }, true);
  document.addEventListener('playing', event => clearNotice(event.target), true);
  document.addEventListener('loadeddata', event => clearNotice(event.target), true);
  document.addEventListener('waiting', event => {
    if (!navigator.onLine && /^https?:/i.test(event.target.currentSrc || '')) {
      showNotice(event.target);
      const note = notices.get(event.target);
      if (note) note.style.display = 'block';
    }
  }, true);
})();
