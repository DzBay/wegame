// 加载模块
const {task,src,dest,watch,series,parallel} = require('gulp');
// 用于加载其他gulp插件
const load = require('gulp-load-plugins')();
// nodejs的del模块用于删除文件
const del = require('del');

// 删除dist目录
task('delDist',async ()=>{
  await del('./dist');
})

// 处理图片
task('images', async ()=>{
  src('./images/*.*')
  .pipe(dest('./dist/images'))
  .pipe(load.connect.reload())
})

// 处理sass
task('sass', async ()=>{
  src('./sass/*.scss')
  .pipe(load.sassChina())
  // .pipe(load.rev())
  .pipe(dest('./dist/css'))
  // .pipe(load.rev.manifest())
  // .pipe(dest('./rev/css'))
  .pipe(load.connect.reload())
})

// 处理js
task('script', async ()=>{
  src('./script/*.js')
  // .pipe(load.rev())
  .pipe(load.babel({presets: ['@babel/env']}))
  .pipe(dest('./dist/script'))
  // .pipe(load.rev.manifest())
  // .pipe(dest('./rev/js'))
  .pipe(load.connect.reload())
})

// 处理html
task('html', async ()=>{
  src(['./rev/**/*.json','./html/*.html'])
  // .pipe(load.revCollector({replaceReved:true}))
  .pipe(dest('./dist/html'))
  .pipe(load.connect.reload())
})

// 监听文件变化
task('watch',async ()=>{
  watch('./images/*.*',series('images','html'));
  watch('./sass/*.scss',series('sass','html'));
  watch('./script/*.js',series('script','html'));
  watch('./html/*.html',series('html'));
})

// 启动服务，自动刷新
task('connect',async ()=>{
  load.connect.server({
    root: './dist',
    livereload: true,
    port: 3000
  });
})

// 构建开发包
task('dev',series('delDist','images','sass','script','html','connect','watch'))
